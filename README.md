# cyzapi
Cyza API server

[![Build Status](https://travis-ci.com/longseespace/cyzapi.svg?token=ioZMy7XfKUmK8xJ78t5L&branch=master)](https://travis-ci.com/longseespace/cyzapi)
[![npm](https://img.shields.io/npm/v/npm.svg?maxAge=2592000)](https://www.npmjs.com/package/cyzapi)

## Installation
1. `git clone git@github.com:longseespace/cyzapi.git`
2. `cd cyzapi`
3. `npm install`
4. `export MONGO_STORE_URI=<mongodb_uri>`  
   `export MONGO_STORE_SECRET=<victoria_secret>`  
   `export AUTH_SECRET=<victoria_secret>`  

## Development
* `npm start`

## Build
* Production Build: `npm run build`
* Development Build (with source maps): `npm run build:dev`

## Lint
* `npm run lint`

## Debug
* `npm install -g node-inspector`
* `npm run debug`

## Test
* `npm run test`
