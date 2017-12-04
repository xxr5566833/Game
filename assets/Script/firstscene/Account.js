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
    },

    // use this for initialization
    onLoad: function () {
        this.gold_=10000;
        this.protect_ = true;
    },

    profit: function(num,cause){
        this.gold_+=num;
        //记录cause
    },

    enoughThenExpend: function(num,cause){
        if(this.isEnough(num)){
            this.expend(num);
            return true;
        }
        else{
            return false;
        }
    },

    expend: function(num,cause){
        this.gold_=this.gold_-num;
        if(this.gold>=0){
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

    update:function(dt){
        
    },
});
