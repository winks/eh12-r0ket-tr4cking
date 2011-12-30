/**
 * User: xandy
 * Date: 12/29/11
 * Time: 10:33 PM
 */

function FloorView() {

    var floorHtmls={};


    var getFloorInfo = function(name) {
        return FloorCfg[name] ? FloorCfg[name] : {name:"Floor "+name , path:""}
    };

    var updateTexts = function() {
        for( var i in floorHtmls ) {
            var floor=floorHtmls[i].obj;
            floorHtmls[i].html.html( getFloorInfo(floor.getName()).name + ": " + Object.keys(floor.getR0kets()).length + " r0ckets");
        }
    };

    this.update = function( floors ){

        //check for new ones, delete old
        var newnames = {};
        for( var i in floors ) {

            //mark the layer not to be deleted 
            newnames[ floors[i].getName() ] = true;

            if( floorHtmls[ floors[i].getName() ] != undefined ) {
                continue;
            }

            var floor = floors[i];
            var $div  = $( '<div/>', {
                'class': 'floor-switch'
            });

            $( "#floormenu" )
                    .append( $div )
                    .addClass('floor-active');
                    
            ( function(floor) {
                $div.click( function() {

                    floor.setDisplay( !floor.isDisplayed() );

                    $(this).removeClass('floor-active floor-inactive');
                    if( floor.isDisplayed() ) {
                        $(this).addClass('floor-active');
                    } else {
                        $(this).addClass('floor-inactive');
                    }
                });
            } )(floor);

            floorHtmls[ floor.getName() ] = { html : $div , 
                                              obj  : floor };
        }
        //now delete ALL the floors that were not in this update
        for( var i in floorHtmls ) {

            if( !newnames[ i ] ) {
                floorHtmls[ i ].html.remove();
                delete floorHtmls[ i ];
            }
        }
        updateTexts();
    };
};

var FloorCfg = {
    1 : { name: "Floor 1",
          path: "foobar" } ,

    2 : { name: "hackcenter",
          path: "path_to_room" },


};
