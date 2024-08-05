type Constructable = new (...args: Array<any>) => any

export default class Factory<Class extends Constructable> {
  private readonly _class: Class
  private readonly defaultArgs: ConstructorParameters<Class>
  private readonly instances: Map<string, Class>

  constructor(_class: Class, defaultArgs: ConstructorParameters<Class>) {
    this._class = _class
    this.defaultArgs = defaultArgs
    this.instances = new Map()
  }

  public getInstance(ID: string, args?: ConstructorParameters<Class>): Class | never {
    if (this.instances.has(ID)) return this.instances.get(ID)!
    const instance = new this._class(...[...this.defaultArgs, ...(args ? args : [])])
    this.instances.set(ID, instance)
    return instance
  }

  public getInstances(): Array<Class> {
    return Array.from(this.instances.values())
  }
}
