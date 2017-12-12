cc.Class({
    extends: cc.Component,

    properties: {
        SprDetail: cc.Sprite,
        LabName:cc.Label,
        LabLv:cc.Label,
        LabCost:cc.Label,
        LabPre:cc.Label,
        LabEffect:cc.Label,
        LabS:cc.Label,
    },

    // use this for initialization
    onLoad: function () {
        this.SprDetail.node.active=false;   
        this.toggles = this.node.getComponentsInChildren(cc.Toggle);
    },

    show: function(toggle,id){
        if(toggle.isChecked==false)
            this.SprDetail.node.active=false;
        else
            this.SprDetail.node.active=true;
        var info = cc.find("Event\Game\Date\Account\Research").getComponent("Research").show();
        this.LabName.string = info.name;
        this.LabLv.string = info.lv;
        this.LabEffect.string = info.effect;
        this.LabCost.string = info.cost;
        this.LabPre.string = info.pre;
        this.select = id;
    },

    unlock: function(event){
        var ret =  cc.find("Event\Game\Date\Account\Research").getComponent("Research").unlock(this.select);
        if(ret==0){
            console.log("解锁成功");
            var info = cc.find("Event\Game\Date\Account\Research").getComponent("Research").show();
            this.LabLv.string = info.lv;
            this.LabCost.string = info.cost;
        }
        else if(ret==1){
            console.log("科研点数不够升级")
        }
        else if(ret==3){
            console.log("该科研等级已达最高")
        }
    },

    update:function(){
        this.LabS.string = parseInt(cc.find("Event\Game\Date\Account\Research").getComponent("Research").S_).toString();
    }
});
