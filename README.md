# Real-Time Web @cmda-minor-web · 2019-2020

## Inhoud

- [Prototype](#Prototype)
- [Installatie](#Installatie)
- [Message Types](#Message-Types)
- [Concept](#Concept)
- [Data Life Cycle](#Data-Life-Cycle)
- [Spotify API](#Spotify-API---Externe-Databron)
- [Wishlist](#Wishlist)
- [Bronnen](#Bronnen)
- [Credits](#Credits)

## Live Demo

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

## Game voor spotify

### Autorisatie

De gebruiker van de applicatie heeft een spotify account nodig. Als eerste scherm ziet de gebruiker een scherm met "Inloggen met Spotify". Zodra de gebruiker op deze knop klikt wordt hij door gestuurd naar de autorisatie. Als de autorisatie van spotify succesvol is afgerond komt hij in een grote room.

## Room

De eerste speler die in deze room terecht komt kan een genre kiezen voor het spel. Zodra er meer dan 1 speler in de room aanwezig is kan de eerste speler het spel starten.

## Random track

Er wordt een random track afgespeeld met 4 mogelijke antwoorden. De tracks worden maar 1x afgespeeld. Iedere speler geeft het antwoord waarvan hij denkt dat de track zo heet. Alle antwoorden worden bijgehouden, voor ieder goed antwoord krijg je een punt. In totaal worden er 10 tracks afgespeeld. Aan het einde van het spel wordt er bekend gemaakt wie de winnaar is, en op welke plaats de andere spelers zijn geindigt.

<img width="404" alt="Screenshot 2020-04-14 at 14 40 55" src="https://user-images.githubusercontent.com/45422060/79226102-1f936380-7e5e-11ea-8520-337e707a9bfe.png">
<img width="494" alt="Screenshot 2020-04-14 at 14 41 04" src="https://user-images.githubusercontent.com/45422060/79226111-21f5bd80-7e5e-11ea-9e16-9167bbe7a23c.png">

## Data Life Cycle

![DataLifeCycle](https://user-images.githubusercontent.com/45422060/80916396-a9956480-8d58-11ea-8674-1696e78b3e3c.png)
[Authorization code flow](#Authorization-code-flow)

## Spotify API - Externe Databron

Voor het gebruik van de Spotfiy API heb je een spotify account nodig. Vervolgens kun je jouw applicatie registreren via [Spotify for Developers](https://developer.spotify.com/). Dit wordt uitgelegd in de [Quick Start](https://developer.spotify.com/documentation/web-api/quick-start/). Tijdens de quick start wordt gevraagd om een autorisatie code. Hiervoor kunt u de [Autorisatie guide](https://developer.spotify.com/documentation/general/guides/authorization-guide/) volgen.

### Authorization code flow

Dit is de autorisatie flow die ik heb gebruikt om data uit de spotify API te verkrijgen.
<img width="1032" alt="Screenshot 2020-04-21 at 09 57 41" src="https://user-images.githubusercontent.com/45422060/79840793-b5774300-83b6-11ea-9a22-8983bca2c513.png">

Zodra de applicatie is geautoriseerd is het mogelijk door middel van verschillende [Autorisatie Scopes](https://developer.spotify.com/documentation/general/guides/scopes/) features aan de app toe te voegen.

### Scopes

Op dit moment heb ik nog maar 1 scope voor mijn applicatie gebruikt:

- [user-modify-playback-state](https://developer.spotify.com/documentation/general/guides/scopes/#user-modify-playback-state)
  - Met deze scope wordt door de gebruiker het genre gekozen, en een bijpassende afspeellijst terug gestuurd naar de server. Verschillende tracks uit de afspeellijst willekeurig gekozen, en hier een van afgespeelt op de client.

## Wishlist

- Verschillende rooms
- Een pin toevoegen waardoor je met je eigen vrienden kunt spelen
- Scorebord

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
