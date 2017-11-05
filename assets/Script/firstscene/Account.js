cc.Class({
    extends: cc.Component,

    properties: {
        gold_:{
            default:0,
            type:cc.Integer,
        },
        records_:{
            default:[],
            type:[cc.String],
        }
    },

    // use this for initialization
    onLoad: function () {
        this.gold_=10000;
    },


    profit:function(num,cause){
        this.gold_+=num;
    },

    expend:function(num,cause){
        let gold_now=this.gold_-num;
        if(gold_now < 0){
            //提示资金不足
            console.log("资金不足，但还没想好资金不足时的UI情况");
            return false;
        }
        //记录
        return true;
    },

    isEnough:function(num){
        if(this.gold_<num){
            return false;
        }
        return true;
    },

    update:function(dt){
        
    },
});
