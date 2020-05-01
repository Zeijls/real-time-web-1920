require("dotenv").config();

async function login(req, res) {
  const baseUrl = "https://accounts.spotify.com/authorize?response_type=code";
  const scopes = encodeURIComponent(
    "user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming user-read-private user-top-read user-library-modify user-library-read"
  );
  const redirectURI = encodeURIComponent(process.env.SPOTIFY_REDIRECT_URI);
  const redirectURL = `${baseUrl}&client_id=${process.env.SPOTIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${redirectURI}`;

  return res.redirect(redirectURL);
}

module.exports = login;
