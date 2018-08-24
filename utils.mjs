export class Instance {
  constructor() {
    this.map = new Map()
  }
  instance(type,methods) {
    this.map.set(type.prototype,methods)
  }
  find(object) {
    let proto = Object.getPrototypeOf(object)
    let methods = this.map.get(proto)
    while(!methods && proto){
      proto = Object.getPrototypeOf(proto)
      methods = this.map.get(proto)
    }
    return methods
  }
  findByType(type) {
    let methods = this.map.get(type.prototype)
    if(methods) {
      return methods
    }
    return this.find(type.prototype)
  }
}

export const curray=(fn)=>currayN(fn,fn.length)
export const currayN=(fn,n)=>{
  let callfn = (...args)=>{
    if(args.length>=n) {
      return fn(...args)
    }
    let next = (...a)=>{
      let newArgs = [
        ...args,...a
      ]
      if(newArgs.length>=n) {
        return fn(...newArgs)
      }else {
        return callfn(...newArgs)
      }
    }
    next.isCurried = true
    return next
  }
  callfn.isCurried = true
  return callfn
}
export function call(fn,...args) {
  if(fn.isCurried || fn.length>1) {
    return fn(...args)
  } else {
    let [fst,...rest] = args
    let next = fn(fst)
    while(typeof next === 'function' && rest.length) {
      next=next(rest.shift())
    }
    return next
  }
}