/*globals require, server, console, __dirname*/
/**
 * Benötigte Module einbinden: HTTP, Dateisystem, NowJS
 */
var http = require('http'),
    fs = require('fs'), 
    now = require('now'); //NowJS-Modul
    
/**
 * Webserver starten
 */
var server = http.createServer(function (req, res) {
    if (req.url === '/client.js') {
        res.end(fs.readFileSync(__dirname + '/client.js'));
    } else {
        res.end(fs.readFileSync(__dirname + '/index.html'));
    }
});
server.listen(8000, '127.0.0.1');

console.log('Server läuft an http://127.0.0.1:8000/');

/**
 * NowJS:
 * Zwei Methoden definieren, die von allen Client benutzt werden
 * hello() schreibt auf die Server-Konsole
 * distMsg() broadcastet an alle verbundenen Clients
 */
var everyone = now.initialize(server),
    points = 0;
everyone.now.hello = function () {
    console.log('Neuer Client mit Farbe ' + this.now.color);
};
everyone.now.distMsg = function (pos) {
    everyone.now.recvMsg(this.now.color, pos, ++points);
};
