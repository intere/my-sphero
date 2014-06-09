/**
 * File: experiment.js
 * Purpose: Experiment by sending random values to the sphero (driving in random directions).
 */

var Cylon = require('cylon');

var config = require('./config');

console.log('Device Port: ' + config.DEVICE_PORT);

// var MAX_SPEED = 100;      // range = 0 - 255
var MAX_SPEED = 255;      //
var MAX_DISTANCE = 400;   // max distance
var STABILIZATION = true; // stabilization is on

Cylon.robot({
  connection: { name: 'sphero', adaptor: 'sphero', port: config.DEVICE_PORT },
  device: { name: 'sphero', driver: 'sphero' },

  work: function(me) {

    me.sphero.on('connect', function() {
      console.log("Setting up Collision Detection...");
      me.sphero.detectCollisions();
      me.sphero.setRGB(0x00FF00);
    });

    me.sphero.on('update', function(data) {
      console.log("Update event eventName: " + data + " ");
      console.log("Update event args: ");
      console.log(data);
    });

    me.sphero.on('message', function(data) {
      me.sphero.setRGB(0x0000FF);
      console.log("Message:");
      console.log(data);
    });

    me.sphero.on('collision', function(data) {
      me.sphero.setRGB(0xFF0000);
      console.log("Collision:");
      console.log(data);
    });

    me.sphero.on('notification', function(data) {
      me.sphero.setRGB(0xFF0000);
      console.log("Notification:");
      console.log(data);
    });

    every((1).second(), function() {
      var speed = Math.floor(Math.random()*MAX_SPEED);  // speed 0 - 255
      var distance = 100 + Math.floor(Math.random() * MAX_DISTANCE);
      console.log("Speed: " + speed + ", Distance=" + distance + ", Stabilization: " + STABILIZATION);
      me.sphero.setRandomColor();
      me.sphero.setStabilization(STABILIZATION);
      me.sphero.roll(speed,distance);
      STABILIZATION = !STABILIZATION;
    });
  }
}).start();
