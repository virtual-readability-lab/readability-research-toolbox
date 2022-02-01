# research-readability-toolbox
An open-source toolbox to conduct readability studies contained in a monorepo.

# supported languages + frameworks

### javascript
```
typescript
svelte / sveltekit
react / nextjs
lit v2+
es6 modules
```
### backend apis + tooling
```
golang v16+
golang fiber v2+
docker
bash
```
# folder structure

### apps

Contains applications to run various readability experiments. Think of this as the traditional place to create a new app to study reading.

### packages

A suite of small libraries and add-ons to use across apps. For example tracking motion controls on a phone.

### backend

This contains server-side code to run the database and the custom Restful API.

### server

Code to run and configure the production server. Nothing to see here for local dev. :)
