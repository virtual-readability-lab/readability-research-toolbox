# Makefile for building little-react-engine workflow

SHELL := /bin/bash
SERVER := colorado-mfk3
SERVER_DIR := /app/readingcontrols

.PHONY: deploy-server set-server-aladdin test-server build up up-no-build down save load sync sync-scripts up-server update-phony 

# deploy the workflow docker images to a server
deploy-server: build save sync up-server

## deploy the workflow docker images to the aladdin server
#deploy-server1: set-server-aladdin test-server sync up-server test-server
#
## Synchronize scripts to the aladdin server
#sync-scripts1: set-server-aladdin test-server sync-scripts test-server
#
## Set the server to aladdin vs aladdin2
#set-server-aladdin:
#	$(eval SERVER=aladdin)
#
## Print out SERVER
#test-server:
#	$(info SERVER $(SERVER))

build:
	docker-compose build

up:
	docker-compose up -d --build
	docker ps

# start the app without building from Dockerfiles (but directories are needed)
up-no-build:
	docker-compose up -d --no-build
	docker ps

# stop all services
down:
	docker-compose down

# save all images
save:
	@ docker save readingcontrols/web:latest | gzip >docker-images/readingcontrols_web.img.gz


# load all images
load:
	@ for i in docker-images/* ; do \
		docker load --input $$i ; \
	done

# load all images on server
load-server:
	@ for i in ./*.img.gz ; do \
		docker load --input $$i ; \
	done

# copy all files needed to run app to server
sync:
ifeq ($(OS),Windows_NT)
	winscp.com -command "open $(SERVER)" "lcd $(CURDIR)" "call mkdir -p $(SERVER_DIR)" "cd $(SERVER_DIR)" \
	"put docker-images\\* Makefile docker-compose.yaml ./" "ls" "exit"
else
	@ssh $(SERVER) mkdir -p $(SERVER_DIR)
	$(info in sync SERVER $(SERVER))
	rsync -az --progress Makefile docker-compose.yaml docker-images $(SERVER):$(SERVER_DIR)
endif

up-server:
ifeq ($(OS),Windows_NT)
	winscp.com -command "open $(SERVER)" "call make -C $(SERVER_DIR) load-server up-no-build" "exit"
else
	ssh $(SERVER) make --no-print-directory -C $(SERVER_DIR) load up-no-build
endif

# Update the .PHONY list
update-phony:
	@sed -e "s/^.PHONY:.*/.PHONY: $$(sed -n 's/^\([-a-z]*\):.*/\1/p' Makefile | tr '\n' ' ')/" -i.bak Makefile
