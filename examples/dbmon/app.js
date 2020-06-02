
var anim = true
var render = function () {
  Monitoring.renderRate.ping()
  var databases = ENV.generateData().toArray()
  var reef = reefer.find('#reeftable')
  reef.data.w = { databases: databases }
  reef.render()

  if (anim) setTimeout(render, ENV.timeout)
}

reefer.ready(function () {
  render()
})
