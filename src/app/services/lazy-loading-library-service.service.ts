/*  https://stackoverflow.com/questions/46240293/how-to-lazyload-library-in-angular-4-module?rq=1 */

import { Injectable, Inject } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LazyLoadingLibraryServiceService {
  private loadedLibraries: { [url: string]: ReplaySubject<any> } = {};
  constructor(@Inject(DOCUMENT) private readonly document: any) { }

  /**
   * Carga los scripts al modo Lazy Load
   * @param url Es la url del nuevo script que necesito
   */
  public loadJs(url: string): Observable<any> {
      if (this.loadedLibraries[url]) {
          return this.loadedLibraries[url].asObservable();
      }

      this.loadedLibraries[url] = new ReplaySubject();

      const script = this.document.createElement('script');
      script.type = 'text/javascript';
      script.src = url;
      script.onload = () => {
          this.loadedLibraries[url].next('');
          this.loadedLibraries[url].complete();
      };

      this.document.body.appendChild(script);
      return this.loadedLibraries[url].asObservable();
  }
}
