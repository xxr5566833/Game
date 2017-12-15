cc.Class({
    extends: cc.Component,

    properties: {
        Outsource: cc.Node,
        Independent:cc.Node,
        Hire:cc.Node,
        Fire:cc.Node,
        Research:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad :function() {
        this.toggles = this.node.getComponentsInChildren(cc.Toggle);
    },

    showMenu :function(toggle) {    // 点击左侧toggle触发

        console.log(toggle);
        for(var t in this.toggles){
            if(this.toggles[t].node.getChildByName("Menu"))
            {
                this.toggles[t].node.getChildByName("Menu").active==false;    // 关闭已打开的toggle菜单
            }
        }
        toggle.node.getChildByName("Menu").active=toggle.isChecked; // 打开或关闭当前toggle下的菜单
    },

    research_toggle:function(toggle){
        toggle.isChecked=false;
        this.node.active = false;    
        this.Research.active = true;
    },

    outsource_btn :function(event) {
        event.target.parent.active = false;     // 关闭菜单界面
        for(var t in this.toggles)
            this.toggles[t].isChecked=false;
        this.node.active = false;               // 关闭左侧按钮
        console.log(this.Outsource.active);

        this.Outsource.active = true;     // 打开委托界面
        console.log("已经打开");
    },

    independent_btn :function(event) {
        event.target.parent.active = false;     // 关闭菜单界面
        for(var t in this.toggles)
            this.toggles[t].isChecked=false;
        this.node.active = false;               // 关闭左侧按钮
        this.Independent.active = true;     // 打开独立开发界面
    },

    hire_btn :function(event) {
        event.target.parent.active = false;     // 关闭菜单界面
        for(var t in this.toggles)
            this.toggles[t].isChecked=false;
        this.node.active = false;               // 关闭左侧按钮
        this.Hire.active = true;           // 打开雇佣界面
    },

    fire_btn :function(event) {
        event.target.parent.active = false;     // 关闭菜单界面
        for(var t in this.toggles)
            this.toggles[t].isChecked=false;
        this.node.active = false;               // 关闭左侧按钮
        this.Fire.active = true;           // 打开解雇界面
    }
});
