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


        //这里把Node改为了Prefab
    },

    // use this for initialization
    onLoad: function () {
        //调试用的新建员工的代码
        var newperson=new person();
        this.hire(newperson);
    },

    hire: function (newPerson) {    // 雇佣一个员工，如果已达人数上限，则返回false
        cc.log("now:"+this.currentNum_);
        cc.log("max:"+this.maxNum_);
        if(this.currentNum_<this.maxNum_){
            this.currentNum_++;
            this.persons_.push(newPerson);
            cc.log("after hire:"+this.currentNum_);
            return true;
        }
        cc.log("can't hire:"+this.currentNum_);
        return false;
    },

    fire: function (oldperson){     // 解雇老员工
        for(let i=0;i<this.currentNum_;i++){
            if(this.persons_[i]===oldperson){
                this.persons_.splice(i,1);
                this.currentNum_--;
                return true;
            }
        }
        return false;
    },

    work: function (newProject){
        this.project_ = newProject;
        this.flag_ = true;
        console.log("每个人开始工作");
        for(let i=0;i<this.currentNum_;i++){
            this.persons_[i].work(newProject);
            //this.persons_[i].getComponent("Person").work(newProject);
            //这里和下面删去了getComponent
        }
    },

    stop: function (){
        console.log("personcontrol 停止工作");
        this.flag_ = false;
        for(let i=0;i<this.currentNum_;i++){
            this.persons_[i].stop();
            //this.persons_[i].getComponent("Person").stop();
        }
    },

    commit: function () {
        console.log("调度员工commit");
        for(let i=0;i<this.currentNum_;i++){
            this.persons_[i].commit();
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
        let list="";
        for(let i=0;i<this.currentNum_;i++){
            list += this.persons_[i].getComponent("Person").show() + "\n";
        }
        return list;
    },
    
    update:function() {     // 每隔一段时间调用
        if(this.flag_){
            this.commit();
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
