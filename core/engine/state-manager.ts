import type Stateful from "#core/engine/interface/base/stateful"

export default class StateManager {
  private readonly stateObjects: Map<string, Stateful> = new Map()

  get stateObjectList(): Array<Stateful> {
    return Array.from(this.stateObjects.values())
  }

  public register(ID: string, statefulObject: Stateful): boolean {
    if (this.stateObjects.has(ID)) return false
    this.stateObjects.set(ID, statefulObject)
    return true
  }

  public unregister(ID: string): boolean {
    return this.stateObjects.delete(ID)
  }

  public getState(ID: string): unknown | undefined {
    return this.stateObjects.get(ID)?.state
  }

  public setState(ID: string, state: unknown): void {
    const obj = this.stateObjects.get(ID)
    if (obj) obj.state = state
  }

  public hasState(ID: string): boolean {
    return this.stateObjects.has(ID)
  }
}
