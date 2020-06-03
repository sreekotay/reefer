
var anim = true
var render = function () {
  Monitoring.renderRate.ping()
  databases = ENV.generateData(true).toArray()
  var reef = reefer.find('#reeftable')
  reef.render()
  if (anim) setTimeout(render, ENV.timeout)
}

reefer.ready(function () {
  var databases = ENV.generateData().toArray()
  var reef = reefer.find('#reeftable')
  reef.data.w = { databases: databases }
  reef.render()
  render()
})
