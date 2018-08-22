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