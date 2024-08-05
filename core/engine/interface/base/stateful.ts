export default interface Stateful {
  get state(): unknown
  set state(state: unknown)
}
