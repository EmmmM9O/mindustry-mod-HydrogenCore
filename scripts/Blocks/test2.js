const ty=require("Type/MultiCrafter")
ty.init("test2",[{icon:"item-lead","input":{"items":[{"item":Items.copper,"sum":2}],"power":4,"time":100},"output":{
"items":[{"item":Items.lead,"sum":2}]}},{icon:"item-copper","input":{"items":[{"item":Items.lead,"sum":2}],"power":-4,"time":100},"output":{
"items":[{"item":Items.copper,"sum":2}]}}])