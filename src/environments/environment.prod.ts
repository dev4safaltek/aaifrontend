export const environment = {
  production: true,
  //--------Live----------------//
  //--------Staging--------------//
 // ICC_API :'https://',
  defaultPageSize:5,
  defaultshowTotalPages:3,
  pageSizeList:[5,10,25,50],
  defaultExportSize:10000,
  //-------Live-----------------//
   //imageUrl:"http://",
  //-------Staging---------------//
  // imageUrl:"https://",
  AUTHENTICATION_KEY : "authentication",
  baseSignalrMessage :"https://ms.stagingsdei.com:4015/message",
  baseSignalrNotification :"https://ms.stagingsdei.com:4015/notification",
  footeryear: new Date().getFullYear(),
  footerText:"© 2023 AAI",
};
