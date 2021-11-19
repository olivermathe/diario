// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import pck from '../../package.json';

export const environment = {
  version: pck.version,
  production: false,
  firebase: {
    apiKey: "AIzaSyBfHYZ9qNctSKx-jI6OIbPZEFYysbJ_gcY",
    authDomain: "diario-12a43.firebaseapp.com",
    databaseURL: "https://diario-12a43-default-rtdb.firebaseio.com",
    projectId: "diario-12a43",
    storageBucket: "diario-12a43.appspot.com",
    messagingSenderId: "1049768546446",
    appId: "1:1049768546446:web:0c74e1ce14716094e9f9df",
  },
  vapidKey: "BMn_Ex_RdoHdAebpcedYW6W3TFcqnwwg_HRuCwZqYcCf2_biX0AGilOuY_4KNFRKb66Ja7H0yD1PAgzYaQSdF8w"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
