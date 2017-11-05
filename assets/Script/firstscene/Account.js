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

    },


    profit:function(num,cause){
        this.gold_+=num;
    },

    expend:function(num,cause){
        let gold_now=this.gold_-num;
        if(gold_now_<0){
            //提示资金不足
            cc.log("资金不足，但还没想好资金不足时的UI情况");
            return false;
        }
        //记录
        return true;
    },

    isenough:function(num){
        if(this.gold_<num){
            return false;
        }
        return true;
    },

    update:function(dt){
        
    },
});
