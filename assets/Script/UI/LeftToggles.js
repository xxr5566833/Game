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

        console.log(this.toggles);
        for(var t in this.toggles){
            t.node.getChildByName("Menu").active==false;    // 关闭已打开的toggle菜单
        }
        toggle.node.getChildByName("Menu").active=toggle.isChecked; // 打开或关闭当前toggle下的菜单
    },

    research_toggle:function(toggle){
        toggle.isChecked=false;
        this.node.active = false;    
        this.Research.node.active = true;
    },

    outsource_btn :function(event) {
        event.target.parent.active = false;     // 关闭菜单界面
        for(var t in this.toggles)
            t.isChecked=false;
        this.node.active = false;               // 关闭左侧按钮
        this.Outsource.node.active = true;     // 打开委托界面
    },

    independent_btn :function(event) {
        event.target.parent.active = false;     // 关闭菜单界面
        for(var t in this.toggles)
            t.isChecked=false;
        this.node.active = false;               // 关闭左侧按钮
        this.Independent.node.active = true;     // 打开独立开发界面
    },

    hire_btn :function(event) {
        event.target.parent.active = false;     // 关闭菜单界面
        for(var t in this.toggles)
            t.isChecked=false;
        this.node.active = false;               // 关闭左侧按钮
        this.Hire.node.active = true;           // 打开雇佣界面
    },

    fire_btn :function(event) {
        event.target.parent.active = false;     // 关闭菜单界面
        for(var t in this.toggles)
            t.isChecked=false;
        this.node.active = false;               // 关闭左侧按钮
        this.Fire.node.active = true;           // 打开解雇界面
    }
});
