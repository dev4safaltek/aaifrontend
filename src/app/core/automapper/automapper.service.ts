import { Injectable } from "@angular/core";
import { ArrayHelper } from "../../Utilities/contract/array-helper";
import { StringHelper } from "../../Utilities/contract/string-helper";
import { Dictionary } from "../../Utilities/dictionary";
import { IAutoMapper, IMapper } from "./interfaces";
import { Mapper } from "./mapper";
// import { STRING_TO_CLASS_DICTIONARY } from "./string-to-class.token";

@Injectable({
  providedIn: "root",
})
export class AutomapperService implements IAutoMapper {
  private maps: Dictionary<IMapper> = new Dictionary();

  constructor(
    // @Inject(STRING_TO_CLASS_DICTIONARY) private readonly StringToClass: Dictionary<Type<any>>
  ) { }

  createMap(from: string, to: string): IMapper {
    StringHelper.throwIsAvailableError(from, "from");
    StringHelper.throwIsAvailableError(to, "to");
    this.throwMissingInDictionaryError(to);

    const key = this.createKey(from, to);
    this.maps.add(key, new Mapper());

    return this.maps.get(key);
  }

  map(from: string, to: string, item: object): any {
    const key = this.createKey(from, to);
    const map = this.maps.get(key);

    const mappedProperties = Object
      .keys(map.mappings)
      .reduce(this.assignProperty(map.mappings, item), {});

    // const ctor = this.StringToClass.get(to);
    const result = "";// new ctor(mappedProperties);
    return result;
  }

  mapMany(from: string, to: string, items: any[]): any[] {
    if (!ArrayHelper.isAvailable(items)) {
      return [];
    }

    const results = items.map(item => this.map(from, to, item));
    return results;
  }

  curry(from: string, to: string): (items: any) => any {
    return (item: any) => {
      return this.map(from, to, item);
    };
  }

  curryMany(from: string, to: string): (items: any[]) => any[] {
    return (items: any[]) => {
      return this.mapMany(from, to, items);
    };
  }

  private createKey(from: string, to: string): string {
    const cleanFrom = StringHelper.clean(from);
    const cleanTo = StringHelper.clean(to);
    const delimeter = "[]";
    const key = `${cleanFrom}${delimeter}${cleanTo}`;
    return key;
  }

  private assignProperty(mappings: object, item: object): any {
    return (newObject, key) => {
      if (mappings.hasOwnProperty(key)) {
        newObject[key] = mappings[key](item);
      }

      return newObject;
    };
  }

  private throwMissingInDictionaryError(to: string): void {
    // if (!this.StringToClass.has(to)) {
    //   throw new Error(`The string '${to}' has not been added to the 'StringToClass' dictionary.`);
    // }
  }
}
