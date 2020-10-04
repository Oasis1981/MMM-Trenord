/* global module */

/* Magic Mirror
 * Node Helper: MMM-CuandoLlega
 *
 * By Jose Forte
 * MIT Licensed.
 */

var NodeHelper = require('node_helper')
var request = require('request')

var cuandoLlegaAPI = 'view-source:http://www.viaggiatreno.it/viaggiatrenonew/resteasy/viaggiatreno/partenze/S01037/';

module.exports = NodeHelper.create({
  start: function () {
    console.log('Starting node helper for: ' + this.name)
  },
  getBusInfo: function(info) {
      var self = this
      var d = new Date()
    var options = {
      method: 'GET',
      qs: {
        linea: info.line,
        parada: info.stop
      },
      url: cuandoLlegaAPI + d
    }
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var result = JSON.parse(body)
        self.sendSocketNotification('BUS_RESULT', result)
      }
    })
  },
  socketNotificationReceived: function(notification, payload) {
    if (notification === 'GET_INFO') {
      this.getBusInfo(payload)
    }
  }

});
