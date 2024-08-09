import type Logic from "#core/engine/interface/logic"
import type { FactoryInterface } from "#core/common/factory"
import { describe, expect, test } from "vitest"
import Game from "#core/game"
import Factory from "#core/common/factory"

class Obj implements Logic {
  public state: unknown

  get events(): Array<string> {
    return []
  }
}

const gameLogic: Map<string, FactoryInterface<Logic>> = new Map([
  ["1", new Factory<typeof Obj>(Obj, [])],
  ["2", new Factory<typeof Obj>(Obj, [])],
  ["3", new Factory<typeof Obj>(Obj, [])],
  ["4", new Factory<typeof Obj>(Obj, [])]
])

describe.concurrent("Game class test", () => {
  test("Should enable just selected logics", () => {
    const test = new Game(["1", "2", "5"], gameLogic)

    expect(test.activeLogicList.length).toBe(2)
    expect(test.state.objectList.length).toBe(2)
    expect(test.loop.objectList.length).toBe(2)
    expect(test.event.objectList.length).toBe(2)
  })
  test("Should add and remove logics", () => {
    const test = new Game(["1"], gameLogic)

    test.addLogic("2")

    expect(test.activeLogicList.length).toBe(2)
    expect(test.state.objectList.length).toBe(2)
    expect(test.loop.objectList.length).toBe(2)
    expect(test.event.objectList.length).toBe(2)

    test.removeLogic("1")

    expect(test.activeLogicList.length).toBe(1)
    expect(test.state.objectList.length).toBe(1)
    expect(test.loop.objectList.length).toBe(1)
    expect(test.event.objectList.length).toBe(1)
  })
})
