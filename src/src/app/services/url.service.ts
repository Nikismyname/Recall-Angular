import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  extractToken(url: string): string {
      if (url == null || url == undefined || url.length == 0) {
          return null;
      }
      let standartUrl = true;
      let videoToken = url.split('v=')[1];
      if (videoToken == undefined) {
          standartUrl = false;
      }
      if (standartUrl == true) {
          videoToken = videoToken.split('&')[0];
          return videoToken;
      } else {
          let regex = /\.be\/(.+?)(?:$|\?)/;
          let match = regex.exec(url);
          if (!match) {
              return null;
          }
          videoToken = match[1];
          return videoToken;
    }
  }
}
