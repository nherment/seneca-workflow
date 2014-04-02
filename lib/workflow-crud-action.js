/* Copyright (c) 2012-2014 Nearform, MIT License */

"use strict";
var assert = require('assert')

function crud(options) {
  var seneca = this
  var plugin = 'workflow-crud-action'

  seneca.act({
    role: 'workflow',
    cmd: 'register',
    name: 'sn-crud',
    func: function(data, options) {

      assert.ok(data.object, 'missing object attribute')

      // TODO: find a way to generate the entityMgr based on the object.entity$ attr.
      var entityMgr = seneca.make(options.type)
      var self = this

      switch(data.action) {
        case 'save':
          entityMgr.save$(data.object, function(err, savedObject) {

            if(err) {
              self.reject(err)
            } else {
              for(var attr in savedObject) {
                if(savedObject.hasOwnProperty(attr)) {
                  data.object[attr] = savedObject[attr]
                }
              }
              self.next(false)
            }
          })
          break
        default:
          this.reject(new Error('unsupported action '+data.action))
          break
      }
    }
  }, function(err) {
    if(err) throw err
  })

  return {
    name: plugin
  }
}


module.exports = crud
