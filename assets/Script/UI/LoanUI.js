cc.Class({
    extends: cc.Component,

    properties: {
        slider:cc.Node,
        amount:cc.Label,
        deadline:cc.Label,
        interest:cc.Label,
        bank:cc.Node,
        msgbox: cc.Node,
        backBoard:cc.Node,
        main:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this.msgcontrol = this.msgbox.getComponent("msgBoxControl");
    },
    onEnable:function(){
        console.log("enable");
        this.isFixed = true;
        this.slider.getComponent(cc.Slider).progress = 0.0;
        this.money = 0;
        this.changeMoney();
        this.setString();
    },

    changeMoney:function(){
        var progress = this.slider.getComponent(cc.Slider).progress;
        console.log(progress);
        var max = this.bank.getComponent("Bank").getRemainLoanMoney();
        var nowmoney = Math.floor(max * progress);
        this.money = nowmoney;
        this.amount.string = "贷款金额:$" + nowmoney + " /上限:$" + max ;
        console.log(this.amount.string);
    },

    change2Fixed:function(){
        this.isFixed = true;
        this.setString();
        console.log("to fixed");
    },
    
    setString:function(){
        var deadline = this.bank.getComponent("Bank").getDeadline(this.isFixed);
        var interest = this.bank.getComponent("Bank").getInterest(this.isFixed)
        this.deadline.string = "还款期限：" + deadline + "天";
        this.interest.string = "月利息:" + interest * 100 + "%";
    },

    change2NotFixed:function(){
        this.isFixed = false;
        this.setString();
        console.log("to notfixed");
    },

    loan:function(){
        console.log(this.money);
        if(this.money == 0)
        {
            //money必须要大于0
            this.msgcontrol.alert("FAIL", "贷款金额必须要大于0");
            return ;
        }
        else{
            this.bank.getComponent("Bank").applyLoan(this.money, this.isFixed);
        }
        this.changeMoney();
    },

    change2back:function(){
        this.node.active = false;
        this.backBoard.active = true;
    },
    close:function(){
        this.main.active = true;
        this.node.active = false;
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
