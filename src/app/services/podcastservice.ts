import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import UtilService from './Util';
import { LoginService } from './login';

export type Podcast = {
    audio_preview_url:      string;
    description:            string;
    duration_ms:            number;
    explicit:               boolean;
    external_urls:          ExternalUrls;
    href:                   string;
    id:                     string;
    images:                 Image[];
    is_externally_hosted:   boolean;
    is_playable:            boolean;
    language:               string;
    languages:              string[];
    name:                   string;
    release_date:           Date;
    release_date_precision: string;
    type:                   string;
    uri:                    string;
}

export type Show = {
    available_markets:    string[];
    copyrights:           any[];
    description:          string;
    explicit:             boolean;
    external_urls:        ExternalUrls;
    href:                 string;
    id:                   string;
    images:               Image[];
    is_externally_hosted: boolean;
    languages:            string[];
    media_type:           string;
    name:                 string;
    publisher:            string;
    type:                 string;
    uri:                  string;
}


export type ExternalUrls = {
    spotify: string;
}

export type Image = {
    height: number;
    url:    string;
    width:  number;
}


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