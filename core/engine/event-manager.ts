import Manager from "#core/engine/abstract/manager"
import type EventListener from "#core/engine/interface/base/event-listener"
import type { EventPayload } from "#core/engine/interface/base/event-listener"

export default class EventManager extends Manager<EventListener> {
  constructor() {
    super()
  }

  public notify(eventPayload: EventPayload): void {
    for (let [_, obj] of this.objects) {
      if (obj.events.includes(eventPayload.type)) {
        obj.onEvent?.(eventPayload)
      }
    }
  }

  public notifyAll(eventPayload: EventPayload): void {
    for (let [_, obj] of this.objects) {
      obj.onEvent?.(eventPayload)
    }
  }

  public notifySome(IDs: Array<string>, eventPayload: EventPayload): void {
    for (let [ID, obj] of this.objects) {
      if (!IDs.includes(ID)) continue
      obj.onEvent?.(eventPayload)
    }
  }
}
