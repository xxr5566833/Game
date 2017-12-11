var eState = cc.Enum({  develop :0, test : 1, operative : 2,end:3,});
var eIncomeWay = cc.Enum({ oneoff : 0, period : 1, });
cc.Class({
    extends: cc.Component,

    properties: {
        publicDialogue: new Set([
            "今天天气不错啊",
            "你bug调完没",
            "果然PHP是世界上最好的语言",
            "感觉今天好虚啊……（心情差或很差时出现）",
            "感觉身体被掏空……（心情很差时出现）",
            "早上好|晚上好|夜里好",
            "凌晨（1~5随机）点的（公司名）公司，好安静",
            "这段代码谁写的，这么丑（心情差或很差时出现）",
            "嘿，我真是个天才（暴击时）",
            "精力集中，一发入魂（暴击时）",
            "就这么点功能，我能做十个（心情好或很好的时候出现）",
            "产品经理真是体贴，居然让我做了我最喜欢做的功能（心情很好时出现）",
            "今天的BUG，好喧嚣啊",
            "看我反向工作（体力为0准备休息时出现）",
            "回家养生去咯（体力为0准备休息时出现）",
            "……",
            "……回家（体力为0准备休息时出现）",
            "我找到了一个bug（测试阶段时出现）",
            "又到了捉虫子的时候了（测试阶段时出现）",
            "心无旁骛（心情一般、好或很好时出现）",
        ]),

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


    begin: function (project, persons) {
        this.project_ = project;
        for (let i = 0; i < persons.length; i++) {
            this.persons_[i] = persons[i];
            this.persons_[i].begin();
        }
        this.persons_ = [];
        this.maintainers_ = [];
        this.state_ = eState.develop;
        //buff
        for(let i = 0 ; i < persons.length ; i++)
        {
            persons[i].group_ = this;
        }
        this.ambitionBuff_ = 1;
    },

    stop: function () {
        for (let i = 0; i < this.persons_.length; i++) {
            this.persons_[i].stop();
        }
    },

    chance: function (probability) {
        var temp = Math.random();
        return temp <= probability;
    },

    generateBugLevel: function () {
        var temp = Math.random();
        if (temp > 0.5) {
            return 2;
        }
        else if (temp <= 0.5 && temp > 0.2) {
            return 1;
        }
        else {
            return 0;
        }
    },

    generateBurstBugLevel: function () {
        var temp = Math.random();
        if (temp > 0.9) {
            return 2;
        }
        else if (temp <= 0.9 && temp > 0.6) {
            return 1;
        }
        else {
            return 0;
        }
    },

    work: function () {
        switch (this.state_) {
            case 0:
                var n = this.persons_.length;
                var manager = 0;
                var maxmanager = 0;
                for (let i = 0; i < this.persons_.length; i++) {
                    manager = this.persons_[i].manager_;
                    if (maxmanager < manager) {
                        maxmanager = manager;
                    }
                }
                manager = maxmanager;
                for (let i = 0; i < this.persons_.length; i++) {
                    this.persons_[i].develop(manager, n, this.project_, true);
                }
                var dateevent = new EventCustom("GETDATE", true);
                this.node.dispatchEvent(dateevent);
                var nowday = dateevent.detail.back;
                switch (this.project_.kind_) {
                    case 0:
                        //表示委托开发
                        if (this.project_.isFinished()) {
                            var event = new EventCustom("PROJECTSUCCESS", true);
                            event.detail.project = this.project_;
                            this.node.dispatchEvent(event);
                            //然后设置自己的状态为结束状态，等待personcontrol回收
                            this.state_ = eState.end;
                        }
                        else {
                            if (this.project_.isOverdue(nowday)) {
                                var event = new EventCustom("PROJECTFAIL", true);
                                event.detail.project = this.project_;
                                this.node.dispatchEvent(event);
                                //然后设置自己的状态为结束状态，等待personcontrol回收
                                this.state_ = eState.end;
                            }
                        }
                        break;
                    case 1:
                        if (this.isDevelopEnough()) {
                            //表示进入测试阶段的按钮可以点了
                            var event = new EventCustom("CANTEST", true);
                            event.detail.group = this;
                            this.node.dispatch(event);
                            if (this.isDevelopEnough()) {
                                //表示需要进入测试阶段了
                                this.evolve();
                            }
                        }
                        break;
                    case 2:
                        //表示是个竞标任务
                        if (this.isFinished()) {
                            //获得剩下的80%
                            if (!this.isOverdue()) {
                                var event = new EventCustom("MONEYADD", true);
                                event.detail.money = 0.8 * this.project_.getReward();
                                this.node.dispatchEvent(event);

                                //提高声望
                                switch (this.project_.categories_[0].categoryId_) {
                                    case 0:
                                        event = new EventCustom("TECHNOLOGYADD", true);
                                        event.detail.technology = this.project_.getRequire().requireFunction_ * 0.25;
                                        this.node.dispatch(event);
                                        //获得额外奖金
                                        var otherreward = this.project_.getReward() * 0.25;
                                        event.type = "MONEYADD";
                                        event.detail.money = otherreward;
                                        this.node.dispatch(event);
                                        //声誉
                                        var growth = this.project_.level_.creditGrowth_ * 1.5;
                                        event.type = "CREDITCHANGE";
                                        event.detail.change = growth;
                                        this.node.dispatchEvent(event);
                                        break;
                                    case 1:
                                        var growth = this.project_.level_.creditGrowth_ * 2;
                                        event.type = "CREDITCHANGE";
                                        event.detail.change = growth;
                                        this.node.dispatchEvent(event);
                                        break;
                                    case 2:
                                        //额外50%的奖金
                                        var otherreward = this.project_.getReward() * 0.5;
                                        event.type = "MONEYADD";
                                        event.detail.money = otherreward;
                                        this.node.dispatch(event);
                                    case 3:
                                        event = new EventCustom("TECHNOLOGYADD", true);
                                        event.detail.technology = this.project_.getRequire().requireFunction_ * 0.5;
                                        this.node.dispatch(event);
                                        break;

                                }
                            }
                            else {
                                var cutevent = new CustomEvent("CREDITCHANGE", true);
                                cutevent.detail.change = - this.project_.level_.creditGrowth_;
                                this.dispatchEvent(cutevent);
                            }


                        }
                        else {
                            if (this.project_.isSeriousOverdue(nowday)) {
                                //这里倒扣三倍价格，是强制的
                                var cut = this.project_.getReward() * 3;
                                var cutevent = new CustomEvent("MONEYCUT", true);
                                cutevent.detail.money = cut;
                                cutevent.detail.force = true;
                                cutevent.detail.record = "违约金";
                                this.node.dispatchEvent(cutevent);
                                //扣声誉   
                                var creditcut = 0.5 * this.project_.level_.creditGrowth_;
                                cutevent.type = "CREDITCHANGE";
                                cutevent.detail.change = - creditcut;
                                this.node.dispatchEvent(cutevent);
                            }
                        }
                        break;
                }
                break;
            case 1:
                var n = this.persons_.length;
                var manager = 0;
                var maxmanager = 0;
                for (let i = 0; i < this.persons_.length; i++) {
                    manager = this.persons_[i].manager_;
                    if (maxmanager < manager) {
                        maxmanager = manager;
                    }
                }
                manager = maxmanager;
                var sumF = 0.;
                for (let i = 0; i < this.persons_.length; i++) {
                    sumF += this.persons_[i].develop(manager, n, this.project_, false);
                }
                this.testCount_ += sumF;
                if (this.testCount_ >= 3) {
                    var num = this.testCount_ / 3;
                    this.testCount_ -= 3 * (this.testCount_ / 3);
                    for (let i = 0; i < num; i++) {
                        if (this.chance(0.75)) {
                            this.project_.removeBug(this.generateBugLevel(), 1);
                        }
                        if (this.change(0.5)) {
                            this.project_.findBug(this.generateBugLevel(), 1);
                        }
                    }
                }
                break;

            case 2:
                //市场相关
                event = new cc.Event.EventCustom('GETUSERCHANGE', true);
                event.detail.lastusernum = this.usernum_;
                this.node.dispatchEvent(event);
                this.usernum_ = event.detail.back;
                event = new cc.Event.EventCustom('MONEYADD', true);
                event.detail.money = 0;
                if (this.incomeWay_ == 0) {
                    if (event.detail.back - event.detail.lastusernum > 0) {
                        event.detail.money = (event.detail.back - event.detail.lastusernum) * this.project_.getPrice();
                    }
                }
                else {
                    event.detail.money = this.usernum_ * this.project_.getPrice();
                }
                if (this.persons_.length != 0) {
                    var C = this.persons_[0].creativity_;
                    if (0 <= C && C <= 50) {
                        event.detail.money = event.detail.money * (0.5 + C * 0.01);
                    }
                    else if (C <= 200) {
                        event.detail.money = event.detail.money * (1.0 + (C - 50) * 0.004);
                    }
                    else if (C <= 600) {
                        event.detail.money = event.detail.money * (1.6 + (C - 200) * 0.001);
                    }
                    else if (C <= 1200) {
                        event.detail.money = event.detail.money * (2.0 + (C - 600) * 0.0005);
                    }
                    else {
                        event.detail.money = event.detail.money * (2.3 + (C - 1200) * 0.00025);
                    }
                }
                this.node.dispatchEvent(event);
                event = new cc.Event.EventCustom('GETDATE', true);
                this.node.dispatchEvent(event);
                var nowday = event.detail.back;
                var t = this.project_.getTimeFromPublish(nowday);
                //因为现在影响力和已经爆发的bug还有关，所以这里需要传入this.burstBugs_
                this.project_.updateM(t, this.burstBugs_);
                //维护人员减少bug
                var n = this.maintainers_.length;
                var manager = 0;
                var maxmanager = 0;
                for (let i = 0; i < this.maintainers_.length; i++) {
                    manager = this.maintainers_[i].manager_;
                    if (maxmanager < manager) {
                        maxmanager = manager;
                    }
                }
                manager = maxmanager;
                var sumF = 0.;
                for (let i = 0; i < this.maintainers_.length; i++) {
                    sumF += this.maintainers_[i].develop(manager, n, this.project_, false);
                }
                this.testCount_ += sumF;
                if (this.testCount_ >= 6) {
                    var num = this.testCount_ / 6;
                    this.testCount_ -= 6 * (this.testCount_ / 6);
                    for (let i = 0; i < num; i++) {
                        if (this.chance(0.9)) {
                            if (this.bugBurstPeriod_.length > 0) {
                                //如果从已爆发的bug中找到了bug ，那么直接结束
                                this.bugBurstPeriod_.splice(0, 1);
                                continue;
                            }

                            this.project_.removeBug(this.generateBugLevel(), 1);
                        }
                        if (this.change(0.2)) {
                            this.project_.findBug(this.generateBugLevel(), 1);
                        }
                    }
                }
                //bug是否爆出
                this.bugDay_ += 7;
                if (this.bugDay_ > this.bugBurstPeriod_) {
                    this.bugDay_ = 0;
                    this.bugBurstPeriod_ = Math.random() * 100;
                    this.burstBugs_.push(this.generateBurstBugLevel());
                }
                break;

        }
    },

    generateBug: function () {
        var F = this.project_.currentFunction_;
        var T = this.project_.getPeriod() / 7;
        var i = this.project_.currentInnovation_;
        var HB, MB, LB;
        var B0 = F * T / 25;
        var minNum = B0 / (1 + (0.1 * I / F));
        var maxNum = B0 * (1 + (0.1 * I / F));
        var B = parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
        var HBA = parseInt(Math.random() * (15 - 5 + 1) + 5, 10);
        var MBA = parseInt(Math.random() * (40 - 20 + 1) + 20, 10) + HBA;
        while (B != 0) {
            B0 = Math.random() * 100;
            if (B0 < HBA) {
                HB++;
            }
            else if (B0 < MBA) {
                MB++;
            }
            else {
                LB++;
            }
            B--;
        }
    },



    evolve: function () {
        this.removeAllperson();
        switch (this.state) {
            case 0:
                this.generateBug();
                this.state = 1;
                event = new cc.Event.EventCustom('TEST', true);
                event.detail.group = this;
                this.node.dispatchEvent(event);
                break;
            case 1:
                this.state = 2;
                event = new cc.Event.EventCustom('PUBLISH', true);
                event.detail.group = this;
                this.node.dispatchEvent(event);
                event = new cc.Event.EventCustom('GETDATE', true);
                this.node.dispatchEvent(event);
                var nowday = event.detail.back;
                this.project_.finishDay_ = nowday;
                //开始运营，那么此时需要开始bug爆出,bugDay_表示距离上一次bug爆发过了多少天
                this.bugDay_ = 0;
                //burstBugs 是一个爆出的bug的数组，初始为0，在维护人员减少bug时，优先减少这个数组里的bug
                //同时这个数组里的bug影响 影响力因子
                this.burstBugs_ = [];
                //生成一个1~100的数字，表示bug爆出的周期
                this.bugBurstPeriod_ = Math.random() * 100;
                break;
        }
    },

    isDevelopEnd: function () {
        return this.state == 0 && this.project.isDevelopEnd();
    },

    isDevelopEnough: function () {
        return this.state == 0 && this.project.isDevelopEnough();
    },

    isFinished: function () {
        return this.project_.isFinished();
    },

    isOverdue: function () {
        return this.project_.isOverdue();
    },

    isConsign: function () {
        return this.project.isConsigned();
    },

    getProject: function () {
        return this.project_;
    },

    getReward: function () {
        return this.project_.getReward();
    },

    removePerson: function (person) {
        person.stop();
        for (let i = 0; i < this.persons_.length; i++) {
            if (this.persons_[i].index_ == person.index_) {
                this.persons_.splice(i, 1);
                break;
            }
        }
        if (this.state == 2) {
            for (let i = 0; i < this.maintainers_.length; i++) {
                if (this.maintainers_[i].index_ == person.index_) {
                    this.maintainers_.splice(i, 1);
                    break;
                }
            }
        }
    },

    addPerson: function (person, isSale) {
        person.begin();
        if (isSale) {
            this.maintainers_.push(person);
        }
        else {
            this.persons_.push(person);
        }
    },

    removeAllPerson: function () {
        for (let i = 0; i < this.persons_.length; i++) {
            this.persons_[i].stop();
        }
        for (let i = 0; i < this.maintainers_.length; i++) {
            this.maintainers_[i].stop();
        }
        this.maintainers_ = [];
        this.persons_ = []
    },

    setReward: function (reward) {
        this.project_.setReward(reward);
    },

    setIncomeWay: function (way) {
        this.incomeWay_ = way
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    pause: function () {
        this.unschedule(this.dialogueSystem);
        this.unshedule(this.individual);
        this.unshedule(this.weekIndividual);
    },

    resume: function (time) {
        this.schedule(this.dialogueSystem, time);
        this.schedule(this.individual, time);
        this.schedule(this.weekIndividual, time * 7);
    },

    individual:function(){
        for(let i = 0 ; i < this.persons_.length ; i++)
        {
            var person = this.persons_[i];
            person.daily();
        }
    },

    weekIndividual:function(){
        for(let i = 0 ; i < this.persons_.length ; i++)
        {
            var person = this.persons_[i];
            person.weekly();
        }
    },

    dialogueSystem: function () {
        var rnd = Math.random()
        if (rnd < 0.9) {
            // say public dialogue
            var index = getRandomInt(0, persons_.length)
            persons_[index].sayPublic(publicDialogue)
        } else {
            // say special dialogue
            var dialogueIndex = getRandomInt(21, 26)
            switch (dialogueIndex) {
                case 21:
                case 22:
                case 23:
                    if (persons_.length < 2) {
                        break
                    }
                    // 直邮项目组成员数不小于2时，此对话才可能触发
                    var ps = getUnique(persons_, 2)
                    p1, p2 = ps
                    p1.saySomething("同志们，你们帮我看看这个怎么就崩了…… ")
                    rnd1 = getRandomInt(0, 3)
                    switch (rnd1) {
                        case 0:
                            p2.saySomething("先自己上网搜一下吧")
                            break
                        case 1:
                            p2.saySomething("好吧，我正好不忙，帮你看看 ")
                            p1.saySomething("谢啦，中午请你吃饭哈")
                            break
                        case 2:
                            p2.saySomething("这个不太重要，你先做其他的，等我有空了帮你看看.")
                            p1.saySomething("┗|｀O′|┛ 喵喵喵~~")
                            break
                        default:
                            break
                    }
                case 24:
                case 25:
                default:
                    break
            }

        }
    },

    addMood:function(value)
    {
        for(let i = 0 ; i < this.persons_.length ; i++)
        {
            this.persons_[i].mood_ += value;
        }
    },
    addMoodRandom:function(value)
    {
        var index = Math.floor(this.persons_.length * Math.random());
        this.persons_[index].mood_ += value;
    }

});

// 从数组arrayNum中不重复的随机抽取count个element，返回一个新的数组
function getUnique(arrayNum, count) {
    // Make a copy of the array
    var tmp = arrayNum.slice(arrayNum);
    var ret = [];

    for (var i = 0; i < count; i++) {
        var index = Math.floor(Math.random() * tmp.length);
        var removed = tmp.splice(index, 1);
        // Since we are only removing one element
        ret.push(removed[0]);
    }
    return ret;
}
