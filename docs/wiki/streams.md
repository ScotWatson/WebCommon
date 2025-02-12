Last updated: 2025-02-12

# Introduction

This streams library builds upon the existing ES2024 control abstraction object. 
A transform function is an async generator function that takes an async iterator as an argument. A transform constructor takes a transform function as an argument.

# Content

Dependencies:
 - ES2024

## `Source`
<< class constructor >>
`typeof === "function"`

Creates a new Source instance

Parameters:
 - init: `typeof === "function"`
   - next: `typeof === "function"`; takes one argument, resolves next() results with given `value` and `done === false`
   - complete: `typeof === "function"`; takes one argument, resolves next() results with given `value` and `done === true`
   - error: `typeof === "function"`; takes one argument, throws next() results with given reason

Properties:
 - `length`: `1`
 - `name`: `"Source"`
 - `prototype`: `__Source__`
 - [[Prototype]]: `__Function__`

## `__Source__`
`typeof === "object"`

Conforms to the iterable iterator protocol.

Properties:
 - `next`: async function
 - [[prototype]]: `__AsyncIterator__`

## `Sink`
<< class constructor >>
`typeof === "function"`

Creates a Sink instance

Parameters:
 - `handler`: `typeof === "function"`; takes one argument, return value is ignored

Properties:
 - `length`: `1`
 - `name`: `"Sink"`
 - `prototype`: `__Sink__`
 - [[Prototype]]: `__Function__`

## `__Sink__`
`typeof === "object"`

The Sink Prototype

Properties:
 - `constructor`: `Sink`
 - `stream`: typeof = "function"; takes a `Source` instance as an argument, returns a `Stream`
 - `[Symbol.toStringTag]`: `"Sink"`
 - [[Prototype]]: `__Promise__`

## `__Stream__`
`typeof === "object"`

The Stream Prototype

`Stream` instances cannot be created on their own, only through the `stream` function of a `Sink` instance. Therefore, there is no `Stream` constructor available to code.

Properties:
 - `next`: function
 - `return`: function
 - `throw`: function
 - `[Symbol.toStringTag]`: `"Stream"`
 - [[Prototype]]: `__Promise__`
