# Anden

This package enables you to use things in one class instance and the same interface.

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![CI](https://github.com/jamashita/anden/actions/workflows/ci.yml/badge.svg?branch=develop)](https://github.com/jamashita/anden/actions/workflows/ci.yml)

## Requisite

```
> node -v
v18.0.0

> npm -v
8.6.0

> yarn -v
1.22.18
```

## Conventional commit

```
git cz
```

# Error classes

## RuntimeError

Basic error, it is able to contain other `Error` instance.

## Errors

This Error can hold multiple `Errors` at the same time, also extends `RuntimeError`.

## UnimplementedError

Mainly used for Mock classes, extends `RuntimeError`.

# Object classes

## Objet

Redefinition class for Object.

## Entity

Class for Entity for DDD. Concrete class for `Objet`.

## ValueObject

Class for Value Object of DDD. Concrete class for `Objet`.

## Reference

Check if the object has circular reference.

# Type classes

## Clone

Clone Object literal. This class does not check whether the given Object literal has circular references or not.

## Equality

Check the equality between Object literals. This class does not check whether the given Object literal has circular
references or not.

## Kind

Class for type narrowing.

# ULID class

## ULID

Class for ULID, extends `ValueObject`.

# UUID class

## UUID

Class for UUID, extends `ValueObject`.

# Zeit class

## Zeit

Class for date and time, extends `ValueObject`.

## License

[MIT](LICENSE)