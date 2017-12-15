var projectgroup=require("ProjectGroup");
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {
        //调试用的新建员工的代码
        //var newperson=new person();
        //this.hire(newperson);
        this.maxNum_=5;
        // 员工列表
        this.persons_ = [];
        // 当前员工数
        this.currentNum_ = 0;
        //声誉
        this.credit_ = 10;
        //项目组数组初始化
        this.projectGroups_ = [];
        // 当前最大员工数
        this.maxNum_ = 5;
        //名字
        this.name_ = "体验极其差的公司";
        var temp =[
            {
                name_ : "网站",
                index_ : 0,
                unlock_ : true,
                budget_ : 100,
                difficulty_ : 10,
                function_ : 0,
                
            }
        ];
        this.platforms_ = temp;
        this.categories_ = [
            {
                name_ : "类型1",
                index_ : 0,
                difficulty_ : 10,
                budget_ : 10,
                function_ : 10,
                unlock_ : true,
            },
            {
                name_ : "类型2",
                index_ : 1,
                difficulty_ : 10,
                budget_ : 10,
                function_ : 10,
                unlock : true,
            }
        ];
        this.functions_ = [
            {
                name_ : "功能1",
                index_ : 0,
                difficulty_ : 10,
                function_ : 10,
                unlock_ : true,
                budget_ : 0,
                times_ : 1.1,
            },
            {
                name_ : "功能2",
                index_ : 1,
                difficulty_ : 10,
                function_ :100,
                unlock_ : true,
                budget_ : 0,
                times_ : 1.1,
            }
        ];
        this.techs_ = [
            {
                name_ : "技术1",
                index_ : 0,
                difficulty_ :10,
                budget_ : 100,
                unlock_ :true,
                function_ :0,
            },
            {
                name_ : "技术2",
                index_ : 1,
                difficulty_ : 20,
                budget_ : 10,
                unlock_ : true,
                function_ : 0,
            }
        ];
    },

    getName:function(){
        return this.name_;
    },

    init:function(platforms){
        //接受外界的平台数组
        this.platforms_ = platforms;
    },

    getAvailablePlatforms:function(){
        var list = [];
        for(let i = 0 ; i < this.platforms_.length ; i++)
        {
            if(this.platforms_[i].unlock_)
            {
                list.push(this.platforms_[i]);
            }
        }
        console.log(list);
        return list;
    },

    getAvailableFunctions:function(){
        var list = [];
        for(let i = 0 ; i < this.functions_.length ; i++)
        {
            if(this.functions_[i].unlock_)
            {
                list.push(this.functions_[i]);
            }
        }
        console.log(list);
        return list;
    },

    getAvailableCategories:function(){
        var list = [];
        for(let i = 0 ; i < this.categories_.length ; i++)
        {
            if(this.categories_[i].unlock_)
            {
                list.push(this.categories_[i]);
            }
        }
        console.log(list);
        return list;
    },

    getAvailablePersons:function(){
        var list = [];
        for(let i = 0 ; i <this.persons_.length ; i++)
        {
            if(this.persons_[i].state_ == 1)
            {
                list.push(this.persons_[i]);
            }
        }
        console.log(list);
        return list;
    },

    getAllGroups:function(){
        return this.projectGroups_;
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

    //测试

    receive:function(){
        var prog = cc.find("Event/Game/Date/Account/ProjectGenerator").getComponent("ProjectGenerator");
        var projs = prog.getProjects();
        console.log(this.persons_);
        this.begin(projs[0], this.persons_);
        this.project_ = projs[0];
    },

    hire: function (person) {
        // 雇佣一个员工，如果已达人数上限，则返回false

        if(this.currentNum_>=this.maxNum_){
            return false;
        }
        event=new cc.Event.EventCustom('MONEYCUT', true);
        event.force=false;
        event.money=person.employMoney_;
        this.node.dispatchEvent(event);
        if(event.back==true){
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
                console.log(oldperson);
                return oldperson;
            }
        }
        return null;
    },

    begin:function(project,persons){
        //预算什么的需要放在前端判断
        var group=new projectgroup();
        group.node=this.node;
        //这里需要设置一下接受时间
        var event = new cc.Event.EventCustom("GETDATE", true);
        this.node.dispatchEvent(event);
        var date = event.back;
        project.setReceiveDay(date);
        group.begin(project,persons);
        this.projectGroups_.push(group);
        console.log(this.projectGroups_);
    },


    stop: function (group){
        group.stop();
        var i=0;
        console.log(this.projectGroups_);
        while(this.projectGroups_[i]!=group){
            i++;
        }
        if(i<this.projectGroups_.length){
            this.projectGroups_.splice(i,1);
        }
    },

    work:function(){
        for(i=0;i < this.projectGroups_.length;i++){
            var group=this.projectGroups_[i];
            console.log("work");
            group.work();
            if(group.state_ == 3)
            {
                this.stop(group);
                i--;
            }
        }
    },

    showPersons: function() {   // 返回所有员工信息
        return this.persons_;
    },

    paySalary:function(){
        event=new cc.Event.EventCustom('GETDATE', true);
        this.node.dispatchEvent(event);
        if(event.back%30 != 1){
            return ;
        }
        var sumSalary = 0;
        for(let i = 0;i<this.persons_.length ; i++){
            sumSalary = sumSalary + this.persons_[i].salary_;
        }
        event=new cc.Event.EventCustom('MONEYCUT', true);
        event.money = sumSalary;
        event.record = "付工资";
        event.force = true;
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
