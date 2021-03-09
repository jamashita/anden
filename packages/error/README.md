# Anden/Error

Error wrapper and its collection.

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![CI](https://github.com/jamashita/anden/actions/workflows/ci.yml/badge.svg)](https://github.com/jamashita/anden/actions/workflows/ci.yml)

## Classes

### `RuntimeError`

Basic error, it is able to contain other `Error` instance.

### `DataSourceError`

(TODO: move this), Error class for data access, extends `RuntimeError`.

### `Errors`

This Error can hold multiple `Error`s at the same time, also extends `RuntimeError`.

### `UnimplementedError`

Mainly used for Mock classes, extends `RuntimeError`.