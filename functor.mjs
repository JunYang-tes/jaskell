import {TypeClass} from './type-class.mjs'
export const functors = new TypeClass(
  'Functor',
  null,
  [{
    // fmap:: Functor f => (a->b) -> f a -> f b
    name:'fmap',
    argc:2,
    instanceIndex:1
  }]
)

export function regFunctor(type,f) {
  functors.instance(
    type,{
      fmap:f
    }
  )
}

export const fmap = functors.$fmap

regFunctor(Array,
  f=>arr=>arr.map(f)
)