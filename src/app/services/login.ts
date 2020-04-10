import { AccessToken, ErrorAPI } from '../models/api_models';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { queryStringify } from './util';

const { SERVER_LINK, REDIRECT_URI } = environment;
const USER_LS_ITEM = 'current_user';

export const getUser = () : AccessToken | undefined => {
    try {
        const objUser = JSON.parse(localStorage.getItem(USER_LS_ITEM));
        const user : AccessToken = {
            access_token: objUser.access_token,
            expire_date: new Date(objUser.expire_date),
            expires_in: objUser.expires_in,
            refresh_token: objUser.refresh_token,
            scope: objUser.scope,
            token_type: objUser.token_type,
            user: objUser.user
        };
        return user;
    } 
    catch(error) {
        return undefined;
    }
}

const checkError = (json: any) => {
    if(json.error) {
        let error = new Error(json.error.message || "Unexpected error") as ErrorAPI; 
        error.status = json.error.status;
        throw error;
    }
    return json;
}

export const mapAccessToken = (json: any) : AccessToken => {
    json.expire_date = new Date(json.expire_date);
    let auth = json as AccessToken;
    return auth;
}

export const getTokenRefresh = (refresh_token: string) : Promise<AccessToken> => {
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
    .then(checkError)
    .then(mapAccessToken);
}




export const isAuthenticated = () => {
    return Boolean(getUser())
};

export const saveUserLS = (token: AccessToken) => {
    localStorage.setItem(USER_LS_ITEM, JSON.stringify(token));
}



@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor() {

    }

    getUserLS = () => getUser();
    isAuthenticated = () => isAuthenticated();

    logout = () => {
        localStorage.removeItem(USER_LS_ITEM);
    };

    spotifyLogin() {
        const params = {
            redirect_uri: REDIRECT_URI
        }

        window.location.href = SERVER_LINK + '/login?' + queryStringify(params);
    }

    getToken(code: string) {
        const params = {
            redirect_uri: REDIRECT_URI,
            code
        }

        const link = SERVER_LINK + '/token';

        return fetch(link, {
            method: 'POST',
            body: queryStringify(params),
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        })
        .then(ret => ret.json())
        .then(checkError)
        .then(mapAccessToken)
    }

    saveUserLS = (token: AccessToken) => saveUserLS(token);
}