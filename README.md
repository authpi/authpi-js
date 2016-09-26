# AuthPI in JavaScript
Simple authentication API server

[![Build Status](https://travis-ci.org/authpi/authpi-js.svg?branch=master)](https://travis-ci.org/authpi/authpi-js)

## Installation
1. `git clone git@github.com:authpi/authpi-js.git`
2. `cd authpi-js`
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
* `npm test`
