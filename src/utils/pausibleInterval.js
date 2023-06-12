/*
 * This file exports a special interval, which can
 * be paused. This is used when performing rotations.
 * Token from: https://stackoverflow.com/questions/24724852/pause-and-resume-setinterval/24725066
 */

export function pausibleInterval(callback, interval) {
  var timerId,
    startTime,
    remaining = 0;
  var state = 0; //  0 = idle, 1 = running, 2 = paused, 3= resumed

  this.stop = function () {
    remaining = 0;
    state = 0;
    window.clearInterval(timerId);
  };

  this.pause = function () {
    if (state !== 1) return;
    remaining = interval - (new Date() - startTime);
    window.clearInterval(timerId);
    state = 2;
  };

  this.resume = function () {
    if (state !== 2) return;
    state = 3;
    window.setTimeout(this.timeoutCallback, remaining);
  };

  this.timeoutCallback = function () {
    if (state !== 3) return;

    callback();

    startTime = new Date();
    timerId = window.setInterval(callback, interval);
    state = 1;
  };

  startTime = new Date();
  timerId = window.setInterval(callback, interval);
  state = 1;
}
