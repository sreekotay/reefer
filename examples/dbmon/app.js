
var render = function () {
  var databases = ENV.generateData().toArray()
  var reef = reefer.find('#reeftable')
  reef.data.w = { databases: databases }
  reef.render()
  Monitoring.renderRate.ping()
  setTimeout(render, ENV.timeout)
}

reefer.ready(function () {
  render()
})
