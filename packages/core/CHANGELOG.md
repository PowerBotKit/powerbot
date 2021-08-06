# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
