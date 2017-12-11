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
    },

    // use this for initialization
    init:function(list){
        this.achievementList_ = list;
    },
    onLoad: function () {
        this.achievementList_ = [
            {
                name_ : "百万富翁",
                condition_ : "资产达到 100万",
                unlock_ : false,
                index_ : 0,
                check_:function(money, totalloan){
                    if(!this.unlock_)
                    {
                        if(money > 100 * 10000)
                        {
                            this.unlock_ = true;
                            var event = new EventCustom("MESSAGE", true);
                            event.detail.type = "SUCCESS";
                            event.detail.string = "成功达到百万富翁";
                        }
                    }
                }
            },
            {
                name_ : "千万富翁",
                condition_ : "资产达到 1000万",
                unlock_ : false,
                index_ : 1,
                check_:function(money, totalloan){
                    if(!this.unlock_)
                    {
                        if(money > 1000 * 10000)
                        {
                            this.unlock_ = true;
                            var event = new EventCustom("MESSAGE", true);
                            event.detail.type = "SUCCESS";
                            event.detail.string = "成功达到千万富翁";
                        }
                    }
                }
            },
            {
                name_ : "亿万富翁",
                condition_ : "资产达到 1亿",
                unlock_ : false,
                index_ : 2,
                check_:function(money, totalloan){
                    if(!this.unlock_)
                    {
                        if(money > 10000 * 10000)
                        {
                            this.unlock_ = true;
                            var event = new EventCustom("MESSAGE", true);
                            event.detail.type = "SUCCESS";
                            event.detail.string = "成功达到亿万富翁";
                        }
                    }
                }
            },
            {
                name_ : "负债累累",
                condition_ : "贷款数额达到10W",
                unlock_:false,
                index_ : 3,
                check_:function(money, totalloan){
                    if(!this.unlock_)
                    {
                        if(totalloan > 10 * 10000)
                        {
                            this.unlock_ = true;
                            var event = new EventCustom("MESSAGE", true);
                            event.detail.type = "FAIL";
                            event.detail.string = "负债累累";
                        }
                    }
                }
            },
        ];
    },

    pause:function(){
        this.unschedule(this.unlock);
    },

    resume:function(time){
        this.schedule(this.unlock, time * 10);
    },

    unlock:function(){
        var moneyevent = new EventCustom("MONEYADD", true);
        this.node.dispatchEvent(moneyevent);
        var money = moneyevent.detail.back;

        var totalevent = new EventCustom("TOTALLOANGET", true);
        this.node.dispatchEvent(totalevent);
        var total = totalevent.detail.back;
        
        for(let i = 0 ; i < this.achievementList_.length ; i++)
        {
            var achievement = this.achievementList_[i];
            achievement.check_(money, total);
        }
    },

    getAchievement:function(){
        return this.achievementList_;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
