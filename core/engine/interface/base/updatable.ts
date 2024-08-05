export type Time = {
  delta: number
  current: number
}

export default interface Updatable {
  update?(time: Time): void
}
