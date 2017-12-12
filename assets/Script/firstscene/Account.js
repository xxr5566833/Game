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
        },
        protect_: {
            default: true,
        },
        coef:null
    },

    // use this for initialization
    onLoad: function () {
        //初始资金10万
        this.gold_=100000;
        this.protect_ = true;
        this.coef = new Object();
        // Account
        this.coef.IN=1;  // 收入 19,23
        this.coef.OUT=1; // 支出 18,21
        this.coef.PM=1;  // 项目启动金 14 *
    },

    profit: function(num,cause){
        this.gold_+=this.coef.IN*num;
        //记录cause
    },

    enoughThenExpend: function(num,cause){
        console.log(num);
        if(this.isEnough(num)){
            this.expend(num);
            return true;
        }
        else{
            return false;
        }
    },

    expend: function(num,cause){
        this.gold_=this.gold_-this.coef.OUT*num;
        if(this.gold_ >=0){
            return;
        }
        else{
            //调用破产保护
            this.protect();
        }
    },

    isEnough:function(num){
        if(this.gold_<num){
            return false;
        }
        return true;
    },
    
    getGold:function(){
        return this.gold_;
    },

    protect:function(money){
        if(this.protect_){
            var num=1;
            while(num*100000<money){
                num++;
            }
            this.profit(num*100000,"保护");
            event=new cc.Event.EventCustom('PROTECT', true);
            this.node.dispatchEvent(event);
            this.protect_=false;
        }
        else{
            //GAME OVER
            event=new cc.Event.EventCustom('GAMEOVER', true);
            this.node.dispatchEvent(event);
        }
    },

    updateCoef:function(coef){
        this.coef = coef;
    },

    update:function(dt){
        
    },
});
