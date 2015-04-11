//shake
;(function(root, factory){
    //return library for requirejs
    if(typeof define === 'function' && define.amd) {
        define('shake', function () {
            return factory;
        });
    } else {
        //default
        //register the function to window
        var Shake = factory(window);
        window.shake = new Shake();
    }
  }(this, function(window) {
    "use strict";
    var Shake = function () {
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;
        this.count = null;
        this.optios = null;
        this.completeCallback = null;
        this.threshold = 15;
        this.countOut = 5;
    };

    Shake.prototype = {
        constructor: Shake,
        //register function
        register: function (completeCallback) {
            //configure shake options
            if(typeof completeCallback === 'function') {
                this.completeCallback = completeCallback;
            }
            var self = this;
            window.addEventListener('devicemotion', function (event) {
                self.devicemotion.call(self, event);
            }, false);
        },
        //process when the device motioning
        devicemotion: function (e) {
            var currentAcce = e.acceleration,
                deltaX = 0,
                deltaY = 0,
                deltaZ = 0;

            if(!this.lastX && !this.lastY && !this.lastZ) {
                this.lastX = currentAcce.x;
                this.lastY = currentAcce.y;
                this.lastZ = currentAcce.z;
                this.count = 0;
                return;
            }

            deltaX = Math.abs(this.lastX - currentAcce.x);
            deltaY = Math.abs(this.lastY - currentAcce.y);
            deltaZ = Math.abs(this.lastZ - currentAcce.z);

            if(this.count > this.countOut) {
                this.complete.call(this);
                this.reset();
            }
            if(deltaX > this.threshold || this.deltaY > this.threshold || this.deltaZ > this.threshold) {
                this.count ++;
            }
        },
        //complete a shake action
        complete: function () {
            if(typeof this.completeCallback === 'function') {
                this.completeCallback.call();
            }
            this.count = 0;
            return;
        }
    };
    return Shake;
}));
