# Ant Design Pro

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Environment Prepare

Install `node_modules`:

```bash
yarn
```

## [Optional] Environment Prepare with Docker

### Build Image

```bash
docker build -t pp-label-frontend -f Dockerfile.dev .
```

### Install node_modules

```bash
docker run -ti -v ~/gitroot/PP-Label-Frontend:/usr/app pp-label-frontend yarn
```

### Start APP

```bash
docker run -ti -p 8000:8000 -p 3000:3000 -v ~/gitroot/PP-Label-Frontend:/usr/app pp-label-frontend
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).
