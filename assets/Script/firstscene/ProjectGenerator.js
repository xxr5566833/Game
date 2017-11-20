var projectstate=require('global').projectState;
var project=require('Project');
var companypath=require('global').companyPath;
cc.Class({
    extends: cc.Component,

    properties: {
        projects_:{
            default: [],
            type:[cc.Prefab],
            visible:false,
        },
        msgBox: {
            default: null,
            type:cc.Node,
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

    // use this for initialization

    init:function(projs){
        this.projs=projs;
        this.availableList = [0, 1, 2, 3];
        var initnum = 4;
        this.updateAll();
    },
    onLoad: function () {
        this.msgBoxControl = this.msgBox.getComponent("msgBoxControl")
        //这里会onload两次，不知道为啥
    },
    updateAll:function(){
        //三个任务都更新,目前假设 只有3个任务
        var num=3;
        var choose = [];
        var i = 0;
        while(i < 3){
            var randomnum = Math.floor(cc.random0To1() * this.availableList.length);
            if(choose.indexOf(randomnum) == -1){
                ++i;
                choose.push(randomnum);
            }
        }
        console.log(choose);
        for(let j = 0; j < num; ++j)
        {
            var proj = new project();
            var index = this.availableList[choose[j]];
            for(let k = 0; k < this.projs.length; ++k)
            {
                if(this.projs[k].index == index){
                    proj.init(this.projs[k]);
                    this.projects_[j] = proj;
                    break;
                }
            }
        }
    },
    generateProject:function(level){
        var list = [];
        for(let i=0;i<this.projs.length ;i++){
            if(this.projs[i].level == level){
                list.push(this.projs[i]);
            }
        }
        var index=Math.floor(cc.random0To1()*(list.length ));
        var tempproj=list[index];
        var proj=new project();
        proj.init(tempproj);
        return proj;
    },

    failProject:function(project){
        var company=cc.find(companypath).getComponent("Company");
        var date=cc.find('Date').getComponent("Date");
        project.setState(projectstate.overdue);
        project.setFinishDay(date.getDate());
        this.msgBoxControl.alert('FAIL',"未能及时完成任务！声誉下降")
    },
    finishProject:function(project){
        var company=cc.find(companypath).getComponent("Company");
        company.profit(project.getReward(),"项目完成");
        project.setState(projectstate.finished);
        this.updateAvailable(project.index_);
        console.log(this.availableList);
        var date=cc.find('Date').getComponent("Date");
        project.setFinishDay(date.getDate());
        this.msgBoxControl.alert('SUCCESS',"项目完成！获得"+project.getReward())
    },
    getProjects:function(){
        //每一次给前端返回可选的project时，都重新生成一下可选project
        this.updateAll();
        return this.projects_;
    },
    pause:function(){
        this.unschedule(this.changeRequire);
    },
    resume:function(){
        this.schedule(this.changeRequire, 2);
    },
    changeRequire:function(){
        var pc = cc.find('Company/PersonControl').getComponent('PersonControl');
        var pcproj = pc.getProject();
        if(pc.isWorking() && pcproj.currentUi_ != 0 && pcproj.currentFunc_ != 0){
            var temp = Math.random();
            if(temp <= 0.015 * (8 - pcproj.level_)){
                this.msgBoxControl.alert('FAIL','改动了需求,损失开发点数');
                pcproj.currentUi_ = pc.project_.currentUi_ * 0.8;
                pcproj.currentFunc_ = pc.project_.currentFunc_ * 0.8;
            }
        }
    },

    updateAvailable:function(index){
        if(this.projs[index].unlock){
            return; 
        }
        this.projs[index].unlock = true;
        for(let i = 0; i < this.projs.length; i++){
            //如果availableList里已经有了这个project的index，那么已经可用了，那么就跳过
            if(this.availableList.indexOf(this.projs[i].index) != -1){
                continue;
            }
            var list = this.projs[i].unlockRequire;
            var available = true;
            for(let j = 0; j < list.length; ++j)
            {
                available = available && (this.availableList.indexOf(list[j]) != -1) && this.projs[list[j]].unlock;
            }
            if(available){
                this.msgBoxControl.alert('SUCCESS',"解锁了新的任务!");
                console.log('解锁新任务');
                console.log(this.projs[index])
                console.log(this.projs[i]);
                this.availableList.push(this.projs[i].index);
                return ;
            }
        }
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
