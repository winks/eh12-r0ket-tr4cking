/**
 * User: schinken
 * Date: 12/28/11
 * Time: 10:36 PM
 */


function r0ket( Id, X, Y ) {

    this.Id         = Id;
    this.Radar      = null;
    this.Positions  = new Queue( 30 );

    this.lastUpdate = null;

    /**
     * Update position of r0ket
     * @param X int
     * @param Y int
     * @param UpdateTime int
     */
    this.updatePosition = function ( X, Y, UpdateTime ) {
        this.setPosition( X, Y );
        this.lastUpdate = UpdateTime || Math.floor(new Date().getTime() / 1000);
    }

    /**
     * Set attached Radar
     * @param Radar
     */
    this.setRadar = function ( Radar ) {
        this.Radar = Radar;
    };

    /**
     * Returns position of r0ket
     */
    this.getPosition = function () {
        return this.Positions.getTop();
    };

    /**
     * Sets Position
     * @param X int
     * @param Y int
     */

    this.setPosition = function( X, Y ) {
        this.Positions.push( new Point( X, Y ) );
    }


    /**
     * Returns the Position History
     * @return Queue
     */

    this.getPositionHistory = function() {
        return this.Positions;
    }

    /**
     * @return Radar
     */
    this.getRadar = function () {
        return this.Radar;
    };

    /**
     * Returns floor of Radar
     * @return int|null
     */
    this.getFloor = function () {

        if( this.Radar === null ) {
            return null;
        }

        return this.getRadar().getFloor();
    };

    // Set position of constructed item
    this.setPosition( X, Y );

}