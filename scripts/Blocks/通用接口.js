const name="通用接口"
const block = extend(MessageBlock, name, {});
block.buildType = () => {
    const ent = extend(MessageBlock.MessageBuild, block, {
        _InOutMode:{
            Type:""
        },
        _MaxIn:5,
        _PowerNeed:0,
        getPower(){
            return this._PowerNeed;
        },
        setPower(a){
            this._PowerNeed=a;
        },
        getPowerProduction(){
            if(this.getPower()!=0){
                let k=this.getPower();
                this.setPower(0);
                return k*-1;
            }
            return 0;
        },
        acceptItem(source,item){
        	        try{
        	            if(this.items.get(item) >= this.getMaximumAccepted(item)) return false;
                         if(this.getMode().out==null||this.getMode().out!=item||this.getMode().Mode!="input") return false;
        	           return true;
        	        }catch(e){print(e)}
        	        
        	    },
        getMaxIn(){
            return this._MaxIn;
        },
        _Data:null,
        setMode(a){
            this._InOutMode=a;
        },
        setMode2(a,b){
            this._InOutMode[a]=b;
        },
        getMode(){
            return this._InOutMode;
        },
        DrawUi(){
          let mode=this.getMode();
            let data=this.getdata();
                    let dialog=new Dialog("[orange]UI");
                    dialog.cont.pane(cons(t=>{
                        if(this.getdata()==null){
                            t.add("未检测到多方块");
                            return;
                        }
                        
                        t.button("物品",()=>{this.setMode2("Type","item");dialog.hide();this.DrawUi()});
                        t.button("流体",()=>{this.setMode2("Type","liquid");dialog.hide();this.DrawUi()});
                        t.button("能量",()=>{this.setMode2("Type","power");dialog.hide();try{this.DrawUi()}catch(e){print(e)}});
                        if(mode.Type=="power") return;
                                        
                    })).row();
                    if(data!=null) dialog.cont.pane(cons(t=>{
                        if(mode.Type=="power"||data[mode.Type]==null){
                            t.add("无选项");
                            return;
                        }
                        let cnt=0;
                        for(let i in data[mode.Type]){
                                cnt++;
                                t.image(data[mode.Type][i].uiIcon);
                                let k=data[mode.Type][i];
                                t.button("X",()=>{this.setMode2("out",k)});
                                if(cnt>=9){
                                    cnt=0;
                                    t.row();
                                }
                            }
                    })).row();
                    dialog.cont.table(cons(t=>{
                                    
                         t.button("@ok",()=>{
                             dialog.hide();
                         }).size(96,32)
                    }));
                    dialog.show()
                    
        },
        setdata(a){
            this._Data=a;
        },
        getdata(){
            return this._Data;
        },
        chickIn(need){
            let shouldIn;
            switch(this.getMode().Type){
                case "power":
                    shouldIn=Math.min(need,this.getMaxIn());
                    shouldIn=Math.min(shouldIn,Math.max(this.power.graph.getBatteryStored(),(this.power.graph.getPowerProduced()-this.power.graph.getPowerNeeded())));
                    if(shouldIn>0) this.setPower(shouldIn);
                    break;
                case "item":
                    let item=this.getMode().out;
                    if(item==null) return 0;
                    shouldIn=Math.min(need,this.getMaxIn());
                    shouldIn=Math.min(shouldIn,this.items.get(item));
                    if(shouldIn>0) this.items.remove(item,shouldIn);
                    break;
                case "liquid":
                    let liquid=this.getMode().out;
                    shouldIn=Math.min(need,this.getMaxIn());
                    if(liquid==null||this.liquids.current()==null||this.liquids.current()!=liquid) return 0;
                    shouldIn=Math.min(shouldIn,this.liquids.currentAmount());
                    block.liquids.remove(liquid,shouldIn)
                    break;
            }
            return shouldIn;
        },
        draw(){
           try{
                this.super$draw();
                if(this.getMode().Mode!=null){
                    let a=this.getMode().Mode;
                    if(a=="input") Draw.rect(Core.atlas.find("hydrogencore-input"),this.x,this.y,8,8);
                    else Draw.rect(Core.atlas.find("hydrogencore-output"),this.x,this.y,8,8);
                    if(this.getdata()!=null){
                        let ou=this.getMode().out;
                        if(this.getMode().Type!=null&&this.getMode().Type=="power") Draw.rect(Core.atlas.find("hydrogencore-power"),this.x,this.y,5,5);
                        else if(ou!=null) Draw.rect(ou.uiIcon,this.x,this.y,5,5);
                    }
                }
           }catch(e){print(e)};
            
        },
        buildConfiguration(table){
            try{
                let mode=this.getMode();
                table.button("input",()=>{this.setMode2("Mode","input")})
                table.button("output",()=>{this.setMode2("Mode","output")})
                table.button("change",()=>{
                    this.DrawUi();
                })
                
            }catch(e){print("from connfig of "+name+":"+e)}
        } 
    })
	return ent;
}
block.consumesPower = false;
block.outputsPower = true;
block.update=true;
block.hasItems = true;
block.hasLiquids = true;
block.hasPower = true;