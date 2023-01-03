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

A basic error class that can contain other `Error` instances. It extends `Error`.

```ts
throw new RuntimeError('AN ERROR OCCURED.', error);
```

## Errors\<E extends Error\>

This error class can hold multiple `Error` instances at once and extends the `RuntimeError`.

```ts
throw new Errors(new Error(), new Error(), new Error());
```

## UnimplementedError

This error class is mainly used for unimplemented methods and extends the `RuntimeError`.

# Object classes

## Objet

A class that redefines the `Object`.

### `Objet.genHashCode(obj: object): string`

Generates a hashcode for the given `obj`. If the object's properties have the same values, this method returns the same
value.

### `Objet.identify(n: unknown): string`

Convert it to a string. If it has `toString()` method, return the result of calling that method. Otherwise,
return `String(n)`.

### (abstract) `objet.equals(other: unknown): boolean`

Returns `true` if this hashcode is the same as the given one.

### (abstract) `objet.serialize(): string`

This method is used in `objet.toString()` to avoid displaying `[object Object]`. It is strongly recommended to implement
this method.

### `objet.hashCode(): string`

Returns its hashcode. If the properties have the same values, this method returns the same hashcode.

### `objet.toString(): string`

Delegates to and returns `objet.serialize(): string`.

## Entity\<I\>

A class for entities in Domain-Driven Design (DDD). It is a concrete class for `Objet` and `I` is an identifier class.

### (abstract) `entity.getIdentifier(): I`

Returns the identifier. It is used in the `entity.equals(other: unknown): boolean`.

### `entity.getIdentifier(): I`

Returns `true` if the identifier of this object is the same as the identifier of `other`. This method should not be
overridden.

## ValueObject

A class for value objects in Domain-Driven Design (DDD). It is a concrete class for `Objet`.

### (abstract) `valueObject.equals(other: unknown): boolean`

Returns `true` if the hashcodes of this object and the given instance are the same.

## Reference

Check if the object has circular reference.

### `Reference.isCircular(value: unknown): boolean`

Returns `true` if `value` has circular references.

# Type classes

### BigIntValidation

Used for methods. If given value violates this rule, `TypeError` will be thrown.

```ts
class Klazz {
  @BigIntValidation({
    conditions: [
      {
        operator: '<=',
        value: 3n
      },
      {
        operator: '>=',
        value: 5n
      }
    ]
  })
  public doSomething(n1: bigint): void {
    //
  }
}
```

### BooleanValidation

Used for methods. If given value violates this rule, `TypeError` will be thrown.

```ts
class Klazz {
  @BooleanValidation()
  public doSomething(n1: boolean): void {
    //
  }
}
```

### NumberValidation

Used for methods. If given value violates this rule, `TypeError` will be thrown.

```ts
class Klazz {
  @NumberValidation({
    conditions: [
      {
        operator: '<=',
        value: 3
      },
      {
        operator: '>=',
        value: 5
      }
    ],
    int: false,
    noNaN: true,
    noInfinity: true
  })
  public doSomething(n1: number): void {
    //
  }
}
```

### StringValidation

Used for methods. If given value violates this rule, `TypeError` will be thrown.

```ts
class Klazz {
  @StringValidation({
    type: 'length',
    min: 1,
    max: 100
  })
  public doSomething(n1: string): void {
    //
  }
}
```

### SymbolValidation

Used for methods. If given value violates this rule, `TypeError` will be thrown.

```ts
class Klazz {
  @SymbolValidation()
  public doSomething(n1: symbol): void {
    //
  }
}
```

## Clone

Clone an object literal. This class does not check whether the given object literal has circular references or not.

### `Copy.copy<T extends ObjectLiteral>(obj: T): T`

Deeply copies given object literal.

## (interface) Cloneable\<T\>

### `cloneable.duplicate(): T`

Should return cloned itself.

### `isCloneable(n: unknown): n is Cloneable<T>`

Returns `true` if `n` has `duplicate` method.

## Equality

Check the equality between object literals. This class does not check whether the given object literal has circular
references or not.

### `Equality.same(n1: ObjectLiteral, n2: ObjectLiteral): boolean`

Returns `true` if given two object literals are the same.

## (interface) Equatable

### `equatable.equals(other: unknown): boolean`

Should return `true` if this and given object are the same.

## (interface) JSONable\<O extends ObjectLiteral\>

