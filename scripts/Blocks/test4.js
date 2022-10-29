const ty=require("Type/IncludingStruct")
ty.init([{block:Vars.content.getByName(ContentType.block,"hydrogencore-通用接口"),x:0,y:1}],"test4",{
    StructureUpdate(){
         Vars.ui.showLabel("多方块测试",0.01,this.x,this.y);
    }
    
},{
        item:[Items.copper,Items.lead],
        liquid:[]
    })