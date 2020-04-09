export type AccessToken = {
    access_token : string,
    token_type: 'Bearer',
    scope: string,
    expires_in: number,
    expire_date: Date,
    refresh_token: string,
    user: User
}
export type Podcast = {
    audio_preview_url:      string;
    description:            string;
    duration_ms:            number;
    duration_formated:      string;
    release_date_formated:  string;
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


export type User = {
    display_name:  string;
    email:         string;
    external_urls: ExternalUrls;
    followers:     Followers;
    href:          string;
    id:            string;
    images:        Image[];
    type:          string;
    uri:           string;
}

export type Followers = {
    href:  null;
    total: number;
}
