var eState = cc.Enum({  develop :0, test : 1, operative : 2,end:3,});
var eIncomeWay = cc.Enum({ oneoff : 0, period : 1, });
var gameList = [
    "码帅leader",
    "野蛮滚出地球",
    "绝地求死",
    "命运石之洞",
    "sbeam",
    "车万朱元璋",
    "live love",
    "最初幻想1",
    "最初幻想2",
    "最初幻想3",
    "最初幻想4",
    "最初幻想5",
    "最初幻想6",
    "最初幻想7",
    "最初幻想8",
    "最初幻想9",
    "最初幻想10",
    "恶龙斗勇者1",
    "恶龙斗勇者2",
    "恶龙斗勇者3",
    "恶龙斗勇者4",
    "恶龙斗勇者5",
    "恶龙斗勇者6",
    "恶龙斗勇者7",
    "恶龙斗勇者8",
    "恶龙斗勇者9",
    "恶龙斗勇者10",
    "恶龙斗勇者1",
    "恶龙斗勇者2",
    "恶龙斗勇者3",
    "恶龙斗勇者4",
    "恶龙斗勇者5",
    "恶龙斗勇者6",
    "恶龙斗勇者7",
    "恶龙斗勇者8",
    "恶龙斗勇者9",
    "恶龙斗勇者10",
    "黑色相簿1",
    "黑色相簿2",
    "黑色相簿3",
    "黑色相簿4",
    "黑色相簿5",
    "黑色相簿6",
    "黑色相簿7",
    "黑色相簿8",
    "黑色相簿9",
    "黑色相簿10",
    "野蛮1",
    "野蛮2",
    "野蛮3",
    "野蛮4",
    "野蛮5",
    "野蛮6",
    "野蛮7",
    "野蛮8",
    "野蛮9",
    "野蛮10",
    "宠物打精灵1",
    "宠物打精灵2",
    "宠物打精灵3",
    "宠物打精灵4",
    "宠物打精灵5",
    "宠物打精灵6",
    "宠物打精灵7",
    "宠物打精灵8",
    "宠物打精灵9",
    "宠物打精灵10"
];
var publicDialogue = new Set([
    "今天天气不错啊",
    "你bug调完没",
    "果然PHP是世界上最好的语言",
    "早上好",
    "晚上好",
    "夜里好",
    "今天的BUG，好喧嚣啊",
    "……",
]);
var food = [
    "包子",
    "饺子",
    "面条",
    "炒饭",
    "炒河粉",
    "烤冷面",
    "麻辣烫",
    "煲仔饭",
    "麻辣香锅",
    "pizza",
    "汉堡",
    "牛排",
    "鲱鱼罐头",
    "臭豆腐",
    "豆汁配焦圈",
    "贝爷套餐",
    "bug",
    "土",
    "烤昆虫",
    "怀石料理",
    "藿香正气水",
    "崂山蛇草水"
];
var restaurants = [
    "银拱门",
    "金聚得",
    "开封菜",
    "红红火火恍恍惚惚",
    "必输客",
    "康帅博牛肉面",
    "喆里予家",
    "永＆犬王",
    "3DM",
    "……记不清了"
];
var time = [
    "中午",
    "晚上",
    "夜宵"
]
cc.Class({
    extends: cc.Component,

    properties: {
        node: {
            default: null,
            override: true,
            type: cc.Node,
        },
        persons_: {
            default: [],
            type: [cc.Prefab]
        },
        maintainers_: {
            default: [],
            type: [cc.Prefab]
        },
        project_: {
            default: null,
            type: cc.Prefab
        },
        state_: {
            default: 0,
            type: eState
        },
        incomeWay_: {
            default: 0,
            type: eIncomeWay
        },
        usernum_: {
            default: 0,
            type: cc.Integer,
        },
        testCount_: 0.,
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
        var event = new cc.Event.EventCustom('get-company-name', true);
        this.node.dispatchEvent(event);
        var companyName = event.detail.back
        publicDialogue.add("凌晨5点的 " + companyName + " 公司，好安静")
        publicDialogue.add("凌晨4点的 " + companyName + " 公司，好安静")
        publicDialogue.add("凌晨3点的 " + companyName + " 公司，好安静")
        publicDialogue.add("凌晨2点的 " + companyName + " 公司，好安静")
        publicDialogue.add("凌晨1点的 " + companyName + " 公司，好安静")
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    pause: function () {
        this.unschedule(this.dialogueSystem);
    },

    resume: function (time) {
        this.schedule(this.dialogueSystem, 2);
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
                    if (persons_.length < 2) {
                        break
                    }
                    // 只有项目组成员数不小于2时，此对话才可能触发
                    var ps = getUnique(persons_, 2)
                    p1, p2 = ps
                    if (!p1.saySomething("今天" + getRandomElementFromArray(time) + "吃什么？")) {
                        break
                    }
                    var rnd1 = getRandomInt(0, 3)
                    switch (rnd1) {
                        case 0:
                            var rnd2 = getRandomInt(1, 4)
                            if (p2.saySomething(getRandomElementFromArray(["我觉得", "要不"]) + getUnique(food, rnd2).join(getRandomElementFromArray(["或者", "、"])))) {
                                p1.saySomething("大家意见不同，要不各吃各的吧。")
                            }
                            break
                        case 1:
                            if (p2.saySomething("门口开了一家新店，好像叫" + getRandomElementFromArray(restaurants))) {
                                p1.saySomething("    那我们过去看看吧")
                            }
                            break
                        case 2:
                            if (p2.saySomething("对不起，我bug还剩好多……我就不跟你们吃去了")) {
                                p1.saySomething("那我们先去吃，你加油改bug吧。")
                                p2.saySomething("嗯，帮我捎份饭…… ")
                                var rnd3 = getRandomInt(0, 2)
                                if (rnd === 0) {
                                    p1.saySomething("叫声爸爸=。=")
                                } else {
                                    p1.saySomething("好")
                                }
                            }
                            p1.saySomething("哈哈哈，就你这破电脑也就能玩玩扫雷了 ")
                            var rnd2 = getRandomInt(0, 2)
                            switch (rnd2) {
                                case 0:
                                    p1.saySomething("上次玩扫雷卡了TAT ")
                                    var rnd3 = getRandomInt(0, 2)
                                    switch (rnd3) {
                                        case 0:
                                            p2.saySomething("……（拍拍肩）哥带你看看新电脑……")
                                            break
                                        case 1:
                                            p2.saySomething("看来我高估你的电脑了……")
                                            break
                                        default:
                                            break
                                    }
                                    break
                                case 1:
                                    p1.saySomething("什么！玩个三维弹球还是可以的=。=")
                                    break
                                default:
                                    break
                            }
                            break
                        case 3:
                            p2.saySomething("躺在购物车中ing")
                            break
                        default:
                            break
                    }
                    break
                case 22:
                    if (persons_.length < 2) {
                        break
                    }
                    // 只有项目组成员数不小于2时，此对话才可能触发
                    var ps = getUnique(persons_, 2)
                    p1, p2 = ps
                    if (!p1.saySomething("嘿，出去喝一杯吗?")) {
                        break
                    }
                    var rnd1 = getRandomInt(0, 3)
                    switch (rnd1) {
                        case 0:
                            p2.saySomething("好啊，门口串店走起！")
                            break
                        case 1:
                            if (p2.saySomething("sorry，我bug还剩好多…… ")) {
                                var rnd2 = getRandomInt(0, 2)
                                switch (rnd2) {
                                    case 0:
                                        p1.saySomething("好吧")
                                        break
                                    case 1:
                                        p1.saySomething("喝完debug效率飕飕的 ")
                                        var rnd3 = getRandomInt(0, 2)
                                        switch (rnd3) {
                                            case 0:
                                                p2.saySomething(那也算了)
                                                break
                                            case 1:
                                                p2.saySomething("好，如果de不完明天午饭请我 ")
                                                p1.saySomething("Nice")
                                                break
                                            default:
                                                break
                                        }
                                        break
                                    default:
                                        break
                                }
                                break
                            }
                            break
                        case 2:
                            if (p2.saySomething("不行，我一会儿还要开车（抱歉状）")) {
                                p1.saySomething("好吧，那就不勉强你了")
                            }
                            break
                        default:
                            break
                    }
                    break
                case 23:
                    if (persons_.length < 2) {
                        break
                    }
                    // 只有项目组成员数不小于2时，此对话才可能触发
                    var ps = getUnique(persons_, 2)
                    p1, p2 = ps
                    if (!p1.saySomething("同志们，你们帮我看看这个怎么就崩了…… ")) {
                        break
                    }
                    var rnd1 = getRandomInt(0, 3)
                    switch (rnd1) {
                        case 0:
                            p2.saySomething("先自己上网搜一下吧")
                            break
                        case 1:
                            if (p2.saySomething("好吧，我正好不忙，帮你看看 ")) {
                                p1.saySomething("谢啦，中午请你吃饭哈")
                            }
                            break
                        case 2:
                            if (p2.saySomething("这个不太重要，你先做其他的，等我有空了帮你看看.")) {
                                p1.saySomething("┗|｀O′|┛ 喵喵喵~~")
                            }
                            break
                        default:
                            break
                    }
                    break
                case 24:
                    if (persons_.length < 2) {
                        break
                    }
                    // 只有项目组成员数不小于2时，此对话才可能触发
                    var ps = getUnique(persons_, 2)
                    p1, p2 = ps
                    if (!p1.saySomething("上周新出的游戏你们买了吗，就是那个大名鼎鼎的" + getRandomGame())) {
                        break
                    }
                    var rnd1 = getRandomInt(0, 4)
                    switch (rnd1) {
                        case 0:
                            p2.saySomething("必然啊，经典！")
                            break
                        case 1:
                            if (!p2.saySomething("买了，后悔了")) {
                                break
                            }
                            var rnd2 = getRandomInt(0, 2)
                            switch (rnd2) {
                                case 0:
                                    p1.saySomething("为啥？我觉得挺好玩的")
                                    p2.saySomething("因为买了就吃土了……这游戏咋这么贵TAT")
                                    break
                                case 1:
                                    p1.saySomething("是吗？那我就不买了")
                                    break
                                default:
                                    break
                            }
                            break
                        case 2:
                            if (!p2.saySomething("买了，可惜带不动（捂脸状 ")) {
                                break
                            }
                            p1.saySomething("哈哈哈，就你这破电脑也就能玩玩扫雷了 ")
                            var rnd2 = getRandomInt(0, 2)
                            switch (rnd2) {
                                case 0:
                                    p1.saySomething("上次玩扫雷卡了TAT ")
                                    var rnd3 = getRandomInt(0, 2)
                                    switch (rnd3) {
                                        case 0:
                                            p2.saySomething("……（拍拍肩）哥带你看看新电脑……")
                                            break
                                        case 1:
                                            p2.saySomething("看来我高估你的电脑了……")
                                            break
                                        default:
                                            break
                                    }
                                    break
                                case 1:
                                    p1.saySomething("什么！玩个三维弹球还是可以的=。=")
                                    break
                                default:
                                    break
                            }
                            break
                        case 3:
                            p2.saySomething("躺在购物车中ing")
                            break
                        default:
                            break
                    }
                    break
                case 25:
                    if (persons_.length < 2) {
                        break
                    }
                    // 只有项目组成员数不小于2时，此对话才可能触发
                    var ps = getUnique(persons_, 7)
                    if (!ps[0].saySomething("今天上班路上咋这么堵啊")) {
                        break
                    }
                    if (ps[1] != undefined) {
                        ps[1].saySomething("地铁党并不懂你在说什么")
                    }
                    if (ps[2] != undefined) {
                        ps[2].saySomething("昨天没回家的并不懂你在说什么")
                    }
                    if (ps[3] != undefined) {
                        if (ps[3].saySomething("开飞机来的并不懂你在说什么 ")) {
                            ps[0].saySomething("原来堵在路上的飞机是你**的！")
                        }
                    }
                    if (ps[4] != undefined) {
                        if (ps[4].saySomething("听说龙卷风摧毁了停车场 ")) {
                            ps[0].saySomething("我真能活着上班啊……")
                        }
                    }
                    if (ps[5] != undefined) {
                        if (ps[5].saySomething("听说小行星撞地球了，看来应该是砸到上班路上了")) {
                            ps[0].saySomething("哦，那颗小行星被我吃了，正好没吃早饭 ")
                            ps[5].saySomething("你咋不上天呢")
                        }
                    }
                    if (ps[6] != undefined) {
                        if (!ps[6].saySomething("你晚高峰上班能不堵吗……话说你来干嘛 ")) {
                            break
                        }
                        var rnd1 = getRandomInt(0, 2)
                        switch (rnd1) {
                            case 0:
                                ps[0].saySomething("？当然过来吃饭了，单位食堂又便宜又好吃 ")
                                ps[6].saySomething("你个吃货……小心老板请你喝茶")
                                break
                            case 1:
                                p2.saySomething("上夜班，昨天已经跟老板说过了，哦不今天早上。 ")
                                p1.saySomething("你注意点，最近猝死的比较多……")
                                break
                            default:
                                break
                        }
                        break
                    }
                    break
                default:
                    break
            }

        }
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

function getRandomElementFromArray(array) {
    var rnd = getRandomInt(0, array.length);
    return gameList[rnd];
}

// Getting a random integer between two values
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}