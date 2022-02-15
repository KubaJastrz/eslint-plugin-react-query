#!/bin/sh

set -x

yarn unlink || true

yarn build
yarn link
cd tests/smoke/recommended
yarn link eslint-plugin-react-query
yarn lint
