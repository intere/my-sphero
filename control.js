var Cylon = require('cylon');

var config = require('./config');

console.log('Device Port: ' + config.DEVICE_PORT);

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: config.DEVICE_PORT },
  device: { name: 'sphero', driver: 'sphero' },

  work: function(my) {
    var color = 0x00FF00,
        bitFilter = 0xFFFF00;

    my.sphero.on('connect', function() {
      // console.log("Setting up Collision Detection...");
      // my.sphero.detectCollisions();
      console.log("Setting up locator data");
      my.sphero.detectLocator();
      my.sphero.setRGB(color);
      my.sphero.stop();
    });

    my.sphero.on('locator', function(data) {
      // console.log("locator:");
      console.log('X: ' + data[0] + ', Y: ' + data[1] + ', XVel: ' + data[2] + ', YVel: ' + data[3] + ', SOG: ' + data[4]);
    });

    // my.sphero.on('collision', function(data) {
    //   console.log("Collision:");
    //   color = color ^ bitFilter;
    //   console.log("Color: " + (color.toString(16)) + " ");
    //   my.sphero.setRGB(color);
    //   my.sphero.roll(128, Math.floor(Math.random() * 360));
    // });

  }
}).start();
