import { describe, expect, test } from "vitest"
import StateManager from "#core/engine/state-manager"
import type Stateful from "#core/engine/interface/base/stateful"

class Test implements Stateful {
  private _state: { value: number }

  constructor(state: typeof this._state) {
    this._state = state
  }

  get state(): typeof this._state {
    return this._state
  }

  set state(state: typeof this._state) {
    this._state = state
  }
}

describe.concurrent("State manager test", () => {
  test("Object state should be get and set by ID", () => {
    const test1 = new Test({ value: 0 })
    const test2 = new Test({ value: 0 })
    const test3 = new Test({ value: 0 })
    const stateManager = new StateManager()

    stateManager.register("1", test1)
    stateManager.register("2", test2)
    stateManager.register("3", test3)

    stateManager.setState("1", { value: 1 })
    stateManager.setState("2", { value: 2 })
    stateManager.setState("3", { value: 3 })

    expect(stateManager.getState("1")).toStrictEqual({ value: 1 })
    expect(stateManager.getState("2")).toStrictEqual({ value: 2 })
    expect(stateManager.getState("3")).toStrictEqual({ value: 3 })
  })
})
