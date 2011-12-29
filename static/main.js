/*
28C3 - Chaos Communication Congress
BEHING ENEMY LINES!

author: schinken

 */


var Config = {
    'dataMaxX':         1000,
    'dataMaxY':         1000,
    'canvasMaxX':       1000,
    'canvasMaxY':       1000,
    'updateInterval':   500
}

$(function() {

    var objCmd = new CommandCenter;

    var $visual = $('#visual');
    $visual.width   ( Config.canvasMaxX );
    $visual.height  ( Config.canvasMaxY );

    var lock = false;

    // Interval to update Data
    setInterval( function() {

        // Check if a lock exists to prevent concurrent AJAX's
        if( lock ) {
            return false;
        }

        // Set lock and register a timeout to remove lock after a specific timeout
        lock = true;
        var releaseLock = setTimeout( function() {
            lock = false;
        }, 3000 );

        // Run ajax with random get parameter to prevent caching from browser
        $.get('debug/proxy.php', {'rnd': Math.random() }, function( Data ) {

            // Remove lock if data is received
            lock = false;
            clearTimeout( releaseLock );

            // If data is set, update Commandcenter
            if( Data ) {
                objCmd.update( Data );
            }

        }, 'json' );

    }, Config.updateInterval );

    // Retrieve canvas element, and set its size as attribute
    var $paper  = $('#paper');

    $paper.attr ( {
        'width':    Config.canvasMaxX,
        'height':   Config.canvasMaxY
    } );

    // Retrieve 2d render context
    var ctx     = $paper[0].getContext('2d');

    // Render loop

    setInterval( function() {

        // CLEAR ALL THE CANVAS
        ctx.clearRect( 0, 0, Config.canvasMaxX, Config.canvasMaxY );

        // Retrieve r0kets and Radars
        var r0kets = objCmd.getR0kets();
        var radars = objCmd.getRadars();

        // The radars goes greeeeen...
        ctx.fillStyle = "#00A308";

        ctx.beginPath();

        for( var i in radars ) {
            var pos = radars[ i ].getPosition();
            ctx.arc( pos.x, pos.y, 12, 0, Math.PI*2, true);
        }

        ctx.closePath();
        ctx.fill();

        // The r0kets goes red
        ctx.fillStyle = "#FF0000";
        ctx.beginPath();

        for( var i in r0kets ) {
            var pos = r0kets[ i ].getPosition();
            ctx.arc( pos.x, pos.y, 8, 0, Math.PI*2, true);
        }

        ctx.closePath();
        ctx.fill();

    }, 1000 );


});