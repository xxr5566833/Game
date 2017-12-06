var Loan=require('Loan');
cc.Class({
    extends: cc.Component,

    properties: {
        loans_:{
            default:[],
            type:[cc.Prefab],
        },

        currentLoanNum_:0,
        fixedLoanNum_:0,
        maxFixedLoanNum_:1,

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

    getLoans:function(){
        return this.loans_;
    },

    getMaxLoanMoney:function(){
        event=new cc.Event.EventCustom('GETCREDIT', true);
        this.node.dispatchEvent(event);
        return event.detail.back / 10.0 * 10000;
    },

    getOutMoney:function(){
        var sum=0;
        for(let i=0;i<this.loans_.length;i++){
            sum += this.loans_[i].getOriginMoney();
        }
        return sum;
    },

    
    getProtectedLoanMoney:function(){
        return this.fixedLoanNum_;
    },

    getCurrentLoanNum:function(){
        return this.currentLoanNum_;
    },

    getRemainLoanMoney:function(){
        var remain = this.getMaxLoanMoney() - this.getOutMoney();
        return remain <= 0 ? 0 : remain;
    },

    increaseMaxLoanMoney:function(){

    },

    applyLoan:function(money,isfixed){
        if(isfixed && this.fixedLoanNum_ >= this.maxFixedLoanNum_){
            event=new cc.Event.EventCustom('MESSAGE', true);
            event.detail.id = 'maxloannum';
            this.node.dispatchEvent(event);
        }
        else{
            var loan=new Loan;
            loan.init(money, isfixed ? 240:180, isfixed ? 0.03: 0.05, isfixed);
            this.loans_.push(loan);
            if(isfixed){
                this.fixedLoanNum_++;
            }
            else{
                this.currentLoanNum_++;
            }
            event=new cc.Event.EventCustom('MONEYADD', true);
            event.detail.money = money;
            event.detail.record = "贷款";
            this.node.dispatchEvent(event);
            event=new cc.Event.EventCustom('MESSAGE', true);
            event.detail.id='loansuccess';
            this.node.dispatchEvent(event);
        }
    },

    grow:function(){
        for(let i=0;i<this.loans_.length;i++){
            this.loans_[i].grow();
        }
    },

    pause:function(){
        this.unshedule(this.grow);
        this.unshedule(this.demandLoans);
    },

    resume:function(time){
        this.shedule(this.grow, time * 30);
        this.schedule(this.demandLoans, time);
    },

    demandLoans:function(){
        for(let i=0;i<this.loans_.length;i++){
            if(this.isDue(this.loans_[i])){
                this.repay(this.loans_[i],1);
                this.loans_.splice(i,1);
                i--;
            }
        }
    },

    isDue:function(loan){
        event=new cc.Event.EventCustom('GETDATE', true);
        this.node.dispatchEvent(event);
        var date = event.detail.back;
        return loan.isDue(date);
    },

    repay:function(loan,force){
        event=new cc.Event.EventCustom('MONETCUT', true);
        event.detail.force = force;
        this.node.dispatchEvent(event);
        var id;
        if(event.detail.back){
            id = 'backsuccess';
        }
        else{
            id = 'backfail';
        }
        event=new cc.Event.EventCustom('MESSAGE', true);
        event.detail.id = id;
        this.node.dispatchEvent(event);
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
