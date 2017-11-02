// 接受委托项目的 UI 脚本 
// 附加在场景 Game：Canvas/MandatoryBoard
// 主要功能：
//    1. 加载任务信息到 MandatoryBoard/projects/project<i> (<i> = 1, 2, 3)
//    2. 选中任务(单选)
//    3. 聘用任务
//    4. 显示任务信息
// TODO:
//    1. 完成 getCandidateProjects()
//    2. 完成 accept()
// 参考资料：https://github.com/xxr5566833/Game/wiki/api-reference

cc.Class({
    extends: cc.Component,

    properties: {

        ancestorNode: {
            default: null,
            type: cc.Node,
        },
        btnCandidateProjects: {
            default: [],
            type: [cc.Node],
        },
        btnAccept: {
            default: null,
            type: cc.Button,
        },
        uiLabel: {
            default: null,
            type:cc.Label,           
        },
        funcLabel: {
            default: null,
            type:cc.Label,
        },
        deadlineLabel: {
            default: null,
            type:cc.Label,
        },
        rewardLabel: {
            default: null,
            type:cc.Label,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.selectedProject = NaN
        this.candidateProjects = []
        this.btnAccept.node.on(cc.Node.EventType.TOUCH_END, this.accept, this)
    },

    onEnable: function() {
        this.updateCandidateProjects()
    },

    updateCandidateProjects: function() {
        this.candidateProjects = this.getCandidateProjects()
        for (var index = 0; index < this.btnCandidateProjects.length; index++) {
            console.log("set "+index)
            var manage = this.btnCandidateProjects[index].getComponent('candidateProjectEntryManagement')
            manage.caller = this
            manage.entryOrder = index
        }
        for (var index = 0; index < this.btnCandidateProjects.length; index++) {
            var manage = this.btnCandidateProjects[index].getComponent('candidateProjectEntryManagement')
            console.log(manage)
            manage.setName(this.candidateProjects[index].content_)
            manage.setReward(this.candidateProjects[index].reward_)
        }
    },

    showInfoByOrder: function(order) {
        this.uiLabel.string = this.candidateProjects[order].requireUi_.toString()
        this.funcLabel.string = this.candidateProjects[order].requireFunc_.toString()
        this.deadlineLabel.string = this.candidateProjects[order].deadline_.toString() + " Weeks"
        this.rewardLabel.string = this.candidateProjects[order].reward_.toString()+"$"
    },

    getCandidateProjects: function() {
        // TODO: 和后端显示候选委托项目连接
        return [
            {
                requireUi_: 10,
                requireFunc_: 10,
                reward_: 1000,
                deadline_: 10,
                content_: "编译课设"
            },
            {
                requireUi_: 15,
                requireFunc_: 10,
                reward_: 900,
                deadline_: 9,
                content_: "数据挖掘"
            },
            {
                requireUi_: 25,
                requireFunc_: 5,
                reward_: 900,
                deadline_: 9,
                content_: "谭语言设计"
            },
        ]
    },

    accept: function() {
        // TODO for scripters:
        // this.selectedProject 表示 this.candidateProjects 被用户选中了哪个
        // TODO for UI designer:
        // 当前没有雇佣任何员工，未选任何项目时提示用户
        this.ancestorNode.getComponent("btnToggleActive").toggle()
        console.log("Accepted.")
    }
});
