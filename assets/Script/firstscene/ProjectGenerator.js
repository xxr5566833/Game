var projectstate=require('global').projectState;
var objproject=require('Project');
cc.Class({
    extends: cc.Component,

    properties: {
        projects_:[cc.Prefab],

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
    onLoad: function () {
        //这里会onload两次，不知道为啥
        console.log("ok");
        this.updateProject();
    },
    createProjects:function(){
        //这里先暂定任务数为3
        var num=3;
        for(var i=0;i<num;i++){
            let project=this.projects_[i];
            if(project==null){
                this.updateProject();
            }
            else{ 
                if(project.getState()==projectstate.finished||
                project.getState()==projectstate.overdue){
                    this.updateProject();
                }
            }
        }
        console.log('三个任务都没有变');
    },
    updateProject:function(){
        //三个任务都更新
        var num=3;
        for(var j=0;j<num;j++){
            console.log("开始制作第"+j+"个");
            this.projects_[j]=this.generateProject(1);
        }
        console.log('创建了三个新的任务');
        return ;
    },
    generateProject:function(level){
        //表示根据level等级产生任务，下面的属性都是暂定
        var require={
            ui:10,
            func:10,
            bugnum:5,
        };
        
        var project={
            category:'normal',
            require:require,
            reward:100,
            deadline:10,
        };
        /*这里利用require引入 Project.js定义的Project组件，这里我谈一下我的理解
        我们在js文件里定义的是Component的子类，如何获得这些子类？
        1.对于project这种在建立后会消失的组件，我们直接require引出它
        2.对于company projectgenerator这些单一的组件，我们用cc.find先找到node
        然后在node.getComponent获得组件，为了调试修改了你们一些代码，我在修改了的
        地方都加了注释，注释内容是你们原来的代码，便于你们辨认，大多都是getComponent
        的修改
        */
        //project这里直接用构造函数新建，用方法1
        var proj=new objproject();
        proj.init(project);
        return proj;
    },
    tempButton:function(){
        this.createProjects();
        console.log("公司开始接受");
        //公司是全局的，这里用方法2
        var company=cc.find('Company').getComponent("Company");
        company.receiveProject(this.projects_[0]);
    },
    failProject:function(project){
        var company=cc.find('Company').getComponent("Company");
        project.setState(projectstate.overdue);
        project.setFinishDay(date.getDate());
        console.log('任务失败');
    },
    finishProject:function(project){
        var company=cc.find('Company').getComponent("Company");
        company.profit(project.getReward(),"项目完成");
        console.log("任务报酬"+project.getReward());
        project.setState(projectstate.finished);
        var date=cc.find('Date').getComponent("Date");
        project.setFinishDay(date.getDate());
        console.log('任务成功');
    },


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
