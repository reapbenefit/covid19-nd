import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

// interface IAppConfig {
//   baseUrl: string;
//   LogoName:string;
// }

@Injectable()
export class AppConfig {
  static settings: any;

  constructor(private http: HttpClient) {
  }

  load() {
   // load config file from this path
    const jsonFile = `assets/config/config.json`;
    return new Promise<void>((resolve, reject) => {
      this.http.get(jsonFile).toPromise().then((response) => {
        AppConfig.settings = response;
        resolve();
      }).catch((response: any) => {
        reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
      });
    });
  }
}


