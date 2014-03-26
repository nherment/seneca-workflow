/* Copyright (c) 2010-2014 Nearform */
"use strict";


var seneca = require('seneca')()

var assert = require('assert')


seneca.use(require('../workflow.js'), {
  workflow: [
    {
      'action': 'wy-filter',
      'name': 'editable only',
      'attributes': {
        'status': {'$in': ['new', 'open']}
      }
    },
    {
      'action': 'sw-custom-action-1',
      'name': 'custom action',
      'attr1': 'value1'
    }
  ]
})


describe('workflow', function () {

  var workflow = seneca.pin({role: 'workflow', cmd: '*'})

  it('register custom action', function (done) {
    workflow.register({
      name: 'sw-custom-action-1',
      func: function(data, options) {
        assert.equal(options.action, 'sw-custom-action-1')
        assert.equal(options.name, 'custom action')
        assert.equal(options.attr1, 'value1')
        if(!data.customAction) {
          data.customAction = true
          this.next(true)
        } else {
          this.next()
        }
      }
    }, done)
  })

  it('workflow should call custom action if the data pass the filter', function (done) {
    var data = {
      status: 'new',
      customAction: false
    }

    workflow.run({
      data: data
    }, function(err) {
      if(err) {
        return done(err)
      }
      assert.ok(data.customAction)
      done()
    })
  })

  it('workflow should not call custom action if the data does not pass the filter', function (done) {
    var data = {
      status: 'closed',
      customAction: false
    }

    workflow.run({
      data: data
    }, function(err) {
      if(err) {
        return done(err)
      }
      assert.ok(!data.customAction)
      done()
    })
  })


})
