export interface IDictionary<T> {
  get(key: string): T;
  add(key: string, value: T): void;
  has(key: string): boolean;
}

export class Dictionary<T> implements IDictionary<T> {
  get(key: string): T {
    if (!this.has(key)) {
      throw new Error(`They key '${key}' does not exist.`);
    }

    return this[key];
  }

  add(key: string, value: T): void {
    if (this.has(key)) {
      throw new Error(`The key '${key}' already exists. Did you mean to use the method 'put'.`);
    }

    this[key] = value;
  }

  put(key: string, value: T): void {
    throw new Error("No Implementation");
  }

  has(key: string): boolean {
    const value = this[key];
    return value !== undefined;
  }
}
