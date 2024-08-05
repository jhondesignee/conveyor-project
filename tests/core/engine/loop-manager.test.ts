import { describe, expect, test, bench } from "vitest"
import LoopManager from "#core/engine/loop-manager"
import type Updatable from "#core/engine/interface/base/updatable"

class Test implements Updatable {
  public updated: boolean = false

  update() {
    this.updated = true
  }
}

describe("Loop manager test", () => {
  test("Objects should be added", () => {
    const test1 = new Test()
    const test2 = new Test()
    const test3 = new Test()
    const loopManager = new LoopManager()

    loopManager.add(test1)
    expect(loopManager.updateObjectList.length).toBe(1)
    loopManager.add(test2)
    expect(loopManager.updateObjectList.length).toBe(2)
    loopManager.add(test3)
    expect(loopManager.updateObjectList.length).toBe(3)
  })
  test("Objects should be updated", () => {
    const test1 = new Test()
    const test2 = new Test()
    const test3 = new Test()
    const loopManager = new LoopManager()

    loopManager.add(test1)
    loopManager.add(test2)
    loopManager.add(test3)
    loopManager.update(performance.now())

    expect(test1.updated).toBeTruthy()
    expect(test2.updated).toBeTruthy()
    expect(test3.updated).toBeTruthy()
  })
})
