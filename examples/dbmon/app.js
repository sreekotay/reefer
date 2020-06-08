
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
