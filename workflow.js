/* Copyright (c) 2012-2014 Nearform, MIT License */
"use strict";

var Worky = require('worky')
var _ = require('underscore')

function workflow(workflow) {
  var seneca = this
  var plugin = 'workflow'

  var worky = new Worky(workflow)

  seneca.add({ role: plugin, cmd:'register' }, function(args, callback) {
    worky.register(args.name, args.func)
  })

  seneca.add({ role: plugin, cmd:'run' }, function(args, callback) {
    worky.run(args.data, function(err) {
      callback(err)
    })
  })

  return {
    name: plugin
  }
}


module.exports = workflow
