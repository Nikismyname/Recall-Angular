import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http"
import { Observable } from "rxjs";
import { environment } from 'src/environments/environment';

let urlRoot: string; 
if (environment.production) { 
    urlRoot = "/api";
} else {
    urlRoot = "https://localhost:44341/api";
}

export class AppHttpInterceptor implements HttpInterceptor{

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req.clone({
            url: `${urlRoot}/${req.url}`,
            setHeaders: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        }));
    }
}