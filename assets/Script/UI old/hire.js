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
            type: cc.Label
        },
        scienceLabel: {
            default: null,
            type: cc.Label
        },
        artLabel: {
            default: null,
            type: cc.Label
        },
        creativityLabel: {
            default: null,
            type: cc.Label
        },
        mamagementLabel: {
            default: null,
            type: cc.Label
        },

        nameLabel: {
            default: null,
            type: cc.Label
        },

        scrollView: {
            default: null,
            type: cc.ScrollView
        },
        entryRootY: 135,
        entryX: 0,
        entrySpace: 60 
    },

    // use this for initialization
    onLoad: function () {
        this.candidates = []
        this.hireBtn.node.on(cc.Node.EventType.TOUCH_END, this.hire, this)
        this.node.js=this;

        this.source = cc.find('Event').getComponent('Event')
            .personGenerator_.getComponent('PersonGenerator');
        console.log(this.source);
        //this.node.active = false;
        /*this.TEST_CANDIDATE = 
        {
            abilityCoding_: 0,
            abilityManage_: 10,
            abilityArt_: 0,
            salary_: 250,
            employMoney_: 1000,

            name_: "陈潇伍",
            index_: 7,
            profession_: "程序员"
        }*/
    },

    onEnable: function() {
        this.updateCandidates()
    },

    updateCandidates: function() {
        this.candidates = this.getCandidates()
        //console.log("people count: "+this.candidates.length);
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
           // console.log("new node at y = "+y)
            var node = cc.instantiate(this.candidateEntryPrefab)
            node.parent = this.candidateBoard
            node.setPosition(this.entryX, y)
            
            var candi_entry_management = node.getComponent("candidateEntryManagement")
            candi_entry_management.setName(candi.name_);
            candi_entry_management.setPay(candi.employMoney_ + "$");
            candi_entry_management.loadAvatar(candi.index_, candi.name_);
            candi_entry_management.entryOrder = count;
            candi_entry_management.caller = this;
            count += 1;
            y = y - this.entrySpace;
            console.log(y);
        }

    },

    showInfoByOrder: function(order) {
        console.log("show personal info coding:" + this.candidates[order].coding_);
        console.log("show personal info sci:" + this.candidates[order].science_);

        this.codingLabel.string = Math.floor(this.candidates[order].coding_).toString()
        this.scienceLabel.string = Math.floor(this.candidates[order].science_).toString();
        this.artLabel.string = Math.floor(this.candidates[order].art_).toString();
        this.creativityLabel.string = Math.floor(this.candidates[order].creativity_).toString();
        this.mamagementLabel.string = Math.floor(this.candidates[order].manager_).toString();

        this.nameLabel.string = this.candidates[order].name_;
    },

    includeCandidateByOrder: function(order) {
        this.selectedCandidates[order] = true
        //console.log(this.selectedCandidates)
    },

    excludeCandidateByOrder: function(order) {
        this.selectedCandidates[order] = false
    },

    getCandidates: function() {
        // 返回候选人物的数组
        // TODO: 和后端连接
        return this.source.showPersons(0);
    },

    hire: function() {
        // TODO for scripters:
        // 按照 this.selectedCandidates，为 true 的下标表示雇佣该员工
        console.log(this.selectedCandidates)
        console.log("candidates len:" + this.candidates.length);
        for(let i=0, j=0;i<this.selectedCandidates.length;i++,j++){
            if(this.selectedCandidates[i] == true){
                console.log(j);
                console.log(this.candidates[j]);
                console.log("Hired index:" + this.candidates[j].index_)
                console.log("Hired name:" + this.candidates[j].name_)
                this.source.removePerson(this.candidates[j].index_);
                j--;
                //console.log(this.candidates);
            }
        }
        // TODO for UI designer:
        // 钱不够，未选任何员工时提示用户
        this.node.active = false;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
