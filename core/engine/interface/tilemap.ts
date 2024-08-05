import type Stateful from "#core/engine/interface/base/stateful"

export type Coordinates = {
  x: number
  y: number
}

export default interface Tilemap extends Stateful {
  createLayer(name: string): boolean
  getCell(layerName: string, coords: Coordinates): string
  setCell(layerName: string, coords: Coordinates): void
}
