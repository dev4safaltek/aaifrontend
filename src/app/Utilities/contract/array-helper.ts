export class ArrayHelper {
    static isAvailable(value: any[]): boolean {
      if (!Array.isArray(value)) {
        return false;
      }
  
      return value.length > 0;
    }
    static throwIsAvailableError(value: any[], propertyName: string): void {
      if (!this.isAvailable(value)) {
        throw new Error(`The property '${propertyName}' cannot be null or empty.`);
      }
    }
  }
