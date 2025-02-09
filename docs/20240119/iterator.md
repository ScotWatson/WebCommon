## `GeneratorFunction`
<< constructor >>, << callable >>

Per ECMAScript 27.3.1 (The GeneratorFunction Constructor, %GeneratorFunction%)

Parameters: ...parameterArgs, bodyArg

Properties:
 - `length`: `1`
 - `name`: `"GeneratorFunction"`
 - `prototype`: `__GeneratorFunction__`
 - [[Prototype]]: `Function.prototype`

## `__GeneratorFunction__`
NOTE: not << callable >>

Per ECMAScript 27.3.3 (The GeneratorFunction Prototype Object, %GeneratorFunction.prototype%)

Properties:
 - `constructor`: `GeneratorFunction`
 - `prototype`: `__Generator__`
 - `[Symbol.toStringTag]`: `"GeneratorFunction"`
 - [[Prototype]]: `Function.prototype`

## `__Generator__`
Per ECMAScript 27.5.1 (The Generator Prototype Object, %GeneratorFunction.prototype.prototype%)

Properties:
 - `constructor`: `__GeneratorFunction__`
 - `next`: function
 - `return`: function
 - `throw`: function
 - `[Symbol.toStringTag]`: `"Generator"`
 - [[Prototype]]: `__Iterator__`

## __Iterator__
Per ECMAScript 27.1.2 (The Iterator Prototype Object, %IteratorPrototype%)

Properties:
 - `[Symbol.iterator]`: function

## AsyncGeneratorFunction
<<constructor>>, <<callable>>
Per ECMAScript 27.4.1 (The AsyncGeneratorFunction Constructor, %AsyncGeneratorFunction%)

## __AsyncGeneratorFunction__
Per ECMAScript 27.4.3 (The AsyncGeneratorFunction Prototype Object, %AsyncGeneratorFunction.prototype%)

## __AsyncGenerator__
Per ECMAScript 27.6.1 (The AsyncGenerator Prototype Object, %AsyncGeneratorFunction.prototype.prototype%)

## __AsyncIterator__
Per ECMAScript 27.1.3 (The AsyncIterator Prototype Object, %AsyncIteratorPrototype%)
