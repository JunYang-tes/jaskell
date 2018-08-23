import {Just,Nothing} from '../maybe.mjs'
import {mapM,filterM,join} from '../monad.mjs'
function conv(c) {
  if(/\d/.test(c)) {
    return Just(c.charCodeAt(0)-48)
  } else {
    return Nothing
  }
}
console.log(
  mapM(conv,Just)("1235")
)
console.log(
  mapM(a=>Just(a+1),Just)([1,2,3])
)

console.log(
  "filteM:",
  filterM(a=> Just(true),Just)([1,2,3])
)

debugger;
console.log(
  filterM(
    x=>[true,false],Array
  )([1,2,3])
)

console.log(
  join([[1,2],[2,3]])
)
console.log(
  join(Just(Just(1)))
)
console.log(
  join(Just(Nothing))
)
console.log(
  join(Nothing)
)