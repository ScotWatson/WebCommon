Last updated: 2025-02-12

# Introduction

This streams library builds upon the existing ES2024 control abstraction object. 
A transform function is an async generator function that takes an async iterator as an argument. A transform constructor takes a transform function as an argument.

# Content

Dependencies:
 - ES2024

## `Sink`
<< class constructor >>

Creates a Sink instance

Parameters:
 - `handler`: `typeof === "function"`; takes one argument, return value is ignored

Properties:
 - `length`: `1`
 - `name`: `"Sink"`
 - `prototype`: `__Sink__`
 - [[Prototype]]: `__Function__`

## `__Sink__`

Properties:
 - `constructor`: `Sink`
 - `stream`: typeof = "function"; takes a `Source` instance as an argument, returns a `Stream`
 - `[Symbol.toStringTag]`: `"Sink"`
 - [[Prototype]]: `__Promise__`

## `__Stream__`

Properties:
 - `next`: function
 - `return`: function
 - `throw`: function
 - `[Symbol.toStringTag]`: `"Stream"`
 - [[Prototype]]: `__Promise__`


## `Source'
<< class constructor >>

Creates a new Source instance

Parameters:
 - init: `typeof === "function"`
   - next: `typeof === "function"`; takes one argument, resolves next() results with given `value` and `done === false`
   - complete: `typeof === "function"`; takes one argument, resolves next() results with given `value` and `done === true`
   - error: `typeof === "function"`; takes one argument, throws next() results with given reason

Properties:
 - `prototype`: `__Source__`
 - [[Prototype]]: `__Function__`

## `__Source__`

Conforms to the iterable iterator protocol.

Properties:
 - `next`: async function
 - [[prototype]]: `__AsyncIterator__`
