# Node 

nvm
node v16.3

# NX
npm install -g nx
npx create-nx-workspace --preset=empty

### NX to run everything
npm start

### NX managing .env variables across the monorepo
https://nx.dev/guides/environment-variables

# NX generators
cd rrt
npm install --save-dev @nrwl/express
nx g @nrwl/express:app <app-name>

### https://nxext.dev/docs/vite/overview/
npm install -D @nxext/vite
nx g @nxext/vite:app <app-name>

### react
npm install -D @nxext/react

### sveltekit
npm install -D @angular-devkit/schematics
npm install -D @nxext/sveltekit
nx g @nxext/sveltekit:app <app-name>

# NX How to delete app/lib?
nx g @nrwl/workspace:remove <lib-name>

# PRISMA for Database Migrations
https://www.prisma.io/blog/full-stack-typesafety-with-angular-nest-nx-and-prisma-CcMK7fbQfTWc
npm install @prisma/client
npm install prisma --save-dev 
