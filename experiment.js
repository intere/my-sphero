/**
 * File: experiment.js
 * Purpose: Experiment by sending random values to the sphero (driving in random directions).
 */

var Cylon = require('cylon');

/** Device Configuration.  */
var config = require('./config');
console.log('Device Port: ' + config.DEVICE_PORT);


// var MAX_SPEED = 100;      // range = 0 - 255 (discovered by experimentation - not through the API docs...)
var MAX_SPEED = 255;      // I wanna go fast!
var MAX_DISTANCE = 400;   // max distance
var STABILIZATION = true; // stabilization is on

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

    me.sphero.on('update', function(data) {
      // Console log an event when it comes in
      console.log("Update event eventName: " + data + " ");
      console.log("Update event args: ");
      console.log(data);
    });

    me.sphero.on('message', function(data) {
      // when a message arrives, turn blue and print the message
      me.sphero.setRGB(0x0000FF);
      console.log("Message:");
      console.log(data);
    });

    me.sphero.on('collision', function(data) {
      // When a collision is detected, turn red and print out the collision info.
      me.sphero.setRGB(0xFF0000);
      console.log("Collision:");
      console.log(data);
    });

    me.sphero.on('notification', function(data) {
      // when a notification arrives, turn red and print the notification info.
      me.sphero.setRGB(0xFF0000);
      console.log("Notification:");
      console.log(data);
    });

    every((1).second(), function() {
      // Pick a random speed and distance, then log that out:
      var speed = Math.floor(Math.random()*MAX_SPEED);  // speed 0 - 255
      var distance = 100 + Math.floor(Math.random() * MAX_DISTANCE);
      console.log("Speed: " + speed + ", Distance=" + distance + ", Stabilization: " + STABILIZATION);

      // change to a random color, toggle stabilization (doesn't seem to do much of anything AFAICT).
      me.sphero.setRandomColor();
      me.sphero.setStabilization(STABILIZATION);
      me.sphero.roll(speed,distance);

      // now toggle the stabilization for the next run (was on = now off, was off = now on)
      STABILIZATION = !STABILIZATION;
    });
  }
}).start();
