var project=require('Project');
cc.Class({
    extends: cc.Component,

    properties: {
        projects_:{
            default: [],
            type:[cc.Prefab],
            visible:false,
        },
        projs_:{
            default: [],
            type:[Object],
        },
        availableList_:{
            default: [],
            type:[cc.Integer],
            visible:false,
        },

        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization

    init:function(projs){
        this.projs_=projs;
        this.availableList_ = [0, 1, 2, 3];
        this.updateAll();
    },
    onLoad: function () {
        
        //这里会onload两次，不知道为啥
    },

    failProject:function(project){
        event=new cc.Event.EventCustom('CREDITCHANGE', true);
        event.detail.change = -2;
        this.node.dispatchEvent(event);
        event=new cc.Event.EventCustom('MESSAGE', true);
        event.detail.id = 'consignprojectfail';
        this.node.dispatchEvent(event);
    },

    finishProject:function(project){
        event=new cc.Event.EventCustom('MONEYADD', true);
        event.detail.money=project.reward_;
        event.detail.record = "委托任务完成";
        this.node.dispatchEvent(event);
        event=new cc.Event.EventCustom('CREDITCHANGE', true);
        event.detail.change = 1;
        this.node.dispatchEvent(event);
        event=new cc.Event.EventCustom('MESSAGE', true);
        event.detail.id = 'consignprojectfinish';
        this.node.dispatchEvent(event);
        this.updateAvailable(project.getIndex());
    },

    updateAll:function(){
        //三个任务都更新,目前假设 只有3个任务
        var num = 3;
        var choose = [];
        var i = 0;
        while(i < 3){
            var randomnum = Math.floor(cc.random0To1() * this.availableList_.length);
            if(choose.indexOf(randomnum) == -1){
                ++i;
                choose.push(randomnum);
            }
        }
        for(let j = 0; j < num; ++j)
        {
            var proj = new project();
            var index = this.availableList_[choose[j]];
            for(let k = 0; k < this.projs_.length; ++k)
            {
                if(this.projs_[k].index == index){
                    proj.init(this.projs_[k]);
                    this.projects_[j] = proj;
                    break;
                }
            }
        }
    },

    getProjects:function(){
        return this.projects_;
    },
    pause:function(){
        this.unschedule(this.changeRequire);
    },
    resume:function(time){
        this.schedule(this.changeRequire, time);
    },
    changeRequire:function(){
        var pc = cc.find('Company/PersonControl').getComponent('PersonControl');
        var pcproj = pc.getProject();
        if(pc.isWorking() && pcproj.currentUi_ != 0 && pcproj.currentFunc_ != 0){
            var temp = Math.random();
            if(temp <= 0.015 * (8 - pcproj.level_)){
                this.msgBoxControl.alert('FAIL','改动了需求,损失开发点数');
                pcproj.currentUi_ = pc.project_.currentUi_ * 0.8;
                pcproj.currentFunc_ = pc.project_.currentFunc_ * 0.8;
            }
        }
    },

    updateAvailable:function(index){
        if(this.projs_[index].unlock){
            return; 
        }
        
        this.projs_[index].unlock = true;
        for(let i = 0; i < this.projs_.length; i++){
            //如果availableList里已经有了这个project的index，那么已经可用了，那么就跳过
            if(this.availableList_.indexOf(this.projs_[i].index) != -1){
                continue;
            }
            var list = this.projs_[i].unlockRequire;
            var available = true;
            for(let j = 0; j < list.length; ++j)
            {
                available = available && (this.availableList_.indexOf(list[j]) != -1) && this.projs[list[j]].unlock;
            }
            if(available){
                event=new cc.Event.EventCustom('MEAASGE', true);
                event.detail.id = 'consignprojectunlock';
                this.node.dispatchEvent(event);
                this.availableList_.push(this.projs_[i].index);
                return ;
            }
        }
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
