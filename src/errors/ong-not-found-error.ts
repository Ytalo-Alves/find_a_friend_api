export class OngNotFoundError extends Error {
  constructor() {
    super("Ong not found");
  }
}