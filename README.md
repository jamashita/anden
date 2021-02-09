# Anden

This package enables you to use things in one class instance and the same interface.

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Requisite

```
> node -v
v12.0.0
```

### My environment

```
> node -v
v15.5.0

> npm -v
7.3.0

> yarn -v
1.22.20
```

## Classes

### Object

Redefinition class for OOP programming.

#### Objet

Redefinition class for `Object`. Abstract class for standing for `Nominative`.

#### Entity

Class for `Entity` for DDD. Concrete class for `Objet`.

#### ValueObject

Class for `Value object` for DDD. Concrete class for `Objet`.

### Type

Class for type definition.

#### Clone

Clone Object literal, when the object has circular reference, this operation will throw an Error.

#### Equality

Check the equality Object literal, when the object has circular reference, this operation will throw an Error.

#### Function

Function type definitions.

#### Kind

Class for type determination.

#### Value

Value type definitions.

### Errors

#### UUID

Class for UUID.

#### Zeit

Class for Date and Time, using `dayjs`.

## Conventional commit

```
git cz
```

## License

[MIT](LICENSE)
