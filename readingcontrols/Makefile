SHELL := /bin/bash
#SERVER := <TBD>
SERVER_DIR := /readingcontrols
# TODO: generate the IMAGE list dynamically in the save recipe
IMAGES := readingcontrols/web

ifeq ($(OS),Windows_NT)
	CMD_SEP := &
else
	CMD_SEP := ;
endif

.PHONY: deploy-server build up up-no-build down save load load-server sync up-server update-phony

# deploy the workflow docker images to a server
deploy-server: build save sync up-server

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
	$(foreach i, $(IMAGES), docker save $(i):latest | gzip >docker-images/$(subst /,-,$(i)).img.gz $(CMD_SEP) )
	copy Makefile docker-images
	copy docker-compose.yaml docker-images

# load all images
load:
	$(foreach i, $(wildcard docker-images/*.img.gz), docker load --input $(i) $(CMD_SEP) )

# load all images on server - docker files not in a sub-folder
load-server:
	$(foreach i, $(wildcard *.img.gz), docker load --input $(i) $(CMD_SEP) )

# copy all files needed to run app to server
sync:
ifeq ($(OS),Windows_NT)
	winscp.com -command "open $(SERVER)" "lcd $(CURDIR)" "call mkdir -p $(SERVER_DIR)" "cd $(SERVER_DIR)" \
	"synchronize remote docker-images ." "ls" "exit"
#	"put docker-images\\* Makefile docker-compose.yaml ./" "ls" "exit"
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
