import * as R from 'ramda'

const notEmpty = R.complement(R.isEmpty)

const notNil = R.complement(R.isNil)

const notNilOrEmpty = R.complement(R.either(R.isNil, R.isEmpty))

const notEquals = R.curry((a, b) => R.complement(R.equals(a))(b))

const nilOrEmpty = R.either(R.isNil, R.isEmpty)

const mapIndexed = R.addIndex(R.map)

const getYoutubeUrlId = R.cond([
  [R.startsWith('https://youtu'), val => R.slice(-11, Infinity, val)],
  [
    R.startsWith('https://www.youtube'),
    val => R.compose(R.head, e => R.split('&', e[1]), R.split('='))(val)
  ],
  [R.T, val => val]
])

export {
  getYoutubeUrlId,
  mapIndexed,
  nilOrEmpty,
  notEmpty,
  notEquals,
  notNil,
  notNilOrEmpty
}
