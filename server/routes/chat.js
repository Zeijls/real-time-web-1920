const fetch = require("node-fetch");

module.exports = function chat(req, res) {
  const token = req.cookies.accessToken;
  console.log(token);
  const data = fetch("https://api.spotify.com/v1/me/tracks", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    console.log("response chat");
    const data = await response.json();
    // console.log(data.items);
    res.render("pages/chat", {
      tracksData: data,
    });
  });
};
