/**
 * Run this to (not drive) and change colors.
 */

var Cylon = require('cylon');

/** Device Configuration.  */
var config = require('./config');
console.log('Device Port: ' + config.DEVICE_PORT);

var i = 1;
var red = 0;
var green = 0;
var blue = 0;

var _helper = {
  rgbString: function(red, green, blue) {
    return '0x' + _helper.padHex(red.toString(16))
      + _helper.padHex(green.toString(16))
      + _helper.padHex(blue.toString(16));
  },
  padHex: function(hex) {
    if(hex.length<2) {
      return '0' + hex;
    }

    return hex;
  }
};

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: config.DEVICE_PORT },
  device: { name: 'sphero', driver: 'sphero' },

  work: function(me) {

    me.sphero.on('connect', function() {
      me.sphero.setRGB(0x00FF00);
      console.log("connected");
      me.sphero.stop();
    });

    every((0.1).second(), function() {
      var color = _helper.rgbString(red, green, blue);
      console.log('color: ' + color);
      me.sphero.setRGB(color);

      if(blue < 255) {
        ++blue;
      } else if(green < 255) {
        ++green;
      } else if(red < 255) {
        ++red;
      } else {
        red = green = blue = 0;
      }
      ++i;
    });
  }
}).start();
