cc.Class({
    extends: cc.Component,

    properties: {
        Main:cc.Node,
        projectMenu:cc.Node,
        employeeMenu:cc.Node,
        name1:cc.Label,
        name2:cc.Label,
        name3:cc.Label,
        reward1:cc.Label,
        reward2:cc.Label,
        reward3:cc.Label,
        function:cc.Label,
        deadline:cc.Label,
        msgBox:cc.Node
    },

    onEnable: function () {
        this.projects = cc.find("Event/Game/Date/Account/ProjectGenerator").getComponent("ProjectGenerator").getProjects(); // 抛事件得到可选项目
        console.log(this.projects);
        this.name1.string = this.projects[0].name_;
        this.name2.string = this.projects[1].name_;
        this.name3.string = this.projects[2].name_;
        this.reward1.string = this.projects[0].reward_;
        this.reward2.string = this.projects[1].reward_;
        this.reward3.string = this.projects[2].reward_;
        this.show(null,0);
    },

    show :function(toggle,id) {    // 选择项目触发,显示具体信息
        console.log("ok");
        this.selectProject=this.projects[id];
        this.function.string = this.selectProject.requireFunction_;
        this.deadline.string = this.selectProject.deadline_;
    },

    accept :function(event){        // 接受当前所选项目
        this.projectMenu.active=false;  
        this.employeeMenu.active=true;
    },

    pre: function(event){
        this.employeeMenu.active=false; 
        this.projectMenu.active=true; 
    },

    // 还查响应所选员工的函数，记录在this.persons里

    begin: function(event){
        cc.find("Event/Game/Date/Account/ProjectGenerator").getComponent("PersonControl").begin(this.selectProject,this.persons)
        this.employeeMenu.active=false;
        this.Main.active=true;   
    },

    quit :function(event){   
        event.target.parent.active=false;   // 关闭当前界面
        this.Main.active=true;  
    }
});
