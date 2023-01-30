import { Injectable } from "@angular/core";
import { StringHelper } from "../../Utilities/contract/string-helper";
import { StorageTypes } from "./storage-type.enum";
import { StorageValueHelper } from "./storage-value-helper.model";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  put(key: string, value: StorageTypes): void {
    StringHelper.throwIsAvailableError(key, "key");
    const stringValue = StorageValueHelper.create(value);
    window.localStorage.setItem(key, stringValue);
  }

  get<T>(key: string, defaultValue: T): T {
    StringHelper.throwIsAvailableError(key, "key");
    const value = window.localStorage.getItem(key);
    const realValue = StringHelper.isAvailable(value as string) ? StorageValueHelper.get(value as string) : defaultValue;
    return realValue as any;
  }

  delete(key: string = ""): void {
    window.localStorage.removeItem(key);
  }

  clear(): void {
    window.localStorage.clear();
  }

  private isAvailableKey(key: string): boolean {
    const value = window.localStorage.getItem(key);
    return StringHelper.isAvailable(value as string);
  }

  private throwIsAvailableKeyError(key: string): void {
    if (!this.isAvailableKey(key)) {
      throw new Error(`Key '${key}' not found.`);
    }
  }
}
