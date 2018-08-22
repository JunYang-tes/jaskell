import {Just} from '../maybe.mjs'
import {append} from '../applicatives.mjs'
console.log(
  append(Just([1,2,3]))(Just (4))
)
console.log(
  append([[1,2,3]])([4])
)