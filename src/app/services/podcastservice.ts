import { Injectable } from "@angular/core";
import { Podcast, Show } from '../models/api_models';
import { environment } from 'src/environments/environment';
import { queryStringify, timeFromMs } from './util';
import { getUser, saveUserLS, getTokenRefresh } from './login';

const { SERVER_LINK } = environment;

export type apiOptions = {
    query?: any;
    body?: any;
    method?: 'GET' | 'POST';
}

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const formatDate = (date: Date) => {
    const month = months[date.getMonth()];
    const day = date.getDay();
    const year = date.getFullYear();

    let ret = `${month} ${day}, ${year}`
    return ret;
}

export class ErrorAPI extends Error {
    status?: number;
}


const checkValidDate = (date: Date) => {
    return !isNaN(date.getTime());
}

const checkAuthExpired = async () => {
    let auth = await getUser();
    if (new Date() >= auth.expire_date || !checkValidDate(auth.expire_date)) {
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


const mapEpisode = (episode : Podcast) : Podcast => {
    episode.duration_formated = timeFromMs(episode.duration_ms);
    episode.release_date_formated = formatDate(new Date(episode.release_date));
    return episode;
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
        .then(ret => ret as Podcast[])
        .then(episodes => episodes.map(mapEpisode));
    }
}