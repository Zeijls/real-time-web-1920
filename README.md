# Real-Time Web @cmda-minor-web · 2019-2020

## Inhoud

- [Prototype](#Prototype)
- [Installatie](#Installatie)
- [Message Types](#Message-Types)
- [Concept](#Concept)
- [Data Life Cycle](#Data-Life-Cycle)
- [Artikelen](#Artikelen)
- [Opdrachten](#Opdrachten)
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

## Message Types

### Client

- `chat message` : Een berichtje versturen naar andere gebruikers in de chat
- `set user` : Username invoeren

### Server

- `server message` : Een notificatie van de server naar de gebruikers > Voorbeeld "welcome to the void", "Your username was changed to \$...", enz.

## Concept

Mijn concept is een game voor spotify. In dit spel kun je samen met je vrienden nummers raden. Er wordt een random nummer afgespeeld met 4 mogelijke antwoorden. De speler die het eerste het goede antwoord heeft gegeven, krijgt de meeste punten. Er zijn 10 fragmenten, en uiteindelijk is er een winnaar.

<img width="404" alt="Screenshot 2020-04-14 at 14 40 55" src="https://user-images.githubusercontent.com/45422060/79226102-1f936380-7e5e-11ea-8520-337e707a9bfe.png">
<img width="494" alt="Screenshot 2020-04-14 at 14 41 04" src="https://user-images.githubusercontent.com/45422060/79226111-21f5bd80-7e5e-11ea-9e16-9167bbe7a23c.png">

## Data Life Cycle

![DataLifeCycle](https://user-images.githubusercontent.com/45422060/79563053-565eb900-80ac-11ea-9aa1-4b233c3ae76b.png)

## Wishlist

## Bronnen

- [Socket IO](https://socket.io/get-started/chat/)
- [Medium Simple Chat app](https://medium.com/@noufel.gouirhate/build-a-simple-chat-app-with-node-js-and-socket-io-ea716c093088)
- [Voorbeeld Guido](https://github.com/guidobouman/rtw-chat)
- [Socket.IO Demo Chat](https://github.com/socketio/socket.io/tree/master/examples/chat)

## Credits
