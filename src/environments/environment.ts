// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  ICC_API :'https://localhost:7237/api/',
  //ICC_API : 'https://',
  defaultPageSize:5,
  defaultshowTotalPages:3,
  pageSizeList:[5,10,25,50],
  defaultExportSize:10000,
   imageUrl:"https://localhost:7237/",
 // imageUrl:"https://",
  AUTHENTICATION_KEY : "authentication",
  baseSignalrMessage :"https://localhost:7237/message",
  baseSignalrNotification :"https://localhost:7237/notification",
  footeryear: new Date().getFullYear(),
  footerText:"© 2023 AAI",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
