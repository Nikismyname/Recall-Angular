import { Injectable } from "@angular/core";

export namespace RoutesNoSlash { 
    export const loginPath = "auth/login";
    export const registerPath = "auth/register"; 

    export const indexPath = "nav/index";
    export const videoMovePath = "nav/videoMove";

    export const videoCreatePath = "video/create";
    export const videoNotePath = "video/note";
    export const videoSearchPath = "video/search";
    export const videoImportPath = "video/import";
}

@Injectable({
    providedIn: "root"
})
export class RoutePaths { 
    public loginPath = "/" + RoutesNoSlash.loginPath; 
    public registerPath = "/" + RoutesNoSlash.registerPath;  

    public indexPath = "/" + RoutesNoSlash.indexPath; 
    public videoMovePath = "/" + RoutesNoSlash.videoMovePath;
    
    public videoCreatePath = "/" +RoutesNoSlash.videoCreatePath;
    public videoNotePath= "/" +RoutesNoSlash.videoNotePath;
    public videoSearchPath = "/" + RoutesNoSlash.videoSearchPath;
    public videoImportTath = "/" + RoutesNoSlash.videoImportPath;
}

export function forFeatureRouting(path: string) {
    return path.split("/").slice(1).join("/");
}