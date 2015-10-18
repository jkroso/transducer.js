const flatten = require('arr-flatten')
const curry = require('curryable')

const invoke = (fn, value) => fn(value)

const foldr = (array, fn, init) => {
  var i = array.length
  while (i--) init = fn(array[i], init)
  return init
}

const foldl = (array, fn, init) => {
  for (var i = 0, len = array.length; i < len; i++) {
    init = fn(init, array[i])
  }
  return init
}

export const compose = (...args) => {
  const fns = flatten(args)
  return combine => foldr(fns, invoke, combine)
}

export const map = curry(function map(fn, combine, result, value){
  return combine(result, fn(value))
})

export const filter = curry(function filter(fn, combine, result, value){
  return fn(value) ? combine(result, value) : result
})

export const mapcat = curry(function mapcat(fn, combine, result, value){
  return foldl(fn(value), combine, result)
})
