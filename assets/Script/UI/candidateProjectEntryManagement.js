cc.Class({
    extends: cc.Component,

    properties: {
        labelName: {
            default: null,
            type:cc.Label
        },
        labelReward: {
            default: null,
            type:cc.Label
        },
        chosenRing: {
            default: null,
            type: cc.Node
        },
        multiExclusive: {
            default: [],
            type: [cc.Node],
        },
    },

    // use this for initialization
    onLoad: function () {
        this.entryOrder = NaN
        this.caller = null

        this.status = "NOT_CHOSEN"

        this.node.on(cc.Node.EventType.TOUCH_START, this.see, this)   
        this.node.on(cc.Node.EventType.TOUCH_END, this.choose, this)  
    },

    setName: function (name_str) {
        this.labelName.string = name_str
    },

    setReward: function(reward_str) {
        this.labelReward.string = reward_str
    },

    see: function() {
        console.log(this.entryOrder)
        this.caller.showInfoByOrder(this.entryOrder)
    },

    choose: function() {
        if(this.caller.selectedProject==this.entryOrder){
            return ;
        }
        if (this.status == "NOT_CHOSEN") {
            this.status = "CHOSEN";
            //this.chosenRing.opacity = 255
            this.caller.selectedProject = this.entryOrder;
            cc.log('not chosen to chosen');
            this.unselectOther();
        } else if (this.status = "CHOSEN") {
            this.status = "NOT_CHOSEN";
            //this.chosenRing.opacity = 0
            cc.log('chosen to not chosen');
        }
    },

    unselectOther: function() {
        for (var node of this.multiExclusive) {
            var manage = node.getComponent('candidateProjectEntryManagement')
            if (manage.status = "CHOSEN") {
                manage.choose()
            }
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
