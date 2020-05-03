<h1 align="center">Real-Time Web @cmda-minor-web · 2019-2020</h1>

<p align="center"><b>In deze applicatie kun je tijdens de corona tijd samen met je vrienden de Spotify Game spelen. Je komt met elkaar in een chat, en er wordt een random liedje afgespeelt. Als je de naam van de titel weet kun je deze in de groepschat sturen, als het antwoord goed is kan je punten verdienen. </b>
</p>

<br>

<p align="center">
  <a href="https://real-time-web-simone.herokuapp.com/">
    <img src="https://img.shields.io/badge/demo-LIVE-brightgreen.svg?style=flat-square" alt="demo">
  </a>
  &nbsp;&nbsp;&nbsp;
</p>

<br>

<img width="1362" alt="Screenshot 2020-05-03 at 17 09 39" src="https://user-images.githubusercontent.com/45422060/80917663-e402ff80-8d60-11ea-89f0-59fca9616958.png">

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

## Installatie

```bash
#### Clone repository
git clone https://github.com/zeijls/real-time-web-1920.git

cd real-time-web-1920

#### Installeer dependencies en start de server
npm run dev
```

## Real time events

### Client

- `chat message` : Een berichtje versturen naar andere gebruikers in de chat
- `set user` : Username invoeren

- `get tokens`: Accestoken en ID opvragen bij iedere client

### Server

- `server message` : Een notificatie van de server naar de gebruikers > Voorbeeld "welcome to the void", "Your username was changed to \$...", enz.

- `play song`: Random Track afspelen bij iedere gebruiker dmv de [Start/Resume a User's Playback Scope](https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/).

## Concept

### Game voor spotify

#### Autorisatie

De gebruiker van de applicatie heeft een spotify account nodig. Als eerste scherm ziet de gebruiker een scherm met "Inloggen met Spotify". Zodra de gebruiker op deze knop klikt wordt hij door gestuurd naar de autorisatie. Als de autorisatie van spotify succesvol is afgerond komt de gebruiker in de chat.

<img width="1357" alt="Screenshot 2020-05-03 at 17 00 39" src="https://user-images.githubusercontent.com/45422060/80917506-a651a700-8d5f-11ea-8345-328d52909a65.png">

#### Random track

Alle spelers komen in hetzelfde spel terecht. Van de eerste speler in het spel wordt zijn lijst met opgeslagen nummers opgehaald vanuit de spotify API. Hier wordt een random track van afgespeelt voor alle deelnemers. Zodra een van de deelnemers weet welk nummer er wordt afgespeelt, kan hij het antwoord in de groepschat sturen. Als het antwoord goed is, heeft hij deze ronde gewonnen en krijgt hij een punt. Als het antwoord niet goed is blijft het spel gewoon door gaan. In totaal worden er 10 tracks afgespeeld. Aan het einde van het spel wordt er bekend gemaakt wie de winnaar is, en op welke plaats de andere spelers zijn geindigt.

### Eerste schetsen concept

<img width="404" alt="Screenshot 2020-04-14 at 14 40 55" src="https://user-images.githubusercontent.com/45422060/79226102-1f936380-7e5e-11ea-8520-337e707a9bfe.png">
<img width="494" alt="Screenshot 2020-04-14 at 14 41 04" src="https://user-images.githubusercontent.com/45422060/79226111-21f5bd80-7e5e-11ea-9e16-9167bbe7a23c.png">

## Data Life Cycle

![DataLifeCycle](https://user-images.githubusercontent.com/45422060/80916396-a9956480-8d58-11ea-8674-1696e78b3e3c.png)
<br>
[Authorization code flow](#Authorization-code-flow)

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

## Wishlist

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

## Credits

- Mohammed, Hij heeft mij uitgelegd hoe je via de autorisatie scopes een nummer kunt afspelen
- Robin, hij heeft mij geholpen met het controleren van een antwoord in de chat
- Kris hij heeft mij geholpen met het opzetten van de database in mongoose
