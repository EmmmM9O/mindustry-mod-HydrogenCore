module.exports = {
    init(blocks,Name,addon){
        const block = extend(MessageBlock, Name, {});
        block.buildType = () => {
            let NeedBlock=blocks;
        	const ent = extend(MessageBlock.MessageBuild, block, Object.assign({
            	_isShow:true,
            	_BuildOk:false,
            	_buildTick:0,
            	_StructureData:{},
            	setData(a){
            	    this._StructureData=a;
            	},
            	getData(){
            	    return this._StructureData;
            	},
            	setTick(a){
            	    this._buildTick=a;
            	},
            	getTick(){
            	    return this._buildTick;
            	},
            	turnShow(){
            	    this._isShow=!this._isShow;
            	},
            	getShow(){
            	    return this._isShow;
            	},
            	setOk(b){
            	    this._BuildOk=b;
            	},
            	getOk(){
            	    return this._BuildOk;
            	},
            	draw(){
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
            	},
            	
            	_buildStructure(){
            	    try{
            	        for(let i in NeedBlock){ 
            	            let block=NeedBlock[i];
            	            let tile=Vars.world.tile(this.x/8+block.x,this.y/8+block.y);
            	            if(tile.build==null||tile.block()!=block.block) return false;
            	        }
            	        return true;
            	    }catch(e){print("from build:"+e);return false}
            	    
            	},
            	StructureUpdate(){
            	
            	},
            	updateTile(){
            	    try{
            	        if(this.getOk()){
            	            this.setTick(this.getTick()+1);
            	            if(this.getTick()>=60) {
            	                this.setTick(0);
            	                this.setOk(this._buildStructure());
            	            }
            	            this.StructureUpdate();
            	        }
            	    }catch(e){
            	        print("from update:"+e);
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
            	            }else Vars.ui.showLabel("[red]构造失败",1.2,this.x,this.y);
            	        });
            	    }catch(e){print(e)};
            	}
        	    
          },addon));
        return ent;
    };
    block.update=true;
    return block;
}}