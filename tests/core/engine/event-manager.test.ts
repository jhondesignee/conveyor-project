import { describe, expect, test } from "vitest"
import EventManager from "#core/engine/event-manager"
import type EventListener from "#core/engine/interface/base/event-listener"
import type { EventPayload } from "#core/engine/interface/base/event-listener"

class Test implements EventListener {
  public received: boolean = false
  public correctType: boolean = false
  public data: number = 0
  private readonly _events: Array<string>

  constructor(events?: Array<string>) {
    this._events = events || ["foo"]
  }

  get events(): Array<string> {
    return this._events
  }

  onEvent({ type, data }: EventPayload) {
    this.received = true
    if (this.events.includes(type)) {
      this.correctType = true
    }
    if ("value" in data && typeof data["value"] === "number") {
      this.data = data["value"]
    }
  }
}

describe.concurrent("Event manager test", () => {
  test("Should notify only interested objects", () => {
    const test1 = new Test(["event1"])
    const test2 = new Test(["event2"])
    const test3 = new Test(["event1", "event2"])
    const test4 = new Test(["event1", "event3"])
    const eventManager = new EventManager()

    eventManager.register("1", test1)
    eventManager.register("2", test2)
    eventManager.register("3", test3)
    eventManager.register("4", test4)

    eventManager.notify({ type: "event2", data: {} })

    expect(test1.received).toBeFalsy()
    expect(test2.received).toBeTruthy()
    expect(test3.received).toBeTruthy()
    expect(test4.received).toBeFalsy()
  })
  test("Should notify all the objects, regardless of their interests", () => {
    const test1 = new Test(["event1"])
    const test2 = new Test(["event2"])
    const test3 = new Test(["event1", "event2"])
    const test4 = new Test(["event1", "event3"])
    const eventManager = new EventManager()

    eventManager.register("1", test1)
    eventManager.register("2", test2)
    eventManager.register("3", test3)
    eventManager.register("4", test4)

    eventManager.notifyAll({ type: "event3", data: {} })

    expect(test1.received).toBeTruthy()
    expect(test2.received).toBeTruthy()
    expect(test3.received).toBeTruthy()
    expect(test4.received).toBeTruthy()

    expect(test1.correctType).toBeFalsy()
    expect(test2.correctType).toBeFalsy()
    expect(test3.correctType).toBeFalsy()
    expect(test4.correctType).toBeTruthy()
  })
  test("Should notify some objects by ID, regardless of their interests", () => {
    const test1 = new Test(["event1"])
    const test2 = new Test(["event2"])
    const test3 = new Test(["event1", "event2"])
    const test4 = new Test(["event1", "event3"])
    const eventManager = new EventManager()

    eventManager.register("1", test1)
    eventManager.register("2", test2)
    eventManager.register("3", test3)
    eventManager.register("4", test4)

    eventManager.notifySome(["1", "2", "4"], { type: "event1", data: {} })

    expect(test1.received).toBeTruthy()
    expect(test2.received).toBeTruthy()
    expect(test3.received).toBeFalsy()
    expect(test4.received).toBeTruthy()

    expect(test1.correctType).toBeTruthy()
    expect(test2.correctType).toBeFalsy()
    expect(test3.correctType).toBeFalsy()
    expect(test4.correctType).toBeTruthy()
  })
  test("Should deliver the data to objects", () => {
    const test = new Test(["event"])
    const eventManager = new EventManager()

    eventManager.register("1", test)

    eventManager.notify({ type: "event", data: { value: 1 } })
    expect(test.data).toBe(1)
    eventManager.notifyAll({ type: "event", data: { value: 2 } })
    expect(test.data).toBe(2)
    eventManager.notifySome(["1"], { type: "event", data: { value: 3 } })
    expect(test.data).toBe(3)
  })
})
