// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    shortName: 'dev',
    useServiceWorker: false,
    baseUrl: 'https://api-staging.jackpotrising.com/v4',
    // baseUrl: 'http://192.168.1.220:9000/v4',
    newBaseUrl: 'https://api-new.jackpotrising.com/staging',
    appUrl: 'https://playerhq-staging.jackpotrising.com',
    pusher: {
        key: 'c485e6025bc6ba0d48bc',
        cluster: 'us2',
    },
    auth0: {
        origin: 'http://localhost:4200',
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
