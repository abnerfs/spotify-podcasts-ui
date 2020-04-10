
export const queryStringify = (obj: any) : string => {
    if(!obj)
        return undefined;
        
    return Object.keys(obj)
        .filter(x => obj[x] != undefined)
        .map(x => `${x}=${encodeURIComponent(obj[x])}`)
        .join("&");
}

export const timeoutPromise = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const timeFromMs = (ms: number) => {
    if(ms == 0)
        return "";

    const totalSeconds = Math.floor(ms / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor((totalSeconds - seconds) / 60);

    return minutes.toString().padStart(2, '0') + ":" + seconds.toString().padStart(2, '0');
}

