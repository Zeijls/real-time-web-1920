<h1 align="center">Real-Time Web @cmda-minor-web · 2019-2020</h1>

<p align="center"><b>In deze applicatie kun je bijvoorbeeld tijdens de corona tijd samen met je vrienden de Spotify Game spelen. Je komt met elkaar in een chat, en er wordt een random liedje afgespeelt. Als je de naam van de titel weet kun je deze in de groepschat sturen, als het antwoord goed is kan je punten verdienen. </b>
</p>

<br>

<p align="center">
  <a href="https://real-time-web-simone.herokuapp.com/">
    <img src="https://img.shields.io/badge/demo-LIVE-brightgreen.svg?style=flat-square" alt="demo">
  </a>
  &nbsp;&nbsp;&nbsp;
</p>

<br>

## Inhoud

- [Prototype](#Prototype)
- [Installatie](#Installatie)
- [Real time events](#Real-time-events)
  - [Client](#Client)
  - [Server](#Server)
- [Concept](#Concept)
- [Data Life Cycle](#Data-Life-Cycle)
- [Spotify API](#Spotify-API---Externe-Databron)
  - [Autorization code flow](Autorization-code-flow)
  - [Scopes](#Scopes)
- [Wishlist](#Wishlist)
- [Bronnen](#Bronnen)
- [Credits](#Credits)

## Prototype

[Prototype](https://real-time-web-simone.herokuapp.com/)

## Concept

### Game voor spotify

#### Autorisatie

De gebruiker van de applicatie heeft een premium spotify account nodig. Als eerst ziet de gebruiker een scherm met "Inloggen met Spotify". Zodra de gebruiker op deze knop klikt wordt hij door gestuurd naar de autorisatie. Als de autorisatie van spotify succesvol is afgerond komt de gebruiker in de chat.

<img width="1357" alt="Screenshot 2020-05-03 at 17 00 39" src="https://user-images.githubusercontent.com/45422060/80917506-a651a700-8d5f-11ea-8345-328d52909a65.png">

#### Random track

Alle spelers komen in hetzelfde spel terecht. Zodra een van de spelers op play klikt wordt er een random nummer uit zijn afspeellijst "liked songs" op spotify gegenereerd. Zodra een van de deelnemers weet welk nummer er wordt dit is, kan hij het antwoord in de groepschat sturen. Het antwoord wordt gecontroleerd en als het goed is heeft hij deze ronde gewonnen, hij krijgt hij een punt. Als het antwoord niet goed is blijft het spel gewoon door gaan. In het geval dat niemand het nummer weet kan deze ronde worden overgeslagen op het moment dat een van de gebruikers op de "next round" button klikt. In totaal zijn er 10 rondes met ieder 1 track om te raden. Aan het einde van het spel wordt er door middel van een score board duidelijk wie het spel heeft gewonnen.

<img width="1440" alt="Screenshot 2020-05-06 at 02 36 02" src="https://user-images.githubusercontent.com/45422060/81128876-c42b3180-8f42-11ea-960a-34ec9b3ddf74.png">
<img width="1440" alt="Screenshot 2020-05-06 at 02 36 16" src="https://user-images.githubusercontent.com/45422060/81128878-c55c5e80-8f42-11ea-96f1-67bc7c1513a7.png">

### Eerste schetsen concept

<img width="404" alt="Screenshot 2020-04-14 at 14 40 55" src="https://user-images.githubusercontent.com/45422060/79226102-1f936380-7e5e-11ea-8520-337e707a9bfe.png">
<img width="494" alt="Screenshot 2020-04-14 at 14 41 04" src="https://user-images.githubusercontent.com/45422060/79226111-21f5bd80-7e5e-11ea-9e16-9167bbe7a23c.png">

## Data Life Cycle

![Data Life Cycle](https://user-images.githubusercontent.com/45422060/81130339-bd52ed80-8f47-11ea-9e8a-12612360ff9d.png)
<br>
[Authorization code flow](#Authorization-code-flow)

## Installatie

Mijn project kun je installeren door de volgende commando's mee te geven aan de terminal

```bash
#### Clone repository
git clone https://github.com/zeijls/real-time-web-1920.git

cd real-time-web-1920

#### Installeer dependencies
npm install

#### Start de server
npm run dev
```

## Spotify API - Externe Databron

Voor het gebruik van de Spotfiy API heb je een spotify account nodig. Vervolgens kun je jouw applicatie registreren via [Spotify for Developers](https://developer.spotify.com/). Dit wordt uitgelegd in de [Quick Start](https://developer.spotify.com/documentation/web-api/quick-start/). Tijdens de quick start wordt gevraagd om een autorisatie code. Hiervoor kunt u de [Autorisatie guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) volgen.

### Authorization code flow

Dit is de autorisatie flow die ik heb gebruikt om data uit de spotify API te verkrijgen.
<img width="1032" alt="Screenshot 2020-04-21 at 09 57 41" src="https://user-images.githubusercontent.com/45422060/79840793-b5774300-83b6-11ea-9a22-8983bca2c513.png">

Zodra de applicatie is geautoriseerd is het mogelijk door middel van verschillende [Autorisatie Scopes](https://developer.spotify.com/documentation/general/guides/scopes/) features aan de app toe te voegen.

### Scopes

Op dit moment heb ik nog maar 1 scope voor mijn applicatie gebruikt:

- [user-library-read](https://developer.spotify.com/documentation/general/guides/scopes/#user-library-read)
  - Van deze scrope gebruik ik [Get a User's Saved Tracks](https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-tracks/). Met deze scope kan ik alle opgeslagen tracks van de eerste gebruiker in het spel ophalen.
- [Streaming](https://developer.spotify.com/documentation/general/guides/scopes/#streaming)
  - Van deze scope gebruik ik [Get Information About The User's Current Playback](https://developer.spotify.com/documentation/web-api/reference/player/get-information-about-the-users-current-playback/). Op de server is er een random track gekozen van bovenstaande lijst. Met deze scope kan ik de random track afspelen bij iedere gebruiker. Het is hiervoor wel noodzakelijk dat er al een ander liedje wordt afgespeelt, en alle gebruikers een premium spotify account hebben. Als dit niet het geval is zal dit in een melding worden aangegeven.

## Real time events

<details>
<summary>set user : Username invoeren
</summary>
Zodra de gebruiker op de website komt, heeft hij de mogelijkheid zijn username in te voeren. Het is niet verplicht, maar zodra de gebruiker dit nog niet heeft gedaan, en de waarde van de username input leeg is krijgt hij de username: Annonymous. Als de username annoniem is kan hij wel berichten in de chat sturen, maar niet mee doen aan het spel omdat hier zijn punten voor moeten worden bij gehouden.

Er zijn nog een aantal features die ik hieraan had willen toevoegen, zie [Wishlist Features](#Wishlist-Features)

</details>

<details>
<summary>server message: Een notificatie van de server naar de gebruikers </summary>
Zodra een gebruiker in logt wordt hij door een server bericht verwelkomt in het spel. Zodra de gebruiker zijn user name aan past wordt dit ook aan de andere spelers doorgegeveb via de server. Zodra een speler een nummer goed heeft geraden geeft de server dit aan aan de speler, maar ook aan alle andere spelers. Dit is niet perse nodig omdat dit ook wordt vermeld onder het scoreboard.

Ik heb hier onder alle server messages die ik heb toegepast in de applicatie op een rijtje gezet:

```js
socket.emit("server message", `SERVER: Welcome to the game.`);
socket.broadcast.emit("server message", `SERVER: User ${userName} connected.`);
socket.emit(
  "server message",
  `SERVER: Your username was changed to ${userName}.`
);
socket.broadcast.emit(
  "server message",
  `SERVER: User ${oldUsername} changed their name to ${userName}.`
);
ioInstance.emit(
  "server message",
  `SERVER: User ${userName} has left the game.`
);
ioInstance.emit(
  "server message",
  `SERVER: ${userName} guessed the song! It was: ${actualSong}.`
);
ioInstance.emit(
  "server message",
  `SERVER: You have has guessed 10 songs and ended the game!`
);
socket.emit(
  "server message",
  "Server: You don't have a spotify premium account. You can chat with people but you can't listen to the party music."
);
socket.emit(
  "server message",
  "Server: We can't find an active device please open your spotify application on your own device and start a random track to active the session."
);
```

</details>

<details>
<summary>get song: de afspeellijst wordt gefetcht vanuit de API
</summary>
Zodra de gebruiker op de button klikt om een nummer af te spelen wordt de afspeellijst "liked songs" bij de gebruiker gefetcht. Hiervoor is de accestoken nodig. Deze nieuwe socket wordt hiermee geactiveerd.

```js
// Get song
socket.on("getSong", function (id) {
  socket.emit("getTokens", id);
  socket.broadcast.emit("getTokens", id);
});
```

<details>
<summary>get tokens: Accestoken en ID opvragen bij iedere client
</summary>
Door middel van dit verzoek worden de acccestoken en ID bij iedere gebruiker opgevraagt. Dit gaat als volgt:

```js
// Get Tokens
socket.on("getTokens", function (id) {
  const accessToken = document.cookie
    .split(";")
    .find((item) => {
      return item.includes("accessToken");
    })
    .split("=")[1]
    .trim();
  socket.emit("playSong", {
    id,
    accessToken,
    name,
  });
});
```

In dit stukje code vraagt de socket de coockie van de gebruikers op. Deze code wordt gebruikt om de individuele accestokens eruit te filteren zonder de punt komma als verbindingsstuk.

</details>

Zodra de accestoken is succesvol is ontvangen kan de get song socket de fetch afmaken:

```js
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
```

Om het spel spannend te houden wordt er een random nummer gegenereert, zoals in de code te zien is worden de data items op de volgende manier gereturnt;

```js
return data.items[randomNumber];
```

In dit stukje wordt de volgende functie aangeroepen die een random getal genereert:

```js
function randomNumberGenerator(tracksData) {
  return Math.floor(Math.random() * tracksData.length);
}
```

Nu de data is gefetcht, is er een array met alle nummers die de gebruiker aan zijn "liked songs" afspeellijst heeft toegevoegd.

</details>

<details>
<summary>play song: Random Track afspelen bij iedere gebruiker dmv de [Start/Resume a User's Playback Scope](https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/).
</summary>
Nu de afspeellijst van de gebruiker is opgehaald, kan er een nummer worden afgespeelt. Hiervoor wordt bovenstaande scope van de spotify api gebruikt.

```js
// Play song
socket.on("playSong", function (myObject) {
  // Fetch for streaming spotify to play a track
  fetch(`https://api.spotify.com/v1/me/player/play`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${myObject.accessToken}`,
    },
    body: JSON.stringify({
      uris: [`spotify:track:${myObject.id}`],
      title: [`spotify:track:${myObject.name}`],
    }),
  }).then(async (response) => {
    tracksData = await response.json();
    if (response.status == 403) {
      socket.emit(
        "server message",
        "Server: You don't have a spotify premium account. You can chat with people but you can't listen to the party music."
      );
    }
    if (response.status == 404) {
      socket.emit(
        "server message",
        "Server: We can't find an active device please open your spotify application on your own device and start a random track to active the session."
      );
    }
  });
});
```

In bovenstaande code wordt de naam en het id van de track opgehaalt uit de gefetchte data, met het id kan de streamer het nummer afspelen, en de naam wordt gebruikt om te controlleren of het goede nummer is ingevuld in de chat.

</details>

<details>
<summary>chat message : Een berichtje versturen naar andere gebruikers in de chat
</summary>
Chat messages worden vanaf de client naar de server verstuurt. Op de server wordt gecontrolleert of het antwoord van de gebruiker overeen komt met de titel van de track die op dat moment wordt afgespeelt. Als het chat bericht overeen komt krijgt de gebruiker 1 punt. Als het antwoord niet goed is wordt het chat bericht wel naar alle andere gebruikers gestuurd, maar er gebeurd verder niets.

Zodra een gebruiker ingelogt is krijgt hij zijn eigen random kleur toegewezen. Op deze manier is het makkelijk af te lezen wie wat in de chat stuurt.

```js
ioInstance.emit(
  "chat message",
  `${userName}: ${messageInputField}`,
  randomColor
);
```

Op deze manier wordt er een border om heen geplaatst met de random kleur.

```js
socket.on("chat message", function (msg, randomColor) {
  const messages = document.getElementById("messages");
  messages.insertAdjacentHTML(
    "beforeend",
    `<li class="chat-message" style="border: 2px solid ${randomColor};" >${msg}</li>`
  );
});
```

Zodra er een berichtje wordt gestuurt wordt de functie songTitleCheck afgevuurt om te controleren of het antwoord en de titel overeenkomen.

```js
socket.on("chat message", function (msg) {
  console.log("message: " + msg);
  // Check answer
  songTitleCheck(msg);
});
```

</details>

<details>
<summary>next round: Hiermee gaat de gebruiker naar de volgende ronde van het spel, er wordt een nieuw random nummer uit de lijst gegenereerd.
</summary>
Zodra de spelers het nummer niet weten, of goed hebben beantwoord kunnen ze op button "next round" klikken om naar de volgende ronde te gaan. Als er op deze button wordt geklikt wordt er een nieuw random getal gegenereert waarna vervolgens het nieuwe random nummer wordt afgespeelt, hiervoor wordt de socket play song herbruikt. Deze loop wordt 10 keer herhaalt, daarna is het spel afgelopen.

</details>

<details>
<summary>player guessed song: De gebruiker heeft een nummer goed geraden en ontvang hiervoor een punt
</summary>
Zodra een gebruiker het nummer goed heeft geraden, zal hij hier feedback op krijgen, en een punt verdienen. Hiervoor heb ik de volgende code geschreven:

```js
socket.on("player guessed song", function (userName, actualSong) {
  const showSong = document.getElementById("roundEnd");
  const showWinner = document.getElementById("informationTextAboutRound");
  showWinner.insertAdjacentHTML(
    "beforeend",
    `<h1>The song was: ${actualSong} </h1>`
  );
  showWinner.insertAdjacentHTML(
    "beforeend",
    `<h2>${userName} is the winner of this round!</h2>`
  );
  showWinner.insertAdjacentHTML("beforeend", `<p>${userName} gets 1 point</p>`);
});
```

Om het deze gebruiker een punt te geven wordt de volgende functie geactiveert:

```js

  // Winners point
  function setAPoint(userName) {
    if (gameResults[userName].wins) {
      gameResults[userName].wins++;
    } else {
      gameResults[userName].wins = 1;
    }
  }
});

```

</details>

<details>
<summary>score board: Het scoreboard geeft het aantal verdiende punten per gebruiker weer.
</summary>
Nu de gebruiker een punt heeft gescoort, wordt dit punt weergegeven op het scorebord. Alle gebruikers die een username hebben ingevuld worden hierop weergegeven, en starten met 0 punten. Zodra een gebruiker een punt heeft gescoort wordt dit dus aangepast met de volgende code:

```js
// Score board
socket.on("score board", function (gameResults) {
  const scoreBoard = document.getElementById("scoreBoard");
  while (scoreBoard.firstChild) scoreBoard.firstChild.remove();
  scoreBoard.insertAdjacentHTML("afterbegin", `<h1>Score Board</h1>`);
  const mapTest = new Map(
    Object.entries(gameResults).map(([key, value]) => [
      key["userName"],
      value["wins"],
      console.log("test", key, value),
      scoreBoard.insertAdjacentHTML(
        "beforeend",
        `<p>${key}: ${value.wins}</p>`
      ),
    ])
  );
});
```

</details>

<details>
<summary>end game: alle 10 rondes van het spel zijn gespeelt en het spel is afgelopen
</summary>
Zodra er 10 rondes in het spel zijn gespeeld is het spel afgelopen. Om dit duidelijk te maken worden de buttons "play" en "next round" niet meer weergegeven, daarnaast krijgt de gebruiker hier feedback over. Dit heb ik geinplementeerd met de volgende code:

```js
// End game
socket.on("end game", function (userName, gameResults) {
  console.log("Hier kom ik nog");
  const scoreBoard = document.getElementById("informationTextAboutRound");
  while (scoreBoard.firstChild) scoreBoard.firstChild.remove();
  scoreBoard.insertAdjacentHTML("beforeend", `<h1>Game is over!</h1>`),
    scoreBoard.insertAdjacentHTML(
      "beforeend",
      `<h2>Check the scoreboard to see who win the game</h2>`
    );

  const removeNextButton = document.getElementById("nextSong");
  const removePlaySong = document.getElementById("StartGame");
  removeNextButton.remove();
  removePlaySong.remove();
});
```

</details>

## Features

## Wishlist Features

`Set user`:

- Server message zodra de gebruiker zijn username nog niet heeft ingevuld, maar wel wilt meedoen aan het spel
- Username controleren of hij beschikbaar is, om zelfde usernames te voorkomen

- Verschillende rooms
- Een pin toevoegen waardoor je met je eigen vrienden kunt spelen
- Scorebord
- Keuze voor een genre
- 4 antwoordmogelijkheden (Kahoot idee)

## Bronnen

- [Socket IO](https://socket.io/get-started/chat/)
- [Medium Simple Chat app](https://medium.com/@noufel.gouirhate/build-a-simple-chat-app-with-node-js-and-socket-io-ea716c093088)
- [Voorbeeld Guido](https://github.com/guidobouman/rtw-chat)
- [Socket.IO Demo Chat](https://github.com/socketio/socket.io/tree/master/examples/chat)
- [Spotify for Developers](https://developer.spotify.com/)
- [Quick Start](https://developer.spotify.com/documentation/web-api/quick-start/)
- [SocketIO Cheetsheet](https://socket.io/docs/emit-cheatsheet/)

## Credits

- Mohammed, Hij heeft mij uitgelegd hoe je via de autorisatie scopes een nummer kunt afspelen
- Robin, hij heeft mij geholpen met het controleren van een antwoord in de chat
- Kris hij heeft mij geholpen met het opzetten van de database in mongoose
