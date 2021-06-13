// This file can be replaced during build by using the `fileReplacements` array.
// The list of file replacements can be found in `angular.json`.


// O comando `ng build` replaces `environment.ts` with `environment.prod.ts`.
export const environment = {
  production: false,
  API: 'http://localhost:3000/' //enquanto estiver em desenvolvimento, a variável API, que é o endereço para onde são feitas as requisções http do projeto, vai ser o localhost, quando fizer o build de produção não vai ser mais (olhar no environment.prod.ts), vai ser o '/' (que tem que ser substituido pelo endereço correto do servidor), esse '/' foi definido no arquivo "environment.prod.ts"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
