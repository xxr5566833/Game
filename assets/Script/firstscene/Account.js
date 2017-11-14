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
        msgBox: {
            default: null,
            type:cc.Node,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.gold_=10000;
        this.msgBoxControl = this.msgBox.getComponent('msgBoxControl');
        this.neg_flag = false;
    },


    profit:function(num,cause){
        this.gold_+=num;
        if(this.gold_ > 0){
            this.neg_flag = false;
            if(this.gold_ > Number.MAX_VALUE / 10){
                this.msgBoxControl.alert('SUCCESS','为了防止溢出，你的金钱减一半');
                this.gold_ = this.gold_ / 2;
            }
        }
    },

    expend:function(num,cause){
        let gold_now=this.gold_-num;
        //console.log(cause);
        if(gold_now < 0){
            //提示资金不足
            this.gold_=gold_now;
            if(!this.neg_flag){
                this.msgBoxControl.alert('FAIL','出现亏本，开始高利贷');
                this.neg_flag = true;
            }
            return false;
        }
        //记录
        this.gold_=gold_now;
        return true;
    },

    isEnough:function(num){
        if(this.gold_<num){
            return false;
        }
        return true;
    },
    
    pause:function(){
        this.unschedule(this.loan);
    },

    resume:function(){
       // console.log('resume account');
        this.schedule(this.loan, 1);
    },

    loan:function(){
        //console.log(this.gold_);
        if(this.gold_ < 0){
            //console.log(this.gold_);
            this.gold_ = Math.floor(this.gold_ * 1.01);
            if(this.gold_ < -50000000){
                this.msgBoxControl.alert('FAIL', "GG，游戏结束");
                var game = cc.find('Game').getComponent('Game');
                cc.audioEngine.stop(game.current);
                cc.director.loadScene('End');
            }
        }
    },

    update:function(dt){
        
    },
});
