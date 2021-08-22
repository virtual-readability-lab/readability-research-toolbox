FROM python:3.8-slim-buster

SHELL ["/bin/bash", "-c"]

RUN addgroup --gid 1000 flask && \
    adduser --uid 1000 --gid 1000 --shell /bin/sh --gecos '' --disabled-password flask && \
    mkdir /backend && chown flask:flask /backend

RUN apt-get update && \
    apt-get -y install gcc jq curl libx11-6

WORKDIR /backend

ARG ARTIFACTORY_USER
ARG ARTIFACTORY_API_TOKEN
ENV ARTIFACTORY_USER=$ARTIFACTORY_USER
ENV ARTIFACTORY_API_TOKEN=$ARTIFACTORY_API_TOKEN

ARG PDFTOOLS_BRANCH=develop
ARG PDFTOOLS_ARTIFACT=latest

# ARG TAGGEDPDF_VERSION=2.4.*

# RUN pip --no-cache-dir install --upgrade --pre -i https://$ARTIFACTORY_USER:$ARTIFACTORY_API_TOKEN@artifactory.corp.adobe.com/artifactory/api/pypi/pypi-colorado-tools-snapshot/simple taggedpdf==$TAGGEDPDF_VERSION

COPY get-pdftools.sh /backend/python/get-pdftools.sh
COPY install-pdftools.sh /backend/python/install-pdftools.sh

# install the version for the branch we're on
RUN /backend/python/install-pdftools.sh \
    -b $PDFTOOLS_BRANCH -a $PDFTOOLS_ARTIFACT \
    -t 'pdfStructure' \
    /tmp /backend/python/tools

# remove stuff we don't need
RUN rm -r /backend/python/tools/libopencv* /backend/python/tools/libOCRLibrary* /backend/python/tools/dictionaries

ENV PATH=$PATH:/backend/python/tools

# install the app (flask) code
# no venv needed
COPY requirements.txt /backend/
RUN pip install --no-cache-dir -r requirements.txt
COPY . /backend/
RUN mkdir -p /var/log/readingcontrols && chown flask:flask /var/log/readingcontrols

EXPOSE 5001

USER flask

ENV PYTHONPATH=/backend

CMD cd /backend; python api/server.py

