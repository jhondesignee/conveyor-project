export default interface Loadable {
  load?(): Promise<void>
}
