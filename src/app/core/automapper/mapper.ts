import { IMapper } from "./interfaces";

export class Mapper implements IMapper {
  readonly mappings = {};

  forMember(property: any, data: any): IMapper {
    this.mappings[property] = value => {
      return data(value);
    };

    return this;
  }
}
