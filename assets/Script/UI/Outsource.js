cc.Class({
    extends: cc.Component,

    properties: {
        Main:cc.Node,
        projectMenu:cc.Node,
        employeeMenu:cc.Node,
        emview:cc.Node,
        emPrefab: cc.Prefab,
        select_em:[Object],
        name1:cc.Label,
        name2:cc.Label,
        name3:cc.Label,
        reward1:cc.Label,
        reward2:cc.Label,
        reward3:cc.Label,
        function:cc.Label,
        deadline:cc.Label,
        msgBox:cc.Node,
        select_em:[Object],
    },

    onEnable: function () {
        this.projects = cc.find("Event/Game/Date/Account/ProjectGenerator").getComponent("ProjectGenerator").getProjects(); // 抛事件得到可选项目
        this.persons = cc.find("Event/Game/Date/Account/PersonControl").getComponent("PersonControl").getAvailablePersons();
        console.log(this.persons);
        console.log(this.projects);
        this.name1.string = this.projects[0].name_;
        this.name2.string = this.projects[1].name_;
        this.name3.string = this.projects[2].name_;
        this.reward1.string = this.projects[0].reward_;
        this.reward2.string = this.projects[1].reward_;
        this.reward3.string = this.projects[2].reward_;
        this.show(null,0);
        var em_l=this.persons.length;
        //首先要消除上一次的预置资源
        for (var node of this.emview.children) {
            node.destroy()
        }
        for(var p=0;p<em_l;p++)
        {
            var item = cc.instantiate(this.emPrefab);
            item.getComponent('outemp').index=p;
            item.getComponent('outemp').Outsource=this;
            item.getChildByName("power").getComponent(cc.Label).string=this.persons[p].power_.toString();
            item.getChildByName("name").getComponent(cc.Label).string=this.persons[p].name_;
            item.getComponent('outemp').loadImage(this.persons[p].index_,this.persons[p].name_);
            this.emview.addChild(item);
            this.select_em[p]=false;
        }
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

    // 还差响应所选员工的函数，记录在this.persons里

    begin: function(event){
        var selectPersons=[];
        for(var p=0;p<this.select_em.length;p++){
            if(this.select_em[p]){
                selectPersons.push(this.persons[p]);
            }
        }
        console.log(selectPersons);
        if(selectPersons.length > 4)
        {
            var msgcontrol = this.msgBox.getComponent("msgBoxControl");
            msgcontrol.alert('FAIL', '最多只能选择4个人');
            return ;
        }
        if(selectPersons.length == 0)
        {
            var msgcontrol = this.msgBox.getComponent("msgBoxControl");
            msgcontrol.alert('FAIL', '至少需要选择一个人');
            return ;
        }
        cc.find("Event/Game/Date/Account/PersonControl").getComponent("PersonControl").begin(this.selectProject,  selectPersons)
        this.employeeMenu.active=false;
        this.node.active = false;
        this.Main.active=true;   
    },

    quit :function(event){   
        event.target.parent.active=false;   // 关闭当前界面
        this.node.active = false;
        this.Main.active=true;  
    }
});
