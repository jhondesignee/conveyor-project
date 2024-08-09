import type GameObject from "#core/engine/interface/game-object"
import type { FactoryInterface } from "#core/common/factory"

export default new Map<string, FactoryInterface<GameObject>>()
