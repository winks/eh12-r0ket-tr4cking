/**
 * User: schinken
 * Date: 12/28/11
 * Time: 10:46 PM
 */


function CommandCenter() {

    this.r0kets = {};
    this.radars = {};
    this.floors = {};
    this.floorcounts = {};
    var that   = this;

    /**
     * Public update method, if new data is available
     * @param Data
     */

    this.update = function( Data ) {

        // UPDATE ALL THE RADARS first, for consitency checks for the rockts
        if( Data.reader ) {
            updateRadars( Data.reader );
        }

        // If tag datapoint exists, UPDATE ALL THE R0KETS!
        if( Data.tag ) {
            updateR0kets( Data.tag );
        }
        
        //now update floor counter in guis
        //and add/delete floors
        for( var index in this.floors )
            this.floors[index].invalid=true;
        
        
        for( var index in this.floorcounts ) {
            if( !this.floors[index] ) {
                this.floors[index]=new Floor( index );
            }else{
                this.floors[index].invalid = false;
                this.floors[index].count    = this.floorcounts[index];
            }
        };
        
        for( var index in this.floors ) {
            if( this.floors[index].invalid ) {
                this.floors[index].destruktor();
                this.floors[index]=undefined;
                continue;
            }
            this.floors[index].updateText();
        }

    };

    /**
     * Update all r0kets
     * @param r0ketData
     */
    function updateR0kets( r0ketData ) {

        var tmpR0kets = {}, tmp = null, tmpFloors = {};

        // Iterate over each tag

        for( var Key in r0ketData ) {

            var Datapoint = r0ketData[ Key ];

            // Resolve matching radar
            var radarId = Datapoint.reader;

            // Skipping undefined radar (wtf...)
            if( !radarId ) {
                console.error('Undefined radar!? Oo');
                continue;
            }

            if( !that.radarExists( radarId ) ) {
                console.error('WTF? R0ket is attached to an reader that doesnt exist.');
                continue;
            }

            // Create instance of r0ket if it doesnt exist,
            // in other case, use the reference of the current

            var r0ketId = Datapoint.id;
            if( that.r0ketExists( r0ketId ) ) {
                tmpR0kets[ r0ketId ] = that.getR0ket( r0ketId );
            } else {
                tmpR0kets[ r0ketId ] = new r0ket( r0ketId, Datapoint.px, Datapoint.py );
            }

            // Here i can rely that radarId exists due to previous checks
            var Radar = that.getRadar( radarId );

            // Update position of r0ket, set Radar
            tmpR0kets[ r0ketId ].updatePosition( Datapoint.px, Datapoint.py );
            tmpR0kets[ r0ketId ].setRadar( Radar );

            // Count r0kets on each floor
            var floor = tmpR0kets[ r0ketId ].getFloor();
            if( !tmpFloors[ floor ] ) {
                tmpFloors[ floor ] = 1;
            } else {
                tmpFloors[ floor ]++;
            }

        }

        that.r0kets = tmpR0kets;
        that.floorcounts = tmpFloors;

    }

    /**
     * Create ALL the Radar objects (if they doesnt exist)
     * @param radarData
     */

    function updateRadars( radarData ) {

        var tmpRadars = {}, tmp = null;

        for( var Index in radarData ) {

            tmp = radarData[ Index ];

            if( that.radarExists( tmp.id ) ) {
                tmpRadars[ tmp.id ] = that.radars[ tmp.id ];
                tmpRadars[ tmp.id ].setPosition( tmp.px, tmp.py );
            } else {
                tmpRadars[ tmp.id ] = new Radar( tmp.id, tmp.floor, tmp.px, tmp.py, tmp.room );
            }

        }

        // Using this method to delete old radar datas, but keep old one,
        // in case that anything changes
        that.radars = tmpRadars;

    }

    /**
     * Returns if an Radar exists by id
     * @return bool
     * @param radarId
     */
    this.radarExists = function( radarId ) {
        return ( this.radars[ radarId ] ) ? true : false;
    }

    /**
     * Returns if an r0ket exists by id
     * @return bool
     * @param r0ketId
     */
    this.r0ketExists = function( r0ketId ) {
        return ( this.r0kets[ r0ketId ] )? true : false;
    }


    /**
     * RETURN ALL THE RADARS!
     * @return Radar[]
     */
    this.getRadars  = function() {
        return this.radars;
    }

    /**
     * Return radar given by radarId - if not exists, null
     * @return Radar|null
     * @param radarId int
     */
    this.getRadar   = function( radarId ) {
        if( !this.radarExists( radarId ) ) {
            return null;
        }

        return this.radars[ radarId ];
    }

    /**
     * RETURN ALL THE R0KETS
     * @return r0ket[]
     */
    this.getR0kets = function() {
        return this.r0kets;
    }

    /**
     * Returns r0ket by an given id
     * @return r0ket
     * @param r0ketId int
     */
    this.getR0ket = function( r0ketId ) {

        if( !this.r0ketExists( r0ketId ) ) {
            return null;
        }

        return this.r0kets[ r0ketId ];
    }

    /**
     * Returns key=>value pair of floor => number of r0kets
     */
    this.getFloors = function () {
        return this.floors;
    }

}
