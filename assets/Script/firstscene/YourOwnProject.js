var Project = require("Project");
cc.Class({
    extends: Project,

    properties: {
        platform_:{
            default:null,
            type:Object,
        },
        functions_:{
            default:[],
            type:[Object],
        },
        techs_:{
            default:[],
            type:[Object],
        },
        budget_:0.,
        publishDay_:0,
        price_:0.,
        m_:0.,
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

    isOverdue:function(){
        return false;
    },

    setPlatform:function(platform){
        this.platform_ = platform;
        this.budget_ += platform.budget_;
        this.difficulty_ += platform.difficulty_;
    },

    unsetPlatform : function()
    {
        this.budget_ -= this.platform_.budget_;
        this.difficulty_ -= this.platform_.difficulty_;
        this.platform = null;
    },

    addFunction:function(func){
        this.functions_.push[func];
        this.requireFunction_ += func.function_;
        this.difficulty_ += func.difficulty_;
    },

    subFunction:function(func){
        for(let i = 0 ; i < this.functions_.length ; i++)
        {
            var tempfunc = this.functions_[i];
            if(tempfunc.name_ == func.name_)
            {
                this.difficulty_ -= tempfunc.difficulty_;
                this.requireFunction_ -= tempfunc.function_;
                this.functions_.splice(i, 1);
                return ;
            }
        }
    },

    subAllFunction:function(){
        for(let i = 0 ; i < this.functions_.length ; i++)
        {
            var tempfunc = this.functions_[i];
            this.difficulty_ -= tempfunc.difficulty_;
            this.requireFunction_ -= tempfunc.function_;
        }
        this.functions_ = [];
    },

    addTech:function(tech){
        this.techs_.push[tech];
        this.difficulty_ += tech.difficulty_;
        this.budget_ += tech.budget_;
    },

    subTech:function(tech){
        for(let i = 0 ; i < this.techs_.length ; i++)
        {
            var temptech = this.techs_[i];
            if(temptech.name_ == tech.name_)
            {
                this.difficulty_ -= temptech.difficulty_;
                this.budget_ -= temptech.budget_;
                this.techs_.splice(i, 1);
                return ;
            }
        }
    },

    subAllTech:function(){
        for(let i = 0 ; i < this.techs_.length ; i++)
        {
            var temptech = this.techs_[i];
            this.difficulty_ -= temptech.difficulty_;
            this.budget_ -= temptech.budget_;
        }
        this.techs_ = [];
    },

    init:function(platform,categories,funcs,name,techs){
        this.setPlatform(platform);
        for(let i=0;i<categories.length;i++){
            this.addCategory(categories[i]);
        }

        for(let i=0;i<funcs.length;i++){
            this.addFunction(funcs[i]);
        }

        for(let i=0;i<techs.length;i++){
            this.addTech(techs[i]);
        }
        this.setName(name);
        event=new cc.Event.EventCustom('GETDATE', true);
        this.node.dispatchEvent(event);
        this.setReceiveDay(event.detail.back);
    },

    setPublishDay:function(day){
        this.publishDay_ = day;
    },

    getPublishDay:function(){
        return this.publishDay_;
    },

    getExpectPrice:function(){
        var cur=this.getCurrent();
        var F=cur.function;
        return F*F/1000;
    },

    setPrice:function(price){
        this.price_ = price;
    },

    updateM:function(t, burstbugs){
        var cur=this.getCurrent();
        var F=cur.function;
        var E=cur.entertainment;
        var P=cur.performance;
        var I=cur.innovation;
        if(this.m_==0){
            this.m_ = Math.sqrt(7*E + 3*P) *F *(t + Math.sqrt(I))/t;
            this.m_=this.m_*this.getExpectPrice()/this.price_;
        }
        else{
            var rate = 1.;
            for(var i = 0 ; i < burstbugs.length ; i++)
            {
                switch(burstbugs[i])
                {
                    case 0:
                        rate = rate * 0.8;
                        break;
                    case 1 :
                        rate = rate * 0.5;
                        break;
                    case 2 :
                        rate = rate *0.2;
                        break;
                }
            }
            //这里还缺少f(p,t)
            this.m_ = rate * this.m_ ;
        }
    },

    getM:function(){
        return this.m_;
    },

    getTimeFromPublish:function(nowday){
        return nowday - this.publishDay_;
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
