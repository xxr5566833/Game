// 解雇员工 UI 界面的脚本
// 附加在 Game 场景：Canvas/FireBoard
// 主要功能：
//    1. 加载人物信息
//    2. 选中人物(PageView 单选)
//    3. 聘用人物
//    4. 显示人物信息
// TODO:
//    1. 完成 getEmployeeList()
//    2. 完成 hire()
// 参考资料：https://github.com/xxr5566833/Game/wiki/api-reference

cc.Class({
    extends: cc.Component,

    properties: {
        fireBtn: {
            default: null,
            type: cc.Button,
        },
        firePagePrefab: {
            default: null,
            type: cc.Prefab
        },
        ancestorNode: {
            default: null,
            type: cc.Node
        },
        candidateBoard: {
            default: null,
            type: cc.Node,
        },
        pageView: {
            default: null,
            type: cc.PageView
        },
        msgBox: {
            default: null,
            type:cc.Node,
        },
        candidates: {
            default: [],
            type: cc.Prefab
        },
    },

    // use this for initialization
    onLoad: function () {
        this.candidates = []
        //this.updateCandidates()
        this.msgBoxControl = this.msgBox.getComponent("msgBoxControl")
        this.fireBtn.node.on(cc.Node.EventType.TOUCH_END, this.fire, this)
        console.log("get constructor: "+this.fireBtn.constructor);
        console.log(this.node)
        this.node.js = this;
        console.log(this.node.js);
        this.node.active = false;
    },

    onEnable: function() {
        this.updateCandidates()
    },

    fire: function () {
        var page_index = this.pageView.getCurrentPageIndex() 
        var person_index = this.candidates[page_index].index_;
        console.log(this.candidates);
        console.log("page_index: "+page_index)
        console.log("person_index: "+person_index)
        this.msgBoxControl.alert("SUCCESS", "成功解雇："+this.candidates[page_index].name_)
        // TODO for scripters: 根据人物唯一识别码 person_index 来完成解雇
        // =============================================================
        console.log("Hired index:" + this.candidates[page_index].index_)
        cc.find("PersonGenerator").getComponent("PersonGenerator").addPerson(this.candidates[page_index].index_)
        // =============================================================
        this.ancestorNode.getComponent("btnToggleActive").toggle()
        console.log("Fired.")
    },

    updateCandidates: function () {
        this.pageView.scrollToPage(0, 0)
        this.candidates = this.getEmployeeList()
        this.pageView.removeAllPages()
        var count = 0
        for (var candi of this.candidates) {
            console.log("new node")
            var node = cc.instantiate(this.firePagePrefab)
            this.pageView.addPage(node)
            node.y = 0;
            var candi_entry_management = node.getComponent("firePageControl")
            candi_entry_management.setName(candi.name_)
            candi_entry_management.setProfession(candi.profession_)
            candi_entry_management.setCoding(Math.floor(candi.abilityCoding_))
            candi_entry_management.setManage(Math.floor(candi.abilityManage_))
            candi_entry_management.setArt(Math.floor(candi.abilityArt_))
            candi_entry_management.setSalary(Math.floor(candi.salary_))
            candi_entry_management.setLine(candi.supplicateLine_)
            candi_entry_management.loadAvatar(candi.index_, candi.name_)
            candi_entry_management.entryOrder = count
            candi_entry_management.caller = this
            count += 1
            //y = y - this.entrySpace
        }
    },

    getEmployeeList: function () {
        /* TODO for scripters: 和后端连接，返回一个如下格式的对象数组
        return [
            {
                abilityCoding_: 0,
                abilityManage_: 10,
                abilityArt_: 0,
                salary_: 250,
                employMoney_: 1000,
                index:0,
                name_: "陈小武",
                profession_: "程序员",
                supplicateLine_: "谁敢解雇我？"
            }
        ]  */
        var employeelist =  cc.find("Company/PersonControl").getComponent("PersonControl").showPersons()
        /*var infolist = []
        for(var employee of employeelist){
            console.log("Hired: "+employee.name_)
            var info={
                abilityCoding_: employee.abilityCoding_,
                abilityManage_: employee.abilityManage_,
                abilityArt_: employee.abilityArt_,
                salary_: employee.salary_,
                employMoney_: employee.employMoney_,
                index_:employee.index_,
                name_: employee.name_,
                profession_: employee.profession_,
                supplicateLine_: employee.supplicateLine_
            }
            console.log('getEmployList:');
            console.log(info);
            infolist.push(info)
        }*/
        return employeelist
    }
});
