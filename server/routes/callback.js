const fetch = require("node-fetch");
const queryString = require("query-string");

const { cookies, spotifyUrls } = require("../lib/constants");

const {
  SPOTIFY_REDIRECT_URI,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_CLIENT_ID,
} = process.env;

module.exports = async (request, response, next) => {
  const code = request.query.code;
  const queryObject = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: SPOTIFY_REDIRECT_URI,
  };
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encodeToBase64(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      )}`,
    },
  };
  const query = queryString.stringify(queryObject);
  const url = `${spotifyUrls.SPOTIFY_TOKEN_URL}?${query}`;

  try {
    const spotifyResponse = await fetch(url, fetchOptions);
    const data = await spotifyResponse.json();

    response.cookie(cookies.SPOTIFY_ACCESS_TOKEN, data.access_token);
    response.cookie(cookies.SPOTIFY_REFRESH_TOKEN, data.refresh_token);

    response.redirect("/chat");
    // response.send(data);
  } catch (error) {
    console.log("Error!!!", error);

    // response.send("/", error);
    response.send(error);
  }
};

function encodeToBase64(text) {
  // console.log(text);
  return new Buffer.from(text).toString("base64");
}
