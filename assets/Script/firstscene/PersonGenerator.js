var companypath=require('global').companyPath;
var personObj=require('Person');
cc.Class({
    extends: cc.Component,

    properties: {
        persons_:{   
            default:[],
            type:[cc.Prefab]
        },
    },

    showPersons: function() {
        /** return [
             {
                 abilityCoding_: 0,
                 abilityManage_: 10,
                 abilityArt_: 0,
                 salary_: 250,
                 employMoney_: 1000,
 
                 name_: "陈小武",
                 profession_: "程序员"
             },
             {
                 abilityCoding_: 100,
                 abilityManage_: 10,
                 abilityArt_: 60,
                 salary_: 250,
                 employMoney_: 1000,
 
                 name_: "乔布斯",
                 profession_: "程序员"
             },
             {
                 abilityCoding_: 1000,
                 abilityManage_: 50,
                 abilityArt_: 60,
                 salary_: 290,
                 employMoney_: 1000,
 
                 name_: "夜神月",
                 profession_: "产品经理"
             },
             {
                 abilityCoding_: 1000,
                 abilityManage_: 1050,
                 abilityArt_: 60,
                 salary_: 250,
                 employMoney_: 1000,
 
                 name_: "汉尼拔·莱克特",
                 profession_: "设计师"
             },                      
         ] */
        var personinfo=[];
        for (var i=0;i<this.persons_.length;++i){
            var person=new Object();
            var ability=this.persons_[i].getAbility();
            person.abilityCoding_=ability.coding;
            person.abilityManage_=ability.manage;
            person.abilityArt_=ability.art;
            person.salary_=this.persons_[i].getSalary();
            person.employMoney_=this.persons_[i].getEmployMoney();
            person.name_=this.persons_[i].getName();
            person.profession_=this.persons_[i].getProfession();
            person.index=this.persons_[i].index;
            personinfo.push(person);
        }
        return personinfo;
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
                profession_: "程序员"
            },
            {
                abilityCoding_: 100,
                abilityManage_: 10,
                abilityArt_: 60,
                salary_: 250,
                employMoney_: 1000,
                index:1,
                name_: "乔布斯",
                profession_: "程序员"
            },
            {
                abilityCoding_: 1000,
                abilityManage_: 50,
                abilityArt_: 60,
                salary_: 290,
                employMoney_: 1000,
                index:2,
                name_: "夜神月",
                profession_: "产品经理"
            },
            {
                abilityCoding_: 1000,
                abilityManage_: 1050,
                abilityArt_: 60,
                salary_: 250,
                employMoney_: 1000,
                index:3,
                name_: "汉尼拔·莱克特",
                profession_: "设计师"
            },                      
        ];
        for(var i=0;i<initlist.length;++i){
            var person=initlist[i];
            var newperson=new personObj();
            var ability=new Object();
            ability.coding=person.abilityCoding_;
            ability.manage=person.abilityManage_;
            ability.art=person.abilityArt_;
            newperson.setAbility(ability);
            newperson.setSalary(person.salary_);
            newperson.setEmployMoney(person.employMoney_);
            newperson.setName(person.name_);
            newperson.setProfession(person.profession_);
            newperson.index=person.index;
            this.persons_.push(newperson);
        }


    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
