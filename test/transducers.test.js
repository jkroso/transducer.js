const concat = Function.call.bind([].concat)
const {deepEqual} = require('assert')
const {compose,
       mapcat,
       filter,
       map} = require('..')

const inc = (n) => n + 1
const iseven = (n) => n % 2 === 0
const ones = (n) => {
  var arr = []
  while (n--) arr.push(1)
  return arr
}

it('filter', function(){
  deepEqual(filter(iseven, concat, [], 1), [])
  deepEqual(filter(iseven, concat, [], 2), [2])
})

it('map', function(){
  deepEqual(map(inc, concat, [], 1), [2])
  deepEqual(map(inc, filter(iseven, concat), [], 1), [2])
  deepEqual(map(inc, filter(iseven, concat), [], 2), [])
})

it('mapcat', function(){
  deepEqual(mapcat(ones, concat, [], 3), [1,1,1])
})

it('compose', function(){
  deepEqual(compose(ones)(1), [1])
  deepEqual(compose([ones])(1), [1])
  deepEqual(compose(map(inc))(concat)([], 1), [2])
  deepEqual(compose(map(inc), filter(iseven))(concat)([], 1), [2])
})
