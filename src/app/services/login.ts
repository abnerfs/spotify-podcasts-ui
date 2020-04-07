import { Injectable } from '@angular/core';
import { AccessToken } from '../models/api_models';
import { environment } from 'src/environments/environment';
import UtilService from './Util';


@Injectable({
    providedIn: 'root'
})
export class LoginService {
    constructor(private util: UtilService) {

    }

    logout() {
        localStorage.removeItem('current_user');
    }

    getAuthHeader() {
        return `Bearer ${(this.getUserLS())?.access_token}`;
    }

    isAuthenticated() {
        return Boolean(this.getUserLS())
    }

    spotifyLogin() {
        const params = {
            redirect_uri: environment.REDIRECT_URI
        }

        window.location.href = environment.SERVER_LINK + '/login?' + this.util.queryStringify(params);
    }

    getToken(code: string) {
        const params = {
            redirect_uri: environment.REDIRECT_URI,
            code
        }

        const link = environment.SERVER_LINK + '/token';

        return fetch(link, {
            method: 'POST',
            body: this.util.queryStringify(params),
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            }
        })
        .then(ret => ret.json())
        .then(ret => {
            if (!ret)
                throw new Error("Authentication Failed");

            if(ret.error) 
                throw new Error(ret.error + ': ' + ret.error_description);

            return ret;
        })
        .then(ret => ret as AccessToken)
    }

    saveUserLS(token: AccessToken)  {
        localStorage.setItem('current_user', JSON.stringify(token));
    }

    getUserLS() {
        try {
            const objUser = JSON.parse(localStorage.getItem('current_user'));
            const user : AccessToken = {
                access_token: objUser.access_token,
                expire_date: objUser.expire_date,
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
}