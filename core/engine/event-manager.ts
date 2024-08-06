import type EventListener from "#core/engine/interface/base/event-listener"
import type { EventPayload } from "#core/engine/interface/base/event-listener"

export default class EventManager {
  private readonly eventObjects: Map<string, EventListener> = new Map()

  get objectList(): Array<EventListener> {
    return Array.from(this.eventObjects.values())
  }

  public register(ID: string, obj: EventListener): boolean {
    if (this.eventObjects.has(ID)) return false
    this.eventObjects.set(ID, obj)
    return true
  }

  public unregister(ID: string): boolean {
    return this.eventObjects.delete(ID)
  }

  public notify(eventPayload: EventPayload): void {
    for (let [_, obj] of this.eventObjects) {
      if (obj.events.includes(eventPayload.type)) {
        obj.onEvent?.(eventPayload)
      }
    }
  }

  public notifyAll(eventPayload: EventPayload): void {
    for (let [_, obj] of this.eventObjects) {
      obj.onEvent?.(eventPayload)
    }
  }

  public notifySome(IDs: Array<string>, eventPayload: EventPayload): void {
    for (let [ID, obj] of this.eventObjects) {
      if (!IDs.includes(ID)) continue
      obj.onEvent?.(eventPayload)
    }
  }
}
