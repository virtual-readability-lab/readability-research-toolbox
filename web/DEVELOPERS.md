# Developing and debugging the Reading Controls Tester

## Running locally

The repo is currently hosted at `https://git.corp.adobe.com/mkraley/readingcontrols`.

Clone the repo and `cd` to `<repo root>/web`

Run `npm start` and a local browser will open at `http://localhost:3000/`

## Custom reading passages 

***Only allowed within Adobe at this time***

From the repo base directory, create a python 3.8 virtual environment at `<repo base>/venv` and activate that 
environment

`pip install -r requirements.txt`

To run the backend, activate the virtual environment and run

`python <repo base>/backend/api/server.py`

## Containers

The tester is packaged as two Docker containers: one for the web app, the other for the backend processing.
The backend is only needed for customer reading passages; the web app can be installed alone if the internally 
packaged passages are sufficient.

To create the containers, make sure you have Docker running locally, `cd <repo base>` and run

`make up`

This will build the containers and launch them locally.

Run `make save` to store the docker images locally in the `docker-images` folder.
The images, either just the -web container or both, can then be copied to another server for deployment.

See `Makefile` for other deployment options.

~~~~


