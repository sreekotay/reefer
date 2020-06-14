
/*

perfMonitor.startFPSMonitor()
perfMonitor.startMemMonitor()
perfMonitor.initProfiler("render")

var anim = true
var render = function () {
  databases = ENV.generateData(true).toArray()
	perfMonitor.startProfile("render")
  var reef = reefer.find('#reeftable')
  reef.render()
	perfMonitor.endProfile("render")
  if (anim) setTimeout(render, ENV.timeout)
}

reefer.ready(function () {
  var databases = ENV.generateData().toArray()
  var reef = reefer.find('#reeftable')
  reef.data.w = { databases: databases }
  reef.render()
  render()
})
*/
var anim = true
var render = function () {
  Monitoring.renderRate.ping()
  databases = ENV.generateData(true).toArray()
  var ui = coral.ui.find('#coraltable')
  ui.render()
  if (anim) setTimeout(render, ENV.timeout)
}

coral.ui.ready(function () {
  var databases = ENV.generateData().toArray()
  var ui = coral.ui.find('#coraltable')
  ui.state.w = { databases: databases }
  ui.render()
  render()
})
