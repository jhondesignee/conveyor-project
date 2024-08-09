import type Updatable from "#core/engine/interface/base/updatable"
import type Stateful from "#core/engine/interface/base/stateful"
import type Loadable from "#core/engine/interface/base/loadable"

export default interface GameObject extends Updatable, Stateful, Loadable {}
