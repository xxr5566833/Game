var Loan=require('Loan');
cc.Class({
    extends: cc.Component,

    properties: {

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
        loans_:{
            type:[Loan],
            default:[],
        },
    },

    // use this for initialization
    onLoad: function () {
        //this.loans_ = [];
        this.maxFixedLoanNum_ = 1;
        this.fixedLoanNum_ = 0;
        this.currentLoanNum_ = 0;
    },

    getLoans:function(){
        return this.loans_;
    },

    

    getMaxLoanMoney:function(){
        event=new cc.Event.EventCustom('GETCREDIT', true);
        this.node.dispatchEvent(event);
        var money = event.back / 10.0 * 10000;
        console.log("最大金钱");
        console.log(money);
        return money;
    },

    getOutMoney:function(){
        var sum=0;
        for(let i=0;i<this.loans_.length;i++){
            sum += this.loans_[i].getOriginMoney();
        }
        console.log("借出总金额");
        console.log(sum);
        return sum;
    },

    
    getfixedLoanMoney:function(){
        return this.fixedLoanNum_;
    },

    getCurrentLoanNum:function(){
        return this.loans_.length;
    },

    getRemainLoanMoney:function(){
        var remain = this.getMaxLoanMoney() - this.getOutMoney();
        return remain <= 0 ? 0 : remain;
    },

    increaseMaxLoanMoney:function(){

    },

    getDeadline:function(isfixed){
        return isfixed ? 240 : 180; 
    },

    getInterest:function(isfixed){
        return isfixed ? 0.03 : 0.05;
    },

    //下面都是为了测试用的可以删

    applyFix:function(){
        this.applyLoan(1000, true);
        
    },

    applyNoFix:function(){
        this.applyLoan(1000, false);
    },

    addCredit:function(){
        var event = new cc.Event.EventCustom("CREDITCHANGE", true);
        event.change = 2;
        this.node.dispatchEvent(event);
    },

    subCredit:function(){
        var event = new cc.Event.EventCustom("CREDITCHANGE", true);
        event.change = -2;
        this.node.dispatchEvent(event);
    },

    show:function(){
        console.log(this.loans_);
        console.log("最大贷款数量");
        console.log(this.maxFixedLoanNum_);
        console.log("固定贷款数量");
        console.log(this.fixedLoanNum_);
        console.log("目前的贷款数量");
        console.log(this.getCurrentLoanNum());
        var event = new cc.Event.EventCustom("GETCREDIT", true);
        this.node.dispatchEvent(event);
        var credit = event.back;
        console.log("目前的信誉度");
        console.log(credit);
        console.log(this.getMaxLoanMoney());
    },

    back:function(){
        var loan = this.loans_[0];
        this.repay(loan, false);
    },
    applyLoan:function(money,isfixed){
        if(this.getRemainLoanMoney() <= 0)
        {
            var event = new cc.Event.EventCustom("MESSAGE", true);
            event.id = 9;
            this.node.dispatchEvent(event);
            return ;
        }
        if(isfixed && this.fixedLoanNum_ >= this.maxFixedLoanNum_){
            var event=new cc.Event.EventCustom('MESSAGE', true);
            event.id = 1;
            this.node.dispatchEvent(event);
        }
        else{
            var loan=new Loan();
            loan.node = this.node;
            loan.init(money, isfixed ? 7:7, isfixed ? 0.03: 0.05, isfixed);
            //loan.init(money, isfixed ? 240:180, isfixed ? 0.03: 0.05, isfixed);
            this.loans_.push(loan);
            if(isfixed){
                this.fixedLoanNum_++;
            }
            var event=new cc.Event.EventCustom('MONEYADD', true);
            event.money = money;
            event.record = "贷款";
            this.node.dispatchEvent(event);
            event=new cc.Event.EventCustom('MESSAGE', true);
            event.id=2;
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
        this.schedule(this.grow, time );
        this.schedule(this.demandLoans, time);
    },

    demandLoans:function(){
        for(let i=0;i<this.loans_.length;i++){
            if(this.isDue(this.loans_[i])){
                this.repay(this.loans_[i],true);
                i--;
            }
        }
    },

    isDue:function(loan){
        event=new cc.Event.EventCustom('GETDATE', true);
        this.node.dispatchEvent(event);
        var date = event.back;
        return loan.isDue(date);
    },

    deleteLoan:function(loan){
        for(let i = 0 ; i < this.loans_.length ; i++)
        {
            if(loan == this.loans_[i])
            {
                this.loans_.splice(i, 1);
                if(loan.isFixed())
                {
                    this.fixedLoanNum_ -= 1;
                }
                return ;
            }
        }

    },

    repay:function(loan,force){
        if(!loan)
        {
            return ;
        }
        event=new cc.Event.EventCustom('MONEYCUT', true);
        event.force = force;
        event.money = loan.getCurrentMoney();
        console.log(event.money);
        this.node.dispatchEvent(event);
        var id = 0;
        if(event.back){
            id = 5;
            //还款成功那么删去这个贷款记录
            this.deleteLoan(loan);
        }
        else{
            id = 4;
        }
        event=new cc.Event.EventCustom('MESSAGE', true);
        event.id = id;
        this.node.dispatchEvent(event);
        return id == 5;
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
