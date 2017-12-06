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
        this.platForm_ = platform;
        this.budget_ += platform.budget_;
    },

    addFunction:function(func){
        this.functions_.push[func];
        this.requireFunction_ += func.function_;
    },

    addTech:function(tech){
        this.techs_.push[tech];
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

    updateM:function(t){
        var cur=this.getCurrent();
        var F=cur.function;
        var E=cur.entertainment;
        var P=cur.performance;
        var I=cur.innovation;
        if(this.m_==0){
            this.m_ = Math.sqrt(7*E + 3*P) *F *(t + Math.sqrt(I))/t;
            this.m_=this.m_*this.getExpectPrice()/this.price_;
        }
    },

    getM:function(){
        returnthis.m_;
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
