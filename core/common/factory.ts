type Constructable = new (...args: Array<any>) => any
type Args<T extends Constructable> = ConstructorParameters<T>

export interface FactoryInterface<T> {
  getInstance(ID: string, args?: Array<any>): T | never
  getInstances(): Array<T>
}

export default class Factory<Class extends Constructable>
  implements FactoryInterface<InstanceType<Class>>
{
  private readonly _class: Class
  private readonly defaultArgs: Args<Class>
  private readonly instances: Map<string, InstanceType<Class>>

  constructor(_class: Class, defaultArgs: Args<Class>) {
    this._class = _class
    this.defaultArgs = defaultArgs
    this.instances = new Map()
  }

  public getInstance(ID: string, args?: Args<Class>): InstanceType<Class> | never {
    if (this.instances.has(ID)) return this.instances.get(ID)!
    const instance = new this._class(...[...this.defaultArgs, ...(args ? args : [])])
    this.instances.set(ID, instance)
    return instance
  }

  public getInstances(): Array<InstanceType<Class>> {
    return Array.from(this.instances.values())
  }
}
