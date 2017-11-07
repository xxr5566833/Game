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
    onLoad: function () {
        cc.loader.loadRes('personinfo',function(err,data){
            if(err){
                cc.log(err);
            }else{
                var persong=cc.find('PersonGenerator').getComponent('PersonGenerator');
                persong.init(data);
            }
        });
        cc.loader.loadRes('projectinfo',function(err,data){
            if(err){
                cc.log(err);
            }else{
                var projectg=cc.find('ProjectGenerator').getComponent('ProjectGenerator');
                projectg.init(data);
            }
        });
        // 开启重复处理事件
        cc.find("Company/PersonControl").getComponent("PersonControl").resume(); 
        cc.find("Date").getComponent("Date").resume(); 
    },
    init:function(){
        cc.loader.loadRes('personinfo',function(err,data){
            if(err){
                cc.log(err);
            }else{
                console.log(data);
                this.persons=data;
            }
        },this);
        cc.loader.loadRes('projectinfo',function(err,data){
            if(err){
                cc.log(err);
            }else{
                console.log(data);
                this.projects=data;
            }
        },this);
        console.log(this.persons);
        console.log(this.projects);
        var persong=cc.find('PersonGenerator').getComponent('PersonGenerator');
        persong.init(this.persons);
        var projectg=cc.find('ProjectGenerator').getComponent('ProjectGenerator');
        console.log(this.projects);
        projectg.init(this.projects);
    },
    pause:function(){
        cc.director.pause();
        cc.log("暂停");
    },
    resume:function(){
        cc.director.resume();
        cc.log("继续");
    },

});
