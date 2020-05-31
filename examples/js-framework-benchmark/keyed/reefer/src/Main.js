'use strict'

// ==========================
// main app - just a "store"
// ==========================
function Main () {
  var store = this.store = new Store()

  // connect the store to our UI....
  reefer.ready(function () {
    var btns = document.querySelector('[reef=mybuttons]').reef
    btns.watch('store', store) // observe the store as an external entity
    btns.decorate('store')
  })
}

// ==========================
// here's our store
// ==========================
function _random (max) {
  return Math.round(Math.random() * 1000) % max
}

function Store () {
  this.data = []
  this.selected = null
  this.id = 1
}
var sp = Store.prototype
sp.buildData = function (count) {
  count = count || 10
  var adjectives = ['pretty', 'large', 'big', 'small', 'tall', 'short', 'long', 'handsome', 'plain', 'quaint', 'clean', 'elegant', 'easy', 'angry', 'crazy', 'helpful', 'mushy', 'odd', 'unsightly', 'adorable', 'important', 'inexpensive', 'cheap', 'expensive', 'fancy']
  var colours = ['red', 'yellow', 'blue', 'green', 'pink', 'brown', 'purple', 'brown', 'white', 'black', 'orange']
  var nouns = ['table', 'chair', 'house', 'bbq', 'desk', 'car', 'pony', 'cookie', 'sandwich', 'burger', 'pizza', 'mouse', 'keyboard']
  var data = []
  for (var i = 0; i < count; i++) { data.push({ id: this.id++, label: adjectives[_random(adjectives.length)] + ' ' + colours[_random(colours.length)] + ' ' + nouns[_random(nouns.length)] }) }
  return data
}
sp.updateData = function (mod) {
  mod = mod || 10
  var t = new Date()
  for (let i = 0; i < this.data.length; i += 10) { this.data[i].label += ' !!!' }
  console.log('time:', new Date() - t)
}
sp.delete = function (id) {
  const idx = this.data.findIndex(function (d) { return d.id == id })
  this.data.splice(idx, 1)
}
sp.run = function (count) {
  this.data = this.buildData(count)
  this.selected = null
}
sp.add = function () {
  this.data = this.data.concat(this.buildData(1000))
  this.selected = null
}
sp.update = function () {
  this.updateData()
  this.selected = null
}
sp.select = function (id) {
  this.selected = id
}
sp.runLots = function () {
  this.run(10000)
}
sp.clear = function () {
  this.data = []
  this.selected = null
}
sp.swapRows = function () {
  if (this.data.length > 998) {
    var a = this.data[1]
    this.data[1] = this.data[998]
    this.data[998] = a
  }
}

// ==========================
// finally - run the app
// ==========================
var m = new Main()