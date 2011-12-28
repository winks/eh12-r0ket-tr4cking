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

    this.updatePosition = function ( X, Y, UpdateTime ) {
        this.posX = X;
        this.posY = Y;
        this.lastUpdate = UpdateTime || Math.floor(new Date().getTime() / 1000);
    }

    this.setRadar       = function ( Radar )    {   this.Radar = Radar;                         }
    this.getPosition    = function ()           {   return { 'x': this.posX, 'y': this.posY };  }
    this.getRadar       = function ()           {   return this.Radar;                          }

}