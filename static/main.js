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

var $lifeform = $('<div/>');
$lifeform.addClass('lifeform');

var $radar = $('<div/>');
$radar.addClass('radar');

var $floor = $('<checkbox/>');
$floor.addClass('floor');

function r0ket( Id, X, Y ) {

    this.Id = Id;
    this.Radar = null;

    this.posY = X | 0;
    this.posX = Y | 0;

    this.lastUpdate = null;

    this.$DOM = $lifeform.clone();
    this.$DOM.css({'left': Config.canvasMaxX-this.posX, 'top': Config.canvasMaxY-this.posY});


    this.updatePosition = function ( X, Y, UpdateTime ) {
        this.posX = X;
        this.posY = Y;
        this.lastUpdate = UpdateTime || Math.floor(new Date().getTime() / 1000);
    }

    this.setRadar = function ( Radar ) {
        this.Radar = Radar;
    }

    this.getPosition  = function () {
        return { 'x': this.posX, 'y': this.posY };
    }

    this.getRadar = function () {
        return this.Radar;
    }

    this.getDOM = function() {
        return this.$DOM;
    }

}

function Radar( Id, Floor, X, Y, Room ) {

    this.Id     = Id;
    this.Floor  = Floor;
    this.posX   = X;
    this.posY   = Y;
    this.Room   = Room | 0;


    this.$DOM = $radar.clone();
    this.$DOM.css({'left': Config.canvasMaxX-this.posX-55, 'top': Config.canvasMaxY-this.posY-55});


    this.getFloor = function() { return this.Floor; }
    this.getRoom  = function() { return this.Room;  }
    this.getId    = function() { return this.Id;    }

    this.getPosition = function() {
        return { 'x': this.posX, 'y': this.posY };
    }

    this.getDOM = function() {
        return this.$DOM;
    }


}

$(function() {

  //  var ctx = $('#paper')[0].getContext("2d");

    var $visual = $('#visual');
    $visual.width   ( Config.canvasMaxX );
    $visual.height  ( Config.canvasMaxY );

    var $dbg = $('#dbg');

    var lock = false;

    function retrieveData() {

        if( lock ) {
            return false;
        }

        lock = true;

        $.get('debug/proxy.php', {'rnd': Math.random() }, function( Data ) {
            lock = false;
            if( Data ) {
                updateData( Data );
            }
        }, 'json' );
    }


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // UPDATE Datas

    function updateData( Data ) {

        // UPDATE ALL THE RADARS
        if( Data.reader ) {
            updateRadars( Data.reader );
        }

        // If tag datapoint exists, UPDATE ALL THE R0KETS!
        if( Data.tag ) {
            updateR0kets( Data.tag );
        }


        drawItems();
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // UPDATE r0ket-Silos

    function updateR0kets( Tags ) {

        var tmpFloor = {};

        // Iterate over each tag
        $.each( Tags, function( Key, Value ) {

            var id = Value.id;

            // Resolve matching radar
            var readerId = Value.reader;
            if( !Radars[ readerId ] ) {
                console.error('WTF? R0ket is attached to an reader that doesnt exist.');
                return;
            }

            // Create instance of r0ket, if not exists
            if( !r0ketSilo[ id ] ) {
                r0ketSilo[ id ] = new r0ket( id, Value.px, Value.py );
                $visual.append( r0ketSilo[ id ].getDOM() );
            }

            var Radar = Radars[ readerId ];
            var Floor = Radar.getFloor();

            if( !tmpFloor[ Floor ] ) {
                tmpFloor[ Floor ] = 1;
            } else {
                tmpFloor[ Floor ]++;
            }

            // Update position of r0ket, set Radar
            var curTag = r0ketSilo[ id ];
            curTag.updatePosition( Value.px, Value.py );
            curTag.setRadar( Radar );

        });

        Floors = tmpFloor;

    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // UPDATE Radars

    function updateRadars( dRadar ) {

        var tmp = null;
        for( var Id in dRadar ) {

            tmp = dRadar[ Id ];

            if( !Radars[ tmp.id ] ) {
                Radars[ tmp.id ] = new Radar( tmp.id, tmp.floor, tmp.px, tmp.py, tmp.room );
                $visual.append( Radars[ tmp.id ].getDOM() );
            }

        }
    }


    function drawItems() {

        var r0ket = null;

        for( var Id in r0ketSilo ) {

            r0ket = r0ketSilo[ Id ];
            var radar = r0ket.getRadar();

            var pos = r0ket.getPosition();

            var x   = map_range( pos.x, 0, Config.dataMaxX, 0, Config.canvasMaxX );
            var y   = map_range( pos.y, 0, Config.dataMaxY, 0, Config.canvasMaxY );

            var title = 'Radar: '+radar.getId()+ ' - Floor: ' +radar.getFloor();

            r0ket.getDOM()
                    .animate({'left': Config.canvasMaxX-x, 'top': Config.canvasMaxY-y }, Config.updateInterval )
                    .attr('title', title )


        }

        var dbg = '';
        for( var f in Floors ) {
            dbg += 'On Floor '+f+' are '+Floors[f]+' r0kets<br>';
        }

        console.log(dbg);
        $dbg.html(dbg);

    }


    setInterval( function() {
        retrieveData();
    }, Config.updateInterval );


});