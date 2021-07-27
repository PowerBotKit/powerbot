# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
