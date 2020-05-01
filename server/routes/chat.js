// module.exports = (request, response) => {
//   response.send(renderer.render("views/chat"));
// };

async function chat(req, res) {
  return res.render("pages/chat");
}

module.exports = chat;
