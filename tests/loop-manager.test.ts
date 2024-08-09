import { describe, expect, test } from "vitest"
import LoopManager from "#core/engine/loop-manager"
import type Updatable from "#core/engine/interface/base/updatable"

class Test implements Updatable {
  public updated: boolean = false

  update() {
    this.updated = true
  }
}

describe.concurrent("Loop manager test", () => {
  test("Should update objects", () => {
    const test1 = new Test()
    const test2 = new Test()
    const test3 = new Test()
    const loopManager = new LoopManager()

    loopManager.register("1", test1)
    loopManager.register("2", test2)
    loopManager.register("3", test3)
    loopManager.update(performance.now())

    expect(test1.updated).toBeTruthy()
    expect(test2.updated).toBeTruthy()
    expect(test3.updated).toBeTruthy()
  })
})
