# Transducer

There are already a bunch of transducer implementations but they are all implemented with the [transformer-protocol](https://github.com/cognitect-labs/transducers-js#transformer-protocol) which isn't very nice to use. It could be improved by renaming the "@@transducer/step" method to "call" but for now I'm just going to do away with the whole thing.

## What is a transducer?

Its a slightly more abstract reducer function. i.e. it takes an extra parameter. This parameter is the bit of the reducer which combines a new value with the accumulated value. This is what the `map` reducer looks like:

```js
const map = (fn, combine, result, value) => combine(result, fn(value))
```

## What are they good for?

One advantage of transducers is that they know nothing about the type of the value they are accumulating. So they can be easily specialized to create reducers specific to certain data structures.

Another advantage is that transducers enable reduction functions to be composed. And this can reduce the need to allocate intermediary data structures when passing data through a pipeline of operations. Which is a performance win.

## Installation

`npm install transducer`

then in your app:

```js
const {compose,filter,map} = require('transducer')
```

## API

### `compose(...)`

Takes a bunch of transducers and composes them into a new one

```js
const concat = Function.call.bind([].concat)
compose(map(Number), filter(Boolean))(concat)([], "1") // => [1]
compose(map(Number), filter(Boolean))(concat)([], "0") // => []
```

`compose` also automatically lifts values out of arrays so you can pass in a mixture of `Function`s and `Array`s of `Function`s and get the same result

```js
compose([map(Number)], filter(Boolean))(concat)([], "0") // => []
```

### `map(fn, combine, result, value)`

```js
map(x => x + 1, concat, [], 1) // => [2]
```
