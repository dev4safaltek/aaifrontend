export type Action<T> = (value: T) => void;

export interface IMapper {
  mappings: any;
  forMember(prop: string, action: any | Action<any>): IMapper;
}

export interface IAutoMapper {
  createMap(from: string, to: string): IMapper;
  map(from: string, to: string, item: object): any;
  mapMany(from: string, to: string, items: object[]): any[];
  curry(from: string, to: string): (items: any) => any ;
  curryMany(from: string, to: string): (items: any[]) => any[];
}
