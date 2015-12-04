'use strict';

// Takes a function, returns a function that will can only be
// called a certain amount of times per second.
// Original function is called only when specified period has elapsed.
// If called more than once in the period, preceding calls are
// removed from queue, and last one get called on first scheduled time.

// E.g.

/*

  const conquer = throttle((what)=>{
    console.log(what + ' is conquered!');
  }, 1000 * 60 * 60); // once in a hour

  conquer('The world');   // called at 10:00, it will
                          // be scheduled to run at 11:00

  // later ...

  conquer('The universe');   // called at 10:15, it will
                             // be scheduled to run at 11:00
                             // conquer('The world') call is discarded

  // later ...

  conquer('Mars');           // called at 10:16, it will
                             // be scheduled to run at 11:00
                             // conquer('The universe') call is discarded

  // At 11:00 Mars is conquered!

  // later ...

  conquer('Jupiter');        // called at 11:16, it will
                             // be scheduled to run at 12:00

*/

module.exports = function throttle(fn, timeWindow) {
  let scheduled = null;
  return function() {
    const args = Array.from(arguments);
    if (scheduled === null) {
      scheduled = args;

      setTimeout(()=> {
        fn.apply(null, scheduled);
        scheduled = null;
      }, timeWindow);
    } else {
      scheduled = args;
    }
  };
};
