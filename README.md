
This is a workflow engine based on [worky](https://github.com/nherment/worky)


setup the workflow with your options:

    seneca.use('workflow', [
      {
        "action": "myCustomAction",
        "name": "first action",
        "foo":"bar"
      },
      ...
    ])


You can declare your own workflow functions:

    seneca.act({role: "workflow", cmd: "register", name:"myCustomAction", func: function(data, options) {...}})

Then execute the workflow on an item

    seneca.act({role: "workflow", cmd: "run", data:{...}}, function(err) {
      // err if any

    })

