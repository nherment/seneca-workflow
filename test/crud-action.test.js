/* Copyright (c) 2010-2014 Nearform */
"use strict";


var seneca = require('seneca')()

var assert = require('assert')


seneca.use(require('../workflow.js'), {
  workflow: [
    {
      action: 'sn-crud',
      type: 'type1'
    }
  ]
})

seneca.use(require('../lib/workflow-crud-action.js'))


describe('sn-crud', function () {

  var workflow = seneca.pin({role: 'workflow', cmd: '*'})

  it('save', function (done) {
    var obj = {
      foo: 'bar'
    }

    workflow.run({
      data: {
        action: 'save',
        object: obj,
      }
    }, function(err) {
      if(err) {
        return done(err)
      }
      assert.ok(obj.id)
      done()
    })
  })


})
