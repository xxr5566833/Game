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
        msgBox:cc.Node,
        btnLabel:cc.Label,
        main:cc.Node,
        personControl_:cc.Node,
        account_:cc.Node,
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
    },

    onEnable: function() {
        this.setLevel();
        this.setLabel();
        this.updateCandidates();
    },

    setLevel:function(){
        var credit = this.personControl_.getComponent("PersonControl").getCredit();
        var money = 0;
        var level = 0;
        if(credit > 100)
        {
            level = 3;
            money = 512;
        }
        else if(credit > 50 && credit <= 100)
        {
            level = 2;
            money = 54 
        }
        else if(credit > 20 && credit <= 50)
        {
            level = 1;
            money = 8;
        }
        else{
            level = 0;
            money = 1 ;
        }
        this.money = money;
        this.level = level;

        this.setLabel();
    },

    fresh:function(){
        var account = this.account_.getComponent("Account");
        if(account.enoughThenExpend(this.money * 10000))
        {
            this.updateCandidates();
        }
        else{
            var msgcontrol = this.msgBox.getComponent("msgBoxControl");
            msgcontrol.alert('FAIL', '金钱不足，不能刷新');
        }

    },

    setLabel:function(){
        this.btnLabel.string = "试试手气，一次" + this.money + "W";
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
        }

    },

    showInfoByOrder: function(order) {
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
        return this.source.showPersons(this.level);
    },

    hire: function() {
        // TODO for scripters:
        // 按照 this.selectedCandidates，为 true 的下标表示雇佣该员工
        if(this.selectedCandidates.length == 0)
        {
            var msgcontrol = this.msgBox.getComponent("msgBoxControl");
            msgcontrol.alert('FAIL', '至少需要选择一个人');
            return ;
        }
        var sum = 0;
        for(let i = 0; i < this.selectedCandidates.length ; i++)
        {
            var person = this.candidates[i];
            sum += person.employMoney_;
        }
        var account = cc.find("Event/Game/Date/Account").getComponent("Account");
        if(!account.isEnough(sum))
        {
            var msgcontrol = this.msgBox.getComponent("msgBoxControl");
            msgcontrol.alert('FAIL', '您的金钱不足以雇佣这些人');
            return ;
        }
        for(let i=0, j=0;i<this.selectedCandidates.length;i++,j++){
            if(this.selectedCandidates[i] == true){
                this.source.removePerson(this.candidates[j].index_);
                j--;
                //console.log(this.candidates);
            }
        }
        // TODO for UI designer:
        // 钱不够，未选任何员工时提示用户
        this.node.active = false;
        this.main.active = true;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
