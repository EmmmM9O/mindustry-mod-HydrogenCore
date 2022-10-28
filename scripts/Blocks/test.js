
const test = extend(GenericCrafter, "test", {
    testt:114
});
test.localizedName = "test";
test.buildType = prov(() => {
    var tick=0;
    return new JavaAdapter(GenericCrafter.GenericCrafterBuild, {
    shouldConsume(){return true},
    updateTile(){
         try{
         tick++;
         this.dump(Items.copper);
        Vars.ui.showLabel(tick,0.01,this.x,this.y);
      }catch(e){print(e)};
            
      }
    }, test);
});
test.health = 70;
test.buildVisibility = BuildVisibility.shown;
test.category = Category.crafting;