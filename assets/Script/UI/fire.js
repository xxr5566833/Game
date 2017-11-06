// 解雇员工 UI 界面的脚本
// 附加在 Game 场景：Canvas/FireBoard
// 主要功能：
//    1. 加载人物信息
//    2. 选中人物(PageView 单选)
//    3. 聘用人物
//    4. 显示人物信息
// TODO:
//    1. 完成 getCandidates()
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
        }
    },

    // use this for initialization
    onLoad: function () {
        this.candidates = []
        this.updateCandidates()
        this.fireBtn.node.on(cc.Node.EventType.TOUCH_START, this.fire, this)
        console.log("get constructor: "+this.fireBtn.constructor)
    },

    onEnable: function() {
        this.updateCandidates()
    },

    fire: function () {
        var page_index = this.pageView.getCurrentPageIndex() 
        var person_index = this.candidates[page_index].index
        console.log("page_index: "+page_index)
        console.log("person_index: "+person_index)
        // TODO for scripters: 根据人物唯一识别码 person_index 来完成解雇
        // =============================================================
        //
        //
        // =============================================================
        this.ancestorNode.getComponent("btnToggleActive").toggle()
        console.log("Fired.")
    },

    updateCandidates: function () {
        this.candidates = this.getEmployeeList()
        for (var node of this.candidateBoard.children) {
            node.destroy()
        }
        var count = 0
        for (var candi of this.candidates) {
            console.log("new node")
            var node = cc.instantiate(this.firePagePrefab)
            node.parent = this.candidateBoard
            node.setPosition(0, 0)
            var candi_entry_management = node.getComponent("firePageControl")
            candi_entry_management.setName(candi.name_)
            candi_entry_management.setProfession(candi.profession_)
            candi_entry_management.setCoding(candi.abilityCoding_)
            candi_entry_management.setManage(candi.abilityManage_)
            candi_entry_management.setArt(candi.abilityArt_)
            candi_entry_management.setSalary(candi.salary_)
            candi_entry_management.setLine(candi.supplicateLine_)
            candi_entry_management.entryOrder = count
            candi_entry_management.caller = this
            count += 1
            //y = y - this.entrySpace
        }
    },

    getEmployeeList: function () {
        // TODO for scripters: 和后端连接，返回一个如下格式的对象数组
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
            },
            {
                abilityCoding_: 0,
                abilityManage_: 10,
                abilityArt_: 0,
                salary_: 250,
                employMoney_: 1000,
                index:0,
                name_: "少时诵诗书所所所所所所所所所",
                profession_: "湿哒哒无四达大厦啥的",
                supplicateLine_: "少时诵诗书所所所所所所所所所少时诵诗书所所所所所所所所所"
            },
            {
                abilityCoding_: 100,
                abilityManage_: 10,
                abilityArt_: 60,
                salary_: 250,
                employMoney_: 1000,
                index:1,
                name_: "乔布斯",
                profession_: "程序员",
                supplicateLine_: "希望你们没了我还能正常运转"
            },
            {
                abilityCoding_: 1000,
                abilityManage_: 50,
                abilityArt_: 60,
                salary_: 290,
                employMoney_: 1000,
                index:2,
                name_: "夜神月",
                profession_: "产品经理",
                supplicateLine_: "僕は新世界の神だ！"
            },
            {
                abilityCoding_: 1000,
                abilityManage_: 1050,
                abilityArt_: 60,
                salary_: 250,
                employMoney_: 1000,
                index:3,
                name_: "汉尼拔·莱克特",
                profession_: "设计师",
                supplicateLine_: "吃了你！"
            },
        ]  
    }
});
