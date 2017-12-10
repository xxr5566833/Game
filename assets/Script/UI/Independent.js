cc.Class({
    extends: cc.Component,

    properties: {
        LeftToggles:cc.ToggleGroup,
        platform:cc.Node,
        type:cc.Node,
        function:cc.Node,
        technology:cc.Node,
        confirm:cc.Node,
        employee:cc.Node
    },

    platform_next:function(){
        this.node.getChildByName("platform").active==false; // 关闭当前窗口
        this.node.getChildByName("type").active==true;      // 打开下一窗口
    },

    type_pre:function(){
        this.node.getChildByName("type").active==false;     // 关闭当前界面
        this.node.getChildByName("platform").active==true;  // 打开上一界面
    },
    type_next:function(){
        this.node.getChildByName("type").active==false;     // 关闭当前窗口
        this.node.getChildByName("function").active==true;      // 打开下一窗口
    },

    function_pre:function(){
        this.node.getChildByName("function").active==false;  
        this.node.getChildByName("type").active==true;       
    },
    function_next:function(){
        this.node.getChildByName("function").active==false; // 关闭当前窗口
        this.node.getChildByName("technology").active==true;      // 打开下一窗口
    },

    technology_pre:function(){
        this.node.getChildByName("technology").active==false;  
        this.node.getChildByName("function").active==true;     
    },
    technology_next:function(){
        this.node.getChildByName("technology").active==false; // 关闭当前窗口
        this.node.getChildByName("confirm").active==true;      // 打开下一窗口
    },

    confirm_pre:function(){
        this.node.getChildByName("confirm").active==false;  
        this.node.getChildByName("technology").active==true;     
    },
    confirm_next:function(){
        this.node.getChildByName("confirm").active==false; // 关闭当前窗口
        this.node.getChildByName("employee").active==true;      // 打开下一窗口
    },

    employee_pre:function(){
        this.node.getChildByName("employee").active==false; 
        this.node.getChildByName("confirm").active==true; 
    },
    employee_next:function(){
        this.node.getChildByName("employee").active==false; // 关闭当前窗口
        this.LeftToggles.node.active==true;                 // 打开左侧按钮
    },

    quit:function(event){
        event.target.parent.active = false; // 关闭当前界面
        this.LeftToggles.node.active==true; // 打开左侧按钮
    }
});
