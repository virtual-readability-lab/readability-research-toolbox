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

#### database/supabase

Supabase is an open source Firebase alternative that uses PostgreSQL as the database. It automatically exposes Restful end-points to access data and a user-friendly UI to access/edit data. This is the only part of the RRT that is pulled as a Git Submodule:
git submodule add --depth 1 https://github.com/supabase/supabase 
See more at: https://supabase.com/docs/

### server

Code to run and configure the production server. Nothing to see here for local dev. :)
