/* Copyright (c) 2012-2014 Nearform, MIT License */
"use strict";

var Sonic = require('sonic')
var _ = require('underscore')

function workflow(options) {
  var seneca = this
  var plugin = 'workflow'

  var sonic = new Sonic(options.workflow)

  seneca.add({ role: plugin, cmd:'register' }, function(args, callback) {
    sonic.register(args.name, args.func)
    callback()
  })

  seneca.add({ role: plugin, cmd:'run' }, function(args, callback) {
    sonic.run(args.data, function(err) {
      callback(err)
    })
  })

  seneca.use(require('./lib/workflow-crud-action.js'))

  return {
    name: plugin
  }
}


module.exports = workflow
