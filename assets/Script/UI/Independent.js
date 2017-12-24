var Project = require("Project");
cc.Class({
    extends: cc.Component,

    properties: {
        Main:cc.Node,
        platform:cc.Node,
        type:cc.Node,
        function:cc.Node,
        confirm:cc.Node,
        employee:cc.Node,
        pfview:cc.Node,
        typview:cc.Node,
        funview:cc.Node,
        emview:cc.Node,
        pfreq:cc.Node,
        typreq:cc.Node,
        funreq:cc.Node,
        emreq:cc.Node,
        pfres:cc.Node,
        typres:cc.Node,
        funres:cc.Node,
        budres:cc.Node,
        funpres:cc.Node,
        pfPrefab: cc.Prefab,
        typPrefab: cc.Prefab,
        funPrefab: cc.Prefab,
        emPrefab: cc.Prefab,
        pf_data:Object,
        typ_data:Object,
        fun_data:Object,
        em_data:Object,
        select_pf:0,
        select_em:[Object],
    },
    
    onload:function(){
    },

    pfchange:function()
    {
        if(this.project.platform_!=null){
            this.project.unsetPlatform(this.pf_data[this.select_pf]);
        }
        this.select_pf=this.pfview.getComponent(cc.PageView).getCurrentPageIndex();
        this.project.setPlatform(this.pf_data[this.select_pf]);
    },

    refresh:function()
    {
        this.pfchange();
        this.pfreq.getChildByName("budget").getComponent(cc.Label).string=Math.floor(this.project.budget_).toString();
        this.pfreq.getChildByName("funct").getComponent(cc.Label).string=Math.floor(this.project.requireFunction_).toString();
        this.pfreq.getChildByName("balance").getComponent(cc.Label).string=Math.floor((this.money-this.project.budget_)).toString();
        this.typreq.getChildByName("budget").getComponent(cc.Label).string=Math.floor(this.project.budget_).toString();
        this.typreq.getChildByName("funct").getComponent(cc.Label).string=Math.floor(this.project.requireFunction_).toString();
        this.typreq.getChildByName("balance").getComponent(cc.Label).string=Math.floor((this.money-this.project.budget_)).toString();
        this.funreq.getChildByName("budget").getComponent(cc.Label).string=Math.floor(this.project.budget_).toString();
        this.funreq.getChildByName("funct").getComponent(cc.Label).string=Math.floor(this.project.requireFunction_).toString();
        this.funreq.getChildByName("balance").getComponent(cc.Label).string=Math.floor((this.money-this.project.budget_)).toString();
        this.emreq.getChildByName("budget").getComponent(cc.Label).string=Math.floor(this.project.budget_).toString();
        this.emreq.getChildByName("funct").getComponent(cc.Label).string=Math.floor(this.project.requireFunction_).toString();
        this.emreq.getChildByName("balance").getComponent(cc.Label).string=Math.floor((this.money-this.project.budget_)).toString();
        this.pfres.getComponent(cc.Label).string=this.pf_data[this.select_pf].name_;
        this.typres.getComponent(cc.Label).string="";
        this.funres.getComponent(cc.Label).string="";
        for(var p=0;p<this.project.categories_.length;p++){
            this.typres.getComponent(cc.Label).string+=this.project.categories_[p].name_;
            this.typres.getComponent(cc.Label).string+=" ";
        }
        for(var p=0;p<this.project.functions_.length;p++){
            this.funres.getComponent(cc.Label).string+=this.project.functions_[p].name_;
            this.funres.getComponent(cc.Label).string+=" ";
        }
        this.budres.getComponent(cc.Label).string=Math.floor(this.project.getBudget()).toString();
        this.funpres.getComponent(cc.Label).string=Math.floor(this.project.requireFunction_).toString();
    },

    onEnable:function(){
        this.project=new Project();
        this.project.init(1);
        //获取数据
        var source=cc.find('Event/Game/Date/Account/PersonControl').getComponent("PersonControl");
        this.pf_data=source.getAvailablePlatforms();
        this.typ_data=source.getAvailableCategories();
        this.fun_data=source.getAvailableFunctions();
        this.em_data=source.getAvailablePersons();
        console.log(this.em_data);
        this.money=cc.find('Event/Game/Date/Account').getComponent("Account").getGold();
        var pf_l=this.pf_data.length;
        var typ_l=this.typ_data.length;
        var fun_l=this.fun_data.length;
        var em_l=this.em_data.length;
        for(var p=0;p<pf_l;p++)
        {
            var item = cc.instantiate(this.pfPrefab);
            item.getChildByName("name").getComponent(cc.Label).string=this.pf_data[p].name_;
            switch(this.pf_data[p].index_)
            {
                case 2:
                item.getComponent("devplat").loadImage("主界面");
                break;
                case 0:
                item.getComponent("devplat").loadImage("主界面新版");
                break;
                case 1:
                item.getComponent("devplat").loadImage("面板");
                break;
            }
            this.pfview.getComponent(cc.PageView).addPage(item);
        }
        for(var p=0;p<typ_l;p++)
        {
            var item = cc.instantiate(this.typPrefab);
            item.getComponent('devtype').index=p;
            item.getComponent('devtype').data=this.typ_data;
            item.getComponent('devtype').Independent=this;
            item.getComponent('devtype').project=this.project;
            item.getChildByName("money").getComponent(cc.Label).string="$"+this.typ_data[p].budget_.toString();
            item.getChildByName("name").getComponent(cc.Label).string=this.typ_data[p].name_;
            item.getChildByName("count").getComponent(cc.Label).string=this.typ_data[p].function_.toString();
            item.getChildByName("count_2").getComponent(cc.Label).string=this.typ_data[p].difficulty_.toString();
            this.typview.addChild(item);
        }
        for(var p=0;p<fun_l;p++)
        {
            var item = cc.instantiate(this.funPrefab);
            item.getComponent('devfunc').index=p;
            item.getComponent('devfunc').data=this.fun_data;
            item.getComponent('devfunc').Independent=this;
            item.getComponent('devfunc').project=this.project;
            item.getChildByName("money").getComponent(cc.Label).string="$"+this.fun_data[p].budget_.toString();
            item.getChildByName("name").getComponent(cc.Label).string=this.fun_data[p].name_;
            item.getChildByName("count").getComponent(cc.Label).string=this.fun_data[p].function_.toString();
            item.getChildByName("count_2").getComponent(cc.Label).string=this.fun_data[p].times_.toString();
            this.funview.addChild(item);
        }
        for(var p=0;p<em_l;p++)
        {
            var item = cc.instantiate(this.emPrefab);
            item.getComponent('devemp').index=p;
            item.getComponent('devemp').Independent=this;
            item.getChildByName("power").getComponent(cc.Label).string=this.em_data[p].power_.toString();
            item.getChildByName("name").getComponent(cc.Label).string=this.em_data[p].name_;
            /**
             *  cc.loader.loadRes("Image/图标_创意", cc.SpriteFrame, function (err, spriteFrame) {
                    item.getChildByName("image").getComponent(cc.Sprite).spriteFrame=spriteFrame;
                });
             */
            this.emview.addChild(item);
            this.select_em[p]=false;
        }
        this.refresh();

    },

    onDisable:function(){
        var allpages=this.pages.getComponent(cc.PageView).getPages();
        for(var i=0;i<allpages.length;i++){
            this.pfview.getComponent(cc.PageView).removePage(allpages[i]);
        }
        this.typview.removeAllChildren();
        this.funview.removeAllChildren();
        this.emview.removeAllChildren();
        this.select_typ.length=0;
        this.select_fun.length=0;
        this.select_em.length=0;
    },

    platform_next:function(){
        this.node.getChildByName("platform").active=false; // 关闭当前窗口
        this.node.getChildByName("type").active=true;      // 打开下一窗口
    },

    type_pre:function(){
        this.node.getChildByName("type").active=false;     // 关闭当前界面
        this.node.getChildByName("platform").active=true;  // 打开上一界面
    },

    type_next:function(){
        this.node.getChildByName("type").active=false;     // 关闭当前窗口
        this.node.getChildByName("function").active=true;      // 打开下一窗口
    },

    function_pre:function(){
        this.node.getChildByName("function").active=false;  
        this.node.getChildByName("type").active=true;       
    },

    function_next:function(){
        this.node.getChildByName("function").active=false; // 关闭当前窗口
        this.node.getChildByName("confirm").active=true;      // 打开下一窗口
    },

    confirm_pre:function(){
        this.node.getChildByName("confirm").active=false;  
        this.node.getChildByName("function").active=true;     
    },
    confirm_next:function(){
        this.node.getChildByName("confirm").active=false; // 关闭当前窗口
        this.node.getChildByName("employee").active=true;      // 打开下一窗口
    },

    employee_pre:function(){
        this.node.getChildByName("employee").active=false; 
        this.node.getChildByName("confirm").active=true; 
    },
    employee_next:function(){
        //开始开发
        var selected_em=[];
        for(var p=0;p<select_em.length;p++){
            if(select_em[p]){
                selected_em.push(this.em_data[p]);
            }
        }
        cc.find('Event/Game/Date/Account/PersonControl').getComponent("PersonControl").begin(this.project,selected_em);
        this.node.getChildByName("employee").active=false; // 关闭当前窗口
        this.Main.active=true;                 // 打开主界面
    },

    quit:function(event){
        event.target.parent.active = false; // 关闭当前界面
        this.Main.active=true;
    }
});
