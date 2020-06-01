class CustomEventTarget {
  constructor() {
    this._init();
  }
  _init() {
    this._registrations = {};
  }
  _getListeners(type, useCapture) {
    var captype = type;
    if (!(captype in this._registrations)) this._registrations[captype] = [];
    return this._registrations[captype];
  }
  addEventListener(type, listener, useCapture) {
    var listeners = this._getListeners(type, useCapture);
    var ix = listeners.indexOf(listener);
    if (ix === -1) listeners.push(listener);
  }
  removeEventListener(type, listener, useCapture) {
    var listeners = this._getListeners(type, useCapture);

    var ix = listeners.indexOf(listener);
    if (ix !== -1) listeners.splice(ix, 1);
  }
  dispatchEvent(evt) {
    var listeners = this._getListeners(evt.type, false).slice();
    for (var i = 0; i < listeners.length; i++) listeners[i].call(this, evt);
    return !evt.defaultPrevented;
  }
}
