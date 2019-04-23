import { Injectable } from "@angular/core";

export namespace RoutesNoSlash { 
    export const loginPath = "auth/login";
    export const registerPath = "auth/register"; 

    export const videosPath = "nav/videos";
}

@Injectable({
    providedIn: "root"
})
export class RoutePaths { 
    public loginPath = "/" + RoutesNoSlash.loginPath; 
    public registerPath = "/" + RoutesNoSlash.registerPath;  

    public videosPath = "/"+RoutesNoSlash.videosPath; 
}

export function forFeatureRouting(path: string) {
    return path.split("/").slice(1).join("/");
}