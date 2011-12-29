/*
28C3 - Chaos Communication Congress
BEHING ENEMY LINES!

author: schinken

 */

var r0ketSilo = {};
var Radars = {};
var Floors = {};

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


    /**
     * Render loop
     */

    var floors = {};
    var r0kets = {};
    var radars = {};

    setInterval( function() {

        console.log( objCmd.getR0kets() );
        console.log( objCmd.getRadars() );

    }, 2000 );
/*

    function drawItems() {

        var r0ket = null;

        for( var Id in r0ketSilo ) {

            r0ket = r0ketSilo[ Id ];
            var radar = r0ket.getRadar();

            var pos = r0ket.getPosition();

            var x   = map_range( pos.x, 0, Config.dataMaxX, 0, Config.canvasMaxX );
            var y   = map_range( pos.y, 0, Config.dataMaxY, 0, Config.canvasMaxY );

            var title = 'R0ket: '+Id+ ' - Floor: ' +radar.getFloor();

            r0ket.getDOM()
                    .animate({'left': Config.canvasMaxX-x, 'top': Config.canvasMaxY-y }, Config.updateInterval )
                    .attr('title', title )


        }

        var dbg = '';
        for( var f in Floors ) {
            dbg += 'On Floor '+f+' are '+Floors[f]+' r0kets<br>';
        }

        $dbg.html(dbg);

    }

*/

});