cc.Class({
    extends: cc.Component,

    properties: {
        LeftToggles:cc.ToggleGroup,
        platform:cc.Node,
        type:cc.Node,
        function:cc.Node,
        confirm:cc.Node,
        employee:cc.Node,
        pages:cc.Node,
        typelist:cc.Node,
        funclist:cc.Node,
        emlist:cc.Node,
        typereq:cc.Node,
        funcreq:cc.Node,
        emreq:cc.Node,
        background:cc.Node,
        budget:cc.Integer,
        money:cc.Integer,
        targetfunc:cc.Integer,
        select_pf:cc.Integer,
        select_typ:[cc.Integer],
        select_fun:[cc.Integer],
        select_em:[cc.Integer],
        pfPrefab: cc.Prefab,
        typPrefab: cc.Prefab,
        funPrefab: cc.Prefab,
        emPrefab: cc.Prefab,
    },

    refresh:function()
    {
        
    },

    onEnable:function(){
        //获取数据
        var source=cc.find('Event/Game/Date/Account/PersonControl').getComponent("PersonControl");
        var pf_data=source.getAvailablePlatforms();
        var typ_data=source.getAvailableCategories();
        var fun_data=source.getAvailableFunctions();
        var em_data=source.getAvailablePersons();
        var pf_l=pf_data.name_.length;
        var typ_l=typ_data.name_.length;
        var fun_l=fun_data.name_.length;
        var em_l=em_data.name_.length;
        for(var p=0;p<pf_l;p++)
        {
            var item = cc.instantiate(this.pfPrefab);
            switch(pf_data.name_[p])
            {
                case "客户端":
                item.getChildByName("name").getComponent(cc.Label).String="客户端";
                cc.loader.loadRes("Image/图标_创意", cc.SpriteFrame, function (err, spriteFrame) {
                    item.getChildByName("image").getComponent(cc.Sprite).spriteFrame=spriteFrame;
                });
                break;
                case "网站":
                item.getChildByName("name").getComponent(cc.Label).String="网站";
                cc.loader.loadRes("Image/图标_创意", cc.SpriteFrame, function (err, spriteFrame) {
                    item.getChildByName("image").getComponent(cc.Sprite).spriteFrame=spriteFrame;
                });
                break;
                case "跨平台":
                item.getChildByName("name").getComponent(cc.Label).String="跨平台";
                cc.loader.loadRes("Image/图标_创意", cc.SpriteFrame, function (err, spriteFrame) {
                    item.getChildByName("image").getComponent(cc.Sprite).spriteFrame=spriteFrame;
                });
                break;
                this.pages.addpage(item);
            }
        }
        for(var p=0;p<typ_l;p++)
        {
            var item = cc.instantiate(this.typPrefab);
            item.getChildByName("money").getComponent(cc.Label).String="$"+typ_data.budget_[p].toString();
            item.getChildByName("name").getComponent(cc.Label).String=typ_data.name_[p];
            item.getChildByName("count").getComponent(cc.Label).String=typ_data.function_[p].toString();
            item.getChildByName("count_2").getComponent(cc.Label).String=typ_data.difficulty_[p].toString();
            this.typelist.addChild(item);
        }
        for(var p=0;p<fun_l;p++)
        {
            var item = cc.instantiate(this.funPrefab);
            item.getChildByName("money").getComponent(cc.Label).String="$"+fun_data.budget_[p].toString();
            item.getChildByName("name").getComponent(cc.Label).String=fun_data.name_[p];
            item.getChildByName("count").getComponent(cc.Label).String=fun_data.function_[p].toString();
            item.getChildByName("count_2").getComponent(cc.Label).String=fun_data.function_[p].toString();
            this.funclist.addChild(item);
        }
        for(var p=0;p<em_l;p++)
        {
            var item = cc.instantiate(this.typPrefab);
            item.getChildByName("power").getComponent(cc.Label).String=em_data.power_[p].toString();
            item.getChildByName("name").getComponent(cc.Label).String=em_data.name_[p];
            /**
             *  cc.loader.loadRes("Image/图标_创意", cc.SpriteFrame, function (err, spriteFrame) {
                    item.getChildByName("image").getComponent(cc.Sprite).spriteFrame=spriteFrame;
                });
             */
            this.emlist.addChild(item);
        }

    },

    onDisable:function(){

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
        this.node.getChildByName("confirm").active==true;      // 打开下一窗口
    },

    confirm_pre:function(){
        this.node.getChildByName("confirm").active==false;  
        this.node.getChildByName("function").active==true;     
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
