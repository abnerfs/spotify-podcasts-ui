export type AccessToken = {
    access_token : string,
    token_type: 'Bearer',
    scope: string,
    expires_in: number,
    expire_date: Date,
    refresh_token: string
}