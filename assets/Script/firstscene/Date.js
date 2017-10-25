cc.Class({
    extends: cc.Component,

    properties: {
        time_:{
            default:0,
            type:cc.Integer,
        },
        speedPerday_:{
            default:0,
            type:cc.Integer,
        },
        count_:{
            default:0,
            type:cc.Integer,
        },
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.count_++;
        if(this.count_ >= this.speedPerday)
            this.updateDate();
            this.count_=0;
    },

    updateDate:function(){
        this.time_++;
    },

    getDate:function(){
        return this.time_;
    },

    //getDate:function(){  //以一定格式返回日期
    //
    //}
});
