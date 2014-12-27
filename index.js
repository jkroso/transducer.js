var concat = Function.call.bind([].concat)
var curry = require('curryable')

function compose(){
  var fns = reduce(arguments, concat, [])
  return function(combine){
    return foldr(fns, invoke, combine)
  }
}

function invoke(fn, argument){ return fn(argument) }

function foldr(array, fn, init){
  var i = array.length
  while (i--) init = fn(array[i], init)
  return init
}

function reduce(array, fn, init){
  for (var i = 0, len = array.length; i < len; i++) {
    init = fn(init, array[i])
  }
  return init
}

var map = curry(function map(fn, combine, result, value){
  return combine(result, fn(value))
})

var filter = curry(function filter(fn, combine, result, value){
  return fn(value) ? combine(result, value) : result
})

var mapcat = curry(function mapcat(fn, combine, result, value){
  return reduce(fn(value), combine, result)
})

exports.compose = compose
exports.filter = filter
exports.mapcat = mapcat
exports.map = map
