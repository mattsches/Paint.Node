/*globals document, $, now*/
$(document).ready(function () {
    /**
     * Größe des Canvas-Elements setzen
     */
    var canvas = document.getElementById('area');
    canvas.width = 480;
    canvas.height = 800;
    
    /**
     * Maus-Events:
     * Bei Mausklick werden die Koordinaten an den Server geschickt,
     * ebenso wenn bei gedrückter Taste die Maus bewegt wird.
     * Das mousemove-Event wird beim Loslassen der Taste wieder
     * entfernt.
     */
    $('#area').mousedown(function (event) {
        if (event.button === 0) {
            now.distMsg({x: event.pageX, y: event.pageY});
            $(this).bind('mousemove', function (event) {
                now.distMsg({x: event.pageX, y: event.pageY});
            });
        }
    }).mouseup(function (event) {
        $(this).unbind('mousemove');
    });
    
    /**
     * NowJS:
     * Beim erstmaligen Laden wird die Zeichenfarbe zufällig gesetzt
     * und now.hello() an den Server geschickt.
     * Wird eine Message vom Server empfangen, wird ein Punkt gemalt
     */
    now.ready(function () {
        now.color = '#' + ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6);
        now.hello();
        now.recvMsg = function (color, pos, points) {
            var context = canvas.getContext('2d');
            context.beginPath();
            context.fillStyle = color;
            context.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
            context.fill();
            context.closePath();
            $('#points').html(points.toString());
        };
    });
});
