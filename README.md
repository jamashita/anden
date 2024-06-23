# Anden

This package allows you to represent many classes using a unified interface.

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![CI](https://github.com/jamashita/anden/actions/workflows/ci.yml/badge.svg)](https://github.com/jamashita/anden/actions/workflows/ci.yml)

## Install

```text
yarn add @jamashita/anden
```

## Prerequisite

```
> node -v
v20.12.2

> npm -v
10.5.0

> yarn -v
1.22.21
```

## Conventional commit

```
git cz
```

# Error classes

## RuntimeError

A basic error class that extends the built-in `Error` class and can contain other `Error` instances as a property.

```ts
throw new RuntimeError('An error occured.', error);
```

## Errors\<E extends Error = Error\>

This error class can hold multiple `Error` instances at once, and it extends the `RuntimeError` class.

```ts
throw new Errors(new Error('Error 1'), new Error('Error 2'), new Error('Error 3'));
```

## ExhaustiveError

This error class can be used to detect cases that are not handled in a switch. TypeScript will generate an alert when
there is an unhandled case and this error is included in the default clause.

## UnimplementedError

This error class is mainly used to indicate that a method is not yet implemented and it extends the `RuntimeError`
class.

```ts
throw new UnimplementedError('This method is not yet implemented');
````

# Object classes

## Objet

A class that redefines the built-in `Object`.

### `Objet.genHashCode(obj: object): string`

Generates a hash code for the given `obj`. If the object's properties have the same values, this method will return the
same hash code.

### `Objet.identify(n: unknown): string`

Converts the given`n` to string. If `n` has a `toString()` method, the result of calling that method is
returned. Otherwise, the result of `String(n)` is returned.

### (abstract) `Objet.prototype.serialize(): string`

This method is used in `Objet.prototype.toString()` to customize the string representation of an object. It is strongly
recommended to implement this method when extending the `Objet` class.

### `Objet.prototype.equals(other: unknown): boolean`

Compares the hash code of this instance with the hash code of the given `other`, and returns `true` if they are the
same.

### `Objet.prototype.hashCode(): string`

Returns the hash code of this instance. If the properties have the same values, this method must return the same hash
code.

### `Objet.prototype.toString(): string`

Calls and returns the result of the `Objet.prototype.serialize()` method.

## Entity\<I\>

A class for entities in Domain-Driven Design (DDD). It is a concrete class extending the `Objet` class, and `I` is an
identifier class.

### (abstract) `Entity.prototype.getIdentifier(): I`

Returns the identifier of the entity. It is used in the `entity.equals(other: unknown): boolean` method to compare two
entities.

### (override) `Entity.prototype.equals(other: unknown): boolean`

Compares the identifier of this object with the identifier of the given `other`. Returns `true` if they are the same.
This method should not be overridden, as it relies on the correct implementation of
the `Entity.prototype.getIdentifier()` method.

## ValueObject

A class for value objects in Domain-Driven Design (DDD). It is a concrete class extending the `Objet` class.

## Reference

A class to check for circular references in an object.

### `Reference.isCircular(value: unknown): boolean`

Returns `true` if the given `value` has circular references.

# Type classes

### BigIntValidation

Used for methods. If the given value does not meet this requirement, `TypeError` will be thrown.

```ts
class Klazz {
  @Validate()
  public doSomething(@BigIntValidation({
    conditions: [
      {
        operator: '>=',
        value: 3n
      },
      {
        operator: '<=',
        value: 5n
      }
    ]
  }) n1: bigint): void {
    //
  }
}
```

### BooleanValidation

Used for methods. If the given value does not meet this requirement, `TypeError` will be thrown.

```ts
class Klazz {
  @Validate()
  public doSomething(@BooleanValidation() n1: boolean): void {
    //
  }
}
```

### NumberValidation

Used for methods. If the given value does not meet this requirement, `TypeError` will be thrown.

```ts
class Klazz {
  @Validate()
  public doSomething(@NumberValidation({
    conditions: [
      {
        operator: '>=',
        value: 3
      },
      {
        operator: '<=',
        value: 5
      }
    ],
    int: false,
    noNaN: true,
    noInfinity: true
  }) n1: number): void {
    //
  }
}
```

### StringValidation

Used for methods. If the given value does not meet this requirement, `TypeError` will be thrown.

```ts
class Klazz {
  @Validate()
  public doSomething(@StringValidation({
    type: 'length',
    min: 1,
    max: 100
  }) n1: string): void {
    //
  }
}
```

### SymbolValidation

Used for methods. If the given value does not meet this requirement, `TypeError` will be thrown.

```ts
class Klazz {
  @Validate()
  public doSomething(@SymbolValidation() n1: symbol): void {
    //
  }
}
```

A class for creating a deep copy of an object literal. This class does not check whether the given object literal has
circular references or not.

### `Clone.copy<T extends ObjectLiteral>(obj: T): T`

Creates a deep copy of the given object literal.

## (interface) Cloneable<T>

An interface for objects that can be cloned.

### `Cloneable.prototype.duplicate(): T`

Should return a deep copy of itself.

### `isCloneable(n: unknown): n is Cloneable<T>`

Returns `true` if the given `n` has a `duplicate` method.

## Equality

A class for checking the equality of two object literals. This class does not check whether the given object literals
have circular references or not.

### `Equality.same(n1: ObjectLiteral, n2: ObjectLiteral): boolean`

Returns `true` if the two given object literals are the same, `false` otherwise.

## (interface) Equatable

An interface for objects that can be compared for equality.

### `Equatable.prototype.equals(other: unknown): boolean`

Should return `true` if this and the given object are the same, `false` otherwise.

## (interface) JSONifiable\<O extends ObjectLiteral\>

An interface for objects that can be converted to a JSON object.

### `JSONifiable.prototype.toJSON(): O`

Returns the JSON representation of this object.

### `isJSONifiable(n: unknown): n is JSONifiable<O>`

Returns `true` if the given `n` has a `toJSON` method, `false` otherwise.

## Kind

Class for type narrowing.

### `Kind.isArray<T = unknown>(value: unknown): value is Array<T>`

### `Kind.isBigInt(value: unknown): value is BigInt`

### `Kind.isBoolean(value: unknown): value is Boolean`

### `Kind.isClass<T extends Constructor>(instance: unknown, klazz: T): instance is T`

### `Kind.isFunction(value: unknown): value is Function`

### `Kind.isInteger(value: unknown): value is Integer`

### `Kind.isNaN(value: unknown): boolean`

### `Kind.isNone(value: unknown): value is null | undefined | void`

### `Kind.isNull(value: unknown): value is null`

### `Kind.isNumber(value: unknown): value is number`

### `Kind.isNumericalString(value: unknown): value is NumericalString`

### `Kind.isObject<T extends object = object>(value: unknown): value is Vague<T>`

### `Kind.isPrimitive(value: unknown): value is Primitive`

### `Kind.isPromiseLike<T = unknown>(value: unknown): value is PromiseLike<T>`

### `Kind.isString(value: unknown): value is string`

### `Kind.isSymbol(value: unknown): value is symbol`

### `Kind.isSUndefined(value: unknown): value is undefined`

## (interface) Nominative

An interface that extends both `Equatable` and `Serializable` interfaces.

### `Nominative.prototype.hashCode(): string`

Returns a hash code of this instance.

## (interface) Serializable

An interface for objects that can be converted to a string.

### `Serializable.prototype.serialize(): string`

Returns a string representation of this instance.

# ULID class

## ULID

A class for generating and working with ULIDs (Universally Unique Lexicographically Sortable Identifier),
extends `ValueObject`.

### `ULID.generate(): ULID`

Returns a new ULID instance with a randomly generated ULID value.

### `ULID.of(id: string): ULID`

Returns a new ULID instance from the given string. May throw a `ULIDError` if the given `id` is not a valid ULID.

### `ULID.regex(): RegExp`

Returns the regular expression used for validating ULIDs.

### `ULID.size(): number`

Returns the length of a ULID.

### `ULID.validate(str: string): boolean`

Returns `true` if the given string is a valid ULID, `false` otherwise.

### ULIDValidation

Used for methods. If the given value does not meet this requirement, `TypeError` will be thrown.

```ts
class Klazz {
  @Validate()
  public doSomething(@ULIDValidation() n1: string): void {
    //
  }
}
```

# UUID class

## UUID

A class for generating and working with UUIDs (Universally Unique Identifiers), extends `ValueObject`.

### `UUID.of(id: string): UUID`

Returns a new UUID instance from the given string. May throw a `UUIDError` if the given `id` is not a valid UUID.

### `UUID.regex(): RegExp`

Returns the regular expression used for validating UUIDs.

### `UUID.size(): number`

Returns the length of a UUID.

### `UUID.v4(): UUID`

Returns a new v4 UUID instance.

### `UUID.v5(): UUID`

Returns a new v5 UUID instance.

### `UUID.v6(): UUID`

Returns a new v6 UUID instance.

### `UUID.v7(): UUID`

Returns a new v7 UUID instance.

### `UUID.validate(str: string): boolean`

Returns `true` if the given string is a valid UUID, `false` otherwise.

### UUIDValidation

Used for methods. If the given value does not meet this requirement, `TypeError` will be thrown.

```ts
class Klazz {
  @Validate()
  public doSomething(@UUIDValidation() n1: string): void {
    //
  }
}
```

# Zeit class

## Zeit

A class for working with date and time, extends `ValueObject`.

### `Zeit.earliest(zeiten: Iterable<Zeit>): Zeit`

Returns the earliest `Zeit` instance from the given iterable of `Zeit`. May throw `ZeitError` if the given `zeiten` is
empty.

### `Zeit.latest(zeiten: Iterable<Zeit>): Zeit`

Returns the latest `Zeit` instance from the given iterable of `Zeit`. May throw `ZeitError` if the given `zeiten` is
empty.

### `Zeit.now(): Zeit`

Returns the current date and time as a `Zeit` instance.

### `Zeit.of(zeit: dayjs.Dayjs): Zeit`

Returns a new `Zeit` instance from the given `dayjs` instance.

### `Zeit.ofDate(date: Date): Zeit`

Returns a new `Zeit` instance from the given `Date` instance.

### `Zeit.ofString(str: string, format: string): Zeit`

Returns a new `Zeit` instance from the given `str` using the given `format`. May throw `ZeitError` if the given `str`
cannot be parsed using the given format.

### `Zeit.validate(str: string, format: string): boolean`

Returns `true` if the given `str` can be parsed using the given `format`.

### `Zeit.prototype.advance(value: number, unit: ZeitUnitType): Zeit`

Returns a new `Zeit` instance that is `value` `unit` earlier than this instance.

```ts
const zeit1: Zeit = Zeit.ofString('2000-04-02');
const zeit2: Zeit = zeit1.advance(1, 'day')

console.log(zeit2.toString('YYYY-MM-DD'));
// '2000-04-01'
```

### `Zeit.prototype.isAfter(other: Zeit): boolean`

Returns `true` if this instance is after the given `other` `Zeit` instance.

### `Zeit.prototype.isBefore(other: Zeit): boolean`

Returns `true` if this instance is before the given `other` `Zeit` instance.

### `Zeit.prototype.isValid(): boolean`

Returns `true` if this instance represents a valid date and time.

### `Zeit.prototype.postpone(value: number, unit: ZeitUnitType): Zeit`

Returns a new Zeit instance that is `value` `unit` later than this instance.

```ts
const zeit1: Zeit = Zeit.ofString('2000-04-02');
const zeit2: Zeit = zeit1.postpone(1, 'day')

console.log(zeit2.toString('YYYY-MM-DD'));
// '2000-04-03'
```

### (override) `Zeit.prototype.toString(format?: string): boolean`

### ZeitValidation

Used for methods. If the given value does not meet this requirement, `TypeError` will be thrown.

```ts
class Klazz {
  @Validate()
  public doSomething(@ZeitValidation({
    format: 'YYYY-MM-DD'
  }) n1: string): void {
    //
  }
}
```

## License

[MIT](LICENSE)
