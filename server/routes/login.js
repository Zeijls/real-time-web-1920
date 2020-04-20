const { spotifyUrls } = require("../lib/constants");

module.exports = (request, response, next) => {
  const { SPOTIFY_REDIRECT_URI, SPOTIFY_CLIENT_ID } = process.env;
  const scopes = encodeURIComponent(
    "user-read-private user-read-email user-modify-playback-state"
  );
  const redirect_uri = encodeURIComponent(SPOTIFY_REDIRECT_URI);
  const redirectUrl = `${spotifyUrls.SPOTIFY_AUTH_URL}&client_id=${SPOTIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${redirect_uri}`;

  response.redirect(redirectUrl);
};
