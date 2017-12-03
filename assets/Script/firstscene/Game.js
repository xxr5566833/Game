var projectstate=require('global').projectState;
var person=require('Person');
var project=require('Project');
cc.Class({
    extends: cc.Component,

    properties: {
        music: {
            url: cc.AudioClip,
            default: null
        },
        msgBox:{
            default:null,
            type:cc.Node
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
        cc.find("Company/PersonControl").getComponent("PersonControl").pause();
        cc.find("Date").getComponent("Date").pause();
        cc.find('Company/Account').getComponent('Account').pause();
        cc.find('ProjectGenerator').getComponent('ProjectGenerator').pause();
    },
    resume:function(){
        cc.find("Company/PersonControl").getComponent("PersonControl").resume();      
        cc.find("Date").getComponent("Date").resume();
        cc.find('Company/Account').getComponent('Account').resume();
        cc.find('ProjectGenerator').getComponent('ProjectGenerator').resume();
    },
    gameover:function(){
        this.msgBoxControl.alert('FAIL', "GG，游戏结束");
        cc.audioEngine.stop(this.current);
        cc.director.loadScene('End');
    },
    // use this for initialization
    onLoad: function () {
        cc.loader.loadRes('personinfo',function(err,data){
            if(err){
                cc.log(err);
            }else{
                var persong=cc.find('PersonGenerator').getComponent('PersonGenerator');
                persong.init(data);
            }
        });
        cc.loader.loadRes('projectinfo',function(err,data){
            if(err){
                cc.log(err);
            }else{
                var projectg=cc.find('ProjectGenerator').getComponent('ProjectGenerator');
                projectg.init(data);
            }
        });
        // 开启重复处理事件
        this.resume();
        this.current = cc.audioEngine.play(this.music, true,0.5);
        this.msgBoxControl = this.msgBox.getComponent("msgBoxControl")
    },

    init:function(){
        cc.loader.loadRes('personinfo',function(err,data){
            if(err){
                cc.log(err);
            }else{
                //console.log(data);
                this.persons=data;
            }
        },this);
        cc.loader.loadRes('projectinfo',function(err,data){
            if(err){
                cc.log(err);
            }else{
               // console.log(data);
                this.projects=data;
            }
        },this);
        var persong=cc.find('PersonGenerator').getComponent('PersonGenerator');
        persong.init(this.persons);
        var projectg=cc.find('ProjectGenerator').getComponent('ProjectGenerator');
        projectg.init(this.projects);
    },

    save: function(name){                                               //存档
        saveSet_=JSON.parse(cc.sys.localStorage.getItem('saveSet'));    //所有存档的名称集合
        for(i=0;i<saveSet_.length;i++){
            if(saveSet_[i]==name){
                break;
            }
        }
        saveSet_[i]=name;
        cc.sys.localStorage.setItem('saveSet', JSON.stringify(saveSet_));
        Date_=cc.find('Date').getComponent('Date');
        Company_=cc.find('Company').getComponent('Company');
        Account_=cc.find('Company/Account').getComponent('Account');
        PersonControl_=cc.find('Company/PersonControl').getComponent('PersonControl');
        PersonGenerator_=cc.find('PersonGenerator').getComponent('PersonGenerator');
        cc.sys.localStorage.setItem(name+'_Date'+'_time', Date_.time_);
        cc.sys.localStorage.setItem(name+'_Date'+'_speedPerday', Date_.speedPerday_);
        cc.sys.localStorage.setItem(name+'_Date'+'_count', Date_.count_);
        cc.sys.localStorage.setItem(name+'_Account'+'_gold', Account_.gold_);
        cc.sys.localStorage.setItem(name+'_Account'+'_records', JSON.stringify(Account_.records_));
        cc.sys.localStorage.setItem(name+'_PersonControl'+'_currentNum', PersonControl_.currentNum_);
        cc.sys.localStorage.setItem(name+'_PersonControl'+'_maxNum', PersonControl_.maxNum_);
        cc.sys.localStorage.setItem(name+'_PersonControl'+'_flag', PersonControl_.flag_);
        for(i=0;i<PersonControl_.persons_.length;i++){
            savePerson(PersonControl_.persons_[i]);
            PCSet_[i]=PersonControl_.persons_[i].index_;                //PersonControl内员工的标号集合
        }
        for(i=0;i<PersonGenerator_.persons_.length;i++){
            savePerson(PersonGenerator_.persons_[i]);
            PGSet_[i]=PersonControl_.persons_[i].index_;                //PersonGenerator内员工的标号集合
        }
        cc.sys.localStorage.setItem('PCSet', JSON.stringify(PCSet_));
        cc.sys.localStorage.setItem('PGSet', JSON.stringify(PGSet_));
        saveProject(Company_.project_);
    },

    load: function(name){                                               //读档
        saveSet_=JSON.parse(cc.sys.localStorage.getItem('saveSet'));    //所有存档的名称集合
        PCSet_=JSON.parse(cc.sys.localStorage.getItem('PCSet'));        //PersonControl内员工的标号集合
        PGSet_=JSON.parse(cc.sys.localStorage.getItem('PGSet'));        //PersonGenerator内员工的标号集合
        for(i=0;i<saveSet_.length;i++){
            if(saveSet_[i]==name){
                break;
            }
        }
        if(i==saveSet_.length){
            return false;
        }
        Date_=                      cc.find('Date').getComponent('Date');
        Company_=                   cc.find('Company').getComponent('Company');
        Account_=                   cc.find('Company/Account').getComponent('Account');
        PersonControl_=             cc.find('Company/PersonControl').getComponent('PersonControl');
        PersonGenerator_=           cc.find('PersonGenerator').getComponent('PersonGenerator');
        Date_.time_=                cc.sys.localStorage.getItem(name+'_Date'+'_time');
        Date_.speedPerday_=         cc.sys.localStorage.getItem(name+'_Date'+'_speedPerday');
        Date_.count_=               cc.sys.localStorage.getItem(name+'_Date'+'_count');
        Account_.gold_=             cc.sys.localStorage.getItem(name+'_Account'+'_gold');
        Account_.records_=          JSON.parse(cc.sys.localStorage.getItem(name+'_Account'+'_records'));
        PersonControl_.currentNum_= cc.sys.localStorage.getItem(name+'_PersonControl'+'_currentNum');
        PersonControl_.maxNum_=     cc.sys.localStorage.getItem(name+'_PersonControl'+'_maxNum');
        PersonControl_.flag_=       cc.sys.localStorage.getItem(name+'_PersonControl'+'_flag');
        for(i=0;i<PCSet_.length;i++){
            PersonControl_.persons_[i]=new person();
            loadPerson(name,PersonControl_.persons_[i],Company_);
        }
        for(i=0;i<PGSet_.length;i++){
            PersonGenerator_.persons_[i]=new person();
            loadPerson(name,PersonControl_.persons_[i],Company_);
        }
        if(cc.sys.localStorage.setItem(name+'_Project'+'_isnull')==0){
            Company_.project_=new project();
            loadProject(name,Company_.project_);
            PersonControl_.project_=Company_.project_;
        }
    },

    savePerson: function(name,Person){                                  //存储员工 格式：存档名_员工标号_属性名
        cc.sys.localStorage.setItem(name+'_'+Person.index_.toString()+'_abilityArt', Person.abilityArt_);
        cc.sys.localStorage.setItem(name+'_'+Person.index_.toString()+'_abilityManage', Person.abilityManage_);
        cc.sys.localStorage.setItem(name+'_'+Person.index_.toString()+'_abilityCoding', Person.abilityCoding_);
        cc.sys.localStorage.setItem(name+'_'+Person.index_.toString()+'_maxArt', Person.maxArt_);
        cc.sys.localStorage.setItem(name+'_'+Person.index_.toString()+'_maxManage', Person.maxManage_);
        cc.sys.localStorage.setItem(name+'_'+Person.index_.toString()+'_maxCoding', Person.maxCoding_);
        cc.sys.localStorage.setItem(name+'_'+Person.index_.toString()+'_hp', Person.hp_);
        cc.sys.localStorage.setItem(name+'_'+Person.index_.toString()+'_level', Person.level_);
        cc.sys.localStorage.setItem(name+'_'+Person.index_.toString()+'_grade', Person.grade_);
        cc.sys.localStorage.setItem(name+'_'+Person.index_.toString()+'_state', Person.state_);
        cc.sys.localStorage.setItem(name+'_'+Person.index_.toString()+'_employMoney', Person.employMoney_);
        cc.sys.localStorage.setItem(name+'_'+Person.index_.toString()+'_name', Person.name_);
        cc.sys.localStorage.setItem(name+'_'+Person.index_.toString()+'_profession', Person.profession_);
        cc.sys.localStorage.setItem(name+'_'+Person.index_.toString()+'_supplicateLine', Person.supplicateLine_);
        cc.sys.localStorage.setItem(name+'_'+Person.index_.toString()+'_index', Person.index_);
        if(Person.Company!=null){
            cc.sys.localStorage.setItem(name+'_'+Person.index_.toString()+'_st', 0);  //员工是否在公司
        }
        else{
            cc.sys.localStorage.setItem(name+'_'+Person.index_.toString()+'_st', Person.level_);
        }
    },

    loadPerson: function(name,Person,Company){
        Person.abilityArt_=     cc.sys.localStorage.getItem(name+'_'+Person.index_.toString()+'_abilityArt');
        Person.abilityManage_=  cc.sys.localStorage.getItem(name+'_'+Person.index_.toString()+'_abilityManage');
        Person.abilityCoding_=  cc.sys.localStorage.getItem(name+'_'+Person.index_.toString()+'_abilityCoding');
        Person.maxArt_=         cc.sys.localStorage.getItem(name+'_'+Person.index_.toString()+'_maxArt');
        Person.maxManage_=      cc.sys.localStorage.getItem(name+'_'+Person.index_.toString()+'_maxManage');
        Person.maxCoding_=      cc.sys.localStorage.getItem(name+'_'+Person.index_.toString()+'_maxCoding');
        Person.hp_=             cc.sys.localStorage.getItem(name+'_'+Person.index_.toString()+'_hp');
        Person.level_=          cc.sys.localStorage.getItem(name+'_'+Person.index_.toString()+'_level');
        Person.grade_=          cc.sys.localStorage.getItem(name+'_'+Person.index_.toString()+'_grade');
        Person.state_=          cc.sys.localStorage.getItem(name+'_'+Person.index_.toString()+'_state');
        Person.employMoney_=    cc.sys.localStorage.getItem(name+'_'+Person.index_.toString()+'_employMoney');
        Person.name_=           cc.sys.localStorage.getItem(name+'_'+Person.index_.toString()+'_name');
        Person.profession_=     cc.sys.localStorage.getItem(name+'_'+Person.index_.toString()+'_profession');
        Person.supplicateLine_= cc.sys.localStorage.getItem(name+'_'+Person.index_.toString()+'_supplicateLine');
        Person.index_=          cc.sys.localStorage.getItem(name+'_'+Person.index_.toString()+'_index');
        if(cc.sys.localStorage.setItem(name+'_'+Person.index_.toString()+'_st')!=0){
            Person.Company=null;
            Person.project_=null;
        }
        else{
            Person.Company=Company;
            Person.project_=Company.project_;
        }
    },

    saveProject: function(name,Project){                                //存储项目 格式：存档名_Project_属性名
        if(Project==null){
            cc.sys.localStorage.setItem(name+'_Project'+'_isnull', 1);
            return;
        }
        cc.sys.localStorage.setItem(name+'_Project'+'_isnull', 0);
        cc.sys.localStorage.setItem(name+'_Project'+'_requireUi', Project.requireUi_);
        cc.sys.localStorage.setItem(name+'_Project'+'_requireFunc', Project.requireFunc_);
        cc.sys.localStorage.setItem(name+'_Project'+'_currentUi', Project.currentUi_);
        cc.sys.localStorage.setItem(name+'_Project'+'_currentFunc', Project.currentFunc_);
        cc.sys.localStorage.setItem(name+'_Project'+'_state', Project.state_);
        cc.sys.localStorage.setItem(name+'_Project'+'_category', Project.category_);
        cc.sys.localStorage.setItem(name+'_Project'+'_reward', Project.reward_);
        cc.sys.localStorage.setItem(name+'_Project'+'_deadline', Project.deadline_);
        cc.sys.localStorage.setItem(name+'_Project'+'_level', Project.level_);
        cc.sys.localStorage.setItem(name+'_Project'+'_receiveDay', Project.receiveDay_);
        cc.sys.localStorage.setItem(name+'_Project'+'_finishDay', Project.finishDay_);
        cc.sys.localStorage.setItem(name+'_Project'+'_content', Project.content_);
    },

    loadProject: function(name,Project){
        Project.requireUi_=     cc.sys.localStorage.getItem(name+'_Project'+'_requireUi');
        Project.requireFunc_=   cc.sys.localStorage.getItem(name+'_Project'+'_requireFunc');
        Project.currentUi_=     cc.sys.localStorage.getItem(name+'_Project'+'_currentUi');
        Project.currentFunc_=   cc.sys.localStorage.getItem(name+'_Project'+'_currentFunc');
        Project.state_=         cc.sys.localStorage.getItem(name+'_Project'+'_state');
        Project.category_=      cc.sys.localStorage.getItem(name+'_Project'+'_category',);
        Project.reward_=        cc.sys.localStorage.getItem(name+'_Project'+'_reward',);
        Project.deadline_=      cc.sys.localStorage.getItem(name+'_Project'+'_deadline',);
        Project.level_=         cc.sys.localStorage.getItem(name+'_Project'+'_level');
        Project.receiveDay_=    cc.sys.localStorage.getItem(name+'_Project'+'_receiveDay');
        Project.finishDay_=     cc.sys.localStorage.getItem(name+'_Project'+'_finishDay');
        Project.content_=       cc.sys.localStorage.getItem(name+'_Project'+'_content');
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
