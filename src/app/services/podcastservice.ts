import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import UtilService from './Util';
import { LoginService } from './login';
import { Podcast, Show } from '../models/api_models';


@Injectable({
    providedIn: 'root'
})
export class PodcastService {

    constructor(private util: UtilService, private login: LoginService) {

    }

    searchShows(search: string) {
        const query = {
            search
        }

        return fetch(environment.SERVER_LINK + '/shows?' + this.util.queryStringify(query), {
            method: 'GET',
            headers: {
                Authorization: this.login.getAuthHeader()
            }
        })
        .then(ret => ret.json())
        .then(ret => ret as Show[]);
    }

    listEpisodes(show: string, offset: number, search?: string) {
        const query = {
            offset,
            search
        }

        return fetch(environment.SERVER_LINK + `/shows/${show}/episodes?` + this.util.queryStringify(query), {
            method: 'GET',
            headers: {
                Authorization: this.login.getAuthHeader()
            }
        })
        .then(ret => ret.json())
        .then(ret => ret as Podcast[]);
    }
}