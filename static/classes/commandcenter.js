/**
 * User: schinken
 * Date: 12/28/11
 * Time: 10:46 PM
 */


function CommandCenter() {

    this.r0kets = {};
    this.radars = {};
    var that   = this;

    /**
     * Public update method
     * @param Data
     */

    this.update = function( Data ) {

        // UPDATE ALL THE RADARS
        if( Data.reader ) {
            updateRadars( Data.reader );
        }

        // If tag datapoint exists, UPDATE ALL THE R0KETS!
        if( Data.tag ) {
            updateR0kets( Data.tag );
        }

    };

    /**
     * Update all r0kets
     * @param r0ketData
     */
    function updateR0kets( r0ketData ) {

        var tmpR0kets = {}, tmp = null;

        // Iterate over each tag

        for( var Key in r0ketData ) {

            var Datapoint = r0ketData[ Key ];

            // Resolve matching radar
            var radarId = Datapoint.reader;

            // Skipping undefined radar (wtf...)
            if( !radarId ) {
                return;
            }

            if( !that.radarExists( radarId ) ) {
                console.error('WTF? R0ket is attached to an reader that doesnt exist.');
                return;
            }

            // Create instance of r0ket if it doesnt exist,
            // in other case, use the reference of the current

            var r0ketId = Datapoint.id;
            if( !that.r0ketExists( r0ketId ) ) {
                tmpR0kets[ r0ketId ] = new r0ket( r0ketId, Datapoint.px, Datapoint.py );
            } else {
                tmpR0kets[ r0ketId ] = that.getR0ket( r0ketId );
            }

            var Radar = that.getRadar( radarId );

            // Update position of r0ket, set Radar
            tmpR0kets[ r0ketId ].updatePosition( Datapoint.px, Datapoint.py );
            tmpR0kets[ r0ketId ].setRadar( Radar );

        }

        that.r0kets = tmpR0kets;

    }

    /**
     * Create ALL the Radar objects (if they doesnt exist)
     * @param radarData
     */

    function updateRadars( radarData ) {

        var tmpRadars = {}, tmp = null;

        for( var Index in radarData ) {

            tmp = radarData[ Index ];

            if( !that.radarExists( tmp.id ) ) {
                tmpRadars[ tmp.id ] = new Radar( tmp.id, tmp.floor, tmp.px, tmp.py, tmp.room );
            } else {
                tmpRadars[ tmp.id ] = that.radars[ tmp.id ];
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

        return this.radarExists( radarId );
    }

    /**
     * RETURN ALL THE R0KETS
     * @return r0ket[]
     */
    this.getR0kets  = function() {
        return this.r0kets;
    }

    /**
     * Returns r0ket by an given id
     * @return r0ket
     * @param r0ketId int
     */
    this.getR0ket   = function( r0ketId ) {

        if( !this.r0ketExists( r0ketId ) ) {
            return null;
        }

        return this.r0kets[ r0ketId ];
    }

}