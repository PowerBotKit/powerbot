# Contributing to PowerBotKit Dev Framework

Hi! I'm really excited that you are interested in contributing to powerbot. Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

- [Development Setup](#development-setup)
  - [Setup](#steup)
  - [Add Dependencies](#add-dependencies)
  - [Remove Dependencies](#remove-dependencies)
  - [Build](#build)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Project Structure](#project-structure)
- [Contributing Tests](#contributing-tests)

## Development Setup

You will need [Node.js](http://nodejs.org) **version 10+** and [Yarn 1.x](https://yarnpkg.com/en/docs/install).

### Setup

After cloning the repo, run:

```bash
$ yarn # install the dependencies of the project
```

A high level overview of tools used:

- [TypeScript](https://www.typescriptlang.org/) as the development language
- [Jest](https://jestjs.io/) for unit testing
- [ESlint](https://eslint.org/) and [Prettier](https://prettier.io/) for code formatting


### Add Dependencies

we use [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) to bootstrap the project

if you want to add a develop dependency for root, use `Typescript` as example:

```bash
$ yarn add Typescript -D -W
```

if you want add a (develop) dependency for packageA, use `lodash` as example:

```bash
$ yarn workspace packageA add lodash -D  #if you want to add develop dependency, please add -D
```

if you want add packageB for packageA,

```bash
$ yarn workspace packageA add packageB
```

### Remove Dependencies

like [Add Dependencies](#add-dependencies), use `remove` instead of `add`.

### Build

run this command:

```
$ yarn build
```

## Commit Message Guidelines

> This is adapted from [Angular's commit convention](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular).

We have very precise rules over how our Git commit message must be formatted. This format leads to **easier to read commit history and build changelog file**.

### Commit Message Format

Each commit message should consists of a **header**, a **body**, and a **footer**.

```
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The `header` is mandatory and must conform to the [Commit Message Header](#commit-messageg-header) format.

The `body` is optional. When the body is required, it should be at least 20 characters long.

The `footer` is optional.

### Commit Message Header

Header must be matched the following rules:

```
<type>(<scope>): <short summary>
```

#### Type

The `type` must be the one of the following:

- **\*build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests
- **revert**: Revert some code for some reason
- **chore**: Changes that doesn't belong the above the type or fix conflict in merging code

#### Scope

The scope is optional and should be the name of the npm package affected (as perceived by the person reading the changelog generated from commit messages).

The following is the list of supported scopes:

- **core**
- **consumer**
- **distributor**

There are currently a few exceptions to the "use package name" rule:

- **packaging**: used for changes that change the npm package layout in all of our packages, e.g.
  public path changes, package.json changes done to all packages, d.ts file/format changes, changes
  to bundles, etc.
- none/empty string: useful for `style`, `test` and `refactor` changes that are done across all
  packages (e.g. `style: add missing semicolons`) and for docs changes that are not related to a
  specific package (e.g. `docs: fix typo in tutorial`).

#### Short Summary

The `short summary` contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter

### Commit Message Body

Just as in the **short summary**, use the imperative, present tense: "change" not "changed" nor "changes".
The body should include the motivation for the change and contrast this with previous behavior.

#### Break Change

if the pr contains the break change, the `body` should be `BREAKING CHANGE:` at the beginning.

### Commit Message Footer

The `footer` is optional and should be the place to
reference GitHub issues that this commit **Closes**.

### Revert

If the commit leads to some bug, it prefer to use `git revert`.

```bash
git revert ${commit-id}
```

## Project Structure

This repository employs a [monorepo](https://en.wikipedia.org/wiki/Monorepo) setup which hosts a number of associated packages under the `packages` directory:

- `core`: powerbot core package. It provide the definition.

- `consumer`: powerbot consumer package. It can manage worker to process message.

- `distributor`: powerbot distributor package. It can distribute message to different channel and provide the api to return log.

## TODO List

Please find the TODO list from [Kanban board](https://github.com/orgs/PowerBotKit/projects/1)
