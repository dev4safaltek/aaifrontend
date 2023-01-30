import { StringHelper } from "../../Utilities/contract/string-helper";
import { StorageType, StorageTypes } from "./storage-type.enum";

export class StorageValueHelper {
  private static readonly delimiter = "~:~";


  static create(value: any): string {
    this.throwIsAvailableValueError(value);

    const storageType = this.getType(value);
    const stringValue = this.toString(storageType, value);
    const typedValue = `${storageType.toString()}${this.delimiter}${stringValue}`;
    return typedValue;
  }

  static get(value: string): StorageTypes {
    StringHelper.throwIsAvailableError(value, "value");

    const typeAndValue = value.split(this.delimiter, 2);
    const parsedType = typeAndValue[0] as StorageType;
    const parsedValue = typeAndValue[1];
    const realValue = this.convertStringToValue(parsedType, parsedValue);
    return realValue;
  }

  private static isAvailableValue(value: any): boolean {
    if (typeof value === "string") {
      return StringHelper.isAvailable(value);
    }

    return value !== null;
  }

  private static throwIsAvailableValueError(value: any): void {
    if (!this.isAvailableValue(value)) {
      throw new Error(`The value '${value}' is not available.`);
    }
  }

  private static getType(value: any): StorageType {
    const type = typeof value;
    switch (type) {
      case "boolean":
        return StorageType.BOOLEAN;
      case "number":
        return StorageType.NUMBER;
      case "string":
        return StorageType.STRING;
      default:
        return StorageType.JSON;
    }
  }

  private static toString(type: StorageType, value: any): string {
    return type === StorageType.JSON ? JSON.stringify(value) : value.toString();
  }

  private static convertStringToValue(type: StorageType, value: string): StorageTypes {
    switch (type) {
      case StorageType.BOOLEAN:
        return this.toBoolean(value);
      case StorageType.NUMBER:
        return this.toNumber(value);
      case StorageType.JSON:
        return this.toObject(value);
      case StorageType.STRING:
      default:
        return (value || "").trim();
    }
  }

  private static toBoolean(value: string): boolean {
    return (value || "").trim().toLowerCase() === "true";
  }

  private static toNumber(value: string): number {
    return +value;
  }

  private static toObject(value: string): object {
    return JSON.parse(value);
  }
}
