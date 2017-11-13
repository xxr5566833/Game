var companypath=require('global').companyPath;
var personObj=require('Person');
cc.Class({
    extends: cc.Component,

    properties: {
        persons_:{   
            default:[],
            type:[cc.Prefab]
        },
        msgBox:{
            default:null,
            type:cc.Node
        },
    },
    //根据传入的level返回可用的person列表,在人们选择好某种招聘方式时调用它，所以这里还需要调用expend扣除一定招聘费用
    showPersons:function(l){
        var level =Math.floor( Math.random() * 8);
        var ac=cc.find('Company/Account').getComponent('Account');
        //ac.expend(this.pgs[level].cost_, '发布招聘信息');
        ac.expend(this.pgs[level].cost_, '发布招聘信息');
        this.msgBoxControl.alert('SUCCESS',this.pgs[level ].description_+',花费了'+ this.pgs[level].cost_);
        var list = [];
        for(let i=0 ; i < this.persons_.length ; i++){
            if(this.persons_[i].level_ == level){
                list.push(this.persons_[i]);
            }
        }
        return list;
    },
    //返回不同招聘方式的object列表
    showDifferentWay:function(){
        return this.pgs;
    },

    /*showPersons: function() {
        return [
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
         ] 
        return this.persons_;
    },*/

    removePerson: function(index) {
        var person=null;
        for(var i=0;i<this.persons_.length;i++){
            console.log(this.persons_[i].index_);
            if(this.persons_[i].index_ == index){
                person=this.persons_[i];
                break;
            }
        }
        if(cc.find(companypath).getComponent("Company").hire(person)){
            for(let i=0;i<this.persons_.length;i++){
                if(this.persons_[i].index_== index){
                    this.persons_.splice(i,1);
                    return true;
                }
            }
        }
    },

    addPerson: function(index){
        var person=null;
        if(person=cc.find(companypath).getComponent("Company").fire(index)){
            this.persons_.push(person);
        }
    },
    // use this for initialization
    init:function(persons){
        for(var i=0;i<persons.length;++i){
            var person = new personObj();
            person.init(persons[i]);
            this.persons_.push(person);
        }
    },
    onLoad: function () {
        var levelcount = 8;     
        //暂时定为7个等级
        this.pgs=[];
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
        /*var list=[
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
        ];*/
        for (var i=0;i<levelcount;i++){
            var pg = templist[i];
            this.pgs.push(pg);
        }
        this.msgBoxControl = this.msgBox.getComponent('msgBoxControl');

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
