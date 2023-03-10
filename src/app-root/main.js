(window.webpackJsonp = window.webpackJsonp || []).push([
  [1],
  {
    0: function(t, e, n) {
      t.exports = n("zUnb");
    },
    zUnb: function(t, e, n) {
      "use strict";
      function s(t) {
        return "function" == typeof t;
      }
      n.r(e);
      let r = !1;
      const i = {
        Promise: void 0,
        set useDeprecatedSynchronousErrorHandling(t) {
          if (t) {
            const t = new Error();
            console.warn(
              "DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n" +
                t.stack
            );
          } else
            r &&
              console.log(
                "RxJS: Back to a better error behavior. Thank you. <3"
              );
          r = t;
        },
        get useDeprecatedSynchronousErrorHandling() {
          return r;
        }
      };
      function o(t) {
        setTimeout(() => {
          throw t;
        }, 0);
      }
      const a = {
          closed: !0,
          next(t) {},
          error(t) {
            if (i.useDeprecatedSynchronousErrorHandling) throw t;
            o(t);
          },
          complete() {}
        },
        l = (() => Array.isArray || (t => t && "number" == typeof t.length))();
      function c(t) {
        return null !== t && "object" == typeof t;
      }
      const u = (() => {
        function t(t) {
          return (
            Error.call(this),
            (this.message = t
              ? `${t.length} errors occurred during unsubscription:\n${t
                  .map((t, e) => `${e + 1}) ${t.toString()}`)
                  .join("\n  ")}`
              : ""),
            (this.name = "UnsubscriptionError"),
            (this.errors = t),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      let h = (() => {
        class t {
          constructor(t) {
            (this.closed = !1),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              t && ((this._ctorUnsubscribe = !0), (this._unsubscribe = t));
          }
          unsubscribe() {
            let e;
            if (this.closed) return;
            let {
              _parentOrParents: n,
              _ctorUnsubscribe: r,
              _unsubscribe: i,
              _subscriptions: o
            } = this;
            if (
              ((this.closed = !0),
              (this._parentOrParents = null),
              (this._subscriptions = null),
              n instanceof t)
            )
              n.remove(this);
            else if (null !== n)
              for (let t = 0; t < n.length; ++t) n[t].remove(this);
            if (s(i)) {
              r && (this._unsubscribe = void 0);
              try {
                i.call(this);
              } catch (a) {
                e = a instanceof u ? d(a.errors) : [a];
              }
            }
            if (l(o)) {
              let t = -1,
                n = o.length;
              for (; ++t < n; ) {
                const n = o[t];
                if (c(n))
                  try {
                    n.unsubscribe();
                  } catch (a) {
                    (e = e || []),
                      a instanceof u ? (e = e.concat(d(a.errors))) : e.push(a);
                  }
              }
            }
            if (e) throw new u(e);
          }
          add(e) {
            let n = e;
            if (!e) return t.EMPTY;
            switch (typeof e) {
              case "function":
                n = new t(e);
              case "object":
                if (
                  n === this ||
                  n.closed ||
                  "function" != typeof n.unsubscribe
                )
                  return n;
                if (this.closed) return n.unsubscribe(), n;
                if (!(n instanceof t)) {
                  const e = n;
                  (n = new t()), (n._subscriptions = [e]);
                }
                break;
              default:
                throw new Error(
                  "unrecognized teardown " + e + " added to Subscription."
                );
            }
            let { _parentOrParents: s } = n;
            if (null === s) n._parentOrParents = this;
            else if (s instanceof t) {
              if (s === this) return n;
              n._parentOrParents = [s, this];
            } else {
              if (-1 !== s.indexOf(this)) return n;
              s.push(this);
            }
            const r = this._subscriptions;
            return null === r ? (this._subscriptions = [n]) : r.push(n), n;
          }
          remove(t) {
            const e = this._subscriptions;
            if (e) {
              const n = e.indexOf(t);
              -1 !== n && e.splice(n, 1);
            }
          }
        }
        return (
          (t.EMPTY = (function(t) {
            return (t.closed = !0), t;
          })(new t())),
          t
        );
      })();
      function d(t) {
        return t.reduce((t, e) => t.concat(e instanceof u ? e.errors : e), []);
      }
      const p = (() =>
        "function" == typeof Symbol
          ? Symbol("rxSubscriber")
          : "@@rxSubscriber_" + Math.random())();
      class f extends h {
        constructor(t, e, n) {
          switch (
            (super(),
            (this.syncErrorValue = null),
            (this.syncErrorThrown = !1),
            (this.syncErrorThrowable = !1),
            (this.isStopped = !1),
            arguments.length)
          ) {
            case 0:
              this.destination = a;
              break;
            case 1:
              if (!t) {
                this.destination = a;
                break;
              }
              if ("object" == typeof t) {
                t instanceof f
                  ? ((this.syncErrorThrowable = t.syncErrorThrowable),
                    (this.destination = t),
                    t.add(this))
                  : ((this.syncErrorThrowable = !0),
                    (this.destination = new m(this, t)));
                break;
              }
            default:
              (this.syncErrorThrowable = !0),
                (this.destination = new m(this, t, e, n));
          }
        }
        [p]() {
          return this;
        }
        static create(t, e, n) {
          const s = new f(t, e, n);
          return (s.syncErrorThrowable = !1), s;
        }
        next(t) {
          this.isStopped || this._next(t);
        }
        error(t) {
          this.isStopped || ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped || ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed || ((this.isStopped = !0), super.unsubscribe());
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          this.destination.error(t), this.unsubscribe();
        }
        _complete() {
          this.destination.complete(), this.unsubscribe();
        }
        _unsubscribeAndRecycle() {
          const { _parentOrParents: t } = this;
          return (
            (this._parentOrParents = null),
            this.unsubscribe(),
            (this.closed = !1),
            (this.isStopped = !1),
            (this._parentOrParents = t),
            this
          );
        }
      }
      class m extends f {
        constructor(t, e, n, r) {
          let i;
          super(), (this._parentSubscriber = t);
          let o = this;
          s(e)
            ? (i = e)
            : e &&
              ((i = e.next),
              (n = e.error),
              (r = e.complete),
              e !== a &&
                ((o = Object.create(e)),
                s(o.unsubscribe) && this.add(o.unsubscribe.bind(o)),
                (o.unsubscribe = this.unsubscribe.bind(this)))),
            (this._context = o),
            (this._next = i),
            (this._error = n),
            (this._complete = r);
        }
        next(t) {
          if (!this.isStopped && this._next) {
            const { _parentSubscriber: e } = this;
            i.useDeprecatedSynchronousErrorHandling && e.syncErrorThrowable
              ? this.__tryOrSetError(e, this._next, t) && this.unsubscribe()
              : this.__tryOrUnsub(this._next, t);
          }
        }
        error(t) {
          if (!this.isStopped) {
            const { _parentSubscriber: e } = this,
              { useDeprecatedSynchronousErrorHandling: n } = i;
            if (this._error)
              n && e.syncErrorThrowable
                ? (this.__tryOrSetError(e, this._error, t), this.unsubscribe())
                : (this.__tryOrUnsub(this._error, t), this.unsubscribe());
            else if (e.syncErrorThrowable)
              n ? ((e.syncErrorValue = t), (e.syncErrorThrown = !0)) : o(t),
                this.unsubscribe();
            else {
              if ((this.unsubscribe(), n)) throw t;
              o(t);
            }
          }
        }
        complete() {
          if (!this.isStopped) {
            const { _parentSubscriber: t } = this;
            if (this._complete) {
              const e = () => this._complete.call(this._context);
              i.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable
                ? (this.__tryOrSetError(t, e), this.unsubscribe())
                : (this.__tryOrUnsub(e), this.unsubscribe());
            } else this.unsubscribe();
          }
        }
        __tryOrUnsub(t, e) {
          try {
            t.call(this._context, e);
          } catch (n) {
            if ((this.unsubscribe(), i.useDeprecatedSynchronousErrorHandling))
              throw n;
            o(n);
          }
        }
        __tryOrSetError(t, e, n) {
          if (!i.useDeprecatedSynchronousErrorHandling)
            throw new Error("bad call");
          try {
            e.call(this._context, n);
          } catch (s) {
            return i.useDeprecatedSynchronousErrorHandling
              ? ((t.syncErrorValue = s), (t.syncErrorThrown = !0), !0)
              : (o(s), !0);
          }
          return !1;
        }
        _unsubscribe() {
          const { _parentSubscriber: t } = this;
          (this._context = null),
            (this._parentSubscriber = null),
            t.unsubscribe();
        }
      }
      const g = (() =>
        ("function" == typeof Symbol && Symbol.observable) || "@@observable")();
      function y(t) {
        return t;
      }
      let _ = (() => {
        class t {
          constructor(t) {
            (this._isScalar = !1), t && (this._subscribe = t);
          }
          lift(e) {
            const n = new t();
            return (n.source = this), (n.operator = e), n;
          }
          subscribe(t, e, n) {
            const { operator: s } = this,
              r = (function(t, e, n) {
                if (t) {
                  if (t instanceof f) return t;
                  if (t[p]) return t[p]();
                }
                return t || e || n ? new f(t, e, n) : new f(a);
              })(t, e, n);
            if (
              (r.add(
                s
                  ? s.call(r, this.source)
                  : this.source ||
                    (i.useDeprecatedSynchronousErrorHandling &&
                      !r.syncErrorThrowable)
                  ? this._subscribe(r)
                  : this._trySubscribe(r)
              ),
              i.useDeprecatedSynchronousErrorHandling &&
                r.syncErrorThrowable &&
                ((r.syncErrorThrowable = !1), r.syncErrorThrown))
            )
              throw r.syncErrorValue;
            return r;
          }
          _trySubscribe(t) {
            try {
              return this._subscribe(t);
            } catch (e) {
              i.useDeprecatedSynchronousErrorHandling &&
                ((t.syncErrorThrown = !0), (t.syncErrorValue = e)),
                (function(t) {
                  for (; t; ) {
                    const { closed: e, destination: n, isStopped: s } = t;
                    if (e || s) return !1;
                    t = n && n instanceof f ? n : null;
                  }
                  return !0;
                })(t)
                  ? t.error(e)
                  : console.warn(e);
            }
          }
          forEach(t, e) {
            return new (e = b(e))((e, n) => {
              let s;
              s = this.subscribe(
                e => {
                  try {
                    t(e);
                  } catch (r) {
                    n(r), s && s.unsubscribe();
                  }
                },
                n,
                e
              );
            });
          }
          _subscribe(t) {
            const { source: e } = this;
            return e && e.subscribe(t);
          }
          [g]() {
            return this;
          }
          pipe(...t) {
            return 0 === t.length
              ? this
              : (0 === (e = t).length
                  ? y
                  : 1 === e.length
                  ? e[0]
                  : function(t) {
                      return e.reduce((t, e) => e(t), t);
                    })(this);
            var e;
          }
          toPromise(t) {
            return new (t = b(t))((t, e) => {
              let n;
              this.subscribe(t => (n = t), t => e(t), () => t(n));
            });
          }
        }
        return (t.create = e => new t(e)), t;
      })();
      function b(t) {
        if ((t || (t = i.Promise || Promise), !t))
          throw new Error("no Promise impl found");
        return t;
      }
      const v = (() => {
        function t() {
          return (
            Error.call(this),
            (this.message = "object unsubscribed"),
            (this.name = "ObjectUnsubscribedError"),
            this
          );
        }
        return (t.prototype = Object.create(Error.prototype)), t;
      })();
      class w extends h {
        constructor(t, e) {
          super(),
            (this.subject = t),
            (this.subscriber = e),
            (this.closed = !1);
        }
        unsubscribe() {
          if (this.closed) return;
          this.closed = !0;
          const t = this.subject,
            e = t.observers;
          if (
            ((this.subject = null),
            !e || 0 === e.length || t.isStopped || t.closed)
          )
            return;
          const n = e.indexOf(this.subscriber);
          -1 !== n && e.splice(n, 1);
        }
      }
      class C extends f {
        constructor(t) {
          super(t), (this.destination = t);
        }
      }
      let E = (() => {
        class t extends _ {
          constructor() {
            super(),
              (this.observers = []),
              (this.closed = !1),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          [p]() {
            return new C(this);
          }
          lift(t) {
            const e = new S(this, this);
            return (e.operator = t), e;
          }
          next(t) {
            if (this.closed) throw new v();
            if (!this.isStopped) {
              const { observers: e } = this,
                n = e.length,
                s = e.slice();
              for (let r = 0; r < n; r++) s[r].next(t);
            }
          }
          error(t) {
            if (this.closed) throw new v();
            (this.hasError = !0), (this.thrownError = t), (this.isStopped = !0);
            const { observers: e } = this,
              n = e.length,
              s = e.slice();
            for (let r = 0; r < n; r++) s[r].error(t);
            this.observers.length = 0;
          }
          complete() {
            if (this.closed) throw new v();
            this.isStopped = !0;
            const { observers: t } = this,
              e = t.length,
              n = t.slice();
            for (let s = 0; s < e; s++) n[s].complete();
            this.observers.length = 0;
          }
          unsubscribe() {
            (this.isStopped = !0), (this.closed = !0), (this.observers = null);
          }
          _trySubscribe(t) {
            if (this.closed) throw new v();
            return super._trySubscribe(t);
          }
          _subscribe(t) {
            if (this.closed) throw new v();
            return this.hasError
              ? (t.error(this.thrownError), h.EMPTY)
              : this.isStopped
              ? (t.complete(), h.EMPTY)
              : (this.observers.push(t), new w(this, t));
          }
          asObservable() {
            const t = new _();
            return (t.source = this), t;
          }
        }
        return (t.create = (t, e) => new S(t, e)), t;
      })();
      class S extends E {
        constructor(t, e) {
          super(), (this.destination = t), (this.source = e);
        }
        next(t) {
          const { destination: e } = this;
          e && e.next && e.next(t);
        }
        error(t) {
          const { destination: e } = this;
          e && e.error && this.destination.error(t);
        }
        complete() {
          const { destination: t } = this;
          t && t.complete && this.destination.complete();
        }
        _subscribe(t) {
          const { source: e } = this;
          return e ? this.source.subscribe(t) : h.EMPTY;
        }
      }
      function T(t) {
        return t && "function" == typeof t.schedule;
      }
      function x(t, e) {
        return function(n) {
          if ("function" != typeof t)
            throw new TypeError(
              "argument is not a function. Are you looking for `mapTo()`?"
            );
          return n.lift(new k(t, e));
        };
      }
      class k {
        constructor(t, e) {
          (this.project = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new A(t, this.project, this.thisArg));
        }
      }
      class A extends f {
        constructor(t, e, n) {
          super(t),
            (this.project = e),
            (this.count = 0),
            (this.thisArg = n || this);
        }
        _next(t) {
          let e;
          try {
            e = this.project.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          this.destination.next(e);
        }
      }
      const I = t => e => {
        for (let n = 0, s = t.length; n < s && !e.closed; n++) e.next(t[n]);
        e.complete();
      };
      function O() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      }
      const N = O(),
        D = t => t && "number" == typeof t.length && "function" != typeof t;
      function P(t) {
        return (
          !!t && "function" != typeof t.subscribe && "function" == typeof t.then
        );
      }
      const F = t => {
        if (t && "function" == typeof t[g])
          return (
            (s = t),
            t => {
              const e = s[g]();
              if ("function" != typeof e.subscribe)
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              return e.subscribe(t);
            }
          );
        if (D(t)) return I(t);
        if (P(t))
          return (
            (n = t),
            t => (
              n
                .then(
                  e => {
                    t.closed || (t.next(e), t.complete());
                  },
                  e => t.error(e)
                )
                .then(null, o),
              t
            )
          );
        if (t && "function" == typeof t[N])
          return (
            (e = t),
            t => {
              const n = e[N]();
              for (;;) {
                let e;
                try {
                  e = n.next();
                } catch (s) {
                  return t.error(s), t;
                }
                if (e.done) {
                  t.complete();
                  break;
                }
                if ((t.next(e.value), t.closed)) break;
              }
              return (
                "function" == typeof n.return &&
                  t.add(() => {
                    n.return && n.return();
                  }),
                t
              );
            }
          );
        {
          const e = c(t) ? "an invalid object" : `'${t}'`;
          throw new TypeError(
            `You provided ${e} where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.`
          );
        }
        var e, n, s;
      };
      function R(t, e) {
        return new _(n => {
          const s = new h();
          let r = 0;
          return (
            s.add(
              e.schedule(function() {
                r !== t.length
                  ? (n.next(t[r++]), n.closed || s.add(this.schedule()))
                  : n.complete();
              })
            ),
            s
          );
        });
      }
      function M(t, e) {
        return e
          ? (function(t, e) {
              if (null != t) {
                if (
                  (function(t) {
                    return t && "function" == typeof t[g];
                  })(t)
                )
                  return (function(t, e) {
                    return new _(n => {
                      const s = new h();
                      return (
                        s.add(
                          e.schedule(() => {
                            const r = t[g]();
                            s.add(
                              r.subscribe({
                                next(t) {
                                  s.add(e.schedule(() => n.next(t)));
                                },
                                error(t) {
                                  s.add(e.schedule(() => n.error(t)));
                                },
                                complete() {
                                  s.add(e.schedule(() => n.complete()));
                                }
                              })
                            );
                          })
                        ),
                        s
                      );
                    });
                  })(t, e);
                if (P(t))
                  return (function(t, e) {
                    return new _(n => {
                      const s = new h();
                      return (
                        s.add(
                          e.schedule(() =>
                            t.then(
                              t => {
                                s.add(
                                  e.schedule(() => {
                                    n.next(t),
                                      s.add(e.schedule(() => n.complete()));
                                  })
                                );
                              },
                              t => {
                                s.add(e.schedule(() => n.error(t)));
                              }
                            )
                          )
                        ),
                        s
                      );
                    });
                  })(t, e);
                if (D(t)) return R(t, e);
                if (
                  (function(t) {
                    return t && "function" == typeof t[N];
                  })(t) ||
                  "string" == typeof t
                )
                  return (function(t, e) {
                    if (!t) throw new Error("Iterable cannot be null");
                    return new _(n => {
                      const s = new h();
                      let r;
                      return (
                        s.add(() => {
                          r && "function" == typeof r.return && r.return();
                        }),
                        s.add(
                          e.schedule(() => {
                            (r = t[N]()),
                              s.add(
                                e.schedule(function() {
                                  if (n.closed) return;
                                  let t, e;
                                  try {
                                    const n = r.next();
                                    (t = n.value), (e = n.done);
                                  } catch (s) {
                                    return void n.error(s);
                                  }
                                  e
                                    ? n.complete()
                                    : (n.next(t), this.schedule());
                                })
                              );
                          })
                        ),
                        s
                      );
                    });
                  })(t, e);
              }
              throw new TypeError(
                ((null !== t && typeof t) || t) + " is not observable"
              );
            })(t, e)
          : t instanceof _
          ? t
          : new _(F(t));
      }
      class V extends f {
        constructor(t) {
          super(), (this.parent = t);
        }
        _next(t) {
          this.parent.notifyNext(t);
        }
        _error(t) {
          this.parent.notifyError(t), this.unsubscribe();
        }
        _complete() {
          this.parent.notifyComplete(), this.unsubscribe();
        }
      }
      class j extends f {
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyError(t) {
          this.destination.error(t);
        }
        notifyComplete() {
          this.destination.complete();
        }
      }
      function L(t, e) {
        if (e.closed) return;
        if (t instanceof _) return t.subscribe(e);
        let n;
        try {
          n = F(t)(e);
        } catch (s) {
          e.error(s);
        }
        return n;
      }
      function B(t, e, n = Number.POSITIVE_INFINITY) {
        return "function" == typeof e
          ? s =>
              s.pipe(
                B((n, s) => M(t(n, s)).pipe(x((t, r) => e(n, t, s, r))), n)
              )
          : ("number" == typeof e && (n = e), e => e.lift(new H(t, n)));
      }
      class H {
        constructor(t, e = Number.POSITIVE_INFINITY) {
          (this.project = t), (this.concurrent = e);
        }
        call(t, e) {
          return e.subscribe(new z(t, this.project, this.concurrent));
        }
      }
      class z extends j {
        constructor(t, e, n = Number.POSITIVE_INFINITY) {
          super(t),
            (this.project = e),
            (this.concurrent = n),
            (this.hasCompleted = !1),
            (this.buffer = []),
            (this.active = 0),
            (this.index = 0);
        }
        _next(t) {
          this.active < this.concurrent
            ? this._tryNext(t)
            : this.buffer.push(t);
        }
        _tryNext(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (s) {
            return void this.destination.error(s);
          }
          this.active++, this._innerSub(e);
        }
        _innerSub(t) {
          const e = new V(this),
            n = this.destination;
          n.add(e);
          const s = L(t, e);
          s !== e && n.add(s);
        }
        _complete() {
          (this.hasCompleted = !0),
            0 === this.active &&
              0 === this.buffer.length &&
              this.destination.complete(),
            this.unsubscribe();
        }
        notifyNext(t) {
          this.destination.next(t);
        }
        notifyComplete() {
          const t = this.buffer;
          this.active--,
            t.length > 0
              ? this._next(t.shift())
              : 0 === this.active &&
                this.hasCompleted &&
                this.destination.complete();
        }
      }
      function q(t, e) {
        return e ? R(t, e) : new _(I(t));
      }
      function $(...t) {
        let e = Number.POSITIVE_INFINITY,
          n = null,
          s = t[t.length - 1];
        return (
          T(s)
            ? ((n = t.pop()),
              t.length > 1 &&
                "number" == typeof t[t.length - 1] &&
                (e = t.pop()))
            : "number" == typeof s && (e = t.pop()),
          null === n && 1 === t.length && t[0] instanceof _
            ? t[0]
            : (function(t = Number.POSITIVE_INFINITY) {
                return B(y, t);
              })(e)(q(t, n))
        );
      }
      function U() {
        return function(t) {
          return t.lift(new W(t));
        };
      }
      class W {
        constructor(t) {
          this.connectable = t;
        }
        call(t, e) {
          const { connectable: n } = this;
          n._refCount++;
          const s = new Q(t, n),
            r = e.subscribe(s);
          return s.closed || (s.connection = n.connect()), r;
        }
      }
      class Q extends f {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _unsubscribe() {
          const { connectable: t } = this;
          if (!t) return void (this.connection = null);
          this.connectable = null;
          const e = t._refCount;
          if (e <= 0) return void (this.connection = null);
          if (((t._refCount = e - 1), e > 1))
            return void (this.connection = null);
          const { connection: n } = this,
            s = t._connection;
          (this.connection = null), !s || (n && s !== n) || s.unsubscribe();
        }
      }
      class Z extends _ {
        constructor(t, e) {
          super(),
            (this.source = t),
            (this.subjectFactory = e),
            (this._refCount = 0),
            (this._isComplete = !1);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (t && !t.isStopped) || (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        connect() {
          let t = this._connection;
          return (
            t ||
              ((this._isComplete = !1),
              (t = this._connection = new h()),
              t.add(this.source.subscribe(new G(this.getSubject(), this))),
              t.closed && ((this._connection = null), (t = h.EMPTY))),
            t
          );
        }
        refCount() {
          return U()(this);
        }
      }
      const K = (() => {
        const t = Z.prototype;
        return {
          operator: { value: null },
          _refCount: { value: 0, writable: !0 },
          _subject: { value: null, writable: !0 },
          _connection: { value: null, writable: !0 },
          _subscribe: { value: t._subscribe },
          _isComplete: { value: t._isComplete, writable: !0 },
          getSubject: { value: t.getSubject },
          connect: { value: t.connect },
          refCount: { value: t.refCount }
        };
      })();
      class G extends C {
        constructor(t, e) {
          super(t), (this.connectable = e);
        }
        _error(t) {
          this._unsubscribe(), super._error(t);
        }
        _complete() {
          (this.connectable._isComplete = !0),
            this._unsubscribe(),
            super._complete();
        }
        _unsubscribe() {
          const t = this.connectable;
          if (t) {
            this.connectable = null;
            const e = t._connection;
            (t._refCount = 0),
              (t._subject = null),
              (t._connection = null),
              e && e.unsubscribe();
          }
        }
      }
      function Y() {
        return new E();
      }
      function J() {
        return t => {
          return U()(
            ((e = Y),
            function(t) {
              let n;
              n =
                "function" == typeof e
                  ? e
                  : function() {
                      return e;
                    };
              const s = Object.create(t, K);
              return (s.source = t), (s.subjectFactory = n), s;
            })(t)
          );
          var e;
        };
      }
      function X(t) {
        for (let e in t) if (t[e] === X) return e;
        throw Error("Could not find renamed property on target object.");
      }
      function tt(t, e) {
        for (const n in e)
          e.hasOwnProperty(n) && !t.hasOwnProperty(n) && (t[n] = e[n]);
      }
      function et(t) {
        if ("string" == typeof t) return t;
        if (Array.isArray(t)) return "[" + t.map(et).join(", ") + "]";
        if (null == t) return "" + t;
        if (t.overriddenName) return "" + t.overriddenName;
        if (t.name) return "" + t.name;
        const e = t.toString();
        if (null == e) return "" + e;
        const n = e.indexOf("\n");
        return -1 === n ? e : e.substring(0, n);
      }
      function nt(t, e) {
        return null == t || "" === t
          ? null === e
            ? ""
            : e
          : null == e || "" === e
          ? t
          : t + " " + e;
      }
      const st = X({ __forward_ref__: X });
      function rt(t) {
        return (
          (t.__forward_ref__ = rt),
          (t.toString = function() {
            return et(this());
          }),
          t
        );
      }
      function it(t) {
        return ot(t) ? t() : t;
      }
      function ot(t) {
        return (
          "function" == typeof t &&
          t.hasOwnProperty(st) &&
          t.__forward_ref__ === rt
        );
      }
      function at(t) {
        return {
          token: t.token,
          providedIn: t.providedIn || null,
          factory: t.factory,
          value: void 0
        };
      }
      function lt(t) {
        return {
          factory: t.factory,
          providers: t.providers || [],
          imports: t.imports || []
        };
      }
      function ct(t) {
        return ut(t, dt) || ut(t, ft);
      }
      function ut(t, e) {
        return t.hasOwnProperty(e) ? t[e] : null;
      }
      function ht(t) {
        return t && (t.hasOwnProperty(pt) || t.hasOwnProperty(mt))
          ? t[pt]
          : null;
      }
      const dt = X({ ɵprov: X }),
        pt = X({ ɵinj: X }),
        ft = X({ ngInjectableDef: X }),
        mt = X({ ngInjectorDef: X });
      var gt = (function(t) {
        return (
          (t[(t.Default = 0)] = "Default"),
          (t[(t.Host = 1)] = "Host"),
          (t[(t.Self = 2)] = "Self"),
          (t[(t.SkipSelf = 4)] = "SkipSelf"),
          (t[(t.Optional = 8)] = "Optional"),
          t
        );
      })({});
      let yt;
      function _t(t) {
        const e = yt;
        return (yt = t), e;
      }
      function bt(t, e, n) {
        const s = ct(t);
        if (s && "root" == s.providedIn)
          return void 0 === s.value ? (s.value = s.factory()) : s.value;
        if (n & gt.Optional) return null;
        if (void 0 !== e) return e;
        throw new Error(`Injector: NOT_FOUND [${et(t)}]`);
      }
      function vt(t) {
        return { toString: t }.toString();
      }
      var wt = (function(t) {
          return (
            (t[(t.OnPush = 0)] = "OnPush"), (t[(t.Default = 1)] = "Default"), t
          );
        })({}),
        Ct = (function(t) {
          return (
            (t[(t.Emulated = 0)] = "Emulated"),
            (t[(t.None = 2)] = "None"),
            (t[(t.ShadowDom = 3)] = "ShadowDom"),
            t
          );
        })({});
      const Et = "undefined" != typeof globalThis && globalThis,
        St = "undefined" != typeof window && window,
        Tt =
          "undefined" != typeof self &&
          "undefined" != typeof WorkerGlobalScope &&
          self instanceof WorkerGlobalScope &&
          self,
        xt = "undefined" != typeof global && global,
        kt = Et || xt || St || Tt,
        At = {},
        It = [],
        Ot = X({ ɵcmp: X }),
        Nt = X({ ɵdir: X }),
        Dt = X({ ɵpipe: X }),
        Pt = X({ ɵmod: X }),
        Ft = X({ ɵloc: X }),
        Rt = X({ ɵfac: X }),
        Mt = X({ __NG_ELEMENT_ID__: X });
      let Vt = 0;
      function jt(t) {
        return vt(() => {
          const e = {},
            n = {
              type: t.type,
              providersResolver: null,
              decls: t.decls,
              vars: t.vars,
              factory: null,
              template: t.template || null,
              consts: t.consts || null,
              ngContentSelectors: t.ngContentSelectors,
              hostBindings: t.hostBindings || null,
              hostVars: t.hostVars || 0,
              hostAttrs: t.hostAttrs || null,
              contentQueries: t.contentQueries || null,
              declaredInputs: e,
              inputs: null,
              outputs: null,
              exportAs: t.exportAs || null,
              onPush: t.changeDetection === wt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              selectors: t.selectors || It,
              viewQuery: t.viewQuery || null,
              features: t.features || null,
              data: t.data || {},
              encapsulation: t.encapsulation || Ct.Emulated,
              id: "c",
              styles: t.styles || It,
              _: null,
              setInput: null,
              schemas: t.schemas || null,
              tView: null
            },
            s = t.directives,
            r = t.features,
            i = t.pipes;
          return (
            (n.id += Vt++),
            (n.inputs = qt(t.inputs, e)),
            (n.outputs = qt(t.outputs)),
            r && r.forEach(t => t(n)),
            (n.directiveDefs = s
              ? () => ("function" == typeof s ? s() : s).map(Lt)
              : null),
            (n.pipeDefs = i
              ? () => ("function" == typeof i ? i() : i).map(Bt)
              : null),
            n
          );
        });
      }
      function Lt(t) {
        return (
          Ut(t) ||
          (function(t) {
            return t[Nt] || null;
          })(t)
        );
      }
      function Bt(t) {
        return (function(t) {
          return t[Dt] || null;
        })(t);
      }
      const Ht = {};
      function zt(t) {
        const e = {
          type: t.type,
          bootstrap: t.bootstrap || It,
          declarations: t.declarations || It,
          imports: t.imports || It,
          exports: t.exports || It,
          transitiveCompileScopes: null,
          schemas: t.schemas || null,
          id: t.id || null
        };
        return (
          null != t.id &&
            vt(() => {
              Ht[t.id] = t.type;
            }),
          e
        );
      }
      function qt(t, e) {
        if (null == t) return At;
        const n = {};
        for (const s in t)
          if (t.hasOwnProperty(s)) {
            let r = t[s],
              i = r;
            Array.isArray(r) && ((i = r[1]), (r = r[0])),
              (n[r] = s),
              e && (e[r] = i);
          }
        return n;
      }
      const $t = jt;
      function Ut(t) {
        return t[Ot] || null;
      }
      function Wt(t, e) {
        const n = t[Pt] || null;
        if (!n && !0 === e)
          throw new Error(`Type ${et(t)} does not have '\u0275mod' property.`);
        return n;
      }
      const Qt = 20,
        Zt = 10;
      function Kt(t) {
        return Array.isArray(t) && "object" == typeof t[1];
      }
      function Gt(t) {
        return Array.isArray(t) && !0 === t[1];
      }
      function Yt(t) {
        return 0 != (8 & t.flags);
      }
      function Jt(t) {
        return 2 == (2 & t.flags);
      }
      function Xt(t) {
        return 1 == (1 & t.flags);
      }
      function te(t) {
        return null !== t.template;
      }
      function ee(t, e) {
        return t.hasOwnProperty(Rt) ? t[Rt] : null;
      }
      class ne extends Error {
        constructor(t, e) {
          super(
            (function(t, e) {
              return `${t ? `NG0${t}: ` : ""}${e}`;
            })(t, e)
          ),
            (this.code = t);
        }
      }
      function se(t) {
        return "string" == typeof t ? t : null == t ? "" : String(t);
      }
      function re(t) {
        return "function" == typeof t
          ? t.name || t.toString()
          : "object" == typeof t && null != t && "function" == typeof t.type
          ? t.type.name || t.type.toString()
          : se(t);
      }
      function ie(t, e) {
        const n = e ? " in " + e : "";
        throw new ne("201", `No provider for ${re(t)} found${n}`);
      }
      class oe {
        constructor(t, e, n) {
          (this.previousValue = t),
            (this.currentValue = e),
            (this.firstChange = n);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function ae() {
        return le;
      }
      function le(t) {
        return t.type.prototype.ngOnChanges && (t.setInput = ue), ce;
      }
      function ce() {
        const t = he(this),
          e = null == t ? void 0 : t.current;
        if (e) {
          const n = t.previous;
          if (n === At) t.previous = e;
          else for (let t in e) n[t] = e[t];
          (t.current = null), this.ngOnChanges(e);
        }
      }
      function ue(t, e, n, s) {
        const r =
            he(t) ||
            (function(t, e) {
              return (t.__ngSimpleChanges__ = e);
            })(t, { previous: At, current: null }),
          i = r.current || (r.current = {}),
          o = r.previous,
          a = this.declaredInputs[n],
          l = o[a];
        (i[a] = new oe(l && l.currentValue, e, o === At)), (t[s] = e);
      }
      function he(t) {
        return t.__ngSimpleChanges__ || null;
      }
      ae.ngInherit = !0;
      let de = void 0;
      function pe(t) {
        return !!t.listen;
      }
      const fe = {
        createRenderer: (t, e) =>
          void 0 !== de
            ? de
            : "undefined" != typeof document
            ? document
            : void 0
      };
      function me(t) {
        for (; Array.isArray(t); ) t = t[0];
        return t;
      }
      function ge(t, e) {
        return me(e[t]);
      }
      function ye(t, e) {
        return me(e[t.index]);
      }
      function _e(t, e) {
        return t.data[e];
      }
      function be(t, e) {
        const n = e[t];
        return Kt(n) ? n : n[0];
      }
      function ve(t) {
        const e = (function(t) {
          return t.__ngContext__ || null;
        })(t);
        return e ? (Array.isArray(e) ? e : e.lView) : null;
      }
      function we(t) {
        return 4 == (4 & t[2]);
      }
      function Ce(t) {
        return 128 == (128 & t[2]);
      }
      function Ee(t, e) {
        return null == e ? null : t[e];
      }
      function Se(t) {
        t[18] = 0;
      }
      function Te(t, e) {
        t[5] += e;
        let n = t,
          s = t[3];
        for (
          ;
          null !== s && ((1 === e && 1 === n[5]) || (-1 === e && 0 === n[5]));

        )
          (s[5] += e), (n = s), (s = s[3]);
      }
      const xe = {
        lFrame: We(null),
        bindingsEnabled: !0,
        isInCheckNoChangesMode: !1
      };
      function ke() {
        return xe.bindingsEnabled;
      }
      function Ae() {
        return xe.lFrame.lView;
      }
      function Ie() {
        return xe.lFrame.tView;
      }
      function Oe() {
        let t = Ne();
        for (; null !== t && 64 === t.type; ) t = t.parent;
        return t;
      }
      function Ne() {
        return xe.lFrame.currentTNode;
      }
      function De(t, e) {
        const n = xe.lFrame;
        (n.currentTNode = t), (n.isParent = e);
      }
      function Pe() {
        return xe.lFrame.isParent;
      }
      function Fe() {
        xe.lFrame.isParent = !1;
      }
      function Re() {
        return xe.isInCheckNoChangesMode;
      }
      function Me(t) {
        xe.isInCheckNoChangesMode = t;
      }
      function Ve() {
        return xe.lFrame.bindingIndex++;
      }
      function je(t, e) {
        const n = xe.lFrame;
        (n.bindingIndex = n.bindingRootIndex = t), Le(e);
      }
      function Le(t) {
        xe.lFrame.currentDirectiveIndex = t;
      }
      function Be() {
        return xe.lFrame.currentQueryIndex;
      }
      function He(t) {
        xe.lFrame.currentQueryIndex = t;
      }
      function ze(t) {
        const e = t[1];
        return 2 === e.type ? e.declTNode : 1 === e.type ? t[6] : null;
      }
      function qe(t, e, n) {
        if (n & gt.SkipSelf) {
          let s = e,
            r = t;
          for (
            ;
            (s = s.parent),
              !(
                null !== s ||
                n & gt.Host ||
                ((s = ze(r)), null === s) ||
                ((r = r[15]), 10 & s.type)
              );

          );
          if (null === s) return !1;
          (e = s), (t = r);
        }
        const s = (xe.lFrame = Ue());
        return (s.currentTNode = e), (s.lView = t), !0;
      }
      function $e(t) {
        const e = Ue(),
          n = t[1];
        (xe.lFrame = e),
          (e.currentTNode = n.firstChild),
          (e.lView = t),
          (e.tView = n),
          (e.contextLView = t),
          (e.bindingIndex = n.bindingStartIndex),
          (e.inI18n = !1);
      }
      function Ue() {
        const t = xe.lFrame,
          e = null === t ? null : t.child;
        return null === e ? We(t) : e;
      }
      function We(t) {
        const e = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: t,
          child: null,
          inI18n: !1
        };
        return null !== t && (t.child = e), e;
      }
      function Qe() {
        const t = xe.lFrame;
        return (
          (xe.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t
        );
      }
      const Ze = Qe;
      function Ke() {
        const t = Qe();
        (t.isParent = !0),
          (t.tView = null),
          (t.selectedIndex = -1),
          (t.contextLView = null),
          (t.elementDepthCount = 0),
          (t.currentDirectiveIndex = -1),
          (t.currentNamespace = null),
          (t.bindingRootIndex = -1),
          (t.bindingIndex = -1),
          (t.currentQueryIndex = 0);
      }
      function Ge() {
        return xe.lFrame.selectedIndex;
      }
      function Ye(t) {
        xe.lFrame.selectedIndex = t;
      }
      function Je() {
        const t = xe.lFrame;
        return _e(t.tView, t.selectedIndex);
      }
      function Xe(t, e) {
        for (let n = e.directiveStart, s = e.directiveEnd; n < s; n++) {
          const e = t.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: r,
              ngAfterViewInit: i,
              ngAfterViewChecked: o,
              ngOnDestroy: a
            } = e;
          s && (t.contentHooks || (t.contentHooks = [])).push(-n, s),
            r &&
              ((t.contentHooks || (t.contentHooks = [])).push(n, r),
              (t.contentCheckHooks || (t.contentCheckHooks = [])).push(n, r)),
            i && (t.viewHooks || (t.viewHooks = [])).push(-n, i),
            o &&
              ((t.viewHooks || (t.viewHooks = [])).push(n, o),
              (t.viewCheckHooks || (t.viewCheckHooks = [])).push(n, o)),
            null != a && (t.destroyHooks || (t.destroyHooks = [])).push(n, a);
        }
      }
      function tn(t, e, n) {
        sn(t, e, 3, n);
      }
      function en(t, e, n, s) {
        (3 & t[2]) === n && sn(t, e, n, s);
      }
      function nn(t, e) {
        let n = t[2];
        (3 & n) === e && ((n &= 2047), (n += 1), (t[2] = n));
      }
      function sn(t, e, n, s) {
        const r = null != s ? s : -1,
          i = e.length - 1;
        let o = 0;
        for (let a = void 0 !== s ? 65535 & t[18] : 0; a < i; a++)
          if ("number" == typeof e[a + 1]) {
            if (((o = e[a]), null != s && o >= s)) break;
          } else
            e[a] < 0 && (t[18] += 65536),
              (o < r || -1 == r) &&
                (rn(t, n, e, a), (t[18] = (4294901760 & t[18]) + a + 2)),
              a++;
      }
      function rn(t, e, n, s) {
        const r = n[s] < 0,
          i = n[s + 1],
          o = t[r ? -n[s] : n[s]];
        r
          ? t[2] >> 11 < t[18] >> 16 &&
            (3 & t[2]) === e &&
            ((t[2] += 2048), i.call(o))
          : i.call(o);
      }
      const on = -1;
      class an {
        constructor(t, e, n) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = e),
            (this.injectImpl = n);
        }
      }
      function ln(t, e, n) {
        const s = pe(t);
        let r = 0;
        for (; r < n.length; ) {
          const i = n[r];
          if ("number" == typeof i) {
            if (0 !== i) break;
            r++;
            const o = n[r++],
              a = n[r++],
              l = n[r++];
            s ? t.setAttribute(e, a, l, o) : e.setAttributeNS(o, a, l);
          } else {
            const o = i,
              a = n[++r];
            un(o)
              ? s && t.setProperty(e, o, a)
              : s
              ? t.setAttribute(e, o, a)
              : e.setAttribute(o, a),
              r++;
          }
        }
        return r;
      }
      function cn(t) {
        return 3 === t || 4 === t || 6 === t;
      }
      function un(t) {
        return 64 === t.charCodeAt(0);
      }
      function hn(t, e) {
        if (null === e || 0 === e.length);
        else if (null === t || 0 === t.length) t = e.slice();
        else {
          let n = -1;
          for (let s = 0; s < e.length; s++) {
            const r = e[s];
            "number" == typeof r
              ? (n = r)
              : 0 === n ||
                dn(t, n, r, null, -1 === n || 2 === n ? e[++s] : null);
          }
        }
        return t;
      }
      function dn(t, e, n, s, r) {
        let i = 0,
          o = t.length;
        if (-1 === e) o = -1;
        else
          for (; i < t.length; ) {
            const n = t[i++];
            if ("number" == typeof n) {
              if (n === e) {
                o = -1;
                break;
              }
              if (n > e) {
                o = i - 1;
                break;
              }
            }
          }
        for (; i < t.length; ) {
          const e = t[i];
          if ("number" == typeof e) break;
          if (e === n) {
            if (null === s) return void (null !== r && (t[i + 1] = r));
            if (s === t[i + 1]) return void (t[i + 2] = r);
          }
          i++, null !== s && i++, null !== r && i++;
        }
        -1 !== o && (t.splice(o, 0, e), (i = o + 1)),
          t.splice(i++, 0, n),
          null !== s && t.splice(i++, 0, s),
          null !== r && t.splice(i++, 0, r);
      }
      function pn(t) {
        return t !== on;
      }
      function fn(t) {
        return 32767 & t;
      }
      function mn(t, e) {
        let n = t >> 16,
          s = e;
        for (; n > 0; ) (s = s[15]), n--;
        return s;
      }
      let gn = !0;
      function yn(t) {
        const e = gn;
        return (gn = t), e;
      }
      let _n = 0;
      function bn(t, e) {
        const n = wn(t, e);
        if (-1 !== n) return n;
        const s = e[1];
        s.firstCreatePass &&
          ((t.injectorIndex = e.length),
          vn(s.data, t),
          vn(e, null),
          vn(s.blueprint, null));
        const r = Cn(t, e),
          i = t.injectorIndex;
        if (pn(r)) {
          const t = fn(r),
            n = mn(r, e),
            s = n[1].data;
          for (let r = 0; r < 8; r++) e[i + r] = n[t + r] | s[t + r];
        }
        return (e[i + 8] = r), i;
      }
      function vn(t, e) {
        t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
      }
      function wn(t, e) {
        return -1 === t.injectorIndex ||
          (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
          null === e[t.injectorIndex + 8]
          ? -1
          : t.injectorIndex;
      }
      function Cn(t, e) {
        if (t.parent && -1 !== t.parent.injectorIndex)
          return t.parent.injectorIndex;
        let n = 0,
          s = null,
          r = e;
        for (; null !== r; ) {
          const t = r[1],
            e = t.type;
          if (((s = 2 === e ? t.declTNode : 1 === e ? r[6] : null), null === s))
            return on;
          if ((n++, (r = r[15]), -1 !== s.injectorIndex))
            return s.injectorIndex | (n << 16);
        }
        return on;
      }
      function En(t, e, n) {
        !(function(t, e, n) {
          let s;
          "string" == typeof n
            ? (s = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Mt) && (s = n[Mt]),
            null == s && (s = n[Mt] = _n++);
          const r = 255 & s,
            i = 1 << r,
            o = 64 & r,
            a = 32 & r,
            l = e.data;
          128 & r
            ? o
              ? a
                ? (l[t + 7] |= i)
                : (l[t + 6] |= i)
              : a
              ? (l[t + 5] |= i)
              : (l[t + 4] |= i)
            : o
            ? a
              ? (l[t + 3] |= i)
              : (l[t + 2] |= i)
            : a
            ? (l[t + 1] |= i)
            : (l[t] |= i);
        })(t, e, n);
      }
      function Sn(t, e, n) {
        if (n & gt.Optional) return t;
        ie(e, "NodeInjector");
      }
      function Tn(t, e, n, s) {
        if (
          (n & gt.Optional && void 0 === s && (s = null),
          0 == (n & (gt.Self | gt.Host)))
        ) {
          const r = t[9],
            i = _t(void 0);
          try {
            return r ? r.get(e, s, n & gt.Optional) : bt(e, s, n & gt.Optional);
          } finally {
            _t(i);
          }
        }
        return Sn(s, e, n);
      }
      function xn(t, e, n, s = gt.Default, r) {
        if (null !== t) {
          const i = (function(t) {
            if ("string" == typeof t) return t.charCodeAt(0) || 0;
            const e = t.hasOwnProperty(Mt) ? t[Mt] : void 0;
            return "number" == typeof e ? (e >= 0 ? 255 & e : An) : e;
          })(n);
          if ("function" == typeof i) {
            if (!qe(e, t, s)) return s & gt.Host ? Sn(r, n, s) : Tn(e, n, s, r);
            try {
              const t = i();
              if (null != t || s & gt.Optional) return t;
              ie(n);
            } finally {
              Ze();
            }
          } else if ("number" == typeof i) {
            let r = null,
              o = wn(t, e),
              a = on,
              l = s & gt.Host ? e[16][6] : null;
            for (
              (-1 === o || s & gt.SkipSelf) &&
              ((a = -1 === o ? Cn(t, e) : e[o + 8]),
              a !== on && Pn(s, !1)
                ? ((r = e[1]), (o = fn(a)), (e = mn(a, e)))
                : (o = -1));
              -1 !== o;

            ) {
              const t = e[1];
              if (Dn(i, o, t.data)) {
                const t = In(o, e, n, r, s, l);
                if (t !== kn) return t;
              }
              (a = e[o + 8]),
                a !== on && Pn(s, e[1].data[o + 8] === l) && Dn(i, o, e)
                  ? ((r = t), (o = fn(a)), (e = mn(a, e)))
                  : (o = -1);
            }
          }
        }
        return Tn(e, n, s, r);
      }
      const kn = {};
      function An() {
        return new Fn(Oe(), Ae());
      }
      function In(t, e, n, s, r, i) {
        const o = e[1],
          a = o.data[t + 8],
          l = On(
            a,
            o,
            n,
            null == s ? Jt(a) && gn : s != o && 0 != (3 & a.type),
            r & gt.Host && i === a
          );
        return null !== l ? Nn(e, o, l, a) : kn;
      }
      function On(t, e, n, s, r) {
        const i = t.providerIndexes,
          o = e.data,
          a = 1048575 & i,
          l = t.directiveStart,
          c = i >> 20,
          u = r ? a + c : t.directiveEnd;
        for (let h = s ? a : a + c; h < u; h++) {
          const t = o[h];
          if ((h < l && n === t) || (h >= l && t.type === n)) return h;
        }
        if (r) {
          const t = o[l];
          if (t && te(t) && t.type === n) return l;
        }
        return null;
      }
      function Nn(t, e, n, s) {
        let r = t[n];
        const i = e.data;
        if (r instanceof an) {
          const o = r;
          o.resolving &&
            (function(t, e) {
              throw new ne(
                "200",
                "Circular dependency in DI detected for " + t
              );
            })(re(i[n]));
          const a = yn(o.canSeeViewProviders);
          o.resolving = !0;
          const l = o.injectImpl ? _t(o.injectImpl) : null;
          qe(t, s, gt.Default);
          try {
            (r = t[n] = o.factory(void 0, i, t, s)),
              e.firstCreatePass &&
                n >= s.directiveStart &&
                (function(t, e, n) {
                  const {
                    ngOnChanges: s,
                    ngOnInit: r,
                    ngDoCheck: i
                  } = e.type.prototype;
                  if (s) {
                    const s = le(e);
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(t, s),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, s);
                  }
                  r &&
                    (n.preOrderHooks || (n.preOrderHooks = [])).push(0 - t, r),
                    i &&
                      ((n.preOrderHooks || (n.preOrderHooks = [])).push(t, i),
                      (
                        n.preOrderCheckHooks || (n.preOrderCheckHooks = [])
                      ).push(t, i));
                })(n, i[n], e);
          } finally {
            null !== l && _t(l), yn(a), (o.resolving = !1), Ze();
          }
        }
        return r;
      }
      function Dn(t, e, n) {
        const s = 64 & t,
          r = 32 & t;
        let i;
        return (
          (i =
            128 & t
              ? s
                ? r
                  ? n[e + 7]
                  : n[e + 6]
                : r
                ? n[e + 5]
                : n[e + 4]
              : s
              ? r
                ? n[e + 3]
                : n[e + 2]
              : r
              ? n[e + 1]
              : n[e]),
          !!(i & (1 << t))
        );
      }
      function Pn(t, e) {
        return !(t & gt.Self || (t & gt.Host && e));
      }
      class Fn {
        constructor(t, e) {
          (this._tNode = t), (this._lView = e);
        }
        get(t, e) {
          return xn(this._tNode, this._lView, t, void 0, e);
        }
      }
      function Rn(t) {
        const e = t;
        if (ot(t))
          return () => {
            const t = Rn(it(e));
            return t ? t() : null;
          };
        let n = ee(e);
        if (null === n) {
          const t = ht(e);
          n = t && t.factory;
        }
        return n || null;
      }
      function Mn(t) {
        return vt(() => {
          const e = t.prototype.constructor,
            n = e[Rt] || Rn(e),
            s = Object.prototype;
          let r = Object.getPrototypeOf(t.prototype).constructor;
          for (; r && r !== s; ) {
            const t = r[Rt] || Rn(r);
            if (t && t !== n) return t;
            r = Object.getPrototypeOf(r);
          }
          return t => new t();
        });
      }
      const Vn = "__parameters__";
      function jn(t, e, n) {
        return vt(() => {
          const s = (function(t) {
            return function(...e) {
              if (t) {
                const n = t(...e);
                for (const t in n) this[t] = n[t];
              }
            };
          })(e);
          function r(...t) {
            if (this instanceof r) return s.apply(this, t), this;
            const e = new r(...t);
            return (n.annotation = e), n;
            function n(t, n, s) {
              const r = t.hasOwnProperty(Vn)
                ? t[Vn]
                : Object.defineProperty(t, Vn, { value: [] })[Vn];
              for (; r.length <= s; ) r.push(null);
              return (r[s] = r[s] || []).push(e), t;
            }
          }
          return (
            n && (r.prototype = Object.create(n.prototype)),
            (r.prototype.ngMetadataName = t),
            (r.annotationCls = r),
            r
          );
        });
      }
      class Ln {
        constructor(t, e) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof e
              ? (this.__NG_ELEMENT_ID__ = e)
              : void 0 !== e &&
                (this.ɵprov = at({
                  token: this,
                  providedIn: e.providedIn || "root",
                  factory: e.factory
                }));
        }
        toString() {
          return "InjectionToken " + this._desc;
        }
      }
      function Bn(t, e) {
        void 0 === e && (e = t);
        for (let n = 0; n < t.length; n++) {
          let s = t[n];
          Array.isArray(s)
            ? (e === t && (e = t.slice(0, n)), Bn(s, e))
            : e !== t && e.push(s);
        }
        return e;
      }
      function Hn(t, e) {
        t.forEach(t => (Array.isArray(t) ? Hn(t, e) : e(t)));
      }
      function zn(t, e, n) {
        e >= t.length ? t.push(n) : t.splice(e, 0, n);
      }
      function qn(t, e) {
        return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
      }
      function $n(t, e) {
        const n = [];
        for (let s = 0; s < t; s++) n.push(e);
        return n;
      }
      function Un(t, e, n) {
        let s = Qn(t, e);
        return (
          s >= 0
            ? (t[1 | s] = n)
            : ((s = ~s),
              (function(t, e, n, s) {
                let r = t.length;
                if (r == e) t.push(n, s);
                else if (1 === r) t.push(s, t[0]), (t[0] = n);
                else {
                  for (r--, t.push(t[r - 1], t[r]); r > e; )
                    (t[r] = t[r - 2]), r--;
                  (t[e] = n), (t[e + 1] = s);
                }
              })(t, s, e, n)),
          s
        );
      }
      function Wn(t, e) {
        const n = Qn(t, e);
        if (n >= 0) return t[1 | n];
      }
      function Qn(t, e) {
        return (function(t, e, n) {
          let s = 0,
            r = t.length >> 1;
          for (; r !== s; ) {
            const n = s + ((r - s) >> 1),
              i = t[n << 1];
            if (e === i) return n << 1;
            i > e ? (r = n) : (s = n + 1);
          }
          return ~(r << 1);
        })(t, e);
      }
      const Zn = jn("Inject", t => ({ token: t })),
        Kn = jn("Optional"),
        Gn = jn("Self"),
        Yn = jn("SkipSelf"),
        Jn = jn("Host"),
        Xn = {},
        ts = /\n/gm,
        es = "__source",
        ns = X({ provide: String, useValue: X });
      let ss = void 0;
      function rs(t) {
        const e = ss;
        return (ss = t), e;
      }
      function is(t, e = gt.Default) {
        if (void 0 === ss)
          throw new Error("inject() must be called from an injection context");
        return null === ss
          ? bt(t, void 0, e)
          : ss.get(t, e & gt.Optional ? null : void 0, e);
      }
      function os(t, e = gt.Default) {
        return (yt || is)(it(t), e);
      }
      const as = os;
      function ls(t) {
        const e = [];
        for (let n = 0; n < t.length; n++) {
          const s = it(t[n]);
          if (Array.isArray(s)) {
            if (0 === s.length)
              throw new Error("Arguments array must have arguments.");
            let t = void 0,
              n = gt.Default;
            for (let e = 0; e < s.length; e++) {
              const r = s[e];
              r instanceof Kn || "Optional" === r.ngMetadataName || r === Kn
                ? (n |= gt.Optional)
                : r instanceof Yn || "SkipSelf" === r.ngMetadataName || r === Yn
                ? (n |= gt.SkipSelf)
                : r instanceof Gn || "Self" === r.ngMetadataName || r === Gn
                ? (n |= gt.Self)
                : r instanceof Jn || "Host" === r.ngMetadataName || r === Jn
                ? (n |= gt.Host)
                : (t = r instanceof Zn || r === Zn ? r.token : r);
            }
            e.push(os(t, n));
          } else e.push(os(s));
        }
        return e;
      }
      let cs;
      function us(t) {
        var e;
        return (
          (null ===
            (e = (function() {
              if (void 0 === cs && ((cs = null), kt.trustedTypes))
                try {
                  cs = kt.trustedTypes.createPolicy("angular", {
                    createHTML: t => t,
                    createScript: t => t,
                    createScriptURL: t => t
                  });
                } catch (e) {}
              return cs;
            })()) || void 0 === e
            ? void 0
            : e.createHTML(t)) || t
        );
      }
      class hs {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return (
            "SafeValue must use [property]=binding: " +
            this.changingThisBreaksApplicationSecurity +
            " (see https://g.co/ng/security#xss)"
          );
        }
      }
      class ds extends hs {
        getTypeName() {
          return "HTML";
        }
      }
      class ps extends hs {
        getTypeName() {
          return "Style";
        }
      }
      class fs extends hs {
        getTypeName() {
          return "Script";
        }
      }
      class ms extends hs {
        getTypeName() {
          return "URL";
        }
      }
      class gs extends hs {
        getTypeName() {
          return "ResourceURL";
        }
      }
      function ys(t) {
        return t instanceof hs ? t.changingThisBreaksApplicationSecurity : t;
      }
      function _s(t, e) {
        const n = bs(t);
        if (null != n && n !== e) {
          if ("ResourceURL" === n && "URL" === e) return !0;
          throw new Error(
            `Required a safe ${e}, got a ${n} (see https://g.co/ng/security#xss)`
          );
        }
        return n === e;
      }
      function bs(t) {
        return (t instanceof hs && t.getTypeName()) || null;
      }
      class vs {
        constructor(t) {
          this.inertDocumentHelper = t;
        }
        getInertBodyElement(t) {
          t = "<body><remove></remove>" + t;
          try {
            const e = new window.DOMParser().parseFromString(us(t), "text/html")
              .body;
            return null === e
              ? this.inertDocumentHelper.getInertBodyElement(t)
              : (e.removeChild(e.firstChild), e);
          } catch (e) {
            return null;
          }
        }
      }
      class ws {
        constructor(t) {
          if (
            ((this.defaultDoc = t),
            (this.inertDocument = this.defaultDoc.implementation.createHTMLDocument(
              "sanitization-inert"
            )),
            null == this.inertDocument.body)
          ) {
            const t = this.inertDocument.createElement("html");
            this.inertDocument.appendChild(t);
            const e = this.inertDocument.createElement("body");
            t.appendChild(e);
          }
        }
        getInertBodyElement(t) {
          const e = this.inertDocument.createElement("template");
          if ("content" in e) return (e.innerHTML = us(t)), e;
          const n = this.inertDocument.createElement("body");
          return (
            (n.innerHTML = us(t)),
            this.defaultDoc.documentMode && this.stripCustomNsAttrs(n),
            n
          );
        }
        stripCustomNsAttrs(t) {
          const e = t.attributes;
          for (let s = e.length - 1; 0 < s; s--) {
            const n = e.item(s).name;
            ("xmlns:ns1" !== n && 0 !== n.indexOf("ns1:")) ||
              t.removeAttribute(n);
          }
          let n = t.firstChild;
          for (; n; )
            n.nodeType === Node.ELEMENT_NODE && this.stripCustomNsAttrs(n),
              (n = n.nextSibling);
        }
      }
      const Cs = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^&:/?#]*(?:[/?#]|$))/gi,
        Es = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;
      function Ss(t) {
        return (t = String(t)).match(Cs) || t.match(Es) ? t : "unsafe:" + t;
      }
      function Ts(t) {
        const e = {};
        for (const n of t.split(",")) e[n] = !0;
        return e;
      }
      function xs(...t) {
        const e = {};
        for (const n of t)
          for (const t in n) n.hasOwnProperty(t) && (e[t] = !0);
        return e;
      }
      const ks = Ts("area,br,col,hr,img,wbr"),
        As = Ts("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
        Is = Ts("rp,rt"),
        Os = xs(Is, As),
        Ns = xs(
          ks,
          xs(
            As,
            Ts(
              "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
            )
          ),
          xs(
            Is,
            Ts(
              "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
            )
          ),
          Os
        ),
        Ds = Ts("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
        Ps = Ts("srcset"),
        Fs = xs(
          Ds,
          Ps,
          Ts(
            "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
          ),
          Ts(
            "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
          )
        ),
        Rs = Ts("script,style,template");
      class Ms {
        constructor() {
          (this.sanitizedSomething = !1), (this.buf = []);
        }
        sanitizeChildren(t) {
          let e = t.firstChild,
            n = !0;
          for (; e; )
            if (
              (e.nodeType === Node.ELEMENT_NODE
                ? (n = this.startElement(e))
                : e.nodeType === Node.TEXT_NODE
                ? this.chars(e.nodeValue)
                : (this.sanitizedSomething = !0),
              n && e.firstChild)
            )
              e = e.firstChild;
            else
              for (; e; ) {
                e.nodeType === Node.ELEMENT_NODE && this.endElement(e);
                let t = this.checkClobberedElement(e, e.nextSibling);
                if (t) {
                  e = t;
                  break;
                }
                e = this.checkClobberedElement(e, e.parentNode);
              }
          return this.buf.join("");
        }
        startElement(t) {
          const e = t.nodeName.toLowerCase();
          if (!Ns.hasOwnProperty(e))
            return (this.sanitizedSomething = !0), !Rs.hasOwnProperty(e);
          this.buf.push("<"), this.buf.push(e);
          const n = t.attributes;
          for (let r = 0; r < n.length; r++) {
            const t = n.item(r),
              e = t.name,
              i = e.toLowerCase();
            if (!Fs.hasOwnProperty(i)) {
              this.sanitizedSomething = !0;
              continue;
            }
            let o = t.value;
            Ds[i] && (o = Ss(o)),
              Ps[i] &&
                ((s = o),
                (o = (s = String(s))
                  .split(",")
                  .map(t => Ss(t.trim()))
                  .join(", "))),
              this.buf.push(" ", e, '="', Ls(o), '"');
          }
          var s;
          return this.buf.push(">"), !0;
        }
        endElement(t) {
          const e = t.nodeName.toLowerCase();
          Ns.hasOwnProperty(e) &&
            !ks.hasOwnProperty(e) &&
            (this.buf.push("</"), this.buf.push(e), this.buf.push(">"));
        }
        chars(t) {
          this.buf.push(Ls(t));
        }
        checkClobberedElement(t, e) {
          if (
            e &&
            (t.compareDocumentPosition(e) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              "Failed to sanitize html because the element is clobbered: " +
                t.outerHTML
            );
          return e;
        }
      }
      const Vs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        js = /([^\#-~ |!])/g;
      function Ls(t) {
        return t
          .replace(/&/g, "&amp;")
          .replace(Vs, function(t) {
            return (
              "&#" +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ";"
            );
          })
          .replace(js, function(t) {
            return "&#" + t.charCodeAt(0) + ";";
          })
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;");
      }
      let Bs;
      function Hs(t) {
        return "content" in t &&
          (function(t) {
            return (
              t.nodeType === Node.ELEMENT_NODE && "TEMPLATE" === t.nodeName
            );
          })(t)
          ? t.content
          : null;
      }
      var zs = (function(t) {
        return (
          (t[(t.NONE = 0)] = "NONE"),
          (t[(t.HTML = 1)] = "HTML"),
          (t[(t.STYLE = 2)] = "STYLE"),
          (t[(t.SCRIPT = 3)] = "SCRIPT"),
          (t[(t.URL = 4)] = "URL"),
          (t[(t.RESOURCE_URL = 5)] = "RESOURCE_URL"),
          t
        );
      })({});
      function qs(t) {
        return t.ngDebugContext;
      }
      function $s(t) {
        return t.ngOriginalError;
      }
      function Us(t, ...e) {
        t.error(...e);
      }
      class Ws {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const e = this._findOriginalError(t),
            n = this._findContext(t),
            s = (function(t) {
              return t.ngErrorLogger || Us;
            })(t);
          s(this._console, "ERROR", t),
            e && s(this._console, "ORIGINAL ERROR", e),
            n && s(this._console, "ERROR CONTEXT", n);
        }
        _findContext(t) {
          return t ? (qs(t) ? qs(t) : this._findContext($s(t))) : null;
        }
        _findOriginalError(t) {
          let e = $s(t);
          for (; e && $s(e); ) e = $s(e);
          return e;
        }
      }
      function Qs(t, e) {
        t.__ngContext__ = e;
      }
      const Zs = (() =>
        (
          ("undefined" != typeof requestAnimationFrame &&
            requestAnimationFrame) ||
          setTimeout
        ).bind(kt))();
      function Ks(t) {
        return t instanceof Function ? t() : t;
      }
      var Gs = (function(t) {
        return (
          (t[(t.Important = 1)] = "Important"),
          (t[(t.DashCase = 2)] = "DashCase"),
          t
        );
      })({});
      function Ys(t, e) {
        return (void 0)(t, e);
      }
      function Js(t) {
        const e = t[3];
        return Gt(e) ? e[3] : e;
      }
      function Xs(t) {
        return er(t[13]);
      }
      function tr(t) {
        return er(t[4]);
      }
      function er(t) {
        for (; null !== t && !Gt(t); ) t = t[4];
        return t;
      }
      function nr(t, e, n, s, r) {
        if (null != s) {
          let i,
            o = !1;
          Gt(s) ? (i = s) : Kt(s) && ((o = !0), (s = s[0]));
          const a = me(s);
          0 === t && null !== n
            ? null == r
              ? ur(e, n, a)
              : cr(e, n, a, r || null, !0)
            : 1 === t && null !== n
            ? cr(e, n, a, r || null, !0)
            : 2 === t
            ? (function(t, e, n) {
                const s = dr(t, e);
                s &&
                  (function(t, e, n, s) {
                    pe(t) ? t.removeChild(e, n, s) : e.removeChild(n);
                  })(t, s, e, n);
              })(e, a, o)
            : 3 === t && e.destroyNode(a),
            null != i &&
              (function(t, e, n, s, r) {
                const i = n[7];
                i !== me(n) && nr(e, t, s, i, r);
                for (let o = Zt; o < n.length; o++) {
                  const r = n[o];
                  br(r[1], r, t, e, s, i);
                }
              })(e, t, i, n, r);
        }
      }
      function sr(t, e, n) {
        return pe(t)
          ? t.createElement(e, n)
          : null === n
          ? t.createElement(e)
          : t.createElementNS(n, e);
      }
      function rr(t, e) {
        const n = t[9],
          s = n.indexOf(e),
          r = e[3];
        1024 & e[2] && ((e[2] &= -1025), Te(r, -1)), n.splice(s, 1);
      }
      function ir(t, e) {
        if (t.length <= Zt) return;
        const n = Zt + e,
          s = t[n];
        if (s) {
          const i = s[17];
          null !== i && i !== t && rr(i, s), e > 0 && (t[n - 1][4] = s[4]);
          const o = qn(t, Zt + e);
          br(s[1], (r = s), r[11], 2, null, null), (r[0] = null), (r[6] = null);
          const a = o[19];
          null !== a && a.detachView(o[1]),
            (s[3] = null),
            (s[4] = null),
            (s[2] &= -129);
        }
        var r;
        return s;
      }
      function or(t, e) {
        if (!(256 & e[2])) {
          const n = e[11];
          pe(n) && n.destroyNode && br(t, e, n, 3, null, null),
            (function(t) {
              let e = t[13];
              if (!e) return ar(t[1], t);
              for (; e; ) {
                let n = null;
                if (Kt(e)) n = e[13];
                else {
                  const t = e[10];
                  t && (n = t);
                }
                if (!n) {
                  for (; e && !e[4] && e !== t; )
                    Kt(e) && ar(e[1], e), (e = e[3]);
                  null === e && (e = t), Kt(e) && ar(e[1], e), (n = e && e[4]);
                }
                e = n;
              }
            })(e);
        }
      }
      function ar(t, e) {
        if (!(256 & e[2])) {
          (e[2] &= -129),
            (e[2] |= 256),
            (function(t, e) {
              let n;
              if (null != t && null != (n = t.destroyHooks))
                for (let s = 0; s < n.length; s += 2) {
                  const t = e[n[s]];
                  if (!(t instanceof an)) {
                    const e = n[s + 1];
                    if (Array.isArray(e))
                      for (let n = 0; n < e.length; n += 2)
                        e[n + 1].call(t[e[n]]);
                    else e.call(t);
                  }
                }
            })(t, e),
            (function(t, e) {
              const n = t.cleanup,
                s = e[7];
              let r = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const t = n[i + 1],
                      o = "function" == typeof t ? t(e) : me(e[t]),
                      a = s[(r = n[i + 2])],
                      l = n[i + 3];
                    "boolean" == typeof l
                      ? o.removeEventListener(n[i], a, l)
                      : l >= 0
                      ? s[(r = l)]()
                      : s[(r = -l)].unsubscribe(),
                      (i += 2);
                  } else {
                    const t = s[(r = n[i + 1])];
                    n[i].call(t);
                  }
              if (null !== s) {
                for (let t = r + 1; t < s.length; t++) (0, s[t])();
                e[7] = null;
              }
            })(t, e),
            1 === e[1].type && pe(e[11]) && e[11].destroy();
          const n = e[17];
          if (null !== n && Gt(e[3])) {
            n !== e[3] && rr(n, e);
            const s = e[19];
            null !== s && s.detachView(t);
          }
        }
      }
      function lr(t, e, n) {
        return (function(t, e, n) {
          let s = e;
          for (; null !== s && 40 & s.type; ) s = (e = s).parent;
          if (null === s) return n[0];
          if (2 & s.flags) {
            const e = t.data[s.directiveStart].encapsulation;
            if (e === Ct.None || e === Ct.Emulated) return null;
          }
          return ye(s, n);
        })(t, e.parent, n);
      }
      function cr(t, e, n, s, r) {
        pe(t) ? t.insertBefore(e, n, s, r) : e.insertBefore(n, s, r);
      }
      function ur(t, e, n) {
        pe(t) ? t.appendChild(e, n) : e.appendChild(n);
      }
      function hr(t, e, n, s, r) {
        null !== s ? cr(t, e, n, s, r) : ur(t, e, n);
      }
      function dr(t, e) {
        return pe(t) ? t.parentNode(e) : e.parentNode;
      }
      function pr(t, e, n) {
        return fr(t, e, n);
      }
      let fr = function(t, e, n) {
        return 40 & t.type ? ye(t, n) : null;
      };
      function mr(t, e, n, s) {
        const r = lr(t, s, e),
          i = e[11],
          o = pr(s.parent || e[6], s, e);
        if (null != r)
          if (Array.isArray(n))
            for (let a = 0; a < n.length; a++) hr(i, r, n[a], o, !1);
          else hr(i, r, n, o, !1);
      }
      function gr(t, e) {
        if (null !== e) {
          const n = e.type;
          if (3 & n) return ye(e, t);
          if (4 & n) return yr(-1, t[e.index]);
          if (8 & n) {
            const n = e.child;
            if (null !== n) return gr(t, n);
            {
              const n = t[e.index];
              return Gt(n) ? yr(-1, n) : me(n);
            }
          }
          if (32 & n) return Ys(e, t)() || me(t[e.index]);
          {
            const n = t[16],
              s = n[6],
              r = Js(n),
              i = s.projection[e.projection];
            return null != i ? gr(r, i) : gr(t, e.next);
          }
        }
        return null;
      }
      function yr(t, e) {
        const n = Zt + t + 1;
        if (n < e.length) {
          const t = e[n],
            s = t[1].firstChild;
          if (null !== s) return gr(t, s);
        }
        return e[7];
      }
      function _r(t, e, n, s, r, i, o) {
        for (; null != n; ) {
          const a = s[n.index],
            l = n.type;
          if (
            (o && 0 === e && (a && Qs(me(a), s), (n.flags |= 4)),
            64 != (64 & n.flags))
          )
            if (8 & l) _r(t, e, n.child, s, r, i, !1), nr(e, t, r, a, i);
            else if (32 & l) {
              const o = Ys(n, s);
              let l;
              for (; (l = o()); ) nr(e, t, r, l, i);
              nr(e, t, r, a, i);
            } else 16 & l ? vr(t, e, s, n, r, i) : nr(e, t, r, a, i);
          n = o ? n.projectionNext : n.next;
        }
      }
      function br(t, e, n, s, r, i) {
        _r(n, s, t.firstChild, e, r, i, !1);
      }
      function vr(t, e, n, s, r, i) {
        const o = n[16],
          a = o[6].projection[s.projection];
        if (Array.isArray(a))
          for (let l = 0; l < a.length; l++) nr(e, t, r, a[l], i);
        else _r(t, e, a, o[3], r, i, !0);
      }
      function wr(t, e, n) {
        pe(t) ? t.setAttribute(e, "style", n) : (e.style.cssText = n);
      }
      function Cr(t, e, n) {
        pe(t)
          ? "" === n
            ? t.removeAttribute(e, "class")
            : t.setAttribute(e, "class", n)
          : (e.className = n);
      }
      function Er(t, e, n) {
        let s = t.length;
        for (;;) {
          const r = t.indexOf(e, n);
          if (-1 === r) return r;
          if (0 === r || t.charCodeAt(r - 1) <= 32) {
            const n = e.length;
            if (r + n === s || t.charCodeAt(r + n) <= 32) return r;
          }
          n = r + 1;
        }
      }
      const Sr = "ng-template";
      function Tr(t, e, n) {
        let s = 0;
        for (; s < t.length; ) {
          let r = t[s++];
          if (n && "class" === r) {
            if (((r = t[s]), -1 !== Er(r.toLowerCase(), e, 0))) return !0;
          } else if (1 === r) {
            for (; s < t.length && "string" == typeof (r = t[s++]); )
              if (r.toLowerCase() === e) return !0;
            return !1;
          }
        }
        return !1;
      }
      function xr(t) {
        return 4 === t.type && t.value !== Sr;
      }
      function kr(t, e, n) {
        return e === (4 !== t.type || n ? t.value : Sr);
      }
      function Ar(t, e, n) {
        let s = 4;
        const r = t.attrs || [],
          i = (function(t) {
            for (let e = 0; e < t.length; e++) if (cn(t[e])) return e;
            return t.length;
          })(r);
        let o = !1;
        for (let a = 0; a < e.length; a++) {
          const l = e[a];
          if ("number" != typeof l) {
            if (!o)
              if (4 & s) {
                if (
                  ((s = 2 | (1 & s)),
                  ("" !== l && !kr(t, l, n)) || ("" === l && 1 === e.length))
                ) {
                  if (Ir(s)) return !1;
                  o = !0;
                }
              } else {
                const c = 8 & s ? l : e[++a];
                if (8 & s && null !== t.attrs) {
                  if (!Tr(t.attrs, c, n)) {
                    if (Ir(s)) return !1;
                    o = !0;
                  }
                  continue;
                }
                const u = Or(8 & s ? "class" : l, r, xr(t), n);
                if (-1 === u) {
                  if (Ir(s)) return !1;
                  o = !0;
                  continue;
                }
                if ("" !== c) {
                  let t;
                  t = u > i ? "" : r[u + 1].toLowerCase();
                  const e = 8 & s ? t : null;
                  if ((e && -1 !== Er(e, c, 0)) || (2 & s && c !== t)) {
                    if (Ir(s)) return !1;
                    o = !0;
                  }
                }
              }
          } else {
            if (!o && !Ir(s) && !Ir(l)) return !1;
            if (o && Ir(l)) continue;
            (o = !1), (s = l | (1 & s));
          }
        }
        return Ir(s) || o;
      }
      function Ir(t) {
        return 0 == (1 & t);
      }
      function Or(t, e, n, s) {
        if (null === e) return -1;
        let r = 0;
        if (s || !n) {
          let n = !1;
          for (; r < e.length; ) {
            const s = e[r];
            if (s === t) return r;
            if (3 === s || 6 === s) n = !0;
            else {
              if (1 === s || 2 === s) {
                let t = e[++r];
                for (; "string" == typeof t; ) t = e[++r];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                r += 4;
                continue;
              }
            }
            r += n ? 1 : 2;
          }
          return -1;
        }
        return (function(t, e) {
          let n = t.indexOf(4);
          if (n > -1)
            for (n++; n < t.length; ) {
              const s = t[n];
              if ("number" == typeof s) return -1;
              if (s === e) return n;
              n++;
            }
          return -1;
        })(e, t);
      }
      function Nr(t, e, n = !1) {
        for (let s = 0; s < e.length; s++) if (Ar(t, e[s], n)) return !0;
        return !1;
      }
      function Dr(t, e) {
        t: for (let n = 0; n < e.length; n++) {
          const s = e[n];
          if (t.length === s.length) {
            for (let e = 0; e < t.length; e++) if (t[e] !== s[e]) continue t;
            return !0;
          }
        }
        return !1;
      }
      function Pr(t, e) {
        return t ? ":not(" + e.trim() + ")" : e;
      }
      function Fr(t) {
        let e = t[0],
          n = 1,
          s = 2,
          r = "",
          i = !1;
        for (; n < t.length; ) {
          let o = t[n];
          if ("string" == typeof o)
            if (2 & s) {
              const e = t[++n];
              r += "[" + o + (e.length > 0 ? '="' + e + '"' : "") + "]";
            } else 8 & s ? (r += "." + o) : 4 & s && (r += " " + o);
          else
            "" === r || Ir(o) || ((e += Pr(i, r)), (r = "")),
              (s = o),
              (i = i || !Ir(s));
          n++;
        }
        return "" !== r && (e += Pr(i, r)), e;
      }
      const Rr = {};
      function Mr(t) {
        Vr(Ie(), Ae(), Ge() + t, Re());
      }
      function Vr(t, e, n, s) {
        if (!s)
          if (3 == (3 & e[2])) {
            const s = t.preOrderCheckHooks;
            null !== s && tn(e, s, n);
          } else {
            const s = t.preOrderHooks;
            null !== s && en(e, s, 0, n);
          }
        Ye(n);
      }
      function jr(t, e) {
        return (t << 17) | (e << 2);
      }
      function Lr(t) {
        return (t >> 17) & 32767;
      }
      function Br(t) {
        return 2 | t;
      }
      function Hr(t) {
        return (131068 & t) >> 2;
      }
      function zr(t, e) {
        return (-131069 & t) | (e << 2);
      }
      function qr(t) {
        return 1 | t;
      }
      function $r(t, e) {
        const n = t.contentQueries;
        if (null !== n)
          for (let s = 0; s < n.length; s += 2) {
            const r = n[s],
              i = n[s + 1];
            if (-1 !== i) {
              const n = t.data[i];
              He(r), n.contentQueries(2, e[i], i);
            }
          }
      }
      function Ur(t, e, n, s, r, i, o, a, l, c) {
        const u = e.blueprint.slice();
        return (
          (u[0] = r),
          (u[2] = 140 | s),
          Se(u),
          (u[3] = u[15] = t),
          (u[8] = n),
          (u[10] = o || (t && t[10])),
          (u[11] = a || (t && t[11])),
          (u[12] = l || (t && t[12]) || null),
          (u[9] = c || (t && t[9]) || null),
          (u[6] = i),
          (u[16] = 2 == e.type ? t[16] : u),
          u
        );
      }
      function Wr(t, e, n, s, r) {
        let i = t.data[e];
        if (null === i)
          (i = (function(t, e, n, s, r) {
            const i = Ne(),
              o = Pe(),
              a = (t.data[e] = (function(t, e, n, s, r, i) {
                return {
                  type: n,
                  index: s,
                  insertBeforeIndex: null,
                  injectorIndex: e ? e.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: r,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tViews: null,
                  next: null,
                  projectionNext: null,
                  child: null,
                  parent: e,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0
                };
              })(0, o ? i : i && i.parent, n, e, s, r));
            return (
              null === t.firstChild && (t.firstChild = a),
              null !== i &&
                (o
                  ? null == i.child && null !== a.parent && (i.child = a)
                  : null === i.next && (i.next = a)),
              a
            );
          })(t, e, n, s, r)),
            xe.lFrame.inI18n && (i.flags |= 64);
        else if (64 & i.type) {
          (i.type = n), (i.value = s), (i.attrs = r);
          const t = (function() {
            const t = xe.lFrame,
              e = t.currentTNode;
            return t.isParent ? e : e.parent;
          })();
          i.injectorIndex = null === t ? -1 : t.injectorIndex;
        }
        return De(i, !0), i;
      }
      function Qr(t, e, n, s) {
        if (0 === n) return -1;
        const r = e.length;
        for (let i = 0; i < n; i++)
          e.push(s), t.blueprint.push(s), t.data.push(null);
        return r;
      }
      function Zr(t, e, n) {
        $e(e);
        try {
          const s = t.viewQuery;
          null !== s && Ei(1, s, n);
          const r = t.template;
          null !== r && Yr(t, e, r, 1, n),
            t.firstCreatePass && (t.firstCreatePass = !1),
            t.staticContentQueries && $r(t, e),
            t.staticViewQueries && Ei(2, t.viewQuery, n);
          const i = t.components;
          null !== i &&
            (function(t, e) {
              for (let n = 0; n < e.length; n++) _i(t, e[n]);
            })(e, i);
        } catch (s) {
          throw (t.firstCreatePass && (t.incompleteFirstPass = !0), s);
        } finally {
          (e[2] &= -5), Ke();
        }
      }
      function Kr(t, e, n, s) {
        const r = e[2];
        if (256 == (256 & r)) return;
        $e(e);
        const i = Re();
        try {
          Se(e),
            (xe.lFrame.bindingIndex = t.bindingStartIndex),
            null !== n && Yr(t, e, n, 2, s);
          const o = 3 == (3 & r);
          if (!i)
            if (o) {
              const n = t.preOrderCheckHooks;
              null !== n && tn(e, n, null);
            } else {
              const n = t.preOrderHooks;
              null !== n && en(e, n, 0, null), nn(e, 0);
            }
          if (
            ((function(t) {
              for (let e = Xs(t); null !== e; e = tr(e)) {
                if (!e[2]) continue;
                const t = e[9];
                for (let e = 0; e < t.length; e++) {
                  const n = t[e],
                    s = n[3];
                  0 == (1024 & n[2]) && Te(s, 1), (n[2] |= 1024);
                }
              }
            })(e),
            (function(t) {
              for (let e = Xs(t); null !== e; e = tr(e))
                for (let t = Zt; t < e.length; t++) {
                  const n = e[t],
                    s = n[1];
                  Ce(n) && Kr(s, n, s.template, n[8]);
                }
            })(e),
            null !== t.contentQueries && $r(t, e),
            !i)
          )
            if (o) {
              const n = t.contentCheckHooks;
              null !== n && tn(e, n);
            } else {
              const n = t.contentHooks;
              null !== n && en(e, n, 1), nn(e, 1);
            }
          !(function(t, e) {
            const n = t.hostBindingOpCodes;
            if (null !== n)
              try {
                for (let t = 0; t < n.length; t++) {
                  const s = n[t];
                  if (s < 0) Ye(~s);
                  else {
                    const r = s,
                      i = n[++t],
                      o = n[++t];
                    je(i, r), o(2, e[r]);
                  }
                }
              } finally {
                Ye(-1);
              }
          })(t, e);
          const a = t.components;
          null !== a &&
            (function(t, e) {
              for (let n = 0; n < e.length; n++) gi(t, e[n]);
            })(e, a);
          const l = t.viewQuery;
          if ((null !== l && Ei(2, l, s), !i))
            if (o) {
              const n = t.viewCheckHooks;
              null !== n && tn(e, n);
            } else {
              const n = t.viewHooks;
              null !== n && en(e, n, 2), nn(e, 2);
            }
          !0 === t.firstUpdatePass && (t.firstUpdatePass = !1),
            i || (e[2] &= -73),
            1024 & e[2] && ((e[2] &= -1025), Te(e[3], -1));
        } finally {
          Ke();
        }
      }
      function Gr(t, e, n, s) {
        const r = e[10],
          i = !Re(),
          o = we(e);
        try {
          i && !o && r.begin && r.begin(), o && Zr(t, e, s), Kr(t, e, n, s);
        } finally {
          i && !o && r.end && r.end();
        }
      }
      function Yr(t, e, n, s, r) {
        const i = Ge();
        try {
          Ye(-1), 2 & s && e.length > Qt && Vr(t, e, Qt, Re()), n(s, r);
        } finally {
          Ye(i);
        }
      }
      function Jr(t, e, n) {
        if (Yt(e)) {
          const s = e.directiveEnd;
          for (let r = e.directiveStart; r < s; r++) {
            const e = t.data[r];
            e.contentQueries && e.contentQueries(1, n[r], r);
          }
        }
      }
      function Xr(t, e, n) {
        ke() &&
          ((function(t, e, n, s) {
            const r = n.directiveStart,
              i = n.directiveEnd;
            t.firstCreatePass || bn(n, e), Qs(s, e);
            const o = n.initialInputs;
            for (let a = r; a < i; a++) {
              const s = t.data[a],
                i = te(s);
              i && di(e, n, s);
              const l = Nn(e, t, a, n);
              Qs(l, e),
                null !== o && pi(0, a - r, l, s, 0, o),
                i && (be(n.index, e)[8] = l);
            }
          })(t, e, n, ye(n, e)),
          128 == (128 & n.flags) &&
            (function(t, e, n) {
              const s = n.directiveStart,
                r = n.directiveEnd,
                i = n.index,
                o = xe.lFrame.currentDirectiveIndex;
              try {
                Ye(i);
                for (let n = s; n < r; n++) {
                  const s = t.data[n],
                    r = e[n];
                  Le(n),
                    (null === s.hostBindings &&
                      0 === s.hostVars &&
                      null === s.hostAttrs) ||
                      ai(s, r);
                }
              } finally {
                Ye(-1), Le(o);
              }
            })(t, e, n));
      }
      function ti(t, e, n = ye) {
        const s = e.localNames;
        if (null !== s) {
          let r = e.index + 1;
          for (let i = 0; i < s.length; i += 2) {
            const o = s[i + 1],
              a = -1 === o ? n(e, t) : t[o];
            t[r++] = a;
          }
        }
      }
      function ei(t) {
        const e = t.tView;
        return null === e || e.incompleteFirstPass
          ? (t.tView = ni(
              1,
              null,
              t.template,
              t.decls,
              t.vars,
              t.directiveDefs,
              t.pipeDefs,
              t.viewQuery,
              t.schemas,
              t.consts
            ))
          : e;
      }
      function ni(t, e, n, s, r, i, o, a, l, c) {
        const u = Qt + s,
          h = u + r,
          d = (function(t, e) {
            const n = [];
            for (let s = 0; s < e; s++) n.push(s < t ? null : Rr);
            return n;
          })(u, h),
          p = "function" == typeof c ? c() : c;
        return (d[1] = {
          type: t,
          blueprint: d,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: e,
          data: d.slice().fill(null, u),
          bindingStartIndex: u,
          expandoStartIndex: h,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof o ? o() : o,
          firstChild: null,
          schemas: l,
          consts: p,
          incompleteFirstPass: !1
        });
      }
      function si(t, e, n, s) {
        const r = Ti(e);
        null === n
          ? r.push(s)
          : (r.push(n), t.firstCreatePass && xi(t).push(s, r.length - 1));
      }
      function ri(t, e, n) {
        for (let s in t)
          if (t.hasOwnProperty(s)) {
            const r = t[s];
            (n = null === n ? {} : n).hasOwnProperty(s)
              ? n[s].push(e, r)
              : (n[s] = [e, r]);
          }
        return n;
      }
      function ii(t, e, n, s) {
        let r = !1;
        if (ke()) {
          const i = (function(t, e, n) {
              const s = t.directiveRegistry;
              let r = null;
              if (s)
                for (let i = 0; i < s.length; i++) {
                  const o = s[i];
                  Nr(n, o.selectors, !1) &&
                    (r || (r = []),
                    En(bn(n, e), t, o.type),
                    te(o) ? (li(t, n), r.unshift(o)) : r.push(o));
                }
              return r;
            })(t, e, n),
            o = null === s ? null : { "": -1 };
          if (null !== i) {
            (r = !0), ui(n, t.data.length, i.length);
            for (let t = 0; t < i.length; t++) {
              const e = i[t];
              e.providersResolver && e.providersResolver(e);
            }
            let s = !1,
              a = !1,
              l = Qr(t, e, i.length, null);
            for (let r = 0; r < i.length; r++) {
              const c = i[r];
              (n.mergedAttrs = hn(n.mergedAttrs, c.hostAttrs)),
                hi(t, n, e, l, c),
                ci(l, c, o),
                null !== c.contentQueries && (n.flags |= 8),
                (null === c.hostBindings &&
                  null === c.hostAttrs &&
                  0 === c.hostVars) ||
                  (n.flags |= 128);
              const u = c.type.prototype;
              !s &&
                (u.ngOnChanges || u.ngOnInit || u.ngDoCheck) &&
                ((t.preOrderHooks || (t.preOrderHooks = [])).push(n.index),
                (s = !0)),
                a ||
                  (!u.ngOnChanges && !u.ngDoCheck) ||
                  ((t.preOrderCheckHooks || (t.preOrderCheckHooks = [])).push(
                    n.index
                  ),
                  (a = !0)),
                l++;
            }
            !(function(t, e) {
              const n = e.directiveEnd,
                s = t.data,
                r = e.attrs,
                i = [];
              let o = null,
                a = null;
              for (let l = e.directiveStart; l < n; l++) {
                const t = s[l],
                  n = t.inputs,
                  c = null === r || xr(e) ? null : fi(n, r);
                i.push(c), (o = ri(n, l, o)), (a = ri(t.outputs, l, a));
              }
              null !== o &&
                (o.hasOwnProperty("class") && (e.flags |= 16),
                o.hasOwnProperty("style") && (e.flags |= 32)),
                (e.initialInputs = i),
                (e.inputs = o),
                (e.outputs = a);
            })(t, n);
          }
          o &&
            (function(t, e, n) {
              if (e) {
                const s = (t.localNames = []);
                for (let t = 0; t < e.length; t += 2) {
                  const r = n[e[t + 1]];
                  if (null == r)
                    throw new ne(
                      "301",
                      `Export of name '${e[t + 1]}' not found!`
                    );
                  s.push(e[t], r);
                }
              }
            })(n, s, o);
        }
        return (n.mergedAttrs = hn(n.mergedAttrs, n.attrs)), r;
      }
      function oi(t, e, n, s, r, i) {
        const o = i.hostBindings;
        if (o) {
          let n = t.hostBindingOpCodes;
          null === n && (n = t.hostBindingOpCodes = []);
          const i = ~e.index;
          (function(t) {
            let e = t.length;
            for (; e > 0; ) {
              const n = t[--e];
              if ("number" == typeof n && n < 0) return n;
            }
            return 0;
          })(n) != i && n.push(i),
            n.push(s, r, o);
        }
      }
      function ai(t, e) {
        null !== t.hostBindings && t.hostBindings(1, e);
      }
      function li(t, e) {
        (e.flags |= 2), (t.components || (t.components = [])).push(e.index);
      }
      function ci(t, e, n) {
        if (n) {
          if (e.exportAs)
            for (let s = 0; s < e.exportAs.length; s++) n[e.exportAs[s]] = t;
          te(e) && (n[""] = t);
        }
      }
      function ui(t, e, n) {
        (t.flags |= 1),
          (t.directiveStart = e),
          (t.directiveEnd = e + n),
          (t.providerIndexes = e);
      }
      function hi(t, e, n, s, r) {
        t.data[s] = r;
        const i = r.factory || (r.factory = ee(r.type)),
          o = new an(i, te(r), null);
        (t.blueprint[s] = o),
          (n[s] = o),
          oi(t, e, 0, s, Qr(t, n, r.hostVars, Rr), r);
      }
      function di(t, e, n) {
        const s = ye(e, t),
          r = ei(n),
          i = t[10],
          o = bi(
            t,
            Ur(
              t,
              r,
              null,
              n.onPush ? 64 : 16,
              s,
              e,
              i,
              i.createRenderer(s, n),
              null,
              null
            )
          );
        t[e.index] = o;
      }
      function pi(t, e, n, s, r, i) {
        const o = i[e];
        if (null !== o) {
          const t = s.setInput;
          for (let e = 0; e < o.length; ) {
            const r = o[e++],
              i = o[e++],
              a = o[e++];
            null !== t ? s.setInput(n, a, r, i) : (n[i] = a);
          }
        }
      }
      function fi(t, e) {
        let n = null,
          s = 0;
        for (; s < e.length; ) {
          const r = e[s];
          if (0 !== r)
            if (5 !== r) {
              if ("number" == typeof r) break;
              t.hasOwnProperty(r) &&
                (null === n && (n = []), n.push(r, t[r], e[s + 1])),
                (s += 2);
            } else s += 2;
          else s += 4;
        }
        return n;
      }
      function mi(t, e, n, s) {
        return new Array(t, !0, !1, e, null, 0, s, n, null, null);
      }
      function gi(t, e) {
        const n = be(e, t);
        if (Ce(n)) {
          const t = n[1];
          80 & n[2] ? Kr(t, n, t.template, n[8]) : n[5] > 0 && yi(n);
        }
      }
      function yi(t) {
        for (let n = Xs(t); null !== n; n = tr(n))
          for (let t = Zt; t < n.length; t++) {
            const e = n[t];
            if (1024 & e[2]) {
              const t = e[1];
              Kr(t, e, t.template, e[8]);
            } else e[5] > 0 && yi(e);
          }
        const e = t[1].components;
        if (null !== e)
          for (let n = 0; n < e.length; n++) {
            const s = be(e[n], t);
            Ce(s) && s[5] > 0 && yi(s);
          }
      }
      function _i(t, e) {
        const n = be(e, t),
          s = n[1];
        !(function(t, e) {
          for (let n = e.length; n < t.blueprint.length; n++)
            e.push(t.blueprint[n]);
        })(s, n),
          Zr(s, n, n[8]);
      }
      function bi(t, e) {
        return t[13] ? (t[14][4] = e) : (t[13] = e), (t[14] = e), e;
      }
      function vi(t) {
        for (; t; ) {
          t[2] |= 64;
          const e = Js(t);
          if (0 != (512 & t[2]) && !e) return t;
          t = e;
        }
        return null;
      }
      function wi(t, e, n) {
        const s = e[10];
        s.begin && s.begin();
        try {
          Kr(t, e, t.template, n);
        } catch (r) {
          throw (ki(e, r), r);
        } finally {
          s.end && s.end();
        }
      }
      function Ci(t) {
        !(function(t) {
          for (let e = 0; e < t.components.length; e++) {
            const n = t.components[e],
              s = ve(n),
              r = s[1];
            Gr(r, s, r.template, n);
          }
        })(t[8]);
      }
      function Ei(t, e, n) {
        He(0), e(t, n);
      }
      const Si = (() => Promise.resolve(null))();
      function Ti(t) {
        return t[7] || (t[7] = []);
      }
      function xi(t) {
        return t.cleanup || (t.cleanup = []);
      }
      function ki(t, e) {
        const n = t[9],
          s = n ? n.get(Ws, null) : null;
        s && s.handleError(e);
      }
      function Ai(t, e, n, s, r) {
        for (let i = 0; i < n.length; ) {
          const o = n[i++],
            a = n[i++],
            l = e[o],
            c = t.data[o];
          null !== c.setInput ? c.setInput(l, r, s, a) : (l[a] = r);
        }
      }
      function Ii(t, e, n) {
        let s = n ? t.styles : null,
          r = n ? t.classes : null,
          i = 0;
        if (null !== e)
          for (let o = 0; o < e.length; o++) {
            const t = e[o];
            "number" == typeof t
              ? (i = t)
              : 1 == i
              ? (r = nt(r, t))
              : 2 == i && (s = nt(s, t + ": " + e[++o] + ";"));
          }
        n ? (t.styles = s) : (t.stylesWithoutHost = s),
          n ? (t.classes = r) : (t.classesWithoutHost = r);
      }
      const Oi = new Ln("INJECTOR", -1);
      class Ni {
        get(t, e = Xn) {
          if (e === Xn) {
            const e = new Error(`NullInjectorError: No provider for ${et(t)}!`);
            throw ((e.name = "NullInjectorError"), e);
          }
          return e;
        }
      }
      const Di = new Ln("Set Injector scope."),
        Pi = {},
        Fi = {},
        Ri = [];
      let Mi = void 0;
      function Vi() {
        return void 0 === Mi && (Mi = new Ni()), Mi;
      }
      function ji(t, e = null, n = null, s) {
        return new Li(t, n, e || Vi(), s);
      }
      class Li {
        constructor(t, e, n, s = null) {
          (this.parent = n),
            (this.records = new Map()),
            (this.injectorDefTypes = new Set()),
            (this.onDestroy = new Set()),
            (this._destroyed = !1);
          const r = [];
          e && Hn(e, n => this.processProvider(n, t, e)),
            Hn([t], t => this.processInjectorType(t, [], r)),
            this.records.set(Oi, zi(void 0, this));
          const i = this.records.get(Di);
          (this.scope = null != i ? i.value : null),
            (this.source = s || ("object" == typeof t ? null : et(t)));
        }
        get destroyed() {
          return this._destroyed;
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            this.onDestroy.forEach(t => t.ngOnDestroy());
          } finally {
            this.records.clear(),
              this.onDestroy.clear(),
              this.injectorDefTypes.clear();
          }
        }
        get(t, e = Xn, n = gt.Default) {
          this.assertNotDestroyed();
          const s = rs(this);
          try {
            if (!(n & gt.SkipSelf)) {
              let e = this.records.get(t);
              if (void 0 === e) {
                const n =
                  ("function" == typeof (r = t) ||
                    ("object" == typeof r && r instanceof Ln)) &&
                  ct(t);
                (e = n && this.injectableDefInScope(n) ? zi(Bi(t), Pi) : null),
                  this.records.set(t, e);
              }
              if (null != e) return this.hydrate(t, e);
            }
            return (n & gt.Self ? Vi() : this.parent).get(
              t,
              (e = n & gt.Optional && e === Xn ? null : e)
            );
          } catch (i) {
            if ("NullInjectorError" === i.name) {
              if (
                ((i.ngTempTokenPath = i.ngTempTokenPath || []).unshift(et(t)),
                s)
              )
                throw i;
              return (function(t, e, n, s) {
                const r = t.ngTempTokenPath;
                throw (e[es] && r.unshift(e[es]),
                (t.message = (function(t, e, n, s = null) {
                  t =
                    t && "\n" === t.charAt(0) && "\u0275" == t.charAt(1)
                      ? t.substr(2)
                      : t;
                  let r = et(e);
                  if (Array.isArray(e)) r = e.map(et).join(" -> ");
                  else if ("object" == typeof e) {
                    let t = [];
                    for (let n in e)
                      if (e.hasOwnProperty(n)) {
                        let s = e[n];
                        t.push(
                          n +
                            ":" +
                            ("string" == typeof s ? JSON.stringify(s) : et(s))
                        );
                      }
                    r = `{${t.join(", ")}}`;
                  }
                  return `${n}${s ? "(" + s + ")" : ""}[${r}]: ${t.replace(
                    ts,
                    "\n  "
                  )}`;
                })("\n" + t.message, r, n, s)),
                (t.ngTokenPath = r),
                (t.ngTempTokenPath = null),
                t);
              })(i, t, "R3InjectorError", this.source);
            }
            throw i;
          } finally {
            rs(s);
          }
          var r;
        }
        _resolveInjectorDefTypes() {
          this.injectorDefTypes.forEach(t => this.get(t));
        }
        toString() {
          const t = [];
          return (
            this.records.forEach((e, n) => t.push(et(n))),
            `R3Injector[${t.join(", ")}]`
          );
        }
        assertNotDestroyed() {
          if (this._destroyed)
            throw new Error("Injector has already been destroyed.");
        }
        processInjectorType(t, e, n) {
          if (!(t = it(t))) return !1;
          let s = ht(t);
          const r = (null == s && t.ngModule) || void 0,
            i = void 0 === r ? t : r,
            o = -1 !== n.indexOf(i);
          if ((void 0 !== r && (s = ht(r)), null == s)) return !1;
          if (null != s.imports && !o) {
            let t;
            n.push(i);
            try {
              Hn(s.imports, s => {
                this.processInjectorType(s, e, n) &&
                  (void 0 === t && (t = []), t.push(s));
              });
            } finally {
            }
            if (void 0 !== t)
              for (let e = 0; e < t.length; e++) {
                const { ngModule: n, providers: s } = t[e];
                Hn(s, t => this.processProvider(t, n, s || Ri));
              }
          }
          this.injectorDefTypes.add(i), this.records.set(i, zi(s.factory, Pi));
          const a = s.providers;
          if (null != a && !o) {
            const e = t;
            Hn(a, t => this.processProvider(t, e, a));
          }
          return void 0 !== r && void 0 !== t.providers;
        }
        processProvider(t, e, n) {
          let s = $i((t = it(t))) ? t : it(t && t.provide);
          const r = (function(t, e, n) {
            return qi(t) ? zi(void 0, t.useValue) : zi(Hi(t), Pi);
          })(t);
          if ($i(t) || !0 !== t.multi) this.records.get(s);
          else {
            let e = this.records.get(s);
            e ||
              ((e = zi(void 0, Pi, !0)),
              (e.factory = () => ls(e.multi)),
              this.records.set(s, e)),
              (s = t),
              e.multi.push(t);
          }
          this.records.set(s, r);
        }
        hydrate(t, e) {
          var n;
          return (
            e.value === Pi && ((e.value = Fi), (e.value = e.factory())),
            "object" == typeof e.value &&
              e.value &&
              null !== (n = e.value) &&
              "object" == typeof n &&
              "function" == typeof n.ngOnDestroy &&
              this.onDestroy.add(e.value),
            e.value
          );
        }
        injectableDefInScope(t) {
          return (
            !!t.providedIn &&
            ("string" == typeof t.providedIn
              ? "any" === t.providedIn || t.providedIn === this.scope
              : this.injectorDefTypes.has(t.providedIn))
          );
        }
      }
      function Bi(t) {
        const e = ct(t),
          n = null !== e ? e.factory : ee(t);
        if (null !== n) return n;
        const s = ht(t);
        if (null !== s) return s.factory;
        if (t instanceof Ln)
          throw new Error(`Token ${et(t)} is missing a \u0275prov definition.`);
        if (t instanceof Function)
          return (function(t) {
            const e = t.length;
            if (e > 0) {
              const n = $n(e, "?");
              throw new Error(
                `Can't resolve all parameters for ${et(t)}: (${n.join(", ")}).`
              );
            }
            const n = (function(t) {
              const e = t && (t[dt] || t[ft]);
              if (e) {
                const n = (function(t) {
                  if (t.hasOwnProperty("name")) return t.name;
                  const e = ("" + t).match(/^function\s*([^\s(]+)/);
                  return null === e ? "" : e[1];
                })(t);
                return (
                  console.warn(
                    `DEPRECATED: DI is instantiating a token "${n}" that inherits its @Injectable decorator but does not provide one itself.\nThis will become an error in a future version of Angular. Please add @Injectable() to the "${n}" class.`
                  ),
                  e
                );
              }
              return null;
            })(t);
            return null !== n ? () => n.factory(t) : () => new t();
          })(t);
        throw new Error("unreachable");
      }
      function Hi(t, e, n) {
        let s = void 0;
        if ($i(t)) {
          const e = it(t);
          return ee(e) || Bi(e);
        }
        if (qi(t)) s = () => it(t.useValue);
        else if ((r = t) && r.useFactory)
          s = () => t.useFactory(...ls(t.deps || []));
        else if (
          (function(t) {
            return !(!t || !t.useExisting);
          })(t)
        )
          s = () => os(it(t.useExisting));
        else {
          const e = it(t && (t.useClass || t.provide));
          if (
            !(function(t) {
              return !!t.deps;
            })(t)
          )
            return ee(e) || Bi(e);
          s = () => new e(...ls(t.deps));
        }
        var r;
        return s;
      }
      function zi(t, e, n = !1) {
        return { factory: t, value: e, multi: n ? [] : void 0 };
      }
      function qi(t) {
        return null !== t && "object" == typeof t && ns in t;
      }
      function $i(t) {
        return "function" == typeof t;
      }
      const Ui = function(t, e, n) {
        return (function(t, e = null, n = null, s) {
          const r = ji(t, e, n, s);
          return r._resolveInjectorDefTypes(), r;
        })({ name: n }, e, t, n);
      };
      let Wi = (() => {
        class t {
          static create(t, e) {
            return Array.isArray(t)
              ? Ui(t, e, "")
              : Ui(t.providers, t.parent, t.name || "");
          }
        }
        return (
          (t.THROW_IF_NOT_FOUND = Xn),
          (t.NULL = new Ni()),
          (t.ɵprov = at({
            token: t,
            providedIn: "any",
            factory: () => os(Oi)
          })),
          (t.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      function Qi(t, e) {
        Xe(ve(t)[1], Oe());
      }
      function Zi(t) {
        let e = Object.getPrototypeOf(t.type.prototype).constructor,
          n = !0;
        const s = [t];
        for (; e; ) {
          let r = void 0;
          if (te(t)) r = e.ɵcmp || e.ɵdir;
          else {
            if (e.ɵcmp) throw new Error("Directives cannot inherit Components");
            r = e.ɵdir;
          }
          if (r) {
            if (n) {
              s.push(r);
              const e = t;
              (e.inputs = Ki(t.inputs)),
                (e.declaredInputs = Ki(t.declaredInputs)),
                (e.outputs = Ki(t.outputs));
              const n = r.hostBindings;
              n && Ji(t, n);
              const i = r.viewQuery,
                o = r.contentQueries;
              if (
                (i && Gi(t, i),
                o && Yi(t, o),
                tt(t.inputs, r.inputs),
                tt(t.declaredInputs, r.declaredInputs),
                tt(t.outputs, r.outputs),
                te(r) && r.data.animation)
              ) {
                const e = t.data;
                e.animation = (e.animation || []).concat(r.data.animation);
              }
            }
            const e = r.features;
            if (e)
              for (let s = 0; s < e.length; s++) {
                const r = e[s];
                r && r.ngInherit && r(t), r === Zi && (n = !1);
              }
          }
          e = Object.getPrototypeOf(e);
        }
        !(function(t) {
          let e = 0,
            n = null;
          for (let s = t.length - 1; s >= 0; s--) {
            const r = t[s];
            (r.hostVars = e += r.hostVars),
              (r.hostAttrs = hn(r.hostAttrs, (n = hn(n, r.hostAttrs))));
          }
        })(s);
      }
      function Ki(t) {
        return t === At ? {} : t === It ? [] : t;
      }
      function Gi(t, e) {
        const n = t.viewQuery;
        t.viewQuery = n
          ? (t, s) => {
              e(t, s), n(t, s);
            }
          : e;
      }
      function Yi(t, e) {
        const n = t.contentQueries;
        t.contentQueries = n
          ? (t, s, r) => {
              e(t, s, r), n(t, s, r);
            }
          : e;
      }
      function Ji(t, e) {
        const n = t.hostBindings;
        t.hostBindings = n
          ? (t, s) => {
              e(t, s), n(t, s);
            }
          : e;
      }
      let Xi = null;
      function to() {
        if (!Xi) {
          const t = kt.Symbol;
          if (t && t.iterator) Xi = t.iterator;
          else {
            const t = Object.getOwnPropertyNames(Map.prototype);
            for (let e = 0; e < t.length; ++e) {
              const n = t[e];
              "entries" !== n &&
                "size" !== n &&
                Map.prototype[n] === Map.prototype.entries &&
                (Xi = n);
            }
          }
        }
        return Xi;
      }
      function eo(t) {
        return (
          !!no(t) && (Array.isArray(t) || (!(t instanceof Map) && to() in t))
        );
      }
      function no(t) {
        return null !== t && ("function" == typeof t || "object" == typeof t);
      }
      function so(t, e, n) {
        return !Object.is(t[e], n) && ((t[e] = n), !0);
      }
      function ro(t, e, n, s) {
        const r = Ae();
        return (
          so(r, Ve(), e) &&
            (Ie(),
            (function(t, e, n, s, r, i) {
              const o = ye(t, e);
              !(function(t, e, n, s, r, i, o) {
                if (null == i)
                  pe(t) ? t.removeAttribute(e, r, n) : e.removeAttribute(r);
                else {
                  const a = null == o ? se(i) : o(i, s || "", r);
                  pe(t)
                    ? t.setAttribute(e, r, a, n)
                    : n
                    ? e.setAttributeNS(n, r, a)
                    : e.setAttribute(r, a);
                }
              })(e[11], o, i, t.value, n, s, r);
            })(Je(), r, t, e, n, s)),
          ro
        );
      }
      function io(t, e = gt.Default) {
        const n = Ae();
        return null === n ? os(t, e) : xn(Oe(), n, it(t), e);
      }
      function oo(t, e, n) {
        const s = Ae();
        return (
          so(s, Ve(), e) &&
            (function(t, e, n, s, r, i, o, a) {
              const l = ye(e, n);
              let c,
                u = e.inputs;
              var h;
              null != u && (c = u[s])
                ? (Ai(t, n, c, s, r),
                  Jt(e) &&
                    (function(t, e) {
                      const n = be(e, t);
                      16 & n[2] || (n[2] |= 64);
                    })(n, e.index))
                : 3 & e.type &&
                  ((s =
                    "class" === (h = s)
                      ? "className"
                      : "for" === h
                      ? "htmlFor"
                      : "formaction" === h
                      ? "formAction"
                      : "innerHtml" === h
                      ? "innerHTML"
                      : "readonly" === h
                      ? "readOnly"
                      : "tabindex" === h
                      ? "tabIndex"
                      : h),
                  (r = null != o ? o(r, e.value || "", s) : r),
                  pe(i)
                    ? i.setProperty(l, s, r)
                    : un(s) ||
                      (l.setProperty ? l.setProperty(s, r) : (l[s] = r)));
            })(Ie(), Je(), s, t, e, s[11], n),
          oo
        );
      }
      function ao(t, e, n, s, r) {
        const i = r ? "class" : "style";
        Ai(t, n, e.inputs[i], i, s);
      }
      function lo(t, e, n, s) {
        const r = Ae(),
          i = Ie(),
          o = Qt + t,
          a = r[11],
          l = (r[o] = sr(a, e, xe.lFrame.currentNamespace)),
          c = i.firstCreatePass
            ? (function(t, e, n, s, r, i, o) {
                const a = e.consts,
                  l = Wr(e, t, 2, r, Ee(a, i));
                return (
                  ii(e, n, l, Ee(a, o)),
                  null !== l.attrs && Ii(l, l.attrs, !1),
                  null !== l.mergedAttrs && Ii(l, l.mergedAttrs, !0),
                  null !== e.queries && e.queries.elementStart(e, l),
                  l
                );
              })(o, i, r, 0, e, n, s)
            : i.data[o];
        De(c, !0);
        const u = c.mergedAttrs;
        null !== u && ln(a, l, u);
        const h = c.classes;
        null !== h && Cr(a, l, h);
        const d = c.styles;
        null !== d && wr(a, l, d),
          64 != (64 & c.flags) && mr(i, r, l, c),
          0 === xe.lFrame.elementDepthCount && Qs(l, r),
          xe.lFrame.elementDepthCount++,
          Xt(c) && (Xr(i, r, c), Jr(i, c, r)),
          null !== s && ti(r, c);
      }
      function co() {
        let t = Oe();
        Pe() ? Fe() : ((t = t.parent), De(t, !1));
        const e = t;
        xe.lFrame.elementDepthCount--;
        const n = Ie();
        n.firstCreatePass && (Xe(n, t), Yt(t) && n.queries.elementEnd(t)),
          null != e.classesWithoutHost &&
            (function(t) {
              return 0 != (16 & t.flags);
            })(e) &&
            ao(n, e, Ae(), e.classesWithoutHost, !0),
          null != e.stylesWithoutHost &&
            (function(t) {
              return 0 != (32 & t.flags);
            })(e) &&
            ao(n, e, Ae(), e.stylesWithoutHost, !1);
      }
      function uo(t, e, n, s) {
        lo(t, e, n, s), co();
      }
      function ho(t) {
        return !!t && "function" == typeof t.then;
      }
      function po(t, e, n = !1, s) {
        const r = Ae(),
          i = Ie(),
          o = Oe();
        return (
          (function(t, e, n, s, r, i, o = !1, a) {
            const l = Xt(s),
              c = t.firstCreatePass && xi(t),
              u = Ti(e);
            let h = !0;
            if (3 & s.type) {
              const d = ye(s, e),
                p = a ? a(d) : At,
                f = p.target || d,
                m = u.length,
                g = a ? t => a(me(t[s.index])).target : s.index;
              if (pe(n)) {
                let o = null;
                if (
                  (!a &&
                    l &&
                    (o = (function(t, e, n, s) {
                      const r = t.cleanup;
                      if (null != r)
                        for (let i = 0; i < r.length - 1; i += 2) {
                          const t = r[i];
                          if (t === n && r[i + 1] === s) {
                            const t = e[7],
                              n = r[i + 2];
                            return t.length > n ? t[n] : null;
                          }
                          "string" == typeof t && (i += 2);
                        }
                      return null;
                    })(t, e, r, s.index)),
                  null !== o)
                )
                  ((o.__ngLastListenerFn__ || o).__ngNextListenerFn__ = i),
                    (o.__ngLastListenerFn__ = i),
                    (h = !1);
                else {
                  i = mo(s, e, i, !1);
                  const t = n.listen(p.name || f, r, i);
                  u.push(i, t), c && c.push(r, g, m, m + 1);
                }
              } else
                (i = mo(s, e, i, !0)),
                  f.addEventListener(r, i, o),
                  u.push(i),
                  c && c.push(r, g, m, o);
            } else i = mo(s, e, i, !1);
            const d = s.outputs;
            let p;
            if (h && null !== d && (p = d[r])) {
              const t = p.length;
              if (t)
                for (let n = 0; n < t; n += 2) {
                  const t = e[p[n]][p[n + 1]].subscribe(i),
                    o = u.length;
                  u.push(i, t), c && c.push(r, s.index, o, -(o + 1));
                }
            }
          })(i, r, r[11], o, t, e, n, s),
          po
        );
      }
      function fo(t, e, n) {
        try {
          return !1 !== e(n);
        } catch (s) {
          return ki(t, s), !1;
        }
      }
      function mo(t, e, n, s) {
        return function r(i) {
          if (i === Function) return n;
          const o = 2 & t.flags ? be(t.index, e) : e;
          0 == (32 & e[2]) && vi(o);
          let a = fo(e, n, i),
            l = r.__ngNextListenerFn__;
          for (; l; ) (a = fo(e, l, i) && a), (l = l.__ngNextListenerFn__);
          return s && !1 === a && (i.preventDefault(), (i.returnValue = !1)), a;
        };
      }
      function go(t, e) {
        let n = null;
        const s = (function(t) {
          const e = t.attrs;
          if (null != e) {
            const t = e.indexOf(5);
            if (0 == (1 & t)) return e[t + 1];
          }
          return null;
        })(t);
        for (let r = 0; r < e.length; r++) {
          const i = e[r];
          if ("*" !== i) {
            if (null === s ? Nr(t, i, !0) : Dr(s, i)) return r;
          } else n = r;
        }
        return n;
      }
      function yo(t) {
        const e = Ae()[16][6];
        if (!e.projection) {
          const n = (e.projection = $n(t ? t.length : 1, null)),
            s = n.slice();
          let r = e.child;
          for (; null !== r; ) {
            const e = t ? go(r, t) : 0;
            null !== e &&
              (s[e] ? (s[e].projectionNext = r) : (n[e] = r), (s[e] = r)),
              (r = r.next);
          }
        }
      }
      function _o(t, e = 0, n) {
        const s = Ae(),
          r = Ie(),
          i = Wr(r, Qt + t, 16, null, n || null);
        null === i.projection && (i.projection = e),
          Fe(),
          64 != (64 & i.flags) &&
            (function(t, e, n) {
              vr(e[11], 0, e, n, lr(t, n, e), pr(n.parent || e[6], n, e));
            })(r, s, i);
      }
      const bo = [];
      function vo(t, e, n, s, r) {
        const i = t[n + 1],
          o = null === e;
        let a = s ? Lr(i) : Hr(i),
          l = !1;
        for (; 0 !== a && (!1 === l || o); ) {
          const n = t[a + 1];
          wo(t[a], e) && ((l = !0), (t[a + 1] = s ? qr(n) : Br(n))),
            (a = s ? Lr(n) : Hr(n));
        }
        l && (t[n + 1] = s ? Br(i) : qr(i));
      }
      function wo(t, e) {
        return (
          null === t ||
          null == e ||
          (Array.isArray(t) ? t[1] : t) === e ||
          (!(!Array.isArray(t) || "string" != typeof e) && Qn(t, e) >= 0)
        );
      }
      function Co(t, e) {
        return (
          (function(t, e, n, s) {
            const r = Ae(),
              i = Ie(),
              o = (function(t) {
                const e = xe.lFrame,
                  n = e.bindingIndex;
                return (e.bindingIndex = e.bindingIndex + 2), n;
              })();
            i.firstUpdatePass &&
              (function(t, e, n, s) {
                const r = t.data;
                if (null === r[n + 1]) {
                  const i = r[Ge()],
                    o = (function(t, e) {
                      return e >= t.expandoStartIndex;
                    })(t, n);
                  (function(t, e) {
                    return 0 != (16 & t.flags);
                  })(i) &&
                    null === e &&
                    !o &&
                    (e = !1),
                    (e = (function(t, e, n, s) {
                      const r = (function(t) {
                        const e = xe.lFrame.currentDirectiveIndex;
                        return -1 === e ? null : t[e];
                      })(t);
                      let i = e.residualClasses;
                      if (null === r)
                        0 === e.classBindings &&
                          ((n = So((n = Eo(null, t, e, n, s)), e.attrs, s)),
                          (i = null));
                      else {
                        const o = e.directiveStylingLast;
                        if (-1 === o || t[o] !== r)
                          if (((n = Eo(r, t, e, n, s)), null === i)) {
                            let n = (function(t, e, n) {
                              const s = e.classBindings;
                              if (0 !== Hr(s)) return t[Lr(s)];
                            })(t, e);
                            void 0 !== n &&
                              Array.isArray(n) &&
                              ((n = Eo(null, t, e, n[1], s)),
                              (n = So(n, e.attrs, s)),
                              (function(t, e, n, s) {
                                t[Lr(e.classBindings)] = s;
                              })(t, e, 0, n));
                          } else
                            i = (function(t, e, n) {
                              let s = void 0;
                              const r = e.directiveEnd;
                              for (
                                let i = 1 + e.directiveStylingLast;
                                i < r;
                                i++
                              )
                                s = So(s, t[i].hostAttrs, true);
                              return So(s, e.attrs, true);
                            })(t, e);
                      }
                      return void 0 !== i && (e.residualClasses = i), n;
                    })(r, i, e, s)),
                    (function(t, e, n, s, r, i) {
                      let o = e.classBindings,
                        a = Lr(o),
                        l = Hr(o);
                      t[s] = n;
                      let c,
                        u = !1;
                      if (Array.isArray(n)) {
                        const t = n;
                        (c = t[1]), (null === c || Qn(t, c) > 0) && (u = !0);
                      } else c = n;
                      if (r)
                        if (0 !== l) {
                          const e = Lr(t[a + 1]);
                          (t[s + 1] = jr(e, a)),
                            0 !== e && (t[e + 1] = zr(t[e + 1], s)),
                            (t[a + 1] = (131071 & t[a + 1]) | (s << 17));
                        } else
                          (t[s + 1] = jr(a, 0)),
                            0 !== a && (t[a + 1] = zr(t[a + 1], s)),
                            (a = s);
                      else
                        (t[s + 1] = jr(l, 0)),
                          0 === a ? (a = s) : (t[l + 1] = zr(t[l + 1], s)),
                          (l = s);
                      u && (t[s + 1] = Br(t[s + 1])),
                        vo(t, c, s, !0),
                        vo(t, c, s, !1),
                        (function(t, e, n, s, r) {
                          const i = t.residualClasses;
                          null != i &&
                            "string" == typeof e &&
                            Qn(i, e) >= 0 &&
                            (n[s + 1] = qr(n[s + 1]));
                        })(e, c, t, s),
                        (o = jr(a, l)),
                        (e.classBindings = o);
                    })(r, i, e, n, o);
                }
              })(i, t, o, true),
              e !== Rr &&
                so(r, o, e) &&
                (function(t, e, n, s, r, i, o, a) {
                  if (!(3 & e.type)) return;
                  const l = t.data,
                    c = l[a + 1];
                  xo(1 == (1 & c) ? To(l, e, n, r, Hr(c), o) : void 0) ||
                    (xo(i) ||
                      ((function(t) {
                        return 2 == (2 & t);
                      })(c) &&
                        (i = To(l, null, n, r, a, o))),
                    (function(t, e, n, s, r) {
                      const i = pe(t);
                      r
                        ? i
                          ? t.addClass(n, s)
                          : n.classList.add(s)
                        : i
                        ? t.removeClass(n, s)
                        : n.classList.remove(s);
                    })(s, 0, ge(Ge(), n), r, i));
                })(
                  i,
                  i.data[Ge()],
                  r,
                  r[11],
                  t,
                  (r[o + 1] = (function(t, e) {
                    return (
                      null == t || ("object" == typeof t && (t = et(ys(t)))), t
                    );
                  })(e)),
                  true,
                  o
                );
          })(t, e),
          Co
        );
      }
      function Eo(t, e, n, s, r) {
        let i = null;
        const o = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < o && ((i = e[a]), (s = So(s, i.hostAttrs, r)), i !== t);

        )
          a++;
        return null !== t && (n.directiveStylingLast = a), s;
      }
      function So(t, e, n) {
        const s = n ? 1 : 2;
        let r = -1;
        if (null !== e)
          for (let i = 0; i < e.length; i++) {
            const o = e[i];
            "number" == typeof o
              ? (r = o)
              : r === s &&
                (Array.isArray(t) || (t = void 0 === t ? [] : ["", t]),
                Un(t, o, !!n || e[++i]));
          }
        return void 0 === t ? null : t;
      }
      function To(t, e, n, s, r, i) {
        const o = null === e;
        let a = void 0;
        for (; r > 0; ) {
          const e = t[r],
            i = Array.isArray(e),
            l = i ? e[1] : e,
            c = null === l;
          let u = n[r + 1];
          u === Rr && (u = c ? bo : void 0);
          let h = c ? Wn(u, s) : l === s ? u : void 0;
          if ((i && !xo(h) && (h = Wn(e, s)), xo(h) && ((a = h), o))) return a;
          const d = t[r + 1];
          r = o ? Lr(d) : Hr(d);
        }
        if (null !== e) {
          let t = i ? e.residualClasses : e.residualStyles;
          null != t && (a = Wn(t, s));
        }
        return a;
      }
      function xo(t) {
        return void 0 !== t;
      }
      function ko(t, e = "") {
        const n = Ae(),
          s = Ie(),
          r = t + Qt,
          i = s.firstCreatePass ? Wr(s, r, 1, e, null) : s.data[r],
          o = (n[r] = (function(t, e) {
            return pe(t) ? t.createText(e) : t.createTextNode(e);
          })(n[11], e));
        mr(s, n, o, i), De(i, !1);
      }
      function Ao(t, e, n) {
        const s = Ae(),
          r = (function(t, e, n, s) {
            return so(t, Ve(), n) ? e + se(n) + s : Rr;
          })(s, t, e, n);
        return (
          r !== Rr &&
            (function(t, e, n) {
              const s = ge(e, t);
              !(function(t, e, n) {
                pe(t) ? t.setValue(e, n) : (e.textContent = n);
              })(t[11], s, n);
            })(s, Ge(), r),
          Ao
        );
      }
      const Io = void 0;
      var Oo = [
        "en",
        [["a", "p"], ["AM", "PM"], Io],
        [["AM", "PM"], Io, Io],
        [
          ["S", "M", "T", "W", "T", "F", "S"],
          ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
        ],
        Io,
        [
          ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
          ]
        ],
        Io,
        [["B", "A"], ["BC", "AD"], ["Before Christ", "Anno Domini"]],
        0,
        [6, 0],
        ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
        ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
        ["{1}, {0}", Io, "{1} 'at' {0}", Io],
        [
          ".",
          ",",
          ";",
          "%",
          "+",
          "-",
          "E",
          "\xd7",
          "\u2030",
          "\u221e",
          "NaN",
          ":"
        ],
        ["#,##0.###", "#,##0%", "\xa4#,##0.00", "#E0"],
        "USD",
        "$",
        "US Dollar",
        {},
        "ltr",
        function(t) {
          let e = Math.floor(Math.abs(t)),
            n = t.toString().replace(/^[^.]*\.?/, "").length;
          return 1 === e && 0 === n ? 1 : 5;
        }
      ];
      let No = {};
      function Do(t) {
        return (
          t in No ||
            (No[t] =
              kt.ng &&
              kt.ng.common &&
              kt.ng.common.locales &&
              kt.ng.common.locales[t]),
          No[t]
        );
      }
      var Po = (function(t) {
        return (
          (t[(t.LocaleId = 0)] = "LocaleId"),
          (t[(t.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
          (t[(t.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
          (t[(t.DaysFormat = 3)] = "DaysFormat"),
          (t[(t.DaysStandalone = 4)] = "DaysStandalone"),
          (t[(t.MonthsFormat = 5)] = "MonthsFormat"),
          (t[(t.MonthsStandalone = 6)] = "MonthsStandalone"),
          (t[(t.Eras = 7)] = "Eras"),
          (t[(t.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
          (t[(t.WeekendRange = 9)] = "WeekendRange"),
          (t[(t.DateFormat = 10)] = "DateFormat"),
          (t[(t.TimeFormat = 11)] = "TimeFormat"),
          (t[(t.DateTimeFormat = 12)] = "DateTimeFormat"),
          (t[(t.NumberSymbols = 13)] = "NumberSymbols"),
          (t[(t.NumberFormats = 14)] = "NumberFormats"),
          (t[(t.CurrencyCode = 15)] = "CurrencyCode"),
          (t[(t.CurrencySymbol = 16)] = "CurrencySymbol"),
          (t[(t.CurrencyName = 17)] = "CurrencyName"),
          (t[(t.Currencies = 18)] = "Currencies"),
          (t[(t.Directionality = 19)] = "Directionality"),
          (t[(t.PluralCase = 20)] = "PluralCase"),
          (t[(t.ExtraData = 21)] = "ExtraData"),
          t
        );
      })({});
      const Fo = "en-US";
      let Ro = Fo;
      function Mo(t) {
        var e, n;
        (n = "Expected localeId to be defined"),
          null == (e = t) &&
            (function(t, e, n, s) {
              throw new Error(
                "ASSERTION ERROR: " + t + ` [Expected=> null != ${e} <=Actual]`
              );
            })(n, e),
          "string" == typeof t && (Ro = t.toLowerCase().replace(/_/g, "-"));
      }
      function Vo(t, e, n, s, r) {
        if (((t = it(t)), Array.isArray(t)))
          for (let i = 0; i < t.length; i++) Vo(t[i], e, n, s, r);
        else {
          const i = Ie(),
            o = Ae();
          let a = $i(t) ? t : it(t.provide),
            l = Hi(t);
          const c = Oe(),
            u = 1048575 & c.providerIndexes,
            h = c.directiveStart,
            d = c.providerIndexes >> 20;
          if ($i(t) || !t.multi) {
            const s = new an(l, r, io),
              p = Bo(a, e, r ? u : u + d, h);
            -1 === p
              ? (En(bn(c, o), i, a),
                jo(i, t, e.length),
                e.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 1048576),
                n.push(s),
                o.push(s))
              : ((n[p] = s), (o[p] = s));
          } else {
            const p = Bo(a, e, u + d, h),
              f = Bo(a, e, u, u + d),
              m = p >= 0 && n[p],
              g = f >= 0 && n[f];
            if ((r && !g) || (!r && !m)) {
              En(bn(c, o), i, a);
              const u = (function(t, e, n, s, r) {
                const i = new an(t, n, io);
                return (
                  (i.multi = []),
                  (i.index = e),
                  (i.componentProviders = 0),
                  Lo(i, r, s && !n),
                  i
                );
              })(r ? zo : Ho, n.length, r, s, l);
              !r && g && (n[f].providerFactory = u),
                jo(i, t, e.length, 0),
                e.push(a),
                c.directiveStart++,
                c.directiveEnd++,
                r && (c.providerIndexes += 1048576),
                n.push(u),
                o.push(u);
            } else jo(i, t, p > -1 ? p : f, Lo(n[r ? f : p], l, !r && s));
            !r && s && g && n[f].componentProviders++;
          }
        }
      }
      function jo(t, e, n, s) {
        const r = $i(e);
        if (r || e.useClass) {
          const i = (e.useClass || e).prototype.ngOnDestroy;
          if (i) {
            const o = t.destroyHooks || (t.destroyHooks = []);
            if (!r && e.multi) {
              const t = o.indexOf(n);
              -1 === t ? o.push(n, [s, i]) : o[t + 1].push(s, i);
            } else o.push(n, i);
          }
        }
      }
      function Lo(t, e, n) {
        return n && t.componentProviders++, t.multi.push(e) - 1;
      }
      function Bo(t, e, n, s) {
        for (let r = n; r < s; r++) if (e[r] === t) return r;
        return -1;
      }
      function Ho(t, e, n, s) {
        return qo(this.multi, []);
      }
      function zo(t, e, n, s) {
        const r = this.multi;
        let i;
        if (this.providerFactory) {
          const t = this.providerFactory.componentProviders,
            e = Nn(n, n[1], this.providerFactory.index, s);
          (i = e.slice(0, t)), qo(r, i);
          for (let n = t; n < e.length; n++) i.push(e[n]);
        } else (i = []), qo(r, i);
        return i;
      }
      function qo(t, e) {
        for (let n = 0; n < t.length; n++) e.push((0, t[n])());
        return e;
      }
      function $o(t, e = []) {
        return n => {
          n.providersResolver = (n, s) =>
            (function(t, e, n) {
              const s = Ie();
              if (s.firstCreatePass) {
                const r = te(t);
                Vo(n, s.data, s.blueprint, r, !0),
                  Vo(e, s.data, s.blueprint, r, !1);
              }
            })(n, s ? s(t) : t, e);
        };
      }
      class Uo {}
      class Wo {
        resolveComponentFactory(t) {
          throw (function(t) {
            const e = Error(
              `No component factory found for ${et(
                t
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (e.ngComponent = t), e;
          })(t);
        }
      }
      let Qo = (() => {
        class t {}
        return (t.NULL = new Wo()), t;
      })();
      function Zo(...t) {}
      function Ko(t, e) {
        return new Yo(ye(t, e));
      }
      const Go = function() {
        return Ko(Oe(), Ae());
      };
      let Yo = (() => {
        class t {
          constructor(t) {
            this.nativeElement = t;
          }
        }
        return (t.__NG_ELEMENT_ID__ = Go), t;
      })();
      class Jo {}
      let Xo = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = () => ta()), t;
      })();
      const ta = function() {
        const t = Ae(),
          e = be(Oe().index, t);
        return (function(t) {
          return t[11];
        })(Kt(e) ? e : t);
      };
      let ea = (() => {
        class t {}
        return (
          (t.ɵprov = at({ token: t, providedIn: "root", factory: () => null })),
          t
        );
      })();
      class na {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t
              .split(".")
              .slice(2)
              .join("."));
        }
      }
      const sa = new na("11.0.9");
      class ra {
        constructor() {}
        supports(t) {
          return eo(t);
        }
        create(t) {
          return new oa(t);
        }
      }
      const ia = (t, e) => e;
      class oa {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || ia);
        }
        forEachItem(t) {
          let e;
          for (e = this._itHead; null !== e; e = e._next) t(e);
        }
        forEachOperation(t) {
          let e = this._itHead,
            n = this._removalsHead,
            s = 0,
            r = null;
          for (; e || n; ) {
            const i = !n || (e && e.currentIndex < ua(n, s, r)) ? e : n,
              o = ua(i, s, r),
              a = i.currentIndex;
            if (i === n) s--, (n = n._nextRemoved);
            else if (((e = e._next), null == i.previousIndex)) s++;
            else {
              r || (r = []);
              const t = o - s,
                e = a - s;
              if (t != e) {
                for (let n = 0; n < t; n++) {
                  const s = n < r.length ? r[n] : (r[n] = 0),
                    i = s + n;
                  e <= i && i < t && (r[n] = s + 1);
                }
                r[i.previousIndex] = e - t;
              }
            }
            o !== a && t(i, o, a);
          }
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousItHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachMovedItem(t) {
          let e;
          for (e = this._movesHead; null !== e; e = e._nextMoved) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        forEachIdentityChange(t) {
          let e;
          for (
            e = this._identityChangesHead;
            null !== e;
            e = e._nextIdentityChange
          )
            t(e);
        }
        diff(t) {
          if ((null == t && (t = []), !eo(t)))
            throw new Error(
              `Error trying to diff '${et(
                t
              )}'. Only arrays and iterables are allowed`
            );
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e,
            n,
            s,
            r = this._itHead,
            i = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let e = 0; e < this.length; e++)
              (n = t[e]),
                (s = this._trackByFn(e, n)),
                null !== r && Object.is(r.trackById, s)
                  ? (i && (r = this._verifyReinsertion(r, n, s, e)),
                    Object.is(r.item, n) || this._addIdentityChange(r, n))
                  : ((r = this._mismatch(r, n, s, e)), (i = !0)),
                (r = r._next);
          } else
            (e = 0),
              (function(t, e) {
                if (Array.isArray(t))
                  for (let n = 0; n < t.length; n++) e(t[n]);
                else {
                  const n = t[to()]();
                  let s;
                  for (; !(s = n.next()).done; ) e(s.value);
                }
              })(t, t => {
                (s = this._trackByFn(e, t)),
                  null !== r && Object.is(r.trackById, s)
                    ? (i && (r = this._verifyReinsertion(r, t, s, e)),
                      Object.is(r.item, t) || this._addIdentityChange(r, t))
                    : ((r = this._mismatch(r, t, s, e)), (i = !0)),
                  (r = r._next),
                  e++;
              }),
              (this.length = e);
          return this._truncate(r), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, e, n, s) {
          let r;
          return (
            null === t ? (r = this._itTail) : ((r = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._linkedRecords
                ? null
                : this._linkedRecords.get(n, s))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._moveAfter(t, r, s))
              : null !==
                (t =
                  null === this._unlinkedRecords
                    ? null
                    : this._unlinkedRecords.get(n, null))
              ? (Object.is(t.item, e) || this._addIdentityChange(t, e),
                this._reinsertAfter(t, r, s))
              : (t = this._addAfter(new aa(e, n), r, s)),
            t
          );
        }
        _verifyReinsertion(t, e, n, s) {
          let r =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(n, null);
          return (
            null !== r
              ? (t = this._reinsertAfter(r, t._prev, s))
              : t.currentIndex != s &&
                ((t.currentIndex = s), this._addToMoves(t, s)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const e = t._next;
            this._addToRemovals(this._unlink(t)), (t = e);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, e, n) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const s = t._prevRemoved,
            r = t._nextRemoved;
          return (
            null === s ? (this._removalsHead = r) : (s._nextRemoved = r),
            null === r ? (this._removalsTail = s) : (r._prevRemoved = s),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _moveAfter(t, e, n) {
          return (
            this._unlink(t),
            this._insertAfter(t, e, n),
            this._addToMoves(t, n),
            t
          );
        }
        _addAfter(t, e, n) {
          return (
            this._insertAfter(t, e, n),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, e, n) {
          const s = null === e ? this._itHead : e._next;
          return (
            (t._next = s),
            (t._prev = e),
            null === s ? (this._itTail = t) : (s._prev = t),
            null === e ? (this._itHead = t) : (e._next = t),
            null === this._linkedRecords && (this._linkedRecords = new ca()),
            this._linkedRecords.put(t),
            (t.currentIndex = n),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const e = t._prev,
            n = t._next;
          return (
            null === e ? (this._itHead = n) : (e._next = n),
            null === n ? (this._itTail = e) : (n._prev = e),
            t
          );
        }
        _addToMoves(t, e) {
          return (
            t.previousIndex === e ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new ca()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, e) {
          return (
            (t.item = e),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class aa {
        constructor(t, e) {
          (this.item = t),
            (this.trackById = e),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class la {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, e) {
          let n;
          for (n = this._head; null !== n; n = n._nextDup)
            if (
              (null === e || e <= n.currentIndex) &&
              Object.is(n.trackById, t)
            )
              return n;
          return null;
        }
        remove(t) {
          const e = t._prevDup,
            n = t._nextDup;
          return (
            null === e ? (this._head = n) : (e._nextDup = n),
            null === n ? (this._tail = e) : (n._prevDup = e),
            null === this._head
          );
        }
      }
      class ca {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const e = t.trackById;
          let n = this.map.get(e);
          n || ((n = new la()), this.map.set(e, n)), n.add(t);
        }
        get(t, e) {
          const n = this.map.get(t);
          return n ? n.get(t, e) : null;
        }
        remove(t) {
          const e = t.trackById;
          return this.map.get(e).remove(t) && this.map.delete(e), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function ua(t, e, n) {
        const s = t.previousIndex;
        if (null === s) return s;
        let r = 0;
        return n && s < n.length && (r = n[s]), s + e + r;
      }
      class ha {
        constructor() {}
        supports(t) {
          return t instanceof Map || no(t);
        }
        create() {
          return new da();
        }
      }
      class da {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let e;
          for (e = this._mapHead; null !== e; e = e._next) t(e);
        }
        forEachPreviousItem(t) {
          let e;
          for (e = this._previousMapHead; null !== e; e = e._nextPrevious) t(e);
        }
        forEachChangedItem(t) {
          let e;
          for (e = this._changesHead; null !== e; e = e._nextChanged) t(e);
        }
        forEachAddedItem(t) {
          let e;
          for (e = this._additionsHead; null !== e; e = e._nextAdded) t(e);
        }
        forEachRemovedItem(t) {
          let e;
          for (e = this._removalsHead; null !== e; e = e._nextRemoved) t(e);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || no(t)))
              throw new Error(
                `Error trying to diff '${et(
                  t
                )}'. Only maps and objects are allowed`
              );
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let e = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (t, n) => {
              if (e && e.key === n)
                this._maybeAddToChanges(e, t),
                  (this._appendAfter = e),
                  (e = e._next);
              else {
                const s = this._getOrCreateRecordForKey(n, t);
                e = this._insertBeforeOrAppend(e, s);
              }
            }),
            e)
          ) {
            e._prev && (e._prev._next = null), (this._removalsHead = e);
            for (let t = e; null !== t; t = t._nextRemoved)
              t === this._mapHead && (this._mapHead = null),
                this._records.delete(t.key),
                (t._nextRemoved = t._next),
                (t.previousValue = t.currentValue),
                (t.currentValue = null),
                (t._prev = null),
                (t._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, e) {
          if (t) {
            const n = t._prev;
            return (
              (e._next = t),
              (e._prev = n),
              (t._prev = e),
              n && (n._next = e),
              t === this._mapHead && (this._mapHead = e),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = e), (e._prev = this._appendAfter))
              : (this._mapHead = e),
            (this._appendAfter = e),
            null
          );
        }
        _getOrCreateRecordForKey(t, e) {
          if (this._records.has(t)) {
            const n = this._records.get(t);
            this._maybeAddToChanges(n, e);
            const s = n._prev,
              r = n._next;
            return (
              s && (s._next = r),
              r && (r._prev = s),
              (n._next = null),
              (n._prev = null),
              n
            );
          }
          const n = new pa(t);
          return (
            this._records.set(t, n),
            (n.currentValue = e),
            this._addToAdditions(n),
            n
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, e) {
          Object.is(e, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = e),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, e) {
          t instanceof Map
            ? t.forEach(e)
            : Object.keys(t).forEach(n => e(t[n], n));
        }
      }
      class pa {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      let fa = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (null != n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: n => {
                  if (!n)
                    throw new Error(
                      "Cannot extend IterableDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new Yn(), new Kn()]]
              };
            }
            find(t) {
              const e = this.factories.find(e => e.supports(t));
              if (null != e) return e;
              throw new Error(
                `Cannot find a differ supporting object '${t}' of type '${((n = t),
                n.name || typeof n)}'`
              );
              var n;
            }
          }
          return (
            (t.ɵprov = at({
              token: t,
              providedIn: "root",
              factory: () => new t([new ra()])
            })),
            t
          );
        })(),
        ma = (() => {
          class t {
            constructor(t) {
              this.factories = t;
            }
            static create(e, n) {
              if (n) {
                const t = n.factories.slice();
                e = e.concat(t);
              }
              return new t(e);
            }
            static extend(e) {
              return {
                provide: t,
                useFactory: n => {
                  if (!n)
                    throw new Error(
                      "Cannot extend KeyValueDiffers without a parent injector"
                    );
                  return t.create(e, n);
                },
                deps: [[t, new Yn(), new Kn()]]
              };
            }
            find(t) {
              const e = this.factories.find(e => e.supports(t));
              if (e) return e;
              throw new Error(`Cannot find a differ supporting object '${t}'`);
            }
          }
          return (
            (t.ɵprov = at({
              token: t,
              providedIn: "root",
              factory: () => new t([new ha()])
            })),
            t
          );
        })();
      function ga(t, e, n, s, r = !1) {
        for (; null !== n; ) {
          const i = e[n.index];
          if ((null !== i && s.push(me(i)), Gt(i)))
            for (let t = Zt; t < i.length; t++) {
              const e = i[t],
                n = e[1].firstChild;
              null !== n && ga(e[1], e, n, s);
            }
          const o = n.type;
          if (8 & o) ga(t, e, n.child, s);
          else if (32 & o) {
            const t = Ys(n, e);
            let r;
            for (; (r = t()); ) s.push(r);
          } else if (16 & o) {
            const t = e[16],
              r = t[6].projection[n.projection];
            if (Array.isArray(r)) s.push(...r);
            else {
              const e = Js(t);
              ga(e[1], e, r, s, !0);
            }
          }
          n = r ? n.projectionNext : n.next;
        }
        return s;
      }
      class ya {
        constructor(t, e) {
          (this._lView = t),
            (this._cdRefInjectingView = e),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get rootNodes() {
          const t = this._lView,
            e = t[1];
          return ga(e, t, e.firstChild, []);
        }
        get context() {
          return this._lView[8];
        }
        get destroyed() {
          return 256 == (256 & this._lView[2]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[3];
            if (Gt(t)) {
              const e = t[8],
                n = e ? e.indexOf(this) : -1;
              n > -1 && (ir(t, n), qn(e, n));
            }
            this._attachedToViewContainer = !1;
          }
          or(this._lView[1], this._lView);
        }
        onDestroy(t) {
          si(this._lView[1], this._lView, null, t);
        }
        markForCheck() {
          vi(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[2] &= -129;
        }
        reattach() {
          this._lView[2] |= 128;
        }
        detectChanges() {
          wi(this._lView[1], this._lView, this.context);
        }
        checkNoChanges() {
          !(function(t, e, n) {
            Me(!0);
            try {
              wi(t, e, n);
            } finally {
              Me(!1);
            }
          })(this._lView[1], this._lView, this.context);
        }
        attachToViewContainerRef() {
          if (this._appRef)
            throw new Error(
              "This view is already attached directly to the ApplicationRef!"
            );
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          var t;
          (this._appRef = null),
            br(this._lView[1], (t = this._lView), t[11], 2, null, null);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer)
            throw new Error(
              "This view is already attached to a ViewContainer!"
            );
          this._appRef = t;
        }
      }
      class _a extends ya {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          Ci(this._view);
        }
        checkNoChanges() {
          !(function(t) {
            Me(!0);
            try {
              Ci(t);
            } finally {
              Me(!1);
            }
          })(this._view);
        }
        get context() {
          return null;
        }
      }
      const ba = function(t = !1) {
        return (function(t, e, n) {
          if (!n && Jt(t)) {
            const n = be(t.index, e);
            return new ya(n, n);
          }
          return 47 & t.type ? new ya(e[16], e) : null;
        })(Oe(), Ae(), t);
      };
      let va = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = ba), (t.__ChangeDetectorRef__ = !0), t;
      })();
      const wa = [new ha()],
        Ca = new fa([new ra()]),
        Ea = new ma(wa),
        Sa = function() {
          return Aa(Oe(), Ae());
        };
      let Ta = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Sa), t;
      })();
      const xa = Ta,
        ka = class extends xa {
          constructor(t, e, n) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = e),
              (this.elementRef = n);
          }
          createEmbeddedView(t) {
            const e = this._declarationTContainer.tViews,
              n = Ur(
                this._declarationLView,
                e,
                t,
                16,
                null,
                e.declTNode,
                null,
                null,
                null,
                null
              );
            n[17] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[19];
            return (
              null !== s && (n[19] = s.createEmbeddedView(e)),
              Zr(e, n, t),
              new ya(n)
            );
          }
        };
      function Aa(t, e) {
        return 4 & t.type ? new ka(e, t, Ko(t, e)) : null;
      }
      class Ia {}
      const Oa = function() {
        return Ma(Oe(), Ae());
      };
      let Na = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = Oa), t;
      })();
      const Da = Na,
        Pa = class extends Da {
          constructor(t, e, n) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = e),
              (this._hostLView = n);
          }
          get element() {
            return Ko(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Fn(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = Cn(this._hostTNode, this._hostLView);
            if (pn(t)) {
              const e = mn(t, this._hostLView),
                n = fn(t);
              return new Fn(e[1].data[n + 8], e);
            }
            return new Fn(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const e = Fa(this._lContainer);
            return (null !== e && e[t]) || null;
          }
          get length() {
            return this._lContainer.length - Zt;
          }
          createEmbeddedView(t, e, n) {
            const s = t.createEmbeddedView(e || {});
            return this.insert(s, n), s;
          }
          createComponent(t, e, n, s, r) {
            const i = n || this.parentInjector;
            if (!r && null == t.ngModule && i) {
              const t = i.get(Ia, null);
              t && (r = t);
            }
            const o = t.create(i, s, void 0, r);
            return this.insert(o.hostView, e), o;
          }
          insert(t, e) {
            const n = t._lView,
              s = n[1];
            if (Gt(n[3])) {
              const e = this.indexOf(t);
              if (-1 !== e) this.detach(e);
              else {
                const e = n[3],
                  s = new Pa(e, e[6], e[3]);
                s.detach(s.indexOf(t));
              }
            }
            const r = this._adjustIndex(e),
              i = this._lContainer;
            !(function(t, e, n, s) {
              const r = Zt + s,
                i = n.length;
              s > 0 && (n[r - 1][4] = e),
                s < i - Zt
                  ? ((e[4] = n[r]), zn(n, Zt + s, e))
                  : (n.push(e), (e[4] = null)),
                (e[3] = n);
              const o = e[17];
              null !== o &&
                n !== o &&
                (function(t, e) {
                  const n = t[9];
                  e[16] !== e[3][3][16] && (t[2] = !0),
                    null === n ? (t[9] = [e]) : n.push(e);
                })(o, e);
              const a = e[19];
              null !== a && a.insertView(t), (e[2] |= 128);
            })(s, n, i, r);
            const o = yr(r, i),
              a = n[11],
              l = dr(a, i[7]);
            return (
              null !== l &&
                (function(t, e, n, s, r, i) {
                  (s[0] = r), (s[6] = e), br(t, s, n, 1, r, i);
                })(s, i[6], a, n, l, o),
              t.attachToViewContainerRef(),
              zn(Ra(i), r, t),
              t
            );
          }
          move(t, e) {
            return this.insert(t, e);
          }
          indexOf(t) {
            const e = Fa(this._lContainer);
            return null !== e ? e.indexOf(t) : -1;
          }
          remove(t) {
            const e = this._adjustIndex(t, -1),
              n = ir(this._lContainer, e);
            n && (qn(Ra(this._lContainer), e), or(n[1], n));
          }
          detach(t) {
            const e = this._adjustIndex(t, -1),
              n = ir(this._lContainer, e);
            return n && null != qn(Ra(this._lContainer), e) ? new ya(n) : null;
          }
          _adjustIndex(t, e = 0) {
            return null == t ? this.length + e : t;
          }
        };
      function Fa(t) {
        return t[8];
      }
      function Ra(t) {
        return t[8] || (t[8] = []);
      }
      function Ma(t, e) {
        let n;
        const s = e[t.index];
        if (Gt(s)) n = s;
        else {
          let r;
          if (8 & t.type) r = me(s);
          else {
            const n = e[11];
            r = n.createComment("");
            const s = ye(t, e);
            cr(
              n,
              dr(n, s),
              r,
              (function(t, e) {
                return pe(t) ? t.nextSibling(e) : e.nextSibling;
              })(n, s),
              !1
            );
          }
          (e[t.index] = n = mi(s, e, r, t)), bi(e, n);
        }
        return new Pa(n, t, e);
      }
      const Va = {};
      class ja extends Qo {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const e = Ut(t);
          return new Ha(e, this.ngModule);
        }
      }
      function La(t) {
        const e = [];
        for (let n in t)
          t.hasOwnProperty(n) && e.push({ propName: t[n], templateName: n });
        return e;
      }
      const Ba = new Ln("SCHEDULER_TOKEN", {
        providedIn: "root",
        factory: () => Zs
      });
      class Ha extends Uo {
        constructor(t, e) {
          super(),
            (this.componentDef = t),
            (this.ngModule = e),
            (this.componentType = t.type),
            (this.selector = t.selectors.map(Fr).join(",")),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!e);
        }
        get inputs() {
          return La(this.componentDef.inputs);
        }
        get outputs() {
          return La(this.componentDef.outputs);
        }
        create(t, e, n, s) {
          const r = (s = s || this.ngModule)
              ? (function(t, e) {
                  return {
                    get: (n, s, r) => {
                      const i = t.get(n, Va, r);
                      return i !== Va || s === Va ? i : e.get(n, s, r);
                    }
                  };
                })(t, s.injector)
              : t,
            i = r.get(Jo, fe),
            o = r.get(ea, null),
            a = i.createRenderer(null, this.componentDef),
            l = this.componentDef.selectors[0][0] || "div",
            c = n
              ? (function(t, e, n) {
                  if (pe(t)) return t.selectRootElement(e, n === Ct.ShadowDom);
                  let s = "string" == typeof e ? t.querySelector(e) : e;
                  return (s.textContent = ""), s;
                })(a, n, this.componentDef.encapsulation)
              : sr(
                  i.createRenderer(null, this.componentDef),
                  l,
                  (function(t) {
                    const e = t.toLowerCase();
                    return "svg" === e
                      ? "http://www.w3.org/2000/svg"
                      : "math" === e
                      ? "http://www.w3.org/1998/MathML/"
                      : null;
                  })(l)
                ),
            u = this.componentDef.onPush ? 576 : 528,
            h = {
              components: [],
              scheduler: Zs,
              clean: Si,
              playerHandler: null,
              flags: 0
            },
            d = ni(0, null, null, 1, 0, null, null, null, null, null),
            p = Ur(null, d, h, u, null, null, i, a, o, r);
          let f, m;
          $e(p);
          try {
            const t = (function(t, e, n, s, r, i) {
              const o = n[1];
              n[20] = t;
              const a = Wr(o, 20, 2, "#host", null),
                l = (a.mergedAttrs = e.hostAttrs);
              null !== l &&
                (Ii(a, l, !0),
                null !== t &&
                  (ln(r, t, l),
                  null !== a.classes && Cr(r, t, a.classes),
                  null !== a.styles && wr(r, t, a.styles)));
              const c = s.createRenderer(t, e),
                u = Ur(
                  n,
                  ei(e),
                  null,
                  e.onPush ? 64 : 16,
                  n[20],
                  a,
                  s,
                  c,
                  null,
                  null
                );
              return (
                o.firstCreatePass &&
                  (En(bn(a, n), o, e.type), li(o, a), ui(a, n.length, 1)),
                bi(n, u),
                (n[20] = u)
              );
            })(c, this.componentDef, p, i, a);
            if (c)
              if (n) ln(a, c, ["ng-version", sa.full]);
              else {
                const { attrs: t, classes: e } = (function(t) {
                  const e = [],
                    n = [];
                  let s = 1,
                    r = 2;
                  for (; s < t.length; ) {
                    let i = t[s];
                    if ("string" == typeof i)
                      2 === r
                        ? "" !== i && e.push(i, t[++s])
                        : 8 === r && n.push(i);
                    else {
                      if (!Ir(r)) break;
                      r = i;
                    }
                    s++;
                  }
                  return { attrs: e, classes: n };
                })(this.componentDef.selectors[0]);
                t && ln(a, c, t), e && e.length > 0 && Cr(a, c, e.join(" "));
              }
            if (((m = _e(d, Qt)), void 0 !== e)) {
              const t = (m.projection = []);
              for (let n = 0; n < this.ngContentSelectors.length; n++) {
                const s = e[n];
                t.push(null != s ? Array.from(s) : null);
              }
            }
            (f = (function(t, e, n, s, r) {
              const i = n[1],
                o = (function(t, e, n) {
                  const s = Oe();
                  t.firstCreatePass &&
                    (n.providersResolver && n.providersResolver(n),
                    hi(t, s, e, Qr(t, e, 1, null), n));
                  const r = Nn(e, t, s.directiveStart, s);
                  Qs(r, e);
                  const i = ye(s, e);
                  return i && Qs(i, e), r;
                })(i, n, e);
              if (
                (s.components.push(o),
                (t[8] = o),
                r && r.forEach(t => t(o, e)),
                e.contentQueries)
              ) {
                const t = Oe();
                e.contentQueries(1, o, t.directiveStart);
              }
              const a = Oe();
              return (
                !i.firstCreatePass ||
                  (null === e.hostBindings && null === e.hostAttrs) ||
                  (Ye(a.index),
                  oi(n[1], a, 0, a.directiveStart, a.directiveEnd, e),
                  ai(e, o)),
                o
              );
            })(t, this.componentDef, p, h, [Qi])),
              Zr(d, p, null);
          } finally {
            Ke();
          }
          return new za(this.componentType, f, Ko(m, p), p, m);
        }
      }
      class za extends class {} {
        constructor(t, e, n, s, r) {
          super(),
            (this.location = n),
            (this._rootLView = s),
            (this._tNode = r),
            (this.instance = e),
            (this.hostView = this.changeDetectorRef = new _a(s)),
            (this.componentType = t);
        }
        get injector() {
          return new Fn(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      const qa = new Map();
      class $a extends Ia {
        constructor(t, e) {
          super(),
            (this._parent = e),
            (this._bootstrapComponents = []),
            (this.injector = this),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new ja(this));
          const n = Wt(t),
            s = t[Ft] || null;
          s && Mo(s),
            (this._bootstrapComponents = Ks(n.bootstrap)),
            (this._r3Injector = ji(
              t,
              e,
              [
                { provide: Ia, useValue: this },
                { provide: Qo, useValue: this.componentFactoryResolver }
              ],
              et(t)
            )),
            this._r3Injector._resolveInjectorDefTypes(),
            (this.instance = this.get(t));
        }
        get(t, e = Wi.THROW_IF_NOT_FOUND, n = gt.Default) {
          return t === Wi || t === Ia || t === Oi
            ? this
            : this._r3Injector.get(t, e, n);
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach(t => t()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Ua extends class {} {
        constructor(t) {
          super(),
            (this.moduleType = t),
            null !== Wt(t) &&
              (function(t) {
                const e = new Set();
                !(function t(n) {
                  const s = Wt(n, !0),
                    r = s.id;
                  null !== r &&
                    ((function(t, e, n) {
                      if (e && e !== n)
                        throw new Error(
                          `Duplicate module registered for ${t} - ${et(
                            e
                          )} vs ${et(e.name)}`
                        );
                    })(r, qa.get(r), n),
                    qa.set(r, n));
                  const i = Ks(s.imports);
                  for (const o of i) e.has(o) || (e.add(o), t(o));
                })(t);
              })(t);
        }
        create(t) {
          return new $a(this.moduleType, t);
        }
      }
      const Wa = class extends E {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, e, n) {
          let s,
            r = t => null,
            i = () => null;
          t && "object" == typeof t
            ? ((s = this.__isAsync
                ? e => {
                    setTimeout(() => t.next(e));
                  }
                : e => {
                    t.next(e);
                  }),
              t.error &&
                (r = this.__isAsync
                  ? e => {
                      setTimeout(() => t.error(e));
                    }
                  : e => {
                      t.error(e);
                    }),
              t.complete &&
                (i = this.__isAsync
                  ? () => {
                      setTimeout(() => t.complete());
                    }
                  : () => {
                      t.complete();
                    }))
            : ((s = this.__isAsync
                ? e => {
                    setTimeout(() => t(e));
                  }
                : e => {
                    t(e);
                  }),
              e &&
                (r = this.__isAsync
                  ? t => {
                      setTimeout(() => e(t));
                    }
                  : t => {
                      e(t);
                    }),
              n &&
                (i = this.__isAsync
                  ? () => {
                      setTimeout(() => n());
                    }
                  : () => {
                      n();
                    }));
          const o = super.subscribe(s, r, i);
          return t instanceof h && t.add(o), o;
        }
      };
      function Qa() {
        return this._results[to()]();
      }
      class Za {
        constructor() {
          (this.dirty = !0),
            (this._results = []),
            (this.changes = new Wa()),
            (this.length = 0);
          const t = to(),
            e = Za.prototype;
          e[t] || (e[t] = Qa);
        }
        map(t) {
          return this._results.map(t);
        }
        filter(t) {
          return this._results.filter(t);
        }
        find(t) {
          return this._results.find(t);
        }
        reduce(t, e) {
          return this._results.reduce(t, e);
        }
        forEach(t) {
          this._results.forEach(t);
        }
        some(t) {
          return this._results.some(t);
        }
        toArray() {
          return this._results.slice();
        }
        toString() {
          return this._results.toString();
        }
        reset(t) {
          (this._results = Bn(t)),
            (this.dirty = !1),
            (this.length = this._results.length),
            (this.last = this._results[this.length - 1]),
            (this.first = this._results[0]);
        }
        notifyOnChanges() {
          this.changes.emit(this);
        }
        setDirty() {
          this.dirty = !0;
        }
        destroy() {
          this.changes.complete(), this.changes.unsubscribe();
        }
      }
      class Ka {
        constructor(t) {
          (this.queryList = t), (this.matches = null);
        }
        clone() {
          return new Ka(this.queryList);
        }
        setDirty() {
          this.queryList.setDirty();
        }
      }
      class Ga {
        constructor(t = []) {
          this.queries = t;
        }
        createEmbeddedView(t) {
          const e = t.queries;
          if (null !== e) {
            const n =
                null !== t.contentQueries ? t.contentQueries[0] : e.length,
              s = [];
            for (let t = 0; t < n; t++) {
              const n = e.getByIndex(t);
              s.push(this.queries[n.indexInDeclarationView].clone());
            }
            return new Ga(s);
          }
          return null;
        }
        insertView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        detachView(t) {
          this.dirtyQueriesWithMatches(t);
        }
        dirtyQueriesWithMatches(t) {
          for (let e = 0; e < this.queries.length; e++)
            null !== al(t, e).matches && this.queries[e].setDirty();
        }
      }
      class Ya {
        constructor(t, e, n, s = null) {
          (this.predicate = t),
            (this.descendants = e),
            (this.isStatic = n),
            (this.read = s);
        }
      }
      class Ja {
        constructor(t = []) {
          this.queries = t;
        }
        elementStart(t, e) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].elementStart(t, e);
        }
        elementEnd(t) {
          for (let e = 0; e < this.queries.length; e++)
            this.queries[e].elementEnd(t);
        }
        embeddedTView(t) {
          let e = null;
          for (let n = 0; n < this.length; n++) {
            const s = null !== e ? e.length : 0,
              r = this.getByIndex(n).embeddedTView(t, s);
            r &&
              ((r.indexInDeclarationView = n),
              null !== e ? e.push(r) : (e = [r]));
          }
          return null !== e ? new Ja(e) : null;
        }
        template(t, e) {
          for (let n = 0; n < this.queries.length; n++)
            this.queries[n].template(t, e);
        }
        getByIndex(t) {
          return this.queries[t];
        }
        get length() {
          return this.queries.length;
        }
        track(t) {
          this.queries.push(t);
        }
      }
      class Xa {
        constructor(t, e = -1) {
          (this.metadata = t),
            (this.matches = null),
            (this.indexInDeclarationView = -1),
            (this.crossesNgTemplate = !1),
            (this._appliesToNextNode = !0),
            (this._declarationNodeIndex = e);
        }
        elementStart(t, e) {
          this.isApplyingToNode(e) && this.matchTNode(t, e);
        }
        elementEnd(t) {
          this._declarationNodeIndex === t.index &&
            (this._appliesToNextNode = !1);
        }
        template(t, e) {
          this.elementStart(t, e);
        }
        embeddedTView(t, e) {
          return this.isApplyingToNode(t)
            ? ((this.crossesNgTemplate = !0),
              this.addMatch(-t.index, e),
              new Xa(this.metadata))
            : null;
        }
        isApplyingToNode(t) {
          if (this._appliesToNextNode && !1 === this.metadata.descendants) {
            const e = this._declarationNodeIndex;
            let n = t.parent;
            for (; null !== n && 8 & n.type && n.index !== e; ) n = n.parent;
            return e === (null !== n ? n.index : -1);
          }
          return this._appliesToNextNode;
        }
        matchTNode(t, e) {
          const n = this.metadata.predicate;
          if (Array.isArray(n))
            for (let s = 0; s < n.length; s++) {
              const r = n[s];
              this.matchTNodeWithReadOption(t, e, tl(e, r)),
                this.matchTNodeWithReadOption(t, e, On(e, t, r, !1, !1));
            }
          else
            n === Ta
              ? 4 & e.type && this.matchTNodeWithReadOption(t, e, -1)
              : this.matchTNodeWithReadOption(t, e, On(e, t, n, !1, !1));
        }
        matchTNodeWithReadOption(t, e, n) {
          if (null !== n) {
            const s = this.metadata.read;
            if (null !== s)
              if (s === Yo || s === Na || (s === Ta && 4 & e.type))
                this.addMatch(e.index, -2);
              else {
                const n = On(e, t, s, !1, !1);
                null !== n && this.addMatch(e.index, n);
              }
            else this.addMatch(e.index, n);
          }
        }
        addMatch(t, e) {
          null === this.matches
            ? (this.matches = [t, e])
            : this.matches.push(t, e);
        }
      }
      function tl(t, e) {
        const n = t.localNames;
        if (null !== n)
          for (let s = 0; s < n.length; s += 2) if (n[s] === e) return n[s + 1];
        return null;
      }
      function el(t, e, n, s) {
        return -1 === n
          ? (function(t, e) {
              return 11 & t.type ? Ko(t, e) : 4 & t.type ? Aa(t, e) : null;
            })(e, t)
          : -2 === n
          ? (function(t, e, n) {
              return n === Yo
                ? Ko(e, t)
                : n === Ta
                ? Aa(e, t)
                : n === Na
                ? Ma(e, t)
                : void 0;
            })(t, e, s)
          : Nn(t, t[1], n, e);
      }
      function nl(t, e, n, s) {
        const r = e[19].queries[s];
        if (null === r.matches) {
          const s = t.data,
            i = n.matches,
            o = [];
          for (let t = 0; t < i.length; t += 2) {
            const r = i[t];
            o.push(r < 0 ? null : el(e, s[r], i[t + 1], n.metadata.read));
          }
          r.matches = o;
        }
        return r.matches;
      }
      function sl(t, e, n, s) {
        const r = t.queries.getByIndex(n),
          i = r.matches;
        if (null !== i) {
          const o = nl(t, e, r, n);
          for (let t = 0; t < i.length; t += 2) {
            const n = i[t];
            if (n > 0) s.push(o[t / 2]);
            else {
              const r = i[t + 1],
                o = e[-n];
              for (let t = Zt; t < o.length; t++) {
                const e = o[t];
                e[17] === e[3] && sl(e[1], e, r, s);
              }
              if (null !== o[9]) {
                const t = o[9];
                for (let e = 0; e < t.length; e++) {
                  const n = t[e];
                  sl(n[1], n, r, s);
                }
              }
            }
          }
        }
        return s;
      }
      function rl(t) {
        const e = Ae(),
          n = Ie(),
          s = Be();
        He(s + 1);
        const r = al(n, s);
        if (t.dirty && we(e) === r.metadata.isStatic) {
          if (null === r.matches) t.reset([]);
          else {
            const i = r.crossesNgTemplate ? sl(n, e, s, []) : nl(n, e, r, s);
            t.reset(i), t.notifyOnChanges();
          }
          return !0;
        }
        return !1;
      }
      function il(t, e, n) {
        !(function(t, e, n, s, r, i) {
          t.firstCreatePass &&
            (function(t, e, n) {
              null === t.queries && (t.queries = new Ja()),
                t.queries.track(new Xa(e, -1));
            })(t, new Ya(n, s, false, r)),
            (function(t, e) {
              const n = new Za();
              si(t, e, n, n.destroy),
                null === e[19] && (e[19] = new Ga()),
                e[19].queries.push(new Ka(n));
            })(t, e);
        })(Ie(), Ae(), t, e, n);
      }
      function ol() {
        return (t = Ae()), (e = Be()), t[19].queries[e].queryList;
        var t, e;
      }
      function al(t, e) {
        return t.queries.getByIndex(e);
      }
      const ll = new Ln("Application Initializer");
      let cl = (() => {
        class t {
          constructor(t) {
            (this.appInits = t),
              (this.resolve = Zo),
              (this.reject = Zo),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((t, e) => {
                (this.resolve = t), (this.reject = e);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const t = [],
              e = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let n = 0; n < this.appInits.length; n++) {
                const e = this.appInits[n]();
                ho(e) && t.push(e);
              }
            Promise.all(t)
              .then(() => {
                e();
              })
              .catch(t => {
                this.reject(t);
              }),
              0 === t.length && e(),
              (this.initialized = !0);
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(os(ll, 8));
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const ul = new Ln("AppId"),
        hl = {
          provide: ul,
          useFactory: function() {
            return `${dl()}${dl()}${dl()}`;
          },
          deps: []
        };
      function dl() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const pl = new Ln("Platform Initializer"),
        fl = new Ln("Platform ID"),
        ml = new Ln("appBootstrapListener");
      let gl = (() => {
        class t {
          log(t) {
            console.log(t);
          }
          warn(t) {
            console.warn(t);
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)();
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const yl = new Ln("LocaleId"),
        _l = new Ln("DefaultCurrencyCode");
      class bl {
        constructor(t, e) {
          (this.ngModuleFactory = t), (this.componentFactories = e);
        }
      }
      const vl = function(t) {
          return new Ua(t);
        },
        wl = vl,
        Cl = function(t) {
          return Promise.resolve(vl(t));
        },
        El = function(t) {
          const e = vl(t),
            n = Ks(Wt(t).declarations).reduce((t, e) => {
              const n = Ut(e);
              return n && t.push(new Ha(n)), t;
            }, []);
          return new bl(e, n);
        },
        Sl = El,
        Tl = function(t) {
          return Promise.resolve(El(t));
        };
      let xl = (() => {
        class t {
          constructor() {
            (this.compileModuleSync = wl),
              (this.compileModuleAsync = Cl),
              (this.compileModuleAndAllComponentsSync = Sl),
              (this.compileModuleAndAllComponentsAsync = Tl);
          }
          clearCache() {}
          clearCacheFor(t) {}
          getModuleId(t) {}
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)();
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const kl = (() => Promise.resolve(0))();
      function Al(t) {
        "undefined" == typeof Zone
          ? kl.then(() => {
              t && t.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", t);
      }
      class Il {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: e = !1
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Wa(!1)),
            (this.onMicrotaskEmpty = new Wa(!1)),
            (this.onStable = new Wa(!1)),
            (this.onError = new Wa(!1)),
            "undefined" == typeof Zone)
          )
            throw new Error("In this configuration Angular requires Zone.js");
          Zone.assertZonePatched();
          const n = this;
          (n._nesting = 0),
            (n._outer = n._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (n._inner = n._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (n._inner = n._inner.fork(Zone.longStackTraceZoneSpec)),
            (n.shouldCoalesceEventChangeDetection = e),
            (n.lastRequestAnimationFrameId = -1),
            (n.nativeRequestAnimationFrame = (function() {
              let t = kt.requestAnimationFrame,
                e = kt.cancelAnimationFrame;
              if ("undefined" != typeof Zone && t && e) {
                const n = t[Zone.__symbol__("OriginalDelegate")];
                n && (t = n);
                const s = e[Zone.__symbol__("OriginalDelegate")];
                s && (e = s);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: e
              };
            })().nativeRequestAnimationFrame),
            (function(t) {
              const e =
                !!t.shouldCoalesceEventChangeDetection &&
                t.nativeRequestAnimationFrame &&
                (() => {
                  !(function(t) {
                    -1 === t.lastRequestAnimationFrameId &&
                      ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
                        kt,
                        () => {
                          t.fakeTopEventTask ||
                            (t.fakeTopEventTask = Zone.root.scheduleEventTask(
                              "fakeTopEventTask",
                              () => {
                                (t.lastRequestAnimationFrameId = -1),
                                  Dl(t),
                                  Nl(t);
                              },
                              void 0,
                              () => {},
                              () => {}
                            )),
                            t.fakeTopEventTask.invoke();
                        }
                      )),
                      Dl(t));
                  })(t);
                });
              t._inner = t._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0, maybeDelayChangeDetection: e },
                onInvokeTask: (n, s, r, i, o, a) => {
                  try {
                    return Pl(t), n.invokeTask(r, i, o, a);
                  } finally {
                    e && "eventTask" === i.type && e(), Fl(t);
                  }
                },
                onInvoke: (e, n, s, r, i, o, a) => {
                  try {
                    return Pl(t), e.invoke(s, r, i, o, a);
                  } finally {
                    Fl(t);
                  }
                },
                onHasTask: (e, n, s, r) => {
                  e.hasTask(s, r),
                    n === s &&
                      ("microTask" == r.change
                        ? ((t._hasPendingMicrotasks = r.microTask),
                          Dl(t),
                          Nl(t))
                        : "macroTask" == r.change &&
                          (t.hasPendingMacrotasks = r.macroTask));
                },
                onHandleError: (e, n, s, r) => (
                  e.handleError(s, r),
                  t.runOutsideAngular(() => t.onError.emit(r)),
                  !1
                )
              });
            })(n);
        }
        static isInAngularZone() {
          return !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!Il.isInAngularZone())
            throw new Error("Expected to be in Angular Zone, but it is not!");
        }
        static assertNotInAngularZone() {
          if (Il.isInAngularZone())
            throw new Error("Expected to not be in Angular Zone, but it is!");
        }
        run(t, e, n) {
          return this._inner.run(t, e, n);
        }
        runTask(t, e, n, s) {
          const r = this._inner,
            i = r.scheduleEventTask("NgZoneEvent: " + s, t, Ol, Zo, Zo);
          try {
            return r.runTask(i, e, n);
          } finally {
            r.cancelTask(i);
          }
        }
        runGuarded(t, e, n) {
          return this._inner.runGuarded(t, e, n);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const Ol = {};
      function Nl(t) {
        if (0 == t._nesting && !t.hasPendingMicrotasks && !t.isStable)
          try {
            t._nesting++, t.onMicrotaskEmpty.emit(null);
          } finally {
            if ((t._nesting--, !t.hasPendingMicrotasks))
              try {
                t.runOutsideAngular(() => t.onStable.emit(null));
              } finally {
                t.isStable = !0;
              }
          }
      }
      function Dl(t) {
        t.hasPendingMicrotasks = !!(
          t._hasPendingMicrotasks ||
          (t.shouldCoalesceEventChangeDetection &&
            -1 !== t.lastRequestAnimationFrameId)
        );
      }
      function Pl(t) {
        t._nesting++,
          t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
      }
      function Fl(t) {
        t._nesting--, Nl(t);
      }
      class Rl {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new Wa()),
            (this.onMicrotaskEmpty = new Wa()),
            (this.onStable = new Wa()),
            (this.onError = new Wa());
        }
        run(t, e, n) {
          return t.apply(e, n);
        }
        runGuarded(t, e, n) {
          return t.apply(e, n);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, e, n, s) {
          return t.apply(e, n);
        }
      }
      let Ml = (() => {
          class t {
            constructor(t) {
              (this._ngZone = t),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                this._watchAngularEvents(),
                t.run(() => {
                  this.taskTrackingZone =
                    "undefined" == typeof Zone
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                }
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      Il.assertNotInAngularZone(),
                        Al(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    }
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                Al(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let t = this._callbacks.pop();
                    clearTimeout(t.timeoutId), t.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let t = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  e =>
                    !e.updateCb ||
                    !e.updateCb(t) ||
                    (clearTimeout(e.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map(t => ({
                    source: t.source,
                    creationLocation: t.creationLocation,
                    data: t.data
                  }))
                : [];
            }
            addCallback(t, e, n) {
              let s = -1;
              e &&
                e > 0 &&
                (s = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    t => t.timeoutId !== s
                  )),
                    t(this._didWork, this.getPendingTasks());
                }, e)),
                this._callbacks.push({ doneCb: t, timeoutId: s, updateCb: n });
            }
            whenStable(t, e, n) {
              if (n && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/dist/task-tracking.js" loaded?'
                );
              this.addCallback(t, e, n), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            findProviders(t, e, n) {
              return [];
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(os(Il));
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Vl = (() => {
          class t {
            constructor() {
              (this._applications = new Map()), Bl.addToWindow(this);
            }
            registerApplication(t, e) {
              this._applications.set(t, e);
            }
            unregisterApplication(t) {
              this._applications.delete(t);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(t) {
              return this._applications.get(t) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(t, e = !0) {
              return Bl.findTestabilityInTree(this, t, e);
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)();
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      class jl {
        addToWindow(t) {}
        findTestabilityInTree(t, e, n) {
          return null;
        }
      }
      let Ll,
        Bl = new jl(),
        Hl = !0,
        zl = !1;
      function ql() {
        return (zl = !0), Hl;
      }
      const $l = new Ln("AllowMultipleToken");
      function Ul(t, e, n = []) {
        const s = "Platform: " + e,
          r = new Ln(s);
        return (e = []) => {
          let i = Wl();
          if (!i || i.injector.get($l, !1))
            if (t) t(n.concat(e).concat({ provide: r, useValue: !0 }));
            else {
              const t = n
                .concat(e)
                .concat(
                  { provide: r, useValue: !0 },
                  { provide: Di, useValue: "platform" }
                );
              !(function(t) {
                if (Ll && !Ll.destroyed && !Ll.injector.get($l, !1))
                  throw new Error(
                    "There can be only one platform. Destroy the previous one to create a new one."
                  );
                Ll = t.get(Ql);
                const e = t.get(pl, null);
                e && e.forEach(t => t());
              })(Wi.create({ providers: t, name: s }));
            }
          return (function(t) {
            const e = Wl();
            if (!e) throw new Error("No platform exists!");
            if (!e.injector.get(t, null))
              throw new Error(
                "A platform with a different configuration has been created. Please destroy it first."
              );
            return e;
          })(r);
        };
      }
      function Wl() {
        return Ll && !Ll.destroyed ? Ll : null;
      }
      let Ql = (() => {
        class t {
          constructor(t) {
            (this._injector = t),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(t, e) {
            const n = (function(t, e) {
                let n;
                return (
                  (n =
                    "noop" === t
                      ? new Rl()
                      : ("zone.js" === t ? void 0 : t) ||
                        new Il({
                          enableLongStackTrace: ql(),
                          shouldCoalesceEventChangeDetection: e
                        })),
                  n
                );
              })(e ? e.ngZone : void 0, (e && e.ngZoneEventCoalescing) || !1),
              s = [{ provide: Il, useValue: n }];
            return n.run(() => {
              const e = Wi.create({
                  providers: s,
                  parent: this.injector,
                  name: t.moduleType.name
                }),
                r = t.create(e),
                i = r.injector.get(Ws, null);
              if (!i)
                throw new Error(
                  "No ErrorHandler. Is platform module (BrowserModule) included?"
                );
              return (
                n.runOutsideAngular(() => {
                  const t = n.onError.subscribe({
                    next: t => {
                      i.handleError(t);
                    }
                  });
                  r.onDestroy(() => {
                    Gl(this._modules, r), t.unsubscribe();
                  });
                }),
                (function(t, e, n) {
                  try {
                    const s = n();
                    return ho(s)
                      ? s.catch(n => {
                          throw (e.runOutsideAngular(() => t.handleError(n)),
                          n);
                        })
                      : s;
                  } catch (s) {
                    throw (e.runOutsideAngular(() => t.handleError(s)), s);
                  }
                })(i, n, () => {
                  const t = r.injector.get(cl);
                  return (
                    t.runInitializers(),
                    t.donePromise.then(
                      () => (
                        Mo(r.injector.get(yl, Fo) || Fo),
                        this._moduleDoBootstrap(r),
                        r
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(t, e = []) {
            const n = Zl({}, e);
            return (function(t, e, n) {
              const s = new Ua(n);
              return Promise.resolve(s);
            })(0, 0, t).then(t => this.bootstrapModuleFactory(t, n));
          }
          _moduleDoBootstrap(t) {
            const e = t.injector.get(Kl);
            if (t._bootstrapComponents.length > 0)
              t._bootstrapComponents.forEach(t => e.bootstrap(t));
            else {
              if (!t.instance.ngDoBootstrap)
                throw new Error(
                  `The module ${et(
                    t.instance.constructor
                  )} was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.`
                );
              t.instance.ngDoBootstrap(e);
            }
            this._modules.push(t);
          }
          onDestroy(t) {
            this._destroyListeners.push(t);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed)
              throw new Error("The platform has already been destroyed!");
            this._modules.slice().forEach(t => t.destroy()),
              this._destroyListeners.forEach(t => t()),
              (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(os(Wi));
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Zl(t, e) {
        return Array.isArray(e)
          ? e.reduce(Zl, t)
          : Object.assign(Object.assign({}, t), e);
      }
      let Kl = (() => {
        class t {
          constructor(t, e, n, s, r, i) {
            (this._zone = t),
              (this._console = e),
              (this._injector = n),
              (this._exceptionHandler = s),
              (this._componentFactoryResolver = r),
              (this._initStatus = i),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription = this._zone.onMicrotaskEmpty.subscribe(
                {
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  }
                }
              ));
            const o = new _(t => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    t.next(this._stable), t.complete();
                  });
              }),
              a = new _(t => {
                let e;
                this._zone.runOutsideAngular(() => {
                  e = this._zone.onStable.subscribe(() => {
                    Il.assertNotInAngularZone(),
                      Al(() => {
                        this._stable ||
                          this._zone.hasPendingMacrotasks ||
                          this._zone.hasPendingMicrotasks ||
                          ((this._stable = !0), t.next(!0));
                      });
                  });
                });
                const n = this._zone.onUnstable.subscribe(() => {
                  Il.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        t.next(!1);
                      }));
                });
                return () => {
                  e.unsubscribe(), n.unsubscribe();
                };
              });
            this.isStable = $(o, a.pipe(J()));
          }
          bootstrap(t, e) {
            if (!this._initStatus.done)
              throw new Error(
                "Cannot bootstrap as there are still asynchronous initializers running. Bootstrap components in the `ngDoBootstrap` method of the root module."
              );
            let n;
            (n =
              t instanceof Uo
                ? t
                : this._componentFactoryResolver.resolveComponentFactory(t)),
              this.componentTypes.push(n.componentType);
            const s = n.isBoundToModule ? void 0 : this._injector.get(Ia),
              r = n.create(Wi.NULL, [], e || n.selector, s),
              i = r.location.nativeElement,
              o = r.injector.get(Ml, null),
              a = o && r.injector.get(Vl);
            return (
              o && a && a.registerApplication(i, o),
              r.onDestroy(() => {
                this.detachView(r.hostView),
                  Gl(this.components, r),
                  a && a.unregisterApplication(i);
              }),
              this._loadComponent(r),
              ql() &&
                this._console.log(
                  "Angular is running in development mode. Call enableProdMode() to enable production mode."
                ),
              r
            );
          }
          tick() {
            if (this._runningTick)
              throw new Error("ApplicationRef.tick is called recursively");
            try {
              this._runningTick = !0;
              for (let t of this._views) t.detectChanges();
            } catch (t) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(t)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(t) {
            const e = t;
            this._views.push(e), e.attachToAppRef(this);
          }
          detachView(t) {
            const e = t;
            Gl(this._views, e), e.detachFromAppRef();
          }
          _loadComponent(t) {
            this.attachView(t.hostView),
              this.tick(),
              this.components.push(t),
              this._injector
                .get(ml, [])
                .concat(this._bootstrapListeners)
                .forEach(e => e(t));
          }
          ngOnDestroy() {
            this._views.slice().forEach(t => t.destroy()),
              this._onMicrotaskEmptySubscription.unsubscribe();
          }
          get viewCount() {
            return this._views.length;
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(os(Il), os(gl), os(Wi), os(Ws), os(Qo), os(cl));
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      function Gl(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      const Yl = Ul(null, "core", [
          { provide: fl, useValue: "unknown" },
          { provide: Ql, deps: [Wi] },
          { provide: Vl, deps: [] },
          { provide: gl, deps: [] }
        ]),
        Jl = [
          { provide: Kl, useClass: Kl, deps: [Il, gl, Wi, Ws, Qo, cl] },
          {
            provide: Ba,
            deps: [Il],
            useFactory: function(t) {
              let e = [];
              return (
                t.onStable.subscribe(() => {
                  for (; e.length; ) e.pop()();
                }),
                function(t) {
                  e.push(t);
                }
              );
            }
          },
          { provide: cl, useClass: cl, deps: [[new Kn(), ll]] },
          { provide: xl, useClass: xl, deps: [] },
          hl,
          {
            provide: fa,
            useFactory: function() {
              return Ca;
            },
            deps: []
          },
          {
            provide: ma,
            useFactory: function() {
              return Ea;
            },
            deps: []
          },
          {
            provide: yl,
            useFactory: function(t) {
              return (
                Mo(
                  (t =
                    t ||
                    ("undefined" != typeof $localize && $localize.locale) ||
                    Fo)
                ),
                t
              );
            },
            deps: [[new Zn(yl), new Kn(), new Yn()]]
          },
          { provide: _l, useValue: "USD" }
        ];
      let Xl = (() => {
        class t {
          constructor(t) {}
        }
        return (
          (t.ɵmod = zt({ type: t })),
          (t.ɵinj = lt({
            factory: function(e) {
              return new (e || t)(os(Kl));
            },
            providers: Jl
          })),
          t
        );
      })();
      class tc {
        constructor(t, e) {
          (this.author = t), (this.content = e);
        }
      }
      let ec = (() => {
          class t {
            constructor() {
              (this.conversation = new E()),
                (this.messageMap = {
                  Hi: "Hello",
                  hi: "Hello",
                  "Who are you": "My name is Agular Bot",
                  "What is Angular": "Angular is the best framework ever",
                  default: "I can't understand. Can you please repeat"
                });
            }
            getBotAnswer(t) {
              const e = new tc("user", t);
              this.conversation.next([e]);
              const n = new tc("bot", this.getBotMessage(t));
              setTimeout(() => {
                this.conversation.next([n]);
              }, 1500);
            }
            getBotMessage(t) {
              return this.messageMap[t] || this.messageMap.default;
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)();
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        nc = null;
      function sc() {
        return nc;
      }
      const rc = new Ln("DocumentToken");
      var ic = (function(t) {
        return (
          (t[(t.Zero = 0)] = "Zero"),
          (t[(t.One = 1)] = "One"),
          (t[(t.Two = 2)] = "Two"),
          (t[(t.Few = 3)] = "Few"),
          (t[(t.Many = 4)] = "Many"),
          (t[(t.Other = 5)] = "Other"),
          t
        );
      })({});
      class oc {}
      let ac = (() => {
          class t extends oc {
            constructor(t) {
              super(), (this.locale = t);
            }
            getPluralCategory(t, e) {
              switch (
                (function(t) {
                  return (function(t) {
                    const e = (function(t) {
                      return t.toLowerCase().replace(/_/g, "-");
                    })(t);
                    let n = Do(e);
                    if (n) return n;
                    const s = e.split("-")[0];
                    if (((n = Do(s)), n)) return n;
                    if ("en" === s) return Oo;
                    throw new Error(
                      `Missing locale data for the locale "${t}".`
                    );
                  })(t)[Po.PluralCase];
                })(e || this.locale)(t)
              ) {
                case ic.Zero:
                  return "zero";
                case ic.One:
                  return "one";
                case ic.Two:
                  return "two";
                case ic.Few:
                  return "few";
                case ic.Many:
                  return "many";
                default:
                  return "other";
              }
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(os(yl));
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        lc = (() => {
          class t {
            constructor(t, e, n, s) {
              (this._iterableDiffers = t),
                (this._keyValueDiffers = e),
                (this._ngEl = n),
                (this._renderer = s),
                (this._iterableDiffer = null),
                (this._keyValueDiffer = null),
                (this._initialClasses = []),
                (this._rawClass = null);
            }
            set klass(t) {
              this._removeClasses(this._initialClasses),
                (this._initialClasses =
                  "string" == typeof t ? t.split(/\s+/) : []),
                this._applyClasses(this._initialClasses),
                this._applyClasses(this._rawClass);
            }
            set ngClass(t) {
              this._removeClasses(this._rawClass),
                this._applyClasses(this._initialClasses),
                (this._iterableDiffer = null),
                (this._keyValueDiffer = null),
                (this._rawClass = "string" == typeof t ? t.split(/\s+/) : t),
                this._rawClass &&
                  (eo(this._rawClass)
                    ? (this._iterableDiffer = this._iterableDiffers
                        .find(this._rawClass)
                        .create())
                    : (this._keyValueDiffer = this._keyValueDiffers
                        .find(this._rawClass)
                        .create()));
            }
            ngDoCheck() {
              if (this._iterableDiffer) {
                const t = this._iterableDiffer.diff(this._rawClass);
                t && this._applyIterableChanges(t);
              } else if (this._keyValueDiffer) {
                const t = this._keyValueDiffer.diff(this._rawClass);
                t && this._applyKeyValueChanges(t);
              }
            }
            _applyKeyValueChanges(t) {
              t.forEachAddedItem(t => this._toggleClass(t.key, t.currentValue)),
                t.forEachChangedItem(t =>
                  this._toggleClass(t.key, t.currentValue)
                ),
                t.forEachRemovedItem(t => {
                  t.previousValue && this._toggleClass(t.key, !1);
                });
            }
            _applyIterableChanges(t) {
              t.forEachAddedItem(t => {
                if ("string" != typeof t.item)
                  throw new Error(
                    "NgClass can only toggle CSS classes expressed as strings, got " +
                      et(t.item)
                  );
                this._toggleClass(t.item, !0);
              }),
                t.forEachRemovedItem(t => this._toggleClass(t.item, !1));
            }
            _applyClasses(t) {
              t &&
                (Array.isArray(t) || t instanceof Set
                  ? t.forEach(t => this._toggleClass(t, !0))
                  : Object.keys(t).forEach(e => this._toggleClass(e, !!t[e])));
            }
            _removeClasses(t) {
              t &&
                (Array.isArray(t) || t instanceof Set
                  ? t.forEach(t => this._toggleClass(t, !1))
                  : Object.keys(t).forEach(t => this._toggleClass(t, !1)));
            }
            _toggleClass(t, e) {
              (t = t.trim()) &&
                t.split(/\s+/g).forEach(t => {
                  e
                    ? this._renderer.addClass(this._ngEl.nativeElement, t)
                    : this._renderer.removeClass(this._ngEl.nativeElement, t);
                });
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(io(fa), io(ma), io(Yo), io(Xo));
            }),
            (t.ɵdir = $t({
              type: t,
              selectors: [["", "ngClass", ""]],
              inputs: { klass: ["class", "klass"], ngClass: "ngClass" }
            })),
            t
          );
        })();
      class cc {
        constructor(t, e, n, s) {
          (this.$implicit = t),
            (this.ngForOf = e),
            (this.index = n),
            (this.count = s);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let uc = (() => {
        class t {
          constructor(t, e, n) {
            (this._viewContainer = t),
              (this._template = e),
              (this._differs = n),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForOf(t) {
            (this._ngForOf = t), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(t) {
            this._trackByFn = t;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          set ngForTemplate(t) {
            t && (this._template = t);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              if (!this._differ && n)
                try {
                  this._differ = this._differs
                    .find(n)
                    .create(this.ngForTrackBy);
                } catch (e) {
                  throw new Error(
                    `Cannot find a differ supporting object '${n}' of type '${((t = n),
                    t.name ||
                      typeof t)}'. NgFor only supports binding to Iterables such as Arrays.`
                  );
                }
            }
            var t;
            if (this._differ) {
              const t = this._differ.diff(this._ngForOf);
              t && this._applyChanges(t);
            }
          }
          _applyChanges(t) {
            const e = [];
            t.forEachOperation((t, n, s) => {
              if (null == t.previousIndex) {
                const n = this._viewContainer.createEmbeddedView(
                    this._template,
                    new cc(null, this._ngForOf, -1, -1),
                    null === s ? void 0 : s
                  ),
                  r = new hc(t, n);
                e.push(r);
              } else if (null == s)
                this._viewContainer.remove(null === n ? void 0 : n);
              else if (null !== n) {
                const r = this._viewContainer.get(n);
                this._viewContainer.move(r, s);
                const i = new hc(t, r);
                e.push(i);
              }
            });
            for (let n = 0; n < e.length; n++)
              this._perViewChange(e[n].view, e[n].record);
            for (let n = 0, s = this._viewContainer.length; n < s; n++) {
              const t = this._viewContainer.get(n);
              (t.context.index = n),
                (t.context.count = s),
                (t.context.ngForOf = this._ngForOf);
            }
            t.forEachIdentityChange(t => {
              this._viewContainer.get(t.currentIndex).context.$implicit =
                t.item;
            });
          }
          _perViewChange(t, e) {
            t.context.$implicit = e.item;
          }
          static ngTemplateContextGuard(t, e) {
            return !0;
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(io(Na), io(Ta), io(fa));
          }),
          (t.ɵdir = $t({
            type: t,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate"
            }
          })),
          t
        );
      })();
      class hc {
        constructor(t, e) {
          (this.record = t), (this.view = e);
        }
      }
      let dc = (() => {
        class t {}
        return (
          (t.ɵmod = zt({ type: t })),
          (t.ɵinj = lt({
            factory: function(e) {
              return new (e || t)();
            },
            providers: [{ provide: oc, useClass: ac }]
          })),
          t
        );
      })();
      class pc extends class extends class {} {
        constructor() {
          super();
        }
        supportsDOMEvents() {
          return !0;
        }
      } {
        static makeCurrent() {
          var t;
          (t = new pc()), nc || (nc = t);
        }
        getProperty(t, e) {
          return t[e];
        }
        log(t) {
          window.console && window.console.log && window.console.log(t);
        }
        logGroup(t) {
          window.console && window.console.group && window.console.group(t);
        }
        logGroupEnd() {
          window.console &&
            window.console.groupEnd &&
            window.console.groupEnd();
        }
        onAndCancel(t, e, n) {
          return (
            t.addEventListener(e, n, !1),
            () => {
              t.removeEventListener(e, n, !1);
            }
          );
        }
        dispatchEvent(t, e) {
          t.dispatchEvent(e);
        }
        remove(t) {
          return t.parentNode && t.parentNode.removeChild(t), t;
        }
        getValue(t) {
          return t.value;
        }
        createElement(t, e) {
          return (e = e || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, e) {
          return "window" === e
            ? window
            : "document" === e
            ? t
            : "body" === e
            ? t.body
            : null;
        }
        getHistory() {
          return window.history;
        }
        getLocation() {
          return window.location;
        }
        getBaseHref(t) {
          const e =
            mc || ((mc = document.querySelector("base")), mc)
              ? mc.getAttribute("href")
              : null;
          return null == e
            ? null
            : ((n = e),
              fc || (fc = document.createElement("a")),
              fc.setAttribute("href", n),
              "/" === fc.pathname.charAt(0) ? fc.pathname : "/" + fc.pathname);
          var n;
        }
        resetBaseElement() {
          mc = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        performanceNow() {
          return window.performance && window.performance.now
            ? window.performance.now()
            : new Date().getTime();
        }
        supportsCookies() {
          return !0;
        }
        getCookie(t) {
          return (function(t, e) {
            e = encodeURIComponent(e);
            for (const n of t.split(";")) {
              const t = n.indexOf("="),
                [s, r] = -1 == t ? [n, ""] : [n.slice(0, t), n.slice(t + 1)];
              if (s.trim() === e) return decodeURIComponent(r);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let fc,
        mc = null;
      const gc = new Ln("TRANSITION_ID"),
        yc = [
          {
            provide: ll,
            useFactory: function(t, e, n) {
              return () => {
                n.get(cl).donePromise.then(() => {
                  const n = sc();
                  Array.prototype.slice
                    .apply(e.querySelectorAll("style[ng-transition]"))
                    .filter(e => e.getAttribute("ng-transition") === t)
                    .forEach(t => n.remove(t));
                });
              };
            },
            deps: [gc, rc, Wi],
            multi: !0
          }
        ];
      class _c {
        static init() {
          var t;
          (t = new _c()), (Bl = t);
        }
        addToWindow(t) {
          (kt.getAngularTestability = (e, n = !0) => {
            const s = t.findTestabilityInTree(e, n);
            if (null == s)
              throw new Error("Could not find testability for element.");
            return s;
          }),
            (kt.getAllAngularTestabilities = () => t.getAllTestabilities()),
            (kt.getAllAngularRootElements = () => t.getAllRootElements()),
            kt.frameworkStabilizers || (kt.frameworkStabilizers = []),
            kt.frameworkStabilizers.push(t => {
              const e = kt.getAllAngularTestabilities();
              let n = e.length,
                s = !1;
              const r = function(e) {
                (s = s || e), n--, 0 == n && t(s);
              };
              e.forEach(function(t) {
                t.whenStable(r);
              });
            });
        }
        findTestabilityInTree(t, e, n) {
          if (null == e) return null;
          const s = t.getTestability(e);
          return null != s
            ? s
            : n
            ? sc().isShadowRoot(e)
              ? this.findTestabilityInTree(t, e.host, !0)
              : this.findTestabilityInTree(t, e.parentElement, !0)
            : null;
        }
      }
      const bc = new Ln("EventManagerPlugins");
      let vc = (() => {
        class t {
          constructor(t, e) {
            (this._zone = e),
              (this._eventNameToPlugin = new Map()),
              t.forEach(t => (t.manager = this)),
              (this._plugins = t.slice().reverse());
          }
          addEventListener(t, e, n) {
            return this._findPluginFor(e).addEventListener(t, e, n);
          }
          addGlobalEventListener(t, e, n) {
            return this._findPluginFor(e).addGlobalEventListener(t, e, n);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(t) {
            const e = this._eventNameToPlugin.get(t);
            if (e) return e;
            const n = this._plugins;
            for (let s = 0; s < n.length; s++) {
              const e = n[s];
              if (e.supports(t)) return this._eventNameToPlugin.set(t, e), e;
            }
            throw new Error("No event manager plugin found for event " + t);
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(os(bc), os(Il));
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class wc {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, e, n) {
          const s = sc().getGlobalEventTarget(this._doc, t);
          if (!s)
            throw new Error(`Unsupported event target ${s} for event ${e}`);
          return this.addEventListener(s, e, n);
        }
      }
      let Cc = (() => {
          class t {
            constructor() {
              this._stylesSet = new Set();
            }
            addStyles(t) {
              const e = new Set();
              t.forEach(t => {
                this._stylesSet.has(t) || (this._stylesSet.add(t), e.add(t));
              }),
                this.onStylesAdded(e);
            }
            onStylesAdded(t) {}
            getAllStyles() {
              return Array.from(this._stylesSet);
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)();
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Ec = (() => {
          class t extends Cc {
            constructor(t) {
              super(),
                (this._doc = t),
                (this._hostNodes = new Set()),
                (this._styleNodes = new Set()),
                this._hostNodes.add(t.head);
            }
            _addStylesToHost(t, e) {
              t.forEach(t => {
                const n = this._doc.createElement("style");
                (n.textContent = t), this._styleNodes.add(e.appendChild(n));
              });
            }
            addHost(t) {
              this._addStylesToHost(this._stylesSet, t), this._hostNodes.add(t);
            }
            removeHost(t) {
              this._hostNodes.delete(t);
            }
            onStylesAdded(t) {
              this._hostNodes.forEach(e => this._addStylesToHost(t, e));
            }
            ngOnDestroy() {
              this._styleNodes.forEach(t => sc().remove(t));
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(os(rc));
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac })),
            t
          );
        })();
      const Sc = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/"
        },
        Tc = /%COMP%/g;
      function xc(t, e, n) {
        for (let s = 0; s < e.length; s++) {
          let r = e[s];
          Array.isArray(r) ? xc(t, r, n) : ((r = r.replace(Tc, t)), n.push(r));
        }
        return n;
      }
      function kc(t) {
        return e => {
          if ("__ngUnwrap__" === e) return t;
          !1 === t(e) && (e.preventDefault(), (e.returnValue = !1));
        };
      }
      let Ac = (() => {
        class t {
          constructor(t, e, n) {
            (this.eventManager = t),
              (this.sharedStylesHost = e),
              (this.appId = n),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Ic(t));
          }
          createRenderer(t, e) {
            if (!t || !e) return this.defaultRenderer;
            switch (e.encapsulation) {
              case Ct.Emulated: {
                let n = this.rendererByCompId.get(e.id);
                return (
                  n ||
                    ((n = new Oc(
                      this.eventManager,
                      this.sharedStylesHost,
                      e,
                      this.appId
                    )),
                    this.rendererByCompId.set(e.id, n)),
                  n.applyToHost(t),
                  n
                );
              }
              case 1:
              case Ct.ShadowDom:
                return new Nc(this.eventManager, this.sharedStylesHost, t, e);
              default:
                if (!this.rendererByCompId.has(e.id)) {
                  const t = xc(e.id, e.styles, []);
                  this.sharedStylesHost.addStyles(t),
                    this.rendererByCompId.set(e.id, this.defaultRenderer);
                }
                return this.defaultRenderer;
            }
          }
          begin() {}
          end() {}
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(os(vc), os(Ec), os(ul));
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class Ic {
        constructor(t) {
          (this.eventManager = t), (this.data = Object.create(null));
        }
        destroy() {}
        createElement(t, e) {
          return e
            ? document.createElementNS(Sc[e] || e, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, e) {
          t.appendChild(e);
        }
        insertBefore(t, e, n) {
          t && t.insertBefore(e, n);
        }
        removeChild(t, e) {
          t && t.removeChild(e);
        }
        selectRootElement(t, e) {
          let n = "string" == typeof t ? document.querySelector(t) : t;
          if (!n)
            throw new Error(`The selector "${t}" did not match any elements`);
          return e || (n.textContent = ""), n;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, e, n, s) {
          if (s) {
            e = s + ":" + e;
            const r = Sc[s];
            r ? t.setAttributeNS(r, e, n) : t.setAttribute(e, n);
          } else t.setAttribute(e, n);
        }
        removeAttribute(t, e, n) {
          if (n) {
            const s = Sc[n];
            s ? t.removeAttributeNS(s, e) : t.removeAttribute(`${n}:${e}`);
          } else t.removeAttribute(e);
        }
        addClass(t, e) {
          t.classList.add(e);
        }
        removeClass(t, e) {
          t.classList.remove(e);
        }
        setStyle(t, e, n, s) {
          s & (Gs.DashCase | Gs.Important)
            ? t.style.setProperty(e, n, s & Gs.Important ? "important" : "")
            : (t.style[e] = n);
        }
        removeStyle(t, e, n) {
          n & Gs.DashCase ? t.style.removeProperty(e) : (t.style[e] = "");
        }
        setProperty(t, e, n) {
          t[e] = n;
        }
        setValue(t, e) {
          t.nodeValue = e;
        }
        listen(t, e, n) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, e, kc(n))
            : this.eventManager.addEventListener(t, e, kc(n));
        }
      }
      class Oc extends Ic {
        constructor(t, e, n, s) {
          super(t), (this.component = n);
          const r = xc(s + "-" + n.id, n.styles, []);
          e.addStyles(r),
            (this.contentAttr = "_ngcontent-%COMP%".replace(
              Tc,
              s + "-" + n.id
            )),
            (this.hostAttr = "_nghost-%COMP%".replace(Tc, s + "-" + n.id));
        }
        applyToHost(t) {
          super.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, e) {
          const n = super.createElement(t, e);
          return super.setAttribute(n, this.contentAttr, ""), n;
        }
      }
      class Nc extends Ic {
        constructor(t, e, n, s) {
          super(t),
            (this.sharedStylesHost = e),
            (this.hostEl = n),
            (this.shadowRoot = n.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const r = xc(s.id, s.styles, []);
          for (let i = 0; i < r.length; i++) {
            const t = document.createElement("style");
            (t.textContent = r[i]), this.shadowRoot.appendChild(t);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
        appendChild(t, e) {
          return super.appendChild(this.nodeOrShadowRoot(t), e);
        }
        insertBefore(t, e, n) {
          return super.insertBefore(this.nodeOrShadowRoot(t), e, n);
        }
        removeChild(t, e) {
          return super.removeChild(this.nodeOrShadowRoot(t), e);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
      }
      let Dc = (() => {
        class t extends wc {
          constructor(t) {
            super(t);
          }
          supports(t) {
            return !0;
          }
          addEventListener(t, e, n) {
            return (
              t.addEventListener(e, n, !1),
              () => this.removeEventListener(t, e, n)
            );
          }
          removeEventListener(t, e, n) {
            return t.removeEventListener(e, n);
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(os(rc));
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Pc = ["alt", "control", "meta", "shift"],
        Fc = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS"
        },
        Rc = {
          A: "1",
          B: "2",
          C: "3",
          D: "4",
          E: "5",
          F: "6",
          G: "7",
          H: "8",
          I: "9",
          J: "*",
          K: "+",
          M: "-",
          N: ".",
          O: "/",
          "`": "0",
          "\x90": "NumLock"
        },
        Mc = {
          alt: t => t.altKey,
          control: t => t.ctrlKey,
          meta: t => t.metaKey,
          shift: t => t.shiftKey
        };
      let Vc = (() => {
          class t extends wc {
            constructor(t) {
              super(t);
            }
            supports(e) {
              return null != t.parseEventName(e);
            }
            addEventListener(e, n, s) {
              const r = t.parseEventName(n),
                i = t.eventCallback(r.fullKey, s, this.manager.getZone());
              return this.manager
                .getZone()
                .runOutsideAngular(() =>
                  sc().onAndCancel(e, r.domEventName, i)
                );
            }
            static parseEventName(e) {
              const n = e.toLowerCase().split("."),
                s = n.shift();
              if (0 === n.length || ("keydown" !== s && "keyup" !== s))
                return null;
              const r = t._normalizeKey(n.pop());
              let i = "";
              if (
                (Pc.forEach(t => {
                  const e = n.indexOf(t);
                  e > -1 && (n.splice(e, 1), (i += t + "."));
                }),
                (i += r),
                0 != n.length || 0 === r.length)
              )
                return null;
              const o = {};
              return (o.domEventName = s), (o.fullKey = i), o;
            }
            static getEventFullKey(t) {
              let e = "",
                n = (function(t) {
                  let e = t.key;
                  if (null == e) {
                    if (((e = t.keyIdentifier), null == e))
                      return "Unidentified";
                    e.startsWith("U+") &&
                      ((e = String.fromCharCode(parseInt(e.substring(2), 16))),
                      3 === t.location && Rc.hasOwnProperty(e) && (e = Rc[e]));
                  }
                  return Fc[e] || e;
                })(t);
              return (
                (n = n.toLowerCase()),
                " " === n ? (n = "space") : "." === n && (n = "dot"),
                Pc.forEach(s => {
                  s != n && (0, Mc[s])(t) && (e += s + ".");
                }),
                (e += n),
                e
              );
            }
            static eventCallback(e, n, s) {
              return r => {
                t.getEventFullKey(r) === e && s.runGuarded(() => n(r));
              };
            }
            static _normalizeKey(t) {
              switch (t) {
                case "esc":
                  return "escape";
                default:
                  return t;
              }
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(os(rc));
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        jc = (() => {
          class t {}
          return (
            (t.ɵfac = function(e) {
              return new (e || t)();
            }),
            (t.ɵprov = at({
              factory: function() {
                return os(Lc);
              },
              token: t,
              providedIn: "root"
            })),
            t
          );
        })(),
        Lc = (() => {
          class t extends jc {
            constructor(t) {
              super(), (this._doc = t);
            }
            sanitize(t, e) {
              if (null == e) return null;
              switch (t) {
                case zs.NONE:
                  return e;
                case zs.HTML:
                  return _s(e, "HTML")
                    ? ys(e)
                    : (function(t, e) {
                        let n = null;
                        try {
                          Bs =
                            Bs ||
                            (function(t) {
                              const e = new ws(t);
                              return (function() {
                                try {
                                  return !!new window.DOMParser().parseFromString(
                                    us(""),
                                    "text/html"
                                  );
                                } catch (t) {
                                  return !1;
                                }
                              })()
                                ? new vs(e)
                                : e;
                            })(t);
                          let s = e ? String(e) : "";
                          n = Bs.getInertBodyElement(s);
                          let r = 5,
                            i = s;
                          do {
                            if (0 === r)
                              throw new Error(
                                "Failed to sanitize html because the input is unstable"
                              );
                            r--,
                              (s = i),
                              (i = n.innerHTML),
                              (n = Bs.getInertBodyElement(s));
                          } while (s !== i);
                          return new Ms().sanitizeChildren(Hs(n) || n);
                        } finally {
                          if (n) {
                            const t = Hs(n) || n;
                            for (; t.firstChild; ) t.removeChild(t.firstChild);
                          }
                        }
                      })(this._doc, String(e));
                case zs.STYLE:
                  return _s(e, "Style") ? ys(e) : e;
                case zs.SCRIPT:
                  if (_s(e, "Script")) return ys(e);
                  throw new Error("unsafe value used in a script context");
                case zs.URL:
                  return bs(e), _s(e, "URL") ? ys(e) : Ss(String(e));
                case zs.RESOURCE_URL:
                  if (_s(e, "ResourceURL")) return ys(e);
                  throw new Error(
                    "unsafe value used in a resource URL context (see https://g.co/ng/security#xss)"
                  );
                default:
                  throw new Error(
                    `Unexpected SecurityContext ${t} (see https://g.co/ng/security#xss)`
                  );
              }
            }
            bypassSecurityTrustHtml(t) {
              return new ds(t);
            }
            bypassSecurityTrustStyle(t) {
              return new ps(t);
            }
            bypassSecurityTrustScript(t) {
              return new fs(t);
            }
            bypassSecurityTrustUrl(t) {
              return new ms(t);
            }
            bypassSecurityTrustResourceUrl(t) {
              return new gs(t);
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(os(rc));
            }),
            (t.ɵprov = at({
              factory: function() {
                return (t = os(Oi)), new Lc(t.get(rc));
                var t;
              },
              token: t,
              providedIn: "root"
            })),
            t
          );
        })();
      const Bc = Ul(Yl, "browser", [
          { provide: fl, useValue: "browser" },
          {
            provide: pl,
            useValue: function() {
              pc.makeCurrent(), _c.init();
            },
            multi: !0
          },
          {
            provide: rc,
            useFactory: function() {
              return (
                (function(t) {
                  de = t;
                })(document),
                document
              );
            },
            deps: []
          }
        ]),
        Hc = [
          [],
          { provide: Di, useValue: "root" },
          {
            provide: Ws,
            useFactory: function() {
              return new Ws();
            },
            deps: []
          },
          { provide: bc, useClass: Dc, multi: !0, deps: [rc, Il, fl] },
          { provide: bc, useClass: Vc, multi: !0, deps: [rc] },
          [],
          { provide: Ac, useClass: Ac, deps: [vc, Ec, ul] },
          { provide: Jo, useExisting: Ac },
          { provide: Cc, useExisting: Ec },
          { provide: Ec, useClass: Ec, deps: [rc] },
          { provide: Ml, useClass: Ml, deps: [Il] },
          { provide: vc, useClass: vc, deps: [bc, Il] },
          []
        ];
      let zc = (() => {
        class t {
          constructor(t) {
            if (t)
              throw new Error(
                "BrowserModule has already been loaded. If you need access to common directives such as NgIf and NgFor from a lazy loaded module, import CommonModule instead."
              );
          }
          static withServerTransition(e) {
            return {
              ngModule: t,
              providers: [
                { provide: ul, useValue: e.appId },
                { provide: gc, useExisting: ul },
                yc
              ]
            };
          }
        }
        return (
          (t.ɵmod = zt({ type: t })),
          (t.ɵinj = lt({
            factory: function(e) {
              return new (e || t)(os(t, 12));
            },
            providers: Hc,
            imports: [dc, Xl]
          })),
          t
        );
      })();
      function qc(...t) {
        if (1 === t.length) {
          const e = t[0];
          if (l(e)) return $c(e, null);
          if (c(e) && Object.getPrototypeOf(e) === Object.prototype) {
            const t = Object.keys(e);
            return $c(t.map(t => e[t]), t);
          }
        }
        if ("function" == typeof t[t.length - 1]) {
          const e = t.pop();
          return $c((t = 1 === t.length && l(t[0]) ? t[0] : t), null).pipe(
            x(t => e(...t))
          );
        }
        return $c(t, null);
      }
      function $c(t, e) {
        return new _(n => {
          const s = t.length;
          if (0 === s) return void n.complete();
          const r = new Array(s);
          let i = 0,
            o = 0;
          for (let a = 0; a < s; a++) {
            const l = M(t[a]);
            let c = !1;
            n.add(
              l.subscribe({
                next: t => {
                  c || ((c = !0), o++), (r[a] = t);
                },
                error: t => n.error(t),
                complete: () => {
                  i++,
                    (i !== s && c) ||
                      (o === s &&
                        n.next(
                          e ? e.reduce((t, e, n) => ((t[e] = r[n]), t), {}) : r
                        ),
                      n.complete());
                }
              })
            );
          }
        });
      }
      "undefined" != typeof window && window;
      const Uc = new Ln("NgValueAccessor"),
        Wc = { provide: Uc, useExisting: rt(() => Qc), multi: !0 };
      let Qc = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = t => {}),
              (this.onTouched = () => {});
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "checked",
              t
            );
          }
          registerOnChange(t) {
            this.onChange = t;
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(io(Xo), io(Yo));
          }),
          (t.ɵdir = $t({
            type: t,
            selectors: [
              ["input", "type", "checkbox", "formControlName", ""],
              ["input", "type", "checkbox", "formControl", ""],
              ["input", "type", "checkbox", "ngModel", ""]
            ],
            hostBindings: function(t, e) {
              1 & t &&
                po("change", function(t) {
                  return e.onChange(t.target.checked);
                })("blur", function() {
                  return e.onTouched();
                });
            },
            features: [$o([Wc])]
          })),
          t
        );
      })();
      const Zc = { provide: Uc, useExisting: rt(() => Gc), multi: !0 },
        Kc = new Ln("CompositionEventMode");
      let Gc = (() => {
        class t {
          constructor(t, e, n) {
            (this._renderer = t),
              (this._elementRef = e),
              (this._compositionMode = n),
              (this.onChange = t => {}),
              (this.onTouched = () => {}),
              (this._composing = !1),
              null == this._compositionMode &&
                (this._compositionMode = !(function() {
                  const t = sc() ? sc().getUserAgent() : "";
                  return /android (\d+)/.test(t.toLowerCase());
                })());
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              null == t ? "" : t
            );
          }
          registerOnChange(t) {
            this.onChange = t;
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
          _handleInput(t) {
            (!this._compositionMode ||
              (this._compositionMode && !this._composing)) &&
              this.onChange(t);
          }
          _compositionStart() {
            this._composing = !0;
          }
          _compositionEnd(t) {
            (this._composing = !1), this._compositionMode && this.onChange(t);
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(io(Xo), io(Yo), io(Kc, 8));
          }),
          (t.ɵdir = $t({
            type: t,
            selectors: [
              ["input", "formControlName", "", 3, "type", "checkbox"],
              ["textarea", "formControlName", ""],
              ["input", "formControl", "", 3, "type", "checkbox"],
              ["textarea", "formControl", ""],
              ["input", "ngModel", "", 3, "type", "checkbox"],
              ["textarea", "ngModel", ""],
              ["", "ngDefaultControl", ""]
            ],
            hostBindings: function(t, e) {
              1 & t &&
                po("input", function(t) {
                  return e._handleInput(t.target.value);
                })("blur", function() {
                  return e.onTouched();
                })("compositionstart", function() {
                  return e._compositionStart();
                })("compositionend", function(t) {
                  return e._compositionEnd(t.target.value);
                });
            },
            features: [$o([Zc])]
          })),
          t
        );
      })();
      function Yc(t) {
        return null == t || 0 === t.length;
      }
      function Jc(t) {
        return null != t && "number" == typeof t.length;
      }
      const Xc = new Ln("NgValidators"),
        tu = new Ln("NgAsyncValidators"),
        eu = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      class nu {
        static min(t) {
          return e => {
            if (Yc(e.value) || Yc(t)) return null;
            const n = parseFloat(e.value);
            return !isNaN(n) && n < t
              ? { min: { min: t, actual: e.value } }
              : null;
          };
        }
        static max(t) {
          return e => {
            if (Yc(e.value) || Yc(t)) return null;
            const n = parseFloat(e.value);
            return !isNaN(n) && n > t
              ? { max: { max: t, actual: e.value } }
              : null;
          };
        }
        static required(t) {
          return Yc(t.value) ? { required: !0 } : null;
        }
        static requiredTrue(t) {
          return !0 === t.value ? null : { required: !0 };
        }
        static email(t) {
          return Yc(t.value) || eu.test(t.value) ? null : { email: !0 };
        }
        static minLength(t) {
          return e =>
            Yc(e.value) || !Jc(e.value)
              ? null
              : e.value.length < t
              ? {
                  minlength: { requiredLength: t, actualLength: e.value.length }
                }
              : null;
        }
        static maxLength(t) {
          return e =>
            Jc(e.value) && e.value.length > t
              ? {
                  maxlength: { requiredLength: t, actualLength: e.value.length }
                }
              : null;
        }
        static pattern(t) {
          if (!t) return nu.nullValidator;
          let e, n;
          return (
            "string" == typeof t
              ? ((n = ""),
                "^" !== t.charAt(0) && (n += "^"),
                (n += t),
                "$" !== t.charAt(t.length - 1) && (n += "$"),
                (e = new RegExp(n)))
              : ((n = t.toString()), (e = t)),
            t => {
              if (Yc(t.value)) return null;
              const s = t.value;
              return e.test(s)
                ? null
                : { pattern: { requiredPattern: n, actualValue: s } };
            }
          );
        }
        static nullValidator(t) {
          return null;
        }
        static compose(t) {
          if (!t) return null;
          const e = t.filter(su);
          return 0 == e.length
            ? null
            : function(t) {
                return iu(ou(t, e));
              };
        }
        static composeAsync(t) {
          if (!t) return null;
          const e = t.filter(su);
          return 0 == e.length
            ? null
            : function(t) {
                return qc(ou(t, e).map(ru)).pipe(x(iu));
              };
        }
      }
      function su(t) {
        return null != t;
      }
      function ru(t) {
        const e = ho(t) ? M(t) : t;
        return e;
      }
      function iu(t) {
        let e = {};
        return (
          t.forEach(t => {
            e = null != t ? Object.assign(Object.assign({}, e), t) : e;
          }),
          0 === Object.keys(e).length ? null : e
        );
      }
      function ou(t, e) {
        return e.map(e => e(t));
      }
      function au(t) {
        return t.map(t =>
          (function(t) {
            return !t.validate;
          })(t)
            ? t
            : e => t.validate(e)
        );
      }
      function lu(t) {
        return null != t ? nu.compose(au(t)) : null;
      }
      function cu(t) {
        return null != t ? nu.composeAsync(au(t)) : null;
      }
      function uu(t, e) {
        return null === t ? [e] : Array.isArray(t) ? [...t, e] : [t, e];
      }
      function hu(t) {
        return t._rawValidators;
      }
      function du(t) {
        return t._rawAsyncValidators;
      }
      let pu = (() => {
          class t {
            constructor() {
              (this._rawValidators = []),
                (this._rawAsyncValidators = []),
                (this._onDestroyCallbacks = []);
            }
            get value() {
              return this.control ? this.control.value : null;
            }
            get valid() {
              return this.control ? this.control.valid : null;
            }
            get invalid() {
              return this.control ? this.control.invalid : null;
            }
            get pending() {
              return this.control ? this.control.pending : null;
            }
            get disabled() {
              return this.control ? this.control.disabled : null;
            }
            get enabled() {
              return this.control ? this.control.enabled : null;
            }
            get errors() {
              return this.control ? this.control.errors : null;
            }
            get pristine() {
              return this.control ? this.control.pristine : null;
            }
            get dirty() {
              return this.control ? this.control.dirty : null;
            }
            get touched() {
              return this.control ? this.control.touched : null;
            }
            get status() {
              return this.control ? this.control.status : null;
            }
            get untouched() {
              return this.control ? this.control.untouched : null;
            }
            get statusChanges() {
              return this.control ? this.control.statusChanges : null;
            }
            get valueChanges() {
              return this.control ? this.control.valueChanges : null;
            }
            get path() {
              return null;
            }
            _setValidators(t) {
              (this._rawValidators = t || []),
                (this._composedValidatorFn = lu(this._rawValidators));
            }
            _setAsyncValidators(t) {
              (this._rawAsyncValidators = t || []),
                (this._composedAsyncValidatorFn = cu(this._rawAsyncValidators));
            }
            get validator() {
              return this._composedValidatorFn || null;
            }
            get asyncValidator() {
              return this._composedAsyncValidatorFn || null;
            }
            _registerOnDestroy(t) {
              this._onDestroyCallbacks.push(t);
            }
            _invokeOnDestroyCallbacks() {
              this._onDestroyCallbacks.forEach(t => t()),
                (this._onDestroyCallbacks = []);
            }
            reset(t) {
              this.control && this.control.reset(t);
            }
            hasError(t, e) {
              return !!this.control && this.control.hasError(t, e);
            }
            getError(t, e) {
              return this.control ? this.control.getError(t, e) : null;
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)();
            }),
            (t.ɵdir = $t({ type: t })),
            t
          );
        })(),
        fu = (() => {
          class t extends pu {
            get formDirective() {
              return null;
            }
            get path() {
              return null;
            }
          }
          return (
            (t.ɵfac = function(e) {
              return mu(e || t);
            }),
            (t.ɵdir = $t({ type: t, features: [Zi] })),
            t
          );
        })();
      const mu = Mn(fu);
      class gu extends pu {
        constructor() {
          super(...arguments),
            (this._parent = null),
            (this.name = null),
            (this.valueAccessor = null);
        }
      }
      class yu {
        constructor(t) {
          this._cd = t;
        }
        get ngClassUntouched() {
          var t, e, n;
          return (
            null !==
              (n =
                null ===
                  (e =
                    null === (t = this._cd) || void 0 === t
                      ? void 0
                      : t.control) || void 0 === e
                  ? void 0
                  : e.untouched) &&
            void 0 !== n &&
            n
          );
        }
        get ngClassTouched() {
          var t, e, n;
          return (
            null !==
              (n =
                null ===
                  (e =
                    null === (t = this._cd) || void 0 === t
                      ? void 0
                      : t.control) || void 0 === e
                  ? void 0
                  : e.touched) &&
            void 0 !== n &&
            n
          );
        }
        get ngClassPristine() {
          var t, e, n;
          return (
            null !==
              (n =
                null ===
                  (e =
                    null === (t = this._cd) || void 0 === t
                      ? void 0
                      : t.control) || void 0 === e
                  ? void 0
                  : e.pristine) &&
            void 0 !== n &&
            n
          );
        }
        get ngClassDirty() {
          var t, e, n;
          return (
            null !==
              (n =
                null ===
                  (e =
                    null === (t = this._cd) || void 0 === t
                      ? void 0
                      : t.control) || void 0 === e
                  ? void 0
                  : e.dirty) &&
            void 0 !== n &&
            n
          );
        }
        get ngClassValid() {
          var t, e, n;
          return (
            null !==
              (n =
                null ===
                  (e =
                    null === (t = this._cd) || void 0 === t
                      ? void 0
                      : t.control) || void 0 === e
                  ? void 0
                  : e.valid) &&
            void 0 !== n &&
            n
          );
        }
        get ngClassInvalid() {
          var t, e, n;
          return (
            null !==
              (n =
                null ===
                  (e =
                    null === (t = this._cd) || void 0 === t
                      ? void 0
                      : t.control) || void 0 === e
                  ? void 0
                  : e.invalid) &&
            void 0 !== n &&
            n
          );
        }
        get ngClassPending() {
          var t, e, n;
          return (
            null !==
              (n =
                null ===
                  (e =
                    null === (t = this._cd) || void 0 === t
                      ? void 0
                      : t.control) || void 0 === e
                  ? void 0
                  : e.pending) &&
            void 0 !== n &&
            n
          );
        }
      }
      let _u = (() => {
          class t extends yu {
            constructor(t) {
              super(t);
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(io(gu, 2));
            }),
            (t.ɵdir = $t({
              type: t,
              selectors: [
                ["", "formControlName", ""],
                ["", "ngModel", ""],
                ["", "formControl", ""]
              ],
              hostVars: 14,
              hostBindings: function(t, e) {
                2 & t &&
                  Co("ng-untouched", e.ngClassUntouched)(
                    "ng-touched",
                    e.ngClassTouched
                  )("ng-pristine", e.ngClassPristine)(
                    "ng-dirty",
                    e.ngClassDirty
                  )("ng-valid", e.ngClassValid)("ng-invalid", e.ngClassInvalid)(
                    "ng-pending",
                    e.ngClassPending
                  );
              },
              features: [Zi]
            })),
            t
          );
        })(),
        bu = (() => {
          class t extends yu {
            constructor(t) {
              super(t);
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(io(fu, 10));
            }),
            (t.ɵdir = $t({
              type: t,
              selectors: [
                ["", "formGroupName", ""],
                ["", "formArrayName", ""],
                ["", "ngModelGroup", ""],
                ["", "formGroup", ""],
                ["form", 3, "ngNoForm", ""],
                ["", "ngForm", ""]
              ],
              hostVars: 14,
              hostBindings: function(t, e) {
                2 & t &&
                  Co("ng-untouched", e.ngClassUntouched)(
                    "ng-touched",
                    e.ngClassTouched
                  )("ng-pristine", e.ngClassPristine)(
                    "ng-dirty",
                    e.ngClassDirty
                  )("ng-valid", e.ngClassValid)("ng-invalid", e.ngClassInvalid)(
                    "ng-pending",
                    e.ngClassPending
                  );
              },
              features: [Zi]
            })),
            t
          );
        })();
      const vu = { provide: Uc, useExisting: rt(() => wu), multi: !0 };
      let wu = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = t => {}),
              (this.onTouched = () => {});
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              null == t ? "" : t
            );
          }
          registerOnChange(t) {
            this.onChange = e => {
              t("" == e ? null : parseFloat(e));
            };
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(io(Xo), io(Yo));
          }),
          (t.ɵdir = $t({
            type: t,
            selectors: [
              ["input", "type", "number", "formControlName", ""],
              ["input", "type", "number", "formControl", ""],
              ["input", "type", "number", "ngModel", ""]
            ],
            hostBindings: function(t, e) {
              1 & t &&
                po("input", function(t) {
                  return e.onChange(t.target.value);
                })("blur", function() {
                  return e.onTouched();
                });
            },
            features: [$o([vu])]
          })),
          t
        );
      })();
      const Cu = { provide: Uc, useExisting: rt(() => Su), multi: !0 };
      let Eu = (() => {
          class t {
            constructor() {
              this._accessors = [];
            }
            add(t, e) {
              this._accessors.push([t, e]);
            }
            remove(t) {
              for (let e = this._accessors.length - 1; e >= 0; --e)
                if (this._accessors[e][1] === t)
                  return void this._accessors.splice(e, 1);
            }
            select(t) {
              this._accessors.forEach(e => {
                this._isSameGroup(e, t) &&
                  e[1] !== t &&
                  e[1].fireUncheck(t.value);
              });
            }
            _isSameGroup(t, e) {
              return (
                !!t[0].control &&
                t[0]._parent === e._control._parent &&
                t[1].name === e.name
              );
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)();
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        Su = (() => {
          class t {
            constructor(t, e, n, s) {
              (this._renderer = t),
                (this._elementRef = e),
                (this._registry = n),
                (this._injector = s),
                (this.onChange = () => {}),
                (this.onTouched = () => {});
            }
            ngOnInit() {
              (this._control = this._injector.get(gu)),
                this._checkName(),
                this._registry.add(this._control, this);
            }
            ngOnDestroy() {
              this._registry.remove(this);
            }
            writeValue(t) {
              (this._state = t === this.value),
                this._renderer.setProperty(
                  this._elementRef.nativeElement,
                  "checked",
                  this._state
                );
            }
            registerOnChange(t) {
              (this._fn = t),
                (this.onChange = () => {
                  t(this.value), this._registry.select(this);
                });
            }
            fireUncheck(t) {
              this.writeValue(t);
            }
            registerOnTouched(t) {
              this.onTouched = t;
            }
            setDisabledState(t) {
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "disabled",
                t
              );
            }
            _checkName() {
              !this.name &&
                this.formControlName &&
                (this.name = this.formControlName);
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(io(Xo), io(Yo), io(Eu), io(Wi));
            }),
            (t.ɵdir = $t({
              type: t,
              selectors: [
                ["input", "type", "radio", "formControlName", ""],
                ["input", "type", "radio", "formControl", ""],
                ["input", "type", "radio", "ngModel", ""]
              ],
              hostBindings: function(t, e) {
                1 & t &&
                  po("change", function() {
                    return e.onChange();
                  })("blur", function() {
                    return e.onTouched();
                  });
              },
              inputs: {
                name: "name",
                formControlName: "formControlName",
                value: "value"
              },
              features: [$o([Cu])]
            })),
            t
          );
        })();
      const Tu = { provide: Uc, useExisting: rt(() => xu), multi: !0 };
      let xu = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this.onChange = t => {}),
              (this.onTouched = () => {});
          }
          writeValue(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              parseFloat(t)
            );
          }
          registerOnChange(t) {
            this.onChange = e => {
              t("" == e ? null : parseFloat(e));
            };
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(io(Xo), io(Yo));
          }),
          (t.ɵdir = $t({
            type: t,
            selectors: [
              ["input", "type", "range", "formControlName", ""],
              ["input", "type", "range", "formControl", ""],
              ["input", "type", "range", "ngModel", ""]
            ],
            hostBindings: function(t, e) {
              1 & t &&
                po("change", function(t) {
                  return e.onChange(t.target.value);
                })("input", function(t) {
                  return e.onChange(t.target.value);
                })("blur", function() {
                  return e.onTouched();
                });
            },
            features: [$o([Tu])]
          })),
          t
        );
      })();
      const ku = { provide: Uc, useExisting: rt(() => Au), multi: !0 };
      let Au = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this._optionMap = new Map()),
              (this._idCounter = 0),
              (this.onChange = t => {}),
              (this.onTouched = () => {}),
              (this._compareWith = Object.is);
          }
          set compareWith(t) {
            this._compareWith = t;
          }
          writeValue(t) {
            this.value = t;
            const e = this._getOptionId(t);
            null == e &&
              this._renderer.setProperty(
                this._elementRef.nativeElement,
                "selectedIndex",
                -1
              );
            const n = (function(t, e) {
              return null == t
                ? "" + e
                : (e && "object" == typeof e && (e = "Object"),
                  `${t}: ${e}`.slice(0, 50));
            })(e, t);
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "value",
              n
            );
          }
          registerOnChange(t) {
            this.onChange = e => {
              (this.value = this._getOptionValue(e)), t(this.value);
            };
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
          _registerOption() {
            return (this._idCounter++).toString();
          }
          _getOptionId(t) {
            for (const e of Array.from(this._optionMap.keys()))
              if (this._compareWith(this._optionMap.get(e), t)) return e;
            return null;
          }
          _getOptionValue(t) {
            const e = (function(t) {
              return t.split(":")[0];
            })(t);
            return this._optionMap.has(e) ? this._optionMap.get(e) : t;
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(io(Xo), io(Yo));
          }),
          (t.ɵdir = $t({
            type: t,
            selectors: [
              ["select", "formControlName", "", 3, "multiple", ""],
              ["select", "formControl", "", 3, "multiple", ""],
              ["select", "ngModel", "", 3, "multiple", ""]
            ],
            hostBindings: function(t, e) {
              1 & t &&
                po("change", function(t) {
                  return e.onChange(t.target.value);
                })("blur", function() {
                  return e.onTouched();
                });
            },
            inputs: { compareWith: "compareWith" },
            features: [$o([ku])]
          })),
          t
        );
      })();
      const Iu = { provide: Uc, useExisting: rt(() => Ou), multi: !0 };
      let Ou = (() => {
        class t {
          constructor(t, e) {
            (this._renderer = t),
              (this._elementRef = e),
              (this._optionMap = new Map()),
              (this._idCounter = 0),
              (this.onChange = t => {}),
              (this.onTouched = () => {}),
              (this._compareWith = Object.is);
          }
          set compareWith(t) {
            this._compareWith = t;
          }
          writeValue(t) {
            let e;
            if (((this.value = t), Array.isArray(t))) {
              const n = t.map(t => this._getOptionId(t));
              e = (t, e) => {
                t._setSelected(n.indexOf(e.toString()) > -1);
              };
            } else
              e = (t, e) => {
                t._setSelected(!1);
              };
            this._optionMap.forEach(e);
          }
          registerOnChange(t) {
            this.onChange = e => {
              const n = [];
              if (void 0 !== e.selectedOptions) {
                const t = e.selectedOptions;
                for (let e = 0; e < t.length; e++) {
                  const s = t.item(e),
                    r = this._getOptionValue(s.value);
                  n.push(r);
                }
              } else {
                const t = e.options;
                for (let e = 0; e < t.length; e++) {
                  const s = t.item(e);
                  if (s.selected) {
                    const t = this._getOptionValue(s.value);
                    n.push(t);
                  }
                }
              }
              (this.value = n), t(n);
            };
          }
          registerOnTouched(t) {
            this.onTouched = t;
          }
          setDisabledState(t) {
            this._renderer.setProperty(
              this._elementRef.nativeElement,
              "disabled",
              t
            );
          }
          _registerOption(t) {
            const e = (this._idCounter++).toString();
            return this._optionMap.set(e, t), e;
          }
          _getOptionId(t) {
            for (const e of Array.from(this._optionMap.keys()))
              if (this._compareWith(this._optionMap.get(e)._value, t)) return e;
            return null;
          }
          _getOptionValue(t) {
            const e = (function(t) {
              return t.split(":")[0];
            })(t);
            return this._optionMap.has(e) ? this._optionMap.get(e)._value : t;
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(io(Xo), io(Yo));
          }),
          (t.ɵdir = $t({
            type: t,
            selectors: [
              ["select", "multiple", "", "formControlName", ""],
              ["select", "multiple", "", "formControl", ""],
              ["select", "multiple", "", "ngModel", ""]
            ],
            hostBindings: function(t, e) {
              1 & t &&
                po("change", function(t) {
                  return e.onChange(t.target);
                })("blur", function() {
                  return e.onTouched();
                });
            },
            inputs: { compareWith: "compareWith" },
            features: [$o([Iu])]
          })),
          t
        );
      })();
      function Nu(t, e) {
        Pu(t, e, !0),
          e.valueAccessor.writeValue(t.value),
          (function(t, e) {
            e.valueAccessor.registerOnChange(n => {
              (t._pendingValue = n),
                (t._pendingChange = !0),
                (t._pendingDirty = !0),
                "change" === t.updateOn && Ru(t, e);
            });
          })(t, e),
          (function(t, e) {
            const n = (t, n) => {
              e.valueAccessor.writeValue(t), n && e.viewToModelUpdate(t);
            };
            t.registerOnChange(n),
              e._registerOnDestroy(() => {
                t._unregisterOnChange(n);
              });
          })(t, e),
          (function(t, e) {
            e.valueAccessor.registerOnTouched(() => {
              (t._pendingTouched = !0),
                "blur" === t.updateOn && t._pendingChange && Ru(t, e),
                "submit" !== t.updateOn && t.markAsTouched();
            });
          })(t, e),
          (function(t, e) {
            if (e.valueAccessor.setDisabledState) {
              const n = t => {
                e.valueAccessor.setDisabledState(t);
              };
              t.registerOnDisabledChange(n),
                e._registerOnDestroy(() => {
                  t._unregisterOnDisabledChange(n);
                });
            }
          })(t, e);
      }
      function Du(t, e) {
        t.forEach(t => {
          t.registerOnValidatorChange && t.registerOnValidatorChange(e);
        });
      }
      function Pu(t, e, n) {
        const s = hu(t);
        null !== e.validator
          ? t.setValidators(uu(s, e.validator))
          : "function" == typeof s && t.setValidators([s]);
        const r = du(t);
        if (
          (null !== e.asyncValidator
            ? t.setAsyncValidators(uu(r, e.asyncValidator))
            : "function" == typeof r && t.setAsyncValidators([r]),
          n)
        ) {
          const n = () => t.updateValueAndValidity();
          Du(e._rawValidators, n), Du(e._rawAsyncValidators, n);
        }
      }
      function Fu(t, e, n) {
        if (null !== t) {
          if (null !== e.validator) {
            const n = hu(t);
            Array.isArray(n) &&
              n.length > 0 &&
              t.setValidators(n.filter(t => t !== e.validator));
          }
          if (null !== e.asyncValidator) {
            const n = du(t);
            Array.isArray(n) &&
              n.length > 0 &&
              t.setAsyncValidators(n.filter(t => t !== e.asyncValidator));
          }
        }
        if (n) {
          const t = () => {};
          Du(e._rawValidators, t), Du(e._rawAsyncValidators, t);
        }
      }
      function Ru(t, e) {
        t._pendingDirty && t.markAsDirty(),
          t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
          e.viewToModelUpdate(t._pendingValue),
          (t._pendingChange = !1);
      }
      function Mu(t, e) {
        Pu(t, e, !1);
      }
      const Vu = [Qc, xu, wu, Au, Ou, Su];
      function ju(t, e) {
        const n = t.indexOf(e);
        n > -1 && t.splice(n, 1);
      }
      const Lu = "VALID",
        Bu = "INVALID",
        Hu = "PENDING",
        zu = "DISABLED";
      function qu(t) {
        return (Qu(t) ? t.validators : t) || null;
      }
      function $u(t) {
        return Array.isArray(t) ? lu(t) : t || null;
      }
      function Uu(t, e) {
        return (Qu(e) ? e.asyncValidators : t) || null;
      }
      function Wu(t) {
        return Array.isArray(t) ? cu(t) : t || null;
      }
      function Qu(t) {
        return null != t && !Array.isArray(t) && "object" == typeof t;
      }
      class Zu {
        constructor(t, e) {
          (this._hasOwnPendingAsyncValidator = !1),
            (this._onCollectionChange = () => {}),
            (this._parent = null),
            (this.pristine = !0),
            (this.touched = !1),
            (this._onDisabledChange = []),
            (this._rawValidators = t),
            (this._rawAsyncValidators = e),
            (this._composedValidatorFn = $u(this._rawValidators)),
            (this._composedAsyncValidatorFn = Wu(this._rawAsyncValidators));
        }
        get validator() {
          return this._composedValidatorFn;
        }
        set validator(t) {
          this._rawValidators = this._composedValidatorFn = t;
        }
        get asyncValidator() {
          return this._composedAsyncValidatorFn;
        }
        set asyncValidator(t) {
          this._rawAsyncValidators = this._composedAsyncValidatorFn = t;
        }
        get parent() {
          return this._parent;
        }
        get valid() {
          return this.status === Lu;
        }
        get invalid() {
          return this.status === Bu;
        }
        get pending() {
          return this.status == Hu;
        }
        get disabled() {
          return this.status === zu;
        }
        get enabled() {
          return this.status !== zu;
        }
        get dirty() {
          return !this.pristine;
        }
        get untouched() {
          return !this.touched;
        }
        get updateOn() {
          return this._updateOn
            ? this._updateOn
            : this.parent
            ? this.parent.updateOn
            : "change";
        }
        setValidators(t) {
          (this._rawValidators = t), (this._composedValidatorFn = $u(t));
        }
        setAsyncValidators(t) {
          (this._rawAsyncValidators = t),
            (this._composedAsyncValidatorFn = Wu(t));
        }
        clearValidators() {
          this.validator = null;
        }
        clearAsyncValidators() {
          this.asyncValidator = null;
        }
        markAsTouched(t = {}) {
          (this.touched = !0),
            this._parent && !t.onlySelf && this._parent.markAsTouched(t);
        }
        markAllAsTouched() {
          this.markAsTouched({ onlySelf: !0 }),
            this._forEachChild(t => t.markAllAsTouched());
        }
        markAsUntouched(t = {}) {
          (this.touched = !1),
            (this._pendingTouched = !1),
            this._forEachChild(t => {
              t.markAsUntouched({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        markAsDirty(t = {}) {
          (this.pristine = !1),
            this._parent && !t.onlySelf && this._parent.markAsDirty(t);
        }
        markAsPristine(t = {}) {
          (this.pristine = !0),
            (this._pendingDirty = !1),
            this._forEachChild(t => {
              t.markAsPristine({ onlySelf: !0 });
            }),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        markAsPending(t = {}) {
          (this.status = Hu),
            !1 !== t.emitEvent && this.statusChanges.emit(this.status),
            this._parent && !t.onlySelf && this._parent.markAsPending(t);
        }
        disable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = zu),
            (this.errors = null),
            this._forEachChild(e => {
              e.disable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this._updateValue(),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: e })
            ),
            this._onDisabledChange.forEach(t => t(!0));
        }
        enable(t = {}) {
          const e = this._parentMarkedDirty(t.onlySelf);
          (this.status = Lu),
            this._forEachChild(e => {
              e.enable(Object.assign(Object.assign({}, t), { onlySelf: !0 }));
            }),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent
            }),
            this._updateAncestors(
              Object.assign(Object.assign({}, t), { skipPristineCheck: e })
            ),
            this._onDisabledChange.forEach(t => t(!1));
        }
        _updateAncestors(t) {
          this._parent &&
            !t.onlySelf &&
            (this._parent.updateValueAndValidity(t),
            t.skipPristineCheck || this._parent._updatePristine(),
            this._parent._updateTouched());
        }
        setParent(t) {
          this._parent = t;
        }
        updateValueAndValidity(t = {}) {
          this._setInitialStatus(),
            this._updateValue(),
            this.enabled &&
              (this._cancelExistingSubscription(),
              (this.errors = this._runValidator()),
              (this.status = this._calculateStatus()),
              (this.status !== Lu && this.status !== Hu) ||
                this._runAsyncValidator(t.emitEvent)),
            !1 !== t.emitEvent &&
              (this.valueChanges.emit(this.value),
              this.statusChanges.emit(this.status)),
            this._parent &&
              !t.onlySelf &&
              this._parent.updateValueAndValidity(t);
        }
        _updateTreeValidity(t = { emitEvent: !0 }) {
          this._forEachChild(e => e._updateTreeValidity(t)),
            this.updateValueAndValidity({
              onlySelf: !0,
              emitEvent: t.emitEvent
            });
        }
        _setInitialStatus() {
          this.status = this._allControlsDisabled() ? zu : Lu;
        }
        _runValidator() {
          return this.validator ? this.validator(this) : null;
        }
        _runAsyncValidator(t) {
          if (this.asyncValidator) {
            (this.status = Hu), (this._hasOwnPendingAsyncValidator = !0);
            const e = ru(this.asyncValidator(this));
            this._asyncValidationSubscription = e.subscribe(e => {
              (this._hasOwnPendingAsyncValidator = !1),
                this.setErrors(e, { emitEvent: t });
            });
          }
        }
        _cancelExistingSubscription() {
          this._asyncValidationSubscription &&
            (this._asyncValidationSubscription.unsubscribe(),
            (this._hasOwnPendingAsyncValidator = !1));
        }
        setErrors(t, e = {}) {
          (this.errors = t), this._updateControlsErrors(!1 !== e.emitEvent);
        }
        get(t) {
          return (function(t, e, n) {
            if (null == e) return null;
            if (
              (Array.isArray(e) || (e = e.split(".")),
              Array.isArray(e) && 0 === e.length)
            )
              return null;
            let s = t;
            return (
              e.forEach(t => {
                s =
                  s instanceof Gu
                    ? s.controls.hasOwnProperty(t)
                      ? s.controls[t]
                      : null
                    : (s instanceof Yu && s.at(t)) || null;
              }),
              s
            );
          })(this, t);
        }
        getError(t, e) {
          const n = e ? this.get(e) : this;
          return n && n.errors ? n.errors[t] : null;
        }
        hasError(t, e) {
          return !!this.getError(t, e);
        }
        get root() {
          let t = this;
          for (; t._parent; ) t = t._parent;
          return t;
        }
        _updateControlsErrors(t) {
          (this.status = this._calculateStatus()),
            t && this.statusChanges.emit(this.status),
            this._parent && this._parent._updateControlsErrors(t);
        }
        _initObservables() {
          (this.valueChanges = new Wa()), (this.statusChanges = new Wa());
        }
        _calculateStatus() {
          return this._allControlsDisabled()
            ? zu
            : this.errors
            ? Bu
            : this._hasOwnPendingAsyncValidator ||
              this._anyControlsHaveStatus(Hu)
            ? Hu
            : this._anyControlsHaveStatus(Bu)
            ? Bu
            : Lu;
        }
        _anyControlsHaveStatus(t) {
          return this._anyControls(e => e.status === t);
        }
        _anyControlsDirty() {
          return this._anyControls(t => t.dirty);
        }
        _anyControlsTouched() {
          return this._anyControls(t => t.touched);
        }
        _updatePristine(t = {}) {
          (this.pristine = !this._anyControlsDirty()),
            this._parent && !t.onlySelf && this._parent._updatePristine(t);
        }
        _updateTouched(t = {}) {
          (this.touched = this._anyControlsTouched()),
            this._parent && !t.onlySelf && this._parent._updateTouched(t);
        }
        _isBoxedValue(t) {
          return (
            "object" == typeof t &&
            null !== t &&
            2 === Object.keys(t).length &&
            "value" in t &&
            "disabled" in t
          );
        }
        _registerOnCollectionChange(t) {
          this._onCollectionChange = t;
        }
        _setUpdateStrategy(t) {
          Qu(t) && null != t.updateOn && (this._updateOn = t.updateOn);
        }
        _parentMarkedDirty(t) {
          return (
            !t &&
            !(!this._parent || !this._parent.dirty) &&
            !this._parent._anyControlsDirty()
          );
        }
      }
      class Ku extends Zu {
        constructor(t = null, e, n) {
          super(qu(e), Uu(n, e)),
            (this._onChange = []),
            this._applyFormState(t),
            this._setUpdateStrategy(e),
            this._initObservables(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!n });
        }
        setValue(t, e = {}) {
          (this.value = this._pendingValue = t),
            this._onChange.length &&
              !1 !== e.emitModelToViewChange &&
              this._onChange.forEach(t =>
                t(this.value, !1 !== e.emitViewToModelChange)
              ),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          this.setValue(t, e);
        }
        reset(t = null, e = {}) {
          this._applyFormState(t),
            this.markAsPristine(e),
            this.markAsUntouched(e),
            this.setValue(this.value, e),
            (this._pendingChange = !1);
        }
        _updateValue() {}
        _anyControls(t) {
          return !1;
        }
        _allControlsDisabled() {
          return this.disabled;
        }
        registerOnChange(t) {
          this._onChange.push(t);
        }
        _unregisterOnChange(t) {
          ju(this._onChange, t);
        }
        registerOnDisabledChange(t) {
          this._onDisabledChange.push(t);
        }
        _unregisterOnDisabledChange(t) {
          ju(this._onDisabledChange, t);
        }
        _forEachChild(t) {}
        _syncPendingControls() {
          return !(
            "submit" !== this.updateOn ||
            (this._pendingDirty && this.markAsDirty(),
            this._pendingTouched && this.markAsTouched(),
            !this._pendingChange) ||
            (this.setValue(this._pendingValue, {
              onlySelf: !0,
              emitModelToViewChange: !1
            }),
            0)
          );
        }
        _applyFormState(t) {
          this._isBoxedValue(t)
            ? ((this.value = this._pendingValue = t.value),
              t.disabled
                ? this.disable({ onlySelf: !0, emitEvent: !1 })
                : this.enable({ onlySelf: !0, emitEvent: !1 }))
            : (this.value = this._pendingValue = t);
        }
      }
      class Gu extends Zu {
        constructor(t, e, n) {
          super(qu(e), Uu(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!n });
        }
        registerControl(t, e) {
          return this.controls[t]
            ? this.controls[t]
            : ((this.controls[t] = e),
              e.setParent(this),
              e._registerOnCollectionChange(this._onCollectionChange),
              e);
        }
        addControl(t, e) {
          this.registerControl(t, e),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        removeControl(t) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        setControl(t, e) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            delete this.controls[t],
            e && this.registerControl(t, e),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        contains(t) {
          return this.controls.hasOwnProperty(t) && this.controls[t].enabled;
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            Object.keys(t).forEach(n => {
              this._throwIfControlMissing(n),
                this.controls[n].setValue(t[n], {
                  onlySelf: !0,
                  emitEvent: e.emitEvent
                });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          Object.keys(t).forEach(n => {
            this.controls[n] &&
              this.controls[n].patchValue(t[n], {
                onlySelf: !0,
                emitEvent: e.emitEvent
              });
          }),
            this.updateValueAndValidity(e);
        }
        reset(t = {}, e = {}) {
          this._forEachChild((n, s) => {
            n.reset(t[s], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this._reduceChildren(
            {},
            (t, e, n) => (
              (t[n] = e instanceof Ku ? e.value : e.getRawValue()), t
            )
          );
        }
        _syncPendingControls() {
          let t = this._reduceChildren(
            !1,
            (t, e) => !!e._syncPendingControls() || t
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _throwIfControlMissing(t) {
          if (!Object.keys(this.controls).length)
            throw new Error(
              "\n        There are no form controls registered with this group yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.controls[t])
            throw new Error(`Cannot find form control with name: ${t}.`);
        }
        _forEachChild(t) {
          Object.keys(this.controls).forEach(e => t(this.controls[e], e));
        }
        _setUpControls() {
          this._forEachChild(t => {
            t.setParent(this),
              t._registerOnCollectionChange(this._onCollectionChange);
          });
        }
        _updateValue() {
          this.value = this._reduceValue();
        }
        _anyControls(t) {
          for (const e of Object.keys(this.controls)) {
            const n = this.controls[e];
            if (this.contains(e) && t(n)) return !0;
          }
          return !1;
        }
        _reduceValue() {
          return this._reduceChildren(
            {},
            (t, e, n) => ((e.enabled || this.disabled) && (t[n] = e.value), t)
          );
        }
        _reduceChildren(t, e) {
          let n = t;
          return (
            this._forEachChild((t, s) => {
              n = e(n, t, s);
            }),
            n
          );
        }
        _allControlsDisabled() {
          for (const t of Object.keys(this.controls))
            if (this.controls[t].enabled) return !1;
          return Object.keys(this.controls).length > 0 || this.disabled;
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n])
              throw new Error(
                `Must supply a value for form control with name: '${n}'.`
              );
          });
        }
      }
      class Yu extends Zu {
        constructor(t, e, n) {
          super(qu(e), Uu(n, e)),
            (this.controls = t),
            this._initObservables(),
            this._setUpdateStrategy(e),
            this._setUpControls(),
            this.updateValueAndValidity({ onlySelf: !0, emitEvent: !!n });
        }
        at(t) {
          return this.controls[t];
        }
        push(t) {
          this.controls.push(t),
            this._registerControl(t),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        insert(t, e) {
          this.controls.splice(t, 0, e),
            this._registerControl(e),
            this.updateValueAndValidity();
        }
        removeAt(t) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            this.updateValueAndValidity();
        }
        setControl(t, e) {
          this.controls[t] &&
            this.controls[t]._registerOnCollectionChange(() => {}),
            this.controls.splice(t, 1),
            e && (this.controls.splice(t, 0, e), this._registerControl(e)),
            this.updateValueAndValidity(),
            this._onCollectionChange();
        }
        get length() {
          return this.controls.length;
        }
        setValue(t, e = {}) {
          this._checkAllValuesPresent(t),
            t.forEach((t, n) => {
              this._throwIfControlMissing(n),
                this.at(n).setValue(t, {
                  onlySelf: !0,
                  emitEvent: e.emitEvent
                });
            }),
            this.updateValueAndValidity(e);
        }
        patchValue(t, e = {}) {
          t.forEach((t, n) => {
            this.at(n) &&
              this.at(n).patchValue(t, {
                onlySelf: !0,
                emitEvent: e.emitEvent
              });
          }),
            this.updateValueAndValidity(e);
        }
        reset(t = [], e = {}) {
          this._forEachChild((n, s) => {
            n.reset(t[s], { onlySelf: !0, emitEvent: e.emitEvent });
          }),
            this._updatePristine(e),
            this._updateTouched(e),
            this.updateValueAndValidity(e);
        }
        getRawValue() {
          return this.controls.map(t =>
            t instanceof Ku ? t.value : t.getRawValue()
          );
        }
        clear() {
          this.controls.length < 1 ||
            (this._forEachChild(t => t._registerOnCollectionChange(() => {})),
            this.controls.splice(0),
            this.updateValueAndValidity());
        }
        _syncPendingControls() {
          let t = this.controls.reduce(
            (t, e) => !!e._syncPendingControls() || t,
            !1
          );
          return t && this.updateValueAndValidity({ onlySelf: !0 }), t;
        }
        _throwIfControlMissing(t) {
          if (!this.controls.length)
            throw new Error(
              "\n        There are no form controls registered with this array yet. If you're using ngModel,\n        you may want to check next tick (e.g. use setTimeout).\n      "
            );
          if (!this.at(t))
            throw new Error("Cannot find form control at index " + t);
        }
        _forEachChild(t) {
          this.controls.forEach((e, n) => {
            t(e, n);
          });
        }
        _updateValue() {
          this.value = this.controls
            .filter(t => t.enabled || this.disabled)
            .map(t => t.value);
        }
        _anyControls(t) {
          return this.controls.some(e => e.enabled && t(e));
        }
        _setUpControls() {
          this._forEachChild(t => this._registerControl(t));
        }
        _checkAllValuesPresent(t) {
          this._forEachChild((e, n) => {
            if (void 0 === t[n])
              throw new Error(
                `Must supply a value for form control at index: ${n}.`
              );
          });
        }
        _allControlsDisabled() {
          for (const t of this.controls) if (t.enabled) return !1;
          return this.controls.length > 0 || this.disabled;
        }
        _registerControl(t) {
          t.setParent(this),
            t._registerOnCollectionChange(this._onCollectionChange);
        }
      }
      let Ju = (() => {
        class t {}
        return (
          (t.ɵfac = function(e) {
            return new (e || t)();
          }),
          (t.ɵdir = $t({
            type: t,
            selectors: [["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""]],
            hostAttrs: ["novalidate", ""]
          })),
          t
        );
      })();
      const Xu = new Ln("NgModelWithFormControlWarning"),
        th = { provide: fu, useExisting: rt(() => eh) };
      let eh = (() => {
        class t extends fu {
          constructor(t, e) {
            super(),
              (this.validators = t),
              (this.asyncValidators = e),
              (this.submitted = !1),
              (this.directives = []),
              (this.form = null),
              (this.ngSubmit = new Wa()),
              this._setValidators(t),
              this._setAsyncValidators(e);
          }
          ngOnChanges(t) {
            this._checkFormPresent(),
              t.hasOwnProperty("form") &&
                (this._updateValidators(),
                this._updateDomValue(),
                this._updateRegistrations(),
                (this._oldForm = this.form));
          }
          get formDirective() {
            return this;
          }
          get control() {
            return this.form;
          }
          get path() {
            return [];
          }
          addControl(t) {
            const e = this.form.get(t.path);
            return (
              Nu(e, t),
              e.updateValueAndValidity({ emitEvent: !1 }),
              this.directives.push(t),
              e
            );
          }
          getControl(t) {
            return this.form.get(t.path);
          }
          removeControl(t) {
            ju(this.directives, t);
          }
          addFormGroup(t) {
            const e = this.form.get(t.path);
            Mu(e, t), e.updateValueAndValidity({ emitEvent: !1 });
          }
          removeFormGroup(t) {}
          getFormGroup(t) {
            return this.form.get(t.path);
          }
          addFormArray(t) {
            const e = this.form.get(t.path);
            Mu(e, t), e.updateValueAndValidity({ emitEvent: !1 });
          }
          removeFormArray(t) {}
          getFormArray(t) {
            return this.form.get(t.path);
          }
          updateModel(t, e) {
            this.form.get(t.path).setValue(e);
          }
          onSubmit(t) {
            return (
              (this.submitted = !0),
              (e = this.directives),
              this.form._syncPendingControls(),
              e.forEach(t => {
                const e = t.control;
                "submit" === e.updateOn &&
                  e._pendingChange &&
                  (t.viewToModelUpdate(e._pendingValue),
                  (e._pendingChange = !1));
              }),
              this.ngSubmit.emit(t),
              !1
            );
            var e;
          }
          onReset() {
            this.resetForm();
          }
          resetForm(t) {
            this.form.reset(t), (this.submitted = !1);
          }
          _updateDomValue() {
            this.directives.forEach(t => {
              const e = this.form.get(t.path);
              t.control !== e &&
                ((function(t, e) {
                  const n = () => {};
                  e.valueAccessor.registerOnChange(n),
                    e.valueAccessor.registerOnTouched(n),
                    Fu(t, e, !0),
                    t &&
                      (e._invokeOnDestroyCallbacks(),
                      t._registerOnCollectionChange(() => {}));
                })(t.control || null, t),
                e && Nu(e, t),
                (t.control = e));
            }),
              this.form._updateTreeValidity({ emitEvent: !1 });
          }
          _updateRegistrations() {
            this.form._registerOnCollectionChange(() => this._updateDomValue()),
              this._oldForm &&
                this._oldForm._registerOnCollectionChange(() => {});
          }
          _updateValidators() {
            Pu(this.form, this, !1),
              this._oldForm && Fu(this._oldForm, this, !1);
          }
          _checkFormPresent() {}
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(io(Xc, 10), io(tu, 10));
          }),
          (t.ɵdir = $t({
            type: t,
            selectors: [["", "formGroup", ""]],
            hostBindings: function(t, e) {
              1 & t &&
                po("submit", function(t) {
                  return e.onSubmit(t);
                })("reset", function() {
                  return e.onReset();
                });
            },
            inputs: { form: ["formGroup", "form"] },
            outputs: { ngSubmit: "ngSubmit" },
            exportAs: ["ngForm"],
            features: [$o([th]), Zi, ae]
          })),
          t
        );
      })();
      const nh = { provide: gu, useExisting: rt(() => sh) };
      let sh = (() => {
          class t extends gu {
            constructor(t, e, n, s, r) {
              super(),
                (this._ngModelWarningConfig = r),
                (this._added = !1),
                (this.update = new Wa()),
                (this._ngModelWarningSent = !1),
                (this._parent = t),
                this._setValidators(e),
                this._setAsyncValidators(n),
                (this.valueAccessor = (function(t, e) {
                  if (!e) return null;
                  Array.isArray(e);
                  let n = void 0,
                    s = void 0,
                    r = void 0;
                  return (
                    e.forEach(t => {
                      var e;
                      t.constructor === Gc
                        ? (n = t)
                        : ((e = t),
                          Vu.some(t => e.constructor === t)
                            ? (s = t)
                            : (r = t));
                    }),
                    r || s || n || null
                  );
                })(0, s));
            }
            set isDisabled(t) {}
            ngOnChanges(t) {
              this._added || this._setUpControl(),
                (function(t, e) {
                  if (!t.hasOwnProperty("model")) return !1;
                  const n = t.model;
                  return !!n.isFirstChange() || !Object.is(e, n.currentValue);
                })(t, this.viewModel) &&
                  ((this.viewModel = this.model),
                  this.formDirective.updateModel(this, this.model));
            }
            ngOnDestroy() {
              this.formDirective && this.formDirective.removeControl(this);
            }
            viewToModelUpdate(t) {
              (this.viewModel = t), this.update.emit(t);
            }
            get path() {
              return (
                (t = null == this.name ? this.name : this.name.toString()),
                [...this._parent.path, t]
              );
              var t;
            }
            get formDirective() {
              return this._parent ? this._parent.formDirective : null;
            }
            _checkParentType() {}
            _setUpControl() {
              this._checkParentType(),
                (this.control = this.formDirective.addControl(this)),
                this.control.disabled &&
                  this.valueAccessor.setDisabledState &&
                  this.valueAccessor.setDisabledState(!0),
                (this._added = !0);
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(
                io(fu, 13),
                io(Xc, 10),
                io(tu, 10),
                io(Uc, 10),
                io(Xu, 8)
              );
            }),
            (t.ɵdir = $t({
              type: t,
              selectors: [["", "formControlName", ""]],
              inputs: {
                isDisabled: ["disabled", "isDisabled"],
                name: ["formControlName", "name"],
                model: ["ngModel", "model"]
              },
              outputs: { update: "ngModelChange" },
              features: [$o([nh]), Zi, ae]
            })),
            (t._ngModelWarningSentOnce = !1),
            t
          );
        })(),
        rh = (() => {
          class t {}
          return (
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = lt({
              factory: function(e) {
                return new (e || t)();
              }
            })),
            t
          );
        })(),
        ih = (() => {
          class t {
            group(t, e = null) {
              const n = this._reduceControls(t);
              let s = null,
                r = null,
                i = void 0;
              return (
                null != e &&
                  ((function(t) {
                    return (
                      void 0 !== t.asyncValidators ||
                      void 0 !== t.validators ||
                      void 0 !== t.updateOn
                    );
                  })(e)
                    ? ((s = null != e.validators ? e.validators : null),
                      (r =
                        null != e.asyncValidators ? e.asyncValidators : null),
                      (i = null != e.updateOn ? e.updateOn : void 0))
                    : ((s = null != e.validator ? e.validator : null),
                      (r =
                        null != e.asyncValidator ? e.asyncValidator : null))),
                new Gu(n, { asyncValidators: r, updateOn: i, validators: s })
              );
            }
            control(t, e, n) {
              return new Ku(t, e, n);
            }
            array(t, e, n) {
              const s = t.map(t => this._createControl(t));
              return new Yu(s, e, n);
            }
            _reduceControls(t) {
              const e = {};
              return (
                Object.keys(t).forEach(n => {
                  e[n] = this._createControl(t[n]);
                }),
                e
              );
            }
            _createControl(t) {
              return t instanceof Ku || t instanceof Gu || t instanceof Yu
                ? t
                : Array.isArray(t)
                ? this.control(
                    t[0],
                    t.length > 1 ? t[1] : null,
                    t.length > 2 ? t[2] : null
                  )
                : this.control(t);
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)();
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        oh = (() => {
          class t {}
          return (
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = lt({
              factory: function(e) {
                return new (e || t)();
              },
              providers: [Eu],
              imports: [rh]
            })),
            t
          );
        })(),
        ah = (() => {
          class t {
            static withConfig(e) {
              return {
                ngModule: t,
                providers: [
                  { provide: Xu, useValue: e.warnOnNgModelWithFormControl }
                ]
              };
            }
          }
          return (
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = lt({
              factory: function(e) {
                return new (e || t)();
              },
              providers: [ih, Eu],
              imports: [rh]
            })),
            t
          );
        })();
      function lh(...t) {
        let e = t[t.length - 1];
        return T(e) ? (t.pop(), R(t, e)) : q(t);
      }
      function ch() {}
      function uh(t, e, n) {
        return function(s) {
          return s.lift(new hh(t, e, n));
        };
      }
      class hh {
        constructor(t, e, n) {
          (this.nextOrObserver = t), (this.error = e), (this.complete = n);
        }
        call(t, e) {
          return e.subscribe(
            new dh(t, this.nextOrObserver, this.error, this.complete)
          );
        }
      }
      class dh extends f {
        constructor(t, e, n, r) {
          super(t),
            (this._tapNext = ch),
            (this._tapError = ch),
            (this._tapComplete = ch),
            (this._tapError = n || ch),
            (this._tapComplete = r || ch),
            s(e)
              ? ((this._context = this), (this._tapNext = e))
              : e &&
                ((this._context = e),
                (this._tapNext = e.next || ch),
                (this._tapError = e.error || ch),
                (this._tapComplete = e.complete || ch));
        }
        _next(t) {
          try {
            this._tapNext.call(this._context, t);
          } catch (e) {
            return void this.destination.error(e);
          }
          this.destination.next(t);
        }
        _error(t) {
          try {
            this._tapError.call(this._context, t);
          } catch (t) {
            return void this.destination.error(t);
          }
          this.destination.error(t);
        }
        _complete() {
          try {
            this._tapComplete.call(this._context);
          } catch (t) {
            return void this.destination.error(t);
          }
          return this.destination.complete();
        }
      }
      class ph extends h {
        constructor(t, e) {
          super();
        }
        schedule(t, e = 0) {
          return this;
        }
      }
      class fh extends ph {
        constructor(t, e) {
          super(t, e),
            (this.scheduler = t),
            (this.work = e),
            (this.pending = !1);
        }
        schedule(t, e = 0) {
          if (this.closed) return this;
          this.state = t;
          const n = this.id,
            s = this.scheduler;
          return (
            null != n && (this.id = this.recycleAsyncId(s, n, e)),
            (this.pending = !0),
            (this.delay = e),
            (this.id = this.id || this.requestAsyncId(s, this.id, e)),
            this
          );
        }
        requestAsyncId(t, e, n = 0) {
          return setInterval(t.flush.bind(t, this), n);
        }
        recycleAsyncId(t, e, n = 0) {
          if (null !== n && this.delay === n && !1 === this.pending) return e;
          clearInterval(e);
        }
        execute(t, e) {
          if (this.closed) return new Error("executing a cancelled action");
          this.pending = !1;
          const n = this._execute(t, e);
          if (n) return n;
          !1 === this.pending &&
            null != this.id &&
            (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
        }
        _execute(t, e) {
          let n = !1,
            s = void 0;
          try {
            this.work(t);
          } catch (r) {
            (n = !0), (s = (!!r && r) || new Error(r));
          }
          if (n) return this.unsubscribe(), s;
        }
        _unsubscribe() {
          const t = this.id,
            e = this.scheduler,
            n = e.actions,
            s = n.indexOf(this);
          (this.work = null),
            (this.state = null),
            (this.pending = !1),
            (this.scheduler = null),
            -1 !== s && n.splice(s, 1),
            null != t && (this.id = this.recycleAsyncId(e, t, null)),
            (this.delay = null);
        }
      }
      let mh = (() => {
        class t {
          constructor(e, n = t.now) {
            (this.SchedulerAction = e), (this.now = n);
          }
          schedule(t, e = 0, n) {
            return new this.SchedulerAction(this, t).schedule(n, e);
          }
        }
        return (t.now = () => Date.now()), t;
      })();
      class gh extends mh {
        constructor(t, e = mh.now) {
          super(t, () =>
            gh.delegate && gh.delegate !== this ? gh.delegate.now() : e()
          ),
            (this.actions = []),
            (this.active = !1),
            (this.scheduled = void 0);
        }
        schedule(t, e = 0, n) {
          return gh.delegate && gh.delegate !== this
            ? gh.delegate.schedule(t, e, n)
            : super.schedule(t, e, n);
        }
        flush(t) {
          const { actions: e } = this;
          if (this.active) return void e.push(t);
          let n;
          this.active = !0;
          do {
            if ((n = t.execute(t.state, t.delay))) break;
          } while ((t = e.shift()));
          if (((this.active = !1), n)) {
            for (; (t = e.shift()); ) t.unsubscribe();
            throw n;
          }
        }
      }
      class yh {
        constructor(t, e) {
          (this.predicate = t), (this.thisArg = e);
        }
        call(t, e) {
          return e.subscribe(new _h(t, this.predicate, this.thisArg));
        }
      }
      class _h extends f {
        constructor(t, e, n) {
          super(t), (this.predicate = e), (this.thisArg = n), (this.count = 0);
        }
        _next(t) {
          let e;
          try {
            e = this.predicate.call(this.thisArg, t, this.count++);
          } catch (n) {
            return void this.destination.error(n);
          }
          e && this.destination.next(t);
        }
      }
      const bh = (() => {
          function t() {
            return (
              Error.call(this),
              (this.message = "argument out of range"),
              (this.name = "ArgumentOutOfRangeError"),
              this
            );
          }
          return (t.prototype = Object.create(Error.prototype)), t;
        })(),
        vh = new _(t => t.complete());
      function wh(t) {
        return t
          ? (function(t) {
              return new _(e => t.schedule(() => e.complete()));
            })(t)
          : vh;
      }
      class Ch {
        constructor(t) {
          if (((this.total = t), this.total < 0)) throw new bh();
        }
        call(t, e) {
          return e.subscribe(new Eh(t, this.total));
        }
      }
      class Eh extends f {
        constructor(t, e) {
          super(t), (this.total = e), (this.count = 0);
        }
        _next(t) {
          const e = this.total,
            n = ++this.count;
          n <= e &&
            (this.destination.next(t),
            n === e && (this.destination.complete(), this.unsubscribe()));
        }
      }
      function Sh(t) {
        return null != t && "" + t != "false";
      }
      function Th(t) {
        return t instanceof Yo ? t.nativeElement : t;
      }
      let xh;
      try {
        xh = "undefined" != typeof Intl && Intl.v8BreakIterator;
      } catch (sg) {
        xh = !1;
      }
      let kh,
        Ah,
        Ih = (() => {
          class t {
            constructor(t) {
              (this._platformId = t),
                (this.isBrowser = this._platformId
                  ? "browser" === this._platformId
                  : "object" == typeof document && !!document),
                (this.EDGE =
                  this.isBrowser && /(edge)/i.test(navigator.userAgent)),
                (this.TRIDENT =
                  this.isBrowser &&
                  /(msie|trident)/i.test(navigator.userAgent)),
                (this.BLINK =
                  this.isBrowser &&
                  !(!window.chrome && !xh) &&
                  "undefined" != typeof CSS &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.WEBKIT =
                  this.isBrowser &&
                  /AppleWebKit/i.test(navigator.userAgent) &&
                  !this.BLINK &&
                  !this.EDGE &&
                  !this.TRIDENT),
                (this.IOS =
                  this.isBrowser &&
                  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
                  !("MSStream" in window)),
                (this.FIREFOX =
                  this.isBrowser &&
                  /(firefox|minefield)/i.test(navigator.userAgent)),
                (this.ANDROID =
                  this.isBrowser &&
                  /android/i.test(navigator.userAgent) &&
                  !this.TRIDENT),
                (this.SAFARI =
                  this.isBrowser &&
                  /safari/i.test(navigator.userAgent) &&
                  this.WEBKIT);
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(os(fl));
            }),
            (t.ɵprov = at({
              factory: function() {
                return new t(os(fl));
              },
              token: t,
              providedIn: "root"
            })),
            t
          );
        })(),
        Oh = (() => {
          class t {}
          return (
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = lt({
              factory: function(e) {
                return new (e || t)();
              }
            })),
            t
          );
        })();
      function Nh(t) {
        return (function() {
          if (null == kh && "undefined" != typeof window)
            try {
              window.addEventListener(
                "test",
                null,
                Object.defineProperty({}, "passive", { get: () => (kh = !0) })
              );
            } finally {
              kh = kh || !1;
            }
          return kh;
        })()
          ? t
          : !!t.capture;
      }
      let Dh = (() => {
          class t {
            create(t) {
              return "undefined" == typeof MutationObserver
                ? null
                : new MutationObserver(t);
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)();
            }),
            (t.ɵprov = at({
              factory: function() {
                return new t();
              },
              token: t,
              providedIn: "root"
            })),
            t
          );
        })(),
        Ph = (() => {
          class t {}
          return (
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = lt({
              factory: function(e) {
                return new (e || t)();
              },
              providers: [Dh]
            })),
            t
          );
        })();
      function Fh(t) {
        return 0 === t.buttons;
      }
      function Rh(t) {
        const e =
          (t.touches && t.touches[0]) ||
          (t.changedTouches && t.changedTouches[0]);
        return !(
          !e ||
          -1 !== e.identifier ||
          (null != e.radiusX && 1 !== e.radiusX) ||
          (null != e.radiusY && 1 !== e.radiusY)
        );
      }
      "undefined" != typeof Element && Element;
      const Mh = new Ln("cdk-focus-monitor-default-options"),
        Vh = Nh({ passive: !0, capture: !0 });
      let jh = (() => {
        class t {
          constructor(t, e, n, s) {
            (this._ngZone = t),
              (this._platform = e),
              (this._origin = null),
              (this._windowFocused = !1),
              (this._elementInfo = new Map()),
              (this._monitoredElementCount = 0),
              (this._rootNodeFocusListenerCount = new Map()),
              (this._documentKeydownListener = () => {
                (this._lastTouchTarget = null),
                  this._setOriginForCurrentEventQueue("keyboard");
              }),
              (this._documentMousedownListener = t => {
                if (!this._lastTouchTarget) {
                  const e = Fh(t) ? "keyboard" : "mouse";
                  this._setOriginForCurrentEventQueue(e);
                }
              }),
              (this._documentTouchstartListener = t => {
                Rh(t)
                  ? this._lastTouchTarget ||
                    this._setOriginForCurrentEventQueue("keyboard")
                  : (null != this._touchTimeoutId &&
                      clearTimeout(this._touchTimeoutId),
                    (this._lastTouchTarget = Lh(t)),
                    (this._touchTimeoutId = setTimeout(
                      () => (this._lastTouchTarget = null),
                      650
                    )));
              }),
              (this._windowFocusListener = () => {
                (this._windowFocused = !0),
                  (this._windowFocusTimeoutId = setTimeout(
                    () => (this._windowFocused = !1)
                  ));
              }),
              (this._rootNodeFocusAndBlurListener = t => {
                const e = Lh(t),
                  n = "focus" === t.type ? this._onFocus : this._onBlur;
                for (let s = e; s; s = s.parentElement) n.call(this, t, s);
              }),
              (this._document = n),
              (this._detectionMode =
                (null == s ? void 0 : s.detectionMode) || 0);
          }
          monitor(t, e = !1) {
            const n = Th(t);
            if (!this._platform.isBrowser || 1 !== n.nodeType) return lh(null);
            const s =
                (function(t) {
                  if (
                    (function() {
                      if (null == Ah) {
                        const t =
                          "undefined" != typeof document ? document.head : null;
                        Ah = !(!t || (!t.createShadowRoot && !t.attachShadow));
                      }
                      return Ah;
                    })()
                  ) {
                    const e = t.getRootNode ? t.getRootNode() : null;
                    if (
                      "undefined" != typeof ShadowRoot &&
                      ShadowRoot &&
                      e instanceof ShadowRoot
                    )
                      return e;
                  }
                  return null;
                })(n) || this._getDocument(),
              r = this._elementInfo.get(n);
            if (r) return e && (r.checkChildren = !0), r.subject;
            const i = { checkChildren: e, subject: new E(), rootNode: s };
            return (
              this._elementInfo.set(n, i),
              this._registerGlobalListeners(i),
              i.subject
            );
          }
          stopMonitoring(t) {
            const e = Th(t),
              n = this._elementInfo.get(e);
            n &&
              (n.subject.complete(),
              this._setClasses(e),
              this._elementInfo.delete(e),
              this._removeGlobalListeners(n));
          }
          focusVia(t, e, n) {
            const s = Th(t);
            s === this._getDocument().activeElement
              ? this._getClosestElementsInfo(s).forEach(([t, n]) =>
                  this._originChanged(t, e, n)
                )
              : (this._setOriginForCurrentEventQueue(e),
                "function" == typeof s.focus && s.focus(n));
          }
          ngOnDestroy() {
            this._elementInfo.forEach((t, e) => this.stopMonitoring(e));
          }
          _getDocument() {
            return this._document || document;
          }
          _getWindow() {
            return this._getDocument().defaultView || window;
          }
          _toggleClass(t, e, n) {
            n ? t.classList.add(e) : t.classList.remove(e);
          }
          _getFocusOrigin(t) {
            return this._origin
              ? this._origin
              : this._windowFocused && this._lastFocusOrigin
              ? this._lastFocusOrigin
              : this._wasCausedByTouch(t)
              ? "touch"
              : "program";
          }
          _setClasses(t, e) {
            this._toggleClass(t, "cdk-focused", !!e),
              this._toggleClass(t, "cdk-touch-focused", "touch" === e),
              this._toggleClass(t, "cdk-keyboard-focused", "keyboard" === e),
              this._toggleClass(t, "cdk-mouse-focused", "mouse" === e),
              this._toggleClass(t, "cdk-program-focused", "program" === e);
          }
          _setOriginForCurrentEventQueue(t) {
            this._ngZone.runOutsideAngular(() => {
              (this._origin = t),
                0 === this._detectionMode &&
                  (this._originTimeoutId = setTimeout(
                    () => (this._origin = null),
                    1
                  ));
            });
          }
          _wasCausedByTouch(t) {
            const e = Lh(t);
            return (
              this._lastTouchTarget instanceof Node &&
              e instanceof Node &&
              (e === this._lastTouchTarget || e.contains(this._lastTouchTarget))
            );
          }
          _onFocus(t, e) {
            const n = this._elementInfo.get(e);
            n &&
              (n.checkChildren || e === Lh(t)) &&
              this._originChanged(e, this._getFocusOrigin(t), n);
          }
          _onBlur(t, e) {
            const n = this._elementInfo.get(e);
            !n ||
              (n.checkChildren &&
                t.relatedTarget instanceof Node &&
                e.contains(t.relatedTarget)) ||
              (this._setClasses(e), this._emitOrigin(n.subject, null));
          }
          _emitOrigin(t, e) {
            this._ngZone.run(() => t.next(e));
          }
          _registerGlobalListeners(t) {
            if (!this._platform.isBrowser) return;
            const e = t.rootNode,
              n = this._rootNodeFocusListenerCount.get(e) || 0;
            n ||
              this._ngZone.runOutsideAngular(() => {
                e.addEventListener(
                  "focus",
                  this._rootNodeFocusAndBlurListener,
                  Vh
                ),
                  e.addEventListener(
                    "blur",
                    this._rootNodeFocusAndBlurListener,
                    Vh
                  );
              }),
              this._rootNodeFocusListenerCount.set(e, n + 1),
              1 == ++this._monitoredElementCount &&
                this._ngZone.runOutsideAngular(() => {
                  const t = this._getDocument(),
                    e = this._getWindow();
                  t.addEventListener(
                    "keydown",
                    this._documentKeydownListener,
                    Vh
                  ),
                    t.addEventListener(
                      "mousedown",
                      this._documentMousedownListener,
                      Vh
                    ),
                    t.addEventListener(
                      "touchstart",
                      this._documentTouchstartListener,
                      Vh
                    ),
                    e.addEventListener("focus", this._windowFocusListener);
                });
          }
          _removeGlobalListeners(t) {
            const e = t.rootNode;
            if (this._rootNodeFocusListenerCount.has(e)) {
              const t = this._rootNodeFocusListenerCount.get(e);
              t > 1
                ? this._rootNodeFocusListenerCount.set(e, t - 1)
                : (e.removeEventListener(
                    "focus",
                    this._rootNodeFocusAndBlurListener,
                    Vh
                  ),
                  e.removeEventListener(
                    "blur",
                    this._rootNodeFocusAndBlurListener,
                    Vh
                  ),
                  this._rootNodeFocusListenerCount.delete(e));
            }
            if (!--this._monitoredElementCount) {
              const t = this._getDocument(),
                e = this._getWindow();
              t.removeEventListener(
                "keydown",
                this._documentKeydownListener,
                Vh
              ),
                t.removeEventListener(
                  "mousedown",
                  this._documentMousedownListener,
                  Vh
                ),
                t.removeEventListener(
                  "touchstart",
                  this._documentTouchstartListener,
                  Vh
                ),
                e.removeEventListener("focus", this._windowFocusListener),
                clearTimeout(this._windowFocusTimeoutId),
                clearTimeout(this._touchTimeoutId),
                clearTimeout(this._originTimeoutId);
            }
          }
          _originChanged(t, e, n) {
            this._setClasses(t, e),
              this._emitOrigin(n.subject, e),
              (this._lastFocusOrigin = e);
          }
          _getClosestElementsInfo(t) {
            const e = [];
            return (
              this._elementInfo.forEach((n, s) => {
                (s === t || (n.checkChildren && s.contains(t))) &&
                  e.push([s, n]);
              }),
              e
            );
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(os(Il), os(Ih), os(rc, 8), os(Mh, 8));
          }),
          (t.ɵprov = at({
            factory: function() {
              return new t(os(Il), os(Ih), os(rc, 8), os(Mh, 8));
            },
            token: t,
            providedIn: "root"
          })),
          t
        );
      })();
      function Lh(t) {
        return t.composedPath ? t.composedPath()[0] : t.target;
      }
      const Bh = "cdk-high-contrast-black-on-white",
        Hh = "cdk-high-contrast-white-on-black",
        zh = "cdk-high-contrast-active";
      let qh = (() => {
          class t {
            constructor(t, e) {
              (this._platform = t), (this._document = e);
            }
            getHighContrastMode() {
              if (!this._platform.isBrowser) return 0;
              const t = this._document.createElement("div");
              (t.style.backgroundColor = "rgb(1,2,3)"),
                (t.style.position = "absolute"),
                this._document.body.appendChild(t);
              const e = this._document.defaultView || window,
                n = e && e.getComputedStyle ? e.getComputedStyle(t) : null,
                s = ((n && n.backgroundColor) || "").replace(/ /g, "");
              switch ((this._document.body.removeChild(t), s)) {
                case "rgb(0,0,0)":
                  return 2;
                case "rgb(255,255,255)":
                  return 1;
              }
              return 0;
            }
            _applyBodyHighContrastModeCssClasses() {
              if (this._platform.isBrowser && this._document.body) {
                const t = this._document.body.classList;
                t.remove(zh), t.remove(Bh), t.remove(Hh);
                const e = this.getHighContrastMode();
                1 === e
                  ? (t.add(zh), t.add(Bh))
                  : 2 === e && (t.add(zh), t.add(Hh));
              }
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(os(Ih), os(rc));
            }),
            (t.ɵprov = at({
              factory: function() {
                return new t(os(Ih), os(rc));
              },
              token: t,
              providedIn: "root"
            })),
            t
          );
        })(),
        $h = (() => {
          class t {}
          return (
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = lt({
              factory: function(e) {
                return new (e || t)();
              }
            })),
            t
          );
        })();
      const Uh = new na("11.2.11");
      class Wh {}
      const Qh = "*";
      function Zh(t, e = null) {
        return { type: 2, steps: t, options: e };
      }
      function Kh(t) {
        return { type: 6, styles: t, offset: null };
      }
      function Gh(t) {
        Promise.resolve(null).then(t);
      }
      class Yh {
        constructor(t = 0, e = 0) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._position = 0),
            (this.parentPlayer = null),
            (this.totalTime = t + e);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach(t => t()),
            (this._onDoneFns = []));
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        init() {}
        play() {
          this.hasStarted() || (this._onStart(), this.triggerMicrotask()),
            (this._started = !0);
        }
        triggerMicrotask() {
          Gh(() => this._onFinish());
        }
        _onStart() {
          this._onStartFns.forEach(t => t()), (this._onStartFns = []);
        }
        pause() {}
        restart() {}
        finish() {
          this._onFinish();
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.hasStarted() || this._onStart(),
            this.finish(),
            this._onDestroyFns.forEach(t => t()),
            (this._onDestroyFns = []));
        }
        reset() {}
        setPosition(t) {
          this._position = this.totalTime ? t * this.totalTime : 1;
        }
        getPosition() {
          return this.totalTime ? this._position / this.totalTime : 1;
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach(t => t()), (e.length = 0);
        }
      }
      class Jh {
        constructor(t) {
          (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this._onDestroyFns = []),
            (this.parentPlayer = null),
            (this.totalTime = 0),
            (this.players = t);
          let e = 0,
            n = 0,
            s = 0;
          const r = this.players.length;
          0 == r
            ? Gh(() => this._onFinish())
            : this.players.forEach(t => {
                t.onDone(() => {
                  ++e == r && this._onFinish();
                }),
                  t.onDestroy(() => {
                    ++n == r && this._onDestroy();
                  }),
                  t.onStart(() => {
                    ++s == r && this._onStart();
                  });
              }),
            (this.totalTime = this.players.reduce(
              (t, e) => Math.max(t, e.totalTime),
              0
            ));
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach(t => t()),
            (this._onDoneFns = []));
        }
        init() {
          this.players.forEach(t => t.init());
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        _onStart() {
          this.hasStarted() ||
            ((this._started = !0),
            this._onStartFns.forEach(t => t()),
            (this._onStartFns = []));
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this.parentPlayer || this.init(),
            this._onStart(),
            this.players.forEach(t => t.play());
        }
        pause() {
          this.players.forEach(t => t.pause());
        }
        restart() {
          this.players.forEach(t => t.restart());
        }
        finish() {
          this._onFinish(), this.players.forEach(t => t.finish());
        }
        destroy() {
          this._onDestroy();
        }
        _onDestroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._onFinish(),
            this.players.forEach(t => t.destroy()),
            this._onDestroyFns.forEach(t => t()),
            (this._onDestroyFns = []));
        }
        reset() {
          this.players.forEach(t => t.reset()),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        setPosition(t) {
          const e = t * this.totalTime;
          this.players.forEach(t => {
            const n = t.totalTime ? Math.min(1, e / t.totalTime) : 1;
            t.setPosition(n);
          });
        }
        getPosition() {
          const t = this.players.reduce(
            (t, e) => (null === t || e.totalTime > t.totalTime ? e : t),
            null
          );
          return null != t ? t.getPosition() : 0;
        }
        beforeDestroy() {
          this.players.forEach(t => {
            t.beforeDestroy && t.beforeDestroy();
          });
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach(t => t()), (e.length = 0);
        }
      }
      function Xh() {
        return (
          "undefined" != typeof process &&
          "[object process]" === {}.toString.call(process)
        );
      }
      function td(t) {
        switch (t.length) {
          case 0:
            return new Yh();
          case 1:
            return t[0];
          default:
            return new Jh(t);
        }
      }
      function ed(t, e, n, s, r = {}, i = {}) {
        const o = [],
          a = [];
        let l = -1,
          c = null;
        if (
          (s.forEach(t => {
            const n = t.offset,
              s = n == l,
              u = (s && c) || {};
            Object.keys(t).forEach(n => {
              let s = n,
                a = t[n];
              if ("offset" !== n)
                switch (((s = e.normalizePropertyName(s, o)), a)) {
                  case "!":
                    a = r[n];
                    break;
                  case Qh:
                    a = i[n];
                    break;
                  default:
                    a = e.normalizeStyleValue(n, s, a, o);
                }
              u[s] = a;
            }),
              s || a.push(u),
              (c = u),
              (l = n);
          }),
          o.length)
        ) {
          const t = "\n - ";
          throw new Error(
            `Unable to animate due to the following errors:${t}${o.join(t)}`
          );
        }
        return a;
      }
      function nd(t, e, n, s) {
        switch (e) {
          case "start":
            t.onStart(() => s(n && sd(n, "start", t)));
            break;
          case "done":
            t.onDone(() => s(n && sd(n, "done", t)));
            break;
          case "destroy":
            t.onDestroy(() => s(n && sd(n, "destroy", t)));
        }
      }
      function sd(t, e, n) {
        const s = n.totalTime,
          r = rd(
            t.element,
            t.triggerName,
            t.fromState,
            t.toState,
            e || t.phaseName,
            null == s ? t.totalTime : s,
            !!n.disabled
          ),
          i = t._data;
        return null != i && (r._data = i), r;
      }
      function rd(t, e, n, s, r = "", i = 0, o) {
        return {
          element: t,
          triggerName: e,
          fromState: n,
          toState: s,
          phaseName: r,
          totalTime: i,
          disabled: !!o
        };
      }
      function id(t, e, n) {
        let s;
        return (
          t instanceof Map
            ? ((s = t.get(e)), s || t.set(e, (s = n)))
            : ((s = t[e]), s || (s = t[e] = n)),
          s
        );
      }
      function od(t) {
        const e = t.indexOf(":");
        return [t.substring(1, e), t.substr(e + 1)];
      }
      let ad = (t, e) => !1,
        ld = (t, e) => !1,
        cd = (t, e, n) => [];
      const ud = Xh();
      (ud || "undefined" != typeof Element) &&
        ((ad = (t, e) => t.contains(e)),
        (ld = (() => {
          if (ud || Element.prototype.matches) return (t, e) => t.matches(e);
          {
            const t = Element.prototype,
              e =
                t.matchesSelector ||
                t.mozMatchesSelector ||
                t.msMatchesSelector ||
                t.oMatchesSelector ||
                t.webkitMatchesSelector;
            return e ? (t, n) => e.apply(t, [n]) : ld;
          }
        })()),
        (cd = (t, e, n) => {
          let s = [];
          if (n) {
            const n = t.querySelectorAll(e);
            for (let t = 0; t < n.length; t++) s.push(n[t]);
          } else {
            const n = t.querySelector(e);
            n && s.push(n);
          }
          return s;
        }));
      let hd = null,
        dd = !1;
      function pd(t) {
        hd ||
          ((hd = ("undefined" != typeof document ? document.body : null) || {}),
          (dd = !!hd.style && "WebkitAppearance" in hd.style));
        let e = !0;
        return (
          hd.style &&
            !(function(t) {
              return "ebkit" == t.substring(1, 6);
            })(t) &&
            ((e = t in hd.style), !e && dd) &&
            (e =
              "Webkit" + t.charAt(0).toUpperCase() + t.substr(1) in hd.style),
          e
        );
      }
      const fd = ld,
        md = ad,
        gd = cd;
      function yd(t) {
        const e = {};
        return (
          Object.keys(t).forEach(n => {
            const s = n.replace(/([a-z])([A-Z])/g, "$1-$2");
            e[s] = t[n];
          }),
          e
        );
      }
      let _d = (() => {
          class t {
            validateStyleProperty(t) {
              return pd(t);
            }
            matchesElement(t, e) {
              return fd(t, e);
            }
            containsElement(t, e) {
              return md(t, e);
            }
            query(t, e, n) {
              return gd(t, e, n);
            }
            computeStyle(t, e, n) {
              return n || "";
            }
            animate(t, e, n, s, r, i = [], o) {
              return new Yh(n, s);
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)();
            }),
            (t.ɵprov = at({ token: t, factory: t.ɵfac })),
            t
          );
        })(),
        bd = (() => {
          class t {}
          return (t.NOOP = new _d()), t;
        })();
      const vd = "ng-enter",
        wd = "ng-leave",
        Cd = "ng-trigger",
        Ed = ".ng-trigger",
        Sd = "ng-animating",
        Td = ".ng-animating";
      function xd(t) {
        if ("number" == typeof t) return t;
        const e = t.match(/^(-?[\.\d]+)(m?s)/);
        return !e || e.length < 2 ? 0 : kd(parseFloat(e[1]), e[2]);
      }
      function kd(t, e) {
        switch (e) {
          case "s":
            return 1e3 * t;
          default:
            return t;
        }
      }
      function Ad(t, e, n) {
        return t.hasOwnProperty("duration")
          ? t
          : (function(t, e, n) {
              let s,
                r = 0,
                i = "";
              if ("string" == typeof t) {
                const n = t.match(
                  /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i
                );
                if (null === n)
                  return (
                    e.push(`The provided timing value "${t}" is invalid.`),
                    { duration: 0, delay: 0, easing: "" }
                  );
                s = kd(parseFloat(n[1]), n[2]);
                const o = n[3];
                null != o && (r = kd(parseFloat(o), n[4]));
                const a = n[5];
                a && (i = a);
              } else s = t;
              if (!n) {
                let n = !1,
                  i = e.length;
                s < 0 &&
                  (e.push(
                    "Duration values below 0 are not allowed for this animation step."
                  ),
                  (n = !0)),
                  r < 0 &&
                    (e.push(
                      "Delay values below 0 are not allowed for this animation step."
                    ),
                    (n = !0)),
                  n &&
                    e.splice(
                      i,
                      0,
                      `The provided timing value "${t}" is invalid.`
                    );
              }
              return { duration: s, delay: r, easing: i };
            })(t, e, n);
      }
      function Id(t, e = {}) {
        return (
          Object.keys(t).forEach(n => {
            e[n] = t[n];
          }),
          e
        );
      }
      function Od(t, e, n = {}) {
        if (e) for (let s in t) n[s] = t[s];
        else Id(t, n);
        return n;
      }
      function Nd(t, e, n) {
        return n ? e + ":" + n + ";" : "";
      }
      function Dd(t) {
        let e = "";
        for (let n = 0; n < t.style.length; n++) {
          const s = t.style.item(n);
          e += Nd(0, s, t.style.getPropertyValue(s));
        }
        for (const n in t.style)
          t.style.hasOwnProperty(n) &&
            !n.startsWith("_") &&
            (e += Nd(
              0,
              n.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(),
              t.style[n]
            ));
        t.setAttribute("style", e);
      }
      function Pd(t, e, n) {
        t.style &&
          (Object.keys(e).forEach(s => {
            const r = Hd(s);
            n && !n.hasOwnProperty(s) && (n[s] = t.style[r]),
              (t.style[r] = e[s]);
          }),
          Xh() && Dd(t));
      }
      function Fd(t, e) {
        t.style &&
          (Object.keys(e).forEach(e => {
            const n = Hd(e);
            t.style[n] = "";
          }),
          Xh() && Dd(t));
      }
      function Rd(t) {
        return Array.isArray(t) ? (1 == t.length ? t[0] : Zh(t)) : t;
      }
      const Md = new RegExp("{{\\s*(.+?)\\s*}}", "g");
      function Vd(t) {
        let e = [];
        if ("string" == typeof t) {
          let n;
          for (; (n = Md.exec(t)); ) e.push(n[1]);
          Md.lastIndex = 0;
        }
        return e;
      }
      function jd(t, e, n) {
        const s = t.toString(),
          r = s.replace(Md, (t, s) => {
            let r = e[s];
            return (
              e.hasOwnProperty(s) ||
                (n.push("Please provide a value for the animation param " + s),
                (r = "")),
              r.toString()
            );
          });
        return r == s ? t : r;
      }
      function Ld(t) {
        const e = [];
        let n = t.next();
        for (; !n.done; ) e.push(n.value), (n = t.next());
        return e;
      }
      const Bd = /-+([a-z0-9])/g;
      function Hd(t) {
        return t.replace(Bd, (...t) => t[1].toUpperCase());
      }
      function zd(t, e) {
        return 0 === t || 0 === e;
      }
      function qd(t, e, n) {
        const s = Object.keys(n);
        if (s.length && e.length) {
          let i = e[0],
            o = [];
          if (
            (s.forEach(t => {
              i.hasOwnProperty(t) || o.push(t), (i[t] = n[t]);
            }),
            o.length)
          )
            for (var r = 1; r < e.length; r++) {
              let n = e[r];
              o.forEach(function(e) {
                n[e] = Ud(t, e);
              });
            }
        }
        return e;
      }
      function $d(t, e, n) {
        switch (e.type) {
          case 7:
            return t.visitTrigger(e, n);
          case 0:
            return t.visitState(e, n);
          case 1:
            return t.visitTransition(e, n);
          case 2:
            return t.visitSequence(e, n);
          case 3:
            return t.visitGroup(e, n);
          case 4:
            return t.visitAnimate(e, n);
          case 5:
            return t.visitKeyframes(e, n);
          case 6:
            return t.visitStyle(e, n);
          case 8:
            return t.visitReference(e, n);
          case 9:
            return t.visitAnimateChild(e, n);
          case 10:
            return t.visitAnimateRef(e, n);
          case 11:
            return t.visitQuery(e, n);
          case 12:
            return t.visitStagger(e, n);
          default:
            throw new Error(
              "Unable to resolve animation metadata node #" + e.type
            );
        }
      }
      function Ud(t, e) {
        return window.getComputedStyle(t)[e];
      }
      const Wd = "*";
      function Qd(t, e) {
        const n = [];
        return (
          "string" == typeof t
            ? t.split(/\s*,\s*/).forEach(t =>
                (function(t, e, n) {
                  if (":" == t[0]) {
                    const s = (function(t, e) {
                      switch (t) {
                        case ":enter":
                          return "void => *";
                        case ":leave":
                          return "* => void";
                        case ":increment":
                          return (t, e) => parseFloat(e) > parseFloat(t);
                        case ":decrement":
                          return (t, e) => parseFloat(e) < parseFloat(t);
                        default:
                          return (
                            e.push(
                              `The transition alias value "${t}" is not supported`
                            ),
                            "* => *"
                          );
                      }
                    })(t, n);
                    if ("function" == typeof s) return void e.push(s);
                    t = s;
                  }
                  const s = t.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
                  if (null == s || s.length < 4)
                    return (
                      n.push(
                        `The provided transition expression "${t}" is not supported`
                      ),
                      e
                    );
                  const r = s[1],
                    i = s[2],
                    o = s[3];
                  e.push(Gd(r, o)),
                    "<" != i[0] || (r == Wd && o == Wd) || e.push(Gd(o, r));
                })(t, n, e)
              )
            : n.push(t),
          n
        );
      }
      const Zd = new Set(["true", "1"]),
        Kd = new Set(["false", "0"]);
      function Gd(t, e) {
        const n = Zd.has(t) || Kd.has(t),
          s = Zd.has(e) || Kd.has(e);
        return (r, i) => {
          let o = t == Wd || t == r,
            a = e == Wd || e == i;
          return (
            !o && n && "boolean" == typeof r && (o = r ? Zd.has(t) : Kd.has(t)),
            !a && s && "boolean" == typeof i && (a = i ? Zd.has(e) : Kd.has(e)),
            o && a
          );
        };
      }
      const Yd = new RegExp("s*:selfs*,?", "g");
      function Jd(t, e, n) {
        return new Xd(t).build(e, n);
      }
      class Xd {
        constructor(t) {
          this._driver = t;
        }
        build(t, e) {
          const n = new tp(e);
          return this._resetContextStyleTimingState(n), $d(this, Rd(t), n);
        }
        _resetContextStyleTimingState(t) {
          (t.currentQuerySelector = ""),
            (t.collectedStyles = {}),
            (t.collectedStyles[""] = {}),
            (t.currentTime = 0);
        }
        visitTrigger(t, e) {
          let n = (e.queryCount = 0),
            s = (e.depCount = 0);
          const r = [],
            i = [];
          return (
            "@" == t.name.charAt(0) &&
              e.errors.push(
                "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))"
              ),
            t.definitions.forEach(t => {
              if ((this._resetContextStyleTimingState(e), 0 == t.type)) {
                const n = t,
                  s = n.name;
                s
                  .toString()
                  .split(/\s*,\s*/)
                  .forEach(t => {
                    (n.name = t), r.push(this.visitState(n, e));
                  }),
                  (n.name = s);
              } else if (1 == t.type) {
                const r = this.visitTransition(t, e);
                (n += r.queryCount), (s += r.depCount), i.push(r);
              } else
                e.errors.push(
                  "only state() and transition() definitions can sit inside of a trigger()"
                );
            }),
            {
              type: 7,
              name: t.name,
              states: r,
              transitions: i,
              queryCount: n,
              depCount: s,
              options: null
            }
          );
        }
        visitState(t, e) {
          const n = this.visitStyle(t.styles, e),
            s = (t.options && t.options.params) || null;
          if (n.containsDynamicStyles) {
            const r = new Set(),
              i = s || {};
            if (
              (n.styles.forEach(t => {
                if (ep(t)) {
                  const e = t;
                  Object.keys(e).forEach(t => {
                    Vd(e[t]).forEach(t => {
                      i.hasOwnProperty(t) || r.add(t);
                    });
                  });
                }
              }),
              r.size)
            ) {
              const n = Ld(r.values());
              e.errors.push(
                `state("${
                  t.name
                }", ...) must define default values for all the following style substitutions: ${n.join(
                  ", "
                )}`
              );
            }
          }
          return {
            type: 0,
            name: t.name,
            style: n,
            options: s ? { params: s } : null
          };
        }
        visitTransition(t, e) {
          (e.queryCount = 0), (e.depCount = 0);
          const n = $d(this, Rd(t.animation), e);
          return {
            type: 1,
            matchers: Qd(t.expr, e.errors),
            animation: n,
            queryCount: e.queryCount,
            depCount: e.depCount,
            options: np(t.options)
          };
        }
        visitSequence(t, e) {
          return {
            type: 2,
            steps: t.steps.map(t => $d(this, t, e)),
            options: np(t.options)
          };
        }
        visitGroup(t, e) {
          const n = e.currentTime;
          let s = 0;
          const r = t.steps.map(t => {
            e.currentTime = n;
            const r = $d(this, t, e);
            return (s = Math.max(s, e.currentTime)), r;
          });
          return (
            (e.currentTime = s), { type: 3, steps: r, options: np(t.options) }
          );
        }
        visitAnimate(t, e) {
          const n = (function(t, e) {
            let n = null;
            if (t.hasOwnProperty("duration")) n = t;
            else if ("number" == typeof t) return sp(Ad(t, e).duration, 0, "");
            const s = t;
            if (
              s.split(/\s+/).some(t => "{" == t.charAt(0) && "{" == t.charAt(1))
            ) {
              const t = sp(0, 0, "");
              return (t.dynamic = !0), (t.strValue = s), t;
            }
            return (n = n || Ad(s, e)), sp(n.duration, n.delay, n.easing);
          })(t.timings, e.errors);
          let s;
          e.currentAnimateTimings = n;
          let r = t.styles ? t.styles : Kh({});
          if (5 == r.type) s = this.visitKeyframes(r, e);
          else {
            let r = t.styles,
              i = !1;
            if (!r) {
              i = !0;
              const t = {};
              n.easing && (t.easing = n.easing), (r = Kh(t));
            }
            e.currentTime += n.duration + n.delay;
            const o = this.visitStyle(r, e);
            (o.isEmptyStep = i), (s = o);
          }
          return (
            (e.currentAnimateTimings = null),
            { type: 4, timings: n, style: s, options: null }
          );
        }
        visitStyle(t, e) {
          const n = this._makeStyleAst(t, e);
          return this._validateStyleAst(n, e), n;
        }
        _makeStyleAst(t, e) {
          const n = [];
          Array.isArray(t.styles)
            ? t.styles.forEach(t => {
                "string" == typeof t
                  ? t == Qh
                    ? n.push(t)
                    : e.errors.push(
                        `The provided style string value ${t} is not allowed.`
                      )
                  : n.push(t);
              })
            : n.push(t.styles);
          let s = !1,
            r = null;
          return (
            n.forEach(t => {
              if (ep(t)) {
                const e = t,
                  n = e.easing;
                if ((n && ((r = n), delete e.easing), !s))
                  for (let t in e)
                    if (e[t].toString().indexOf("{{") >= 0) {
                      s = !0;
                      break;
                    }
              }
            }),
            {
              type: 6,
              styles: n,
              easing: r,
              offset: t.offset,
              containsDynamicStyles: s,
              options: null
            }
          );
        }
        _validateStyleAst(t, e) {
          const n = e.currentAnimateTimings;
          let s = e.currentTime,
            r = e.currentTime;
          n && r > 0 && (r -= n.duration + n.delay),
            t.styles.forEach(t => {
              "string" != typeof t &&
                Object.keys(t).forEach(n => {
                  if (!this._driver.validateStyleProperty(n))
                    return void e.errors.push(
                      `The provided animation property "${n}" is not a supported CSS property for animations`
                    );
                  const i = e.collectedStyles[e.currentQuerySelector],
                    o = i[n];
                  let a = !0;
                  o &&
                    (r != s &&
                      r >= o.startTime &&
                      s <= o.endTime &&
                      (e.errors.push(
                        `The CSS property "${n}" that exists between the times of "${
                          o.startTime
                        }ms" and "${
                          o.endTime
                        }ms" is also being animated in a parallel animation between the times of "${r}ms" and "${s}ms"`
                      ),
                      (a = !1)),
                    (r = o.startTime)),
                    a && (i[n] = { startTime: r, endTime: s }),
                    e.options &&
                      (function(t, e, n) {
                        const s = e.params || {},
                          r = Vd(t);
                        r.length &&
                          r.forEach(t => {
                            s.hasOwnProperty(t) ||
                              n.push(
                                `Unable to resolve the local animation param ${t} in the given list of values`
                              );
                          });
                      })(t[n], e.options, e.errors);
                });
            });
        }
        visitKeyframes(t, e) {
          const n = { type: 5, styles: [], options: null };
          if (!e.currentAnimateTimings)
            return (
              e.errors.push(
                "keyframes() must be placed inside of a call to animate()"
              ),
              n
            );
          let s = 0;
          const r = [];
          let i = !1,
            o = !1,
            a = 0;
          const l = t.steps.map(t => {
            const n = this._makeStyleAst(t, e);
            let l =
                null != n.offset
                  ? n.offset
                  : (function(t) {
                      if ("string" == typeof t) return null;
                      let e = null;
                      if (Array.isArray(t))
                        t.forEach(t => {
                          if (ep(t) && t.hasOwnProperty("offset")) {
                            const n = t;
                            (e = parseFloat(n.offset)), delete n.offset;
                          }
                        });
                      else if (ep(t) && t.hasOwnProperty("offset")) {
                        const n = t;
                        (e = parseFloat(n.offset)), delete n.offset;
                      }
                      return e;
                    })(n.styles),
              c = 0;
            return (
              null != l && (s++, (c = n.offset = l)),
              (o = o || c < 0 || c > 1),
              (i = i || c < a),
              (a = c),
              r.push(c),
              n
            );
          });
          o &&
            e.errors.push(
              "Please ensure that all keyframe offsets are between 0 and 1"
            ),
            i &&
              e.errors.push(
                "Please ensure that all keyframe offsets are in order"
              );
          const c = t.steps.length;
          let u = 0;
          s > 0 && s < c
            ? e.errors.push(
                "Not all style() steps within the declared keyframes() contain offsets"
              )
            : 0 == s && (u = 1 / (c - 1));
          const h = c - 1,
            d = e.currentTime,
            p = e.currentAnimateTimings,
            f = p.duration;
          return (
            l.forEach((t, s) => {
              const i = u > 0 ? (s == h ? 1 : u * s) : r[s],
                o = i * f;
              (e.currentTime = d + p.delay + o),
                (p.duration = o),
                this._validateStyleAst(t, e),
                (t.offset = i),
                n.styles.push(t);
            }),
            n
          );
        }
        visitReference(t, e) {
          return {
            type: 8,
            animation: $d(this, Rd(t.animation), e),
            options: np(t.options)
          };
        }
        visitAnimateChild(t, e) {
          return e.depCount++, { type: 9, options: np(t.options) };
        }
        visitAnimateRef(t, e) {
          return {
            type: 10,
            animation: this.visitReference(t.animation, e),
            options: np(t.options)
          };
        }
        visitQuery(t, e) {
          const n = e.currentQuerySelector,
            s = t.options || {};
          e.queryCount++, (e.currentQuery = t);
          const [r, i] = (function(t) {
            const e = !!t.split(/\s*,\s*/).find(t => ":self" == t);
            return (
              e && (t = t.replace(Yd, "")),
              [
                (t = t
                  .replace(/@\*/g, Ed)
                  .replace(/@\w+/g, t => ".ng-trigger-" + t.substr(1))
                  .replace(/:animating/g, Td)),
                e
              ]
            );
          })(t.selector);
          (e.currentQuerySelector = n.length ? n + " " + r : r),
            id(e.collectedStyles, e.currentQuerySelector, {});
          const o = $d(this, Rd(t.animation), e);
          return (
            (e.currentQuery = null),
            (e.currentQuerySelector = n),
            {
              type: 11,
              selector: r,
              limit: s.limit || 0,
              optional: !!s.optional,
              includeSelf: i,
              animation: o,
              originalSelector: t.selector,
              options: np(t.options)
            }
          );
        }
        visitStagger(t, e) {
          e.currentQuery ||
            e.errors.push("stagger() can only be used inside of query()");
          const n =
            "full" === t.timings
              ? { duration: 0, delay: 0, easing: "full" }
              : Ad(t.timings, e.errors, !0);
          return {
            type: 12,
            animation: $d(this, Rd(t.animation), e),
            timings: n,
            options: null
          };
        }
      }
      class tp {
        constructor(t) {
          (this.errors = t),
            (this.queryCount = 0),
            (this.depCount = 0),
            (this.currentTransition = null),
            (this.currentQuery = null),
            (this.currentQuerySelector = null),
            (this.currentAnimateTimings = null),
            (this.currentTime = 0),
            (this.collectedStyles = {}),
            (this.options = null);
        }
      }
      function ep(t) {
        return !Array.isArray(t) && "object" == typeof t;
      }
      function np(t) {
        var e;
        return (
          t
            ? (t = Id(t)).params && (t.params = (e = t.params) ? Id(e) : null)
            : (t = {}),
          t
        );
      }
      function sp(t, e, n) {
        return { duration: t, delay: e, easing: n };
      }
      function rp(t, e, n, s, r, i, o = null, a = !1) {
        return {
          type: 1,
          element: t,
          keyframes: e,
          preStyleProps: n,
          postStyleProps: s,
          duration: r,
          delay: i,
          totalTime: r + i,
          easing: o,
          subTimeline: a
        };
      }
      class ip {
        constructor() {
          this._map = new Map();
        }
        consume(t) {
          let e = this._map.get(t);
          return e ? this._map.delete(t) : (e = []), e;
        }
        append(t, e) {
          let n = this._map.get(t);
          n || this._map.set(t, (n = [])), n.push(...e);
        }
        has(t) {
          return this._map.has(t);
        }
        clear() {
          this._map.clear();
        }
      }
      const op = new RegExp(":enter", "g"),
        ap = new RegExp(":leave", "g");
      function lp(t, e, n, s, r, i = {}, o = {}, a, l, c = []) {
        return new cp().buildKeyframes(t, e, n, s, r, i, o, a, l, c);
      }
      class cp {
        buildKeyframes(t, e, n, s, r, i, o, a, l, c = []) {
          l = l || new ip();
          const u = new hp(t, e, l, s, r, c, []);
          (u.options = a),
            u.currentTimeline.setStyles([i], null, u.errors, a),
            $d(this, n, u);
          const h = u.timelines.filter(t => t.containsAnimation());
          if (h.length && Object.keys(o).length) {
            const t = h[h.length - 1];
            t.allowOnlyTimelineStyles() || t.setStyles([o], null, u.errors, a);
          }
          return h.length
            ? h.map(t => t.buildKeyframes())
            : [rp(e, [], [], [], 0, 0, "", !1)];
        }
        visitTrigger(t, e) {}
        visitState(t, e) {}
        visitTransition(t, e) {}
        visitAnimateChild(t, e) {
          const n = e.subInstructions.consume(e.element);
          if (n) {
            const s = e.createSubContext(t.options),
              r = e.currentTimeline.currentTime,
              i = this._visitSubInstructions(n, s, s.options);
            r != i && e.transformIntoNewTimeline(i);
          }
          e.previousNode = t;
        }
        visitAnimateRef(t, e) {
          const n = e.createSubContext(t.options);
          n.transformIntoNewTimeline(),
            this.visitReference(t.animation, n),
            e.transformIntoNewTimeline(n.currentTimeline.currentTime),
            (e.previousNode = t);
        }
        _visitSubInstructions(t, e, n) {
          let s = e.currentTimeline.currentTime;
          const r = null != n.duration ? xd(n.duration) : null,
            i = null != n.delay ? xd(n.delay) : null;
          return (
            0 !== r &&
              t.forEach(t => {
                const n = e.appendInstructionToTimeline(t, r, i);
                s = Math.max(s, n.duration + n.delay);
              }),
            s
          );
        }
        visitReference(t, e) {
          e.updateOptions(t.options, !0),
            $d(this, t.animation, e),
            (e.previousNode = t);
        }
        visitSequence(t, e) {
          const n = e.subContextCount;
          let s = e;
          const r = t.options;
          if (
            r &&
            (r.params || r.delay) &&
            ((s = e.createSubContext(r)),
            s.transformIntoNewTimeline(),
            null != r.delay)
          ) {
            6 == s.previousNode.type &&
              (s.currentTimeline.snapshotCurrentStyles(),
              (s.previousNode = up));
            const t = xd(r.delay);
            s.delayNextStep(t);
          }
          t.steps.length &&
            (t.steps.forEach(t => $d(this, t, s)),
            s.currentTimeline.applyStylesToKeyframe(),
            s.subContextCount > n && s.transformIntoNewTimeline()),
            (e.previousNode = t);
        }
        visitGroup(t, e) {
          const n = [];
          let s = e.currentTimeline.currentTime;
          const r = t.options && t.options.delay ? xd(t.options.delay) : 0;
          t.steps.forEach(i => {
            const o = e.createSubContext(t.options);
            r && o.delayNextStep(r),
              $d(this, i, o),
              (s = Math.max(s, o.currentTimeline.currentTime)),
              n.push(o.currentTimeline);
          }),
            n.forEach(t => e.currentTimeline.mergeTimelineCollectedStyles(t)),
            e.transformIntoNewTimeline(s),
            (e.previousNode = t);
        }
        _visitTiming(t, e) {
          if (t.dynamic) {
            const n = t.strValue;
            return Ad(e.params ? jd(n, e.params, e.errors) : n, e.errors);
          }
          return { duration: t.duration, delay: t.delay, easing: t.easing };
        }
        visitAnimate(t, e) {
          const n = (e.currentAnimateTimings = this._visitTiming(t.timings, e)),
            s = e.currentTimeline;
          n.delay && (e.incrementTime(n.delay), s.snapshotCurrentStyles());
          const r = t.style;
          5 == r.type
            ? this.visitKeyframes(r, e)
            : (e.incrementTime(n.duration),
              this.visitStyle(r, e),
              s.applyStylesToKeyframe()),
            (e.currentAnimateTimings = null),
            (e.previousNode = t);
        }
        visitStyle(t, e) {
          const n = e.currentTimeline,
            s = e.currentAnimateTimings;
          !s && n.getCurrentStyleProperties().length && n.forwardFrame();
          const r = (s && s.easing) || t.easing;
          t.isEmptyStep
            ? n.applyEmptyStep(r)
            : n.setStyles(t.styles, r, e.errors, e.options),
            (e.previousNode = t);
        }
        visitKeyframes(t, e) {
          const n = e.currentAnimateTimings,
            s = e.currentTimeline.duration,
            r = n.duration,
            i = e.createSubContext().currentTimeline;
          (i.easing = n.easing),
            t.styles.forEach(t => {
              i.forwardTime((t.offset || 0) * r),
                i.setStyles(t.styles, t.easing, e.errors, e.options),
                i.applyStylesToKeyframe();
            }),
            e.currentTimeline.mergeTimelineCollectedStyles(i),
            e.transformIntoNewTimeline(s + r),
            (e.previousNode = t);
        }
        visitQuery(t, e) {
          const n = e.currentTimeline.currentTime,
            s = t.options || {},
            r = s.delay ? xd(s.delay) : 0;
          r &&
            (6 === e.previousNode.type ||
              (0 == n &&
                e.currentTimeline.getCurrentStyleProperties().length)) &&
            (e.currentTimeline.snapshotCurrentStyles(), (e.previousNode = up));
          let i = n;
          const o = e.invokeQuery(
            t.selector,
            t.originalSelector,
            t.limit,
            t.includeSelf,
            !!s.optional,
            e.errors
          );
          e.currentQueryTotal = o.length;
          let a = null;
          o.forEach((n, s) => {
            e.currentQueryIndex = s;
            const o = e.createSubContext(t.options, n);
            r && o.delayNextStep(r),
              n === e.element && (a = o.currentTimeline),
              $d(this, t.animation, o),
              o.currentTimeline.applyStylesToKeyframe(),
              (i = Math.max(i, o.currentTimeline.currentTime));
          }),
            (e.currentQueryIndex = 0),
            (e.currentQueryTotal = 0),
            e.transformIntoNewTimeline(i),
            a &&
              (e.currentTimeline.mergeTimelineCollectedStyles(a),
              e.currentTimeline.snapshotCurrentStyles()),
            (e.previousNode = t);
        }
        visitStagger(t, e) {
          const n = e.parentContext,
            s = e.currentTimeline,
            r = t.timings,
            i = Math.abs(r.duration),
            o = i * (e.currentQueryTotal - 1);
          let a = i * e.currentQueryIndex;
          switch (r.duration < 0 ? "reverse" : r.easing) {
            case "reverse":
              a = o - a;
              break;
            case "full":
              a = n.currentStaggerTime;
          }
          const l = e.currentTimeline;
          a && l.delayNextStep(a);
          const c = l.currentTime;
          $d(this, t.animation, e),
            (e.previousNode = t),
            (n.currentStaggerTime =
              s.currentTime - c + (s.startTime - n.currentTimeline.startTime));
        }
      }
      const up = {};
      class hp {
        constructor(t, e, n, s, r, i, o, a) {
          (this._driver = t),
            (this.element = e),
            (this.subInstructions = n),
            (this._enterClassName = s),
            (this._leaveClassName = r),
            (this.errors = i),
            (this.timelines = o),
            (this.parentContext = null),
            (this.currentAnimateTimings = null),
            (this.previousNode = up),
            (this.subContextCount = 0),
            (this.options = {}),
            (this.currentQueryIndex = 0),
            (this.currentQueryTotal = 0),
            (this.currentStaggerTime = 0),
            (this.currentTimeline = a || new dp(this._driver, e, 0)),
            o.push(this.currentTimeline);
        }
        get params() {
          return this.options.params;
        }
        updateOptions(t, e) {
          if (!t) return;
          const n = t;
          let s = this.options;
          null != n.duration && (s.duration = xd(n.duration)),
            null != n.delay && (s.delay = xd(n.delay));
          const r = n.params;
          if (r) {
            let t = s.params;
            t || (t = this.options.params = {}),
              Object.keys(r).forEach(n => {
                (e && t.hasOwnProperty(n)) || (t[n] = jd(r[n], t, this.errors));
              });
          }
        }
        _copyOptions() {
          const t = {};
          if (this.options) {
            const e = this.options.params;
            if (e) {
              const n = (t.params = {});
              Object.keys(e).forEach(t => {
                n[t] = e[t];
              });
            }
          }
          return t;
        }
        createSubContext(t = null, e, n) {
          const s = e || this.element,
            r = new hp(
              this._driver,
              s,
              this.subInstructions,
              this._enterClassName,
              this._leaveClassName,
              this.errors,
              this.timelines,
              this.currentTimeline.fork(s, n || 0)
            );
          return (
            (r.previousNode = this.previousNode),
            (r.currentAnimateTimings = this.currentAnimateTimings),
            (r.options = this._copyOptions()),
            r.updateOptions(t),
            (r.currentQueryIndex = this.currentQueryIndex),
            (r.currentQueryTotal = this.currentQueryTotal),
            (r.parentContext = this),
            this.subContextCount++,
            r
          );
        }
        transformIntoNewTimeline(t) {
          return (
            (this.previousNode = up),
            (this.currentTimeline = this.currentTimeline.fork(this.element, t)),
            this.timelines.push(this.currentTimeline),
            this.currentTimeline
          );
        }
        appendInstructionToTimeline(t, e, n) {
          const s = {
              duration: null != e ? e : t.duration,
              delay:
                this.currentTimeline.currentTime +
                (null != n ? n : 0) +
                t.delay,
              easing: ""
            },
            r = new pp(
              this._driver,
              t.element,
              t.keyframes,
              t.preStyleProps,
              t.postStyleProps,
              s,
              t.stretchStartingKeyframe
            );
          return this.timelines.push(r), s;
        }
        incrementTime(t) {
          this.currentTimeline.forwardTime(this.currentTimeline.duration + t);
        }
        delayNextStep(t) {
          t > 0 && this.currentTimeline.delayNextStep(t);
        }
        invokeQuery(t, e, n, s, r, i) {
          let o = [];
          if ((s && o.push(this.element), t.length > 0)) {
            t = (t = t.replace(op, "." + this._enterClassName)).replace(
              ap,
              "." + this._leaveClassName
            );
            let e = this._driver.query(this.element, t, 1 != n);
            0 !== n &&
              (e = n < 0 ? e.slice(e.length + n, e.length) : e.slice(0, n)),
              o.push(...e);
          }
          return (
            r ||
              0 != o.length ||
              i.push(
                `\`query("${e}")\` returned zero elements. (Use \`query("${e}", { optional: true })\` if you wish to allow this.)`
              ),
            o
          );
        }
      }
      class dp {
        constructor(t, e, n, s) {
          (this._driver = t),
            (this.element = e),
            (this.startTime = n),
            (this._elementTimelineStylesLookup = s),
            (this.duration = 0),
            (this._previousKeyframe = {}),
            (this._currentKeyframe = {}),
            (this._keyframes = new Map()),
            (this._styleSummary = {}),
            (this._pendingStyles = {}),
            (this._backFill = {}),
            (this._currentEmptyStepKeyframe = null),
            this._elementTimelineStylesLookup ||
              (this._elementTimelineStylesLookup = new Map()),
            (this._localTimelineStyles = Object.create(this._backFill, {})),
            (this._globalTimelineStyles = this._elementTimelineStylesLookup.get(
              e
            )),
            this._globalTimelineStyles ||
              ((this._globalTimelineStyles = this._localTimelineStyles),
              this._elementTimelineStylesLookup.set(
                e,
                this._localTimelineStyles
              )),
            this._loadKeyframe();
        }
        containsAnimation() {
          switch (this._keyframes.size) {
            case 0:
              return !1;
            case 1:
              return this.getCurrentStyleProperties().length > 0;
            default:
              return !0;
          }
        }
        getCurrentStyleProperties() {
          return Object.keys(this._currentKeyframe);
        }
        get currentTime() {
          return this.startTime + this.duration;
        }
        delayNextStep(t) {
          const e =
            1 == this._keyframes.size &&
            Object.keys(this._pendingStyles).length;
          this.duration || e
            ? (this.forwardTime(this.currentTime + t),
              e && this.snapshotCurrentStyles())
            : (this.startTime += t);
        }
        fork(t, e) {
          return (
            this.applyStylesToKeyframe(),
            new dp(
              this._driver,
              t,
              e || this.currentTime,
              this._elementTimelineStylesLookup
            )
          );
        }
        _loadKeyframe() {
          this._currentKeyframe &&
            (this._previousKeyframe = this._currentKeyframe),
            (this._currentKeyframe = this._keyframes.get(this.duration)),
            this._currentKeyframe ||
              ((this._currentKeyframe = Object.create(this._backFill, {})),
              this._keyframes.set(this.duration, this._currentKeyframe));
        }
        forwardFrame() {
          (this.duration += 1), this._loadKeyframe();
        }
        forwardTime(t) {
          this.applyStylesToKeyframe(),
            (this.duration = t),
            this._loadKeyframe();
        }
        _updateStyle(t, e) {
          (this._localTimelineStyles[t] = e),
            (this._globalTimelineStyles[t] = e),
            (this._styleSummary[t] = { time: this.currentTime, value: e });
        }
        allowOnlyTimelineStyles() {
          return this._currentEmptyStepKeyframe !== this._currentKeyframe;
        }
        applyEmptyStep(t) {
          t && (this._previousKeyframe.easing = t),
            Object.keys(this._globalTimelineStyles).forEach(t => {
              (this._backFill[t] = this._globalTimelineStyles[t] || Qh),
                (this._currentKeyframe[t] = Qh);
            }),
            (this._currentEmptyStepKeyframe = this._currentKeyframe);
        }
        setStyles(t, e, n, s) {
          e && (this._previousKeyframe.easing = e);
          const r = (s && s.params) || {},
            i = (function(t, e) {
              const n = {};
              let s;
              return (
                t.forEach(t => {
                  "*" === t
                    ? ((s = s || Object.keys(e)),
                      s.forEach(t => {
                        n[t] = Qh;
                      }))
                    : Od(t, !1, n);
                }),
                n
              );
            })(t, this._globalTimelineStyles);
          Object.keys(i).forEach(t => {
            const e = jd(i[t], r, n);
            (this._pendingStyles[t] = e),
              this._localTimelineStyles.hasOwnProperty(t) ||
                (this._backFill[t] = this._globalTimelineStyles.hasOwnProperty(
                  t
                )
                  ? this._globalTimelineStyles[t]
                  : Qh),
              this._updateStyle(t, e);
          });
        }
        applyStylesToKeyframe() {
          const t = this._pendingStyles,
            e = Object.keys(t);
          0 != e.length &&
            ((this._pendingStyles = {}),
            e.forEach(e => {
              this._currentKeyframe[e] = t[e];
            }),
            Object.keys(this._localTimelineStyles).forEach(t => {
              this._currentKeyframe.hasOwnProperty(t) ||
                (this._currentKeyframe[t] = this._localTimelineStyles[t]);
            }));
        }
        snapshotCurrentStyles() {
          Object.keys(this._localTimelineStyles).forEach(t => {
            const e = this._localTimelineStyles[t];
            (this._pendingStyles[t] = e), this._updateStyle(t, e);
          });
        }
        getFinalKeyframe() {
          return this._keyframes.get(this.duration);
        }
        get properties() {
          const t = [];
          for (let e in this._currentKeyframe) t.push(e);
          return t;
        }
        mergeTimelineCollectedStyles(t) {
          Object.keys(t._styleSummary).forEach(e => {
            const n = this._styleSummary[e],
              s = t._styleSummary[e];
            (!n || s.time > n.time) && this._updateStyle(e, s.value);
          });
        }
        buildKeyframes() {
          this.applyStylesToKeyframe();
          const t = new Set(),
            e = new Set(),
            n = 1 === this._keyframes.size && 0 === this.duration;
          let s = [];
          this._keyframes.forEach((r, i) => {
            const o = Od(r, !0);
            Object.keys(o).forEach(n => {
              const s = o[n];
              "!" == s ? t.add(n) : s == Qh && e.add(n);
            }),
              n || (o.offset = i / this.duration),
              s.push(o);
          });
          const r = t.size ? Ld(t.values()) : [],
            i = e.size ? Ld(e.values()) : [];
          if (n) {
            const t = s[0],
              e = Id(t);
            (t.offset = 0), (e.offset = 1), (s = [t, e]);
          }
          return rp(
            this.element,
            s,
            r,
            i,
            this.duration,
            this.startTime,
            this.easing,
            !1
          );
        }
      }
      class pp extends dp {
        constructor(t, e, n, s, r, i, o = !1) {
          super(t, e, i.delay),
            (this.element = e),
            (this.keyframes = n),
            (this.preStyleProps = s),
            (this.postStyleProps = r),
            (this._stretchStartingKeyframe = o),
            (this.timings = {
              duration: i.duration,
              delay: i.delay,
              easing: i.easing
            });
        }
        containsAnimation() {
          return this.keyframes.length > 1;
        }
        buildKeyframes() {
          let t = this.keyframes,
            { delay: e, duration: n, easing: s } = this.timings;
          if (this._stretchStartingKeyframe && e) {
            const r = [],
              i = n + e,
              o = e / i,
              a = Od(t[0], !1);
            (a.offset = 0), r.push(a);
            const l = Od(t[0], !1);
            (l.offset = fp(o)), r.push(l);
            const c = t.length - 1;
            for (let s = 1; s <= c; s++) {
              let o = Od(t[s], !1);
              (o.offset = fp((e + o.offset * n) / i)), r.push(o);
            }
            (n = i), (e = 0), (s = ""), (t = r);
          }
          return rp(
            this.element,
            t,
            this.preStyleProps,
            this.postStyleProps,
            n,
            e,
            s,
            !0
          );
        }
      }
      function fp(t, e = 3) {
        const n = Math.pow(10, e - 1);
        return Math.round(t * n) / n;
      }
      class mp {}
      class gp extends mp {
        normalizePropertyName(t, e) {
          return Hd(t);
        }
        normalizeStyleValue(t, e, n, s) {
          let r = "";
          const i = n.toString().trim();
          if (yp[e] && 0 !== n && "0" !== n)
            if ("number" == typeof n) r = "px";
            else {
              const e = n.match(/^[+-]?[\d\.]+([a-z]*)$/);
              e &&
                0 == e[1].length &&
                s.push(`Please provide a CSS unit value for ${t}:${n}`);
            }
          return i + r;
        }
      }
      const yp = (() =>
        (function(t) {
          const e = {};
          return t.forEach(t => (e[t] = !0)), e;
        })(
          "width,height,minWidth,minHeight,maxWidth,maxHeight,left,top,bottom,right,fontSize,outlineWidth,outlineOffset,paddingTop,paddingLeft,paddingBottom,paddingRight,marginTop,marginLeft,marginBottom,marginRight,borderRadius,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,textIndent,perspective".split(
            ","
          )
        ))();
      function _p(t, e, n, s, r, i, o, a, l, c, u, h, d) {
        return {
          type: 0,
          element: t,
          triggerName: e,
          isRemovalTransition: r,
          fromState: n,
          fromStyles: i,
          toState: s,
          toStyles: o,
          timelines: a,
          queriedElements: l,
          preStyleProps: c,
          postStyleProps: u,
          totalTime: h,
          errors: d
        };
      }
      const bp = {};
      class vp {
        constructor(t, e, n) {
          (this._triggerName = t), (this.ast = e), (this._stateStyles = n);
        }
        match(t, e, n, s) {
          return (function(t, e, n, s, r) {
            return t.some(t => t(e, n, s, r));
          })(this.ast.matchers, t, e, n, s);
        }
        buildStyles(t, e, n) {
          const s = this._stateStyles["*"],
            r = this._stateStyles[t],
            i = s ? s.buildStyles(e, n) : {};
          return r ? r.buildStyles(e, n) : i;
        }
        build(t, e, n, s, r, i, o, a, l, c) {
          const u = [],
            h = (this.ast.options && this.ast.options.params) || bp,
            d = this.buildStyles(n, (o && o.params) || bp, u),
            p = (a && a.params) || bp,
            f = this.buildStyles(s, p, u),
            m = new Set(),
            g = new Map(),
            y = new Map(),
            _ = "void" === s,
            b = { params: Object.assign(Object.assign({}, h), p) },
            v = c ? [] : lp(t, e, this.ast.animation, r, i, d, f, b, l, u);
          let w = 0;
          if (
            (v.forEach(t => {
              w = Math.max(t.duration + t.delay, w);
            }),
            u.length)
          )
            return _p(e, this._triggerName, n, s, _, d, f, [], [], g, y, w, u);
          v.forEach(t => {
            const n = t.element,
              s = id(g, n, {});
            t.preStyleProps.forEach(t => (s[t] = !0));
            const r = id(y, n, {});
            t.postStyleProps.forEach(t => (r[t] = !0)), n !== e && m.add(n);
          });
          const C = Ld(m.values());
          return _p(e, this._triggerName, n, s, _, d, f, v, C, g, y, w);
        }
      }
      class wp {
        constructor(t, e) {
          (this.styles = t), (this.defaultParams = e);
        }
        buildStyles(t, e) {
          const n = {},
            s = Id(this.defaultParams);
          return (
            Object.keys(t).forEach(e => {
              const n = t[e];
              null != n && (s[e] = n);
            }),
            this.styles.styles.forEach(t => {
              if ("string" != typeof t) {
                const r = t;
                Object.keys(r).forEach(t => {
                  let i = r[t];
                  i.length > 1 && (i = jd(i, s, e)), (n[t] = i);
                });
              }
            }),
            n
          );
        }
      }
      class Cp {
        constructor(t, e) {
          (this.name = t),
            (this.ast = e),
            (this.transitionFactories = []),
            (this.states = {}),
            e.states.forEach(t => {
              this.states[t.name] = new wp(
                t.style,
                (t.options && t.options.params) || {}
              );
            }),
            Ep(this.states, "true", "1"),
            Ep(this.states, "false", "0"),
            e.transitions.forEach(e => {
              this.transitionFactories.push(new vp(t, e, this.states));
            }),
            (this.fallbackTransition = new vp(
              t,
              {
                type: 1,
                animation: { type: 2, steps: [], options: null },
                matchers: [(t, e) => !0],
                options: null,
                queryCount: 0,
                depCount: 0
              },
              this.states
            ));
        }
        get containsQueries() {
          return this.ast.queryCount > 0;
        }
        matchTransition(t, e, n, s) {
          return (
            this.transitionFactories.find(r => r.match(t, e, n, s)) || null
          );
        }
        matchStyles(t, e, n) {
          return this.fallbackTransition.buildStyles(t, e, n);
        }
      }
      function Ep(t, e, n) {
        t.hasOwnProperty(e)
          ? t.hasOwnProperty(n) || (t[n] = t[e])
          : t.hasOwnProperty(n) && (t[e] = t[n]);
      }
      const Sp = new ip();
      class Tp {
        constructor(t, e, n) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._normalizer = n),
            (this._animations = {}),
            (this._playersById = {}),
            (this.players = []);
        }
        register(t, e) {
          const n = [],
            s = Jd(this._driver, e, n);
          if (n.length)
            throw new Error(
              "Unable to build the animation due to the following errors: " +
                n.join("\n")
            );
          this._animations[t] = s;
        }
        _buildPlayer(t, e, n) {
          const s = t.element,
            r = ed(0, this._normalizer, 0, t.keyframes, e, n);
          return this._driver.animate(
            s,
            r,
            t.duration,
            t.delay,
            t.easing,
            [],
            !0
          );
        }
        create(t, e, n = {}) {
          const s = [],
            r = this._animations[t];
          let i;
          const o = new Map();
          if (
            (r
              ? ((i = lp(this._driver, e, r, vd, wd, {}, {}, n, Sp, s)),
                i.forEach(t => {
                  const e = id(o, t.element, {});
                  t.postStyleProps.forEach(t => (e[t] = null));
                }))
              : (s.push(
                  "The requested animation doesn't exist or has already been destroyed"
                ),
                (i = [])),
            s.length)
          )
            throw new Error(
              "Unable to create the animation due to the following errors: " +
                s.join("\n")
            );
          o.forEach((t, e) => {
            Object.keys(t).forEach(n => {
              t[n] = this._driver.computeStyle(e, n, Qh);
            });
          });
          const a = td(
            i.map(t => {
              const e = o.get(t.element);
              return this._buildPlayer(t, {}, e);
            })
          );
          return (
            (this._playersById[t] = a),
            a.onDestroy(() => this.destroy(t)),
            this.players.push(a),
            a
          );
        }
        destroy(t) {
          const e = this._getPlayer(t);
          e.destroy(), delete this._playersById[t];
          const n = this.players.indexOf(e);
          n >= 0 && this.players.splice(n, 1);
        }
        _getPlayer(t) {
          const e = this._playersById[t];
          if (!e)
            throw new Error(
              "Unable to find the timeline player referenced by " + t
            );
          return e;
        }
        listen(t, e, n, s) {
          const r = rd(e, "", "", "");
          return nd(this._getPlayer(t), n, r, s), () => {};
        }
        command(t, e, n, s) {
          if ("register" == n) return void this.register(t, s[0]);
          if ("create" == n) return void this.create(t, e, s[0] || {});
          const r = this._getPlayer(t);
          switch (n) {
            case "play":
              r.play();
              break;
            case "pause":
              r.pause();
              break;
            case "reset":
              r.reset();
              break;
            case "restart":
              r.restart();
              break;
            case "finish":
              r.finish();
              break;
            case "init":
              r.init();
              break;
            case "setPosition":
              r.setPosition(parseFloat(s[0]));
              break;
            case "destroy":
              this.destroy(t);
          }
        }
      }
      const xp = "ng-animate-queued",
        kp = "ng-animate-disabled",
        Ap = ".ng-animate-disabled",
        Ip = [],
        Op = {
          namespaceId: "",
          setForRemoval: !1,
          setForMove: !1,
          hasAnimation: !1,
          removedBeforeQueried: !1
        },
        Np = {
          namespaceId: "",
          setForMove: !1,
          setForRemoval: !1,
          hasAnimation: !1,
          removedBeforeQueried: !0
        };
      class Dp {
        constructor(t, e = "") {
          this.namespaceId = e;
          const n = t && t.hasOwnProperty("value");
          if (((this.value = null != (s = n ? t.value : t) ? s : null), n)) {
            const e = Id(t);
            delete e.value, (this.options = e);
          } else this.options = {};
          var s;
          this.options.params || (this.options.params = {});
        }
        get params() {
          return this.options.params;
        }
        absorbOptions(t) {
          const e = t.params;
          if (e) {
            const t = this.options.params;
            Object.keys(e).forEach(n => {
              null == t[n] && (t[n] = e[n]);
            });
          }
        }
      }
      const Pp = "void",
        Fp = new Dp(Pp);
      class Rp {
        constructor(t, e, n) {
          (this.id = t),
            (this.hostElement = e),
            (this._engine = n),
            (this.players = []),
            (this._triggers = {}),
            (this._queue = []),
            (this._elementListeners = new Map()),
            (this._hostClassName = "ng-tns-" + t),
            zp(e, this._hostClassName);
        }
        listen(t, e, n, s) {
          if (!this._triggers.hasOwnProperty(e))
            throw new Error(
              `Unable to listen on the animation trigger event "${n}" because the animation trigger "${e}" doesn't exist!`
            );
          if (null == n || 0 == n.length)
            throw new Error(
              `Unable to listen on the animation trigger "${e}" because the provided event is undefined!`
            );
          if ("start" != (r = n) && "done" != r)
            throw new Error(
              `The provided animation trigger event "${n}" for the animation trigger "${e}" is not supported!`
            );
          var r;
          const i = id(this._elementListeners, t, []),
            o = { name: e, phase: n, callback: s };
          i.push(o);
          const a = id(this._engine.statesByElement, t, {});
          return (
            a.hasOwnProperty(e) ||
              (zp(t, Cd), zp(t, "ng-trigger-" + e), (a[e] = Fp)),
            () => {
              this._engine.afterFlush(() => {
                const t = i.indexOf(o);
                t >= 0 && i.splice(t, 1), this._triggers[e] || delete a[e];
              });
            }
          );
        }
        register(t, e) {
          return !this._triggers[t] && ((this._triggers[t] = e), !0);
        }
        _getTrigger(t) {
          const e = this._triggers[t];
          if (!e)
            throw new Error(
              `The provided animation trigger "${t}" has not been registered!`
            );
          return e;
        }
        trigger(t, e, n, s = !0) {
          const r = this._getTrigger(e),
            i = new Vp(this.id, e, t);
          let o = this._engine.statesByElement.get(t);
          o ||
            (zp(t, Cd),
            zp(t, "ng-trigger-" + e),
            this._engine.statesByElement.set(t, (o = {})));
          let a = o[e];
          const l = new Dp(n, this.id);
          if (
            (!(n && n.hasOwnProperty("value")) &&
              a &&
              l.absorbOptions(a.options),
            (o[e] = l),
            a || (a = Fp),
            l.value !== Pp && a.value === l.value)
          ) {
            if (
              !(function(t, e) {
                const n = Object.keys(t),
                  s = Object.keys(e);
                if (n.length != s.length) return !1;
                for (let r = 0; r < n.length; r++) {
                  const s = n[r];
                  if (!e.hasOwnProperty(s) || t[s] !== e[s]) return !1;
                }
                return !0;
              })(a.params, l.params)
            ) {
              const e = [],
                n = r.matchStyles(a.value, a.params, e),
                s = r.matchStyles(l.value, l.params, e);
              e.length
                ? this._engine.reportError(e)
                : this._engine.afterFlush(() => {
                    Fd(t, n), Pd(t, s);
                  });
            }
            return;
          }
          const c = id(this._engine.playersByElement, t, []);
          c.forEach(t => {
            t.namespaceId == this.id &&
              t.triggerName == e &&
              t.queued &&
              t.destroy();
          });
          let u = r.matchTransition(a.value, l.value, t, l.params),
            h = !1;
          if (!u) {
            if (!s) return;
            (u = r.fallbackTransition), (h = !0);
          }
          return (
            this._engine.totalQueuedPlayers++,
            this._queue.push({
              element: t,
              triggerName: e,
              transition: u,
              fromState: a,
              toState: l,
              player: i,
              isFallbackTransition: h
            }),
            h ||
              (zp(t, xp),
              i.onStart(() => {
                qp(t, xp);
              })),
            i.onDone(() => {
              let e = this.players.indexOf(i);
              e >= 0 && this.players.splice(e, 1);
              const n = this._engine.playersByElement.get(t);
              if (n) {
                let t = n.indexOf(i);
                t >= 0 && n.splice(t, 1);
              }
            }),
            this.players.push(i),
            c.push(i),
            i
          );
        }
        deregister(t) {
          delete this._triggers[t],
            this._engine.statesByElement.forEach((e, n) => {
              delete e[t];
            }),
            this._elementListeners.forEach((e, n) => {
              this._elementListeners.set(n, e.filter(e => e.name != t));
            });
        }
        clearElementCache(t) {
          this._engine.statesByElement.delete(t),
            this._elementListeners.delete(t);
          const e = this._engine.playersByElement.get(t);
          e &&
            (e.forEach(t => t.destroy()),
            this._engine.playersByElement.delete(t));
        }
        _signalRemovalForInnerTriggers(t, e) {
          const n = this._engine.driver.query(t, Ed, !0);
          n.forEach(t => {
            if (t.__ng_removed) return;
            const n = this._engine.fetchNamespacesByElement(t);
            n.size
              ? n.forEach(n => n.triggerLeaveAnimation(t, e, !1, !0))
              : this.clearElementCache(t);
          }),
            this._engine.afterFlushAnimationsDone(() =>
              n.forEach(t => this.clearElementCache(t))
            );
        }
        triggerLeaveAnimation(t, e, n, s) {
          const r = this._engine.statesByElement.get(t);
          if (r) {
            const i = [];
            if (
              (Object.keys(r).forEach(e => {
                if (this._triggers[e]) {
                  const n = this.trigger(t, e, Pp, s);
                  n && i.push(n);
                }
              }),
              i.length)
            )
              return (
                this._engine.markElementAsRemoved(this.id, t, !0, e),
                n && td(i).onDone(() => this._engine.processLeaveNode(t)),
                !0
              );
          }
          return !1;
        }
        prepareLeaveAnimationListeners(t) {
          const e = this._elementListeners.get(t);
          if (e) {
            const n = new Set();
            e.forEach(e => {
              const s = e.name;
              if (n.has(s)) return;
              n.add(s);
              const r = this._triggers[s].fallbackTransition,
                i = this._engine.statesByElement.get(t)[s] || Fp,
                o = new Dp(Pp),
                a = new Vp(this.id, s, t);
              this._engine.totalQueuedPlayers++,
                this._queue.push({
                  element: t,
                  triggerName: s,
                  transition: r,
                  fromState: i,
                  toState: o,
                  player: a,
                  isFallbackTransition: !0
                });
            });
          }
        }
        removeNode(t, e) {
          const n = this._engine;
          if (
            (t.childElementCount && this._signalRemovalForInnerTriggers(t, e),
            this.triggerLeaveAnimation(t, e, !0))
          )
            return;
          let s = !1;
          if (n.totalAnimations) {
            const e = n.players.length ? n.playersByQueriedElement.get(t) : [];
            if (e && e.length) s = !0;
            else {
              let e = t;
              for (; (e = e.parentNode); )
                if (n.statesByElement.get(e)) {
                  s = !0;
                  break;
                }
            }
          }
          if ((this.prepareLeaveAnimationListeners(t), s))
            n.markElementAsRemoved(this.id, t, !1, e);
          else {
            const s = t.__ng_removed;
            (s && s !== Op) ||
              (n.afterFlush(() => this.clearElementCache(t)),
              n.destroyInnerAnimations(t),
              n._onRemovalComplete(t, e));
          }
        }
        insertNode(t, e) {
          zp(t, this._hostClassName);
        }
        drainQueuedTransitions(t) {
          const e = [];
          return (
            this._queue.forEach(n => {
              const s = n.player;
              if (s.destroyed) return;
              const r = n.element,
                i = this._elementListeners.get(r);
              i &&
                i.forEach(e => {
                  if (e.name == n.triggerName) {
                    const s = rd(
                      r,
                      n.triggerName,
                      n.fromState.value,
                      n.toState.value
                    );
                    (s._data = t), nd(n.player, e.phase, s, e.callback);
                  }
                }),
                s.markedForDestroy
                  ? this._engine.afterFlush(() => {
                      s.destroy();
                    })
                  : e.push(n);
            }),
            (this._queue = []),
            e.sort((t, e) => {
              const n = t.transition.ast.depCount,
                s = e.transition.ast.depCount;
              return 0 == n || 0 == s
                ? n - s
                : this._engine.driver.containsElement(t.element, e.element)
                ? 1
                : -1;
            })
          );
        }
        destroy(t) {
          this.players.forEach(t => t.destroy()),
            this._signalRemovalForInnerTriggers(this.hostElement, t);
        }
        elementContainsData(t) {
          let e = !1;
          return (
            this._elementListeners.has(t) && (e = !0),
            (e = !!this._queue.find(e => e.element === t) || e),
            e
          );
        }
      }
      class Mp {
        constructor(t, e, n) {
          (this.bodyNode = t),
            (this.driver = e),
            (this._normalizer = n),
            (this.players = []),
            (this.newHostElements = new Map()),
            (this.playersByElement = new Map()),
            (this.playersByQueriedElement = new Map()),
            (this.statesByElement = new Map()),
            (this.disabledNodes = new Set()),
            (this.totalAnimations = 0),
            (this.totalQueuedPlayers = 0),
            (this._namespaceLookup = {}),
            (this._namespaceList = []),
            (this._flushFns = []),
            (this._whenQuietFns = []),
            (this.namespacesByHostElement = new Map()),
            (this.collectedEnterElements = []),
            (this.collectedLeaveElements = []),
            (this.onRemovalComplete = (t, e) => {});
        }
        _onRemovalComplete(t, e) {
          this.onRemovalComplete(t, e);
        }
        get queuedPlayers() {
          const t = [];
          return (
            this._namespaceList.forEach(e => {
              e.players.forEach(e => {
                e.queued && t.push(e);
              });
            }),
            t
          );
        }
        createNamespace(t, e) {
          const n = new Rp(t, e, this);
          return (
            e.parentNode
              ? this._balanceNamespaceList(n, e)
              : (this.newHostElements.set(e, n), this.collectEnterElement(e)),
            (this._namespaceLookup[t] = n)
          );
        }
        _balanceNamespaceList(t, e) {
          const n = this._namespaceList.length - 1;
          if (n >= 0) {
            let s = !1;
            for (let r = n; r >= 0; r--)
              if (
                this.driver.containsElement(
                  this._namespaceList[r].hostElement,
                  e
                )
              ) {
                this._namespaceList.splice(r + 1, 0, t), (s = !0);
                break;
              }
            s || this._namespaceList.splice(0, 0, t);
          } else this._namespaceList.push(t);
          return this.namespacesByHostElement.set(e, t), t;
        }
        register(t, e) {
          let n = this._namespaceLookup[t];
          return n || (n = this.createNamespace(t, e)), n;
        }
        registerTrigger(t, e, n) {
          let s = this._namespaceLookup[t];
          s && s.register(e, n) && this.totalAnimations++;
        }
        destroy(t, e) {
          if (!t) return;
          const n = this._fetchNamespace(t);
          this.afterFlush(() => {
            this.namespacesByHostElement.delete(n.hostElement),
              delete this._namespaceLookup[t];
            const e = this._namespaceList.indexOf(n);
            e >= 0 && this._namespaceList.splice(e, 1);
          }),
            this.afterFlushAnimationsDone(() => n.destroy(e));
        }
        _fetchNamespace(t) {
          return this._namespaceLookup[t];
        }
        fetchNamespacesByElement(t) {
          const e = new Set(),
            n = this.statesByElement.get(t);
          if (n) {
            const t = Object.keys(n);
            for (let s = 0; s < t.length; s++) {
              const r = n[t[s]].namespaceId;
              if (r) {
                const t = this._fetchNamespace(r);
                t && e.add(t);
              }
            }
          }
          return e;
        }
        trigger(t, e, n, s) {
          if (jp(e)) {
            const r = this._fetchNamespace(t);
            if (r) return r.trigger(e, n, s), !0;
          }
          return !1;
        }
        insertNode(t, e, n, s) {
          if (!jp(e)) return;
          const r = e.__ng_removed;
          if (r && r.setForRemoval) {
            (r.setForRemoval = !1), (r.setForMove = !0);
            const t = this.collectedLeaveElements.indexOf(e);
            t >= 0 && this.collectedLeaveElements.splice(t, 1);
          }
          if (t) {
            const s = this._fetchNamespace(t);
            s && s.insertNode(e, n);
          }
          s && this.collectEnterElement(e);
        }
        collectEnterElement(t) {
          this.collectedEnterElements.push(t);
        }
        markElementAsDisabled(t, e) {
          e
            ? this.disabledNodes.has(t) ||
              (this.disabledNodes.add(t), zp(t, kp))
            : this.disabledNodes.has(t) &&
              (this.disabledNodes.delete(t), qp(t, kp));
        }
        removeNode(t, e, n, s) {
          if (jp(e)) {
            const r = t ? this._fetchNamespace(t) : null;
            if (
              (r ? r.removeNode(e, s) : this.markElementAsRemoved(t, e, !1, s),
              n)
            ) {
              const n = this.namespacesByHostElement.get(e);
              n && n.id !== t && n.removeNode(e, s);
            }
          } else this._onRemovalComplete(e, s);
        }
        markElementAsRemoved(t, e, n, s) {
          this.collectedLeaveElements.push(e),
            (e.__ng_removed = {
              namespaceId: t,
              setForRemoval: s,
              hasAnimation: n,
              removedBeforeQueried: !1
            });
        }
        listen(t, e, n, s, r) {
          return jp(e) ? this._fetchNamespace(t).listen(e, n, s, r) : () => {};
        }
        _buildInstruction(t, e, n, s, r) {
          return t.transition.build(
            this.driver,
            t.element,
            t.fromState.value,
            t.toState.value,
            n,
            s,
            t.fromState.options,
            t.toState.options,
            e,
            r
          );
        }
        destroyInnerAnimations(t) {
          let e = this.driver.query(t, Ed, !0);
          e.forEach(t => this.destroyActiveAnimationsForElement(t)),
            0 != this.playersByQueriedElement.size &&
              ((e = this.driver.query(t, Td, !0)),
              e.forEach(t => this.finishActiveQueriedAnimationOnElement(t)));
        }
        destroyActiveAnimationsForElement(t) {
          const e = this.playersByElement.get(t);
          e &&
            e.forEach(t => {
              t.queued ? (t.markedForDestroy = !0) : t.destroy();
            });
        }
        finishActiveQueriedAnimationOnElement(t) {
          const e = this.playersByQueriedElement.get(t);
          e && e.forEach(t => t.finish());
        }
        whenRenderingDone() {
          return new Promise(t => {
            if (this.players.length) return td(this.players).onDone(() => t());
            t();
          });
        }
        processLeaveNode(t) {
          const e = t.__ng_removed;
          if (e && e.setForRemoval) {
            if (((t.__ng_removed = Op), e.namespaceId)) {
              this.destroyInnerAnimations(t);
              const n = this._fetchNamespace(e.namespaceId);
              n && n.clearElementCache(t);
            }
            this._onRemovalComplete(t, e.setForRemoval);
          }
          this.driver.matchesElement(t, Ap) &&
            this.markElementAsDisabled(t, !1),
            this.driver.query(t, Ap, !0).forEach(t => {
              this.markElementAsDisabled(t, !1);
            });
        }
        flush(t = -1) {
          let e = [];
          if (
            (this.newHostElements.size &&
              (this.newHostElements.forEach((t, e) =>
                this._balanceNamespaceList(t, e)
              ),
              this.newHostElements.clear()),
            this.totalAnimations && this.collectedEnterElements.length)
          )
            for (let n = 0; n < this.collectedEnterElements.length; n++)
              zp(this.collectedEnterElements[n], "ng-star-inserted");
          if (
            this._namespaceList.length &&
            (this.totalQueuedPlayers || this.collectedLeaveElements.length)
          ) {
            const n = [];
            try {
              e = this._flushAnimations(n, t);
            } finally {
              for (let t = 0; t < n.length; t++) n[t]();
            }
          } else
            for (let n = 0; n < this.collectedLeaveElements.length; n++)
              this.processLeaveNode(this.collectedLeaveElements[n]);
          if (
            ((this.totalQueuedPlayers = 0),
            (this.collectedEnterElements.length = 0),
            (this.collectedLeaveElements.length = 0),
            this._flushFns.forEach(t => t()),
            (this._flushFns = []),
            this._whenQuietFns.length)
          ) {
            const t = this._whenQuietFns;
            (this._whenQuietFns = []),
              e.length
                ? td(e).onDone(() => {
                    t.forEach(t => t());
                  })
                : t.forEach(t => t());
          }
        }
        reportError(t) {
          throw new Error(
            "Unable to process animations due to the following failed trigger transitions\n " +
              t.join("\n")
          );
        }
        _flushAnimations(t, e) {
          const n = new ip(),
            s = [],
            r = new Map(),
            i = [],
            o = new Map(),
            a = new Map(),
            l = new Map(),
            c = new Set();
          this.disabledNodes.forEach(t => {
            c.add(t);
            const e = this.driver.query(t, ".ng-animate-queued", !0);
            for (let n = 0; n < e.length; n++) c.add(e[n]);
          });
          const u = this.bodyNode,
            h = Array.from(this.statesByElement.keys()),
            d = Hp(h, this.collectedEnterElements),
            p = new Map();
          let f = 0;
          d.forEach((t, e) => {
            const n = vd + f++;
            p.set(e, n), t.forEach(t => zp(t, n));
          });
          const m = [],
            g = new Set(),
            y = new Set();
          for (let O = 0; O < this.collectedLeaveElements.length; O++) {
            const t = this.collectedLeaveElements[O],
              e = t.__ng_removed;
            e &&
              e.setForRemoval &&
              (m.push(t),
              g.add(t),
              e.hasAnimation
                ? this.driver
                    .query(t, ".ng-star-inserted", !0)
                    .forEach(t => g.add(t))
                : y.add(t));
          }
          const _ = new Map(),
            b = Hp(h, Array.from(g));
          b.forEach((t, e) => {
            const n = wd + f++;
            _.set(e, n), t.forEach(t => zp(t, n));
          }),
            t.push(() => {
              d.forEach((t, e) => {
                const n = p.get(e);
                t.forEach(t => qp(t, n));
              }),
                b.forEach((t, e) => {
                  const n = _.get(e);
                  t.forEach(t => qp(t, n));
                }),
                m.forEach(t => {
                  this.processLeaveNode(t);
                });
            });
          const v = [],
            w = [];
          for (let O = this._namespaceList.length - 1; O >= 0; O--)
            this._namespaceList[O].drainQueuedTransitions(e).forEach(t => {
              const e = t.player,
                r = t.element;
              if ((v.push(e), this.collectedEnterElements.length)) {
                const t = r.__ng_removed;
                if (t && t.setForMove) return void e.destroy();
              }
              const c = !u || !this.driver.containsElement(u, r),
                h = _.get(r),
                d = p.get(r),
                f = this._buildInstruction(t, n, d, h, c);
              if (f.errors && f.errors.length) w.push(f);
              else {
                if (c)
                  return (
                    e.onStart(() => Fd(r, f.fromStyles)),
                    e.onDestroy(() => Pd(r, f.toStyles)),
                    void s.push(e)
                  );
                if (t.isFallbackTransition)
                  return (
                    e.onStart(() => Fd(r, f.fromStyles)),
                    e.onDestroy(() => Pd(r, f.toStyles)),
                    void s.push(e)
                  );
                f.timelines.forEach(t => (t.stretchStartingKeyframe = !0)),
                  n.append(r, f.timelines),
                  i.push({ instruction: f, player: e, element: r }),
                  f.queriedElements.forEach(t => id(o, t, []).push(e)),
                  f.preStyleProps.forEach((t, e) => {
                    const n = Object.keys(t);
                    if (n.length) {
                      let t = a.get(e);
                      t || a.set(e, (t = new Set())), n.forEach(e => t.add(e));
                    }
                  }),
                  f.postStyleProps.forEach((t, e) => {
                    const n = Object.keys(t);
                    let s = l.get(e);
                    s || l.set(e, (s = new Set())), n.forEach(t => s.add(t));
                  });
              }
            });
          if (w.length) {
            const t = [];
            w.forEach(e => {
              t.push(`@${e.triggerName} has failed due to:\n`),
                e.errors.forEach(e => t.push(`- ${e}\n`));
            }),
              v.forEach(t => t.destroy()),
              this.reportError(t);
          }
          const C = new Map(),
            E = new Map();
          i.forEach(t => {
            const e = t.element;
            n.has(e) &&
              (E.set(e, e),
              this._beforeAnimationBuild(
                t.player.namespaceId,
                t.instruction,
                C
              ));
          }),
            s.forEach(t => {
              const e = t.element;
              this._getPreviousPlayers(
                e,
                !1,
                t.namespaceId,
                t.triggerName,
                null
              ).forEach(t => {
                id(C, e, []).push(t), t.destroy();
              });
            });
          const S = m.filter(t => Wp(t, a, l)),
            T = new Map();
          Bp(T, this.driver, y, l, Qh).forEach(t => {
            Wp(t, a, l) && S.push(t);
          });
          const x = new Map();
          d.forEach((t, e) => {
            Bp(x, this.driver, new Set(t), a, "!");
          }),
            S.forEach(t => {
              const e = T.get(t),
                n = x.get(t);
              T.set(t, Object.assign(Object.assign({}, e), n));
            });
          const k = [],
            A = [],
            I = {};
          i.forEach(t => {
            const { element: e, player: i, instruction: o } = t;
            if (n.has(e)) {
              if (c.has(e))
                return (
                  i.onDestroy(() => Pd(e, o.toStyles)),
                  (i.disabled = !0),
                  i.overrideTotalTime(o.totalTime),
                  void s.push(i)
                );
              let t = I;
              if (E.size > 1) {
                let n = e;
                const s = [];
                for (; (n = n.parentNode); ) {
                  const e = E.get(n);
                  if (e) {
                    t = e;
                    break;
                  }
                  s.push(n);
                }
                s.forEach(e => E.set(e, t));
              }
              const n = this._buildAnimation(i.namespaceId, o, C, r, x, T);
              if ((i.setRealPlayer(n), t === I)) k.push(i);
              else {
                const e = this.playersByElement.get(t);
                e && e.length && (i.parentPlayer = td(e)), s.push(i);
              }
            } else
              Fd(e, o.fromStyles),
                i.onDestroy(() => Pd(e, o.toStyles)),
                A.push(i),
                c.has(e) && s.push(i);
          }),
            A.forEach(t => {
              const e = r.get(t.element);
              if (e && e.length) {
                const n = td(e);
                t.setRealPlayer(n);
              }
            }),
            s.forEach(t => {
              t.parentPlayer ? t.syncPlayerEvents(t.parentPlayer) : t.destroy();
            });
          for (let O = 0; O < m.length; O++) {
            const t = m[O],
              e = t.__ng_removed;
            if ((qp(t, wd), e && e.hasAnimation)) continue;
            let n = [];
            if (o.size) {
              let e = o.get(t);
              e && e.length && n.push(...e);
              let s = this.driver.query(t, Td, !0);
              for (let t = 0; t < s.length; t++) {
                let e = o.get(s[t]);
                e && e.length && n.push(...e);
              }
            }
            const s = n.filter(t => !t.destroyed);
            s.length ? $p(this, t, s) : this.processLeaveNode(t);
          }
          return (
            (m.length = 0),
            k.forEach(t => {
              this.players.push(t),
                t.onDone(() => {
                  t.destroy();
                  const e = this.players.indexOf(t);
                  this.players.splice(e, 1);
                }),
                t.play();
            }),
            k
          );
        }
        elementContainsData(t, e) {
          let n = !1;
          const s = e.__ng_removed;
          return (
            s && s.setForRemoval && (n = !0),
            this.playersByElement.has(e) && (n = !0),
            this.playersByQueriedElement.has(e) && (n = !0),
            this.statesByElement.has(e) && (n = !0),
            this._fetchNamespace(t).elementContainsData(e) || n
          );
        }
        afterFlush(t) {
          this._flushFns.push(t);
        }
        afterFlushAnimationsDone(t) {
          this._whenQuietFns.push(t);
        }
        _getPreviousPlayers(t, e, n, s, r) {
          let i = [];
          if (e) {
            const e = this.playersByQueriedElement.get(t);
            e && (i = e);
          } else {
            const e = this.playersByElement.get(t);
            if (e) {
              const t = !r || r == Pp;
              e.forEach(e => {
                e.queued || ((t || e.triggerName == s) && i.push(e));
              });
            }
          }
          return (
            (n || s) &&
              (i = i.filter(
                t => !((n && n != t.namespaceId) || (s && s != t.triggerName))
              )),
            i
          );
        }
        _beforeAnimationBuild(t, e, n) {
          const s = e.element,
            r = e.isRemovalTransition ? void 0 : t,
            i = e.isRemovalTransition ? void 0 : e.triggerName;
          for (const o of e.timelines) {
            const t = o.element,
              a = t !== s,
              l = id(n, t, []);
            this._getPreviousPlayers(t, a, r, i, e.toState).forEach(t => {
              const e = t.getRealPlayer();
              e.beforeDestroy && e.beforeDestroy(), t.destroy(), l.push(t);
            });
          }
          Fd(s, e.fromStyles);
        }
        _buildAnimation(t, e, n, s, r, i) {
          const o = e.triggerName,
            a = e.element,
            l = [],
            c = new Set(),
            u = new Set(),
            h = e.timelines.map(e => {
              const h = e.element;
              c.add(h);
              const d = h.__ng_removed;
              if (d && d.removedBeforeQueried)
                return new Yh(e.duration, e.delay);
              const p = h !== a,
                f = (function(t) {
                  const e = [];
                  return Up(t, e), e;
                })((n.get(h) || Ip).map(t => t.getRealPlayer())).filter(
                  t => !!t.element && t.element === h
                ),
                m = r.get(h),
                g = i.get(h),
                y = ed(0, this._normalizer, 0, e.keyframes, m, g),
                _ = this._buildPlayer(e, y, f);
              if ((e.subTimeline && s && u.add(h), p)) {
                const e = new Vp(t, o, h);
                e.setRealPlayer(_), l.push(e);
              }
              return _;
            });
          l.forEach(t => {
            id(this.playersByQueriedElement, t.element, []).push(t),
              t.onDone(() =>
                (function(t, e, n) {
                  let s;
                  if (t instanceof Map) {
                    if (((s = t.get(e)), s)) {
                      if (s.length) {
                        const t = s.indexOf(n);
                        s.splice(t, 1);
                      }
                      0 == s.length && t.delete(e);
                    }
                  } else if (((s = t[e]), s)) {
                    if (s.length) {
                      const t = s.indexOf(n);
                      s.splice(t, 1);
                    }
                    0 == s.length && delete t[e];
                  }
                  return s;
                })(this.playersByQueriedElement, t.element, t)
              );
          }),
            c.forEach(t => zp(t, Sd));
          const d = td(h);
          return (
            d.onDestroy(() => {
              c.forEach(t => qp(t, Sd)), Pd(a, e.toStyles);
            }),
            u.forEach(t => {
              id(s, t, []).push(d);
            }),
            d
          );
        }
        _buildPlayer(t, e, n) {
          return e.length > 0
            ? this.driver.animate(
                t.element,
                e,
                t.duration,
                t.delay,
                t.easing,
                n
              )
            : new Yh(t.duration, t.delay);
        }
      }
      class Vp {
        constructor(t, e, n) {
          (this.namespaceId = t),
            (this.triggerName = e),
            (this.element = n),
            (this._player = new Yh()),
            (this._containsRealPlayer = !1),
            (this._queuedCallbacks = {}),
            (this.destroyed = !1),
            (this.markedForDestroy = !1),
            (this.disabled = !1),
            (this.queued = !0),
            (this.totalTime = 0);
        }
        setRealPlayer(t) {
          this._containsRealPlayer ||
            ((this._player = t),
            Object.keys(this._queuedCallbacks).forEach(e => {
              this._queuedCallbacks[e].forEach(n => nd(t, e, void 0, n));
            }),
            (this._queuedCallbacks = {}),
            (this._containsRealPlayer = !0),
            this.overrideTotalTime(t.totalTime),
            (this.queued = !1));
        }
        getRealPlayer() {
          return this._player;
        }
        overrideTotalTime(t) {
          this.totalTime = t;
        }
        syncPlayerEvents(t) {
          const e = this._player;
          e.triggerCallback && t.onStart(() => e.triggerCallback("start")),
            t.onDone(() => this.finish()),
            t.onDestroy(() => this.destroy());
        }
        _queueEvent(t, e) {
          id(this._queuedCallbacks, t, []).push(e);
        }
        onDone(t) {
          this.queued && this._queueEvent("done", t), this._player.onDone(t);
        }
        onStart(t) {
          this.queued && this._queueEvent("start", t), this._player.onStart(t);
        }
        onDestroy(t) {
          this.queued && this._queueEvent("destroy", t),
            this._player.onDestroy(t);
        }
        init() {
          this._player.init();
        }
        hasStarted() {
          return !this.queued && this._player.hasStarted();
        }
        play() {
          !this.queued && this._player.play();
        }
        pause() {
          !this.queued && this._player.pause();
        }
        restart() {
          !this.queued && this._player.restart();
        }
        finish() {
          this._player.finish();
        }
        destroy() {
          (this.destroyed = !0), this._player.destroy();
        }
        reset() {
          !this.queued && this._player.reset();
        }
        setPosition(t) {
          this.queued || this._player.setPosition(t);
        }
        getPosition() {
          return this.queued ? 0 : this._player.getPosition();
        }
        triggerCallback(t) {
          const e = this._player;
          e.triggerCallback && e.triggerCallback(t);
        }
      }
      function jp(t) {
        return t && 1 === t.nodeType;
      }
      function Lp(t, e) {
        const n = t.style.display;
        return (t.style.display = null != e ? e : "none"), n;
      }
      function Bp(t, e, n, s, r) {
        const i = [];
        n.forEach(t => i.push(Lp(t)));
        const o = [];
        s.forEach((n, s) => {
          const i = {};
          n.forEach(t => {
            const n = (i[t] = e.computeStyle(s, t, r));
            (n && 0 != n.length) || ((s.__ng_removed = Np), o.push(s));
          }),
            t.set(s, i);
        });
        let a = 0;
        return n.forEach(t => Lp(t, i[a++])), o;
      }
      function Hp(t, e) {
        const n = new Map();
        if ((t.forEach(t => n.set(t, [])), 0 == e.length)) return n;
        const s = new Set(e),
          r = new Map();
        function i(t) {
          if (!t) return 1;
          let e = r.get(t);
          if (e) return e;
          const o = t.parentNode;
          return (e = n.has(o) ? o : s.has(o) ? 1 : i(o)), r.set(t, e), e;
        }
        return (
          e.forEach(t => {
            const e = i(t);
            1 !== e && n.get(e).push(t);
          }),
          n
        );
      }
      function zp(t, e) {
        if (t.classList) t.classList.add(e);
        else {
          let n = t.$$classes;
          n || (n = t.$$classes = {}), (n[e] = !0);
        }
      }
      function qp(t, e) {
        if (t.classList) t.classList.remove(e);
        else {
          let n = t.$$classes;
          n && delete n[e];
        }
      }
      function $p(t, e, n) {
        td(n).onDone(() => t.processLeaveNode(e));
      }
      function Up(t, e) {
        for (let n = 0; n < t.length; n++) {
          const s = t[n];
          s instanceof Jh ? Up(s.players, e) : e.push(s);
        }
      }
      function Wp(t, e, n) {
        const s = n.get(t);
        if (!s) return !1;
        let r = e.get(t);
        return r ? s.forEach(t => r.add(t)) : e.set(t, s), n.delete(t), !0;
      }
      class Qp {
        constructor(t, e, n) {
          (this.bodyNode = t),
            (this._driver = e),
            (this._triggerCache = {}),
            (this.onRemovalComplete = (t, e) => {}),
            (this._transitionEngine = new Mp(t, e, n)),
            (this._timelineEngine = new Tp(t, e, n)),
            (this._transitionEngine.onRemovalComplete = (t, e) =>
              this.onRemovalComplete(t, e));
        }
        registerTrigger(t, e, n, s, r) {
          const i = t + "-" + s;
          let o = this._triggerCache[i];
          if (!o) {
            const t = [],
              e = Jd(this._driver, r, t);
            if (t.length)
              throw new Error(
                `The animation trigger "${s}" has failed to build due to the following errors:\n - ${t.join(
                  "\n - "
                )}`
              );
            (o = (function(t, e) {
              return new Cp(t, e);
            })(s, e)),
              (this._triggerCache[i] = o);
          }
          this._transitionEngine.registerTrigger(e, s, o);
        }
        register(t, e) {
          this._transitionEngine.register(t, e);
        }
        destroy(t, e) {
          this._transitionEngine.destroy(t, e);
        }
        onInsert(t, e, n, s) {
          this._transitionEngine.insertNode(t, e, n, s);
        }
        onRemove(t, e, n, s) {
          this._transitionEngine.removeNode(t, e, s || !1, n);
        }
        disableAnimations(t, e) {
          this._transitionEngine.markElementAsDisabled(t, e);
        }
        process(t, e, n, s) {
          if ("@" == n.charAt(0)) {
            const [t, r] = od(n);
            this._timelineEngine.command(t, e, r, s);
          } else this._transitionEngine.trigger(t, e, n, s);
        }
        listen(t, e, n, s, r) {
          if ("@" == n.charAt(0)) {
            const [t, s] = od(n);
            return this._timelineEngine.listen(t, e, s, r);
          }
          return this._transitionEngine.listen(t, e, n, s, r);
        }
        flush(t = -1) {
          this._transitionEngine.flush(t);
        }
        get players() {
          return this._transitionEngine.players.concat(
            this._timelineEngine.players
          );
        }
        whenRenderingDone() {
          return this._transitionEngine.whenRenderingDone();
        }
      }
      function Zp(t, e) {
        let n = null,
          s = null;
        return (
          Array.isArray(e) && e.length
            ? ((n = Gp(e[0])), e.length > 1 && (s = Gp(e[e.length - 1])))
            : e && (n = Gp(e)),
          n || s ? new Kp(t, n, s) : null
        );
      }
      let Kp = (() => {
        class t {
          constructor(e, n, s) {
            (this._element = e),
              (this._startStyles = n),
              (this._endStyles = s),
              (this._state = 0);
            let r = t.initialStylesByElement.get(e);
            r || t.initialStylesByElement.set(e, (r = {})),
              (this._initialStyles = r);
          }
          start() {
            this._state < 1 &&
              (this._startStyles &&
                Pd(this._element, this._startStyles, this._initialStyles),
              (this._state = 1));
          }
          finish() {
            this.start(),
              this._state < 2 &&
                (Pd(this._element, this._initialStyles),
                this._endStyles &&
                  (Pd(this._element, this._endStyles),
                  (this._endStyles = null)),
                (this._state = 1));
          }
          destroy() {
            this.finish(),
              this._state < 3 &&
                (t.initialStylesByElement.delete(this._element),
                this._startStyles &&
                  (Fd(this._element, this._startStyles),
                  (this._endStyles = null)),
                this._endStyles &&
                  (Fd(this._element, this._endStyles),
                  (this._endStyles = null)),
                Pd(this._element, this._initialStyles),
                (this._state = 3));
          }
        }
        return (t.initialStylesByElement = new WeakMap()), t;
      })();
      function Gp(t) {
        let e = null;
        const n = Object.keys(t);
        for (let s = 0; s < n.length; s++) {
          const r = n[s];
          Yp(r) && ((e = e || {}), (e[r] = t[r]));
        }
        return e;
      }
      function Yp(t) {
        return "display" === t || "position" === t;
      }
      const Jp = "animation",
        Xp = "animationend";
      class tf {
        constructor(t, e, n, s, r, i, o) {
          (this._element = t),
            (this._name = e),
            (this._duration = n),
            (this._delay = s),
            (this._easing = r),
            (this._fillMode = i),
            (this._onDoneFn = o),
            (this._finished = !1),
            (this._destroyed = !1),
            (this._startTime = 0),
            (this._position = 0),
            (this._eventFn = t => this._handleCallback(t));
        }
        apply() {
          !(function(t, e) {
            const n = af(t, "").trim();
            n.length &&
              ((function(t, e) {
                let n = 0;
                for (let s = 0; s < t.length; s++) "," === t.charAt(s) && n++;
              })(n),
              (e = `${n}, ${e}`)),
              of(t, "", e);
          })(
            this._element,
            `${this._duration}ms ${this._easing} ${this._delay}ms 1 normal ${
              this._fillMode
            } ${this._name}`
          ),
            rf(this._element, this._eventFn, !1),
            (this._startTime = Date.now());
        }
        pause() {
          ef(this._element, this._name, "paused");
        }
        resume() {
          ef(this._element, this._name, "running");
        }
        setPosition(t) {
          const e = nf(this._element, this._name);
          (this._position = t * this._duration),
            of(this._element, "Delay", `-${this._position}ms`, e);
        }
        getPosition() {
          return this._position;
        }
        _handleCallback(t) {
          const e = t._ngTestManualTimestamp || Date.now(),
            n = 1e3 * parseFloat(t.elapsedTime.toFixed(3));
          t.animationName == this._name &&
            Math.max(e - this._startTime, 0) >= this._delay &&
            n >= this._duration &&
            this.finish();
        }
        finish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFn(),
            rf(this._element, this._eventFn, !0));
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this.finish(),
            (function(t, e) {
              const n = af(t, "").split(","),
                s = sf(n, e);
              s >= 0 && (n.splice(s, 1), of(t, "", n.join(",")));
            })(this._element, this._name));
        }
      }
      function ef(t, e, n) {
        of(t, "PlayState", n, nf(t, e));
      }
      function nf(t, e) {
        const n = af(t, "");
        return n.indexOf(",") > 0 ? sf(n.split(","), e) : sf([n], e);
      }
      function sf(t, e) {
        for (let n = 0; n < t.length; n++) if (t[n].indexOf(e) >= 0) return n;
        return -1;
      }
      function rf(t, e, n) {
        n ? t.removeEventListener(Xp, e) : t.addEventListener(Xp, e);
      }
      function of(t, e, n, s) {
        const r = Jp + e;
        if (null != s) {
          const e = t.style[r];
          if (e.length) {
            const t = e.split(",");
            (t[s] = n), (n = t.join(","));
          }
        }
        t.style[r] = n;
      }
      function af(t, e) {
        return t.style[Jp + e] || "";
      }
      class lf {
        constructor(t, e, n, s, r, i, o, a) {
          (this.element = t),
            (this.keyframes = e),
            (this.animationName = n),
            (this._duration = s),
            (this._delay = r),
            (this._finalStyles = o),
            (this._specialStyles = a),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._started = !1),
            (this.currentSnapshot = {}),
            (this._state = 0),
            (this.easing = i || "linear"),
            (this.totalTime = s + r),
            this._buildStyler();
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        destroy() {
          this.init(),
            this._state >= 4 ||
              ((this._state = 4),
              this._styler.destroy(),
              this._flushStartFns(),
              this._flushDoneFns(),
              this._specialStyles && this._specialStyles.destroy(),
              this._onDestroyFns.forEach(t => t()),
              (this._onDestroyFns = []));
        }
        _flushDoneFns() {
          this._onDoneFns.forEach(t => t()), (this._onDoneFns = []);
        }
        _flushStartFns() {
          this._onStartFns.forEach(t => t()), (this._onStartFns = []);
        }
        finish() {
          this.init(),
            this._state >= 3 ||
              ((this._state = 3),
              this._styler.finish(),
              this._flushStartFns(),
              this._specialStyles && this._specialStyles.finish(),
              this._flushDoneFns());
        }
        setPosition(t) {
          this._styler.setPosition(t);
        }
        getPosition() {
          return this._styler.getPosition();
        }
        hasStarted() {
          return this._state >= 2;
        }
        init() {
          this._state >= 1 ||
            ((this._state = 1),
            this._styler.apply(),
            this._delay && this._styler.pause());
        }
        play() {
          this.init(),
            this.hasStarted() ||
              (this._flushStartFns(),
              (this._state = 2),
              this._specialStyles && this._specialStyles.start()),
            this._styler.resume();
        }
        pause() {
          this.init(), this._styler.pause();
        }
        restart() {
          this.reset(), this.play();
        }
        reset() {
          this._styler.destroy(), this._buildStyler(), this._styler.apply();
        }
        _buildStyler() {
          this._styler = new tf(
            this.element,
            this.animationName,
            this._duration,
            this._delay,
            this.easing,
            "forwards",
            () => this.finish()
          );
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach(t => t()), (e.length = 0);
        }
        beforeDestroy() {
          this.init();
          const t = {};
          if (this.hasStarted()) {
            const e = this._state >= 3;
            Object.keys(this._finalStyles).forEach(n => {
              "offset" != n &&
                (t[n] = e ? this._finalStyles[n] : Ud(this.element, n));
            });
          }
          this.currentSnapshot = t;
        }
      }
      class cf extends Yh {
        constructor(t, e) {
          super(),
            (this.element = t),
            (this._startingStyles = {}),
            (this.__initialized = !1),
            (this._styles = yd(e));
        }
        init() {
          !this.__initialized &&
            this._startingStyles &&
            ((this.__initialized = !0),
            Object.keys(this._styles).forEach(t => {
              this._startingStyles[t] = this.element.style[t];
            }),
            super.init());
        }
        play() {
          this._startingStyles &&
            (this.init(),
            Object.keys(this._styles).forEach(t =>
              this.element.style.setProperty(t, this._styles[t])
            ),
            super.play());
        }
        destroy() {
          this._startingStyles &&
            (Object.keys(this._startingStyles).forEach(t => {
              const e = this._startingStyles[t];
              e
                ? this.element.style.setProperty(t, e)
                : this.element.style.removeProperty(t);
            }),
            (this._startingStyles = null),
            super.destroy());
        }
      }
      class uf {
        constructor() {
          (this._count = 0), (this._head = document.querySelector("head"));
        }
        validateStyleProperty(t) {
          return pd(t);
        }
        matchesElement(t, e) {
          return fd(t, e);
        }
        containsElement(t, e) {
          return md(t, e);
        }
        query(t, e, n) {
          return gd(t, e, n);
        }
        computeStyle(t, e, n) {
          return window.getComputedStyle(t)[e];
        }
        buildKeyframeElement(t, e, n) {
          n = n.map(t => yd(t));
          let s = `@keyframes ${e} {\n`,
            r = "";
          n.forEach(t => {
            r = " ";
            const e = parseFloat(t.offset);
            (s += `${r}${100 * e}% {\n`),
              (r += " "),
              Object.keys(t).forEach(e => {
                const n = t[e];
                switch (e) {
                  case "offset":
                    return;
                  case "easing":
                    return void (
                      n && (s += `${r}animation-timing-function: ${n};\n`)
                    );
                  default:
                    return void (s += `${r}${e}: ${n};\n`);
                }
              }),
              (s += r + "}\n");
          }),
            (s += "}\n");
          const i = document.createElement("style");
          return (i.textContent = s), i;
        }
        animate(t, e, n, s, r, i = [], o) {
          const a = i.filter(t => t instanceof lf),
            l = {};
          zd(n, s) &&
            a.forEach(t => {
              let e = t.currentSnapshot;
              Object.keys(e).forEach(t => (l[t] = e[t]));
            });
          const c = (function(t) {
            let e = {};
            return (
              t &&
                (Array.isArray(t) ? t : [t]).forEach(t => {
                  Object.keys(t).forEach(n => {
                    "offset" != n && "easing" != n && (e[n] = t[n]);
                  });
                }),
              e
            );
          })((e = qd(t, e, l)));
          if (0 == n) return new cf(t, c);
          const u = "gen_css_kf_" + this._count++,
            h = this.buildKeyframeElement(t, u, e);
          document.querySelector("head").appendChild(h);
          const d = Zp(t, e),
            p = new lf(t, e, u, n, s, r, c, d);
          return (
            p.onDestroy(() => {
              var t;
              (t = h).parentNode.removeChild(t);
            }),
            p
          );
        }
      }
      class hf {
        constructor(t, e, n, s) {
          (this.element = t),
            (this.keyframes = e),
            (this.options = n),
            (this._specialStyles = s),
            (this._onDoneFns = []),
            (this._onStartFns = []),
            (this._onDestroyFns = []),
            (this._initialized = !1),
            (this._finished = !1),
            (this._started = !1),
            (this._destroyed = !1),
            (this.time = 0),
            (this.parentPlayer = null),
            (this.currentSnapshot = {}),
            (this._duration = n.duration),
            (this._delay = n.delay || 0),
            (this.time = this._duration + this._delay);
        }
        _onFinish() {
          this._finished ||
            ((this._finished = !0),
            this._onDoneFns.forEach(t => t()),
            (this._onDoneFns = []));
        }
        init() {
          this._buildPlayer(), this._preparePlayerBeforeStart();
        }
        _buildPlayer() {
          if (this._initialized) return;
          this._initialized = !0;
          const t = this.keyframes;
          (this.domPlayer = this._triggerWebAnimation(
            this.element,
            t,
            this.options
          )),
            (this._finalKeyframe = t.length ? t[t.length - 1] : {}),
            this.domPlayer.addEventListener("finish", () => this._onFinish());
        }
        _preparePlayerBeforeStart() {
          this._delay ? this._resetDomPlayerState() : this.domPlayer.pause();
        }
        _triggerWebAnimation(t, e, n) {
          return t.animate(e, n);
        }
        onStart(t) {
          this._onStartFns.push(t);
        }
        onDone(t) {
          this._onDoneFns.push(t);
        }
        onDestroy(t) {
          this._onDestroyFns.push(t);
        }
        play() {
          this._buildPlayer(),
            this.hasStarted() ||
              (this._onStartFns.forEach(t => t()),
              (this._onStartFns = []),
              (this._started = !0),
              this._specialStyles && this._specialStyles.start()),
            this.domPlayer.play();
        }
        pause() {
          this.init(), this.domPlayer.pause();
        }
        finish() {
          this.init(),
            this._specialStyles && this._specialStyles.finish(),
            this._onFinish(),
            this.domPlayer.finish();
        }
        reset() {
          this._resetDomPlayerState(),
            (this._destroyed = !1),
            (this._finished = !1),
            (this._started = !1);
        }
        _resetDomPlayerState() {
          this.domPlayer && this.domPlayer.cancel();
        }
        restart() {
          this.reset(), this.play();
        }
        hasStarted() {
          return this._started;
        }
        destroy() {
          this._destroyed ||
            ((this._destroyed = !0),
            this._resetDomPlayerState(),
            this._onFinish(),
            this._specialStyles && this._specialStyles.destroy(),
            this._onDestroyFns.forEach(t => t()),
            (this._onDestroyFns = []));
        }
        setPosition(t) {
          this.domPlayer.currentTime = t * this.time;
        }
        getPosition() {
          return this.domPlayer.currentTime / this.time;
        }
        get totalTime() {
          return this._delay + this._duration;
        }
        beforeDestroy() {
          const t = {};
          this.hasStarted() &&
            Object.keys(this._finalKeyframe).forEach(e => {
              "offset" != e &&
                (t[e] = this._finished
                  ? this._finalKeyframe[e]
                  : Ud(this.element, e));
            }),
            (this.currentSnapshot = t);
        }
        triggerCallback(t) {
          const e = "start" == t ? this._onStartFns : this._onDoneFns;
          e.forEach(t => t()), (e.length = 0);
        }
      }
      class df {
        constructor() {
          (this._isNativeImpl = /\{\s*\[native\s+code\]\s*\}/.test(
            pf().toString()
          )),
            (this._cssKeyframesDriver = new uf());
        }
        validateStyleProperty(t) {
          return pd(t);
        }
        matchesElement(t, e) {
          return fd(t, e);
        }
        containsElement(t, e) {
          return md(t, e);
        }
        query(t, e, n) {
          return gd(t, e, n);
        }
        computeStyle(t, e, n) {
          return window.getComputedStyle(t)[e];
        }
        overrideWebAnimationsSupport(t) {
          this._isNativeImpl = t;
        }
        animate(t, e, n, s, r, i = [], o) {
          if (!o && !this._isNativeImpl)
            return this._cssKeyframesDriver.animate(t, e, n, s, r, i);
          const a = {
            duration: n,
            delay: s,
            fill: 0 == s ? "both" : "forwards"
          };
          r && (a.easing = r);
          const l = {},
            c = i.filter(t => t instanceof hf);
          zd(n, s) &&
            c.forEach(t => {
              let e = t.currentSnapshot;
              Object.keys(e).forEach(t => (l[t] = e[t]));
            });
          const u = Zp(t, (e = qd(t, (e = e.map(t => Od(t, !1))), l)));
          return new hf(t, e, a, u);
        }
      }
      function pf() {
        return (
          ("undefined" != typeof window &&
            void 0 !== window.document &&
            Element.prototype.animate) ||
          {}
        );
      }
      let ff = (() => {
        class t extends Wh {
          constructor(t, e) {
            super(),
              (this._nextAnimationId = 0),
              (this._renderer = t.createRenderer(e.body, {
                id: "0",
                encapsulation: Ct.None,
                styles: [],
                data: { animation: [] }
              }));
          }
          build(t) {
            const e = this._nextAnimationId.toString();
            this._nextAnimationId++;
            const n = Array.isArray(t) ? Zh(t) : t;
            return (
              yf(this._renderer, null, e, "register", [n]),
              new mf(e, this._renderer)
            );
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(os(Jo), os(rc));
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class mf extends class {} {
        constructor(t, e) {
          super(), (this._id = t), (this._renderer = e);
        }
        create(t, e) {
          return new gf(this._id, t, e || {}, this._renderer);
        }
      }
      class gf {
        constructor(t, e, n, s) {
          (this.id = t),
            (this.element = e),
            (this._renderer = s),
            (this.parentPlayer = null),
            (this._started = !1),
            (this.totalTime = 0),
            this._command("create", n);
        }
        _listen(t, e) {
          return this._renderer.listen(this.element, `@@${this.id}:${t}`, e);
        }
        _command(t, ...e) {
          return yf(this._renderer, this.element, this.id, t, e);
        }
        onDone(t) {
          this._listen("done", t);
        }
        onStart(t) {
          this._listen("start", t);
        }
        onDestroy(t) {
          this._listen("destroy", t);
        }
        init() {
          this._command("init");
        }
        hasStarted() {
          return this._started;
        }
        play() {
          this._command("play"), (this._started = !0);
        }
        pause() {
          this._command("pause");
        }
        restart() {
          this._command("restart");
        }
        finish() {
          this._command("finish");
        }
        destroy() {
          this._command("destroy");
        }
        reset() {
          this._command("reset");
        }
        setPosition(t) {
          this._command("setPosition", t);
        }
        getPosition() {
          var t, e;
          return null !==
            (e =
              null === (t = this._renderer.engine.players[+this.id]) ||
              void 0 === t
                ? void 0
                : t.getPosition()) && void 0 !== e
            ? e
            : 0;
        }
      }
      function yf(t, e, n, s, r) {
        return t.setProperty(e, `@@${n}:${s}`, r);
      }
      const _f = "@",
        bf = "@.disabled";
      let vf = (() => {
        class t {
          constructor(t, e, n) {
            (this.delegate = t),
              (this.engine = e),
              (this._zone = n),
              (this._currentId = 0),
              (this._microtaskId = 1),
              (this._animationCallbacksBuffer = []),
              (this._rendererCache = new Map()),
              (this._cdRecurDepth = 0),
              (this.promise = Promise.resolve(0)),
              (e.onRemovalComplete = (t, e) => {
                e && e.parentNode(t) && e.removeChild(t.parentNode, t);
              });
          }
          createRenderer(t, e) {
            const n = this.delegate.createRenderer(t, e);
            if (!(t && e && e.data && e.data.animation)) {
              let t = this._rendererCache.get(n);
              return (
                t ||
                  ((t = new wf("", n, this.engine)),
                  this._rendererCache.set(n, t)),
                t
              );
            }
            const s = e.id,
              r = e.id + "-" + this._currentId;
            this._currentId++, this.engine.register(r, t);
            const i = e => {
              Array.isArray(e)
                ? e.forEach(i)
                : this.engine.registerTrigger(s, r, t, e.name, e);
            };
            return e.data.animation.forEach(i), new Cf(this, r, n, this.engine);
          }
          begin() {
            this._cdRecurDepth++, this.delegate.begin && this.delegate.begin();
          }
          _scheduleCountTask() {
            this.promise.then(() => {
              this._microtaskId++;
            });
          }
          scheduleListenerCallback(t, e, n) {
            t >= 0 && t < this._microtaskId
              ? this._zone.run(() => e(n))
              : (0 == this._animationCallbacksBuffer.length &&
                  Promise.resolve(null).then(() => {
                    this._zone.run(() => {
                      this._animationCallbacksBuffer.forEach(t => {
                        const [e, n] = t;
                        e(n);
                      }),
                        (this._animationCallbacksBuffer = []);
                    });
                  }),
                this._animationCallbacksBuffer.push([e, n]));
          }
          end() {
            this._cdRecurDepth--,
              0 == this._cdRecurDepth &&
                this._zone.runOutsideAngular(() => {
                  this._scheduleCountTask(),
                    this.engine.flush(this._microtaskId);
                }),
              this.delegate.end && this.delegate.end();
          }
          whenRenderingDone() {
            return this.engine.whenRenderingDone();
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(os(Jo), os(Qp), os(Il));
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      class wf {
        constructor(t, e, n) {
          (this.namespaceId = t),
            (this.delegate = e),
            (this.engine = n),
            (this.destroyNode = this.delegate.destroyNode
              ? t => e.destroyNode(t)
              : null);
        }
        get data() {
          return this.delegate.data;
        }
        destroy() {
          this.engine.destroy(this.namespaceId, this.delegate),
            this.delegate.destroy();
        }
        createElement(t, e) {
          return this.delegate.createElement(t, e);
        }
        createComment(t) {
          return this.delegate.createComment(t);
        }
        createText(t) {
          return this.delegate.createText(t);
        }
        appendChild(t, e) {
          this.delegate.appendChild(t, e),
            this.engine.onInsert(this.namespaceId, e, t, !1);
        }
        insertBefore(t, e, n, s = !0) {
          this.delegate.insertBefore(t, e, n),
            this.engine.onInsert(this.namespaceId, e, t, s);
        }
        removeChild(t, e, n) {
          this.engine.onRemove(this.namespaceId, e, this.delegate, n);
        }
        selectRootElement(t, e) {
          return this.delegate.selectRootElement(t, e);
        }
        parentNode(t) {
          return this.delegate.parentNode(t);
        }
        nextSibling(t) {
          return this.delegate.nextSibling(t);
        }
        setAttribute(t, e, n, s) {
          this.delegate.setAttribute(t, e, n, s);
        }
        removeAttribute(t, e, n) {
          this.delegate.removeAttribute(t, e, n);
        }
        addClass(t, e) {
          this.delegate.addClass(t, e);
        }
        removeClass(t, e) {
          this.delegate.removeClass(t, e);
        }
        setStyle(t, e, n, s) {
          this.delegate.setStyle(t, e, n, s);
        }
        removeStyle(t, e, n) {
          this.delegate.removeStyle(t, e, n);
        }
        setProperty(t, e, n) {
          e.charAt(0) == _f && e == bf
            ? this.disableAnimations(t, !!n)
            : this.delegate.setProperty(t, e, n);
        }
        setValue(t, e) {
          this.delegate.setValue(t, e);
        }
        listen(t, e, n) {
          return this.delegate.listen(t, e, n);
        }
        disableAnimations(t, e) {
          this.engine.disableAnimations(t, e);
        }
      }
      class Cf extends wf {
        constructor(t, e, n, s) {
          super(e, n, s), (this.factory = t), (this.namespaceId = e);
        }
        setProperty(t, e, n) {
          e.charAt(0) == _f
            ? "." == e.charAt(1) && e == bf
              ? this.disableAnimations(t, (n = void 0 === n || !!n))
              : this.engine.process(this.namespaceId, t, e.substr(1), n)
            : this.delegate.setProperty(t, e, n);
        }
        listen(t, e, n) {
          if (e.charAt(0) == _f) {
            const s = (function(t) {
              switch (t) {
                case "body":
                  return document.body;
                case "document":
                  return document;
                case "window":
                  return window;
                default:
                  return t;
              }
            })(t);
            let r = e.substr(1),
              i = "";
            return (
              r.charAt(0) != _f &&
                ([r, i] = (function(t) {
                  const e = t.indexOf(".");
                  return [t.substring(0, e), t.substr(e + 1)];
                })(r)),
              this.engine.listen(this.namespaceId, s, r, i, t => {
                this.factory.scheduleListenerCallback(t._data || -1, n, t);
              })
            );
          }
          return this.delegate.listen(t, e, n);
        }
      }
      let Ef = (() => {
        class t extends Qp {
          constructor(t, e, n) {
            super(t.body, e, n);
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(os(rc), os(bd), os(mp));
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const Sf = new Ln("AnimationModuleType"),
        Tf = [
          {
            provide: bd,
            useFactory: function() {
              return "function" == typeof pf() ? new df() : new uf();
            }
          },
          { provide: Sf, useValue: "BrowserAnimations" },
          { provide: Wh, useClass: ff },
          {
            provide: mp,
            useFactory: function() {
              return new gp();
            }
          },
          { provide: Qp, useClass: Ef },
          {
            provide: Jo,
            useFactory: function(t, e, n) {
              return new vf(t, e, n);
            },
            deps: [Ac, Qp, Il]
          }
        ];
      let xf = (() => {
        class t {}
        return (
          (t.ɵmod = zt({ type: t })),
          (t.ɵinj = lt({
            factory: function(e) {
              return new (e || t)();
            },
            providers: Tf,
            imports: [zc]
          })),
          t
        );
      })();
      const kf = new na("11.2.11"),
        Af = new Ln("mat-sanity-checks", {
          providedIn: "root",
          factory: function() {
            return !0;
          }
        });
      let If,
        Of = (() => {
          class t {
            constructor(t, e, n) {
              (this._hasDoneGlobalChecks = !1),
                (this._document = n),
                t._applyBodyHighContrastModeCssClasses(),
                (this._sanityChecks = e),
                this._hasDoneGlobalChecks ||
                  (this._checkDoctypeIsDefined(),
                  this._checkThemeIsPresent(),
                  this._checkCdkVersionMatch(),
                  (this._hasDoneGlobalChecks = !0));
            }
            _getWindow() {
              const t = this._document.defaultView || window;
              return "object" == typeof t && t ? t : null;
            }
            _checksAreEnabled() {
              return ql() && !this._isTestEnv();
            }
            _isTestEnv() {
              const t = this._getWindow();
              return t && (t.__karma__ || t.jasmine);
            }
            _checkDoctypeIsDefined() {
              this._checksAreEnabled() &&
                (!0 === this._sanityChecks || this._sanityChecks.doctype) &&
                !this._document.doctype &&
                console.warn(
                  "Current document does not have a doctype. This may cause some Angular Material components not to behave as expected."
                );
            }
            _checkThemeIsPresent() {
              if (
                !this._checksAreEnabled() ||
                !1 === this._sanityChecks ||
                !this._sanityChecks.theme ||
                !this._document.body ||
                "function" != typeof getComputedStyle
              )
                return;
              const t = this._document.createElement("div");
              t.classList.add("mat-theme-loaded-marker"),
                this._document.body.appendChild(t);
              const e = getComputedStyle(t);
              e &&
                "none" !== e.display &&
                console.warn(
                  "Could not find Angular Material core theme. Most Material components may not work as expected. For more info refer to the theming guide: https://material.angular.io/guide/theming"
                ),
                this._document.body.removeChild(t);
            }
            _checkCdkVersionMatch() {
              this._checksAreEnabled() &&
                (!0 === this._sanityChecks || this._sanityChecks.version) &&
                kf.full !== Uh.full &&
                console.warn(
                  "The Angular Material version (" +
                    kf.full +
                    ") does not match the Angular CDK version (" +
                    Uh.full +
                    ").\nPlease ensure the versions of these two packages exactly match."
                );
            }
          }
          return (
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = lt({
              factory: function(e) {
                return new (e || t)(os(qh), os(Af, 8), os(rc));
              },
              imports: [[$h], $h]
            })),
            t
          );
        })();
      function Nf(t) {
        return class extends t {
          constructor(...t) {
            super(...t), (this._disabled = !1);
          }
          get disabled() {
            return this._disabled;
          }
          set disabled(t) {
            this._disabled = Sh(t);
          }
        };
      }
      function Df(t, e) {
        return class extends t {
          constructor(...t) {
            super(...t), (this.defaultColor = e), (this.color = e);
          }
          get color() {
            return this._color;
          }
          set color(t) {
            const e = t || this.defaultColor;
            e !== this._color &&
              (this._color &&
                this._elementRef.nativeElement.classList.remove(
                  "mat-" + this._color
                ),
              e && this._elementRef.nativeElement.classList.add("mat-" + e),
              (this._color = e));
          }
        };
      }
      function Pf(t) {
        return class extends t {
          constructor(...t) {
            super(...t), (this._disableRipple = !1);
          }
          get disableRipple() {
            return this._disableRipple;
          }
          set disableRipple(t) {
            this._disableRipple = Sh(t);
          }
        };
      }
      try {
        If = "undefined" != typeof Intl;
      } catch (sg) {
        If = !1;
      }
      let Ff = (() => {
        class t {
          isErrorState(t, e) {
            return !!(t && t.invalid && (t.touched || (e && e.submitted)));
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)();
          }),
          (t.ɵprov = at({
            factory: function() {
              return new t();
            },
            token: t,
            providedIn: "root"
          })),
          t
        );
      })();
      class Rf {
        constructor(t, e, n) {
          (this._renderer = t),
            (this.element = e),
            (this.config = n),
            (this.state = 3);
        }
        fadeOut() {
          this._renderer.fadeOutRipple(this);
        }
      }
      const Mf = { enterDuration: 450, exitDuration: 400 },
        Vf = Nh({ passive: !0 }),
        jf = ["mousedown", "touchstart"],
        Lf = ["mouseup", "mouseleave", "touchend", "touchcancel"];
      class Bf {
        constructor(t, e, n, s) {
          (this._target = t),
            (this._ngZone = e),
            (this._isPointerDown = !1),
            (this._activeRipples = new Set()),
            (this._pointerUpEventsRegistered = !1),
            s.isBrowser && (this._containerElement = Th(n));
        }
        fadeInRipple(t, e, n = {}) {
          const s = (this._containerRect =
              this._containerRect ||
              this._containerElement.getBoundingClientRect()),
            r = Object.assign(Object.assign({}, Mf), n.animation);
          n.centered &&
            ((t = s.left + s.width / 2), (e = s.top + s.height / 2));
          const i =
              n.radius ||
              (function(t, e, n) {
                const s = Math.max(Math.abs(t - n.left), Math.abs(t - n.right)),
                  r = Math.max(Math.abs(e - n.top), Math.abs(e - n.bottom));
                return Math.sqrt(s * s + r * r);
              })(t, e, s),
            o = t - s.left,
            a = e - s.top,
            l = r.enterDuration,
            c = document.createElement("div");
          c.classList.add("mat-ripple-element"),
            (c.style.left = o - i + "px"),
            (c.style.top = a - i + "px"),
            (c.style.height = 2 * i + "px"),
            (c.style.width = 2 * i + "px"),
            null != n.color && (c.style.backgroundColor = n.color),
            (c.style.transitionDuration = l + "ms"),
            this._containerElement.appendChild(c),
            window.getComputedStyle(c).getPropertyValue("opacity"),
            (c.style.transform = "scale(1)");
          const u = new Rf(this, c, n);
          return (
            (u.state = 0),
            this._activeRipples.add(u),
            n.persistent || (this._mostRecentTransientRipple = u),
            this._runTimeoutOutsideZone(() => {
              const t = u === this._mostRecentTransientRipple;
              (u.state = 1),
                n.persistent || (t && this._isPointerDown) || u.fadeOut();
            }, l),
            u
          );
        }
        fadeOutRipple(t) {
          const e = this._activeRipples.delete(t);
          if (
            (t === this._mostRecentTransientRipple &&
              (this._mostRecentTransientRipple = null),
            this._activeRipples.size || (this._containerRect = null),
            !e)
          )
            return;
          const n = t.element,
            s = Object.assign(Object.assign({}, Mf), t.config.animation);
          (n.style.transitionDuration = s.exitDuration + "ms"),
            (n.style.opacity = "0"),
            (t.state = 2),
            this._runTimeoutOutsideZone(() => {
              (t.state = 3), n.parentNode.removeChild(n);
            }, s.exitDuration);
        }
        fadeOutAll() {
          this._activeRipples.forEach(t => t.fadeOut());
        }
        setupTriggerEvents(t) {
          const e = Th(t);
          e &&
            e !== this._triggerElement &&
            (this._removeTriggerEvents(),
            (this._triggerElement = e),
            this._registerEvents(jf));
        }
        handleEvent(t) {
          "mousedown" === t.type
            ? this._onMousedown(t)
            : "touchstart" === t.type
            ? this._onTouchStart(t)
            : this._onPointerUp(),
            this._pointerUpEventsRegistered ||
              (this._registerEvents(Lf),
              (this._pointerUpEventsRegistered = !0));
        }
        _onMousedown(t) {
          const e = Fh(t),
            n =
              this._lastTouchStartEvent &&
              Date.now() < this._lastTouchStartEvent + 800;
          this._target.rippleDisabled ||
            e ||
            n ||
            ((this._isPointerDown = !0),
            this.fadeInRipple(t.clientX, t.clientY, this._target.rippleConfig));
        }
        _onTouchStart(t) {
          if (!this._target.rippleDisabled && !Rh(t)) {
            (this._lastTouchStartEvent = Date.now()),
              (this._isPointerDown = !0);
            const e = t.changedTouches;
            for (let t = 0; t < e.length; t++)
              this.fadeInRipple(
                e[t].clientX,
                e[t].clientY,
                this._target.rippleConfig
              );
          }
        }
        _onPointerUp() {
          this._isPointerDown &&
            ((this._isPointerDown = !1),
            this._activeRipples.forEach(t => {
              !t.config.persistent &&
                (1 === t.state ||
                  (t.config.terminateOnPointerUp && 0 === t.state)) &&
                t.fadeOut();
            }));
        }
        _runTimeoutOutsideZone(t, e = 0) {
          this._ngZone.runOutsideAngular(() => setTimeout(t, e));
        }
        _registerEvents(t) {
          this._ngZone.runOutsideAngular(() => {
            t.forEach(t => {
              this._triggerElement.addEventListener(t, this, Vf);
            });
          });
        }
        _removeTriggerEvents() {
          this._triggerElement &&
            (jf.forEach(t => {
              this._triggerElement.removeEventListener(t, this, Vf);
            }),
            this._pointerUpEventsRegistered &&
              Lf.forEach(t => {
                this._triggerElement.removeEventListener(t, this, Vf);
              }));
        }
      }
      const Hf = new Ln("mat-ripple-global-options");
      let zf = (() => {
          class t {
            constructor(t, e, n, s, r) {
              (this._elementRef = t),
                (this._animationMode = r),
                (this.radius = 0),
                (this._disabled = !1),
                (this._isInitialized = !1),
                (this._globalOptions = s || {}),
                (this._rippleRenderer = new Bf(this, e, t, n));
            }
            get disabled() {
              return this._disabled;
            }
            set disabled(t) {
              (this._disabled = t), this._setupTriggerEventsIfEnabled();
            }
            get trigger() {
              return this._trigger || this._elementRef.nativeElement;
            }
            set trigger(t) {
              (this._trigger = t), this._setupTriggerEventsIfEnabled();
            }
            ngOnInit() {
              (this._isInitialized = !0), this._setupTriggerEventsIfEnabled();
            }
            ngOnDestroy() {
              this._rippleRenderer._removeTriggerEvents();
            }
            fadeOutAll() {
              this._rippleRenderer.fadeOutAll();
            }
            get rippleConfig() {
              return {
                centered: this.centered,
                radius: this.radius,
                color: this.color,
                animation: Object.assign(
                  Object.assign(
                    Object.assign({}, this._globalOptions.animation),
                    "NoopAnimations" === this._animationMode
                      ? { enterDuration: 0, exitDuration: 0 }
                      : {}
                  ),
                  this.animation
                ),
                terminateOnPointerUp: this._globalOptions.terminateOnPointerUp
              };
            }
            get rippleDisabled() {
              return this.disabled || !!this._globalOptions.disabled;
            }
            _setupTriggerEventsIfEnabled() {
              !this.disabled &&
                this._isInitialized &&
                this._rippleRenderer.setupTriggerEvents(this.trigger);
            }
            launch(t, e = 0, n) {
              return "number" == typeof t
                ? this._rippleRenderer.fadeInRipple(
                    t,
                    e,
                    Object.assign(Object.assign({}, this.rippleConfig), n)
                  )
                : this._rippleRenderer.fadeInRipple(
                    0,
                    0,
                    Object.assign(Object.assign({}, this.rippleConfig), t)
                  );
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(io(Yo), io(Il), io(Ih), io(Hf, 8), io(Sf, 8));
            }),
            (t.ɵdir = $t({
              type: t,
              selectors: [["", "mat-ripple", ""], ["", "matRipple", ""]],
              hostAttrs: [1, "mat-ripple"],
              hostVars: 2,
              hostBindings: function(t, e) {
                2 & t && Co("mat-ripple-unbounded", e.unbounded);
              },
              inputs: {
                radius: ["matRippleRadius", "radius"],
                disabled: ["matRippleDisabled", "disabled"],
                trigger: ["matRippleTrigger", "trigger"],
                color: ["matRippleColor", "color"],
                unbounded: ["matRippleUnbounded", "unbounded"],
                centered: ["matRippleCentered", "centered"],
                animation: ["matRippleAnimation", "animation"]
              },
              exportAs: ["matRipple"]
            })),
            t
          );
        })(),
        qf = (() => {
          class t {}
          return (
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = lt({
              factory: function(e) {
                return new (e || t)();
              },
              imports: [[Of, Oh], Of]
            })),
            t
          );
        })();
      const $f = ["mat-button", ""],
        Uf = ["*"],
        Wf = [
          "mat-button",
          "mat-flat-button",
          "mat-icon-button",
          "mat-raised-button",
          "mat-stroked-button",
          "mat-mini-fab",
          "mat-fab"
        ];
      class Qf {
        constructor(t) {
          this._elementRef = t;
        }
      }
      const Zf = Df(Nf(Pf(Qf)));
      let Kf = (() => {
          class t extends Zf {
            constructor(t, e, n) {
              super(t),
                (this._focusMonitor = e),
                (this._animationMode = n),
                (this.isRoundButton = this._hasHostAttributes(
                  "mat-fab",
                  "mat-mini-fab"
                )),
                (this.isIconButton = this._hasHostAttributes(
                  "mat-icon-button"
                ));
              for (const s of Wf)
                this._hasHostAttributes(s) &&
                  this._getHostElement().classList.add(s);
              t.nativeElement.classList.add("mat-button-base"),
                this.isRoundButton && (this.color = "accent");
            }
            ngAfterViewInit() {
              this._focusMonitor.monitor(this._elementRef, !0);
            }
            ngOnDestroy() {
              this._focusMonitor.stopMonitoring(this._elementRef);
            }
            focus(t, e) {
              t
                ? this._focusMonitor.focusVia(this._getHostElement(), t, e)
                : this._getHostElement().focus(e);
            }
            _getHostElement() {
              return this._elementRef.nativeElement;
            }
            _isRippleDisabled() {
              return this.disableRipple || this.disabled;
            }
            _hasHostAttributes(...t) {
              return t.some(t => this._getHostElement().hasAttribute(t));
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(io(Yo), io(jh), io(Sf, 8));
            }),
            (t.ɵcmp = jt({
              type: t,
              selectors: [
                ["button", "mat-button", ""],
                ["button", "mat-raised-button", ""],
                ["button", "mat-icon-button", ""],
                ["button", "mat-fab", ""],
                ["button", "mat-mini-fab", ""],
                ["button", "mat-stroked-button", ""],
                ["button", "mat-flat-button", ""]
              ],
              viewQuery: function(t, e) {
                if ((1 & t && il(zf, !0), 2 & t)) {
                  let t;
                  rl((t = ol())) && (e.ripple = t.first);
                }
              },
              hostAttrs: [1, "mat-focus-indicator"],
              hostVars: 5,
              hostBindings: function(t, e) {
                2 & t &&
                  (ro("disabled", e.disabled || null),
                  Co(
                    "_mat-animation-noopable",
                    "NoopAnimations" === e._animationMode
                  )("mat-button-disabled", e.disabled));
              },
              inputs: {
                disabled: "disabled",
                disableRipple: "disableRipple",
                color: "color"
              },
              exportAs: ["matButton"],
              features: [Zi],
              attrs: $f,
              ngContentSelectors: Uf,
              decls: 4,
              vars: 5,
              consts: [
                [1, "mat-button-wrapper"],
                [
                  "matRipple",
                  "",
                  1,
                  "mat-button-ripple",
                  3,
                  "matRippleDisabled",
                  "matRippleCentered",
                  "matRippleTrigger"
                ],
                [1, "mat-button-focus-overlay"]
              ],
              template: function(t, e) {
                1 & t &&
                  (yo(),
                  lo(0, "span", 0),
                  _o(1),
                  co(),
                  uo(2, "span", 1),
                  uo(3, "span", 2)),
                  2 & t &&
                    (Mr(2),
                    Co(
                      "mat-button-ripple-round",
                      e.isRoundButton || e.isIconButton
                    ),
                    oo("matRippleDisabled", e._isRippleDisabled())(
                      "matRippleCentered",
                      e.isIconButton
                    )("matRippleTrigger", e._getHostElement()));
              },
              directives: [zf],
              styles: [
                ".mat-button .mat-button-focus-overlay,.mat-icon-button .mat-button-focus-overlay{opacity:0}.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:.04}@media(hover: none){.mat-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay,.mat-stroked-button:hover:not(.mat-button-disabled) .mat-button-focus-overlay{opacity:0}}.mat-button,.mat-icon-button,.mat-stroked-button,.mat-flat-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-button.mat-button-disabled,.mat-icon-button.mat-button-disabled,.mat-stroked-button.mat-button-disabled,.mat-flat-button.mat-button-disabled{cursor:default}.mat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-button.cdk-program-focused .mat-button-focus-overlay,.mat-icon-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-icon-button.cdk-program-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-stroked-button.cdk-program-focused .mat-button-focus-overlay,.mat-flat-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-flat-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-button::-moz-focus-inner,.mat-icon-button::-moz-focus-inner,.mat-stroked-button::-moz-focus-inner,.mat-flat-button::-moz-focus-inner{border:0}.mat-raised-button{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1)}.mat-raised-button::-moz-focus-inner{border:0}.mat-raised-button.mat-button-disabled{cursor:default}.mat-raised-button.cdk-keyboard-focused .mat-button-focus-overlay,.mat-raised-button.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-raised-button::-moz-focus-inner{border:0}._mat-animation-noopable.mat-raised-button{transition:none;animation:none}.mat-stroked-button{border:1px solid currentColor;padding:0 15px;line-height:34px}.mat-stroked-button .mat-button-ripple.mat-ripple,.mat-stroked-button .mat-button-focus-overlay{top:-1px;left:-1px;right:-1px;bottom:-1px}.mat-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:56px;height:56px;padding:0;flex-shrink:0}.mat-fab::-moz-focus-inner{border:0}.mat-fab.mat-button-disabled{cursor:default}.mat-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-fab{transition:none;animation:none}.mat-fab .mat-button-wrapper{padding:16px 0;display:inline-block;line-height:24px}.mat-mini-fab{box-sizing:border-box;position:relative;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:transparent;display:inline-block;white-space:nowrap;text-decoration:none;vertical-align:baseline;text-align:center;margin:0;min-width:64px;line-height:36px;padding:0 16px;border-radius:4px;overflow:visible;transform:translate3d(0, 0, 0);transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);min-width:0;border-radius:50%;width:40px;height:40px;padding:0;flex-shrink:0}.mat-mini-fab::-moz-focus-inner{border:0}.mat-mini-fab.mat-button-disabled{cursor:default}.mat-mini-fab.cdk-keyboard-focused .mat-button-focus-overlay,.mat-mini-fab.cdk-program-focused .mat-button-focus-overlay{opacity:.12}.mat-mini-fab::-moz-focus-inner{border:0}._mat-animation-noopable.mat-mini-fab{transition:none;animation:none}.mat-mini-fab .mat-button-wrapper{padding:8px 0;display:inline-block;line-height:24px}.mat-icon-button{padding:0;min-width:0;width:40px;height:40px;flex-shrink:0;line-height:40px;border-radius:50%}.mat-icon-button i,.mat-icon-button .mat-icon{line-height:24px}.mat-button-ripple.mat-ripple,.mat-button-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-button-ripple.mat-ripple:not(:empty){transform:translateZ(0)}.mat-button-focus-overlay{opacity:0;transition:opacity 200ms cubic-bezier(0.35, 0, 0.25, 1),background-color 200ms cubic-bezier(0.35, 0, 0.25, 1)}._mat-animation-noopable .mat-button-focus-overlay{transition:none}.mat-button-ripple-round{border-radius:50%;z-index:1}.mat-button .mat-button-wrapper>*,.mat-flat-button .mat-button-wrapper>*,.mat-stroked-button .mat-button-wrapper>*,.mat-raised-button .mat-button-wrapper>*,.mat-icon-button .mat-button-wrapper>*,.mat-fab .mat-button-wrapper>*,.mat-mini-fab .mat-button-wrapper>*{vertical-align:middle}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button{display:inline-flex;justify-content:center;align-items:center;font-size:inherit;width:2.5em;height:2.5em}.cdk-high-contrast-active .mat-button,.cdk-high-contrast-active .mat-flat-button,.cdk-high-contrast-active .mat-raised-button,.cdk-high-contrast-active .mat-icon-button,.cdk-high-contrast-active .mat-fab,.cdk-high-contrast-active .mat-mini-fab{outline:solid 1px}.cdk-high-contrast-active .mat-button-base.cdk-keyboard-focused,.cdk-high-contrast-active .mat-button-base.cdk-program-focused{outline:solid 3px}\n"
              ],
              encapsulation: 2,
              changeDetection: 0
            })),
            t
          );
        })(),
        Gf = (() => {
          class t {}
          return (
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = lt({
              factory: function(e) {
                return new (e || t)();
              },
              imports: [[qf, Of], Of]
            })),
            t
          );
        })();
      function Yf(t, e) {
        return new _(
          e
            ? n => e.schedule(Jf, 0, { error: t, subscriber: n })
            : e => e.error(t)
        );
      }
      function Jf({ error: t, subscriber: e }) {
        e.error(t);
      }
      class Xf {
        constructor(t) {
          this.selector = t;
        }
        call(t, e) {
          return e.subscribe(new tm(t, this.selector, this.caught));
        }
      }
      class tm extends j {
        constructor(t, e, n) {
          super(t), (this.selector = e), (this.caught = n);
        }
        error(t) {
          if (!this.isStopped) {
            let n;
            try {
              n = this.selector(t, this.caught);
            } catch (e) {
              return void super.error(e);
            }
            this._unsubscribeAndRecycle();
            const s = new V(this);
            this.add(s);
            const r = L(n, s);
            r !== s && this.add(r);
          }
        }
      }
      class em {
        constructor(t) {
          this.callback = t;
        }
        call(t, e) {
          return e.subscribe(new nm(t, this.callback));
        }
      }
      class nm extends f {
        constructor(t, e) {
          super(t), this.add(new h(e));
        }
      }
      class sm {}
      class rm {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? (this.lazyInit =
                  "string" == typeof t
                    ? () => {
                        (this.headers = new Map()),
                          t.split("\n").forEach(t => {
                            const e = t.indexOf(":");
                            if (e > 0) {
                              const n = t.slice(0, e),
                                s = n.toLowerCase(),
                                r = t.slice(e + 1).trim();
                              this.maybeSetNormalizedName(n, s),
                                this.headers.has(s)
                                  ? this.headers.get(s).push(r)
                                  : this.headers.set(s, [r]);
                            }
                          });
                      }
                    : () => {
                        (this.headers = new Map()),
                          Object.keys(t).forEach(e => {
                            let n = t[e];
                            const s = e.toLowerCase();
                            "string" == typeof n && (n = [n]),
                              n.length > 0 &&
                                (this.headers.set(s, n),
                                this.maybeSetNormalizedName(e, s));
                          });
                      })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const e = this.headers.get(t.toLowerCase());
          return e && e.length > 0 ? e[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, e) {
          return this.clone({ name: t, value: e, op: "a" });
        }
        set(t, e) {
          return this.clone({ name: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ name: t, value: e, op: "d" });
        }
        maybeSetNormalizedName(t, e) {
          this.normalizedNames.has(e) || this.normalizedNames.set(e, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof rm
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach(t => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach(e => {
              this.headers.set(e, t.headers.get(e)),
                this.normalizedNames.set(e, t.normalizedNames.get(e));
            });
        }
        clone(t) {
          const e = new rm();
          return (
            (e.lazyInit =
              this.lazyInit && this.lazyInit instanceof rm
                ? this.lazyInit
                : this),
            (e.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            e
          );
        }
        applyUpdate(t) {
          const e = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let n = t.value;
              if (("string" == typeof n && (n = [n]), 0 === n.length)) return;
              this.maybeSetNormalizedName(t.name, e);
              const s = ("a" === t.op ? this.headers.get(e) : void 0) || [];
              s.push(...n), this.headers.set(e, s);
              break;
            case "d":
              const r = t.value;
              if (r) {
                let t = this.headers.get(e);
                if (!t) return;
                (t = t.filter(t => -1 === r.indexOf(t))),
                  0 === t.length
                    ? (this.headers.delete(e), this.normalizedNames.delete(e))
                    : this.headers.set(e, t);
              } else this.headers.delete(e), this.normalizedNames.delete(e);
          }
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach(e =>
              t(this.normalizedNames.get(e), this.headers.get(e))
            );
        }
      }
      class im {
        encodeKey(t) {
          return om(t);
        }
        encodeValue(t) {
          return om(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      function om(t) {
        return encodeURIComponent(t)
          .replace(/%40/gi, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/gi, "$")
          .replace(/%2C/gi, ",")
          .replace(/%3B/gi, ";")
          .replace(/%2B/gi, "+")
          .replace(/%3D/gi, "=")
          .replace(/%3F/gi, "?")
          .replace(/%2F/gi, "/");
      }
      class am {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new im()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function(t, e) {
              const n = new Map();
              return (
                t.length > 0 &&
                  t.split("&").forEach(t => {
                    const s = t.indexOf("="),
                      [r, i] =
                        -1 == s
                          ? [e.decodeKey(t), ""]
                          : [
                              e.decodeKey(t.slice(0, s)),
                              e.decodeValue(t.slice(s + 1))
                            ],
                      o = n.get(r) || [];
                    o.push(i), n.set(r, o);
                  }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach(e => {
                  const n = t.fromObject[e];
                  this.map.set(e, Array.isArray(n) ? n : [n]);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const e = this.map.get(t);
          return e ? e[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, e) {
          return this.clone({ param: t, value: e, op: "a" });
        }
        set(t, e) {
          return this.clone({ param: t, value: e, op: "s" });
        }
        delete(t, e) {
          return this.clone({ param: t, value: e, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map(t => {
                const e = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map(t => e + "=" + this.encoder.encodeValue(t))
                  .join("&");
              })
              .filter(t => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const e = new am({ encoder: this.encoder });
          return (
            (e.cloneFrom = this.cloneFrom || this),
            (e.updates = (this.updates || []).concat([t])),
            e
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach(t => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach(t => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const e =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    e.push(t.value), this.map.set(t.param, e);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let e = this.map.get(t.param) || [];
                      const n = e.indexOf(t.value);
                      -1 !== n && e.splice(n, 1),
                        e.length > 0
                          ? this.map.set(t.param, e)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      function lm(t) {
        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer;
      }
      function cm(t) {
        return "undefined" != typeof Blob && t instanceof Blob;
      }
      function um(t) {
        return "undefined" != typeof FormData && t instanceof FormData;
      }
      class hm {
        constructor(t, e, n, s) {
          let r;
          if (
            ((this.url = e),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function(t) {
              switch (t) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || s
              ? ((this.body = void 0 !== n ? n : null), (r = s))
              : (r = n),
            r &&
              ((this.reportProgress = !!r.reportProgress),
              (this.withCredentials = !!r.withCredentials),
              r.responseType && (this.responseType = r.responseType),
              r.headers && (this.headers = r.headers),
              r.params && (this.params = r.params)),
            this.headers || (this.headers = new rm()),
            this.params)
          ) {
            const t = this.params.toString();
            if (0 === t.length) this.urlWithParams = e;
            else {
              const n = e.indexOf("?");
              this.urlWithParams =
                e + (-1 === n ? "?" : n < e.length - 1 ? "&" : "") + t;
            }
          } else (this.params = new am()), (this.urlWithParams = e);
        }
        serializeBody() {
          return null === this.body
            ? null
            : lm(this.body) ||
              cm(this.body) ||
              um(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof am
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || um(this.body)
            ? null
            : cm(this.body)
            ? this.body.type || null
            : lm(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof am
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              Array.isArray(this.body)
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const e = t.method || this.method,
            n = t.url || this.url,
            s = t.responseType || this.responseType,
            r = void 0 !== t.body ? t.body : this.body,
            i =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            o =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let a = t.headers || this.headers,
            l = t.params || this.params;
          return (
            void 0 !== t.setHeaders &&
              (a = Object.keys(t.setHeaders).reduce(
                (e, n) => e.set(n, t.setHeaders[n]),
                a
              )),
            t.setParams &&
              (l = Object.keys(t.setParams).reduce(
                (e, n) => e.set(n, t.setParams[n]),
                l
              )),
            new hm(e, n, r, {
              params: l,
              headers: a,
              reportProgress: o,
              responseType: s,
              withCredentials: i
            })
          );
        }
      }
      var dm = (function(t) {
        return (
          (t[(t.Sent = 0)] = "Sent"),
          (t[(t.UploadProgress = 1)] = "UploadProgress"),
          (t[(t.ResponseHeader = 2)] = "ResponseHeader"),
          (t[(t.DownloadProgress = 3)] = "DownloadProgress"),
          (t[(t.Response = 4)] = "Response"),
          (t[(t.User = 5)] = "User"),
          t
        );
      })({});
      class pm extends class {
        constructor(t, e = 200, n = "OK") {
          (this.headers = t.headers || new rm()),
            (this.status = void 0 !== t.status ? t.status : e),
            (this.statusText = t.statusText || n),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      } {
        constructor(t = {}) {
          super(t),
            (this.type = dm.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new pm({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0
          });
        }
      }
      function fm(t, e) {
        return {
          body: e,
          headers: t.headers,
          observe: t.observe,
          params: t.params,
          reportProgress: t.reportProgress,
          responseType: t.responseType,
          withCredentials: t.withCredentials
        };
      }
      let mm = (() => {
        class t {
          constructor(t) {
            this.handler = t;
          }
          request(t, e, n = {}) {
            let s;
            if (t instanceof hm) s = t;
            else {
              let r = void 0;
              r = n.headers instanceof rm ? n.headers : new rm(n.headers);
              let i = void 0;
              n.params &&
                (i =
                  n.params instanceof am
                    ? n.params
                    : new am({ fromObject: n.params })),
                (s = new hm(t, e, void 0 !== n.body ? n.body : null, {
                  headers: r,
                  params: i,
                  reportProgress: n.reportProgress,
                  responseType: n.responseType || "json",
                  withCredentials: n.withCredentials
                }));
            }
            const r = lh(s).pipe(B(t => this.handler.handle(t), void 0, 1));
            if (t instanceof hm || "events" === n.observe) return r;
            const i = r.pipe(
              ((o = t => t instanceof pm),
              function(t) {
                return t.lift(new yh(o, undefined));
              })
            );
            var o;
            switch (n.observe || "body") {
              case "body":
                switch (s.responseType) {
                  case "arraybuffer":
                    return i.pipe(
                      x(t => {
                        if (null !== t.body && !(t.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return t.body;
                      })
                    );
                  case "blob":
                    return i.pipe(
                      x(t => {
                        if (null !== t.body && !(t.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return t.body;
                      })
                    );
                  case "text":
                    return i.pipe(
                      x(t => {
                        if (null !== t.body && "string" != typeof t.body)
                          throw new Error("Response is not a string.");
                        return t.body;
                      })
                    );
                  case "json":
                  default:
                    return i.pipe(x(t => t.body));
                }
              case "response":
                return i;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${n.observe}}`
                );
            }
          }
          delete(t, e = {}) {
            return this.request("DELETE", t, e);
          }
          get(t, e = {}) {
            return this.request("GET", t, e);
          }
          head(t, e = {}) {
            return this.request("HEAD", t, e);
          }
          jsonp(t, e) {
            return this.request("JSONP", t, {
              params: new am().append(e, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json"
            });
          }
          options(t, e = {}) {
            return this.request("OPTIONS", t, e);
          }
          patch(t, e, n = {}) {
            return this.request("PATCH", t, fm(n, e));
          }
          post(t, e, n = {}) {
            return this.request("POST", t, fm(n, e));
          }
          put(t, e, n = {}) {
            return this.request("PUT", t, fm(n, e));
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(os(sm));
          }),
          (t.ɵprov = at({ token: t, factory: t.ɵfac })),
          t
        );
      })();
      const gm = ["*"];
      function ym(t) {
        return Error(`Unable to find icon with the name "${t}"`);
      }
      function _m(t) {
        return Error(
          `The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${t}".`
        );
      }
      function bm(t) {
        return Error(
          `The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${t}".`
        );
      }
      class vm {
        constructor(t, e, n) {
          (this.url = t), (this.svgText = e), (this.options = n);
        }
      }
      let wm = (() => {
        class t {
          constructor(t, e, n, s) {
            (this._httpClient = t),
              (this._sanitizer = e),
              (this._errorHandler = s),
              (this._svgIconConfigs = new Map()),
              (this._iconSetConfigs = new Map()),
              (this._cachedIconsByUrl = new Map()),
              (this._inProgressUrlFetches = new Map()),
              (this._fontCssClassesByAlias = new Map()),
              (this._resolvers = []),
              (this._defaultFontSetClass = "material-icons"),
              (this._document = n);
          }
          addSvgIcon(t, e, n) {
            return this.addSvgIconInNamespace("", t, e, n);
          }
          addSvgIconLiteral(t, e, n) {
            return this.addSvgIconLiteralInNamespace("", t, e, n);
          }
          addSvgIconInNamespace(t, e, n, s) {
            return this._addSvgIconConfig(t, e, new vm(n, null, s));
          }
          addSvgIconResolver(t) {
            return this._resolvers.push(t), this;
          }
          addSvgIconLiteralInNamespace(t, e, n, s) {
            const r = this._sanitizer.sanitize(zs.HTML, n);
            if (!r) throw bm(n);
            return this._addSvgIconConfig(t, e, new vm("", r, s));
          }
          addSvgIconSet(t, e) {
            return this.addSvgIconSetInNamespace("", t, e);
          }
          addSvgIconSetLiteral(t, e) {
            return this.addSvgIconSetLiteralInNamespace("", t, e);
          }
          addSvgIconSetInNamespace(t, e, n) {
            return this._addSvgIconSetConfig(t, new vm(e, null, n));
          }
          addSvgIconSetLiteralInNamespace(t, e, n) {
            const s = this._sanitizer.sanitize(zs.HTML, e);
            if (!s) throw bm(e);
            return this._addSvgIconSetConfig(t, new vm("", s, n));
          }
          registerFontClassAlias(t, e = t) {
            return this._fontCssClassesByAlias.set(t, e), this;
          }
          classNameForFontAlias(t) {
            return this._fontCssClassesByAlias.get(t) || t;
          }
          setDefaultFontSetClass(t) {
            return (this._defaultFontSetClass = t), this;
          }
          getDefaultFontSetClass() {
            return this._defaultFontSetClass;
          }
          getSvgIconFromUrl(t) {
            const e = this._sanitizer.sanitize(zs.RESOURCE_URL, t);
            if (!e) throw _m(t);
            const n = this._cachedIconsByUrl.get(e);
            return n
              ? lh(Cm(n))
              : this._loadSvgIconFromConfig(new vm(t, null)).pipe(
                  uh(t => this._cachedIconsByUrl.set(e, t)),
                  x(t => Cm(t))
                );
          }
          getNamedSvgIcon(t, e = "") {
            const n = Em(e, t);
            let s = this._svgIconConfigs.get(n);
            if (s) return this._getSvgFromConfig(s);
            if (((s = this._getIconConfigFromResolvers(e, t)), s))
              return this._svgIconConfigs.set(n, s), this._getSvgFromConfig(s);
            const r = this._iconSetConfigs.get(e);
            return r ? this._getSvgFromIconSetConfigs(t, r) : Yf(ym(n));
          }
          ngOnDestroy() {
            (this._resolvers = []),
              this._svgIconConfigs.clear(),
              this._iconSetConfigs.clear(),
              this._cachedIconsByUrl.clear();
          }
          _getSvgFromConfig(t) {
            return t.svgText
              ? lh(Cm(this._svgElementFromConfig(t)))
              : this._loadSvgIconFromConfig(t).pipe(x(t => Cm(t)));
          }
          _getSvgFromIconSetConfigs(t, e) {
            const n = this._extractIconWithNameFromAnySet(t, e);
            return n
              ? lh(n)
              : qc(
                  e
                    .filter(t => !t.svgText)
                    .map(t => {
                      return this._loadSvgIconSetFromConfig(t).pipe(
                        ((e = e => {
                          const n = this._sanitizer.sanitize(
                            zs.RESOURCE_URL,
                            t.url
                          );
                          return (
                            this._errorHandler.handleError(
                              new Error(
                                `Loading icon set URL: ${n} failed: ${
                                  e.message
                                }`
                              )
                            ),
                            lh(null)
                          );
                        }),
                        function(t) {
                          const n = new Xf(e),
                            s = t.lift(n);
                          return (n.caught = s);
                        })
                      );
                      var e;
                    })
                ).pipe(
                  x(() => {
                    const n = this._extractIconWithNameFromAnySet(t, e);
                    if (!n) throw ym(t);
                    return n;
                  })
                );
          }
          _extractIconWithNameFromAnySet(t, e) {
            for (let n = e.length - 1; n >= 0; n--) {
              const s = e[n];
              if (s.svgText && s.svgText.indexOf(t) > -1) {
                const e = this._svgElementFromConfig(s),
                  n = this._extractSvgIconFromSet(e, t, s.options);
                if (n) return n;
              }
            }
            return null;
          }
          _loadSvgIconFromConfig(t) {
            return this._fetchIcon(t).pipe(
              uh(e => (t.svgText = e)),
              x(() => this._svgElementFromConfig(t))
            );
          }
          _loadSvgIconSetFromConfig(t) {
            return t.svgText
              ? lh(null)
              : this._fetchIcon(t).pipe(uh(e => (t.svgText = e)));
          }
          _extractSvgIconFromSet(t, e, n) {
            const s = t.querySelector(`[id="${e}"]`);
            if (!s) return null;
            const r = s.cloneNode(!0);
            if ((r.removeAttribute("id"), "svg" === r.nodeName.toLowerCase()))
              return this._setSvgAttributes(r, n);
            if ("symbol" === r.nodeName.toLowerCase())
              return this._setSvgAttributes(this._toSvgElement(r), n);
            const i = this._svgElementFromString("<svg></svg>");
            return i.appendChild(r), this._setSvgAttributes(i, n);
          }
          _svgElementFromString(t) {
            const e = this._document.createElement("DIV");
            e.innerHTML = t;
            const n = e.querySelector("svg");
            if (!n) throw Error("<svg> tag not found");
            return n;
          }
          _toSvgElement(t) {
            const e = this._svgElementFromString("<svg></svg>"),
              n = t.attributes;
            for (let s = 0; s < n.length; s++) {
              const { name: t, value: r } = n[s];
              "id" !== t && e.setAttribute(t, r);
            }
            for (let s = 0; s < t.childNodes.length; s++)
              t.childNodes[s].nodeType === this._document.ELEMENT_NODE &&
                e.appendChild(t.childNodes[s].cloneNode(!0));
            return e;
          }
          _setSvgAttributes(t, e) {
            return (
              t.setAttribute("fit", ""),
              t.setAttribute("height", "100%"),
              t.setAttribute("width", "100%"),
              t.setAttribute("preserveAspectRatio", "xMidYMid meet"),
              t.setAttribute("focusable", "false"),
              e && e.viewBox && t.setAttribute("viewBox", e.viewBox),
              t
            );
          }
          _fetchIcon(t) {
            var e;
            const { url: n, options: s } = t,
              r =
                null !== (e = null == s ? void 0 : s.withCredentials) &&
                void 0 !== e &&
                e;
            if (!this._httpClient)
              throw Error(
                "Could not find HttpClient provider for use with Angular Material icons. Please include the HttpClientModule from @angular/common/http in your app imports."
              );
            if (null == n) throw Error(`Cannot fetch icon from URL "${n}".`);
            const i = this._sanitizer.sanitize(zs.RESOURCE_URL, n);
            if (!i) throw _m(n);
            const o = this._inProgressUrlFetches.get(i);
            if (o) return o;
            const a = this._httpClient
              .get(i, { responseType: "text", withCredentials: r })
              .pipe(
                ((l = () => this._inProgressUrlFetches.delete(i)),
                t => t.lift(new em(l))),
                J()
              );
            var l;
            return this._inProgressUrlFetches.set(i, a), a;
          }
          _addSvgIconConfig(t, e, n) {
            return this._svgIconConfigs.set(Em(t, e), n), this;
          }
          _addSvgIconSetConfig(t, e) {
            const n = this._iconSetConfigs.get(t);
            return n ? n.push(e) : this._iconSetConfigs.set(t, [e]), this;
          }
          _svgElementFromConfig(t) {
            if (!t.svgElement) {
              const e = this._svgElementFromString(t.svgText);
              this._setSvgAttributes(e, t.options), (t.svgElement = e);
            }
            return t.svgElement;
          }
          _getIconConfigFromResolvers(t, e) {
            for (let s = 0; s < this._resolvers.length; s++) {
              const r = this._resolvers[s](e, t);
              if (r)
                return (n = r).url && n.options
                  ? new vm(r.url, null, r.options)
                  : new vm(r, null);
            }
            var n;
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(os(mm, 8), os(jc), os(rc, 8), os(Ws));
          }),
          (t.ɵprov = at({
            factory: function() {
              return new t(os(mm, 8), os(jc), os(rc, 8), os(Ws));
            },
            token: t,
            providedIn: "root"
          })),
          t
        );
      })();
      function Cm(t) {
        return t.cloneNode(!0);
      }
      function Em(t, e) {
        return t + ":" + e;
      }
      class Sm {
        constructor(t) {
          this._elementRef = t;
        }
      }
      const Tm = Df(Sm),
        xm = new Ln("mat-icon-location", {
          providedIn: "root",
          factory: function() {
            const t = as(rc),
              e = t ? t.location : null;
            return { getPathname: () => (e ? e.pathname + e.search : "") };
          }
        }),
        km = [
          "clip-path",
          "color-profile",
          "src",
          "cursor",
          "fill",
          "filter",
          "marker",
          "marker-start",
          "marker-mid",
          "marker-end",
          "mask",
          "stroke"
        ],
        Am = km.map(t => `[${t}]`).join(", "),
        Im = /^url\(['"]?#(.*?)['"]?\)$/;
      let Om = (() => {
          class t extends Tm {
            constructor(t, e, n, s, r) {
              super(t),
                (this._iconRegistry = e),
                (this._location = s),
                (this._errorHandler = r),
                (this._inline = !1),
                (this._currentIconFetch = h.EMPTY),
                n || t.nativeElement.setAttribute("aria-hidden", "true");
            }
            get inline() {
              return this._inline;
            }
            set inline(t) {
              this._inline = Sh(t);
            }
            get svgIcon() {
              return this._svgIcon;
            }
            set svgIcon(t) {
              t !== this._svgIcon &&
                (t
                  ? this._updateSvgIcon(t)
                  : this._svgIcon && this._clearSvgElement(),
                (this._svgIcon = t));
            }
            get fontSet() {
              return this._fontSet;
            }
            set fontSet(t) {
              const e = this._cleanupFontValue(t);
              e !== this._fontSet &&
                ((this._fontSet = e), this._updateFontIconClasses());
            }
            get fontIcon() {
              return this._fontIcon;
            }
            set fontIcon(t) {
              const e = this._cleanupFontValue(t);
              e !== this._fontIcon &&
                ((this._fontIcon = e), this._updateFontIconClasses());
            }
            _splitIconName(t) {
              if (!t) return ["", ""];
              const e = t.split(":");
              switch (e.length) {
                case 1:
                  return ["", e[0]];
                case 2:
                  return e;
                default:
                  throw Error(`Invalid icon name: "${t}"`);
              }
            }
            ngOnInit() {
              this._updateFontIconClasses();
            }
            ngAfterViewChecked() {
              const t = this._elementsWithExternalReferences;
              if (t && t.size) {
                const t = this._location.getPathname();
                t !== this._previousPath &&
                  ((this._previousPath = t), this._prependPathToReferences(t));
              }
            }
            ngOnDestroy() {
              this._currentIconFetch.unsubscribe(),
                this._elementsWithExternalReferences &&
                  this._elementsWithExternalReferences.clear();
            }
            _usingFontIcon() {
              return !this.svgIcon;
            }
            _setSvgElement(t) {
              this._clearSvgElement();
              const e = t.querySelectorAll("style");
              for (let s = 0; s < e.length; s++) e[s].textContent += " ";
              const n = this._location.getPathname();
              (this._previousPath = n),
                this._cacheChildrenWithExternalReferences(t),
                this._prependPathToReferences(n),
                this._elementRef.nativeElement.appendChild(t);
            }
            _clearSvgElement() {
              const t = this._elementRef.nativeElement;
              let e = t.childNodes.length;
              for (
                this._elementsWithExternalReferences &&
                this._elementsWithExternalReferences.clear();
                e--;

              ) {
                const n = t.childNodes[e];
                (1 === n.nodeType && "svg" !== n.nodeName.toLowerCase()) ||
                  t.removeChild(n);
              }
            }
            _updateFontIconClasses() {
              if (!this._usingFontIcon()) return;
              const t = this._elementRef.nativeElement,
                e = this.fontSet
                  ? this._iconRegistry.classNameForFontAlias(this.fontSet)
                  : this._iconRegistry.getDefaultFontSetClass();
              e != this._previousFontSetClass &&
                (this._previousFontSetClass &&
                  t.classList.remove(this._previousFontSetClass),
                e && t.classList.add(e),
                (this._previousFontSetClass = e)),
                this.fontIcon != this._previousFontIconClass &&
                  (this._previousFontIconClass &&
                    t.classList.remove(this._previousFontIconClass),
                  this.fontIcon && t.classList.add(this.fontIcon),
                  (this._previousFontIconClass = this.fontIcon));
            }
            _cleanupFontValue(t) {
              return "string" == typeof t ? t.trim().split(" ")[0] : t;
            }
            _prependPathToReferences(t) {
              const e = this._elementsWithExternalReferences;
              e &&
                e.forEach((e, n) => {
                  e.forEach(e => {
                    n.setAttribute(e.name, `url('${t}#${e.value}')`);
                  });
                });
            }
            _cacheChildrenWithExternalReferences(t) {
              const e = t.querySelectorAll(Am),
                n = (this._elementsWithExternalReferences =
                  this._elementsWithExternalReferences || new Map());
              for (let s = 0; s < e.length; s++)
                km.forEach(t => {
                  const r = e[s],
                    i = r.getAttribute(t),
                    o = i ? i.match(Im) : null;
                  if (o) {
                    let e = n.get(r);
                    e || ((e = []), n.set(r, e)),
                      e.push({ name: t, value: o[1] });
                  }
                });
            }
            _updateSvgIcon(t) {
              if (
                ((this._svgNamespace = null),
                (this._svgName = null),
                this._currentIconFetch.unsubscribe(),
                t)
              ) {
                const [e, n] = this._splitIconName(t);
                e && (this._svgNamespace = e),
                  n && (this._svgName = n),
                  (this._currentIconFetch = this._iconRegistry
                    .getNamedSvgIcon(n, e)
                    .pipe((1, t => t.lift(new Ch(1))))
                    .subscribe(
                      t => this._setSvgElement(t),
                      t => {
                        this._errorHandler.handleError(
                          new Error(
                            `Error retrieving icon ${e}:${n}! ${t.message}`
                          )
                        );
                      }
                    ));
              }
            }
          }
          return (
            (t.ɵfac = function(e) {
              return new (e || t)(
                io(Yo),
                io(wm),
                ("aria-hidden",
                (function(t, e) {
                  const n = t.attrs;
                  if (n) {
                    const t = n.length;
                    let s = 0;
                    for (; s < t; ) {
                      const r = n[s];
                      if (cn(r)) break;
                      if (0 === r) s += 2;
                      else if ("number" == typeof r)
                        for (s++; s < t && "string" == typeof n[s]; ) s++;
                      else {
                        if (r === e) return n[s + 1];
                        s += 2;
                      }
                    }
                  }
                  return null;
                })(Oe(), "aria-hidden")),
                io(xm),
                io(Ws)
              );
            }),
            (t.ɵcmp = jt({
              type: t,
              selectors: [["mat-icon"]],
              hostAttrs: ["role", "img", 1, "mat-icon", "notranslate"],
              hostVars: 7,
              hostBindings: function(t, e) {
                2 & t &&
                  (ro(
                    "data-mat-icon-type",
                    e._usingFontIcon() ? "font" : "svg"
                  )("data-mat-icon-name", e._svgName || e.fontIcon)(
                    "data-mat-icon-namespace",
                    e._svgNamespace || e.fontSet
                  ),
                  Co("mat-icon-inline", e.inline)(
                    "mat-icon-no-color",
                    "primary" !== e.color &&
                      "accent" !== e.color &&
                      "warn" !== e.color
                  ));
              },
              inputs: {
                color: "color",
                inline: "inline",
                svgIcon: "svgIcon",
                fontSet: "fontSet",
                fontIcon: "fontIcon"
              },
              exportAs: ["matIcon"],
              features: [Zi],
              ngContentSelectors: gm,
              decls: 1,
              vars: 0,
              template: function(t, e) {
                1 & t && (yo(), _o(0));
              },
              styles: [
                ".mat-icon{background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}\n"
              ],
              encapsulation: 2,
              changeDetection: 0
            })),
            t
          );
        })(),
        Nm = (() => {
          class t {}
          return (
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = lt({
              factory: function(e) {
                return new (e || t)();
              },
              imports: [[Of], Of]
            })),
            t
          );
        })();
      const Dm = ["scrollMe"],
        Pm = function(t, e) {
          return { from: t, to: e };
        };
      function Fm(t, e) {
        if (
          (1 & t &&
            ((function(t, e, n) {
              const s = Ae(),
                r = Ie(),
                i = r.firstCreatePass
                  ? (function(t, e, n, s, r) {
                      const i = e.consts,
                        o = Ee(i, undefined),
                        a = Wr(e, 20, 8, "ng-container", o);
                      return (
                        null !== o && Ii(a, o, !0),
                        ii(e, n, a, Ee(i, undefined)),
                        null !== e.queries && e.queries.elementStart(e, a),
                        a
                      );
                    })(0, r, s)
                  : r.data[20];
              De(i, !0);
              const o = (s[20] = s[11].createComment(""));
              mr(r, s, o, i), Qs(o, s), Xt(i) && (Xr(r, s, i), Jr(r, i, s));
            })(),
            lo(1, "div", 17),
            ko(2),
            co(),
            (function() {
              let t = Oe();
              const e = Ie();
              Pe() ? Fe() : ((t = t.parent), De(t, !1)),
                e.firstCreatePass &&
                  (Xe(e, t), Yt(t) && e.queries.elementEnd(t));
            })()),
          2 & t)
        ) {
          const t = e.$implicit;
          Mr(1),
            oo(
              "ngClass",
              ((n = 2),
              (s = Pm),
              (r = "bot" === t.author),
              (i = "user" === t.author),
              (function(t, e, n, s, r, i, o) {
                const a = e + n;
                return (function(t, e, n, s) {
                  const r = so(t, e, n);
                  return so(t, e + 1, s) || r;
                })(t, a, r, i)
                  ? (function(t, e, n) {
                      return (t[e] = n);
                    })(t, a + 2, o ? s.call(o, r, i) : s(r, i))
                  : (function(t, e) {
                      const n = t[e];
                      return n === Rr ? void 0 : n;
                    })(t, a + 2);
              })(
                Ae(),
                (function() {
                  const t = xe.lFrame;
                  let e = t.bindingRootIndex;
                  return (
                    -1 === e &&
                      (e = t.bindingRootIndex = t.tView.bindingStartIndex),
                    e
                  );
                })(),
                n,
                s,
                r,
                i,
                o
              ))
            ),
            Mr(1),
            Ao(" ", t.content, " ");
        }
        var n, s, r, i, o;
      }
      let Rm = (() => {
        class t {
          constructor(t, e, n) {
            (this.chatService = t),
              (this.fb = e),
              (this.cdr = n),
              (this.status = !1),
              (this.messages = []),
              (this.href = ""),
              (this.inputMessage = this.fb.group({ userMessage: [""] }));
          }
          ngAfterViewChecked() {
            this.cdr.detectChanges();
          }
          ngOnInit() {
            console.log(window.location.protocol),
              console.log(window.location.host),
              console.log(window.location.pathname),
              console.log(window.location.hash),
              this.chatService.conversation.subscribe(t => {
                (this.shouldScroll =
                  this.scrollMe.scrollTop + this.scrollMe.clientHeight ===
                  this.scrollMe.scrollHeight),
                  this.shouldScroll || this.scrollToBottom(),
                  (this.messages = this.messages.concat(t));
              });
          }
          getMessage() {
            this.chatService.conversation.subscribe(t => {
              (this.messages = this.messages.concat(t)),
                (this.shouldScroll =
                  this.scrollMe.scrollTop + this.scrollMe.clientHeight ===
                  this.scrollMe.scrollHeight),
                this.shouldScroll || this.scrollToBottom();
            });
          }
          scrollToBottom() {
            this.scrollMe.scrollTop = this.scrollMe.scrollHeight;
          }
          sendMessage() {
            const t = new Date();
            t.getHours(),
              t.getMinutes(),
              this.chatService.getBotAnswer(
                this.inputMessage.value.userMessage
              ),
              this.inputMessage.reset();
          }
          startChatApp() {
            this.status = !this.status;
          }
        }
        return (
          (t.ɵfac = function(e) {
            return new (e || t)(io(ec), io(ih), io(va));
          }),
          (t.ɵcmp = jt({
            type: t,
            selectors: [["app-root"]],
            viewQuery: function(t, e) {
              if ((1 & t && il(Dm, !0), 2 & t)) {
                let t;
                rl((t = ol())) && (e.scrollMe = t.first);
              }
            },
            decls: 25,
            vars: 5,
            consts: [
              [
                "mat-fab",
                "",
                "color",
                "primary",
                1,
                "chatButton",
                3,
                "ngClass",
                "click"
              ],
              [1, "chatApp", 3, "ngClass"],
              [1, "chatHeader"],
              [1, "chatBot"],
              [1, "chatBotWrapper"],
              [1, "indicator"],
              [
                "src",
                "https://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/robot-face.png",
                "alt",
                "",
                1,
                "chatBotAvatar",
                "rounded-circle"
              ],
              [1, "chatBotName"],
              [1, "closeButton"],
              ["mat-icon-button", "", "color", "basic", 3, "click"],
              [1, "chatBody", 3, "scrollTop"],
              ["scrollMe", ""],
              [1, "message", "from"],
              [4, "ngFor", "ngForOf"],
              [1, "chatFooter", 3, "formGroup"],
              [
                "formControlName",
                "userMessage",
                "type",
                "text",
                "placeholder",
                "Type a message",
                1,
                "chatInput",
                2,
                "height",
                "56px",
                3,
                "keydown.enter"
              ],
              [
                "mat-icon-button",
                "",
                "type",
                "button",
                1,
                "msg_send_btn",
                3,
                "click"
              ],
              [1, "message", 3, "ngClass"]
            ],
            template: function(t, e) {
              if (
                (1 & t &&
                  (lo(0, "button", 0),
                  po("click", function() {
                    return e.startChatApp();
                  }),
                  lo(1, "mat-icon"),
                  ko(2, "chat"),
                  co(),
                  co(),
                  lo(3, "div", 1),
                  lo(4, "div", 2),
                  lo(5, "div", 3),
                  lo(6, "div", 4),
                  uo(7, "div", 5),
                  uo(8, "img", 6),
                  co(),
                  lo(9, "p", 7),
                  ko(10, "Chatbot Name"),
                  co(),
                  co(),
                  lo(11, "div", 8),
                  lo(12, "button", 9),
                  po("click", function() {
                    return e.startChatApp();
                  }),
                  lo(13, "mat-icon"),
                  ko(14, "close"),
                  co(),
                  co(),
                  co(),
                  co(),
                  lo(15, "div", 10, 11),
                  lo(17, "div", 12),
                  ko(18, ' Hi there! this is a chatbot, try saying "Hi"! '),
                  co(),
                  (function(t, e, n, s, r, i, o, a) {
                    const l = Ae(),
                      c = Ie(),
                      u = c.firstCreatePass
                        ? (function(t, e, n, s, r, i, o, a, l) {
                            const c = e.consts,
                              u = Wr(e, 39, 4, "ng-container", Ee(c, 13));
                            ii(e, n, u, Ee(c, undefined)), Xe(e, u);
                            const h = (u.tViews = ni(
                              2,
                              u,
                              s,
                              3,
                              5,
                              e.directiveRegistry,
                              e.pipeRegistry,
                              null,
                              e.schemas,
                              c
                            ));
                            return (
                              null !== e.queries &&
                                (e.queries.template(e, u),
                                (h.queries = e.queries.embeddedTView(u))),
                              u
                            );
                          })(0, c, l, e)
                        : c.data[39];
                    De(u, !1);
                    const h = l[11].createComment("");
                    mr(c, l, h, u),
                      Qs(h, l),
                      bi(l, (l[39] = mi(h, l, h, u))),
                      Xt(u) && Xr(c, l, u);
                  })(0, Fm),
                  co(),
                  lo(20, "form", 14),
                  lo(21, "textarea", 15),
                  po("keydown.enter", function() {
                    return e.sendMessage(), !1;
                  }),
                  co(),
                  lo(22, "button", 16),
                  po("click", function() {
                    return e.sendMessage();
                  }),
                  lo(23, "mat-icon"),
                  ko(24, "send"),
                  co(),
                  co(),
                  co(),
                  co()),
                2 & t)
              ) {
                const t = xe.lFrame.contextLView[36];
                oo("ngClass", e.status ? "hideChatApp" : "showChatApp"),
                  Mr(3),
                  oo("ngClass", e.status ? "showChatApp" : "hideChatApp"),
                  Mr(12),
                  oo("scrollTop", t.scrollHeight),
                  Mr(4),
                  oo("ngForOf", e.messages),
                  Mr(1),
                  oo("formGroup", e.inputMessage);
              }
            },
            directives: [Kf, lc, Om, uc, Ju, bu, eh, Gc, _u, sh],
            styles: [
              ".showChatApp[_ngcontent-%COMP%]{opacity:1!important;z-index:2!important;transform:scale(1)!important}.hideChatApp[_ngcontent-%COMP%]{opacity:0!important;z-index:1!important;transform:scale(0)!important}.material-icons.mat-button-wrapper.closeButton[_ngcontent-%COMP%]{font-size:15px!important}.chatButton[_ngcontent-%COMP%]{position:fixed!important;bottom:30px!important;display:block!important;overflow:initial!important;flex-wrap:nowrap!important;right:30px!important;opacity:1;z-index:1;transition:all .5s cubic-bezier(1,0,0,1)}.closeButton[_ngcontent-%COMP%]{display:flex;align-items:center;position:absolute;top:15px;right:15px;height:40px}.chatApp[_ngcontent-%COMP%]{width:360px!important;min-height:520px!important;max-height:720px!important;height:80%!important;position:fixed!important;bottom:25px!important;right:25px!important;border-radius:16px!important;background-color:initial!important;box-shadow:0 6px 60px 0 rgb(81 99 120/30%)!important;opacity:0;transform:scale(0);transform-origin:bottom right 60px;transition:all .5s cubic-bezier(1,0,0,1);overflow:hidden!important;animation:jZyQVL .25s ease-out 0s 1 normal none running!important}.chatHeader[_ngcontent-%COMP%]{height:40px;align-items:center;border-top-left-radius:0;border-top-right-radius:0;font-size:16px;color:#fff;background:#673ab7;box-shadow:0 4px 6px 0 rgb(0 0 0/10%);overflow:hidden;z-index:1;position:absolute;top:0;right:0;left:0;padding:14px 80px 14px 60px;transform:translateZ(0)}.chatBot[_ngcontent-%COMP%], .chatHeader[_ngcontent-%COMP%]{display:flex}.chatBotAvatar[_ngcontent-%COMP%]{vertical-align:middle;width:40px;height:40px;display:flex;align-items:center;top:15px;left:15px;cursor:pointer}.chatBotAvatar[_ngcontent-%COMP%], .indicator[_ngcontent-%COMP%]{border-radius:50%;position:absolute}.indicator[_ngcontent-%COMP%]{width:15px;height:15px;background-color:#3fec3f;z-index:2;left:40px;top:10px}.chatBotName[_ngcontent-%COMP%]{margin-left:10px}.chatBody[_ngcontent-%COMP%]{z-index:0;padding:80px 0;display:flex;flex-wrap:wrap;flex-direction:column;width:800px;max-width:100%;inset:0;overflow:hidden auto;height:calc(100% - 130px)}[_ngcontent-%COMP%]::-webkit-scrollbar{width:10px}[_ngcontent-%COMP%]::-webkit-scrollbar-track{background:#eee}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:#888}[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background:#555}.scroll[_ngcontent-%COMP%]{overflow-y:scroll;scroll-behavior:smooth}.message[_ngcontent-%COMP%]{margin:0 15px 20px;padding:10px 20px;position:relative;font-size:15px;width:auto;min-width:1vw;max-width:50%}.message.to[_ngcontent-%COMP%]{background-color:#673ab7;color:#fff;margin-left:auto;text-align:right;white-space:pre-wrap;border-radius:10px 10px 0 10px}.message.from[_ngcontent-%COMP%]{background-color:#e5e4e9;color:#363636;margin-right:auto;border-radius:10px 10px 10px 0}.message.from[_ngcontent-%COMP%] + .message.from[_ngcontent-%COMP%], .message.to[_ngcontent-%COMP%] + .message.to[_ngcontent-%COMP%]{margin-top:-10px}.chatFooter[_ngcontent-%COMP%]{flex:1 1 0px;position:absolute;bottom:0;right:0;left:0;z-index:1;transform:translateZ(0);display:flex;align-items:center;min-height:54px;border-top:1px solid #e4e4e5;background-color:#fff;box-shadow:0 2px 6px 0 rgb(0 0 0/5%)}.chatInput[_ngcontent-%COMP%]{width:100%;min-height:20px;max-height:200px;line-height:20px;font-size:15px;letter-spacing:-.1px;min-width:0;border:none;resize:none;margin:auto;padding:18px 10px;white-space:pre-wrap;overflow:hidden scroll;background-color:initial}.chatInput[_ngcontent-%COMP%]::-webkit-scrollbar{display:none}.chatInput[_ngcontent-%COMP%]:focus{outline:none}textarea[_ngcontent-%COMP%]{text-rendering:auto;color:-internal-light-dark(#000,#fff);letter-spacing:normal;word-spacing:normal;text-transform:none;text-indent:0;text-shadow:none;display:inline-block;text-align:start;-webkit-appearance:auto;-moz-appearance:auto;appearance:auto;background-color:-internal-light-dark(#fff,#3b3b3b);-webkit-rtl-ordering:logical;flex-direction:column;resize:auto;cursor:text;white-space:pre-wrap;overflow-wrap:break-word;column-count:auto!important;box-sizing:border-box;margin:0;font:400 13.3333px Arial;border:1px solid -internal-light-dark(#767676,#858585);border-image:initial;padding:2px 0 0 2px}"
            ]
          })),
          t
        );
      })();
      class Mm extends fh {
        constructor(t, e) {
          super(t, e), (this.scheduler = t), (this.work = e);
        }
        schedule(t, e = 0) {
          return e > 0
            ? super.schedule(t, e)
            : ((this.delay = e),
              (this.state = t),
              this.scheduler.flush(this),
              this);
        }
        execute(t, e) {
          return e > 0 || this.closed
            ? super.execute(t, e)
            : this._execute(t, e);
        }
        requestAsyncId(t, e, n = 0) {
          return (null !== n && n > 0) || (null === n && this.delay > 0)
            ? super.requestAsyncId(t, e, n)
            : t.flush(this);
        }
      }
      class Vm extends gh {}
      const jm = new Vm(Mm);
      let Lm = (() => {
        class t {
          constructor(t, e, n) {
            (this.kind = t),
              (this.value = e),
              (this.error = n),
              (this.hasValue = "N" === t);
          }
          observe(t) {
            switch (this.kind) {
              case "N":
                return t.next && t.next(this.value);
              case "E":
                return t.error && t.error(this.error);
              case "C":
                return t.complete && t.complete();
            }
          }
          do(t, e, n) {
            switch (this.kind) {
              case "N":
                return t && t(this.value);
              case "E":
                return e && e(this.error);
              case "C":
                return n && n();
            }
          }
          accept(t, e, n) {
            return t && "function" == typeof t.next
              ? this.observe(t)
              : this.do(t, e, n);
          }
          toObservable() {
            switch (this.kind) {
              case "N":
                return lh(this.value);
              case "E":
                return Yf(this.error);
              case "C":
                return wh();
            }
            throw new Error("unexpected notification kind value");
          }
          static createNext(e) {
            return void 0 !== e ? new t("N", e) : t.undefinedValueNotification;
          }
          static createError(e) {
            return new t("E", void 0, e);
          }
          static createComplete() {
            return t.completeNotification;
          }
        }
        return (
          (t.completeNotification = new t("C")),
          (t.undefinedValueNotification = new t("N", void 0)),
          t
        );
      })();
      class Bm extends f {
        constructor(t, e, n = 0) {
          super(t), (this.scheduler = e), (this.delay = n);
        }
        static dispatch(t) {
          const { notification: e, destination: n } = t;
          e.observe(n), this.unsubscribe();
        }
        scheduleMessage(t) {
          this.destination.add(
            this.scheduler.schedule(
              Bm.dispatch,
              this.delay,
              new Hm(t, this.destination)
            )
          );
        }
        _next(t) {
          this.scheduleMessage(Lm.createNext(t));
        }
        _error(t) {
          this.scheduleMessage(Lm.createError(t)), this.unsubscribe();
        }
        _complete() {
          this.scheduleMessage(Lm.createComplete()), this.unsubscribe();
        }
      }
      class Hm {
        constructor(t, e) {
          (this.notification = t), (this.destination = e);
        }
      }
      class zm extends E {
        constructor(
          t = Number.POSITIVE_INFINITY,
          e = Number.POSITIVE_INFINITY,
          n
        ) {
          super(),
            (this.scheduler = n),
            (this._events = []),
            (this._infiniteTimeWindow = !1),
            (this._bufferSize = t < 1 ? 1 : t),
            (this._windowTime = e < 1 ? 1 : e),
            e === Number.POSITIVE_INFINITY
              ? ((this._infiniteTimeWindow = !0),
                (this.next = this.nextInfiniteTimeWindow))
              : (this.next = this.nextTimeWindow);
        }
        nextInfiniteTimeWindow(t) {
          if (!this.isStopped) {
            const e = this._events;
            e.push(t), e.length > this._bufferSize && e.shift();
          }
          super.next(t);
        }
        nextTimeWindow(t) {
          this.isStopped ||
            (this._events.push(new qm(this._getNow(), t)),
            this._trimBufferThenGetEvents()),
            super.next(t);
        }
        _subscribe(t) {
          const e = this._infiniteTimeWindow,
            n = e ? this._events : this._trimBufferThenGetEvents(),
            s = this.scheduler,
            r = n.length;
          let i;
          if (this.closed) throw new v();
          if (
            (this.isStopped || this.hasError
              ? (i = h.EMPTY)
              : (this.observers.push(t), (i = new w(this, t))),
            s && t.add((t = new Bm(t, s))),
            e)
          )
            for (let o = 0; o < r && !t.closed; o++) t.next(n[o]);
          else for (let o = 0; o < r && !t.closed; o++) t.next(n[o].value);
          return (
            this.hasError
              ? t.error(this.thrownError)
              : this.isStopped && t.complete(),
            i
          );
        }
        _getNow() {
          return (this.scheduler || jm).now();
        }
        _trimBufferThenGetEvents() {
          const t = this._getNow(),
            e = this._bufferSize,
            n = this._windowTime,
            s = this._events,
            r = s.length;
          let i = 0;
          for (; i < r && !(t - s[i].time < n); ) i++;
          return r > e && (i = Math.max(i, r - e)), i > 0 && s.splice(0, i), s;
        }
      }
      class qm {
        constructor(t, e) {
          (this.time = t), (this.value = e);
        }
      }
      function $m(t, e) {
        return "function" == typeof e
          ? n =>
              n.pipe($m((n, s) => M(t(n, s)).pipe(x((t, r) => e(n, t, s, r)))))
          : e => e.lift(new Um(t));
      }
      class Um {
        constructor(t) {
          this.project = t;
        }
        call(t, e) {
          return e.subscribe(new Wm(t, this.project));
        }
      }
      class Wm extends j {
        constructor(t, e) {
          super(t), (this.project = e), (this.index = 0);
        }
        _next(t) {
          let e;
          const n = this.index++;
          try {
            e = this.project(t, n);
          } catch (s) {
            return void this.destination.error(s);
          }
          this._innerSub(e);
        }
        _innerSub(t) {
          const e = this.innerSubscription;
          e && e.unsubscribe();
          const n = new V(this),
            s = this.destination;
          s.add(n),
            (this.innerSubscription = L(t, n)),
            this.innerSubscription !== n && s.add(this.innerSubscription);
        }
        _complete() {
          const { innerSubscription: t } = this;
          (t && !t.closed) || super._complete(), this.unsubscribe();
        }
        _unsubscribe() {
          this.innerSubscription = void 0;
        }
        notifyComplete() {
          (this.innerSubscription = void 0),
            this.isStopped && super._complete();
        }
        notifyNext(t) {
          this.destination.next(t);
        }
      }
      const Qm = {
        schedule(t, e) {
          const n = setTimeout(t, e);
          return () => clearTimeout(n);
        },
        scheduleBeforeRender(t) {
          if ("undefined" == typeof window) return Qm.schedule(t, 0);
          if (void 0 === window.requestAnimationFrame)
            return Qm.schedule(t, 16);
          const e = window.requestAnimationFrame(t);
          return () => window.cancelAnimationFrame(e);
        }
      };
      let Zm;
      function Km(t, e, n) {
        let s = n;
        return (
          (function(t) {
            return !!t && t.nodeType === Node.ELEMENT_NODE;
          })(t) &&
            e.some(
              (e, n) =>
                !(
                  "*" === e ||
                  !(function(t, e) {
                    if (!Zm) {
                      const t = Element.prototype;
                      Zm =
                        t.matches ||
                        t.matchesSelector ||
                        t.mozMatchesSelector ||
                        t.msMatchesSelector ||
                        t.oMatchesSelector ||
                        t.webkitMatchesSelector;
                    }
                    return t.nodeType === Node.ELEMENT_NODE && Zm.call(t, e);
                  })(t, e) ||
                  ((s = n), 0)
                )
            ),
          s
        );
      }
      class Gm {
        constructor(t, e) {
          this.componentFactory = e.get(Qo).resolveComponentFactory(t);
        }
        create(t) {
          return new Ym(this.componentFactory, t);
        }
      }
      class Ym {
        constructor(t, e) {
          (this.componentFactory = t),
            (this.injector = e),
            (this.eventEmitters = new zm(1)),
            (this.events = this.eventEmitters.pipe($m(t => $(...t)))),
            (this.componentRef = null),
            (this.viewChangeDetectorRef = null),
            (this.inputChanges = null),
            (this.hasInputChanges = !1),
            (this.implementsOnChanges = !1),
            (this.scheduledChangeDetectionFn = null),
            (this.scheduledDestroyFn = null),
            (this.initialInputValues = new Map()),
            (this.unchangedInputs = new Set(
              this.componentFactory.inputs.map(({ propName: t }) => t)
            )),
            (this.ngZone = this.injector.get(Il)),
            (this.elementZone =
              "undefined" == typeof Zone
                ? null
                : this.ngZone.run(() => Zone.current));
        }
        connect(t) {
          this.runInZone(() => {
            if (null !== this.scheduledDestroyFn)
              return (
                this.scheduledDestroyFn(), void (this.scheduledDestroyFn = null)
              );
            null === this.componentRef && this.initializeComponent(t);
          });
        }
        disconnect() {
          this.runInZone(() => {
            null !== this.componentRef &&
              null === this.scheduledDestroyFn &&
              (this.scheduledDestroyFn = Qm.schedule(() => {
                null !== this.componentRef &&
                  (this.componentRef.destroy(),
                  (this.componentRef = null),
                  (this.viewChangeDetectorRef = null));
              }, 10));
          });
        }
        getInputValue(t) {
          return this.runInZone(() =>
            null === this.componentRef
              ? this.initialInputValues.get(t)
              : this.componentRef.instance[t]
          );
        }
        setInputValue(t, e) {
          this.runInZone(() => {
            var n, s;
            null !== this.componentRef
              ? (((n = e) !== (s = this.getInputValue(t)) &&
                  (n == n || s == s)) ||
                  (void 0 === e && this.unchangedInputs.has(t))) &&
                (this.recordInputChange(t, e),
                this.unchangedInputs.delete(t),
                (this.hasInputChanges = !0),
                (this.componentRef.instance[t] = e),
                this.scheduleDetectChanges())
              : this.initialInputValues.set(t, e);
          });
        }
        initializeComponent(t) {
          const e = Wi.create({ providers: [], parent: this.injector }),
            n = (function(t, e) {
              const n = t.childNodes,
                s = e.map(() => []);
              let r = -1;
              e.some((t, e) => "*" === t && ((r = e), !0));
              for (let i = 0, o = n.length; i < o; ++i) {
                const t = n[i],
                  o = Km(t, e, r);
                -1 !== o && s[o].push(t);
              }
              return s;
            })(t, this.componentFactory.ngContentSelectors);
          (this.componentRef = this.componentFactory.create(e, n, t)),
            (this.viewChangeDetectorRef = this.componentRef.injector.get(va)),
            (this.implementsOnChanges =
              "function" == typeof this.componentRef.instance.ngOnChanges),
            this.initializeInputs(),
            this.initializeOutputs(this.componentRef),
            this.detectChanges(),
            this.injector.get(Kl).attachView(this.componentRef.hostView);
        }
        initializeInputs() {
          this.componentFactory.inputs.forEach(({ propName: t }) => {
            this.initialInputValues.has(t) &&
              this.setInputValue(t, this.initialInputValues.get(t));
          }),
            this.initialInputValues.clear();
        }
        initializeOutputs(t) {
          const e = this.componentFactory.outputs.map(
            ({ propName: e, templateName: n }) =>
              t.instance[e].pipe(x(t => ({ name: n, value: t })))
          );
          this.eventEmitters.next(e);
        }
        callNgOnChanges(t) {
          if (!this.implementsOnChanges || null === this.inputChanges) return;
          const e = this.inputChanges;
          (this.inputChanges = null), t.instance.ngOnChanges(e);
        }
        markViewForCheck(t) {
          this.hasInputChanges &&
            ((this.hasInputChanges = !1), t.markForCheck());
        }
        scheduleDetectChanges() {
          this.scheduledChangeDetectionFn ||
            (this.scheduledChangeDetectionFn = Qm.scheduleBeforeRender(() => {
              (this.scheduledChangeDetectionFn = null), this.detectChanges();
            }));
        }
        recordInputChange(t, e) {
          if (!this.implementsOnChanges) return;
          null === this.inputChanges && (this.inputChanges = {});
          const n = this.inputChanges[t];
          if (n) return void (n.currentValue = e);
          const s = this.unchangedInputs.has(t),
            r = s ? void 0 : this.getInputValue(t);
          this.inputChanges[t] = new oe(r, e, s);
        }
        detectChanges() {
          null !== this.componentRef &&
            (this.callNgOnChanges(this.componentRef),
            this.markViewForCheck(this.viewChangeDetectorRef),
            this.componentRef.changeDetectorRef.detectChanges());
        }
        runInZone(t) {
          return this.elementZone && Zone.current !== this.elementZone
            ? this.ngZone.run(t)
            : t();
        }
      }
      class Jm extends HTMLElement {
        constructor() {
          super(...arguments), (this.ngElementEventsSubscription = null);
        }
      }
      new na("11.2.12");
      let Xm = (() => {
          class t {}
          return (
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = lt({
              factory: function(e) {
                return new (e || t)();
              },
              imports: [[Oh]]
            })),
            t
          );
        })(),
        tg = (() => {
          class t {}
          return (
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = lt({
              factory: function(e) {
                return new (e || t)();
              },
              imports: [[dc, Of, Ph], Of]
            })),
            t
          );
        })(),
        eg = (() => {
          class t {}
          return (
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = lt({
              factory: function(e) {
                return new (e || t)();
              },
              providers: [Ff],
              imports: [[Xm, tg, Of], Xm, tg]
            })),
            t
          );
        })(),
        ng = (() => {
          class t {
            constructor(t) {
              this.injector = t;
              const e = (function(t, e) {
                const n = (function(t, e) {
                    return e.get(Qo).resolveComponentFactory(t).inputs;
                  })(t, e.injector),
                  s = e.strategyFactory || new Gm(t, e.injector),
                  r = (function(t) {
                    const e = {};
                    return (
                      t.forEach(({ propName: t, templateName: n }) => {
                        var s;
                        e[
                          ((s = n),
                          s.replace(/[A-Z]/g, t => "-" + t.toLowerCase()))
                        ] = t;
                      }),
                      e
                    );
                  })(n);
                class i extends Jm {
                  constructor(t) {
                    super(), (this.injector = t);
                  }
                  get ngElementStrategy() {
                    if (!this._ngElementStrategy) {
                      const t = (this._ngElementStrategy = s.create(
                        this.injector || e.injector
                      ));
                      n.forEach(({ propName: e }) => {
                        if (!this.hasOwnProperty(e)) return;
                        const n = this[e];
                        delete this[e], t.setInputValue(e, n);
                      });
                    }
                    return this._ngElementStrategy;
                  }
                  attributeChangedCallback(t, e, n, s) {
                    this.ngElementStrategy.setInputValue(r[t], n);
                  }
                  connectedCallback() {
                    let t = !1;
                    this.ngElementStrategy.events &&
                      (this.subscribeToEvents(), (t = !0)),
                      this.ngElementStrategy.connect(this),
                      t || this.subscribeToEvents();
                  }
                  disconnectedCallback() {
                    this._ngElementStrategy &&
                      this._ngElementStrategy.disconnect(),
                      this.ngElementEventsSubscription &&
                        (this.ngElementEventsSubscription.unsubscribe(),
                        (this.ngElementEventsSubscription = null));
                  }
                  subscribeToEvents() {
                    this.ngElementEventsSubscription = this.ngElementStrategy.events.subscribe(
                      t => {
                        const e = (function(t, e, n) {
                          if ("function" != typeof CustomEvent) {
                            const s = t.createEvent("CustomEvent");
                            return s.initCustomEvent(e, !1, !1, n), s;
                          }
                          return new CustomEvent(e, {
                            bubbles: !1,
                            cancelable: !1,
                            detail: n
                          });
                        })(this.ownerDocument, t.name, t.value);
                        this.dispatchEvent(e);
                      }
                    );
                  }
                }
                return (
                  (i.observedAttributes = Object.keys(r)),
                  n.forEach(({ propName: t }) => {
                    Object.defineProperty(i.prototype, t, {
                      get() {
                        return this.ngElementStrategy.getInputValue(t);
                      },
                      set(e) {
                        this.ngElementStrategy.setInputValue(t, e);
                      },
                      configurable: !0,
                      enumerable: !0
                    });
                  }),
                  i
                );
              })(Rm, { injector: t });
              customElements.define("app-root", e);
            }
            ngDoBootstrap() {}
          }
          return (
            (t.ɵmod = zt({ type: t })),
            (t.ɵinj = lt({
              factory: function(e) {
                return new (e || t)(os(Wi));
              },
              providers: [ec],
              imports: [[zc, Gf, Nm, eg, oh, ah, xf]]
            })),
            t
          );
        })();
      (function() {
        if (zl)
          throw new Error("Cannot enable prod mode after platform setup.");
        Hl = !1;
      })(),
        Bc()
          .bootstrapModule(ng)
          .catch(t => console.error(t));
    },
    zn8P: function(t, e) {
      function n(t) {
        return Promise.resolve().then(function() {
          var e = new Error("Cannot find module '" + t + "'");
          throw ((e.code = "MODULE_NOT_FOUND"), e);
        });
      }
      (n.keys = function() {
        return [];
      }),
        (n.resolve = n),
        (t.exports = n),
        (n.id = "zn8P");
    }
  },
  [[0, 0]]
]);
