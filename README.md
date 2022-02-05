# PP Label Frontend

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Environment Prepare

### Code Format

- We use ESLint, Prettier and Stylelint to ensure global code formatting.
- Line-Seperator is `LF`. Please make sure Git does not automatically transfer to `CRLF` on Windows:

```bash
git config core.autocrlf false
```

### Happy coding with VSCode, recommand Plugins:

1. [ESLint](dbaeumer.vscode-eslint): Strict syntex check.
2. [Prettier](esbenp.prettier-vscode): Code Format.
3. [Sneak Mark](wangzy.sneak-mark): Check non-ascii marks in code.
4. [Stylelint](stylelint.vscode-stylelint): CSS Format.
5. [_Docker_](ms-azuretools.vscode-docker): Needed if you dev with docker.

### Install `node_modules`:

```bash
yarn
```

### [Optional] Install `node_modules` with Docker

- Build Image

```bash
docker build -t pp-label-frontend -f Dockerfile.dev .
```

- Install node_modules

```bash
docker run -ti -v ~/gitroot/PP-Label-Frontend:/usr/app pp-label-frontend yarn
```

- Start APP

```bash
docker run -ti -p 8000:8000 -p 3000:3000 -v ~/gitroot/PP-Label-Frontend:/usr/app pp-label-frontend --name pp-label-frontend
```

## Provided Scripts

There're some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

- Start project

```bash
npm start
```

- Build project

```bash
npm run build
```

- Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

- Test code

```bash
npm test
```

### [Optional] With docker

Add `docker run -ti pp-label-frontend` in front of above commands.

For example, before:

```bash
npm test
```

After:

```bash
docker run -ti pp-label-frontend npm test
```
