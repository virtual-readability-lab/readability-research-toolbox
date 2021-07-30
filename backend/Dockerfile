FROM python:3.8-slim-buster

SHELL ["/bin/bash", "-c"]

RUN addgroup --gid 1000 flask
RUN adduser --uid 1000 --gid 1000 --shell /bin/sh --gecos '' --disabled-password flask

RUN mkdir /app && chown flask:flask /app

RUN apt-get update && \
    apt-get install -y --no-install-recommends wget unzip libglib2.0-0 libsm6 libxext6 libxrender1 &&\
    apt-get -y install gcc

RUN apt-get update && \
    apt-get install -y software-properties-common && \
    apt-get -y install libx11-6 curl libarchive-dev jq execstack && \
    apt-get autoclean -y && \
    apt-get autoremove -y && \
    rm -rf /tmp/* /var/tmp/* && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

ARG ARTIFACTORY_USER
ARG ARTIFACTORY_API_TOKEN

ARG PDFTOOLS_BRANCH=develop
ARG PDFTOOLS_ARTIFACT=latest

ARG TAGGEDPDF_VERSION=2.4.*

RUN pip --no-cache-dir install --upgrade --pre -i https://$ARTIFACTORY_USER:$ARTIFACTORY_API_TOKEN@artifactory.corp.adobe.com/artifactory/api/pypi/pypi-colorado-tools-snapshot/simple taggedpdf==$TAGGEDPDF_VERSION

COPY get-pdftools.sh /app/python/get-pdftools.sh
COPY install-pdftools.sh /app/python/install-pdftools.sh

# install the version for the branch we're on
RUN /app/python/install-pdftools.sh \
    -b $PDFTOOLS_BRANCH -a $PDFTOOLS_ARTIFACT \
    -t 'pdfRender pdfJSON' \
    /tmp /app/python/tools

# remove stuff we don't need
RUN rm -r /app/python/tools/libopencv* /app/python/tools/libOCRLibrary* /app/python/tools/dictionaries

ENV PATH=$PATH:/app/python/tools

# install the app (flask) code
# no venv needed
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt
COPY . /app/
RUN mkdir -p /var/log/readingcontrols && chown flask:flask /var/log/readingcontrols
# this is a complete hack until we can get TargetConfig.yaml included in the Orchestrator image
COPY TargetConfig.yaml /usr/local/lib/python3.8/site-packages/orchestrator/tests/test_client/
EXPOSE 5000

USER flask

ENV PYTHONPATH=/app

CMD cd /app; python api/server.py

