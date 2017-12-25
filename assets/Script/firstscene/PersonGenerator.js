var personObj=require('Person');
cc.Class({
    extends: cc.Component,

    properties: {
    },
    //根据传入的level返回可用的person列表,在人们选择好某种招聘方式时调用它，所以这里还需要调用expend扣除一定招聘费用
    showPersons:function(level){
        //分为初级，中级，高级，特级
        var persons = [];
        var maxnum = 4;

        var personList = [];
        //首先把人物分级
        for(let i = 0 ; i < this.persons_.length ; i++)
        {
            var person = this.persons_[i];
            var templevel = person.level_;
            console.log(templevel);
            if(personList[templevel] == undefined)
            {
                personList[templevel] = [];
            }
            personList[templevel].push(person);
        }
        console.log(personList);
        for(let i = 0 ; i < maxnum ; i++)
        {
            var pro = Math.random();
            switch(level){
                case 0 :
                    if(pro > 0.7)
                    {
                        var person = personList[0][0];
                        if(person != undefined)
                        {
                            persons.push(person);
                            personList[0].splice(0, 1);
                        }
                    }
                    else{
                        var person = personList[1][0];
                        if(person != undefined)
                        {
                            persons.push(person);
                            personList[1].splice(0, 1);
                        }
                    }
                    break;
                case 1:
                    if(pro <= 0.6)
                    {
                        var person = personList[0][0];
                        if(person != undefined)
                        {
                            persons.push(person);
                            personList[0].splice(0, 1);
                        }
                    }
                    else if(pro > 0.6 && pro <= 0.9){
                        var person = personList[1][0];
                        if(person != undefined)
                        {
                            persons.push(person);
                            personList[1].splice(0, 1);
                        }
                    }
                    else{
                        var person = personList[2][0];
                        if(person != undefined)
                        {
                            persons.push(person);
                            personList[2].splice(0, 1);
                        }
                    }
                    break;
                case 2:
                    if(pro <= 0.6)
                    {
                        var person = personList[1][0];
                        if(person != undefined)
                        {
                            persons.push(person);
                            personList[1].splice(0, 1);
                        }
                    }
                    else if(pro > 0.6 && pro <= 0.87){
                        var person = personList[2][0];
                        if(person != undefined)
                        {
                            persons.push(person);
                            personList[2].splice(0, 1);
                        }
                    }
                    else if(pro > 0.87 && pro <= 0.97)
                    {
                        var person = personList[3][0];
                        if(person != undefined)
                        {
                            persons.push(person);
                            personList[3].splice(0, 1);
                        }
                    }
                    else{
                        var person = personList[4][0];
                        if(person != undefined)
                        {
                            persons.push(person);
                            personList[4].splice(0, 1);
                        }
                    }
                    break;
                case 3:
                    if(pro <= 0.6)
                    {
                        var person = personList[2][0];
                        if(person != undefined)
                        {
                            persons.push(person);
                            personList[2].splice(0, 1);
                        }
                    }
                    else if(pro > 0.6 && pro <= 0.87){
                        var person = personList[3][0];
                        if(person != undefined)
                        {
                            persons.push(person);
                            personList[3].splice(0, 1);
                        }
                    }
                    else if(pro > 0.87 && pro <= 0.97)
                    {
                        var person = personList[4][0];
                        if(person != undefined)
                        {
                            persons.push(person);
                            personList[4].splice(0, 1);
                        }
                    }
                    else{
                        var person = personList[5][0];
                        if(person != undefined)
                        {
                            persons.push(person);
                            personList[5].splice(0, 1);
                        }
                    }
                    break;
                }
        }

        return persons;
        /*var level =Math.floor( Math.random() * 8);
        var ac=cc.find('Event/Game/Date/Account').getComponent('Account');
        //ac.expend(this.pgs[level].cost_, '发布招聘信息');
        ac.expend(this.pgs[level].cost_, '发布招聘信息');
        var event = new cc.Event.EventCustom('MESSAGE', true);
        event.type = "SUCCESS";
        event.string = this.pgs[level].description_;
        this.node.dispatchEvent(event);
        var list = [];
        for(let i=0 ; i < this.persons_.length ; i++){
            if(this.persons_[i].level_ == level){
                list.push(this.persons_[i]);
            }
        }*/
        //return list;
    },

    removePerson: function(index) {
        var person=null;
        for(var i=0;i<this.persons_.length;i++){
            //console.log(this.persons_[i].index_);
            if(this.persons_[i].index_ == index){
                person=this.persons_[i];
                break;
            }
        }
        var event=new cc.Event.EventCustom('HIRE', true);
        event.person=person;
        this.node.dispatchEvent(event);
        if(event.back){
            for(let i=0;i<this.persons_.length;i++){
                if(this.persons_[i].index_== index){
                    this.persons_.splice(i,1);
                    return true;
                }
            }
        }
    },

    addPerson: function(index){
        var event=new cc.Event.EventCustom('FIRE', true);
        event.index=index;
        this.node.dispatchEvent(event);
        console.log(event.back);
        this.persons_.push(event.back);
    },


    // use this for initialization
    init:function(persons){
        this.persons_ = [];
        for(var i=0;i<persons.length;++i){
            var person = new personObj();
            person.init(persons[i]);
            person.node = this.node;
            this.persons_.push(person);
        }
        console.log(this.persons_);
    },
    onLoad: function () {
        var levelcount = 8;     
        //暂时定为7个等级
        this.pgs=[];
        this.persons_ = [];
        //不同等级的招聘方式信息
        var templist=[
            {
                description_ : "经过了熟人介绍",
                level_ : 0,
                cost_ : 500, 
            },
            {
                description_ : "经过了网络招聘",
                level_ : 1,
                cost_ : 1200, 
            },
            {
                description_ : "经过了高校招生发布会",
                level_ : 2,
                cost_ : 2000, 
            },
            
            {
                description_ : "你去挖大公司墙脚",
                level_ : 3,
                cost_ : 5000, 
            },
            {
                description_ : '打开了一个精灵球',
                level_ : 4,
                cost_: 20000,
            },
            {
                description_ : "使用了神秘召唤仪式",
                level_ : 5,
                cost_ : 30000, 
            },
            {
                description_ : "你打开了虚空的大门",
                level_ : 6,
                cost_ : 50000, 

            },
            {
                description_ : '与恶魔签订了契约',
                level_ : 7,
                cost_ : 70000,
            }
        ];

        var list=[
            {
                gift_: 10.0,
                coding_: 1.,
                science_: 2.,
                art_: 3.,
                creativity_: 4.,
                manager_: 5.,
                business_: 10.,
                /**工资 */
                salary_: 100.,
                /**雇佣金 */
                employMoney_: 100.,
                // 姓名
                name_: "陈潇陆",
                // 职能
                profession_: 0,
                index_: 7,
                // 体力值
                power_: 100,
                // 心情
                mood_: 10,
                // 通过活动可以获得
                moodAddition_: 0,
                // 性格
                character_: 0,
                coef: null,
                // 剩余的休息时间
                relaxDays_: 0,
                // 不屈性格激活，剩余工作天数,
                unyieldingDays_: 0,
            },
            {
                gift_: 10.0,
                coding_: 5.,
                science_: 10.,
                art_: 10.,
                creativity_: 10.,
                manager_: 10.,
                business_: 10.,
                state_: 0,
                /**工资 */
                salary_: 100.,
                /**雇佣金 */
                employMoney_: 100.,
                // 姓名
                name_: "迪姐特斯拉",
                // 职能
                profession_: 0,
                index_: 25,
                // 体力值
                power_: 100,
                // 心情
                mood_: 10,
                // 通过活动可以获得
                moodAddition_: 0,
                // 性格
                character_: 0,
                coef: null,
                // 剩余的休息时间
                relaxDays_: 0,
                // 不屈性格激活，剩余工作天数,
                unyieldingDays_: 0,
            },
            /*{
                abilityCoding_: 100,
                abilityManage_: 10,
                abilityArt_: 60,
                salary_: 250,
                employMoney_: 1000,
                index:1,
                name_: "乔布斯",
                profession_: "程序员",
                supplicateLine_: "希望你们没了我还能正常运转"
            },
            {
                abilityCoding_: 1000,
                abilityManage_: 50,
                abilityArt_: 60,
                salary_: 290,
                employMoney_: 1000,
                index:2,
                name_: "夜神月",
                profession_: "产品经理",
                supplicateLine_: "僕は新世界の神だ！"
            },
            {
                abilityCoding_: 1000,
                abilityManage_: 1050,
                abilityArt_: 60,
                salary_: 250,
                employMoney_: 1000,
                index:3,
                name_: "汉尼拔·莱克特",
                profession_: "设计师",
                supplicateLine_: "吃了你！"
            },*/
        ];
        for (var i=0;i<levelcount;i++){
            var pg = templist[i];
            this.pgs.push(pg);
        }

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
