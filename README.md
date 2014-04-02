
This is a workflow engine based on [worky](https://github.com/nherment/worky)


setup the workflow with your options:

    seneca.use('workflow', {
      workflow: [
        {
          "action": "myCustomAction",
          "name": "first action",
          "foo":"bar"
        },
        ...
      ]
    })


You can declare your own workflow functions:

    seneca.act({role: "workflow", cmd: "register", name:"myCustomAction", func: function(data, options) {...}})

Then execute the workflow on an item

    seneca.act({role: "workflow", cmd: "run", data:{...}}, function(err) {
      // err if any

    })

# out of the box actions

seneca-workflow defines a set of actions, all prefixed with ```sn-```.
That means you should not use the ```sn-``` prefix for your own actions unless you
want to override seneca's actions and you know what you are doing.

## sn-crud

TODO
