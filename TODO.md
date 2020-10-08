# TODO List

## 0. Bug

- [x] `ReferenceError: BotServer is not defined` error when run `yarn run start`
- [ ] it looks like outbound is sending the wrong result, refer to `outbound.ts` line 21

## 1. Documentation

- [ ] Add README
- [x] Add TODO
- [x] Add License File

## 2.Code Refractor

- [x] Define the interface for `models` and make model class implement the interface
- [x] Define the interface for `pubsub` and make model class implement the interface
- [x] Define the interface for `cache` and cache model class implement the interface
- [ ] Define the interface for `inbound` and inbound model class implement the interface
- [ ] Define the interface for `outbound` and inbound model class implement the interface
- [ ] Define the API to allow user to add `middleware` in inbound
- [ ] Define the Function to allow user to add `middleware` in outbound
- [ ] Define the Function to allow user to define his own API endpoint and trigger sending message to inbound queue

## 3.Features

- [ ] Implmenet the message lock feature
- [ ] Implmenet the feature to send card in `outbound`
- [ ] Implmenet the feature to update card in `outbound`
- [ ] Implmenet the feature to cancel card in `outbound`
- [ ] Add Unit test for powerbot-distributor

## 3.Sample Project

- [ ] publish the powerbot-distributor to npmjs.com
- [ ] set up a sample project to use powerbot-distributor package
- [ ] Implement different features in sample project to test the features‘s Ease of use
