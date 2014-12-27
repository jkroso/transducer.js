var concat = Function.call.bind([].concat)
var assert = require('assert')
var transducers = require('..')
var compose = transducers.compose
var mapcat = transducers.mapcat
var filter = transducers.filter
var map = transducers.map

function inc(n){ return n + 1 }
function iseven(n){ return n % 2 === 0 }
function ones(n){
  var arr = []
  while (n--) arr.push(1)
  return arr
}

it('filter', function(){
  assert.deepEqual(filter(iseven, concat, [], 1), [])
  assert.deepEqual(filter(iseven, concat, [], 2), [2])
})

it('map', function(){
  assert.deepEqual(map(inc, concat, [], 1), [2])
  assert.deepEqual(map(inc, filter(iseven, concat), [], 1), [2])
  assert.deepEqual(map(inc, filter(iseven, concat), [], 2), [])
})

it('mapcat', function(){
  assert.deepEqual(mapcat(ones, concat, [], 3), [1,1,1])
})

it('compose', function(){
  assert.deepEqual(compose(ones)(1), [1])
  assert.deepEqual(compose([ones])(1), [1])
  assert.deepEqual(compose(map(inc))(concat)([], 1), [2])
  assert.deepEqual(compose(map(inc), filter(iseven))(concat)([], 1), [2])
})
