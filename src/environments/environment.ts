// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiCCFN: 'http://apiccfntest.ccfnweb.com.mx/api', 
  // apiRetiros: 'http://192.168.101.103:9000/api',
 // apiRetiros: 'http://192.168.0.10:8891/api',
  apiRetiros: 'http://apisap.ccfn.com.mx:85/api',
  apiRetirosP: 'http://192.168.0.10:8891/api',
  // apiCCFN: 'http://localhost:5004/api',
  // apiSAP: 'http://192.168.0.10:8889/api',
  // apiSAPpruebas: 'http://192.168.0.10:8889/api',
  apiSAP: 'http://192.168.0.32:8886/api',
  // apiSAP: 'http://192.168.101.103:9000/api,
  // api: 'https://portal.profuels.mx/befashion/api/',
  api: 'https://rutaspruebas.herokuapp.com/api',
  apiCobranza: 'http://localhost:5005/api'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
