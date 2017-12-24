cc.Class({
    extends: cc.Component,

    properties: {
        bank:cc.Node,
        msgbox: cc.Node,
        loanBoard : cc.Node,
        loanPre : cc.Prefab,
        content : cc.Node,
        main:cc.Node,
    },

    // use this for initialization
    onLoad: function () {
        this.msgcontrol = this.msgbox.getComponent("msgBoxControl");
    },
    onEnable:function(){
        this.updateLoans();
    },

    removeLoans:function(){
        var children = this.content.children;
        console.log(children);
        var length = children.length;
        for(let i = 0 ; i < length ; i++)
        {
            console.log(children.length);
            console.log(i);
            var child = children[0];
            child.removeFromParent();
            console.log("remove");

        }
        console.log(children.length);
    },

    updateLoans:function(){
        console.log("update");
        this.removeLoans();
        var loans = this.bank.getComponent("Bank").getLoans();
        console.log(loans);
        this.loans = loans;
        for(var i = 0 ; i < loans.length ; i++)
        {
            var loan = loans[i];
            var loannode = cc.instantiate(this.loanPre);
            this.content.addChild(loannode);
            var deaddate = loan.getDeadDate();
            var money = loan.getCurrentMoney();
            loannode.getComponent("loanItemUI").js = this;
            loannode.getComponent("loanItemUI").init(money, deaddate, i);
        }
    },

    backLoan:function(){
        console.log(this);
    },

    back:function(index){
        this.bank.getComponent("Bank").repay(this.loans[index], false);
        this.updateLoans();
    },

    change2Loan:function(){
        this.node.active = false;
        this.loanBoard.active = true;
    },

    close:function(){
        this.main.active = true;
        this.node.active = false;
    },

    


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
