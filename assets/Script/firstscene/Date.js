
cc.Class({
    extends: cc.Component,

    properties: {
        time_:{
            default:0,
            type:cc.Integer,
        }
    },

    // use this for initialization
    onLoad: function () {
        
    },

    resume:function(time){
        this.schedule(this.updateDate,time)
    },

    pause:function(){
        this.unschedule(this.updateDate)
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
