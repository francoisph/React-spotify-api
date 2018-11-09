
export const client_id = "b10f7b219afd4f859aad6dba0529d37e";
export const client_secret = "a7c7262044a840e1a913ed511f76f290";
export const redirect_uri = "http://localhost:3000/";

export const webApiURL = `https://accounts.spotify.com/authorize/?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=user-read-private+user-read-email+playlist-read-private+user-top-read+user-read-recently-played`;
export const profileURL = "https://api.spotify.com/v1/me?access_token=";
export const playlistURL = "https://api.spotify.com/v1/me/playlists?access_token=";
export const searchURL = "https://api.spotify.com/v1/search?q=";
export const artistURL = "https://api.spotify.com/v1/artists/";
export const albumURL = "https://api.spotify.com/v1/albums/";
