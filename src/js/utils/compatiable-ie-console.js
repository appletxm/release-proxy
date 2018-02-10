/* global alert, window */
if (!window.console) {
  window.console = {
    log: function (msg) {
      try {
        alert('console log:' + JSON.stringify(msg))
      } catch (err) {
        alert('console log:' + msg)
      }
    },
    info: function (msg) {
      try {
        alert('console info:' + JSON.stringify(msg))
      } catch (err) {
        alert('console info:' + msg)
      }
    },
    error: function (msg) {
      try {
        alert('console error:' + JSON.stringify(msg))
      } catch (err) {
        alert('console error:' + msg)
      }
    }
  }
}
