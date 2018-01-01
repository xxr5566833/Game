var projectstate=require('global').projectState;
var person=require('Person');
var project=require('Project');
var projectGroup=require('ProjectGroup');
var global=require("global");
cc.Class({
    extends: cc.Component,

    properties: {
        music_: {
            url: cc.AudioClip,
            default: null
        },

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
    pause:function(){
        var event=new cc.Event.EventCustom('PAUSE', true);
        this.node.dispatchEvent(event);
    },
    resume:function(){
        var event=new cc.Event.EventCustom('RESUME', true);
        event.time = this.time_;
        this.node.dispatchEvent(event);
    },
    //游戏结束，切换场景，关闭音乐
    gameover:function(){
        cc.audioEngine.pause(this.current);
        cc.director.loadScene("End");
    },
    
    // use this for initialization
    onLoad: function () {
        this.time_ = 1;
        var self = this;
        cc.loader.loadRes('personinfo',function(err,data_pe){
            if(err){
                cc.log(err);
            }else{
                cc.loader.loadRes('projectinfo',function(err,data_pr){
                    if(err){
                        cc.log(err);
                    }else{
                        var event=new cc.Event.EventCustom('INIT', true);
                        console.log(data_pe);
                        console.log(data_pr);
                        event.data_pe=data_pe;
                        event.data_pr=data_pr;
                        self.node.dispatchEvent(event);
                    }
                });
            }
        });
        if(global.isload){
            this.load();
        }
        // 开启重复处理事件
        this.current = cc.audioEngine.play(this.music, true,0.5);
    },

    save: function(){                                               //存档
        console.log('begin to save');
        var name="test";
        console.log('name');
        var saveSet_=JSON.parse(cc.sys.localStorage.getItem('saveSet'));    //所有存档的名称集合
        if(saveSet_==null)
            saveSet_=new Array();
        for(i=0;i<saveSet_.length;i++){
            if(saveSet_[i]==name){
                break;
            }
        }
        var replacer = function(key, value) {
            var seen=[];
            if (value != null && typeof value == "object") {
                if (seen.indexOf(value) >= 0) {
                    return;
                }
                seen.push(value);
            }
            return value;
        };
        saveSet_[i]=name;
        cc.sys.localStorage.setItem('saveSet', JSON.stringify(saveSet_));
        var Account=cc.find('Event/Game/Date/Account').getComponent('Account');
        var Bank=cc.find('Event/Game/Date/Account/Bank').getComponent('Bank');
        var Date_=cc.find('Event/Game/Date').getComponent('Date');
        var Market=cc.find('Event/Game/Date/Account/Market').getComponent('Market');
        var PersonGenerator=cc.find('Event/Game/Date/Account/PersonGenerator').getComponent('PersonGenerator');
        var ProjectGenerator=cc.find('Event/Game/Date/Account/ProjectGenerator').getComponent('ProjectGenerator');
        var PersonControl=cc.find('Event/Game/Date/Account/PersonControl').getComponent('PersonControl');
        var Research=cc.find('Event/Game/Date/Account/Research').getComponent('Research');
        cc.sys.localStorage.setItem(name+'_Account'+'_gold', Account.gold_);
        cc.sys.localStorage.setItem(name+'_Account'+'_protect', Account.protect_);
        cc.sys.localStorage.setItem(name+'_Account'+'_coef', JSON.stringify(Account.coef));
        cc.sys.localStorage.setItem(name+'_Bank'+'_loans',JSON.stringify(Bank.loans_));
        cc.sys.localStorage.setItem(name+'_Bank'+'_maxFixedLoanNum',Bank.maxFixedLoanNum_);
        cc.sys.localStorage.setItem(name+'_Bank'+'_fixedLoanNum',Bank.fixedLoanNum_);
        cc.sys.localStorage.setItem(name+'_Bank'+'_currentLoanNum',Bank.currentLoanNum_);
        cc.sys.localStorage.setItem(name+'_Date'+'_time', Date_.time_);
        cc.sys.localStorage.setItem(name+'_Market'+'_totalPeopleNum', Market.totalPeopleNum_);
        cc.sys.localStorage.setItem(name+'_Market'+'_A', Market.A_);
        cc.sys.localStorage.setItem(name+'_Market'+'_currentPeopleNum', Market.currentPeopleNum_);
        cc.sys.localStorage.setItem(name+'_Market'+'_initDay', Market.initDay_);
        cc.sys.localStorage.setItem(name+'_Market'+'_a', Market.a_);
        cc.sys.localStorage.setItem(name+'_Market'+'_isFixed', Market.isFixed_);
        cc.sys.localStorage.setItem(name+'_PersonGenerator'+'_persons', JSON.stringify(PersonGenerator.persons_,replacer));
        cc.sys.localStorage.setItem(name+'_ProjectGenerator'+'_availableList', JSON.stringify(ProjectGenerator.availableList_));
        cc.sys.localStorage.setItem(name+'_ProjectGenerator'+'_projects', JSON.stringify(ProjectGenerator.projects_,replacer));
        cc.sys.localStorage.setItem(name+'_ProjectGenerator'+'_projs', JSON.stringify(ProjectGenerator.projs_));
        cc.sys.localStorage.setItem(name+'_PersonControl'+'_currentNum', PersonControl.currentNum_);
        cc.sys.localStorage.setItem(name+'_PersonControl'+'_maxNum', PersonControl.maxNum_);
        cc.sys.localStorage.setItem(name+'_PersonControl'+'_credit', PersonControl.credit_);
        cc.sys.localStorage.setItem(name+'_PersonControl'+'_persons', JSON.stringify(PersonControl.persons_,replacer));
        cc.sys.localStorage.setItem(name+'_PersonControl'+'_projectGroups', JSON.stringify(PersonControl.projectGroups_,replacer));
        cc.sys.localStorage.setItem(name+'_PersonControl'+'_platforms', JSON.stringify(PersonControl.platforms_));
        cc.sys.localStorage.setItem(name+'_PersonControl'+'_categories', JSON.stringify(PersonControl.categories_));
        cc.sys.localStorage.setItem(name+'_PersonControl'+'_functions', JSON.stringify(PersonControl.functions_));
        cc.sys.localStorage.setItem(name+'_Research'+'_S', Research.S_);
        cc.sys.localStorage.setItem(name+'_Research'+'_coefS1', Research.coefS1_);
        cc.sys.localStorage.setItem(name+'_Research'+'_coefS2', Research.coefS2_);
        cc.sys.localStorage.setItem(name+'_Research'+'_coef', JSON.stringify(Research.coef));
        cc.sys.localStorage.setItem(name+'_Research'+'_lv', JSON.stringify(Research.lv_));
        cc.log('save finished');
    },

    load: function(){                                               //读档
        console.log('begin to load');
        var name="test";
        var i=0;
        console.log(name);
        var saveSet_=JSON.parse(cc.sys.localStorage.getItem('saveSet'));    //所有存档的名称集合
        if(saveSet_==null){
            console.log('没有存档');
            return false;
        }
        for(i=0;i<saveSet_.length;i++){
            if(saveSet_[i]==name){
                break;
            }
        }
        if(i==saveSet_.length){
            console.log('没找到存档');
            return false;
        }
        var temp=null;
        var data=null;
        var Account=cc.find('Event/Game/Date/Account').getComponent('Account');
        var Bank=cc.find('Event/Game/Date/Account/Bank').getComponent('Bank');
        var Date_=cc.find('Event/Game/Date').getComponent('Date');
        var Market=cc.find('Event/Game/Date/Account/Market').getComponent('Market');
        var PersonGenerator=cc.find('Event/Game/Date/Account/PersonGenerator').getComponent('PersonGenerator');
        var ProjectGenerator=cc.find('Event/Game/Date/Account/ProjectGenerator').getComponent('ProjectGenerator');
        var PersonControl=cc.find('Event/Game/Date/Account/PersonControl').getComponent('PersonControl');
        var Research=cc.find('Event/Game/Date/Account/Research').getComponent('Research');
        Account.gold_=cc.sys.localStorage.getItem(name+'_Account'+'_gold');
        Account.protect_=cc.sys.localStorage.getItem(name+'_Account'+'_protect');
        Account.coef=JSON.parse(cc.sys.localStorage.getItem(name+'_Account'+'_coef'));
        Bank.loans_=JSON.parse(cc.sys.localStorage.getItem(name+'_Bank'+'_loans'));
        Bank.maxFixedLoanNum_=cc.sys.localStorage.getItem(name+'_Bank'+'_maxFixedLoanNum');
        Bank.fixedLoanNum_=cc.sys.localStorage.getItem(name+'_Bank'+'_fixedLoanNum');
        Bank.currentLoanNum_=cc.sys.localStorage.getItem(name+'_Bank'+'_currentLoanNum');
        Date_.time_=cc.sys.localStorage.getItem(name+'_Date'+'_time');
        Market.totalPeopleNum_=cc.sys.localStorage.getItem(name+'_Market'+'_totalPeopleNum');
        Market.A_=cc.sys.localStorage.getItem(name+'_Market'+'_A');
        Market.currentPeopleNum_=cc.sys.localStorage.getItem(name+'_Market'+'_currentPeopleNum');
        Market.initDay_=cc.sys.localStorage.getItem(name+'_Market'+'_initDay');
        Market.a_=cc.sys.localStorage.getItem(name+'_Market'+'_a');
        Market.isFixed_=cc.sys.localStorage.getItem(name+'_Market'+'_isFixed');
        data=JSON.parse(cc.sys.localStorage.getItem(name+'_PersonGenerator'+'_persons'));
        console.log(data)
        if(data==null||data==undefined){
            data=[];
        }
        PersonGenerator.persons_=[];
        for(var i=0;i<data.length;i++){
            temp=new person;
            temp=this.loadperson(temp,data[i]);
            temp.node=cc.find('Event/Game/Date/Account/PersonGenerator');
            temp.group_=null;
            PersonGenerator.persons_.push(temp);
        }
        ProjectGenerator.availableList_=JSON.parse(cc.sys.localStorage.getItem(name+'_ProjectGenerator'+'_availableList'));
        data=JSON.parse(cc.sys.localStorage.getItem(name+'_ProjectGenerator'+'_projects'));
        if(data==null||data==undefined){
            data=[];
        }
        ProjectGenerator.projects_=[];
        for(var i=0;i<data.length;i++){
            temp=new project;
            temp=this.loadproject(temp,data[i]);
            temp.node=cc.find('Event/Game/Date/Account/ProjectGenerator');
            ProjectGenerator.projects_.push(temp);
        }
        ProjectGenerator.projs_=JSON.parse(cc.sys.localStorage.getItem(name+'_ProjectGenerator'+'_projs'));
        PersonControl.currentNum_=cc.sys.localStorage.getItem(name+'_PersonControl'+'_currentNum');
        PersonControl.maxNum_=cc.sys.localStorage.getItem(name+'_PersonControl'+'_maxNum');
        PersonControl.credit_=cc.sys.localStorage.getItem(name+'_PersonControl'+'_credit');
        data.length=0;
        data=JSON.parse(cc.sys.localStorage.getItem(name+'_PersonControl'+'_persons'));
        if(data==null||data==undefined){
            data=[];
        }
        PersonControl.persons_=[];
        console.log(data)
        for(var i=0;i<data.length;i++){
            temp=new person;
            temp=this.loadperson(temp,data[i]);
            temp.node=cc.find('Event/Game/Date/Account/PersonGenerator');
            temp.group_=null;
            PersonControl.persons_.push(temp);
        }
        data=JSON.parse(cc.sys.localStorage.getItem(name+'_PersonControl'+'_projectGroups'));
        var temp_2=null;
        PersonControl.projectGroups_=[];
        for(var i=0;i<data.length;i++){
            temp=new projectGroup;
            temp_2=new project;
            temp.state_=data.state_;
            temp.usernum_=data.usernum_;
            temp.testCount_=data.testCount_;
            temp.ambitionBuff_=data.ambitionBuff_;
            temp.bugDay_=data.bugDay_;
            temp.bugBurstPeriod_=data.bugBurstPeriod_;
            temp.burstBugs_=data.burstBugs_;
            temp.project_=this.loadproject(temp_2,data.project_);
            temp.persons_=[];
            for(var m=0;m<data.persons_.length;m++){
                for(var n=0;n<PersonControl.persons_.length;n++){
                    if(data.persons_[m].index_=PersonControl.persons_[n].index_){
                        temp.persons_.push(PersonControl.persons_[n]);
                        PersonControl.persons_[n].group_=temp;
                    }
                }
            }
            temp.project_.node=cc.find('Event/Game/Date/Account/PersonControl');
            temp.node=cc.find('Event/Game/Date/Account/PersonControl');
            PersonControl.projectGroups_.push(temp);
        }
        PersonControl.platforms_=JSON.parse(cc.sys.localStorage.getItem(name+'_PersonControl'+'_platforms'));
        PersonControl.categories_=JSON.parse(cc.sys.localStorage.getItem(name+'_PersonControl'+'_categories'));
        PersonControl.functions_=JSON.parse(cc.sys.localStorage.getItem(name+'_PersonControl'+'_functions'));
        Research.S_=cc.sys.localStorage.getItem(name+'_Research'+'_S');
        Research.coefS1_=cc.sys.localStorage.getItem(name+'_Research'+'_coefS1');
        Research.coefS2_=cc.sys.localStorage.getItem(name+'_Research'+'_coefS2');
        Research.coef=JSON.parse(cc.sys.localStorage.getItem(name+'_Research'+'_coef'));
        Research.lv_=JSON.parse(cc.sys.localStorage.getItem(name+'_Research'+'_lv'));
        var event = new cc.Event.EventCustom("UPDATACOEF",true);  
        event.coef=Research.coef;  
        this.node.dispatchEvent(event);
        cc.log('load finished');
    },

    loadperson:function(temp,data){
        temp.gift_=data.gift_;
        temp.coding_=data.coding_;
        temp.science_=data.science_;
        temp.art_=data.art_;
        temp.creativity_=data.creativity_;
        temp.manager_=data.manager_;
        temp.business_=data.business_;
        temp.state_=data.state_;
        temp.salary_=data.salary_;
        temp.employMoney_=data.employMoney_;
        temp.name_=data.name_;
        temp.profession_=data.profession_;
        temp.index_=data.index_;
        temp.level_=data.level_;
        temp.power_=data.power_;
        temp.mood_=data.mood_;
        temp.moodAddition_=data.moodAddition_;
        temp.character_=data.character_;
        temp.coef=data.coef;
        temp.relaxDays_=data.relaxDays_;
        temp.unyieldingDays_=data.unyieldingDays_;
        temp.month_=data.month_;
        return temp;
    },

    loadproject:function(temp,data){
        temp.requireEntertainment_=data.requireEntertainment_;
        temp.currentEntertainment_=data.currentEntertainment_;
        temp.currentEntertainment_=data.currentEntertainment_;
        temp.currentFunction_=data.currentFunction_;
        temp.currentFunction_=data.currentFunction_;
        temp.currentInnovation_=data.currentInnovation_;
        temp.requirePerformance_=data.requirePerformance_;
        temp.currentPerformance_=data.currentPerformance_;
        temp.bugnum_=data.bugnum_;
        temp.categories_=data.categories_;
        temp.functions_=data.functions_;
        temp.platform_=data.platform_;
        temp.name_=data.name_;
        temp.budget_=data.budget_;
        temp.m_=data.m_;
        temp.kind_=data.kind_;
        temp.reward_=data.reward_;
        temp.deadline_=data.deadline_;
        temp.name_=data.name_;
        temp.level_=data.level_;
        temp.index_=data.index_;
        temp.difficulty_=data.difficulty_;
        temp.receiveDay_=data.receiveDay_;
        temp.finishDay_=data.finishDay_;
        temp.publishDay_=data.publishDay_;
        temp.price_=data.price_;
        return temp;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
