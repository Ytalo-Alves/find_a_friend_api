export class OngAlreadyExistsError extends Error {
  constructor() {
    super('Ong is already exits')
  }
}