# PP Label Frontend

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Environment Prepare

### Code Format

- We use ESLint, Prettier and Stylelint to keep an uniform code format.
- Line-Seperator is `LF`. Please make sure Git does not automatically transfer to `CRLF` on Windows:

```bash
git config core.autocrlf false
```

### Locale File Key Format

1. Write long, comma seperated key name, instead of multi-level nested key name.
2. Arrange content that belongs to the same block together, instead of always add at the buttom.

Good Example:

```json
{
  "app.welcome.link.fetch-blocks": "Fetch all blocks",
  "app.welcome.link.remove-blocks": "Remove all blocks"
}
```

Bad Example(Violates #1):

```json
{
  "app": {
    "welcome": {
      "link": {
        "fetch-blocks": "Fetch all blocks",
        "remove-blocks": "Remove all blocks"
      }
    }
  }
}
```

Bad Example3(Violates #2):

```json
{
  "app.welcome.link.fetch-blocks": "Fetch all blocks",
  "app.welcome.other-function.other-wording": "Anything",
  //...
  "app.welcome.link.remove-locks": "Remove all blocks" // Newly added
}
```

### Happy coding with VSCode

Recommanded Plugins in `.vscode/extensions.json`:

1. [ESLint](dbaeumer.vscode-eslint): Strict syntex check.
1. [Prettier](esbenp.prettier-vscode): Code Format.
1. [Sneak Mark](wangzy.sneak-mark): Check non-ascii marks in code.
1. [Stylelint](stylelint.vscode-stylelint): CSS Format.
1. [_Docker_](ms-azuretools.vscode-docker): Needed if you dev with docker.

Recommanded Settings in `.vscode/settings.json`:

1. Auto Save: No
1. Default Formatter: Prettier
1. Format On Paste: Yes
1. Format On Save: Yes
1. Format On Save Mode: File

### Install `node_modules`

```bash
npm install --location=global yarn
yarn
```

If you're in mainland China, recommand to use `tyarn` instead.

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

### Tips for Ubuntu or WSL(Windows Subsystem Linux)

- Switch default shell from `dash` to `bash` to prevent `[` issue in git hooks:

```bash
sudo dpkg-reconfigure dash
# Then select `No`
```

- Manage multiple node environments with ease: [NVM](https://github.com/nvm-sh/nvm).

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

## Generate API

```shell
yarn global add @openapitools/openapi-generator-cli
```

```shell
openapi-generator-cli generate \
-i ../PP-Label/pplabel/openapi.yml \
-g typescript-fetch \
-o src/services/web/ \
--additional-properties=useSingleRequestParameter=false \
--remove-operation-id-prefix \
--skip-validate-spec

openapi-generator-cli generate \
-i ../PP-Label-ML/pplabel_ml/openapi.yml \
-g typescript-fetch \
-o src/services/ml/ \
--additional-properties=useSingleRequestParameter=false \
--remove-operation-id-prefix \
--skip-validate-spec

```
