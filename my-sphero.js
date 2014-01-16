var Cylon = require('cylon');

var DEVICE_PORT = '/dev/cu.Sphero-ROR-AMP-SPP';

Cylon.robot({
  // connection: { name: 'sphero', adaptor: 'sphero', port: '/dev/cu.Sphero-PGR-AMP-SPP' },
  connection: { name: 'sphero', adaptor: 'sphero', port: DEVICE_PORT },
  device: { name: 'sphero', driver: 'sphero' },

  work: function(my) {


    var amount = 30;
    var direction = 120;
    var speed = 60;
    var backup = false;
    var backupCount = 0;

    my.sphero.detectCollisions();
    my.sphero.on('collision', function(data) {
      console.log('Collision');
      backup = true;
      backupCount = 0;
    });

    every((0.3).second(), function() {

      // var colors = [ 'blue', 'green', 'purple', 'black', 'red' ];
      // var color = colors[Math.floor(Math.random() * colors.length)];

      if(backup) {
        my.sphero.setColor('red');
        my.sphero.roll(speed/2, (direction + 180) % 360);
        ++backupCount;
        if(backupCount==10) {
          backup = false;
        }
      } else {
        my.sphero.setColor('green');
        my.sphero.roll(speed, direction);

        var increment = 10;
        // if(direction + increment > 90) {
        //   speed += 1;
        // }

        direction = (direction + increment) % 360;
      } 

    });

  }
}).start();


