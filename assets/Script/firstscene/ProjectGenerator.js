var projectstate=require('global').projectState;
var project=require('Project');
var companypath=require('global').companyPath;
cc.Class({
    extends: cc.Component,

    properties: {
        projects_:[cc.Prefab],
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
    start:function(){
    },
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
        console.log('三个任务都没有变');
    },
    updateAll:function(){
        //三个任务都更新
        var num=3;
        for(var j=0;j<num;j++){
            console.log("开始制作第"+j+"个");
            this.projects_[j]=this.generateProject(1);
        }
        console.log('创建了三个新的任务');
        console.log(this.projects_)
        return ;
    },
    generateProject:function(level){
        //表示根据level等级产生任务，下面的属性都是暂定
        console.log(this.projs);
        var index=Math.floor(cc.random0To1()*5);
        var tempproj=this.projs[index];
        var proj=new project();
        proj.init(tempproj);
        return proj;
    },
    //调试用的临时temp，这里在ui加上后就会删除
    temp:function(){
        var company=cc.find(companypath).getComponent('Company');
        company.receiveProject(this.projects_[0]);
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
        console.log("任务报酬"+project.getReward());
        project.setState(projectstate.finished);
        var date=cc.find('Date').getComponent("Date");
        project.setFinishDay(date.getDate());
        this.msgBoxControl.alert('SUCCESS',"项目完成！获得"+project.getReward())
        this.createProjects();
    },
    getProjects:function(){
        return this.projects_;
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
