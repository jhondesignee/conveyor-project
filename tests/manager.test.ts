import { describe, expect, test } from "vitest"
import Manager from "#core/engine/abstract/manager"

class Obj {}

class Test extends Manager<Obj> {
  constructor() {
    super()
  }
}

describe("Manager base class test", () => {
  test("Should be able to register objects", () => {
    const test = new Test()
    const obj = new Obj()

    expect(test.register("1", obj)).toBeTruthy()
    expect(test.objectList.length).toBe(1)

    expect(test.register("1", obj)).toBeFalsy()
    expect(test.objectList.length).toBe(1)

    expect(test.register("2", obj)).toBeTruthy()
    expect(test.objectList.length).toBe(2)

    expect(test.register("3", obj)).toBeTruthy()
    expect(test.objectList.length).toBe(3)
  })
  test("Should be able to remove objects", () => {
    const test = new Test()
    const obj = new Obj()

    test.register("1", obj)
    test.register("2", obj)
    test.register("3", obj)

    expect(test.objectList.length).toBe(3)
    expect(test.unregister("1")).toBeTruthy()

    expect(test.objectList.length).toBe(2)
    expect(test.unregister("1")).toBeFalsy()

    expect(test.objectList.length).toBe(2)
    expect(test.unregister("2")).toBeTruthy()

    expect(test.objectList.length).toBe(1)
    expect(test.unregister("3")).toBeTruthy()

    expect(test.objectList.length).toBe(0)
    expect(test.unregister("4")).toBeFalsy()
  })
})
