import { Injectable } from "@angular/core";
import { Podcast, Show, AccessToken } from '../models/api_models';
import { environment } from 'src/environments/environment';
import { queryStringify } from './Util';
import { getUser, saveUserLS } from './login';

const { SERVER_LINK } = environment;

export type apiOptions = {
    query?: any;
    body?: any;
    method?: 'GET' | 'POST';
}


export class ErrorAPI extends Error {
    status?: number;
}

const getTokenRefresh = (refresh_token: string) : Promise<AccessToken> => {
    const body = {
        refresh_token
    }

    return fetch(SERVER_LINK + '/refresh_token', {
        method: 'POST',
        body: queryStringify(body),
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded'
        }
    })
    .then(res => res.json())
    .then(ret => ret as AccessToken)
}

const checkAuthExpired = async () => {
    let auth = await getUser();
    if (new Date() >= auth.expire_date) {
        auth = await getTokenRefresh(auth.refresh_token)
        saveUserLS(auth);
        return auth;
    };

    return auth;
}

export const callAPI = async (path: string, options?: apiOptions) => {
    if(!SERVER_LINK || SERVER_LINK.endsWith('/'))
        throw new Error("SERVER_LINK can't be empty and should not end with /");

    if(!path.startsWith('/')) 
        throw new Error("Path must start with /");

    const currentUser = await checkAuthExpired();
    if(!currentUser)
        throw new Error("Not logged in");

    let { query, method, body } = options || { };
    if(!method)
        method = "GET";
    
    if(!body)
        body = {};

    const queryParsed = query && method == 'GET' ? '?' + queryStringify(query) : '';

    return fetch(SERVER_LINK + path + queryParsed, {
        method,
        body: method == 'POST' ? queryStringify(body) : undefined,
        headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Bearer ' + currentUser.access_token
        }
    })
    .then(res => res.json());
}


@Injectable({
    providedIn: 'root'
})
export class PodcastService {

    constructor() {

    }

    getShow(show: string) {
        return callAPI('/shows/' + show)
            .then(ret => ret as Show);
    }

    searchShows(search: string) {
        const query = {
            search
        }

        return callAPI('/shows', {
            query,
        })
        .then(ret => ret as Show[]);
    }

    listEpisodes(show: string, offset: number, search?: string) {
        const query = {
            offset,
            search
        }

        return callAPI(`/shows/${show}/episodes`, {
            query
        })
        .then(ret => ret as Podcast[]);
    }
}