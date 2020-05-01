const fetch = require("node-fetch");

module.exports = function chat(req, res) {
  const token = req.cookies.accessToken;
  console.log(token);
  fetch("https://api.spotify.com/v1/me/tracks", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    const data = await response.json();

    console.log(data.items[0]);
    res.render("pages/chat", {
      tracksData: data,
    });
  });
};

// function cleanItems(data) {
//   const cleanedData = data.map((item) => {
//     const track = item.track;

//     return {
//       song: track.name,
//       artists: track.artists.map((artist) => artist.name),
//       sample: track.preview_url,
//       id: track.id,
//     };
//   });
//   console.log("data cleaned: ", cleanedData);
//   return cleanedData;
// }
