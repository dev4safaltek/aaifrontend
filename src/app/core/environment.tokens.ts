import { InjectionToken, Type } from "@angular/core";
import { environment } from "../../environments/environment"; // angular will choose the right environment file.


// Helpers
interface InjectionTokenConfig {
  provideIn?: "root" | Type<any>;
  factory(): any;
}

const provideValue = (value: any, provideIn: "root" | Type<any> = "root"): InjectionTokenConfig => {
  return {
    provideIn,
    factory: () => value,
  };
};


// Injection Tokens
export const BASE_API_URL = new InjectionToken("Base url for the Web.API based on the environment.", provideValue(environment.ICC_API));
