var eState = cc.Enum({
    working: 0,
    free: 1,
    relaxing: 2
});
var Character = cc.Enum({
    // B
    imageKing: 0,
    blabla: 1,
    slience: 2,
    funny: 3,
    calm: 4,
    optimist: 5,
    serious: 6,
    ambition: 7,
    unyielding: 8,
    thoughtful: 9,
    keen: 10,
    persistent: 11,
    // A
    steady: 100,
    bigOptimist: 101,
    hardWork: 102,
    bigAmnition: 103,
    adversity: 104,
    adjuvant: 105,
    ghost: 106,
    genius: 107,
    // S
    insight: 200,
    storming: 201,
    spirituality: 202
});
var Image = cc.Enum({
    image0: 0,
    image1: 1
});
var Sticker = cc.Enum({
    sticker0: 0,
    sticker1: 1
});
var Saying = cc.Enum({
    ellisis: 0,
    saying1: 1
});
var Occupation = cc.Enum({
    develper: 0,
    maintainer: 1,
    marketer: 2
});
var Activity = cc.Enum({
    activity0: 0,
    activity1: 1
});
cc.Class({
    extends: cc.Component,

    properties: {
        /**能力值 */
        gift_: 0.0,
        coding_: 0.,
        science_: 0.,
        art_: 0.,
        creativity_: 0.,
        manager_: 0.,
        business_: 0.,
        /*状态，用枚举表示，定义在上面 */
        state_: {
            default: eState.free,
            type: eState,
        },
        /**工资 */
        salary_: 0.,
        /**雇佣金 */
        employMoney_: 0.,
        // 姓名
        name_: "",
        // 职能
        profession_: Occupation.develper,
        index_: 0,
        // 体力值
        power_: 100,
        // 心情
        mood_: 10,
        // 通过活动可以获得
        moodAddition_: 0,
        // 性格
        character_: Character.slience,
        coef: null,
        // 剩余的休息时间
        relaxDays_: 0,
        // 团队同事中是否有比自己能力强的人
        ambitionAcitve_: false,
        // 不屈性格激活，剩余工作天数,
        unyieldingDays_: 0,
    },

    // use this for initialization
    onLoad: function () {
        this.coef = new Object();
        //这里需要把相关属性初始化为1
        coef.F = 1;   // 功能 受2,6,7,8影响
        coef.P = 1;   // 性能 6,8,9
        coef.E = 1;   // 体验 3,31,35,36
        coef.I = 1;   // 创新 32,34
        coef.CP = 1;  // 暴击概率 11
        coef.CR = 1;  // 暴击倍率
        coef.EM = 1;  // 雇佣金 15 *
        coef.MA = 1;  // 管理能力 16 *
        coef.SC = 1;  // 体力消耗 17 *
    },
    updateCoef: function (coef) {
        this.coef = coef;
    },
    init: function (person) {
        //初始化人物属性

    },
    develop: function (mamager, n, project, flag) {
        var F = this.coef.F * (1 / (n ^ (50 / (manager + 50)))) * (this.coding_ / 10) * (rand(0.9, 1.1));    //功能
        var P = this.coef.P * (1 / (n ^ (50 / (manager + 50)))) * (this.science_ / 10) * (rand(0.9, 1.1));   //性能
        var E = this.coef.E * (1 / (n ^ (50 / (manager + 50)))) * (this.art_ / 10) * (rand(0.9, 1.1));       //体验
        var I = this.coef.I * (1 / (n ^ (50 / (manager + 50)))) * (this.creativity_ / 10) * (rand(0.9, 1.1)); //创意
        var criticalPro = this.coef.CP * this.creativity_ / (this.creativity_ + 200);
        var criticalRate = this.coef.CR * (1 + (5 * sqrt(this.science_)) / 100);

        var diffculty = project.difficulty_
        // 冷静(calm):暴击率-10%
        if (this.character_ === Character.calm) {
            criticalPro *= 0.9
            diffculty *= 0.8
        }
        if ((rand(0.0, 1.0) < criticalPro)) {
            F = F * criticalRate;
            P = P * criticalRate;
            E = E * criticalRate;
            I = I * criticalRate;
        }

        // 根据项目难度：减少的任务点数增量百分比 = (任务难度 * 0.06) / (任务难度 * 0.06 + 1)
        F *= (1 - (diffculty * 0.06) / (0.06 * diffculty + 1))
        P *= (1 - (diffculty * 0.06) / (0.06 * diffculty + 1))
        E *= (1 - (diffculty * 0.06) / (0.06 * diffculty + 1))
        I *= (1 - (diffculty * 0.06) / (0.06 * diffculty + 1))

        switch (this.character_) {
            case Character.funny:
                // 有5%概率不贡献任何点数
                rnd = Math.random();
                if (rnd < 0.05) {
                    F = 0
                    P = 0
                    E = 0
                    I = 0
                }
                break;
        }

        // 只有处于工作状态的员工才会增加进度
        if (this.state_ == eState.working && flag) {
            if (this.character_ == this.serious) {
                // 认真(serious):开发时额外增加5%点数，参与项目bug数量降低30%
                for (var i = 0; i < project.bugnum_.length; i++) {
                    project.bugnum_[i] *= 0.7
                }
                F *= 1.05
                P *= 1.05
                E *= 1.05
                I *= 1.05
            }
            if (this.character_ == this.ambition) {
                this.node.dispatchEvent(new cc.Event.EventCustom('teammates-ability-is-stronger'));
                if (this.ambitionAcitve_) {
                    F *= 1.1
                    P *= 1.1
                    E *= 1.1
                    I *= 1.1
                }
            }
            project.augment(0, F);
            project.augment(1, P);
            project.augment(2, E);
            project.augment(3, I);
        }
        //为了更好的实现bug减少的机制，所以这里返回增加的功能点数...
        return F;
    },
    begin: function () {
        /**开始工作 */
        if (this.state_ == eState.free) {
            this.state_ = eState.working;
        } else {
            cc.log("Can not begin work");
        }
        //("开始工作");
    },
    stop: function () {
        /**停止工作 */
        this.state_ = eState.free;
        //cc.log("停止工作");
    },
    setSalary: function (salary) {
        this.salary_ = salary;
    },
    updateCoef: function (coef) {
        this.coef = coef;
    },
    getSalary: function () {
        return this.salary_;
    },
    getEmployMoney: function () {
        return this.coef.EM * this.employMoney_;
    },
    setEmployMoney: function (money) {
        this.employMoney_ = money;
    },
    setAbility: function (ability) {
        this.gift_ = ability.gift_
        this.coding_ = ability.coding_
        this.science_ = ability.science_
        this.art_ = ability.art_
        this.creativity_ = ability.creativity_
        this.manager_ = ability.manager_
        this.business_ = ability.business_
    },
    getAbility: function () {
        var r = new Object();
        r.gift_ = this.gift_,
            r.coding_ = this.coding_,
            r.science_ = this.science_,
            r.art_ = this.art_,
            r.creativity_ = this.creativity_,
            r.manager_ = this.manager_,
            r.business_ = this.business_

        return r
    },
    setName: function (name) {
        this.name_ = name;
    },
    getName: function () {
        return this.name_;
    },
    setProfession: function (profession) {
        this.profession_ = profession;
    },
    getProfession: function () {
        return this.profession_;
    },
    init: function (person) {
        // 根据一定概率初始化人物性格
        rnd = Math.random();
        if (rnd < 0.75) {
            rndInt = getRandomInt(Character.imageKing, Character.persistent + 1);
            this.character_ = rndInt;
        } else if (rnd < 0.95) {
            rndInt = getRandomInt(Character.steady, Character.genius + 1);
            this.character_ = rndInt;
        } else {
            rndInt = getRandomInt(Character.insight, Character.spirituality + 1);
            this.character_ = rndInt;
        }
    },
    update: function (dt) {

    },
    sendSticker: function (sticker) {
        cc.log(this.name + ": " + sticker)
    },
    speakSomething: function (saying) {
        cc.log(this.name + ": " + saying)
    },
    moodIncrement: function (value) {
        this.mood = (this.mood + value) % 10
    },
    weekly: function () {
        // 每周被调用一次
    },
    daily: function () {
        // 每天被调用一次
        if (this.state_ == eState.working) {
            this.power_ -= 5;
            this.mood_ = (this.moodAddition_ + getRandomInt(0, 10)) % 10;
            if (this.moodAddition_ > -5) {
                this.moodAddition_--;
            }
            if (this.character_ == Character.optimist) {
                this.mood_ = getRandomInt(5, 11)
            }
            if (this.mood_ <= 0) {
                if (this.character_ == Character.unyielding) {
                    this.unyieldingDays_--;
                    if (this.unyieldingDays_ <= 0) {
                        this.relaxAWeek()
                    }
                } else {
                    this.relaxAWeek();
                }
            }
            if (this.character_ == Character.thoughtful) {
                this.node.emit('increaseAllTeammatesMood', {
                    value: 1,
                });
            }
        } else if (this.state_ == eState.relaxing) {
            this.relaxDays_--;
            if (this.relaxDays_ <= 0) {
                this.state_ = eState.free;
            }
        }
    },
    relaxAWeek: function () {
        this.state_ = eState.relaxing;
        this.relaxDays_ = 7;
        this.unyieldingDays_ = 7;
    },
    charactorEffect: function () {
        // 这个函数期望每周被调用一次，以实现个别性格实现的特效
        switch (this.character_) {
            case Character.imageKing:
                sendSticker(getRandomInt(0, Saying.length));
                break;
            case Character.blabla:
                speakSomething(getRandomInt(0, Saying.length));
                break;
            case Character.slience:
                speakSomething(Saying.ellisis);
                break;
            case Character.funny:
                rnd = Math.random()
                if (rnd < 0.25) {
                    // 触发事件，使得团队中的随机一人心情增加。具体是谁增加，不关心，由上层节点决定
                    this.node.emit('increaseTeammateMood', {
                        value: 1,
                    });
                } else if (rnd < 0.5) {
                    this.node.emit('increaseTeammateMood', {
                        value: 3,
                    });
                } else {
                    //pass
                }
                break;
        }

    }
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
