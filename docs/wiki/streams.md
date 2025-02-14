Last updated: 2025-02-13

# Introduction

This streams library builds upon the existing ES2024 control abstraction objects.

Both the iterator protocol and async iterator protocol require the implementation of a `next` function, which retrieves the next item in the sequence. For each invocation of a function, there are two transfers of control, the function call and the return. For non-async iterators (objects that conform to the iterator protocol, which includes `Generator` instances), the `next()` function call is synchronous (blocking), so the timing is under the control of the client code. Therefore, non-async iterators perform the function of a passive source. For `AsyncGenerator` instances, the function call is asynchronous, therefore the timing of the call under the control of the client code, after which the timing of the return value is under the control of the `AsyncGenerator` instance. For active sources (`Source` instances), the production of one value starts the retrieval of the next value, therefore the client code has no control over the timing. Therefore, `Source` instances perform the function of an active source. All promises returned from calls to `next()` before a value is produced settle simultaneously. Both `AsyncGenerator` instances and `Source` instances are async iterable iterators (conform to both the async iterable and async iterator protocols) and inherit from `AsyncIterator`.

`Generator` instances and `AsyncGenerator` instances cannot be constructed; they can only be created by calling a `GeneratorFunction` instance or an `AsyncGeneratorFunction` instance, respectively. This is because each `Generator` instance and `AsyncGenerator` instance iterates independently, so each could be at a different point in the sequence, as well as possibly iterating over different sequences. For a `Source` instance, all iterations are synchronized, therefore there are no "SourceFunction" instances from which `Source` instances are derived.

`Source` instances can be created from Events. However, a `Source` also specifies whether it has reached the end, while events do not. Therefore, two function are provided along with the source: `complete` & `error`. Calling `complete()` results in a normal completion; calling `error()` results in a throw completion.

Passive sinks are implemented as sink functions. Sink functions are `Function` instances that take a single value and perform the necessary action with it. A `Stream` instance can be created by passing a `Source` instance and a sink function to the `Stream` constructor. Some sink functions do not have state; these can be used on multiple streams. Other sink functions do have state; these functions should be inside closures to prevent the creation of more than one stream with these functions. 'Stream' derives from `Promise` and settles after the last value is handles by the sink function.

Transforms are implemented as transform functions. A transform function is an `AsyncGeneratorFunction` instance that takes an async iterator as an argument. A `Transform` instance can be created by passing a `Source` instance and a transform function to the `Transform` constructor.

An `Outlet` instance can be created by passing a `Source` instance to the `Outlet` constructor. `Outlet` instances conform to the iterator protocol and derive from `Iterator`. They have an internal queue to store items until requested. This is useful for active sinks, as they need to have items available on their own schedule. If `next()` is called and the queue is empty, `{ value: undefined, done: false }` is returned.

An `AsyncOutlet` instance can be created by passing a `Source` instance to the `AsyncOutlet` constructor. `AsyncOutlet` instances conform to the async iterator protocol and derive from `AsyncIterator`. They have an internal queue to store items until requested. This is similar to `Outlet`, except that when `next()` is called and the queue is empty, the promise waits until another item arrives in the queue. This acts similar to `AsyncGenerator` instances, in that it waits for the client code to request a value, but the client code must wait if the value is not yet available.

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

Conforms to the async iterable iterator protocol.

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

## `createSourceFromEvent`
`typeof === "function"`
not << constructable >>

Parameters:
 - target
 - eventName

Return Value:
`typeof === "object"`

Properties:
 - source: `typeof === "object"`; a new Source instance
 - complete: `typeof === "function"`; accepts one optional argument, closes the source with the specified value
 - error: `typeof === "function"`; accepts a reason argument, closes the source with the specified reason
