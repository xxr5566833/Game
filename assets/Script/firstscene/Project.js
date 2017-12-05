var projectstate=require('global').projectState;
var datepath=require('global').datePath;
var projectstate = require("global").projectState
var eAttri = cc.Enum({ function : 0, performance : 1, entertainment : 2, innovative : 3, });
var eBug = cc.Enum({ low : 0, mid : 1, high: 2, });
cc.Class({
    extends: cc.Component,

    properties: {
        //cocos creator对于自己定义的复杂类型不支持，所以这里分开写了
        requireEntertainment_:{
            visible:false,
            default:0.,
        },
        
        currentEntertainment_:{
            visible:false,
            default:0.,
        },

        requireFunction_:{
            visible:false,
            default:0.,
        },

        currentFunction_:{
            visible:false,
            default:0.,
        },

        requireInnovation_:{
            visible:false,
            default:0.,
        },

        currentInnovation_:{
            visible:false,
            default:0.,
        },

        requireSafety_:{
            visible:false,
            default:0.,
        },

        currentSafety_:{
            visible:false,
            default:0.,
        },

        requirePerformance_:{
            visible:false,
            default:0.,
        },

        currentPerformance_:{
            visible:false,
            default:0.,
        },

        bugnum_:{
            default:[],
            type:[cc.Integer],
        },

        categories_:{
            default:[],
            type:[Object],
        },

        reward_:0,
        receiveDay_:0,
        finishDay_:0,
        content_:"",
        
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
    },

    setReward:function(){
        this.reward_=reward;
    },

    getReward:function(){
        return this.reward_;
    },

    init:function(){

    },

    getRequire:function(){
        var require=new Object;
        require.function = this.requireFunction_;
        require.entertainment = this.requireEntertainment_;
        require.innovation = this.requireInnovation_;
        require.safety = this.requireSafety_;
        require.performance = this.requirePerformance_;
        return require;
    },

    setrequire:function(require){
        this.requireFunction_=require.function
        this.requireEntertainment_=require.entertainment
        this.requireInnovation_=require.innovation
        this.requireSafety_=require.safety
        this.requirePerformance_=require.performance
    },

    getCurrent:function(){
        var current=new Object;
        current.function=this.currentFunction_;
        current.entertainment=this.currentEntertainment_;
        current.innovation = this.currentInnovation_;
        current.safety = this.currentSafety_;
        current.performance = this.currentPerformance_;
        return current;
    },

    augment:function(attribute,increment){
        switch(attribute){
            case 0:
            this.currentFunction_+=increment;
            if (this.currentFunction_ > this.requireFunction_) {
                this.currentFunction_ = this.requireFunction_
            }
            break;
            case 1:
            this.currentPerformance_+=increment;
            break;
            case 2:
            this.currentEntertainment_+=increment;
            break;
            case 3:
            this.currentInnovation_+=increment;
            break;
        }
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    isFinished: function() {
        return this.currentFunction_ >= this.requireFunction_ && this.currentEntertainment_ >= this.requireEntertainment_ && this.currentInnovation_ >= this.requireInnovation_ && this.currentSafety_ >= this.requireSafety_ && this.currentPerformance_ >= this.requirePerformance_
    },

    addCategory:function(category){
        this.categories_.push(category);
    },
    getCategories:function(){
        return this.categories_;
    },
    setReceiveDay:function(day){
        this.receiveDay_=day;
    },
    getReceiveDay:function(){
        return this.receiveDay_;
    },
    setFinishDay:function(day){
        this.finishDay_=day;
    },
    getFinishDay:function(){
        return this.finishDay_;
    },
    getPeriod:function(){
        return this.finishDay_ - this.receiveDay_;
    },
    setContent:function(content){
        this.content_=content;
    },
    getContent:function(){
        return this.content_;
    },
    setName:function(name){
        this.name_=name;
    },
    getName:function(){
        return this.name_;
    },

    isDevelopEnough:function(){
        return this.currentFunc_ / this.requireFunc_ >= 0.6
    },

    isDevelopEnd:function(){
        return this.currentFunc_ >= this.requireFunc_;
    }, 

    setBug:function(highnum,midnum,lownum){
        var c=highnum;
        var b=midnum;
        var a=lownum;
        while(c!=0){
            if(Math.random()<0.6){
                if(a!=0){
                    this.bugnum[1]++;
                    a--;
                }
                else if(b!=0){
                    this.bugnum[3]++;
                    b--;
                }
                else{
                    this.bugnum[5]++;
                    c--;
                }
            }
            else{
                if(a!=0){
                    this.bugnum[0]++;
                    a--;
                }
                else if(b!=0){
                    this.bugnum[2]++;
                    b--;
                }
                else{
                    this.bugnum[4]++;
                    c--;
                }
            }
        }

    },

    findBug:function(level,num){
        if(this.bugnum_[level*2]>num){
            this.bugnum_[level*2]-=num;
            this.bugnum_[level*2+1]+=num;
        }
        else{
            this.bugnum_[level*2+1]+=this.bugnum_[level*2];
            this.bugnum_[level*2]=0;
        }
    },

    removeBug:function(level,num){
        if(this.bugnum_[level*2+1]>0){
            this.bugnum_[level*2+1]-=num;
        }
    },
});