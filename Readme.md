
# Transducers

  All of the good JavaScript transducers libraries implement transducers as objects. This is a minimal implementation which just uses functions. Making for a simpler implementation and a nicer API.

## What is a transducer?

  Its a slightly more abstract reducer function. i.e. one which takes an extra parameter. This parameter is the bit of the reducer which combines a new value with the accumulated value.

## What are they good for?

  One advantage of transducers is that they know nothing about the type of the value they are accumulating. So they can be easily specialized to create reducers specific to certain data structures.

  Another advantage is that transducers enable reduction functions to be composed. And this can reduce the need to allocate intermediary data structures when passing data through a pipeline of operations. Which is a performance win.

## Installation

`npm install jkroso/transducers.js`

then in your app:

```js
var transducers = require('transducers')
var compose = transducers.compose
var filter = transducers.filter
var map = transducers.map
```

## API

<!--js
var concat = Function.call.bind([].concat)
-->

### `compose(...)`

  Takes a bunch of transducers and composes them into a new one

```js
compose(map(Number), filter(Boolean))(concat)([], "1") // => [1]
compose(map(Number), filter(Boolean))(concat)([], "0") // => []
```

  `compose` also automatically lifts values out of arrays so you can pass in a mixture of `Function`s and `Array`s of `Function`s and get the same result

```js
compose([map(Number)], filter(Boolean))(concat)([], "0") // => []
```

### `map(fn, combine, result, value)`
