var person=require("Person");
var projectgroup=require("ProjectGroup");
var persongenerator=require("PersonGenerator");
cc.Class({
    extends: cc.Component,

    properties: {
        // 员工列表
        persons_:{   
            default:[],
            type:[cc.Prefab]
        },
        // 当前员工数
        currentNum_:0, 
        // 当前最大员工数
        maxNum_:5,
        // 当前项目组 
        projectGroups_:{   
            default:[],
            type:[cc.Prefab]
        },
        credit_:0,
        //这里把Node改为了Prefab
    },

    // use this for initialization
    onLoad: function () {
        //调试用的新建员工的代码
        //var newperson=new person();
        //this.hire(newperson);
        this.maxNum_=5;
    },

    changeCredit:function(num){
        this.credit_+=num;
    },

    getCredit:function(num){
        return this.credit_ <= 0 ? 0 : this.credit_;
    },

    canHire:function(){
        return this.currentNum_<this.maxNum_;
    },

    hire: function (person) {
        // 雇佣一个员工，如果已达人数上限，则返回false
        // cc.log("now:"+this.currentNum_);
        // cc.log("max:"+this.maxNum_);
        if(this.currentNum_>=this.maxNum_){
            return false;
        }
        event=new cc.Event.EventCustom('MONEYCUT', true);
        event.detail.force=false;
        event.detail.money=person.getComponent(Person).employMoney_;
        this.node.dispatchEvent(event);
        if(event.detail.back==true){
            this.currentNum_++;
            this.persons_.push(person);
            person.node = this.node;
            return true;
        }
        else{
            return false;
        }
    },

    fire: function (index){     // 解雇老员工
        for(let i=0;i<this.currentNum_;i++){
            if(this.persons_[i].index_== index){
                for(let j=0;j<this.projectGroups_.length;j++){
                    this.projectGroups_[j].removePerson(this.persons_[i]);
                }
                var oldperson=this.persons_[i];
                this.persons_.splice(i,1);
                this.currentNum_--;
                return oldperson;
            }
        }
        return null;
    },

    begin:function(project,persons){
        var group=new projectgroup();
        group.node=persongenerator;
        group.begin(project,persons);
        this.projectGroups_.push(group);
    },

    stop: function (group){
        group.stop();
        var i=0;
        while(this.personGroups_[i]!=group){
            i++;
        }
        if(i<this.personGroups_.length){
            this.personGroups_.splice(i,1);
        }
    },

    finish:function(){
        var tag=new Array;
        var i=0;
        event=new cc.Event.EventCustom('MONEYCUT', true);
        event.detail.force=false;
        event.detail.money=person.getComponent(Person).employMoney_;
        this.node.dispatchEvent(event);
        for(i=1;i=this.projectGroups_.length;i++){
            group=this.projectGroups_[i];
            if(group.isFinished()){
                if(group.isConsign()){
                    event=new cc.Event.EventCustom('PROJECTSUCCESS', true);
                    event.detail.project = group.getProject()
                    this.node.dispatchEvent(event);
                    tag.push(i);
                }
            }
            else{
                if(group.isOverdue()){
                    event=new cc.Event.EventCustom('PROJECTFAIL', true);
                    event.detail.project = group.getProject()
                    this.node.dispatchEvent(event);
                    tag.push(i);
                }
            }
        }
        for(i=1;i=tag.length;i++){
            this.projectGroups_[tag[i]].stop();
        }
    },

    work:function(){
        for(i=1;i=this.projectGroups_.length;i++){
            group=this.projectGroups_[i];
            group.work();
            group.finish();
            if(group.isDevelopEnd()){
                this.evolve(group);
            }
        }
    },

    showPersons: function() {   // 返回所有员工信息
        return this.persons_;
    },

    paySalary:function(){
        event=new cc.Event.EventCustom('PROJECTFAIL', true);
        this.node.dispatchEvent(event);
        if(event.detail.back%30 != 1){
            return ;
        }
        var sumSalary = 0;
        for(let i = 0;i<this.persons_.length ; i++){
            sumSalary = sumSalary + this.persons_[i].salary_;
        }
        event=new cc.Event.EventCustom('MONEYCUT', true);
        event.detail.money = sumSalary;
        event.detail.record = "付工资";
        event.detail.force = true;
        this.node.dispatchEvent(event);
    },

    updateCoef:function(coef){
        for(let i = 0 ; i < this.persons_.length ; i++)
        {
            this.persons_[i].updateCoef(coef);
        }
    },

    addLimit:function(){
        this.maxNum_ += 1;
    },

    pause:function(){
        this.unschedule(this.work);
        this.unschedule(this.paySalary);
    },

    resume:function(time){
        this.schedule(this.work,time);
        this.schedule(this.paySalary,time);
    },
});
