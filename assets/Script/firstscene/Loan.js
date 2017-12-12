cc.Class({
    extends: cc.Component,

    properties: {
        originMoney_:0.,
        interest_:0.,
        deadline_:0,
        initDay_:0,
        currentMoney_:0.,
        isFixed_:false,
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

    init:function(money, deadline, interest, isfixed){
        var event=new cc.Event.EventCustom('GETDATE', true);
        this.node.dispatchEvent(event);
        this.originMoney_ = money;
        this.interest_ = interest;
        this.deadline_ = deadline;
        this.initDay_ = event.back;
        this.currentMoney_ = money;
        this.isFixed_ = isfixed;
    },

    grow:function(){
        this.currentMoney_=this.currentMoney_* ( 1 + this.interest_ );
    },

    isDue:function(nowday){
        console.log(this.deadline_);
        console.log(this.initDay_);
        console.log(nowday);
        return (this.deadline_ + this.initDay_) <= nowday;
    },


    getOriginMoney:function(){
        return this.originMoney_;
    },
    getInterest:function(){
        return this.interest_;
    },
    getInitDay:function(){
        return this.initDay_;
    },
    getCurrentMoney:function(){
        return this.currentMoney_;
    },
    isFixed:function(){
        return this.isFixed_;
    },
    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
