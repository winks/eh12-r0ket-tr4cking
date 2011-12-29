/**
 * User: schinken
 * Date: 12/28/11
 * Time: 10:37 PM
 */

function Radar( Id, Floor, X, Y, Room ) {

    this.Id     = Id;
    this.Floor  = Floor;
    this.posX   = X;
    this.posY   = Y;
    this.Room   = Room | 0;

    /**
     * Returns Floor of the Radar
     * @return int
     */
    this.getFloor = function() {
        return this.Floor;
    }

    /**
     * Returns the set room of the Radar
     * @return int
     */
    this.getRoom  = function() {
        return this.Room;
    }

    /**
     * Returns the Id
     * @return int
     */
    this.getId = function() {
        return this.Id;
    }

    /**
     * Returns position
     */
    this.getPosition = function() {
        return {
            'x': this.posX,
            'y': this.posY
        };
    }

    /**
     * Update position of the Radar
     * @param X
     * @param Y
     */
    this.setPosition = function( X, Y ) {
        this.posX = X;
        this.posY = Y;
    }

}