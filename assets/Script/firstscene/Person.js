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
var Sticker = cc.Enum({
    sticker0: 0,
    sticker1: 1
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
        // 不屈性格激活，剩余工作天数,
        unyieldingDays_: 0,
        // 正在说的话
        month_: ""
    },

    updateCoef: function (coef) {
        this.coef = coef;
    },
    init: function (person) {
        // 根据一定概率初始化人物性格
        this.randomCharacter();
        //这里根据外界的person数据，初始化属性，不能直接用外界的数据，因为它们没有方法
        this.gift_ = person.gift_;
        this.coding_ = person.coding_;
        this.science_ = person.science_;
        this.art_ = person.art_;
        this.creativity_ = person.creativity_;
        this.manager_ = person.manager_;
        this.business_ = person.business_;
        //初始时是空闲的
        this.state_ = 1,
        /**工资 */
        this.salary_ = person.salary_;
        /**雇佣金 */
        this.employMoney_ = person.employMoney_;
        // 姓名
        this.name_ = person.name_,
        // 职能
        this.profession_ = person.profession_,
        this.index_ = person.index_,
        //等级
        this.level_ = person.level_;
        // 体力值
        this.power_ = person.power_,
        // 心情
        this.mood_ = person.mood_,
        // 通过活动可以获得
        this.moodAddition_ = person.moodAddition_,
        // 性格,随机一个性格
        this.coef = null,
        // 剩余的休息时间
        this.relaxDays_ = person.relaxDays_;
        // 不屈性格激活，剩余工作天数,
        this.unyieldingDays_ = person.unyieldingDays_;

        this.coef = new Object();
        //这里需要把相关属性初始化为1
        this.coef.F = 1;   // 功能 受2,6,7,8影响
        this.coef.P = 1;   // 性能 6,8,9
        this.coef.E = 1;   // 体验 3,31,35,36
        this.coef.I = 1;   // 创新 32,34
        this.coef.CP = 1;  // 暴击概率 11
        this.coef.CR = 1;  // 暴击倍率
        this.coef.EM = 1;  // 雇佣金 15 *
        this.coef.MA = 1;  // 管理能力 16 *
        this.coef.SC = 1;  // 体力消耗 17 *
    },
    // ambitionBuff是团队中产生的野心buff, 默认为1，即不加成
    develop: function (manager, n, project, flag, ambitionBuff) {
        var F = this.coef.F * (1 / (n ^ (50 / (manager + 50)))) * (this.coding_ / 10) * (rand(0.9, 1.1));    //功能
        var P = this.coef.P * (1 / (n ^ (50 / (manager + 50)))) * (this.science_ / 10) * (rand(0.9, 1.1));   //性能
        var E = this.coef.E * (1 / (n ^ (50 / (manager + 50)))) * (this.art_ / 10) * (rand(0.9, 1.1));       //体验
        var I = this.coef.I * (1 / (n ^ (50 / (manager + 50)))) * (this.creativity_ / 10) * (rand(0.9, 1.1)); //创意
        var criticalPro = this.coef.CP * this.creativity_ / (this.creativity_ + 200); // 暴击率
        var criticalRate = this.coef.CR * (1 + (5 * Math.sqrt(this.science_)) / 100);    // 暴击倍率

        var difficulty = project.difficulty_;

        // 逆境(adversity):体力为0时仍可以继续工作1周，且该周暴击倍率增加100%
        if (this.character_ === Character.adversity && this.unyieldingDays_ < 7 && this.unyieldingDays_ >= 0) {
            criticalRate *= 2
        }

        // 冷静(calm):暴击率-10%，无视20%任务难度
        if (this.character_ === Character.calm) {
            criticalPro *= 0.9
            difficulty *= 0.8
        }
        // 攻坚(storming):无视项目难度20%，结算点数时额外增加剩余功能点数的8%（该点数无视任务难度），一周触发一次。
        if (this.character_ === Character.calm) {
            difficulty *= 0.8
        }
        // 稳重(steady):暴击率-5%，无视30%任务难度
        if (this.character_ === Character.steady) {
            criticalPro *= 0.95
            difficulty *= 0.7
        }
        // 敏锐(keen):暴击率增加5%，暴击倍率增加5%
        if (this.character_ === Character.keen) {
            criticalPro *= 1.05
            difficulty *= 1.05
        }
        // 鬼才(ghost):暴击率增加10%，暴击倍率增加10%
        if (this.character_ === Character.keen) {
            criticalPro *= 1.1
            difficulty *= 1.1
        }

        // 触发暴击
        if ((rand(0.0, 1.0) < criticalPro)) {
            F = F * criticalRate;
            P = P * criticalRate;
            E = E * criticalRate;
            I = I * criticalRate;
            // 执着(persistent):获得科研点数有50%概率增加50%
            if (this.character_ === Character.persistent) {
                if (Math.random() < 0.5) {
                    this.node.dispatchEvent(new cc.Event.EventCustom('addS5', true));
                }
            }
            // 天才(genius):获得科研点数增加50%
            else if (this.character_ === Character.genius) {
                this.node.dispatchEvent(new cc.Event.EventCustom('addS5', true));
            }
            else {
                this.node.dispatchEvent(new cc.Event.EventCustom('addS1', true));
            }

            // 嘿，我真是个天才（暴击时）
            // 精力集中，一发入魂（暴击时）
            if (Math.random() < 0.5) {
                this.saySomething("嘿，我真是个天才")
            } else {
                this.saySomething("精力集中，一发入魂")
            }
        }
    
        // 根据项目难度：减少的任务点数增量百分比 = (任务难度 * 0.06) / (任务难度 * 0.06 + 1)
        F *= (1 - (difficulty * 0.06) / (0.06 * difficulty + 1))
        P *= (1 - (difficulty * 0.06) / (0.06 * difficulty + 1))
        E *= (1 - (difficulty * 0.06) / (0.06 * difficulty + 1))
        I *= (1 - (difficulty * 0.06) / (0.06 * difficulty + 1))

        // 逗逼(funny):集成了图王和唠叨的所有缺(划)优点，以下技能每周触发一次： 有25%概率使项目组中的某一个人心情+1;有25%概率使项目组中的某一个人心情+3; 有5%概率不贡献任何点数
        if (this.character_ === Character.funny) {
            // 有5%概率不贡献任何点数
            rnd = Math.random();
            if (rnd < 0.05) {
                F = 0
                P = 0
                E = 0
                I = 0
            }
        }
       
        // 只有处于工作状态的员工才会增加进度
        if (this.state_ === eState.working && flag) {
            // 认真(serious):开发时额外增加5%点数，参与项目bug数量降低30%
            if (this.character_ === this.serious) {
                for (var i = 0; i < project.bugnum_.length; i++) {
                    project.bugnum_[i] = Math.floor(project.bugnum_[i] * 0.7)
                }
                F *= 1.05
                P *= 1.05
                E *= 1.05
                I *= 1.05
            }
            // 实干(hardWork):开发时额外增加10%点数，参与项目bug数量降低50%
            if (this.character_ === this.hardWork) {
                for (var i = 0; i < project.bugnum_.length; i++) {
                    project.bugnum_[i] = Math.floor(project.bugnum_[i] * 0.5)
                }
                F *= 1.1
                P *= 1.1
                E *= 1.1
                I *= 1.1
            }
            // 好胜(ambition):同项目组中如果有比他能力强的人，则开发时额外增加10%点数
            if (this.character_ === this.ambition) {
                var event = new cc.Event.EventCustom('teammates-ability-is-stronger', true)
                event.person = this;
                event.group = this.group_;
                this.node.dispatchEvent(event);
                var ambitionAcitve_ = event.back
                if (ambitionAcitve_) {
                    F *= 1.1
                    P *= 1.1
                    E *= 1.1
                    I *= 1.1
                }
            }
            if (this.character_ === this.bigAmnition) {
                var event = new cc.Event.EventCustom('teammates-ability-is-stronger', true)
                event.person = this;
                event.group = this.group_;
                this.node.dispatchEvent(event);
                var ambitionAcitve_ = event.back
                if (ambitionAcitve_) {
                    F *= 1.1
                    P *= 1.1
                    E *= 1.1
                    I *= 1.1
                } else {
                    this.group_.amibitionBuff_ = 1.1
                }
            }
            // 团队中产生的野心buff
            // 野心(bigAmnition):若是项目组中能力最强的人，将提升所有人10%点数；若不是则自己增加额外10%点数。
            if (ambitionBuff != undefined) {
                F *= ambitionBuff
                P *= ambitionBuff
                E *= ambitionBuff
                I *= ambitionBuff
            }

            // 灵性(spirituality):增加项目点数时有30%概率使增加点数翻倍，可叠加暴击
            if (this.character_ === this.spirituality) {
                if (Math.random() < 0.3) {
                    F *= 2
                    P *= 2
                    E *= 2
                    I *= 2
                }
            }

            // 增加项目的点数
            project.augment(0, F);
            project.augment(1, P);
            project.augment(2, E);
            project.augment(3, I);

            // 我找到了一个bug（测试阶段时出现）
            // 又到了捉虫子的时候了（测试阶段时出现）
            if (this.group_.state_ === 1) {
                if (Math.random() < 0.5) {
                    this.saySomething("我找到了一个bug")
                } else {
                    this.saySomething("又到了捉虫子的时候了")
                }
            }

            // 洞察(insight):如果参与测试阶段，所有bug将被发现
            if (this.character_ === Character.insight) {
                if (this.group_.state_ === 1) {
                    project.bugnum_[1] += project.bugnum_[0]
                    project.bugnum_[3] += project.bugnum_[2]
                    project.bugnum_[5] += project.bugnum_[4]
                    project.bugnum_[0] = 0
                    project.bugnum_[2] = 0
                    project.bugnum_[4] = 0
                }
            }
        }
        /*console.log("功能点数");
        console.log(F);
        console.log("体验点数");
        console.log(E);
        console.log("性能点数");
        console.log(P);
        console.log("创新点数");
        console.log(I);*/
        //为了更好的实现bug减少的机制，所以这里返回增加的功能点数...
        return F;
    },
    test: function (project) {
        // 洞察(insight):如果参与测试阶段，所有bug将被发现
        if (this.character_ === Character.insight) {
            for (var i = 0; i < project.bugnum_.length; i++) {
                project.bugnum_[i] = 0
            }
        }
    },
    begin: function () {
        /**开始工作 */
        if (this.state_ === eState.free) {
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

    randomCharacter: function () {
        var rnd = Math.random();
        if (rnd < 0.75) {
            var rndInt = getRandomInt(Character.imageKing, Character.persistent + 1);
            this.character_ = rndInt;
        } else if (rnd < 0.95) {
            var rndInt = getRandomInt(Character.steady, Character.genius + 1);
            this.character_ = rndInt;
        } else {
            var rndInt = getRandomInt(Character.insight, Character.spirituality + 1);
            this.character_ = rndInt;
        }
    },
    // update: function (dt) {

    // },
    sendSticker: function (sticker) {
        cc.log(this.name + ": " + sticker);
    },
    saySomething: function (saying) {
        // https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
        sleep(1000)
        if (this.character_ === Character.slience) {
            this.month_ = "......"
            return false
        } else {
            this.month_ = saying
            return true
        }
    },
    sayPublic: function (set) {
        //var s = set.entries()[0][0]
        let array = Array.from(set);
        var s = array[0];
        console.log(s);
        if (this.character_ === Character.blabla || this.character_ === Character.funny) {
            this.saySomething(s)
        } else {
            if (Math.random() < 0.2) {
                this.saySomething(s)
            }
        }
    },
    moodIncrement: function (value) {
        this.mood = (this.mood + value) % 10;
    },
    weekly: function () {
        // 每周被调用一次
        // 攻坚(storming):无视项目难度20%，结算点数时额外增加剩余功能点数的8%（该点数无视任务难度），一周触发一次。
        if (this.character_ === Character.storming) {

        }
    },
    daily: function () {
        // 每天被调用一次
        if (this.state_ === eState.working) {
            this.power_ -= 5;
            this.mood_ = (this.moodAddition_ + getRandomInt(0, 10)) % 10;
            if (this.moodAddition_ > -5) {
                this.moodAddition_--;
            }
            // 乐天(optimist):心情肯定大于等于5
            if (this.character_ === Character.optimist) {
                this.mood_ = getRandomInt(5, 11)
            }
            // 乐观(bigOptimist):心情肯定大于等于7
            if (this.character_ === Character.bigOptimist) {
                this.mood_ = getRandomInt(7, 11)
            }

            if (this.mood_ <= 1) {
                var rnd = Math.random()
                if (rnd < 0.33) {
                    // 感觉身体被掏空……（心情很差时出现）
                    this.saySomething("感觉身体被掏空……")
                } else if (end < 0.66) {
                    // 感觉今天好虚啊……（心情差或很差时出现）
                    this.saySomething("感觉今天好虚啊……")
                } else {
                    // 这段代码谁写的，这么丑（心情差或很差时出现）
                    this.saySomething("这段代码谁写的，这么丑")
                }
            } else if (this.mood_ <= 3) {
                var rnd = Math.random()
                if (rnd < 0.5) {
                    // 感觉今天好虚啊……（心情差或很差时出现）
                    this.saySomething("感觉今天好虚啊……")
                } else {
                    // 这段代码谁写的，这么丑（心情差或很差时出现）
                    this.saySomething("这段代码谁写的，这么丑")
                }
            } else if (this.mood_ <= 6) {
                // 心无旁骛（心情一般、好或很好时出现）
                this.saySomething("心无旁骛")
            } else if (this.mood_ <= 8) {
                if (Math.random() < 0.5) {
                    this.saySomething("就这么点功能，我能做十个")
                } else {
                    this.saySomething("心无旁骛")
                }
            } else {
                // 就这么点功能，我能做十个（心情好或很好的时候出现）
                // 产品经理真是体贴，居然让我做了我最喜欢做的功能（心情很好时出现）
                var rnd = Math.random()
                if (rnd < 0.33) {
                    this.saySomething("就这么点功能，我能做十个")
                } else if (rnd < 0.66) {
                    this.saySomething("心无旁骛")
                }
                else {
                    this.saySomething("产品经理真是体贴，居然让我做了我最喜欢做的功能")
                }
            }

            if (this.power_ <= 0) {
                if (this.character_ === Character.unyielding || this.character_ === Character.adversity) {
                    this.unyieldingDays_--;
                    if (this.unyieldingDays_ <= 0) {
                        var rnd = Math.random()
                        if (rnd < 0.33) {
                            this.saySomething("看我反向工作")
                            // 看我反向工作（体力为0准备休息时出现）
                            // 回家养生去咯（体力为0准备休息时出现）
                            // ……回家（体力为0准备休息时出现）
                        } else if (rnd < 0.66) {
                            this.saySomething("回家养生去咯")
                        } else {
                            this.saySomething("……回家")
                        }
                        this.relaxAWeek()
                    }
                } else {
                    var rnd = Math.random()
                    if (rnd < 0.33) {
                        this.saySomething("看我反向工作")
                        // 看我反向工作（体力为0准备休息时出现）
                        // 回家养生去咯（体力为0准备休息时出现）
                        // ……回家（体力为0准备休息时出现）
                    } else if (rnd < 0.66) {
                        this.saySomething("回家养生去咯")
                    } else {
                        this.saySomething("……回家")
                    }
                    this.relaxAWeek();
                }
            }
            // 体贴(thoughtful):同项目组中所有人的心情+1
            if (this.character_ === Character.thoughtful) {
                var event = new cc.Event.EventCustom('increase-all-teammates-mood', true)
                event.person = this
                event.value = 1
                this.node.dispatchEvent(event);
            }
            // 辅佐(adjuvant):同项目组中所有人的心情+2
            if (this.character_ === Character.thoughtful) {
                var event = new cc.Event.EventCustom('increase-all-teammates-mood', true)
                event.person = this
                event.value = 2
                this.node.dispatchEvent(event);
            }
        } else if (this.state_ === eState.relaxing) {
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
    characterEffect: function () {
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
                    var event = new cc.Event.EventCustom('increase-teammate-mood', true)
                    event.person = this
                    event.value = 1
                    this.node.dispatchEvent(event);
                } else if (rnd < 0.5) {
                    var event = new cc.Event.EventCustom('increase-teammate-mood', true)
                    event.person = this
                    event.value = 3
                    this.node.dispatchEvent(event);
                } else {
                    //pass
                }
                break;
        }

    }
});

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

// Getting a random integer between two values
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// Getting a random number between two values
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
