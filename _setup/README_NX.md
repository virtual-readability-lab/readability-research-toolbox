# Node 

nvm
node v16.3

# NX
npm install -g nx
npx create-nx-workspace --preset=empty

# NX generators
cd rrt
npm install --save-dev @nrwl/express
nx g @nrwl/express:app <app-name>

### https://nxext.dev/docs/vite/overview/
npm install @nxext/vite --save-dev
nx g @nxext/vite:app <app-name>

# NX How to delete app/lib?
nx g @nrwl/workspace:remove <lib-name>