### `jsonable.toJSON(): O`

Return the jsonified value of this instance.

### `isJSONable(n: unknown): n is JSONable<O>`

Returns `true` if `n` has `toJSON` method.

## Kind

Class for type narrowing.

### `Kind.isArray<T>(value: unknown): value is Array<T>`

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

This interfaces extends `Equatable` and `Serializable`.

### `nominative.hashCode(): string`

Returns hashcode of this instance.

## (interface) Serializable

An interface for `toString()`.

### `serializable.serialize(): string`

Returns string that describes this instance.

# ULID class

## ULID

Class for ULID, extends `ValueObject`.

### `ULID.generate(): ULID`

Returns ULID instance which has randomly generated ulid value.

### `ULID.of(id: string): ULID`

Returns ULID instance. May throw `ULIDError` when given `id` has malformed ULID.

### `ULID.regex(): RegExp`

Returns regexp of ULID.

### `ULID.size(): number`

Returns ULID length.

### `ULID.validate(str: string): boolean`

Returns `true` if it does not violate ULID format.

### ULIDValidation

Used for methods. If given value violates this rule, `TypeError` will be thrown.

```ts
class Klazz {
  @ULIDValidation()
  public doSomething(n1: string): void {
    //
  }
}
```

# UUID class

## UUID

Class for UUID, extends `ValueObject`.

### `UUID.of(id: string): UUID`

Returns UUID instance. May throw `UUIDError` when given `id` has malformed UUID.

### `UUID.regex(): RegExp`

Returns regexp of UUID.

### `UUID.size(): number`

Returns UUID length.

### `UUID.v4(): UUID`

Returns v4 UUID instance.

### `UUID.v5(): UUID`

Returns v5 UUID instance.

### `UUID.validation(str: string): boolean`

Returns `true` if it does not violate UUID format.

### UUIDValidation

Used for methods. If given value violates this rule, `TypeError` will be thrown.

```ts
class Klazz {
  @UUIDValidation()
  public doSomething(n1: string): void {
    //
  }
}
```

# Zeit class

## Zeit

Class for date and time, extends `ValueObject`.

### `Zeit.max(zeiten: Iterable<Zeit>): Zeit`

Returns the latest `Zeit` instance. May throw `ZeitError` when empty `zeiten` given.

### `Zeit.min(zeiten: Iterable<Zeit>): Zeit`

Returns the earliest `Zeit` instance. May throw `ZeitError` when empty `zeiten` given.

### `Zeit.now(): Zeit`

Returns `Zeit` instance of current date and time.

### `Zeit.of(zeit: dayjs.Dayjs): Zeit`

Returns `Zeit` instance.

### `Zeit.ofDate(date: Date): Zeit`

Returns `Zeit` instance.

### `Zeit.ofString(str: string, format: string): Zeit`

Returns `Zeit` instance. May throw `ZeitError` when given `str` cannot be converted by given `format`.

### `Zeit.validate(str: string, format: string): boolean`

Returns `true` when given `str` can be converted by given `format`.

### `zeit.future(value: Integer, unit: ZeitUnitType): Zeit`

Return `Zeit` instance that is `value` `unit` later this instance.

```ts
const zeit1: Zeit = Zeit.ofString('2000-04-02');
const zeit2: Zeit = zeit1.future(1, 'day')

console.log(zeit2.toString());
// '2000-04-03'
```

### `zeit.isAfter(other: Zeit): boolean`

Returns `true` if this is after than `other`.

### `zeit.isBefore(other: Zeit): boolean`

Returns `true` if this is before than `other`.

### `zeit.isValid(): boolean`

Returns `true` if this is valid date and time.

### `zeit.past(value: Integer, unit: ZeitUnitType): Zeit`

Return `Zeit` instance that is `value` `unit` earlier this instance.

```ts
const zeit1: Zeit = Zeit.ofString('2000-04-02');
const zeit2: Zeit = zeit1.past(1, 'day')

console.log(zeit2.toString());
// '2000-04-01'
```

### (override) `zeit.toString(format?: string): boolean`

### ZeitValidation

Used for methods. If given value violates this rule, `TypeError` will be thrown.

```ts
class Klazz {
  @ZeitValidation({
    format: 'YYYY-MM-DD'
  })
  public doSomething(n1: string): void {
    //
  }
}
```

## License

[MIT](LICENSE)