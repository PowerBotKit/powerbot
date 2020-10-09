# Contributing to PowerBotKit Dev Framework

Hi! I'm really excited that you are interested in contributing to powerbot. Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

- [Development Setup](#development-setup)
  - [Setup](#steup)
  - [Add Dependencies](#add-dependencies)
  - [Remove Dependencies](#remove-dependencies)
  - [Build](#build)
- [Project Structure](#project-structure)
- [Contributing Tests](#contributing-tests)

## Development Setup

You will need [Node.js](http://nodejs.org) **version 10+**, [lerna](https://lerna.js.org) and [Yarn 1.x](https://yarnpkg.com/en/docs/install).

### Setup

After cloning the repo, run:

```bash
$ yarn # install the dependencies of the project
```

A high level overview of tools used:

- [TypeScript](https://www.typescriptlang.org/) as the development language
- [Jest](https://jestjs.io/) for unit testing
- [TSlint](https://palantir.github.io/tslint/) and [Prettier](https://prettier.io/) for code formatting
  > :warning: TSLint has been deprecated as of 2019. So we will support the migration to [ESLint](https://eslint.org/).

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

## Project Structure

This repository employs a [monorepo](https://en.wikipedia.org/wiki/Monorepo) setup which hosts a number of associated packages under the `packages` directory:

- `core`: powerbot core package. It provide the definition.

- `consumer`: powerbot consumer package. It can manage worker to process message.

- `distributor`: powerbot distributor package. It can distribute message to different channel and provide the api to return log.
