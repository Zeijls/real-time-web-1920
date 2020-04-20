const fetch = require("node-fetch");

module.exports = async (req, res, next) => {
  const accessToken = ACCESS_TOKEN;

  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ID: "6rqhFgbbKwnb9MLmUQDhG6",
    },
  };

  try {
    const spotifyResponse = await fetch(
      "https://api.spotify.com/v1/tracks/{id}",
      headers
    );
    let data = await spotifyResponse.json();
    data = data.items;
    // console.log(data)
    res.send(data);
    cleanItems(data);
  } catch (err) {
    console.log("error fetching songs of user: ", err);
  }
};

function cleanItems(data) {
  const cleanedData = data.map((item) => {
    const track = item.track;

    return {
      song: track.name,
      artists: track.artists.map((artist) => artist.name),
      sample: track.preview_url,
    };
  });
  console.log("data cleaned: ", cleanedData);
  return cleanedData;
}
