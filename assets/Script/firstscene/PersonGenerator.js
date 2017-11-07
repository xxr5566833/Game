var companypath=require('global').companyPath;
var personObj=require('Person');
cc.Class({
    extends: cc.Component,

    properties: {
        persons_:{   
            default:[],
            type:[cc.Prefab]
        },
        level_:0,
    },

    showPersons: function() {
        return this.persons_;
    },

    removePerson: function(index) {
        var person=null;
        for(var i=0;i<this.persons_.length;i++){
            if(this.persons_[i].index==index){
                person=this.persons_[i];
                break;
            }
        }
        console.log(person);
        console.log('找到了这个人');
        if(cc.find(companypath).getComponent("Company").hire(person)){
            for(let i=0;i<this.persons_.length;i++){
                if(this.persons_[i].index===index){
                    this.persons_.splice(i,1);
                    console.log(this.persons_);
                    return true;
                }
            }
        }
    },

    addPerson: function(person){
        if(cc.find(companypath).getComponent("Company").fire(person)){
            this.persons_.push(person);
        }
    },
    // use this for initialization
    init:function(persons){
        console.log(persons)
        for(var i=0;i<persons.length;++i){
            if(persons[i].level==this.level_){
                var person=new personObj();
                person.init(persons[i]);
                this.persons_.push(person);
            }
        }
        console.log(this.persons_);
    },
    onLoad: function () {
        var initlist=[
            {
                abilityCoding_: 0,
                abilityManage_: 10,
                abilityArt_: 0,
                salary_: 250,
                employMoney_: 1000,
                index:0,
                name_: "陈小武",
                profession_: "程序员",
                supplicateLine_: "谁敢解雇我？"
            },
            {
                abilityCoding_: 0,
                abilityManage_: 10,
                abilityArt_: 0,
                salary_: 250,
                employMoney_: 1000,
                index:0,
                name_: "少时诵诗书所所所所所所所所所",
                profession_: "湿哒哒无四达大厦啥的",
                supplicateLine_: "少时诵诗书所所所所所所所所所少时诵诗书所所所所所所所所所"
            },
            {
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
            },
        ];


    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
