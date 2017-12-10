cc.Class({
    extends: cc.Component,

    properties: {
        SprDetail: cc.Sprite,
        LabName:cc.Label,
        LabLv:cc.Label,
        LabCost:cc.Label,
        LabPre:cc.Label,
        LabEffect:cc.Label,
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
        var event = new EventCustom("GETRESEARCH",true);  
        this.node.dispatchEvent(event);
        var info = event.detai.back;
        this.LabName.string = info.name;
        this.LabLv.string = info.lv;
        this.LabEffect.string = info.effect;
        this.LabCost.string = info.cost;
        this.LabPre.string = info.pre;
    },

    unlock: function(event){
        var event = new EventCustom("UNLOCK",true);  
        this.node.dispatchEvent(event);
        var ret = event.detai.back; // 根据返回值产生不同的界面信息

        
    }
});
