# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.2-alpha.17](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.16...v0.0.2-alpha.17) (2021-08-24)


### Bug Fixes

* **core:** check wheter context.activity is null or undefined in get member from TeamsInfo ([3edccc9](https://github.com/PowerBotKit/powerbot/commit/3edccc9b9261fb3a0c4129e23aa86c4cd30820a7))





## [0.0.2-alpha.16](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.15...v0.0.2-alpha.16) (2021-08-18)


### Features

* **core:** debug some log in mq ([b9c14fa](https://github.com/PowerBotKit/powerbot/commit/b9c14fa9ff6ae66fefebf82770d9bbb2af1b977a))
* **core:** use the LOGGER_LEVEL environment variable to control the log display level ([1544051](https://github.com/PowerBotKit/powerbot/commit/15440517ff93508357844dbad4d95030aa56944a))





## [0.0.2-alpha.14](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.13...v0.0.2-alpha.14) (2021-08-12)


### Features

* move replyToId from MessageInput to GDUserSession ([7e376e4](https://github.com/PowerBotKit/powerbot/commit/7e376e4dbca61127670e2deb71af928b1f0b46bf))
* remove DialogUtil in distributor part ([cc9a716](https://github.com/PowerBotKit/powerbot/commit/cc9a7165f0bd5cde7e15dc0a69d8cf8a85836534))





## [0.0.2-alpha.13](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.12...v0.0.2-alpha.13) (2021-08-12)


### Features

* add reply card action message ([8110b06](https://github.com/PowerBotKit/powerbot/commit/8110b061bb366153aad414aca49cfdbec12ffb87))





## [0.0.2-alpha.11](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.10...v0.0.2-alpha.11) (2021-08-11)


### Features

* add mult message/cards ([#162](https://github.com/PowerBotKit/powerbot/issues/162)) ([e856d70](https://github.com/PowerBotKit/powerbot/commit/e856d70f7477677a2e788e0210391a10205b4428))





## [0.0.2-alpha.10](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.9...v0.0.2-alpha.10) (2021-08-10)


### Features

* add card template tool ([#161](https://github.com/PowerBotKit/powerbot/issues/161)) ([a6c939d](https://github.com/PowerBotKit/powerbot/commit/a6c939d30c3dedc0338534a2948b697063e34ce2))





## [0.0.2-alpha.9](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.8...v0.0.2-alpha.9) (2021-08-06)

**Note:** Version bump only for package @powerbotkit/core





## [0.0.2-alpha.7](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.6...v0.0.2-alpha.7) (2021-08-06)

**Note:** Version bump only for package @powerbotkit/core





## [0.0.2-alpha.6](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.5...v0.0.2-alpha.6) (2021-08-06)


### Features

* add tls redis support ([#155](https://github.com/PowerBotKit/powerbot/issues/155)) ([62d4448](https://github.com/PowerBotKit/powerbot/commit/62d4448d83948e99c6f3c9953a4678a74c618643))
* **core:** add more fields for GDUser ([643f969](https://github.com/PowerBotKit/powerbot/commit/643f969170ed0ed7ef154d67b5a0071545b66627))





## [0.0.2-alpha.5](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.4...v0.0.2-alpha.5) (2021-08-02)


### Bug Fixes

* add custom redis cache config ([bc2d078](https://github.com/PowerBotKit/powerbot/commit/bc2d078f70dbe51bf0fc0e1524b52bf80da83ec8))
* **core:** redis mq support custom port by env vars ([#153](https://github.com/PowerBotKit/powerbot/issues/153)) ([f5d2984](https://github.com/PowerBotKit/powerbot/commit/f5d298430d5f046c7df29370170a4744fcae61d7))





## [0.0.2-alpha.4](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.3...v0.0.2-alpha.4) (2021-07-30)


### Bug Fixes

* fix new field in user session to log the activity id ([509ab9e](https://github.com/PowerBotKit/powerbot/commit/509ab9e39369d3457c6b665bab7929fe0346b516))





## [0.0.2-alpha.1](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.0...v0.0.2-alpha.1) (2021-07-27)

**Note:** Version bump only for package @powerbotkit/core





## [0.0.2-alpha.0](https://github.com/PowerBotKit/powerbot/compare/v0.0.1...v0.0.2-alpha.0) (2021-07-24)

**Note:** Version bump only for package @powerbotkit/core






## [0.0.1](https://github.com/PowerBotKit/powerbot/compare/v0.0.1-alpha.4...v0.0.1) (2021-07-23)

**Note:** Version bump only for package @powerbotkit/core





## [0.0.1-alpha.4](https://github.com/PowerBotKit/powerbot/compare/v0.0.1-alpha.3...v0.0.1-alpha.4) (2021-07-23)


### chore

* modify IntentYAMLWildcardConfig for js yaml limit ([d5387b9](https://github.com/PowerBotKit/powerbot/commit/d5387b94ec2222d9f03bdf9fd3d3d7f5f288b266))


### Code Refactoring

* **core:** use forEach to rewrite WildcardIntent#doProcess ([1629049](https://github.com/PowerBotKit/powerbot/commit/1629049220efd14d76856be52e5c621eef58960c))


### BREAKING CHANGES

* **core:** WildcardIntent#doProcess method is private
* IntentYAMLWildcardConfig#intents change to object with
stringg key from object arrays





## [0.0.1-alpha.3](https://github.com/PowerBotKit/powerbot/compare/v0.0.1-alpha.2...v0.0.1-alpha.3) (2020-10-29)

**Note:** Version bump only for package @powerbotkit/core





## [0.0.1-alpha.2](https://github.com/PowerBotKit/powerbot/compare/v0.0.1-alpha.1...v0.0.1-alpha.2) (2020-10-23)


### chore

* **core:** the logger do not support default export ([917ece0](https://github.com/PowerBotKit/powerbot/commit/917ece0113e76263c3da795076ef8ad6732f13e1))


### Code Refactoring

* rewrite the core project structure ([38e0c94](https://github.com/PowerBotKit/powerbot/commit/38e0c94b39cf574d83374bdc4e5aeb13df9121d4))


### Features

* provide intent support based on wildcard ([8ec8585](https://github.com/PowerBotKit/powerbot/commit/8ec858518b3225b1a4ef07e87fc40e1b9954c55f))


### BREAKING CHANGES

* **core:** logger do not support default export
* the import way for some module may be changed





## [0.0.1-alpha.1](https://github.com/PowerBotKit/powerbot/compare/v0.0.1-alpha.0...v0.0.1-alpha.1) (2020-10-15)

**Note:** Version bump only for package @powerbotkit/core
