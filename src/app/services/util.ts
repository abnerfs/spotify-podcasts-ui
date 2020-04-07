import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export default class UtilService {
    queryStringify(obj: any) : string {
        if(!obj)
            return undefined;
            
        return Object.keys(obj)
            .map(x => `${x}=${encodeURIComponent(obj[x])}`)
            .join("&");
    }

    timeoutPromise = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
}