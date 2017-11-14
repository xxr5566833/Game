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
        this.updateAll();
    },
    onLoad: function () {
        this.msgBoxControl = this.msgBox.getComponent("msgBoxControl")
        //这里会onload两次，不知道为啥
    },
    createProjects:function(){
        //这里先暂定任务数为3
        var num=3;
        for(var i=0;i<num;i++){
            let project=this.projects_[i];
            if(project==null){
                this.updateAll();
                return;
            }
            else{ 
                if(project.getState()==projectstate.finished||
                project.getState()==projectstate.overdue){
                    this.updateAll();
                    return ;
                }
            }
        }
        //.log('三个任务都没有变');
    },
    updateAll:function(){
        //三个任务都更新,目前假设 只有3个任务
        var num=3;
        var temp = [1, 0, 0];
        for(var j=0;j<num;j++){
            var level =Math.floor( Math.random() * 3 )+ j * 3 + temp[j];
            this.projects_[j]=this.generateProject(level);
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
        this.createProjects();
    },
    finishProject:function(project){
        var company=cc.find(companypath).getComponent("Company");
        company.profit(project.getReward(),"项目完成");
        project.setState(projectstate.finished);
        var date=cc.find('Date').getComponent("Date");
        project.setFinishDay(date.getDate());
        this.msgBoxControl.alert('SUCCESS',"项目完成！获得"+project.getReward())
        this.createProjects();
    },
    getProjects:function(){
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


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
