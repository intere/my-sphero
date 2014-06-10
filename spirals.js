/**
 * spirals.js: Drives in clockwise circles initially, until a collission, then
 * reverses the direction (rinse and repeat).
 */

var Cylon = require('cylon');

/** Device Configuration.  */
var config = require('./config');
console.log('Device Port: ' + config.DEVICE_PORT);

var MAX_SPEED = 255;      // I wanna go fast!
var direction = 90;
var speed = 30;
var forward = true;

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: config.DEVICE_PORT },
  device: { name: 'sphero', driver: 'sphero' },

  work: function(me) {

    me.sphero.on('connect', function() {
      console.log("Setting up Collision Detection...");
      // Enable collision detection after connecting, then set the color to green
      me.sphero.detectCollisions();
      me.sphero.setRGB(0x00FF00);
    });

    me.sphero.on('collision', function(data) {
      // When a collision is detected, turn red and print out the collision info.
      me.sphero.setRGB(0xFF0000);
      console.log("Collision:");
      console.log(data);

      // change direction
      forward = !forward;
    });

    every((0.3).second(), function() {

      me.sphero.setRandomColor();
      me.sphero.roll(MAX_SPEED,direction);

      if(forward) {
        direction = Math.abs((direction + 45) % 360);
      } else {
        direction = Math.abs((direction - 45) % 360);
      }
      speed = (speed + 30) % 256;
    });
  }
}).start();
