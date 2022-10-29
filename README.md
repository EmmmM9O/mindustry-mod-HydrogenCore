# HydrogenCore
a mod of Mindustry    一个像素工厂mod



# *氢气核心*

 - ## 介绍
      一个mindustry的js mod
      为一些mod提供前置
      ~~还在开发~~
 - ## 功能
      #### *MultiCrafter* 多合成
     *  ~~暂不支持液体合成~~
      #### *Structure*多方块结构
      * 支持投影显示和手动建筑
      #### *IncludingStruct*支持 *通用接口* 的多方块
      * ~~还在开发~~
      * ### *接口材质会变化*
 - ## 使用
   * `HydrogenCoreApi`包含所有api
   * 方块要在content里存在
   * 使用`init`来初始化方块
   * 更多详情自己看代码
- ## 事例
      
      
    

> test2.js为测试多合成用的

    
```javascript
const ty=require("Type/MultiCrafter")
ty.init("test2",[{
    icon:"item-lead",
    "input":{
         "items":[
               {"item":Items.copper,"sum":2}
          ],
         "power":4,
         "time":100
     },
     "output":{
         "items":[
             {"item":Items.lead,"sum":2}
         ]
         }
     },
     {
     icon:"item-copper",
     "input":{
         "items":[{"item":Items.lead,"sum":2}],
         "power":-4,
         "time":100
         },
     "output":{
         "items":[{"item":Items.copper,"sum":2}]
         }
     }
])
```

> test3是多方块测试
 ```javascript
 const ty=require("Type/Structure")
ty.init(
[
    {block:Blocks.duo,x:0,y:1}
]
,
"test3"
,{
    StructureUpdate(){
       Vars.ui.showLabel("多方块测试",0.01,this.x,this.y);    
}})
 ```
> 
> 能给我b站个赞吗

