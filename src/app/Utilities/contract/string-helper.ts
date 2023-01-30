export class StringHelper {
    static isAvailable(value: string): boolean {
      if (!value) {
        return false;
      }
  
      if (value.trim() === "") {
        return false;
      }
  
      return true;
    }
  
    static throwIsAvailableError(value: string, propertyName: string): void {
      if (!this.isAvailable(value)) {
        throw new Error(`The property '${propertyName}' cannot be null, empty, or whitespace.`);
      }
    }
  
    static clean(value: string): string {
      const cleanValue = this.isAvailable(value)
        ? value.trim()
        : "";
  
      return cleanValue;
    }
  
    static removeNonAlphaNumericCharacters(value: string): string {
      if (!this.isAvailable(value)) {
        return "";
      }
  
      // This will also keep underscores.
      // https://stackoverflow.com/a/9364527/2573621
      return value.replace(/\W/g, "");
    }
  
    static replaceAll(value: string, find: string, replace: string): string {
      // https://stackoverflow.com/a/1144788/2573621
      const safeFind = StringHelper.escapeRegExp(find);
      const regEx = new RegExp(safeFind, "g");
      const result = value.replace(regEx, replace);
      return result;
    }
  
    private static escapeRegExp(value: string): string {
      const result = value.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
      return result;
    }
}
  
