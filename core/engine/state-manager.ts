import Manager from "#core/engine/abstract/manager"
import type Stateful from "#core/engine/interface/base/stateful"

export default class StateManager extends Manager<Stateful> {
  constructor() {
    super()
  }

  public getState(ID: string): unknown | undefined {
    return this.objects.get(ID)?.state
  }

  public setState(ID: string, state: unknown): void {
    const obj = this.objects.get(ID)
    if (obj) obj.state = state
  }

  public hasState(ID: string): boolean {
    return this.objects.has(ID)
  }
}
