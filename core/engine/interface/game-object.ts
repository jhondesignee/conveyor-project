import type Identifiable from "#core/engine/interface/base/identifiable"
import type Updatable from "#core/engine/interface/base/updatable"
import type Stateful from "#core/engine/interface/base/stateful"
import type Loadable from "#core/engine/interface/base/loadable"

export default interface GameObject extends Identifiable, Updatable, Stateful, Loadable {}
