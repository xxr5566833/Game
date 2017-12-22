cc.Class({
    extends: cc.Component,

    properties: {
        Main:cc.Node,
        ToggleGroup:cc.Node,
        SprDetail: cc.Sprite,
        LabName:cc.Label,
        LabLv:cc.Label,
        LabCost:cc.Label,
        LabPre:cc.Label,
        LabEffect:cc.Label,
        LabS:cc.Label,
    },

    // use this for initialization
    onLoad: function(){
        this.toggles = this.ToggleGroup.getComponentsInChildren(cc.Toggle);    // 返回Toggle数组
    },

    onEnable: function () {
        this.SprDetail.node.active=false;  
        for (let index = 0; index < this.toggles.length; index++) {
            if(cc.find("Event/Game/Date/Account/Research").getComponent("Research").check(index+1)==false)
                this.toggles[index].node.active=false;
        } 
    },

    show: function(toggle,id){
        this.SprDetail.node.active=toggle.isChecked;
        var info = cc.find("Event/Game/Date/Account/Research").getComponent("Research").show(id);
        this.LabName.string = info.name;
        this.LabLv.string = info.lv;
        this.LabEffect.string = info.effect;
        this.LabCost.string = info.cost;
        this.LabPre.string = info.pre;
        this.select = id;
    },

    unlock: function(event){
        var ret =  cc.find("Event/Game/Date/Account/Research").getComponent("Research").unlock(this.select);
        if(ret==0){
            console.log("解锁成功");
            var info = cc.find("Event/Game/Date/Account/Research").getComponent("Research").show();
            this.LabLv.string = info.lv;
            this.LabCost.string = info.cost;
        }
        else if(ret==1){
            console.log("科研点数不够升级")
        }
        else if(ret==2){
            console.log("该科研等级已达最高")
        }
    },

    update:function(){
        this.LabS.string = parseInt(cc.find("Event/Game/Date/Account/Research").getComponent("Research").S_).toString();
    },

    quit :function(event){   
        this.node.active=false;   // 关闭当前界面
        this.Main.active=true;  
    }
});
