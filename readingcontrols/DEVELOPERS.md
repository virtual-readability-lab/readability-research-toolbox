# Developing and debugging the Reading Controls Tester

## Running locally

The repo is currently hosted at `https://github.com/virtual-readability-lab/readability-research-toolbox`.

Clone the repo and `cd` to `<repo root>/web`

Run `npm start` and a local browser will open at `http://localhost:3000/`

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


