var person=require("Person");
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
        maxNum_:0,
        // 是否在工作状态
        flag_:false,
        // 当前项目 
        project_:{   
            default:null,
            type:cc.Prefab
        },
        msgBox: {
            default: null,
            type:cc.Node,
        },

        //这里把Node改为了Prefab
    },

    // use this for initialization
    onLoad: function () {
        //调试用的新建员工的代码
        //var newperson=new person();
        this.game = cc.find('Game').getComponent('Game');
        //this.hire(newperson);
        this.pause_=false;
        this.maxNum_=5;
        this.msgBoxControl = this.msgBox.getComponent("msgBoxControl");
    },

    pause:function(){
        this.unschedule(this.commit);
        this.unschedule(this.paySalary);
    },

    resume:function(){
        this.schedule(this.commit,1);
        this.schedule(this.paySalary,1);
    },

    canHire:function(){
        return this.currentNum_<this.maxNum_;
    },

    hire: function (newPerson) {
            // 雇佣一个员工，如果已达人数上限，则返回false
       // cc.log("now:"+this.currentNum_);
       // cc.log("max:"+this.maxNum_);
        if(this.currentNum_<this.maxNum_){
            this.currentNum_++;
            newPerson.project_=cc.find("Company").getComponent("Company").project_;
            this.persons_.push(newPerson);
           // cc.log("after hire:"+this.currentNum_);
            return true;
        }
       // cc.log("can't hire:"+this.currentNum_);
        return false;
    },

    fire: function (index){     // 解雇老员工
        for(let i=0;i<this.currentNum_;i++){
            if(this.persons_[i].index_== index){
                var oldperson=this.persons_[i];
                this.persons_.splice(i,1);
                this.currentNum_--;
                return oldperson;
            }
        }
        return null;
    },

    work: function (newProject){
        this.project_ = newProject;
        this.flag_ = true;
        for(let i=0;i<this.currentNum_;i++){
            this.persons_[i].work(newProject);
            //this.persons_[i].getComponent("Person").work(newProject);
            //这里和下面删去了getComponent
        }
    },

    stop: function (){
        this.flag_ = false;
        for(let i=0;i<this.currentNum_;i++){
            this.persons_[i].stop();
            //this.persons_[i].getComponent("Person").stop();
        }
    },

    commit: function () {
        if(!this.flag_)
            return;
        //console.log( this.persons_);
       // console.log( "current people: "+ this.currentNum_)
        for(let i=0;i<this.currentNum_;i++){
            this.persons_[i].commit(this.persons_);
            //this.persons_[i].getComponent("Person").commit();
        }
        
        let pg = cc.find("ProjectGenerator").getComponent("ProjectGenerator");
        //if(this.project_.getComponent("Project").isFinished()){
        if(this.project_.isFinished()){
            this.stop();
            pg.finishProject(this.project_);
        }
        else{
            //if(this.project_.getComponent("Project").isOverdue()){
            if(this.project_.isOverdue()){
                this.stop();
                pg.failProject(this.project_);
            }
        }
    },

    showPersons: function() {   // 返回所有员工信息
        return this.persons_;
    },

    isWorking:function(){
        return this.flag_;
    },

    getProject:function(){
        return this.project_;
    },
    paySalary:function(){
        var date = cc.find('Date').getComponent('Date');
        if(date.getDate()%90 != 1){
            return ;
        }
        var sumSalary = 0;
        for(let i =0;i<this.persons_.length ; i++){
            sumSalary = sumSalary + this.persons_[i].salary_;
        }
        if(sumSalary > 0){
            this.msgBoxControl.alert('SUCCESS', '支付员工薪水' +Math.floor(sumSalary));
            var ac = cc.find('Company/Account').getComponent('Account');
            ac.expend(sumSalary , '支付薪水');
        }
    },

    
});
