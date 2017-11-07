// 招聘员工 UI 界面的脚本
// 附加在 Game 场景：Canvas/HireBoard
// 主要功能：
//    1. 加载人物信息到 HireBoard/person_scroll/view/content
//    2. 选中人物(多选)
//    3. 聘用人物
//    4. 显示人物信息
// TODO:
//    1. 完成 getCandidates()
//    2. 完成 hire()
// 参考资料：https://github.com/xxr5566833/Game/wiki/api-reference

cc.Class({
    extends: cc.Component,
    properties: {
        hireBtn: {
            default: null,
            type: cc.Button,
        },
        ancestorNode: {
            default: null,
            type: cc.Node
        },
        candidateBoard: {
            default: null,
            type: cc.Node,
        },
        candidateEntryPrefab: {
            default: null,
            type: cc.Prefab,
        },
        codingLabel: {
            default: null,
            type: cc.Label,
        },
        manageLabel: {
            default: null,
            type: cc.Label,
        },
        artLabel: {
            default: null,
            type: cc.Label,
        },
        advancePayLabel: {
            default: null,
            type: cc.Label,
        },   
        salaryLabel: {
            default: null,
            type: cc.Label,
        },     
        scrollView: {
            default: null,
            type: cc.ScrollView
        },
        entryRootY: 135,
        entryX: 0,
        entrySpace: 65 
    },

    // use this for initialization
    onLoad: function () {
        this.candidates = []
        this.hireBtn.node.on(cc.Node.EventType.TOUCH_START, this.hire, this)
        this.hireBtn.node.on(cc.Node.EventType.TOUCH_END, this.hire, this)

        this.TEST_CANDIDATE = 
        {
            abilityCoding_: 0,
            abilityManage_: 10,
            abilityArt_: 0,
            salary_: 250,
            employMoney_: 1000,

            name_: "陈潇伍",
            index_: 7,
            profession_: "程序员"
        }
    },

    onEnable: function() {
        this.updateCandidates()
    },

    updateCandidates: function() {
        this.candidates = this.getCandidates()
        this.candidates.unshift(this.TEST_CANDIDATE)
        this.selectedCandidates = []
        this.scrollView.scrollToTop()
        this.candidateBoard.height = this.entrySpace * (this.candidates.length + 1)
        for (var node of this.candidateBoard.children) {
            node.destroy()
        }
        var y = this.entryRootY
        var count = 0
        for (var candi of this.candidates) {
            this.selectedCandidates[count] = false
            console.log("new node at y = "+y)
            var node = cc.instantiate(this.candidateEntryPrefab)
            node.parent = this.candidateBoard
            node.setPosition(this.entryX, y)
            
            var candi_entry_management = node.getComponent("candidateEntryManagement")
            candi_entry_management.setName(candi.name_)
            candi_entry_management.setProfession(candi.profession_)
            candi_entry_management.loadAvatar(candi.index_, candi.name_)
            candi_entry_management.entryOrder = count
            candi_entry_management.caller = this
            count += 1
            y = y - this.entrySpace
        }
    },

    showInfoByOrder: function(order) {
        console.log(this.candidates[order]);
        this.codingLabel.string = Math.floor(this.candidates[order].abilityCoding_).toString()
        this.manageLabel.string = Math.floor(this.candidates[order].abilityManage_).toString()
        this.artLabel.string = Math.floor(this.candidates[order].abilityArt_).toString()
        this.salaryLabel.string = Math.floor(this.candidates[order].salary_.toString())+"$"
        this.advancePayLabel.string = Math.floor(this.candidates[order].employMoney_.toString())+"$"
    },

    includeCandidateByOrder: function(order) {
        this.selectedCandidates[order] = true
        console.log(this.selectedCandidates)
    },

    excludeCandidateByOrder: function(order) {
        this.selectedCandidates[order] = false
    },

    getCandidates: function() {
        // 返回候选人物的数组
        // TODO: 和后端连接
        //这里默认level为0
        return cc.find("PersonGenerator").getComponent("PersonGenerator").showPersons(0)
    },

    hire: function() {
        // TODO for scripters:
        // 按照 this.selectedCandidates，为 true 的下标表示雇佣该员工
        console.log(this.candidates)
        for(let i=0, j=0;i<this.selectedCandidates.length;i++,j++){
            if(this.selectedCandidates[i]==true){
                console.log("Hired index:" + this.candidates[j].index)
                console.log("Hired name:" + this.candidates[j].name_)
                cc.find("PersonGenerator").getComponent("PersonGenerator").removePerson(this.candidates[j].index)
                j--
            }
        }
        // TODO for UI designer:
        // 钱不够，未选任何员工时提示用户
        this.ancestorNode.getComponent("btnToggleActive").toggle()
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
