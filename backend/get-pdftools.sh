#!/usr/bin/env bash
#
#
# ADOBE CONFIDENTIAL
# ___________________
#
# Copyright 2021 Adobe
# All Rights Reserved.
#
# NOTICE:  All information contained herein is, and remains
# the property of Adobe and its suppliers, if any.  The
# intellectual and technical concepts contained herein are
# proprietary to Adobe and its suppliers and are protected
# by all applicable intellectual property laws, including
# trade secret and copyright laws.  Dissemination of this
# information or reproduction of this material is strictly
# forbidden unless prior written permission is obtained
# from Adobe.
#
#
#

set -e

PLATFORMS="linux|mac|windows"
BRANCHES="develop master noida_dev"
CONFIGS="release|asan|debug|debug-asan|symbols|symbols-asan"
USAGE="Usage: ${0##*/}: [-n] [-b branch] [-a artifact] [-c config] [-l] [$PLATFORMS]"

function usage() {
cat <<EOF
$USAGE
Get pdfTools from artifactory for platform (default is linux).
Options:
-n  display pdfTools artifact name
-b  branch: $BRANCHES release/... (default is develop)
-a  artifact: download this artifact rather than latest (ex: 201910011824.356942f)
-c  config: specify a branch configuration: $CONFIGS (default is release)
-l  list branches
EOF
    exit 0
}

function usage1() {
    echo "$USAGE"
    exit 1
}

function get_download_uri() {
    local URI=$(curl $CURL_AUTH -s -S $1)
    if [[ "$URI" == *"errors"* || -z "$URI" ]] ; then
        echo "$1" >&2
        [[ -z "$URI" ]] || echo "$URI" >&2
        exit 1
    fi
    if [[ "$URI" == *"banyanops"* ]] ; then
        echo "VPN required" >&2
        exit 1
    fi
    echo "$URI"
}

# TODO get list of branches dynamically
# branches are found here: https://artifactory.corp.adobe.com/artifactory/maven-dc-$PLATFORM-local/pdf-next/pdfTools/
# but some are two levels (feature, release) and others are one level

BRANCH=develop
PLATFORM=
ARTIFACT=
CONFIG=
while [[ $# > 0 ]] ; do
    if [[ $1 == '-h' || $1 == '--help' ]] ; then
        usage
    elif [[ $1 == '-n' || $1 == '--dryrun' ]] ; then
        DRYRUN=1
        shift
    elif [[ $# > 1 && ( $1 == '-b' || $1 == '--branch' ) ]] ; then
        BRANCH=$2
        # rn is a shortcut for release/rn
        [[ $BRANCH =~ ^r[0-9.]+$ ]] && BRANCH=release/$BRANCH
        shift 2
    elif [[ $# > 1 && ( $1 == '-a' || $1 == '--artifact' ) && -z "$ARTIFACT" ]] ; then
        if [[ $2 != "latest" ]] ; then ARTIFACT="$2" ; fi
        shift 2
    elif [[ $# > 1 && ( $1 == '-c' || $1 == '--config' ) && -z "$CONFIG" ]] ; then
        CONFIG="$2"
        if [[ $CONFIG != -* ]] ; then
            CONFIG=-$CONFIG
        fi
        if [[ $CONFIG == -release ]] ; then
            CONFIG=
        elif [[ ! $CONFIG =~ ^-($CONFIGS)$ ]] ; then
            echo "${CONFIG:1} must be one of $CONFIGS"
            exit 1
        fi
        shift 2
    elif [[ ( $1 == '-l' || $1 == '--list' ) && -z "$LIST" ]] ; then
        LIST=1
        shift
    elif [[ "$1" != -* && -z "$PLATFORM" ]] ; then
        PLATFORM="$1"
        shift
    else
        usage1
    fi
done

case "$PLATFORM" in
    "") PLATFORM=linux ;;
    win) PLATFORM=windows ;;
    mac|linux|windows) ;;
    *) usage1 ;;
esac

if [[ $PLATFORM == windows ]] ; then
    VERSION=1_0_4
else
    VERSION=1.0.4
fi

if [[ -n $CONFIG && -n $ARTIFACT ]] ; then
    echo "Only one of -a -c allowed"
    usage1
fi

# check for two kinds of authentication
if [[ -n "$ARTIFACTORY_USER" && -n "$ARTIFACTORY_API_TOKEN" ]] ; then
    CURL_AUTH="-u $ARTIFACTORY_USER:$ARTIFACTORY_API_TOKEN"
elif [[ -f $HOME/.netrc ]] ; then
    CURL_AUTH="-n"
else
    echo "Authentication required."
    echo "See https://wiki.corp.adobe.com/x/dPqGQQ"
    exit 1
fi

# check for jq
if ! which jq > /dev/null ; then
    echo "jq not found"
    if [[ $(uname) == Darwin ]] ; then
        if ! which brew >/dev/null ; then
            echo "Install brew: https://brew.sh/"
        fi
        echo "Install jq: brew install jq"
    else
        echo "Install jq"
    fi
    exit 1
fi

# base request with repo but not branch
REQ1=https://artifactory.corp.adobe.com:443/artifactory/api/storage/maven-dc-$PLATFORM-local/pdf-next/pdfTools

if [[ -n $LIST ]] ; then
    # add release branches to list of branches
    RELEASES=$(curl $CURL_AUTH -s -S $REQ1/release/)
    if [[ "$RELEASES" == *"errors"* || -z "$RELEASES" ]]; then
        [[ -z "$RELEASES" ]] || echo "$RELEASES"
        exit 1
    fi
    RELEASES=$(echo $RELEASES | jq -r '.children|..|.uri?' | sort -g -k 1.3)
    for r in $RELEASES ; do
        BRANCHES="$BRANCHES release$r"
    done
    printf '%s\n' $BRANCHES | sort
    exit 1
fi

# request with branch but not artifact
REQ2=$REQ1/$BRANCH/$VERSION/pdfTools

if [[ -z $ARTIFACT ]] ; then
    # find latest build for branch and config
    DOWNLOAD=$(get_download_uri $REQ2)
    # format is /YYYYMMDDHHMM. followed by 6 or more hex chars
    # win is /YYYYMMDD_H?HMM. followed by 8 or more hex chars (hour 1-9 is H, not 0H)
    FILTER='select(test("^/\\d{8}_?\\d{3,4}\\.[0-9a-f]{6,}'$CONFIG'$"))'
    ARTIFACT=$(jq --raw-output ".children|.[]|.uri|$FILTER" <<< "$DOWNLOAD" | sort -rn | head -1)
    # echo REQ2=$REQ2
    # echo DOWNLOAD=; echo $DOWNLOAD | jq | head -20
    # echo FILTER=$FILTER
    # echo ARTIFACT=$ARTIFACT
    if [[ -z $ARTIFACT ]] ; then
        echo "No matching build found for config ${CONFIG:1}"
        exit 1
    fi
    ARTIFACT=${ARTIFACT:1}
fi

# full request including artifact
REQ=$REQ2/$ARTIFACT/pdftools-${VERSION}_$ARTIFACT.tar.gz

# get download URL from artifact info
DOWNLOAD=$(get_download_uri $REQ)
URL=$(jq --raw-output '.["downloadUri"]' <<< "$DOWNLOAD" )

# get or print build
FILE=$(basename $URL)
if [[ -n $DRYRUN ]] ; then
    echo $FILE
else
    CMD="curl $CURL_AUTH -o $FILE $URL"
    echo "Downloading $URL"
    $CMD
fi
