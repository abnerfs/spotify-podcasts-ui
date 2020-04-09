
export const queryStringify = (obj: any) : string => {
    if(!obj)
        return undefined;
        
    return Object.keys(obj)
        .map(x => `${x}=${encodeURIComponent(obj[x])}`)
        .join("&");
}

export const timeoutPromise = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));