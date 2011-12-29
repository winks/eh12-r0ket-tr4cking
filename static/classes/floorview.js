function FloorView() {
    var floorHtmls={};
    

    var updateTexts=function(){
        for( var i in floorHtmls ) {
            var floor=floorHtmls[i].obj;
            floorHtmls[i].html.html( "Floor " + floor.getName() + " " + Object.keys(floor.getR0kets()).length + " r0ckets");
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
            var $div  = $( '<div/>' );

            $( "#floormenu" )
                    .append( $div )
                    .addClass('floor-switch floor-active');
                    
            (function(floor) {
                $div.click(function(){
                    floor.setDisplay( !floor.isDisplayed() );
                    $(this).removeClass('floor-active floor-inactive');
                    if( floor.isDisplayed() ) {
                        $(this).addClass('floor-active');
                    } else {
                        $(this).addClass('floor-inactive');
                    }
                });
            })(floor);
            floorHtmls[ floor.getName() ] = { html : $div , 
                                              obj  : floor };
        }
        //now delete ALL the floors that were not in this update
        for( var i in floorHtmls ) {
            if( !newnames[i] ) {
                floorHtmls[i].html.remove();
                delete floorHtmls[i];
            }
        }
        updateTexts();
    };
};
