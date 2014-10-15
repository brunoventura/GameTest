var isNeedFpsMeter = !1,
    isLevelEditor = !1,
    isSkipMenus = !1,
    isSkipReadyWin = !1,
    y304 = 3,
    isLastLevelLoad = !1,
    isDisableWin = !1,
    isOpenAllLevels = !1,
    isPhysicsDebugDraw = !1,
    isGetAllProperties = !1,
    isLoadAnimFromJSON = !1,
    isDesktopBrowser = !1,
    y280 = 1,
    y73 = 2,
    y117 = 3,
    y188 = 4,
    y264 = 5,
    y38 = 6;
this.createjs = this.createjs || {};
(function() {
    var c = function(b, h, d) {
            this.initialize(b, h, d)
        },
        a = c.prototype;
    a.type = null;
    a.target = null;
    a.currentTarget = null;
    a.eventPhase = 0;
    a.bubbles = !1;
    a.cancelable = !1;
    a.timeStamp = 0;
    a.defaultPrevented = !1;
    a.propagationStopped = !1;
    a.immediatePropagationStopped = !1;
    a.removed = !1;
    a.initialize = function(b, h, d) {
        this.type = b;
        this.bubbles = h;
        this.cancelable = d;
        this.timeStamp = (new Date).getTime()
    };
    a.preventDefault = function() {
        this.defaultPrevented = !0
    };
    a.stopPropagation = function() {
        this.propagationStopped = !0
    };
    a.stopImmediatePropagation =
        function() {
            this.immediatePropagationStopped = this.propagationStopped = !0
        };
    a.remove = function() {
        this.removed = !0
    };
    a.clone = function() {
        return new c(this.type, this.bubbles, this.cancelable)
    };
    a.toString = function() {
        return "[Event (type=" + this.type + ")]"
    };
    createjs.Event = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function() {},
        a = c.prototype;
    c.initialize = function(b) {
        b.addEventListener = a.addEventListener;
        b.on = a.on;
        b.removeEventListener = b.off = a.removeEventListener;
        b.removeAllEventListeners = a.removeAllEventListeners;
        b.hasEventListener = a.hasEventListener;
        b.dispatchEvent = a.dispatchEvent;
        b._dispatchEvent = a._dispatchEvent
    };
    a._listeners = null;
    a._captureListeners = null;
    a.initialize = function() {};
    a.addEventListener = function(b, h, d) {
        var a;
        a = d ? this._captureListeners = this._captureListeners || {} : this._listeners =
            this._listeners || {};
        var c = a[b];
        c && this.removeEventListener(b, h, d);
        (c = a[b]) ? c.push(h): a[b] = [h];
        return h
    };
    a.on = function(b, h, d, a, c, g) {
        h.handleEvent && (d = d || h, h = h.handleEvent);
        d = d || this;
        return this.addEventListener(b, function(b) {
            h.call(d, b, c);
            a && b.remove()
        }, g)
    };
    a.removeEventListener = function(b, h, d) {
        if (d = d ? this._captureListeners : this._listeners) {
            var a = d[b];
            if (a)
                for (var c = 0, g = a.length; c < g; c++)
                    if (a[c] == h) {
                        1 == g ? delete d[b] : a.splice(c, 1);
                        break
                    }
        }
    };
    a.off = a.removeEventListener;
    a.removeAllEventListeners = function(b) {
        b ?
            (this._listeners && delete this._listeners[b], this._captureListeners && delete this._captureListeners[b]) : this._listeners = this._captureListeners = null
    };
    a.dispatchEvent = function(b, h) {
        if ("string" == typeof b) {
            var d = this._listeners;
            if (!d || !d[b]) return !1;
            b = new createjs.Event(b)
        }
        b.target = h || this;
        if (b.bubbles && this.parent) {
            for (var a = this, d = [a]; a.parent;) d.push(a = a.parent);
            for (var c = d.length, a = c - 1; 0 <= a && !b.propagationStopped; a--) d[a]._dispatchEvent(b, 1 + (0 == a));
            for (a = 1; a < c && !b.propagationStopped; a++) d[a]._dispatchEvent(b,
                3)
        } else this._dispatchEvent(b, 2);
        return b.defaultPrevented
    };
    a.hasEventListener = function(b) {
        var h = this._listeners,
            a = this._captureListeners;
        return !!(h && h[b] || a && a[b])
    };
    a.toString = function() {
        return "[EventDispatcher]"
    };
    a._dispatchEvent = function(b, h) {
        var a, c = 1 == h ? this._captureListeners : this._listeners;
        if (b && c && (c = c[b.type]) && (a = c.length)) {
            b.currentTarget = this;
            b.eventPhase = h;
            b.removed = !1;
            for (var c = c.slice(), f = 0; f < a && !b.immediatePropagationStopped; f++) {
                var g = c[f];
                g.handleEvent ? g.handleEvent(b) : g(b);
                b.removed &&
                    (this.off(b.type, g, 1 == h), b.removed = !1)
            }
        }
    };
    createjs.EventDispatcher = c
})();
this.createjs = this.createjs || {};
(function() {
    createjs.indexOf = function(c, a) {
        for (var b = 0, h = c.length; b < h; b++)
            if (a === c[b]) return b;
        return -1
    }
})();
this.createjs = this.createjs || {};
(function() {
    var c = function() {
        throw "UID cannot be instantiated";
    };
    c._nextID = 0;
    c.get = function() {
        return c._nextID++
    };
    createjs.UID = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function() {
        throw "Ticker cannot be instantiated.";
    };
    c.RAF_SYNCHED = "synched";
    c.RAF = "raf";
    c.TIMEOUT = "timeout";
    c.useRAF = !1;
    c.timingMode = null;
    c.maxDelta = 0;
    c.removeEventListener = null;
    c.removeAllEventListeners = null;
    c.dispatchEvent = null;
    c.hasEventListener = null;
    c._listeners = null;
    createjs.EventDispatcher.initialize(c);
    c._addEventListener = c.addEventListener;
    c.addEventListener = function() {
        !c._inited && c.init();
        return c._addEventListener.apply(c, arguments)
    };
    c._paused = !1;
    c._inited = !1;
    c._startTime =
        0;
    c._pausedTime = 0;
    c._ticks = 0;
    c._pausedTicks = 0;
    c._interval = 50;
    c._lastTime = 0;
    c._times = null;
    c._tickTimes = null;
    c._y42Id = null;
    c._raf = !0;
    c.init = function() {
        c._inited || (c._inited = !0, c._times = [], c._tickTimes = [], c._startTime = c._getTime(), c._times.push(c._lastTime = 0), c.setInterval(c._interval))
    };
    c.reset = function() {
        if (c._raf) {
            var b = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
            b && b(c._y42Id)
        } else clearTimeout(c._y42Id);
        c.removeAllEventListeners("tick")
    };
    c.setInterval = function(b) {
        c._interval = b;
        c._inited && c._setupTick()
    };
    c.getInterval = function() {
        return c._interval
    };
    c.setFPS = function(b) {
        c.setInterval(1E3 / b)
    };
    c.getFPS = function() {
        return 1E3 / c._interval
    };
    c.getMeasuredTickTime = function(b) {
        var a = c._tickTimes;
        if (1 > a.length) return -1;
        b = Math.min(a.length, b || c.getFPS() | 0);
        for (var d = 0; d < b; d++);
        return a / b
    };
    c.getMeasuredFPS = function(b) {
        var a = c._times;
        if (2 > a.length) return -1;
        b = Math.min(a.length - 1, b || c.getFPS() | 0);
        return 1E3 / ((a[0] -
            a[b]) / b)
    };
    c.setPaused = function(b) {
        c._paused = b
    };
    c.getPaused = function() {
        return c._paused
    };
    c.getTime = function(b) {
        return c._getTime() - c._startTime - (b ? c._pausedTime : 0)
    };
    c.getEventTime = function(b) {
        return (c._lastTime || c._startTime) - (b ? c._pausedTime : 0)
    };
    c.getTicks = function(b) {
        return c._ticks - (b ? c._pausedTicks : 0)
    };
    c._handleSynch = function() {
        var b = c._getTime() - c._startTime;
        c._y42Id = null;
        c._setupTick();
        b - c._lastTime >= 0.97 * (c._interval - 1) && c._tick()
    };
    c._handleRAF = function() {
        c._y42Id = null;
        c._setupTick();
        c._tick()
    };
    c._handleTimeout = function() {
        c._y42Id = null;
        c._setupTick();
        c._tick()
    };
    c._setupTick = function() {
        if (null == c._y42Id) {
            var b = c.timingMode || c.useRAF && c.RAF_SYNCHED;
            if (b == c.RAF_SYNCHED || b == c.RAF) {
                var a = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
                if (a) {
                    c._y42Id = a(b == c.RAF ? c._handleRAF : c._handleSynch);
                    c._raf = !0;
                    return
                }
            }
            c._raf = !1;
            c._y42Id = setTimeout(c._handleTimeout, c._interval)
        }
    };
    c._tick = function() {
        var b =
            c._getTime() - c._startTime,
            a = b - c._lastTime,
            d = c._paused;
        c._ticks++;
        d && (c._pausedTicks++, c._pausedTime += a);
        c._lastTime = b;
        if (c.hasEventListener("tick")) {
            var e = new createjs.Event("tick"),
                f = c.maxDelta;
            e.delta = f && a > f ? f : a;
            e.paused = d;
            e.time = b;
            e.runTime = b - c._pausedTime;
            c.dispatchEvent(e)
        }
        for (c._tickTimes.unshift(c._getTime() - b); 100 < c._tickTimes.length;) c._tickTimes.pop();
        for (c._times.unshift(b); 100 < c._times.length;) c._times.pop()
    };
    var a = window.performance && (performance.now || performance.mozNow || performance.msNow ||
        performance.oNow || performance.webkitNow);
    c._getTime = function() {
        return a && a.call(performance) || (new Date).getTime()
    };
    createjs.Ticker = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b, a, d, c, f, g, k, m, q, w) {
            this.initialize(b, a, d, c, f, g, k, m, q, w)
        },
        a = c.prototype = new createjs.Event;
    a.y41X = 0;
    a.y41Y = 0;
    a.rawX = 0;
    a.rawY = 0;
    a.nativeEvent = null;
    a.pointerID = 0;
    a.primary = !1;
    a.addEventListener = null;
    a.removeEventListener = null;
    a.removeAllEventListeners = null;
    a.dispatchEvent = null;
    a.hasEventListener = null;
    a._listeners = null;
    createjs.EventDispatcher.initialize(a);
    a.Event_initialize = a.initialize;
    a.initialize = function(b, a, d, c, f, g, k, m, q, w) {
        this.Event_initialize(b, a, d);
        this.y41X = c;
        this.y41Y = f;
        this.nativeEvent = g;
        this.pointerID = k;
        this.primary = m;
        this.rawX = null == q ? c : q;
        this.rawY = null == w ? f : w
    };
    a.clone = function() {
        return new c(this.type, this.bubbles, this.cancelable, this.y41X, this.y41Y, this.target, this.nativeEvent, this.pointerID, this.primary, this.rawX, this.rawY)
    };
    a.toString = function() {
        return "[MouseEvent (type=" + this.type + " y41X=" + this.y41X + " y41Y=" + this.y41Y + ")]"
    };
    createjs.MouseEvent = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b, a, d, c, f, g) {
            this.initialize(b, a, d, c, f, g)
        },
        a = c.prototype;
    c.identity = null;
    c.DEG_TO_RAD = Math.PI / 180;
    a.a = 1;
    a.b = 0;
    a.c = 0;
    a.d = 1;
    a.tx = 0;
    a.ty = 0;
    a.alpha = 1;
    a.shadow = null;
    a.compositeOperation = null;
    a.initialize = function(b, a, d, c, f, g) {
        this.a = null == b ? 1 : b;
        this.b = a || 0;
        this.c = d || 0;
        this.d = null == c ? 1 : c;
        this.tx = f || 0;
        this.ty = g || 0;
        return this
    };
    a.prepend = function(b, a, d, c, f, g) {
        var k = this.tx;
        if (1 != b || 0 != a || 0 != d || 1 != c) {
            var m = this.a,
                q = this.c;
            this.a = m * b + this.b * d;
            this.b = m * a + this.b * c;
            this.c = q * b + this.d *
                d;
            this.d = q * a + this.d * c
        }
        this.tx = k * b + this.ty * d + f;
        this.ty = k * a + this.ty * c + g;
        return this
    };
    a.append = function(b, a, d, c, f, g) {
        var k = this.a,
            m = this.b,
            q = this.c,
            w = this.d;
        this.a = b * k + a * q;
        this.b = b * m + a * w;
        this.c = d * k + c * q;
        this.d = d * m + c * w;
        this.tx = f * k + g * q + this.tx;
        this.ty = f * m + g * w + this.ty;
        return this
    };
    a.prependMatrix = function(b) {
        this.prepend(b.a, b.b, b.c, b.d, b.tx, b.ty);
        this.prependProperties(b.alpha, b.shadow, b.compositeOperation);
        return this
    };
    a.appendMatrix = function(b) {
        this.append(b.a, b.b, b.c, b.d, b.tx, b.ty);
        this.appendProperties(b.alpha,
            b.shadow, b.compositeOperation);
        return this
    };
    a.prependTransform = function(b, a, d, e, f, g, k, m, q) {
        if (f % 360) {
            var w = f * c.DEG_TO_RAD;
            f = Math.cos(w);
            w = Math.sin(w)
        } else f = 1, w = 0;
        if (m || q) this.tx -= m, this.ty -= q;
        g || k ? (g *= c.DEG_TO_RAD, k *= c.DEG_TO_RAD, this.prepend(f * d, w * d, -w * e, f * e, 0, 0), this.prepend(Math.cos(k), Math.sin(k), -Math.sin(g), Math.cos(g), b, a)) : this.prepend(f * d, w * d, -w * e, f * e, b, a);
        return this
    };
    a.appendTransform = function(b, a, d, e, f, g, k, m, q) {
        if (f % 360) {
            var w = f * c.DEG_TO_RAD;
            f = Math.cos(w);
            w = Math.sin(w)
        } else f = 1, w = 0;
        g ||
            k ? (g *= c.DEG_TO_RAD, k *= c.DEG_TO_RAD, this.append(Math.cos(k), Math.sin(k), -Math.sin(g), Math.cos(g), b, a), this.append(f * d, w * d, -w * e, f * e, 0, 0)) : this.append(f * d, w * d, -w * e, f * e, b, a);
        if (m || q) this.tx -= m * this.a + q * this.c, this.ty -= m * this.b + q * this.d;
        return this
    };
    a.rotate = function(b) {
        var a = Math.cos(b);
        b = Math.sin(b);
        var d = this.a,
            c = this.c,
            f = this.tx;
        this.a = d * a - this.b * b;
        this.b = d * b + this.b * a;
        this.c = c * a - this.d * b;
        this.d = c * b + this.d * a;
        this.tx = f * a - this.ty * b;
        this.ty = f * b + this.ty * a;
        return this
    };
    a.skew = function(b, a) {
        b *= c.DEG_TO_RAD;
        a *= c.DEG_TO_RAD;
        this.append(Math.cos(a), Math.sin(a), -Math.sin(b), Math.cos(b), 0, 0);
        return this
    };
    a.scale = function(b, a) {
        this.a *= b;
        this.d *= a;
        this.c *= b;
        this.b *= a;
        this.tx *= b;
        this.ty *= a;
        return this
    };
    a.translate = function(b, a) {
        this.tx += b;
        this.ty += a;
        return this
    };
    a.identity = function() {
        this.alpha = this.a = this.d = 1;
        this.b = this.c = this.tx = this.ty = 0;
        this.shadow = this.compositeOperation = null;
        return this
    };
    a.invert = function() {
        var b = this.a,
            a = this.b,
            d = this.c,
            c = this.d,
            f = this.tx,
            g = b * c - a * d;
        this.a = c / g;
        this.b = -a / g;
        this.c = -d /
            g;
        this.d = b / g;
        this.tx = (d * this.ty - c * f) / g;
        this.ty = -(b * this.ty - a * f) / g;
        return this
    };
    a.isIdentity = function() {
        return 0 == this.tx && 0 == this.ty && 1 == this.a && 0 == this.b && 0 == this.c && 1 == this.d
    };
    a.transformPoint = function(b, a, d) {
        d = d || {};
        d.x = b * this.a + a * this.c + this.tx;
        d.y = b * this.b + a * this.d + this.ty;
        return d
    };
    a.decompose = function(b) {
        null == b && (b = {});
        b.x = this.tx;
        b.y = this.ty;
        b.scaleX = Math.sqrt(this.a * this.a + this.b * this.b);
        b.scaleY = Math.sqrt(this.c * this.c + this.d * this.d);
        var a = Math.atan2(-this.c, this.d),
            d = Math.atan2(this.b,
                this.a);
        a == d ? (b.rotation = d / c.DEG_TO_RAD, 0 > this.a && 0 <= this.d && (b.rotation += 0 >= b.rotation ? 180 : -180), b.skewX = b.skewY = 0) : (b.skewX = a / c.DEG_TO_RAD, b.skewY = d / c.DEG_TO_RAD);
        return b
    };
    a.reinitialize = function(b, a, d, c, f, g, k, m, q) {
        this.initialize(b, a, d, c, f, g);
        this.alpha = null == k ? 1 : k;
        this.shadow = m;
        this.compositeOperation = q;
        return this
    };
    a.copy = function(b) {
        return this.reinitialize(b.a, b.b, b.c, b.d, b.tx, b.ty, b.alpha, b.shadow, b.compositeOperation)
    };
    a.appendProperties = function(b, a, d) {
        this.alpha *= b;
        this.shadow = a || this.shadow;
        this.compositeOperation = d || this.compositeOperation;
        return this
    };
    a.prependProperties = function(b, a, d) {
        this.alpha *= b;
        this.shadow = this.shadow || a;
        this.compositeOperation = this.compositeOperation || d;
        return this
    };
    a.clone = function() {
        return (new c).copy(this)
    };
    a.toString = function() {
        return "[Matrix2D (a=" + this.a + " b=" + this.b + " c=" + this.c + " d=" + this.d + " tx=" + this.tx + " ty=" + this.ty + ")]"
    };
    c.identity = new c;
    createjs.Matrix2D = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b, a) {
            this.initialize(b, a)
        },
        a = c.prototype;
    a.x = 0;
    a.y = 0;
    a.initialize = function(b, a) {
        this.x = null == b ? 0 : b;
        this.y = null == a ? 0 : a;
        return this
    };
    a.copy = function(b) {
        return this.initialize(b.x, b.y)
    };
    a.clone = function() {
        return new c(this.x, this.y)
    };
    a.toString = function() {
        return "[Point (x=" + this.x + " y=" + this.y + ")]"
    };
    createjs.Point = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b, a, d, c) {
            this.initialize(b, a, d, c)
        },
        a = c.prototype;
    a.x = 0;
    a.y = 0;
    a.width = 0;
    a.height = 0;
    a.initialize = function(b, a, d, c) {
        this.x = b || 0;
        this.y = a || 0;
        this.width = d || 0;
        this.height = c || 0;
        return this
    };
    a.copy = function(b) {
        return this.initialize(b.x, b.y, b.width, b.height)
    };
    a.clone = function() {
        return new c(this.x, this.y, this.width, this.height)
    };
    a.toString = function() {
        return "[Rectangle (x=" + this.x + " y=" + this.y + " width=" + this.width + " height=" + this.height + ")]"
    };
    createjs.Rectangle = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b, a, d, c, f, g, k) {
            this.initialize(b, a, d, c, f, g, k)
        },
        a = c.prototype;
    a.target = null;
    a.overLabel = null;
    a.outLabel = null;
    a.downLabel = null;
    a.play = !1;
    a._isPressed = !1;
    a._isOver = !1;
    a.initialize = function(b, a, d, c, f, g, k) {
        b.addEventListener && (this.target = b, b.cursor = "pointer", this.overLabel = null == d ? "over" : d, this.outLabel = null == a ? "out" : a, this.downLabel = null == c ? "down" : c, this.play = f, this.setEnabled(!0), this.handleEvent({}), g && (k && (g.actionsEnabled = !1, g.gotoAndStop && g.gotoAndStop(k)), b.hitArea = g))
    };
    a.setEnabled = function(b) {
        var a = this.target;
        b ? (a.addEventListener("rollover", this), a.addEventListener("rollout", this), a.addEventListener("mousedown", this), a.addEventListener("pressup", this)) : (a.removeEventListener("rollover", this), a.removeEventListener("rollout", this), a.removeEventListener("mousedown", this), a.removeEventListener("pressup", this))
    };
    a.toString = function() {
        return "[ButtonHelper]"
    };
    a.handleEvent = function(b) {
        var a = this.target;
        b = b.type;
        "mousedown" == b ? (this._isPressed = !0, b = this.downLabel) : "pressup" ==
            b ? (this._isPressed = !1, b = this._isOver ? this.overLabel : this.outLabel) : "rollover" == b ? (this._isOver = !0, b = this._isPressed ? this.downLabel : this.overLabel) : (this._isOver = !1, b = this._isPressed ? this.overLabel : this.outLabel);
        this.play ? a.gotoAndPlay && a.gotoAndPlay(b) : a.gotoAndStop && a.gotoAndStop(b)
    };
    createjs.ButtonHelper = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b, a, d, c) {
            this.initialize(b, a, d, c)
        },
        a = c.prototype;
    c.identity = null;
    a.color = null;
    a.offsetX = 0;
    a.offsetY = 0;
    a.blur = 0;
    a.initialize = function(b, a, d, c) {
        this.color = b;
        this.offsetX = a;
        this.offsetY = d;
        this.blur = c
    };
    a.toString = function() {
        return "[Shadow]"
    };
    a.clone = function() {
        return new c(this.color, this.offsetX, this.offsetY, this.blur)
    };
    c.identity = new c("transparent", 0, 0, 0);
    createjs.Shadow = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b) {
            this.initialize(b)
        },
        a = c.prototype = new createjs.EventDispatcher;
    a.complete = !0;
    a.framerate = 0;
    a._animations = null;
    a._frames = null;
    a._images = null;
    a._data = null;
    a._loadCount = 0;
    a._frameHeight = 0;
    a._frameWidth = 0;
    a._numFrames = 0;
    a._regX = 0;
    a._regY = 0;
    a.initialize = function(b) {
        var a, d, c;
        if (null != b) {
            this.framerate = b.framerate || 0;
            if (b.images && 0 < (d = b.images.length))
                for (c = this._images = [], a = 0; a < d; a++) {
                    var f = b.images[a];
                    if ("string" == typeof f) {
                        var g = f,
                            f = document.createElement("img");
                        f.src = g
                    }
                    c.push(f);
                    f.getContext || f.complete || (this._loadCount++, this.complete = !1, function(b) {
                        f.onload = function() {
                            b._handleImageLoad()
                        }
                    }(this))
                }
            if (null != b.frames)
                if (b.frames instanceof Array)
                    for (this._frames = [], c = b.frames, a = 0, d = c.length; a < d; a++) g = c[a], this._frames.push({
                        image: this._images[g[4] ? g[4] : 0],
                        rect: new createjs.Rectangle(g[0], g[1], g[2], g[3]),
                        regX: g[5] || 0,
                        regY: g[6] || 0
                    });
                else d = b.frames, this._frameWidth = d.width, this._frameHeight = d.height, this._regX = d.regX || 0, this._regY = d.regY || 0, this._numFrames = d.count, 0 == this._loadCount &&
                    this._calculateFrames();
            this._animations = [];
            if (null != (d = b.animations)) {
                this._data = {};
                for (var k in d) {
                    b = {
                        name: k
                    };
                    g = d[k];
                    if ("number" == typeof g) c = b.frames = [g];
                    else if (g instanceof Array)
                        if (1 == g.length) b.frames = [g[0]];
                        else
                            for (b.speed = g[3], b.next = g[2], c = b.frames = [], a = g[0]; a <= g[1]; a++) c.push(a);
                    else b.speed = g.speed, b.next = g.next, a = g.frames, c = b.frames = "number" == typeof a ? [a] : a.slice(0);
                    if (!0 === b.next || void 0 === b.next) b.next = k;
                    if (!1 === b.next || 2 > c.length && b.next == k) b.next = null;
                    b.speed || (b.speed = 1);
                    this._animations.push(k);
                    this._data[k] = b
                }
            }
        }
    };
    a.getNumFrames = function(b) {
        if (null == b) return this._frames ? this._frames.length : this._numFrames;
        b = this._data[b];
        return null == b ? 0 : b.frames.length
    };
    a.getAnimations = function() {
        return this._animations.slice(0)
    };
    a.getAnimation = function(b) {
        return this._data[b]
    };
    a.getFrame = function(b) {
        var a;
        return this._frames && (a = this._frames[b]) ? a : null
    };
    a.getFrameBounds = function(b, a) {
        var d = this.getFrame(b);
        return d ? (a || new createjs.Rectangle).initialize(-d.regX, -d.regY, d.rect.width, d.rect.height) : null
    };
    a.toString = function() {
        return "[SpriteSheet]"
    };
    a.clone = function() {
        var b = new c;
        b.complete = this.complete;
        b._animations = this._animations;
        b._frames = this._frames;
        b._images = this._images;
        b._data = this._data;
        b._frameHeight = this._frameHeight;
        b._frameWidth = this._frameWidth;
        b._numFrames = this._numFrames;
        b._loadCount = this._loadCount;
        return b
    };
    a._handleImageLoad = function() {
        0 == --this._loadCount && (this._calculateFrames(), this.complete = !0, this.dispatchEvent("complete"))
    };
    a._calculateFrames = function() {
        if (!this._frames &&
            0 != this._frameWidth) {
            this._frames = [];
            for (var b = 0, a = this._frameWidth, d = this._frameHeight, c = 0, f = this._images; c < f.length; c++) {
                for (var g = f[c], k = (g.width + 1) / a | 0, m = (g.height + 1) / d | 0, m = 0 < this._numFrames ? Math.min(this._numFrames - b, k * m) : k * m, q = 0; q < m; q++) this._frames.push({
                    image: g,
                    rect: new createjs.Rectangle(q % k * a, (q / k | 0) * d, a, d),
                    regX: this._regX,
                    regY: this._regY
                });
                b += m
            }
            this._numFrames = b
        }
    };
    createjs.SpriteSheet = c
})();
this.createjs = this.createjs || {};
(function() {
    function c(b, a, d) {
        this.f = b;
        this.params = a;
        this.path = null == d ? !0 : d
    }
    c.prototype.exec = function(b) {
        this.f.apply(b, this.params)
    };
    var a = function() {
            this.initialize()
        },
        b = a.prototype;
    a.getRGB = function(b, a, d, c) {
        null != b && null == d && (c = a, d = b & 255, a = b >> 8 & 255, b = b >> 16 & 255);
        return null == c ? "rgb(" + b + "," + a + "," + d + ")" : "rgba(" + b + "," + a + "," + d + "," + c + ")"
    };
    a.getHSL = function(b, a, d, c) {
        return null == c ? "hsl(" + b % 360 + "," + a + "%," + d + "%)" : "hsla(" + b % 360 + "," + a + "%," + d + "%," + c + ")"
    };
    a.Command = c;
    a.BASE_64 = {
        A: 0,
        B: 1,
        C: 2,
        D: 3,
        E: 4,
        F: 5,
        G: 6,
        H: 7,
        I: 8,
        J: 9,
        K: 10,
        L: 11,
        M: 12,
        N: 13,
        O: 14,
        P: 15,
        Q: 16,
        R: 17,
        S: 18,
        T: 19,
        U: 20,
        V: 21,
        W: 22,
        X: 23,
        Y: 24,
        Z: 25,
        a: 26,
        b: 27,
        c: 28,
        d: 29,
        e: 30,
        f: 31,
        g: 32,
        h: 33,
        i: 34,
        j: 35,
        k: 36,
        l: 37,
        m: 38,
        n: 39,
        o: 40,
        p: 41,
        q: 42,
        r: 43,
        s: 44,
        t: 45,
        u: 46,
        v: 47,
        w: 48,
        x: 49,
        y: 50,
        z: 51,
        0: 52,
        1: 53,
        2: 54,
        3: 55,
        4: 56,
        5: 57,
        6: 58,
        7: 59,
        8: 60,
        9: 61,
        "+": 62,
        "/": 63
    };
    a.STROKE_CAPS_MAP = ["butt", "round", "square"];
    a.STROKE_JOINTS_MAP = ["miter", "round", "bevel"];
    var h = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    if (h.getContext) {
        var d = a._ctx = h.getContext("2d");
        a.beginCmd = new c(d.beginPath, [], !1);
        a.fillCmd = new c(d.fill, [], !1);
        a.strokeCmd = new c(d.stroke, [], !1);
        h.width = h.height = 1
    }
    b._strokeInstructions = null;
    b._strokeStyleInstructions = null;
    b._strokeIgnoreScale = !1;
    b._fillInstructions = null;
    b._fillMatrix = null;
    b._instructions = null;
    b._oldInstructions = null;
    b._activeInstructions = null;
    b._active = !1;
    b._dirty = !1;
    b.initialize = function() {
        this.clear();
        this._ctx = a._ctx
    };
    b.isEmpty = function() {
        return !(this._instructions.length || this._oldInstructions.length || this._activeInstructions.length)
    };
    b.draw = function(b) {
        this._dirty && this._updateInstructions();
        for (var a = this._instructions, d = 0, c = a.length; d < c; d++) a[d].exec(b)
    };
    b.drawAsPath = function(b) {
        this._dirty && this._updateInstructions();
        for (var a, d = this._instructions, c = 0, h = d.length; c < h; c++)((a = d[c]).path || 0 == c) && a.exec(b)
    };
    b.moveTo = function(b, a) {
        this._activeInstructions.push(new c(this._ctx.moveTo, [b, a]));
        return this
    };
    b.lineTo = function(b, a) {
        this._dirty = this._active = !0;
        this._activeInstructions.push(new c(this._ctx.lineTo, [b, a]));
        return this
    };
    b.arcTo =
        function(b, a, d, h, m) {
            this._dirty = this._active = !0;
            this._activeInstructions.push(new c(this._ctx.arcTo, [b, a, d, h, m]));
            return this
        };
    b.arc = function(b, a, d, h, m, q) {
        this._dirty = this._active = !0;
        null == q && (q = !1);
        this._activeInstructions.push(new c(this._ctx.arc, [b, a, d, h, m, q]));
        return this
    };
    b.quadraticCurveTo = function(b, a, d, h) {
        this._dirty = this._active = !0;
        this._activeInstructions.push(new c(this._ctx.quadraticCurveTo, [b, a, d, h]));
        return this
    };
    b.bezierCurveTo = function(b, a, d, h, m, q) {
        this._dirty = this._active = !0;
        this._activeInstructions.push(new c(this._ctx.bezierCurveTo, [b, a, d, h, m, q]));
        return this
    };
    b.rect = function(b, a, d, h) {
        this._dirty = this._active = !0;
        this._activeInstructions.push(new c(this._ctx.rect, [b, a, d, h]));
        return this
    };
    b.closePath = function() {
        this._active && (this._dirty = !0, this._activeInstructions.push(new c(this._ctx.closePath, [])));
        return this
    };
    b.clear = function() {
        this._instructions = [];
        this._oldInstructions = [];
        this._activeInstructions = [];
        this._strokeStyleInstructions = this._strokeInstructions = this._fillInstructions = this._fillMatrix = null;
        this._active = this._dirty =
            this._strokeIgnoreScale = !1;
        return this
    };
    b.beginFill = function(b) {
        this._active && this._newPath();
        this._fillInstructions = b ? [new c(this._setProp, ["fillStyle", b], !1)] : null;
        this._fillMatrix = null;
        return this
    };
    b.beginLinearGradientFill = function(b, a, d, h, m, q) {
        this._active && this._newPath();
        d = this._ctx.createLinearGradient(d, h, m, q);
        h = 0;
        for (m = b.length; h < m; h++) d.addColorStop(a[h], b[h]);
        this._fillInstructions = [new c(this._setProp, ["fillStyle", d], !1)];
        this._fillMatrix = null;
        return this
    };
    b.beginRadialGradientFill = function(b,
        a, d, h, m, q, w, u) {
        this._active && this._newPath();
        d = this._ctx.createRadialGradient(d, h, m, q, w, u);
        h = 0;
        for (m = b.length; h < m; h++) d.addColorStop(a[h], b[h]);
        this._fillInstructions = [new c(this._setProp, ["fillStyle", d], !1)];
        this._fillMatrix = null;
        return this
    };
    b.beginBitmapFill = function(b, a, d) {
        this._active && this._newPath();
        b = this._ctx.createPattern(b, a || "");
        this._fillInstructions = [new c(this._setProp, ["fillStyle", b], !1)];
        this._fillMatrix = d ? [d.a, d.b, d.c, d.d, d.tx, d.ty] : null;
        return this
    };
    b.endFill = function() {
        return this.beginFill()
    };
    b.setStrokeStyle = function(b, d, h, k, m) {
        this._active && this._newPath();
        this._strokeStyleInstructions = [new c(this._setProp, ["lineWidth", null == b ? "1" : b], !1), new c(this._setProp, ["lineCap", null == d ? "butt" : isNaN(d) ? d : a.STROKE_CAPS_MAP[d]], !1), new c(this._setProp, ["lineJoin", null == h ? "miter" : isNaN(h) ? h : a.STROKE_JOINTS_MAP[h]], !1), new c(this._setProp, ["miterLimit", null == k ? "10" : k], !1)];
        this._strokeIgnoreScale = m;
        return this
    };
    b.beginStroke = function(b) {
        this._active && this._newPath();
        this._strokeInstructions = b ? [new c(this._setProp, ["strokeStyle", b], !1)] : null;
        return this
    };
    b.beginLinearGradientStroke = function(b, a, d, h, m, q) {
        this._active && this._newPath();
        d = this._ctx.createLinearGradient(d, h, m, q);
        h = 0;
        for (m = b.length; h < m; h++) d.addColorStop(a[h], b[h]);
        this._strokeInstructions = [new c(this._setProp, ["strokeStyle", d], !1)];
        return this
    };
    b.beginRadialGradientStroke = function(b, a, d, h, m, q, w, u) {
        this._active && this._newPath();
        d = this._ctx.createRadialGradient(d, h, m, q, w, u);
        h = 0;
        for (m = b.length; h < m; h++) d.addColorStop(a[h], b[h]);
        this._strokeInstructions = [new c(this._setProp, ["strokeStyle", d], !1)];
        return this
    };
    b.beginBitmapStroke = function(b, a) {
        this._active && this._newPath();
        var d = this._ctx.createPattern(b, a || "");
        this._strokeInstructions = [new c(this._setProp, ["strokeStyle", d], !1)];
        return this
    };
    b.endStroke = function() {
        this.beginStroke();
        return this
    };
    b.curveTo = b.quadraticCurveTo;
    b.drawRect = b.rect;
    b.drawRoundRect = function(b, a, d, c, h) {
        this.drawRoundRectComplex(b, a, d, c, h, h, h, h);
        return this
    };
    b.drawRoundRectComplex = function(b, a, d, h, m, q, w, u) {
        var t = (d < h ? d : h) /
            2,
            x = 0,
            y = 0,
            n = 0,
            C = 0;
        0 > m && (m *= x = -1);
        m > t && (m = t);
        0 > q && (q *= y = -1);
        q > t && (q = t);
        0 > w && (w *= n = -1);
        w > t && (w = t);
        0 > u && (u *= C = -1);
        u > t && (u = t);
        this._dirty = this._active = !0;
        var t = this._ctx.arcTo,
            B = this._ctx.lineTo;
        this._activeInstructions.push(new c(this._ctx.moveTo, [b + d - q, a]), new c(t, [b + d + q * y, a - q * y, b + d, a + q, q]), new c(B, [b + d, a + h - w]), new c(t, [b + d + w * n, a + h + w * n, b + d - w, a + h, w]), new c(B, [b + u, a + h]), new c(t, [b - u * C, a + h + u * C, b, a + h - u, u]), new c(B, [b, a + m]), new c(t, [b - m * x, a - m * x, b + m, a, m]), new c(this._ctx.closePath));
        return this
    };
    b.drawCircle =
        function(b, a, d) {
            this.arc(b, a, d, 0, 2 * Math.PI);
            return this
        };
    b.drawEllipse = function(b, a, d, h) {
        this._dirty = this._active = !0;
        var m = 0.5522848 * (d / 2),
            q = 0.5522848 * (h / 2),
            w = b + d,
            u = a + h;
        d = b + d / 2;
        h = a + h / 2;
        this._activeInstructions.push(new c(this._ctx.moveTo, [b, h]), new c(this._ctx.bezierCurveTo, [b, h - q, d - m, a, d, a]), new c(this._ctx.bezierCurveTo, [d + m, a, w, h - q, w, h]), new c(this._ctx.bezierCurveTo, [w, h + q, d + m, u, d, u]), new c(this._ctx.bezierCurveTo, [d - m, u, b, h + q, b, h]));
        return this
    };
    b.inject = function(b, a) {
        this._dirty = this._active = !0;
        this._activeInstructions.push(new c(b, [a]));
        return this
    };
    b.drawPolyStar = function(b, a, d, h, m, q) {
        this._dirty = this._active = !0;
        null == m && (m = 0);
        m = 1 - m;
        q = null == q ? 0 : q / (180 / Math.PI);
        var w = Math.PI / h;
        this._activeInstructions.push(new c(this._ctx.moveTo, [b + Math.cos(q) * d, a + Math.sin(q) * d]));
        for (var u = 0; u < h; u++) q += w, 1 != m && this._activeInstructions.push(new c(this._ctx.lineTo, [b + Math.cos(q) * d * m, a + Math.sin(q) * d * m])), q += w, this._activeInstructions.push(new c(this._ctx.lineTo, [b + Math.cos(q) * d, a + Math.sin(q) * d]));
        return this
    };
    b.decodePath = function(b) {
        for (var d = [this.moveTo, this.lineTo, this.quadraticCurveTo, this.bezierCurveTo, this.closePath], c = [2, 2, 4, 6, 0], h = 0, m = b.length, q = [], w = 0, u = 0, t = a.BASE_64; h < m;) {
            var x = b.charAt(h),
                y = t[x],
                n = y >> 3,
                C = d[n];
            if (!C || y & 3) throw "bad path data (@" + h + "): " + x;
            x = c[n];
            n || (w = u = 0);
            q.length = 0;
            h++;
            y = (y >> 2 & 1) + 2;
            for (n = 0; n < x; n++) {
                var B = t[b.charAt(h)],
                    H = B >> 5 ? -1 : 1,
                    B = (B & 31) << 6 | t[b.charAt(h + 1)];
                3 == y && (B = B << 6 | t[b.charAt(h + 2)]);
                B = H * B / 10;
                n % 2 ? w = B += w : u = B += u;
                q[n] = B;
                h += y
            }
            C.apply(this, q)
        }
        return this
    };
    b.clone = function() {
        var b =
            new a;
        b._instructions = this._instructions.slice();
        b._activeInstructions = this._activeInstructions.slice();
        b._oldInstructions = this._oldInstructions.slice();
        this._fillInstructions && (b._fillInstructions = this._fillInstructions.slice());
        this._strokeInstructions && (b._strokeInstructions = this._strokeInstructions.slice());
        this._strokeStyleInstructions && (b._strokeStyleInstructions = this._strokeStyleInstructions.slice());
        b._active = this._active;
        b._dirty = this._dirty;
        b._fillMatrix = this._fillMatrix;
        b._strokeIgnoreScale =
            this._strokeIgnoreScale;
        return b
    };
    b.toString = function() {
        return "[Graphics]"
    };
    b.mt = b.moveTo;
    b.lt = b.lineTo;
    b.at = b.arcTo;
    b.bt = b.bezierCurveTo;
    b.qt = b.quadraticCurveTo;
    b.a = b.arc;
    b.r = b.rect;
    b.cp = b.closePath;
    b.c = b.clear;
    b.f = b.beginFill;
    b.lf = b.beginLinearGradientFill;
    b.rf = b.beginRadialGradientFill;
    b.bf = b.beginBitmapFill;
    b.ef = b.endFill;
    b.ss = b.setStrokeStyle;
    b.s = b.beginStroke;
    b.ls = b.beginLinearGradientStroke;
    b.rs = b.beginRadialGradientStroke;
    b.bs = b.beginBitmapStroke;
    b.es = b.endStroke;
    b.dr = b.drawRect;
    b.rr = b.drawRoundRect;
    b.rc = b.drawRoundRectComplex;
    b.dc = b.drawCircle;
    b.de = b.drawEllipse;
    b.dp = b.drawPolyStar;
    b.p = b.decodePath;
    b._updateInstructions = function() {
        this._instructions = this._oldInstructions.slice();
        this._instructions.push(a.beginCmd);
        this._appendInstructions(this._fillInstructions);
        this._appendInstructions(this._strokeInstructions);
        this._appendInstructions(this._strokeInstructions && this._strokeStyleInstructions);
        this._appendInstructions(this._activeInstructions);
        this._fillInstructions && this._appendDraw(a.fillCmd,
            this._fillMatrix);
        this._strokeInstructions && this._appendDraw(a.strokeCmd, this._strokeIgnoreScale && [1, 0, 0, 1, 0, 0])
    };
    b._appendInstructions = function(b) {
        b && this._instructions.push.apply(this._instructions, b)
    };
    b._appendDraw = function(b, a) {
        a ? this._instructions.push(new c(this._ctx.save, [], !1), new c(this._ctx.transform, a, !1), b, new c(this._ctx.restore, [], !1)) : this._instructions.push(b)
    };
    b._newPath = function() {
        this._dirty && this._updateInstructions();
        this._oldInstructions = this._instructions;
        this._activeInstructions = [];
        this._active = this._dirty = !1
    };
    b._setProp = function(b, a) {
        this[b] = a
    };
    createjs.Graphics = a
})();
this.createjs = this.createjs || {};
(function() {
    var c = function() {
            this.initialize()
        },
        a = c.prototype = new createjs.EventDispatcher;
    c.suppressCrossDomainErrors = !1;
    var b = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    b.getContext && (c._hitTestCanvas = b, c._hitTestContext = b.getContext("2d"), b.width = b.height = 1);
    c._nextCacheID = 1;
    a.alpha = 1;
    a.cacheCanvas = null;
    a.id = -1;
    a.mouseEnabled = !0;
    a.name = null;
    a.parent = null;
    a.regX = 0;
    a.regY = 0;
    a.rotation = 0;
    a.scaleX = 1;
    a.scaleY = 1;
    a.skewX = 0;
    a.skewY = 0;
    a.shadow = null;
    a.visible = !0;
    a.x = 0;
    a.y = 0;
    a.compositeOperation = null;
    a.snapToPixel = !1;
    a.filters = null;
    a.cacheID = 0;
    a.mask = null;
    a.hitArea = null;
    a.cursor = null;
    a._cacheOffsetX = 0;
    a._cacheOffsetY = 0;
    a._cacheScale = 1;
    a._cacheDataURLID = 0;
    a._cacheDataURL = null;
    a._matrix = null;
    a._rectangle = null;
    a._bounds = null;
    a.initialize = function() {
        this.id = createjs.UID.get();
        this._matrix = new createjs.Matrix2D;
        this._rectangle = new createjs.Rectangle
    };
    a.isVisible = function() {
        return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY)
    };
    a.draw = function(b, a) {
        var c =
            this.cacheCanvas;
        if (a || !c) return !1;
        var f = this._cacheScale,
            g = this._cacheOffsetX,
            k = this._cacheOffsetY,
            m;
        if (m = this._applyFilterBounds(g, k, 0, 0)) g = m.x, k = m.y;
        b.drawImage(c, g, k, c.width / f, c.height / f);
        return !0
    };
    a.updateContext = function(b) {
        var a, c = this.mask;
        c && c.graphics && !c.graphics.isEmpty() && (a = c.getMatrix(c._matrix), b.transform(a.a, a.b, a.c, a.d, a.tx, a.ty), c.graphics.drawAsPath(b), b.clip(), a.invert(), b.transform(a.a, a.b, a.c, a.d, a.tx, a.ty));
        a = this._matrix.identity().appendTransform(this.x, this.y, this.scaleX,
            this.scaleY, this.rotation, this.skewX, this.skewY, this.regX, this.regY);
        createjs.Stage._snapToPixelEnabled && this.snapToPixel ? b.transform(a.a, a.b, a.c, a.d, a.tx + 0.5 | 0, a.ty + 0.5 | 0) : b.transform(a.a, a.b, a.c, a.d, a.tx, a.ty);
        b.globalAlpha *= this.alpha;
        this.compositeOperation && (b.globalCompositeOperation = this.compositeOperation);
        this.shadow && this._applyShadow(b, this.shadow)
    };
    a.cache = function(b, a, c, f, g) {
        g = g || 1;
        this.cacheCanvas || (this.cacheCanvas = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"));
        this._cacheWidth = c;
        this._cacheHeight = f;
        this._cacheOffsetX = b;
        this._cacheOffsetY = a;
        this._cacheScale = g;
        this.updateCache()
    };
    a.updateCache = function(b) {
        var a = this.cacheCanvas,
            e = this._cacheScale,
            f = this._cacheOffsetX * e,
            g = this._cacheOffsetY * e,
            k = this._cacheWidth,
            m = this._cacheHeight,
            q;
        if (!a) throw "cache() must be called before updateCache()";
        var w = a.getContext("2d");
        if (q = this._applyFilterBounds(f, g, k, m)) f = q.x, g = q.y, k = q.width, m = q.height;
        k = Math.ceil(k * e);
        m = Math.ceil(m * e);
        k != a.width || m != a.height ? (a.width = k, a.height =
            m) : b || w.clearRect(0, 0, k + 1, m + 1);
        w.save();
        w.globalCompositeOperation = b;
        w.setTransform(e, 0, 0, e, -f, -g);
        this.draw(w, !0);
        this._applyFilters();
        w.restore();
        this.cacheID = c._nextCacheID++
    };
    a.uncache = function() {
        this._cacheDataURL = this.cacheCanvas = null;
        this.cacheID = this._cacheOffsetX = this._cacheOffsetY = 0;
        this._cacheScale = 1
    };
    a.getCacheDataURL = function() {
        if (!this.cacheCanvas) return null;
        this.cacheID != this._cacheDataURLID && (this._cacheDataURL = this.cacheCanvas.toDataURL());
        return this._cacheDataURL
    };
    a.getStage = function() {
        for (var b =
                this; b.parent;) b = b.parent;
        return b instanceof createjs.Stage ? b : null
    };
    a.localToGlobal = function(b, a) {
        var c = this.getConcatenatedMatrix(this._matrix);
        if (null == c) return null;
        c.append(1, 0, 0, 1, b, a);
        return new createjs.Point(c.tx, c.ty)
    };
    a.globalToLocal = function(b, a) {
        var c = this.getConcatenatedMatrix(this._matrix);
        if (null == c) return null;
        c.invert();
        c.append(1, 0, 0, 1, b, a);
        return new createjs.Point(c.tx, c.ty)
    };
    a.localToLocal = function(b, a, c) {
        b = this.localToGlobal(b, a);
        return c.globalToLocal(b.x, b.y)
    };
    a.setTransform =
        function(b, a, c, f, g, k, m, q, w) {
            this.x = b || 0;
            this.y = a || 0;
            this.scaleX = null == c ? 1 : c;
            this.scaleY = null == f ? 1 : f;
            this.rotation = g || 0;
            this.skewX = k || 0;
            this.skewY = m || 0;
            this.regX = q || 0;
            this.regY = w || 0;
            return this
        };
    a.getMatrix = function(b) {
        return (b ? b.identity() : new createjs.Matrix2D).appendTransform(this.x, this.y, this.scaleX, this.scaleY, this.rotation, this.skewX, this.skewY, this.regX, this.regY).appendProperties(this.alpha, this.shadow, this.compositeOperation)
    };
    a.getConcatenatedMatrix = function(b) {
        b ? b.identity() : b = new createjs.Matrix2D;
        for (var a = this; null != a;) b.prependTransform(a.x, a.y, a.scaleX, a.scaleY, a.rotation, a.skewX, a.skewY, a.regX, a.regY).prependProperties(a.alpha, a.shadow, a.compositeOperation), a = a.parent;
        return b
    };
    a.hitTest = function(b, a) {
        var e = c._hitTestContext;
        e.setTransform(1, 0, 0, 1, -b, -a);
        this.draw(e);
        var f = this._testHit(e);
        e.setTransform(1, 0, 0, 1, 0, 0);
        e.clearRect(0, 0, 2, 2);
        return f
    };
    a.set = function(b) {
        for (var a in b) this[a] = b[a];
        return this
    };
    a.getBounds = function() {
        if (this._bounds) return this._rectangle.copy(this._bounds);
        var b = this.cacheCanvas;
        if (b) {
            var a = this._cacheScale;
            return this._rectangle.initialize(this._cacheOffsetX, this._cacheOffsetY, b.width / a, b.height / a)
        }
        return null
    };
    a.getTransformedBounds = function() {
        return this._getBounds()
    };
    a.setBounds = function(b, a, c, f) {
        null == b && (this._bounds = b);
        this._bounds = (this._bounds || new createjs.Rectangle).initialize(b, a, c, f)
    };
    a.clone = function() {
        var b = new c;
        this.cloneProps(b);
        return b
    };
    a.toString = function() {
        return "[DisplayObject (name=" + this.name + ")]"
    };
    a.cloneProps = function(b) {
        b.alpha =
            this.alpha;
        b.name = this.name;
        b.regX = this.regX;
        b.regY = this.regY;
        b.rotation = this.rotation;
        b.scaleX = this.scaleX;
        b.scaleY = this.scaleY;
        b.shadow = this.shadow;
        b.skewX = this.skewX;
        b.skewY = this.skewY;
        b.visible = this.visible;
        b.x = this.x;
        b.y = this.y;
        b._bounds = this._bounds;
        b.mouseEnabled = this.mouseEnabled;
        b.compositeOperation = this.compositeOperation
    };
    a._applyShadow = function(b, a) {
        a = a || Shadow.identity;
        b.shadowColor = a.color;
        b.shadowOffsetX = a.offsetX;
        b.shadowOffsetY = a.offsetY;
        b.shadowBlur = a.blur
    };
    a._tick = function(b) {
        var a =
            this._listeners;
        a && a.tick && (a = new createjs.Event("tick"), a.params = b, this._dispatchEvent(a, this, 2))
    };
    a._testHit = function(b) {
        try {
            var a = 1 < b.getImageData(0, 0, 1, 1).data[3]
        } catch (e) {
            if (!c.suppressCrossDomainErrors) throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images.";
        }
        return a
    };
    a._applyFilters = function() {
        if (this.filters && 0 != this.filters.length && this.cacheCanvas)
            for (var b = this.filters.length, a = this.cacheCanvas.getContext("2d"),
                    c = this.cacheCanvas.width, f = this.cacheCanvas.height, g = 0; g < b; g++) this.filters[g].applyFilter(a, 0, 0, c, f)
    };
    a._applyFilterBounds = function(b, a, c, f) {
        var g, k, m = this.filters;
        if (m && (k = m.length)) {
            for (m = 0; m < k; m++) {
                var q = this.filters[m];
                if (q = q.getBounds && q.getBounds()) g || (g = this._rectangle.initialize(b, a, c, f)), g.x += q.x, g.y += q.y, g.width += q.width, g.height += q.height
            }
            return g
        }
    };
    a._getBounds = function(b, a) {
        return this._transformBounds(this.getBounds(), b, a)
    };
    a._transformBounds = function(b, a, c) {
        if (!b) return b;
        var f = b.x,
            g = b.y,
            k = b.width,
            m = b.height,
            q = c ? this._matrix.identity() : this.getMatrix(this._matrix);
        (f || g) && q.appendTransform(0, 0, 1, 1, 0, 0, 0, -f, -g);
        a && q.prependMatrix(a);
        a = k * q.a;
        k *= q.b;
        c = m * q.c;
        var m = m * q.d,
            w = q.tx,
            q = q.ty,
            u = w,
            t = w,
            x = q,
            y = q;
        (f = a + w) < u ? u = f : f > t && (t = f);
        (f = a + c + w) < u ? u = f : f > t && (t = f);
        (f = c + w) < u ? u = f : f > t && (t = f);
        (g = k + q) < x ? x = g : g > y && (y = g);
        (g = k + m + q) < x ? x = g : g > y && (y = g);
        (g = m + q) < x ? x = g : g > y && (y = g);
        return b.initialize(u, x, t - u, y - x)
    };
    a.isRoot = !1;
    a.bounding_box = null;
    a.setBoundingBox = function(b, a, c, f) {
        return this.bounding_box = new createjs.Rectangle(b,
            a, c, f)
    };
    createjs.DisplayObject = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function() {
            this.initialize()
        },
        a = c.prototype = new createjs.DisplayObject;
    a.children = null;
    a.mouseChildren = !0;
    a.DisplayObject_initialize = a.initialize;
    a.initialize = function() {
        this.DisplayObject_initialize();
        this.children = []
    };
    a.isVisible = function() {
        var b = this.cacheCanvas || this.children.length;
        return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && b)
    };
    a.DisplayObject_draw = a.draw;
    a.draw = function(b, a) {
        if (this.DisplayObject_draw(b, a)) return !0;
        for (var c = this.children.slice(0),
                e = 0, f = c.length; e < f; e++) {
            var g = c[e];
            g.isVisible() && (b.save(), g.updateContext(b), g.draw(b), b.restore())
        }
        return !0
    };
    a.addChild = function(b) {
        if (null == b) return b;
        var a = arguments.length;
        if (1 < a) {
            for (var c = 0; c < a; c++) this.addChild(arguments[c]);
            return arguments[a - 1]
        }
        b.parent && b.parent.removeChild(b);
        b.parent = this;
        this.children.push(b);
        return b
    };
    a.addChildAt = function(b, a) {
        var c = arguments.length,
            e = arguments[c - 1];
        if (0 > e || e > this.children.length) return arguments[c - 2];
        if (2 < c) {
            for (var f = 0; f < c - 1; f++) this.addChildAt(arguments[f],
                e + f);
            return arguments[c - 2]
        }
        b.parent && b.parent.removeChild(b);
        b.parent = this;
        this.children.splice(a, 0, b);
        return b
    };
    a.removeChild = function(b) {
        var a = arguments.length;
        if (1 < a) {
            for (var c = !0, e = 0; e < a; e++) c = c && this.removeChild(arguments[e]);
            return c
        }
        return this.removeChildAt(createjs.indexOf(this.children, b))
    };
    a.removeChildAt = function(b) {
        var a = arguments.length;
        if (1 < a) {
            for (var c = [], e = 0; e < a; e++) c[e] = arguments[e];
            c.sort(function(b, a) {
                return a - b
            });
            for (var f = !0, e = 0; e < a; e++) f = f && this.removeChildAt(c[e]);
            return f
        }
        if (0 >
            b || b > this.children.length - 1) return !1;
        if (a = this.children[b]) a.parent = null;
        this.children.splice(b, 1);
        return !0
    };
    a.removeAllChildren = function() {
        for (var b = this.children; b.length;) b.pop().parent = null
    };
    a.getChildAt = function(b) {
        return this.children[b]
    };
    a.getChildByName = function(b) {
        for (var a = this.children, c = 0, e = a.length; c < e; c++)
            if (a[c].name == b) return a[c];
        return null
    };
    a.sortChildren = function(b) {
        this.children.sort(b)
    };
    a.getChildIndex = function(b) {
        return createjs.indexOf(this.children, b)
    };
    a.getNumChildren = function() {
        return this.children.length
    };
    a.swapChildrenAt = function(b, a) {
        var c = this.children,
            e = c[b],
            f = c[a];
        e && f && (c[b] = f, c[a] = e)
    };
    a.swapChildren = function(b, a) {
        for (var c = this.children, e, f, g = 0, k = c.length; g < k && (c[g] == b && (e = g), c[g] == a && (f = g), null == e || null == f); g++);
        g != k && (c[e] = a, c[f] = b)
    };
    a.setChildIndex = function(b, a) {
        var c = this.children,
            e = c.length;
        if (!(b.parent != this || 0 > a || a >= e)) {
            for (var f = 0; f < e && c[f] != b; f++);
            f != e && f != a && (c.splice(f, 1), c.splice(a, 0, b))
        }
    };
    a.contains = function(b) {
        for (; b;) {
            if (b == this) return !0;
            b = b.parent
        }
        return !1
    };
    a.hitTest = function(b,
        a) {
        return null != this.getObjectUnderPoint(b, a)
    };
    a.getObjectsUnderPoint = function(b, a) {
        var c = [],
            e = this.localToGlobal(b, a);
        this._getObjectsUnderPoint(e.x, e.y, c);
        return c
    };
    a.getObjectUnderPoint = function(b, a) {
        var c = this.localToGlobal(b, a);
        return this._getObjectsUnderPoint(c.x, c.y)
    };
    a.DisplayObject_getBounds = a.getBounds;
    a.getBounds = function() {
        return this._getBounds(null, !0)
    };
    a.getTransformedBounds = function() {
        return this._getBounds()
    };
    a.clone = function(b) {
        var a = new c;
        this.cloneProps(a);
        if (b)
            for (var d = a.children = [], e = 0, f = this.children.length; e < f; e++) {
                var g = this.children[e].clone(b);
                g.parent = a;
                d.push(g)
            }
        return a
    };
    a.toString = function() {
        return "[Container (name=" + this.name + ")]"
    };
    a.DisplayObject__tick = a._tick;
    a._tick = function(b) {
        for (var a = this.children.length - 1; 0 <= a; a--) {
            var c = this.children[a];
            c._tick && c._tick(b)
        }
        this.DisplayObject__tick(b)
    };
    a._getObjectsUnderPoint = function(b, a, d, e) {
        var f, g;
        f = this.children.length;
        if (!isDesktopBrowser) {
            var k;
            for (f -= 1; 0 <= f; f--)
                if (g = this.children[f], g.visible && g.mouseEnabled && !(0 >=
                        g.alpha)) {
                    if (k = g.bounding_box)
                        if (k = g.isRoot ? g.x + k.x <= b && b < g.x + k.x + k.width && g.y + k.y <= a && a < g.y + k.y + k.height : (g.x + k.x) * scaleFactor <= b && b < scaleFactor * (g.x + k.x + k.width) && (g.y + k.y) * scaleFactor <= a && a < scaleFactor * (g.y + k.y + k.height))
                            if (d) {
                                d.push(g);
                                continue
                            } else return g;
                    if (g instanceof c && (g = g.isRoot ? g._getObjectsUnderPoint(b - (g.x + g.regX), a - (g.y + g.regY), d, e) : g._getObjectsUnderPoint(b - (g.x + g.regX) * scaleFactor, a - (g.y + g.regY) * scaleFactor, d, e)))
                        if (d) d.push(g);
                        else return g
                }
            return null
        }
        k = createjs.DisplayObject._hitTestContext;
        var m = this._matrix;
        for (f -= 1; 0 <= f; f--) {
            g = this.children[f];
            var q = e && g.hitArea;
            if (g.visible && (q || g.isVisible()) && (!e || g.mouseEnabled))
                if (!q && g instanceof c) {
                    if (g = g._getObjectsUnderPoint(b, a, d, e), !d && g) return e && !this.mouseChildren ? this : g
                } else if (g.getConcatenatedMatrix(m), q && (m.appendTransform(q.x, q.y, q.scaleX, q.scaleY, q.rotation, q.skewX, q.skewY, q.regX, q.regY), m.alpha = q.alpha), k.globalAlpha = m.alpha, k.setTransform(m.a, m.b, m.c, m.d, m.tx - b, m.ty - a), (q || g).draw(k), this._testHit(k))
                if (k.setTransform(1, 0, 0,
                        1, 0, 0), k.clearRect(0, 0, 2, 2), d) d.push(g);
                else return e && !this.mouseChildren ? this : g
        }
        return null
    };
    a._getBounds = function(b, a) {
        var c = this.DisplayObject_getBounds();
        if (c) return this._transformBounds(c, b, a);
        var e, f, g, k, m = a ? this._matrix.identity() : this.getMatrix(this._matrix);
        b && m.prependMatrix(b);
        for (var q = this.children.length, w = 0; w < q; w++) {
            var u = this.children[w];
            if (u.visible && (c = u._getBounds(m))) {
                var u = c.x,
                    t = c.y,
                    x = u + c.width,
                    y = t + c.height;
                if (u < e || null == e) e = u;
                if (x > f || null == f) f = x;
                if (t < g || null == g) g = t;
                if (y > k ||
                    null == k) k = y
            }
        }
        return null == f ? null : this._rectangle.initialize(e, g, f - e, k - g)
    };
    createjs.Container = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b) {
            this.initialize(b)
        },
        a = c.prototype = new createjs.Container;
    c._snapToPixelEnabled = !1;
    a.autoClear = !0;
    a.canvas = null;
    a.mouseX = 0;
    a.mouseY = 0;
    a.snapToPixelEnabled = !1;
    a.mouseInBounds = !1;
    a.tickOnUpdate = !0;
    a.mouseMoveOutside = !1;
    a.nextStage = null;
    a._pointerData = null;
    a._pointerCount = 0;
    a._primaryPointerID = null;
    a._mouseOverIntervalID = null;
    a.Container_initialize = a.initialize;
    a.initialize = function(b) {
        this.Container_initialize();
        this.canvas = "string" == typeof b ? document.getElementById(b) :
            b;
        this._pointerData = {};
        this.enableDOMEvents(!0)
    };
    a.update = function(b) {
        if (this.canvas) {
            this.tickOnUpdate && (this.dispatchEvent("tickstart"), this._tick(arguments.length ? arguments : null), this.dispatchEvent("tickend"));
            this.dispatchEvent("drawstart");
            c._snapToPixelEnabled = this.snapToPixelEnabled;
            this.autoClear && this.clear();
            var a = this.canvas.getContext("2d");
            a.save();
            this.updateContext(a);
            this.draw(a, !1);
            a.restore();
            this.dispatchEvent("drawend")
        }
    };
    a.handleEvent = function(b) {
        "tick" == b.type && this.update(b)
    };
    a.clear = function() {
        if (this.canvas) {
            var b = this.canvas.getContext("2d");
            b.setTransform(1, 0, 0, 1, 0, 0);
            b.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1)
        }
    };
    a.toDataURL = function(b, a) {
        a || (a = "image/png");
        var c = this.canvas.getContext("2d"),
            e = this.canvas.width,
            f = this.canvas.height,
            g;
        if (b) {
            g = c.getImageData(0, 0, e, f);
            var k = c.globalCompositeOperation;
            c.globalCompositeOperation = "destination-over";
            c.fillStyle = b;
            c.fillRect(0, 0, e, f)
        }
        var m = this.canvas.toDataURL(a);
        b && (c.clearRect(0, 0, e + 1, f + 1), c.putImageData(g,
            0, 0), c.globalCompositeOperation = k);
        return m
    };
    a.enableMouseOver = function(b) {
        this._mouseOverIntervalID && (clearInterval(this._mouseOverIntervalID), this._mouseOverIntervalID = null, 0 == b && this._testMouseOver(!0));
        if (null == b) b = 20;
        else if (0 >= b) return;
        var a = this;
        this._mouseOverIntervalID = setInterval(function() {
            a._testMouseOver()
        }, 1E3 / Math.min(50, b))
    };
    a.enableDOMEvents = function(b) {
        null == b && (b = !0);
        var a, c = this._eventListeners;
        if (!b && c) {
            for (a in c) b = c[a], b.t.removeEventListener(a, b.f, !1);
            this._eventListeners =
                null
        } else if (b && !c && this.canvas) {
            b = window.addEventListener ? window : document;
            var e = this,
                c = this._eventListeners = {};
            c.mouseup = {
                t: b,
                f: function(b) {
                    e._handleMouseUp(b)
                }
            };
            c.mousemove = {
                t: b,
                f: function(b) {
                    e._handleMouseMove(b)
                }
            };
            c.dblclick = {
                t: b,
                f: function(b) {
                    e._handleDoubleClick(b)
                }
            };
            c.mousedown = {
                t: this.canvas,
                f: function(b) {
                    e._handleMouseDown(b)
                }
            };
            for (a in c) b = c[a], b.t.addEventListener(a, b.f, !1)
        }
    };
    a.clone = function() {
        var b = new c(null);
        this.cloneProps(b);
        return b
    };
    a.toString = function() {
        return "[Stage (name=" + this.name +
            ")]"
    };
    a._getElementRect = function(b) {
        var a;
        try {
            a = b.getBoundingClientRect()
        } catch (c) {
            a = {
                top: b.offsetTop,
                left: b.offsetLeft,
                width: b.offsetWidth,
                height: b.offsetHeight
            }
        }
        var e = (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || document.body.clientLeft || 0),
            f = (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || document.body.clientTop || 0),
            g = window.getComputedStyle ? getComputedStyle(b) : b.currentStyle;
        b = parseInt(g.paddingLeft) + parseInt(g.borderLeftWidth);
        var k = parseInt(g.paddingTop) +
            parseInt(g.borderTopWidth),
            m = parseInt(g.paddingRight) + parseInt(g.borderRightWidth),
            g = parseInt(g.paddingBottom) + parseInt(g.borderBottomWidth);
        return {
            left: a.left + e + b,
            right: a.right + e - m,
            top: a.top + f + k,
            bottom: a.bottom + f - g
        }
    };
    a._getPointerData = function(b) {
        var a = this._pointerData[b];
        a || (a = this._pointerData[b] = {
            x: 0,
            y: 0
        }, null == this._primaryPointerID && (this._primaryPointerID = b));
        return a
    };
    a._handleMouseMove = function(b) {
        b || (b = window.event);
        this._handlePointerMove(-1, b, b.pageX, b.pageY)
    };
    a._handlePointerMove = function(b,
        a, c, e) {
        if (this.canvas) {
            var f = this._getPointerData(b),
                g = f.inBounds;
            this._updatePointerPosition(b, a, c, e);
            if (g || f.inBounds || this.mouseMoveOutside) - 1 == b && f.inBounds == !g && this._dispatchMouseEvent(this, g ? "mouseleave" : "mouseenter", !1, b, f, a), this._dispatchMouseEvent(this, "y41mousemove", !1, b, f, a), this._dispatchMouseEvent(f.target, "pressmove", !0, b, f, a), (g = f.event) && g.hasEventListener("mousemove") && g.dispatchEvent(new createjs.MouseEvent("mousemove", !1, !1, f.x, f.y, a, b, b == this._primaryPointerID, f.rawX, f.rawY),
                oTarget), this.nextStage && this.nextStage._handlePointerMove(b, a, c, e)
        }
    };
    a._updatePointerPosition = function(b, a, c, e) {
        var f = this._getElementRect(this.canvas);
        c -= f.left;
        e -= f.top;
        var g = this.canvas.width,
            k = this.canvas.height;
        c /= (f.right - f.left) / g;
        e /= (f.bottom - f.top) / k;
        f = this._getPointerData(b);
        (f.inBounds = 0 <= c && 0 <= e && c <= g - 1 && e <= k - 1) ? (f.x = c, f.y = e) : this.mouseMoveOutside && (f.x = 0 > c ? 0 : c > g - 1 ? g - 1 : c, f.y = 0 > e ? 0 : e > k - 1 ? k - 1 : e);
        f.posEvtObj = a;
        f.rawX = c;
        f.rawY = e;
        b == this._primaryPointerID && (this.mouseX = f.x, this.mouseY = f.y,
            this.mouseInBounds = f.inBounds)
    };
    a._handleMouseUp = function(b) {
        this._handlePointerUp(-1, b, !1)
    };
    a._handlePointerUp = function(b, a, c) {
        var e = this._getPointerData(b),
            f = e.target;
        f && (f.hasEventListener("pressup") || f.hasEventListener("click")) ? (f.hasEventListener("click") && this._getObjectsUnderPoint(e.x, e.y, null, !0) == f && this._dispatchMouseEvent(f, "click", !0, b, e, a), this._dispatchMouseEvent(f, "pressup", !0, b, e, a)) : this._dispatchMouseEvent(this, "y41mouseup", !1, b, e, a);
        c ? (b == this._primaryPointerID && (this._primaryPointerID =
            null), delete this._pointerData[b]) : e.event = e.target = null;
        this.nextStage && this.nextStage._handlePointerUp(b, a, c)
    };
    a._handleMouseDown = function(b) {
        this._handlePointerDown(-1, b, b.pageX, b.pageY)
    };
    a._handlePointerDown = function(b, a, c, e) {
        null != e && this._updatePointerPosition(b, a, c, e);
        var f = this._getPointerData(b);
        f.target = this._getObjectsUnderPoint(f.x, f.y, null, !0);
        this._dispatchMouseEvent(f.target, "mousedown", !0, b, f, a);
        f.target && f.target.hasEventListener("mousedown") || this._dispatchMouseEvent(this, "y41mousedown", !1, b, f, a);
        this.nextStage && this.nextStage._handlePointerDown(b, a, c, e)
    };
    a._testMouseOver = function(b) {
        if (-1 == this._primaryPointerID && (b || this.mouseX != this._mouseOverX || this.mouseY != this._mouseOverY || !this.mouseInBounds)) {
            var a = this._getPointerData(-1),
                c = a.posEvtObj,
                e, f = -1,
                g = "",
                k;
            if (b || this.mouseInBounds && c && c.target == this.canvas) e = this._getObjectsUnderPoint(this.mouseX, this.mouseY, null, !0), this._mouseOverX = this.mouseX, this._mouseOverY = this.mouseY;
            b = this._mouseOverTarget || [];
            var m = b[b.length - 1],
                q = this._mouseOverTarget = [];
            for (k = e; k;) q.unshift(k), null != k.cursor && (g = k.cursor), k = k.parent;
            this.canvas.style.cursor = g;
            g = 0;
            for (k = q.length; g < k && q[g] == b[g]; g++) f = g;
            m != e && this._dispatchMouseEvent(m, "mouseout", !0, -1, a, c);
            for (g = b.length - 1; g > f; g--) this._dispatchMouseEvent(b[g], "rollout", !1, -1, a, c);
            for (g = q.length - 1; g > f; g--) this._dispatchMouseEvent(q[g], "rollover", !1, -1, a, c);
            m != e && this._dispatchMouseEvent(e, "mouseover", !0, -1, a, c)
        }
    };
    a._handleDoubleClick = function(b) {
        var a = this._getPointerData(-1),
            c = this._getObjectsUnderPoint(a.x, a.y,
                null, !0);
        this._dispatchMouseEvent(c, "dblclick", !0, -1, a, b);
        this.nextStage && this.nextStage._handleDoubleClick(b)
    };
    a._dispatchMouseEvent = function(b, a, c, e, f, g) {
        b && (c || b.hasEventListener(a)) && (a = new createjs.MouseEvent(a, c, !1, f.x, f.y, g, e, e == this._primaryPointerID, f.rawX, f.rawY), b.dispatchEvent(a))
    };
    createjs.Stage = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b) {
            this.initialize(b)
        },
        a = c.prototype = new createjs.DisplayObject;
    a.image = null;
    a.snapToPixel = !0;
    a.sourceRect = null;
    a.DisplayObject_initialize = a.initialize;
    a.initialize = function(b) {
        this.DisplayObject_initialize();
        "string" == typeof b ? (this.image = document.createElement("img"), this.image.src = b) : this.image = b
    };
    a.isVisible = function() {
        var b = this.cacheCanvas || this.image && (this.image.complete || this.image.getContext || 2 <= this.image.readyState);
        return !!(this.visible && 0 < this.alpha && 0 != this.scaleX &&
            0 != this.scaleY && b)
    };
    a.DisplayObject_draw = a.draw;
    a.draw = function(b, a) {
        if (this.DisplayObject_draw(b, a)) return !0;
        var c = this.sourceRect;
        c ? b.drawImage(this.image, c.x, c.y, c.width, c.height, 0, 0, c.width, c.height) : b.drawImage(this.image, 0, 0);
        return !0
    };
    a.DisplayObject_getBounds = a.getBounds;
    a.getBounds = function() {
        var b = this.DisplayObject_getBounds();
        if (b) return b;
        b = this.sourceRect || this.image;
        return this.image && (this.image.complete || this.image.getContext || 2 <= this.image.readyState) ? this._rectangle.initialize(0,
            0, b.width, b.height) : null
    };
    a.clone = function() {
        var b = new c(this.image);
        this.sourceRect && (b.sourceRect = this.sourceRect.clone());
        this.cloneProps(b);
        return b
    };
    a.toString = function() {
        return "[Bitmap (name=" + this.name + ")]"
    };
    createjs.Bitmap = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b, a) {
            this.initialize(b, a)
        },
        a = c.prototype = new createjs.DisplayObject;
    a.currentFrame = 0;
    a.currentAnimation = null;
    a.paused = !0;
    a.spriteSheet = null;
    a.snapToPixel = !0;
    a.offset = 0;
    a.currentAnimationFrame = 0;
    a.framerate = 0;
    a._advanceCount = 0;
    a._animation = null;
    a._currentFrame = null;
    a.DisplayObject_initialize = a.initialize;
    a.initialize = function(b, a) {
        this.DisplayObject_initialize();
        this.spriteSheet = b;
        a && this.gotoAndPlay(a)
    };
    a.isVisible = function() {
        var b = this.cacheCanvas || this.spriteSheet.complete;
        return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && b)
    };
    a.DisplayObject_draw = a.draw;
    a.draw = function(b, a) {
        if (this.DisplayObject_draw(b, a)) return !0;
        this._normalizeFrame();
        var c = this.spriteSheet.getFrame(this._currentFrame | 0);
        if (!c) return !1;
        var e = c.rect;
        b.drawImage(c.image, e.x, e.y, e.width, e.height, -c.regX, -c.regY, e.width, e.height);
        return !0
    };
    a.play = function() {
        this.paused = !1
    };
    a.stop = function() {
        this.paused = !0
    };
    a.gotoAndPlay = function(b) {
        this.paused = !1;
        this._goto(b)
    };
    a.gotoAndStop = function(b) {
        this.paused = !0;
        this._goto(b)
    };
    a.advance = function(b) {
        var a = this._animation && this._animation.speed || 1,
            c = this.framerate || this.spriteSheet.framerate;
        b = c && null != b ? b / (1E3 / c) : 1;
        this._animation ? this.currentAnimationFrame += b * a : this._currentFrame += b * a;
        this._normalizeFrame()
    };
    a.DisplayObject_getBounds = a.getBounds;
    a.getBounds = function() {
        return this.DisplayObject_getBounds() || this.spriteSheet.getFrameBounds(this.currentFrame, this._rectangle)
    };
    a.clone = function() {
        var b = new c(this.spriteSheet);
        this.cloneProps(b);
        return b
    };
    a.toString =
        function() {
            return "[Sprite (name=" + this.name + ")]"
        };
    a.DisplayObject__tick = a._tick;
    a._tick = function(b) {
        this.paused || this.advance(b && b[0] && b[0].delta);
        this.DisplayObject__tick(b)
    };
    a._normalizeFrame = function() {
        var b = this._animation,
            a = this.paused,
            c = this._currentFrame,
            e = this.currentAnimationFrame,
            f;
        if (b)
            if (f = b.frames.length, (e | 0) >= f) {
                var g = b.next;
                if (!this._dispatchAnimationEnd(b, c, a, g, f - 1)) {
                    if (g) return this._goto(g, e - f);
                    this.paused = !0;
                    e = this.currentAnimationFrame = b.frames.length - 1;
                    this._currentFrame = b.frames[e]
                }
            } else this._currentFrame =
                b.frames[e | 0];
        else if (f = this.spriteSheet.getNumFrames(), c >= f && !this._dispatchAnimationEnd(b, c, a, f - 1) && (this._currentFrame -= f) >= f) return this._normalizeFrame();
        this.currentFrame = this._currentFrame | 0
    };
    a._dispatchAnimationEnd = function(b, a, c, e, f) {
        var g = b ? b.name : null;
        if (this.hasEventListener("animationend")) {
            var k = new createjs.Event("animationend");
            k.name = g;
            k.next = e;
            this.dispatchEvent(k)
        }!c && this.paused && (this.currentAnimationFrame = f);
        return this.paused != c || this._animation != b || this._currentFrame != a
    };
    a.DisplayObject_cloneProps =
        a.cloneProps;
    a.cloneProps = function(b) {
        this.DisplayObject_cloneProps(b);
        b.currentFrame = this.currentFrame;
        b._currentFrame = this._currentFrame;
        b.currentAnimation = this.currentAnimation;
        b.paused = this.paused;
        b._animation = this._animation;
        b.currentAnimationFrame = this.currentAnimationFrame;
        b.framerate = this.framerate
    };
    a._goto = function(b, a) {
        if (isNaN(b)) {
            var c = this.spriteSheet.getAnimation(b);
            c && (this.currentAnimationFrame = a || 0, this._animation = c, this.currentAnimation = b, this._normalizeFrame())
        } else this.currentAnimationFrame =
            0, this.currentAnimation = this._animation = null, this._currentFrame = b, this._normalizeFrame()
    };
    createjs.Sprite = c
})();
this.createjs = this.createjs || {};
(function() {
    if (!createjs.Sprite) throw "BitmapAnimation is deprecated in favour of Sprite. See VERSIONS file for info on changes.";
    (createjs.BitmapAnimation = function(c) {
        console.log("BitmapAnimation is deprecated in favour of Sprite. See VERSIONS file for info on changes.");
        this.initialize(c)
    }).prototype = new createjs.Sprite
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b) {
            this.initialize(b)
        },
        a = c.prototype = new createjs.DisplayObject;
    a.graphics = null;
    a.DisplayObject_initialize = a.initialize;
    a.initialize = function(b) {
        this.DisplayObject_initialize();
        this.graphics = b ? b : new createjs.Graphics
    };
    a.isVisible = function() {
        var b = this.cacheCanvas || this.graphics && !this.graphics.isEmpty();
        return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && b)
    };
    a.DisplayObject_draw = a.draw;
    a.draw = function(b, a) {
        if (this.DisplayObject_draw(b, a)) return !0;
        this.graphics.draw(b);
        return !0
    };
    a.clone = function(b) {
        b = new c(b && this.graphics ? this.graphics.clone() : this.graphics);
        this.cloneProps(b);
        return b
    };
    a.toString = function() {
        return "[Shape (name=" + this.name + ")]"
    };
    createjs.Shape = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b, a, c) {
            this.initialize(b, a, c)
        },
        a = c.prototype = new createjs.DisplayObject,
        b = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    b.getContext && (c._workingContext = b.getContext("2d"), b.width = b.height = 1);
    c.H_OFFSETS = {
        start: 0,
        left: 0,
        center: -0.5,
        end: -1,
        right: -1
    };
    c.V_OFFSETS = {
        top: 0,
        hanging: -0.01,
        middle: -0.4,
        alphabetic: -0.8,
        ideographic: -0.85,
        bottom: -1
    };
    a.text = "";
    a.font = null;
    a.color = null;
    a.textAlign = "left";
    a.textBaseline = "top";
    a.maxWidth = null;
    a.outline = 0;
    a.lineHeight = 0;
    a.lineWidth = null;
    a.DisplayObject_initialize = a.initialize;
    a.initialize = function(b, a, c) {
        this.DisplayObject_initialize();
        this.text = b;
        this.font = a;
        this.color = c
    };
    a.isVisible = function() {
        var b = this.cacheCanvas || null != this.text && "" !== this.text;
        return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && b)
    };
    a.DisplayObject_draw = a.draw;
    a.draw = function(b, a) {
        if (this.DisplayObject_draw(b, a)) return !0;
        var c = this.color || "#000";
        this.outline ? (b.strokeStyle = c, b.lineWidth = 1 * this.outline) : b.fillStyle =
            c;
        this._drawText(this._prepContext(b));
        return !0
    };
    a.getMeasuredWidth = function() {
        return this._prepContext(c._workingContext).measureText(this.text).width
    };
    a.getMeasuredLineHeight = function() {
        return 1.2 * this._prepContext(c._workingContext).measureText("M").width
    };
    a.getMeasuredHeight = function() {
        return this._drawText(null, {}).height
    };
    a.DisplayObject_getBounds = a.getBounds;
    a.getBounds = function() {
        var b = this.DisplayObject_getBounds();
        if (b) return b;
        if (null == this.text || "" == this.text) return null;
        var b = this._drawText(null, {}),
            a = this.maxWidth && this.maxWidth < b.width ? this.maxWidth : b.width,
            e = a * c.H_OFFSETS[this.textAlign || "left"],
            f = (this.lineHeight || this.getMeasuredLineHeight()) * c.V_OFFSETS[this.textBaseline || "top"];
        return this._rectangle.initialize(e, f, a, b.height)
    };
    a.clone = function() {
        var b = new c(this.text, this.font, this.color);
        this.cloneProps(b);
        return b
    };
    a.toString = function() {
        return "[Text (text=" + (20 < this.text.length ? this.text.substr(0, 17) + "..." : this.text) + ")]"
    };
    a.DisplayObject_cloneProps = a.cloneProps;
    a.cloneProps = function(b) {
        this.DisplayObject_cloneProps(b);
        b.textAlign = this.textAlign;
        b.textBaseline = this.textBaseline;
        b.maxWidth = this.maxWidth;
        b.outline = this.outline;
        b.lineHeight = this.lineHeight;
        b.lineWidth = this.lineWidth
    };
    a._prepContext = function(b) {
        b.font = this.font;
        b.textAlign = this.textAlign || "left";
        b.textBaseline = this.textBaseline || "top";
        return b
    };
    a._drawText = function(b, a) {
        var e = !!b;
        e || (b = this._prepContext(c._workingContext));
        for (var f = this.lineHeight || this.getMeasuredLineHeight(), g = 0, k = 0, m = String(this.text).split(/(?:\r\n|\r|\n)/), q = 0, w = m.length; q < w; q++) {
            var u =
                m[q],
                t = null;
            if (null != this.lineWidth && (t = b.measureText(u).width) > this.lineWidth)
                for (var x = u.split(/(\s)/), u = x[0], t = b.measureText(u).width, y = 1, n = x.length; y < n; y += 2) {
                    var C = b.measureText(x[y] + x[y + 1]).width;
                    t + C > this.lineWidth ? (e && this._drawTextLine(b, u, k * f), t > g && (g = t), u = x[y + 1], t = b.measureText(u).width, k++) : (u += x[y] + x[y + 1], t += C)
                }
            e && this._drawTextLine(b, u, k * f);
            a && null == t && (t = b.measureText(u).width);
            t > g && (g = t);
            k++
        }
        a && (a.count = k, a.width = g, a.height = k * f);
        return a
    };
    a._drawTextLine = function(b, a, c) {
        this.outline ?
            b.strokeText(a, 0, c, this.maxWidth || 65535) : b.fillText(a, 0, c, this.maxWidth || 65535)
    };
    createjs.Text = c
})();
this.createjs = this.createjs || {};
(function() {
    function c(b, a) {
        this.initialize(b, a)
    }
    var a = c.prototype = new createjs.DisplayObject;
    a.text = "";
    a.spriteSheet = null;
    a.lineHeight = 0;
    a.letterSpacing = 0;
    a.spaceWidth = 0;
    a.DisplayObject_initialize = a.initialize;
    a.initialize = function(b, a) {
        this.DisplayObject_initialize();
        this.text = b;
        this.spriteSheet = a
    };
    a.DisplayObject_draw = a.draw;
    a.draw = function(b, a) {
        if (this.DisplayObject_draw(b, a)) return !0;
        this._drawText(b)
    };
    a.isVisible = function() {
        var b = this.cacheCanvas || this.spriteSheet && this.spriteSheet.complete &&
            this.text;
        return !!(this.visible && 0 < this.alpha && 0 != this.scaleX && 0 != this.scaleY && b)
    };
    a.getBounds = function() {
        var b = this._rectangle;
        this._drawText(null, b);
        return b.width ? b : null
    };
    a._getFrame = function(b, a) {
        var c, e = a.getAnimation(b);
        e || (b != (c = b.toUpperCase()) || b != (c = b.toLowerCase()) || (c = null), c && (e = a.getAnimation(c)));
        return e && a.getFrame(e.frames[0])
    };
    a._getLineHeight = function(b) {
        return (b = this._getFrame("1", b) || this._getFrame("T", b) || this._getFrame("L", b) || b.getFrame(0)) ? b.rect.height : 1
    };
    a._getSpaceWidth =
        function(b) {
            return (b = this._getFrame("1", b) || this._getFrame("l", b) || this._getFrame("e", b) || this._getFrame("a", b) || b.getFrame(0)) ? b.rect.width : 1
        };
    a._drawText = function(b, a) {
        var c, e, f, g = 0,
            k = 0,
            m = this.spaceWidth,
            q = this.lineHeight,
            w = this.spriteSheet,
            u = !!this._getFrame(" ", w);
        u || 0 != m || (m = this._getSpaceWidth(w));
        0 == q && (q = this._getLineHeight(w));
        for (var t = 0, x = 0, y = this.text.length; x < y; x++)
            if (c = this.text.charAt(x), u || " " != c)
                if ("\n" == c || "\r" == c) "\r" == c && "\n" == this.text.charAt(x + 1) && x++, g - f > t && (t = g - f), g = 0, k += q;
                else {
                    var n = this._getFrame(c, w);
                    if (n) {
                        var C = n.rect;
                        f = n.regX;
                        c = C.width;
                        b && b.drawImage(n.image, C.x, C.y, c, e = C.height, g - f, k - n.regY, c, e);
                        g += c + this.letterSpacing
                    }
                } else g += m;
        g - f > t && (t = g - f);
        a && (a.width = t - this.letterSpacing, a.height = k + q)
    };
    createjs.BitmapText = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function() {
            throw "SpriteSheetUtils cannot be instantiated";
        },
        a = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
    a.getContext && (c._workingCanvas = a, c._workingContext = a.getContext("2d"), a.width = a.height = 1);
    c.addFlippedFrames = function(b, a, d, e) {
        if (a || d || e) {
            var f = 0;
            a && c._flip(b, ++f, !0, !1);
            d && c._flip(b, ++f, !1, !0);
            e && c._flip(b, ++f, !0, !0)
        }
    };
    c.extractFrame = function(b, a) {
        isNaN(a) && (a = b.getAnimation(a).frames[0]);
        var d = b.getFrame(a);
        if (!d) return null;
        var e = d.rect,
            f = c._workingCanvas;
        f.width = e.width;
        f.height = e.height;
        c._workingContext.drawImage(d.image, e.x, e.y, e.width, e.height, 0, 0, e.width, e.height);
        d = document.createElement("img");
        d.src = f.toDataURL("image/png");
        return d
    };
    c.mergeAlpha = function(b, a, c) {
        c || (c = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"));
        c.width = Math.max(a.width, b.width);
        c.height = Math.max(a.height, b.height);
        var e = c.getContext("2d");
        e.save();
        e.drawImage(b, 0, 0);
        e.globalCompositeOperation = "destination-in";
        e.drawImage(a,
            0, 0);
        e.restore();
        return c
    };
    c._flip = function(b, a, d, e) {
        for (var f = b._images, g = c._workingCanvas, k = c._workingContext, m = f.length / a, q = 0; q < m; q++) {
            var w = f[q];
            w.__tmp = q;
            k.setTransform(1, 0, 0, 1, 0, 0);
            k.clearRect(0, 0, g.width + 1, g.height + 1);
            g.width = w.width;
            g.height = w.height;
            k.setTransform(d ? -1 : 1, 0, 0, e ? -1 : 1, d ? w.width : 0, e ? w.height : 0);
            k.drawImage(w, 0, 0);
            var u = document.createElement("img");
            u.src = g.toDataURL("image/png");
            u.width = w.width;
            u.height = w.height;
            f.push(u)
        }
        k = b._frames;
        g = k.length / a;
        for (q = 0; q < g; q++) {
            var w = k[q],
                t = w.rect.clone(),
                u = f[w.image.__tmp + m * a],
                x = {
                    image: u,
                    rect: t,
                    regX: w.regX,
                    regY: w.regY
                };
            d && (t.x = u.width - t.x - t.width, x.regX = t.width - w.regX);
            e && (t.y = u.height - t.y - t.height, x.regY = t.height - w.regY);
            k.push(x)
        }
        d = "_" + (d ? "h" : "") + (e ? "v" : "");
        e = b._animations;
        b = b._data;
        f = e.length / a;
        for (q = 0; q < f; q++) {
            k = e[q];
            w = b[k];
            m = {
                name: k + d,
                frequency: w.frequency,
                next: w.next,
                frames: []
            };
            w.next && (m.next += d);
            k = w.frames;
            w = 0;
            for (u = k.length; w < u; w++) m.frames.push(k[w] + g * a);
            b[m.name] = m;
            e.push(m.name)
        }
    };
    createjs.SpriteSheetUtils = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function() {
            this.initialize()
        },
        a = c.prototype = new createjs.EventDispatcher;
    c.ERR_DIMENSIONS = "frame dimensions exceed max spritesheet dimensions";
    c.ERR_RUNNING = "a build is already running";
    a.maxWidth = 2048;
    a.maxHeight = 2048;
    a.spriteSheet = null;
    a.scale = 1;
    a.padding = 1;
    a.timeSlice = 0.3;
    a.progress = -1;
    a._frames = null;
    a._animations = null;
    a._data = null;
    a._nextFrameIndex = 0;
    a._index = 0;
    a._y42ID = null;
    a._scale = 1;
    a.initialize = function() {
        this._frames = [];
        this._animations = {}
    };
    a.addFrame = function(b, a, d, e, f,
        g) {
        if (this._data) throw c.ERR_RUNNING;
        a = a || b.bounds || b.nominalBounds;
        !a && b.getBounds && (a = b.getBounds());
        if (!a) return null;
        d = d || 1;
        return this._frames.push({
            source: b,
            sourceRect: a,
            scale: d,
            funct: e,
            params: f,
            scope: g,
            index: this._frames.length,
            height: a.height * d
        }) - 1
    };
    a.addAnimation = function(b, a, d, e) {
        if (this._data) throw c.ERR_RUNNING;
        this._animations[b] = {
            frames: a,
            next: d,
            frequency: e
        }
    };
    a.addMovieClip = function(b, a, d) {
        if (this._data) throw c.ERR_RUNNING;
        var e = b.frameBounds,
            f = a || b.bounds || b.nominalBounds;
        !f && b.getBounds &&
            (f = b.getBounds());
        if (!f && !e) return null;
        a = this._frames.length;
        for (var g = b.timeline.duration, k = 0; k < g; k++) this.addFrame(b, e && e[k] ? e[k] : f, d, function(b) {
            var a = this.actionsEnabled;
            this.actionsEnabled = !1;
            this.gotoAndStop(b);
            this.actionsEnabled = a
        }, [k], b);
        k = b.timeline._labels;
        b = [];
        for (var m in k) b.push({
            index: k[m],
            label: m
        });
        if (b.length)
            for (b.sort(function(b, a) {
                    return b.index - a.index
                }), k = 0, m = b.length; k < m; k++) {
                d = b[k].label;
                for (var e = a + (k == m - 1 ? g : b[k + 1].index), f = [], q = a + b[k].index; q < e; q++) f.push(q);
                this.addAnimation(d,
                    f, !0)
            }
    };
    a.build = function() {
        if (this._data) throw c.ERR_RUNNING;
        for (this._startBuild(); this._drawNext(););
        this._endBuild();
        return this.spriteSheet
    };
    a.buildAsync = function(b) {
        if (this._data) throw c.ERR_RUNNING;
        this.timeSlice = b;
        this._startBuild();
        var a = this;
        this._y42ID = setTimeout(function() {
            a._run()
        }, 50 - 50 * Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)))
    };
    a.stopAsync = function() {
        clearTimeout(this._y42ID);
        this._data = null
    };
    a.clone = function() {
        throw "SpriteSheetBuilder cannot be cloned.";
    };
    a.toString = function() {
        return "[SpriteSheetBuilder]"
    };
    a._startBuild = function() {
        var b = this.padding || 0;
        this.progress = 0;
        this.spriteSheet = null;
        this._index = 0;
        this._scale = this.scale;
        var a = [];
        this._data = {
            images: [],
            frames: a,
            animations: this._animations
        };
        var d = this._frames.slice();
        d.sort(function(b, a) {
            return b.height <= a.height ? -1 : 1
        });
        if (d[d.length - 1].height + 2 * b > this.maxHeight) throw c.ERR_DIMENSIONS;
        for (var e = 0, f = 0, g = 0; d.length;) {
            var k = this._fillRow(d, e, g, a, b);
            k.w > f && (f = k.w);
            e += k.h;
            if (!k.h || !d.length) {
                var m = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas");
                m.width = this._getSize(f, this.maxWidth);
                m.height = this._getSize(e, this.maxHeight);
                this._data.images[g] = m;
                k.h || (f = e = 0, g++)
            }
        }
    };
    a._getSize = function(b, a) {
        for (var c = 4; Math.pow(2, ++c) < b;);
        return Math.min(a, Math.pow(2, c))
    };
    a._fillRow = function(b, a, d, e, f) {
        var g = this.maxWidth,
            k = this.maxHeight;
        a += f;
        for (var k = k - a, m = f, q = 0, w = b.length - 1; 0 <= w; w--) {
            var u = b[w],
                t = this._scale * u.scale,
                x = u.sourceRect,
                y = u.source,
                n = Math.floor(t * x.x - f),
                C = Math.floor(t * x.y - f),
                B = Math.ceil(t * x.height + 2 * f),
                x = Math.ceil(t * x.width + 2 * f);
            if (x > g) throw c.ERR_DIMENSIONS;
            B > k || m + x > g || (u.img = d, u.rect = new createjs.Rectangle(m, a, x, B), q = q || B, b.splice(w, 1), e[u.index] = [m, a, x, B, d, Math.round(-n + t * y.regX - f), Math.round(-C + t * y.regY - f)], m += x)
        }
        return {
            w: m,
            h: q
        }
    };
    a._endBuild = function() {
        this.spriteSheet = new createjs.SpriteSheet(this._data);
        this._data = null;
        this.progress = 1;
        this.dispatchEvent("complete")
    };
    a._run = function() {
        for (var b = 50 * Math.max(0.01, Math.min(0.99, this.timeSlice || 0.3)), a = (new Date).getTime() + b, c = !1; a > (new Date).getTime();)
            if (!this._drawNext()) {
                c = !0;
                break
            }
        if (c) this._endBuild();
        else {
            var e = this;
            this._y42ID = setTimeout(function() {
                e._run()
            }, 50 - b)
        }
        b = this.progress = this._index / this._frames.length;
        this.hasEventListener("progress") && (a = new createjs.Event("progress"), a.progress = b, this.dispatchEvent(a))
    };
    a._drawNext = function() {
        var b = this._frames[this._index],
            a = b.scale * this._scale,
            c = b.rect,
            e = b.sourceRect,
            f = this._data.images[b.img].getContext("2d");
        b.funct && b.funct.apply(b.scope, b.params);
        f.save();
        f.beginPath();
        f.rect(c.x, c.y, c.width, c.height);
        f.clip();
        f.translate(Math.ceil(c.x - e.x *
            a), Math.ceil(c.y - e.y * a));
        f.scale(a, a);
        b.source.draw(f);
        f.restore();
        return ++this._index < this._frames.length
    };
    createjs.SpriteSheetBuilder = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b) {
            this.initialize(b)
        },
        a = c.prototype = new createjs.DisplayObject;
    a.htmlElement = null;
    a._oldMtx = null;
    a._visible = !1;
    a.DisplayObject_initialize = a.initialize;
    a.initialize = function(b) {
        "string" == typeof b && (b = document.getElementById(b));
        this.DisplayObject_initialize();
        this.mouseEnabled = !1;
        this.htmlElement = b;
        b = b.style;
        b.position = "absolute";
        b.transformOrigin = b.WebkitTransformOrigin = b.msTransformOrigin = b.MozTransformOrigin = b.OTransformOrigin = "0% 0%"
    };
    a.isVisible = function() {
        return null !=
            this.htmlElement
    };
    a.draw = function(b, a) {
        this.visible && (this._visible = !0);
        return !0
    };
    a.cache = function() {};
    a.uncache = function() {};
    a.updateCache = function() {};
    a.hitTest = function() {};
    a.localToGlobal = function() {};
    a.globalToLocal = function() {};
    a.localToLocal = function() {};
    a.clone = function() {
        throw "DOMElement cannot be cloned.";
    };
    a.toString = function() {
        return "[DOMElement (name=" + this.name + ")]"
    };
    a.DisplayObject__tick = a._tick;
    a._tick = function(b) {
        var a = this.getStage();
        this._visible = !1;
        a && a.on("drawend", this._handleDrawEnd,
            this, !0);
        this.DisplayObject__tick(b)
    };
    a._handleDrawEnd = function(b) {
        if (b = this.htmlElement) {
            b = b.style;
            var a = this._visible ? "visible" : "hidden";
            a != b.visibility && (b.visibility = a);
            if (this._visible) {
                var a = this.getConcatenatedMatrix(this._matrix),
                    c = this._oldMtx;
                c && c.alpha == a.alpha || (b.opacity = "" + (1E4 * a.alpha | 0) / 1E4, c && (c.alpha = a.alpha));
                if (!c || c.tx != a.tx || c.ty != a.ty || c.a != a.a || c.b != a.b || c.c != a.c || c.d != a.d) {
                    var e = "matrix(" + (1E4 * a.a | 0) / 1E4 + "," + (1E4 * a.b | 0) / 1E4 + "," + (1E4 * a.c | 0) / 1E4 + "," + (1E4 * a.d | 0) / 1E4 + "," + (a.tx +
                        0.5 | 0);
                    b.transform = b.WebkitTransform = b.OTransform = b.msTransform = e + "," + (a.ty + 0.5 | 0) + ")";
                    b.MozTransform = e + "px," + (a.ty + 0.5 | 0) + "px)";
                    this._oldMtx = c ? c.copy(a) : a.clone()
                }
            }
        }
    };
    createjs.DOMElement = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function() {
            this.initialize()
        },
        a = c.prototype;
    a.initialize = function() {};
    a.getBounds = function() {
        return null
    };
    a.applyFilter = function(b, a, c, e, f, g, k, m) {};
    a.toString = function() {
        return "[Filter]"
    };
    a.clone = function() {
        return new c
    };
    createjs.Filter = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b, a, c) {
            this.initialize(b, a, c)
        },
        a = c.prototype = new createjs.Filter;
    a.initialize = function(b, a, c) {
        if (isNaN(b) || 0 > b) b = 0;
        this.blurX = b | 0;
        if (isNaN(a) || 0 > a) a = 0;
        this.blurY = a | 0;
        if (isNaN(c) || 1 > c) c = 1;
        this.quality = c | 0
    };
    a.blurX = 0;
    a.blurY = 0;
    a.quality = 1;
    a.mul_table = [1, 171, 205, 293, 57, 373, 79, 137, 241, 27, 391, 357, 41, 19, 283, 265, 497, 469, 443, 421, 25, 191, 365, 349, 335, 161, 155, 149, 9, 278, 269, 261, 505, 245, 475, 231, 449, 437, 213, 415, 405, 395, 193, 377, 369, 361, 353, 345, 169, 331, 325, 319, 313, 307, 301, 37, 145, 285, 281,
        69, 271, 267, 263, 259, 509, 501, 493, 243, 479, 118, 465, 459, 113, 446, 55, 435, 429, 423, 209, 413, 51, 403, 199, 393, 97, 3, 379, 375, 371, 367, 363, 359, 355, 351, 347, 43, 85, 337, 333, 165, 327, 323, 5, 317, 157, 311, 77, 305, 303, 75, 297, 294, 73, 289, 287, 71, 141, 279, 277, 275, 68, 135, 67, 133, 33, 262, 260, 129, 511, 507, 503, 499, 495, 491, 61, 121, 481, 477, 237, 235, 467, 232, 115, 457, 227, 451, 7, 445, 221, 439, 218, 433, 215, 427, 425, 211, 419, 417, 207, 411, 409, 203, 202, 401, 399, 396, 197, 49, 389, 387, 385, 383, 95, 189, 47, 187, 93, 185, 23, 183, 91, 181, 45, 179, 89, 177, 11, 175, 87, 173, 345, 343,
        341, 339, 337, 21, 167, 83, 331, 329, 327, 163, 81, 323, 321, 319, 159, 79, 315, 313, 39, 155, 309, 307, 153, 305, 303, 151, 75, 299, 149, 37, 295, 147, 73, 291, 145, 289, 287, 143, 285, 71, 141, 281, 35, 279, 139, 69, 275, 137, 273, 17, 271, 135, 269, 267, 133, 265, 33, 263, 131, 261, 130, 259, 129, 257, 1
    ];
    a.shg_table = [0, 9, 10, 11, 9, 12, 10, 11, 12, 9, 13, 13, 10, 9, 13, 13, 14, 14, 14, 14, 10, 13, 14, 14, 14, 13, 13, 13, 9, 14, 14, 14, 15, 14, 15, 14, 15, 15, 14, 15, 15, 15, 14, 15, 15, 15, 15, 15, 14, 15, 15, 15, 15, 15, 15, 12, 14, 15, 15, 13, 15, 15, 15, 15, 16, 16, 16, 15, 16, 14, 16, 16, 14, 16, 13, 16, 16, 16, 15, 16, 13, 16, 15,
        16, 14, 9, 16, 16, 16, 16, 16, 16, 16, 16, 16, 13, 14, 16, 16, 15, 16, 16, 10, 16, 15, 16, 14, 16, 16, 14, 16, 16, 14, 16, 16, 14, 15, 16, 16, 16, 14, 15, 14, 15, 13, 16, 16, 15, 17, 17, 17, 17, 17, 17, 14, 15, 17, 17, 16, 16, 17, 16, 15, 17, 16, 17, 11, 17, 16, 17, 16, 17, 16, 17, 17, 16, 17, 17, 16, 17, 17, 16, 16, 17, 17, 17, 16, 14, 17, 17, 17, 17, 15, 16, 14, 16, 15, 16, 13, 16, 15, 16, 14, 16, 15, 16, 12, 16, 15, 16, 17, 17, 17, 17, 17, 13, 16, 15, 17, 17, 17, 16, 15, 17, 17, 17, 16, 15, 17, 17, 14, 16, 17, 17, 16, 17, 17, 16, 15, 17, 16, 14, 17, 16, 15, 17, 16, 17, 17, 16, 17, 15, 16, 17, 14, 17, 16, 15, 17, 16, 17, 13, 17, 16, 17, 17, 16, 17, 14, 17, 16,
        17, 16, 17, 16, 17, 9
    ];
    a.getBounds = function() {
        var b = 0.5 * Math.pow(this.quality, 0.6);
        return new createjs.Rectangle(-this.blurX * b, -this.blurY * b, 2 * this.blurX * b, 2 * this.blurY * b)
    };
    a.applyFilter = function(b, a, c, e, f, g, k, m) {
        g = g || b;
        null == k && (k = a);
        null == m && (m = c);
        try {
            var q = b.getImageData(a, c, e, f)
        } catch (w) {
            return !1
        }
        b = this.blurX / 2;
        if (isNaN(b) || 0 > b) return !1;
        b |= 0;
        var u = this.blurY / 2;
        if (isNaN(u) || 0 > u) return !1;
        u |= 0;
        if (0 == b && 0 == u) return !1;
        var t = this.quality;
        if (isNaN(t) || 1 > t) t = 1;
        t |= 0;
        3 < t && (t = 3);
        1 > t && (t = 1);
        var x = q.data,
            y, n, C,
            B, H, E, G, D, K, F, I, O, L = b + b + 1;
        B = u + u + 1;
        var p = e - 1,
            v = f - 1,
            A = b + 1,
            z = u + 1,
            J = {
                r: 0,
                b: 0,
                g: 0,
                a: 0,
                next: null
            };
        a = J;
        for (y = 1; y < L; y++) a = a.next = {
            r: 0,
            b: 0,
            g: 0,
            a: 0,
            next: null
        };
        a.next = J;
        c = L = {
            r: 0,
            b: 0,
            g: 0,
            a: 0,
            next: null
        };
        for (y = 1; y < B; y++) c = c.next = {
            r: 0,
            b: 0,
            g: 0,
            a: 0,
            next: null
        };
        c.next = L;
        for (y = null; 0 < t--;) {
            H = B = 0;
            var N = this.mul_table[b],
                P = this.shg_table[b];
            for (c = f; - 1 < --c;) {
                E = A * (F = x[B]);
                G = A * (I = x[B + 1]);
                D = A * (O = x[B + 2]);
                K = A * (C = x[B + 3]);
                a = J;
                for (y = A; - 1 < --y;) a.r = F, a.g = I, a.b = O, a.a = C, a = a.next;
                for (y = 1; y < A; y++) n = B + ((p < y ? p : y) << 2), E += a.r = x[n], G += a.g =
                    x[n + 1], D += a.b = x[n + 2], K += a.a = x[n + 3], a = a.next;
                y = J;
                for (a = 0; a < e; a++) x[B++] = E * N >>> P, x[B++] = G * N >>> P, x[B++] = D * N >>> P, x[B++] = K * N >>> P, n = H + ((n = a + b + 1) < p ? n : p) << 2, E -= y.r - (y.r = x[n]), G -= y.g - (y.g = x[n + 1]), D -= y.b - (y.b = x[n + 2]), K -= y.a - (y.a = x[n + 3]), y = y.next;
                H += e
            }
            N = this.mul_table[u];
            P = this.shg_table[u];
            for (a = 0; a < e; a++) {
                B = a << 2;
                E = z * (F = x[B]);
                G = z * (I = x[B + 1]);
                D = z * (O = x[B + 2]);
                K = z * (C = x[B + 3]);
                c = L;
                for (y = 0; y < z; y++) c.r = F, c.g = I, c.b = O, c.a = C, c = c.next;
                C = e;
                for (y = 1; y <= u; y++) B = C + a << 2, E += c.r = x[B], G += c.g = x[B + 1], D += c.b = x[B + 2], K += c.a = x[B + 3], c =
                    c.next, y < v && (C += e);
                B = a;
                y = L;
                if (0 < t)
                    for (c = 0; c < f; c++) n = B << 2, x[n + 3] = C = K * N >>> P, 0 < C ? (x[n] = E * N >>> P, x[n + 1] = G * N >>> P, x[n + 2] = D * N >>> P) : x[n] = x[n + 1] = x[n + 2] = 0, n = a + ((n = c + z) < v ? n : v) * e << 2, E -= y.r - (y.r = x[n]), G -= y.g - (y.g = x[n + 1]), D -= y.b - (y.b = x[n + 2]), K -= y.a - (y.a = x[n + 3]), y = y.next, B += e;
                else
                    for (c = 0; c < f; c++) n = B << 2, x[n + 3] = C = K * N >>> P, 0 < C ? (C = 255 / C, x[n] = (E * N >>> P) * C, x[n + 1] = (G * N >>> P) * C, x[n + 2] = (D * N >>> P) * C) : x[n] = x[n + 1] = x[n + 2] = 0, n = a + ((n = c + z) < v ? n : v) * e << 2, E -= y.r - (y.r = x[n]), G -= y.g - (y.g = x[n + 1]), D -= y.b - (y.b = x[n + 2]), K -= y.a - (y.a = x[n + 3]), y =
                        y.next, B += e
            }
        }
        g.putImageData(q, k, m);
        return !0
    };
    a.clone = function() {
        return new c(this.blurX, this.blurY, this.quality)
    };
    a.toString = function() {
        return "[BlurFilter]"
    };
    createjs.BlurFilter = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b) {
            this.initialize(b)
        },
        a = c.prototype = new createjs.Filter;
    a.initialize = function(b) {
        this.alphaMap = b
    };
    a.alphaMap = null;
    a._alphaMap = null;
    a._mapData = null;
    a.applyFilter = function(b, a, c, e, f, g, k, m) {
        if (!this.alphaMap) return !0;
        if (!this._prepAlphaMap()) return !1;
        g = g || b;
        null == k && (k = a);
        null == m && (m = c);
        try {
            var q = b.getImageData(a, c, e, f)
        } catch (w) {
            return !1
        }
        b = q.data;
        a = this._mapData;
        c = b.length;
        for (e = 0; e < c; e += 4) b[e + 3] = a[e] || 0;
        q.data = b;
        g.putImageData(q, k, m);
        return !0
    };
    a.clone = function() {
        return new c(this.alphaMap)
    };
    a.toString = function() {
        return "[AlphaMapFilter]"
    };
    a._prepAlphaMap = function() {
        if (!this.alphaMap) return !1;
        if (this.alphaMap == this._alphaMap && this._mapData) return !0;
        this._mapData = null;
        var b = this._alphaMap = this.alphaMap,
            a = b;
        b instanceof HTMLCanvasElement ? a = a.getContext("2d") : (a = createjs.createCanvas ? createjs.createCanvas() : document.createElement("canvas"), a.width = b.width, a.height = b.height, a = a.getContext("2d"), a.drawImage(b, 0, 0));
        try {
            var c = a.getImageData(0, 0, b.width, b.height)
        } catch (e) {
            return !1
        }
        this._mapData =
            c.data;
        return !0
    };
    createjs.AlphaMapFilter = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b) {
            this.initialize(b)
        },
        a = c.prototype = new createjs.Filter;
    a.initialize = function(b) {
        this.mask = b
    };
    a.mask = null;
    a.applyFilter = function(b, a, c, e, f, g, k, m) {
        if (!this.mask) return !0;
        g = g || b;
        null == k && (k = a);
        null == m && (m = c);
        g.save();
        g.globalCompositeOperation = "destination-in";
        g.drawImage(this.mask, k, m);
        g.restore();
        return !0
    };
    a.clone = function() {
        return new c(this.mask)
    };
    a.toString = function() {
        return "[AlphaMaskFilter]"
    };
    createjs.AlphaMaskFilter = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b, a, c, e, f, g, k, m) {
            this.initialize(b, a, c, e, f, g, k, m)
        },
        a = c.prototype = new createjs.Filter;
    a.redMultiplier = 1;
    a.greenMultiplier = 1;
    a.blueMultiplier = 1;
    a.alphaMultiplier = 1;
    a.redOffset = 0;
    a.greenOffset = 0;
    a.blueOffset = 0;
    a.alphaOffset = 0;
    a.initialize = function(b, a, c, e, f, g, k, m) {
        this.redMultiplier = null != b ? b : 1;
        this.greenMultiplier = null != a ? a : 1;
        this.blueMultiplier = null != c ? c : 1;
        this.alphaMultiplier = null != e ? e : 1;
        this.redOffset = f || 0;
        this.greenOffset = g || 0;
        this.blueOffset = k || 0;
        this.alphaOffset = m ||
            0
    };
    a.applyFilter = function(b, a, c, e, f, g, k, m) {
        g = g || b;
        null == k && (k = a);
        null == m && (m = c);
        try {
            var q = b.getImageData(a, c, e, f)
        } catch (w) {
            return !1
        }
        b = q.data;
        a = b.length;
        for (c = 0; c < a; c += 4) b[c] = b[c] * this.redMultiplier + this.redOffset, b[c + 1] = b[c + 1] * this.greenMultiplier + this.greenOffset, b[c + 2] = b[c + 2] * this.blueMultiplier + this.blueOffset, b[c + 3] = b[c + 3] * this.alphaMultiplier + this.alphaOffset;
        g.putImageData(q, k, m);
        return !0
    };
    a.toString = function() {
        return "[ColorFilter]"
    };
    a.clone = function() {
        return new c(this.redMultiplier, this.greenMultiplier,
            this.blueMultiplier, this.alphaMultiplier, this.redOffset, this.greenOffset, this.blueOffset, this.alphaOffset)
    };
    createjs.ColorFilter = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b, a, c, e) {
            this.initialize(b, a, c, e)
        },
        a = c.prototype = [];
    c.DELTA_INDEX = [0, 0.01, 0.02, 0.04, 0.05, 0.06, 0.07, 0.08, 0.1, 0.11, 0.12, 0.14, 0.15, 0.16, 0.17, 0.18, 0.2, 0.21, 0.22, 0.24, 0.25, 0.27, 0.28, 0.3, 0.32, 0.34, 0.36, 0.38, 0.4, 0.42, 0.44, 0.46, 0.48, 0.5, 0.53, 0.56, 0.59, 0.62, 0.65, 0.68, 0.71, 0.74, 0.77, 0.8, 0.83, 0.86, 0.89, 0.92, 0.95, 0.98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3,
        7.5, 7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10
    ];
    c.IDENTITY_MATRIX = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1];
    c.LENGTH = c.IDENTITY_MATRIX.length;
    a.initialize = function(b, a, c, e) {
        this.reset();
        this.adjustColor(b, a, c, e);
        return this
    };
    a.reset = function() {
        return this.copyMatrix(c.IDENTITY_MATRIX)
    };
    a.adjustColor = function(b, a, c, e) {
        this.adjustHue(e);
        this.adjustContrast(a);
        this.adjustBrightness(b);
        return this.adjustSaturation(c)
    };
    a.adjustBrightness = function(b) {
        if (0 == b || isNaN(b)) return this;
        b = this._cleanValue(b, 255);
        this._multiplyMatrix([1, 0, 0, 0, b, 0, 1, 0, 0, b, 0, 0, 1, 0, b, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        return this
    };
    a.adjustContrast = function(b) {
        if (0 == b || isNaN(b)) return this;
        b = this._cleanValue(b, 100);
        var a;
        0 > b ? a = 127 + 127 * (b / 100) : (a = b % 1, a = 0 == a ? c.DELTA_INDEX[b] : c.DELTA_INDEX[b << 0] * (1 - a) + c.DELTA_INDEX[(b << 0) + 1] * a, a = 127 * a + 127);
        this._multiplyMatrix([a / 127, 0, 0, 0, 0.5 * (127 - a), 0, a / 127, 0, 0, 0.5 * (127 - a), 0, 0, a / 127, 0, 0.5 * (127 - a), 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        return this
    };
    a.adjustSaturation = function(b) {
        if (0 == b || isNaN(b)) return this;
        b = this._cleanValue(b,
            100);
        b = 1 + (0 < b ? 3 * b / 100 : b / 100);
        this._multiplyMatrix([0.3086 * (1 - b) + b, 0.6094 * (1 - b), 0.082 * (1 - b), 0, 0, 0.3086 * (1 - b), 0.6094 * (1 - b) + b, 0.082 * (1 - b), 0, 0, 0.3086 * (1 - b), 0.6094 * (1 - b), 0.082 * (1 - b) + b, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1]);
        return this
    };
    a.adjustHue = function(b) {
        if (0 == b || isNaN(b)) return this;
        b = this._cleanValue(b, 180) / 180 * Math.PI;
        var a = Math.cos(b);
        b = Math.sin(b);
        this._multiplyMatrix([0.213 + 0.787 * a + -0.213 * b, 0.715 + -0.715 * a + -0.715 * b, 0.072 + -0.072 * a + 0.928 * b, 0, 0, 0.213 + -0.213 * a + 0.143 * b, 0.715 + a * (1 - 0.715) + 0.14 * b, 0.072 + -0.072 * a +
            -0.283 * b, 0, 0, 0.213 + -0.213 * a + -0.787 * b, 0.715 + -0.715 * a + 0.715 * b, 0.072 + 0.928 * a + 0.072 * b, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1
        ]);
        return this
    };
    a.concat = function(b) {
        b = this._fixMatrix(b);
        if (b.length != c.LENGTH) return this;
        this._multiplyMatrix(b);
        return this
    };
    a.clone = function() {
        return new c(this)
    };
    a.toArray = function() {
        return this.slice(0, c.LENGTH)
    };
    a.copyMatrix = function(b) {
        for (var a = c.LENGTH, d = 0; d < a; d++) this[d] = b[d];
        return this
    };
    a._multiplyMatrix = function(b) {
        for (var a = [], c = 0; 5 > c; c++) {
            for (var e = 0; 5 > e; e++) a[e] = this[e + 5 * c];
            for (e =
                0; 5 > e; e++) {
                for (var f = 0, g = 0; 5 > g; g++) f += b[e + 5 * g] * a[g];
                this[e + 5 * c] = f
            }
        }
    };
    a._cleanValue = function(b, a) {
        return Math.min(a, Math.max(-a, b))
    };
    a._fixMatrix = function(b) {
        b instanceof c && (b = b.slice(0));
        b.length < c.LENGTH ? b = b.slice(0, b.length).concat(c.IDENTITY_MATRIX.slice(b.length, c.LENGTH)) : b.length > c.LENGTH && (b = b.slice(0, c.LENGTH));
        return b
    };
    createjs.ColorMatrix = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b) {
            this.initialize(b)
        },
        a = c.prototype = new createjs.Filter;
    a.matrix = null;
    a.initialize = function(b) {
        this.matrix = b
    };
    a.applyFilter = function(b, a, c, e, f, g, k, m) {
        g = g || b;
        null == k && (k = a);
        null == m && (m = c);
        try {
            var q = b.getImageData(a, c, e, f)
        } catch (w) {
            return !1
        }
        b = q.data;
        a = b.length;
        var u, t, x, y;
        u = this.matrix;
        c = u[0];
        e = u[1];
        f = u[2];
        for (var n = u[3], C = u[4], B = u[5], H = u[6], E = u[7], G = u[8], D = u[9], K = u[10], F = u[11], I = u[12], O = u[13], L = u[14], p = u[15], v = u[16], A = u[17], z = u[18], J = u[19], N = 0; N < a; N += 4) u = b[N], t = b[N + 1], x =
            b[N + 2], y = b[N + 3], b[N] = u * c + t * e + x * f + y * n + C, b[N + 1] = u * B + t * H + x * E + y * G + D, b[N + 2] = u * K + t * F + x * I + y * O + L, b[N + 3] = u * p + t * v + x * A + y * z + J;
        g.putImageData(q, k, m);
        return !0
    };
    a.toString = function() {
        return "[ColorMatrixFilter]"
    };
    a.clone = function() {
        return new c(this.matrix)
    };
    createjs.ColorMatrixFilter = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function() {
        throw "Touch cannot be instantiated";
    };
    c.isSupported = function() {
        return "ontouchstart" in window || window.navigator.msPointerEnabled && 0 < window.navigator.msMaxTouchPoints
    };
    c.enable = function(a, b, h) {
        if (!a || !a.canvas || !c.isSupported()) return !1;
        a.__touch = {
            pointers: {},
            multitouch: !b,
            preventDefault: !h,
            count: 0
        };
        "ontouchstart" in window ? c._IOS_enable(a) : window.navigator.msPointerEnabled && c._IE_enable(a);
        return !0
    };
    c.disable = function(a) {
        a && ("ontouchstart" in window ? c._IOS_disable(a) : window.navigator.msPointerEnabled &&
            c._IE_disable(a))
    };
    c._IOS_enable = function(a) {
        var b = a.canvas,
            h = a.__touch.f = function(b) {
                c._IOS_handleEvent(a, b)
            };
        b.addEventListener("touchstart", h, !1);
        b.addEventListener("touchmove", h, !1);
        b.addEventListener("touchend", h, !1);
        b.addEventListener("touchcancel", h, !1)
    };
    c._IOS_disable = function(a) {
        var b = a.canvas;
        b && (a = a.__touch.f, b.removeEventListener("touchstart", a, !1), b.removeEventListener("touchmove", a, !1), b.removeEventListener("touchend", a, !1), b.removeEventListener("touchcancel", a, !1))
    };
    c._IOS_handleEvent =
        function(a, b) {
            if (a) {
                a.__touch.preventDefault && b.preventDefault && b.preventDefault();
                for (var c = b.changedTouches, d = b.type, e = 0, f = c.length; e < f; e++) {
                    var g = c[e],
                        k = g.identifier;
                    g.target == a.canvas && ("touchstart" == d ? this._handleStart(a, k, b, g.pageX, g.pageY) : "touchmove" == d ? this._handleMove(a, k, b, g.pageX, g.pageY) : "touchend" != d && "touchcancel" != d || this._handleEnd(a, k, b))
                }
            }
        };
    c._IE_enable = function(a) {
        var b = a.canvas,
            h = a.__touch.f = function(b) {
                c._IE_handleEvent(a, b)
            };
        b.addEventListener("MSPointerDown", h, !1);
        window.addEventListener("MSPointerMove",
            h, !1);
        window.addEventListener("MSPointerUp", h, !1);
        window.addEventListener("MSPointerCancel", h, !1);
        a.__touch.preventDefault && (b.style.msTouchAction = "none");
        a.__touch.activeIDs = {}
    };
    c._IE_disable = function(a) {
        var b = a.__touch.f;
        window.removeEventListener("MSPointerMove", b, !1);
        window.removeEventListener("MSPointerUp", b, !1);
        window.removeEventListener("MSPointerCancel", b, !1);
        a.canvas && a.canvas.removeEventListener("MSPointerDown", b, !1)
    };
    c._IE_handleEvent = function(a, b) {
        if (a) {
            a.__touch.preventDefault && b.preventDefault &&
                b.preventDefault();
            var c = b.type,
                d = b.pointerId,
                e = a.__touch.activeIDs;
            if ("MSPointerDown" == c) b.srcElement == a.canvas && (e[d] = !0, this._handleStart(a, d, b, b.pageX, b.pageY));
            else if (e[d])
                if ("MSPointerMove" == c) this._handleMove(a, d, b, b.pageX, b.pageY);
                else if ("MSPointerUp" == c || "MSPointerCancel" == c) delete e[d], this._handleEnd(a, d, b)
        }
    };
    c._handleStart = function(a, b, c, d, e) {
        var f = a.__touch;
        if (f.multitouch || !f.count) {
            var g = f.pointers;
            g[b] || (g[b] = !0, f.count++, a._handlePointerDown(b, c, d, e))
        }
    };
    c._handleMove = function(a,
        b, c, d, e) {
        a.__touch.pointers[b] && a._handlePointerMove(b, c, d, e)
    };
    c._handleEnd = function(a, b, c) {
        var d = a.__touch,
            e = d.pointers;
        e[b] && (d.count--, a._handlePointerUp(b, c, !0), delete e[b])
    };
    createjs.Touch = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = createjs.EaselJS = createjs.EaselJS || {};
    c.version = "NEXT";
    c.buildDate = "Sun, 06 Oct 2013 10:56:52 GMT"
})();
(function() {
    var c = createjs.Stage.prototype._handlePointerDown,
        a = createjs.Stage.prototype._handlePointerUp,
        b = !1; - 1 < navigator.userAgent.indexOf("Android") && (createjs.Stage.prototype._handlePointerDown = function(a, d, e, f) {
        d.touches && (b = !0, this.enableDOMEvents(!1));
        b ? d.touches && "undefined" != typeof d.touches[0].pageX && (d.screenX = d.touches[0].pageX, d.screenY = d.touches[0].pageY, c.call(this, a, d, e, f)) : (d.screenX = d.x, d.screenY = d.y, c.call(this, a, d, e, f))
    }, createjs.Stage.prototype._handlePointerUp = function(c, d,
        e) {
        d.changedTouches && (b = !0);
        b ? d.changedTouches && "undefined" != typeof d.changedTouches[0].pageX && (d.screenX = d.changedTouches[0].pageX, d.screenY = d.changedTouches[0].pageY, a.call(this, c, d, e)) : (d.screenX = d.x, d.screenY = d.y, a.call(this, c, d, e))
    })
})();
this.createjs = this.createjs || {};
(function() {
    var c = createjs.PreloadJS = createjs.PreloadJS || {};
    c.version = "0.4.0";
    c.buildDate = "Wed, 25 Sep 2013 17:09:35 GMT"
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b, a, c) {
            this.initialize(b, a, c)
        },
        a = c.prototype;
    a.type = null;
    a.target = null;
    a.currentTarget = null;
    a.eventPhase = 0;
    a.bubbles = !1;
    a.cancelable = !1;
    a.timeStamp = 0;
    a.defaultPrevented = !1;
    a.propagationStopped = !1;
    a.immediatePropagationStopped = !1;
    a.removed = !1;
    a.initialize = function(b, a, c) {
        this.type = b;
        this.bubbles = a;
        this.cancelable = c;
        this.timeStamp = (new Date).getTime()
    };
    a.preventDefault = function() {
        this.defaultPrevented = !0
    };
    a.stopPropagation = function() {
        this.propagationStopped = !0
    };
    a.stopImmediatePropagation =
        function() {
            this.immediatePropagationStopped = this.propagationStopped = !0
        };
    a.remove = function() {
        this.removed = !0
    };
    a.clone = function() {
        return new c(this.type, this.bubbles, this.cancelable)
    };
    a.toString = function() {
        return "[Event (type=" + this.type + ")]"
    };
    createjs.Event = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function() {},
        a = c.prototype;
    c.initialize = function(b) {
        b.addEventListener = a.addEventListener;
        b.on = a.on;
        b.removeEventListener = b.off = a.removeEventListener;
        b.removeAllEventListeners = a.removeAllEventListeners;
        b.hasEventListener = a.hasEventListener;
        b.dispatchEvent = a.dispatchEvent;
        b._dispatchEvent = a._dispatchEvent
    };
    a._listeners = null;
    a._captureListeners = null;
    a.initialize = function() {};
    a.addEventListener = function(b, a, c) {
        var e;
        e = c ? this._captureListeners = this._captureListeners || {} : this._listeners =
            this._listeners || {};
        var f = e[b];
        return f && this.removeEventListener(b, a, c), f = e[b], f ? f.push(a) : e[b] = [a], a
    };
    a.on = function(b, a, c, e, f, g) {
        return a.handleEvent && (c = c || a, a = a.handleEvent), c = c || this, this.addEventListener(b, function(b) {
            a.call(c, b, f);
            e && b.remove()
        }, g)
    };
    a.removeEventListener = function(b, a, c) {
        if (c = c ? this._captureListeners : this._listeners) {
            var e = c[b];
            if (e)
                for (var f = 0, g = e.length; g > f; f++)
                    if (e[f] == a) {
                        1 == g ? delete c[b] : e.splice(f, 1);
                        break
                    }
        }
    };
    a.off = a.removeEventListener;
    a.removeAllEventListeners = function(b) {
        b ?
            (this._listeners && delete this._listeners[b], this._captureListeners && delete this._captureListeners[b]) : this._listeners = this._captureListeners = null
    };
    a.dispatchEvent = function(b, a) {
        if ("string" == typeof b) {
            var c = this._listeners;
            if (!c || !c[b]) return !1;
            b = new createjs.Event(b)
        }
        if (b.target = a || this, b.bubbles && this.parent) {
            for (var e = this, c = [e]; e.parent;) c.push(e = e.parent);
            for (var f = c.length, e = f - 1; 0 <= e && !b.propagationStopped; e--) c[e]._dispatchEvent(b, 1 + (0 == e));
            for (e = 1; f > e && !b.propagationStopped; e++) c[e]._dispatchEvent(b,
                3)
        } else this._dispatchEvent(b, 2);
        return b.defaultPrevented
    };
    a.hasEventListener = function(b) {
        var a = this._listeners,
            c = this._captureListeners;
        return !!(a && a[b] || c && c[b])
    };
    a.toString = function() {
        return "[EventDispatcher]"
    };
    a._dispatchEvent = function(b, a) {
        var c, e = 1 == a ? this._captureListeners : this._listeners;
        if (b && e && (e = e[b.type]) && (c = e.length)) {
            b.currentTarget = this;
            b.eventPhase = a;
            b.removed = !1;
            for (var e = e.slice(), f = 0; c > f && !b.immediatePropagationStopped; f++) {
                var g = e[f];
                g.handleEvent ? g.handleEvent(b) : g(b);
                b.removed &&
                    (this.off(b.type, g, 1 == a), b.removed = !1)
            }
        }
    };
    createjs.EventDispatcher = c
})();
this.createjs = this.createjs || {};
(function() {
    createjs.indexOf = function(c, a) {
        for (var b = 0, h = c.length; h > b; b++)
            if (a === c[b]) return b;
        return -1
    }
})();
this.createjs = this.createjs || {};
(function() {
    createjs.proxy = function(c, a) {
        var b = Array.prototype.slice.call(arguments, 2);
        return function() {
            return c.apply(a, Array.prototype.slice.call(arguments, 0).concat(b))
        }
    }
})();
this.createjs = this.createjs || {};
(function() {
    var c = function() {
        this.init()
    };
    c.prototype = {};
    var a = c.prototype;
    c.FILE_PATTERN = /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/;
    a.loaded = !1;
    a.canceled = !1;
    a.progress = 0;
    a._item = null;
    a._basePath = null;
    a.addEventListener = null;
    a.removeEventListener = null;
    a.removeAllEventListeners = null;
    a.dispatchEvent = null;
    a.hasEventListener = null;
    a._listeners = null;
    createjs.EventDispatcher.initialize(a);
    a.getItem = function() {
        return this._item
    };
    a.init = function() {};
    a.load =
        function() {};
    a.close = function() {};
    a._sendLoadStart = function() {
        this._isCanceled() || this.dispatchEvent("loadstart")
    };
    a._sendProgress = function(b) {
        if (!this._isCanceled()) {
            var a = null;
            "number" == typeof b ? (this.progress = b, a = new createjs.Event("progress"), a.loaded = this.progress, a.total = 1) : (a = b, this.progress = b.loaded / b.total, (isNaN(this.progress) || 1 / 0 == this.progress) && (this.progress = 0));
            a.progress = this.progress;
            this.hasEventListener("progress") && this.dispatchEvent(a)
        }
    };
    a._sendComplete = function() {
        this._isCanceled() ||
            this.dispatchEvent("complete")
    };
    a._sendError = function(b) {
        !this._isCanceled() && this.hasEventListener("error") && (null == b && (b = new createjs.Event("error")), this.dispatchEvent(b))
    };
    a._isCanceled = function() {
        return null == window.createjs || this.canceled ? !0 : !1
    };
    a._parseURI = function(b) {
        return b ? b.match(c.FILE_PATTERN) : null
    };
    a._formatQueryString = function(b, a) {
        if (null == b) throw Error("You must specify data.");
        var c = [],
            e;
        for (e in b) c.push(e + "=" + escape(b[e]));
        return a && (c = c.concat(a)), c.join("&")
    };
    a.buildPath = function(b,
        a, c) {
        if (null != a) {
            var e = this._parseURI(b);
            null != e && null != e[1] && "" != e[1] || (b = a + b)
        }
        if (null == c) return b;
        a = [];
        e = b.indexOf("?");
        if (-1 != e) {
            var f = b.slice(e + 1);
            a = a.concat(f.split("&"))
        }
        return -1 != e ? b.slice(0, e) + "?" + this._formatQueryString(c, a) : b + "?" + this._formatQueryString(c, a)
    };
    a.toString = function() {
        return "[PreloadJS AbstractLoader]"
    };
    createjs.AbstractLoader = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b, a) {
            this.init(b, a)
        },
        a = c.prototype = new createjs.AbstractLoader;
    c.LOAD_TIMEOUT = 8E3;
    c.BINARY = "binary";
    c.CSS = "css";
    c.IMAGE = "image";
    c.JAVASCRIPT = "javascript";
    c.JSON = "json";
    c.JSONP = "jsonp";
    c.SOUND = "sound";
    c.SVG = "svg";
    c.TEXT = "text";
    c.XML = "xml";
    c.POST = "POST";
    c.GET = "GET";
    a.useXHR = !0;
    a.stopOnError = !1;
    a.maintainScriptOrder = !0;
    a.next = null;
    a._typeCallbacks = null;
    a._extensionCallbacks = null;
    a._loadStartWasDispatched = !1;
    a._maxConnections = 1;
    a._currentlyLoadingScript = null;
    a._currentLoads =
        null;
    a._loadQueue = null;
    a._loadQueueBackup = null;
    a._loadItemsById = null;
    a._loadItemsBySrc = null;
    a._loadedResults = null;
    a._loadedRawResults = null;
    a._numItems = 0;
    a._numItemsLoaded = 0;
    a._scriptOrder = null;
    a._loadedScripts = null;
    a.init = function(b, a) {
        this._numItems = this._numItemsLoaded = 0;
        this._loadStartWasDispatched = this._paused = !1;
        this._currentLoads = [];
        this._loadQueue = [];
        this._loadQueueBackup = [];
        this._scriptOrder = [];
        this._loadedScripts = [];
        this._loadItemsById = {};
        this._loadItemsBySrc = {};
        this._loadedResults = {};
        this._loadedRawResults = {};
        this._typeCallbacks = {};
        this._extensionCallbacks = {};
        this._basePath = a;
        this.setUseXHR(b)
    };
    a.setUseXHR = function(b) {
        return this.useXHR = 0 != b && null != window.XMLHttpRequest, this.useXHR
    };
    a.removeAll = function() {
        this.remove()
    };
    a.remove = function(b) {
        var a = null;
        if (!b || b instanceof Array)
            if (b) a = b;
            else {
                if (0 < arguments.length) return
            } else a = [b];
        var c = !1;
        if (a) {
            for (; a.length;) {
                for (var f = a.pop(), g = this.getResult(f), k = this._loadQueue.length - 1; 0 <= k; k--)
                    if (m = this._loadQueue[k].getItem(), m.id == f || m.src == f) {
                        this._loadQueue.splice(k,
                            1)[0].cancel();
                        break
                    }
                for (k = this._loadQueueBackup.length - 1; 0 <= k; k--)
                    if (m = this._loadQueueBackup[k].getItem(), m.id == f || m.src == f) {
                        this._loadQueueBackup.splice(k, 1)[0].cancel();
                        break
                    }
                if (g) delete this._loadItemsById[g.id], delete this._loadItemsBySrc[g.src], this._disposeItem(g);
                else
                    for (var k = this._currentLoads.length - 1; 0 <= k; k--) {
                        var m = this._currentLoads[k].getItem();
                        if (m.id == f || m.src == f) {
                            this._currentLoads.splice(k, 1)[0].cancel();
                            c = !0;
                            break
                        }
                    }
            }
            c && this._loadNext()
        } else {
            this.close();
            for (f in this._loadItemsById) this._disposeItem(this._loadItemsById[f]);
            this.init(this.useXHR)
        }
    };
    a.reset = function() {
        this.close();
        for (var b in this._loadItemsById) this._disposeItem(this._loadItemsById[b]);
        b = [];
        i = 0;
        for (l = this._loadQueueBackup.length; l > i; i++) b.push(this._loadQueueBackup[i].getItem());
        this.loadManifest(b, !1)
    };
    c.isBinary = function(b) {
        switch (b) {
            case createjs.LoadQueue.IMAGE:
            case createjs.LoadQueue.BINARY:
                return !0;
            default:
                return !1
        }
    };
    a.installPlugin = function(b) {
        if (null != b && null != b.getPreloadHandlers) {
            b = b.getPreloadHandlers();
            if (null != b.types)
                for (var a = 0, c = b.types.length; c >
                    a; a++) this._typeCallbacks[b.types[a]] = b.callback;
            if (null != b.extensions)
                for (a = 0, c = b.extensions.length; c > a; a++) this._extensionCallbacks[b.extensions[a]] = b.callback
        }
    };
    a.setMaxConnections = function(b) {
        this._maxConnections = b;
        !this._paused && 0 < this._loadQueue.length && this._loadNext()
    };
    a.loadFile = function(b, a, c) {
        if (null == b) return b = new createjs.Event("error"), b.text = "PRELOAD_NO_FILE", this._sendError(b), void 0;
        this._addItem(b, c);
        !1 !== a ? this.setPaused(!1) : this.setPaused(!0)
    };
    a.loadManifest = function(b, a, c) {
        var f =
            null;
        if (b instanceof Array) {
            if (0 == b.length) return a = new createjs.Event("error"), a.text = "PRELOAD_MANIFEST_EMPTY", this._sendError(a), void 0;
            f = b
        } else {
            if (null == b) return a = new createjs.Event("error"), a.text = "PRELOAD_MANIFEST_NULL", this._sendError(a), void 0;
            f = [b]
        }
        b = 0;
        for (var g = f.length; g > b; b++) this._addItem(f[b], c);
        !1 !== a ? this.setPaused(!1) : this.setPaused(!0)
    };
    a.load = function() {
        this.setPaused(!1)
    };
    a.getItem = function(b) {
        return this._loadItemsById[b] || this._loadItemsBySrc[b]
    };
    a.getResult = function(b, a) {
        var c =
            this._loadItemsById[b] || this._loadItemsBySrc[b];
        if (null == c) return null;
        c = c.id;
        return a && this._loadedRawResults[c] ? this._loadedRawResults[c] : this._loadedResults[c]
    };
    a.setPaused = function(b) {
        (this._paused = b) || this._loadNext()
    };
    a.close = function() {
        for (; this._currentLoads.length;) this._currentLoads.pop().cancel();
        this._scriptOrder.length = 0;
        this._loadedScripts.length = 0;
        this.loadStartWasDispatched = !1
    };
    a._addItem = function(b, a) {
        var c = this._createLoadItem(b);
        if (null != c) {
            var f = this._createLoader(c, a);
            null != f &&
                (this._loadQueue.push(f), this._loadQueueBackup.push(f), this._numItems++, this._updateProgress(), this.maintainScriptOrder && c.type == createjs.LoadQueue.JAVASCRIPT && f instanceof createjs.XHRLoader && (this._scriptOrder.push(c), this._loadedScripts.push(null)))
        }
    };
    a._createLoadItem = function(b) {
        var a = null;
        switch (typeof b) {
            case "string":
                a = {
                    src: b
                };
                break;
            case "object":
                a = window.HTMLAudioElement && b instanceof HTMLAudioElement ? {
                    tag: b,
                    src: a.tag.src,
                    type: createjs.LoadQueue.SOUND
                } : b;
                break;
            default:
                return null
        }
        b = this._parseURI(a.src);
        if (null != b && (a.ext = b[5]), null == a.type && (a.type = this._getTypeByExtension(a.ext)), a.type == createjs.LoadQueue.JSON && null != a.callback && (a.type = createjs.LoadQueue.JSONP), a.type == createjs.LoadQueue.JSONP && null == a.callback) throw Error("callback is required for loading JSONP requests.");
        null == a.tag && (a.tag = this._createTag(a.type));
        null != a.id && "" != a.id || (a.id = a.src);
        if (b = this._typeCallbacks[a.type] || this._extensionCallbacks[a.ext]) {
            b = b(a.src, a.type, a.id, a.data);
            if (!1 === b) return null;
            !0 === b || (null != b.src &&
                (a.src = b.src), null != b.id && (a.id = b.id), null != b.tag && b.tag.load instanceof Function && (a.tag = b.tag), null != b.completeHandler && (a.completeHandler = b.completeHandler));
            b.type && (a.type = b.type);
            b = this._parseURI(a.src);
            null != b && null != b[5] && (a.ext = b[5].toLowerCase())
        }
        return this._loadItemsById[a.id] = a, this._loadItemsBySrc[a.src] = a, a
    };
    a._createLoader = function(b, a) {
        var c = this.useXHR;
        switch (b.type) {
            case createjs.LoadQueue.JSON:
            case createjs.LoadQueue.XML:
            case createjs.LoadQueue.TEXT:
                c = !0;
                break;
            case createjs.LoadQueue.SOUND:
            case createjs.LoadQueue.JSONP:
                c = !1;
                break;
            case null:
                return null
        }
        return null == a && (a = this._basePath), c ? new createjs.XHRLoader(b, a) : new createjs.TagLoader(b, a)
    };
    a._loadNext = function() {
        if (!this._paused) {
            this._loadStartWasDispatched || (this._sendLoadStart(), this._loadStartWasDispatched = !0);
            this._numItems == this._numItemsLoaded ? (this.loaded = !0, this._sendComplete(), this.next && this.next.load && this.next.load()) : this.loaded = !1;
            for (var b = 0; b < this._loadQueue.length && !(this._currentLoads.length >= this._maxConnections); b++) {
                var a = this._loadQueue[b];
                if (this.maintainScriptOrder && a instanceof createjs.TagLoader && a.getItem().type == createjs.LoadQueue.JAVASCRIPT) {
                    if (this._currentlyLoadingScript) continue;
                    this._currentlyLoadingScript = !0
                }
                this._loadQueue.splice(b, 1);
                b--;
                this._loadItem(a)
            }
        }
    };
    a._loadItem = function(b) {
        b.addEventListener("progress", createjs.proxy(this._handleProgress, this));
        b.addEventListener("complete", createjs.proxy(this._handleFileComplete, this));
        b.addEventListener("error", createjs.proxy(this._handleFileError, this));
        this._currentLoads.push(b);
        this._sendFileStart(b.getItem());
        b.load()
    };
    a._handleFileError = function(b) {
        var a = b.target;
        this._numItemsLoaded++;
        this._updateProgress();
        b = new createjs.Event("error");
        b.text = "FILE_LOAD_ERROR";
        b.item = a.getItem();
        this._sendError(b);
        this.stopOnError || (this._removeLoadItem(a), this._loadNext())
    };
    a._handleFileComplete = function(b) {
        b = b.target;
        var a = b.getItem();
        if (this._loadedResults[a.id] = b.getResult(), b instanceof createjs.XHRLoader && (this._loadedRawResults[a.id] = b.getResult(!0)), this._removeLoadItem(b), this.maintainScriptOrder &&
            a.type == createjs.LoadQueue.JAVASCRIPT) {
            if (!(b instanceof createjs.TagLoader)) return this._loadedScripts[createjs.indexOf(this._scriptOrder, a)] = a, this._checkScriptLoadOrder(b), void 0;
            this._currentlyLoadingScript = !1
        }
        this._processFinishedLoad(a, b)
    };
    a._processFinishedLoad = function(b, a) {
        this._numItemsLoaded++;
        this._updateProgress();
        this._sendFileComplete(b, a);
        this._loadNext()
    };
    a._checkScriptLoadOrder = function() {
        for (var b = this._loadedScripts.length, a = 0; b > a; a++) {
            var c = this._loadedScripts[a];
            if (null === c) break;
            !0 !== c && (this._processFinishedLoad(c), this._loadedScripts[a] = !0, a--, b--)
        }
    };
    a._removeLoadItem = function(b) {
        for (var a = this._currentLoads.length, c = 0; a > c; c++)
            if (this._currentLoads[c] == b) {
                this._currentLoads.splice(c, 1);
                break
            }
    };
    a._handleProgress = function(b) {
        b = b.target;
        this._sendFileProgress(b.getItem(), b.progress);
        this._updateProgress()
    };
    a._updateProgress = function() {
        var b = this._numItemsLoaded / this._numItems,
            a = this._numItems - this._numItemsLoaded;
        if (0 < a) {
            for (var c = 0, f = 0, g = this._currentLoads.length; g > f; f++) c +=
                this._currentLoads[f].progress;
            b += c / a * (a / this._numItems)
        }
        this._sendProgress(b)
    };
    a._disposeItem = function(b) {
        delete this._loadedResults[b.id];
        delete this._loadedRawResults[b.id];
        delete this._loadItemsById[b.id];
        delete this._loadItemsBySrc[b.src]
    };
    a._createTag = function(b) {
        var a = null;
        switch (b) {
            case createjs.LoadQueue.IMAGE:
                return document.createElement("img");
            case createjs.LoadQueue.SOUND:
                return a = document.createElement("audio"), a.autoplay = !1, a;
            case createjs.LoadQueue.JSONP:
            case createjs.LoadQueue.JAVASCRIPT:
                return a =
                    document.createElement("script"), a.type = "text/javascript", a;
            case createjs.LoadQueue.CSS:
                return a = this.useXHR ? document.createElement("style") : document.createElement("link"), a.rel = "stylesheet", a.type = "text/css", a;
            case createjs.LoadQueue.SVG:
                return this.useXHR ? a = document.createElement("svg") : (a = document.createElement("object"), a.type = "image/svg+xml"), a
        }
        return null
    };
    a._getTypeByExtension = function(b) {
        if (null == b) return createjs.LoadQueue.TEXT;
        switch (b.toLowerCase()) {
            case "jpeg":
            case "jpg":
            case "gif":
            case "png":
            case "webp":
            case "bmp":
                return createjs.LoadQueue.IMAGE;
            case "ogg":
            case "mp3":
            case "wav":
                return createjs.LoadQueue.SOUND;
            case "json":
                return createjs.LoadQueue.JSON;
            case "xml":
                return createjs.LoadQueue.XML;
            case "css":
                return createjs.LoadQueue.CSS;
            case "js":
                return createjs.LoadQueue.JAVASCRIPT;
            case "svg":
                return createjs.LoadQueue.SVG;
            default:
                return createjs.LoadQueue.TEXT
        }
    };
    a._sendFileProgress = function(b, a) {
        if (this._isCanceled()) return this._cleanUp(), void 0;
        if (this.hasEventListener("fileprogress")) {
            var c = new createjs.Event("fileprogress");
            c.progress = a;
            c.loaded = a;
            c.total = 1;
            c.item = b;
            this.dispatchEvent(c)
        }
    };
    a._sendFileComplete = function(b, a) {
        if (!this._isCanceled()) {
            var c = new createjs.Event("fileload");
            c.loader = a;
            c.item = b;
            c.result = this._loadedResults[b.id];
            c.rawResult = this._loadedRawResults[b.id];
            b.completeHandler && b.completeHandler(c);
            this.hasEventListener("fileload") && this.dispatchEvent(c)
        }
    };
    a._sendFileStart = function(b) {
        var a = new createjs.Event("y111tart");
        a.item = b;
        this.hasEventListener("y111tart") && this.dispatchEvent(a)
    };
    a.toString = function() {
        return "[PreloadJS LoadQueue]"
    };
    createjs.LoadQueue = c;
    var b = function() {};
    b.init = function() {
        var a = navigator.userAgent;
        b.isFirefox = -1 < a.indexOf("Firefox");
        b.isOpera = null != window.opera;
        b.isChrome = -1 < a.indexOf("Chrome");
        b.isIOS = -1 < a.indexOf("iPod") || -1 < a.indexOf("iPhone") || -1 < a.indexOf("iPad")
    };
    b.init();
    createjs.LoadQueue.BrowserDetect = b
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b, a) {
            this.init(b, a)
        },
        a = c.prototype = new createjs.AbstractLoader;
    a._loadTimeout = null;
    a._tagCompleteProxy = null;
    a._isAudio = !1;
    a._tag = null;
    a._jsonResult = null;
    a.init = function(b, a) {
        this._item = b;
        this._basePath = a;
        this._tag = b.tag;
        this._isAudio = window.HTMLAudioElement && b.tag instanceof HTMLAudioElement;
        this._tagCompleteProxy = createjs.proxy(this._handleLoad, this)
    };
    a.getResult = function() {
        return this._item.type == createjs.LoadQueue.JSONP ? this._jsonResult : this._tag
    };
    a.cancel = function() {
        this.canceled = !0;
        this._clean();
        this.getItem()
    };
    a.load = function() {
        var b = this._item,
            a = this._tag;
        clearTimeout(this._loadTimeout);
        this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), createjs.LoadQueue.LOAD_TIMEOUT);
        this._isAudio && (a.src = null, a.y298 = "auto");
        a.onerror = createjs.proxy(this._handleError, this);
        this._isAudio ? (a.onstalled = createjs.proxy(this._handleStalled, this), a.addEventListener("canplaythrough", this._tagCompleteProxy, !1)) : (a.onload = createjs.proxy(this._handleLoad, this), a.onreadyy7change =
            createjs.proxy(this._handleReadyStateChange, this));
        var c = this.buildPath(b.src, this._basePath, b.values);
        switch (b.type) {
            case createjs.LoadQueue.CSS:
                a.href = c;
                break;
            case createjs.LoadQueue.SVG:
                a.data = c;
                break;
            default:
                a.src = c
        }
        if (b.type == createjs.LoadQueue.JSONP) {
            if (null == b.callback) throw Error("callback is required for loading JSONP requests.");
            if (null != window[b.callback]) throw Error('JSONP callback "' + b.callback + '" already exists on window. You need to specify a different callback. Or re-name the current one.');
            window[b.callback] = createjs.proxy(this._handleJSONPLoad, this)
        }
        b.type != createjs.LoadQueue.SVG && b.type != createjs.LoadQueue.JSONP && b.type != createjs.LoadQueue.JSON && b.type != createjs.LoadQueue.JAVASCRIPT && b.type != createjs.LoadQueue.CSS || (this._startTagVisibility = a.style.visibility, a.style.visibility = "hidden", (document.body || document.getElementsByTagName("body")[0]).appendChild(a));
        null != a.load && a.load()
    };
    a._handleJSONPLoad = function(b) {
        this._jsonResult = b
    };
    a._handleTimeout = function() {
        this._clean();
        var b =
            new createjs.Event("error");
        b.text = "PRELOAD_TIMEOUT";
        this._sendError(b)
    };
    a._handleStalled = function() {};
    a._handleError = function() {
        this._clean();
        var b = new createjs.Event("error");
        this._sendError(b)
    };
    a._handleReadyStateChange = function() {
        clearTimeout(this._loadTimeout);
        var b = this.getItem().tag;
        "loaded" != b.readyState && "complete" != b.readyState || this._handleLoad()
    };
    a._handleLoad = function() {
        if (!this._isCanceled()) {
            var b = this.getItem(),
                a = b.tag;
            if (!(this.loaded || this.isAudio && 4 !== a.readyState)) {
                switch (this.loaded = !0, b.type) {
                    case createjs.LoadQueue.SVG:
                    case createjs.LoadQueue.JSONP:
                        a.style.visibility = this._startTagVisibility, (document.body || document.getElementsByTagName("body")[0]).removeChild(a)
                }
                this._clean();
                this._sendComplete()
            }
        }
    };
    a._clean = function() {
        clearTimeout(this._loadTimeout);
        var b = this.getItem().tag;
        b.onload = null;
        b.removeEventListener && b.removeEventListener("canplaythrough", this._tagCompleteProxy, !1);
        b.onstalled = null;
        b.onprogress = null;
        b.onerror = null;
        b.parentNode && b.parentNode.removeChild(b);
        b = this.getItem();
        b.type == createjs.LoadQueue.JSONP && (window[b.callback] = null)
    };
    a.toString = function() {
        return "[PreloadJS TagLoader]"
    };
    createjs.TagLoader = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b, a) {
            this.init(b, a)
        },
        a = c.prototype = new createjs.AbstractLoader;
    a._request = null;
    a._loadTimeout = null;
    a._xhrLevel = 1;
    a._response = null;
    a._rawResponse = null;
    a.init = function(b, a) {
        this._item = b;
        this._basePath = a;
        !this._createXHR(b)
    };
    a.getResult = function(b) {
        return b && this._rawResponse ? this._rawResponse : this._response
    };
    a.cancel = function() {
        this.canceled = !0;
        this._clean();
        this._request.abort()
    };
    a.load = function() {
        if (null == this._request) return this._handleError(), void 0;
        this._request.onloadstart =
            createjs.proxy(this._handleLoadStart, this);
        this._request.onprogress = createjs.proxy(this._handleProgress, this);
        this._request.onabort = createjs.proxy(this._handleAbort, this);
        this._request.onerror = createjs.proxy(this._handleError, this);
        this._request.ontimeout = createjs.proxy(this._handleTimeout, this);
        1 == this._xhrLevel && (this._loadTimeout = setTimeout(createjs.proxy(this._handleTimeout, this), createjs.LoadQueue.LOAD_TIMEOUT));
        this._request.onload = createjs.proxy(this._handleLoad, this);
        this._request.onreadyy7change =
            createjs.proxy(this._handleReadyStateChange, this);
        try {
            this._item.values && this._item.method != createjs.LoadQueue.GET ? this._item.method == createjs.LoadQueue.POST && this._request.send(this._formatQueryString(this._item.values)) : this._request.send()
        } catch (b) {
            var a = new createjs.Event("error");
            a.error = b;
            this._sendError(a)
        }
    };
    a.getAllResponseHeaders = function() {
        return this._request.getAllResponseHeaders instanceof Function ? this._request.getAllResponseHeaders() : null
    };
    a.getResponseHeader = function(b) {
        return this._request.getResponseHeader instanceof
        Function ? this._request.getResponseHeader(b) : null
    };
    a._handleProgress = function(b) {
        if (b && !(0 < b.loaded && 0 == b.total)) {
            var a = new createjs.Event("progress");
            a.loaded = b.loaded;
            a.total = b.total;
            this._sendProgress(a)
        }
    };
    a._handleLoadStart = function() {
        clearTimeout(this._loadTimeout);
        this._sendLoadStart()
    };
    a._handleAbort = function(b) {
        this._clean();
        b = new createjs.Event("error");
        b.text = "XHR_ABORTED";
        this._sendError(b)
    };
    a._handleError = function() {
        this._clean();
        var b = new createjs.Event("error");
        this._sendError(b)
    };
    a._handleReadyStateChange =
        function() {
            4 == this._request.readyState && this._handleLoad()
        };
    a._handleLoad = function() {
        if (!this.loaded) {
            if (this.loaded = !0, !this._checkError()) return this._handleError(), void 0;
            this._response = this._getResponse();
            this._clean();
            this._generateTag() && this._sendComplete()
        }
    };
    a._handleTimeout = function(b) {
        this._clean();
        (new createjs.Event("error")).text = "PRELOAD_TIMEOUT";
        this._sendError(b)
    };
    a._checkError = function() {
        switch (parseInt(this._request.status)) {
            case 404:
            case 0:
                return !1
        }
        return !0
    };
    a._getResponse = function() {
        if (null !=
            this._response) return this._response;
        if (null != this._request.response) return this._request.response;
        try {
            if (null != this._request.responseText) return this._request.responseText
        } catch (b) {}
        try {
            if (null != this._request.responseXML) return this._request.responseXML
        } catch (a) {}
        return null
    };
    a._createXHR = function(b) {
        var a = document.createElement("a");
        a.href = this.buildPath(b.src, this._basePath);
        var c = document.createElement("a");
        c.href = location.href;
        a = "" != a.hostname && (a.port != c.port || a.protocol != c.protocol || a.hostname !=
            c.hostname);
        c = null;
        if (a && window.XDomainRequest) c = new XDomainRequest;
        else if (window.XMLHttpRequest) c = new XMLHttpRequest;
        else try {
            c = new ActiveXObject("Msxml2.XMLHTTP.6.0")
        } catch (e) {
            try {
                c = new ActiveXObject("Msxml2.XMLHTTP.3.0")
            } catch (f) {
                try {
                    c = new ActiveXObject("Msxml2.XMLHTTP")
                } catch (g) {
                    return !1
                }
            }
        }
        b.type == createjs.LoadQueue.TEXT && c.overrideMimeType && c.overrideMimeType("text/plain; charset=x-user-defined");
        this._xhrLevel = "string" == typeof c.responseType ? 2 : 1;
        var k = null;
        return k = b.method == createjs.LoadQueue.GET ?
            this.buildPath(b.src, this._basePath, b.values) : this.buildPath(b.src, this._basePath), c.open(b.method || createjs.LoadQueue.GET, k, !0), a && c instanceof XMLHttpRequest && 1 == this._xhrLevel && c.setRequestHeader("Origin", location.origin), b.values && b.method == createjs.LoadQueue.POST && c.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), createjs.LoadQueue.isBinary(b.type) && (c.responseType = "arraybuffer"), this._request = c, !0
    };
    a._clean = function() {
        clearTimeout(this._loadTimeout);
        var b = this._request;
        b.onloadstart = null;
        b.onprogress = null;
        b.onabort = null;
        b.onerror = null;
        b.onload = null;
        b.ontimeout = null;
        b.onloadend = null;
        b.onreadyy7change = null
    };
    a._generateTag = function() {
        var b = this._item.tag;
        switch (this._item.type) {
            case createjs.LoadQueue.IMAGE:
                return b.onload = createjs.proxy(this._handleTagReady, this), b.src = this.buildPath(this._item.src, this._basePath, this._item.values), this._rawResponse = this._response, this._response = b, !1;
            case createjs.LoadQueue.JAVASCRIPT:
                return b = document.createElement("script"), b.text =
                    this._response, this._rawResponse = this._response, this._response = b, !0;
            case createjs.LoadQueue.CSS:
                if (document.getElementsByTagName("head")[0].appendChild(b), b.styleSheet) b.styleSheet.cssText = this._response;
                else {
                    var a = document.createTextNode(this._response);
                    b.appendChild(a)
                }
                return this._rawResponse = this._response, this._response = b, !0;
            case createjs.LoadQueue.XML:
                return a = this._parseXML(this._response, "text/xml"), this._response = a, !0;
            case createjs.LoadQueue.SVG:
                return a = this._parseXML(this._response, "image/svg+xml"),
                    this._rawResponse = this._response, null != a.documentElement ? (b.appendChild(a.documentElement), this._response = b) : this._response = a, !0;
            case createjs.LoadQueue.JSON:
                b = {};
                try {
                    b = JSON.parse(this._response)
                } catch (c) {
                    b = c
                }
                return this._rawResponse = this._response, this._response = b, !0
        }
        return !0
    };
    a._parseXML = function(b, a) {
        var c = null;
        window.DOMParser ? c = (new DOMParser).parseFromString(b, a) : (c = new ActiveXObject("Microsoft.XMLDOM"), c.async = !1, c.loadXML(b));
        return c
    };
    a._handleTagReady = function() {
        this._sendComplete()
    };
    a.toString =
        function() {
            return "[PreloadJS XHRLoader]"
        };
    createjs.XHRLoader = c
})();
"object" != typeof JSON && (JSON = {});
(function() {
    function c(b) {
        return 10 > b ? "0" + b : b
    }

    function a(b) {
        return d.lastIndex = 0, d.test(b) ? '"' + b.replace(d, function(b) {
            var a = g[b];
            return "string" == typeof a ? a : "\\u" + ("0000" + b.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + b + '"'
    }

    function b(c, d) {
        var g, h, t, x, y, n = e,
            C = d[c];
        switch (C && "object" == typeof C && "function" == typeof C.toJSON && (C = C.toJSON(c)), "function" == typeof k && (C = k.call(d, c, C)), typeof C) {
            case "string":
                return a(C);
            case "number":
                return isFinite(C) ? String(C) : "null";
            case "boolean":
            case "null":
                return String(C);
            case "object":
                if (!C) return "null";
                if (e += f, y = [], "[object Array]" === Object.prototype.toString.apply(C)) {
                    x = C.length;
                    for (g = 0; x > g; g += 1) y[g] = b(g, C) || "null";
                    return t = 0 === y.length ? "[]" : e ? "[\n" + e + y.join(",\n" + e) + "\n" + n + "]" : "[" + y.join(",") + "]", e = n, t
                }
                if (k && "object" == typeof k)
                    for (x = k.length, g = 0; x > g; g += 1) "string" == typeof k[g] && (h = k[g], t = b(h, C), t && y.push(a(h) + (e ? ": " : ":") + t));
                else
                    for (h in C) Object.prototype.hasOwnProperty.call(C, h) && (t = b(h, C), t && y.push(a(h) + (e ? ": " : ":") + t));
                return t = 0 === y.length ? "{}" : e ? "{\n" + e +
                    y.join(",\n" + e) + "\n" + n + "}" : "{" + y.join(",") + "}", e = n, t
        }
    }
    "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + c(this.getUTCMonth() + 1) + "-" + c(this.getUTCDate()) + "T" + c(this.getUTCHours()) + ":" + c(this.getUTCMinutes()) + ":" + c(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf()
    });
    var h = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        d = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        e, f, g = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        },
        k;
    "function" != typeof JSON.stringify && (JSON.stringify = function(a, c, d) {
        var g;
        if (e = "", f = "", "number" == typeof d)
            for (g = 0; d > g; g += 1) f += " ";
        else "string" == typeof d && (f = d);
        if (k = c, c && "function" != typeof c && ("object" != typeof c || "number" != typeof c.length)) throw Error("JSON.stringify");
        return b("", {
            "": a
        })
    });
    "function" != typeof JSON.parse && (JSON.parse = function(b, a) {
        function c(b, d) {
            var e, g, h = b[d];
            if (h && "object" == typeof h)
                for (e in h) Object.prototype.hasOwnProperty.call(h, e) && (g = c(h, e), void 0 !== g ? h[e] = g : delete h[e]);
            return a.call(b, d, h)
        }
        var d;
        if (b = String(b), h.lastIndex = 0, h.test(b) && (b = b.replace(h, function(b) {
                return "\\u" + ("0000" + b.charCodeAt(0).toString(16)).slice(-4)
            })), /^[\],:{}\s]*$/.test(b.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return d = eval("(" + b + ")"), "function" == typeof a ? c({
            "": d
        }, "") : d;
        throw new SyntaxError("JSON.parse");
    })
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b, a, c) {
            this.initialize(b, a, c)
        },
        a = c.prototype;
    a.type = null;
    a.target = null;
    a.currentTarget = null;
    a.eventPhase = 0;
    a.bubbles = !1;
    a.cancelable = !1;
    a.timeStamp = 0;
    a.defaultPrevented = !1;
    a.propagationStopped = !1;
    a.immediatePropagationStopped = !1;
    a.removed = !1;
    a.initialize = function(b, a, c) {
        this.type = b;
        this.bubbles = a;
        this.cancelable = c;
        this.timeStamp = (new Date).getTime()
    };
    a.preventDefault = function() {
        this.defaultPrevented = !0
    };
    a.stopPropagation = function() {
        this.propagationStopped = !0
    };
    a.stopImmediatePropagation =
        function() {
            this.immediatePropagationStopped = this.propagationStopped = !0
        };
    a.remove = function() {
        this.removed = !0
    };
    a.clone = function() {
        return new c(this.type, this.bubbles, this.cancelable)
    };
    a.toString = function() {
        return "[Event (type=" + this.type + ")]"
    };
    createjs.Event = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function() {
            this.initialize()
        },
        a = c.prototype;
    c.initialize = function(b) {
        b.addEventListener = a.addEventListener;
        b.on = a.on;
        b.removeEventListener = b.off = a.removeEventListener;
        b.removeAllEventListeners = a.removeAllEventListeners;
        b.hasEventListener = a.hasEventListener;
        b.dispatchEvent = a.dispatchEvent;
        b._dispatchEvent = a._dispatchEvent
    };
    a._listeners = null;
    a._captureListeners = null;
    a.initialize = function() {};
    a.addEventListener = function(b, a, c) {
        var e;
        e = c ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
        var f = e[b];
        return f && this.removeEventListener(b, a, c), f = e[b], f ? f.push(a) : e[b] = [a], a
    };
    a.on = function(b, a, c, e, f, g) {
        return a.handleEvent && (c = c || a, a = a.handleEvent), c = c || this, this.addEventListener(b, function(b) {
            a.call(c, b, f);
            e && b.remove()
        }, g)
    };
    a.removeEventListener = function(b, a, c) {
        if (c = c ? this._captureListeners : this._listeners) {
            var e = c[b];
            if (e)
                for (var f = 0, g = e.length; g > f; f++)
                    if (e[f] == a) {
                        1 == g ? delete c[b] : e.splice(f, 1);
                        break
                    }
        }
    };
    a.off = a.removeEventListener;
    a.removeAllEventListeners =
        function(b) {
            b ? (this._listeners && delete this._listeners[b], this._captureListeners && delete this._captureListeners[b]) : this._listeners = this._captureListeners = null
        };
    a.dispatchEvent = function(b, a) {
        if ("string" == typeof b) {
            var c = this._listeners;
            if (!c || !c[b]) return !1;
            b = new createjs.Event(b)
        }
        if (b.target = a || this, b.bubbles && this.parent) {
            for (var e = this, c = [e]; e.parent;) c.push(e = e.parent);
            for (var f = c.length, e = f - 1; 0 <= e && !b.propagationStopped; e--) c[e]._dispatchEvent(b, 1 + (0 == e));
            for (e = 1; f > e && !b.propagationStopped; e++) c[e]._dispatchEvent(b,
                3)
        } else this._dispatchEvent(b, 2);
        return b.defaultPrevented
    };
    a.hasEventListener = function(b) {
        var a = this._listeners,
            c = this._captureListeners;
        return !!(a && a[b] || c && c[b])
    };
    a.toString = function() {
        return "[EventDispatcher]"
    };
    a._dispatchEvent = function(b, a) {
        var c, e = 1 == a ? this._captureListeners : this._listeners;
        if (b && e && (e = e[b.type]) && (c = e.length)) {
            b.currentTarget = this;
            b.eventPhase = a;
            b.removed = !1;
            for (var e = e.slice(), f = 0; c > f && !b.immediatePropagationStopped; f++) {
                var g = e[f];
                g.handleEvent ? g.handleEvent(b) : g(b);
                b.removed &&
                    (this.off(b.type, g, 1 == a), b.removed = !1)
            }
        }
    };
    createjs.EventDispatcher = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(b, a, c) {
            this.initialize(b, a, c)
        },
        a = c.prototype = new createjs.EventDispatcher;
    c.NONE = 0;
    c.LOOP = 1;
    c.REVERSE = 2;
    c.IGNORE = {};
    c._tweens = [];
    c._plugins = {};
    c.get = function(b, a, d, e) {
        return e && c.removeTweens(b), new c(b, a, d)
    };
    c.tick = function(b, a) {
        for (var d = c._tweens.slice(), e = d.length - 1; 0 <= e; e--) {
            var f = d[e];
            a && !f.ignoreGlobalPause || f._paused || f.tick(f._useTicks ? 1 : b)
        }
    };
    c.handleEvent = function(b) {
        "tick" == b.type && this.tick(b.delta, b.paused)
    };
    c.removeTweens = function(b) {
        if (b.tweenjs_count) {
            for (var a =
                    c._tweens, d = a.length - 1; 0 <= d; d--) a[d]._target == b && (a[d]._paused = !0, a.splice(d, 1));
            b.tweenjs_count = 0
        }
    };
    c.removeAllTweens = function() {
        for (var b = c._tweens, a = 0, d = b.length; d > a; a++) {
            var e = b[a];
            e.paused = !0;
            e.target.tweenjs_count = 0
        }
        b.length = 0
    };
    c.hasActiveTweens = function(b) {
        return b ? b.tweenjs_count : c._tweens && !!c._tweens.length
    };
    c.installPlugin = function(b, a) {
        var d = b.priority;
        null == d && (b.priority = d = 0);
        for (var e = 0, f = a.length, g = c._plugins; f > e; e++) {
            var k = a[e];
            if (g[k]) {
                for (var m = g[k], q = 0, w = m.length; w > q && !(d < m[q].priority); q++);
                g[k].splice(q, 0, b)
            } else g[k] = [b]
        }
    };
    c._register = function(b, a) {
        var d = b._target,
            e = c._tweens;
        if (a) d && (d.tweenjs_count = d.tweenjs_count ? d.tweenjs_count + 1 : 1), e.push(b), !c._inited && createjs.Ticker && (createjs.Ticker.addEventListener("tick", c), c._inited = !0);
        else
            for (d && d.tweenjs_count--, d = e.length; d--;)
                if (e[d] == b) return e.splice(d, 1), void 0
    };
    a.ignoreGlobalPause = !1;
    a.loop = !1;
    a.duration = 0;
    a.pluginData = null;
    a.target = null;
    a.position = null;
    a.passive = !1;
    a._paused = !1;
    a._curQueueProps = null;
    a._initQueueProps = null;
    a._steps =
        null;
    a._actions = null;
    a._prevPosition = 0;
    a._stepPosition = 0;
    a._prevPos = -1;
    a._target = null;
    a._useTicks = !1;
    a._inited = !1;
    a.initialize = function(b, a, d) {
        this.target = this._target = b;
        a && (this._useTicks = a.useTicks, this.ignoreGlobalPause = a.ignoreGlobalPause, this.loop = a.loop, a.onChange && this.addEventListener("change", a.onChange), a.override && c.removeTweens(b));
        this.pluginData = d || {};
        this._curQueueProps = {};
        this._initQueueProps = {};
        this._steps = [];
        this._actions = [];
        a && a.paused ? this._paused = !0 : c._register(this, !0);
        a && null !=
            a.position && this.setPosition(a.position, c.NONE)
    };
    a.wait = function(b, a) {
        if (null == b || 0 >= b) return this;
        var c = this._cloneProps(this._curQueueProps);
        return this._addStep({
            d: b,
            p0: c,
            e: this._linearEase,
            p1: c,
            v: a
        })
    };
    a.to = function(b, a, c) {
        return (isNaN(a) || 0 > a) && (a = 0), this._addStep({
            d: a || 0,
            p0: this._cloneProps(this._curQueueProps),
            e: c,
            p1: this._cloneProps(this._appendQueueProps(b))
        })
    };
    a.call = function(b, a, c) {
        return this._addAction({
            f: b,
            p: a ? a : [this],
            o: c ? c : this._target
        })
    };
    a.set = function(b, a) {
        return this._addAction({
            f: this._set,
            o: this,
            p: [b, a ? a : this._target]
        })
    };
    a.play = function(b) {
        return b || (b = this), this.call(b.setPaused, [!1], b)
    };
    a.pause = function(b) {
        return b || (b = this), this.call(b.setPaused, [!0], b)
    };
    a.setPosition = function(b, a) {
        0 > b && (b = 0);
        null == a && (a = 1);
        var c = b,
            e = !1;
        if (c >= this.duration && (this.loop ? c %= this.duration : (c = this.duration, e = !0)), c == this._prevPos) return e;
        var f = this._prevPos;
        if (this.position = this._prevPos = c, this._prevPosition = b, this._target)
            if (e) this._updateTargetProps(null, 1);
            else if (0 < this._steps.length) {
            for (var g =
                    0, k = this._steps.length; k > g && !(this._steps[g].t > c); g++);
            g = this._steps[g - 1];
            this._updateTargetProps(g, (this._stepPosition = c - g.t) / g.d)
        }
        return 0 != a && 0 < this._actions.length && (this._useTicks ? this._runActions(c, c) : 1 == a && f > c ? (f != this.duration && this._runActions(f, this.duration), this._runActions(0, c, !0)) : this._runActions(f, c)), e && this.setPaused(!0), this.dispatchEvent("change"), e
    };
    a.tick = function(b) {
        this._paused || this.setPosition(this._prevPosition + b)
    };
    a.setPaused = function(b) {
        return this._paused = !!b, c._register(this, !b), this
    };
    a.w = a.wait;
    a.t = a.to;
    a.c = a.call;
    a.s = a.set;
    a.toString = function() {
        return "[Tween]"
    };
    a.clone = function() {
        throw "Tween can not be cloned.";
    };
    a._updateTargetProps = function(b, a) {
        var d, e, f, g;
        if (b || 1 != a) {
            if (this.passive = !!b.v, this.passive) return;
            b.e && (a = b.e(a, 0, 1, 1));
            d = b.p0;
            e = b.p1
        } else this.passive = !1, d = e = this._curQueueProps;
        for (var k in this._initQueueProps) {
            null == (f = d[k]) && (d[k] = f = this._initQueueProps[k]);
            null == (g = e[k]) && (e[k] = g = f);
            f = f == g || 0 == a || 1 == a || "number" != typeof f ? 1 == a ? g : f : f + (g - f) * a;
            var m = !1;
            if (g = c._plugins[k])
                for (var q = 0, w = g.length; w > q; q++) {
                    var u = g[q].tween(this, k, f, d, e, a, !!b && d == e, !b);
                    u == c.IGNORE ? m = !0 : f = u
                }
            m || (this._target[k] = f)
        }
    };
    a._runActions = function(a, c, d) {
        var e = a,
            f = c,
            g = -1,
            k = this._actions.length,
            m = 1;
        for (a > c && (e = c, f = a, g = k, k = m = -1);
            (g += m) != k;) {
            c = this._actions[g];
            var q = c.t;
            (q == f || q > e && f > q || d && q == a) && c.f.apply(c.o, c.p)
        }
    };
    a._appendQueueProps = function(a) {
        var h, d, e, f, g, k;
        for (k in a)
            if (void 0 === this._initQueueProps[k]) {
                if (d = this._target[k], h = c._plugins[k])
                    for (e = 0, f = h.length; f > e; e++) d = h[e].init(this,
                        k, d);
                this._initQueueProps[k] = this._curQueueProps[k] = void 0 === d ? null : d
            }
        for (k in a) {
            if (d = this._curQueueProps[k], h = c._plugins[k])
                for (g = g || {}, e = 0, f = h.length; f > e; e++) h[e].step && h[e].step(this, k, d, a[k], g);
            this._curQueueProps[k] = a[k]
        }
        return g && this._appendQueueProps(g), this._curQueueProps
    };
    a._cloneProps = function(a) {
        var c = {},
            d;
        for (d in a) c[d] = a[d];
        return c
    };
    a._addStep = function(a) {
        return 0 < a.d && (this._steps.push(a), a.t = this.duration, this.duration += a.d), this
    };
    a._addAction = function(a) {
        return a.t = this.duration,
            this._actions.push(a), this
    };
    a._set = function(a, c) {
        for (var d in a) c[d] = a[d]
    };
    createjs.Tween = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(a, c, d) {
            this.initialize(a, c, d)
        },
        a = c.prototype = new createjs.EventDispatcher;
    a.ignoreGlobalPause = !1;
    a.duration = 0;
    a.loop = !1;
    a.position = null;
    a._paused = !1;
    a._tweens = null;
    a._labels = null;
    a._labelList = null;
    a._prevPosition = 0;
    a._prevPos = -1;
    a._useTicks = !1;
    a.initialize = function(a, c, d) {
        this._tweens = [];
        d && (this._useTicks = d.useTicks, this.loop = d.loop, this.ignoreGlobalPause = d.ignoreGlobalPause, d.onChange && this.addEventListener("change", d.onChange));
        a && this.addTween.apply(this, a);
        this.setLabels(c);
        d && d.paused ? this._paused = !0 : createjs.Tween._register(this, !0);
        d && null != d.position && this.setPosition(d.position, createjs.Tween.NONE)
    };
    a.addTween = function(a) {
        var c = arguments.length;
        if (1 < c) {
            for (var d = 0; c > d; d++) this.addTween(arguments[d]);
            return arguments[0]
        }
        return 0 == c ? null : (this.removeTween(a), this._tweens.push(a), a.setPaused(!0), a._paused = !1, a._useTicks = this._useTicks, a.duration > this.duration && (this.duration = a.duration), 0 <= this._prevPos && a.setPosition(this._prevPos, createjs.Tween.NONE), a)
    };
    a.removeTween =
        function(a) {
            var c = arguments.length;
            if (1 < c) {
                for (var d = !0, e = 0; c > e; e++) d = d && this.removeTween(arguments[e]);
                return d
            }
            if (0 == c) return !1;
            c = this._tweens;
            for (e = c.length; e--;)
                if (c[e] == a) return c.splice(e, 1), a.duration >= this.duration && this.updateDuration(), !0;
            return !1
        };
    a.addLabel = function(a, c) {
        this._labels[a] = c;
        var d = this._labelList;
        if (d) {
            for (var e = 0, f = d.length; f > e && !(c < d[e].position); e++);
            d.splice(e, 0, {
                label: a,
                position: c
            })
        }
    };
    a.setLabels = function(a) {
        this._labels = a ? a : {}
    };
    a.getLabels = function() {
        var a = this._labelList;
        if (!a) {
            var a = this._labelList = [],
                c = this._labels,
                d;
            for (d in c) a.push({
                label: d,
                position: c[d]
            });
            a.sort(function(a, b) {
                return a.position - b.position
            })
        }
        return a
    };
    a.getCurrentLabel = function() {
        var a = this.getLabels(),
            c = this.position,
            d = a.length;
        if (d) {
            for (var e = 0; d > e && !(c < a[e].position); e++);
            return 0 == e ? null : a[e - 1].label
        }
        return null
    };
    a.gotoAndPlay = function(a) {
        this.setPaused(!1);
        this._goto(a)
    };
    a.gotoAndStop = function(a) {
        this.setPaused(!0);
        this._goto(a)
    };
    a.setPosition = function(a, c) {
        0 > a && (a = 0);
        var d = this.loop ? a % this.duration :
            a,
            e = !this.loop && a >= this.duration;
        if (d == this._prevPos) return e;
        this._prevPosition = a;
        this.position = this._prevPos = d;
        for (var f = 0, g = this._tweens.length; g > f; f++)
            if (this._tweens[f].setPosition(d, c), d != this._prevPos) return !1;
        return e && this.setPaused(!0), this.dispatchEvent("change"), e
    };
    a.setPaused = function(a) {
        this._paused = !!a;
        createjs.Tween._register(this, !a)
    };
    a.updateDuration = function() {
        for (var a = this.duration = 0, c = this._tweens.length; c > a; a++) {
            var d = this._tweens[a];
            d.duration > this.duration && (this.duration =
                d.duration)
        }
    };
    a.tick = function(a) {
        this.setPosition(this._prevPosition + a)
    };
    a.resolve = function(a) {
        var c = parseFloat(a);
        return isNaN(c) && (c = this._labels[a]), c
    };
    a.toString = function() {
        return "[Timeline]"
    };
    a.clone = function() {
        throw "Timeline can not be cloned.";
    };
    a._goto = function(a) {
        a = this.resolve(a);
        null != a && this.setPosition(a)
    };
    createjs.Timeline = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function() {
        throw "Ease cannot be instantiated.";
    };
    c.linear = function(a) {
        return a
    };
    c.none = c.linear;
    c.get = function(a) {
        return -1 > a && (a = -1), 1 < a && (a = 1),
            function(b) {
                return 0 == a ? b : 0 > a ? b * (b * -a + 1 + a) : b * ((2 - b) * a + (1 - a))
            }
    };
    c.getPowIn = function(a) {
        return function(b) {
            return Math.pow(b, a)
        }
    };
    c.getPowOut = function(a) {
        return function(b) {
            return 1 - Math.pow(1 - b, a)
        }
    };
    c.getPowInOut = function(a) {
        return function(b) {
            return 1 > (b *= 2) ? 0.5 * Math.pow(b, a) : 1 - 0.5 * Math.abs(Math.pow(2 - b, a))
        }
    };
    c.quadIn = c.getPowIn(2);
    c.quadOut =
        c.getPowOut(2);
    c.quadInOut = c.getPowInOut(2);
    c.cubicIn = c.getPowIn(3);
    c.cubicOut = c.getPowOut(3);
    c.cubicInOut = c.getPowInOut(3);
    c.quartIn = c.getPowIn(4);
    c.quartOut = c.getPowOut(4);
    c.quartInOut = c.getPowInOut(4);
    c.quintIn = c.getPowIn(5);
    c.quintOut = c.getPowOut(5);
    c.quintInOut = c.getPowInOut(5);
    c.sineIn = function(a) {
        return 1 - Math.cos(a * Math.PI / 2)
    };
    c.sineOut = function(a) {
        return Math.sin(a * Math.PI / 2)
    };
    c.sineInOut = function(a) {
        return -0.5 * (Math.cos(Math.PI * a) - 1)
    };
    c.getBackIn = function(a) {
        return function(b) {
            return b *
                b * ((a + 1) * b - a)
        }
    };
    c.backIn = c.getBackIn(1.7);
    c.getBackOut = function(a) {
        return function(b) {
            return --b * b * ((a + 1) * b + a) + 1
        }
    };
    c.backOut = c.getBackOut(1.7);
    c.getBackInOut = function(a) {
        return a *= 1.525,
            function(b) {
                return 1 > (b *= 2) ? 0.5 * b * b * ((a + 1) * b - a) : 0.5 * ((b -= 2) * b * ((a + 1) * b + a) + 2)
            }
    };
    c.backInOut = c.getBackInOut(1.7);
    c.circIn = function(a) {
        return -(Math.sqrt(1 - a * a) - 1)
    };
    c.circOut = function(a) {
        return Math.sqrt(1 - --a * a)
    };
    c.circInOut = function(a) {
        return 1 > (a *= 2) ? -0.5 * (Math.sqrt(1 - a * a) - 1) : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
    };
    c.bounceIn =
        function(a) {
            return 1 - c.bounceOut(1 - a)
        };
    c.bounceOut = function(a) {
        return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375
    };
    c.bounceInOut = function(a) {
        return 0.5 > a ? 0.5 * c.bounceIn(2 * a) : 0.5 * c.bounceOut(2 * a - 1) + 0.5
    };
    c.getElasticIn = function(a, b) {
        var c = 2 * Math.PI;
        return function(d) {
            if (0 == d || 1 == d) return d;
            var e = b / c * Math.asin(1 / a);
            return -(a * Math.pow(2, 10 * (d -= 1)) * Math.sin((d - e) * c / b))
        }
    };
    c.elasticIn = c.getElasticIn(1, 0.3);
    c.getElasticOut =
        function(a, b) {
            var c = 2 * Math.PI;
            return function(d) {
                if (0 == d || 1 == d) return d;
                var e = b / c * Math.asin(1 / a);
                return a * Math.pow(2, -10 * d) * Math.sin((d - e) * c / b) + 1
            }
        };
    c.elasticOut = c.getElasticOut(1, 0.3);
    c.getElasticInOut = function(a, b) {
        var c = 2 * Math.PI;
        return function(d) {
            var e = b / c * Math.asin(1 / a);
            return 1 > (d *= 2) ? -0.5 * a * Math.pow(2, 10 * (d -= 1)) * Math.sin((d - e) * c / b) : 0.5 * a * Math.pow(2, -10 * (d -= 1)) * Math.sin((d - e) * c / b) + 1
        }
    };
    c.elasticInOut = c.getElasticInOut(1, 0.3 * 1.5);
    createjs.Ease = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function() {
        throw "MotionGuidePlugin cannot be instantiated.";
    };
    c.priority = 0;
    c._rotOffS;
    c._rotOffE;
    c._rotNormS;
    c._rotNormE;
    c.install = function() {
        return createjs.Tween.installPlugin(c, ["guide", "x", "y", "rotation"]), createjs.Tween.IGNORE
    };
    c.init = function(a, b, c) {
        var d = a.target;
        return d.hasOwnProperty("x") || (d.x = 0), d.hasOwnProperty("y") || (d.y = 0), d.hasOwnProperty("rotation") || (d.rotation = 0), "rotation" == b && (a.__needsRot = !0), "guide" == b ? null : c
    };
    c.step = function(a, b, h, d, e) {
        if ("rotation" == b && (a.__rotGlobalS =
                h, a.__rotGlobalE = d, c.testRotData(a, e)), "guide" != b) return d;
        var f;
        d.hasOwnProperty("path") || (d.path = []);
        b = d.path;
        if (d.hasOwnProperty("end") || (d.end = 1), d.hasOwnProperty("start") || (d.start = h && h.hasOwnProperty("end") && h.path === b ? h.end : 0), d.hasOwnProperty("_segments") && d._length) return d;
        h = b.length;
        if (!(6 <= h && 0 == (h - 2) % 4)) throw "invalid 'path' data, please see documentation for valid paths";
        d._segments = [];
        d._length = 0;
        for (var g = 2; h > g; g += 4) {
            for (var k, m, q = b[g - 2], w = b[g - 1], u = b[g + 0], t = b[g + 1], x = b[g + 2], y = b[g + 3],
                    n = q, C = w, B = 0, H = [], E = 1; 10 >= E; E++) {
                m = E / 10;
                var G = 1 - m;
                k = G * G * q + 2 * G * m * u + m * m * x;
                m = G * G * w + 2 * G * m * t + m * m * y;
                B += H[H.push(Math.sqrt((f = k - n) * f + (f = m - C) * f)) - 1];
                n = k;
                C = m
            }
            d._segments.push(B);
            d._segments.push(H);
            d._length += B
        }
        f = d.orient;
        d.orient = !0;
        b = {};
        return c.calc(d, d.start, b), a.__rotPathS = Number(b.rotation.toFixed(5)), c.calc(d, d.end, b), a.__rotPathE = Number(b.rotation.toFixed(5)), d.orient = !1, c.calc(d, d.end, e), d.orient = f, d.orient ? (a.__guideData = d, c.testRotData(a, e), d) : d
    };
    c.testRotData = function(a, b) {
        if (void 0 === a.__rotGlobalS ||
            void 0 === a.__rotGlobalE) {
            if (a.__needsRot) return;
            a.__rotGlobalS = a.__rotGlobalE = void 0 !== a._curQueueProps.rotation ? a._curQueueProps.rotation : b.rotation = a.target.rotation || 0
        }
        if (void 0 !== a.__guideData) {
            var c = a.__guideData,
                d = a.__rotGlobalE - a.__rotGlobalS,
                e = a.__rotPathE - a.__rotPathS,
                f = d - e;
            if ("auto" == c.orient) 180 < f ? f -= 360 : -180 > f && (f += 360);
            else if ("cw" == c.orient) {
                for (; 0 > f;) f += 360;
                0 == f && 0 < d && 180 != d && (f += 360)
            } else if ("ccw" == c.orient) {
                for (f = d - (180 < e ? 360 - e : e); 0 < f;) f -= 360;
                0 == f && 0 > d && -180 != d && (f -= 360)
            }
            c.rotDelta =
                f;
            c.rotOffS = a.__rotGlobalS - a.__rotPathS;
            a.__rotGlobalS = a.__rotGlobalE = a.__guideData = a.__needsRot = void 0
        }
    };
    c.tween = function(a, b, h, d, e, f, g) {
        e = e.guide;
        if (void 0 == e || e === d.guide) return h;
        if (e.lastRatio != f) {
            switch (c.calc(e, (e.end - e.start) * (g ? e.end : f) + e.start, a.target), e.orient) {
                case "cw":
                case "ccw":
                case "auto":
                    a.target.rotation += e.rotOffS + e.rotDelta * f;
                    break;
                default:
                    a.target.rotation += e.rotOffS
            }
            e.lastRatio = f
        }
        return "rotation" != b || e.orient && "false" != e.orient ? a.target[b] : h
    };
    c.calc = function(a, b, h) {
        void 0 ==
            a._segments && c.validate(a);
        void 0 == h && (h = {
            x: 0,
            y: 0,
            rotation: 0
        });
        var d = a._segments,
            e = a.path,
            f = a._length * b,
            g = d.length - 2;
        for (b = 0; f > d[b] && g > b;) f -= d[b], b += 2;
        for (var d = d[b + 1], k = 0, g = d.length - 1; f > d[k] && g > k;) f -= d[k], k++;
        f = k / ++g + f / (g * d[k]);
        b = 2 * b + 2;
        g = 1 - f;
        return h.x = g * g * e[b - 2] + 2 * g * f * e[b + 0] + f * f * e[b + 2], h.y = g * g * e[b - 1] + 2 * g * f * e[b + 1] + f * f * e[b + 3], a.orient && (h.rotation = 57.2957795 * Math.atan2((e[b + 1] - e[b - 1]) * g + (e[b + 3] - e[b + 1]) * f, (e[b + 0] - e[b - 2]) * g + (e[b + 2] - e[b + 0]) * f)), h
    };
    createjs.MotionGuidePlugin = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = createjs.TweenJS = createjs.TweenJS || {};
    c.version = "0.5.0";
    c.buildDate = "Wed, 25 Sep 2013 17:09:35 GMT"
})();
this.createjs = this.createjs || {};
(function() {
    var c = createjs.SoundJS = createjs.SoundJS || {};
    c.version = "0.5.0";
    c.buildDate = "Wed, 25 Sep 2013 17:09:35 GMT"
})();
this.createjs = this.createjs || {};
(function() {
    var c = function() {},
        a = c.prototype;
    c.initialize = function(b) {
        b.addEventListener = a.addEventListener;
        b.on = a.on;
        b.removeEventListener = b.off = a.removeEventListener;
        b.removeAllEventListeners = a.removeAllEventListeners;
        b.hasEventListener = a.hasEventListener;
        b.dispatchEvent = a.dispatchEvent;
        b._dispatchEvent = a._dispatchEvent
    };
    a._listeners = null;
    a._captureListeners = null;
    a.initialize = function() {};
    a.addEventListener = function(a, c, d) {
        var e;
        e = d ? this._captureListeners = this._captureListeners || {} : this._listeners =
            this._listeners || {};
        var f = e[a];
        return f && this.removeEventListener(a, c, d), f = e[a], f ? f.push(c) : e[a] = [c], c
    };
    a.on = function(a, c, d, e, f, g) {
        return c.handleEvent && (d = d || c, c = c.handleEvent), d = d || this, this.addEventListener(a, function(a) {
            c.call(d, a, f);
            e && a.remove()
        }, g)
    };
    a.removeEventListener = function(a, c, d) {
        if (d = d ? this._captureListeners : this._listeners) {
            var e = d[a];
            if (e)
                for (var f = 0, g = e.length; g > f; f++)
                    if (e[f] == c) {
                        1 == g ? delete d[a] : e.splice(f, 1);
                        break
                    }
        }
    };
    a.off = a.removeEventListener;
    a.removeAllEventListeners = function(a) {
        a ?
            (this._listeners && delete this._listeners[a], this._captureListeners && delete this._captureListeners[a]) : this._listeners = this._captureListeners = null
    };
    a.dispatchEvent = function(a, c) {
        if ("string" == typeof a) {
            var d = this._listeners;
            if (!d || !d[a]) return !1;
            a = new createjs.Event(a)
        }
        if (a.target = c || this, a.bubbles && this.parent) {
            for (var e = this, d = [e]; e.parent;) d.push(e = e.parent);
            for (var f = d.length, e = f - 1; 0 <= e && !a.propagationStopped; e--) d[e]._dispatchEvent(a, 1 + (0 == e));
            for (e = 1; f > e && !a.propagationStopped; e++) d[e]._dispatchEvent(a,
                3)
        } else this._dispatchEvent(a, 2);
        return a.defaultPrevented
    };
    a.hasEventListener = function(a) {
        var c = this._listeners,
            d = this._captureListeners;
        return !!(c && c[a] || d && d[a])
    };
    a.toString = function() {
        return "[EventDispatcher]"
    };
    a._dispatchEvent = function(a, c) {
        var d, e = 1 == c ? this._captureListeners : this._listeners;
        if (a && e && (e = e[a.type]) && (d = e.length)) {
            a.currentTarget = this;
            a.eventPhase = c;
            a.removed = !1;
            for (var e = e.slice(), f = 0; d > f && !a.immediatePropagationStopped; f++) {
                var g = e[f];
                g.handleEvent ? g.handleEvent(a) : g(a);
                a.removed &&
                    (this.off(a.type, g, 1 == c), a.removed = !1)
            }
        }
    };
    createjs.EventDispatcher = c
})();
this.createjs = this.createjs || {};
(function() {
    var c = function(a, c, d) {
            this.initialize(a, c, d)
        },
        a = c.prototype;
    a.type = null;
    a.target = null;
    a.currentTarget = null;
    a.eventPhase = 0;
    a.bubbles = !1;
    a.cancelable = !1;
    a.timeStamp = 0;
    a.defaultPrevented = !1;
    a.propagationStopped = !1;
    a.immediatePropagationStopped = !1;
    a.removed = !1;
    a.initialize = function(a, c, d) {
        this.type = a;
        this.bubbles = c;
        this.cancelable = d;
        this.timeStamp = (new Date).getTime()
    };
    a.preventDefault = function() {
        this.defaultPrevented = !0
    };
    a.stopPropagation = function() {
        this.propagationStopped = !0
    };
    a.stopImmediatePropagation =
        function() {
            this.immediatePropagationStopped = this.propagationStopped = !0
        };
    a.remove = function() {
        this.removed = !0
    };
    a.clone = function() {
        return new c(this.type, this.bubbles, this.cancelable)
    };
    a.toString = function() {
        return "[Event (type=" + this.type + ")]"
    };
    createjs.Event = c
})();
this.createjs = this.createjs || {};
(function() {
    createjs.indexOf = function(c, a) {
        for (var b = 0, h = c.length; h > b; b++)
            if (a === c[b]) return b;
        return -1
    }
})();
this.createjs = this.createjs || {};
(function() {
    createjs.proxy = function(c, a) {
        var b = Array.prototype.slice.call(arguments, 2);
        return function() {
            return c.apply(a, Array.prototype.slice.call(arguments, 0).concat(b))
        }
    }
})();
this.createjs = this.createjs || {};
(function() {
    function c() {
        throw "Sound cannot be instantiated";
    }

    function a(a, b) {
        this.init(a, b)
    }

    function b() {}
    c.DELIMITER = "|";
    c.AUDIO_TIMEOUT = 8E3;
    c.INTERRUPT_ANY = "any";
    c.INTERRUPT_EARLY = "early";
    c.INTERRUPT_LATE = "late";
    c.INTERRUPT_NONE = "none";
    c.PLAY_INITED = "playInited";
    c.PLAY_SUCCEEDED = "playSucceeded";
    c.PLAY_INTERRUPTED = "playInterrupted";
    c.PLAY_FINISHED = "playFinished";
    c.PLAY_FAILED = "playFailed";
    c.SUPPORTED_EXTENSIONS = "mp3 ogg mpeg wav m4a mp4 aiff wma mid".split(" ");
    c.EXTENSION_MAP = {
        m4a: "mp4"
    };
    c.FILE_PATTERN =
        /^(?:(\w+:)\/{2}(\w+(?:\.\w+)*\/?))?([/.]*?(?:[^?]+)?\/)?((?:[^/?]+)\.(\w+))(?:\?(\S+)?)?$/;
    c.defaultInterruptBehavior = c.INTERRUPT_NONE;
    c.lastId = 0;
    c.activePlugin = null;
    c.pluginsRegistered = !1;
    c.masterVolume = 1;
    c.masterMute = !1;
    c.instances = [];
    c.idHash = {};
    c.y298Hash = {};
    c.defaultSoundInstance = null;
    c.addEventListener = null;
    c.removeEventListener = null;
    c.removeAllEventListeners = null;
    c.dispatchEvent = null;
    c.hasEventListener = null;
    c._listeners = null;
    createjs.EventDispatcher.initialize(c);
    c.sendFileLoadEvent = function(a) {
        if (c.y298Hash[a])
            for (var b =
                    0, f = c.y298Hash[a].length; f > b; b++) {
                var g = c.y298Hash[a][b];
                if (c.y298Hash[a][b] = !0, c.hasEventListener("fileload")) {
                    var h = new createjs.Event("fileload");
                    h.src = g.src;
                    h.id = g.id;
                    h.data = g.data;
                    c.dispatchEvent(h)
                }
            }
    };
    c.getPreloadHandlers = function() {
        return {
            callback: createjs.proxy(c.initLoad, c),
            types: ["sound"],
            extensions: c.SUPPORTED_EXTENSIONS
        }
    };
    c.registerPlugin = function(a) {
        return c.pluginsRegistered = !0, null == a ? !1 : a.isSupported() ? (c.activePlugin = new a, !0) : !1
    };
    c.registerPlugins = function(a) {
        for (var b = 0, f = a.length; f >
            b; b++)
            if (c.registerPlugin(a[b])) return !0;
        return !1
    };
    c.initializeDefaultPlugins = function() {
        return null != c.activePlugin ? !0 : c.pluginsRegistered ? !1 : c.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin]) ? !0 : !1
    };
    c.isReady = function() {
        return null != c.activePlugin
    };
    c.getCapabilities = function() {
        return null == c.activePlugin ? null : c.activePlugin.capabilities
    };
    c.getCapability = function(a) {
        return null == c.activePlugin ? null : c.activePlugin.capabilities[a]
    };
    c.initLoad = function(a, b, f, g, h) {
        a = c.registerSound(a,
            f, g, !1, h);
        return null == a ? !1 : a
    };
    c.registerSound = function(b, e, f, g, h) {
        if (!c.initializeDefaultPlugins()) return !1;
        b instanceof Object && (h = e, e = b.id, f = b.data, b = b.src);
        var m = c.parsePath(b, "sound", e, f);
        if (null == m) return !1;
        null != e && (c.idHash[e] = m.src);
        var q = null;
        null != f && (isNaN(f.channels) ? isNaN(f) || (q = parseInt(f)) : q = parseInt(f.channels));
        var w = c.activePlugin.register(m.src, q);
        if (null != w && (null != w.numChannels && (q = w.numChannels), a.create(m.src, q), null != f && isNaN(f) ? f.channels = m.data.channels = q || a.maxPerChannel() :
                f = m.data = q || a.maxPerChannel(), null != w.tag ? m.tag = w.tag : w.src && (m.src = w.src), null != w.completeHandler && (m.completeHandler = w.completeHandler), w.type && (m.type = w.type)), 0 != g)
            if (c.y298Hash[m.src] || (c.y298Hash[m.src] = []), c.y298Hash[m.src].push({
                    src: b,
                    id: e,
                    data: f
                }), 1 == c.y298Hash[m.src].length) null == h && (h = ""), c.activePlugin.y298(m.src, w, h);
            else if (1 == c.y298Hash[m.src][0]) return !0;
        return m
    };
    c.registerManifest = function(a, b) {
        for (var c = [], g = 0, h = a.length; h > g; g++) c[g] = createjs.Sound.registerSound(a[g].src, a[g].id,
            a[g].data, a[g].y298, b);
        return c
    };
    c.removeSound = function(b) {
        if (null == c.activePlugin) return !1;
        b instanceof Object && (b = b.src);
        b = c.getSrcById(b);
        b = c.parsePath(b);
        if (null == b) return !1;
        b = b.src;
        for (var e in c.idHash) c.idHash[e] == b && delete c.idHash[e];
        return a.removeSrc(b), delete c.y298Hash[b], c.activePlugin.removeSound(b), !0
    };
    c.removeManifest = function(a) {
        for (var b = [], c = 0, g = a.length; g > c; c++) b[c] = createjs.Sound.removeSound(a[c].src);
        return b
    };
    c.removeAllSounds = function() {
        c.idHash = {};
        c.y298Hash = {};
        a.removeAll();
        c.activePlugin.removeAllSounds()
    };
    c.loadComplete = function(a) {
        var b = c.parsePath(a, "sound");
        return a = b ? c.getSrcById(b.src) : c.getSrcById(a), 1 == c.y298Hash[a][0]
    };
    c.parsePath = function(a, b, f, g) {
        "string" != typeof a && (a = a.toString());
        a = a.split(c.DELIMITER);
        b = {
            type: b || "sound",
            id: f,
            data: g
        };
        f = c.getCapabilities();
        g = 0;
        for (var h = a.length; h > g; g++) {
            var m = a[g],
                q = m.match(c.FILE_PATTERN);
            if (null == q) return !1;
            var w = q[4],
                q = q[5];
            if (f[q] && -1 < createjs.indexOf(c.SUPPORTED_EXTENSIONS, q)) return b.name = w, b.src = m, b.extension = q,
                b
        }
        return null
    };
    c.play = function(a, b, f, g, h, m, q) {
        a = c.createInstance(a);
        return c.playInstance(a, b, f, g, h, m, q) || a.playFailed(), a
    };
    c.createInstance = function(b) {
        if (!c.initializeDefaultPlugins()) return c.defaultSoundInstance;
        b = c.getSrcById(b);
        b = c.parsePath(b, "sound");
        var e = null;
        return null != b && null != b.src ? (a.create(b.src), e = c.activePlugin.create(b.src)) : e = c.defaultSoundInstance, e.uniqueId = c.lastId++, e
    };
    c.setVolume = function(a) {
        if (null == Number(a)) return !1;
        if (a = Math.max(0, Math.min(1, a)), c.masterVolume = a, !this.activePlugin ||
            !this.activePlugin.setVolume || !this.activePlugin.setVolume(a))
            for (var b = this.instances, f = 0, g = b.length; g > f; f++) b[f].setMasterVolume(a)
    };
    c.getVolume = function() {
        return c.masterVolume
    };
    c.setMute = function(a) {
        if (null == a || void 0 == a) return !1;
        if (this.masterMute = a, !this.activePlugin || !this.activePlugin.setMute || !this.activePlugin.setMute(a))
            for (var b = this.instances, c = 0, g = b.length; g > c; c++) b[c].setMasterMute(a);
        return !0
    };
    c.getMute = function() {
        return this.masterMute
    };
    c.stop = function() {
        for (var a = this.instances,
                b = a.length; b--;) a[b].stop()
    };
    c.playInstance = function(a, b, f, g, h, m, q) {
        if (b instanceof Object && (f = b.delay, g = b.offset, h = b.loop, m = b.volume, q = b.pan), b = b || c.defaultInterruptBehavior, null == f && (f = 0), null == g && (g = a.getPosition()), null == h && (h = 0), null == m && (m = a.volume), null == q && (q = a.pan), 0 == f) {
            if (!c.beginPlaying(a, b, g, h, m, q)) return !1
        } else f = setTimeout(function() {
            c.beginPlaying(a, b, g, h, m, q)
        }, f), a.delayTimeoutId = f;
        return this.instances.push(a), !0
    };
    c.beginPlaying = function(b, c, f, g, h, m) {
        return a.add(b, c) ? b.beginPlaying(f,
            g, h, m) ? !0 : (b = createjs.indexOf(this.instances, b), -1 < b && this.instances.splice(b, 1), !1) : !1
    };
    c.getSrcById = function(a) {
        return null == c.idHash || null == c.idHash[a] ? a : c.idHash[a]
    };
    c.playFinished = function(b) {
        a.remove(b);
        b = createjs.indexOf(this.instances, b); - 1 < b && this.instances.splice(b, 1)
    };
    createjs.Sound = c;
    a.channels = {};
    a.create = function(b, c) {
        return null == a.get(b) ? (a.channels[b] = new a(b, c), !0) : !1
    };
    a.removeSrc = function(b) {
        var c = a.get(b);
        return null == c ? !1 : (c.removeAll(), delete a.channels[b], !0)
    };
    a.removeAll = function() {
        for (var b in a.channels) a.channels[b].removeAll();
        a.channels = {}
    };
    a.add = function(b, c) {
        var f = a.get(b.src);
        return null == f ? !1 : f.add(b, c)
    };
    a.remove = function(b) {
        var c = a.get(b.src);
        return null == c ? !1 : (c.remove(b), !0)
    };
    a.maxPerChannel = function() {
        return h.maxDefault
    };
    a.get = function(b) {
        return a.channels[b]
    };
    var h = a.prototype;
    h.src = null;
    h.max = null;
    h.maxDefault = 100;
    h.length = 0;
    h.init = function(a, b) {
        this.src = a;
        this.max = b || this.maxDefault; - 1 == this.max && this.max == this.maxDefault;
        this.instances = []
    };
    h.get = function(a) {
        return this.instances[a]
    };
    h.add = function(a, b) {
        return this.getSlot(b,
            a) ? (this.instances.push(a), this.length++, !0) : !1
    };
    h.remove = function(a) {
        a = createjs.indexOf(this.instances, a);
        return -1 == a ? !1 : (this.instances.splice(a, 1), this.length--, !0)
    };
    h.removeAll = function() {
        for (var a = this.length - 1; 0 <= a; a--) this.instances[a].stop()
    };
    h.getSlot = function(a) {
        for (var b, f, g = 0, h = this.max; h > g; g++) {
            if (b = this.get(g), null == b) return !0;
            (a != c.INTERRUPT_NONE || b.playState == c.PLAY_FINISHED) && (0 != g ? b.playState == c.PLAY_FINISHED || b.playState == c.PLAY_INTERRUPTED || b.playState == c.PLAY_FAILED ? f = b : (a == c.INTERRUPT_EARLY &&
                b.getPosition() < f.getPosition() || a == c.INTERRUPT_LATE && b.getPosition() > f.getPosition()) && (f = b) : f = b)
        }
        return null != f ? (f.interrupt(), this.remove(f), !0) : !1
    };
    h.toString = function() {
        return "[Sound SoundChannel]"
    };
    c.defaultSoundInstance = new function() {
        this.isDefault = !0;
        this.addEventListener = this.removeEventListener = this.removeAllEventListener = this.dispatchEvent = this.hasEventListener = this._listeners = this.interrupt = this.playFailed = this.pause = this.resume = this.play = this.beginPlaying = this.cleanUp = this.stop = this.setMasterVolume =
            this.setVolume = this.mute = this.setMute = this.getMute = this.setPan = this.getPosition = this.setPosition = function() {
                return !1
            };
        this.getVolume = this.getPan = this.getDuration = function() {
            return 0
        };
        this.playState = c.PLAY_FAILED;
        this.toString = function() {
            return "[Sound Default Sound Instance]"
        }
    };
    null == createjs.proxy && (createjs.proxy = function() {
        throw "Proxy has been moved to an external file, and must be included separately.";
    });
    b.init = function() {
        var a = window.navigator.userAgent;
        b.isFirefox = -1 < a.indexOf("Firefox");
        b.isOpera =
            null != window.opera;
        b.isChrome = -1 < a.indexOf("Chrome");
        b.isIOS = -1 < a.indexOf("iPod") || -1 < a.indexOf("iPhone") || -1 < a.indexOf("iPad");
        b.isAndroid = -1 < a.indexOf("Android");
        b.isBlackberry = -1 < a.indexOf("Blackberry")
    };
    b.init();
    createjs.Sound.BrowserDetect = b
})();
this.createjs = this.createjs || {};
(function() {
    function c() {
        this.init()
    }
    c.capabilities = null;
    c.isSupported = function() {
        var a = createjs.Sound.BrowserDetect.isIOS || createjs.Sound.BrowserDetect.isAndroid || createjs.Sound.BrowserDetect.isBlackberry;
        return "file:" != location.protocol || a || this.isFileXHRSupported() ? (c.generateCapabilities(), null == c.context ? !1 : !0) : !1
    };
    c.isFileXHRSupported = function() {
        var a = !0,
            c = new XMLHttpRequest;
        try {
            c.open("GET", "fail.fail", !1)
        } catch (d) {
            return a = !1
        }
        c.onerror = function() {
            a = !1
        };
        c.onload = function() {
            a = 404 == this.status ||
                200 == this.status || 0 == this.status && "" != this.response
        };
        try {
            c.send()
        } catch (e) {
            a = !1
        }
        return a
    };
    c.generateCapabilities = function() {
        if (null == c.capabilities) {
            var a = document.createElement("audio");
            if (null == a.canPlayType) return null;
            if (window.webkitAudioContext) c.context = new webkitAudioContext;
            else {
                if (!window.AudioContext) return null;
                c.context = new AudioContext
            }
            c.compatibilitySetUp();
            c.playEmptySound();
            c.capabilities = {
                panning: !0,
                volume: !0,
                tracks: -1
            };
            for (var h = createjs.Sound.SUPPORTED_EXTENSIONS, d = createjs.Sound.EXTENSION_MAP,
                    e = 0, f = h.length; f > e; e++) {
                var g = h[e],
                    k = d[g] || g;
                c.capabilities[g] = "no" != a.canPlayType("audio/" + g) && "" != a.canPlayType("audio/" + g) || "no" != a.canPlayType("audio/" + k) && "" != a.canPlayType("audio/" + k)
            }
            2 > c.context.destination.numberOfChannels && (c.capabilities.panning = !1);
            c.dynamicsCompressorNode = c.context.createDynamicsCompressor();
            c.dynamicsCompressorNode.connect(c.context.destination);
            c.gainNode = c.context.createGain();
            c.gainNode.connect(c.dynamicsCompressorNode)
        }
    };
    c.compatibilitySetUp = function() {
        if (!c.context.createGain) {
            c.context.createGain =
                c.context.createGainNode;
            var a = c.context.createBufferSource();
            a.__proto__.start = a.__proto__.noteGrainOn;
            a.__proto__.stop = a.__proto__.noteOff;
            this.panningModel = 0
        }
    };
    c.playEmptySound = function() {
        var a = this.context.createBuffer(1, 1, 22050),
            c = this.context.createBufferSource();
        c.buffer = a;
        c.connect(this.context.destination);
        c.start(0, 0, 0)
    };
    var a = c.prototype;
    a.capabilities = null;
    a.volume = 1;
    a.context = null;
    a.panningModel = "equalpower";
    a.dynamicsCompressorNode = null;
    a.gainNode = null;
    a.arrayBuffers = null;
    a.init = function() {
        this.capabilities =
            c.capabilities;
        this.arrayBuffers = {};
        this.context = c.context;
        this.gainNode = c.gainNode;
        this.dynamicsCompressorNode = c.dynamicsCompressorNode
    };
    a.register = function(a) {
        this.arrayBuffers[a] = !0;
        return {
            tag: new createjs.WebAudioPlugin.Loader(a, this)
        }
    };
    a.isPreloadStarted = function(a) {
        return null != this.arrayBuffers[a]
    };
    a.isPreloadComplete = function(a) {
        return !(null == this.arrayBuffers[a] || 1 == this.arrayBuffers[a])
    };
    a.removeFromPreload = function(a) {
        delete this.arrayBuffers[a]
    };
    a.removeSound = function(a) {
        delete this.arrayBuffers[a]
    };
    a.removeAllSounds = function() {
        this.arrayBuffers = {}
    };
    a.addPreloadResults = function(a, c) {
        this.arrayBuffers[a] = c
    };
    a.handlePreloadComplete = function() {
        createjs.Sound.sendFileLoadEvent(this.src)
    };
    a.y298 = function(a, c, d) {
        this.arrayBuffers[a] = !0;
        a = new createjs.WebAudioPlugin.Loader(a, this);
        a.onload = this.handlePreloadComplete;
        null != d && (a.src = d + a.src);
        a.load()
    };
    a.create = function(a) {
        return this.isPreloadStarted(a) || this.y298(a), new createjs.WebAudioPlugin.SoundInstance(a, this)
    };
    a.setVolume = function(a) {
        return this.volume =
            a, this.updateVolume(), !0
    };
    a.updateVolume = function() {
        var a = createjs.Sound.masterMute ? 0 : this.volume;
        a != this.gainNode.gain.value && (this.gainNode.gain.value = a)
    };
    a.getVolume = function() {
        return this.volume
    };
    a.setMute = function() {
        return this.updateVolume(), !0
    };
    a.toString = function() {
        return "[WebAudioPlugin]"
    };
    createjs.WebAudioPlugin = c
})();
(function() {
    function c(a, c) {
        this.init(a, c)
    }
    var a = c.prototype;
    a.src = null;
    a.uniqueId = -1;
    a.playState = null;
    a.owner = null;
    a.offset = 0;
    a.delay = 0;
    a._volume = 1;
    Object.defineProperty(a, "volume", {
        get: function() {
            return this._volume
        },
        set: function(a) {
            return null == Number(a) ? !1 : (a = Math.max(0, Math.min(1, a)), this._volume = a, this.updateVolume(), void 0)
        }
    });
    a._pan = 0;
    Object.defineProperty(a, "pan", {
        get: function() {
            return this._pan
        },
        set: function(a) {
            return this.owner.capabilities.panning && null != Number(a) ? (a = Math.max(-1, Math.min(1,
                a)), this._pan = a, this.panNode.setPosition(a, 0, -0.5), void 0) : !1
        }
    });
    a.duration = 0;
    a.remainingLoops = 0;
    a.delayTimeoutId = null;
    a.soundCompleteTimeout = null;
    a.panNode = null;
    a.gainNode = null;
    a.sourceNode = null;
    a.sourceNodeNext = null;
    a.muted = !1;
    a.paused = !1;
    a.startTime = 0;
    a.addEventListener = null;
    a.removeEventListener = null;
    a.removeAllEventListeners = null;
    a.dispatchEvent = null;
    a.hasEventListener = null;
    a._listeners = null;
    a.endedHandler = null;
    a.readyHandler = null;
    a.stalledHandler = null;
    a.sendEvent = function(a) {
        a = new createjs.Event(a);
        this.dispatchEvent(a)
    };
    a.init = function(a, c) {
        this.owner = c;
        this.src = a;
        this.panNode = this.owner.context.createPanner();
        this.panNode.panningModel = this.owner.panningModel;
        this.gainNode = this.owner.context.createGain();
        this.gainNode.connect(this.panNode);
        this.owner.isPreloadComplete(this.src) && (this.duration = 1E3 * this.owner.arrayBuffers[this.src].duration);
        this.endedHandler = createjs.proxy(this.handleSoundComplete, this);
        this.readyHandler = createjs.proxy(this.handleSoundReady, this);
        this.stalledHandler = createjs.proxy(this.handleSoundStalled,
            this)
    };
    a.cleanUp = function() {
        this.sourceNode && this.sourceNode.playbackState != this.sourceNode.UNSCHEDULED_STATE && (this.sourceNode = this.cleanUpAudioNode(this.sourceNode), this.sourceNodeNext = this.cleanUpAudioNode(this.sourceNodeNext));
        0 != this.panNode.numberOfOutputs && this.panNode.disconnect(0);
        clearTimeout(this.delayTimeoutId);
        clearTimeout(this.soundCompleteTimeout);
        this.startTime = 0;
        null != window.createjs && createjs.Sound.playFinished(this)
    };
    a.cleanUpAudioNode = function(a) {
        return a && (a.stop(0), a.disconnect(this.gainNode),
            a = null), a
    };
    a.interrupt = function() {
        this.playState = createjs.Sound.PLAY_INTERRUPTED;
        this.cleanUp();
        this.paused = !1;
        this.sendEvent("interrupted")
    };
    a.handleSoundStalled = function() {
        this.sendEvent("failed")
    };
    a.handleSoundReady = function() {
        if (null != window.createjs) {
            if (1E3 * this.offset > this.getDuration()) return this.playFailed(), void 0;
            0 > this.offset && (this.offset = 0);
            this.playState = createjs.Sound.PLAY_SUCCEEDED;
            this.paused = !1;
            this.panNode.connect(this.owner.gainNode);
            var a = this.owner.arrayBuffers[this.src].duration;
            this.sourceNode = this.createAndPlayAudioNode(this.owner.context.currentTime - a, this.offset);
            this.duration = 1E3 * a;
            this.startTime = this.sourceNode.startTime - this.offset;
            this.soundCompleteTimeout = setTimeout(this.endedHandler, 1E3 * (a - this.offset));
            0 != this.remainingLoops && (this.sourceNodeNext = this.createAndPlayAudioNode(this.startTime, 0))
        }
    };
    a.createAndPlayAudioNode = function(a, c) {
        var d = this.owner.context.createBufferSource();
        return d.buffer = this.owner.arrayBuffers[this.src], d.connect(this.gainNode), this.owner.context.currentTime,
            d.startTime = a + d.buffer.duration, d.start(d.startTime, c, d.buffer.duration - c), d
    };
    a.play = function(a, c, d, e, f, g) {
        this.cleanUp();
        createjs.Sound.playInstance(this, a, c, d, e, f, g)
    };
    a.beginPlaying = function(a, c, d, e) {
        return null != window.createjs && this.src ? (this.offset = a / 1E3, this.remainingLoops = c, this.volume = d, this.pan = e, this.owner.isPreloadComplete(this.src) ? (this.handleSoundReady(null), this.sendEvent("succeeded"), 1) : (this.playFailed(), void 0)) : void 0
    };
    a.pause = function() {
        return this.paused || this.playState != createjs.Sound.PLAY_SUCCEEDED ?
            !1 : (this.paused = !0, this.offset = this.owner.context.currentTime - this.startTime, this.cleanUpAudioNode(this.sourceNode), this.cleanUpAudioNode(this.sourceNodeNext), 0 != this.panNode.numberOfOutputs && this.panNode.disconnect(), clearTimeout(this.delayTimeoutId), clearTimeout(this.soundCompleteTimeout), !0)
    };
    a.resume = function() {
        return this.paused ? (this.handleSoundReady(null), !0) : !1
    };
    a.stop = function() {
        return this.playState = createjs.Sound.PLAY_FINISHED, this.cleanUp(), this.offset = 0, !0
    };
    a.setVolume = function(a) {
        return this.volume =
            a, !0
    };
    a.updateVolume = function() {
        var a = this.muted ? 0 : this._volume;
        return a != this.gainNode.gain.value ? (this.gainNode.gain.value = a, !0) : !1
    };
    a.getVolume = function() {
        return this.volume
    };
    a.setMute = function(a) {
        return null == a || void 0 == a ? !1 : (this.muted = a, this.updateVolume(), !0)
    };
    a.getMute = function() {
        return this.muted
    };
    a.setPan = function(a) {
        return this.pan = a, this.pan != a ? !1 : void 0
    };
    a.getPan = function() {
        return this.pan
    };
    a.getPosition = function() {
        return 1E3 * (this.paused || null == this.sourceNode ? this.offset : this.owner.context.currentTime -
            this.startTime)
    };
    a.setPosition = function(a) {
        return this.offset = a / 1E3, this.sourceNode && this.sourceNode.playbackState != this.sourceNode.UNSCHEDULED_STATE && (this.cleanUpAudioNode(this.sourceNode), this.cleanUpAudioNode(this.sourceNodeNext), clearTimeout(this.soundCompleteTimeout)), this.paused || this.playState != createjs.Sound.PLAY_SUCCEEDED || this.handleSoundReady(null), !0
    };
    a.getDuration = function() {
        return this.duration
    };
    a.handleSoundComplete = function() {
        return this.offset = 0, 0 != this.remainingLoops ? (this.remainingLoops--,
            this.sourceNodeNext ? (this.cleanUpAudioNode(this.sourceNode), this.sourceNode = this.sourceNodeNext, this.startTime = this.sourceNode.startTime, this.sourceNodeNext = this.createAndPlayAudioNode(this.startTime, 0), this.soundCompleteTimeout = setTimeout(this.endedHandler, this.duration)) : this.handleSoundReady(null), this.sendEvent("loop"), void 0) : (null != window.createjs && (this.playState = createjs.Sound.PLAY_FINISHED, this.cleanUp(), this.sendEvent("complete")), void 0)
    };
    a.playFailed = function() {
        null != window.createjs &&
            (this.playState = createjs.Sound.PLAY_FAILED, this.cleanUp(), this.sendEvent("failed"))
    };
    a.toString = function() {
        return "[WebAudioPlugin SoundInstance]"
    };
    createjs.EventDispatcher.initialize(c.prototype);
    createjs.WebAudioPlugin.SoundInstance = c
})();
(function() {
    function c(a, c) {
        this.init(a, c)
    }
    var a = c.prototype;
    a.request = null;
    a.owner = null;
    a.progress = -1;
    a.src = null;
    a.originalSrc = null;
    a.result = null;
    a.onload = null;
    a.onprogress = null;
    a.onError = null;
    a.init = function(a, c) {
        this.originalSrc = this.src = a;
        this.owner = c
    };
    a.load = function(a) {
        null != a && (this.src = a);
        this.request = new XMLHttpRequest;
        this.request.open("GET", this.src, !0);
        this.request.responseType = "arraybuffer";
        this.request.onload = createjs.proxy(this.handleLoad, this);
        this.request.onError = createjs.proxy(this.handleError,
            this);
        this.request.onprogress = createjs.proxy(this.handleProgress, this);
        this.request.send()
    };
    a.handleProgress = function(a, c) {
        this.progress = a / c;
        null != this.onprogress && this.onprogress({
            loaded: a,
            total: c,
            progress: this.progress
        })
    };
    a.handleLoad = function() {
        this.owner.context.decodeAudioData(this.request.response, createjs.proxy(this.handleAudioDecoded, this), createjs.proxy(this.handleError, this))
    };
    a.handleAudioDecoded = function(a) {
        this.progress = 1;
        this.result = a;
        this.src = this.originalSrc;
        this.owner.addPreloadResults(this.src,
            this.result);
        this.onload && this.onload()
    };
    a.handleError = function(a) {
        this.owner.removeSound(this.src);
        this.onerror && this.onerror(a)
    };
    a.toString = function() {
        return "[WebAudioPlugin Loader]"
    };
    createjs.WebAudioPlugin.Loader = c
})();
this.createjs = this.createjs || {};
(function() {
    function c() {
        this.init()
    }
    c.MAX_INSTANCES = 30;
    c.capabilities = null;
    c.AUDIO_READY = "canplaythrough";
    c.AUDIO_ENDED = "ended";
    c.AUDIO_SEEKED = "seeked";
    c.AUDIO_ERROR = "error";
    c.AUDIO_STALLED = "stalled";
    c.enableIOS = !1;
    c.isSupported = function() {
        if (createjs.Sound.BrowserDetect.isIOS && !c.enableIOS) return !1;
        c.generateCapabilities();
        return null == c.tag || null == c.capabilities ? !1 : !0
    };
    c.generateCapabilities = function() {
        if (null == c.capabilities) {
            var a = c.tag = document.createElement("audio");
            if (null == a.canPlayType) return null;
            c.capabilities = {
                panning: !0,
                volume: !0,
                tracks: -1
            };
            for (var h = createjs.Sound.SUPPORTED_EXTENSIONS, d = createjs.Sound.EXTENSION_MAP, e = 0, f = h.length; f > e; e++) {
                var g = h[e],
                    k = d[g] || g;
                c.capabilities[g] = "no" != a.canPlayType("audio/" + g) && "" != a.canPlayType("audio/" + g) || "no" != a.canPlayType("audio/" + k) && "" != a.canPlayType("audio/" + k)
            }
        }
    };
    var a = c.prototype;
    a.capabilities = null;
    a.audioSources = null;
    a.defaultNumChannels = 2;
    a.loadedHandler = null;
    a.init = function() {
        this.capabilities = c.capabilities;
        this.audioSources = {}
    };
    a.register =
        function(a, c) {
            this.audioSources[a] = !0;
            for (var d = createjs.HTMLAudioPlugin.TagPool.get(a), e = null, f = c || this.defaultNumChannels, g = 0; f > g; g++) e = this.createTag(a), d.add(e);
            if (e.id = a, this.loadedHandler = createjs.proxy(this.handleTagLoad, this), e.addEventListener && e.addEventListener("canplaythrough", this.loadedHandler), null == e.onreadyy7change) e.onreadyy7change = this.loadedHandler;
            else {
                var k = e.onreadyy7change;
                e.onreadyy7change = function() {
                    k();
                    this.loadedHandler()
                }
            }
            return {
                tag: e,
                numChannels: f
            }
        };
    a.handleTagLoad = function(a) {
        a.target.removeEventListener &&
            a.target.removeEventListener("canplaythrough", this.loadedHandler);
        a.target.onreadyy7change = null;
        a.target.src != a.target.id && createjs.HTMLAudioPlugin.TagPool.checkSrc(a.target.id)
    };
    a.createTag = function(a) {
        var c = document.createElement("audio");
        return c.autoplay = !1, c.y298 = "none", c.src = a, c
    };
    a.removeSound = function(a) {
        delete this.audioSources[a];
        createjs.HTMLAudioPlugin.TagPool.remove(a)
    };
    a.removeAllSounds = function() {
        this.audioSources = {};
        createjs.HTMLAudioPlugin.TagPool.removeAll()
    };
    a.create = function(a) {
        if (!this.isPreloadStarted(a)) {
            var c =
                createjs.HTMLAudioPlugin.TagPool.get(a),
                d = this.createTag(a);
            d.id = a;
            c.add(d);
            this.y298(a, {
                tag: d
            })
        }
        return new createjs.HTMLAudioPlugin.SoundInstance(a, this)
    };
    a.isPreloadStarted = function(a) {
        return null != this.audioSources[a]
    };
    a.y298 = function(a, c, d) {
        this.audioSources[a] = !0;
        null != d && (c.tag.src = d + a);
        new createjs.HTMLAudioPlugin.Loader(a, c.tag)
    };
    a.toString = function() {
        return "[HTMLAudioPlugin]"
    };
    createjs.HTMLAudioPlugin = c
})();
(function() {
    function c(a, c) {
        this.init(a, c)
    }
    var a = c.prototype;
    a.src = null;
    a.uniqueId = -1;
    a.playState = null;
    a.owner = null;
    a.loaded = !1;
    a.offset = 0;
    a.delay = 0;
    a._volume = 1;
    Object.defineProperty(a, "volume", {
        get: function() {
            return this._volume
        },
        set: function(a) {
            null != Number(a) && (a = Math.max(0, Math.min(1, a)), this._volume = a, this.updateVolume())
        }
    });
    a.pan = 0;
    a.duration = 0;
    a.remainingLoops = 0;
    a.delayTimeoutId = null;
    a.tag = null;
    a.muted = !1;
    a.paused = !1;
    a.addEventListener = null;
    a.removeEventListener = null;
    a.removeAllEventListeners =
        null;
    a.dispatchEvent = null;
    a.hasEventListener = null;
    a._listeners = null;
    a.endedHandler = null;
    a.readyHandler = null;
    a.stalledHandler = null;
    a.loopHandler = null;
    a.init = function(a, c) {
        this.src = a;
        this.owner = c;
        this.endedHandler = createjs.proxy(this.handleSoundComplete, this);
        this.readyHandler = createjs.proxy(this.handleSoundReady, this);
        this.stalledHandler = createjs.proxy(this.handleSoundStalled, this);
        this.loopHandler = createjs.proxy(this.handleSoundLoop, this)
    };
    a.sendEvent = function(a) {
        a = new createjs.Event(a);
        this.dispatchEvent(a)
    };
    a.cleanUp = function() {
        var a = this.tag;
        if (null != a) {
            a.pause();
            a.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_ENDED, this.endedHandler, !1);
            a.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_READY, this.readyHandler, !1);
            a.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1);
            try {
                a.currentTime = 0
            } catch (c) {}
            createjs.HTMLAudioPlugin.TagPool.setInstance(this.src, a);
            this.tag = null
        }
        clearTimeout(this.delayTimeoutId);
        null != window.createjs && createjs.Sound.playFinished(this)
    };
    a.interrupt =
        function() {
            null != this.tag && (this.playState = createjs.Sound.PLAY_INTERRUPTED, this.cleanUp(), this.paused = !1, this.sendEvent("interrupted"))
        };
    a.play = function(a, c, d, e, f, g) {
        this.cleanUp();
        createjs.Sound.playInstance(this, a, c, d, e, f, g)
    };
    a.beginPlaying = function(a, c, d, e) {
        if (null == window.createjs) return -1;
        var f = this.tag = createjs.HTMLAudioPlugin.TagPool.getInstance(this.src);
        return null == f ? (this.playFailed(), -1) : (f.addEventListener(createjs.HTMLAudioPlugin.AUDIO_ENDED, this.endedHandler, !1), this.offset = a, this.volume =
            d, this.pan = e, this.updateVolume(), this.remainingLoops = c, 4 !== f.readyState ? (f.addEventListener(createjs.HTMLAudioPlugin.AUDIO_READY, this.readyHandler, !1), f.addEventListener(createjs.HTMLAudioPlugin.AUDIO_STALLED, this.stalledHandler, !1), f.y298 = "auto", f.load()) : this.handleSoundReady(null), this.sendEvent("succeeded"), 1)
    };
    a.handleSoundStalled = function() {
        this.cleanUp();
        this.sendEvent("failed")
    };
    a.handleSoundReady = function() {
        if (null != window.createjs) {
            if (this.duration = 1E3 * this.tag.duration, this.playState = createjs.Sound.PLAY_SUCCEEDED,
                this.paused = !1, this.tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_READY, this.readyHandler, !1), this.offset >= this.getDuration()) return this.playFailed(), void 0;
            0 < this.offset && (this.tag.currentTime = 0.0010 * this.offset); - 1 == this.remainingLoops && (this.tag.loop = !0);
            0 != this.remainingLoops && (this.tag.addEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1), this.tag.loop = !0);
            this.tag.play()
        }
    };
    a.pause = function() {
        return this.paused || this.playState != createjs.Sound.PLAY_SUCCEEDED || null ==
            this.tag ? !1 : (this.paused = !0, this.tag.pause(), clearTimeout(this.delayTimeoutId), !0)
    };
    a.resume = function() {
        return this.paused && null != this.tag ? (this.paused = !1, this.tag.play(), !0) : !1
    };
    a.stop = function() {
        return this.offset = 0, this.pause(), this.playState = createjs.Sound.PLAY_FINISHED, this.cleanUp(), !0
    };
    a.setMasterVolume = function() {
        return this.updateVolume(), !0
    };
    a.setVolume = function(a) {
        return this.volume = a, !0
    };
    a.updateVolume = function() {
        if (null != this.tag) {
            var a = this.muted || createjs.Sound.masterMute ? 0 : this._volume *
                createjs.Sound.masterVolume;
            return a != this.tag.volume && (this.tag.volume = a), !0
        }
        return !1
    };
    a.getVolume = function() {
        return this.volume
    };
    a.setMasterMute = function() {
        return this.updateVolume(), !0
    };
    a.setMute = function(a) {
        return null == a || void 0 == a ? !1 : (this.muted = a, this.updateVolume(), !0)
    };
    a.getMute = function() {
        return this.muted
    };
    a.setPan = function() {
        return !1
    };
    a.getPan = function() {
        return 0
    };
    a.getPosition = function() {
        return null == this.tag ? this.offset : 1E3 * this.tag.currentTime
    };
    a.setPosition = function(a) {
        if (null == this.tag) this.offset =
            a;
        else {
            this.tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1);
            try {
                this.tag.currentTime = 0.0010 * a
            } catch (c) {
                return !1
            }
            this.tag.addEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1)
        }
        return !0
    };
    a.getDuration = function() {
        return this.duration
    };
    a.handleSoundComplete = function() {
        this.offset = 0;
        null != window.createjs && (this.playState = createjs.Sound.PLAY_FINISHED, this.cleanUp(), this.sendEvent("complete"))
    };
    a.handleSoundLoop = function() {
        this.offset = 0;
        this.remainingLoops--;
        0 == this.remainingLoops && (this.tag.loop = !1, this.tag.removeEventListener(createjs.HTMLAudioPlugin.AUDIO_SEEKED, this.loopHandler, !1));
        this.sendEvent("loop")
    };
    a.playFailed = function() {
        null != window.createjs && (this.playState = createjs.Sound.PLAY_FAILED, this.cleanUp(), this.sendEvent("failed"))
    };
    a.toString = function() {
        return "[HTMLAudioPlugin SoundInstance]"
    };
    createjs.EventDispatcher.initialize(c.prototype);
    createjs.HTMLAudioPlugin.SoundInstance = c
})();
(function() {
    function c(a, c) {
        this.init(a, c)
    }
    var a = c.prototype;
    a.src = null;
    a.tag = null;
    a.y298Timer = null;
    a.loadedHandler = null;
    a.init = function(a, c) {
        if (this.src = a, this.tag = c, this.y298Timer = setInterval(createjs.proxy(this.y298Tick, this), 200), this.loadedHandler = createjs.proxy(this.sendLoadedEvent, this), this.tag.addEventListener && this.tag.addEventListener("canplaythrough", this.loadedHandler), null == this.tag.onreadyy7change) this.tag.onreadyy7change = createjs.proxy(this.sendLoadedEvent, this);
        else {
            var d = this.tag.onreadyy7change;
            this.tag.onreadyy7change = function() {
                d();
                this.tag.onreadyy7change = createjs.proxy(this.sendLoadedEvent, this)
            }
        }
        this.tag.y298 = "auto";
        this.tag.load()
    };
    a.y298Tick = function() {
        var a = this.tag.buffered,
            c = this.tag.duration;
        0 < a.length && a.end(0) >= c - 1 && this.handleTagLoaded()
    };
    a.handleTagLoaded = function() {
        clearInterval(this.y298Timer)
    };
    a.sendLoadedEvent = function() {
        this.tag.removeEventListener && this.tag.removeEventListener("canplaythrough", this.loadedHandler);
        this.tag.onreadyy7change = null;
        createjs.Sound.sendFileLoadEvent(this.src)
    };
    a.toString = function() {
        return "[HTMLAudioPlugin Loader]"
    };
    createjs.HTMLAudioPlugin.Loader = c
})();
(function() {
    function c(a) {
        this.init(a)
    }
    c.tags = {};
    c.get = function(a) {
        var h = c.tags[a];
        return null == h && (h = c.tags[a] = new c(a)), h
    };
    c.remove = function(a) {
        var h = c.tags[a];
        return null == h ? !1 : (h.removeAll(), delete c.tags[a], !0)
    };
    c.removeAll = function() {
        for (var a in c.tags) c.tags[a].removeAll();
        c.tags = {}
    };
    c.getInstance = function(a) {
        a = c.tags[a];
        return null == a ? null : a.get()
    };
    c.setInstance = function(a, h) {
        var d = c.tags[a];
        return null == d ? null : d.set(h)
    };
    c.checkSrc = function(a) {
        a = c.tags[a];
        return null == a ? null : (a.checkSrcChange(),
            void 0)
    };
    var a = c.prototype;
    a.src = null;
    a.length = 0;
    a.available = 0;
    a.tags = null;
    a.init = function(a) {
        this.src = a;
        this.tags = []
    };
    a.add = function(a) {
        this.tags.push(a);
        this.length++;
        this.available++
    };
    a.removeAll = function() {
        for (; this.length--;) delete this.tags[this.length];
        this.src = null;
        this.tags.length = 0
    };
    a.get = function() {
        if (0 == this.tags.length) return null;
        this.available = this.tags.length;
        var a = this.tags.pop();
        return null == a.parentNode && document.body.appendChild(a), a
    };
    a.set = function(a) {
        -1 == createjs.indexOf(this.tags,
            a) && this.tags.push(a);
        this.available = this.tags.length
    };
    a.checkSrcChange = function() {
        for (var a = this.tags.length - 1, c = this.tags[a].src; a--;) this.tags[a].src = c
    };
    a.toString = function() {
        return "[HTMLAudioPlugin TagPool]"
    };
    createjs.HTMLAudioPlugin.TagPool = c
})();
var Box2D = {};
(function(c, a) {
    function b() {}!(Object.prototype.defineProperty instanceof Function) && Object.prototype.__defineGetter__ instanceof Function && Object.prototype.__defineSetter__ instanceof Function && (Object.defineProperty = function(a, b, c) {
        c.get instanceof Function && a.__defineGetter__(b, c.get);
        c.set instanceof Function && a.__defineSetter__(b, c.set)
    });
    c.inherit = function(a, c) {
        b.prototype = c.prototype;
        a.prototype = new b;
        a.prototype.constructor = a
    };
    c.generateCallback = function(a, b) {
        return function() {
            b.apply(a, arguments)
        }
    };
    c.NVector = function(b) {
        b === a && (b = 0);
        for (var c = Array(b || 0), e = 0; e < b; ++e) c[e] = 0;
        return c
    };
    c.is = function(b, c) {
        return null === b ? !1 : c instanceof Function && b instanceof c || b.constructor.__implements != a && b.constructor.__implements[c] ? !0 : !1
    };
    c.parseUInt = function(a) {
        return Math.abs(parseInt(a))
    }
})(Box2D);
var Vector = Array,
    Vector_a2j_Number = Box2D.NVector;
"undefined" === typeof Box2D && (Box2D = {});
"undefined" === typeof Box2D.Collision && (Box2D.Collision = {});
"undefined" === typeof Box2D.Collision.Shapes && (Box2D.Collision.Shapes = {});
"undefined" === typeof Box2D.Common && (Box2D.Common = {});
"undefined" === typeof Box2D.Common.Math && (Box2D.Common.Math = {});
"undefined" === typeof Box2D.Dynamics && (Box2D.Dynamics = {});
"undefined" === typeof Box2D.Dynamics.Contacts && (Box2D.Dynamics.Contacts = {});
"undefined" === typeof Box2D.Dynamics.Controllers && (Box2D.Dynamics.Controllers = {});
"undefined" === typeof Box2D.Dynamics.Joints && (Box2D.Dynamics.Joints = {});
(function() {
    function c() {
        c.y106.apply(this, arguments)
    }

    function a() {
        a.b2Bound.apply(this, arguments)
    }

    function b() {
        b.b2BoundValues.apply(this, arguments);
        this.constructor === b && this.b2BoundValues.apply(this, arguments)
    }

    function h() {
        h.b2Collision.apply(this, arguments)
    }

    function d() {
        d.b2ContactID.apply(this, arguments);
        this.constructor === d && this.b2ContactID.apply(this, arguments)
    }

    function e() {
        e.b2ContactPoint.apply(this, arguments)
    }

    function f() {
        f.b2Distance.apply(this, arguments)
    }

    function g() {
        g.b2DistanceInput.apply(this,
            arguments)
    }

    function k() {
        k.b2DistanceOutput.apply(this, arguments)
    }

    function m() {
        m.b2DistanceProxy.apply(this, arguments)
    }

    function q() {
        q.b2DynamicTree.apply(this, arguments);
        this.constructor === q && this.b2DynamicTree.apply(this, arguments)
    }

    function w() {
        w.b2DynamicTreeBroadPhase.apply(this, arguments)
    }

    function u() {
        u.b2DynamicTreeNode.apply(this, arguments)
    }

    function t() {
        t.b2DynamicTreePair.apply(this, arguments)
    }

    function x() {
        x.b2Manifold.apply(this, arguments);
        this.constructor === x && this.b2Manifold.apply(this, arguments)
    }

    function y() {
        y.b2ManifoldPoint.apply(this, arguments);
        this.constructor === y && this.b2ManifoldPoint.apply(this, arguments)
    }

    function n() {
        n.b2Point.apply(this, arguments)
    }

    function C() {
        C.b2RayCastInput.apply(this, arguments);
        this.constructor === C && this.b2RayCastInput.apply(this, arguments)
    }

    function B() {
        B.b2RayCastOutput.apply(this, arguments)
    }

    function H() {
        H.b2Segment.apply(this, arguments)
    }

    function E() {
        E.b2SeparationFunction.apply(this, arguments)
    }

    function G() {
        G.b2Simplex.apply(this, arguments);
        this.constructor ===
            G && this.b2Simplex.apply(this, arguments)
    }

    function D() {
        D.b2SimplexCache.apply(this, arguments)
    }

    function K() {
        K.b2SimplexVertex.apply(this, arguments)
    }

    function F() {
        F.b2TimeOfImpact.apply(this, arguments)
    }

    function I() {
        I.b2TOIInput.apply(this, arguments)
    }

    function O() {
        O.y230Manifold.apply(this, arguments);
        this.constructor === O && this.y230Manifold.apply(this, arguments)
    }

    function L() {
        L.ClipVertex.apply(this, arguments)
    }

    function p() {
        p.Features.apply(this, arguments)
    }

    function v() {
        v.y141.apply(this, arguments);
        this.constructor ===
            v && this.y141.apply(this, arguments)
    }

    function A() {
        A.b2EdgeChainDef.apply(this, arguments);
        this.constructor === A && this.b2EdgeChainDef.apply(this, arguments)
    }

    function z() {
        z.b2EdgeShape.apply(this, arguments);
        this.constructor === z && this.b2EdgeShape.apply(this, arguments)
    }

    function J() {
        J.y227.apply(this, arguments)
    }

    function N() {
        N.y271.apply(this, arguments);
        this.constructor === N && this.y271.apply(this, arguments)
    }

    function P() {
        P.b2Shape.apply(this, arguments);
        this.constructor === P && this.b2Shape.apply(this, arguments)
    }

    function s() {
        s.b2Color.apply(this, arguments);
        this.constructor === s && this.b2Color.apply(this, arguments)
    }

    function r() {
        r.b2Settings.apply(this, arguments)
    }

    function M() {
        M.b2Mat22.apply(this, arguments);
        this.constructor === M && this.b2Mat22.apply(this, arguments)
    }

    function Q() {
        Q.b2Mat33.apply(this, arguments);
        this.constructor === Q && this.b2Mat33.apply(this, arguments)
    }

    function Ba() {
        Ba.b2Math.apply(this, arguments)
    }

    function Ca() {
        Ca.b2Sweep.apply(this, arguments)
    }

    function R() {
        R.b2Transform.apply(this, arguments);
        this.constructor ===
            R && this.b2Transform.apply(this, arguments)
    }

    function S() {
        S.y290.apply(this, arguments);
        this.constructor === S && this.y290.apply(this, arguments)
    }

    function T() {
        T.b2Vec3.apply(this, arguments);
        this.constructor === T && this.b2Vec3.apply(this, arguments)
    }

    function U() {
        U.y113.apply(this, arguments);
        this.constructor === U && this.y113.apply(this, arguments)
    }

    function V() {
        V.y75.apply(this, arguments);
        this.constructor === V && this.y75.apply(this, arguments)
    }

    function Da() {
        Da.b2ContactFilter.apply(this, arguments)
    }

    function Ea() {
        Ea.b2ContactImpulse.apply(this,
            arguments)
    }

    function Fa() {
        Fa.b2ContactListener.apply(this, arguments)
    }

    function W() {
        W.b2ContactManager.apply(this, arguments);
        this.constructor === W && this.b2ContactManager.apply(this, arguments)
    }

    function X() {
        X.y270.apply(this, arguments);
        this.constructor === X && this.y270.apply(this, arguments)
    }

    function Ga() {
        Ga.b2DestructionListener.apply(this, arguments)
    }

    function Ha() {
        Ha.b2FilterData.apply(this, arguments)
    }

    function Y() {
        Y.y213.apply(this, arguments);
        this.constructor === Y && this.y213.apply(this, arguments)
    }

    function Z() {
        Z.y213Def.apply(this,
            arguments);
        this.constructor === Z && this.y213Def.apply(this, arguments)
    }

    function $() {
        $.b2Island.apply(this, arguments);
        this.constructor === $ && this.b2Island.apply(this, arguments)
    }

    function Ia() {
        Ia.b2TimeStep.apply(this, arguments)
    }

    function aa() {
        aa.y230.apply(this, arguments);
        this.constructor === aa && this.y230.apply(this, arguments)
    }

    function Ja() {
        Ja.b2CircleContact.apply(this, arguments)
    }

    function ba() {
        ba.b2Contact.apply(this, arguments);
        this.constructor === ba && this.b2Contact.apply(this, arguments)
    }

    function ca() {
        ca.b2ContactConstraint.apply(this,
            arguments);
        this.constructor === ca && this.b2ContactConstraint.apply(this, arguments)
    }

    function Ka() {
        Ka.b2ContactConstraintPoint.apply(this, arguments)
    }

    function La() {
        La.b2ContactEdge.apply(this, arguments)
    }

    function da() {
        da.b2ContactFactory.apply(this, arguments);
        this.constructor === da && this.b2ContactFactory.apply(this, arguments)
    }

    function Ma() {
        Ma.b2ContactRegister.apply(this, arguments)
    }

    function Na() {
        Na.b2ContactResult.apply(this, arguments)
    }

    function ea() {
        ea.b2ContactSolver.apply(this, arguments);
        this.constructor ===
            ea && this.b2ContactSolver.apply(this, arguments)
    }

    function Oa() {
        Oa.b2EdgeAndCircleContact.apply(this, arguments)
    }

    function fa() {
        fa.b2NullContact.apply(this, arguments);
        this.constructor === fa && this.b2NullContact.apply(this, arguments)
    }

    function Pa() {
        Pa.b2PolyAndCircleContact.apply(this, arguments)
    }

    function Qa() {
        Qa.b2PolyAndEdgeContact.apply(this, arguments)
    }

    function Ra() {
        Ra.b2PolygonContact.apply(this, arguments)
    }

    function ga() {
        ga.b2PositionSolverManifold.apply(this, arguments);
        this.constructor === ga && this.b2PositionSolverManifold.apply(this,
            arguments)
    }

    function Sa() {
        Sa.b2BuoyancyController.apply(this, arguments)
    }

    function Ta() {
        Ta.b2ConstantAccelController.apply(this, arguments)
    }

    function Ua() {
        Ua.b2ConstantForceController.apply(this, arguments)
    }

    function Va() {
        Va.b2Controller.apply(this, arguments)
    }

    function Wa() {
        Wa.b2ControllerEdge.apply(this, arguments)
    }

    function Xa() {
        Xa.b2GravityController.apply(this, arguments)
    }

    function Ya() {
        Ya.b2TensorDampingController.apply(this, arguments)
    }

    function ha() {
        ha.b2DistanceJoint.apply(this, arguments);
        this.constructor ===
            ha && this.b2DistanceJoint.apply(this, arguments)
    }

    function ia() {
        ia.b2DistanceJointDef.apply(this, arguments);
        this.constructor === ia && this.b2DistanceJointDef.apply(this, arguments)
    }

    function ja() {
        ja.b2FrictionJoint.apply(this, arguments);
        this.constructor === ja && this.b2FrictionJoint.apply(this, arguments)
    }

    function ka() {
        ka.b2FrictionJointDef.apply(this, arguments);
        this.constructor === ka && this.b2FrictionJointDef.apply(this, arguments)
    }

    function la() {
        la.b2GearJoint.apply(this, arguments);
        this.constructor === la && this.b2GearJoint.apply(this,
            arguments)
    }

    function ma() {
        ma.b2GearJointDef.apply(this, arguments);
        this.constructor === ma && this.b2GearJointDef.apply(this, arguments)
    }

    function Za() {
        Za.b2Jacobian.apply(this, arguments)
    }

    function na() {
        na.b2Joint.apply(this, arguments);
        this.constructor === na && this.b2Joint.apply(this, arguments)
    }

    function oa() {
        oa.b2JointDef.apply(this, arguments);
        this.constructor === oa && this.b2JointDef.apply(this, arguments)
    }

    function $a() {
        $a.b2JointEdge.apply(this, arguments)
    }

    function pa() {
        pa.b2LineJoint.apply(this, arguments);
        this.constructor ===
            pa && this.b2LineJoint.apply(this, arguments)
    }

    function qa() {
        qa.b2LineJointDef.apply(this, arguments);
        this.constructor === qa && this.b2LineJointDef.apply(this, arguments)
    }

    function ra() {
        ra.b2MouseJoint.apply(this, arguments);
        this.constructor === ra && this.b2MouseJoint.apply(this, arguments)
    }

    function sa() {
        sa.y107.apply(this, arguments);
        this.constructor === sa && this.y107.apply(this, arguments)
    }

    function ta() {
        ta.b2PrismaticJoint.apply(this, arguments);
        this.constructor === ta && this.b2PrismaticJoint.apply(this, arguments)
    }

    function ua() {
        ua.b2PrismaticJointDef.apply(this,
            arguments);
        this.constructor === ua && this.b2PrismaticJointDef.apply(this, arguments)
    }

    function va() {
        va.b2PulleyJoint.apply(this, arguments);
        this.constructor === va && this.b2PulleyJoint.apply(this, arguments)
    }

    function wa() {
        wa.b2PulleyJointDef.apply(this, arguments);
        this.constructor === wa && this.b2PulleyJointDef.apply(this, arguments)
    }

    function xa() {
        xa.b2RevoluteJoint.apply(this, arguments);
        this.constructor === xa && this.b2RevoluteJoint.apply(this, arguments)
    }

    function ya() {
        ya.b2RevoluteJointDef.apply(this, arguments);
        this.constructor ===
            ya && this.b2RevoluteJointDef.apply(this, arguments)
    }

    function za() {
        za.b2WeldJoint.apply(this, arguments);
        this.constructor === za && this.b2WeldJoint.apply(this, arguments)
    }

    function Aa() {
        Aa.b2WeldJointDef.apply(this, arguments);
        this.constructor === Aa && this.b2WeldJointDef.apply(this, arguments)
    }
    Box2D.Collision.IBroadPhase = "Box2D.Collision.IBroadPhase";
    Box2D.Collision.y106 = c;
    Box2D.Collision.b2Bound = a;
    Box2D.Collision.b2BoundValues = b;
    Box2D.Collision.b2Collision = h;
    Box2D.Collision.b2ContactID = d;
    Box2D.Collision.b2ContactPoint =
        e;
    Box2D.Collision.b2Distance = f;
    Box2D.Collision.b2DistanceInput = g;
    Box2D.Collision.b2DistanceOutput = k;
    Box2D.Collision.b2DistanceProxy = m;
    Box2D.Collision.b2DynamicTree = q;
    Box2D.Collision.b2DynamicTreeBroadPhase = w;
    Box2D.Collision.b2DynamicTreeNode = u;
    Box2D.Collision.b2DynamicTreePair = t;
    Box2D.Collision.b2Manifold = x;
    Box2D.Collision.b2ManifoldPoint = y;
    Box2D.Collision.b2Point = n;
    Box2D.Collision.b2RayCastInput = C;
    Box2D.Collision.b2RayCastOutput = B;
    Box2D.Collision.b2Segment = H;
    Box2D.Collision.b2SeparationFunction =
        E;
    Box2D.Collision.b2Simplex = G;
    Box2D.Collision.b2SimplexCache = D;
    Box2D.Collision.b2SimplexVertex = K;
    Box2D.Collision.b2TimeOfImpact = F;
    Box2D.Collision.b2TOIInput = I;
    Box2D.Collision.y230Manifold = O;
    Box2D.Collision.ClipVertex = L;
    Box2D.Collision.Features = p;
    Box2D.Collision.Shapes.y141 = v;
    Box2D.Collision.Shapes.b2EdgeChainDef = A;
    Box2D.Collision.Shapes.b2EdgeShape = z;
    Box2D.Collision.Shapes.y227 = J;
    Box2D.Collision.Shapes.y271 = N;
    Box2D.Collision.Shapes.b2Shape = P;
    Box2D.Common.b2internal = "Box2D.Common.b2internal";
    Box2D.Common.b2Color =
        s;
    Box2D.Common.b2Settings = r;
    Box2D.Common.Math.b2Mat22 = M;
    Box2D.Common.Math.b2Mat33 = Q;
    Box2D.Common.Math.b2Math = Ba;
    Box2D.Common.Math.b2Sweep = Ca;
    Box2D.Common.Math.b2Transform = R;
    Box2D.Common.Math.y290 = S;
    Box2D.Common.Math.b2Vec3 = T;
    Box2D.Dynamics.y113 = U;
    Box2D.Dynamics.y75 = V;
    Box2D.Dynamics.b2ContactFilter = Da;
    Box2D.Dynamics.b2ContactImpulse = Ea;
    Box2D.Dynamics.b2ContactListener = Fa;
    Box2D.Dynamics.b2ContactManager = W;
    Box2D.Dynamics.y270 = X;
    Box2D.Dynamics.b2DestructionListener = Ga;
    Box2D.Dynamics.b2FilterData = Ha;
    Box2D.Dynamics.y213 =
        Y;
    Box2D.Dynamics.y213Def = Z;
    Box2D.Dynamics.b2Island = $;
    Box2D.Dynamics.b2TimeStep = Ia;
    Box2D.Dynamics.y230 = aa;
    Box2D.Dynamics.Contacts.b2CircleContact = Ja;
    Box2D.Dynamics.Contacts.b2Contact = ba;
    Box2D.Dynamics.Contacts.b2ContactConstraint = ca;
    Box2D.Dynamics.Contacts.b2ContactConstraintPoint = Ka;
    Box2D.Dynamics.Contacts.b2ContactEdge = La;
    Box2D.Dynamics.Contacts.b2ContactFactory = da;
    Box2D.Dynamics.Contacts.b2ContactRegister = Ma;
    Box2D.Dynamics.Contacts.b2ContactResult = Na;
    Box2D.Dynamics.Contacts.b2ContactSolver = ea;
    Box2D.Dynamics.Contacts.b2EdgeAndCircleContact =
        Oa;
    Box2D.Dynamics.Contacts.b2NullContact = fa;
    Box2D.Dynamics.Contacts.b2PolyAndCircleContact = Pa;
    Box2D.Dynamics.Contacts.b2PolyAndEdgeContact = Qa;
    Box2D.Dynamics.Contacts.b2PolygonContact = Ra;
    Box2D.Dynamics.Contacts.b2PositionSolverManifold = ga;
    Box2D.Dynamics.Controllers.b2BuoyancyController = Sa;
    Box2D.Dynamics.Controllers.b2ConstantAccelController = Ta;
    Box2D.Dynamics.Controllers.b2ConstantForceController = Ua;
    Box2D.Dynamics.Controllers.b2Controller = Va;
    Box2D.Dynamics.Controllers.b2ControllerEdge = Wa;
    Box2D.Dynamics.Controllers.b2GravityController =
        Xa;
    Box2D.Dynamics.Controllers.b2TensorDampingController = Ya;
    Box2D.Dynamics.Joints.b2DistanceJoint = ha;
    Box2D.Dynamics.Joints.b2DistanceJointDef = ia;
    Box2D.Dynamics.Joints.b2FrictionJoint = ja;
    Box2D.Dynamics.Joints.b2FrictionJointDef = ka;
    Box2D.Dynamics.Joints.b2GearJoint = la;
    Box2D.Dynamics.Joints.b2GearJointDef = ma;
    Box2D.Dynamics.Joints.b2Jacobian = Za;
    Box2D.Dynamics.Joints.b2Joint = na;
    Box2D.Dynamics.Joints.b2JointDef = oa;
    Box2D.Dynamics.Joints.b2JointEdge = $a;
    Box2D.Dynamics.Joints.b2LineJoint = pa;
    Box2D.Dynamics.Joints.b2LineJointDef =
        qa;
    Box2D.Dynamics.Joints.b2MouseJoint = ra;
    Box2D.Dynamics.Joints.y107 = sa;
    Box2D.Dynamics.Joints.b2PrismaticJoint = ta;
    Box2D.Dynamics.Joints.b2PrismaticJointDef = ua;
    Box2D.Dynamics.Joints.b2PulleyJoint = va;
    Box2D.Dynamics.Joints.b2PulleyJointDef = wa;
    Box2D.Dynamics.Joints.b2RevoluteJoint = xa;
    Box2D.Dynamics.Joints.b2RevoluteJointDef = ya;
    Box2D.Dynamics.Joints.b2WeldJoint = za;
    Box2D.Dynamics.Joints.b2WeldJointDef = Aa
})();
Box2D.postDefs = [];
(function() {
    var c = Box2D.Collision.Shapes.y141,
        a = Box2D.Collision.Shapes.y271,
        b = Box2D.Collision.Shapes.b2Shape,
        h = Box2D.Common.b2Settings,
        d = Box2D.Common.Math.b2Math,
        e = Box2D.Common.Math.b2Sweep,
        f = Box2D.Common.Math.b2Transform,
        g = Box2D.Common.Math.y290,
        k = Box2D.Collision.y106,
        m = Box2D.Collision.b2Bound,
        q = Box2D.Collision.b2BoundValues,
        w = Box2D.Collision.b2Collision,
        u = Box2D.Collision.b2ContactID,
        t = Box2D.Collision.b2ContactPoint,
        x = Box2D.Collision.b2Distance,
        y = Box2D.Collision.b2DistanceInput,
        n = Box2D.Collision.b2DistanceOutput,
        C = Box2D.Collision.b2DistanceProxy,
        B = Box2D.Collision.b2DynamicTree,
        H = Box2D.Collision.b2DynamicTreeBroadPhase,
        E = Box2D.Collision.b2DynamicTreeNode,
        G = Box2D.Collision.b2DynamicTreePair,
        D = Box2D.Collision.b2Manifold,
        K = Box2D.Collision.b2ManifoldPoint,
        F = Box2D.Collision.b2Point,
        I = Box2D.Collision.b2RayCastInput,
        O = Box2D.Collision.b2RayCastOutput,
        L = Box2D.Collision.b2Segment,
        p = Box2D.Collision.b2SeparationFunction,
        v = Box2D.Collision.b2Simplex,
        A = Box2D.Collision.b2SimplexCache,
        z = Box2D.Collision.b2SimplexVertex,
        J = Box2D.Collision.b2TimeOfImpact,
        N = Box2D.Collision.b2TOIInput,
        P = Box2D.Collision.y230Manifold,
        s = Box2D.Collision.ClipVertex,
        r = Box2D.Collision.Features,
        M = Box2D.Collision.IBroadPhase;
    k.y106 = function() {
        this.lowerBound = new g;
        this.upperBound = new g
    };
    k.prototype.IsValid = function() {
        var a = this.upperBound.y - this.lowerBound.y;
        return 0 <= this.upperBound.x - this.lowerBound.x && 0 <= a && this.lowerBound.IsValid() && this.upperBound.IsValid()
    };
    k.prototype.GetCenter = function() {
        return new g((this.lowerBound.x + this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) /
            2)
    };
    k.prototype.GetExtents = function() {
        return new g((this.upperBound.x - this.lowerBound.x) / 2, (this.upperBound.y - this.lowerBound.y) / 2)
    };
    k.prototype.Contains = function(a) {
        return this.lowerBound.x <= a.lowerBound.x && this.lowerBound.y <= a.lowerBound.y && a.upperBound.x <= this.upperBound.x && a.upperBound.y <= this.upperBound.y
    };
    k.prototype.RayCast = function(a, b) {
        var c = -Number.MAX_VALUE,
            s = Number.MAX_VALUE,
            g = b.p1.x,
            d = b.p1.y,
            e = b.p2.x - b.p1.x,
            r = b.p2.y - b.p1.y,
            p = Math.abs(r),
            v = a.normal,
            f = 0,
            A = 0,
            z = 0;
        if (Math.abs(e) < Number.MIN_VALUE) {
            if (g <
                this.lowerBound.x || this.upperBound.x < g) return !1
        } else if (f = 1 / e, A = (this.lowerBound.x - g) * f, f *= this.upperBound.x - g, z = -1, A > f && (z = A, A = f, f = z, z = 1), A > c && (v.x = z, v.y = 0, c = A), s = Math.min(s, f), c > s) return !1;
        if (p < Number.MIN_VALUE) {
            if (d < this.lowerBound.y || this.upperBound.y < d) return !1
        } else if (f = 1 / r, A = (this.lowerBound.y - d) * f, f *= this.upperBound.y - d, z = -1, A > f && (z = A, A = f, f = z, z = 1), A > c && (v.y = z, v.x = 0, c = A), s = Math.min(s, f), c > s) return !1;
        a.fraction = c;
        return !0
    };
    k.prototype.TestOverlap = function(a) {
        var b = a.lowerBound.y - this.upperBound.y,
            c = this.lowerBound.y - a.upperBound.y;
        return 0 < a.lowerBound.x - this.upperBound.x || 0 < b || 0 < this.lowerBound.x - a.upperBound.x || 0 < c ? !1 : !0
    };
    k.Combine = function(a, b) {
        var c = new k;
        c.Combine(a, b);
        return c
    };
    k.prototype.Combine = function(a, b) {
        this.lowerBound.x = Math.min(a.lowerBound.x, b.lowerBound.x);
        this.lowerBound.y = Math.min(a.lowerBound.y, b.lowerBound.y);
        this.upperBound.x = Math.max(a.upperBound.x, b.upperBound.x);
        this.upperBound.y = Math.max(a.upperBound.y, b.upperBound.y)
    };
    m.b2Bound = function() {};
    m.prototype.IsLower =
        function() {
            return 0 == (this.value & 1)
        };
    m.prototype.IsUpper = function() {
        return 1 == (this.value & 1)
    };
    m.prototype.Swap = function(a) {
        var b = this.value,
            c = this.proxy,
            s = this.stabbingCount;
        this.value = a.value;
        this.proxy = a.proxy;
        this.stabbingCount = a.stabbingCount;
        a.value = b;
        a.proxy = c;
        a.stabbingCount = s
    };
    q.b2BoundValues = function() {};
    q.prototype.b2BoundValues = function() {
        this.lowerValues = new Vector_a2j_Number;
        this.lowerValues[0] = 0;
        this.lowerValues[1] = 0;
        this.upperValues = new Vector_a2j_Number;
        this.upperValues[0] = 0;
        this.upperValues[1] =
            0
    };
    w.b2Collision = function() {};
    w.ClipSegmentToLine = function(a, b, c, s) {
        void 0 === s && (s = 0);
        var g, d = 0;
        g = b[0];
        var e = g.v;
        g = b[1];
        var r = g.v,
            p = c.x * e.x + c.y * e.y - s;
        g = c.x * r.x + c.y * r.y - s;
        0 >= p && a[d++].Set(b[0]);
        0 >= g && a[d++].Set(b[1]);
        0 > p * g && (c = p / (p - g), g = a[d], g = g.v, g.x = e.x + c * (r.x - e.x), g.y = e.y + c * (r.y - e.y), g = a[d], g.id = (0 < p ? b[0] : b[1]).id, ++d);
        return d
    };
    w.EdgeSeparation = function(a, b, c, s, g) {
        void 0 === c && (c = 0);
        parseInt(a.m_vertexCount);
        var d = a.m_vertices;
        a = a.m_normals;
        var e = parseInt(s.m_vertexCount),
            r = s.m_vertices,
            p, f;
        p = b.R;
        f = a[c];
        a = p.col1.x * f.x + p.col2.x * f.y;
        s = p.col1.y * f.x + p.col2.y * f.y;
        p = g.R;
        var v = p.col1.x * a + p.col1.y * s;
        p = p.col2.x * a + p.col2.y * s;
        for (var A = 0, z = Number.MAX_VALUE, h = 0; h < e; ++h) f = r[h], f = f.x * v + f.y * p, f < z && (z = f, A = h);
        f = d[c];
        p = b.R;
        c = b.position.x + (p.col1.x * f.x + p.col2.x * f.y);
        b = b.position.y + (p.col1.y * f.x + p.col2.y * f.y);
        f = r[A];
        p = g.R;
        d = g.position.x + (p.col1.x * f.x + p.col2.x * f.y);
        g = g.position.y + (p.col1.y * f.x + p.col2.y * f.y);
        return (d - c) * a + (g - b) * s
    };
    w.FindMaxSeparation = function(a, b, c, s, g) {
        var d = parseInt(b.m_vertexCount),
            e = b.m_normals,
            r, p;
        p = g.R;
        r = s.m_centroid;
        var f = g.position.x + (p.col1.x * r.x + p.col2.x * r.y),
            v = g.position.y + (p.col1.y * r.x + p.col2.y * r.y);
        p = c.R;
        r = b.m_centroid;
        f -= c.position.x + (p.col1.x * r.x + p.col2.x * r.y);
        v -= c.position.y + (p.col1.y * r.x + p.col2.y * r.y);
        p = f * c.R.col1.x + v * c.R.col1.y;
        for (var v = f * c.R.col2.x + v * c.R.col2.y, f = 0, A = -Number.MAX_VALUE, z = 0; z < d; ++z) r = e[z], r = r.x * p + r.y * v, r > A && (A = r, f = z);
        e = w.EdgeSeparation(b, c, f, s, g);
        r = parseInt(0 <= f - 1 ? f - 1 : d - 1);
        p = w.EdgeSeparation(b, c, r, s, g);
        var v = parseInt(f + 1 < d ? f + 1 : 0),
            A = w.EdgeSeparation(b, c, v, s,
                g),
            h = 0,
            M = 0;
        if (p > e && p > A) M = -1, z = r, h = p;
        else if (A > e) M = 1, z = v, h = A;
        else return a[0] = f, e;
        for (;;)
            if (f = -1 == M ? 0 <= z - 1 ? z - 1 : d - 1 : z + 1 < d ? z + 1 : 0, e = w.EdgeSeparation(b, c, f, s, g), e > h) z = f, h = e;
            else break;
        a[0] = z;
        return h
    };
    w.FindIncidentEdge = function(a, b, c, s, g, d) {
        void 0 === s && (s = 0);
        parseInt(b.m_vertexCount);
        var e = b.m_normals,
            r = parseInt(g.m_vertexCount);
        b = g.m_vertices;
        g = g.m_normals;
        var p;
        p = c.R;
        c = e[s];
        var e = p.col1.x * c.x + p.col2.x * c.y,
            f = p.col1.y * c.x + p.col2.y * c.y;
        p = d.R;
        c = p.col1.x * e + p.col1.y * f;
        f = p.col2.x * e + p.col2.y * f;
        e = c;
        p = 0;
        for (var v =
                Number.MAX_VALUE, A = 0; A < r; ++A) c = g[A], c = e * c.x + f * c.y, c < v && (v = c, p = A);
        g = parseInt(p);
        e = parseInt(g + 1 < r ? g + 1 : 0);
        r = a[0];
        c = b[g];
        p = d.R;
        r.v.x = d.position.x + (p.col1.x * c.x + p.col2.x * c.y);
        r.v.y = d.position.y + (p.col1.y * c.x + p.col2.y * c.y);
        r.id.features.referenceEdge = s;
        r.id.features.incidentEdge = g;
        r.id.features.incidentVertex = 0;
        r = a[1];
        c = b[e];
        p = d.R;
        r.v.x = d.position.x + (p.col1.x * c.x + p.col2.x * c.y);
        r.v.y = d.position.y + (p.col1.y * c.x + p.col2.y * c.y);
        r.id.features.referenceEdge = s;
        r.id.features.incidentEdge = e;
        r.id.features.incidentVertex =
            1
    };
    w.MakeClipPointVector = function() {
        var a = new Vector(2);
        a[0] = new s;
        a[1] = new s;
        return a
    };
    w.CollidePolygons = function(a, b, c, s, g) {
        var d;
        a.m_pointCount = 0;
        var e = b.m_radius + s.m_radius;
        w.s_edgeAO[0] = 0;
        var r = w.FindMaxSeparation(w.s_edgeAO, b, c, s, g);
        d = w.s_edgeAO[0];
        if (!(r > e)) {
            var p;
            w.s_edgeBO[0] = 0;
            var f = w.FindMaxSeparation(w.s_edgeBO, s, g, b, c);
            p = w.s_edgeBO[0];
            if (!(f > e)) {
                var v = 0,
                    A = 0;
                f > 0.98 * r + 0.0010 ? (r = s, s = b, b = g, v = p, a.m_type = D.e_faceB, A = 1) : (r = b, b = c, c = g, v = d, a.m_type = D.e_faceA, A = 0);
                d = w.s_incidentEdge;
                w.FindIncidentEdge(d,
                    r, b, v, s, c);
                p = parseInt(r.m_vertexCount);
                g = r.m_vertices;
                var r = g[v],
                    z;
                z = v + 1 < p ? g[parseInt(v + 1)] : g[0];
                v = w.s_localTangent;
                v.Set(z.x - r.x, z.y - r.y);
                v.Normalize();
                g = w.s_localNormal;
                g.x = v.y;
                g.y = -v.x;
                s = w.s_planePoint;
                s.Set(0.5 * (r.x + z.x), 0.5 * (r.y + z.y));
                f = w.s_tangent;
                p = b.R;
                f.x = p.col1.x * v.x + p.col2.x * v.y;
                f.y = p.col1.y * v.x + p.col2.y * v.y;
                var M = w.s_tangent2;
                M.x = -f.x;
                M.y = -f.y;
                v = w.s_normal;
                v.x = f.y;
                v.y = -f.x;
                var k = w.s_v11,
                    n = w.s_v12;
                k.x = b.position.x + (p.col1.x * r.x + p.col2.x * r.y);
                k.y = b.position.y + (p.col1.y * r.x + p.col2.y * r.y);
                n.x = b.position.x + (p.col1.x * z.x + p.col2.x * z.y);
                n.y = b.position.y + (p.col1.y * z.x + p.col2.y * z.y);
                b = v.x * k.x + v.y * k.y;
                p = f.x * n.x + f.y * n.y + e;
                z = w.s_clipPoints1;
                r = w.s_clipPoints2;
                n = w.ClipSegmentToLine(z, d, M, -f.x * k.x - f.y * k.y + e);
                if (!(2 > n || (n = w.ClipSegmentToLine(r, z, f, p), 2 > n))) {
                    a.m_localPlaneNormal.SetV(g);
                    a.m_localPoint.SetV(s);
                    for (s = g = 0; s < h.b2_maxManifoldPoints; ++s) d = r[s], v.x * d.v.x + v.y * d.v.y - b <= e && (f = a.m_points[g], p = c.R, M = d.v.x - c.position.x, k = d.v.y - c.position.y, f.m_localPoint.x = M * p.col1.x + k * p.col1.y, f.m_localPoint.y =
                        M * p.col2.x + k * p.col2.y, f.m_id.Set(d.id), f.m_id.features.flip = A, ++g);
                    a.m_pointCount = g
                }
            }
        }
    };
    w.CollideCircles = function(a, b, c, s, g) {
        a.m_pointCount = 0;
        var d, e;
        d = c.R;
        e = b.m_p;
        var r = c.position.x + (d.col1.x * e.x + d.col2.x * e.y);
        c = c.position.y + (d.col1.y * e.x + d.col2.y * e.y);
        d = g.R;
        e = s.m_p;
        r = g.position.x + (d.col1.x * e.x + d.col2.x * e.y) - r;
        g = g.position.y + (d.col1.y * e.x + d.col2.y * e.y) - c;
        d = b.m_radius + s.m_radius;
        r * r + g * g > d * d || (a.m_type = D.e_circles, a.m_localPoint.SetV(b.m_p), a.m_localPlaneNormal.SetZero(), a.m_pointCount = 1, a.m_points[0].m_localPoint.SetV(s.m_p),
            a.m_points[0].m_id.key = 0)
    };
    w.CollidePolygonAndCircle = function(a, b, c, s, g) {
        var d = a.m_pointCount = 0,
            e = 0,
            r, p;
        p = g.R;
        r = s.m_p;
        var f = g.position.y + (p.col1.y * r.x + p.col2.y * r.y),
            d = g.position.x + (p.col1.x * r.x + p.col2.x * r.y) - c.position.x,
            e = f - c.position.y;
        p = c.R;
        c = d * p.col1.x + e * p.col1.y;
        p = d * p.col2.x + e * p.col2.y;
        var v = 0,
            f = -Number.MAX_VALUE;
        g = b.m_radius + s.m_radius;
        var A = parseInt(b.m_vertexCount),
            z = b.m_vertices;
        b = b.m_normals;
        for (var h = 0; h < A; ++h) {
            r = z[h];
            d = c - r.x;
            e = p - r.y;
            r = b[h];
            d = r.x * d + r.y * e;
            if (d > g) return;
            d > f && (f = d, v = h)
        }
        d =
            parseInt(v);
        e = parseInt(d + 1 < A ? d + 1 : 0);
        r = z[d];
        z = z[e];
        if (f < Number.MIN_VALUE) a.m_pointCount = 1, a.m_type = D.e_faceA, a.m_localPlaneNormal.SetV(b[v]), a.m_localPoint.x = 0.5 * (r.x + z.x), a.m_localPoint.y = 0.5 * (r.y + z.y);
        else if (f = (c - z.x) * (r.x - z.x) + (p - z.y) * (r.y - z.y), 0 >= (c - r.x) * (z.x - r.x) + (p - r.y) * (z.y - r.y)) {
            if ((c - r.x) * (c - r.x) + (p - r.y) * (p - r.y) > g * g) return;
            a.m_pointCount = 1;
            a.m_type = D.e_faceA;
            a.m_localPlaneNormal.x = c - r.x;
            a.m_localPlaneNormal.y = p - r.y;
            a.m_localPlaneNormal.Normalize();
            a.m_localPoint.SetV(r)
        } else if (0 >= f) {
            if ((c -
                    z.x) * (c - z.x) + (p - z.y) * (p - z.y) > g * g) return;
            a.m_pointCount = 1;
            a.m_type = D.e_faceA;
            a.m_localPlaneNormal.x = c - z.x;
            a.m_localPlaneNormal.y = p - z.y;
            a.m_localPlaneNormal.Normalize();
            a.m_localPoint.SetV(z)
        } else {
            v = 0.5 * (r.x + z.x);
            r = 0.5 * (r.y + z.y);
            f = (c - v) * b[d].x + (p - r) * b[d].y;
            if (f > g) return;
            a.m_pointCount = 1;
            a.m_type = D.e_faceA;
            a.m_localPlaneNormal.x = b[d].x;
            a.m_localPlaneNormal.y = b[d].y;
            a.m_localPlaneNormal.Normalize();
            a.m_localPoint.Set(v, r)
        }
        a.m_points[0].m_localPoint.SetV(s.m_p);
        a.m_points[0].m_id.key = 0
    };
    w.TestOverlap =
        function(a, b) {
            var c = b.lowerBound,
                s = a.upperBound,
                g = c.x - s.x,
                d = c.y - s.y,
                c = a.lowerBound,
                s = b.upperBound,
                e = c.y - s.y;
            return 0 < g || 0 < d || 0 < c.x - s.x || 0 < e ? !1 : !0
        };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2Collision.s_incidentEdge = w.MakeClipPointVector();
        Box2D.Collision.b2Collision.s_clipPoints1 = w.MakeClipPointVector();
        Box2D.Collision.b2Collision.s_clipPoints2 = w.MakeClipPointVector();
        Box2D.Collision.b2Collision.s_edgeAO = new Vector_a2j_Number(1);
        Box2D.Collision.b2Collision.s_edgeBO = new Vector_a2j_Number(1);
        Box2D.Collision.b2Collision.s_localTangent = new g;
        Box2D.Collision.b2Collision.s_localNormal = new g;
        Box2D.Collision.b2Collision.s_planePoint = new g;
        Box2D.Collision.b2Collision.s_normal = new g;
        Box2D.Collision.b2Collision.s_tangent = new g;
        Box2D.Collision.b2Collision.s_tangent2 = new g;
        Box2D.Collision.b2Collision.s_v11 = new g;
        Box2D.Collision.b2Collision.s_v12 = new g;
        Box2D.Collision.b2Collision.b2CollidePolyTempVec = new g;
        Box2D.Collision.b2Collision.b2_nullFeature = 255
    });
    u.b2ContactID = function() {
        this.features = new r
    };
    u.prototype.b2ContactID = function() {
        this.features._m_id = this
    };
    u.prototype.Set = function(a) {
        this.key = a._key
    };
    u.prototype.Copy = function() {
        var a = new u;
        a.key = this.key;
        return a
    };
    Object.defineProperty(u.prototype, "key", {
        enumerable: !1,
        configurable: !0,
        get: function() {
            return this._key
        }
    });
    Object.defineProperty(u.prototype, "key", {
        enumerable: !1,
        configurable: !0,
        set: function(a) {
            void 0 === a && (a = 0);
            this._key = a;
            this.features._referenceEdge = this._key & 255;
            this.features._incidentEdge = (this._key & 65280) >> 8 & 255;
            this.features._incidentVertex =
                (this._key & 16711680) >> 16 & 255;
            this.features._flip = (this._key & 4278190080) >> 24 & 255
        }
    });
    t.b2ContactPoint = function() {
        this.position = new g;
        this.velocity = new g;
        this.normal = new g;
        this.id = new u
    };
    x.b2Distance = function() {};
    x.Distance = function(a, b, c) {
        ++x.b2_gjkCalls;
        var s = c.proxyA,
            e = c.proxyB,
            r = c.transformA,
            p = c.transformB,
            f = x.s_simplex;
        f.ReadCache(b, s, r, e, p);
        var v = f.m_vertices,
            z = x.s_saveA,
            A = x.s_saveB,
            M = 0;
        f.GetClosestPoint().LengthSquared();
        for (var k = 0, n, J = 0; 20 > J;) {
            M = f.m_count;
            for (k = 0; k < M; k++) z[k] = v[k].indexA, A[k] =
                v[k].indexB;
            switch (f.m_count) {
                case 1:
                    break;
                case 2:
                    f.Solve2();
                    break;
                case 3:
                    f.Solve3();
                    break;
                default:
                    h.b2Assert(!1)
            }
            if (3 == f.m_count) break;
            n = f.GetClosestPoint();
            n.LengthSquared();
            k = f.GetSearchDirection();
            if (k.LengthSquared() < Number.MIN_VALUE * Number.MIN_VALUE) break;
            n = v[f.m_count];
            n.indexA = s.GetSupport(d.MulTMV(r.R, k.GetNegative()));
            n.wA = d.MulX(r, s.GetVertex(n.indexA));
            n.indexB = e.GetSupport(d.MulTMV(p.R, k));
            n.wB = d.MulX(p, e.GetVertex(n.indexB));
            n.w = d.SubtractVV(n.wB, n.wA);
            ++J;
            ++x.b2_gjkIters;
            for (var P = !1, k = 0; k < M; k++)
                if (n.indexA == z[k] && n.indexB == A[k]) {
                    P = !0;
                    break
                }
            if (P) break;
            ++f.m_count
        }
        x.b2_gjkMaxIters = d.Max(x.b2_gjkMaxIters, J);
        f.GetWitnessPoints(a.pointA, a.pointB);
        a.distance = d.SubtractVV(a.pointA, a.pointB).Length();
        a.iterations = J;
        f.WriteCache(b);
        c.useRadii && (b = s.m_radius, e = e.m_radius, a.distance > b + e && a.distance > Number.MIN_VALUE ? (a.distance -= b + e, c = d.SubtractVV(a.pointB, a.pointA), c.Normalize(), a.pointA.x += b * c.x, a.pointA.y += b * c.y, a.pointB.x -= e * c.x, a.pointB.y -= e * c.y) : (n = new g, n.x = 0.5 * (a.pointA.x + a.pointB.x),
            n.y = 0.5 * (a.pointA.y + a.pointB.y), a.pointA.x = a.pointB.x = n.x, a.pointA.y = a.pointB.y = n.y, a.distance = 0))
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2Distance.s_simplex = new v;
        Box2D.Collision.b2Distance.s_saveA = new Vector_a2j_Number(3);
        Box2D.Collision.b2Distance.s_saveB = new Vector_a2j_Number(3)
    });
    y.b2DistanceInput = function() {};
    n.b2DistanceOutput = function() {
        this.pointA = new g;
        this.pointB = new g
    };
    C.b2DistanceProxy = function() {};
    C.prototype.Set = function(s) {
        switch (s.GetType()) {
            case b.e_circleShape:
                s = s instanceof
                c ? s : null;
                this.m_vertices = new Vector(1, !0);
                this.m_vertices[0] = s.m_p;
                this.m_count = 1;
                this.m_radius = s.m_radius;
                break;
            case b.e_polygonShape:
                s = s instanceof a ? s : null;
                this.m_vertices = s.m_vertices;
                this.m_count = s.m_vertexCount;
                this.m_radius = s.m_radius;
                break;
            default:
                h.b2Assert(!1)
        }
    };
    C.prototype.GetSupport = function(a) {
        for (var b = 0, c = this.m_vertices[0].x * a.x + this.m_vertices[0].y * a.y, s = 1; s < this.m_count; ++s) {
            var g = this.m_vertices[s].x * a.x + this.m_vertices[s].y * a.y;
            g > c && (b = s, c = g)
        }
        return b
    };
    C.prototype.GetSupportVertex =
        function(a) {
            for (var b = 0, c = this.m_vertices[0].x * a.x + this.m_vertices[0].y * a.y, s = 1; s < this.m_count; ++s) {
                var g = this.m_vertices[s].x * a.x + this.m_vertices[s].y * a.y;
                g > c && (b = s, c = g)
            }
            return this.m_vertices[b]
        };
    C.prototype.GetVertexCount = function() {
        return this.m_count
    };
    C.prototype.GetVertex = function(a) {
        void 0 === a && (a = 0);
        h.b2Assert(0 <= a && a < this.m_count);
        return this.m_vertices[a]
    };
    B.b2DynamicTree = function() {};
    B.prototype.b2DynamicTree = function() {
        this.m_freeList = this.m_root = null;
        this.m_insertionCount = this.m_path =
            0
    };
    B.prototype.CreateProxy = function(a, b) {
        var c = this.AllocateNode(),
            s = h.b2_aabbExtension,
            g = h.b2_aabbExtension;
        c.aabb.lowerBound.x = a.lowerBound.x - s;
        c.aabb.lowerBound.y = a.lowerBound.y - g;
        c.aabb.upperBound.x = a.upperBound.x + s;
        c.aabb.upperBound.y = a.upperBound.y + g;
        c.userData = b;
        this.InsertLeaf(c);
        return c
    };
    B.prototype.DestroyProxy = function(a) {
        this.RemoveLeaf(a);
        this.FreeNode(a)
    };
    B.prototype.MoveProxy = function(a, b, c) {
        h.b2Assert(a.IsLeaf());
        if (a.aabb.Contains(b)) return !1;
        this.RemoveLeaf(a);
        var s = h.b2_aabbExtension +
            h.b2_aabbMultiplier * (0 < c.x ? c.x : -c.x);
        c = h.b2_aabbExtension + h.b2_aabbMultiplier * (0 < c.y ? c.y : -c.y);
        a.aabb.lowerBound.x = b.lowerBound.x - s;
        a.aabb.lowerBound.y = b.lowerBound.y - c;
        a.aabb.upperBound.x = b.upperBound.x + s;
        a.aabb.upperBound.y = b.upperBound.y + c;
        this.InsertLeaf(a);
        return !0
    };
    B.prototype.Rebalance = function(a) {
        void 0 === a && (a = 0);
        if (null != this.m_root)
            for (var b = 0; b < a; b++) {
                for (var c = this.m_root, s = 0; !1 == c.IsLeaf();) c = this.m_path >> s & 1 ? c.child2 : c.child1, s = s + 1 & 31;
                ++this.m_path;
                this.RemoveLeaf(c);
                this.InsertLeaf(c)
            }
    };
    B.prototype.GetFatAABB = function(a) {
        return a.aabb
    };
    B.prototype.GetUserData = function(a) {
        return a.userData
    };
    B.prototype.Query = function(a, b) {
        if (null != this.m_root) {
            var c = new Vector,
                s = 0;
            for (c[s++] = this.m_root; 0 < s;) {
                var g = c[--s];
                if (g.aabb.TestOverlap(b))
                    if (g.IsLeaf()) {
                        if (!a(g)) break
                    } else c[s++] = g.child1, c[s++] = g.child2
            }
        }
    };
    B.prototype.RayCast = function(a, b) {
        if (null != this.m_root) {
            var c = b.p1,
                s = b.p2,
                g = d.SubtractVV(c, s);
            g.Normalize();
            var g = d.CrossFV(1, g),
                e = d.AbsV(g),
                r = b.maxFraction,
                p = new k,
                f = 0,
                v = 0,
                f = c.x + r * (s.x -
                    c.x),
                v = c.y + r * (s.y - c.y);
            p.lowerBound.x = Math.min(c.x, f);
            p.lowerBound.y = Math.min(c.y, v);
            p.upperBound.x = Math.max(c.x, f);
            p.upperBound.y = Math.max(c.y, v);
            var z = new Vector,
                A = 0;
            for (z[A++] = this.m_root; 0 < A;)
                if (r = z[--A], !1 != r.aabb.TestOverlap(p) && (f = r.aabb.GetCenter(), v = r.aabb.GetExtents(), !(0 < Math.abs(g.x * (c.x - f.x) + g.y * (c.y - f.y)) - e.x * v.x - e.y * v.y)))
                    if (r.IsLeaf()) {
                        f = new I;
                        f.p1 = b.p1;
                        f.p2 = b.p2;
                        f.maxFraction = b.maxFraction;
                        r = a(f, r);
                        if (0 == r) break;
                        0 < r && (f = c.x + r * (s.x - c.x), v = c.y + r * (s.y - c.y), p.lowerBound.x = Math.min(c.x,
                            f), p.lowerBound.y = Math.min(c.y, v), p.upperBound.x = Math.max(c.x, f), p.upperBound.y = Math.max(c.y, v))
                    } else z[A++] = r.child1, z[A++] = r.child2
        }
    };
    B.prototype.AllocateNode = function() {
        if (this.m_freeList) {
            var a = this.m_freeList;
            this.m_freeList = a.parent;
            a.parent = null;
            a.child1 = null;
            a.child2 = null;
            return a
        }
        return new E
    };
    B.prototype.FreeNode = function(a) {
        a.parent = this.m_freeList;
        this.m_freeList = a
    };
    B.prototype.InsertLeaf = function(a) {
        ++this.m_insertionCount;
        if (null == this.m_root) this.m_root = a, this.m_root.parent = null;
        else {
            var b =
                a.aabb.GetCenter(),
                c = this.m_root;
            if (!1 == c.IsLeaf()) {
                do var s = c.child1,
                    c = c.child2,
                    c = Math.abs((s.aabb.lowerBound.x + s.aabb.upperBound.x) / 2 - b.x) + Math.abs((s.aabb.lowerBound.y + s.aabb.upperBound.y) / 2 - b.y) < Math.abs((c.aabb.lowerBound.x + c.aabb.upperBound.x) / 2 - b.x) + Math.abs((c.aabb.lowerBound.y + c.aabb.upperBound.y) / 2 - b.y) ? s : c; while (!1 == c.IsLeaf())
            }
            b = c.parent;
            s = this.AllocateNode();
            s.parent = b;
            s.userData = null;
            s.aabb.Combine(a.aabb, c.aabb);
            if (b) {
                c.parent.child1 == c ? b.child1 = s : b.child2 = s;
                s.child1 = c;
                s.child2 = a;
                c.parent =
                    s;
                a.parent = s;
                do {
                    if (b.aabb.Contains(s.aabb)) break;
                    b.aabb.Combine(b.child1.aabb, b.child2.aabb);
                    s = b;
                    b = b.parent
                } while (b)
            } else s.child1 = c, s.child2 = a, c.parent = s, this.m_root = a.parent = s
        }
    };
    B.prototype.RemoveLeaf = function(a) {
        if (a == this.m_root) this.m_root = null;
        else {
            var b = a.parent,
                c = b.parent;
            a = b.child1 == a ? b.child2 : b.child1;
            if (c)
                for (c.child1 == b ? c.child1 = a : c.child2 = a, a.parent = c, this.FreeNode(b); c;) {
                    b = c.aabb;
                    c.aabb = k.Combine(c.child1.aabb, c.child2.aabb);
                    if (b.Contains(c.aabb)) break;
                    c = c.parent
                } else this.m_root = a,
                    a.parent = null, this.FreeNode(b)
        }
    };
    H.b2DynamicTreeBroadPhase = function() {
        this.m_tree = new B;
        this.m_moveBuffer = new Vector;
        this.m_pairBuffer = new Vector;
        this.m_pairCount = 0
    };
    H.prototype.CreateProxy = function(a, b) {
        var c = this.m_tree.CreateProxy(a, b);
        ++this.m_proxyCount;
        this.BufferMove(c);
        return c
    };
    H.prototype.DestroyProxy = function(a) {
        this.UnBufferMove(a);
        --this.m_proxyCount;
        this.m_tree.DestroyProxy(a)
    };
    H.prototype.MoveProxy = function(a, b, c) {
        this.m_tree.MoveProxy(a, b, c) && this.BufferMove(a)
    };
    H.prototype.TestOverlap =
        function(a, b) {
            var c = this.m_tree.GetFatAABB(a),
                s = this.m_tree.GetFatAABB(b);
            return c.TestOverlap(s)
        };
    H.prototype.GetUserData = function(a) {
        return this.m_tree.GetUserData(a)
    };
    H.prototype.GetFatAABB = function(a) {
        return this.m_tree.GetFatAABB(a)
    };
    H.prototype.GetProxyCount = function() {
        return this.m_proxyCount
    };
    H.prototype.UpdatePairs = function(a) {
        for (var b = this, c = b.m_pairCount = 0, s, c = 0; c < b.m_moveBuffer.length; ++c) {
            s = b.m_moveBuffer[c];
            var g = b.m_tree.GetFatAABB(s);
            b.m_tree.Query(function(a) {
                if (a == s) return !0;
                b.m_pairCount ==
                    b.m_pairBuffer.length && (b.m_pairBuffer[b.m_pairCount] = new G);
                var c = b.m_pairBuffer[b.m_pairCount];
                c.proxyA = a < s ? a : s;
                c.proxyB = a >= s ? a : s;
                ++b.m_pairCount;
                return !0
            }, g)
        }
        for (c = b.m_moveBuffer.length = 0; c < b.m_pairCount;) {
            var g = b.m_pairBuffer[c],
                d = b.m_tree.GetUserData(g.proxyA),
                e = b.m_tree.GetUserData(g.proxyB);
            a(d, e);
            for (++c; c < b.m_pairCount;) {
                d = b.m_pairBuffer[c];
                if (d.proxyA != g.proxyA || d.proxyB != g.proxyB) break;
                ++c
            }
        }
    };
    H.prototype.Query = function(a, b) {
        this.m_tree.Query(a, b)
    };
    H.prototype.RayCast = function(a, b) {
        this.m_tree.RayCast(a,
            b)
    };
    H.prototype.Validate = function() {};
    H.prototype.Rebalance = function(a) {
        void 0 === a && (a = 0);
        this.m_tree.Rebalance(a)
    };
    H.prototype.BufferMove = function(a) {
        this.m_moveBuffer[this.m_moveBuffer.length] = a
    };
    H.prototype.UnBufferMove = function(a) {
        this.m_moveBuffer.splice(parseInt(this.m_moveBuffer.indexOf(a)), 1)
    };
    H.prototype.ComparePairs = function() {
        return 0
    };
    H.__implements = {};
    H.__implements[M] = !0;
    E.b2DynamicTreeNode = function() {
        this.aabb = new k
    };
    E.prototype.IsLeaf = function() {
        return null == this.child1
    };
    G.b2DynamicTreePair =
        function() {};
    D.b2Manifold = function() {
        this.m_pointCount = 0
    };
    D.prototype.b2Manifold = function() {
        this.m_points = new Vector(h.b2_maxManifoldPoints);
        for (var a = 0; a < h.b2_maxManifoldPoints; a++) this.m_points[a] = new K;
        this.m_localPlaneNormal = new g;
        this.m_localPoint = new g
    };
    D.prototype.Reset = function() {
        for (var a = 0; a < h.b2_maxManifoldPoints; a++)(this.m_points[a] instanceof K ? this.m_points[a] : null).Reset();
        this.m_localPlaneNormal.SetZero();
        this.m_localPoint.SetZero();
        this.m_pointCount = this.m_type = 0
    };
    D.prototype.Set =
        function(a) {
            this.m_pointCount = a.m_pointCount;
            for (var b = 0; b < h.b2_maxManifoldPoints; b++)(this.m_points[b] instanceof K ? this.m_points[b] : null).Set(a.m_points[b]);
            this.m_localPlaneNormal.SetV(a.m_localPlaneNormal);
            this.m_localPoint.SetV(a.m_localPoint);
            this.m_type = a.m_type
        };
    D.prototype.Copy = function() {
        var a = new D;
        a.Set(this);
        return a
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2Manifold.e_circles = 1;
        Box2D.Collision.b2Manifold.e_faceA = 2;
        Box2D.Collision.b2Manifold.e_faceB = 4
    });
    K.b2ManifoldPoint = function() {
        this.m_localPoint =
            new g;
        this.m_id = new u
    };
    K.prototype.b2ManifoldPoint = function() {
        this.Reset()
    };
    K.prototype.Reset = function() {
        this.m_localPoint.SetZero();
        this.m_tangentImpulse = this.m_normalImpulse = 0;
        this.m_id.key = 0
    };
    K.prototype.Set = function(a) {
        this.m_localPoint.SetV(a.m_localPoint);
        this.m_normalImpulse = a.m_normalImpulse;
        this.m_tangentImpulse = a.m_tangentImpulse;
        this.m_id.Set(a.m_id)
    };
    F.b2Point = function() {
        this.p = new g
    };
    F.prototype.Support = function() {
        return this.p
    };
    F.prototype.GetFirstVertex = function() {
        return this.p
    };
    I.b2RayCastInput =
        function() {
            this.p1 = new g;
            this.p2 = new g
        };
    I.prototype.b2RayCastInput = function(a, b, c) {
        void 0 === a && (a = null);
        void 0 === b && (b = null);
        void 0 === c && (c = 1);
        a && this.p1.SetV(a);
        b && this.p2.SetV(b);
        this.maxFraction = c
    };
    O.b2RayCastOutput = function() {
        this.normal = new g
    };
    L.b2Segment = function() {
        this.p1 = new g;
        this.p2 = new g
    };
    L.prototype.TestSegment = function(a, b, c, s) {
        void 0 === s && (s = 0);
        var g = c.p1,
            d = c.p2.x - g.x,
            e = c.p2.y - g.y;
        c = this.p2.y - this.p1.y;
        var r = -(this.p2.x - this.p1.x),
            p = 100 * Number.MIN_VALUE,
            f = -(d * c + e * r);
        if (f > p) {
            var v = g.x -
                this.p1.x,
                z = g.y - this.p1.y,
                g = v * c + z * r;
            if (0 <= g && g <= s * f && (s = -d * z + e * v, -p * f <= s && s <= f * (1 + p))) return g /= f, s = Math.sqrt(c * c + r * r), a[0] = g, b.Set(c / s, r / s), !0
        }
        return !1
    };
    L.prototype.Extend = function(a) {
        this.ExtendForward(a);
        this.ExtendBackward(a)
    };
    L.prototype.ExtendForward = function(a) {
        var b = this.p2.x - this.p1.x,
            c = this.p2.y - this.p1.y;
        a = Math.min(0 < b ? (a.upperBound.x - this.p1.x) / b : 0 > b ? (a.lowerBound.x - this.p1.x) / b : Number.POSITIVE_INFINITY, 0 < c ? (a.upperBound.y - this.p1.y) / c : 0 > c ? (a.lowerBound.y - this.p1.y) / c : Number.POSITIVE_INFINITY);
        this.p2.x = this.p1.x + b * a;
        this.p2.y = this.p1.y + c * a
    };
    L.prototype.ExtendBackward = function(a) {
        var b = -this.p2.x + this.p1.x,
            c = -this.p2.y + this.p1.y;
        a = Math.min(0 < b ? (a.upperBound.x - this.p2.x) / b : 0 > b ? (a.lowerBound.x - this.p2.x) / b : Number.POSITIVE_INFINITY, 0 < c ? (a.upperBound.y - this.p2.y) / c : 0 > c ? (a.lowerBound.y - this.p2.y) / c : Number.POSITIVE_INFINITY);
        this.p1.x = this.p2.x + b * a;
        this.p1.y = this.p2.y + c * a
    };
    p.b2SeparationFunction = function() {
        this.m_localPoint = new g;
        this.m_axis = new g
    };
    p.prototype.Initialize = function(a, b, c, s, e) {
        this.m_proxyA =
            b;
        this.m_proxyB = s;
        var r = parseInt(a.count);
        h.b2Assert(0 < r && 3 > r);
        var f, v, z, A, M = 0,
            k = 0;
        1 == r ? (this.m_type = p.e_points, f = this.m_proxyA.GetVertex(a.indexA[0]), v = this.m_proxyB.GetVertex(a.indexB[0]), r = f, a = c.R, b = c.position.x + (a.col1.x * r.x + a.col2.x * r.y), s = c.position.y + (a.col1.y * r.x + a.col2.y * r.y), r = v, a = e.R, z = e.position.x + (a.col1.x * r.x + a.col2.x * r.y), A = e.position.y + (a.col1.y * r.x + a.col2.y * r.y), this.m_axis.x = z - b, this.m_axis.y = A - s, this.m_axis.Normalize()) : (a.indexB[0] == a.indexB[1] ? (this.m_type = p.e_faceA, b = this.m_proxyA.GetVertex(a.indexA[0]),
            s = this.m_proxyA.GetVertex(a.indexA[1]), v = this.m_proxyB.GetVertex(a.indexB[0]), this.m_localPoint.x = 0.5 * (b.x + s.x), this.m_localPoint.y = 0.5 * (b.y + s.y), this.m_axis = d.CrossVF(d.SubtractVV(s, b), 1), this.m_axis.Normalize(), r = this.m_axis, a = c.R, M = a.col1.x * r.x + a.col2.x * r.y, k = a.col1.y * r.x + a.col2.y * r.y, r = this.m_localPoint, a = c.R, b = c.position.x + (a.col1.x * r.x + a.col2.x * r.y), s = c.position.y + (a.col1.y * r.x + a.col2.y * r.y), r = v, a = e.R, z = e.position.x + (a.col1.x * r.x + a.col2.x * r.y), A = e.position.y + (a.col1.y * r.x + a.col2.y * r.y), M = (z -
                b) * M + (A - s) * k) : a.indexA[0] == a.indexA[0] ? (this.m_type = p.e_faceB, z = this.m_proxyB.GetVertex(a.indexB[0]), A = this.m_proxyB.GetVertex(a.indexB[1]), f = this.m_proxyA.GetVertex(a.indexA[0]), this.m_localPoint.x = 0.5 * (z.x + A.x), this.m_localPoint.y = 0.5 * (z.y + A.y), this.m_axis = d.CrossVF(d.SubtractVV(A, z), 1), this.m_axis.Normalize(), r = this.m_axis, a = e.R, M = a.col1.x * r.x + a.col2.x * r.y, k = a.col1.y * r.x + a.col2.y * r.y, r = this.m_localPoint, a = e.R, z = e.position.x + (a.col1.x * r.x + a.col2.x * r.y), A = e.position.y + (a.col1.y * r.x + a.col2.y * r.y),
            r = f, a = c.R, b = c.position.x + (a.col1.x * r.x + a.col2.x * r.y), s = c.position.y + (a.col1.y * r.x + a.col2.y * r.y), M = (b - z) * M + (s - A) * k) : (b = this.m_proxyA.GetVertex(a.indexA[0]), s = this.m_proxyA.GetVertex(a.indexA[1]), z = this.m_proxyB.GetVertex(a.indexB[0]), A = this.m_proxyB.GetVertex(a.indexB[1]), d.MulX(c, f), f = d.MulMV(c.R, d.SubtractVV(s, b)), d.MulX(e, v), M = d.MulMV(e.R, d.SubtractVV(A, z)), e = f.x * f.x + f.y * f.y, v = M.x * M.x + M.y * M.y, a = d.SubtractVV(M, f), c = f.x * a.x + f.y * a.y, a = M.x * a.x + M.y * a.y, f = f.x * M.x + f.y * M.y, k = e * v - f * f, M = 0, 0 != k && (M = d.Clamp((f *
            a - c * v) / k, 0, 1)), 0 > (f * M + a) / v && (M = d.Clamp((f - c) / e, 0, 1)), f = new g, f.x = b.x + M * (s.x - b.x), f.y = b.y + M * (s.y - b.y), v = new g, v.x = z.x + M * (A.x - z.x), v.y = z.y + M * (A.y - z.y), 0 == M || 1 == M ? (this.m_type = p.e_faceB, this.m_axis = d.CrossVF(d.SubtractVV(A, z), 1), this.m_axis.Normalize(), this.m_localPoint = v) : (this.m_type = p.e_faceA, this.m_axis = d.CrossVF(d.SubtractVV(s, b), 1), this.m_localPoint = f)), 0 > M && this.m_axis.NegativeSelf())
    };
    p.prototype.Evaluate = function(a, b) {
        var c, s, g = 0;
        switch (this.m_type) {
            case p.e_points:
                return c = d.MulTMV(a.R, this.m_axis),
                    s = d.MulTMV(b.R, this.m_axis.GetNegative()), c = this.m_proxyA.GetSupportVertex(c), s = this.m_proxyB.GetSupportVertex(s), c = d.MulX(a, c), s = d.MulX(b, s), (s.x - c.x) * this.m_axis.x + (s.y - c.y) * this.m_axis.y;
            case p.e_faceA:
                return g = d.MulMV(a.R, this.m_axis), c = d.MulX(a, this.m_localPoint), s = d.MulTMV(b.R, g.GetNegative()), s = this.m_proxyB.GetSupportVertex(s), s = d.MulX(b, s), (s.x - c.x) * g.x + (s.y - c.y) * g.y;
            case p.e_faceB:
                return g = d.MulMV(b.R, this.m_axis), s = d.MulX(b, this.m_localPoint), c = d.MulTMV(a.R, g.GetNegative()), c = this.m_proxyA.GetSupportVertex(c),
                    c = d.MulX(a, c), (c.x - s.x) * g.x + (c.y - s.y) * g.y;
            default:
                return h.b2Assert(!1), 0
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2SeparationFunction.e_points = 1;
        Box2D.Collision.b2SeparationFunction.e_faceA = 2;
        Box2D.Collision.b2SeparationFunction.e_faceB = 4
    });
    v.b2Simplex = function() {
        this.m_v1 = new z;
        this.m_v2 = new z;
        this.m_v3 = new z;
        this.m_vertices = new Vector(3)
    };
    v.prototype.b2Simplex = function() {
        this.m_vertices[0] = this.m_v1;
        this.m_vertices[1] = this.m_v2;
        this.m_vertices[2] = this.m_v3
    };
    v.prototype.ReadCache = function(a,
        b, c, s, g) {
        h.b2Assert(0 <= a.count && 3 >= a.count);
        var e, r;
        this.m_count = a.count;
        for (var p = this.m_vertices, f = 0; f < this.m_count; f++) {
            var v = p[f];
            v.indexA = a.indexA[f];
            v.indexB = a.indexB[f];
            e = b.GetVertex(v.indexA);
            r = s.GetVertex(v.indexB);
            v.wA = d.MulX(c, e);
            v.wB = d.MulX(g, r);
            v.w = d.SubtractVV(v.wB, v.wA);
            v.a = 0
        }
        1 < this.m_count && (a = a.metric, e = this.GetMetric(), e < 0.5 * a || 2 * a < e || e < Number.MIN_VALUE) && (this.m_count = 0);
        0 == this.m_count && (v = p[0], v.indexA = 0, v.indexB = 0, e = b.GetVertex(0), r = s.GetVertex(0), v.wA = d.MulX(c, e), v.wB = d.MulX(g,
            r), v.w = d.SubtractVV(v.wB, v.wA), this.m_count = 1)
    };
    v.prototype.WriteCache = function(a) {
        a.metric = this.GetMetric();
        a.count = Box2D.parseUInt(this.m_count);
        for (var b = this.m_vertices, c = 0; c < this.m_count; c++) a.indexA[c] = Box2D.parseUInt(b[c].indexA), a.indexB[c] = Box2D.parseUInt(b[c].indexB)
    };
    v.prototype.GetSearchDirection = function() {
        switch (this.m_count) {
            case 1:
                return this.m_v1.w.GetNegative();
            case 2:
                var a = d.SubtractVV(this.m_v2.w, this.m_v1.w);
                return 0 < d.CrossVV(a, this.m_v1.w.GetNegative()) ? d.CrossFV(1, a) : d.CrossVF(a,
                    1);
            default:
                return h.b2Assert(!1), new g
        }
    };
    v.prototype.GetClosestPoint = function() {
        switch (this.m_count) {
            case 0:
                return h.b2Assert(!1), new g;
            case 1:
                return this.m_v1.w;
            case 2:
                return new g(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
            default:
                return h.b2Assert(!1), new g
        }
    };
    v.prototype.GetWitnessPoints = function(a, b) {
        switch (this.m_count) {
            case 0:
                h.b2Assert(!1);
                break;
            case 1:
                a.SetV(this.m_v1.wA);
                b.SetV(this.m_v1.wB);
                break;
            case 2:
                a.x = this.m_v1.a * this.m_v1.wA.x +
                    this.m_v2.a * this.m_v2.wA.x;
                a.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y;
                b.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x;
                b.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
                break;
            case 3:
                b.x = a.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x;
                b.y = a.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
                break;
            default:
                h.b2Assert(!1)
        }
    };
    v.prototype.GetMetric = function() {
        switch (this.m_count) {
            case 0:
                return h.b2Assert(!1),
                    0;
            case 1:
                return 0;
            case 2:
                return d.SubtractVV(this.m_v1.w, this.m_v2.w).Length();
            case 3:
                return d.CrossVV(d.SubtractVV(this.m_v2.w, this.m_v1.w), d.SubtractVV(this.m_v3.w, this.m_v1.w));
            default:
                return h.b2Assert(!1), 0
        }
    };
    v.prototype.Solve2 = function() {
        var a = this.m_v1.w,
            b = this.m_v2.w,
            c = d.SubtractVV(b, a),
            a = -(a.x * c.x + a.y * c.y);
        0 >= a ? this.m_count = this.m_v1.a = 1 : (b = b.x * c.x + b.y * c.y, 0 >= b ? (this.m_count = this.m_v2.a = 1, this.m_v1.Set(this.m_v2)) : (c = 1 / (b + a), this.m_v1.a = b * c, this.m_v2.a = a * c, this.m_count = 2))
    };
    v.prototype.Solve3 =
        function() {
            var a = this.m_v1.w,
                b = this.m_v2.w,
                c = this.m_v3.w,
                s = d.SubtractVV(b, a),
                g = d.Dot(a, s),
                e = d.Dot(b, s),
                g = -g,
                r = d.SubtractVV(c, a),
                p = d.Dot(a, r),
                f = d.Dot(c, r),
                p = -p,
                v = d.SubtractVV(c, b),
                z = d.Dot(b, v),
                v = d.Dot(c, v),
                z = -z,
                r = d.CrossVV(s, r),
                s = r * d.CrossVV(b, c),
                c = r * d.CrossVV(c, a),
                a = r * d.CrossVV(a, b);
            0 >= g && 0 >= p ? this.m_count = this.m_v1.a = 1 : 0 < e && 0 < g && 0 >= a ? (f = 1 / (e + g), this.m_v1.a = e * f, this.m_v2.a = g * f, this.m_count = 2) : 0 < f && 0 < p && 0 >= c ? (e = 1 / (f + p), this.m_v1.a = f * e, this.m_v3.a = p * e, this.m_count = 2, this.m_v2.Set(this.m_v3)) : 0 >= e &&
                0 >= z ? (this.m_count = this.m_v2.a = 1, this.m_v1.Set(this.m_v2)) : 0 >= f && 0 >= v ? (this.m_count = this.m_v3.a = 1, this.m_v1.Set(this.m_v3)) : 0 < v && 0 < z && 0 >= s ? (e = 1 / (v + z), this.m_v2.a = v * e, this.m_v3.a = z * e, this.m_count = 2, this.m_v1.Set(this.m_v3)) : (e = 1 / (s + c + a), this.m_v1.a = s * e, this.m_v2.a = c * e, this.m_v3.a = a * e, this.m_count = 3)
        };
    A.b2SimplexCache = function() {
        this.indexA = new Vector_a2j_Number(3);
        this.indexB = new Vector_a2j_Number(3)
    };
    z.b2SimplexVertex = function() {};
    z.prototype.Set = function(a) {
        this.wA.SetV(a.wA);
        this.wB.SetV(a.wB);
        this.w.SetV(a.w);
        this.a = a.a;
        this.indexA = a.indexA;
        this.indexB = a.indexB
    };
    J.b2TimeOfImpact = function() {};
    J.TimeOfImpact = function(a) {
        ++J.b2_toiCalls;
        var b = a.proxyA,
            c = a.proxyB,
            s = a.sweepA,
            g = a.sweepB;
        h.b2Assert(s.t0 == g.t0);
        h.b2Assert(1 - s.t0 > Number.MIN_VALUE);
        var e = b.m_radius + c.m_radius;
        a = a.tolerance;
        var r = 0,
            p = 0,
            f = 0;
        J.s_cache.count = 0;
        for (J.s_distanceInput.useRadii = !1;;) {
            s.GetTransform(J.s_xfA, r);
            g.GetTransform(J.s_xfB, r);
            J.s_distanceInput.proxyA = b;
            J.s_distanceInput.proxyB = c;
            J.s_distanceInput.transformA = J.s_xfA;
            J.s_distanceInput.transformB = J.s_xfB;
            x.Distance(J.s_distanceOutput, J.s_cache, J.s_distanceInput);
            if (0 >= J.s_distanceOutput.distance) {
                r = 1;
                break
            }
            J.s_fcn.Initialize(J.s_cache, b, J.s_xfA, c, J.s_xfB);
            var v = J.s_fcn.Evaluate(J.s_xfA, J.s_xfB);
            if (0 >= v) {
                r = 1;
                break
            }
            0 == p && (f = v > e ? d.Max(e - a, 0.75 * e) : d.Max(v - a, 0.02 * e));
            if (v - f < 0.5 * a) {
                if (0 == p) {
                    r = 1;
                    break
                }
                break
            }
            var z = r,
                A = r,
                M = 1;
            s.GetTransform(J.s_xfA, M);
            g.GetTransform(J.s_xfB, M);
            var k = J.s_fcn.Evaluate(J.s_xfA, J.s_xfB);
            if (k >= f) {
                r = 1;
                break
            }
            for (var n = 0;;) {
                var P = 0,
                    P = n & 1 ? A + (f - v) *
                    (M - A) / (k - v) : 0.5 * (A + M);
                s.GetTransform(J.s_xfA, P);
                g.GetTransform(J.s_xfB, P);
                var N = J.s_fcn.Evaluate(J.s_xfA, J.s_xfB);
                if (d.Abs(N - f) < 0.025 * a) {
                    z = P;
                    break
                }
                N > f ? (A = P, v = N) : (M = P, k = N);
                ++n;
                ++J.b2_toiRootIters;
                if (50 == n) break
            }
            J.b2_toiMaxRootIters = d.Max(J.b2_toiMaxRootIters, n);
            if (z < (1 + 100 * Number.MIN_VALUE) * r) break;
            r = z;
            p++;
            ++J.b2_toiIters;
            if (1E3 == p) break
        }
        J.b2_toiMaxIters = d.Max(J.b2_toiMaxIters, p);
        return r
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.b2TimeOfImpact.b2_toiCalls = 0;
        Box2D.Collision.b2TimeOfImpact.b2_toiIters =
            0;
        Box2D.Collision.b2TimeOfImpact.b2_toiMaxIters = 0;
        Box2D.Collision.b2TimeOfImpact.b2_toiRootIters = 0;
        Box2D.Collision.b2TimeOfImpact.b2_toiMaxRootIters = 0;
        Box2D.Collision.b2TimeOfImpact.s_cache = new A;
        Box2D.Collision.b2TimeOfImpact.s_distanceInput = new y;
        Box2D.Collision.b2TimeOfImpact.s_xfA = new f;
        Box2D.Collision.b2TimeOfImpact.s_xfB = new f;
        Box2D.Collision.b2TimeOfImpact.s_fcn = new p;
        Box2D.Collision.b2TimeOfImpact.s_distanceOutput = new n
    });
    N.b2TOIInput = function() {
        this.proxyA = new C;
        this.proxyB = new C;
        this.sweepA =
            new e;
        this.sweepB = new e
    };
    P.y230Manifold = function() {
        this.m_normal = new g
    };
    P.prototype.y230Manifold = function() {
        this.m_points = new Vector(h.b2_maxManifoldPoints);
        for (var a = 0; a < h.b2_maxManifoldPoints; a++) this.m_points[a] = new g
    };
    P.prototype.Initialize = function(a, b, c, s, g) {
        void 0 === c && (c = 0);
        void 0 === g && (g = 0);
        if (0 != a.m_pointCount) {
            var e = 0,
                r, d, p = 0,
                f = 0,
                v = 0,
                z = 0,
                A = 0;
            switch (a.m_type) {
                case D.e_circles:
                    d = b.R;
                    r = a.m_localPoint;
                    e = b.position.x + d.col1.x * r.x + d.col2.x * r.y;
                    b = b.position.y + d.col1.y * r.x + d.col2.y * r.y;
                    d = s.R;
                    r =
                        a.m_points[0].m_localPoint;
                    a = s.position.x + d.col1.x * r.x + d.col2.x * r.y;
                    s = s.position.y + d.col1.y * r.x + d.col2.y * r.y;
                    r = a - e;
                    d = s - b;
                    p = r * r + d * d;
                    p > Number.MIN_VALUE * Number.MIN_VALUE ? (p = Math.sqrt(p), this.m_normal.x = r / p, this.m_normal.y = d / p) : (this.m_normal.x = 1, this.m_normal.y = 0);
                    r = b + c * this.m_normal.y;
                    s -= g * this.m_normal.y;
                    this.m_points[0].x = 0.5 * (e + c * this.m_normal.x + (a - g * this.m_normal.x));
                    this.m_points[0].y = 0.5 * (r + s);
                    break;
                case D.e_faceA:
                    d = b.R;
                    r = a.m_localPlaneNormal;
                    p = d.col1.x * r.x + d.col2.x * r.y;
                    f = d.col1.y * r.x + d.col2.y *
                        r.y;
                    d = b.R;
                    r = a.m_localPoint;
                    v = b.position.x + d.col1.x * r.x + d.col2.x * r.y;
                    z = b.position.y + d.col1.y * r.x + d.col2.y * r.y;
                    this.m_normal.x = p;
                    this.m_normal.y = f;
                    for (e = 0; e < a.m_pointCount; e++) d = s.R, r = a.m_points[e].m_localPoint, A = s.position.x + d.col1.x * r.x + d.col2.x * r.y, r = s.position.y + d.col1.y * r.x + d.col2.y * r.y, this.m_points[e].x = A + 0.5 * (c - (A - v) * p - (r - z) * f - g) * p, this.m_points[e].y = r + 0.5 * (c - (A - v) * p - (r - z) * f - g) * f;
                    break;
                case D.e_faceB:
                    for (d = s.R, r = a.m_localPlaneNormal, p = d.col1.x * r.x + d.col2.x * r.y, f = d.col1.y * r.x + d.col2.y * r.y, d =
                        s.R, r = a.m_localPoint, v = s.position.x + d.col1.x * r.x + d.col2.x * r.y, z = s.position.y + d.col1.y * r.x + d.col2.y * r.y, this.m_normal.x = -p, this.m_normal.y = -f, e = 0; e < a.m_pointCount; e++) d = b.R, r = a.m_points[e].m_localPoint, A = b.position.x + d.col1.x * r.x + d.col2.x * r.y, r = b.position.y + d.col1.y * r.x + d.col2.y * r.y, this.m_points[e].x = A + 0.5 * (g - (A - v) * p - (r - z) * f - c) * p, this.m_points[e].y = r + 0.5 * (g - (A - v) * p - (r - z) * f - c) * f
            }
        }
    };
    s.ClipVertex = function() {
        this.v = new g;
        this.id = new u
    };
    s.prototype.Set = function(a) {
        this.v.SetV(a.v);
        this.id.Set(a.id)
    };
    r.Features =
        function() {};
    Object.defineProperty(r.prototype, "referenceEdge", {
        enumerable: !1,
        configurable: !0,
        get: function() {
            return this._referenceEdge
        }
    });
    Object.defineProperty(r.prototype, "referenceEdge", {
        enumerable: !1,
        configurable: !0,
        set: function(a) {
            void 0 === a && (a = 0);
            this._referenceEdge = a;
            this._m_id._key = this._m_id._key & 4294967040 | this._referenceEdge & 255
        }
    });
    Object.defineProperty(r.prototype, "incidentEdge", {
        enumerable: !1,
        configurable: !0,
        get: function() {
            return this._incidentEdge
        }
    });
    Object.defineProperty(r.prototype,
        "incidentEdge", {
            enumerable: !1,
            configurable: !0,
            set: function(a) {
                void 0 === a && (a = 0);
                this._incidentEdge = a;
                this._m_id._key = this._m_id._key & 4294902015 | this._incidentEdge << 8 & 65280
            }
        });
    Object.defineProperty(r.prototype, "incidentVertex", {
        enumerable: !1,
        configurable: !0,
        get: function() {
            return this._incidentVertex
        }
    });
    Object.defineProperty(r.prototype, "incidentVertex", {
        enumerable: !1,
        configurable: !0,
        set: function(a) {
            void 0 === a && (a = 0);
            this._incidentVertex = a;
            this._m_id._key = this._m_id._key & 4278255615 | this._incidentVertex <<
                16 & 16711680
        }
    });
    Object.defineProperty(r.prototype, "flip", {
        enumerable: !1,
        configurable: !0,
        get: function() {
            return this._flip
        }
    });
    Object.defineProperty(r.prototype, "flip", {
        enumerable: !1,
        configurable: !0,
        set: function(a) {
            void 0 === a && (a = 0);
            this._flip = a;
            this._m_id._key = this._m_id._key & 16777215 | this._flip << 24 & 4278190080
        }
    })
})();
(function() {
    var c = Box2D.Common.b2Settings,
        a = Box2D.Collision.Shapes.y141,
        b = Box2D.Collision.Shapes.b2EdgeChainDef,
        h = Box2D.Collision.Shapes.b2EdgeShape,
        d = Box2D.Collision.Shapes.y227,
        e = Box2D.Collision.Shapes.y271,
        f = Box2D.Collision.Shapes.b2Shape,
        g = Box2D.Common.Math.b2Mat22,
        k = Box2D.Common.Math.b2Math,
        m = Box2D.Common.Math.b2Transform,
        q = Box2D.Common.Math.y290,
        w = Box2D.Collision.b2Distance,
        u = Box2D.Collision.b2DistanceInput,
        t = Box2D.Collision.b2DistanceOutput,
        x = Box2D.Collision.b2DistanceProxy,
        y = Box2D.Collision.b2SimplexCache;
    Box2D.inherit(a, Box2D.Collision.Shapes.b2Shape);
    a.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
    a.y141 = function() {
        Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
        this.m_p = new q
    };
    a.prototype.Copy = function() {
        var b = new a;
        b.Set(this);
        return b
    };
    a.prototype.Set = function(b) {
        this.__super.Set.call(this, b);
        Box2D.is(b, a) && this.m_p.SetV((b instanceof a ? b : null).m_p)
    };
    a.prototype.TestPoint = function(a, b) {
        var c = a.R,
            g = a.position.x + (c.col1.x * this.m_p.x + c.col2.x * this.m_p.y),
            c = a.position.y +
            (c.col1.y * this.m_p.x + c.col2.y * this.m_p.y),
            g = b.x - g,
            c = b.y - c;
        return g * g + c * c <= this.m_radius * this.m_radius
    };
    a.prototype.RayCast = function(a, b, c) {
        var g = c.R,
            d = b.p1.x - (c.position.x + (g.col1.x * this.m_p.x + g.col2.x * this.m_p.y));
        c = b.p1.y - (c.position.y + (g.col1.y * this.m_p.x + g.col2.y * this.m_p.y));
        var g = b.p2.x - b.p1.x,
            e = b.p2.y - b.p1.y,
            f = d * g + c * e,
            h = g * g + e * e,
            k = f * f - h * (d * d + c * c - this.m_radius * this.m_radius);
        if (0 > k || h < Number.MIN_VALUE) return !1;
        f = -(f + Math.sqrt(k));
        return 0 <= f && f <= b.maxFraction * h ? (f /= h, a.fraction = f, a.normal.x =
            d + f * g, a.normal.y = c + f * e, a.normal.Normalize(), !0) : !1
    };
    a.prototype.ComputeAABB = function(a, b) {
        var c = b.R,
            g = b.position.x + (c.col1.x * this.m_p.x + c.col2.x * this.m_p.y),
            c = b.position.y + (c.col1.y * this.m_p.x + c.col2.y * this.m_p.y);
        a.lowerBound.Set(g - this.m_radius, c - this.m_radius);
        a.upperBound.Set(g + this.m_radius, c + this.m_radius)
    };
    a.prototype.ComputeMass = function(a, b) {
        void 0 === b && (b = 0);
        a.mass = b * c.b2_pi * this.m_radius * this.m_radius;
        a.center.SetV(this.m_p);
        a.I = a.mass * (0.5 * this.m_radius * this.m_radius + (this.m_p.x * this.m_p.x +
            this.m_p.y * this.m_p.y))
    };
    a.prototype.ComputeSubmergedArea = function(a, b, c, g) {
        void 0 === b && (b = 0);
        c = k.MulX(c, this.m_p);
        var d = -(k.Dot(a, c) - b);
        if (d < -this.m_radius + Number.MIN_VALUE) return 0;
        if (d > this.m_radius) return g.SetV(c), Math.PI * this.m_radius * this.m_radius;
        b = this.m_radius * this.m_radius;
        var e = d * d,
            d = b * (Math.asin(d / this.m_radius) + Math.PI / 2) + d * Math.sqrt(b - e);
        b = -2 / 3 * Math.pow(b - e, 1.5) / d;
        g.x = c.x + a.x * b;
        g.y = c.y + a.y * b;
        return d
    };
    a.prototype.GetLocalPosition = function() {
        return this.m_p
    };
    a.prototype.SetLocalPosition =
        function(a) {
            this.m_p.SetV(a)
        };
    a.prototype.GetRadius = function() {
        return this.m_radius
    };
    a.prototype.SetRadius = function(a) {
        void 0 === a && (a = 0);
        this.m_radius = a
    };
    a.prototype.y141 = function(a) {
        void 0 === a && (a = 0);
        this.__super.b2Shape.call(this);
        this.m_type = f.e_circleShape;
        this.m_radius = a
    };
    b.b2EdgeChainDef = function() {};
    b.prototype.b2EdgeChainDef = function() {
        this.vertexCount = 0;
        this.isALoop = !0;
        this.vertices = []
    };
    Box2D.inherit(h, Box2D.Collision.Shapes.b2Shape);
    h.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
    h.b2EdgeShape = function() {
        Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
        this.s_supportVec = new q;
        this.m_v1 = new q;
        this.m_v2 = new q;
        this.m_coreV1 = new q;
        this.m_coreV2 = new q;
        this.m_normal = new q;
        this.m_direction = new q;
        this.m_cornerDir1 = new q;
        this.m_cornerDir2 = new q
    };
    h.prototype.TestPoint = function() {
        return !1
    };
    h.prototype.RayCast = function(a, b, c) {
        var g, d = b.p2.x - b.p1.x,
            e = b.p2.y - b.p1.y;
        g = c.R;
        var f = c.position.x + (g.col1.x * this.m_v1.x + g.col2.x * this.m_v1.y),
            h = c.position.y + (g.col1.y * this.m_v1.x + g.col2.y *
                this.m_v1.y),
            k = c.position.y + (g.col1.y * this.m_v2.x + g.col2.y * this.m_v2.y) - h;
        c = -(c.position.x + (g.col1.x * this.m_v2.x + g.col2.x * this.m_v2.y) - f);
        g = 100 * Number.MIN_VALUE;
        var m = -(d * k + e * c);
        if (m > g) {
            var f = b.p1.x - f,
                q = b.p1.y - h,
                h = f * k + q * c;
            if (0 <= h && h <= b.maxFraction * m && (b = -d * q + e * f, -g * m <= b && b <= m * (1 + g))) return a.fraction = h / m, b = Math.sqrt(k * k + c * c), a.normal.x = k / b, a.normal.y = c / b, !0
        }
        return !1
    };
    h.prototype.ComputeAABB = function(a, b) {
        var c = b.R,
            g = b.position.x + (c.col1.x * this.m_v1.x + c.col2.x * this.m_v1.y),
            d = b.position.y + (c.col1.y *
                this.m_v1.x + c.col2.y * this.m_v1.y),
            e = b.position.x + (c.col1.x * this.m_v2.x + c.col2.x * this.m_v2.y),
            c = b.position.y + (c.col1.y * this.m_v2.x + c.col2.y * this.m_v2.y);
        g < e ? (a.lowerBound.x = g, a.upperBound.x = e) : (a.lowerBound.x = e, a.upperBound.x = g);
        d < c ? (a.lowerBound.y = d, a.upperBound.y = c) : (a.lowerBound.y = c, a.upperBound.y = d)
    };
    h.prototype.ComputeMass = function(a) {
        a.mass = 0;
        a.center.SetV(this.m_v1);
        a.I = 0
    };
    h.prototype.ComputeSubmergedArea = function(a, b, c, g) {
        void 0 === b && (b = 0);
        var d = new q(a.x * b, a.y * b),
            e = k.MulX(c, this.m_v1);
        c = k.MulX(c,
            this.m_v2);
        var f = k.Dot(a, e) - b;
        a = k.Dot(a, c) - b;
        if (0 < f) {
            if (0 < a) return 0;
            e.x = -a / (f - a) * e.x + f / (f - a) * c.x;
            e.y = -a / (f - a) * e.y + f / (f - a) * c.y
        } else 0 < a && (c.x = -a / (f - a) * e.x + f / (f - a) * c.x, c.y = -a / (f - a) * e.y + f / (f - a) * c.y);
        g.x = (d.x + e.x + c.x) / 3;
        g.y = (d.y + e.y + c.y) / 3;
        return 0.5 * ((e.x - d.x) * (c.y - d.y) - (e.y - d.y) * (c.x - d.x))
    };
    h.prototype.GetLength = function() {
        return this.m_length
    };
    h.prototype.GetVertex1 = function() {
        return this.m_v1
    };
    h.prototype.GetVertex2 = function() {
        return this.m_v2
    };
    h.prototype.GetCoreVertex1 = function() {
        return this.m_coreV1
    };
    h.prototype.GetCoreVertex2 = function() {
        return this.m_coreV2
    };
    h.prototype.GetNormalVector = function() {
        return this.m_normal
    };
    h.prototype.GetDirectionVector = function() {
        return this.m_direction
    };
    h.prototype.GetCorner1Vector = function() {
        return this.m_cornerDir1
    };
    h.prototype.GetCorner2Vector = function() {
        return this.m_cornerDir2
    };
    h.prototype.Corner1IsConvex = function() {
        return this.m_cornerConvex1
    };
    h.prototype.Corner2IsConvex = function() {
        return this.m_cornerConvex2
    };
    h.prototype.GetFirstVertex = function(a) {
        var b =
            a.R;
        return new q(a.position.x + (b.col1.x * this.m_coreV1.x + b.col2.x * this.m_coreV1.y), a.position.y + (b.col1.y * this.m_coreV1.x + b.col2.y * this.m_coreV1.y))
    };
    h.prototype.GetNextEdge = function() {
        return this.m_nextEdge
    };
    h.prototype.GetPrevEdge = function() {
        return this.m_prevEdge
    };
    h.prototype.Support = function(a, b, c) {
        void 0 === b && (b = 0);
        void 0 === c && (c = 0);
        var g = a.R,
            d = a.position.x + (g.col1.x * this.m_coreV1.x + g.col2.x * this.m_coreV1.y),
            e = a.position.y + (g.col1.y * this.m_coreV1.x + g.col2.y * this.m_coreV1.y),
            f = a.position.x + (g.col1.x *
                this.m_coreV2.x + g.col2.x * this.m_coreV2.y);
        a = a.position.y + (g.col1.y * this.m_coreV2.x + g.col2.y * this.m_coreV2.y);
        d * b + e * c > f * b + a * c ? (this.s_supportVec.x = d, this.s_supportVec.y = e) : (this.s_supportVec.x = f, this.s_supportVec.y = a);
        return this.s_supportVec
    };
    h.prototype.b2EdgeShape = function(a, b) {
        this.__super.b2Shape.call(this);
        this.m_type = f.e_edgeShape;
        this.m_nextEdge = this.m_prevEdge = null;
        this.m_v1 = a;
        this.m_v2 = b;
        this.m_direction.Set(this.m_v2.x - this.m_v1.x, this.m_v2.y - this.m_v1.y);
        this.m_length = this.m_direction.Normalize();
        this.m_normal.Set(this.m_direction.y, -this.m_direction.x);
        this.m_coreV1.Set(-c.b2_toiSlop * (this.m_normal.x - this.m_direction.x) + this.m_v1.x, -c.b2_toiSlop * (this.m_normal.y - this.m_direction.y) + this.m_v1.y);
        this.m_coreV2.Set(-c.b2_toiSlop * (this.m_normal.x + this.m_direction.x) + this.m_v2.x, -c.b2_toiSlop * (this.m_normal.y + this.m_direction.y) + this.m_v2.y);
        this.m_cornerDir1 = this.m_normal;
        this.m_cornerDir2.Set(-this.m_normal.x, -this.m_normal.y)
    };
    h.prototype.SetPrevEdge = function(a, b, c, g) {
        this.m_prevEdge = a;
        this.m_coreV1 =
            b;
        this.m_cornerDir1 = c;
        this.m_cornerConvex1 = g
    };
    h.prototype.SetNextEdge = function(a, b, c, g) {
        this.m_nextEdge = a;
        this.m_coreV2 = b;
        this.m_cornerDir2 = c;
        this.m_cornerConvex2 = g
    };
    d.y227 = function() {
        this.mass = 0;
        this.center = new q(0, 0);
        this.I = 0
    };
    Box2D.inherit(e, Box2D.Collision.Shapes.b2Shape);
    e.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
    e.y271 = function() {
        Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments)
    };
    e.prototype.Copy = function() {
        var a = new e;
        a.Set(this);
        return a
    };
    e.prototype.Set = function(a) {
        this.__super.Set.call(this,
            a);
        if (Box2D.is(a, e)) {
            a = a instanceof e ? a : null;
            this.m_centroid.SetV(a.m_centroid);
            this.m_vertexCount = a.m_vertexCount;
            this.Reserve(this.m_vertexCount);
            for (var b = 0; b < this.m_vertexCount; b++) this.m_vertices[b].SetV(a.m_vertices[b]), this.m_normals[b].SetV(a.m_normals[b])
        }
    };
    e.prototype.SetAsArray = function(a, b) {
        void 0 === b && (b = 0);
        for (var c = new Vector, g = 0, d, g = 0; g < a.length; ++g) d = a[g], c.push(d);
        this.SetAsVector(c, b)
    };
    e.AsArray = function(a, b) {
        void 0 === b && (b = 0);
        var c = new e;
        c.SetAsArray(a, b);
        return c
    };
    e.prototype.SetAsVector =
        function(a, b) {
            void 0 === b && (b = 0);
            0 == b && (b = a.length);
            c.b2Assert(2 <= b);
            this.m_vertexCount = b;
            this.Reserve(b);
            for (var g = 0, g = 0; g < this.m_vertexCount; g++) this.m_vertices[g].SetV(a[g]);
            for (g = 0; g < this.m_vertexCount; ++g) {
                var d = parseInt(g),
                    f = parseInt(g + 1 < this.m_vertexCount ? g + 1 : 0),
                    d = k.SubtractVV(this.m_vertices[f], this.m_vertices[d]);
                c.b2Assert(d.LengthSquared() > Number.MIN_VALUE);
                this.m_normals[g].SetV(k.CrossVF(d, 1));
                this.m_normals[g].Normalize()
            }
            this.m_centroid = e.ComputeCentroid(this.m_vertices, this.m_vertexCount)
        };
    e.AsVector = function(a, b) {
        void 0 === b && (b = 0);
        var c = new e;
        c.SetAsVector(a, b);
        return c
    };
    e.prototype.SetAsBox = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        this.m_vertexCount = 4;
        this.Reserve(4);
        this.m_vertices[0].Set(-a, -b);
        this.m_vertices[1].Set(a, -b);
        this.m_vertices[2].Set(a, b);
        this.m_vertices[3].Set(-a, b);
        this.m_normals[0].Set(0, -1);
        this.m_normals[1].Set(1, 0);
        this.m_normals[2].Set(0, 1);
        this.m_normals[3].Set(-1, 0);
        this.m_centroid.SetZero()
    };
    e.AsBox = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        var c = new e;
        c.SetAsBox(a, b);
        return c
    };
    e.prototype.SetAsOrientedBox = function(a, b, c, g) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === c && (c = null);
        void 0 === g && (g = 0);
        this.m_vertexCount = 4;
        this.Reserve(4);
        this.m_vertices[0].Set(-a, -b);
        this.m_vertices[1].Set(a, -b);
        this.m_vertices[2].Set(a, b);
        this.m_vertices[3].Set(-a, b);
        this.m_normals[0].Set(0, -1);
        this.m_normals[1].Set(1, 0);
        this.m_normals[2].Set(0, 1);
        this.m_normals[3].Set(-1, 0);
        this.m_centroid = c;
        a = new m;
        a.position = c;
        a.R.Set(g);
        for (c = 0; c < this.m_vertexCount; ++c) this.m_vertices[c] =
            k.MulX(a, this.m_vertices[c]), this.m_normals[c] = k.MulMV(a.R, this.m_normals[c])
    };
    e.AsOrientedBox = function(a, b, c, g) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === c && (c = null);
        void 0 === g && (g = 0);
        var d = new e;
        d.SetAsOrientedBox(a, b, c, g);
        return d
    };
    e.prototype.SetAsEdge = function(a, b) {
        this.m_vertexCount = 2;
        this.Reserve(2);
        this.m_vertices[0].SetV(a);
        this.m_vertices[1].SetV(b);
        this.m_centroid.x = 0.5 * (a.x + b.x);
        this.m_centroid.y = 0.5 * (a.y + b.y);
        this.m_normals[0] = k.CrossVF(k.SubtractVV(b, a), 1);
        this.m_normals[0].Normalize();
        this.m_normals[1].x = -this.m_normals[0].x;
        this.m_normals[1].y = -this.m_normals[0].y
    };
    e.AsEdge = function(a, b) {
        var c = new e;
        c.SetAsEdge(a, b);
        return c
    };
    e.prototype.TestPoint = function(a, b) {
        var c;
        c = a.R;
        for (var g = b.x - a.position.x, d = b.y - a.position.y, e = g * c.col1.x + d * c.col1.y, f = g * c.col2.x + d * c.col2.y, h = 0; h < this.m_vertexCount; ++h)
            if (c = this.m_vertices[h], g = e - c.x, d = f - c.y, c = this.m_normals[h], 0 < c.x * g + c.y * d) return !1;
        return !0
    };
    e.prototype.RayCast = function(a, b, c) {
        var g = 0,
            d = b.maxFraction,
            e = 0,
            f = 0,
            h, k, e = b.p1.x - c.position.x,
            f = b.p1.y - c.position.y;
        h = c.R;
        var m = e * h.col1.x + f * h.col1.y,
            q = e * h.col2.x + f * h.col2.y,
            e = b.p2.x - c.position.x,
            f = b.p2.y - c.position.y;
        h = c.R;
        b = e * h.col1.x + f * h.col1.y - m;
        h = e * h.col2.x + f * h.col2.y - q;
        for (var u = -1, p = 0; p < this.m_vertexCount; ++p) {
            k = this.m_vertices[p];
            e = k.x - m;
            f = k.y - q;
            k = this.m_normals[p];
            e = k.x * e + k.y * f;
            f = k.x * b + k.y * h;
            if (0 == f) {
                if (0 > e) return !1
            } else 0 > f && e < g * f ? (g = e / f, u = p) : 0 < f && e < d * f && (d = e / f);
            if (d < g - Number.MIN_VALUE) return !1
        }
        return 0 <= u ? (a.fraction = g, h = c.R, k = this.m_normals[u], a.normal.x = h.col1.x * k.x + h.col2.x *
            k.y, a.normal.y = h.col1.y * k.x + h.col2.y * k.y, !0) : !1
    };
    e.prototype.ComputeAABB = function(a, b) {
        for (var c = b.R, g = this.m_vertices[0], d = b.position.x + (c.col1.x * g.x + c.col2.x * g.y), e = b.position.y + (c.col1.y * g.x + c.col2.y * g.y), f = d, h = e, k = 1; k < this.m_vertexCount; ++k) var g = this.m_vertices[k],
            m = b.position.x + (c.col1.x * g.x + c.col2.x * g.y),
            g = b.position.y + (c.col1.y * g.x + c.col2.y * g.y),
            d = d < m ? d : m,
            e = e < g ? e : g,
            f = f > m ? f : m,
            h = h > g ? h : g;
        a.lowerBound.x = d - this.m_radius;
        a.lowerBound.y = e - this.m_radius;
        a.upperBound.x = f + this.m_radius;
        a.upperBound.y =
            h + this.m_radius
    };
    e.prototype.ComputeMass = function(a, b) {
        void 0 === b && (b = 0);
        if (2 == this.m_vertexCount) a.center.x = 0.5 * (this.m_vertices[0].x + this.m_vertices[1].x), a.center.y = 0.5 * (this.m_vertices[0].y + this.m_vertices[1].y), a.mass = 0, a.I = 0;
        else {
            for (var c = 0, g = 0, d = 0, e = 0, f = 1 / 3, h = 0; h < this.m_vertexCount; ++h) var k = this.m_vertices[h],
                m = h + 1 < this.m_vertexCount ? this.m_vertices[parseInt(h + 1)] : this.m_vertices[0],
                q = k.x - 0,
                u = k.y - 0,
                p = m.x - 0,
                v = m.y - 0,
                A = q * v - u * p,
                z = 0.5 * A,
                d = d + z,
                c = c + z * f * (0 + k.x + m.x),
                g = g + z * f * (0 + k.y + m.y),
                k = q,
                e = e + A *
                (f * (0.25 * (k * k + p * k + p * p) + (0 * k + 0 * p)) + 0 + (f * (0.25 * (u * u + v * u + v * v) + (0 * u + 0 * v)) + 0));
            a.mass = b * d;
            a.center.Set(c * (1 / d), g * (1 / d));
            a.I = b * e
        }
    };
    e.prototype.ComputeSubmergedArea = function(a, b, c, g) {
        void 0 === b && (b = 0);
        var e = k.MulTMV(c.R, a),
            f = b - k.Dot(a, c.position),
            h = new Vector_a2j_Number,
            m = 0,
            u = -1;
        b = -1;
        var t = !1;
        for (a = a = 0; a < this.m_vertexCount; ++a) {
            h[a] = k.Dot(e, this.m_vertices[a]) - f;
            var w = h[a] < -Number.MIN_VALUE;
            0 < a && (w ? t || (u = a - 1, m++) : t && (b = a - 1, m++));
            t = w
        }
        switch (m) {
            case 0:
                return t ? (a = new d, this.ComputeMass(a, 1), g.SetV(k.MulX(c,
                    a.center)), a.mass) : 0;
            case 1:
                -1 == u ? u = this.m_vertexCount - 1 : b = this.m_vertexCount - 1
        }
        a = parseInt((u + 1) % this.m_vertexCount);
        e = parseInt((b + 1) % this.m_vertexCount);
        f = (0 - h[u]) / (h[a] - h[u]);
        h = (0 - h[b]) / (h[e] - h[b]);
        u = new q(this.m_vertices[u].x * (1 - f) + this.m_vertices[a].x * f, this.m_vertices[u].y * (1 - f) + this.m_vertices[a].y * f);
        b = new q(this.m_vertices[b].x * (1 - h) + this.m_vertices[e].x * h, this.m_vertices[b].y * (1 - h) + this.m_vertices[e].y * h);
        h = 0;
        f = new q;
        for (m = this.m_vertices[a]; a != e;) a = (a + 1) % this.m_vertexCount, t = a == e ? b : this.m_vertices[a],
            w = 0.5 * ((m.x - u.x) * (t.y - u.y) - (m.y - u.y) * (t.x - u.x)), h += w, f.x += w * (u.x + m.x + t.x) / 3, f.y += w * (u.y + m.y + t.y) / 3, m = t;
        f.Multiply(1 / h);
        g.SetV(k.MulX(c, f));
        return h
    };
    e.prototype.GetVertexCount = function() {
        return this.m_vertexCount
    };
    e.prototype.GetVertices = function() {
        return this.m_vertices
    };
    e.prototype.GetNormals = function() {
        return this.m_normals
    };
    e.prototype.GetSupport = function(a) {
        for (var b = 0, c = this.m_vertices[0].x * a.x + this.m_vertices[0].y * a.y, g = 1; g < this.m_vertexCount; ++g) {
            var d = this.m_vertices[g].x * a.x + this.m_vertices[g].y *
                a.y;
            d > c && (b = g, c = d)
        }
        return b
    };
    e.prototype.GetSupportVertex = function(a) {
        for (var b = 0, c = this.m_vertices[0].x * a.x + this.m_vertices[0].y * a.y, g = 1; g < this.m_vertexCount; ++g) {
            var d = this.m_vertices[g].x * a.x + this.m_vertices[g].y * a.y;
            d > c && (b = g, c = d)
        }
        return this.m_vertices[b]
    };
    e.prototype.Validate = function() {
        return !1
    };
    e.prototype.y271 = function() {
        this.__super.b2Shape.call(this);
        this.m_type = f.e_polygonShape;
        this.m_centroid = new q;
        this.m_vertices = new Vector;
        this.m_normals = new Vector
    };
    e.prototype.Reserve = function(a) {
        void 0 ===
            a && (a = 0);
        for (var b = parseInt(this.m_vertices.length); b < a; b++) this.m_vertices[b] = new q, this.m_normals[b] = new q
    };
    e.ComputeCentroid = function(a, b) {
        void 0 === b && (b = 0);
        for (var c = new q, g = 0, d = 1 / 3, e = 0; e < b; ++e) {
            var f = a[e],
                h = e + 1 < b ? a[parseInt(e + 1)] : a[0],
                k = 0.5 * ((f.x - 0) * (h.y - 0) - (f.y - 0) * (h.x - 0)),
                g = g + k;
            c.x += k * d * (0 + f.x + h.x);
            c.y += k * d * (0 + f.y + h.y)
        }
        c.x *= 1 / g;
        c.y *= 1 / g;
        return c
    };
    e.ComputeOBB = function(a, b, c) {
        void 0 === c && (c = 0);
        for (var g = 0, d = new Vector(c + 1), g = 0; g < c; ++g) d[g] = b[g];
        d[c] = d[0];
        b = Number.MAX_VALUE;
        for (g = 1; g <= c; ++g) {
            for (var e =
                    d[parseInt(g - 1)], f = d[g].x - e.x, h = d[g].y - e.y, k = Math.sqrt(f * f + h * h), f = f / k, h = h / k, m = -h, q = f, u = k = Number.MAX_VALUE, p = -Number.MAX_VALUE, v = -Number.MAX_VALUE, A = 0; A < c; ++A) {
                var z = d[A].x - e.x,
                    J = d[A].y - e.y,
                    N = f * z + h * J,
                    z = m * z + q * J;
                N < k && (k = N);
                z < u && (u = z);
                N > p && (p = N);
                z > v && (v = z)
            }
            A = (p - k) * (v - u);
            A < 0.95 * b && (b = A, a.R.col1.x = f, a.R.col1.y = h, a.R.col2.x = m, a.R.col2.y = q, f = 0.5 * (k + p), h = 0.5 * (u + v), m = a.R, a.center.x = e.x + (m.col1.x * f + m.col2.x * h), a.center.y = e.y + (m.col1.y * f + m.col2.y * h), a.extents.x = 0.5 * (p - k), a.extents.y = 0.5 * (v - u))
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.Shapes.y271.s_mat =
            new g
    });
    f.b2Shape = function() {};
    f.prototype.Copy = function() {
        return null
    };
    f.prototype.Set = function(a) {
        this.m_radius = a.m_radius
    };
    f.prototype.GetType = function() {
        return this.m_type
    };
    f.prototype.TestPoint = function() {
        return !1
    };
    f.prototype.RayCast = function() {
        return !1
    };
    f.prototype.ComputeAABB = function() {};
    f.prototype.ComputeMass = function() {};
    f.prototype.ComputeSubmergedArea = function() {
        return 0
    };
    f.TestOverlap = function(a, b, c, g) {
        var d = new u;
        d.proxyA = new x;
        d.proxyA.Set(a);
        d.proxyB = new x;
        d.proxyB.Set(c);
        d.transformA =
            b;
        d.transformB = g;
        d.useRadii = !0;
        a = new y;
        a.count = 0;
        b = new t;
        w.Distance(b, a, d);
        return b.distance < 10 * Number.MIN_VALUE
    };
    f.prototype.b2Shape = function() {
        this.m_type = f.e_unknownShape;
        this.m_radius = c.b2_linearSlop
    };
    Box2D.postDefs.push(function() {
        Box2D.Collision.Shapes.b2Shape.e_unknownShape = -1;
        Box2D.Collision.Shapes.b2Shape.e_circleShape = 0;
        Box2D.Collision.Shapes.b2Shape.e_polygonShape = 1;
        Box2D.Collision.Shapes.b2Shape.e_edgeShape = 2;
        Box2D.Collision.Shapes.b2Shape.e_y3TypeCount = 3;
        Box2D.Collision.Shapes.b2Shape.e_hitCollide =
            1;
        Box2D.Collision.Shapes.b2Shape.e_missCollide = 0;
        Box2D.Collision.Shapes.b2Shape.e_startsInsideCollide = -1
    })
})();
(function() {
    var c = Box2D.Common.b2Color,
        a = Box2D.Common.b2Settings,
        b = Box2D.Common.Math.b2Math;
    c.b2Color = function() {
        this._b = this._g = this._r = 0
    };
    c.prototype.b2Color = function(a, c, e) {
        void 0 === a && (a = 0);
        void 0 === c && (c = 0);
        void 0 === e && (e = 0);
        this._r = Box2D.parseUInt(255 * b.Clamp(a, 0, 1));
        this._g = Box2D.parseUInt(255 * b.Clamp(c, 0, 1));
        this._b = Box2D.parseUInt(255 * b.Clamp(e, 0, 1))
    };
    c.prototype.Set = function(a, c, e) {
        void 0 === a && (a = 0);
        void 0 === c && (c = 0);
        void 0 === e && (e = 0);
        this._r = Box2D.parseUInt(255 * b.Clamp(a, 0, 1));
        this._g =
            Box2D.parseUInt(255 * b.Clamp(c, 0, 1));
        this._b = Box2D.parseUInt(255 * b.Clamp(e, 0, 1))
    };
    Object.defineProperty(c.prototype, "r", {
        enumerable: !1,
        configurable: !0,
        set: function(a) {
            void 0 === a && (a = 0);
            this._r = Box2D.parseUInt(255 * b.Clamp(a, 0, 1))
        }
    });
    Object.defineProperty(c.prototype, "g", {
        enumerable: !1,
        configurable: !0,
        set: function(a) {
            void 0 === a && (a = 0);
            this._g = Box2D.parseUInt(255 * b.Clamp(a, 0, 1))
        }
    });
    Object.defineProperty(c.prototype, "b", {
        enumerable: !1,
        configurable: !0,
        set: function(a) {
            void 0 === a && (a = 0);
            this._b = Box2D.parseUInt(255 *
                b.Clamp(a, 0, 1))
        }
    });
    Object.defineProperty(c.prototype, "color", {
        enumerable: !1,
        configurable: !0,
        get: function() {
            return this._r << 16 | this._g << 8 | this._b
        }
    });
    a.b2Settings = function() {};
    a.b2MixFriction = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        return Math.sqrt(a * b)
    };
    a.b2MixRestitution = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        return a > b ? a : b
    };
    a.b2Assert = function(a) {
        if (!a) throw "Assertion Failed";
    };
    Box2D.postDefs.push(function() {
        Box2D.Common.b2Settings.VERSION = "2.1alpha";
        Box2D.Common.b2Settings.USHRT_MAX =
            65535;
        Box2D.Common.b2Settings.b2_pi = Math.PI;
        Box2D.Common.b2Settings.b2_maxManifoldPoints = 2;
        Box2D.Common.b2Settings.b2_aabbExtension = 0.1;
        Box2D.Common.b2Settings.b2_aabbMultiplier = 2;
        Box2D.Common.b2Settings.b2_polygonRadius = 2 * a.b2_linearSlop;
        Box2D.Common.b2Settings.b2_linearSlop = 0.0050;
        Box2D.Common.b2Settings.b2_angularSlop = 2 / 180 * a.b2_pi;
        Box2D.Common.b2Settings.b2_toiSlop = 8 * a.b2_linearSlop;
        Box2D.Common.b2Settings.b2_maxTOIContactsPerIsland = 32;
        Box2D.Common.b2Settings.b2_maxTOIJointsPerIsland = 32;
        Box2D.Common.b2Settings.b2_velocityThreshold =
            1;
        Box2D.Common.b2Settings.b2_maxLinearCorrection = 0.2;
        Box2D.Common.b2Settings.b2_maxAngularCorrection = 8 / 180 * a.b2_pi;
        Box2D.Common.b2Settings.b2_maxTranslation = 2;
        Box2D.Common.b2Settings.b2_maxTranslationSquared = a.b2_maxTranslation * a.b2_maxTranslation;
        Box2D.Common.b2Settings.b2_maxRotation = 0.5 * a.b2_pi;
        Box2D.Common.b2Settings.b2_maxRotationSquared = a.b2_maxRotation * a.b2_maxRotation;
        Box2D.Common.b2Settings.b2_contactBaumgarte = 0.2;
        Box2D.Common.b2Settings.b2_timeToSleep = 0.5;
        Box2D.Common.b2Settings.b2_linearSleepTolerance =
            0.01;
        Box2D.Common.b2Settings.b2_angularSleepTolerance = 2 / 180 * a.b2_pi
    })
})();
(function() {
    var c = Box2D.Common.Math.b2Mat22,
        a = Box2D.Common.Math.b2Mat33,
        b = Box2D.Common.Math.b2Math,
        h = Box2D.Common.Math.b2Sweep,
        d = Box2D.Common.Math.b2Transform,
        e = Box2D.Common.Math.y290,
        f = Box2D.Common.Math.b2Vec3;
    c.b2Mat22 = function() {
        this.col1 = new e;
        this.col2 = new e
    };
    c.prototype.b2Mat22 = function() {
        this.SetIdentity()
    };
    c.FromAngle = function(a) {
        void 0 === a && (a = 0);
        var b = new c;
        b.Set(a);
        return b
    };
    c.FromVV = function(a, b) {
        var d = new c;
        d.SetVV(a, b);
        return d
    };
    c.prototype.Set = function(a) {
        void 0 === a && (a = 0);
        var b = Math.cos(a);
        a = Math.sin(a);
        this.col1.x = b;
        this.col2.x = -a;
        this.col1.y = a;
        this.col2.y = b
    };
    c.prototype.SetVV = function(a, b) {
        this.col1.SetV(a);
        this.col2.SetV(b)
    };
    c.prototype.Copy = function() {
        var a = new c;
        a.SetM(this);
        return a
    };
    c.prototype.SetM = function(a) {
        this.col1.SetV(a.col1);
        this.col2.SetV(a.col2)
    };
    c.prototype.AddM = function(a) {
        this.col1.x += a.col1.x;
        this.col1.y += a.col1.y;
        this.col2.x += a.col2.x;
        this.col2.y += a.col2.y
    };
    c.prototype.SetIdentity = function() {
        this.col1.x = 1;
        this.col2.x = 0;
        this.col1.y = 0;
        this.col2.y = 1
    };
    c.prototype.SetZero =
        function() {
            this.col1.x = 0;
            this.col2.x = 0;
            this.col1.y = 0;
            this.col2.y = 0
        };
    c.prototype.GetAngle = function() {
        return Math.atan2(this.col1.y, this.col1.x)
    };
    c.prototype.GetInverse = function(a) {
        var b = this.col1.x,
            c = this.col2.x,
            d = this.col1.y,
            e = this.col2.y,
            f = b * e - c * d;
        0 != f && (f = 1 / f);
        a.col1.x = f * e;
        a.col2.x = -f * c;
        a.col1.y = -f * d;
        a.col2.y = f * b;
        return a
    };
    c.prototype.Solve = function(a, b, c) {
        void 0 === b && (b = 0);
        void 0 === c && (c = 0);
        var d = this.col1.x,
            e = this.col2.x,
            f = this.col1.y,
            h = this.col2.y,
            x = d * h - e * f;
        0 != x && (x = 1 / x);
        a.x = x * (h * b - e * c);
        a.y =
            x * (d * c - f * b);
        return a
    };
    c.prototype.Abs = function() {
        this.col1.Abs();
        this.col2.Abs()
    };
    a.b2Mat33 = function() {
        this.col1 = new f;
        this.col2 = new f;
        this.col3 = new f
    };
    a.prototype.b2Mat33 = function(a, b, c) {
        void 0 === a && (a = null);
        void 0 === b && (b = null);
        void 0 === c && (c = null);
        a || b || c ? (this.col1.SetV(a), this.col2.SetV(b), this.col3.SetV(c)) : (this.col1.SetZero(), this.col2.SetZero(), this.col3.SetZero())
    };
    a.prototype.SetVVV = function(a, b, c) {
        this.col1.SetV(a);
        this.col2.SetV(b);
        this.col3.SetV(c)
    };
    a.prototype.Copy = function() {
        return new a(this.col1,
            this.col2, this.col3)
    };
    a.prototype.SetM = function(a) {
        this.col1.SetV(a.col1);
        this.col2.SetV(a.col2);
        this.col3.SetV(a.col3)
    };
    a.prototype.AddM = function(a) {
        this.col1.x += a.col1.x;
        this.col1.y += a.col1.y;
        this.col1.z += a.col1.z;
        this.col2.x += a.col2.x;
        this.col2.y += a.col2.y;
        this.col2.z += a.col2.z;
        this.col3.x += a.col3.x;
        this.col3.y += a.col3.y;
        this.col3.z += a.col3.z
    };
    a.prototype.SetIdentity = function() {
        this.col1.x = 1;
        this.col2.x = 0;
        this.col3.x = 0;
        this.col1.y = 0;
        this.col2.y = 1;
        this.col3.y = 0;
        this.col1.z = 0;
        this.col2.z = 0;
        this.col3.z =
            1
    };
    a.prototype.SetZero = function() {
        this.col1.x = 0;
        this.col2.x = 0;
        this.col3.x = 0;
        this.col1.y = 0;
        this.col2.y = 0;
        this.col3.y = 0;
        this.col1.z = 0;
        this.col2.z = 0;
        this.col3.z = 0
    };
    a.prototype.Solve22 = function(a, b, c) {
        void 0 === b && (b = 0);
        void 0 === c && (c = 0);
        var d = this.col1.x,
            e = this.col2.x,
            f = this.col1.y,
            h = this.col2.y,
            x = d * h - e * f;
        0 != x && (x = 1 / x);
        a.x = x * (h * b - e * c);
        a.y = x * (d * c - f * b);
        return a
    };
    a.prototype.Solve33 = function(a, b, c, d) {
        void 0 === b && (b = 0);
        void 0 === c && (c = 0);
        void 0 === d && (d = 0);
        var e = this.col1.x,
            f = this.col1.y,
            h = this.col1.z,
            x = this.col2.x,
            y = this.col2.y,
            n = this.col2.z,
            C = this.col3.x,
            B = this.col3.y,
            H = this.col3.z,
            E = e * (y * H - n * B) + f * (n * C - x * H) + h * (x * B - y * C);
        0 != E && (E = 1 / E);
        a.x = E * (b * (y * H - n * B) + c * (n * C - x * H) + d * (x * B - y * C));
        a.y = E * (e * (c * H - d * B) + f * (d * C - b * H) + h * (b * B - c * C));
        a.z = E * (e * (y * d - n * c) + f * (n * b - x * d) + h * (x * c - y * b));
        return a
    };
    b.b2Math = function() {};
    b.IsValid = function(a) {
        void 0 === a && (a = 0);
        return isFinite(a)
    };
    b.Dot = function(a, b) {
        return a.x * b.x + a.y * b.y
    };
    b.CrossVV = function(a, b) {
        return a.x * b.y - a.y * b.x
    };
    b.CrossVF = function(a, b) {
        void 0 === b && (b = 0);
        return new e(b * a.y, -b *
            a.x)
    };
    b.CrossFV = function(a, b) {
        void 0 === a && (a = 0);
        return new e(-a * b.y, a * b.x)
    };
    b.MulMV = function(a, b) {
        return new e(a.col1.x * b.x + a.col2.x * b.y, a.col1.y * b.x + a.col2.y * b.y)
    };
    b.MulTMV = function(a, c) {
        return new e(b.Dot(c, a.col1), b.Dot(c, a.col2))
    };
    b.MulX = function(a, c) {
        var d = b.MulMV(a.R, c);
        d.x += a.position.x;
        d.y += a.position.y;
        return d
    };
    b.MulXT = function(a, c) {
        var d = b.SubtractVV(c, a.position),
            e = d.x * a.R.col1.x + d.y * a.R.col1.y;
        d.y = d.x * a.R.col2.x + d.y * a.R.col2.y;
        d.x = e;
        return d
    };
    b.AddVV = function(a, b) {
        return new e(a.x + b.x,
            a.y + b.y)
    };
    b.SubtractVV = function(a, b) {
        return new e(a.x - b.x, a.y - b.y)
    };
    b.Distance = function(a, b) {
        var c = a.x - b.x,
            d = a.y - b.y;
        return Math.sqrt(c * c + d * d)
    };
    b.DistanceSquared = function(a, b) {
        var c = a.x - b.x,
            d = a.y - b.y;
        return c * c + d * d
    };
    b.MulFV = function(a, b) {
        void 0 === a && (a = 0);
        return new e(a * b.x, a * b.y)
    };
    b.AddMM = function(a, d) {
        return c.FromVV(b.AddVV(a.col1, d.col1), b.AddVV(a.col2, d.col2))
    };
    b.MulMM = function(a, d) {
        return c.FromVV(b.MulMV(a, d.col1), b.MulMV(a, d.col2))
    };
    b.MulTMM = function(a, d) {
        var f = new e(b.Dot(a.col1, d.col1),
                b.Dot(a.col2, d.col1)),
            h = new e(b.Dot(a.col1, d.col2), b.Dot(a.col2, d.col2));
        return c.FromVV(f, h)
    };
    b.Abs = function(a) {
        void 0 === a && (a = 0);
        return 0 < a ? a : -a
    };
    b.AbsV = function(a) {
        return new e(b.Abs(a.x), b.Abs(a.y))
    };
    b.AbsM = function(a) {
        return c.FromVV(b.AbsV(a.col1), b.AbsV(a.col2))
    };
    b.Min = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        return a < b ? a : b
    };
    b.MinV = function(a, c) {
        return new e(b.Min(a.x, c.x), b.Min(a.y, c.y))
    };
    b.Max = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        return a > b ? a : b
    };
    b.MaxV = function(a, c) {
        return new e(b.Max(a.x,
            c.x), b.Max(a.y, c.y))
    };
    b.Clamp = function(a, b, c) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === c && (c = 0);
        return a < b ? b : a > c ? c : a
    };
    b.ClampV = function(a, c, d) {
        return b.MaxV(c, b.MinV(a, d))
    };
    b.Swap = function(a, b) {
        var c = a[0];
        a[0] = b[0];
        b[0] = c
    };
    b.Random = function() {
        return 2 * Math.random() - 1
    };
    b.RandomRange = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        var c = Math.random();
        return (b - a) * c + a
    };
    b.NextPowerOfTwo = function(a) {
        void 0 === a && (a = 0);
        a |= a >> 1 & 2147483647;
        a |= a >> 2 & 1073741823;
        a |= a >> 4 & 268435455;
        a |= a >> 8 & 16777215;
        return (a |
            a >> 16 & 65535) + 1
    };
    b.IsPowerOfTwo = function(a) {
        void 0 === a && (a = 0);
        return 0 < a && 0 == (a & a - 1)
    };
    Box2D.postDefs.push(function() {
        Box2D.Common.Math.b2Math.y290_zero = new e(0, 0);
        Box2D.Common.Math.b2Math.b2Mat22_identity = c.FromVV(new e(1, 0), new e(0, 1));
        Box2D.Common.Math.b2Math.b2Transform_identity = new d(b.y290_zero, b.b2Mat22_identity)
    });
    h.b2Sweep = function() {
        this.localCenter = new e;
        this.c0 = new e;
        this.c = new e
    };
    h.prototype.Set = function(a) {
        this.localCenter.SetV(a.localCenter);
        this.c0.SetV(a.c0);
        this.c.SetV(a.c);
        this.a0 =
            a.a0;
        this.a = a.a;
        this.t0 = a.t0
    };
    h.prototype.Copy = function() {
        var a = new h;
        a.localCenter.SetV(this.localCenter);
        a.c0.SetV(this.c0);
        a.c.SetV(this.c);
        a.a0 = this.a0;
        a.a = this.a;
        a.t0 = this.t0;
        return a
    };
    h.prototype.GetTransform = function(a, b) {
        void 0 === b && (b = 0);
        a.position.x = (1 - b) * this.c0.x + b * this.c.x;
        a.position.y = (1 - b) * this.c0.y + b * this.c.y;
        a.R.Set((1 - b) * this.a0 + b * this.a);
        var c = a.R;
        a.position.x -= c.col1.x * this.localCenter.x + c.col2.x * this.localCenter.y;
        a.position.y -= c.col1.y * this.localCenter.x + c.col2.y * this.localCenter.y
    };
    h.prototype.Advance = function(a) {
        void 0 === a && (a = 0);
        if (this.t0 < a && 1 - this.t0 > Number.MIN_VALUE) {
            var b = (a - this.t0) / (1 - this.t0);
            this.c0.x = (1 - b) * this.c0.x + b * this.c.x;
            this.c0.y = (1 - b) * this.c0.y + b * this.c.y;
            this.a0 = (1 - b) * this.a0 + b * this.a;
            this.t0 = a
        }
    };
    d.b2Transform = function() {
        this.position = new e;
        this.R = new c
    };
    d.prototype.b2Transform = function(a, b) {
        void 0 === a && (a = null);
        void 0 === b && (b = null);
        a && (this.position.SetV(a), this.R.SetM(b))
    };
    d.prototype.Initialize = function(a, b) {
        this.position.SetV(a);
        this.R.SetM(b)
    };
    d.prototype.SetIdentity =
        function() {
            this.position.SetZero();
            this.R.SetIdentity()
        };
    d.prototype.Set = function(a) {
        this.position.SetV(a.position);
        this.R.SetM(a.R)
    };
    d.prototype.GetAngle = function() {
        return Math.atan2(this.R.col1.y, this.R.col1.x)
    };
    e.y290 = function() {};
    e.prototype.y290 = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        this.x = a;
        this.y = b
    };
    e.prototype.SetZero = function() {
        this.y = this.x = 0
    };
    e.prototype.Set = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        this.x = a;
        this.y = b
    };
    e.prototype.SetV = function(a) {
        this.x = a.x;
        this.y = a.y
    };
    e.prototype.GetNegative = function() {
        return new e(-this.x, -this.y)
    };
    e.prototype.NegativeSelf = function() {
        this.x = -this.x;
        this.y = -this.y
    };
    e.Make = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        return new e(a, b)
    };
    e.prototype.Copy = function() {
        return new e(this.x, this.y)
    };
    e.prototype.Add = function(a) {
        this.x += a.x;
        this.y += a.y
    };
    e.prototype.Subtract = function(a) {
        this.x -= a.x;
        this.y -= a.y
    };
    e.prototype.Multiply = function(a) {
        void 0 === a && (a = 0);
        this.x *= a;
        this.y *= a
    };
    e.prototype.MulM = function(a) {
        var b = this.x;
        this.x = a.col1.x *
            b + a.col2.x * this.y;
        this.y = a.col1.y * b + a.col2.y * this.y
    };
    e.prototype.MulTM = function(a) {
        var c = b.Dot(this, a.col1);
        this.y = b.Dot(this, a.col2);
        this.x = c
    };
    e.prototype.CrossVF = function(a) {
        void 0 === a && (a = 0);
        var b = this.x;
        this.x = a * this.y;
        this.y = -a * b
    };
    e.prototype.CrossFV = function(a) {
        void 0 === a && (a = 0);
        var b = this.x;
        this.x = -a * this.y;
        this.y = a * b
    };
    e.prototype.MinV = function(a) {
        this.x = this.x < a.x ? this.x : a.x;
        this.y = this.y < a.y ? this.y : a.y
    };
    e.prototype.MaxV = function(a) {
        this.x = this.x > a.x ? this.x : a.x;
        this.y = this.y > a.y ? this.y : a.y
    };
    e.prototype.Abs = function() {
        0 > this.x && (this.x = -this.x);
        0 > this.y && (this.y = -this.y)
    };
    e.prototype.Length = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    };
    e.prototype.LengthSquared = function() {
        return this.x * this.x + this.y * this.y
    };
    e.prototype.Normalize = function() {
        var a = Math.sqrt(this.x * this.x + this.y * this.y);
        if (a < Number.MIN_VALUE) return 0;
        var b = 1 / a;
        this.x *= b;
        this.y *= b;
        return a
    };
    e.prototype.IsValid = function() {
        return b.IsValid(this.x) && b.IsValid(this.y)
    };
    f.b2Vec3 = function() {};
    f.prototype.b2Vec3 = function(a,
        b, c) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === c && (c = 0);
        this.x = a;
        this.y = b;
        this.z = c
    };
    f.prototype.SetZero = function() {
        this.x = this.y = this.z = 0
    };
    f.prototype.Set = function(a, b, c) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === c && (c = 0);
        this.x = a;
        this.y = b;
        this.z = c
    };
    f.prototype.SetV = function(a) {
        this.x = a.x;
        this.y = a.y;
        this.z = a.z
    };
    f.prototype.GetNegative = function() {
        return new f(-this.x, -this.y, -this.z)
    };
    f.prototype.NegativeSelf = function() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z
    };
    f.prototype.Copy = function() {
        return new f(this.x,
            this.y, this.z)
    };
    f.prototype.Add = function(a) {
        this.x += a.x;
        this.y += a.y;
        this.z += a.z
    };
    f.prototype.Subtract = function(a) {
        this.x -= a.x;
        this.y -= a.y;
        this.z -= a.z
    };
    f.prototype.Multiply = function(a) {
        void 0 === a && (a = 0);
        this.x *= a;
        this.y *= a;
        this.z *= a
    }
})();
(function() {
    var c = Box2D.Common.Math.b2Math,
        a = Box2D.Common.Math.b2Sweep,
        b = Box2D.Common.Math.b2Transform,
        h = Box2D.Common.Math.y290,
        d = Box2D.Common.b2Color,
        e = Box2D.Common.b2Settings,
        f = Box2D.Collision.y106,
        g = Box2D.Collision.b2ContactPoint,
        k = Box2D.Collision.b2DynamicTreeBroadPhase,
        m = Box2D.Collision.b2RayCastInput,
        q = Box2D.Collision.b2RayCastOutput,
        w = Box2D.Collision.Shapes.y141,
        u = Box2D.Collision.Shapes.b2EdgeShape,
        t = Box2D.Collision.Shapes.y227,
        x = Box2D.Collision.Shapes.y271,
        y = Box2D.Collision.Shapes.b2Shape,
        n = Box2D.Dynamics.y113,
        C = Box2D.Dynamics.y75,
        B = Box2D.Dynamics.b2ContactFilter,
        H = Box2D.Dynamics.b2ContactImpulse,
        E = Box2D.Dynamics.b2ContactListener,
        G = Box2D.Dynamics.b2ContactManager,
        D = Box2D.Dynamics.y270,
        K = Box2D.Dynamics.b2DestructionListener,
        F = Box2D.Dynamics.b2FilterData,
        I = Box2D.Dynamics.y213,
        O = Box2D.Dynamics.y213Def,
        L = Box2D.Dynamics.b2Island,
        p = Box2D.Dynamics.b2TimeStep,
        v = Box2D.Dynamics.y230,
        A = Box2D.Dynamics.Contacts.b2Contact,
        z = Box2D.Dynamics.Contacts.b2ContactFactory,
        J = Box2D.Dynamics.Contacts.b2ContactSolver,
        N = Box2D.Dynamics.Joints.b2Joint,
        P = Box2D.Dynamics.Joints.b2PulleyJoint;
    n.y113 = function() {
        this.m_xf = new b;
        this.m_sweep = new a;
        this.m_linearVelocity = new h;
        this.m_force = new h
    };
    n.prototype.connectEdges = function(a, b, d) {
        void 0 === d && (d = 0);
        var f = Math.atan2(b.GetDirectionVector().y, b.GetDirectionVector().x);
        d = c.MulFV(Math.tan(0.5 * (f - d)), b.GetDirectionVector());
        d = c.SubtractVV(d, b.GetNormalVector());
        d = c.MulFV(e.b2_toiSlop, d);
        d = c.AddVV(d, b.GetVertex1());
        var p = c.AddVV(a.GetDirectionVector(), b.GetDirectionVector());
        p.Normalize();
        var g = 0 < c.Dot(a.GetDirectionVector(), b.GetNormalVector());
        a.SetNextEdge(b, d, p, g);
        b.SetPrevEdge(a, d, p, g);
        return f
    };
    n.prototype.CreateFixture = function(a) {
        if (!0 == this.m_y314.IsLocked()) return null;
        var b = new I;
        b.Create(this, this.m_xf, a);
        this.m_flags & n.e_activeFlag && b.CreateProxy(this.m_y314.m_contactManager.m_broadPhase, this.m_xf);
        b.m_next = this.m_fixtureList;
        this.m_fixtureList = b;
        ++this.m_fixtureCount;
        b.m_body = this;
        0 < b.m_density && this.ResetMassData();
        this.m_y314.m_flags |= v.e_newFixture;
        return b
    };
    n.prototype.CreateFixture2 = function(a, b) {
        void 0 === b && (b = 0);
        var c = new O;
        c.y3 = a;
        c.density = b;
        return this.CreateFixture(c)
    };
    n.prototype.DestroyFixture = function(a) {
        if (!0 != this.m_y314.IsLocked()) {
            for (var b = this.m_fixtureList, c = null; null != b;) {
                if (b == a) {
                    c ? c.m_next = a.m_next : this.m_fixtureList = a.m_next;
                    break
                }
                c = b;
                b = b.m_next
            }
            for (b = this.m_contactList; b;) {
                var c = b.contact,
                    b = b.next,
                    d = c.GetFixtureA(),
                    e = c.GetFixtureB();
                a != d && a != e || this.m_y314.m_contactManager.Destroy(c)
            }
            this.m_flags & n.e_activeFlag && a.DestroyProxy(this.m_y314.m_contactManager.m_broadPhase);
            a.Destroy();
            a.m_body = null;
            a.m_next = null;
            --this.m_fixtureCount;
            this.ResetMassData()
        }
    };
    n.prototype.SetPositionAndAngle = function(a, b) {
        void 0 === b && (b = 0);
        var c;
        if (!0 != this.m_y314.IsLocked()) {
            this.m_xf.R.Set(b);
            this.m_xf.position.SetV(a);
            c = this.m_xf.R;
            var d = this.m_sweep.localCenter;
            this.m_sweep.c.x = c.col1.x * d.x + c.col2.x * d.y;
            this.m_sweep.c.y = c.col1.y * d.x + c.col2.y * d.y;
            this.m_sweep.c.x += this.m_xf.position.x;
            this.m_sweep.c.y += this.m_xf.position.y;
            this.m_sweep.c0.SetV(this.m_sweep.c);
            this.m_sweep.a0 = this.m_sweep.a =
                b;
            d = this.m_y314.m_contactManager.m_broadPhase;
            for (c = this.m_fixtureList; c; c = c.m_next) c.Synchronize(d, this.m_xf, this.m_xf);
            this.m_y314.m_contactManager.FindNewContacts()
        }
    };
    n.prototype.SetTransform = function(a) {
        this.SetPositionAndAngle(a.position, a.GetAngle())
    };
    n.prototype.GetTransform = function() {
        return this.m_xf
    };
    n.prototype.GetPosition = function() {
        return this.m_xf.position
    };
    n.prototype.SetPosition = function(a) {
        this.SetPositionAndAngle(a, this.GetAngle())
    };
    n.prototype.GetAngle = function() {
        return this.m_sweep.a
    };
    n.prototype.SetAngle = function(a) {
        void 0 === a && (a = 0);
        this.SetPositionAndAngle(this.GetPosition(), a)
    };
    n.prototype.GetWorldCenter = function() {
        return this.m_sweep.c
    };
    n.prototype.GetLocalCenter = function() {
        return this.m_sweep.localCenter
    };
    n.prototype.SetLinearVelocity = function(a) {
        this.m_type != n.b2_staticBody && this.m_linearVelocity.SetV(a)
    };
    n.prototype.GetLinearVelocity = function() {
        return this.m_linearVelocity
    };
    n.prototype.SetAngularVelocity = function(a) {
        void 0 === a && (a = 0);
        this.m_type != n.b2_staticBody && (this.m_angularVelocity =
            a)
    };
    n.prototype.GetAngularVelocity = function() {
        return this.m_angularVelocity
    };
    n.prototype.GetDefinition = function() {
        var a = new C;
        a.type = this.GetType();
        a.allowSleep = (this.m_flags & n.e_allowSleepFlag) == n.e_allowSleepFlag;
        a.angle = this.GetAngle();
        a.angularDamping = this.m_angularDamping;
        a.angularVelocity = this.m_angularVelocity;
        a.fixedRotation = (this.m_flags & n.e_fixedRotationFlag) == n.e_fixedRotationFlag;
        a.bullet = (this.m_flags & n.e_bulletFlag) == n.e_bulletFlag;
        a.awake = (this.m_flags & n.e_awakeFlag) == n.e_awakeFlag;
        a.linearDamping = this.m_linearDamping;
        a.linearVelocity.SetV(this.GetLinearVelocity());
        a.position = this.GetPosition();
        a.userData = this.GetUserData();
        return a
    };
    n.prototype.ApplyForce = function(a, b) {
        this.m_type == n.b2_dynamicBody && (!1 == this.IsAwake() && this.SetAwake(!0), this.m_force.x += a.x, this.m_force.y += a.y, this.m_torque += (b.x - this.m_sweep.c.x) * a.y - (b.y - this.m_sweep.c.y) * a.x)
    };
    n.prototype.ApplyTorque = function(a) {
        void 0 === a && (a = 0);
        this.m_type == n.b2_dynamicBody && (!1 == this.IsAwake() && this.SetAwake(!0), this.m_torque +=
            a)
    };
    n.prototype.ApplyImpulse = function(a, b) {
        this.m_type == n.b2_dynamicBody && (!1 == this.IsAwake() && this.SetAwake(!0), this.m_linearVelocity.x += this.m_invMass * a.x, this.m_linearVelocity.y += this.m_invMass * a.y, this.m_angularVelocity += this.m_invI * ((b.x - this.m_sweep.c.x) * a.y - (b.y - this.m_sweep.c.y) * a.x))
    };
    n.prototype.Split = function(a) {
        for (var b = this.GetLinearVelocity().Copy(), d = this.GetAngularVelocity(), e = this.GetWorldCenter(), f = this.m_y314.CreateBody(this.GetDefinition()), p, g = this.m_fixtureList; g;)
            if (a(g)) {
                var v =
                    g.m_next;
                p ? p.m_next = v : this.m_fixtureList = v;
                this.m_fixtureCount--;
                g.m_next = f.m_fixtureList;
                f.m_fixtureList = g;
                f.m_fixtureCount++;
                g.m_body = f;
                g = v
            } else p = g, g = g.m_next;
        this.ResetMassData();
        f.ResetMassData();
        p = this.GetWorldCenter();
        a = f.GetWorldCenter();
        p = c.AddVV(b, c.CrossFV(d, c.SubtractVV(p, e)));
        b = c.AddVV(b, c.CrossFV(d, c.SubtractVV(a, e)));
        this.SetLinearVelocity(p);
        f.SetLinearVelocity(b);
        this.SetAngularVelocity(d);
        f.SetAngularVelocity(d);
        this.SynchronizeFixtures();
        f.SynchronizeFixtures();
        return f
    };
    n.prototype.Merge =
        function(a) {
            var b;
            for (b = a.m_fixtureList; b;) {
                var c = b.m_next;
                a.m_fixtureCount--;
                b.m_next = this.m_fixtureList;
                this.m_fixtureList = b;
                this.m_fixtureCount++;
                b.m_body = e;
                b = c
            }
            d.m_fixtureCount = 0;
            var d = this,
                e = a;
            d.GetWorldCenter();
            e.GetWorldCenter();
            d.GetLinearVelocity().Copy();
            e.GetLinearVelocity().Copy();
            d.GetAngularVelocity();
            e.GetAngularVelocity();
            d.ResetMassData();
            this.SynchronizeFixtures()
        };
    n.prototype.GetMass = function() {
        return this.m_mass
    };
    n.prototype.GetInertia = function() {
        return this.m_I
    };
    n.prototype.GetMassData =
        function(a) {
            a.mass = this.m_mass;
            a.I = this.m_I;
            a.center.SetV(this.m_sweep.localCenter)
        };
    n.prototype.SetMassData = function(a) {
        e.b2Assert(!1 == this.m_y314.IsLocked());
        if (!0 != this.m_y314.IsLocked() && this.m_type == n.b2_dynamicBody) {
            this.m_invI = this.m_I = this.m_invMass = 0;
            this.m_mass = a.mass;
            0 >= this.m_mass && (this.m_mass = 1);
            this.m_invMass = 1 / this.m_mass;
            0 < a.I && 0 == (this.m_flags & n.e_fixedRotationFlag) && (this.m_I = a.I - this.m_mass * (a.center.x * a.center.x + a.center.y * a.center.y), this.m_invI = 1 / this.m_I);
            var b = this.m_sweep.c.Copy();
            this.m_sweep.localCenter.SetV(a.center);
            this.m_sweep.c0.SetV(c.MulX(this.m_xf, this.m_sweep.localCenter));
            this.m_sweep.c.SetV(this.m_sweep.c0);
            this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - b.y);
            this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - b.x)
        }
    };
    n.prototype.ResetMassData = function() {
        this.m_invI = this.m_I = this.m_invMass = this.m_mass = 0;
        this.m_sweep.localCenter.SetZero();
        if (this.m_type != n.b2_staticBody && this.m_type != n.b2_kinematicBody) {
            for (var a = h.Make(0, 0), b = this.m_fixtureList; b; b =
                b.m_next)
                if (0 != b.m_density) {
                    var d = b.GetMassData();
                    this.m_mass += d.mass;
                    a.x += d.center.x * d.mass;
                    a.y += d.center.y * d.mass;
                    this.m_I += d.I
                }
            0 < this.m_mass ? (this.m_invMass = 1 / this.m_mass, a.x *= this.m_invMass, a.y *= this.m_invMass) : this.m_invMass = this.m_mass = 1;
            0 < this.m_I && 0 == (this.m_flags & n.e_fixedRotationFlag) ? (this.m_I -= this.m_mass * (a.x * a.x + a.y * a.y), this.m_I *= this.m_inertiaScale, e.b2Assert(0 < this.m_I), this.m_invI = 1 / this.m_I) : this.m_invI = this.m_I = 0;
            b = this.m_sweep.c.Copy();
            this.m_sweep.localCenter.SetV(a);
            this.m_sweep.c0.SetV(c.MulX(this.m_xf,
                this.m_sweep.localCenter));
            this.m_sweep.c.SetV(this.m_sweep.c0);
            this.m_linearVelocity.x += this.m_angularVelocity * -(this.m_sweep.c.y - b.y);
            this.m_linearVelocity.y += this.m_angularVelocity * +(this.m_sweep.c.x - b.x)
        }
    };
    n.prototype.GetWorldPoint = function(a) {
        var b = this.m_xf.R;
        a = new h(b.col1.x * a.x + b.col2.x * a.y, b.col1.y * a.x + b.col2.y * a.y);
        a.x += this.m_xf.position.x;
        a.y += this.m_xf.position.y;
        return a
    };
    n.prototype.GetWorldVector = function(a) {
        return c.MulMV(this.m_xf.R, a)
    };
    n.prototype.GetLocalPoint = function(a) {
        return c.MulXT(this.m_xf,
            a)
    };
    n.prototype.GetLocalVector = function(a) {
        return c.MulTMV(this.m_xf.R, a)
    };
    n.prototype.GetLinearVelocityFromWorldPoint = function(a) {
        return new h(this.m_linearVelocity.x - this.m_angularVelocity * (a.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (a.x - this.m_sweep.c.x))
    };
    n.prototype.GetLinearVelocityFromLocalPoint = function(a) {
        var b = this.m_xf.R;
        a = new h(b.col1.x * a.x + b.col2.x * a.y, b.col1.y * a.x + b.col2.y * a.y);
        a.x += this.m_xf.position.x;
        a.y += this.m_xf.position.y;
        return new h(this.m_linearVelocity.x -
            this.m_angularVelocity * (a.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (a.x - this.m_sweep.c.x))
    };
    n.prototype.GetLinearDamping = function() {
        return this.m_linearDamping
    };
    n.prototype.SetLinearDamping = function(a) {
        void 0 === a && (a = 0);
        this.m_linearDamping = a
    };
    n.prototype.GetAngularDamping = function() {
        return this.m_angularDamping
    };
    n.prototype.SetAngularDamping = function(a) {
        void 0 === a && (a = 0);
        this.m_angularDamping = a
    };
    n.prototype.SetType = function(a) {
        void 0 === a && (a = 0);
        if (this.m_type != a)
            for (this.m_type =
                a, this.ResetMassData(), this.m_type == n.b2_staticBody && (this.m_linearVelocity.SetZero(), this.m_angularVelocity = 0), this.SetAwake(!0), this.m_force.SetZero(), this.m_torque = 0, a = this.m_contactList; a; a = a.next) a.contact.FlagForFiltering()
    };
    n.prototype.GetType = function() {
        return this.m_type
    };
    n.prototype.SetBullet = function(a) {
        this.m_flags = a ? this.m_flags | n.e_bulletFlag : this.m_flags & ~n.e_bulletFlag
    };
    n.prototype.IsBullet = function() {
        return (this.m_flags & n.e_bulletFlag) == n.e_bulletFlag
    };
    n.prototype.SetSleepingAllowed =
        function(a) {
            a ? this.m_flags |= n.e_allowSleepFlag : (this.m_flags &= ~n.e_allowSleepFlag, this.SetAwake(!0))
        };
    n.prototype.SetAwake = function(a) {
        a ? (this.m_flags |= n.e_awakeFlag, this.m_sleepTime = 0) : (this.m_flags &= ~n.e_awakeFlag, this.m_sleepTime = 0, this.m_linearVelocity.SetZero(), this.m_angularVelocity = 0, this.m_force.SetZero(), this.m_torque = 0)
    };
    n.prototype.IsAwake = function() {
        return (this.m_flags & n.e_awakeFlag) == n.e_awakeFlag
    };
    n.prototype.SetFixedRotation = function(a) {
        this.m_flags = a ? this.m_flags | n.e_fixedRotationFlag :
            this.m_flags & ~n.e_fixedRotationFlag;
        this.ResetMassData()
    };
    n.prototype.IsFixedRotation = function() {
        return (this.m_flags & n.e_fixedRotationFlag) == n.e_fixedRotationFlag
    };
    n.prototype.SetActive = function(a) {
        if (a != this.IsActive()) {
            var b;
            if (a)
                for (this.m_flags |= n.e_activeFlag, a = this.m_y314.m_contactManager.m_broadPhase, b = this.m_fixtureList; b; b = b.m_next) b.CreateProxy(a, this.m_xf);
            else {
                this.m_flags &= ~n.e_activeFlag;
                a = this.m_y314.m_contactManager.m_broadPhase;
                for (b = this.m_fixtureList; b; b = b.m_next) b.DestroyProxy(a);
                for (a = this.m_contactList; a;) b = a, a = a.next, this.m_y314.m_contactManager.Destroy(b.contact);
                this.m_contactList = null
            }
        }
    };
    n.prototype.IsActive = function() {
        return (this.m_flags & n.e_activeFlag) == n.e_activeFlag
    };
    n.prototype.IsSleepingAllowed = function() {
        return (this.m_flags & n.e_allowSleepFlag) == n.e_allowSleepFlag
    };
    n.prototype.GetFixtureList = function() {
        return this.m_fixtureList
    };
    n.prototype.GetJointList = function() {
        return this.m_jointList
    };
    n.prototype.GetControllerList = function() {
        return this.m_controllerList
    };
    n.prototype.GetContactList =
        function() {
            return this.m_contactList
        };
    n.prototype.GetNext = function() {
        return this.m_next
    };
    n.prototype.GetUserData = function() {
        return this.m_userData
    };
    n.prototype.SetUserData = function(a) {
        this.m_userData = a
    };
    n.prototype.GetWorld = function() {
        return this.m_y314
    };
    n.prototype.y113 = function(a, b) {
        this.m_flags = 0;
        a.bullet && (this.m_flags |= n.e_bulletFlag);
        a.fixedRotation && (this.m_flags |= n.e_fixedRotationFlag);
        a.allowSleep && (this.m_flags |= n.e_allowSleepFlag);
        a.awake && (this.m_flags |= n.e_awakeFlag);
        a.active && (this.m_flags |=
            n.e_activeFlag);
        this.m_y314 = b;
        this.m_xf.position.SetV(a.position);
        this.m_xf.R.Set(a.angle);
        this.m_sweep.localCenter.SetZero();
        this.m_sweep.t0 = 1;
        this.m_sweep.a0 = this.m_sweep.a = a.angle;
        var c = this.m_xf.R,
            d = this.m_sweep.localCenter;
        this.m_sweep.c.x = c.col1.x * d.x + c.col2.x * d.y;
        this.m_sweep.c.y = c.col1.y * d.x + c.col2.y * d.y;
        this.m_sweep.c.x += this.m_xf.position.x;
        this.m_sweep.c.y += this.m_xf.position.y;
        this.m_sweep.c0.SetV(this.m_sweep.c);
        this.m_contactList = this.m_controllerList = this.m_jointList = null;
        this.m_controllerCount =
            0;
        this.m_next = this.m_prev = null;
        this.m_linearVelocity.SetV(a.linearVelocity);
        this.m_angularVelocity = a.angularVelocity;
        this.m_linearDamping = a.linearDamping;
        this.m_angularDamping = a.angularDamping;
        this.m_force.Set(0, 0);
        this.m_sleepTime = this.m_torque = 0;
        this.m_type = a.type;
        this.m_invMass = this.m_type == n.b2_dynamicBody ? this.m_mass = 1 : this.m_mass = 0;
        this.m_invI = this.m_I = 0;
        this.m_inertiaScale = a.inertiaScale;
        this.m_userData = a.userData;
        this.m_fixtureList = null;
        this.m_fixtureCount = 0
    };
    n.prototype.SynchronizeFixtures =
        function() {
            var a = n.s_xf1;
            a.R.Set(this.m_sweep.a0);
            var b = a.R,
                c = this.m_sweep.localCenter;
            a.position.x = this.m_sweep.c0.x - (b.col1.x * c.x + b.col2.x * c.y);
            a.position.y = this.m_sweep.c0.y - (b.col1.y * c.x + b.col2.y * c.y);
            c = this.m_y314.m_contactManager.m_broadPhase;
            for (b = this.m_fixtureList; b; b = b.m_next) b.Synchronize(c, a, this.m_xf)
        };
    n.prototype.SynchronizeTransform = function() {
        this.m_xf.R.Set(this.m_sweep.a);
        var a = this.m_xf.R,
            b = this.m_sweep.localCenter;
        this.m_xf.position.x = this.m_sweep.c.x - (a.col1.x * b.x + a.col2.x * b.y);
        this.m_xf.position.y = this.m_sweep.c.y - (a.col1.y * b.x + a.col2.y * b.y)
    };
    n.prototype.ShouldCollide = function(a) {
        if (this.m_type != n.b2_dynamicBody && a.m_type != n.b2_dynamicBody) return !1;
        for (var b = this.m_jointList; b; b = b.next)
            if (b.other == a && !1 == b.joint.m_collideConnected) return !1;
        return !0
    };
    n.prototype.Advance = function(a) {
        void 0 === a && (a = 0);
        this.m_sweep.Advance(a);
        this.m_sweep.c.SetV(this.m_sweep.c0);
        this.m_sweep.a = this.m_sweep.a0;
        this.SynchronizeTransform()
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.y113.s_xf1 =
            new b;
        Box2D.Dynamics.y113.e_islandFlag = 1;
        Box2D.Dynamics.y113.e_awakeFlag = 2;
        Box2D.Dynamics.y113.e_allowSleepFlag = 4;
        Box2D.Dynamics.y113.e_bulletFlag = 8;
        Box2D.Dynamics.y113.e_fixedRotationFlag = 16;
        Box2D.Dynamics.y113.e_activeFlag = 32;
        Box2D.Dynamics.y113.b2_staticBody = 0;
        Box2D.Dynamics.y113.b2_kinematicBody = 1;
        Box2D.Dynamics.y113.b2_dynamicBody = 2
    });
    C.y75 = function() {
        this.position = new h;
        this.linearVelocity = new h
    };
    C.prototype.y75 = function() {
        this.userData = null;
        this.position.Set(0, 0);
        this.angle = 0;
        this.linearVelocity.Set(0,
            0);
        this.angularDamping = this.linearDamping = this.angularVelocity = 0;
        this.awake = this.allowSleep = !0;
        this.bullet = this.fixedRotation = !1;
        this.type = n.b2_staticBody;
        this.active = !0;
        this.inertiaScale = 1
    };
    B.b2ContactFilter = function() {};
    B.prototype.ShouldCollide = function(a, b) {
        var c = a.GetFilterData(),
            d = b.GetFilterData();
        return c.groupIndex == d.groupIndex && 0 != c.groupIndex ? 0 < c.groupIndex : 0 != (c.maskBits & d.categoryBits) && 0 != (c.categoryBits & d.maskBits)
    };
    B.prototype.RayCollide = function(a, b) {
        return a ? this.ShouldCollide(a instanceof I ? a : null, b) : !0
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2ContactFilter.b2_defaultFilter = new B
    });
    H.b2ContactImpulse = function() {
        this.normalImpulses = new Vector_a2j_Number(e.b2_maxManifoldPoints);
        this.tangentImpulses = new Vector_a2j_Number(e.b2_maxManifoldPoints)
    };
    E.b2ContactListener = function() {};
    E.prototype.BeginContact = function() {};
    E.prototype.EndContact = function() {};
    E.prototype.PreSolve = function() {};
    E.prototype.PostSolve = function() {};
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2ContactListener.b2_defaultListener =
            new E
    });
    G.b2ContactManager = function() {};
    G.prototype.b2ContactManager = function() {
        this.m_y314 = null;
        this.m_contactCount = 0;
        this.m_contactFilter = B.b2_defaultFilter;
        this.m_contactListener = E.b2_defaultListener;
        this.m_contactFactory = new z(this.m_allocator);
        this.m_broadPhase = new k
    };
    G.prototype.AddPair = function(a, b) {
        var c = a instanceof I ? a : null,
            d = b instanceof I ? b : null,
            e = c.GetBody(),
            f = d.GetBody();
        if (e != f) {
            for (var p = f.GetContactList(); p;) {
                if (p.other == e) {
                    var g = p.contact.GetFixtureA(),
                        v = p.contact.GetFixtureB();
                    if (g == c && v == d || g == d && v == c) return
                }
                p = p.next
            }!1 != f.ShouldCollide(e) && !1 != this.m_contactFilter.ShouldCollide(c, d) && (p = this.m_contactFactory.Create(c, d), c = p.GetFixtureA(), d = p.GetFixtureB(), e = c.m_body, f = d.m_body, p.m_prev = null, p.m_next = this.m_y314.m_contactList, null != this.m_y314.m_contactList && (this.m_y314.m_contactList.m_prev = p), this.m_y314.m_contactList = p, p.m_nodeA.contact = p, p.m_nodeA.other = f, p.m_nodeA.prev = null, p.m_nodeA.next = e.m_contactList, null != e.m_contactList && (e.m_contactList.prev = p.m_nodeA), e.m_contactList =
                p.m_nodeA, p.m_nodeB.contact = p, p.m_nodeB.other = e, p.m_nodeB.prev = null, p.m_nodeB.next = f.m_contactList, null != f.m_contactList && (f.m_contactList.prev = p.m_nodeB), f.m_contactList = p.m_nodeB, ++this.m_y314.m_contactCount)
        }
    };
    G.prototype.FindNewContacts = function() {
        this.m_broadPhase.UpdatePairs(Box2D.generateCallback(this, this.AddPair))
    };
    G.prototype.Destroy = function(a) {
        var b = a.GetFixtureA(),
            c = a.GetFixtureB(),
            b = b.GetBody(),
            c = c.GetBody();
        a.IsTouching() && this.m_contactListener.EndContact(a);
        a.m_prev && (a.m_prev.m_next =
            a.m_next);
        a.m_next && (a.m_next.m_prev = a.m_prev);
        a == this.m_y314.m_contactList && (this.m_y314.m_contactList = a.m_next);
        a.m_nodeA.prev && (a.m_nodeA.prev.next = a.m_nodeA.next);
        a.m_nodeA.next && (a.m_nodeA.next.prev = a.m_nodeA.prev);
        a.m_nodeA == b.m_contactList && (b.m_contactList = a.m_nodeA.next);
        a.m_nodeB.prev && (a.m_nodeB.prev.next = a.m_nodeB.next);
        a.m_nodeB.next && (a.m_nodeB.next.prev = a.m_nodeB.prev);
        a.m_nodeB == c.m_contactList && (c.m_contactList = a.m_nodeB.next);
        this.m_contactFactory.Destroy(a);
        --this.m_contactCount
    };
    G.prototype.Collide = function() {
        for (var a = this.m_y314.m_contactList; a;) {
            var b = a.GetFixtureA(),
                c = a.GetFixtureB(),
                d = b.GetBody(),
                e = c.GetBody();
            if (!1 == d.IsAwake() && !1 == e.IsAwake()) a = a.GetNext();
            else {
                if (a.m_flags & A.e_filterFlag) {
                    if (!1 == e.ShouldCollide(d)) {
                        b = a;
                        a = b.GetNext();
                        this.Destroy(b);
                        continue
                    }
                    if (!1 == this.m_contactFilter.ShouldCollide(b, c)) {
                        b = a;
                        a = b.GetNext();
                        this.Destroy(b);
                        continue
                    }
                    a.m_flags &= ~A.e_filterFlag
                }!1 == this.m_broadPhase.TestOverlap(b.m_proxy, c.m_proxy) ? (b = a, a = b.GetNext(), this.Destroy(b)) :
                    (a.Update(this.m_contactListener), a = a.GetNext())
            }
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2ContactManager.s_evalCP = new g
    });
    D.y270 = function() {};
    D.prototype.y270 = function() {};
    D.prototype.SetFlags = function() {};
    D.prototype.GetFlags = function() {};
    D.prototype.AppendFlags = function() {};
    D.prototype.ClearFlags = function() {};
    D.prototype.SetSprite = function() {};
    D.prototype.GetSprite = function() {};
    D.prototype.SetDrawScale = function() {};
    D.prototype.GetDrawScale = function() {};
    D.prototype.SetLineThickness = function() {};
    D.prototype.GetLineThickness = function() {};
    D.prototype.SetAlpha = function() {};
    D.prototype.GetAlpha = function() {};
    D.prototype.SetFillAlpha = function() {};
    D.prototype.GetFillAlpha = function() {};
    D.prototype.SetXFormScale = function() {};
    D.prototype.GetXFormScale = function() {};
    D.prototype.DrawPolygon = function() {};
    D.prototype.DrawSolidPolygon = function() {};
    D.prototype.DrawCircle = function() {};
    D.prototype.DrawSolidCircle = function() {};
    D.prototype.DrawSegment = function() {};
    D.prototype.DrawTransform = function() {};
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.y270.e_y3Bit =
            1;
        Box2D.Dynamics.y270.e_jointBit = 2;
        Box2D.Dynamics.y270.e_aabbBit = 4;
        Box2D.Dynamics.y270.e_pairBit = 8;
        Box2D.Dynamics.y270.e_centerOfMassBit = 16;
        Box2D.Dynamics.y270.e_controllerBit = 32
    });
    K.b2DestructionListener = function() {};
    K.prototype.SayGoodbyeJoint = function() {};
    K.prototype.SayGoodbyeFixture = function() {};
    F.b2FilterData = function() {
        this.categoryBits = 1;
        this.maskBits = 65535;
        this.groupIndex = 0
    };
    F.prototype.Copy = function() {
        var a = new F;
        a.categoryBits = this.categoryBits;
        a.maskBits = this.maskBits;
        a.groupIndex = this.groupIndex;
        return a
    };
    I.y213 = function() {
        this.m_filter = new F
    };
    I.prototype.GetType = function() {
        return this.m_y3.GetType()
    };
    I.prototype.GetShape = function() {
        return this.m_y3
    };
    I.prototype.SetSensor = function(a) {
        if (this.m_isSensor != a && (this.m_isSensor = a, null != this.m_body))
            for (a = this.m_body.GetContactList(); a;) {
                var b = a.contact,
                    c = b.GetFixtureA(),
                    d = b.GetFixtureB();
                c != this && d != this || b.SetSensor(c.IsSensor() || d.IsSensor());
                a = a.next
            }
    };
    I.prototype.IsSensor = function() {
        return this.m_isSensor
    };
    I.prototype.SetFilterData = function(a) {
        this.m_filter =
            a.Copy();
        if (!this.m_body)
            for (a = this.m_body.GetContactList(); a;) {
                var b = a.contact,
                    c = b.GetFixtureA(),
                    d = b.GetFixtureB();
                c != this && d != this || b.FlagForFiltering();
                a = a.next
            }
    };
    I.prototype.GetFilterData = function() {
        return this.m_filter.Copy()
    };
    I.prototype.GetBody = function() {
        return this.m_body
    };
    I.prototype.GetNext = function() {
        return this.m_next
    };
    I.prototype.GetUserData = function() {
        return this.m_userData
    };
    I.prototype.SetUserData = function(a) {
        this.m_userData = a
    };
    I.prototype.TestPoint = function(a) {
        return this.m_y3.TestPoint(this.m_body.GetTransform(),
            a)
    };
    I.prototype.RayCast = function(a, b) {
        return this.m_y3.RayCast(a, b, this.m_body.GetTransform())
    };
    I.prototype.GetMassData = function(a) {
        void 0 === a && (a = null);
        null == a && (a = new t);
        this.m_y3.ComputeMass(a, this.m_density);
        return a
    };
    I.prototype.SetDensity = function(a) {
        void 0 === a && (a = 0);
        this.m_density = a
    };
    I.prototype.GetDensity = function() {
        return this.m_density
    };
    I.prototype.GetFriction = function() {
        return this.m_friction
    };
    I.prototype.SetFriction = function(a) {
        void 0 === a && (a = 0);
        this.m_friction = a
    };
    I.prototype.GetRestitution =
        function() {
            return this.m_restitution
        };
    I.prototype.SetRestitution = function(a) {
        void 0 === a && (a = 0);
        this.m_restitution = a
    };
    I.prototype.GetAABB = function() {
        return this.m_aabb
    };
    I.prototype.y213 = function() {
        this.m_aabb = new f;
        this.m_y3 = this.m_next = this.m_body = this.m_userData = null;
        this.m_restitution = this.m_friction = this.m_density = 0
    };
    I.prototype.Create = function(a, b, c) {
        this.m_userData = c.userData;
        this.m_friction = c.friction;
        this.m_restitution = c.restitution;
        this.m_body = a;
        this.m_next = null;
        this.m_filter = c.filter.Copy();
        this.m_isSensor = c.isSensor;
        this.m_y3 = c.y3.Copy();
        this.m_density = c.density
    };
    I.prototype.Destroy = function() {
        this.m_y3 = null
    };
    I.prototype.CreateProxy = function(a, b) {
        this.m_y3.ComputeAABB(this.m_aabb, b);
        this.m_proxy = a.CreateProxy(this.m_aabb, this)
    };
    I.prototype.DestroyProxy = function(a) {
        null != this.m_proxy && (a.DestroyProxy(this.m_proxy), this.m_proxy = null)
    };
    I.prototype.Synchronize = function(a, b, d) {
        if (this.m_proxy) {
            var e = new f,
                p = new f;
            this.m_y3.ComputeAABB(e, b);
            this.m_y3.ComputeAABB(p, d);
            this.m_aabb.Combine(e,
                p);
            b = c.SubtractVV(d.position, b.position);
            a.MoveProxy(this.m_proxy, this.m_aabb, b)
        }
    };
    O.y213Def = function() {
        this.filter = new F
    };
    O.prototype.y213Def = function() {
        this.userData = this.y3 = null;
        this.friction = 0.2;
        this.density = this.restitution = 0;
        this.filter.categoryBits = 1;
        this.filter.maskBits = 65535;
        this.filter.groupIndex = 0;
        this.isSensor = !1
    };
    L.b2Island = function() {};
    L.prototype.b2Island = function() {
        this.m_bodies = new Vector;
        this.m_contacts = new Vector;
        this.m_joints = new Vector
    };
    L.prototype.Initialize = function(a, b, c, d,
        e, f) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === c && (c = 0);
        var p = 0;
        this.m_bodyCapacity = a;
        this.m_contactCapacity = b;
        this.m_jointCapacity = c;
        this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
        this.m_allocator = d;
        this.m_listener = e;
        this.m_contactSolver = f;
        for (p = this.m_bodies.length; p < a; p++) this.m_bodies[p] = null;
        for (p = this.m_contacts.length; p < b; p++) this.m_contacts[p] = null;
        for (p = this.m_joints.length; p < c; p++) this.m_joints[p] = null
    };
    L.prototype.Clear = function() {
        this.m_jointCount = this.m_contactCount = this.m_bodyCount =
            0
    };
    L.prototype.Solve = function(a, b, d) {
        for (var f = 0, p = 0, g, f = 0; f < this.m_bodyCount; ++f) p = this.m_bodies[f], p.GetType() == n.b2_dynamicBody && (p.m_linearVelocity.x += a.dt * (b.x + p.m_invMass * p.m_force.x), p.m_linearVelocity.y += a.dt * (b.y + p.m_invMass * p.m_force.y), p.m_angularVelocity += a.dt * p.m_invI * p.m_torque, p.m_linearVelocity.Multiply(c.Clamp(1 - a.dt * p.m_linearDamping, 0, 1)), p.m_angularVelocity *= c.Clamp(1 - a.dt * p.m_angularDamping, 0, 1));
        this.m_contactSolver.Initialize(a, this.m_contacts, this.m_contactCount, this.m_allocator);
        b = this.m_contactSolver;
        b.InitVelocityConstraints(a);
        for (f = 0; f < this.m_jointCount; ++f) g = this.m_joints[f], g.InitVelocityConstraints(a);
        for (f = 0; f < a.velocityIterations; ++f) {
            for (p = 0; p < this.m_jointCount; ++p) g = this.m_joints[p], g.SolveVelocityConstraints(a);
            b.SolveVelocityConstraints()
        }
        for (f = 0; f < this.m_jointCount; ++f) g = this.m_joints[f], g.FinalizeVelocityConstraints();
        b.FinalizeVelocityConstraints();
        for (f = 0; f < this.m_bodyCount; ++f)
            if (p = this.m_bodies[f], p.GetType() != n.b2_staticBody) {
                var v = a.dt * p.m_linearVelocity.x,
                    z = a.dt * p.m_linearVelocity.y;
                v * v + z * z > e.b2_maxTranslationSquared && (p.m_linearVelocity.Normalize(), p.m_linearVelocity.x = p.m_linearVelocity.x * e.b2_maxTranslation * a.inv_dt, p.m_linearVelocity.y = p.m_linearVelocity.y * e.b2_maxTranslation * a.inv_dt);
                v = a.dt * p.m_angularVelocity;
                v * v > e.b2_maxRotationSquared && (p.m_angularVelocity = 0 > p.m_angularVelocity ? -e.b2_maxRotation * a.inv_dt : e.b2_maxRotation * a.inv_dt);
                p.m_sweep.c0.SetV(p.m_sweep.c);
                p.m_sweep.a0 = p.m_sweep.a;
                p.m_sweep.c.x += a.dt * p.m_linearVelocity.x;
                p.m_sweep.c.y +=
                    a.dt * p.m_linearVelocity.y;
                p.m_sweep.a += a.dt * p.m_angularVelocity;
                p.SynchronizeTransform()
            }
        for (f = 0; f < a.positionIterations; ++f) {
            v = b.SolvePositionConstraints(e.b2_contactBaumgarte);
            z = !0;
            for (p = 0; p < this.m_jointCount; ++p) g = this.m_joints[p], g = g.SolvePositionConstraints(e.b2_contactBaumgarte), z = z && g;
            if (v && z) break
        }
        this.Report(b.m_constraints);
        if (d) {
            d = Number.MAX_VALUE;
            b = e.b2_linearSleepTolerance * e.b2_linearSleepTolerance;
            v = e.b2_angularSleepTolerance * e.b2_angularSleepTolerance;
            for (f = 0; f < this.m_bodyCount; ++f) p =
                this.m_bodies[f], p.GetType() != n.b2_staticBody && (0 == (p.m_flags & n.e_allowSleepFlag) && (d = p.m_sleepTime = 0), 0 == (p.m_flags & n.e_allowSleepFlag) || p.m_angularVelocity * p.m_angularVelocity > v || c.Dot(p.m_linearVelocity, p.m_linearVelocity) > b ? d = p.m_sleepTime = 0 : (p.m_sleepTime += a.dt, d = c.Min(d, p.m_sleepTime)));
            if (d >= e.b2_timeToSleep)
                for (f = 0; f < this.m_bodyCount; ++f) p = this.m_bodies[f], p.SetAwake(!1)
        }
    };
    L.prototype.SolveTOI = function(a) {
        var b = 0,
            c = 0;
        this.m_contactSolver.Initialize(a, this.m_contacts, this.m_contactCount, this.m_allocator);
        for (var d = this.m_contactSolver, b = 0; b < this.m_jointCount; ++b) this.m_joints[b].InitVelocityConstraints(a);
        for (b = 0; b < a.velocityIterations; ++b)
            for (d.SolveVelocityConstraints(), c = 0; c < this.m_jointCount; ++c) this.m_joints[c].SolveVelocityConstraints(a);
        for (b = 0; b < this.m_bodyCount; ++b)
            if (c = this.m_bodies[b], c.GetType() != n.b2_staticBody) {
                var f = a.dt * c.m_linearVelocity.x,
                    p = a.dt * c.m_linearVelocity.y;
                f * f + p * p > e.b2_maxTranslationSquared && (c.m_linearVelocity.Normalize(), c.m_linearVelocity.x = c.m_linearVelocity.x * e.b2_maxTranslation *
                    a.inv_dt, c.m_linearVelocity.y = c.m_linearVelocity.y * e.b2_maxTranslation * a.inv_dt);
                f = a.dt * c.m_angularVelocity;
                f * f > e.b2_maxRotationSquared && (c.m_angularVelocity = 0 > c.m_angularVelocity ? -e.b2_maxRotation * a.inv_dt : e.b2_maxRotation * a.inv_dt);
                c.m_sweep.c0.SetV(c.m_sweep.c);
                c.m_sweep.a0 = c.m_sweep.a;
                c.m_sweep.c.x += a.dt * c.m_linearVelocity.x;
                c.m_sweep.c.y += a.dt * c.m_linearVelocity.y;
                c.m_sweep.a += a.dt * c.m_angularVelocity;
                c.SynchronizeTransform()
            }
        for (b = 0; b < a.positionIterations; ++b) {
            f = d.SolvePositionConstraints(0.75);
            p = !0;
            for (c = 0; c < this.m_jointCount; ++c) var g = this.m_joints[c].SolvePositionConstraints(e.b2_contactBaumgarte),
                p = p && g;
            if (f && p) break
        }
        this.Report(d.m_constraints)
    };
    L.prototype.Report = function(a) {
        if (null != this.m_listener)
            for (var b = 0; b < this.m_contactCount; ++b) {
                for (var c = this.m_contacts[b], d = a[b], e = 0; e < d.pointCount; ++e) L.s_impulse.normalImpulses[e] = d.points[e].normalImpulse, L.s_impulse.tangentImpulses[e] = d.points[e].tangentImpulse;
                this.m_listener.PostSolve(c, L.s_impulse)
            }
    };
    L.prototype.AddBody = function(a) {
        a.m_islandIndex =
            this.m_bodyCount;
        this.m_bodies[this.m_bodyCount++] = a
    };
    L.prototype.AddContact = function(a) {
        this.m_contacts[this.m_contactCount++] = a
    };
    L.prototype.AddJoint = function(a) {
        this.m_joints[this.m_jointCount++] = a
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.b2Island.s_impulse = new H
    });
    p.b2TimeStep = function() {};
    p.prototype.Set = function(a) {
        this.dt = a.dt;
        this.inv_dt = a.inv_dt;
        this.positionIterations = a.positionIterations;
        this.velocityIterations = a.velocityIterations;
        this.warmStarting = a.warmStarting
    };
    v.y230 = function() {
        this.s_stack =
            new Vector;
        this.m_contactManager = new G;
        this.m_contactSolver = new J;
        this.m_island = new L
    };
    v.prototype.y230 = function(a, b) {
        this.m_controllerList = this.m_jointList = this.m_contactList = this.m_bodyList = this.m_debugDraw = this.m_destructionListener = null;
        this.m_controllerCount = this.m_jointCount = this.m_contactCount = this.m_bodyCount = 0;
        v.m_warmStarting = !0;
        v.m_continuousPhysics = !0;
        this.m_allowSleep = b;
        this.m_y30 = a;
        this.m_inv_dt0 = 0;
        this.m_contactManager.m_y314 = this;
        this.m_groundBody = this.CreateBody(new C)
    };
    v.prototype.SetDestructionListener =
        function(a) {
            this.m_destructionListener = a
        };
    v.prototype.SetContactFilter = function(a) {
        this.m_contactManager.m_contactFilter = a
    };
    v.prototype.SetContactListener = function(a) {
        this.m_contactManager.m_contactListener = a
    };
    v.prototype.SetDebugDraw = function(a) {
        this.m_debugDraw = a
    };
    v.prototype.SetBroadPhase = function(a) {
        var b = this.m_contactManager.m_broadPhase;
        this.m_contactManager.m_broadPhase = a;
        for (var c = this.m_bodyList; c; c = c.m_next)
            for (var d = c.m_fixtureList; d; d = d.m_next) d.m_proxy = a.CreateProxy(b.GetFatAABB(d.m_proxy),
                d)
    };
    v.prototype.Validate = function() {
        this.m_contactManager.m_broadPhase.Validate()
    };
    v.prototype.GetProxyCount = function() {
        return this.m_contactManager.m_broadPhase.GetProxyCount()
    };
    v.prototype.CreateBody = function(a) {
        if (!0 == this.IsLocked()) return null;
        a = new n(a, this);
        a.m_prev = null;
        if (a.m_next = this.m_bodyList) this.m_bodyList.m_prev = a;
        this.m_bodyList = a;
        ++this.m_bodyCount;
        return a
    };
    v.prototype.DestroyBody = function(a) {
        if (!0 != this.IsLocked()) {
            for (var b = a.m_jointList; b;) {
                var c = b,
                    b = b.next;
                this.m_destructionListener &&
                    this.m_destructionListener.SayGoodbyeJoint(c.joint);
                this.DestroyJoint(c.joint)
            }
            for (b = a.m_controllerList; b;) c = b, b = b.nextController, c.controller.RemoveBody(a);
            for (b = a.m_contactList; b;) c = b, b = b.next, this.m_contactManager.Destroy(c.contact);
            a.m_contactList = null;
            for (b = a.m_fixtureList; b;) c = b, b = b.m_next, this.m_destructionListener && this.m_destructionListener.SayGoodbyeFixture(c), c.DestroyProxy(this.m_contactManager.m_broadPhase), c.Destroy();
            a.m_fixtureList = null;
            a.m_fixtureCount = 0;
            a.m_prev && (a.m_prev.m_next =
                a.m_next);
            a.m_next && (a.m_next.m_prev = a.m_prev);
            a == this.m_bodyList && (this.m_bodyList = a.m_next);
            --this.m_bodyCount
        }
    };
    v.prototype.CreateJoint = function(a) {
        var b = N.Create(a, null);
        b.m_prev = null;
        if (b.m_next = this.m_jointList) this.m_jointList.m_prev = b;
        this.m_jointList = b;
        ++this.m_jointCount;
        b.m_edgeA.joint = b;
        b.m_edgeA.other = b.m_bodyB;
        b.m_edgeA.prev = null;
        if (b.m_edgeA.next = b.m_bodyA.m_jointList) b.m_bodyA.m_jointList.prev = b.m_edgeA;
        b.m_bodyA.m_jointList = b.m_edgeA;
        b.m_edgeB.joint = b;
        b.m_edgeB.other = b.m_bodyA;
        b.m_edgeB.prev =
            null;
        if (b.m_edgeB.next = b.m_bodyB.m_jointList) b.m_bodyB.m_jointList.prev = b.m_edgeB;
        b.m_bodyB.m_jointList = b.m_edgeB;
        var c = a.bodyA,
            d = a.bodyB;
        if (!1 == a.collideConnected)
            for (a = d.GetContactList(); a;) a.other == c && a.contact.FlagForFiltering(), a = a.next;
        return b
    };
    v.prototype.DestroyJoint = function(a) {
        var b = a.m_collideConnected;
        a.m_prev && (a.m_prev.m_next = a.m_next);
        a.m_next && (a.m_next.m_prev = a.m_prev);
        a == this.m_jointList && (this.m_jointList = a.m_next);
        var c = a.m_bodyA,
            d = a.m_bodyB;
        c.SetAwake(!0);
        d.SetAwake(!0);
        a.m_edgeA.prev &&
            (a.m_edgeA.prev.next = a.m_edgeA.next);
        a.m_edgeA.next && (a.m_edgeA.next.prev = a.m_edgeA.prev);
        a.m_edgeA == c.m_jointList && (c.m_jointList = a.m_edgeA.next);
        a.m_edgeA.prev = null;
        a.m_edgeA.next = null;
        a.m_edgeB.prev && (a.m_edgeB.prev.next = a.m_edgeB.next);
        a.m_edgeB.next && (a.m_edgeB.next.prev = a.m_edgeB.prev);
        a.m_edgeB == d.m_jointList && (d.m_jointList = a.m_edgeB.next);
        a.m_edgeB.prev = null;
        a.m_edgeB.next = null;
        N.Destroy(a, null);
        --this.m_jointCount;
        if (!1 == b)
            for (a = d.GetContactList(); a;) a.other == c && a.contact.FlagForFiltering(),
                a = a.next
    };
    v.prototype.AddController = function(a) {
        a.m_next = this.m_controllerList;
        a.m_prev = null;
        this.m_controllerList = a;
        a.m_y314 = this;
        this.m_controllerCount++;
        return a
    };
    v.prototype.RemoveController = function(a) {
        a.m_prev && (a.m_prev.m_next = a.m_next);
        a.m_next && (a.m_next.m_prev = a.m_prev);
        this.m_controllerList == a && (this.m_controllerList = a.m_next);
        this.m_controllerCount--
    };
    v.prototype.CreateController = function(a) {
        if (a.m_y314 != this) throw Error("Controller can only be a member of one y314");
        a.m_next = this.m_controllerList;
        a.m_prev = null;
        this.m_controllerList && (this.m_controllerList.m_prev = a);
        this.m_controllerList = a;
        ++this.m_controllerCount;
        a.m_y314 = this;
        return a
    };
    v.prototype.DestroyController = function(a) {
        a.Clear();
        a.m_next && (a.m_next.m_prev = a.m_prev);
        a.m_prev && (a.m_prev.m_next = a.m_next);
        a == this.m_controllerList && (this.m_controllerList = a.m_next);
        --this.m_controllerCount
    };
    v.prototype.SetWarmStarting = function(a) {
        v.m_warmStarting = a
    };
    v.prototype.SetContinuousPhysics = function(a) {
        v.m_continuousPhysics = a
    };
    v.prototype.GetBodyCount =
        function() {
            return this.m_bodyCount
        };
    v.prototype.GetJointCount = function() {
        return this.m_jointCount
    };
    v.prototype.GetContactCount = function() {
        return this.m_contactCount
    };
    v.prototype.SetGravity = function(a) {
        this.m_y30 = a
    };
    v.prototype.GetGravity = function() {
        return this.m_y30
    };
    v.prototype.GetGroundBody = function() {
        return this.m_groundBody
    };
    v.prototype.Step = function(a, b, c) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        void 0 === c && (c = 0);
        this.m_flags & v.e_newFixture && (this.m_contactManager.FindNewContacts(), this.m_flags &=
            ~v.e_newFixture);
        this.m_flags |= v.e_locked;
        var d = v.s_timestep2;
        d.dt = a;
        d.velocityIterations = b;
        d.positionIterations = c;
        d.inv_dt = 0 < a ? 1 / a : 0;
        d.dtRatio = this.m_inv_dt0 * a;
        d.warmStarting = v.m_warmStarting;
        this.m_contactManager.Collide();
        0 < d.dt && this.Solve(d);
        v.m_continuousPhysics && 0 < d.dt && this.SolveTOI(d);
        0 < d.dt && (this.m_inv_dt0 = d.inv_dt);
        this.m_flags &= ~v.e_locked
    };
    v.prototype.ClearForces = function() {
        for (var a = this.m_bodyList; a; a = a.m_next) a.m_force.SetZero(), a.m_torque = 0
    };
    v.prototype.DrawDebugData = function() {
        if (null !=
            this.m_debugDraw) {
            this.m_debugDraw.m_sprite.graphics.clear();
            var a = this.m_debugDraw.GetFlags(),
                b, c, e;
            new h;
            new h;
            new h;
            var p;
            new f;
            new f;
            new h;
            new h;
            new h;
            new h;
            var g = new d(0, 0, 0);
            if (a & D.e_y3Bit)
                for (b = this.m_bodyList; b; b = b.m_next)
                    for (p = b.m_xf, c = b.GetFixtureList(); c; c = c.m_next) e = c.GetShape(), !1 == b.IsActive() ? g.Set(0.5, 0.5, 0.3) : b.GetType() == n.b2_staticBody ? g.Set(0.5, 0.9, 0.5) : b.GetType() == n.b2_kinematicBody ? g.Set(0.5, 0.5, 0.9) : !1 == b.IsAwake() ? g.Set(0.6, 0.6, 0.6) : g.Set(0.9, 0.7, 0.7), this.DrawShape(e, p, g);
            if (a & D.e_jointBit)
                for (b = this.m_jointList; b; b = b.m_next) this.DrawJoint(b);
            if (a & D.e_controllerBit)
                for (b = this.m_controllerList; b; b = b.m_next) b.Draw(this.m_debugDraw);
            if (a & D.e_pairBit)
                for (g.Set(0.3, 0.9, 0.9), b = this.m_contactManager.m_contactList; b; b = b.GetNext()) e = b.GetFixtureA(), c = b.GetFixtureB(), e = e.GetAABB().GetCenter(), c = c.GetAABB().GetCenter(), this.m_debugDraw.DrawSegment(e, c, g);
            if (a & D.e_aabbBit)
                for (e = this.m_contactManager.m_broadPhase, p = [new h, new h, new h, new h], b = this.m_bodyList; b; b = b.GetNext())
                    if (!1 !=
                        b.IsActive())
                        for (c = b.GetFixtureList(); c; c = c.GetNext()) {
                            var z = e.GetFatAABB(c.m_proxy);
                            p[0].Set(z.lowerBound.x, z.lowerBound.y);
                            p[1].Set(z.upperBound.x, z.lowerBound.y);
                            p[2].Set(z.upperBound.x, z.upperBound.y);
                            p[3].Set(z.lowerBound.x, z.upperBound.y);
                            this.m_debugDraw.DrawPolygon(p, 4, g)
                        }
                    if (a & D.e_centerOfMassBit)
                        for (b = this.m_bodyList; b; b = b.m_next) p = v.s_xf, p.R = b.m_xf.R, p.position = b.GetWorldCenter(), this.m_debugDraw.DrawTransform(p)
        }
    };
    v.prototype.QueryAABB = function(a, b) {
        var c = this.m_contactManager.m_broadPhase;
        c.Query(function(b) {
            return a(c.GetUserData(b))
        }, b)
    };
    v.prototype.QueryShape = function(a, c, d) {
        void 0 === d && (d = null);
        null == d && (d = new b, d.SetIdentity());
        var e = this.m_contactManager.m_broadPhase,
            p = new f;
        c.ComputeAABB(p, d);
        e.Query(function(b) {
            b = e.GetUserData(b) instanceof I ? e.GetUserData(b) : null;
            return y.TestOverlap(c, d, b.GetShape(), b.GetBody().GetTransform()) ? a(b) : !0
        }, p)
    };
    v.prototype.QueryPoint = function(a, b) {
        var c = this.m_contactManager.m_broadPhase,
            d = new f;
        d.lowerBound.Set(b.x - e.b2_linearSlop, b.y - e.b2_linearSlop);
        d.upperBound.Set(b.x + e.b2_linearSlop, b.y + e.b2_linearSlop);
        c.Query(function(d) {
            d = c.GetUserData(d) instanceof I ? c.GetUserData(d) : null;
            return d.TestPoint(b) ? a(d) : !0
        }, d)
    };
    v.prototype.RayCast = function(a, b, c) {
        var d = this.m_contactManager.m_broadPhase,
            e = new q,
            p = new m(b, c);
        d.RayCast(function(p, f) {
            var g = d.GetUserData(f),
                g = g instanceof I ? g : null;
            if (g.RayCast(e, p)) {
                var v = e.fraction,
                    z = new h((1 - v) * b.x + v * c.x, (1 - v) * b.y + v * c.y);
                return a(g, z, e.normal, v)
            }
            return p.maxFraction
        }, p)
    };
    v.prototype.RayCastOne = function(a, b) {
        var c;
        this.RayCast(function(a, b, d, e) {
            void 0 === e && (e = 0);
            c = a;
            return e
        }, a, b);
        return c
    };
    v.prototype.RayCastAll = function(a, b) {
        var c = new Vector;
        this.RayCast(function(a) {
            c[c.length] = a;
            return 1
        }, a, b);
        return c
    };
    v.prototype.GetBodyList = function() {
        return this.m_bodyList
    };
    v.prototype.GetJointList = function() {
        return this.m_jointList
    };
    v.prototype.GetContactList = function() {
        return this.m_contactList
    };
    v.prototype.IsLocked = function() {
        return 0 < (this.m_flags & v.e_locked)
    };
    v.prototype.Solve = function(a) {
        for (var b, c = this.m_controllerList; c; c =
            c.m_next) c.Step(a);
        c = this.m_island;
        c.Initialize(this.m_bodyCount, this.m_contactCount, this.m_jointCount, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
        for (b = this.m_bodyList; b; b = b.m_next) b.m_flags &= ~n.e_islandFlag;
        for (var d = this.m_contactList; d; d = d.m_next) d.m_flags &= ~A.e_islandFlag;
        for (d = this.m_jointList; d; d = d.m_next) d.m_islandFlag = !1;
        parseInt(this.m_bodyCount);
        for (var d = this.s_stack, e = this.m_bodyList; e; e = e.m_next)
            if (!(e.m_flags & n.e_islandFlag) && !1 != e.IsAwake() && !1 != e.IsActive() &&
                e.GetType() != n.b2_staticBody) {
                c.Clear();
                var p = 0;
                d[p++] = e;
                for (e.m_flags |= n.e_islandFlag; 0 < p;)
                    if (b = d[--p], c.AddBody(b), !1 == b.IsAwake() && b.SetAwake(!0), b.GetType() != n.b2_staticBody) {
                        for (var f, g = b.m_contactList; g; g = g.next) g.contact.m_flags & A.e_islandFlag || !0 == g.contact.IsSensor() || !1 == g.contact.IsEnabled() || !1 == g.contact.IsTouching() || (c.AddContact(g.contact), g.contact.m_flags |= A.e_islandFlag, f = g.other, f.m_flags & n.e_islandFlag || (d[p++] = f, f.m_flags |= n.e_islandFlag));
                        for (b = b.m_jointList; b; b = b.next) !0 !=
                            b.joint.m_islandFlag && (f = b.other, !1 != f.IsActive() && (c.AddJoint(b.joint), b.joint.m_islandFlag = !0, f.m_flags & n.e_islandFlag || (d[p++] = f, f.m_flags |= n.e_islandFlag)))
                    }
                c.Solve(a, this.m_y30, this.m_allowSleep);
                for (p = 0; p < c.m_bodyCount; ++p) b = c.m_bodies[p], b.GetType() == n.b2_staticBody && (b.m_flags &= ~n.e_islandFlag)
            }
        for (p = 0; p < d.length && d[p]; ++p) d[p] = null;
        for (b = this.m_bodyList; b; b = b.m_next) !1 == b.IsAwake() || !1 == b.IsActive() || b.GetType() != n.b2_staticBody && b.SynchronizeFixtures();
        this.m_contactManager.FindNewContacts()
    };
    v.prototype.SolveTOI = function(a) {
        var b, c, d, p = this.m_island;
        p.Initialize(this.m_bodyCount, e.b2_maxTOIContactsPerIsland, e.b2_maxTOIJointsPerIsland, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
        var f = v.s_queue;
        for (b = this.m_bodyList; b; b = b.m_next) b.m_flags &= ~n.e_islandFlag, b.m_sweep.t0 = 0;
        for (d = this.m_contactList; d; d = d.m_next) d.m_flags &= ~(A.e_toiFlag | A.e_islandFlag);
        for (d = this.m_jointList; d; d = d.m_next) d.m_islandFlag = !1;
        for (;;) {
            var g = null,
                z = 1;
            for (d = this.m_contactList; d; d = d.m_next)
                if (!0 !=
                    d.IsSensor() && !1 != d.IsEnabled() && !1 != d.IsContinuous()) {
                    if (d.m_flags & A.e_toiFlag) b = d.m_toi;
                    else {
                        b = d.m_fixtureA;
                        c = d.m_fixtureB;
                        b = b.m_body;
                        c = c.m_body;
                        if (!(b.GetType() == n.b2_dynamicBody && !1 != b.IsAwake() || c.GetType() == n.b2_dynamicBody && !1 != c.IsAwake())) continue;
                        var h = b.m_sweep.t0;
                        b.m_sweep.t0 < c.m_sweep.t0 ? (h = c.m_sweep.t0, b.m_sweep.Advance(h)) : c.m_sweep.t0 < b.m_sweep.t0 && (h = b.m_sweep.t0, c.m_sweep.Advance(h));
                        b = d.ComputeTOI(b.m_sweep, c.m_sweep);
                        e.b2Assert(0 <= b && 1 >= b);
                        0 < b && 1 > b && (b = (1 - b) * h + b, 1 < b && (b = 1));
                        d.m_toi =
                            b;
                        d.m_flags |= A.e_toiFlag
                    }
                    Number.MIN_VALUE < b && b < z && (g = d, z = b)
                }
            if (null == g || 1 - 100 * Number.MIN_VALUE < z) break;
            b = g.m_fixtureA;
            c = g.m_fixtureB;
            b = b.m_body;
            c = c.m_body;
            v.s_backupA.Set(b.m_sweep);
            v.s_backupB.Set(c.m_sweep);
            b.Advance(z);
            c.Advance(z);
            g.Update(this.m_contactManager.m_contactListener);
            g.m_flags &= ~A.e_toiFlag;
            if (!0 == g.IsSensor() || !1 == g.IsEnabled()) b.m_sweep.Set(v.s_backupA), c.m_sweep.Set(v.s_backupB), b.SynchronizeTransform(), c.SynchronizeTransform();
            else if (!1 != g.IsTouching()) {
                b.GetType() != n.b2_dynamicBody &&
                    (b = c);
                p.Clear();
                g = d = 0;
                f[d + g++] = b;
                for (b.m_flags |= n.e_islandFlag; 0 < g;)
                    if (b = f[d++], --g, p.AddBody(b), !1 == b.IsAwake() && b.SetAwake(!0), b.GetType() == n.b2_dynamicBody) {
                        for (c = b.m_contactList; c && p.m_contactCount != p.m_contactCapacity; c = c.next) c.contact.m_flags & A.e_islandFlag || !0 == c.contact.IsSensor() || !1 == c.contact.IsEnabled() || !1 == c.contact.IsTouching() || (p.AddContact(c.contact), c.contact.m_flags |= A.e_islandFlag, h = c.other, h.m_flags & n.e_islandFlag || (h.GetType() != n.b2_staticBody && (h.Advance(z), h.SetAwake(!0)),
                            f[d + g] = h, ++g, h.m_flags |= n.e_islandFlag));
                        for (b = b.m_jointList; b; b = b.next) p.m_jointCount != p.m_jointCapacity && !0 != b.joint.m_islandFlag && (h = b.other, !1 != h.IsActive() && (p.AddJoint(b.joint), b.joint.m_islandFlag = !0, h.m_flags & n.e_islandFlag || (h.GetType() != n.b2_staticBody && (h.Advance(z), h.SetAwake(!0)), f[d + g] = h, ++g, h.m_flags |= n.e_islandFlag)))
                    }
                d = v.s_timestep;
                d.warmStarting = !1;
                d.dt = (1 - z) * a.dt;
                d.inv_dt = 1 / d.dt;
                d.dtRatio = 0;
                d.velocityIterations = a.velocityIterations;
                d.positionIterations = a.positionIterations;
                p.SolveTOI(d);
                for (z = z = 0; z < p.m_bodyCount; ++z)
                    if (b = p.m_bodies[z], b.m_flags &= ~n.e_islandFlag, !1 != b.IsAwake() && b.GetType() == n.b2_dynamicBody)
                        for (b.SynchronizeFixtures(), c = b.m_contactList; c; c = c.next) c.contact.m_flags &= ~A.e_toiFlag;
                for (z = 0; z < p.m_contactCount; ++z) d = p.m_contacts[z], d.m_flags &= ~(A.e_toiFlag | A.e_islandFlag);
                for (z = 0; z < p.m_jointCount; ++z) d = p.m_joints[z], d.m_islandFlag = !1;
                this.m_contactManager.FindNewContacts()
            }
        }
    };
    v.prototype.DrawJoint = function(a) {
        var b = a.GetBodyA(),
            c = a.GetBodyB(),
            d = b.m_xf.position,
            e = c.m_xf.position,
            p = a.GetAnchorA(),
            f = a.GetAnchorB(),
            g = v.s_jointColor;
        switch (a.m_type) {
            case N.e_distanceJoint:
                this.m_debugDraw.DrawSegment(p, f, g);
                break;
            case N.e_pulleyJoint:
                b = a instanceof P ? a : null;
                a = b.GetGroundAnchorA();
                b = b.GetGroundAnchorB();
                this.m_debugDraw.DrawSegment(a, p, g);
                this.m_debugDraw.DrawSegment(b, f, g);
                this.m_debugDraw.DrawSegment(a, b, g);
                break;
            case N.e_mouseJoint:
                this.m_debugDraw.DrawSegment(p, f, g);
                break;
            default:
                b != this.m_groundBody && this.m_debugDraw.DrawSegment(d, p, g), this.m_debugDraw.DrawSegment(p, f, g),
                    c != this.m_groundBody && this.m_debugDraw.DrawSegment(e, f, g)
        }
    };
    v.prototype.DrawShape = function(a, b, d) {
        switch (a.m_type) {
            case y.e_circleShape:
                var e = a instanceof w ? a : null;
                this.m_debugDraw.DrawSolidCircle(c.MulX(b, e.m_p), e.m_radius, b.R.col1, d);
                break;
            case y.e_polygonShape:
                e = a instanceof x ? a : null;
                a = parseInt(e.GetVertexCount());
                for (var p = e.GetVertices(), f = new Vector(a), e = 0; e < a; ++e) f[e] = c.MulX(b, p[e]);
                this.m_debugDraw.DrawSolidPolygon(f, a, d);
                break;
            case y.e_edgeShape:
                e = a instanceof u ? a : null, this.m_debugDraw.DrawSegment(c.MulX(b,
                    e.GetVertex1()), c.MulX(b, e.GetVertex2()), d)
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.y230.s_timestep2 = new p;
        Box2D.Dynamics.y230.s_xf = new b;
        Box2D.Dynamics.y230.s_backupA = new a;
        Box2D.Dynamics.y230.s_backupB = new a;
        Box2D.Dynamics.y230.s_timestep = new p;
        Box2D.Dynamics.y230.s_queue = new Vector;
        Box2D.Dynamics.y230.s_jointColor = new d(0.5, 0.8, 0.8);
        Box2D.Dynamics.y230.e_newFixture = 1;
        Box2D.Dynamics.y230.e_locked = 2
    })
})();
(function() {
    var c = Box2D.Collision.Shapes.y141,
        a = Box2D.Collision.Shapes.b2EdgeShape,
        b = Box2D.Collision.Shapes.y271,
        h = Box2D.Collision.Shapes.b2Shape,
        d = Box2D.Dynamics.Contacts.b2CircleContact,
        e = Box2D.Dynamics.Contacts.b2Contact,
        f = Box2D.Dynamics.Contacts.b2ContactConstraint,
        g = Box2D.Dynamics.Contacts.b2ContactConstraintPoint,
        k = Box2D.Dynamics.Contacts.b2ContactEdge,
        m = Box2D.Dynamics.Contacts.b2ContactFactory,
        q = Box2D.Dynamics.Contacts.b2ContactRegister,
        w = Box2D.Dynamics.Contacts.b2ContactResult,
        u = Box2D.Dynamics.Contacts.b2ContactSolver,
        t = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact,
        x = Box2D.Dynamics.Contacts.b2NullContact,
        y = Box2D.Dynamics.Contacts.b2PolyAndCircleContact,
        n = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact,
        C = Box2D.Dynamics.Contacts.b2PolygonContact,
        B = Box2D.Dynamics.Contacts.b2PositionSolverManifold,
        H = Box2D.Dynamics.y113,
        E = Box2D.Dynamics.b2TimeStep,
        G = Box2D.Common.b2Settings,
        D = Box2D.Common.Math.b2Mat22,
        K = Box2D.Common.Math.b2Math,
        F = Box2D.Common.Math.y290,
        I = Box2D.Collision.b2Collision,
        O = Box2D.Collision.b2ContactID,
        L = Box2D.Collision.b2Manifold,
        p = Box2D.Collision.b2TimeOfImpact,
        v = Box2D.Collision.b2TOIInput,
        A = Box2D.Collision.y230Manifold;
    Box2D.inherit(d, Box2D.Dynamics.Contacts.b2Contact);
    d.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    d.b2CircleContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    d.Create = function() {
        return new d
    };
    d.Destroy = function() {};
    d.prototype.Reset = function(a, b) {
        this.__super.Reset.call(this, a, b)
    };
    d.prototype.Evaluate = function() {
        var a = this.m_fixtureA.GetBody(),
            b = this.m_fixtureB.GetBody();
        I.CollideCircles(this.m_manifold, this.m_fixtureA.GetShape() instanceof c ? this.m_fixtureA.GetShape() : null, a.m_xf, this.m_fixtureB.GetShape() instanceof c ? this.m_fixtureB.GetShape() : null, b.m_xf)
    };
    e.b2Contact = function() {
        this.m_nodeA = new k;
        this.m_nodeB = new k;
        this.m_manifold = new L;
        this.m_oldManifold = new L
    };
    e.prototype.GetManifold = function() {
        return this.m_manifold
    };
    e.prototype.GetWorldManifold = function(a) {
        var b = this.m_fixtureA.GetBody(),
            c = this.m_fixtureB.GetBody(),
            d = this.m_fixtureA.GetShape(),
            e = this.m_fixtureB.GetShape();
        a.Initialize(this.m_manifold, b.GetTransform(), d.m_radius, c.GetTransform(), e.m_radius)
    };
    e.prototype.IsTouching = function() {
        return (this.m_flags & e.e_touchingFlag) == e.e_touchingFlag
    };
    e.prototype.IsContinuous = function() {
        return (this.m_flags & e.e_continuousFlag) == e.e_continuousFlag
    };
    e.prototype.SetSensor = function(a) {
        this.m_flags = a ? this.m_flags | e.e_sensorFlag : this.m_flags & ~e.e_sensorFlag
    };
    e.prototype.IsSensor = function() {
        return (this.m_flags & e.e_sensorFlag) == e.e_sensorFlag
    };
    e.prototype.SetEnabled = function(a) {
        this.m_flags =
            a ? this.m_flags | e.e_enabledFlag : this.m_flags & ~e.e_enabledFlag
    };
    e.prototype.IsEnabled = function() {
        return (this.m_flags & e.e_enabledFlag) == e.e_enabledFlag
    };
    e.prototype.GetNext = function() {
        return this.m_next
    };
    e.prototype.GetFixtureA = function() {
        return this.m_fixtureA
    };
    e.prototype.GetFixtureB = function() {
        return this.m_fixtureB
    };
    e.prototype.FlagForFiltering = function() {
        this.m_flags |= e.e_filterFlag
    };
    e.prototype.b2Contact = function() {};
    e.prototype.Reset = function(a, b) {
        void 0 === a && (a = null);
        void 0 === b && (b = null);
        this.m_flags =
            e.e_enabledFlag;
        if (a && b) {
            if (a.IsSensor() || b.IsSensor()) this.m_flags |= e.e_sensorFlag;
            var c = a.GetBody(),
                d = b.GetBody();
            if (c.GetType() != H.b2_dynamicBody || c.IsBullet() || d.GetType() != H.b2_dynamicBody || d.IsBullet()) this.m_flags |= e.e_continuousFlag;
            this.m_fixtureA = a;
            this.m_fixtureB = b;
            this.m_manifold.m_pointCount = 0;
            this.m_next = this.m_prev = null;
            this.m_nodeA.contact = null;
            this.m_nodeA.prev = null;
            this.m_nodeA.next = null;
            this.m_nodeA.other = null;
            this.m_nodeB.contact = null;
            this.m_nodeB.prev = null;
            this.m_nodeB.next = null;
            this.m_nodeB.other = null
        } else this.m_fixtureB = this.m_fixtureA = null
    };
    e.prototype.Update = function(a) {
        var b = this.m_oldManifold;
        this.m_oldManifold = this.m_manifold;
        this.m_manifold = b;
        this.m_flags |= e.e_enabledFlag;
        var c = !1,
            b = (this.m_flags & e.e_touchingFlag) == e.e_touchingFlag,
            d = this.m_fixtureA.m_body,
            p = this.m_fixtureB.m_body,
            f = this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
        if (this.m_flags & e.e_sensorFlag) f && (c = this.m_fixtureA.GetShape(), f = this.m_fixtureB.GetShape(), d = d.GetTransform(), p = p.GetTransform(),
            c = h.TestOverlap(c, d, f, p)), this.m_manifold.m_pointCount = 0;
        else {
            d.GetType() != H.b2_dynamicBody || d.IsBullet() || p.GetType() != H.b2_dynamicBody || p.IsBullet() ? this.m_flags |= e.e_continuousFlag : this.m_flags &= ~e.e_continuousFlag;
            if (f)
                for (this.Evaluate(), c = 0 < this.m_manifold.m_pointCount, f = 0; f < this.m_manifold.m_pointCount; ++f) {
                    var g = this.m_manifold.m_points[f];
                    g.m_normalImpulse = 0;
                    g.m_tangentImpulse = 0;
                    for (var v = g.m_id, A = 0; A < this.m_oldManifold.m_pointCount; ++A) {
                        var k = this.m_oldManifold.m_points[A];
                        if (k.m_id.key ==
                            v.key) {
                            g.m_normalImpulse = k.m_normalImpulse;
                            g.m_tangentImpulse = k.m_tangentImpulse;
                            break
                        }
                    }
                } else this.m_manifold.m_pointCount = 0;
            c != b && (d.SetAwake(!0), p.SetAwake(!0))
        }
        this.m_flags = c ? this.m_flags | e.e_touchingFlag : this.m_flags & ~e.e_touchingFlag;
        !1 == b && !0 == c && a.BeginContact(this);
        !0 == b && !1 == c && a.EndContact(this);
        0 == (this.m_flags & e.e_sensorFlag) && a.PreSolve(this, this.m_oldManifold)
    };
    e.prototype.Evaluate = function() {};
    e.prototype.ComputeTOI = function(a, b) {
        e.s_input.proxyA.Set(this.m_fixtureA.GetShape());
        e.s_input.proxyB.Set(this.m_fixtureB.GetShape());
        e.s_input.sweepA = a;
        e.s_input.sweepB = b;
        e.s_input.tolerance = G.b2_linearSlop;
        return p.TimeOfImpact(e.s_input)
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Contacts.b2Contact.e_sensorFlag = 1;
        Box2D.Dynamics.Contacts.b2Contact.e_continuousFlag = 2;
        Box2D.Dynamics.Contacts.b2Contact.e_islandFlag = 4;
        Box2D.Dynamics.Contacts.b2Contact.e_toiFlag = 8;
        Box2D.Dynamics.Contacts.b2Contact.e_touchingFlag = 16;
        Box2D.Dynamics.Contacts.b2Contact.e_enabledFlag = 32;
        Box2D.Dynamics.Contacts.b2Contact.e_filterFlag = 64;
        Box2D.Dynamics.Contacts.b2Contact.s_input =
            new v
    });
    f.b2ContactConstraint = function() {
        this.localPlaneNormal = new F;
        this.localPoint = new F;
        this.normal = new F;
        this.normalMass = new D;
        this.K = new D
    };
    f.prototype.b2ContactConstraint = function() {
        this.points = new Vector(G.b2_maxManifoldPoints);
        for (var a = 0; a < G.b2_maxManifoldPoints; a++) this.points[a] = new g
    };
    g.b2ContactConstraintPoint = function() {
        this.localPoint = new F;
        this.rA = new F;
        this.rB = new F
    };
    k.b2ContactEdge = function() {};
    m.b2ContactFactory = function() {};
    m.prototype.b2ContactFactory = function(a) {
        this.m_allocator =
            a;
        this.InitializeRegisters()
    };
    m.prototype.AddType = function(a, b, c, d) {
        void 0 === c && (c = 0);
        void 0 === d && (d = 0);
        this.m_registers[c][d].createFcn = a;
        this.m_registers[c][d].destroyFcn = b;
        this.m_registers[c][d].primary = !0;
        c != d && (this.m_registers[d][c].createFcn = a, this.m_registers[d][c].destroyFcn = b, this.m_registers[d][c].primary = !1)
    };
    m.prototype.InitializeRegisters = function() {
        this.m_registers = new Vector(h.e_y3TypeCount);
        for (var a = 0; a < h.e_y3TypeCount; a++) {
            this.m_registers[a] = new Vector(h.e_y3TypeCount);
            for (var b =
                    0; b < h.e_y3TypeCount; b++) this.m_registers[a][b] = new q
        }
        this.AddType(d.Create, d.Destroy, h.e_circleShape, h.e_circleShape);
        this.AddType(y.Create, y.Destroy, h.e_polygonShape, h.e_circleShape);
        this.AddType(C.Create, C.Destroy, h.e_polygonShape, h.e_polygonShape);
        this.AddType(t.Create, t.Destroy, h.e_edgeShape, h.e_circleShape);
        this.AddType(n.Create, n.Destroy, h.e_polygonShape, h.e_edgeShape)
    };
    m.prototype.Create = function(a, b) {
        var c = parseInt(a.GetType()),
            d = parseInt(b.GetType()),
            c = this.m_registers[c][d];
        if (c.pool) return d =
            c.pool, c.pool = d.m_next, c.poolCount--, d.Reset(a, b), d;
        d = c.createFcn;
        return null != d ? (c.primary ? (d = d(this.m_allocator), d.Reset(a, b)) : (d = d(this.m_allocator), d.Reset(b, a)), d) : null
    };
    m.prototype.Destroy = function(a) {
        0 < a.m_manifold.m_pointCount && (a.m_fixtureA.m_body.SetAwake(!0), a.m_fixtureB.m_body.SetAwake(!0));
        var b = parseInt(a.m_fixtureA.GetType()),
            c = parseInt(a.m_fixtureB.GetType()),
            b = this.m_registers[b][c];
        b.poolCount++;
        a.m_next = b.pool;
        b.pool = a;
        b = b.destroyFcn;
        b(a, this.m_allocator)
    };
    q.b2ContactRegister = function() {};
    w.b2ContactResult = function() {
        this.position = new F;
        this.normal = new F;
        this.id = new O
    };
    u.b2ContactSolver = function() {
        this.m_step = new E;
        this.m_constraints = new Vector
    };
    u.prototype.b2ContactSolver = function() {};
    u.prototype.Initialize = function(a, b, c, d) {
        void 0 === c && (c = 0);
        var e;
        this.m_step.Set(a);
        this.m_allocator = d;
        for (this.m_constraintCount = c; this.m_constraints.length < this.m_constraintCount;) this.m_constraints[this.m_constraints.length] = new f;
        for (a = 0; a < c; ++a) {
            e = b[a];
            d = e.m_fixtureA;
            var p = e.m_fixtureB,
                g = d.m_y3.m_radius,
                v = p.m_y3.m_radius,
                A = d.m_body,
                h = p.m_body,
                k = e.GetManifold(),
                n = G.b2MixFriction(d.GetFriction(), p.GetFriction()),
                m = G.b2MixRestitution(d.GetRestitution(), p.GetRestitution()),
                q = A.m_linearVelocity.x,
                t = A.m_linearVelocity.y,
                w = h.m_linearVelocity.x,
                x = h.m_linearVelocity.y,
                y = A.m_angularVelocity,
                B = h.m_angularVelocity;
            G.b2Assert(0 < k.m_pointCount);
            u.s_y169.Initialize(k, A.m_xf, g, h.m_xf, v);
            p = u.s_y169.m_normal.x;
            e = u.s_y169.m_normal.y;
            d = this.m_constraints[a];
            d.bodyA = A;
            d.bodyB = h;
            d.manifold = k;
            d.normal.x = p;
            d.normal.y = e;
            d.pointCount = k.m_pointCount;
            d.friction = n;
            d.restitution = m;
            d.localPlaneNormal.x = k.m_localPlaneNormal.x;
            d.localPlaneNormal.y = k.m_localPlaneNormal.y;
            d.localPoint.x = k.m_localPoint.x;
            d.localPoint.y = k.m_localPoint.y;
            d.radius = g + v;
            d.type = k.m_type;
            for (g = 0; g < d.pointCount; ++g) {
                n = k.m_points[g];
                v = d.points[g];
                v.normalImpulse = n.m_normalImpulse;
                v.tangentImpulse = n.m_tangentImpulse;
                v.localPoint.SetV(n.m_localPoint);
                var n = v.rA.x = u.s_y169.m_points[g].x - A.m_sweep.c.x,
                    m = v.rA.y = u.s_y169.m_points[g].y - A.m_sweep.c.y,
                    C = v.rB.x =
                    u.s_y169.m_points[g].x - h.m_sweep.c.x,
                    D = v.rB.y = u.s_y169.m_points[g].y - h.m_sweep.c.y,
                    E = n * e - m * p,
                    F = C * e - D * p,
                    E = E * E,
                    F = F * F;
                v.normalMass = 1 / (A.m_invMass + h.m_invMass + A.m_invI * E + h.m_invI * F);
                var H = A.m_mass * A.m_invMass + h.m_mass * h.m_invMass,
                    H = H + (A.m_mass * A.m_invI * E + h.m_mass * h.m_invI * F);
                v.equalizedMass = 1 / H;
                F = e;
                H = -p;
                E = n * H - m * F;
                F = C * H - D * F;
                E *= E;
                F *= F;
                v.tangentMass = 1 / (A.m_invMass + h.m_invMass + A.m_invI * E + h.m_invI * F);
                v.velocityBias = 0;
                n = d.normal.x * (w + -B * D - q - -y * m) + d.normal.y * (x + B * C - t - y * n);
                n < -G.b2_velocityThreshold && (v.velocityBias +=
                    -d.restitution * n)
            }
            2 == d.pointCount && (x = d.points[0], w = d.points[1], k = A.m_invMass, A = A.m_invI, q = h.m_invMass, h = h.m_invI, t = x.rA.x * e - x.rA.y * p, x = x.rB.x * e - x.rB.y * p, y = w.rA.x * e - w.rA.y * p, w = w.rB.x * e - w.rB.y * p, p = k + q + A * t * t + h * x * x, e = k + q + A * y * y + h * w * w, h = k + q + A * t * y + h * x * w, p * p < 100 * (p * e - h * h) ? (d.K.col1.Set(p, h), d.K.col2.Set(h, e), d.K.GetInverse(d.normalMass)) : d.pointCount = 1)
        }
    };
    u.prototype.InitVelocityConstraints = function(a) {
        for (var b = 0; b < this.m_constraintCount; ++b) {
            var c = this.m_constraints[b],
                d = c.bodyA,
                e = c.bodyB,
                p = d.m_invMass,
                f = d.m_invI,
                g = e.m_invMass,
                v = e.m_invI,
                A = c.normal.x,
                h = c.normal.y,
                k = h,
                n = -A,
                m = 0,
                q = 0;
            if (a.warmStarting)
                for (q = c.pointCount, m = 0; m < q; ++m) {
                    var u = c.points[m];
                    u.normalImpulse *= a.dtRatio;
                    u.tangentImpulse *= a.dtRatio;
                    var t = u.normalImpulse * A + u.tangentImpulse * k,
                        w = u.normalImpulse * h + u.tangentImpulse * n;
                    d.m_angularVelocity -= f * (u.rA.x * w - u.rA.y * t);
                    d.m_linearVelocity.x -= p * t;
                    d.m_linearVelocity.y -= p * w;
                    e.m_angularVelocity += v * (u.rB.x * w - u.rB.y * t);
                    e.m_linearVelocity.x += g * t;
                    e.m_linearVelocity.y += g * w
                } else
                    for (q = c.pointCount, m = 0; m <
                        q; ++m) d = c.points[m], d.normalImpulse = 0, d.tangentImpulse = 0
        }
    };
    u.prototype.SolveVelocityConstraints = function() {
        for (var a = 0, b, c = 0, d = 0, e = 0, p = 0, f = 0, g = 0, v = 0, A, h = 0; h < this.m_constraintCount; ++h) {
            var e = this.m_constraints[h],
                k = e.bodyA,
                n = e.bodyB,
                m = k.m_angularVelocity,
                u = n.m_angularVelocity,
                q = k.m_linearVelocity,
                t = n.m_linearVelocity,
                w = k.m_invMass,
                x = k.m_invI,
                y = n.m_invMass,
                B = n.m_invI,
                g = e.normal.x,
                C = v = e.normal.y;
            A = -g;
            f = e.friction;
            for (a = 0; a < e.pointCount; a++) b = e.points[a], c = t.x - u * b.rB.y - q.x + m * b.rA.y, d = t.y + u * b.rB.x - q.y -
                m * b.rA.x, c = c * C + d * A, c = b.tangentMass * -c, d = f * b.normalImpulse, d = K.Clamp(b.tangentImpulse + c, -d, d), c = d - b.tangentImpulse, p = c * C, c *= A, q.x -= w * p, q.y -= w * c, m -= x * (b.rA.x * c - b.rA.y * p), t.x += y * p, t.y += y * c, u += B * (b.rB.x * c - b.rB.y * p), b.tangentImpulse = d;
            parseInt(e.pointCount);
            if (1 == e.pointCount) b = e.points[0], c = t.x + -u * b.rB.y - q.x - -m * b.rA.y, d = t.y + u * b.rB.x - q.y - m * b.rA.x, e = c * g + d * v, c = -b.normalMass * (e - b.velocityBias), d = b.normalImpulse + c, d = 0 < d ? d : 0, c = d - b.normalImpulse, p = c * g, c *= v, q.x -= w * p, q.y -= w * c, m -= x * (b.rA.x * c - b.rA.y * p), t.x += y *
                p, t.y += y * c, u += B * (b.rB.x * c - b.rB.y * p), b.normalImpulse = d;
            else {
                b = e.points[0];
                var a = e.points[1],
                    c = b.normalImpulse,
                    f = a.normalImpulse,
                    D = (t.x - u * b.rB.y - q.x + m * b.rA.y) * g + (t.y + u * b.rB.x - q.y - m * b.rA.x) * v,
                    E = (t.x - u * a.rB.y - q.x + m * a.rA.y) * g + (t.y + u * a.rB.x - q.y - m * a.rA.x) * v,
                    d = D - b.velocityBias,
                    p = E - a.velocityBias;
                A = e.K;
                d -= A.col1.x * c + A.col2.x * f;
                for (p -= A.col1.y * c + A.col2.y * f;;) {
                    A = e.normalMass;
                    C = -(A.col1.x * d + A.col2.x * p);
                    A = -(A.col1.y * d + A.col2.y * p);
                    if (0 <= C && 0 <= A) {
                        c = C - c;
                        f = A - f;
                        e = c * g;
                        c *= v;
                        g *= f;
                        v *= f;
                        q.x -= w * (e + g);
                        q.y -= w * (c + v);
                        m -= x * (b.rA.x *
                            c - b.rA.y * e + a.rA.x * v - a.rA.y * g);
                        t.x += y * (e + g);
                        t.y += y * (c + v);
                        u += B * (b.rB.x * c - b.rB.y * e + a.rB.x * v - a.rB.y * g);
                        b.normalImpulse = C;
                        a.normalImpulse = A;
                        break
                    }
                    C = -b.normalMass * d;
                    A = 0;
                    E = e.K.col1.y * C + p;
                    if (0 <= C && 0 <= E) {
                        c = C - c;
                        f = A - f;
                        e = c * g;
                        c *= v;
                        g *= f;
                        v *= f;
                        q.x -= w * (e + g);
                        q.y -= w * (c + v);
                        m -= x * (b.rA.x * c - b.rA.y * e + a.rA.x * v - a.rA.y * g);
                        t.x += y * (e + g);
                        t.y += y * (c + v);
                        u += B * (b.rB.x * c - b.rB.y * e + a.rB.x * v - a.rB.y * g);
                        b.normalImpulse = C;
                        a.normalImpulse = A;
                        break
                    }
                    C = 0;
                    A = -a.normalMass * p;
                    D = e.K.col2.x * A + d;
                    if (0 <= A && 0 <= D) {
                        c = C - c;
                        f = A - f;
                        e = c * g;
                        c *= v;
                        g *= f;
                        v *= f;
                        q.x -= w *
                            (e + g);
                        q.y -= w * (c + v);
                        m -= x * (b.rA.x * c - b.rA.y * e + a.rA.x * v - a.rA.y * g);
                        t.x += y * (e + g);
                        t.y += y * (c + v);
                        u += B * (b.rB.x * c - b.rB.y * e + a.rB.x * v - a.rB.y * g);
                        b.normalImpulse = C;
                        a.normalImpulse = A;
                        break
                    }
                    A = C = 0;
                    D = d;
                    E = p;
                    if (0 <= D && 0 <= E) {
                        c = C - c;
                        f = A - f;
                        e = c * g;
                        c *= v;
                        g *= f;
                        v *= f;
                        q.x -= w * (e + g);
                        q.y -= w * (c + v);
                        m -= x * (b.rA.x * c - b.rA.y * e + a.rA.x * v - a.rA.y * g);
                        t.x += y * (e + g);
                        t.y += y * (c + v);
                        u += B * (b.rB.x * c - b.rB.y * e + a.rB.x * v - a.rB.y * g);
                        b.normalImpulse = C;
                        a.normalImpulse = A;
                        break
                    }
                    break
                }
            }
            k.m_angularVelocity = m;
            n.m_angularVelocity = u
        }
    };
    u.prototype.FinalizeVelocityConstraints =
        function() {
            for (var a = 0; a < this.m_constraintCount; ++a)
                for (var b = this.m_constraints[a], c = b.manifold, d = 0; d < b.pointCount; ++d) {
                    var e = c.m_points[d],
                        p = b.points[d];
                    e.m_normalImpulse = p.normalImpulse;
                    e.m_tangentImpulse = p.tangentImpulse
                }
        };
    u.prototype.SolvePositionConstraints = function(a) {
        void 0 === a && (a = 0);
        for (var b = 0, c = 0; c < this.m_constraintCount; c++) {
            var d = this.m_constraints[c],
                e = d.bodyA,
                p = d.bodyB,
                f = e.m_mass * e.m_invMass,
                g = e.m_mass * e.m_invI,
                v = p.m_mass * p.m_invMass,
                A = p.m_mass * p.m_invI;
            u.s_psm.Initialize(d);
            for (var h =
                    u.s_psm.m_normal, k = 0; k < d.pointCount; k++) {
                var m = d.points[k],
                    n = u.s_psm.m_points[k],
                    q = u.s_psm.m_separations[k],
                    t = n.x - e.m_sweep.c.x,
                    w = n.y - e.m_sweep.c.y,
                    x = n.x - p.m_sweep.c.x,
                    n = n.y - p.m_sweep.c.y,
                    b = b < q ? b : q,
                    q = K.Clamp(a * (q + G.b2_linearSlop), -G.b2_maxLinearCorrection, 0),
                    q = -m.equalizedMass * q,
                    m = q * h.x,
                    q = q * h.y;
                e.m_sweep.c.x -= f * m;
                e.m_sweep.c.y -= f * q;
                e.m_sweep.a -= g * (t * q - w * m);
                e.SynchronizeTransform();
                p.m_sweep.c.x += v * m;
                p.m_sweep.c.y += v * q;
                p.m_sweep.a += A * (x * q - n * m);
                p.SynchronizeTransform()
            }
        }
        return b > -1.5 * G.b2_linearSlop
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Contacts.b2ContactSolver.s_y169 = new A;
        Box2D.Dynamics.Contacts.b2ContactSolver.s_psm = new B
    });
    Box2D.inherit(t, Box2D.Dynamics.Contacts.b2Contact);
    t.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    t.b2EdgeAndCircleContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    t.Create = function() {
        return new t
    };
    t.Destroy = function() {};
    t.prototype.Reset = function(a, b) {
        this.__super.Reset.call(this, a, b)
    };
    t.prototype.Evaluate =
        function() {
            var b = this.m_fixtureA.GetBody(),
                d = this.m_fixtureB.GetBody();
            this.b2CollideEdgeAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof a ? this.m_fixtureA.GetShape() : null, b.m_xf, this.m_fixtureB.GetShape() instanceof c ? this.m_fixtureB.GetShape() : null, d.m_xf)
        };
    t.prototype.b2CollideEdgeAndCircle = function() {};
    Box2D.inherit(x, Box2D.Dynamics.Contacts.b2Contact);
    x.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    x.b2NullContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this,
            arguments)
    };
    x.prototype.b2NullContact = function() {
        this.__super.b2Contact.call(this)
    };
    x.prototype.Evaluate = function() {};
    Box2D.inherit(y, Box2D.Dynamics.Contacts.b2Contact);
    y.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    y.b2PolyAndCircleContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    y.Create = function() {
        return new y
    };
    y.Destroy = function() {};
    y.prototype.Reset = function(a, b) {
        this.__super.Reset.call(this, a, b);
        G.b2Assert(a.GetType() == h.e_polygonShape);
        G.b2Assert(b.GetType() == h.e_circleShape)
    };
    y.prototype.Evaluate = function() {
        var a = this.m_fixtureA.m_body,
            d = this.m_fixtureB.m_body;
        I.CollidePolygonAndCircle(this.m_manifold, this.m_fixtureA.GetShape() instanceof b ? this.m_fixtureA.GetShape() : null, a.m_xf, this.m_fixtureB.GetShape() instanceof c ? this.m_fixtureB.GetShape() : null, d.m_xf)
    };
    Box2D.inherit(n, Box2D.Dynamics.Contacts.b2Contact);
    n.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    n.b2PolyAndEdgeContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this,
            arguments)
    };
    n.Create = function() {
        return new n
    };
    n.Destroy = function() {};
    n.prototype.Reset = function(a, b) {
        this.__super.Reset.call(this, a, b);
        G.b2Assert(a.GetType() == h.e_polygonShape);
        G.b2Assert(b.GetType() == h.e_edgeShape)
    };
    n.prototype.Evaluate = function() {
        var c = this.m_fixtureA.GetBody(),
            d = this.m_fixtureB.GetBody();
        this.b2CollidePolyAndEdge(this.m_manifold, this.m_fixtureA.GetShape() instanceof b ? this.m_fixtureA.GetShape() : null, c.m_xf, this.m_fixtureB.GetShape() instanceof a ? this.m_fixtureB.GetShape() : null, d.m_xf)
    };
    n.prototype.b2CollidePolyAndEdge = function() {};
    Box2D.inherit(C, Box2D.Dynamics.Contacts.b2Contact);
    C.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    C.b2PolygonContact = function() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments)
    };
    C.Create = function() {
        return new C
    };
    C.Destroy = function() {};
    C.prototype.Reset = function(a, b) {
        this.__super.Reset.call(this, a, b)
    };
    C.prototype.Evaluate = function() {
        var a = this.m_fixtureA.GetBody(),
            c = this.m_fixtureB.GetBody();
        I.CollidePolygons(this.m_manifold,
            this.m_fixtureA.GetShape() instanceof b ? this.m_fixtureA.GetShape() : null, a.m_xf, this.m_fixtureB.GetShape() instanceof b ? this.m_fixtureB.GetShape() : null, c.m_xf)
    };
    B.b2PositionSolverManifold = function() {};
    B.prototype.b2PositionSolverManifold = function() {
        this.m_normal = new F;
        this.m_separations = new Vector_a2j_Number(G.b2_maxManifoldPoints);
        this.m_points = new Vector(G.b2_maxManifoldPoints);
        for (var a = 0; a < G.b2_maxManifoldPoints; a++) this.m_points[a] = new F
    };
    B.prototype.Initialize = function(a) {
        G.b2Assert(0 < a.pointCount);
        var b = 0,
            c = 0,
            d = 0,
            e, p = 0,
            f = 0;
        switch (a.type) {
            case L.e_circles:
                e = a.bodyA.m_xf.R;
                d = a.localPoint;
                b = a.bodyA.m_xf.position.x + (e.col1.x * d.x + e.col2.x * d.y);
                c = a.bodyA.m_xf.position.y + (e.col1.y * d.x + e.col2.y * d.y);
                e = a.bodyB.m_xf.R;
                d = a.points[0].localPoint;
                p = a.bodyB.m_xf.position.x + (e.col1.x * d.x + e.col2.x * d.y);
                e = a.bodyB.m_xf.position.y + (e.col1.y * d.x + e.col2.y * d.y);
                var d = p - b,
                    f = e - c,
                    g = d * d + f * f;
                g > Number.MIN_VALUE * Number.MIN_VALUE ? (g = Math.sqrt(g), this.m_normal.x = d / g, this.m_normal.y = f / g) : (this.m_normal.x = 1, this.m_normal.y =
                    0);
                this.m_points[0].x = 0.5 * (b + p);
                this.m_points[0].y = 0.5 * (c + e);
                this.m_separations[0] = d * this.m_normal.x + f * this.m_normal.y - a.radius;
                break;
            case L.e_faceA:
                e = a.bodyA.m_xf.R;
                d = a.localPlaneNormal;
                this.m_normal.x = e.col1.x * d.x + e.col2.x * d.y;
                this.m_normal.y = e.col1.y * d.x + e.col2.y * d.y;
                e = a.bodyA.m_xf.R;
                d = a.localPoint;
                p = a.bodyA.m_xf.position.x + (e.col1.x * d.x + e.col2.x * d.y);
                f = a.bodyA.m_xf.position.y + (e.col1.y * d.x + e.col2.y * d.y);
                e = a.bodyB.m_xf.R;
                for (b = 0; b < a.pointCount; ++b) d = a.points[b].localPoint, c = a.bodyB.m_xf.position.x +
                    (e.col1.x * d.x + e.col2.x * d.y), d = a.bodyB.m_xf.position.y + (e.col1.y * d.x + e.col2.y * d.y), this.m_separations[b] = (c - p) * this.m_normal.x + (d - f) * this.m_normal.y - a.radius, this.m_points[b].x = c, this.m_points[b].y = d;
                break;
            case L.e_faceB:
                e = a.bodyB.m_xf.R;
                d = a.localPlaneNormal;
                this.m_normal.x = e.col1.x * d.x + e.col2.x * d.y;
                this.m_normal.y = e.col1.y * d.x + e.col2.y * d.y;
                e = a.bodyB.m_xf.R;
                d = a.localPoint;
                p = a.bodyB.m_xf.position.x + (e.col1.x * d.x + e.col2.x * d.y);
                f = a.bodyB.m_xf.position.y + (e.col1.y * d.x + e.col2.y * d.y);
                e = a.bodyA.m_xf.R;
                for (b =
                    0; b < a.pointCount; ++b) d = a.points[b].localPoint, c = a.bodyA.m_xf.position.x + (e.col1.x * d.x + e.col2.x * d.y), d = a.bodyA.m_xf.position.y + (e.col1.y * d.x + e.col2.y * d.y), this.m_separations[b] = (c - p) * this.m_normal.x + (d - f) * this.m_normal.y - a.radius, this.m_points[b].Set(c, d);
                this.m_normal.x *= -1;
                this.m_normal.y *= -1
        }
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointA = new F;
        Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointB = new F
    })
})();
(function() {
    var c = Box2D.Common.Math.b2Mat22,
        a = Box2D.Common.Math.b2Math,
        b = Box2D.Common.Math.y290,
        h = Box2D.Common.b2Color,
        d = Box2D.Dynamics.Controllers.b2BuoyancyController,
        e = Box2D.Dynamics.Controllers.b2ConstantAccelController,
        f = Box2D.Dynamics.Controllers.b2ConstantForceController,
        g = Box2D.Dynamics.Controllers.b2Controller,
        k = Box2D.Dynamics.Controllers.b2ControllerEdge,
        m = Box2D.Dynamics.Controllers.b2GravityController,
        q = Box2D.Dynamics.Controllers.b2TensorDampingController;
    Box2D.inherit(d, Box2D.Dynamics.Controllers.b2Controller);
    d.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    d.b2BuoyancyController = function() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
        this.normal = new b(0, -1);
        this.density = this.offset = 0;
        this.velocity = new b(0, 0);
        this.linearDrag = 2;
        this.angularDrag = 1;
        this.useDensity = !1;
        this.useWorldGravity = !0;
        this.y30 = null
    };
    d.prototype.Step = function() {
        if (this.m_bodyList) {
            this.useWorldGravity && (this.y30 = this.GetWorld().GetGravity().Copy());
            for (var a = this.m_bodyList; a; a = a.nextBody) {
                var c =
                    a.body;
                if (!1 != c.IsAwake()) {
                    for (var d = new b, e = new b, f = 0, g = 0, h = c.GetFixtureList(); h; h = h.GetNext()) {
                        var k = new b,
                            m = h.GetShape().ComputeSubmergedArea(this.normal, this.offset, c.GetTransform(), k),
                            f = f + m;
                        d.x += m * k.x;
                        d.y += m * k.y;
                        var q = 0,
                            q = 1,
                            g = g + m * q;
                        e.x += m * k.x * q;
                        e.y += m * k.y * q
                    }
                    d.x /= f;
                    d.y /= f;
                    e.x /= g;
                    e.y /= g;
                    f < Number.MIN_VALUE || (g = this.y30.GetNegative(), g.Multiply(this.density * f), c.ApplyForce(g, e), e = c.GetLinearVelocityFromWorldPoint(d), e.Subtract(this.velocity), e.Multiply(-this.linearDrag * f), c.ApplyForce(e, d), c.ApplyTorque(-c.GetInertia() /
                        c.GetMass() * f * c.GetAngularVelocity() * this.angularDrag))
                }
            }
        }
    };
    d.prototype.Draw = function(a) {
        var c = new b,
            d = new b;
        c.x = this.normal.x * this.offset + 1E3 * this.normal.y;
        c.y = this.normal.y * this.offset - 1E3 * this.normal.x;
        d.x = this.normal.x * this.offset - 1E3 * this.normal.y;
        d.y = this.normal.y * this.offset + 1E3 * this.normal.x;
        var e = new h(0, 0, 1);
        a.DrawSegment(c, d, e)
    };
    Box2D.inherit(e, Box2D.Dynamics.Controllers.b2Controller);
    e.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    e.b2ConstantAccelController = function() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this,
            arguments);
        this.A = new b(0, 0)
    };
    e.prototype.Step = function(a) {
        a = new b(this.A.x * a.dt, this.A.y * a.dt);
        for (var c = this.m_bodyList; c; c = c.nextBody) {
            var d = c.body;
            d.IsAwake() && d.SetLinearVelocity(new b(d.GetLinearVelocity().x + a.x, d.GetLinearVelocity().y + a.y))
        }
    };
    Box2D.inherit(f, Box2D.Dynamics.Controllers.b2Controller);
    f.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    f.b2ConstantForceController = function() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
        this.F = new b(0,
            0)
    };
    f.prototype.Step = function() {
        for (var a = this.m_bodyList; a; a = a.nextBody) {
            var b = a.body;
            b.IsAwake() && b.ApplyForce(this.F, b.GetWorldCenter())
        }
    };
    g.b2Controller = function() {};
    g.prototype.Step = function() {};
    g.prototype.Draw = function() {};
    g.prototype.AddBody = function(a) {
        var b = new k;
        b.controller = this;
        b.body = a;
        b.nextBody = this.m_bodyList;
        b.prevBody = null;
        this.m_bodyList = b;
        b.nextBody && (b.nextBody.prevBody = b);
        this.m_bodyCount++;
        b.nextController = a.m_controllerList;
        b.prevController = null;
        a.m_controllerList = b;
        b.nextController &&
            (b.nextController.prevController = b);
        a.m_controllerCount++
    };
    g.prototype.RemoveBody = function(a) {
        for (var b = a.m_controllerList; b && b.controller != this;) b = b.nextController;
        b.prevBody && (b.prevBody.nextBody = b.nextBody);
        b.nextBody && (b.nextBody.prevBody = b.prevBody);
        b.nextController && (b.nextController.prevController = b.prevController);
        b.prevController && (b.prevController.nextController = b.nextController);
        this.m_bodyList == b && (this.m_bodyList = b.nextBody);
        a.m_controllerList == b && (a.m_controllerList = b.nextController);
        a.m_controllerCount--;
        this.m_bodyCount--
    };
    g.prototype.Clear = function() {
        for (; this.m_bodyList;) this.RemoveBody(this.m_bodyList.body)
    };
    g.prototype.GetNext = function() {
        return this.m_next
    };
    g.prototype.GetWorld = function() {
        return this.m_y314
    };
    g.prototype.GetBodyList = function() {
        return this.m_bodyList
    };
    k.b2ControllerEdge = function() {};
    Box2D.inherit(m, Box2D.Dynamics.Controllers.b2Controller);
    m.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    m.b2GravityController = function() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this,
            arguments);
        this.G = 1;
        this.invSqr = !0
    };
    m.prototype.Step = function() {
        var a = null,
            c = null,
            d = null,
            e = 0,
            f = null,
            g = null,
            h = null,
            k = 0,
            m = 0,
            q = 0;
        if (this.invSqr)
            for (a = this.m_bodyList; a; a = a.nextBody)
                for (c = a.body, d = c.GetWorldCenter(), e = c.GetMass(), f = this.m_bodyList; f != a; f = f.nextBody) g = f.body, h = g.GetWorldCenter(), k = h.x - d.x, m = h.y - d.y, q = k * k + m * m, q < Number.MIN_VALUE || (k = new b(k, m), k.Multiply(this.G / q / Math.sqrt(q) * e * g.GetMass()), c.IsAwake() && c.ApplyForce(k, d), k.Multiply(-1), g.IsAwake() && g.ApplyForce(k, h));
        else
            for (a = this.m_bodyList; a; a =
                a.nextBody)
                for (c = a.body, d = c.GetWorldCenter(), e = c.GetMass(), f = this.m_bodyList; f != a; f = f.nextBody) g = f.body, h = g.GetWorldCenter(), k = h.x - d.x, m = h.y - d.y, q = k * k + m * m, q < Number.MIN_VALUE || (k = new b(k, m), k.Multiply(this.G / q * e * g.GetMass()), c.IsAwake() && c.ApplyForce(k, d), k.Multiply(-1), g.IsAwake() && g.ApplyForce(k, h))
    };
    Box2D.inherit(q, Box2D.Dynamics.Controllers.b2Controller);
    q.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    q.b2TensorDampingController = function() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this,
            arguments);
        this.T = new c;
        this.maxTimestep = 0
    };
    q.prototype.SetAxisAligned = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        this.T.col1.x = -a;
        this.T.col1.y = 0;
        this.T.col2.x = 0;
        this.T.col2.y = -b;
        this.maxTimestep = 0 < a || 0 < b ? 1 / Math.max(a, b) : 0
    };
    q.prototype.Step = function(c) {
        c = c.dt;
        if (!(c <= Number.MIN_VALUE)) {
            c > this.maxTimestep && 0 < this.maxTimestep && (c = this.maxTimestep);
            for (var d = this.m_bodyList; d; d = d.nextBody) {
                var e = d.body;
                if (e.IsAwake()) {
                    var f = e.GetWorldVector(a.MulMV(this.T, e.GetLocalVector(e.GetLinearVelocity())));
                    e.SetLinearVelocity(new b(e.GetLinearVelocity().x + f.x * c, e.GetLinearVelocity().y + f.y * c))
                }
            }
        }
    }
})();
(function() {
    var c = Box2D.Common.b2Settings,
        a = Box2D.Common.Math.b2Mat22,
        b = Box2D.Common.Math.b2Mat33,
        h = Box2D.Common.Math.b2Math,
        d = Box2D.Common.Math.y290,
        e = Box2D.Common.Math.b2Vec3,
        f = Box2D.Dynamics.Joints.b2DistanceJoint,
        g = Box2D.Dynamics.Joints.b2DistanceJointDef,
        k = Box2D.Dynamics.Joints.b2FrictionJoint,
        m = Box2D.Dynamics.Joints.b2FrictionJointDef,
        q = Box2D.Dynamics.Joints.b2GearJoint,
        w = Box2D.Dynamics.Joints.b2GearJointDef,
        u = Box2D.Dynamics.Joints.b2Jacobian,
        t = Box2D.Dynamics.Joints.b2Joint,
        x = Box2D.Dynamics.Joints.b2JointDef,
        y = Box2D.Dynamics.Joints.b2JointEdge,
        n = Box2D.Dynamics.Joints.b2LineJoint,
        C = Box2D.Dynamics.Joints.b2LineJointDef,
        B = Box2D.Dynamics.Joints.b2MouseJoint,
        H = Box2D.Dynamics.Joints.y107,
        E = Box2D.Dynamics.Joints.b2PrismaticJoint,
        G = Box2D.Dynamics.Joints.b2PrismaticJointDef,
        D = Box2D.Dynamics.Joints.b2PulleyJoint,
        K = Box2D.Dynamics.Joints.b2PulleyJointDef,
        F = Box2D.Dynamics.Joints.b2RevoluteJoint,
        I = Box2D.Dynamics.Joints.b2RevoluteJointDef,
        O = Box2D.Dynamics.Joints.b2WeldJoint,
        L = Box2D.Dynamics.Joints.b2WeldJointDef;
    Box2D.inherit(f,
        Box2D.Dynamics.Joints.b2Joint);
    f.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    f.b2DistanceJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchor1 = new d;
        this.m_localAnchor2 = new d;
        this.m_u = new d
    };
    f.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    f.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    f.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new d(a *
            this.m_impulse * this.m_u.x, a * this.m_impulse * this.m_u.y)
    };
    f.prototype.GetReactionTorque = function() {
        return 0
    };
    f.prototype.GetLength = function() {
        return this.m_length
    };
    f.prototype.SetLength = function(a) {
        void 0 === a && (a = 0);
        this.m_length = a
    };
    f.prototype.GetFrequency = function() {
        return this.m_frequencyHz
    };
    f.prototype.SetFrequency = function(a) {
        void 0 === a && (a = 0);
        this.m_frequencyHz = a
    };
    f.prototype.GetDampingRatio = function() {
        return this.m_dampingRatio
    };
    f.prototype.SetDampingRatio = function(a) {
        void 0 === a && (a = 0);
        this.m_dampingRatio =
            a
    };
    f.prototype.b2DistanceJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_localAnchor1.SetV(a.localAnchorA);
        this.m_localAnchor2.SetV(a.localAnchorB);
        this.m_length = a.length;
        this.m_frequencyHz = a.frequencyHz;
        this.m_dampingRatio = a.dampingRatio;
        this.m_bias = this.m_gamma = this.m_impulse = 0
    };
    f.prototype.InitVelocityConstraints = function(a) {
        var b, d = 0,
            e = this.m_bodyA,
            f = this.m_bodyB;
        b = e.m_xf.R;
        var g = this.m_localAnchor1.x - e.m_sweep.localCenter.x,
            h = this.m_localAnchor1.y - e.m_sweep.localCenter.y,
            d = b.col1.x *
            g + b.col2.x * h,
            h = b.col1.y * g + b.col2.y * h,
            g = d;
        b = f.m_xf.R;
        var k = this.m_localAnchor2.x - f.m_sweep.localCenter.x,
            r = this.m_localAnchor2.y - f.m_sweep.localCenter.y,
            d = b.col1.x * k + b.col2.x * r,
            r = b.col1.y * k + b.col2.y * r,
            k = d;
        this.m_u.x = f.m_sweep.c.x + k - e.m_sweep.c.x - g;
        this.m_u.y = f.m_sweep.c.y + r - e.m_sweep.c.y - h;
        d = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
        d > c.b2_linearSlop ? this.m_u.Multiply(1 / d) : this.m_u.SetZero();
        b = g * this.m_u.y - h * this.m_u.x;
        var m = k * this.m_u.y - r * this.m_u.x;
        b = e.m_invMass + e.m_invI * b * b + f.m_invMass +
            f.m_invI * m * m;
        this.m_mass = 0 != b ? 1 / b : 0;
        if (0 < this.m_frequencyHz) {
            var d = d - this.m_length,
                m = 2 * Math.PI * this.m_frequencyHz,
                q = this.m_mass * m * m;
            this.m_gamma = a.dt * (2 * this.m_mass * this.m_dampingRatio * m + a.dt * q);
            this.m_gamma = 0 != this.m_gamma ? 1 / this.m_gamma : 0;
            this.m_bias = d * a.dt * q * this.m_gamma;
            this.m_mass = b + this.m_gamma;
            this.m_mass = 0 != this.m_mass ? 1 / this.m_mass : 0
        }
        a.warmStarting ? (this.m_impulse *= a.dtRatio, a = this.m_impulse * this.m_u.x, b = this.m_impulse * this.m_u.y, e.m_linearVelocity.x -= e.m_invMass * a, e.m_linearVelocity.y -=
            e.m_invMass * b, e.m_angularVelocity -= e.m_invI * (g * b - h * a), f.m_linearVelocity.x += f.m_invMass * a, f.m_linearVelocity.y += f.m_invMass * b, f.m_angularVelocity += f.m_invI * (k * b - r * a)) : this.m_impulse = 0
    };
    f.prototype.SolveVelocityConstraints = function() {
        var a, b = this.m_bodyA,
            c = this.m_bodyB;
        a = b.m_xf.R;
        var d = this.m_localAnchor1.x - b.m_sweep.localCenter.x,
            e = this.m_localAnchor1.y - b.m_sweep.localCenter.y,
            f = a.col1.x * d + a.col2.x * e,
            e = a.col1.y * d + a.col2.y * e,
            d = f;
        a = c.m_xf.R;
        var g = this.m_localAnchor2.x - c.m_sweep.localCenter.x,
            h = this.m_localAnchor2.y -
            c.m_sweep.localCenter.y,
            f = a.col1.x * g + a.col2.x * h,
            h = a.col1.y * g + a.col2.y * h,
            g = f,
            f = -this.m_mass * (this.m_u.x * (c.m_linearVelocity.x + -c.m_angularVelocity * h - (b.m_linearVelocity.x + -b.m_angularVelocity * e)) + this.m_u.y * (c.m_linearVelocity.y + c.m_angularVelocity * g - (b.m_linearVelocity.y + b.m_angularVelocity * d)) + this.m_bias + this.m_gamma * this.m_impulse);
        this.m_impulse += f;
        a = f * this.m_u.x;
        f *= this.m_u.y;
        b.m_linearVelocity.x -= b.m_invMass * a;
        b.m_linearVelocity.y -= b.m_invMass * f;
        b.m_angularVelocity -= b.m_invI * (d * f - e * a);
        c.m_linearVelocity.x +=
            c.m_invMass * a;
        c.m_linearVelocity.y += c.m_invMass * f;
        c.m_angularVelocity += c.m_invI * (g * f - h * a)
    };
    f.prototype.SolvePositionConstraints = function() {
        var a;
        if (0 < this.m_frequencyHz) return !0;
        var b = this.m_bodyA,
            d = this.m_bodyB;
        a = b.m_xf.R;
        var e = this.m_localAnchor1.x - b.m_sweep.localCenter.x,
            f = this.m_localAnchor1.y - b.m_sweep.localCenter.y,
            g = a.col1.x * e + a.col2.x * f,
            f = a.col1.y * e + a.col2.y * f,
            e = g;
        a = d.m_xf.R;
        var k = this.m_localAnchor2.x - d.m_sweep.localCenter.x,
            s = this.m_localAnchor2.y - d.m_sweep.localCenter.y,
            g = a.col1.x * k + a.col2.x *
            s,
            s = a.col1.y * k + a.col2.y * s,
            k = g,
            g = d.m_sweep.c.x + k - b.m_sweep.c.x - e,
            r = d.m_sweep.c.y + s - b.m_sweep.c.y - f;
        a = Math.sqrt(g * g + r * r);
        g /= a;
        r /= a;
        a -= this.m_length;
        a = h.Clamp(a, -c.b2_maxLinearCorrection, c.b2_maxLinearCorrection);
        var m = -this.m_mass * a;
        this.m_u.Set(g, r);
        g = m * this.m_u.x;
        r = m * this.m_u.y;
        b.m_sweep.c.x -= b.m_invMass * g;
        b.m_sweep.c.y -= b.m_invMass * r;
        b.m_sweep.a -= b.m_invI * (e * r - f * g);
        d.m_sweep.c.x += d.m_invMass * g;
        d.m_sweep.c.y += d.m_invMass * r;
        d.m_sweep.a += d.m_invI * (k * r - s * g);
        b.SynchronizeTransform();
        d.SynchronizeTransform();
        return h.Abs(a) < c.b2_linearSlop
    };
    Box2D.inherit(g, Box2D.Dynamics.Joints.b2JointDef);
    g.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    g.b2DistanceJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new d;
        this.localAnchorB = new d
    };
    g.prototype.b2DistanceJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = t.e_distanceJoint;
        this.length = 1;
        this.dampingRatio = this.frequencyHz = 0
    };
    g.prototype.Initialize = function(a, b, c, d) {
        this.bodyA =
            a;
        this.bodyB = b;
        this.localAnchorA.SetV(this.bodyA.GetLocalPoint(c));
        this.localAnchorB.SetV(this.bodyB.GetLocalPoint(d));
        a = d.x - c.x;
        c = d.y - c.y;
        this.length = Math.sqrt(a * a + c * c);
        this.dampingRatio = this.frequencyHz = 0
    };
    Box2D.inherit(k, Box2D.Dynamics.Joints.b2Joint);
    k.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    k.b2FrictionJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchorA = new d;
        this.m_localAnchorB = new d;
        this.m_linearMass = new a;
        this.m_linearImpulse =
            new d
    };
    k.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
    };
    k.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
    };
    k.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new d(a * this.m_linearImpulse.x, a * this.m_linearImpulse.y)
    };
    k.prototype.GetReactionTorque = function(a) {
        void 0 === a && (a = 0);
        return a * this.m_angularImpulse
    };
    k.prototype.SetMaxForce = function(a) {
        void 0 === a && (a = 0);
        this.m_maxForce = a
    };
    k.prototype.GetMaxForce = function() {
        return this.m_maxForce
    };
    k.prototype.SetMaxTorque = function(a) {
        void 0 === a && (a = 0);
        this.m_maxTorque = a
    };
    k.prototype.GetMaxTorque = function() {
        return this.m_maxTorque
    };
    k.prototype.b2FrictionJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_localAnchorA.SetV(a.localAnchorA);
        this.m_localAnchorB.SetV(a.localAnchorB);
        this.m_linearMass.SetZero();
        this.m_angularMass = 0;
        this.m_linearImpulse.SetZero();
        this.m_angularImpulse = 0;
        this.m_maxForce = a.maxForce;
        this.m_maxTorque = a.maxTorque
    };
    k.prototype.InitVelocityConstraints = function(b) {
        var c,
            d = 0,
            e = this.m_bodyA,
            f = this.m_bodyB;
        c = e.m_xf.R;
        var g = this.m_localAnchorA.x - e.m_sweep.localCenter.x,
            h = this.m_localAnchorA.y - e.m_sweep.localCenter.y,
            d = c.col1.x * g + c.col2.x * h,
            h = c.col1.y * g + c.col2.y * h,
            g = d;
        c = f.m_xf.R;
        var k = this.m_localAnchorB.x - f.m_sweep.localCenter.x,
            r = this.m_localAnchorB.y - f.m_sweep.localCenter.y,
            d = c.col1.x * k + c.col2.x * r,
            r = c.col1.y * k + c.col2.y * r,
            k = d;
        c = e.m_invMass;
        var d = f.m_invMass,
            m = e.m_invI,
            q = f.m_invI,
            n = new a;
        n.col1.x = c + d;
        n.col2.x = 0;
        n.col1.y = 0;
        n.col2.y = c + d;
        n.col1.x += m * h * h;
        n.col2.x += -m * g *
            h;
        n.col1.y += -m * g * h;
        n.col2.y += m * g * g;
        n.col1.x += q * r * r;
        n.col2.x += -q * k * r;
        n.col1.y += -q * k * r;
        n.col2.y += q * k * k;
        n.GetInverse(this.m_linearMass);
        this.m_angularMass = m + q;
        0 < this.m_angularMass && (this.m_angularMass = 1 / this.m_angularMass);
        b.warmStarting ? (this.m_linearImpulse.x *= b.dtRatio, this.m_linearImpulse.y *= b.dtRatio, this.m_angularImpulse *= b.dtRatio, b = this.m_linearImpulse, e.m_linearVelocity.x -= c * b.x, e.m_linearVelocity.y -= c * b.y, e.m_angularVelocity -= m * (g * b.y - h * b.x + this.m_angularImpulse), f.m_linearVelocity.x += d * b.x,
            f.m_linearVelocity.y += d * b.y, f.m_angularVelocity += q * (k * b.y - r * b.x + this.m_angularImpulse)) : (this.m_linearImpulse.SetZero(), this.m_angularImpulse = 0)
    };
    k.prototype.SolveVelocityConstraints = function(a) {
        var b, c = 0,
            e = this.m_bodyA,
            f = this.m_bodyB,
            g = e.m_linearVelocity,
            k = e.m_angularVelocity,
            s = f.m_linearVelocity,
            r = f.m_angularVelocity,
            m = e.m_invMass,
            n = f.m_invMass,
            q = e.m_invI,
            t = f.m_invI;
        b = e.m_xf.R;
        var u = this.m_localAnchorA.x - e.m_sweep.localCenter.x,
            w = this.m_localAnchorA.y - e.m_sweep.localCenter.y,
            c = b.col1.x * u + b.col2.x *
            w,
            w = b.col1.y * u + b.col2.y * w,
            u = c;
        b = f.m_xf.R;
        var x = this.m_localAnchorB.x - f.m_sweep.localCenter.x,
            y = this.m_localAnchorB.y - f.m_sweep.localCenter.y,
            c = b.col1.x * x + b.col2.x * y,
            y = b.col1.y * x + b.col2.y * y,
            x = c,
            c = -this.m_angularMass * (r - k),
            B = this.m_angularImpulse;
        b = a.dt * this.m_maxTorque;
        this.m_angularImpulse = h.Clamp(this.m_angularImpulse + c, -b, b);
        c = this.m_angularImpulse - B;
        k -= q * c;
        r += t * c;
        b = h.MulMV(this.m_linearMass, new d(-(s.x - r * y - g.x + k * w), -(s.y + r * x - g.y - k * u)));
        c = this.m_linearImpulse.Copy();
        this.m_linearImpulse.Add(b);
        b = a.dt * this.m_maxForce;
        this.m_linearImpulse.LengthSquared() > b * b && (this.m_linearImpulse.Normalize(), this.m_linearImpulse.Multiply(b));
        b = h.SubtractVV(this.m_linearImpulse, c);
        g.x -= m * b.x;
        g.y -= m * b.y;
        k -= q * (u * b.y - w * b.x);
        s.x += n * b.x;
        s.y += n * b.y;
        r += t * (x * b.y - y * b.x);
        e.m_angularVelocity = k;
        f.m_angularVelocity = r
    };
    k.prototype.SolvePositionConstraints = function() {
        return !0
    };
    Box2D.inherit(m, Box2D.Dynamics.Joints.b2JointDef);
    m.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    m.b2FrictionJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this,
            arguments);
        this.localAnchorA = new d;
        this.localAnchorB = new d
    };
    m.prototype.b2FrictionJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = t.e_frictionJoint;
        this.maxTorque = this.maxForce = 0
    };
    m.prototype.Initialize = function(a, b, c) {
        this.bodyA = a;
        this.bodyB = b;
        this.localAnchorA.SetV(this.bodyA.GetLocalPoint(c));
        this.localAnchorB.SetV(this.bodyB.GetLocalPoint(c))
    };
    Box2D.inherit(q, Box2D.Dynamics.Joints.b2Joint);
    q.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    q.b2GearJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this,
            arguments);
        this.m_groundAnchor1 = new d;
        this.m_groundAnchor2 = new d;
        this.m_localAnchor1 = new d;
        this.m_localAnchor2 = new d;
        this.m_J = new u
    };
    q.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    q.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    q.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new d(a * this.m_impulse * this.m_J.linearB.x, a * this.m_impulse * this.m_J.linearB.y)
    };
    q.prototype.GetReactionTorque = function(a) {
        void 0 ===
            a && (a = 0);
        var b = this.m_bodyB.m_xf.R,
            c = this.m_localAnchor1.x - this.m_bodyB.m_sweep.localCenter.x,
            d = this.m_localAnchor1.y - this.m_bodyB.m_sweep.localCenter.y,
            e = b.col1.x * c + b.col2.x * d,
            d = b.col1.y * c + b.col2.y * d;
        return a * (this.m_impulse * this.m_J.angularB - e * this.m_impulse * this.m_J.linearB.y + d * this.m_impulse * this.m_J.linearB.x)
    };
    q.prototype.GetRatio = function() {
        return this.m_ratio
    };
    q.prototype.SetRatio = function(a) {
        void 0 === a && (a = 0);
        this.m_ratio = a
    };
    q.prototype.b2GearJoint = function(a) {
        this.__super.b2Joint.call(this,
            a);
        var b = parseInt(a.joint1.m_type),
            c = parseInt(a.joint2.m_type);
        this.m_prismatic2 = this.m_revolute2 = this.m_prismatic1 = this.m_revolute1 = null;
        var d = 0,
            e = 0;
        this.m_ground1 = a.joint1.GetBodyA();
        this.m_bodyA = a.joint1.GetBodyB();
        b == t.e_revoluteJoint ? (this.m_revolute1 = a.joint1 instanceof F ? a.joint1 : null, this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2), d = this.m_revolute1.GetJointAngle()) : (this.m_prismatic1 = a.joint1 instanceof E ? a.joint1 : null,
            this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1), this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2), d = this.m_prismatic1.GetJointTranslation());
        this.m_ground2 = a.joint2.GetBodyA();
        this.m_bodyB = a.joint2.GetBodyB();
        c == t.e_revoluteJoint ? (this.m_revolute2 = a.joint2 instanceof F ? a.joint2 : null, this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2), e = this.m_revolute2.GetJointAngle()) : (this.m_prismatic2 = a.joint2 instanceof E ? a.joint2 :
            null, this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1), this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2), e = this.m_prismatic2.GetJointTranslation());
        this.m_ratio = a.ratio;
        this.m_constant = d + this.m_ratio * e;
        this.m_impulse = 0
    };
    q.prototype.InitVelocityConstraints = function(a) {
        var b = this.m_ground1,
            c = this.m_ground2,
            d = this.m_bodyA,
            e = this.m_bodyB,
            f = 0,
            g = 0,
            h = 0,
            k = 0,
            m = 0,
            n = 0;
        this.m_J.SetZero();
        this.m_revolute1 ? (this.m_J.angularA = -1, n += d.m_invI) : (b = b.m_xf.R, g = this.m_prismatic1.m_localXAxis1, f = b.col1.x *
            g.x + b.col2.x * g.y, g = b.col1.y * g.x + b.col2.y * g.y, b = d.m_xf.R, h = this.m_localAnchor1.x - d.m_sweep.localCenter.x, k = this.m_localAnchor1.y - d.m_sweep.localCenter.y, m = b.col1.x * h + b.col2.x * k, k = b.col1.y * h + b.col2.y * k, h = m * g - k * f, this.m_J.linearA.Set(-f, -g), this.m_J.angularA = -h, n += d.m_invMass + d.m_invI * h * h);
        this.m_revolute2 ? (this.m_J.angularB = -this.m_ratio, n += this.m_ratio * this.m_ratio * e.m_invI) : (b = c.m_xf.R, g = this.m_prismatic2.m_localXAxis1, f = b.col1.x * g.x + b.col2.x * g.y, g = b.col1.y * g.x + b.col2.y * g.y, b = e.m_xf.R, h = this.m_localAnchor2.x -
            e.m_sweep.localCenter.x, k = this.m_localAnchor2.y - e.m_sweep.localCenter.y, m = b.col1.x * h + b.col2.x * k, k = b.col1.y * h + b.col2.y * k, h = m * g - k * f, this.m_J.linearB.Set(-this.m_ratio * f, -this.m_ratio * g), this.m_J.angularB = -this.m_ratio * h, n += this.m_ratio * this.m_ratio * (e.m_invMass + e.m_invI * h * h));
        this.m_mass = 0 < n ? 1 / n : 0;
        a.warmStarting ? (d.m_linearVelocity.x += d.m_invMass * this.m_impulse * this.m_J.linearA.x, d.m_linearVelocity.y += d.m_invMass * this.m_impulse * this.m_J.linearA.y, d.m_angularVelocity += d.m_invI * this.m_impulse * this.m_J.angularA,
            e.m_linearVelocity.x += e.m_invMass * this.m_impulse * this.m_J.linearB.x, e.m_linearVelocity.y += e.m_invMass * this.m_impulse * this.m_J.linearB.y, e.m_angularVelocity += e.m_invI * this.m_impulse * this.m_J.angularB) : this.m_impulse = 0
    };
    q.prototype.SolveVelocityConstraints = function() {
        var a = this.m_bodyA,
            b = this.m_bodyB,
            c = -this.m_mass * this.m_J.Compute(a.m_linearVelocity, a.m_angularVelocity, b.m_linearVelocity, b.m_angularVelocity);
        this.m_impulse += c;
        a.m_linearVelocity.x += a.m_invMass * c * this.m_J.linearA.x;
        a.m_linearVelocity.y +=
            a.m_invMass * c * this.m_J.linearA.y;
        a.m_angularVelocity += a.m_invI * c * this.m_J.angularA;
        b.m_linearVelocity.x += b.m_invMass * c * this.m_J.linearB.x;
        b.m_linearVelocity.y += b.m_invMass * c * this.m_J.linearB.y;
        b.m_angularVelocity += b.m_invI * c * this.m_J.angularB
    };
    q.prototype.SolvePositionConstraints = function() {
        var a = this.m_bodyA,
            b = this.m_bodyB,
            d = 0,
            e = 0,
            d = this.m_revolute1 ? this.m_revolute1.GetJointAngle() : this.m_prismatic1.GetJointTranslation(),
            e = this.m_revolute2 ? this.m_revolute2.GetJointAngle() : this.m_prismatic2.GetJointTranslation(),
            d = -this.m_mass * (this.m_constant - (d + this.m_ratio * e));
        a.m_sweep.c.x += a.m_invMass * d * this.m_J.linearA.x;
        a.m_sweep.c.y += a.m_invMass * d * this.m_J.linearA.y;
        a.m_sweep.a += a.m_invI * d * this.m_J.angularA;
        b.m_sweep.c.x += b.m_invMass * d * this.m_J.linearB.x;
        b.m_sweep.c.y += b.m_invMass * d * this.m_J.linearB.y;
        b.m_sweep.a += b.m_invI * d * this.m_J.angularB;
        a.SynchronizeTransform();
        b.SynchronizeTransform();
        return 0 < c.b2_linearSlop
    };
    Box2D.inherit(w, Box2D.Dynamics.Joints.b2JointDef);
    w.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    w.b2GearJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments)
    };
    w.prototype.b2GearJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = t.e_gearJoint;
        this.joint2 = this.joint1 = null;
        this.ratio = 1
    };
    u.b2Jacobian = function() {
        this.linearA = new d;
        this.linearB = new d
    };
    u.prototype.SetZero = function() {
        this.linearA.SetZero();
        this.angularA = 0;
        this.linearB.SetZero();
        this.angularB = 0
    };
    u.prototype.Set = function(a, b, c, d) {
        void 0 === b && (b = 0);
        void 0 === d && (d = 0);
        this.linearA.SetV(a);
        this.angularA =
            b;
        this.linearB.SetV(c);
        this.angularB = d
    };
    u.prototype.Compute = function(a, b, c, d) {
        void 0 === b && (b = 0);
        void 0 === d && (d = 0);
        return this.linearA.x * a.x + this.linearA.y * a.y + this.angularA * b + (this.linearB.x * c.x + this.linearB.y * c.y) + this.angularB * d
    };
    t.b2Joint = function() {
        this.m_edgeA = new y;
        this.m_edgeB = new y;
        this.m_localCenterA = new d;
        this.m_localCenterB = new d
    };
    t.prototype.GetType = function() {
        return this.m_type
    };
    t.prototype.GetAnchorA = function() {
        return null
    };
    t.prototype.GetAnchorB = function() {
        return null
    };
    t.prototype.GetReactionForce =
        function() {
            return null
        };
    t.prototype.GetReactionTorque = function() {
        return 0
    };
    t.prototype.GetBodyA = function() {
        return this.m_bodyA
    };
    t.prototype.GetBodyB = function() {
        return this.m_bodyB
    };
    t.prototype.GetNext = function() {
        return this.m_next
    };
    t.prototype.GetUserData = function() {
        return this.m_userData
    };
    t.prototype.SetUserData = function(a) {
        this.m_userData = a
    };
    t.prototype.IsActive = function() {
        return this.m_bodyA.IsActive() && this.m_bodyB.IsActive()
    };
    t.Create = function(a) {
        var b = null;
        switch (a.type) {
            case t.e_distanceJoint:
                b =
                    new f(a instanceof g ? a : null);
                break;
            case t.e_mouseJoint:
                b = new B(a instanceof H ? a : null);
                break;
            case t.e_prismaticJoint:
                b = new E(a instanceof G ? a : null);
                break;
            case t.e_revoluteJoint:
                b = new F(a instanceof I ? a : null);
                break;
            case t.e_pulleyJoint:
                b = new D(a instanceof K ? a : null);
                break;
            case t.e_gearJoint:
                b = new q(a instanceof w ? a : null);
                break;
            case t.e_lineJoint:
                b = new n(a instanceof C ? a : null);
                break;
            case t.e_weldJoint:
                b = new O(a instanceof L ? a : null);
                break;
            case t.e_frictionJoint:
                b = new k(a instanceof m ? a : null)
        }
        return b
    };
    t.Destroy = function() {};
    t.prototype.b2Joint = function(a) {
        c.b2Assert(a.bodyA != a.bodyB);
        this.m_type = a.type;
        this.m_next = this.m_prev = null;
        this.m_bodyA = a.bodyA;
        this.m_bodyB = a.bodyB;
        this.m_collideConnected = a.collideConnected;
        this.m_islandFlag = !1;
        this.m_userData = a.userData
    };
    t.prototype.InitVelocityConstraints = function() {};
    t.prototype.SolveVelocityConstraints = function() {};
    t.prototype.FinalizeVelocityConstraints = function() {};
    t.prototype.SolvePositionConstraints = function() {
        return !1
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Joints.b2Joint.e_unknownJoint =
            0;
        Box2D.Dynamics.Joints.b2Joint.e_revoluteJoint = 1;
        Box2D.Dynamics.Joints.b2Joint.e_prismaticJoint = 2;
        Box2D.Dynamics.Joints.b2Joint.e_distanceJoint = 3;
        Box2D.Dynamics.Joints.b2Joint.e_pulleyJoint = 4;
        Box2D.Dynamics.Joints.b2Joint.e_mouseJoint = 5;
        Box2D.Dynamics.Joints.b2Joint.e_gearJoint = 6;
        Box2D.Dynamics.Joints.b2Joint.e_lineJoint = 7;
        Box2D.Dynamics.Joints.b2Joint.e_weldJoint = 8;
        Box2D.Dynamics.Joints.b2Joint.e_frictionJoint = 9;
        Box2D.Dynamics.Joints.b2Joint.e_inactiveLimit = 0;
        Box2D.Dynamics.Joints.b2Joint.e_atLowerLimit =
            1;
        Box2D.Dynamics.Joints.b2Joint.e_atUpperLimit = 2;
        Box2D.Dynamics.Joints.b2Joint.e_equalLimits = 3
    });
    x.b2JointDef = function() {};
    x.prototype.b2JointDef = function() {
        this.type = t.e_unknownJoint;
        this.bodyB = this.bodyA = this.userData = null;
        this.collideConnected = !1
    };
    y.b2JointEdge = function() {};
    Box2D.inherit(n, Box2D.Dynamics.Joints.b2Joint);
    n.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    n.b2LineJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchor1 = new d;
        this.m_localAnchor2 =
            new d;
        this.m_localXAxis1 = new d;
        this.m_localYAxis1 = new d;
        this.m_axis = new d;
        this.m_perp = new d;
        this.m_K = new a;
        this.m_impulse = new d
    };
    n.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    n.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    n.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new d(a * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x), a * (this.m_impulse.x * this.m_perp.y +
            (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y))
    };
    n.prototype.GetReactionTorque = function(a) {
        void 0 === a && (a = 0);
        return a * this.m_impulse.y
    };
    n.prototype.GetJointTranslation = function() {
        var a = this.m_bodyA,
            b = this.m_bodyB,
            c = a.GetWorldPoint(this.m_localAnchor1),
            d = b.GetWorldPoint(this.m_localAnchor2),
            b = d.x - c.x,
            c = d.y - c.y,
            a = a.GetWorldVector(this.m_localXAxis1);
        return a.x * b + a.y * c
    };
    n.prototype.GetJointSpeed = function() {
        var a = this.m_bodyA,
            b = this.m_bodyB,
            c;
        c = a.m_xf.R;
        var d = this.m_localAnchor1.x - a.m_sweep.localCenter.x,
            e = this.m_localAnchor1.y - a.m_sweep.localCenter.y,
            f = c.col1.x * d + c.col2.x * e,
            e = c.col1.y * d + c.col2.y * e,
            d = f;
        c = b.m_xf.R;
        var g = this.m_localAnchor2.x - b.m_sweep.localCenter.x,
            h = this.m_localAnchor2.y - b.m_sweep.localCenter.y,
            f = c.col1.x * g + c.col2.x * h,
            h = c.col1.y * g + c.col2.y * h,
            g = f;
        c = b.m_sweep.c.x + g - (a.m_sweep.c.x + d);
        var f = b.m_sweep.c.y + h - (a.m_sweep.c.y + e),
            k = a.GetWorldVector(this.m_localXAxis1),
            m = a.m_linearVelocity,
            n = b.m_linearVelocity,
            a = a.m_angularVelocity,
            b = b.m_angularVelocity;
        return c * -a * k.y + f * a * k.x + (k.x * (n.x + -b *
            h - m.x - -a * e) + k.y * (n.y + b * g - m.y - a * d))
    };
    n.prototype.IsLimitEnabled = function() {
        return this.m_enableLimit
    };
    n.prototype.EnableLimit = function(a) {
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_enableLimit = a
    };
    n.prototype.GetLowerLimit = function() {
        return this.m_lowerTranslation
    };
    n.prototype.GetUpperLimit = function() {
        return this.m_upperTranslation
    };
    n.prototype.SetLimits = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_lowerTranslation = a;
        this.m_upperTranslation =
            b
    };
    n.prototype.IsMotorEnabled = function() {
        return this.m_enableMotor
    };
    n.prototype.EnableMotor = function(a) {
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_enableMotor = a
    };
    n.prototype.SetMotorSpeed = function(a) {
        void 0 === a && (a = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_motorSpeed = a
    };
    n.prototype.GetMotorSpeed = function() {
        return this.m_motorSpeed
    };
    n.prototype.SetMaxMotorForce = function(a) {
        void 0 === a && (a = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_maxMotorForce =
            a
    };
    n.prototype.GetMaxMotorForce = function() {
        return this.m_maxMotorForce
    };
    n.prototype.GetMotorForce = function() {
        return this.m_motorImpulse
    };
    n.prototype.b2LineJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_localAnchor1.SetV(a.localAnchorA);
        this.m_localAnchor2.SetV(a.localAnchorB);
        this.m_localXAxis1.SetV(a.localAxisA);
        this.m_localYAxis1.x = -this.m_localXAxis1.y;
        this.m_localYAxis1.y = this.m_localXAxis1.x;
        this.m_impulse.SetZero();
        this.m_motorImpulse = this.m_motorMass = 0;
        this.m_lowerTranslation = a.lowerTranslation;
        this.m_upperTranslation = a.upperTranslation;
        this.m_maxMotorForce = a.maxMotorForce;
        this.m_motorSpeed = a.motorSpeed;
        this.m_enableLimit = a.enableLimit;
        this.m_enableMotor = a.enableMotor;
        this.m_limitState = t.e_inactiveLimit;
        this.m_axis.SetZero();
        this.m_perp.SetZero()
    };
    n.prototype.InitVelocityConstraints = function(a) {
        var b = this.m_bodyA,
            d = this.m_bodyB,
            e, f = 0;
        this.m_localCenterA.SetV(b.GetLocalCenter());
        this.m_localCenterB.SetV(d.GetLocalCenter());
        var g = b.GetTransform();
        d.GetTransform();
        e = b.m_xf.R;
        var k = this.m_localAnchor1.x -
            this.m_localCenterA.x,
            s = this.m_localAnchor1.y - this.m_localCenterA.y,
            f = e.col1.x * k + e.col2.x * s,
            s = e.col1.y * k + e.col2.y * s,
            k = f;
        e = d.m_xf.R;
        var r = this.m_localAnchor2.x - this.m_localCenterB.x,
            m = this.m_localAnchor2.y - this.m_localCenterB.y,
            f = e.col1.x * r + e.col2.x * m,
            m = e.col1.y * r + e.col2.y * m,
            r = f;
        e = d.m_sweep.c.x + r - b.m_sweep.c.x - k;
        f = d.m_sweep.c.y + m - b.m_sweep.c.y - s;
        this.m_invMassA = b.m_invMass;
        this.m_invMassB = d.m_invMass;
        this.m_invIA = b.m_invI;
        this.m_invIB = d.m_invI;
        this.m_axis.SetV(h.MulMV(g.R, this.m_localXAxis1));
        this.m_a1 =
            (e + k) * this.m_axis.y - (f + s) * this.m_axis.x;
        this.m_a2 = r * this.m_axis.y - m * this.m_axis.x;
        this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
        this.m_motorMass = this.m_motorMass > Number.MIN_VALUE ? 1 / this.m_motorMass : 0;
        this.m_perp.SetV(h.MulMV(g.R, this.m_localYAxis1));
        this.m_s1 = (e + k) * this.m_perp.y - (f + s) * this.m_perp.x;
        this.m_s2 = r * this.m_perp.y - m * this.m_perp.x;
        g = this.m_invMassA;
        k = this.m_invMassB;
        s = this.m_invIA;
        r = this.m_invIB;
        this.m_K.col1.x = g + k + s * this.m_s1 *
            this.m_s1 + r * this.m_s2 * this.m_s2;
        this.m_K.col1.y = s * this.m_s1 * this.m_a1 + r * this.m_s2 * this.m_a2;
        this.m_K.col2.x = this.m_K.col1.y;
        this.m_K.col2.y = g + k + s * this.m_a1 * this.m_a1 + r * this.m_a2 * this.m_a2;
        this.m_enableLimit ? (e = this.m_axis.x * e + this.m_axis.y * f, h.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * c.b2_linearSlop ? this.m_limitState = t.e_equalLimits : e <= this.m_lowerTranslation ? this.m_limitState != t.e_atLowerLimit && (this.m_limitState = t.e_atLowerLimit, this.m_impulse.y = 0) : e >= this.m_upperTranslation ? this.m_limitState !=
            t.e_atUpperLimit && (this.m_limitState = t.e_atUpperLimit, this.m_impulse.y = 0) : (this.m_limitState = t.e_inactiveLimit, this.m_impulse.y = 0)) : this.m_limitState = t.e_inactiveLimit;
        !1 == this.m_enableMotor && (this.m_motorImpulse = 0);
        a.warmStarting ? (this.m_impulse.x *= a.dtRatio, this.m_impulse.y *= a.dtRatio, this.m_motorImpulse *= a.dtRatio, a = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x, e = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y, f = this.m_impulse.x *
            this.m_s1 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a1, g = this.m_impulse.x * this.m_s2 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a2, b.m_linearVelocity.x -= this.m_invMassA * a, b.m_linearVelocity.y -= this.m_invMassA * e, b.m_angularVelocity -= this.m_invIA * f, d.m_linearVelocity.x += this.m_invMassB * a, d.m_linearVelocity.y += this.m_invMassB * e, d.m_angularVelocity += this.m_invIB * g) : (this.m_impulse.SetZero(), this.m_motorImpulse = 0)
    };
    n.prototype.SolveVelocityConstraints = function(a) {
        var b = this.m_bodyA,
            c = this.m_bodyB,
            e = b.m_linearVelocity,
            f = b.m_angularVelocity,
            g = c.m_linearVelocity,
            k = c.m_angularVelocity,
            s = 0,
            r = 0,
            m = 0,
            n = 0;
        this.m_enableMotor && this.m_limitState != t.e_equalLimits && (n = this.m_motorMass * (this.m_motorSpeed - (this.m_axis.x * (g.x - e.x) + this.m_axis.y * (g.y - e.y) + this.m_a2 * k - this.m_a1 * f)), s = this.m_motorImpulse, r = a.dt * this.m_maxMotorForce, this.m_motorImpulse = h.Clamp(this.m_motorImpulse + n, -r, r), n = this.m_motorImpulse - s, s = n * this.m_axis.x, r = n * this.m_axis.y, m = n * this.m_a1, n *= this.m_a2, e.x -= this.m_invMassA * s, e.y -= this.m_invMassA *
            r, f -= this.m_invIA * m, g.x += this.m_invMassB * s, g.y += this.m_invMassB * r, k += this.m_invIB * n);
        r = this.m_perp.x * (g.x - e.x) + this.m_perp.y * (g.y - e.y) + this.m_s2 * k - this.m_s1 * f;
        this.m_enableLimit && this.m_limitState != t.e_inactiveLimit ? (m = this.m_axis.x * (g.x - e.x) + this.m_axis.y * (g.y - e.y) + this.m_a2 * k - this.m_a1 * f, s = this.m_impulse.Copy(), a = this.m_K.Solve(new d, -r, -m), this.m_impulse.Add(a), this.m_limitState == t.e_atLowerLimit ? this.m_impulse.y = h.Max(this.m_impulse.y, 0) : this.m_limitState == t.e_atUpperLimit && (this.m_impulse.y =
            h.Min(this.m_impulse.y, 0)), r = -r - (this.m_impulse.y - s.y) * this.m_K.col2.x, m = 0 != this.m_K.col1.x ? r / this.m_K.col1.x + s.x : s.x, this.m_impulse.x = m, a.x = this.m_impulse.x - s.x, a.y = this.m_impulse.y - s.y, s = a.x * this.m_perp.x + a.y * this.m_axis.x, r = a.x * this.m_perp.y + a.y * this.m_axis.y, m = a.x * this.m_s1 + a.y * this.m_a1, n = a.x * this.m_s2 + a.y * this.m_a2) : (a = 0 != this.m_K.col1.x ? -r / this.m_K.col1.x : 0, this.m_impulse.x += a, s = a * this.m_perp.x, r = a * this.m_perp.y, m = a * this.m_s1, n = a * this.m_s2);
        e.x -= this.m_invMassA * s;
        e.y -= this.m_invMassA * r;
        f -=
            this.m_invIA * m;
        g.x += this.m_invMassB * s;
        g.y += this.m_invMassB * r;
        k += this.m_invIB * n;
        b.m_linearVelocity.SetV(e);
        b.m_angularVelocity = f;
        c.m_linearVelocity.SetV(g);
        c.m_angularVelocity = k
    };
    n.prototype.SolvePositionConstraints = function() {
        var b = this.m_bodyA,
            e = this.m_bodyB,
            f = b.m_sweep.c,
            g = b.m_sweep.a,
            k = e.m_sweep.c,
            m = e.m_sweep.a,
            n, s = 0,
            r = 0,
            q = 0,
            t = 0,
            u = 0,
            w = 0,
            r = !1,
            x = 0,
            y = a.FromAngle(g),
            q = a.FromAngle(m);
        n = y;
        var w = this.m_localAnchor1.x - this.m_localCenterA.x,
            B = this.m_localAnchor1.y - this.m_localCenterA.y,
            s = n.col1.x * w + n.col2.x *
            B,
            B = n.col1.y * w + n.col2.y * B,
            w = s;
        n = q;
        q = this.m_localAnchor2.x - this.m_localCenterB.x;
        t = this.m_localAnchor2.y - this.m_localCenterB.y;
        s = n.col1.x * q + n.col2.x * t;
        t = n.col1.y * q + n.col2.y * t;
        q = s;
        n = k.x + q - f.x - w;
        s = k.y + t - f.y - B;
        if (this.m_enableLimit) {
            this.m_axis = h.MulMV(y, this.m_localXAxis1);
            this.m_a1 = (n + w) * this.m_axis.y - (s + B) * this.m_axis.x;
            this.m_a2 = q * this.m_axis.y - t * this.m_axis.x;
            var C = this.m_axis.x * n + this.m_axis.y * s;
            h.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * c.b2_linearSlop ? (x = h.Clamp(C, -c.b2_maxLinearCorrection,
                c.b2_maxLinearCorrection), u = h.Abs(C), r = !0) : C <= this.m_lowerTranslation ? (x = h.Clamp(C - this.m_lowerTranslation + c.b2_linearSlop, -c.b2_maxLinearCorrection, 0), u = this.m_lowerTranslation - C, r = !0) : C >= this.m_upperTranslation && (x = h.Clamp(C - this.m_upperTranslation + c.b2_linearSlop, 0, c.b2_maxLinearCorrection), u = C - this.m_upperTranslation, r = !0)
        }
        this.m_perp = h.MulMV(y, this.m_localYAxis1);
        this.m_s1 = (n + w) * this.m_perp.y - (s + B) * this.m_perp.x;
        this.m_s2 = q * this.m_perp.y - t * this.m_perp.x;
        y = new d;
        B = this.m_perp.x * n + this.m_perp.y *
            s;
        u = h.Max(u, h.Abs(B));
        w = 0;
        r ? (r = this.m_invMassA, q = this.m_invMassB, t = this.m_invIA, n = this.m_invIB, this.m_K.col1.x = r + q + t * this.m_s1 * this.m_s1 + n * this.m_s2 * this.m_s2, this.m_K.col1.y = t * this.m_s1 * this.m_a1 + n * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = r + q + t * this.m_a1 * this.m_a1 + n * this.m_a2 * this.m_a2, this.m_K.Solve(y, -B, -x)) : (r = this.m_invMassA, q = this.m_invMassB, t = this.m_invIA, n = this.m_invIB, x = r + q + t * this.m_s1 * this.m_s1 + n * this.m_s2 * this.m_s2, y.x = 0 != x ? -B / x : 0, y.y = 0);
        x = y.x * this.m_perp.x + y.y *
            this.m_axis.x;
        r = y.x * this.m_perp.y + y.y * this.m_axis.y;
        B = y.x * this.m_s1 + y.y * this.m_a1;
        y = y.x * this.m_s2 + y.y * this.m_a2;
        f.x -= this.m_invMassA * x;
        f.y -= this.m_invMassA * r;
        g -= this.m_invIA * B;
        k.x += this.m_invMassB * x;
        k.y += this.m_invMassB * r;
        m += this.m_invIB * y;
        b.m_sweep.a = g;
        e.m_sweep.a = m;
        b.SynchronizeTransform();
        e.SynchronizeTransform();
        return u <= c.b2_linearSlop && w <= c.b2_angularSlop
    };
    Box2D.inherit(C, Box2D.Dynamics.Joints.b2JointDef);
    C.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    C.b2LineJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this,
            arguments);
        this.localAnchorA = new d;
        this.localAnchorB = new d;
        this.localAxisA = new d
    };
    C.prototype.b2LineJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = t.e_lineJoint;
        this.localAxisA.Set(1, 0);
        this.enableLimit = !1;
        this.upperTranslation = this.lowerTranslation = 0;
        this.enableMotor = !1;
        this.motorSpeed = this.maxMotorForce = 0
    };
    C.prototype.Initialize = function(a, b, c, d) {
        this.bodyA = a;
        this.bodyB = b;
        this.localAnchorA = this.bodyA.GetLocalPoint(c);
        this.localAnchorB = this.bodyB.GetLocalPoint(c);
        this.localAxisA =
            this.bodyA.GetLocalVector(d)
    };
    Box2D.inherit(B, Box2D.Dynamics.Joints.b2Joint);
    B.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    B.b2MouseJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.K = new a;
        this.K1 = new a;
        this.K2 = new a;
        this.m_localAnchor = new d;
        this.m_target = new d;
        this.m_impulse = new d;
        this.m_mass = new a;
        this.m_C = new d
    };
    B.prototype.GetAnchorA = function() {
        return this.m_target
    };
    B.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor)
    };
    B.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new d(a * this.m_impulse.x, a * this.m_impulse.y)
    };
    B.prototype.GetReactionTorque = function() {
        return 0
    };
    B.prototype.GetTarget = function() {
        return this.m_target
    };
    B.prototype.SetTarget = function(a) {
        !1 == this.m_bodyB.IsAwake() && this.m_bodyB.SetAwake(!0);
        this.m_target = a
    };
    B.prototype.GetMaxForce = function() {
        return this.m_maxForce
    };
    B.prototype.SetMaxForce = function(a) {
        void 0 === a && (a = 0);
        this.m_maxForce = a
    };
    B.prototype.GetFrequency = function() {
        return this.m_frequencyHz
    };
    B.prototype.SetFrequency = function(a) {
        void 0 === a && (a = 0);
        this.m_frequencyHz = a
    };
    B.prototype.GetDampingRatio = function() {
        return this.m_dampingRatio
    };
    B.prototype.SetDampingRatio = function(a) {
        void 0 === a && (a = 0);
        this.m_dampingRatio = a
    };
    B.prototype.b2MouseJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_target.SetV(a.target);
        var b = this.m_target.x - this.m_bodyB.m_xf.position.x,
            c = this.m_target.y - this.m_bodyB.m_xf.position.y,
            d = this.m_bodyB.m_xf.R;
        this.m_localAnchor.x = b * d.col1.x + c * d.col1.y;
        this.m_localAnchor.y =
            b * d.col2.x + c * d.col2.y;
        this.m_maxForce = a.maxForce;
        this.m_impulse.SetZero();
        this.m_frequencyHz = a.frequencyHz;
        this.m_dampingRatio = a.dampingRatio;
        this.m_gamma = this.m_beta = 0
    };
    B.prototype.InitVelocityConstraints = function(a) {
        var b = this.m_bodyB,
            c = b.GetMass(),
            d = 2 * Math.PI * this.m_frequencyHz,
            e = c * d * d;
        this.m_gamma = a.dt * (2 * c * this.m_dampingRatio * d + a.dt * e);
        this.m_gamma = 0 != this.m_gamma ? 1 / this.m_gamma : 0;
        this.m_beta = a.dt * e * this.m_gamma;
        var e = b.m_xf.R,
            c = this.m_localAnchor.x - b.m_sweep.localCenter.x,
            d = this.m_localAnchor.y -
            b.m_sweep.localCenter.y,
            f = e.col1.x * c + e.col2.x * d,
            d = e.col1.y * c + e.col2.y * d,
            c = f,
            e = b.m_invMass,
            f = b.m_invI;
        this.K1.col1.x = e;
        this.K1.col2.x = 0;
        this.K1.col1.y = 0;
        this.K1.col2.y = e;
        this.K2.col1.x = f * d * d;
        this.K2.col2.x = -f * c * d;
        this.K2.col1.y = -f * c * d;
        this.K2.col2.y = f * c * c;
        this.K.SetM(this.K1);
        this.K.AddM(this.K2);
        this.K.col1.x += this.m_gamma;
        this.K.col2.y += this.m_gamma;
        this.K.GetInverse(this.m_mass);
        this.m_C.x = b.m_sweep.c.x + c - this.m_target.x;
        this.m_C.y = b.m_sweep.c.y + d - this.m_target.y;
        b.m_angularVelocity *= 0.98;
        this.m_impulse.x *=
            a.dtRatio;
        this.m_impulse.y *= a.dtRatio;
        b.m_linearVelocity.x += e * this.m_impulse.x;
        b.m_linearVelocity.y += e * this.m_impulse.y;
        b.m_angularVelocity += f * (c * this.m_impulse.y - d * this.m_impulse.x)
    };
    B.prototype.SolveVelocityConstraints = function(a) {
        var b = this.m_bodyB,
            c, d = 0,
            e = 0;
        c = b.m_xf.R;
        var f = this.m_localAnchor.x - b.m_sweep.localCenter.x,
            g = this.m_localAnchor.y - b.m_sweep.localCenter.y,
            d = c.col1.x * f + c.col2.x * g,
            g = c.col1.y * f + c.col2.y * g,
            f = d,
            d = b.m_linearVelocity.x + -b.m_angularVelocity * g,
            h = b.m_linearVelocity.y + b.m_angularVelocity *
            f;
        c = this.m_mass;
        d = d + this.m_beta * this.m_C.x + this.m_gamma * this.m_impulse.x;
        e = h + this.m_beta * this.m_C.y + this.m_gamma * this.m_impulse.y;
        h = -(c.col1.x * d + c.col2.x * e);
        e = -(c.col1.y * d + c.col2.y * e);
        c = this.m_impulse.x;
        d = this.m_impulse.y;
        this.m_impulse.x += h;
        this.m_impulse.y += e;
        a = a.dt * this.m_maxForce;
        this.m_impulse.LengthSquared() > a * a && this.m_impulse.Multiply(a / this.m_impulse.Length());
        h = this.m_impulse.x - c;
        e = this.m_impulse.y - d;
        b.m_linearVelocity.x += b.m_invMass * h;
        b.m_linearVelocity.y += b.m_invMass * e;
        b.m_angularVelocity +=
            b.m_invI * (f * e - g * h)
    };
    B.prototype.SolvePositionConstraints = function() {
        return !0
    };
    Box2D.inherit(H, Box2D.Dynamics.Joints.b2JointDef);
    H.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    H.y107 = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.target = new d
    };
    H.prototype.y107 = function() {
        this.__super.b2JointDef.call(this);
        this.type = t.e_mouseJoint;
        this.maxForce = 0;
        this.frequencyHz = 5;
        this.dampingRatio = 0.7
    };
    Box2D.inherit(E, Box2D.Dynamics.Joints.b2Joint);
    E.prototype.__super =
        Box2D.Dynamics.Joints.b2Joint.prototype;
    E.b2PrismaticJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchor1 = new d;
        this.m_localAnchor2 = new d;
        this.m_localXAxis1 = new d;
        this.m_localYAxis1 = new d;
        this.m_axis = new d;
        this.m_perp = new d;
        this.m_K = new b;
        this.m_impulse = new e
    };
    E.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    E.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    E.prototype.GetReactionForce =
        function(a) {
            void 0 === a && (a = 0);
            return new d(a * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x), a * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y))
        };
    E.prototype.GetReactionTorque = function(a) {
        void 0 === a && (a = 0);
        return a * this.m_impulse.y
    };
    E.prototype.GetJointTranslation = function() {
        var a = this.m_bodyA,
            b = this.m_bodyB,
            c = a.GetWorldPoint(this.m_localAnchor1),
            d = b.GetWorldPoint(this.m_localAnchor2),
            b = d.x - c.x,
            c = d.y - c.y,
            a = a.GetWorldVector(this.m_localXAxis1);
        return a.x * b + a.y * c
    };
    E.prototype.GetJointSpeed = function() {
        var a = this.m_bodyA,
            b = this.m_bodyB,
            c;
        c = a.m_xf.R;
        var d = this.m_localAnchor1.x - a.m_sweep.localCenter.x,
            e = this.m_localAnchor1.y - a.m_sweep.localCenter.y,
            f = c.col1.x * d + c.col2.x * e,
            e = c.col1.y * d + c.col2.y * e,
            d = f;
        c = b.m_xf.R;
        var g = this.m_localAnchor2.x - b.m_sweep.localCenter.x,
            h = this.m_localAnchor2.y - b.m_sweep.localCenter.y,
            f = c.col1.x * g + c.col2.x * h,
            h = c.col1.y * g + c.col2.y * h,
            g = f;
        c = b.m_sweep.c.x + g - (a.m_sweep.c.x + d);
        var f = b.m_sweep.c.y + h - (a.m_sweep.c.y + e),
            k = a.GetWorldVector(this.m_localXAxis1),
            m = a.m_linearVelocity,
            n = b.m_linearVelocity,
            a = a.m_angularVelocity,
            b = b.m_angularVelocity;
        return c * -a * k.y + f * a * k.x + (k.x * (n.x + -b * h - m.x - -a * e) + k.y * (n.y + b * g - m.y - a * d))
    };
    E.prototype.IsLimitEnabled = function() {
        return this.m_enableLimit
    };
    E.prototype.EnableLimit = function(a) {
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_enableLimit = a
    };
    E.prototype.GetLowerLimit = function() {
        return this.m_lowerTranslation
    };
    E.prototype.GetUpperLimit = function() {
        return this.m_upperTranslation
    };
    E.prototype.SetLimits = function(a,
        b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_lowerTranslation = a;
        this.m_upperTranslation = b
    };
    E.prototype.IsMotorEnabled = function() {
        return this.m_enableMotor
    };
    E.prototype.EnableMotor = function(a) {
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_enableMotor = a
    };
    E.prototype.SetMotorSpeed = function(a) {
        void 0 === a && (a = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_motorSpeed = a
    };
    E.prototype.GetMotorSpeed = function() {
        return this.m_motorSpeed
    };
    E.prototype.SetMaxMotorForce = function(a) {
        void 0 === a && (a = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_maxMotorForce = a
    };
    E.prototype.GetMotorForce = function() {
        return this.m_motorImpulse
    };
    E.prototype.b2PrismaticJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_localAnchor1.SetV(a.localAnchorA);
        this.m_localAnchor2.SetV(a.localAnchorB);
        this.m_localXAxis1.SetV(a.localAxisA);
        this.m_localYAxis1.x = -this.m_localXAxis1.y;
        this.m_localYAxis1.y = this.m_localXAxis1.x;
        this.m_refAngle = a.referenceAngle;
        this.m_impulse.SetZero();
        this.m_motorImpulse = this.m_motorMass = 0;
        this.m_lowerTranslation = a.lowerTranslation;
        this.m_upperTranslation = a.upperTranslation;
        this.m_maxMotorForce = a.maxMotorForce;
        this.m_motorSpeed = a.motorSpeed;
        this.m_enableLimit = a.enableLimit;
        this.m_enableMotor = a.enableMotor;
        this.m_limitState = t.e_inactiveLimit;
        this.m_axis.SetZero();
        this.m_perp.SetZero()
    };
    E.prototype.InitVelocityConstraints = function(a) {
        var b = this.m_bodyA,
            d = this.m_bodyB,
            e, f = 0;
        this.m_localCenterA.SetV(b.GetLocalCenter());
        this.m_localCenterB.SetV(d.GetLocalCenter());
        var g = b.GetTransform();
        d.GetTransform();
        e = b.m_xf.R;
        var k = this.m_localAnchor1.x - this.m_localCenterA.x,
            s = this.m_localAnchor1.y - this.m_localCenterA.y,
            f = e.col1.x * k + e.col2.x * s,
            s = e.col1.y * k + e.col2.y * s,
            k = f;
        e = d.m_xf.R;
        var r = this.m_localAnchor2.x - this.m_localCenterB.x,
            m = this.m_localAnchor2.y - this.m_localCenterB.y,
            f = e.col1.x * r + e.col2.x * m,
            m = e.col1.y * r + e.col2.y * m,
            r = f;
        e = d.m_sweep.c.x + r - b.m_sweep.c.x - k;
        f = d.m_sweep.c.y + m - b.m_sweep.c.y - s;
        this.m_invMassA = b.m_invMass;
        this.m_invMassB = d.m_invMass;
        this.m_invIA = b.m_invI;
        this.m_invIB = d.m_invI;
        this.m_axis.SetV(h.MulMV(g.R, this.m_localXAxis1));
        this.m_a1 = (e + k) * this.m_axis.y - (f + s) * this.m_axis.x;
        this.m_a2 = r * this.m_axis.y - m * this.m_axis.x;
        this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
        this.m_motorMass > Number.MIN_VALUE && (this.m_motorMass = 1 / this.m_motorMass);
        this.m_perp.SetV(h.MulMV(g.R, this.m_localYAxis1));
        this.m_s1 = (e + k) * this.m_perp.y - (f + s) * this.m_perp.x;
        this.m_s2 = r * this.m_perp.y - m * this.m_perp.x;
        g = this.m_invMassA;
        k = this.m_invMassB;
        s = this.m_invIA;
        r = this.m_invIB;
        this.m_K.col1.x = g + k + s * this.m_s1 * this.m_s1 + r * this.m_s2 * this.m_s2;
        this.m_K.col1.y = s * this.m_s1 + r * this.m_s2;
        this.m_K.col1.z = s * this.m_s1 * this.m_a1 + r * this.m_s2 * this.m_a2;
        this.m_K.col2.x = this.m_K.col1.y;
        this.m_K.col2.y = s + r;
        this.m_K.col2.z = s * this.m_a1 + r * this.m_a2;
        this.m_K.col3.x = this.m_K.col1.z;
        this.m_K.col3.y = this.m_K.col2.z;
        this.m_K.col3.z = g + k + s * this.m_a1 * this.m_a1 + r * this.m_a2 * this.m_a2;
        this.m_enableLimit ? (e = this.m_axis.x * e + this.m_axis.y * f, h.Abs(this.m_upperTranslation -
            this.m_lowerTranslation) < 2 * c.b2_linearSlop ? this.m_limitState = t.e_equalLimits : e <= this.m_lowerTranslation ? this.m_limitState != t.e_atLowerLimit && (this.m_limitState = t.e_atLowerLimit, this.m_impulse.z = 0) : e >= this.m_upperTranslation ? this.m_limitState != t.e_atUpperLimit && (this.m_limitState = t.e_atUpperLimit, this.m_impulse.z = 0) : (this.m_limitState = t.e_inactiveLimit, this.m_impulse.z = 0)) : this.m_limitState = t.e_inactiveLimit;
        !1 == this.m_enableMotor && (this.m_motorImpulse = 0);
        a.warmStarting ? (this.m_impulse.x *= a.dtRatio,
            this.m_impulse.y *= a.dtRatio, this.m_motorImpulse *= a.dtRatio, a = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x, e = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y, f = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1, g = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2, b.m_linearVelocity.x -= this.m_invMassA * a, b.m_linearVelocity.y -= this.m_invMassA * e,
            b.m_angularVelocity -= this.m_invIA * f, d.m_linearVelocity.x += this.m_invMassB * a, d.m_linearVelocity.y += this.m_invMassB * e, d.m_angularVelocity += this.m_invIB * g) : (this.m_impulse.SetZero(), this.m_motorImpulse = 0)
    };
    E.prototype.SolveVelocityConstraints = function(a) {
        var b = this.m_bodyA,
            c = this.m_bodyB,
            f = b.m_linearVelocity,
            g = b.m_angularVelocity,
            k = c.m_linearVelocity,
            m = c.m_angularVelocity,
            s = 0,
            r = 0,
            n = 0,
            q = 0;
        this.m_enableMotor && this.m_limitState != t.e_equalLimits && (q = this.m_motorMass * (this.m_motorSpeed - (this.m_axis.x * (k.x -
            f.x) + this.m_axis.y * (k.y - f.y) + this.m_a2 * m - this.m_a1 * g)), s = this.m_motorImpulse, a = a.dt * this.m_maxMotorForce, this.m_motorImpulse = h.Clamp(this.m_motorImpulse + q, -a, a), q = this.m_motorImpulse - s, s = q * this.m_axis.x, r = q * this.m_axis.y, n = q * this.m_a1, q *= this.m_a2, f.x -= this.m_invMassA * s, f.y -= this.m_invMassA * r, g -= this.m_invIA * n, k.x += this.m_invMassB * s, k.y += this.m_invMassB * r, m += this.m_invIB * q);
        n = this.m_perp.x * (k.x - f.x) + this.m_perp.y * (k.y - f.y) + this.m_s2 * m - this.m_s1 * g;
        r = m - g;
        this.m_enableLimit && this.m_limitState != t.e_inactiveLimit ?
            (a = this.m_axis.x * (k.x - f.x) + this.m_axis.y * (k.y - f.y) + this.m_a2 * m - this.m_a1 * g, s = this.m_impulse.Copy(), a = this.m_K.Solve33(new e, -n, -r, -a), this.m_impulse.Add(a), this.m_limitState == t.e_atLowerLimit ? this.m_impulse.z = h.Max(this.m_impulse.z, 0) : this.m_limitState == t.e_atUpperLimit && (this.m_impulse.z = h.Min(this.m_impulse.z, 0)), n = -n - (this.m_impulse.z - s.z) * this.m_K.col3.x, r = -r - (this.m_impulse.z - s.z) * this.m_K.col3.y, r = this.m_K.Solve22(new d, n, r), r.x += s.x, r.y += s.y, this.m_impulse.x = r.x, this.m_impulse.y = r.y, a.x = this.m_impulse.x -
                s.x, a.y = this.m_impulse.y - s.y, a.z = this.m_impulse.z - s.z, s = a.x * this.m_perp.x + a.z * this.m_axis.x, r = a.x * this.m_perp.y + a.z * this.m_axis.y, n = a.x * this.m_s1 + a.y + a.z * this.m_a1, q = a.x * this.m_s2 + a.y + a.z * this.m_a2) : (a = this.m_K.Solve22(new d, -n, -r), this.m_impulse.x += a.x, this.m_impulse.y += a.y, s = a.x * this.m_perp.x, r = a.x * this.m_perp.y, n = a.x * this.m_s1 + a.y, q = a.x * this.m_s2 + a.y);
        f.x -= this.m_invMassA * s;
        f.y -= this.m_invMassA * r;
        g -= this.m_invIA * n;
        k.x += this.m_invMassB * s;
        k.y += this.m_invMassB * r;
        m += this.m_invIB * q;
        b.m_linearVelocity.SetV(f);
        b.m_angularVelocity = g;
        c.m_linearVelocity.SetV(k);
        c.m_angularVelocity = m
    };
    E.prototype.SolvePositionConstraints = function() {
        var b = this.m_bodyA,
            f = this.m_bodyB,
            g = b.m_sweep.c,
            k = b.m_sweep.a,
            m = f.m_sweep.c,
            n = f.m_sweep.a,
            q, s = 0,
            r = 0,
            t = 0,
            u = 0,
            w = 0,
            r = !1,
            x = 0,
            y = a.FromAngle(k),
            B = a.FromAngle(n);
        q = y;
        var w = this.m_localAnchor1.x - this.m_localCenterA.x,
            C = this.m_localAnchor1.y - this.m_localCenterA.y,
            s = q.col1.x * w + q.col2.x * C,
            C = q.col1.y * w + q.col2.y * C,
            w = s;
        q = B;
        B = this.m_localAnchor2.x - this.m_localCenterB.x;
        t = this.m_localAnchor2.y -
            this.m_localCenterB.y;
        s = q.col1.x * B + q.col2.x * t;
        t = q.col1.y * B + q.col2.y * t;
        B = s;
        q = m.x + B - g.x - w;
        s = m.y + t - g.y - C;
        if (this.m_enableLimit) {
            this.m_axis = h.MulMV(y, this.m_localXAxis1);
            this.m_a1 = (q + w) * this.m_axis.y - (s + C) * this.m_axis.x;
            this.m_a2 = B * this.m_axis.y - t * this.m_axis.x;
            var D = this.m_axis.x * q + this.m_axis.y * s;
            h.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2 * c.b2_linearSlop ? (x = h.Clamp(D, -c.b2_maxLinearCorrection, c.b2_maxLinearCorrection), u = h.Abs(D), r = !0) : D <= this.m_lowerTranslation ? (x = h.Clamp(D - this.m_lowerTranslation +
                c.b2_linearSlop, -c.b2_maxLinearCorrection, 0), u = this.m_lowerTranslation - D, r = !0) : D >= this.m_upperTranslation && (x = h.Clamp(D - this.m_upperTranslation + c.b2_linearSlop, 0, c.b2_maxLinearCorrection), u = D - this.m_upperTranslation, r = !0)
        }
        this.m_perp = h.MulMV(y, this.m_localYAxis1);
        this.m_s1 = (q + w) * this.m_perp.y - (s + C) * this.m_perp.x;
        this.m_s2 = B * this.m_perp.y - t * this.m_perp.x;
        y = new e;
        C = this.m_perp.x * q + this.m_perp.y * s;
        B = n - k - this.m_refAngle;
        u = h.Max(u, h.Abs(C));
        w = h.Abs(B);
        r ? (r = this.m_invMassA, t = this.m_invMassB, q = this.m_invIA,
            s = this.m_invIB, this.m_K.col1.x = r + t + q * this.m_s1 * this.m_s1 + s * this.m_s2 * this.m_s2, this.m_K.col1.y = q * this.m_s1 + s * this.m_s2, this.m_K.col1.z = q * this.m_s1 * this.m_a1 + s * this.m_s2 * this.m_a2, this.m_K.col2.x = this.m_K.col1.y, this.m_K.col2.y = q + s, this.m_K.col2.z = q * this.m_a1 + s * this.m_a2, this.m_K.col3.x = this.m_K.col1.z, this.m_K.col3.y = this.m_K.col2.z, this.m_K.col3.z = r + t + q * this.m_a1 * this.m_a1 + s * this.m_a2 * this.m_a2, this.m_K.Solve33(y, -C, -B, -x)) : (r = this.m_invMassA, t = this.m_invMassB, q = this.m_invIA, s = this.m_invIB, x = q * this.m_s1 +
            s * this.m_s2, D = q + s, this.m_K.col1.Set(r + t + q * this.m_s1 * this.m_s1 + s * this.m_s2 * this.m_s2, x, 0), this.m_K.col2.Set(x, D, 0), x = this.m_K.Solve22(new d, -C, -B), y.x = x.x, y.y = x.y, y.z = 0);
        x = y.x * this.m_perp.x + y.z * this.m_axis.x;
        r = y.x * this.m_perp.y + y.z * this.m_axis.y;
        C = y.x * this.m_s1 + y.y + y.z * this.m_a1;
        y = y.x * this.m_s2 + y.y + y.z * this.m_a2;
        g.x -= this.m_invMassA * x;
        g.y -= this.m_invMassA * r;
        k -= this.m_invIA * C;
        m.x += this.m_invMassB * x;
        m.y += this.m_invMassB * r;
        n += this.m_invIB * y;
        b.m_sweep.a = k;
        f.m_sweep.a = n;
        b.SynchronizeTransform();
        f.SynchronizeTransform();
        return u <= c.b2_linearSlop && w <= c.b2_angularSlop
    };
    Box2D.inherit(G, Box2D.Dynamics.Joints.b2JointDef);
    G.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    G.b2PrismaticJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new d;
        this.localAnchorB = new d;
        this.localAxisA = new d
    };
    G.prototype.b2PrismaticJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = t.e_prismaticJoint;
        this.localAxisA.Set(1, 0);
        this.referenceAngle = 0;
        this.enableLimit = !1;
        this.upperTranslation = this.lowerTranslation = 0;
        this.enableMotor = !1;
        this.motorSpeed = this.maxMotorForce = 0
    };
    G.prototype.Initialize = function(a, b, c, d) {
        this.bodyA = a;
        this.bodyB = b;
        this.localAnchorA = this.bodyA.GetLocalPoint(c);
        this.localAnchorB = this.bodyB.GetLocalPoint(c);
        this.localAxisA = this.bodyA.GetLocalVector(d);
        this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
    };
    Box2D.inherit(D, Box2D.Dynamics.Joints.b2Joint);
    D.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    D.b2PulleyJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this,
            arguments);
        this.m_groundAnchor1 = new d;
        this.m_groundAnchor2 = new d;
        this.m_localAnchor1 = new d;
        this.m_localAnchor2 = new d;
        this.m_u1 = new d;
        this.m_u2 = new d
    };
    D.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    D.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    D.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new d(a * this.m_impulse * this.m_u2.x, a * this.m_impulse * this.m_u2.y)
    };
    D.prototype.GetReactionTorque = function() {
        return 0
    };
    D.prototype.GetGroundAnchorA = function() {
        var a = this.m_ground.m_xf.position.Copy();
        a.Add(this.m_groundAnchor1);
        return a
    };
    D.prototype.GetGroundAnchorB = function() {
        var a = this.m_ground.m_xf.position.Copy();
        a.Add(this.m_groundAnchor2);
        return a
    };
    D.prototype.GetLength1 = function() {
        var a = this.m_bodyA.GetWorldPoint(this.m_localAnchor1),
            b = a.x - (this.m_ground.m_xf.position.x + this.m_groundAnchor1.x),
            a = a.y - (this.m_ground.m_xf.position.y + this.m_groundAnchor1.y);
        return Math.sqrt(b * b + a * a)
    };
    D.prototype.GetLength2 = function() {
        var a =
            this.m_bodyB.GetWorldPoint(this.m_localAnchor2),
            b = a.x - (this.m_ground.m_xf.position.x + this.m_groundAnchor2.x),
            a = a.y - (this.m_ground.m_xf.position.y + this.m_groundAnchor2.y);
        return Math.sqrt(b * b + a * a)
    };
    D.prototype.GetRatio = function() {
        return this.m_ratio
    };
    D.prototype.b2PulleyJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_ground = this.m_bodyA.m_y314.m_groundBody;
        this.m_groundAnchor1.x = a.groundAnchorA.x - this.m_ground.m_xf.position.x;
        this.m_groundAnchor1.y = a.groundAnchorA.y - this.m_ground.m_xf.position.y;
        this.m_groundAnchor2.x = a.groundAnchorB.x - this.m_ground.m_xf.position.x;
        this.m_groundAnchor2.y = a.groundAnchorB.y - this.m_ground.m_xf.position.y;
        this.m_localAnchor1.SetV(a.localAnchorA);
        this.m_localAnchor2.SetV(a.localAnchorB);
        this.m_ratio = a.ratio;
        this.m_constant = a.lengthA + this.m_ratio * a.lengthB;
        this.m_maxLength1 = h.Min(a.maxLengthA, this.m_constant - this.m_ratio * D.b2_minPulleyLength);
        this.m_maxLength2 = h.Min(a.maxLengthB, (this.m_constant - D.b2_minPulleyLength) / this.m_ratio);
        this.m_limitImpulse2 = this.m_limitImpulse1 =
            this.m_impulse = 0
    };
    D.prototype.InitVelocityConstraints = function(a) {
        var b = this.m_bodyA,
            d = this.m_bodyB,
            e;
        e = b.m_xf.R;
        var f = this.m_localAnchor1.x - b.m_sweep.localCenter.x,
            g = this.m_localAnchor1.y - b.m_sweep.localCenter.y,
            h = e.col1.x * f + e.col2.x * g,
            g = e.col1.y * f + e.col2.y * g,
            f = h;
        e = d.m_xf.R;
        var k = this.m_localAnchor2.x - d.m_sweep.localCenter.x,
            r = this.m_localAnchor2.y - d.m_sweep.localCenter.y,
            h = e.col1.x * k + e.col2.x * r,
            r = e.col1.y * k + e.col2.y * r,
            k = h;
        e = d.m_sweep.c.x + k;
        var h = d.m_sweep.c.y + r,
            m = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x,
            n = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
        this.m_u1.Set(b.m_sweep.c.x + f - (this.m_ground.m_xf.position.x + this.m_groundAnchor1.x), b.m_sweep.c.y + g - (this.m_ground.m_xf.position.y + this.m_groundAnchor1.y));
        this.m_u2.Set(e - m, h - n);
        e = this.m_u1.Length();
        h = this.m_u2.Length();
        e > c.b2_linearSlop ? this.m_u1.Multiply(1 / e) : this.m_u1.SetZero();
        h > c.b2_linearSlop ? this.m_u2.Multiply(1 / h) : this.m_u2.SetZero();
        0 < this.m_constant - e - this.m_ratio * h ? (this.m_y7 = t.e_inactiveLimit, this.m_impulse = 0) : this.m_y7 = t.e_atUpperLimit;
        e < this.m_maxLength1 ? (this.m_limitState1 = t.e_inactiveLimit, this.m_limitImpulse1 = 0) : this.m_limitState1 = t.e_atUpperLimit;
        h < this.m_maxLength2 ? (this.m_limitState2 = t.e_inactiveLimit, this.m_limitImpulse2 = 0) : this.m_limitState2 = t.e_atUpperLimit;
        e = f * this.m_u1.y - g * this.m_u1.x;
        h = k * this.m_u2.y - r * this.m_u2.x;
        this.m_limitMass1 = b.m_invMass + b.m_invI * e * e;
        this.m_limitMass2 = d.m_invMass + d.m_invI * h * h;
        this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
        this.m_limitMass1 = 1 / this.m_limitMass1;
        this.m_limitMass2 =
            1 / this.m_limitMass2;
        this.m_pulleyMass = 1 / this.m_pulleyMass;
        a.warmStarting ? (this.m_impulse *= a.dtRatio, this.m_limitImpulse1 *= a.dtRatio, this.m_limitImpulse2 *= a.dtRatio, a = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.x, e = (-this.m_impulse - this.m_limitImpulse1) * this.m_u1.y, h = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.x, m = (-this.m_ratio * this.m_impulse - this.m_limitImpulse2) * this.m_u2.y, b.m_linearVelocity.x += b.m_invMass * a, b.m_linearVelocity.y += b.m_invMass * e, b.m_angularVelocity += b.m_invI *
            (f * e - g * a), d.m_linearVelocity.x += d.m_invMass * h, d.m_linearVelocity.y += d.m_invMass * m, d.m_angularVelocity += d.m_invI * (k * m - r * h)) : this.m_limitImpulse2 = this.m_limitImpulse1 = this.m_impulse = 0
    };
    D.prototype.SolveVelocityConstraints = function() {
        var a = this.m_bodyA,
            b = this.m_bodyB,
            c;
        c = a.m_xf.R;
        var d = this.m_localAnchor1.x - a.m_sweep.localCenter.x,
            e = this.m_localAnchor1.y - a.m_sweep.localCenter.y,
            f = c.col1.x * d + c.col2.x * e,
            e = c.col1.y * d + c.col2.y * e,
            d = f;
        c = b.m_xf.R;
        var g = this.m_localAnchor2.x - b.m_sweep.localCenter.x,
            k = this.m_localAnchor2.y -
            b.m_sweep.localCenter.y,
            f = c.col1.x * g + c.col2.x * k,
            k = c.col1.y * g + c.col2.y * k,
            g = f,
            r = 0,
            m = 0;
        this.m_y7 == t.e_atUpperLimit && (c = a.m_linearVelocity.x + -a.m_angularVelocity * e, f = a.m_linearVelocity.y + a.m_angularVelocity * d, r = b.m_linearVelocity.x + -b.m_angularVelocity * k, m = b.m_linearVelocity.y + b.m_angularVelocity * g, c = -(this.m_u1.x * c + this.m_u1.y * f) - this.m_ratio * (this.m_u2.x * r + this.m_u2.y * m), m = this.m_pulleyMass * -c, c = this.m_impulse, this.m_impulse = h.Max(0, this.m_impulse + m), m = this.m_impulse - c, c = -m * this.m_u1.x, f = -m * this.m_u1.y,
            r = -this.m_ratio * m * this.m_u2.x, m = -this.m_ratio * m * this.m_u2.y, a.m_linearVelocity.x += a.m_invMass * c, a.m_linearVelocity.y += a.m_invMass * f, a.m_angularVelocity += a.m_invI * (d * f - e * c), b.m_linearVelocity.x += b.m_invMass * r, b.m_linearVelocity.y += b.m_invMass * m, b.m_angularVelocity += b.m_invI * (g * m - k * r));
        this.m_limitState1 == t.e_atUpperLimit && (c = a.m_linearVelocity.x + -a.m_angularVelocity * e, f = a.m_linearVelocity.y + a.m_angularVelocity * d, c = -(this.m_u1.x * c + this.m_u1.y * f), m = -this.m_limitMass1 * c, c = this.m_limitImpulse1, this.m_limitImpulse1 =
            h.Max(0, this.m_limitImpulse1 + m), m = this.m_limitImpulse1 - c, c = -m * this.m_u1.x, f = -m * this.m_u1.y, a.m_linearVelocity.x += a.m_invMass * c, a.m_linearVelocity.y += a.m_invMass * f, a.m_angularVelocity += a.m_invI * (d * f - e * c));
        this.m_limitState2 == t.e_atUpperLimit && (r = b.m_linearVelocity.x + -b.m_angularVelocity * k, m = b.m_linearVelocity.y + b.m_angularVelocity * g, c = -(this.m_u2.x * r + this.m_u2.y * m), m = -this.m_limitMass2 * c, c = this.m_limitImpulse2, this.m_limitImpulse2 = h.Max(0, this.m_limitImpulse2 + m), m = this.m_limitImpulse2 - c, r = -m * this.m_u2.x,
            m = -m * this.m_u2.y, b.m_linearVelocity.x += b.m_invMass * r, b.m_linearVelocity.y += b.m_invMass * m, b.m_angularVelocity += b.m_invI * (g * m - k * r))
    };
    D.prototype.SolvePositionConstraints = function() {
        var a = this.m_bodyA,
            b = this.m_bodyB,
            d, e = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x,
            f = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y,
            g = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x,
            k = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y,
            m = 0,
            r = 0,
            n = 0,
            q = 0,
            u = 0,
            w = 0,
            x = 0,
            y = 0;
        this.m_y7 == t.e_atUpperLimit && (d = a.m_xf.R,
            m = this.m_localAnchor1.x - a.m_sweep.localCenter.x, r = this.m_localAnchor1.y - a.m_sweep.localCenter.y, u = d.col1.x * m + d.col2.x * r, r = d.col1.y * m + d.col2.y * r, m = u, d = b.m_xf.R, n = this.m_localAnchor2.x - b.m_sweep.localCenter.x, q = this.m_localAnchor2.y - b.m_sweep.localCenter.y, u = d.col1.x * n + d.col2.x * q, q = d.col1.y * n + d.col2.y * q, n = u, d = a.m_sweep.c.x + m, u = a.m_sweep.c.y + r, w = b.m_sweep.c.x + n, x = b.m_sweep.c.y + q, this.m_u1.Set(d - e, u - f), this.m_u2.Set(w - g, x - k), d = this.m_u1.Length(), u = this.m_u2.Length(), d > c.b2_linearSlop ? this.m_u1.Multiply(1 /
                d) : this.m_u1.SetZero(), u > c.b2_linearSlop ? this.m_u2.Multiply(1 / u) : this.m_u2.SetZero(), d = this.m_constant - d - this.m_ratio * u, y = h.Max(y, -d), d = h.Clamp(d + c.b2_linearSlop, -c.b2_maxLinearCorrection, 0), x = -this.m_pulleyMass * d, d = -x * this.m_u1.x, u = -x * this.m_u1.y, w = -this.m_ratio * x * this.m_u2.x, x = -this.m_ratio * x * this.m_u2.y, a.m_sweep.c.x += a.m_invMass * d, a.m_sweep.c.y += a.m_invMass * u, a.m_sweep.a += a.m_invI * (m * u - r * d), b.m_sweep.c.x += b.m_invMass * w, b.m_sweep.c.y += b.m_invMass * x, b.m_sweep.a += b.m_invI * (n * x - q * w), a.SynchronizeTransform(),
            b.SynchronizeTransform());
        this.m_limitState1 == t.e_atUpperLimit && (d = a.m_xf.R, m = this.m_localAnchor1.x - a.m_sweep.localCenter.x, r = this.m_localAnchor1.y - a.m_sweep.localCenter.y, u = d.col1.x * m + d.col2.x * r, r = d.col1.y * m + d.col2.y * r, m = u, d = a.m_sweep.c.x + m, u = a.m_sweep.c.y + r, this.m_u1.Set(d - e, u - f), d = this.m_u1.Length(), d > c.b2_linearSlop ? (this.m_u1.x *= 1 / d, this.m_u1.y *= 1 / d) : this.m_u1.SetZero(), d = this.m_maxLength1 - d, y = h.Max(y, -d), d = h.Clamp(d + c.b2_linearSlop, -c.b2_maxLinearCorrection, 0), x = -this.m_limitMass1 * d, d = -x * this.m_u1.x,
            u = -x * this.m_u1.y, a.m_sweep.c.x += a.m_invMass * d, a.m_sweep.c.y += a.m_invMass * u, a.m_sweep.a += a.m_invI * (m * u - r * d), a.SynchronizeTransform());
        this.m_limitState2 == t.e_atUpperLimit && (d = b.m_xf.R, n = this.m_localAnchor2.x - b.m_sweep.localCenter.x, q = this.m_localAnchor2.y - b.m_sweep.localCenter.y, u = d.col1.x * n + d.col2.x * q, q = d.col1.y * n + d.col2.y * q, n = u, w = b.m_sweep.c.x + n, x = b.m_sweep.c.y + q, this.m_u2.Set(w - g, x - k), u = this.m_u2.Length(), u > c.b2_linearSlop ? (this.m_u2.x *= 1 / u, this.m_u2.y *= 1 / u) : this.m_u2.SetZero(), d = this.m_maxLength2 -
            u, y = h.Max(y, -d), d = h.Clamp(d + c.b2_linearSlop, -c.b2_maxLinearCorrection, 0), x = -this.m_limitMass2 * d, w = -x * this.m_u2.x, x = -x * this.m_u2.y, b.m_sweep.c.x += b.m_invMass * w, b.m_sweep.c.y += b.m_invMass * x, b.m_sweep.a += b.m_invI * (n * x - q * w), b.SynchronizeTransform());
        return y < c.b2_linearSlop
    };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Joints.b2PulleyJoint.b2_minPulleyLength = 2
    });
    Box2D.inherit(K, Box2D.Dynamics.Joints.b2JointDef);
    K.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    K.b2PulleyJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this,
            arguments);
        this.groundAnchorA = new d;
        this.groundAnchorB = new d;
        this.localAnchorA = new d;
        this.localAnchorB = new d
    };
    K.prototype.b2PulleyJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = t.e_pulleyJoint;
        this.groundAnchorA.Set(-1, 1);
        this.groundAnchorB.Set(1, 1);
        this.localAnchorA.Set(-1, 0);
        this.localAnchorB.Set(1, 0);
        this.maxLengthB = this.lengthB = this.maxLengthA = this.lengthA = 0;
        this.ratio = 1;
        this.collideConnected = !0
    };
    K.prototype.Initialize = function(a, b, c, d, e, f, g) {
        void 0 === g && (g = 0);
        this.bodyA = a;
        this.bodyB =
            b;
        this.groundAnchorA.SetV(c);
        this.groundAnchorB.SetV(d);
        this.localAnchorA = this.bodyA.GetLocalPoint(e);
        this.localAnchorB = this.bodyB.GetLocalPoint(f);
        a = e.x - c.x;
        c = e.y - c.y;
        this.lengthA = Math.sqrt(a * a + c * c);
        c = f.x - d.x;
        d = f.y - d.y;
        this.lengthB = Math.sqrt(c * c + d * d);
        this.ratio = g;
        g = this.lengthA + this.ratio * this.lengthB;
        this.maxLengthA = g - this.ratio * D.b2_minPulleyLength;
        this.maxLengthB = (g - D.b2_minPulleyLength) / this.ratio
    };
    Box2D.inherit(F, Box2D.Dynamics.Joints.b2Joint);
    F.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    F.b2RevoluteJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.K = new a;
        this.K1 = new a;
        this.K2 = new a;
        this.K3 = new a;
        this.impulse3 = new e;
        this.impulse2 = new d;
        this.reduced = new d;
        this.m_localAnchor1 = new d;
        this.m_localAnchor2 = new d;
        this.m_impulse = new e;
        this.m_mass = new b
    };
    F.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1)
    };
    F.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2)
    };
    F.prototype.GetReactionForce =
        function(a) {
            void 0 === a && (a = 0);
            return new d(a * this.m_impulse.x, a * this.m_impulse.y)
        };
    F.prototype.GetReactionTorque = function(a) {
        void 0 === a && (a = 0);
        return a * this.m_impulse.z
    };
    F.prototype.GetJointAngle = function() {
        return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle
    };
    F.prototype.GetJointSpeed = function() {
        return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity
    };
    F.prototype.IsLimitEnabled = function() {
        return this.m_enableLimit
    };
    F.prototype.EnableLimit = function(a) {
        this.m_enableLimit =
            a
    };
    F.prototype.GetLowerLimit = function() {
        return this.m_lowerAngle
    };
    F.prototype.GetUpperLimit = function() {
        return this.m_upperAngle
    };
    F.prototype.SetLimits = function(a, b) {
        void 0 === a && (a = 0);
        void 0 === b && (b = 0);
        this.m_lowerAngle = a;
        this.m_upperAngle = b
    };
    F.prototype.IsMotorEnabled = function() {
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        return this.m_enableMotor
    };
    F.prototype.EnableMotor = function(a) {
        this.m_enableMotor = a
    };
    F.prototype.SetMotorSpeed = function(a) {
        void 0 === a && (a = 0);
        this.m_bodyA.SetAwake(!0);
        this.m_bodyB.SetAwake(!0);
        this.m_motorSpeed = a
    };
    F.prototype.GetMotorSpeed = function() {
        return this.m_motorSpeed
    };
    F.prototype.SetMaxMotorTorque = function(a) {
        void 0 === a && (a = 0);
        this.m_maxMotorTorque = a
    };
    F.prototype.GetMotorTorque = function() {
        return this.m_maxMotorTorque
    };
    F.prototype.b2RevoluteJoint = function(a) {
        this.__super.b2Joint.call(this, a);
        this.m_localAnchor1.SetV(a.localAnchorA);
        this.m_localAnchor2.SetV(a.localAnchorB);
        this.m_referenceAngle = a.referenceAngle;
        this.m_impulse.SetZero();
        this.m_motorImpulse = 0;
        this.m_lowerAngle = a.lowerAngle;
        this.m_upperAngle = a.upperAngle;
        this.m_maxMotorTorque = a.maxMotorTorque;
        this.m_motorSpeed = a.motorSpeed;
        this.m_enableLimit = a.enableLimit;
        this.m_enableMotor = a.enableMotor;
        this.m_limitState = t.e_inactiveLimit
    };
    F.prototype.InitVelocityConstraints = function(a) {
        var b = this.m_bodyA,
            d = this.m_bodyB,
            e, f = 0;
        e = b.m_xf.R;
        var g = this.m_localAnchor1.x - b.m_sweep.localCenter.x,
            k = this.m_localAnchor1.y - b.m_sweep.localCenter.y,
            f = e.col1.x * g + e.col2.x * k,
            k = e.col1.y * g + e.col2.y * k,
            g = f;
        e = d.m_xf.R;
        var m = this.m_localAnchor2.x - d.m_sweep.localCenter.x,
            r = this.m_localAnchor2.y - d.m_sweep.localCenter.y,
            f = e.col1.x * m + e.col2.x * r,
            r = e.col1.y * m + e.col2.y * r,
            m = f;
        e = b.m_invMass;
        var f = d.m_invMass,
            n = b.m_invI,
            q = d.m_invI;
        this.m_mass.col1.x = e + f + k * k * n + r * r * q;
        this.m_mass.col2.x = -k * g * n - r * m * q;
        this.m_mass.col3.x = -k * n - r * q;
        this.m_mass.col1.y = this.m_mass.col2.x;
        this.m_mass.col2.y = e + f + g * g * n + m * m * q;
        this.m_mass.col3.y = g * n + m * q;
        this.m_mass.col1.z = this.m_mass.col3.x;
        this.m_mass.col2.z = this.m_mass.col3.y;
        this.m_mass.col3.z = n + q;
        this.m_motorMass = 1 / (n + q);
        !1 == this.m_enableMotor && (this.m_motorImpulse =
            0);
        if (this.m_enableLimit) {
            var u = d.m_sweep.a - b.m_sweep.a - this.m_referenceAngle;
            h.Abs(this.m_upperAngle - this.m_lowerAngle) < 2 * c.b2_angularSlop ? this.m_limitState = t.e_equalLimits : u <= this.m_lowerAngle ? (this.m_limitState != t.e_atLowerLimit && (this.m_impulse.z = 0), this.m_limitState = t.e_atLowerLimit) : u >= this.m_upperAngle ? (this.m_limitState != t.e_atUpperLimit && (this.m_impulse.z = 0), this.m_limitState = t.e_atUpperLimit) : (this.m_limitState = t.e_inactiveLimit, this.m_impulse.z = 0)
        } else this.m_limitState = t.e_inactiveLimit;
        a.warmStarting ? (this.m_impulse.x *= a.dtRatio, this.m_impulse.y *= a.dtRatio, this.m_motorImpulse *= a.dtRatio, a = this.m_impulse.x, u = this.m_impulse.y, b.m_linearVelocity.x -= e * a, b.m_linearVelocity.y -= e * u, b.m_angularVelocity -= n * (g * u - k * a + this.m_motorImpulse + this.m_impulse.z), d.m_linearVelocity.x += f * a, d.m_linearVelocity.y += f * u, d.m_angularVelocity += q * (m * u - r * a + this.m_motorImpulse + this.m_impulse.z)) : (this.m_impulse.SetZero(), this.m_motorImpulse = 0)
    };
    F.prototype.SolveVelocityConstraints = function(a) {
        var b = this.m_bodyA,
            c = this.m_bodyB,
            d = 0,
            e = 0,
            f = 0,
            g = 0,
            k = 0,
            r = b.m_linearVelocity,
            m = b.m_angularVelocity,
            n = c.m_linearVelocity,
            q = c.m_angularVelocity,
            u = b.m_invMass,
            w = c.m_invMass,
            x = b.m_invI,
            y = c.m_invI;
        this.m_enableMotor && this.m_limitState != t.e_equalLimits && (e = this.m_motorMass * -(q - m - this.m_motorSpeed), f = this.m_motorImpulse, g = a.dt * this.m_maxMotorTorque, this.m_motorImpulse = h.Clamp(this.m_motorImpulse + e, -g, g), e = this.m_motorImpulse - f, m -= x * e, q += y * e);
        if (this.m_enableLimit && this.m_limitState != t.e_inactiveLimit) {
            a = b.m_xf.R;
            e = this.m_localAnchor1.x -
                b.m_sweep.localCenter.x;
            f = this.m_localAnchor1.y - b.m_sweep.localCenter.y;
            d = a.col1.x * e + a.col2.x * f;
            f = a.col1.y * e + a.col2.y * f;
            e = d;
            a = c.m_xf.R;
            g = this.m_localAnchor2.x - c.m_sweep.localCenter.x;
            k = this.m_localAnchor2.y - c.m_sweep.localCenter.y;
            d = a.col1.x * g + a.col2.x * k;
            k = a.col1.y * g + a.col2.y * k;
            g = d;
            a = n.x + -q * k - r.x - -m * f;
            var B = n.y + q * g - r.y - m * e;
            this.m_mass.Solve33(this.impulse3, -a, -B, -(q - m));
            this.m_limitState == t.e_equalLimits ? this.m_impulse.Add(this.impulse3) : this.m_limitState == t.e_atLowerLimit ? (d = this.m_impulse.z + this.impulse3.z,
                0 > d && (this.m_mass.Solve22(this.reduced, -a, -B), this.impulse3.x = this.reduced.x, this.impulse3.y = this.reduced.y, this.impulse3.z = -this.m_impulse.z, this.m_impulse.x += this.reduced.x, this.m_impulse.y += this.reduced.y, this.m_impulse.z = 0)) : this.m_limitState == t.e_atUpperLimit && (d = this.m_impulse.z + this.impulse3.z, 0 < d && (this.m_mass.Solve22(this.reduced, -a, -B), this.impulse3.x = this.reduced.x, this.impulse3.y = this.reduced.y, this.impulse3.z = -this.m_impulse.z, this.m_impulse.x += this.reduced.x, this.m_impulse.y += this.reduced.y,
                this.m_impulse.z = 0));
            r.x -= u * this.impulse3.x;
            r.y -= u * this.impulse3.y;
            m -= x * (e * this.impulse3.y - f * this.impulse3.x + this.impulse3.z);
            n.x += w * this.impulse3.x;
            n.y += w * this.impulse3.y;
            q += y * (g * this.impulse3.y - k * this.impulse3.x + this.impulse3.z)
        } else a = b.m_xf.R, e = this.m_localAnchor1.x - b.m_sweep.localCenter.x, f = this.m_localAnchor1.y - b.m_sweep.localCenter.y, d = a.col1.x * e + a.col2.x * f, f = a.col1.y * e + a.col2.y * f, e = d, a = c.m_xf.R, g = this.m_localAnchor2.x - c.m_sweep.localCenter.x, k = this.m_localAnchor2.y - c.m_sweep.localCenter.y,
            d = a.col1.x * g + a.col2.x * k, k = a.col1.y * g + a.col2.y * k, g = d, this.m_mass.Solve22(this.impulse2, -(n.x + -q * k - r.x - -m * f), -(n.y + q * g - r.y - m * e)), this.m_impulse.x += this.impulse2.x, this.m_impulse.y += this.impulse2.y, r.x -= u * this.impulse2.x, r.y -= u * this.impulse2.y, m -= x * (e * this.impulse2.y - f * this.impulse2.x), n.x += w * this.impulse2.x, n.y += w * this.impulse2.y, q += y * (g * this.impulse2.y - k * this.impulse2.x);
        b.m_linearVelocity.SetV(r);
        b.m_angularVelocity = m;
        c.m_linearVelocity.SetV(n);
        c.m_angularVelocity = q
    };
    F.prototype.SolvePositionConstraints =
        function() {
            var a = 0,
                b, d = this.m_bodyA,
                e = this.m_bodyB,
                f = 0,
                g = 0,
                k = 0,
                m = 0;
            if (this.m_enableLimit && this.m_limitState != t.e_inactiveLimit) {
                var a = e.m_sweep.a - d.m_sweep.a - this.m_referenceAngle,
                    r = 0;
                this.m_limitState == t.e_equalLimits ? (a = h.Clamp(a - this.m_lowerAngle, -c.b2_maxAngularCorrection, c.b2_maxAngularCorrection), r = -this.m_motorMass * a, f = h.Abs(a)) : this.m_limitState == t.e_atLowerLimit ? (a -= this.m_lowerAngle, f = -a, a = h.Clamp(a + c.b2_angularSlop, -c.b2_maxAngularCorrection, 0), r = -this.m_motorMass * a) : this.m_limitState ==
                    t.e_atUpperLimit && (f = a -= this.m_upperAngle, a = h.Clamp(a - c.b2_angularSlop, 0, c.b2_maxAngularCorrection), r = -this.m_motorMass * a);
                d.m_sweep.a -= d.m_invI * r;
                e.m_sweep.a += e.m_invI * r;
                d.SynchronizeTransform();
                e.SynchronizeTransform()
            }
            b = d.m_xf.R;
            r = this.m_localAnchor1.x - d.m_sweep.localCenter.x;
            a = this.m_localAnchor1.y - d.m_sweep.localCenter.y;
            g = b.col1.x * r + b.col2.x * a;
            a = b.col1.y * r + b.col2.y * a;
            r = g;
            b = e.m_xf.R;
            var n = this.m_localAnchor2.x - e.m_sweep.localCenter.x,
                q = this.m_localAnchor2.y - e.m_sweep.localCenter.y,
                g = b.col1.x *
                n + b.col2.x * q,
                q = b.col1.y * n + b.col2.y * q,
                n = g,
                k = e.m_sweep.c.x + n - d.m_sweep.c.x - r,
                m = e.m_sweep.c.y + q - d.m_sweep.c.y - a,
                u = k * k + m * m;
            b = Math.sqrt(u);
            var g = d.m_invMass,
                w = e.m_invMass,
                x = d.m_invI,
                y = e.m_invI,
                B = 10 * c.b2_linearSlop;
            u > B * B && (u = 1 / (g + w), k = u * -k, m = u * -m, d.m_sweep.c.x -= 0.5 * g * k, d.m_sweep.c.y -= 0.5 * g * m, e.m_sweep.c.x += 0.5 * w * k, e.m_sweep.c.y += 0.5 * w * m, k = e.m_sweep.c.x + n - d.m_sweep.c.x - r, m = e.m_sweep.c.y + q - d.m_sweep.c.y - a);
            this.K1.col1.x = g + w;
            this.K1.col2.x = 0;
            this.K1.col1.y = 0;
            this.K1.col2.y = g + w;
            this.K2.col1.x = x * a * a;
            this.K2.col2.x = -x * r * a;
            this.K2.col1.y = -x * r * a;
            this.K2.col2.y = x * r * r;
            this.K3.col1.x = y * q * q;
            this.K3.col2.x = -y * n * q;
            this.K3.col1.y = -y * n * q;
            this.K3.col2.y = y * n * n;
            this.K.SetM(this.K1);
            this.K.AddM(this.K2);
            this.K.AddM(this.K3);
            this.K.Solve(F.tImpulse, -k, -m);
            k = F.tImpulse.x;
            m = F.tImpulse.y;
            d.m_sweep.c.x -= d.m_invMass * k;
            d.m_sweep.c.y -= d.m_invMass * m;
            d.m_sweep.a -= d.m_invI * (r * m - a * k);
            e.m_sweep.c.x += e.m_invMass * k;
            e.m_sweep.c.y += e.m_invMass * m;
            e.m_sweep.a += e.m_invI * (n * m - q * k);
            d.SynchronizeTransform();
            e.SynchronizeTransform();
            return b <= c.b2_linearSlop &&
                f <= c.b2_angularSlop
        };
    Box2D.postDefs.push(function() {
        Box2D.Dynamics.Joints.b2RevoluteJoint.tImpulse = new d
    });
    Box2D.inherit(I, Box2D.Dynamics.Joints.b2JointDef);
    I.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    I.b2RevoluteJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new d;
        this.localAnchorB = new d
    };
    I.prototype.b2RevoluteJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = t.e_revoluteJoint;
        this.localAnchorA.Set(0, 0);
        this.localAnchorB.Set(0,
            0);
        this.motorSpeed = this.maxMotorTorque = this.upperAngle = this.lowerAngle = this.referenceAngle = 0;
        this.enableMotor = this.enableLimit = !1
    };
    I.prototype.Initialize = function(a, b, c) {
        this.bodyA = a;
        this.bodyB = b;
        this.localAnchorA = this.bodyA.GetLocalPoint(c);
        this.localAnchorB = this.bodyB.GetLocalPoint(c);
        this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
    };
    Box2D.inherit(O, Box2D.Dynamics.Joints.b2Joint);
    O.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    O.b2WeldJoint = function() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this,
            arguments);
        this.m_localAnchorA = new d;
        this.m_localAnchorB = new d;
        this.m_impulse = new e;
        this.m_mass = new b
    };
    O.prototype.GetAnchorA = function() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA)
    };
    O.prototype.GetAnchorB = function() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB)
    };
    O.prototype.GetReactionForce = function(a) {
        void 0 === a && (a = 0);
        return new d(a * this.m_impulse.x, a * this.m_impulse.y)
    };
    O.prototype.GetReactionTorque = function(a) {
        void 0 === a && (a = 0);
        return a * this.m_impulse.z
    };
    O.prototype.b2WeldJoint =
        function(a) {
            this.__super.b2Joint.call(this, a);
            this.m_localAnchorA.SetV(a.localAnchorA);
            this.m_localAnchorB.SetV(a.localAnchorB);
            this.m_referenceAngle = a.referenceAngle;
            this.m_impulse.SetZero();
            this.m_mass = new b
        };
    O.prototype.InitVelocityConstraints = function(a) {
        var b, c = 0,
            d = this.m_bodyA,
            e = this.m_bodyB;
        b = d.m_xf.R;
        var f = this.m_localAnchorA.x - d.m_sweep.localCenter.x,
            g = this.m_localAnchorA.y - d.m_sweep.localCenter.y,
            c = b.col1.x * f + b.col2.x * g,
            g = b.col1.y * f + b.col2.y * g,
            f = c;
        b = e.m_xf.R;
        var h = this.m_localAnchorB.x -
            e.m_sweep.localCenter.x,
            k = this.m_localAnchorB.y - e.m_sweep.localCenter.y,
            c = b.col1.x * h + b.col2.x * k,
            k = b.col1.y * h + b.col2.y * k,
            h = c;
        b = d.m_invMass;
        var c = e.m_invMass,
            m = d.m_invI,
            n = e.m_invI;
        this.m_mass.col1.x = b + c + g * g * m + k * k * n;
        this.m_mass.col2.x = -g * f * m - k * h * n;
        this.m_mass.col3.x = -g * m - k * n;
        this.m_mass.col1.y = this.m_mass.col2.x;
        this.m_mass.col2.y = b + c + f * f * m + h * h * n;
        this.m_mass.col3.y = f * m + h * n;
        this.m_mass.col1.z = this.m_mass.col3.x;
        this.m_mass.col2.z = this.m_mass.col3.y;
        this.m_mass.col3.z = m + n;
        a.warmStarting ? (this.m_impulse.x *=
            a.dtRatio, this.m_impulse.y *= a.dtRatio, this.m_impulse.z *= a.dtRatio, d.m_linearVelocity.x -= b * this.m_impulse.x, d.m_linearVelocity.y -= b * this.m_impulse.y, d.m_angularVelocity -= m * (f * this.m_impulse.y - g * this.m_impulse.x + this.m_impulse.z), e.m_linearVelocity.x += c * this.m_impulse.x, e.m_linearVelocity.y += c * this.m_impulse.y, e.m_angularVelocity += n * (h * this.m_impulse.y - k * this.m_impulse.x + this.m_impulse.z)) : this.m_impulse.SetZero()
    };
    O.prototype.SolveVelocityConstraints = function() {
        var a, b = 0,
            c = this.m_bodyA,
            d = this.m_bodyB,
            f = c.m_linearVelocity,
            g = c.m_angularVelocity,
            h = d.m_linearVelocity,
            k = d.m_angularVelocity,
            m = c.m_invMass,
            n = d.m_invMass,
            q = c.m_invI,
            u = d.m_invI;
        a = c.m_xf.R;
        var t = this.m_localAnchorA.x - c.m_sweep.localCenter.x,
            w = this.m_localAnchorA.y - c.m_sweep.localCenter.y,
            b = a.col1.x * t + a.col2.x * w,
            w = a.col1.y * t + a.col2.y * w,
            t = b;
        a = d.m_xf.R;
        var x = this.m_localAnchorB.x - d.m_sweep.localCenter.x,
            y = this.m_localAnchorB.y - d.m_sweep.localCenter.y,
            b = a.col1.x * x + a.col2.x * y,
            y = a.col1.y * x + a.col2.y * y,
            x = b;
        a = h.x - k * y - f.x + g * w;
        var b = h.y + k * x - f.y - g * t,
            B = k - g,
            C = new e;
        this.m_mass.Solve33(C, -a, -b, -B);
        this.m_impulse.Add(C);
        f.x -= m * C.x;
        f.y -= m * C.y;
        g -= q * (t * C.y - w * C.x + C.z);
        h.x += n * C.x;
        h.y += n * C.y;
        k += u * (x * C.y - y * C.x + C.z);
        c.m_angularVelocity = g;
        d.m_angularVelocity = k
    };
    O.prototype.SolvePositionConstraints = function() {
        var a, b = 0,
            d = this.m_bodyA,
            f = this.m_bodyB;
        a = d.m_xf.R;
        var g = this.m_localAnchorA.x - d.m_sweep.localCenter.x,
            k = this.m_localAnchorA.y - d.m_sweep.localCenter.y,
            b = a.col1.x * g + a.col2.x * k,
            k = a.col1.y * g + a.col2.y * k,
            g = b;
        a = f.m_xf.R;
        var m = this.m_localAnchorB.x - f.m_sweep.localCenter.x,
            n = this.m_localAnchorB.y - f.m_sweep.localCenter.y,
            b = a.col1.x * m + a.col2.x * n,
            n = a.col1.y * m + a.col2.y * n,
            m = b;
        a = d.m_invMass;
        var b = f.m_invMass,
            r = d.m_invI,
            q = f.m_invI,
            t = f.m_sweep.c.x + m - d.m_sweep.c.x - g,
            u = f.m_sweep.c.y + n - d.m_sweep.c.y - k,
            w = f.m_sweep.a - d.m_sweep.a - this.m_referenceAngle,
            x = 10 * c.b2_linearSlop,
            y = Math.sqrt(t * t + u * u),
            B = h.Abs(w);
        y > x && (r *= 1, q *= 1);
        this.m_mass.col1.x = a + b + k * k * r + n * n * q;
        this.m_mass.col2.x = -k * g * r - n * m * q;
        this.m_mass.col3.x = -k * r - n * q;
        this.m_mass.col1.y = this.m_mass.col2.x;
        this.m_mass.col2.y = a + b + g * g * r +
            m * m * q;
        this.m_mass.col3.y = g * r + m * q;
        this.m_mass.col1.z = this.m_mass.col3.x;
        this.m_mass.col2.z = this.m_mass.col3.y;
        this.m_mass.col3.z = r + q;
        x = new e;
        this.m_mass.Solve33(x, -t, -u, -w);
        d.m_sweep.c.x -= a * x.x;
        d.m_sweep.c.y -= a * x.y;
        d.m_sweep.a -= r * (g * x.y - k * x.x + x.z);
        f.m_sweep.c.x += b * x.x;
        f.m_sweep.c.y += b * x.y;
        f.m_sweep.a += q * (m * x.y - n * x.x + x.z);
        d.SynchronizeTransform();
        f.SynchronizeTransform();
        return y <= c.b2_linearSlop && B <= c.b2_angularSlop
    };
    Box2D.inherit(L, Box2D.Dynamics.Joints.b2JointDef);
    L.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    L.b2WeldJointDef = function() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new d;
        this.localAnchorB = new d
    };
    L.prototype.b2WeldJointDef = function() {
        this.__super.b2JointDef.call(this);
        this.type = t.e_weldJoint;
        this.referenceAngle = 0
    };
    L.prototype.Initialize = function(a, b, c) {
        this.bodyA = a;
        this.bodyB = b;
        this.localAnchorA.SetV(this.bodyA.GetLocalPoint(c));
        this.localAnchorB.SetV(this.bodyB.GetLocalPoint(c));
        this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle()
    }
})();
(function() {
    var c = Box2D.Dynamics.y270;
    c.y270 = function() {
        this.m_xformScale = this.m_fillAlpha = this.m_alpha = this.m_lineThickness = this.m_drawScale = 1;
        var a = this;
        this.m_sprite = {
            graphics: {
                clear: function() {
                    a.m_ctx.clearRect(0, 0, a.m_ctx.canvas.width, a.m_ctx.canvas.height)
                }
            }
        }
    };
    c.prototype._color = function(a, b) {
        return "rgba(" + ((a & 16711680) >> 16) + "," + ((a & 65280) >> 8) + "," + (a & 255) + "," + b + ")"
    };
    c.prototype.y270 = function() {
        this.m_drawFlags = 0
    };
    c.prototype.SetFlags = function(a) {
        void 0 === a && (a = 0);
        this.m_drawFlags = a
    };
    c.prototype.GetFlags =
        function() {
            return this.m_drawFlags
        };
    c.prototype.AppendFlags = function(a) {
        void 0 === a && (a = 0);
        this.m_drawFlags |= a
    };
    c.prototype.ClearFlags = function(a) {
        void 0 === a && (a = 0);
        this.m_drawFlags &= ~a
    };
    c.prototype.SetSprite = function(a) {
        this.m_ctx = a
    };
    c.prototype.GetSprite = function() {
        return this.m_ctx
    };
    c.prototype.SetDrawScale = function(a) {
        void 0 === a && (a = 0);
        this.m_drawScale = a
    };
    c.prototype.GetDrawScale = function() {
        return this.m_drawScale
    };
    c.prototype.SetLineThickness = function(a) {
        void 0 === a && (a = 0);
        this.m_lineThickness =
            a;
        this.m_ctx.strokeWidth = a
    };
    c.prototype.GetLineThickness = function() {
        return this.m_lineThickness
    };
    c.prototype.SetAlpha = function(a) {
        void 0 === a && (a = 0);
        this.m_alpha = a
    };
    c.prototype.GetAlpha = function() {
        return this.m_alpha
    };
    c.prototype.SetFillAlpha = function(a) {
        void 0 === a && (a = 0);
        this.m_fillAlpha = a
    };
    c.prototype.GetFillAlpha = function() {
        return this.m_fillAlpha
    };
    c.prototype.SetXFormScale = function(a) {
        void 0 === a && (a = 0);
        this.m_xformScale = a
    };
    c.prototype.GetXFormScale = function() {
        return this.m_xformScale
    };
    c.prototype.DrawPolygon =
        function(a, b, c) {
            if (b) {
                var d = this.m_ctx,
                    e = this.m_drawScale;
                d.beginPath();
                d.strokeStyle = this._color(c.color, this.m_alpha);
                d.moveTo(a[0].x * e, a[0].y * e);
                for (c = 1; c < b; c++) d.lineTo(a[c].x * e, a[c].y * e);
                d.lineTo(a[0].x * e, a[0].y * e);
                d.closePath();
                d.stroke()
            }
        };
    c.prototype.DrawSolidPolygon = function(a, b, c) {
        if (b) {
            var d = this.m_ctx,
                e = this.m_drawScale;
            d.beginPath();
            d.strokeStyle = this._color(c.color, this.m_alpha);
            d.fillStyle = this._color(c.color, this.m_fillAlpha);
            d.moveTo(a[0].x * e, a[0].y * e);
            for (c = 1; c < b; c++) d.lineTo(a[c].x *
                e, a[c].y * e);
            d.lineTo(a[0].x * e, a[0].y * e);
            d.closePath();
            d.fill();
            d.stroke()
        }
    };
    c.prototype.DrawCircle = function(a, b, c) {
        if (b) {
            var d = this.m_ctx,
                e = this.m_drawScale;
            d.beginPath();
            d.strokeStyle = this._color(c.color, this.m_alpha);
            d.arc(a.x * e, a.y * e, b * e, 0, 2 * Math.PI, !0);
            d.closePath();
            d.stroke()
        }
    };
    c.prototype.DrawSolidCircle = function(a, b, c, d) {
        if (b) {
            var e = this.m_ctx,
                f = this.m_drawScale,
                g = a.x * f,
                k = a.y * f;
            e.moveTo(0, 0);
            e.beginPath();
            e.strokeStyle = this._color(d.color, this.m_alpha);
            e.fillStyle = this._color(d.color, this.m_fillAlpha);
            e.arc(g, k, b * f, 0, 2 * Math.PI, !0);
            e.moveTo(g, k);
            e.lineTo((a.x + c.x * b) * f, (a.y + c.y * b) * f);
            e.closePath();
            e.fill();
            e.stroke()
        }
    };
    c.prototype.DrawSegment = function(a, b, c) {
        var d = this.m_ctx,
            e = this.m_drawScale;
        d.strokeStyle = this._color(c.color, this.m_alpha);
        d.beginPath();
        d.moveTo(a.x * e, a.y * e);
        d.lineTo(b.x * e, b.y * e);
        d.closePath();
        d.stroke()
    };
    c.prototype.DrawTransform = function(a) {
        var b = this.m_ctx,
            c = this.m_drawScale;
        b.beginPath();
        b.strokeStyle = this._color(16711680, this.m_alpha);
        b.moveTo(a.position.x * c, a.position.y * c);
        b.lineTo((a.position.x + this.m_xformScale * a.R.col1.x) * c, (a.position.y + this.m_xformScale * a.R.col1.y) * c);
        b.strokeStyle = this._color(65280, this.m_alpha);
        b.moveTo(a.position.x * c, a.position.y * c);
        b.lineTo((a.position.x + this.m_xformScale * a.R.col2.x) * c, (a.position.y + this.m_xformScale * a.R.col2.y) * c);
        b.closePath();
        b.stroke()
    }
})();
var i;
for (i = 0; i < Box2D.postDefs.length; ++i) Box2D.postDefs[i]();
delete Box2D.postDefs;

function isArrayContains(c, a) {
        return -1 < c.indexOf(a)
    }
    (function(c, a) {
        function b() {
            function b() {
                var c;
                c = a("amd");
                c.fork = b;
                return c
            }
            return b()
        }

        function h() {
            function b() {
                var e, f = [],
                    g = {};
                e = a("global");
                e.fork = b;
                e.noConflict = function() {
                    var a, b;
                    b = Array.prototype.slice.apply(arguments);
                    for (a = 0; a < f.length; a += 1) "undefined" === typeof g[f[a]] ? delete c[f[a]] : c[f[a]] = g[f[a]];
                    g = {};
                    for (a = 0; a < b.length; a += 1) {
                        if ("string" !== typeof b[a]) throw Error("Cannot replace namespaces. All new namespaces must be strings.");
                        g[b[a]] = c[b[a]];
                        c[b[a]] = e
                    }
                    return f = b
                };
                return e
            }
            b().noConflict("y319",
                "k")
        }[].indexOf || (Array.prototype.indexOf = function(a, b, c) {
            c = this.length;
            for (b = (c + ~~b) % c; b < c && (!(b in this) || this[b] !== a); b++);
            return b ^ c ? b : -1
        });
        "function" === typeof define && define.amd ? define(b) : h()
    })(this, function(c) {
        function a() {
            window.addEventListener ? (document.addEventListener("keydown", h, !1), document.addEventListener("keyup", d, !1), window.addEventListener("blur", b, !1), window.addEventListener("webkitfullscreenchange", b, !1), window.addEventListener("mozfullscreenchange", b, !1)) : window.attachEvent &&
                (document.attachEvent("onkeydown", h), document.attachEvent("onkeyup", d), window.attachEvent("onblur", b))
        }

        function b(a) {
            K = [];
            g();
            k(a)
        }

        function h(a) {
            var b, c;
            b = e(a.keyCode);
            if (!(1 > b.length)) {
                for (c = 0; c < b.length; c += 1) y(b[c]);
                for (b = 0; b < D.length; b += 1)
                    if (c = u(D[b][0]), -1 === O.indexOf(D[b]) && q(c))
                        for (O.push(D[b]), c = 0; c < D[b][1].length; c += 1) y(D[b][1][c]);
                var d, f, g, h, k, m, n = [];
                c = [].concat(K);
                for (b = 0; b < F.length; b += 1) d = w(F[b].keyCombo).length, n[d] || (n[d] = []), n[d].push(F[b]);
                for (d = n.length - 1; 0 <= d; d -= 1)
                    if (n[d])
                        for (b =
                            0; b < n[d].length; b += 1) {
                            f = n[d][b];
                            g = w(f.keyCombo);
                            m = !0;
                            for (k = 0; k < g.length; k += 1)
                                if (-1 === c.indexOf(g[k])) {
                                    m = !1;
                                    break
                                }
                            if (m && q(f.keyCombo)) {
                                I.push(f);
                                for (k = 0; k < g.length; k += 1) m = c.indexOf(g[k]), -1 < m && (c.splice(m, 1), k -= 1);
                                for (g = 0; g < f.keyDownCallback.length; g += 1) !1 === f.keyDownCallback[g](a, x(), f.keyCombo) && (h = !0);
                                !0 === h && (a.preventDefault(), a.stopPropagation())
                            }
                        }
            }
        }

        function d(a) {
            var b, c;
            b = e(a.keyCode);
            if (!(1 > b.length)) {
                for (c = 0; c < b.length; c += 1) n(b[c]);
                g();
                k(a)
            }
        }

        function e(a) {
            return G[a] || []
        }

        function f(a) {
            for (var b in G)
                if (G.hasOwnProperty(b) &&
                    -1 < G[b].indexOf(a)) return b;
            return !1
        }

        function g() {
            var a, b;
            for (a = 0; a < O.length; a += 1)
                if (b = u(O[a][0]), !1 === q(b)) {
                    for (b = 0; b < O[a][1].length; b += 1) n(O[a][1][b]);
                    O.splice(a, 1);
                    a -= 1
                }
        }

        function k(a) {
            var b, c, d, e;
            for (b = 0; b < I.length; b += 1)
                if (d = I[b], !1 === q(d.keyCombo)) {
                    for (c = 0; c < d.keyUpCallback.length; c += 1) !1 === d.keyUpCallback[c](a, x(), d.keyCombo) && (e = !0);
                    !0 === e && (a.preventDefault(), a.stopPropagation());
                    I.splice(b, 1);
                    b -= 1
                }
        }

        function m(a, b) {
            var c, d, e;
            a = u(a);
            b = u(b);
            if (a.length !== b.length) return !1;
            for (c = 0; c < a.length; c +=
                1) {
                if (a[c].length !== b[c].length) return !1;
                for (d = 0; d < a[c].length; d += 1) {
                    if (a[c][d].length !== b[c][d].length) return !1;
                    for (e = 0; e < a[c][d].length; e += 1)
                        if (-1 === b[c][d].indexOf(a[c][d][e])) return !1
                }
            }
            return !0
        }

        function q(a) {
            var b, c, d, e, f = 0,
                g, h;
            a = u(a);
            for (b = 0; b < a.length; b += 1) {
                h = !0;
                for (c = f = 0; c < a[b].length; c += 1) {
                    d = [].concat(a[b][c]);
                    for (e = f; e < K.length; e += 1) g = d.indexOf(K[e]), -1 < g && (d.splice(g, 1), f = e);
                    if (0 !== d.length) {
                        h = !1;
                        break
                    }
                }
                if (h) return !0
            }
            return !1
        }

        function w(a) {
            var b, c, d = [];
            a = u(a);
            for (b = 0; b < a.length; b += 1)
                for (c =
                    0; c < a[b].length; c += 1) d = d.concat(a[b][c]);
            return d
        }

        function u(a) {
            var b = 0,
                c = 0,
                d = !1,
                e = !1,
                f = [],
                g = [],
                h = [],
                k = "";
            if ("object" === typeof a && "function" === typeof a.push) return a;
            if ("string" !== typeof a) throw Error('Cannot parse "keyCombo" because its type is "' + typeof a + '". It must be a "string".');
            for (;
                " " === a.charAt(b);) b += 1;
            for (;;) {
                if (" " === a.charAt(b)) {
                    for (;
                        " " === a.charAt(b);) b += 1;
                    d = !0
                } else if ("," === a.charAt(b)) {
                    if (c || e) throw Error("Failed to parse key combo. Unexpected , at character index " + b + ".");
                    e = !0;
                    b += 1
                } else if ("+" === a.charAt(b)) {
                    k.length && (h.push(k), k = "");
                    if (c || e) throw Error("Failed to parse key combo. Unexpected + at character index " + b + ".");
                    c = !0;
                    b += 1
                } else if (">" === a.charAt(b)) {
                    k.length && (h.push(k), k = "");
                    h.length && (g.push(h), h = []);
                    if (c || e) throw Error("Failed to parse key combo. Unexpected > at character index " + b + ".");
                    c = !0;
                    b += 1
                } else if (b < a.length - 1 && "!" === a.charAt(b) && (">" === a.charAt(b + 1) || "," === a.charAt(b + 1) || "+" === a.charAt(b + 1))) k += a.charAt(b + 1), e = d = c = !1, b += 2;
                else if (b < a.length && "+" !== a.charAt(b) &&
                    ">" !== a.charAt(b) && "," !== a.charAt(b) && " " !== a.charAt(b)) {
                    if (!1 === c && !0 === d || !0 === e) k.length && (h.push(k), k = ""), h.length && (g.push(h), h = []), g.length && (f.push(g), g = []);
                    for (e = d = c = !1; b < a.length && "+" !== a.charAt(b) && ">" !== a.charAt(b) && "," !== a.charAt(b) && " " !== a.charAt(b);) k += a.charAt(b), b += 1
                } else {
                    b += 1;
                    continue
                }
                if (b >= a.length) {
                    k.length && h.push(k);
                    h.length && g.push(h);
                    g.length && f.push(g);
                    break
                }
            }
            return f
        }

        function t(a) {
            var b, c, d = [];
            if ("string" === typeof a) return a;
            if ("object" !== typeof a || "function" !== typeof a.push) throw Error("Cannot stringify key combo.");
            for (b = 0; b < a.length; b += 1) {
                d[b] = [];
                for (c = 0; c < a[b].length; c += 1) d[b][c] = a[b][c].join(" + ");
                d[b] = d[b].join(" > ")
            }
            return d.join(" ")
        }

        function x(a) {
            return [].concat(K)
        }

        function y(a) {
            if (a.match(/\s/)) throw Error("Cannot add key name " + a + " to active keys because it contains whitespace."); - 1 < K.indexOf(a) || K.push(a)
        }

        function n(a) {
            var b = f(a);
            "91" === b || "92" === b ? K = [] : K.splice(K.indexOf(a), 1)
        }

        function C(a, b) {
            if ("string" !== typeof a) throw Error("Cannot register new locale. The locale name must be a string.");
            if ("object" !==
                typeof b) throw Error("Cannot register " + a + " locale. The locale map must be an object.");
            if ("object" !== typeof b.map) throw Error("Cannot register " + a + " locale. The locale map is invalid.");
            b.macros || (b.macros = []);
            H[a] = b
        }

        function B(a) {
            if (a) {
                if ("string" !== typeof a) throw Error("Cannot set locale. The locale name must be a string.");
                if (!H[a]) throw Error("Cannot set locale to " + a + " because it does not exist. If you would like to submit a " + a + " locale map for y319 please submit it at https://github.com/RobertWHurst/y319/issues.");
                G = H[a].map;
                D = H[a].macros;
                E = a
            }
            return E
        }
        c = {};
        var H = {},
            E, G, D, K = [],
            F = [],
            I = [],
            O = [],
            L, p;
        p = {
            map: {
                3: ["cancel"],
                8: ["backspace"],
                9: ["tab"],
                12: ["clear"],
                13: ["enter"],
                16: ["shift"],
                17: ["ctrl"],
                18: ["alt", "menu"],
                19: ["pause", "break"],
                20: ["capslock"],
                27: ["escape", "esc"],
                32: ["space", "spacebar"],
                33: ["pageup"],
                34: ["pagedown"],
                35: ["end"],
                36: ["home"],
                37: ["left"],
                38: ["up"],
                39: ["right"],
                40: ["down"],
                41: ["select"],
                42: ["printscreen"],
                43: ["execute"],
                44: ["snapshot"],
                45: ["insert", "ins"],
                46: ["delete", "del"],
                47: ["help"],
                91: "command windows win super leftcommand leftwindows leftwin leftsuper".split(" "),
                92: "command windows win super rightcommand rightwindows rightwin rightsuper".split(" "),
                145: ["scrolllock", "scroll"],
                186: ["semicolon", ";"],
                187: ["equal", "equalsign", "="],
                188: ["comma", ","],
                189: ["dash", "-"],
                190: ["period", "."],
                191: ["slash", "forwardslash", "/"],
                192: ["graveaccent", "`"],
                219: ["openbracket", "["],
                220: ["backslash", "\\"],
                221: ["closebracket", "]"],
                222: ["apostrophe", "'"],
                48: ["zero", "0"],
                49: ["one", "1"],
                50: ["two", "2"],
                51: ["three", "3"],
                52: ["four", "4"],
                53: ["five", "5"],
                54: ["six", "6"],
                55: ["seven", "7"],
                56: ["eight", "8"],
                57: ["nine", "9"],
                96: ["numzero", "num0"],
                97: ["numone", "num1"],
                98: ["numtwo", "num2"],
                99: ["numthree", "num3"],
                100: ["numfour", "num4"],
                101: ["numfive", "num5"],
                102: ["numsix", "num6"],
                103: ["numseven", "num7"],
                104: ["numeight", "num8"],
                105: ["numnine", "num9"],
                106: ["nummultiply", "num*"],
                107: ["numadd", "num+"],
                108: ["numenter"],
                109: ["numsubtract", "num-"],
                110: ["numdecimal", "num."],
                111: ["numdevide", "num/"],
                144: ["numlock", "num"],
                112: ["f1"],
                113: ["f2"],
                114: ["f3"],
                115: ["f4"],
                116: ["f5"],
                117: ["f6"],
                118: ["f7"],
                119: ["f8"],
                120: ["f9"],
                121: ["f10"],
                122: ["f11"],
                123: ["f12"]
            },
            macros: [
                ["shift + `", ["tilde", "~"]],
                ["shift + 1", ["exclamation", "exclamationpoint", "!"]],
                ["shift + 2", ["at", "@"]],
                ["shift + 3", ["number", "#"]],
                ["shift + 4", ["dollar", "dollars", "dollarsign", "$"]],
                ["shift + 5", ["percent", "%"]],
                ["shift + 6", ["caret", "^"]],
                ["shift + 7", ["ampersand", "and", "&"]],
                ["shift + 8", ["asterisk", "*"]],
                ["shift + 9", ["openparen", "("]],
                ["shift + 0", ["closeparen", ")"]],
                ["shift + -", ["underscore", "_"]],
                ["shift + =", ["plus", "+"]],
                ["shift + (", ["opencurlybrace", "opencurlybracket", "{"]],
                ["shift + )", ["closecurlybrace", "closecurlybracket", "}"]],
                ["shift + \\", ["verticalbar", "|"]],
                ["shift + ;", ["colon", ":"]],
                ["shift + '", ["quotationmark", '"']],
                ["shift + !,", ["openanglebracket", "<"]],
                ["shift + .", ["closeanglebracket", ">"]],
                ["shift + /", ["questionmark", "?"]]
            ]
        };
        for (L = 65; 90 >= L; L += 1) p.map[L] = String.fromCharCode(L + 32), p.macros.push(["shift + " + String.fromCharCode(L + 32) + ", capslock + " + String.fromCharCode(L + 32), [String.fromCharCode(L)]]);
        C("us", p);
        B("us");
        a();
        c.enable = a;
        c.disable = function() {
            b();
            window.removeEventListener ? (document.removeEventListener("keydown", h, !1), document.removeEventListener("keyup", d, !1), window.removeEventListener("blur", b, !1), window.removeEventListener("webkitfullscreenchange", b, !1), window.removeEventListener("mozfullscreenchange", b, !1)) : window.detachEvent && (document.detachEvent("onkeydown", h), document.detachEvent("onkeyup", d), window.detachEvent("onblur", b))
        };
        c.activeKeys = x;
        c.isPressed = function(a) {
            return -1 < K.indexOf(a)
        };
        c.on = function(a, b, c) {
            var d = {},
                e, f = [],
                g, h;
            "string" === typeof a && (a = u(a));
            for (g = 0; g < a.length; g += 1) {
                e = {};
                h = t([a[g]]);
                if ("string" !== typeof h) throw Error("Failed to bind key combo. The key combo must be string.");
                e.keyCombo = h;
                e.keyDownCallback = [];
                e.keyUpCallback = [];
                b && e.keyDownCallback.push(b);
                c && e.keyUpCallback.push(c);
                F.push(e);
                f.push(e)
            }
            d.clear = function() {
                var a;
                for (a = 0; a < f.length; a += 1) F.splice(F.indexOf(f[a]), 1)
            };
            d.on = function(a) {
                var b = {},
                    c, d, e;
                if ("string" !== typeof a) throw Error("Cannot bind callback. The event name must be a string.");
                if ("keyup" !== a && "keydown" !== a) throw Error('Cannot bind callback. The event name must be a "keyup" or "keydown".');
                c = Array.prototype.slice.apply(arguments, [1]);
                for (d = 0; d < c.length; d += 1)
                    if ("function" === typeof c[d])
                        if ("keyup" === a)
                            for (e = 0; e < f.length; e += 1) f[e].keyUpCallback.push(c[d]);
                        else if ("keydown" === a)
                    for (e = 0; e < f.length; e += 1) f[e].keyDownCallback.push(c[d]);
                b.clear = function() {
                    var b, d;
                    for (b = 0; b < c.length; b += 1)
                        if ("function" === typeof c[b])
                            if ("keyup" === a)
                                for (d = 0; d < f.length; d += 1) f[d].keyUpCallback.splice(f[d].keyUpCallback.indexOf(c[b]),
                                    1);
                            else
                                for (d = 0; d < f.length; d += 1) f[d].keyDownCallback.splice(f[d].keyDownCallback.indexOf(c[b]), 1)
                };
                return b
            };
            return d
        };
        c.clear = function(a) {
            var b, c;
            for (b = 0; b < F.length; b += 1) c = F[b], m(a, c.keyCombo) && (F.splice(b, 1), b -= 1)
        };
        c.clear.key = function(a) {
            var b, c, d;
            if (a)
                for (b = 0; b < F.length; b += 1)
                    for (d = F[b], c = 0; c < d.keyCombo.length; c += 1) {
                        if (-1 < d.keyCombo[c].indexOf(a)) {
                            F.splice(b, 1);
                            b -= 1;
                            break
                        }
                    } else F = []
        };
        c.locale = B;
        c.locale.register = C;
        c.macro = function(a, b) {
            if ("string" !== typeof a && ("object" !== typeof a || "function" !==
                    typeof a.push)) throw Error("Cannot create macro. The combo must be a string or array.");
            if ("object" !== typeof b || "function" !== typeof b.push) throw Error("Cannot create macro. The injectedKeys must be an array.");
            D.push([a, b])
        };
        c.macro.remove = function(a) {
            var b;
            if ("string" !== typeof a && ("object" !== typeof a || "function" !== typeof a.push)) throw Error("Cannot remove macro. The combo must be a string or array.");
            for (mI = 0; mI < D.length; mI += 1)
                if (b = D[mI], m(a, b[0])) {
                    n(b[1]);
                    D.splice(mI, 1);
                    break
                }
        };
        c.key = {};
        c.key.name =
            e;
        c.key.code = f;
        c.combo = {};
        c.combo.active = q;
        c.combo.parse = u;
        c.combo.stringify = t;
        return c
    });
var y43 = [
        [
            [y280, 160, 176, 0.13]
        ],
        [
            [y280, 238, 86, 0.75],
            [y73, 76, 214, 0.29]
        ],
        [
            [y280, 261, 185, 0.38],
            [y73, 133, 45, 0.35],
            [y73, 53, 229, 0.17]
        ],
        [
            [y280, 273, 78, 0.25],
            [y73, 264, 308, 0.35],
            [y280, 48, 312, 0.21],
            [y73, 49, 79, 0.25]
        ],
        [
            [y280, 245, 306, 0.38],
            [y73, 251, 64, 0.41],
            [y117, 172, 132, 0.3],
            [y280, 41, 313, 0.09]
        ],
        [
            [y73, 291, 37, 0.07],
            [y73, 252, 183, 0.35],
            [y280, 32, 184, 0.09],
            [y73, 284, 324, 0.07]
        ],
        [
            [y73, 198, 46, 0.29],
            [y280, 48, 90, 0.5],
            [y280, 251, 305, 0.4],
            [y117, 143, 190, 0.6],
            [y73, 37, 312, 0.12],
            [y73, 285, 133, 0.12]
        ],
        [
            [y280, 158, 186, 0.71],
            [y73, 37, 312,
                0.12
            ],
            [y73, 257, 80, 0.12],
            [y73, 291, 328, 0.1],
            [y73, 28, 45, 0.13]
        ],
        [
            [y280, 158, 66, 0.33],
            [y264, 155, 282, 0.75]
        ],
        [
            [y73, 101, 147, 0.96],
            [y280, 42, 314, 0.09],
            [y280, 264, 314, 0.34],
            [y280, 277, 42, 0.09]
        ],
        [
            [y280, 196, 46, 0.22],
            [y264, 46, 154, 0.33],
            [y264, 282, 241, 0.33],
            [y280, 113, 312, 0.22]
        ],
        [
            [y280, 44, 32, 0.03],
            [y280, 131, 161, 0.03],
            [y280, 287, 327, 0.03],
            [y264, 56, 296, 0.45],
            [y280, 295, 32, 0.03],
            [y280, 287, 176, 0.03]
        ],
        [
            [y280, 89, 321, 0.11],
            [y264, 260, 293, 0.25],
            [y280, 37, 133, 0.22],
            [y117, 183, 171, 0.3],
            [y73, 270, 52, 0.11]
        ],
        [
            [y280, 160, 306, 0.22],
            [y188,
                173, 72, 0.3
            ]
        ],
        [
            [y280, 283, 110, 0.22],
            [y188, 57, 308, 0.19],
            [y188, 57, 51, 0.01],
            [y280, 277, 315, 0.03],
            [y117, 191, 217, 0.3]
        ],
        [
            [y280, 153, 315, 0.22],
            [y188, 160, 63, 0.54],
            [y73, 81, 75, 0.02],
            [y73, 237, 83, 0.02]
        ],
        [
            [y280, 257, 32, 0.02],
            [y188, 262, 280, 0.25],
            [y280, 166, 180, 0.22],
            [y264, 62, 304, 0.32]
        ],
        [
            [y280, 166, 212, 0.22],
            [y280, 140, 161, 0.22],
            [y280, 192, 161, 0.22],
            [y264, 54, 319, 0.18],
            [y73, 265, 309, 0.5],
            [y117, 162, 44, 0.3]
        ],
        [
            [y280, 166, 180, 0.83],
            [y188, 211, 53, 0.2],
            [y188, 264, 318, 0.16],
            [y188, 42, 312, 0.03],
            [y188, 37, 77, 0.14]
        ],
        [
            [y280, 234, 119, 0.25],
            [y38, 96, 269, 0.45]
        ],
        [
            [y280, 47, 68, 0.25],
            [y38, 266, 183, 0.45],
            [y280, 181, 316, 0.14],
            [y73, 272, 56, 0.35],
            [y38, 42, 274, 0.03]
        ],
        [
            [y280, 154, 288, 0.18],
            [y280, 154, 338, 0.05],
            [y73, 155, 148, 0.35],
            [y38, 155, 81, 0.18],
            [y280, 154, 227, 0.31],
            [y73, 151, 24, 0.04]
        ],
        [
            [y280, 282, 291, 0.18],
            [y73, 238, 96, 0.35],
            [y280, 44, 294, 0.14],
            [y73, 151, 42, 0.21],
            [y117, 158, 296, 0.75],
            [y264, 82, 106, 0.3]
        ],
        [
            [y280, 267, 74, 0.18],
            [y280, 53, 144, 0.14],
            [y117, 175, 195, 0.38],
            [y264, 50, 313, 0.3],
            [y188, 265, 309, 0.23],
            [y117, 133, 50, 0.38]
        ],
        [
            [y280, 249, 243, 0.29],
            [y280, 48, 107, 0.36],
            [y73, 236, 58, 0.35],
            [y73, 59, 313, 0.35],
            [y73, 148, 181, 0.13]
        ],
        [
            [y280, 67, 69, 0.29],
            [y280, 58, 302, 0.36],
            [y264, 254, 199, 0.5],
            [y117, 259, 47, 0.3]
        ],
        [
            [y280, 242, 185, 0.71],
            [y73, 37, 67, 0.35],
            [y73, 255, 60, 0.35],
            [y73, 54, 314, 0.35],
            [y73, 100, 190, 0.03],
            [y38, 221, 324, 0.25]
        ],
        [
            [y280, 36, 321, 0.07],
            [y38, 160, 278, 0.37],
            [y280, 261, 329, 0.07],
            [y280, 274, 178, 0.07],
            [y280, 43, 178, 0.07],
            [y38, 153, 108, 0.34],
            [y280, 274, 57, 0.07]
        ],
        [
            [y280, 46, 318, 0.36],
            [y73, 267, 134, 0.35],
            [y73, 282, 308, 0.35],
            [y117, 192, 55, 0.3],
            [y117, 160, 241, 0.72],
            [y117, 42, 190, 0.3]
        ],
        [
            [y280,
                270, 298, 0.36
            ],
            [y188, 56, 61, 0.23],
            [y280, 65, 302, 0.36],
            [y73, 164, 64, 0.31],
            [y117, 157, 176, 0.57],
            [y264, 262, 70, 0.36],
            [y280, 167, 304, 0.36]
        ]
    ],
    y51 = [{
        src: "bgassets.jpg",
        id: "bgspritesheet"
    }, {
        src: "expandassets.png",
        id: "zoespritesheet"
    }, {
        src: "interfaceassets.png",
        id: "interfacespritesheet"
    }],
    y201 = {
        framerate: 30,
        images: ["expandassets.png"],
        frames: [
            [127, 312, 35, 35, 0, 17, 16],
            [985, 2, 35, 35, 0, 17, 16],
            [955, 312, 27, 22, 0, 11, 13],
            [709, 312, 26, 24, 0, 11, 13],
            [826, 312, 27, 23, 0, 11, 13],
            [801, 312, 25, 23, 0, 11, 13],
            [927, 312, 28, 23, 0, 12, 14],
            [618,
                312, 28, 24, 0, 12, 13
            ],
            [590, 312, 28, 24, 0, 12, 14],
            [684, 312, 25, 24, 0, 10, 13],
            [773, 312, 28, 23, 0, 12, 13],
            [237, 312, 27, 25, 0, 11, 13],
            [447, 312, 36, 24, 0, 16, 13],
            [555, 312, 35, 24, 0, 16, 13],
            [520, 312, 35, 24, 0, 15, 13],
            [483, 312, 37, 24, 0, 17, 13],
            [199, 312, 38, 25, 0, 17, 14],
            [410, 312, 37, 24, 0, 16, 13],
            [264, 312, 36, 25, 0, 16, 14],
            [336, 312, 36, 24, 0, 16, 13],
            [372, 312, 38, 24, 0, 17, 13],
            [162, 312, 37, 25, 0, 16, 13],
            [853, 312, 37, 23, 0, 16, 13],
            [300, 312, 36, 24, 0, 16, 13],
            [890, 312, 37, 23, 0, 16, 13],
            [735, 312, 38, 23, 0, 17, 13],
            [646, 312, 38, 24, 0, 17, 14],
            [946, 2, 39, 36, 0, 20, 15],
            [905,
                2, 41, 36, 0, 20, 15
            ],
            [551, 2, 177, 168, 0, 87, 82],
            [188, 2, 177, 171, 0, 87, 85],
            [2, 2, 186, 174, 0, 92, 88],
            [728, 2, 177, 164, 0, 87, 78],
            [365, 2, 186, 170, 0, 92, 84],
            [382, 176, 132, 135, 0, 64, 65],
            [250, 176, 132, 135, 0, 64, 65],
            [2, 312, 125, 125, 0, 60, 60],
            [764, 176, 125, 126, 0, 60, 60],
            [889, 176, 125, 125, 0, 61, 62],
            [126, 176, 124, 136, 0, 60, 63],
            [2, 176, 124, 136, 0, 60, 63],
            [639, 176, 125, 130, 0, 61, 63],
            [514, 176, 125, 130, 0, 61, 63]
        ],
        animations: {
            numb17: {
                speed: 1,
                frames: [19]
            },
            numb12: {
                speed: 1,
                frames: [14]
            },
            numb8: {
                speed: 1,
                frames: [10]
            },
            heroinfected: {
                speed: 1,
                frames: [32, 32, 33,
                    33, 33, 33, 33
                ]
            },
            numb2: {
                speed: 1,
                frames: [4]
            },
            numb22: {
                speed: 1,
                frames: [24]
            },
            sickv: {
                speed: 1,
                frames: [41, 42, 42, 42, 42]
            },
            particle2v: {
                speed: 1,
                frames: [1]
            },
            numb23: {
                speed: 1,
                frames: [25]
            },
            numb13: {
                speed: 1,
                frames: [15]
            },
            numb19: {
                speed: 1,
                frames: [21]
            },
            numb15: {
                speed: 1,
                frames: [17]
            },
            homyakv: {
                speed: 1,
                frames: [39, 40, 40]
            },
            hero1v: {
                speed: 1,
                frames: [29, 30, 31, 31]
            },
            cloud1v: {
                speed: 1,
                frames: [27]
            },
            stonev: {
                speed: 1,
                frames: [38]
            },
            numb7: {
                speed: 1,
                frames: [9]
            },
            enemy1v: {
                speed: 1,
                frames: [34, 35, 35]
            },
            numb1: {
                speed: 1,
                frames: [3]
            },
            cloud2v: {
                speed: 1,
                frames: [28]
            },
            numb6: {
                speed: 1,
                frames: [8]
            },
            numb24: {
                speed: 1,
                frames: [26]
            },
            numb16: {
                speed: 1,
                frames: [18]
            },
            numb10: {
                speed: 1,
                frames: [12]
            },
            numb4: {
                speed: 1,
                frames: [6]
            },
            enemysimple: {
                speed: 1,
                frames: [36, 37, 37]
            },
            numb5: {
                speed: 1,
                frames: [7]
            },
            numb0: {
                speed: 1,
                frames: [2]
            },
            numb21: {
                speed: 1,
                frames: [23]
            },
            numb3: {
                speed: 1,
                frames: [5]
            },
            numb18: {
                speed: 1,
                frames: [20]
            },
            numb11: {
                speed: 1,
                frames: [13]
            },
            numb20: {
                speed: 1,
                frames: [22]
            },
            numb9: {
                speed: 1,
                frames: [11]
            },
            numb14: {
                speed: 1,
                frames: [16]
            },
            particle1v: {
                speed: 1,
                frames: [0]
            }
        }
    },
    interfaceCFG = {
        framerate: 24,
        images: ["interfaceassets.png"],
        frames: [
            [322, 2, 319, 303, 0, -3, -24],
            [641, 2, 326, 236, 0, 170, 147],
            [403, 322, 110, 114, 0, 54, 53],
            [513, 322, 110, 114, 0, 54, 53],
            [737, 717, 210, 42, 0, 97, 16],
            [377, 577, 65, 68, 0, 31, 30],
            [442, 577, 64, 68, 0, 30, 30],
            [506, 577, 64, 68, 0, 30, 30],
            [793, 651, 113, 44, 0, 51, 18],
            [869, 487, 72, 75, 0, 35, 34],
            [795, 487, 74, 78, 0, 36, 35],
            [721, 487, 74, 79, 0, 36, 36],
            [646, 487, 75, 79, 0, 36, 36],
            [167, 322, 110, 134, 0, 53, 82],
            [274, 651, 60, 64, 0, 29, 28],
            [967, 2, 47, 48, 0, 22, 22],
            [623, 322, 203, 107, 0, 101, 22],
            [906, 651, 36, 40, 0, 0, 0],
            [281, 717, 182, 53, 0, 89, 22],
            [367, 812, 242, 37, 0, 119, 15],
            [2, 651, 272, 66, 0, 134, 37],
            [927, 322, 81, 86, 0, 39, 39],
            [281, 487, 81, 86, 0, 39, 39],
            [2, 577, 64, 74, 0, 30, 36],
            [941, 487, 64, 74, 0, 30, 36],
            [66, 577, 64, 74, 0, 30, 36],
            [2, 2, 320, 320, 0, 153, 149],
            [196, 487, 85, 89, 0, 41, 40],
            [826, 322, 101, 100, 0, 49, 51],
            [223, 771, 264, 40, 0, 131, 16],
            [2, 322, 165, 165, 0, 80, 80],
            [2, 771, 221, 41, 0, 110, 17],
            [665, 850, 107, 31, 0, 56, 14],
            [2, 887, 129, 29, 0, 62, 13],
            [802, 812, 154, 32, 0, 75, 15],
            [131, 887, 116, 29, 0, 56, 13],
            [310, 850, 86, 36, 0, 41, 13],
            [609, 812, 193, 37, 0, 94, 13],
            [487, 771, 243, 40, 0, 120, 15],
            [772, 850, 190, 31, 0, 93, 15],
            [2, 812, 156, 38,
                0, 76, 15
            ],
            [2, 850, 308, 37, 0, 153, 14],
            [730, 771, 230, 39, 0, 113, 16],
            [334, 651, 278, 62, 0, 136, 16],
            [362, 487, 284, 81, 0, 141, 40],
            [2, 717, 279, 54, 0, 137, 14],
            [396, 850, 269, 35, 0, 132, 15],
            [570, 577, 307, 68, 0, 150, 33],
            [158, 812, 209, 38, 0, 105, 19],
            [277, 322, 126, 125, 0, 60, 60],
            [463, 717, 274, 47, 0, 137, 20],
            [2, 487, 194, 90, 0, 94, 7],
            [877, 577, 136, 44, 0, 68, 20],
            [130, 577, 247, 73, 0, 119, -4],
            [392, 887, 171, 28, 0, 90, 14],
            [247, 887, 145, 29, 0, 59, 16],
            [942, 651, 77, 35, 0, 63, 14],
            [612, 651, 181, 59, 0, 83, 26],
            [983, 771, 21, 29, 0, 0, -10],
            [981, 812, 23, 29, 0, 0, -10],
            [962, 850, 23, 29, 0, -1, -10],
            [993, 717, 26, 30, 0, 0, -7],
            [960, 771, 23, 30, 0, 0, -10],
            [1005, 487, 21, 30, 0, 0, -10],
            [956, 812, 25, 29, 0, 0, -9],
            [970, 717, 23, 31, 0, 0, -10],
            [1004, 771, 22, 28, 0, 0, -10],
            [947, 717, 23, 31, 0, 0, -7]
        ],
        animations: {
            0: {
                frames: [66],
                speed: 1
            },
            1: {
                frames: [58],
                speed: 1
            },
            2: {
                frames: [59],
                speed: 1
            },
            3: {
                frames: [60],
                speed: 1
            },
            4: {
                frames: [61],
                speed: 1
            },
            6: {
                frames: [67],
                speed: 1
            },
            7: {
                frames: [63],
                speed: 1
            },
            8: {
                frames: [64],
                speed: 1
            },
            9: {
                frames: [65],
                speed: 1
            },
            5: {
                frames: [62, 62],
                speed: 1
            },
            downplaybtn: {
                frames: [3],
                speed: 1
            },
            levelinstruction3: {
                frames: [44],
                speed: 1
            },
            achievdesc8: {
                frames: [40],
                speed: 1
            },
            achievclosed: {
                frames: [32],
                speed: 1
            },
            nextlevels: {
                frames: [21],
                speed: 1
            },
            creditstext: {
                frames: [53],
                speed: 1
            },
            pausebtn: {
                frames: [15],
                speed: 1
            },
            creditstitle: {
                frames: [52],
                speed: 1
            },
            lvlLabelStar3: {
                frames: [25],
                speed: 1
            },
            lvlcompletebgnew: {
                frames: [26],
                speed: 1
            },
            achievbtn: {
                frames: [13],
                speed: 1
            },
            bigbgwindow: {
                frames: [0],
                speed: 1
            },
            allcollectedstars: {
                frames: [51],
                speed: 1
            },
            biglimetxt: {
                frames: [55],
                speed: 1
            },
            achievdesc1: {
                frames: [34],
                speed: 1
            },
            musiconbtn: {
                frames: [10],
                speed: 1
            },
            achievedtitle: {
                frames: [29],
                speed: 1
            },
            completestar: {
                frames: [28, 28],
                speed: 1
            },
            playbtnup: {
                frames: [2],
                speed: 1
            },
            growCircle: {
                frames: [49],
                speed: 1
            },
            levelinstruction2: {
                frames: [43],
                speed: 1
            },
            achievdesc2: {
                frames: [35],
                speed: 1
            },
            notcollidegrow: {
                frames: [20],
                speed: 1
            },
            inspiredby: {
                frames: [54],
                speed: 1
            },
            levelselecttitle: {
                frames: [4],
                speed: 1
            },
            achievdesc0: {
                frames: [33],
                speed: 1
            },
            backbtn: {
                frames: [5],
                speed: 1
            },
            achievdesc4: {
                frames: [37],
                speed: 1
            },
            lostallfishes: {
                frames: [19],
                speed: 1
            },
            lvlLabelStar0: {
                frames: [6],
                speed: 1
            },
            tryagaintitle: {
                frames: [18],
                speed: 1
            },
            achievdesc6: {
                frames: [39],
                speed: 1
            },
            readytitle: {
                frames: [16],
                speed: 1
            },
            achievdesc7: {
                frames: [41],
                speed: 1
            },
            achievmenutitle: {
                frames: [31],
                speed: 1
            },
            lvlLabelStar2: {
                frames: [24],
                speed: 1
            },
            y62v: {
                frames: [30],
                speed: 1
            },
            musicoffbtn: {
                frames: [11],
                speed: 1
            },
            restartbtn: {
                frames: [12],
                speed: 1
            },
            achievdesc3: {
                frames: [36],
                speed: 1
            },
            levelinstruction6: {
                frames: [47],
                speed: 1
            },
            levelinstruction5: {
                frames: [46],
                speed: 1
            },
            tintbg: {
                frames: [17],
                speed: 1
            },
            nextlevelwin: {
                frames: [27],
                speed: 1
            },
            gamecompletedTitle: {
                frames: [50],
                speed: 1
            },
            levelinsruction1: {
                frames: [42],
                speed: 1
            },
            levelreadylabel: {
                frames: [56],
                speed: 1
            },
            logov: {
                frames: [1],
                speed: 1
            },
            levelinstruction4: {
                frames: [45],
                speed: 1
            },
            lvlLabelStar1: {
                frames: [23],
                speed: 1
            },
            btnbaseup: {
                frames: [14],
                speed: 1
            },
            levelbuttonlocked: {
                frames: [7],
                speed: 1
            },
            pausetitle: {
                frames: [8],
                speed: 1
            },
            quitbtn: {
                frames: [9],
                speed: 1
            },
            achievdesc5: {
                frames: [38],
                speed: 1
            },
            levelinstruction8: {
                frames: [48],
                speed: 1
            },
            moreeasybtn: {
                frames: [57],
                speed: 1
            },
            previouslevels: {
                frames: [22],
                speed: 1
            }
        }
    },
    y220 = {
        framerate: 24,
        images: ["bgassets.jpg"],
        frames: [
            [0, 568, 321, 357, 0, 0, 0],
            [321, 568,
                321, 357, 0, 0, 0
            ],
            [426, 0, 321, 357, 0, 0, 0],
            [0, 0, 426, 568, 0, 0, 0],
            [747, 0, 261, 356, 0, 0, 0]
        ],
        animations: {
            aquabg3: {
                frames: [2],
                speed: 1
            },
            bigbg: {
                frames: [3],
                speed: 1
            },
            aquabg1: {
                frames: [0],
                speed: 1
            },
            aquabg2: {
                frames: [1],
                speed: 1
            },
            rotateScreen: {
                frames: [4],
                speed: 1
            }
        }
    },
    y179 = 1,
    y207 = 2,
    y312 = 3,
    y198 = 4,
    y260 = 12;
(function(c) {
    function a(a, b, c) {
        this.initialize(a, b, c)
    }
    var b = a.prototype;
    b.initialize = function(a, b, c) {
        var f = new createjs.Sprite(y131);
        f.snapToPixel = !0;
        f.baseBlock = this;
        this.y1 = f;
        this.reset(a, b, c)
    };
    b.reset = function(a, b, c) {
        this.type = a;
        this.y1.parent != b && y123(this.y1);
        createjs.Tween.removeTweens(this.y1);
        this.parent = b;
        this.y1.alpha = 1;
        this.y1.mouseEnabled = !1;
        this.y29 = this.y28 = this.y27 = 0;
        this.y30 = 0.6;
        this.isNeedDispose = this.isInstruction = this.isNum = !1;
        this.y1.spriteSheet = y131;
        var f = "numb0";
        a == y179 ? f = 0.5 <
            Math.random() ? "particle1v" : "particle2v" : a == y312 ? this.isNum = !0 : a == y207 ? (this.y30 = 0, f = 0.5 < Math.random() ? "cloud1v" : "cloud2v") : a == y198 && (this.isInstruction = !0, this.y1.spriteSheet = interfaceSS);
        this.y1.gotoAndStop(f);
        this.scale = c;
        this.y18();
        b.addChild(this.y1)
    };
    b.setPos = function(a, b) {
        this.y1.x = a;
        this.y1.y = b
    };
    b.y32 = function(a) {
        this.y30 = 0;
        this.y1.rotation = 0;
        this.y1.gotoAndStop("numb" + a)
    };
    b.y33 = function(a) {
        this.y30 = 0;
        this.y1.rotation = 0;
        this.y1.gotoAndStop(a)
    };
    b.tick = function() {
        this.isNeedDispose || (this.y1.x +=
            this.y27, this.y1.y += this.y28, this.y28 += this.y30, this.y1.rotation += this.y29, this.isNum ? this.y1.alpha -= 0.03 : this.isInstruction || (this.y1.alpha -= 0.06, this.y1.scaleX += 0.03, this.y1.scaleY = this.y1.scaleX), 0.05 > this.y1.alpha && (this.isNeedDispose = !0))
    };
    b.y18 = function() {
        this.y1.scaleX = this.y1.scaleY = this.scale
    };
    b.dispose = function() {
        isArrayContains(y78, this) && y78.splice(y78.indexOf(this, 0), 1);
        y109(this);
        this.y1.removeAllEventListeners();
        this.y1.stop();
        y123(this.y1)
    };
    c.y320 = a
})(window);
var y78 = [],
    disposedParts = [];

function y50Explode(c, a, b, h, d) {
    for (var e, f = 0; f < b; f++) {
        var g = f * (2 * Math.PI / b),
            k = Math.cos(g),
            g = Math.sin(g);
        e = 0.5 + 0.5 * Math.random();
        e = y50(h, c, a, e, d ? d : y183);
        e.y27 = (2 + 2 * Math.random()) * k;
        e.y28 = (2 + 2 * Math.random()) * g;
        e.y29 = 20 * Math.random()
    }
}

function y56(c, a, b) {
    c = y50(y312, c, a, 1, y183);
    c.y32(b);
    c.y27 = 0;
    c.y28 = -1;
    c.y29 = 0
}
var y78Lenght = 0;

function y50(c, a, b, h, d) {
    var e;
    y78Lenght = y78.length;
    if (y78Lenght > y260) {
        for (var f = 0; f < y78Lenght; f++)
            if (y78[f].type != y198) {
                e = y78[f];
                break
            }
        e || (e = y78[0]);
        e.reset(c, d, h)
    } else e = y259(c, d, h);
    e.setPos(a, b);
    isArrayContains(y78, e) || y78.push(e);
    return e
}

function y109(c) {
    isArrayContains(disposedParts, c) || disposedParts.push(c)
}

function y259(c, a, b) {
    if (0 < disposedParts.length) {
        var h = disposedParts.pop();
        h.reset(c, a, b);
        return h
    }
    return new y320(c, a, b)
}
var y54 = 0,
    y116 = null,
    disposeNeededParts = [];

function y93() {
    y54 = y78.length;
    for (var c = 0; c < y54; c++) y116 = y78[c], y116.tick(), y116.isNeedDispose && disposeNeededParts.push(y116);
    for (; 0 < disposeNeededParts.length;) disposeNeededParts.pop().dispose()
}
var y314, y71 = 30,
    y277 = 180 / Math.PI,
    y37 = Math.PI / 180,
    y290 = Box2D.Common.Math.y290,
    y106 = Box2D.Collision.y106,
    y75 = Box2D.Dynamics.y75,
    y113 = Box2D.Dynamics.y113,
    y213Def = Box2D.Dynamics.y213Def,
    y213 = Box2D.Dynamics.y213,
    y230 = Box2D.Dynamics.y230,
    y227 = Box2D.Collision.Shapes.y227,
    y271 = Box2D.Collision.Shapes.y271,
    y141 = Box2D.Collision.Shapes.y141,
    y270 = Box2D.Dynamics.y270,
    y107 = Box2D.Dynamics.Joints.y107,
    objA, objB;

function initPhysics() {
    y314 = new y230(new y290(0, 0), !1);
    if (isPhysicsDebugDraw) {
        var c = document.createElement("canvas");
        c.id = "debugCanvas";
        c.width = 1280;
        c.height = 1424;
        c.style.position = "absolute";
        c.style.left = "50%";
        c.style.top = "10%";
        c.style.marginLeft = "-160px";
        c.style.pointerEvents = "none";
        document.body.appendChild(c);
        var a = new y270;
        a.SetSprite(c.getContext("2d"));
        a.SetDrawScale(60);
        a.SetFillAlpha(0.5);
        a.SetLineThickness(1);
        a.SetFlags(y270.e_y3Bit | y270.e_jointBit);
        y314.SetDebugDraw(a)
    }
    y169 = new Box2D.Collision.y230Manifold;
    y63 = new y213Def;
    y184 = new y75;
    c = new Box2D.Dynamics.b2ContactListener;
    c.BeginContact = y67;
    this.y314.SetContactListener(c)
}
var y169, isCollideParticlesNeed = !0;

function y67(c) {
    objA = c.m_fixtureA.m_body.m_userData;
    objB = c.m_fixtureB.m_body.m_userData;
    isCollideParticlesNeed = !0;
    var a;
    objA && objB && (objA.isEnemy && !objB.isEnemy ? (a = objA.type, objA.y21(objB), objB.y22(objA, a), y273()) : !objA.isEnemy && objB.isEnemy && (a = objB.type, objB.y21(objA), objA.y22(objB, a), y273()), isCollideParticlesNeed && (c.GetWorldManifold(y169), c = y169.m_points[0], y50Explode(c.x * y71, c.y * y71, 6, y179)))
}
var y63, y184;

function y174() {
    y63.density = 1;
    y63.friction = 0.5;
    y63.restitution = 0.2;
    y184.type = y113.b2_staticBody;
    y63.y3 = new y271;
    y63.y3.SetAsBox(14, 2);
    y184.position.Set(7, 356 / y71 + 2);
    y314.CreateBody(y184).CreateFixture(y63);
    y184.position.Set(7, -2);
    y314.CreateBody(y184).CreateFixture(y63);
    y63.y3.SetAsBox(2, 8);
    y184.position.Set(-2, 8);
    y314.CreateBody(y184).CreateFixture(y63);
    y184.position.Set(320 / y71 + 2, 8);
    y314.CreateBody(y184).CreateFixture(y63)
}

function y104Shape(c, a, b, h) {
    h == y280 ? (y63.density = 2, y63.friction = 2, y63.restitution = 0.7) : (y63.density = 20, y63.friction = 2, y63.restitution = 1);
    y184.type = y113.b2_dynamicBody;
    y63.y3 = new y141(b);
    y184.position.x = c;
    y184.position.y = a;
    c = y314.CreateBody(y184);
    c.CreateFixture(y63);
    return c
}

function y229(c, a) {
    c && c.GetFixtureList().GetShape().SetRadius(55 * a / y71)
}
var y35 = 3,
    y61 = 6,
    y209 = !1,
    y212 = 40,
    y139 = y212,
    y95 = 0,
    y36 = 1,
    MORE_EASY_MULT = 1;
(function(c) {
    function a(a, b, c, f) {
        this.initialize(a, b, c, f)
    }
    var b = a.prototype;
    b.initialize = function(a, b, c, f) {
        var g = new createjs.Sprite(y131);
        g.baseBlock = this;
        this.y1 = g;
        this.reset(a, b, c, f)
    };
    b.reset = function(a, b, c, f) {
        this.type = a;
        createjs.Tween.removeTweens(this.y1);
        this.name = f ? f : "charik";
        this.parent = b;
        this.y1.isOnTop = !1;
        this.y1.isOnBottom = !0;
        this.isNeedDispose = this.isInflate = !1;
        this.y1.alpha = 1;
        this.y1.mouseEnabled = !1;
        this.y2 = null;
        this.isEnemy = !1;
        this.y3 = null;
        this.isNeutralEnemy = !1;
        this.y5 = this.y4 = 0;
        this.y6 =
            4;
        this.isSick = !1;
        this.y7 = y95;
        this.y8 = 0;
        this.y9 = -1;
        this.isInfected = !1;
        this.y10 = this.y1.rotation = 0;
        this.vel = null;
        this.y11 = c * y212;
        this.y1.cursor = null;
        a == y280 ? isDesktop() && (this.y1.cursor = "pointer", this.y1.mouseEnabled = !0) : a == y73 ? this.isEnemy = !0 : a == y117 ? this.isNeutralEnemy = this.isEnemy = !0 : a == y188 ? this.isEnemy = !0 : a == y264 ? this.isEnemy = !0 : a == y38 && (this.isSick = this.isEnemy = !0);
        this.y12();
        this.setDamageByType();
        this.y18();
        b.addChild(this.y1)
    };
    b.y12 = function() {
        this.type == y280 ? this.isInfected ? this.y1.gotoAndStop("heroinfected") :
            this.y1.gotoAndStop("hero1v") : this.type == y73 ? this.y1.gotoAndStop("enemysimple") : this.type == y117 ? this.y1.gotoAndStop("stonev") : this.type == y188 ? this.y1.gotoAndStop("homyakv") : this.type == y264 ? this.y1.gotoAndStop("enemy1v") : this.type == y38 && this.y1.gotoAndStop("sickv")
    };
    b.setDamageByType = function() {
        this.type == y280 ? this.y6 = 3 * MORE_EASY_MULT : this.type == y73 ? this.y6 = 4 : this.type == y117 ? this.y6 = 0 : this.type == y188 ? this.y6 = 4 : this.type == y264 ? this.y6 = 9 : this.type == y38 && (this.y6 = 4)
    };
    b.setPos = function(a, b) {
        this.y1.x =
            a;
        this.y1.y = b
    };
    b.initPhysics = function() {
        this.y2 && y314.DestroyBody(this.y2);
        var a = y104Shape(this.y1.x / y71, this.y1.y / y71, 55 * this.scale / y71, this);
        a.SetUserData(this);
        a.SetAngle(this.y1.rotation * y37);
        this.y2 = a;
        var b = 2 * Math.random() * y61 - y61;
        0.5 > Math.abs(b) && (b = 0.5);
        a.m_linearVelocity.x = b;
        a.m_linearVelocity.y = 2 * Math.random() * y61 - y61;
        a.m_angularVelocity = Math.random();
        this.y3 = a.GetFixtureList().GetShape()
    };
    b.y14 = function() {
        this.y8--;
        0 == this.y8 && this.y15(y95)
    };
    b.y15 = function(a) {
        this.y12();
        this.isInfected ||
            (this.y7 = a, a != y95 && a == y36 && (this.y1.currentAnimationFrame = 1))
    };
    b.y16 = function() {
        this.isInflate = !1;
        this.y1.currentAnimationFrame = 0
    };
    b.tick = function() {
        if (this.isNeedDispose) this.dispose();
        else if (!isGamePaused) {
            this.y14();
            this.isInflate && (this.isInfected && this.y11 > 0.8 * y212 && (this.isInfected = !1, this.y12()), this.y1.currentAnimationFrame = 2, this.y17(y209 ? 21 / FPS : 15 / FPS));
            this.type == y188 && 0 == y261 % 35 && this.y11 < y139 && this.y17(2);
            if (!this.isEnemy && this.isInfected && 0 == y261 % Math.floor(FPS / 2)) {
                var a = Math.max(1,
                    2 * this.scale);
                this.y17(-a);
                y56(this.y1.x, this.y1.y, Math.round(a))
            }
            this.y2 && (this.y10 = this.y3.m_radius, this.y2.m_xf.position.x < this.y10 ? (this.y2.m_xf.position.x = this.y10, this.y2.m_linearVelocity.x = Math.abs(this.y2.m_linearVelocity.x)) : this.y2.m_xf.position.x > 10.66 - this.y10 && (this.y2.m_xf.position.x = 10.66 - this.y10, this.y2.m_linearVelocity.x = -Math.abs(this.y2.m_linearVelocity.x)), this.y2.m_xf.position.y < this.y10 ? (this.y2.m_xf.position.y = this.y10, this.y2.m_linearVelocity.y = Math.abs(this.y2.m_linearVelocity.y)) :
                this.y2.m_xf.position.y > 11.86 - this.y10 && (this.y2.m_xf.position.y = 11.86 - this.y10, this.y2.m_linearVelocity.y = -Math.abs(this.y2.m_linearVelocity.y)), this.vel = this.y2.m_linearVelocity, this.y4 = Math.abs(this.vel.x) + Math.abs(this.vel.y), this.y4 < y35 ? (this.y5 = y35 / this.y4, this.y2.m_linearVelocity.x = this.vel.x * this.y5, this.y2.m_linearVelocity.y = this.vel.y * this.y5) : this.y4 > y61 && (this.y5 = y61 / this.y4, this.y2.m_linearVelocity.x = this.vel.x * this.y5, this.y2.m_linearVelocity.y = this.vel.y * this.y5), this.y1.x = this.y2.m_xf.position.x *
                y71, this.y1.y = this.y2.m_xf.position.y * y71, this.y1.rotation = this.y2.m_sweep.a * y277, -59 > this.y8 && 0 == this.y8 % 30 && (0.2 > Math.abs(this.vel.x) ? this.y2.m_linearVelocity.x += 160 < this.y1.x ? -0.5 : 0.5 : 0.2 > Math.abs(this.vel.y) && (this.y2.m_linearVelocity.y += 160 < this.y1.y ? -0.5 : 0.5)))
        }
    };
    b.y17 = function(a) {
        this.y11 = this.type == y264 && 5 > this.y11 ? this.y11 + a / 2 : this.y11 + a;
        0 == y46 && 26 < this.y11 && (isLevelCompleted = !0, y285(), this.isInflate = !1);
        this.y11 = Math.min(65, this.y11);
        0 >= this.y11 ? this.isEnemy ? this.y25() : this.isInfected ? this.y24(y38) :
            -1 < this.y9 ? this.y24(this.y9) : this.y24(y73) : (this.y18(), y229(this.y2, this.scale))
    };
    b.y18 = function() {
        this.scale = this.y11 / y212 + 0.25;
        this.y1.scaleX = this.isEnemy ? this.y1.scaleY = this.scale : this.y1.scaleY = 0.714 * this.scale
    };
    b.dispose = function() {
        isArrayContains(y243, this) && y243.splice(y243.indexOf(this, 0), 1);
        this.y9 = -1;
        y233(this);
        this.y1.removeAllEventListeners();
        this.y2 && y234.push(this.y2);
        this.y3 = this.y2 = null;
        this.y1.stop();
        this.parent.removeChild(this.y1)
    };
    b.onMouseDown = function(a) {
        isGamePaused || (a.target.baseBlock.isInflate = !0, a.addEventListener("mouseup", function(a) {
            a.target.baseBlock.onMouseUp(a)
        }))
    };
    b.onMouseUp = function(a) {
        a.target.baseBlock.isInflate = !1
    };
    b.y21 = function(a) {
        a.isInflate && 2 <= y46 || 2 >= a.y11 && 4 >= this.y11 || this.y23(a)
    };
    b.y22 = function(a, b) {
        this.isInflate && 2 <= y46 ? 10 < this.y11 ? (this.y11 = 2, this.isInflate = !1, this.y8 = 0, y248 === this && (y248 = null, stopInflateSound()), this.y17(0), this.y15(y95), y166("bubbleSound")) : this.y24(b) : (this.y9 = b, a.type == y38 && (this.isInfected = !0), this.y23(a), this.isEnemy || a.isNeutralEnemy || y166("collideSound"));
        this.setDamageByType();
        a.setDamageByType()
    };
    b.y23 = function(a) {
        this.isNeutralEnemy || a.isNeutralEnemy || (a = a.y6 * (0.5 * (a.scale / this.scale) + 0.5), this.y8 = 15, this.y15(y36), this.y17(-a), y56(this.y1.x, this.y1.y, Math.round(a)))
    };
    b.y24 = function(a) {
        this.type = a;
        this.isEnemy = !0;
        this.y11 = 2;
        this.isInfected = !1;
        this.y8 = 0;
        this.y1.mouseEnabled = !1;
        a == y117 && (this.isNeutralEnemy = !0, this.y11 = 10);
        y248 === this && (y248 = null, stopInflateSound());
        this.isInflate ? y70() : y173();
        this.isInflate = !1;
        this.y12();
        this.y17(0);
        isCollideParticlesNeed = !1;
        y50Explode(this.y1.x, this.y1.y, 6, y207);
        y166("bubbleSound")
    };
    b.y25 = function() {
        this.type = y280;
        this.isInflate = this.isInfected = this.isNeutralEnemy = this.isEnemy = !1;
        this.y11 = 2;
        this.y8 = 0;
        this.y12();
        this.y17(0);
        isDesktop() && (this.y1.mouseEnabled = !0);
        y248 === this && (y248 = null);
        isCollideParticlesNeed = !1;
        y50Explode(this.y1.x, this.y1.y, 6, y207);
        y166("bubbleSound")
    };
    c.y321 = a
})(window);
var y243 = [],
    disposedChars = [],
    y183, y46 = 0,
    isLevelCompleted = !1,
    isLevelFailed = !1,
    isInflateReason = !1,
    y248, y317 = 0;

function initLevelManager() {
    y183 = new createjs.Container;
    y299.addChild(y183);
    initPhysics();
    y41.addEventListener("y41mousedown", y300);
    y41.addEventListener("y41mouseup", y138)
}

function y104(c, a, b, h, d) {
    d || (d = "ch" + a + "y" + b);
    c = y214(c, y183, h, d);
    c.setPos(a, b);
    0 != y46 && c.initPhysics();
    isArrayContains(y243, c) || y243.push(c);
    return c
}
var y180 = 0,
    y83 = 0;

function y217(c) {
    y46 != c && (y180 = 0, MORE_EASY_MULT = 1);
    y46 = c;
    y185();
    y46 >= y43.length && (y46 %= y43.length);
    24 <= y46 ? (y35 = 5, y61 = 10, y209 = !0) : (y35 = 3, y61 = 6, y209 = !1);
    y217ByCode(y43[y46]);
    isSkipReadyWin || 0 == y46 ? isGamePaused = !1 : y133();
    isLevelRestarted = !1
}
var y306 = [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3];

function y185(c) {
    var a = y306[y46];
    c && (a = 0);
    1 > a ? y318.visible = !1 : (y318.visible = !0, y318.gotoAndStop("aquabg" + a))
}
var y137 = 0;

function y217ByCode(c) {
    isGamePaused = !0;
    disposeLevel();
    stopInflateSound();
    y48();
    if (c)
        for (var a = y137 = 0; a < c.length; a++) {
            var b = c[a],
                b = y104(b[0], b[1], b[2], b[3]);
            b.isEnemy && !b.isNeutralEnemy && y137++
        }
}
var isLevelRestarted = !1;

function y311() {
    isLevelRestarted = !0;
    y180 += 1;
    y83 += 1;
    y217(y46)
}

function y163() {
    y217(y46 + 1)
}

function disposeLevel() {
    disposeInstructions();
    isLevelFailed = isLevelCompleted = isInflateReason = !1;
    y248 = null;
    var c = y243.length,
        a;
    for (a = 0; a < c; a++) y243.pop().dispose()
}

function y233(c) {
    isArrayContains(disposedChars, c) || disposedChars.push(c)
}

function y214(c, a, b, h) {
    if (0 < disposedChars.length) {
        var d = disposedChars.pop();
        d.reset(c, a, b, h);
        return d
    }
    return new y321(c, a, b, h)
}
var y221 = 1E8;

function y300(c) {
    if (!(isGamePaused || isLevelCompleted || isLevelFailed)) {
        var a = (c.y41X - y299.x) / scaleFactor;
        c = (c.y41Y - y299.y) / scaleFactor;
        var b, h = y221,
            d = 0,
            e = d = 0;
        y248 = null;
        for (var f = 0; f < y243.length; f++) b = y243[f], b.isEnemy || (d = b.y1.x - a, e = b.y1.y - c, d = d * d + e * e, d < h && (y248 = b, h = d));
        y248 && !isGamePaused && (y248.isInflate = !0, y94())
    }
}

function y138(c) {
    y248 && y248.y16();
    stopInflateSound()
}

function y70() {
    isDisableWin || isLevelFailed || !isNoHeroes() || (isInflateReason = isLevelFailed = !0, createjs.Tween.get(y183).wait(100).call(y134), stopInflateSound())
}

function y173() {
    isDisableWin || isLevelFailed || !isNoHeroes() || (isLevelFailed = !0, createjs.Tween.get(y183).wait(500).call(y134), stopInflateSound())
}

function isNoHeroes() {
    for (var c = 0; c < y243.length; c++)
        if (!y243[c].isEnemy) return !1;
    return !0
}

function y273() {
    isLevelCompleted || isDisableWin || 0 == y46 || !isNoEnemies() || (isLevelCompleted = !0, y285(), stopInflateSound())
}

function isNoEnemies() {
    for (var c = 0; c < y243.length; c++)
        if (y243[c].isEnemy && !y243[c].isNeutralEnemy) return !1;
    return !0
}
var y120 = 0,
    levely7s = [],
    y242 = 30,
    y74 = 0,
    y152 = 1,
    y205 = 2,
    y98 = 3,
    y157 = 9,
    y90 = 0,
    y159 = 1,
    y232 = [],
    y250 = 0,
    y258 = 1,
    y218 = 2,
    y191 = 3,
    y92 = 4,
    y135 = 5,
    y204 = 6,
    y190 = 8,
    y236 = 7,
    y52 = "BattleFish1",
    isStorageSupported = !1;

function y284() {
    y120 = 0;
    if (isStorageSupported = isSupportshtml5storage())
        if (localStorage[y52 + "y120"]) {
            y120 = parseInt(localStorage[y52 + "y120"]);
            for (c = 0; c < y242; c++) levely7s.push(parseInt(localStorage[y52 + "levely7" + c]));
            for (c = 0; c < y157; c++) y232.push(parseInt(localStorage[y52 + "achiev" + c]));
            isMute = "1" == localStorage[y52 + "ismute"];
            y83 = localStorage[y52 + "totalrestarts"] ? parseInt(localStorage[y52 + "totalrestarts"]) : 0;
            y317 = localStorage[y52 + "totalfriends"] ? parseInt(localStorage[y52 + "y317"]) : 0
        } else {
            y100("saves not found!");
            for (c = 0; c < y242; c++) levely7s.push(y74);
            for (c = 0; c < y157; c++) y232.push(y90);
            y44()
        } else {
        y100("storage not supported");
        for (var c = 0; c < y242; c++) levely7s.push(y74);
        for (c = 0; c < y157; c++) y232.push(y90)
    }
}

function y215(c) {
    return levely7s[c]
}

function y103(c) {
    y120 <= y46 && (y120 = y46 + 1);
    levely7s[y46] < c && (levely7s[y46] = c);
    y44()
}

function y44() {
    if (isStorageSupported) {
        localStorage[y52 + "y120"] = y120;
        for (var c = 0; c < y242; c++) localStorage[y52 + "levely7" + c] = levely7s[c];
        for (c = 0; c < y157; c++) localStorage[y52 + "achiev" + c] = y232[c];
        y65();
        localStorage[y52 + "totalrestarts"] = "" + y83;
        localStorage[y52 + "totalfriends"] = "" + y317
    }
}

function y65() {
    isStorageSupported && (localStorage[y52 + "ismute"] = isMute ? "1" : "0")
}

function isSupportshtml5storage() {
    try {
        var c = "localStorage" in window && null !== window.localStorage;
        c && (localStorage.setItem("storage", ""), localStorage.removeItem("storage"));
        return c
    } catch (a) {
        return !1
    }
}
var y164 = [];

function y99(c, a, b, h) {
    c = y50(y198, c, a, 1, h ? y183 : y124);
    c.y33(b);
    y164.push(c);
    y119.gotoAndStop(b);
    y119.visible = !0;
    return c
}

function y48() {
    y119.visible = !1;
    0 == y46 ? (y99(160, 176, "growCircle", !0).y29 = 1, y99(160, 290, "levelinsruction1")) : 1 == y46 ? y99(160, 290, "levelinstruction2") : 2 == y46 ? y99(160, 290, "notcollidegrow") : 4 == y46 ? y99(160, 290, "levelinstruction3") : 8 == y46 ? y99(160, 290, "levelinstruction4") : 13 == y46 ? y99(160, 290, "levelinstruction5") : 19 == y46 && y99(160, 290, "levelinstruction6");
    isLevelRestarted || y97()
}

function disposeInstructions() {
    for (; 0 < y164.length;) y164.pop().dispose()
}

function y202() {
    for (var c = 0, a = 0; a < y242; a++) c += levely7s[a];
    return c
}
var isAudioSupported = !1,
    isMute = !1;

function initSoundManager() {
    isDesktop() || createjs.Sound.registerPlugins([createjs.WebAudioPlugin]);
    (isAudioSupported = createjs.Sound.initializeDefaultPlugins()) && y51.push({
        src: "buttonClick.ogg|buttonClick.m4a",
        id: "clickSound",
        data: 1
    }, {
        src: "explodeSound.ogg|explodeSound.m4a",
        id: "bubbleSound",
        data: 1
    }, {
        src: "collideSound.ogg|collideSound.m4a",
        id: "collideSound",
        data: 1
    }, {
        src: "note4.ogg|note4.m4a",
        id: "note1Sound",
        data: 1
    }, {
        src: "note6.ogg|note6.m4a",
        id: "note2Sound",
        data: 1
    }, {
        src: "note8.ogg|note8.m4a",
        id: "note3Sound",
        data: 1
    }, {
        src: "achievSound.ogg|achievSound.m4a",
        id: "achievSound",
        data: 1
    }, {
        src: "winSound.ogg|winSound.m4a",
        id: "winSound",
        data: 1
    }, {
        src: "restartSound.ogg|restartSound.m4a",
        id: "restartSound",
        data: 1
    }, {
        src: "inflateSound.ogg|inflateSound.m4a",
        id: "inflateSound",
        data: 1
    })
}

function y166(c, a) {
    if (!isMute && isAudioSupported) return createjs.Sound.play(c, {
        interrupt: createjs.Sound.INTERRUPT_EARLY,
        loop: a ? -1 : 0
    })
}
var inflateSound;

function y94() {
    !isMute && isAudioSupported && (inflateSound ? inflateSound.play() : inflateSound = y166("inflateSound", !0))
}

function stopInflateSound() {
    isAudioSupported && inflateSound && inflateSound.stop()
}

function y96() {
    isMute = !isMute;
    y65()
}
var y247, y244, y72, y281, y47, isGamePaused, y289;

function initInterface() {
    y247 = y276(24, 24, 1, "pausebtn", y81, null, y39);
    y289 = createjs.Ease.getElasticOut(1, 0.35);
    y57();
    y80();
    y171();
    y224();
    y102();
    y105();
    y231();
    y194();
    y189();
    y307();
    isGamePaused = !0;
    isSkipMenus ? y274() : y291(!1)
}

function y274() {
    y247.parent || y299.addChild(y247)
}

function y206() {
    y247.parent && y299.removeChild(y247)
}

function y81(c) {
    isGamePaused || isLevelFailed || isLevelCompleted || (c.target.scaleX = c.target.scaleY = 1.2)
}

function y39(c) {
    isGamePaused || isLevelFailed || isLevelCompleted || (c.target.scaleX = c.target.scaleY = 1, isCursorOutMoved(c) || (y166("clickSound"), y196()))
}
var y125, y119, y269, readyGoBtn;

function y102() {
    y125 = new createjs.Container;
    readyGoBtn = y276(-1, 0, 10, "tintbg", y272, y125, onReadyUp);
    readyGoBtn.scaleY = 9.8;
    y276(160, 155, 1, "readytitle", null, y125, null);
    y276(173, 72, 1, "levelreadylabel", null, y125, null);
    y119 = y276(160, 290, 1, "notcollidegrow", null, y125, null);
    y119.visible = !1;
    y269 = new createjs.BitmapText("1", interfaceSS);
    y269.letterSpacing = -7;
    y269.x = 188;
    y269.y = 52;
    y269.mouseEnabled = !1;
    y125.addChild(y269)
}

function y272(c) {}

function onReadyUp(c) {
    isGamePaused && (y129(), isGamePaused = !1)
}

function y133() {
    isGamePaused = !0;
    readyGoBtn.mouseEnabled = !0;
    y269.text = (y46 + 1).toString();
    createjs.Tween.removeTweens(y125);
    y125.alpha = 1;
    y125.parent || y299.addChild(y125)
}

function y129() {
    readyGoBtn.mouseEnabled = !1;
    createjs.Tween.removeTweens(y125);
    y125.alpha = 1;
    createjs.Tween.get(y125, {
        override: !0
    }).to({
        alpha: 0
    }, 250).call(y210)
}
var y151, y142, y91, y101, moreEasyBtn;

function y105() {
    y151 = new createjs.Container;
    y276(-1, 0, 10, "tintbg", null, y151).scaleY = 9.8;
    y142 = y276(160, 193, 1, "tryagaintitle", null, y151);
    y101 = y276(160, 283, 1, "playbtnup", y127, y151, onRestartUp);
    y91 = y276(160, 148, 1, "notcollidegrow", null, y151);
    moreEasyBtn = y276(160, 49, 1, "moreeasybtn", onMoreEasyPress, y151, onMoreEasyUp)
}

function onMoreEasyPress(c) {
    c.target.scaleX = c.target.scaleY = 1.1
}

function onMoreEasyUp(c) {
    c.target.scaleX = c.target.scaleY = 1;
    isCursorOutMoved(c) || (MORE_EASY_MULT += 0.5, y223(), y311(), y97(), y166("clickSound"))
}

function y127(c) {
    c.target.scaleX = c.target.scaleY = 1.1
}

function onRestartUp(c) {
    c.target.scaleX = c.target.scaleY = 1;
    isCursorOutMoved(c) || (y223(), y311(), y97(), y166("clickSound"))
}

function y134() {
    y151.parent || y299.addChild(y151);
    disposeInstructions();
    y97();
    isInflateReason ? y91.gotoAndStop("notcollidegrow") : y91.gotoAndStop("lostallfishes");
    createjs.Tween.removeTweens(y151);
    y151.alpha = 0;
    createjs.Tween.get(y151, {
        override: !0
    }).to({
        alpha: 1
    }, 300);
    var c = createjs.Ease.bounceOut;
    y101.scaleX = y101.scaleY = 0.8;
    createjs.Tween.get(y101, {
        override: !0,
        loop: !0
    }).to({
        scaleX: 1,
        scaleY: 1
    }, 3E3, c).wait(1E3).to({
        scaleX: 0.8,
        scaleY: 0.8
    }, 3E3, c);
    y166("restartSound")
}

function y223() {
    y123(y151);
    createjs.Tween.removeTweens(y101)
}
var y278, y60;

function y57() {
    y278 = new createjs.Container;
    y244 = y276(160, 254, 1, "playbtnup", y181, y278, y149);
    y72 = y276(290, 325, 0.8, "btnbaseup", y69, y278, y68);
    y281 = y276(156, 128, 0.8, "logov", null, y278);
    y276(37, 325, 0.5, "achievbtn", y241, y278, y222).rotation = -8;
    y60 = y276(294, 26, 0.6, "musiconbtn", y82, y278, y148);
    isAudioSupported || (y60.visible = !1)
}
var y208 = "musicoffbtn",
    y76 = "musiconbtn";

function y82(c) {
    c.target.scaleX = c.target.scaleY = 0.8
}

function y148(c) {
    c.target.scaleX = c.target.scaleY = 0.6;
    isCursorOutMoved(c) || (y96(), y195(c.target), y166("clickSound"))
}

function y195(c) {
    c.gotoAndStop(isMute ? y208 : y76)
}

function y291(c) {
    y299.addChild(y278);
    y195(y60);
    y244.scaleX = y244.scaleY = 0.8;
    c ? (y278.x = -400, y278.alpha = 0, createjs.Tween.removeTweens(y278), createjs.Tween.get(y278, {
        override: !0
    }).to({
        alpha: 1,
        x: 0
    }, 1300, y289).call(y112)) : y57Tweens()
}

function y112(c) {
    y57Tweens()
}

function y237() {
    disposeMainMenuTweens();
    createjs.Tween.get(y278, {
        override: !0
    }).to({
        alpha: 0,
        x: -400
    }, 200).call(y187)
}

function y187(c) {
    c = c.target;
    c.alpha = 1;
    y244.scaleX = y244.scaleY = 1;
    c.parent && y299.removeChild(c)
}

function y249(c, a) {
    return y276(c, a, 1, "bigbgwindow", null, y182, null)
}

function y57Tweens() {
    var c = createjs.Ease.bounceOut;
    y244.scaleX = y244.scaleY = 0.8;
    createjs.Tween.get(y244, {
        override: !0,
        loop: !0
    }).to({
        scaleX: 1,
        scaleY: 1
    }, 3E3, c).wait(1E3).to({
        scaleX: 0.8,
        scaleY: 0.8
    }, 3E3, c)
}

function disposeMainMenuTweens() {
    createjs.Tween.removeTweens(y244)
}

function y181(c) {
    c.target.gotoAndStop("downplaybtn")
}

function y149(c) {
    c.target.gotoAndStop("playbtnup");
    isCursorOutMoved(c) || (y166("clickSound"), y237(), y110())
}

function y241(c) {
    c.target.scaleX = c.target.scaleY = 0.6
}

function y222(c) {
    c.target.scaleX = c.target.scaleY = 0.5;
    isCursorOutMoved(c) || (y166("clickSound"), y237(), y257())
}

function y69(c) {
    c.target.scaleX = c.target.scaleY = 0.9;
    y100("play credits!")
}

function y68(c) {
    c.target.scaleX = c.target.scaleY = 0.8;
    isCursorOutMoved(c) || (y166("clickSound"), y237(), y294())
}

function y276(c, a, b, h, d, e, f) {
    var g = new createjs.Sprite(interfaceSS);
    g.snapToPixel = !0;
    g.x = c;
    g.y = a;
    g.scaleX = g.scaleY = b;
    g.gotoAndStop(h);
    f && g.addEventListener("pressup", f, !1);
    d ? (g.addEventListener("mousedown", d, !1), g.cursor = "pointer") : g.mouseEnabled = !1;
    (d || f) && (c = interfaceSS.getAnimation(h)) && c.frames && 0 < c.frames.length && (c = interfaceSS.getFrameBounds(c.frames[0]), g.setBoundingBox(c.x * b, c.y * b, c.width * b, c.height * b));
    e && e.addChild(g);
    return g
}
var y86, y145, y45, y128 = [],
    y118, y301;

function y80() {
    y47 = new createjs.Container;
    y47.name = "levelselcont";
    y47.addChild(y249(0, 0));
    y118 = new createjs.Container;
    y118.name = "y118";
    y301 = new createjs.Container;
    y276(156, 22, 1, "levelselecttitle", null, y47);
    y86 = y276(32, 322, 1, "backbtn", y251, y118, y255);
    y145 = y276(281, 314, 1, "nextlevels", y292, y118, y268);
    y45 = y276(40, 314, 1, "previouslevels", y282, y301, y176);
    y216();
    y47.addChild(y118);
    y228(y118);
    y228(y301)
}

function y228(c) {
    c.cache(-10, -10, ow + 20, oh + 20)
}

function y89(c) {
    c.uncache()
}

function y216() {
    for (var c = 0; 30 > c; c++) {
        var a = c % 15 % 4,
            b = Math.floor(c % 15 / 4),
            h = 3 == b ? 90 : 65,
            d = 3 == b ? 62 : 65;
        26 < c && (h += 20);
        a = y276(h + a * d, 80 + 67 * b, 1, "lvlLabelStar0", y262, 15 <= c ? y301 : y118, y59);
        a.levelNum = c;
        y128.push(a);
        b = new createjs.BitmapText((c + 1).toString(), interfaceSS);
        b.letterSpacing = -7;
        b.x = a.x;
        9 > c && (b.x -= 9);
        9 <= c && 19 > c && (b.x -= 15);
        10 == c && (b.x = a.x - 13);
        19 <= c && (b.x -= 17);
        b.y = a.y - 22;
        b.mouseEnabled = !1;
        a.txtNum = b
    }
}

function y310() {
    for (var c = 0; 30 > c; c++) {
        var a = c <= y120;
        isOpenAllLevels && (a = !0);
        var b;
        b = a ? "lvlLabelStar" + y215(c) : "levelbuttonlocked";
        var h = y128[c];
        h.gotoAndStop(b);
        (h.isOpened = a) ? h.txtNum.parent || h.parent.addChild(h.txtNum): h.txtNum.parent && h.parent.removeChild(h.txtNum)
    }
}

function y262(c) {
    c = c.target;
    c.scaleX = c.scaleY = 1.2;
    y100("level " + c.levelNum + " load");
    y315(c.levelNum)
}

function y59(c) {
    var a = c.target;
    a.scaleX = a.scaleY = 1;
    isCursorOutMoved(c) ? y315(a.levelNum) : a.isOpened ? (y180 = 0, y217(a.levelNum), y158(), y55(), y274()) : (y315(a.levelNum), y166("clickSound"))
}

function y315(c) {
    c && (15 > c ? y118.updateCache() : y301.updateCache())
}

function y251(c) {
    c = c.target;
    c.scaleX = c.scaleY = 1.2;
    y118.updateCache()
}

function y255(c) {
    var a = c.target;
    a.scaleX = a.scaleY = 1;
    isCursorOutMoved(c) ? y118.updateCache() : (y55(), y291(!0), y166("clickSound"))
}

function y292(c) {
    isTweened(y118) || (c = c.target, c.scaleX = c.scaleY = 1.2, y118.updateCache())
}

function y268(c) {
    var a = c.target;
    a.scaleX = a.scaleY = 1;
    isCursorOutMoved(c) ? y118.updateCache() : (y118.x = 0, y118.alpha = 1, createjs.Tween.get(y118, {
        override: !0
    }).to({
        alpha: 0,
        x: -400
    }, 300).call(y210), y47.addChild(y301), y301.x = 200, y301.updateCache(), y301.alpha = 0, createjs.Tween.get(y301, {
        override: !0
    }).to({
        alpha: 1,
        x: 0
    }, 700, createjs.Ease.bounceOut), y166("clickSound"))
}

function y282(c) {
    isTweened(y301) || (c = c.target, c.scaleX = c.scaleY = 1.2, y301.updateCache())
}

function y176(c) {
    var a = c.target;
    a.scaleX = a.scaleY = 1;
    isCursorOutMoved(c) ? y301.updateCache() : (y301.x = 0, y301.alpha = 1, createjs.Tween.get(y301, {
        override: !0
    }).to({
        alpha: 0,
        x: 400
    }, 300).call(y210), y118.x = -200, y47.addChild(y118), y118.updateCache(), y118.alpha = 0, createjs.Tween.get(y118, {
        override: !0
    }).to({
        alpha: 1,
        x: 0
    }, 700, createjs.Ease.bounceOut), y166("clickSound"))
}

function y110() {
    y299.addChild(y47);
    y310();
    y301.parent && y47.removeChild(y301);
    y118.parent || y47.addChild(y118);
    y118.x = 0;
    y118.alpha = 1;
    y118.updateCache();
    y47.x = 400;
    y47.alpha = 0;
    createjs.Tween.get(y47, {
        override: !0
    }).to({
        alpha: 1,
        x: 0
    }, 1300, y289)
}

function y55() {
    createjs.Tween.removeTweens(y47);
    createjs.Tween.get(y47, {
        override: !0
    }).to({
        alpha: 0,
        x: 400
    }, 200).call(y210)
}

function y158() {
    createjs.Tween.removeTweens(y183);
    y183.parent || y299.addChild(y183);
    y183.alpha = 0;
    y183.visible = !0;
    createjs.Tween.get(y183, {
        override: !0
    }).to({
        alpha: 1
    }, 400)
}

function y316(c, a) {
    isGamePaused = !0;
    createjs.Tween.removeTweens(y183);
    createjs.Tween.get(y183, {
        override: !0
    }).to({
        alpha: 0,
        visible: !1
    }, a ? a : 400).call(y123)
}
var y162, y144, y140, y193, y161, y305, y263;

function y171() {
    y162 = new createjs.Container;
    y276(153, 170, 1, "lvlcompletebgnew", null, y162);
    y144 = y276(250, 290, 1, "nextlevelwin", y225, y162, y265);
    y276(157, 287, 0.56, "restartbtn", y108, y162, y295);
    y140 = y276(57, 134, 1, "completestar", null, null, null);
    y193 = y276(153, 129, 1, "completestar", null, null, null);
    y161 = y276(256, 123, 1, "completestar", null, null, null);
    y305 = new createjs.BitmapText("1", interfaceSS);
    y305.letterSpacing = -7;
    y305.x = 212;
    y305.y = 178;
    y305.mouseEnabled = !1;
    y162.addChild(y305);
    y263 = new createjs.BitmapText("1",
        interfaceSS);
    y305.letterSpacing = -7;
    y263.x = 248;
    y263.y = 213;
    y263.mouseEnabled = !1;
    y162.addChild(y263)
}

function y108(c) {
    c = c.target;
    c.scaleX = c.scaleY = 0.75
}

function y295(c) {
    var a = c.target;
    a.scaleX = a.scaleY = 0.56;
    isCursorOutMoved(c) || (y166("clickSound"), MORE_EASY_MULT = 1, y311(), y180 = 0, y158(), y170())
}

function y225(c) {
    c = c.target;
    c.scaleX = c.scaleY = 1.2
}

function y265(c) {
    var a = c.target;
    a.scaleX = a.scaleY = 1;
    isCursorOutMoved(c) || (y166("clickSound"), y170(), c = y283(), -1 < c ? y266(c) : y46 >= y242 - 1 ? (y206(), disposeLevel(), y197()) : (y163(), y158()))
}
var y40 = 0;

function y285() {
    y206();
    createjs.Tween.removeTweens(y162);
    y123(y140);
    y123(y193);
    y123(y161);
    y305.text = (y46 + 1).toString();
    y263.text = y180.toString();
    y299.addChild(y162);
    y162.x = 400;
    y162.alpha = 0;
    createjs.Tween.get(y183).wait(400).call(y316);
    createjs.Tween.get(y162).wait(500).to({
        alpha: 1,
        x: 0
    }, 1300, y289).call(y186);
    y40 = y152;
    3 >= y180 ? y40 = y98 : 9 >= y180 && (y40 = y205);
    y317 += y137;
    y103(y40);
    y166("winSound")
}

function y186(c) {
    y238(y140, 20, 0.8, "note1Sound");
    y40 >= y205 && y238(y193, 600, 0.9, "note2Sound");
    y40 >= y98 && y238(y161, 1200, 1, "note3Sound")
}

function y238(c, a, b, h) {
    y162.addChild(c);
    c.alpha = 0;
    c.scaleX = c.scaleY = 0.2;
    c.rotation = 0;
    createjs.Tween.get(c, {
        override: !0
    }).wait(a).call(function() {
        y166(h)
    }).to({
        alpha: 1,
        rotation: 360,
        scaleX: b,
        scaleY: b
    }, 400)
}

function y123(c) {
    c.parent && c.parent.removeChild(c)
}

function y170() {
    createjs.Tween.removeTweens(y140);
    createjs.Tween.removeTweens(y193);
    createjs.Tween.removeTweens(y161);
    createjs.Tween.removeTweens(y162);
    createjs.Tween.get(y162).to({
        alpha: 0,
        x: -400
    }, 200).call(y210);
    y274()
}
var y182, y253, y53;

function y224() {
    y182 = new createjs.Container;
    var c = y249(0, 0);
    c.scaleX = c.scaleY = 0.8;
    c.x = 0.1 * ow;
    c.y = 0.1 * oh;
    y182.addChild(c);
    y276(78, 250, 1, "quitbtn", y309, y182, y160);
    y53 = y276(160, 250, 1, "musiconbtn", y130, y182, y77);
    isAudioSupported || (y53.visible = !1);
    y276(243, 250, 1, "restartbtn", y84, y182, y286);
    y253 = y276(160, 142, 1, "playbtnup", y126, y182, y177);
    y276(156, 38, 1, "pausetitle", null, y182)
}

function y130(c) {
    c.target.scaleX = c.target.scaleY = 1.2
}

function y77(c) {
    c.target.scaleX = c.target.scaleY = 1;
    isCursorOutMoved(c) || (y96(), y195(c.target), isMute || y166("clickSound"))
}

function y84(c) {
    c = c.target;
    c.scaleX = c.scaleY = 1.2
}

function y286(c) {
    var a = c.target;
    a.scaleX = a.scaleY = 1;
    isCursorOutMoved(c) || (y166("clickSound"), y136(!1, !1), y158(), y311())
}

function y309(c) {
    c = c.target;
    c.scaleX = c.scaleY = 1.2
}

function y160(c) {
    var a = c.target;
    a.scaleX = a.scaleY = 1;
    isCursorOutMoved(c) || (y166("clickSound"), isGamePaused = !0, disposeLevel(), y185(!0), y97(), y316(!0, 100), y136(!1, !0), y291(!0))
}

function y126(c) {
    c = c.target;
    c.scaleX = c.scaleY = 1.2
}

function y177(c) {
    var a = c.target;
    a.scaleX = a.scaleY = 1;
    isCursorOutMoved(c) || (y166("clickSound"), y136(!1, !1))
}

function y196() {
    isGamePaused || isLevelCompleted || isLevelFailed || (isGamePaused = !0, stopInflateSound(), y206(), y195(y53), y299.addChild(y182), y182.x = -400, y182.y = -250, y182.alpha = 0, createjs.Tween.get(y182).to({
        alpha: 1,
        x: 0,
        y: 0
    }, 1300, y289))
}

function y136(c, a) {
    isGamePaused = !1;
    createjs.Tween.removeTweens(y182);
    createjs.Tween.get(y182).to({
        alpha: 0,
        x: 400,
        y: 700
    }, 300).call(y210);
    a || y274()
}
var y246, y62, y302;

function y231() {
    y246 = new createjs.Container;
    y276(-1, 0, 10, "tintbg", null, y246).scaleY = 9.8;
    y276(160, 44, 1, "achievedtitle", null, y246);
    y276(160, 313, 1, "nextlevelwin", y275, y246);
    y62 = y276(160, 162, 1.34, "y62v", null, y246);
    y276(160, 172, 1, "achievbtn", null, y246).rotation = 10;
    y302 = y276(160, 253, 1, "achievdesc1", null, y246)
}

function y275(c) {
    y252();
    y46 >= y242 - 1 ? (y206(), disposeLevel(), y197()) : (y274(), y163(), y158())
}

function y266(c) {
    y246.parent || y299.addChild(y246);
    disposeLevel();
    y97();
    y206();
    y62.rotation = 0;
    createjs.Tween.get(y62, {
        override: !0,
        loop: !0
    }).to({
        rotation: 180
    }, 4E3);
    y302.gotoAndStop("achievdesc" + Math.round(c));
    y232[c] = y159;
    y44();
    createjs.Tween.removeTweens(y246);
    y246.alpha = 0;
    createjs.Tween.get(y246, {
        override: !0
    }).to({
        alpha: 1
    }, 300).call(function() {
        y166("achievSound")
    })
}

function y252() {
    createjs.Tween.removeTweens(y62);
    y123(y246)
}

function y283() {
    return 2 != y46 || isAlreadyAchieved(y250) ? 9 != y46 || isAlreadyAchieved(y92) ? 19 != y46 || isAlreadyAchieved(y135) ? 24 != y46 || isAlreadyAchieved(y190) ? 27 != y46 || isAlreadyAchieved(y236) ? 14 != y46 || isAlreadyAchieved(y191) ? 90 <= y202() && !isAlreadyAchieved(y204) ? y204 : 7 <= y83 && !isAlreadyAchieved(y218) ? y218 : 10 < y317 && !isAlreadyAchieved(y258) ? y258 : -1 : y191 : y236 : y190 : y135 : y92 : y250
}

function isAlreadyAchieved(c) {
    return y232[c] == y159
}
var y143, y199, y168 = [];

function y194() {
    y199 = new createjs.Container;
    y199.addChild(y249(0, 0));
    y276(160, 22, 1, "achievmenutitle", null, y199);
    y276(32, 41, 0.45, "achievbtn", null, y199).rotation = -14;
    y276(290, 41, 0.45, "achievbtn", null, y199).rotation = 12;
    y58();
    y143 = y276(32, 322, 1, "backbtn", y156, y199, y287)
}

function y58() {
    for (var c = 0; c < y157; c++) {
        var a = 30 * c;
        if (0 != c % 2) {
            var b = y276(5, 53 + a, 1, "tintbg", null, y199, null);
            b.scaleX = 9.8;
            b.scaleY = 0.75
        }
        a = y276(160, 66 + a, 1, "achievclosed", null, y199, null);
        y168.push(a)
    }
}

function y308() {
    for (var c = 0; c < y157; c++) y168[c].gotoAndStop(y232[c] == y159 ? "achievdesc" + c.toString() : "achievclosed")
}

function y156(c) {
    c = c.target;
    c.scaleX = c.scaleY = 1.2;
    y199.updateCache()
}

function y287(c) {
    var a = c.target;
    a.scaleX = a.scaleY = 1;
    isCursorOutMoved(c) ? y199.updateCache() : (y166("clickSound"), y235(), y291(!0))
}

function y257() {
    y299.addChild(y199);
    y308();
    y228(y199);
    y199.x = 400;
    y199.alpha = 0;
    createjs.Tween.get(y199, {
        override: !0
    }).to({
        alpha: 1,
        x: 0
    }, 1300, y289)
}

function y235() {
    createjs.Tween.removeTweens(y199);
    createjs.Tween.get(y199, {
        override: !0
    }).to({
        alpha: 0,
        x: 400
    }, 200).call(y49)
}
var y64;

function y189() {
    y64 = new createjs.Container;
    var c = y249(0, 0);
    c.scaleY = 0.88;
    c.y = 23;
    y64.addChild(c);
    y276(31, 321, 1, "backbtn", y240, y64, y175);
    y276(160, 97, 1, "biglimetxt", y146, y64);
    y276(233, 296, 1, "inspiredby", null, y64);
    y276(160, 155, 1, "creditstext", y165, y64);
    y276(160, 30, 1, "creditstitle", null, y64)
}

function y146(c) {
    window.open("http://porubov.com", "_blank")
}

function y165(c) {
    window.location = "mailto:seddas@gmail.com?subject=BattleFish"
}

function y240(c) {
    c = c.target;
    c.scaleX = c.scaleY = 1.2
}

function y175(c) {
    var a = c.target;
    a.scaleX = a.scaleY = 1;
    isCursorOutMoved(c) || (y166("clickSound"), y239(), y291(!0))
}

function y294() {
    y299.addChild(y64);
    y64.x = 400;
    y64.alpha = 0;
    createjs.Tween.get(y64, {
        override: !0
    }).to({
        alpha: 1,
        x: 0
    }, 1300, y289)
}

function y239() {
    createjs.Tween.removeTweens(y64);
    createjs.Tween.get(y64, {
        override: !0
    }).to({
        alpha: 0,
        x: 400
    }, 200).call(y210)
}
var y115, y203;

function y307() {
    y115 = new createjs.Container;
    var c = y249(0, 0);
    c.scaleY = 0.88;
    c.y = 23;
    y115.addChild(c);
    y276(160, 310, 1, "nextlevelwin", y192, y115, y288);
    y276(160, 237, 1, "levelinstruction8", null, y115);
    y276(160, 105, 1, "allcollectedstars", null, y115);
    y276(160, 30, 1, "gamecompletedTitle", null, y115);
    y203 = new createjs.BitmapText(y202().toString(), interfaceSS);
    y203.letterSpacing = -7;
    y203.x = 85;
    y203.y = 121;
    y203.mouseEnabled = !1;
    y115.addChild(y203)
}

function y192(c) {
    c = c.target;
    c.scaleX = c.scaleY = 1.2
}

function y288(c) {
    var a = c.target;
    a.scaleX = a.scaleY = 1;
    isCursorOutMoved(c) || (y166("clickSound"), y178(), y291(!0))
}
var isGameCompleteScreenShow = !1;

function y197() {
    isGameCompleteScreenShow = !0;
    y299.addChild(y115);
    y203.text = y202().toString();
    y115.x = 400;
    y115.alpha = 0;
    createjs.Tween.get(y115, {
        override: !0
    }).to({
        alpha: 1,
        x: 0
    }, 1300, createjs.Ease.elasticOut)
}

function y178() {
    isGameCompleteScreenShow = !1;
    y79();
    createjs.Tween.removeTweens(y115);
    createjs.Tween.get(y115, {
        override: !0
    }).to({
        alpha: 0,
        x: 400
    }, 200).call(y210)
}

function y49(c) {
    c = c.target;
    y89(c);
    c.parent && c.parent.removeChild(c)
}

function y210(c) {
    c = c.target;
    c.parent && c.parent.removeChild(c)
}

function isTweened(c) {
    return createjs.Tween.hasActiveTweens(c)
}
var y172;

function isCursorOutMoved(c) {
    if (!isDesktop()) return !1;
    y172 = c.target.globalToLocal(c.y41X, c.y41Y);
    return !c.target.hitTest(y172.x, y172.y)
}
var y41, y167, canvas, rect, y299, y298, y121, y293, y150, scaleFactor = 1,
    ow = 320,
    oh = 356,
    maxW = 426,
    maxH = 568,
    desctopMaxW = 426,
    desctopMaxH = 568,
    y279 = 1;

function initResizeManager() {
    window.addEventListener("resize", y313);
    document.addEventListener("touchstart", y245);
    window.onorientationchange = y147;
    y66()
}
var isWasPaused = null;

function y66() {
    var c = window.innerWidth,
        a = window.innerHeight;
    scaleFactor = Math.min(c / ow, a / oh);
    y41.scaleX = 1;
    y41.scaleY = 1;
    y41.canvas.width = c;
    y41.canvas.height = a;
    if (isDesktop()) {
        var b = 1.3,
            h = getURLParameter("scale");
        h && (b = parseFloat(h));
        scaleFactor = Math.min(scaleFactor, b);
        y41.canvas.width = desctopMaxW * scaleFactor;
        y41.canvas.height = desctopMaxH * scaleFactor;
        y41.canvas.style.position = "absolute";
        y41.canvas.style.top = "50%";
        y41.canvas.style.left = "50%";
        b = -((desctopMaxH - oh) / 2 + oh / 2) * scaleFactor;
        h = (a - oh * scaleFactor) /
            2;
        h = Math.min(h, CLAY_BAR_HEIGHT / 2);
        y41.canvas.style.marginTop = b - h + "px";
        y41.canvas.style.marginLeft = -((desctopMaxW - ow) / 2 + ow / 2) * scaleFactor + "px";
        h >= CLAY_BAR_HEIGHT / 2 ? clayAd ? clayAd.show() : showClayAds() : clayAd && clayAd.hide()
    }
    y41.autoClear = c > maxW * scaleFactor || a > maxH * scaleFactor;
    y299.scaleX = scaleFactor;
    y299.scaleY = scaleFactor;
    y299.x = Math.round((y41.canvas.width - ow * scaleFactor) / 2);
    y299.y = Math.round(y41.canvas.height - oh * scaleFactor) / 2;
    isDesktop() || (h = Math.min(y299.y, CLAY_AD_HEIGHT / 2), h >= CLAY_AD_HEIGHT / 2 ? (y299.y -=
        h, clayAd ? clayAd.show() : showClayAds()) : clayAd && clayAd.hide());
    y293 = c;
    y150 = a;
    y42 = null;
    if (isAllFilesLoaded && !isDesktop()) {
        if (c > a && (!window.hasOwnProperty("orientation") || 90 == window.orientation || -90 == window.orientation)) {
            y41.autoClear = !0;
            y121.scaleX = y299.scaleX;
            y121.scaleY = y299.scaleY;
            y121.x = y299.x;
            y121.y = y299.y;
            y299.parent && y41.removeChild(y299);
            y121.parent || y41.addChild(y121);
            null === isWasPaused && (isWasPaused = !!isGamePaused);
            isGamePaused = !0;
            y41.update();
            return
        }
        null != isWasPaused && (isGamePaused = !!isWasPaused,
            isWasPaused = null);
        y121.parent && y41.removeChild(y121);
        y299.parent || y41.addChild(y299)
    }
    y41.update();
    isNeedCacheSizeUpdate = !0
}

function y147(c) {
    setTimeout(hideAdressBar, 50);
    y313(null)
}

function hideAdressBar() {
    window.scrollTo(1, 0)
}

function y245(c) {
    window.innerHeight != y150 && y313(null)
}
var y42;

function y313(c) {
    clearTimeout(y42);
    setTimeout(y66, 300);
    y100("on Win Resize")
}

function y88() {
    var c = document.createElement("meta");
    c.name = "viewport";
    var a = "target-densitydpi=device-dpi, user-scalable=0",
        a = isHiDPI() ? a + ", initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5" : a + ", initial-scale=1, maximum-scale=1, minimum-scale=1";
    c.content = a;
    document.getElementsByTagName("head")[0].appendChild(c)
}

function isHiDPI() {
    return !window.hasOwnProperty("devicePixelRatio") || -1 == navigator.userAgent.indexOf("iPhone") && -1 == navigator.userAgent.indexOf("iPad") || 2 != window.devicePixelRatio ? !1 : !0
}

function getURLParameter(c) {
    return decodeURIComponent((RegExp("[?|&]" + c + "=([^&;]+?)(&|#|;|$)").exec(location.search) || [, ""])[1].replace(/\+/g, "%20")) || null
}

function isMobileDetected(c) {
    return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|android|ipad|playbook|silk|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(c) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(c.substr(0,
        4))
}
var MyGame = {},
    images, y111;
MyGame.init = function() {
    canvas = document.getElementById("canvas");
    images = images || {};
    y111 = y111 || {};
    y41 = new createjs.Stage("canvas");
    y299 = new createjs.Container;
    y299.isRoot = !0;
    y299.width = ow;
    y299.height = oh;
    y41.addChild(y299);
    y87();
    y121 = new createjs.Container;
    y121.width = ow;
    y121.height = oh;
    initResizeManager();
    createjs.Touch.enable(y41, !0);
    isDesktop() && y41.enableMouseOver(15);
    y41.mouseMoveOutside = !0;
    initLoaders();
    y41.update();
    var c = document.getElementById("loader");
    c && c.parentNode && c.parentNode.removeChild(c)
};

function isDesktop() {
    return isDesktopBrowser
}

function y79() {
    y260 = isDesktopBrowser ? 30 : 12
}

function y87() {
    isDesktopBrowser = !isMobileDetected(navigator.userAgent || navigator.vendor || window.opera);
    var c = getURLParameter("mobile");
    c && 1 == parseInt(c) && (isDesktopBrowser = !1);
    y79()
}

function initLoaders() {
    y322 = 10;
    y323 = createjs.Graphics.getRGB(247, 247, 247);
    y324 = new createjs.Container;
    y324.mouseEnabled = !1;
    bar = new createjs.Shape;
    bar.graphics.beginFill(y323).drawRect(0, 0, 1, 20).endFill();
    y325 = 300;
    var c = new createjs.Shape;
    c.graphics.setStrokeStyle(1).beginStroke(y323).drawRect(-1.5, -1.5, y325 + 3, 23);
    y324.x = y299.width - y325 >> 1;
    y324.y = y299.height - 20 >> 1;
    y324.addChild(bar, c);
    y299.addChild(y324);
    initSoundManager();
    y298 = new createjs.LoadQueue(!0, "assets/");
    y298.installPlugin(createjs.Sound);
    y298.addEventListener("progress", y154);
    y298.addEventListener("complete", y122);
    y298.addEventListener("fileload", y114);
    isLoadAnimFromJSON && (y51.push({
        src: "expandassets.json",
        id: "anim_json"
    }), y51.push({
        src: "bgassets.json",
        id: "bgassets_json"
    }), y51.push({
        src: "interfaceassets.json",
        id: "interfaceassets_json"
    }));
    y298.loadManifest(y51);
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.setFPS(FPS)
}

function y154(c) {
    if (0 != c.total) {
        var a = c.loaded / c.total;
        bar.scaleX = a * y325;
        y41.update()
    }
    y100(a)
}
var y132, y131, interfaceSS, bgSS;

function y114(c) {
    "image" == c.item.type && (images[c.item.id] = c.result);
    y111[c.item.id] = c.result
}

function y153() {
    var c = new createjs.Sprite(bgSS);
    c.gotoAndStop("rotateScreen");
    c.x = 30;
    y121.addChild(c)
}
var isAllFilesLoaded = !1;

function y122(c) {
    isAllFilesLoaded = !0;
    y123(y324);
    y85();
    y226();
    y284();
    initLevelManager();
    isNeedFpsMeter && (y132 = new createjs.BitmapText("1", interfaceSS), y132.scaleX = y132.scaleY = 0.6, y132.letterSpacing = -7, y132.x = ow - 27, y299.addChild(y132));
    initInterface();
    isSkipMenus && (isLastLevelLoad ? y217(y43.length - 1) : y217(y304));
    y41.update();
    createjs.Ticker.addEventListener("tick", tick);
    initEditorHandlers();
    isGetAllProperties && getAllProperties();
    y153();
    y66()
}

function initEditorHandlers() {
    isLevelEditor && y41.addEventListener("y41mousedown", y200)
}
var clayAd, CLAY_BAR_HEIGHT = 70,
    CLAY_AD_HEIGHT = 50;

function showClayAds() {
    if (isDesktop()) {
        var c = {
            position: {
                width: "100%",
                height: CLAY_BAR_HEIGHT + "px",
                bottom: "0px",
                left: "0px"
            }
        };
        clayAd = new Clay.Bar(c)
    } else c = {
        size: isDesktop() ? "468x60" : "320x50",
        position: {
            left: "50%",
            bottom: isDesktop() ? "30px" : "25px",
            reference: "center"
        },
        refreshInterval: 60
    }, clayAd = new Clay.Advertisement(c)
}

function y97() {
    0 != y124.cacheID && y124.updateCache(!0)
}
var y254, y124, y318, isNeedCacheSizeUpdate = !1;

function y226() {
    y124 = new createjs.Container;
    y299.addChild(y124);
    y254 = (new createjs.Sprite(bgSS)).set({
        x: -53,
        y: -106
    });
    y254.gotoAndStop("bigbg");
    y124.addChild(y254);
    y318 = new createjs.Sprite(bgSS);
    y318.x = -1;
    y318.gotoAndStop("aquabg1");
    y124.addChild(y318);
    y318.visible = !1;
    y124.mouseEnabled = !1
}
var nameCounter = 0;

function y200(c) {
    isLevelEditor && (y319.isPressed("n") && y163(), y319.isPressed("b") && showClayAds(), y319.isPressed("l") && (isLevelCompleted = !0, y285()), y319.isPressed("a") && y266(), y319.isPressed("u") && y97(), y319.isPressed("g") && y197())
}

function y85() {
    isLoadAnimFromJSON && (y201 = eval(y111.anim_json), interfaceCFG = eval(y111.interfaceassets_json), y220 = eval(y111.bgassets_json));
    y201.images[0] = "assets/" + y201.images[0];
    interfaceCFG.images[0] = "assets/" + interfaceCFG.images[0];
    y220.images[0] = "assets/" + y220.images[0];
    validateSpritesheetCFG(y201);
    validateSpritesheetCFG(interfaceCFG);
    validateSpritesheetCFG(y220);
    y131 = new createjs.SpriteSheet(y201);
    interfaceSS = new createjs.SpriteSheet(interfaceCFG);
    bgSS = new createjs.SpriteSheet(y220)
}

function validateSpritesheetCFG(c) {
    c = c.frames;
    for (var a = c.length, b, h = 0; h < a; h++) b = c[h], 1024 < b[0] + b[2] && (b[2] = 1024 - b[0]), 1024 < b[1] + b[3] && (b[3] = 1024 - b[1])
}
var y303 = 0,
    y261 = 0,
    y234 = [],
    FPS = 30,
    y297 = 1 / FPS;

function tick(c) {
    y303++;
    y261++;
    if (!isGamePaused) {
        for (; 0 < y234.length;) y314.DestroyBody(y234.pop());
        y314.Step(y297, 1, 2);
        isPhysicsDebugDraw && y314.DrawDebugData();
        y314.ClearForces()
    }
    for (c = 0; c < y243.length; c++) y243[c].tick();
    y93();
    y41.update();
    isGameCompleteScreenShow && (y260 = 30, 0 == y261 % Math.floor(FPS / 6) && y50Explode(Math.random() * ow, Math.random() * oh, 6, y179, y115));
    isNeedFpsMeter && 0 == y303 % FPS && (y132.text = Math.floor(createjs.Ticker.getMeasuredFPS()).toString());
    if (30 < y303 && isNeedCacheSizeUpdate) {
        isNeedCacheSizeUpdate = !1;
        c = Math.min(428, y41.canvas.width / scaleFactor);
        var a = Math.floor((c - ow) / 2) + 1,
            b = Math.min(570, y41.canvas.height / scaleFactor),
            h = Math.min(y299.y, Math.floor((b - oh) / 2)) + 1;
        y100(y299.y + " ohet" + Math.floor((b - oh) / 2));
        y124.cache(-a, -h, c + 1, b + 1, 1)
    }
}

function y100(c) {
    isLevelEditor && console.log(c)
};