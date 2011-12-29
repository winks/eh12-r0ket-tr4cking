function FloorView() {
    var floorHtmls={};
    

    var updateTexts=function(){
        for( var i in floorHtmls ) {
            var floor=floorHtmls[i].obj;
            floorHtmls[i].html.html( "Floor " + floor.getName() + " " + Object.keys(floor.getR0kets()).length + " r0ckets");
        }
    };
    
    this.update = function( floors ){
        console.log("floorelements:" + Object.keys(floors).length);
        //check for new ones, delete old
        var newnames = {};
        for( var i in floors ) {
            console.log("floor",floors[i],"floorhtmls", floorHtmls[ floors[i].getName()]);
            //mark the layer not to be deleted 
            console.log("before newnames",Object.keys(newnames).length);
            newnames[ floors[i].getName() ] = true;
            console.log("after newnames",Object.keys(newnames).length);
            if( floorHtmls[ floors[i].getName() ] != undefined ) {
                console.log("have");
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
                    console.log("now insert into htmls");
                });
            })(floor);
            floorHtmls[ floor.getName() ] = { html : $div , 
                                              obj  : floor };
        }
        console.log(newnames, floorHtmls);
        //now delete ALL the floors that were not in this update
        for( var i in floorHtmls ) {
            if( !newnames[i] ) {
                floorHtmls[i].html.remove();
                delete floorHtmls[i];
            }
        }
        console.log("nbr:" + Object.keys(floorHtmls).length);
        updateTexts();
    };
};
