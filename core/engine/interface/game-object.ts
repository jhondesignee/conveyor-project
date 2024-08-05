import type EventListener from "#core/engine/interface/base/event-listener"
import type Identifiable from "#core/engine/interface/base/identifiable"
import type Updatable from "#core/engine/interface/base/updatable"
import type Stateful from "#core/engine/interface/base/stateful"

export default interface GameObject extends EventListener, Identifiable, Updatable, Stateful {}
