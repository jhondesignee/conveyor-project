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

describe("State manager class test", () => {
  test("Objects should be registered", () => {
    const test1 = new Test({ value: 1 })
    const test2 = new Test({ value: 2 })
    const test3 = new Test({ value: 3 })
    const test4 = new Test({ value: 4 })
    const stateManager = new StateManager()

    expect(stateManager.register("1", test1)).toBeTruthy()
    expect(stateManager.stateObjectList.length).toBe(1)

    expect(stateManager.register("2", test2)).toBeTruthy()
    expect(stateManager.register("2", test4)).toBeFalsy()
    expect(stateManager.stateObjectList.length).toBe(2)

    expect(stateManager.register("3", test3)).toBeTruthy()
    expect(stateManager.stateObjectList.length).toBe(3)
  })
  test("State of object should be get and set by ID", () => {
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
  test("Object should be able to be removed", () => {
    const test1 = new Test({ value: 0 })
    const test2 = new Test({ value: 0 })
    const test3 = new Test({ value: 0 })
    const stateManager = new StateManager()

    stateManager.register("1", test1)
    stateManager.register("2", test2)
    stateManager.register("3", test3)

    expect(stateManager.stateObjectList.length).toBe(3)
    expect(stateManager.unregister("1")).toBeTruthy()
    expect(stateManager.hasState("1")).toBeFalsy()

    expect(stateManager.unregister("4")).toBeFalsy()

    expect(stateManager.stateObjectList.length).toBe(2)
    expect(stateManager.unregister("2")).toBeTruthy()
    expect(stateManager.hasState("2")).toBeFalsy()

    expect(stateManager.stateObjectList.length).toBe(1)
    expect(stateManager.unregister("3")).toBeTruthy()
    expect(stateManager.hasState("3")).toBeFalsy()
  })
})
