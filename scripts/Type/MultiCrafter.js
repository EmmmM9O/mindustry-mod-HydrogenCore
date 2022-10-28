module.exports = {
    init(name,Gui){
        const block = extend(MessageBlock, name, {});
        let k=Gui;
        block.buildType = () => {
        	const ent = extend(MessageBlock.MessageBuild, block, {
        	    _CraftGuide:k,
        	    _Hc:0,
        	    _Cooling:0,
        	    _uespower:false,
        	    getcool(){
        	        return this._Cooling;
        	    },
        	    setcool(sum){
        	        this._Cooling=sum;
        	    },
        	    getHc(){
        	        return this._Hc; 
        	    },
        	    setHc(sum){
        	        this._Hc=sum;
        	    },
        	    getGui(){
        	        return this._CraftGuide;
        	    },
        	    setGui(arr){
        	        this._CraftGuide=arr;
        	    },
        	    getPowerProduction(){
        	        if(this._uespower){
        	            let k=this.getGui()[this.getHc()]["input"]["power"];
        	           return k;
        	        }
        	        return 0;
        	        
        	    },
        	    acceptItem(source,item){
        	        try{
        	            if(this.items.get(item) >= this.getMaximumAccepted(item)) return false;
        	            let im=this.getGui()[this.getHc()]["input"]["items"];
        	          for(let i=0;i<im.length;i++)
        	            {//xx-xx/xx
        	              if(im[i].item==item) return true;
        	           }
        	           return false;
        	        }catch(e){print(e)}
        	        
        	    },
        	    _chickin(){
        	        let im=this.getGui()[this.getHc()]["input"]["items"];
        	        for(let i=0;i<im.length;i++)
        	            {//xx-xx/xx
        	              if(this.items.get(im[i].item)>=im[i].sum) return true;
        	           }
        	           return false;
        	    },
        	    _chickout(){
        	        let im=this.getGui()[this.getHc()]["output"]["items"];
        	        for(let i=0;i<im.length;i++)
        	            {//xx-xx/xx
        	              if(this.items.get(im[i].item)>=this.getMaximumAccepted(im[i].item)) return false;
        	           }
        	           return true;
                    
        	        
        	    },
        	    _chickpower(){
        	        let k=this.getGui()[this.getHc()]["input"]["power"];
        	        return this.power.graph.getPowerProduced()*60>k*-1||this.power.graph.getBatteryStored()>k*-1;
        	    },
        	    updateTile(){
        	        try{
        	        let ti=this.getGui()[this.getHc()]["input"]["time"];
        	        if(this.getcool()==null||isNaN(this.getcool())) this.setcool(0);
        	        this.setcool(this.getcool()+1);
        	        Vars.ui.showLabel(this.power.graph.getPowerProduced()*60+"/"+this.power.graph.getBatteryStored()+"|"+this.getGui()[this.getHc()]["input"]["power"]*-1,0.01,this.x,this.y);
        	        let im=this.getGui()[this.getHc()]["output"]["items"];
        	        for(let i=0;i<im.length;i++){
        	           if(this.items.get(im[i].item)>0){
        	                for(let k=0;k<this.items.get(im[i].item);k++) this.dump(im[i].item);
        	           }
        	        }
        	        if(this.getcool()>=ti){
        	            if(this._chickin()&&this._chickout()&&this._chickpower()){
        	                this.setcool(0);
        	                this._uespower=true;
        	                for(let i=0;i<im.length;i++){
        	                    this.items.add(im[i].item,im[i].sum);
        	                }
        	                im=this.getGui()[this.getHc()]["input"]["items"];
        	                for(let i=0;i<im.length;i++){
        	                    this.items.remove(im[i].item,im[i].sum);
        	                }
        	                return ;
        	            }
        	            
        	       }
        	        this._uespower=false;
        	        }catch(e){print(e)};
        	
        	    },
        	    buildConfiguration(table){
        	    try{
        	        let icon=Core.atlas.drawable("hydrogencore-info");
        	            icon.setMinHeight(100);
        	            icon.setMinWidth(100);
        	        table.button(icon, Styles.cleari, () => {
        	            try{
        	               let guide=this.getGui();
        	                let dialog=new Dialog("[orange]UI");
                               dialog.cont.pane(cons(t=>{
                                    t.add("多合成UI").row();
                                    t.image(this.block.fullIcon).row();
                                    for(let k=0;k<guide.length;k++){
                                        let mi=guide[k]["input"]["items"];
                                    for(let i=0;i<mi.length;i++){
        	                               t.image(mi[i].item.uiIcon);
        	                               t.add("X"+mi[i].sum+"  ");
        	                          }
        	                        t.add("=");
        	                        mi=guide[k]["output"]["items"];
                                    for(let i=0;i<mi.length;i++){
        	                               t.image(mi[i].item.uiIcon);
        	                               t.add("X"+mi[i].sum+"  ");
        	                          }
        	                        t.add("   time:"+guide[k]["input"]["time"]);
        	                        t.row();
                                    }
                                   })).row();
                                 dialog.cont.table(cons(t=>{
                                    
                                    t.button("@ok",()=>{
                                     dialog.hide();
                                  }).size(96,32)
                               }));
                          dialog.show();
        	            }catch(e){print(e)}
                           
                        });
        	        var a=this.getGui();
        	        for(let i=0;i<a.length;i++){
        	            let it=a[i];
        	            let k=i,r=this;
        	            let icon=Core.atlas.drawable(it.icon);
        	            icon.setMinHeight(100);
        	            icon.setMinWidth(100);
        	            table.button(icon, Styles.cleari, () => {
                           r.setHc(k);
                        });
        	        }
        	    }catch(e){
        	        print(e);
        	    }
        	        
                    
        	    }
        	    }
        	);
            return ent;	
    	}
    	block.consumesPower = false;
        block.outputsPower = true;
    	block.update=true;
        block.hasItems = true;
        block.hasLiquids = true;
        block.hasPower = true;
        return block;
    }
    
}