This is my first assignment for csc-308 (Software Engineering I) at Cal Poly with Prof. Chris Zielke. We used [Vite](https://vite.dev/) and [React](https://react.dev/) along with `npm` to create a basic counter and edit some displayed text.

The project can be run by `cd`-ing into the `packages/react-frontend` directory and running `npm run dev`, where `dev` is a script in packages.json

Script for reinstalling if errors occur
```shell
nvm install 20                   
nvm use 20
rm -rf node_modules package-lock.json
npm install
npm run dev
```

For reference, the dev in the root directory `package.json` needs
```shell
npm -w react-frontend run dev
```