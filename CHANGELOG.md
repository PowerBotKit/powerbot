## [0.0.3-beta.7](https://github.com/PowerBotKit/powerbot/compare/v0.0.3-beta.6...v0.0.3-beta.7) (2021-12-07)


### Bug Fixes

* redis cache lock work in a short time ([#260](https://github.com/PowerBotKit/powerbot/issues/260)) ([052110a](https://github.com/PowerBotKit/powerbot/commit/052110a7e53b4568ce4594157ecfb6f14f751155))
* use unlock insteand del to remove lock ([#271](https://github.com/PowerBotKit/powerbot/issues/271)) ([e6eb91e](https://github.com/PowerBotKit/powerbot/commit/e6eb91eceefa0cc84acaab86cf0e5a959b09affb))


### Reverts

* Revert "build(deps-dev): bump chalk from 4.1.2 to 5.0.0 (#258)" (#277) ([0e7c007](https://github.com/PowerBotKit/powerbot/commit/0e7c0079a4d533140e9650f9aaa266ba5f53dc9c)), closes [#258](https://github.com/PowerBotKit/powerbot/issues/258) [#277](https://github.com/PowerBotKit/powerbot/issues/277)



## [0.0.3-beta.6](https://github.com/PowerBotKit/powerbot/compare/v0.0.3-beta.5...v0.0.3-beta.6) (2021-11-24)


### Bug Fixes

* dialogKey lock will expired in 3s ([#254](https://github.com/PowerBotKit/powerbot/issues/254)) ([026ecb2](https://github.com/PowerBotKit/powerbot/commit/026ecb29df2ad7d1418961cf2771ac0e7737d735))



## [0.0.3-beta.5](https://github.com/PowerBotKit/powerbot/compare/v0.0.3-beta.4...v0.0.3-beta.5) (2021-11-12)



## [0.0.3-beta.4](https://github.com/PowerBotKit/powerbot/compare/v0.0.3-beta.3...v0.0.3-beta.4) (2021-11-08)



## [0.0.3-beta.3](https://github.com/PowerBotKit/powerbot/compare/v0.0.3-beta.2...v0.0.3-beta.3) (2021-11-03)



## [0.0.3-beta.2](https://github.com/PowerBotKit/powerbot/compare/v0.0.3-beta.1...v0.0.3-beta.2) (2021-10-20)



## [0.0.3-beta.1](https://github.com/PowerBotKit/powerbot/compare/v0.0.3-beta.0...v0.0.3-beta.1) (2021-10-17)


### Reverts

* Revert "build(deps): bump adaptivecards-templating from 2.1.0 to 2.2.0 (#216)" (#221) ([ce2007b](https://github.com/PowerBotKit/powerbot/commit/ce2007b30418c88e34193e5d9530671e170fa289)), closes [#216](https://github.com/PowerBotKit/powerbot/issues/216) [#221](https://github.com/PowerBotKit/powerbot/issues/221)



## [0.0.3-beta.0](https://github.com/PowerBotKit/powerbot/compare/v0.0.3-alpha.6...v0.0.3-beta.0) (2021-10-17)


### Bug Fixes

* add `await` keywords because `ICache#get` return a promise ([e56082a](https://github.com/PowerBotKit/powerbot/commit/e56082affe53550a9a512475a81dbe60b4d6e232))



## [0.0.3-alpha.6](https://github.com/PowerBotKit/powerbot/compare/v0.0.3-alpha.5...v0.0.3-alpha.6) (2021-10-06)


### Features

* lock message from mq to prevent consumer server from consuming the same message multiple times ([#210](https://github.com/PowerBotKit/powerbot/issues/210)) ([23cb6df](https://github.com/PowerBotKit/powerbot/commit/23cb6df3b4f65a9a4ee2ded4c41a19d49b629c7c)), closes [#204](https://github.com/PowerBotKit/powerbot/issues/204)


### BREAKING CHANGES

* `ICache` has changed to import statement from `import { ICache } from '@powerbotkit/distributor' to `import { ICache } from '@powerbotkit/core'`



## [0.0.3-alpha.5](https://github.com/PowerBotKit/powerbot/compare/v0.0.3-alpha.4...v0.0.3-alpha.5) (2021-09-29)


### Bug Fixes

* reset reployToId when fetch a dialog ([d7f9e67](https://github.com/PowerBotKit/powerbot/commit/d7f9e67a413202fbac040c76b6c6279845cd1251))


### Features

* add 'payload' for MessageInput to store more data ([f0983f7](https://github.com/PowerBotKit/powerbot/commit/f0983f7a8b5f879f435384212ed65e8f91b5b9dc))
* add `MessageAction.quit` to support quit the Intent ([#200](https://github.com/PowerBotKit/powerbot/issues/200)) ([7ad8056](https://github.com/PowerBotKit/powerbot/commit/7ad8056b3874bf4c59150adc6275821171e70b9f)), closes [#198](https://github.com/PowerBotKit/powerbot/issues/198)
* support setting some restify request handler in getting restify distributor server ([f973e1a](https://github.com/PowerBotKit/powerbot/commit/f973e1ab5a682e7638b52e8574699cb35f36e4d9))



## [0.0.3-alpha.4](https://github.com/PowerBotKit/powerbot/compare/v0.0.3-alpha.3...v0.0.3-alpha.4) (2021-09-14)


### Bug Fixes

* chache unlock key should be dialogkey ([71abdb7](https://github.com/PowerBotKit/powerbot/commit/71abdb777b76aa5c70613daa85b9f17a39c48494))


### Features

* custom channel name for distributor module ([9ff626e](https://github.com/PowerBotKit/powerbot/commit/9ff626e8a1588be1e1635ec1139a7690ec478e89))
* set up custom channel config ([101b07e](https://github.com/PowerBotKit/powerbot/commit/101b07ed28f0470e38ffbe5f8f9e66031ba2e847))
* set up inbound/oubound interceptor when middlewareConfig#inboundInterceptor/outboundInterceptor exists ([86defc0](https://github.com/PowerBotKit/powerbot/commit/86defc0f2e996048710e5a96ca2851c6bac8c17e))



## [0.0.3-alpha.3](https://github.com/PowerBotKit/powerbot/compare/v0.0.3-alpha.2...v0.0.3-alpha.3) (2021-09-07)


### Bug Fixes

* deserialize value from redis in get method ([a7a4f0a](https://github.com/PowerBotKit/powerbot/commit/a7a4f0ac07aef9c65c0a1e7e87568b1508d27531))


### Features

* use `IRedisCacheSerializer` to serialize/deserialize value. ([#178](https://github.com/PowerBotKit/powerbot/issues/178)) ([0e12e10](https://github.com/PowerBotKit/powerbot/commit/0e12e104588520954f014ec537e31b6076abf19f))



## [0.0.3-alpha.2](https://github.com/PowerBotKit/powerbot/compare/v0.0.3-alpha.1...v0.0.3-alpha.2) (2021-09-03)


### Bug Fixes

* stringify value when redis cache lock no-string value ([60640ea](https://github.com/PowerBotKit/powerbot/commit/60640eaa5e86b91cffaec25aae560f54b46a4170))



## [0.0.3-alpha.1](https://github.com/PowerBotKit/powerbot/compare/v0.0.3-alpha.0...v0.0.3-alpha.1) (2021-09-02)


### Features

* intent process support promise result ([346e7b3](https://github.com/PowerBotKit/powerbot/commit/346e7b33fd9e4836a6dd1f91560d640c2c9e9105))



## [0.0.3-alpha.0](https://github.com/PowerBotKit/powerbot/compare/v0.0.2...v0.0.3-alpha.0) (2021-08-31)


### Bug Fixes

* dialog key should not be the same for different users ([#171](https://github.com/PowerBotKit/powerbot/issues/171)) ([204b79f](https://github.com/PowerBotKit/powerbot/commit/204b79ffedeca3a46202a177087fa4bfd98bd302))


### Features

* set an expiration time when put value to redis and it will show warnning message without expire time ([#173](https://github.com/PowerBotKit/powerbot/issues/173)) ([b3eae5e](https://github.com/PowerBotKit/powerbot/commit/b3eae5ebf95fda62402d83eb3ef0d99a1f9bb504))


### Reverts

* fall back to lock user session ([#174](https://github.com/PowerBotKit/powerbot/issues/174)) ([4089a41](https://github.com/PowerBotKit/powerbot/commit/4089a41e0bb16d0cbe6e20270c57af4c1bab0b92))



## [0.0.2](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.21...v0.0.2) (2021-08-29)



## [0.0.2-alpha.21](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.20...v0.0.2-alpha.21) (2021-08-26)



## [0.0.2-alpha.20](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.19...v0.0.2-alpha.20) (2021-08-25)


### Bug Fixes

* use 'INFO' commaned to check redis connection RedisMQ when execute init process ([b4cbb3a](https://github.com/PowerBotKit/powerbot/commit/b4cbb3a562a2b014c203ce0b25ac65273c959df4))
* use 'INFO' commaned to check whether redis is reday when execute init process ([a6924e8](https://github.com/PowerBotKit/powerbot/commit/a6924e8d3fd40e0c7c8c0099bfc4167ac6f7e39c))



## [0.0.2-alpha.19](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.18...v0.0.2-alpha.19) (2021-08-25)



## [0.0.2-alpha.18](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.17...v0.0.2-alpha.18) (2021-08-25)


### Bug Fixes

* **distributor:** the publisher alaways be reds mq because setupPublisher method doesn't work ([90b846c](https://github.com/PowerBotKit/powerbot/commit/90b846c03c601148e683984356ceb778b59fb102))


### Features

* intent need simple and json way ([be3704d](https://github.com/PowerBotKit/powerbot/commit/be3704d1a41b5a5e5e87ecb66c0301f731e956ce))
* RedisTlsMQ is removed and redis client need be setup  when create RedisMQ ([25a7a60](https://github.com/PowerBotKit/powerbot/commit/25a7a60efff31c236535d07c1769ebaa09a88932))



## [0.0.2-alpha.17](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.16...v0.0.2-alpha.17) (2021-08-24)


### Bug Fixes

* **core:** check wheter context.activity is null or undefined in get member from TeamsInfo ([3edccc9](https://github.com/PowerBotKit/powerbot/commit/3edccc9b9261fb3a0c4129e23aa86c4cd30820a7))
* **distributor:** fix setup error ([21bcd62](https://github.com/PowerBotKit/powerbot/commit/21bcd62b1566243a54dc12e6561079afba393dd1))


### Features

* **distributor:** use RestifyDistributorServer to export restify.Server ([eea1b6b](https://github.com/PowerBotKit/powerbot/commit/eea1b6bb03652bf37025d467d74097bb74612ad3))
* **distributor:** use RestifyDistributorServer to export restify.Server ([a8d8f3a](https://github.com/PowerBotKit/powerbot/commit/a8d8f3a8bc68996f33184000894146dabbe2569d))



## [0.0.2-alpha.16](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.15...v0.0.2-alpha.16) (2021-08-18)


### Features

* **core:** debug some log in mq ([b9c14fa](https://github.com/PowerBotKit/powerbot/commit/b9c14fa9ff6ae66fefebf82770d9bbb2af1b977a))
* **core:** use the LOGGER_LEVEL environment variable to control the log display level ([1544051](https://github.com/PowerBotKit/powerbot/commit/15440517ff93508357844dbad4d95030aa56944a))



## [0.0.2-alpha.15](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.14...v0.0.2-alpha.15) (2021-08-13)


### Features

* add delete card/text support ([0ef86d4](https://github.com/PowerBotKit/powerbot/commit/0ef86d4aa81c2df2bc7f59cdae7ab1c516e83d6d))



## [0.0.2-alpha.14](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.13...v0.0.2-alpha.14) (2021-08-12)


### Features

* move replyToId from MessageInput to GDUserSession ([7e376e4](https://github.com/PowerBotKit/powerbot/commit/7e376e4dbca61127670e2deb71af928b1f0b46bf))
* remove DialogUtil in distributor part ([cc9a716](https://github.com/PowerBotKit/powerbot/commit/cc9a7165f0bd5cde7e15dc0a69d8cf8a85836534))



## [0.0.2-alpha.13](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.12...v0.0.2-alpha.13) (2021-08-12)


### Features

* add reply card action message ([8110b06](https://github.com/PowerBotKit/powerbot/commit/8110b061bb366153aad414aca49cfdbec12ffb87))
* **distributor:** return dialogKey afther publish turncontext ([a9f16db](https://github.com/PowerBotKit/powerbot/commit/a9f16db49354582ad66b5d1ea5d175fc110e72f6))



## [0.0.2-alpha.12](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.11...v0.0.2-alpha.12) (2021-08-12)


### Reverts

* Revert "build(deps): bump lowdb from 1.0.0 to 2.1.0 (#152)" (#163) ([e4b22e1](https://github.com/PowerBotKit/powerbot/commit/e4b22e1a68fb31c20eadf7da240a4d4f2eef1f32)), closes [#152](https://github.com/PowerBotKit/powerbot/issues/152) [#163](https://github.com/PowerBotKit/powerbot/issues/163)



## [0.0.2-alpha.11](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.10...v0.0.2-alpha.11) (2021-08-11)


### Features

* add mult message/cards ([#162](https://github.com/PowerBotKit/powerbot/issues/162)) ([e856d70](https://github.com/PowerBotKit/powerbot/commit/e856d70f7477677a2e788e0210391a10205b4428))
* **distributor:** add OnPostrReceiveMessage hook ([154d065](https://github.com/PowerBotKit/powerbot/commit/154d065a85bd28efdde9288b4bae25ed48f7e843))



## [0.0.2-alpha.10](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.9...v0.0.2-alpha.10) (2021-08-10)


### Features

* add card template tool ([#161](https://github.com/PowerBotKit/powerbot/issues/161)) ([a6c939d](https://github.com/PowerBotKit/powerbot/commit/a6c939d30c3dedc0338534a2948b697063e34ce2))
* add memory-cache ([#160](https://github.com/PowerBotKit/powerbot/issues/160)) ([632e789](https://github.com/PowerBotKit/powerbot/commit/632e789703b1d32cc48e04b205c6b0b4d24eeb6d))
* add pre/post membersadd lifecycle ([#157](https://github.com/PowerBotKit/powerbot/issues/157)) ([f5e1f6b](https://github.com/PowerBotKit/powerbot/commit/f5e1f6b2ee33780693cd6dd5c8a8fb8a0113b590))
* **distributor:** add update card support ([8e9eba4](https://github.com/PowerBotKit/powerbot/commit/8e9eba43d6b5de158f6c67b0fca3f5ed07e9a439))



## [0.0.2-alpha.9](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.8...v0.0.2-alpha.9) (2021-08-06)



## [0.0.2-alpha.8](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.7...v0.0.2-alpha.8) (2021-08-06)


### Bug Fixes

* add hook export ([9d8cc0b](https://github.com/PowerBotKit/powerbot/commit/9d8cc0b15c6461a2e63d601810b74b984dbd505f))
* fix distributor-server interal import path ([6956903](https://github.com/PowerBotKit/powerbot/commit/6956903308824f060528cfaae3c551bbf41be396))



## [0.0.2-alpha.7](https://github.com/PowerBotKit/powerbot/compare/v0.0.2-alpha.6...v0.0.2-alpha.7) (2021-08-06)



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



## [0.0.1-alpha.0](https://github.com/PowerBotKit/powerbot/compare/7e4c5aa2b6bd46d4275e4361847819e776b65302...v0.0.1-alpha.0) (2020-10-13)


### Bug Fixes

* make distributor start successfully ([7e4c5aa](https://github.com/PowerBotKit/powerbot/commit/7e4c5aa2b6bd46d4275e4361847819e776b65302))


### Features

* change to send the whole session to pubsub for consuming ([1cb5ef2](https://github.com/PowerBotKit/powerbot/commit/1cb5ef2d62861af2e30f86257d29c64d8c23fcd3))
* implement the inbound/outbond middleware ([74e8b23](https://github.com/PowerBotKit/powerbot/commit/74e8b2372e3c7c926e189b0b5f8b92f005692f31))
* implement the persist userInfo when onMemberAdded ([58fa82c](https://github.com/PowerBotKit/powerbot/commit/58fa82c430abe89a06731ebbd3213ab1ccc7cfd7))



