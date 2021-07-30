#!/usr/bin/env bash
##
##  ADOBE CONFIDENTIAL
##  ___________________
##
##  Copyright 2019 Adobe
##  All Rights Reserved.
##
##  NOTICE:  All information contained herein is, and remains
##  the property of Adobe and its suppliers, if any.  The
##  intellectual and technical concepts contained herein are
##  proprietary to Adobe and its suppliers and are protected
##  by all applicable intellectual property laws, including
##  trade secret and copyright laws.  Dissemination of this
##  information or reproduction of this material is strictly
##  forbidden unless prior written permission is obtained
##  from Adobe.
##

set -e

USAGE="Usage: ${0##*/}: [-b branch] [-a artifact] [-c config] [-t tools] tar-dir bin-dir"

function usage() {
cat <<EOF
$USAGE
Get pdfTools from artifactory for linux and install.

Required arguments:
tar-dir  directory in which to store tar-file
bin-dir  directory in which to unpack pdfTools executables

Options:
-a  artifact: download this artifact rather than latest (ex: 201910011824.356942f)
-b  branch: $BRANCHES release/... (default is develop)
-c  config: specify a branch configuration: $CONFIGS (get-pdftools.sh -h for valid configs)
-t  tools: a comma-separated list of pdfTools (others will be removed)
EOF
    exit 0
}

function usage1() {
    echo "$USAGE"
    exit 1
}

SCRIPT_DIR=$(realpath $(dirname "${BASH_SOURCE[0]}"))

BRANCH=develop
ARTIFACT=latest
CONFIG=release
while [[ $# > 0 ]] ; do
    if [[ $1 == '-h' || $1 == '--help' ]] ; then
        usage
    elif [[ $# > 1 && ( $1 == '-b' || $1 == '--branch' ) ]] ; then
        BRANCH=$2
        shift 2
    elif [[ $# > 1 && ( $1 == '-a' || $1 == '--artifact' ) ]] ; then
        ARTIFACT="$2"
        shift 2
    elif [[ $# > 1 && ( $1 == '-c' || $1 == '--config' ) ]] ; then
        CONFIG="$2"
        shift 2
    elif [[ $# > 1 && ( $1 == '-t' || $1 == '--tools' ) ]] ; then
        TOOLS=$(echo $2 | tr , ' ')
        shift 2
    elif [[ $1 != -* && -z "$TAR_DIR" ]] ; then
        TAR_DIR="$1"
        shift
    elif [[ $1 != -* && -z "$BIN_DIR" ]] ; then
        BIN_DIR="$1"
        shift
    else
        usage1
    fi
done
if [[ -z $TAR_DIR || -z $BIN_DIR ]] ; then
   usage1
fi

# create path before calling realpath
mkdir -p $BIN_DIR
BIN_DIR=$(realpath $BIN_DIR)
mkdir -p $TAR_DIR && cd $TAR_DIR
TAR=$($SCRIPT_DIR/get-pdftools.sh -b $BRANCH -a $ARTIFACT -c $CONFIG -n)
if [[ ! -f $TAR ]] ; then
   $SCRIPT_DIR/get-pdftools.sh -b $BRANCH -a $ARTIFACT -c $CONFIG
fi
tar xf $TAR
rm -rf $BIN_DIR
mv release $BIN_DIR
echo "${TAR%.tar.gz} ($BRANCH)" >$BIN_DIR/version-pdftools.txt
cp $BIN_DIR/version-pdftools.txt $BIN_DIR/version.txt
if [[ -n $TOOLS ]] ; then
    TMP=$(mktemp -d)
    for t in $TOOLS ; do
        # add these to version.txt - this can only be done if the image is built on Linux (e.g. in the Dockerfile)
        if [[ $t == pdf* ]] ; then
            echo $t: $($BIN_DIR/$t --version | grep --binary-files=text --color=never "^Build") >>$BIN_DIR/version.txt
        fi
        mv $BIN_DIR/$t $TMP
    done
    rm -rf $BIN_DIR/pdf* $BIN_DIR/assets
    if [[ $TOOLS != *pdfCapture* ]] ; then
        rm -rf $BIN_DIR/idrs
    fi
    mv $TMP/* $BIN_DIR
    rmdir $TMP
fi
rm $TAR

# just to be safe
if which execstack 2&>/dev/null ; then execstack -c $BIN_DIR/libpdfl.so ; fi

