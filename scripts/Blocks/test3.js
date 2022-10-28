const ty=require("Type/Structure")
ty.init([{block:Blocks.duo,x:0,y:1}],"test3",{
    StructureUpdate(){
         Vars.ui.showLabel("多方块测试",0.01,this.x,this.y);
    }
})