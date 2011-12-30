/*
28C3 - Chaos Communication Congress
BEHING ENEMY LINES!

author: schinken

 */


var Config = {
    'dataMaxX':         1000,
    'dataMaxY':         1000,
    'canvasMaxY':       863,
    'canvasMaxX':       1000,
    'updateInterval':   500
}

function map_range( val, min1, max1, min2, max2 ) {
    return (val-min1)/(max1-min1) * (max2-min2) + min2;
}

function map_canvas( val1, val2 ) {
    return {
        'x': map_range( val1, 0, Config.dataMaxX, 0, Config.canvasMaxX ),
        'y': map_range( val2, 0, Config.dataMaxY, 0, Config.canvasMaxX )
    };
}

var offsetX = 60;
var offsetY = -30;

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

            drawCanvas();

        }, 'json' );

    }, Config.updateInterval );

    //    {"id":3905768340,"px":605,"py":452,"reader":1049},

    var stalkId = 89203649;
    $('#r0ketid').change( function() {
        stalkId = parseInt( $(this).val() , 16 );
    });

    // Retrieve canvas element, and set its size as attribute
    var $paper  = $('#paper');

    $paper.attr ( {
        'width':    Config.canvasMaxX,
        'height':   Config.canvasMaxY
    } );

    // Retrieve 2d render context
    var ctx     = $paper[0].getContext('2d');
    // Render loop

    var floorFiles = ['layer_1.png' , 'layer_2.png', 'layer_3.png' ];
    var floorDraw  = {};

    for( var i=0,l=floorFiles.length; i<l; i++ ) {

        var file = 'static/floorplans/'+floorFiles[i];
        var img  = new Image();

        floorDraw[i] = {
            'file':     file,
            'image':    img,
            'loaded': false
        };

        (function (i) {
            img.onload = function( ) {
                floorDraw[i].loaded = true;
            };
        })( i );

        img.src = file;
    }

    // add a clickelement to all coming
    $('.floor-switch').live('click', function() {
        drawCanvas();
    });

    function drawCanvas () {

        // CLEAR ALL THE CANVAS
        ctx.clearRect( 0, 0, Config.canvasMaxX, Config.canvasMaxY );

        for( var i in floorDraw ) {
            var floorImage = floorDraw[ i ];
            if( floorImage.loaded ) {
                ctx.moveTo(0,0);
                ctx.drawImage( floorImage.image, 0, 0 );
            }
        }

        var floor  = null, r0kets = [], radars = [], map = {};
        var floors = objCmd.getFloors();

     //   floors[1].setDisplay( false );
      //  floors[2].setDisplay( true );
      //  floors[3].setDisplay( false );

        for( var f in floors) {
            floor = floors[ f ];

            if( !floor.isDisplayed() ) {
                continue;
            }

            r0kets = floor.getR0kets();
            radars = floor.getRadars();

            //////////////////////////////////////////////////////////////////////////////////
            // Draw r0kets

            ctx.fillStyle = "#FF0000";
            ctx.beginPath();

            for( var r in r0kets ) {
                var pos = r0kets[ r ].getPosition();
                    map = map_canvas( offsetX+pos.X, offsetY+pos.Y );

                ctx.moveTo( map.x, map.y );
                ctx.arc( map.x, map.y, 3, 0, Math.PI*2, true);
            }

            ctx.closePath();
            ctx.fill();

            //////////////////////////////////////////////////////////////////////////////////
            // Draw nicknames to r0kets

            ctx.fillStyle = "#FFFFFF";
            for( var r in r0kets ) {
                
                var pos = r0kets[ r ].getPosition();
                                    map = map_canvas( offsetX+pos.X, offsetY+pos.Y );

                if( r0kets[ r ].getNick() ) {
                    ctx.moveTo( map.x+7, map.y+3 );
                    ctx.fillText( r0kets[ r ].getNick() , map.x+7, map.y+3);
                }
            }

            //////////////////////////////////////////////////////////////////////////////////
            // Draw radars

            ctx.fillStyle = "#00A308";
            ctx.beginPath();

            for( var i in radars ) {
                var pos = radars[ i ].getPosition();
                    map = map_canvas( offsetX+pos.X, offsetY+pos.Y );

                ctx.moveTo( map.x, map.y );
                ctx.arc( map.x, map.y, 12, 0, Math.PI*2, true);
            }

            ctx.closePath();
            ctx.fill();

            //////////////////////////////////////////////////////////////////////////////////
            // Draw movement path

            ctx.strokeStyle = "#FF9900";
            ctx.lineWidth   = 2;
            ctx.beginPath();

            for( var i in r0kets ) {

                var history = r0kets[ i ].getPositionHistory().getQueue();
                var previous = false;
                for( var x in history ) {

                    map = map_canvas( offsetX+history[ x ].X, offsetY+history[ x ].Y );

                    if( previous ) {
                        ctx.lineTo( map.x, map.y );
                    }

                    ctx.moveTo( map.x, map.y )
                    previous = history[ x ];
                }
            }

            ctx.closePath();
            ctx.stroke();
        }


    }


});
