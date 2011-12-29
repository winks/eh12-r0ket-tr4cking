/**
 * User: schinken
 * Date: 12/28/11
 * Time: 10:36 PM
 */


function r0ket( Id, X, Y ) {

    this.Id = Id;
    this.Radar = null;

    this.posY = X | 0;
    this.posX = Y | 0;

    this.lastUpdate = null;

    /**
     * Update position of r0ket
     * @param X int
     * @param Y int
     * @param UpdateTime int
     */
    this.updatePosition = function ( X, Y, UpdateTime ) {
        this.posX = X;
        this.posY = Y;
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
        return {
            'x': this.posX,
            'y': this.posY
        };
    };

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
}