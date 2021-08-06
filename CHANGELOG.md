# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.2-alpha.7](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.6...v0.0.2-alpha.7) (2021-08-06)

**Note:** Version bump only for package root





## [0.0.2-alpha.6](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.5...v0.0.2-alpha.6) (2021-08-06)


### Features

* add tls redis support ([#155](https://github.com/PowerBotKit/powerbot/issues/155)) ([62d4448](https://github.com/PowerBotKit/powerbot/commit/62d4448d83948e99c6f3c9953a4678a74c618643))
* **core:** add more fields for GDUser ([643f969](https://github.com/PowerBotKit/powerbot/commit/643f969170ed0ed7ef154d67b5a0071545b66627))
* provide pre and post hook for onMessage ([7b39314](https://github.com/PowerBotKit/powerbot/commit/7b3931458d235a4840a40aedce19ea3abcbab5dd))


### Reverts

* Revert "feat: add print user infologgs" (#154) ([a42efd4](https://github.com/PowerBotKit/powerbot/commit/a42efd4976014572686cab5fe45fa4f877cd3c00)), closes [#154](https://github.com/PowerBotKit/powerbot/issues/154)





## [0.0.2-alpha.5](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.4...v0.0.2-alpha.5) (2021-08-02)


### Bug Fixes

* add custom redis cache config ([bc2d078](https://github.com/PowerBotKit/powerbot/commit/bc2d078f70dbe51bf0fc0e1524b52bf80da83ec8))
* **core:** redis mq support custom port by env vars ([#153](https://github.com/PowerBotKit/powerbot/issues/153)) ([f5d2984](https://github.com/PowerBotKit/powerbot/commit/f5d298430d5f046c7df29370170a4744fcae61d7))


### Features

* add print user infologgs ([04f21ca](https://github.com/PowerBotKit/powerbot/commit/04f21ca91fa93c04745e04261323383c3325b3a6))





## [0.0.2-alpha.4](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.3...v0.0.2-alpha.4) (2021-07-30)


### Bug Fixes

* fix new field in user session to log the activity id ([509ab9e](https://github.com/PowerBotKit/powerbot/commit/509ab9e39369d3457c6b665bab7929fe0346b516))






## [0.0.2-alpha.3](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.2...v0.0.2-alpha.3) (2021-07-30)


### Reverts

* Revert "build(deps): bump lowdb from 1.0.0 to 2.1.0 (#138)" (#150) ([a06cd5f](https://github.com/PowerBotKit/powerbot/commit/a06cd5f1a0b36f13a762633f0ea170c021f529c7)), closes [#138](https://github.com/PowerBotKit/powerbot/issues/138) [#150](https://github.com/PowerBotKit/powerbot/issues/150)





## [0.0.2-alpha.2](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.1...v0.0.2-alpha.2) (2021-07-30)


### Bug Fixes

* BaseWorker redirect function need bind this to call dialog service ([354db90](https://github.com/PowerBotKit/powerbot/commit/354db909318c3ae43e2f195eeaea5ec10e554b61))
* DialogUtil need to export ([9a80a12](https://github.com/PowerBotKit/powerbot/commit/9a80a1277bb36f05e172610987761e33614a44dd))





## [0.0.2-alpha.1](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.0...v0.0.2-alpha.1) (2021-07-27)


### Bug Fixes

* fix the customized adaptor init issue when the distributor server get created ([11c72c5](https://github.com/PowerBotKit/powerbot/commit/11c72c58a413b235ccbcf8b26f79e1e1322214fc))





## [0.0.2-alpha.0](https://github.com/PowerBotKit/powerbot/compare/v0.0.1...v0.0.2-alpha.0) (2021-07-24)


### Bug Fixes

* export more interfaces to external to allow implment ([66d7930](https://github.com/PowerBotKit/powerbot/commit/66d7930e975355ab328f08c5b4b899a4432f2bf7))
* fix the logic error of get teams member if the distributor connect to online real bot ([4bb67a4](https://github.com/PowerBotKit/powerbot/commit/4bb67a450c97387f26847cc1d23ff1d2b35f6b33))






## [0.0.1](https://github.com/PowerBotKit/powerbot/compare/v0.0.1-alpha.4...v0.0.1) (2021-07-23)

**Note:** Version bump only for package root





## [0.0.1-alpha.4](https://github.com/PowerBotKit/powerbot/compare/v0.0.1-alpha.3...v0.0.1-alpha.4) (2021-07-23)


### Bug Fixes

*  do not throw error if the intent is empty ([#141](https://github.com/PowerBotKit/powerbot/issues/141)) ([147946c](https://github.com/PowerBotKit/powerbot/commit/147946c61471679dbace7b15624d5226487315af))
* **core:** change yarn lock to address security issue ([c940104](https://github.com/PowerBotKit/powerbot/commit/c940104cc06beedda6b79c130b00f7569b642dce))


### chore

* modify IntentYAMLWildcardConfig for js yaml limit ([d5387b9](https://github.com/PowerBotKit/powerbot/commit/d5387b94ec2222d9f03bdf9fd3d3d7f5f288b266))


### Code Refactoring

* **core:** use forEach to rewrite WildcardIntent#doProcess ([1629049](https://github.com/PowerBotKit/powerbot/commit/1629049220efd14d76856be52e5c621eef58960c))


### BREAKING CHANGES

* **core:** WildcardIntent#doProcess method is private
* IntentYAMLWildcardConfig#intents change to object with
stringg key from object arrays





## [0.0.1-alpha.3](https://github.com/PowerBotKit/powerbot/compare/v0.0.1-alpha.2...v0.0.1-alpha.3) (2020-10-29)

**Note:** Version bump only for package root





## [0.0.1-alpha.2](https://github.com/PowerBotKit/powerbot/compare/v0.0.1-alpha.1...v0.0.1-alpha.2) (2020-10-23)


### Bug Fixes

* **consumer:** typo fix(woker -> worker) ([e8e5a56](https://github.com/PowerBotKit/powerbot/commit/e8e5a56ee3ad5ebe96ba2f2dfea41aca85d8da46))
* **distributor:** the logger import way changed ([bd67ec9](https://github.com/PowerBotKit/powerbot/commit/bd67ec9db2476a40e77b7336677c527f33b46670))
* **examples:** make yarn build script pass for 'tsc is not found' ([37d6119](https://github.com/PowerBotKit/powerbot/commit/37d61196fcb9dbb9b0faa2ac9213289c9714c244))


### chore

* **core:** the logger do not support default export ([917ece0](https://github.com/PowerBotKit/powerbot/commit/917ece0113e76263c3da795076ef8ad6732f13e1))


### Code Refactoring

* rewrite the core project structure ([38e0c94](https://github.com/PowerBotKit/powerbot/commit/38e0c94b39cf574d83374bdc4e5aeb13df9121d4))


### Features

* implement the consumer ([1aace58](https://github.com/PowerBotKit/powerbot/commit/1aace58cb616501a7d86ad866ba26dd56b802182))
* make inbound/outbound middleware work ([55be57b](https://github.com/PowerBotKit/powerbot/commit/55be57b8bb82b64d82514cf7967baaea2dfdf7f1))
* provide intent support based on wildcard ([8ec8585](https://github.com/PowerBotKit/powerbot/commit/8ec858518b3225b1a4ef07e87fc40e1b9954c55f))


### BREAKING CHANGES

* **consumer:** the export module contain 'woker' will replace 'worker'
* **core:** logger do not support default export
* the import way for some module may be changed





## [0.0.1-alpha.1](https://github.com/PowerBotKit/powerbot/compare/v0.0.1-alpha.0...v0.0.1-alpha.1) (2020-10-15)


### Styles

* ts lint fix ([0f24d4c](https://github.com/PowerBotKit/powerbot/commit/0f24d4c0a1c5af12e33445291a1c51e64893e8bd))


### BREAKING CHANGES

* close ban-types rule
