var eAttri = cc.Enum({ function: 0, performance: 1, entertainment: 2, innovative: 3, });
var eBug = cc.Enum({ low: 0, mid: 1, high: 2, });
var eKind = cc.Enum({consign : 0, yourown : 1, bid : 2});
cc.Class({
    extends: cc.Component,

    properties: {
        //cocos creator对于自己定义的复杂类型不支持，所以这里分开写了
        requireEntertainment_: {
            visible: false,
            default: 0.,
        },

        currentEntertainment_: {
            visible: false,
            default: 0.,
        },

        requireFunction_: {
            visible: false,
            default: 0.,
        },

        currentFunction_: {
            visible: false,
            default: 0.,
        },

        requireInnovation_: {
            visible: false,
            default: 0.,
        },

        currentInnovation_: {
            visible: false,
            default: 0.,
        },

        requireSafety_: {
            visible: false,
            default: 0.,
        },

        currentSafety_: {
            visible: false,
            default: 0.,
        },

        requirePerformance_: {
            visible: false,
            default: 0.,
        },

        currentPerformance_: {
            visible: false,
            default: 0.,
        },

        bugnum_: {
            default: [],
            type: [cc.Integer],
        },

        categories_: {
            default: [],
            type: [Object],
        },

        functions_: {
            default: [],
            type: [Object],
        },

        platform_:Object,

        name_: "",
        budget_ :0,
        m_ : 0,
        
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

    init: function (kind, proj) {
        this.kind_ = kind;
        //需要把可能直接用的属性都初始化，这样就不会是undefined
        this.requirePerformance_ = 0.0;
        this.requireInnovation_ = 0.0;
        if(kind == 0 || kind == 2)
        {
            this.requireEntertainment_=proj.requireEntertainment_;
            this.requireFunction_=proj.requireFunction_;
            
            this.requireInnovation_ = proj.requireInnovation_ != undefined ? proj.requireInnovation_ : 0.0;
            this.requirePerformance_ = proj.requirePerformance_ != undefined ? proj.requirePerformance_ : 0.0;
            this.reward_=proj.reward_;
            this.deadline_=proj.deadline_;
            this.name_=proj.name_;
            this.level_=proj.level_;
            this.index_ = proj.index_;
            this.difficulty_ = proj.difficulty_;
        }
        else{
            this.reward_ = 0;
            this.name = "";
            this.budget_ = 0;
            this.difficulty_ = 0;
        }
    },

    setReward: function (reward) {
        this.reward_ = reward;
    },

    getReward: function () {
        return this.reward_;
    },

    setContent: function (content) {
        this.content_ = content;
    },
    getContent: function () {
        return this.content_;
    },
    setName: function (name) {
        this.name_ = name;
    },
    getName: function () {
        return this.name_;
    },


    getRequire: function () {
        var require = new Object;
        require.function = this.requireFunction_;
        require.entertainment = this.requireEntertainment_;
        require.innovation = this.requireInnovation_;
        require.safety = this.requireSafety_;
        require.performance = this.requirePerformance_;
        return require;
    },

    setRequire: function (require) {
        this.requireFunction_ = require.function
        this.requireEntertainment_ = require.entertainment
        this.requireInnovation_ = require.innovation
        this.requireSafety_ = require.safety
        this.requirePerformance_ = require.performance
    },

    getCurrent: function () {
        var current = new Object();
        current.function = this.currentFunction_;
        current.entertainment = this.currentEntertainment_;
        current.innovation = this.currentInnovation_;
        current.safety = this.currentSafety_;
        current.performance = this.currentPerformance_;
        return current;
    },

    augment:function(attribute,increment){
        increment = increment *10 ; 
        switch(attribute){
            case 0:
                this.currentFunction_ += increment;
                if (this.currentFunction_ > this.requireFunction_) {
                    this.currentFunction_ = this.requireFunction_
                }
                break;
            case 1:
                this.currentPerformance_ += increment;
                break;
            case 2:
                this.currentEntertainment_ += increment;
                break;
            case 3:
                this.currentInnovation_ += increment;
                break;
        }
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    isFinished: function () {
        return this.currentFunction_ >= this.requireFunction_ && this.currentEntertainment_ >= this.requireEntertainment_ && this.currentInnovation_ >= this.requireInnovation_ && this.currentSafety_ >= this.requireSafety_ && this.currentPerformance_ >= this.requirePerformance_
    },

    isDevelopEnough: function () {
        return this.currentFunction_ / this.requireFunction_ >= 0.6
    },

    isDevelopEnd: function () {
        return this.currentFunction_ >= this.requireFunction_;
    },

    isOverdue:function(nowday){
        if(this.kind_ == 1)
            return false;
        if(nowday - this.receiveDay_ > this.deadline_ * 7){
            return true;
        }
        return false;
    },

    isSeriousOverdue:function(nowday){
        //竞标任务超时一周
        return nowday - this.receiveDay_ >= 2 * this.deadline_;
    },

    //委托开发相关
    setDeadline:function(deadline){
        this.deadline_=deadline;
    },

    getDeadline:function(){
        return this.deadline_;
    },

    setIndex:function(index){
        this.index_=index;
    },

    getIndex:function(){
        return this.index_
    },

    //独立开发相关

    setPlatform:function(platform){
        this.platform_ = platform;
        this.budget_ += platform.budget_;
        this.difficulty_ += platform.difficulty_;
    },

    unsetPlatform : function()
    {
        this.budget_ -= this.platform_.budget_;
        this.difficulty_ -= this.platform_.difficulty_;
        this.platform_ = null;
    },

    addFunction:function(func){
        this.functions_.push(func);
        this.requireFunction_ += func.function_;
        this.budget_ *= func.times_;
    },

    subFunction:function(func){
        for(let i = 0 ; i < this.functions_.length ; i++)
        {
            var tempfunc = this.functions_[i];
            if(tempfunc.index_ == func.index_ )
            {
                this.budget_ /= tempfunc.times_;
                this.requireFunction_ -= tempfunc.function_;
                this.functions_.splice(i, 1);
                return ;
            }
        }
    },

    subAllFunction:function(){
        for(let i = 0 ; i < this.functions_.length ; i++)
        {
            var tempfunc = this.functions_[i];
            this.budget_ /= tempfunc.times_;
            this.requireFunction_ -= tempfunc.function_;
        }
        this.functions_ = [];
    },

    addTech:function(tech){
        this.techs_.push(tech);
        this.difficulty_ += tech.difficulty_;
        this.budget_ += tech.budget_;
    },

    subTech:function(tech){
        for(let i = 0 ; i < this.techs_.length ; i++)
        {
            var temptech = this.techs_[i];
            if(temptech.index_ == tech.index_)
            {
                this.difficulty_ -= temptech.difficulty_;
                this.budget_ -= temptech.budget_;
                this.techs_.splice(i, 1);
                return ;
            }
        }
    },

    subAllTech:function(){
        for(let i = 0 ; i < this.techs_.length ; i++)
        {
            var temptech = this.techs_[i];
            this.difficulty_ -= temptech.difficulty_;
            this.budget_ -= temptech.budget_;
        }
        this.techs_ = [];
    },


    addCategory: function (category) {
        this.categories_.push(category);
        this.budget_ += category.budget_;
        console.log(this.budget_);
        this.requireFunction_ += category.function_;
        this.difficulty_ += category.difficulty_;
    },

    subCategory:function(category){
        this.budget_ -= category.budget_;
        this.requireFunction_ -= category.function_;
        this.difficulty_ -= category.difficulty_;
        for(let i = 0 ; i < this.categories_.length ; i++)
        {
            if(this.categories_[i].index_ == category.index_)
            {
                this.categories_.splice(i, 1);
                return ;
            }
        }
    },

    subAllCategory:function(){
        for(let i = 0 ; i < this.categories_.length ; i++)
        {
            var cat = this.categories_[i];
            this.difficulty_ -= cat.difficulty_;
            this.budget_ -= cat.budget_;
            this.requireFunction_ -= cat.function_;
        }
        this.techs_ = [];
    },


    getCategories: function () {
        var result = null;
        switch(this.kind_)
        {
            case 0:
                result = this.categories_[0];
                break;
            case 1:
                result = this.categories_;
                break;
            case 2:
                result = this.categories_[0];
                break;
        }
        return result;
    },

    getBudget:function(){
        return this.budget_;
    },

    setReceiveDay: function (day) {
        this.receiveDay_ = day;
    },
    getReceiveDay: function () {
        return this.receiveDay_;
    },
    setFinishDay: function (day) {
        this.finishDay_ = day;
    },
    getFinishDay: function () {
        return this.finishDay_;
    },
    getPeriod: function () {
        //返回开发了多少天
        return this.finishDay_ - this.receiveDay_;
    },
    setPublishDay:function(day){
        this.publishDay_ = day;
    },

    getPublishDay:function(){
        return this.publishDay_;
    },

    getExpectPrice:function(){
        var cur=this.getCurrent();
        var F=cur.function;
        return F/33;
    },

    setPrice:function(price){
        this.price_ = price;
    },

    updateM:function(t, burstbugs){
        var cur=this.getCurrent();
        var F=cur.function;
        var E=cur.entertainment;
        var P=cur.performance;
        var I=cur.innovation;
        if(this.m_==0){
            this.m_ = Math.sqrt(7*E + 3*P) *F *(t + Math.sqrt(I))/t;
            this.m_=this.m_*this.getExpectPrice()/this.price_;
        }
        else{
            var rate = 1.;
            for(var i = 0 ; i < burstbugs.length ; i++)
            {
                switch(burstbugs[i])
                {
                    case 0:
                        rate = rate * 0.8;
                        break;
                    case 1 :
                        rate = rate * 0.5;
                        break;
                    case 2 :
                        rate = rate *0.2;
                        break;
                }
            }
            //这里还缺少f(p,t)
            this.m_ = rate * this.m_ ;
        }
    },

    getM:function(){
        return this.m_;
    },

    getTimeFromPublish:function(nowday){
        return nowday - this.publishDay_;
    },



    setBug: function (highnum, midnum, lownum) {
        var c = highnum;
        var b = midnum;
        var a = lownum;
        for(let i = 0 ; i < 6 ; i ++)
        {
            this.bugnum_[i] = 0;
        }
        console.log(c);
        while ((a + b + c) != 0) {
            if (Math.random() < 0.6) {
                if (a != 0) {
                    this.bugnum_[1]++;
                    a--;
                }
                else if (b != 0) {
                    this.bugnum_[3]++;
                    b--;
                }
                else {
                    this.bugnum_[5]++;
                    c--;
                }
            }
            else {
                if (a != 0) {
                    this.bugnum_[0]++;
                    a--;
                }
                else if (b != 0) {
                    this.bugnum_[2]++;
                    b--;
                }
                else {
                    this.bugnum_[4]++;
                    c--;
                }
            }
        }
        console.log(this.bugnum_);

    },

    findBug: function (level, num) {
        if (this.bugnum_[level * 2] > num) {
            this.bugnum_[level * 2] -= num;
            this.bugnum_[level * 2 + 1] += num;
        }
        else {
            this.bugnum_[level * 2 + 1] += this.bugnum_[level * 2];
            this.bugnum_[level * 2] = 0;
        }
    },

    removeBug: function (level, num) {
        if (this.bugnum_[level * 2 + 1] > 0) {
            this.bugnum_[level * 2 + 1] -= num;
            return ;
        }
        if(level == 0)
            return ;
        if(level >1 )
        {
            level -= 1;
            if(this.bugnum_[level * 2 + 1] > 0)
            {
                this.bugnum_[level * 2 + 1] -= num;
                return ;
            }
            
                
        }
        level -= 1;
        if(this.bugnum_[level * 2 + 1] > 0)
        {
            this.bugnum_[level * 2 + 1] -= num;
        }
        
    },
});