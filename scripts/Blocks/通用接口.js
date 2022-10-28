const name="通用接口"
const block = extend(MessageBlock, name, {});
block.buildType = () => {
    const ent = extend(MessageBlock.MessageBuild, block, {
        _InOutMode:{},
        setMode(a){
            this._InOutMode=a;
        },
        getMode(){
            return this._InOutMode;
        },
        draw(){
           try{
                this.super$draw();
                if(this.getMode().Mode!=null){
                    let a=this.getMode().Mode;
                    if(a=="input") Draw.rect(Core.atlas.find("hydrogencore-input"),this.x,this.y,8,8);
                    else Draw.rect(Core.atlas.find("hydrogencore-output"),this.x,this.y,8,8);
                 
                }
           }catch(e){print(e)};
            
        },
        buildConfiguration(table){
            try{
                let mode=this.getMode;
                table.button("input",()=>{mode.Mode="input"})
                table.button("output",()=>{mode.Mode="output"})
                table.button("change",()=>{
                    let dialog=new Dialog("[orange]UI");
                    dialog.cont.pane(cons(t=>{
                        
                    }))
                    dialog.cont.table(cons(t=>{
                                    
                         t.button("@ok",()=>{
                             dialog.hide();
                         }).size(96,32)
                    }));
                    dialog.show();
                })
                this.setMode(mode);
                
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