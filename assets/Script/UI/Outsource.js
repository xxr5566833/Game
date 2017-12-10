cc.Class({
    extends: cc.Component,

    properties: {
        LeftToggles:cc.ToggleGroup,
        
    },

    onEnable: function () {
        this.projects; // 抛事件得到可选项目
        show(null,0);
    },

    show :function(toggle,id) {    // 选择项目触发,显示具体信息
        this.select=id;
    },

    accept :function(){ // 接受当前所选项目

        this.quit();
    },

    quit :function(){   
        this.node.active=false;     // 关闭当前界面
        this.LeftToggles.node.active=true;  // 打开左侧按钮
    }
});
