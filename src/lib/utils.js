
export const IframeOnClick = {
  resolution: 2000,
  iframes: [],
  interval: null,
  Iframe: function () {
    this.element = arguments[0]
    this.cb = arguments[1]
  },
  track: function (element, cb) {
    this.iframes.push(new this.Iframe(element, cb))
    var _this = this
    this.interval = setInterval(function () {
      _this.checkClick()
    }, this.resolution)
  },
  checkClick: function () {
    if (document.activeElement) {
      var activeElement = document.activeElement
      for (var i in this.iframes) {
        if (activeElement === this.iframes[i].element) { // user is in this Iframe
          this.iframes[i].cb.apply(window, [])
          var body = document.body
          body.focus()
        }
      }
    }
  }
}
