var project=require('Project');
cc.Class({
    extends: cc.Component,

    properties: {

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
        
    },

    failProject:function(project){
        var event=new cc.Event.EventCustom('CREDITCHANGE', true);
        event.change = -2;
        this.node.dispatchEvent(event);
        event=new cc.Event.EventCustom('MESSAGE', true);
        event.id = 7;
        this.node.dispatchEvent(event);
    },

    finishProject:function(project){
        var event=new cc.Event.EventCustom('MONEYADD', true);
        event.money=project.reward_;
        event.record = "委托任务完成";
        this.node.dispatchEvent(event);
        event=new cc.Event.EventCustom('CREDITCHANGE', true);
        event.change = 1;
        this.node.dispatchEvent(event);
        event=new cc.Event.EventCustom('MESSAGE', true);
        event.id = 6;
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
        this.projects_ = [];
        for(let j = 0; j < num; ++j)
        {
            var proj = new project();
            var index = this.availableList_[choose[j]];
            for(let k = 0; k < this.projs_.length; ++k)
            {
                if(this.projs_[k].index_ == index){
                    proj.init(0, this.projs_[k]);
                    proj.node = this.node;
                    this.projects_[j] = proj;
                    break;
                }
            }
        }
    },

    getProjects:function(){
        console.log(this.projects_);
        return this.projects_;
    },

    updateAvailable:function(index){
        if(this.projs_[index].unlock_){
            return; 
        }
        
        this.projs_[index].unlock_ = true;
        for(let i = 0; i < this.projs_.length; i++){
            //如果availableList里已经有了这个project的index，那么已经可用了，那么就跳过
            if(this.availableList_.indexOf(this.projs_[i].index) != -1){
                continue;
            }
            var list = this.projs_[i].unlockRequire_;
            var available = true;
            for(let j = 0; j < list.length; ++j)
            {
                available = available && (this.availableList_.indexOf(list[j]) != -1) && this.projs[list[j]].unlock_;
            }
            if(available){
                event=new cc.Event.EventCustom('MEAASGE', true);
                event.id = 8;
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
