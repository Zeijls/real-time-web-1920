const fetch = require("node-fetch");

module.exports = async function chat(req, res) {
  const token = req.cookies.accessToken;
  console.log(token);
  const data = await fetch("https://api.spotify.com/v1/me/tracks", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    const data = await response.json();
    const randomNumber = await randomNumberGenerator(data.items);

    return data.items[randomNumber];
  });
  console.log("chat.js");
  console.log({ data });

  res.render("pages/chat", {
    tracksData: data,
    token,
  });
};

function randomNumberGenerator(tracksData) {
  return Math.floor(Math.random() * tracksData.length);
}
