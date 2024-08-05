export default interface Identifiable {
  get ID(): string
  get UID(): string | undefined
}
