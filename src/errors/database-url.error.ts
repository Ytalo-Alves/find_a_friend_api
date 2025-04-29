export class DatabaseUrlError extends Error {
  constructor() {
    super("Database URL is not defined");
  }
}