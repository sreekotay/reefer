
var anim = true
var render = function () {
  Monitoring.renderRate.ping()
  var databases = ENV.generateData().toArray()
  Promise.resolve(databases).then(v => {
    var reef = reefer.find('#reeftable')
    reef.data.w = { databases: v }
    reef.render()
  })

  if (anim) setTimeout(render, ENV.timeout)
}

reefer.ready(function () {
  render()
})
