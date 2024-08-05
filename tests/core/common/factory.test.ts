import { describe, expect, test } from "vitest"
import Factory from "#core/common/factory"

class Test {
  // @ts-expect-error
  private readonly value: number

  constructor(value: number) {
    this.value = value
  }
}

describe("Factory class test", () => {
  test("Factory should be able to store multiple instances", () => {
    const factory = new Factory<typeof Test>(Test, [1])
    expect(factory.getInstances().length).toBe(0)
    factory.getInstance("1")
    factory.getInstance("2")
    expect(factory.getInstances().length).toBe(2)
    factory.getInstance("2")
    expect(factory.getInstances().length).toBe(2)
    factory.getInstance("3")
    expect(factory.getInstances().length).toBe(3)
  })
})
