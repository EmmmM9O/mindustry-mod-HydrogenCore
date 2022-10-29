const Structure=require("Type/Structure")
module.exports = {
    init(blocks,Name,addon,guide){
        Structure.init(blocks,Name,Object.assign({
            _isShow:true,
            _guide:guide,
            _KeyBlocks:[],
            _MaxC:100,
            getMaxc(){
                return this._MaxC;
            },
            getIncludeData(){
                return this._IncludeData;
            },
            setIncludeData(type,to,data){
                this._IncludeData[type][to]=data;
            },
            setIncludeData2(type,data){
                this._IncludeData[type]=data;
            },
            resetKeyBlocks(){
                this._KeyBlocks=[];
            },
            pushKeyBlocks(w){
                this._KeyBlocks.push(w);
            },
            getKeyBlocks(){
                return this._KeyBlocks;
            },
            getguide(){
                return this._guide;
            },
            setguide(a){
                this._guide=a;
            },
            initt(){
                this.setData({item:{},
                liquid:{},
                power:0});
                let w1=this.getData();let w=w1;
                let guide=this.getguide();
                for(let i in guide.item){
            	    let it=guide.item[i];
            	    w.item[it]=0;
            	}
            	w.power=0;
            	this.setData(w);
            },
            draw(){
            let NeedBlock=this.getNeedB();
                    this.super$draw();
            	    if(this.getShow()){
            	    try{
            	        Draw.color(Color.slate);
            	        Draw.alpha(0.65);
            	        for(let i in NeedBlock){ 
            	            let block=NeedBlock[i];
            	            let x=this.x+block.x*8;let y=this.y+block.y*8;
            	            let tile=Vars.world.tile(this.x/8+block.x,this.y/8+block.y);
            	            if(tile.build==null||tile.block()!=block.block){
            	                if(tile.build!=null&&block.block!=tile.block()) Draw.color(Color.red);
            	                Draw.rect(block.block.fullIcon,x,y,block.block.size*8,block.block.size*8);
            	                Draw.color(Color.slate);
            	            }
            	            
            	            //Vars.ui.showLabel(block.block.emoji(),0.01,x,y);
            	        }
            	        Draw.color(Color.white)
            	    }catch(e){print("from draw:"+e)};  
            	    }
            	
            	if(this.getOk()){
            	    let guide=this.getguide();
            	    let str="";
            	    for(let i in guide.item){
            	        let it=guide.item[i]; 
            	        str+=it+":"+this.getData().item[it]+"\n";
            	    }
            	    str+="电"+":"+Math.floor(this.getData().power)+"\n";
            	    Vars.ui.showLabel(str,0.01,this.x,this.y);
            	}
            },
            StructureUpdate(){
                let KeyBlocks=this.getKeyBlocks();
            	for(let i in KeyBlocks){
            	    let block=KeyBlocks[i];
            	    if(block.getMode().Mode=="input"){
            	        let now;
            	        if(block.getMode().Type=="power"){
            	            let w=this.getData();
            	            
            	            now=this.getData().power;
            	            let need=this.getMaxc()-now;
            	            w.power=block.chickIn(need)+now;
            	            this.setData(w);
            	        } 
            	        else if(block.getMode().Type!=null&&block.getMode().out!=null){
            	            now=this.getData()[block.getMode().Type][block.getMode().out];
            	            
            	            let need=this.getMaxc()-now;
            	            let w=this.getData();w[block.getMode().Type][block.getMode().out]=block.chickIn(need)+now;
            	            this.setData(w);
            	        }
            	    }
            	    
            	}
            	
            	},
            buildConfiguration(table){
            	    try{
            	        table.button("Show", () => {
            	            this.turnShow();
            	        });
            	        table.button("build", () => {
            	            if(this._buildStructure()){
            	                Vars.ui.showLabel("[acid]构造成功",1.2,this.x,this.y);
            	                this.setOk(true);
            	                this.resetKeyBlocks();
            	                let NeedBlock=this.getNeedB();
            	                for(let i in NeedBlock){ 
            	                   let block=NeedBlock[i];
            	                   let tile=Vars.world.tile(this.x/8+block.x,this.y/8+block.y);
            	                   let bu=tile.build;
            	                   if(bu.setdata!=null){
            	                        bu.setdata(this.getguide());
            	                        this.pushKeyBlocks(bu);
            	                   }
            	                }
            	                this.initt();
            	            }else Vars.ui.showLabel("[red]构造失败",1.2,this.x,this.y);
            	        });
            	    }catch(e){print(e)};
            	}
        },addon))
    }
}