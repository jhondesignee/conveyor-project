import type Logic from "#core/engine/interface/logic"
import type { FactoryInterface } from "#core/common/factory"
import logicMap from "#core/logics/index"
import StateManager from "#core/engine/state-manager"
import LoopManager from "#core/engine/loop-manager"
import EventManager from "#core/engine/event-manager"

export default class Game {
  public readonly state = new StateManager()
  public readonly loop = new LoopManager()
  public readonly event = new EventManager()
  private readonly logics: Map<string, { instance: Logic; enabled: boolean }> = new Map()
  private readonly logicMap: Map<string, FactoryInterface<Logic>>

  constructor(gameLogics: Array<string>, customLogicMap?: typeof this.logicMap) {
    this.logicMap = customLogicMap || logicMap
    for (let gameLogic of gameLogics) {
      this.addLogic(gameLogic)
    }
  }

  get activeLogicList(): Array<Logic> {
    return Array.from(this.logics.values(), i => i.instance)
  }

  // this method will be removed and a new load manager will be added
  public async load(): Promise<void> {
    for (let [_, { instance }] of this.logics) {
      await instance.load?.()
    }
  }

  public addLogic(gameLogic: string, enabled: boolean = true): boolean {
    const logic = this.logicMap.get(gameLogic)
    if (logic) {
      const logicInstance = logic.getInstance(gameLogic)
      this.registerInManagers(gameLogic, logicInstance)
      this.logics.set(gameLogic, { instance: logicInstance, enabled })
      return true
    }
    return false
  }

  public removeLogic(gameLogic: string): boolean {
    this.unregisterInManagers(gameLogic)
    return this.logics.delete(gameLogic)
  }

  // pause system will be implemented in the manager base class
  /* public pauseLogic(): void {}
  public resumeLogic(): void {} */

  private registerInManagers(ID: string, instance: Logic): void {
    this.loop.register(ID, instance)
    this.state.register(ID, instance)
    this.event.register(ID, instance)
  }

  private unregisterInManagers(ID: string): void {
    this.loop.unregister(ID)
    this.state.unregister(ID)
    this.event.unregister(ID)
  }
}
