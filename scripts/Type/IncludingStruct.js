const Structure=require("Type/Structure")
module.exports = {
    init(blocks,Name,addon,guide){
        Structure.init(blocks,Name,Object.assign({
            _guide:guide,
            _KeyBlocks:[],
            resetKeyBlocks(){
                this._KeyBlocks=[];
            },
            pushKeyBlocks(w){
                this._KeyBlocks.push(w);
            },
            getKeyBlocks(w){
                return this._KeyBlocks;
            },
            getguide(){
                return this._guide;
            },
            setguide(a){
                this._guide=a;
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
            	            }else Vars.ui.showLabel("[red]构造失败",1.2,this.x,this.y);
            	        });
            	    }catch(e){print(e)};
            	}
        },addon))
    }
}