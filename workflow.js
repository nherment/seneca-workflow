/* Copyright (c) 2012-2014 Nearform, MIT License */
"use strict";

var Worky = require('worky')
var _ = require('underscore')

function workflow(options) {
  var seneca = this
  var plugin = 'workflow'

  var worky = new Worky(options.workflow)

  seneca.add({ role: plugin, cmd:'register' }, function(args, callback) {
    worky.register(args.name, args.func)
    callback()
  })

  seneca.add({ role: plugin, cmd:'run' }, function(args, callback) {
    worky.run(args.data, function(err) {
      callback(err)
    })
  })

  seneca.use(require('./lib/workflow-crud-action.js'))

  return {
    name: plugin
  }
}


module.exports = workflow
