cc.Class({
    extends: cc.Component,

    properties: {
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
        labelName: {
            default:null,
            type:cc.Label
        },
        labelProfession: {
            default:null,
            type:cc.Label
        },
        chosenRing: {
            default:null,
            type:cc.Node
        }
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

    setProfession: function(prof_str) {
        this.labelProfession.string = prof_str
    },

    see: function() {
        this.caller.showInfoByOrder(this.entryOrder)
    },

    choose: function() {
        if (this.status == "NOT_CHOSEN") {
            this.status = "CHOSEN"
            this.chosenRing.opacity = 255
            this.caller.includeCandidateByOrder(this.entryOrder)
        } else if (this.status = "CHOSEN") {
            this.status = "NOT_CHOSEN"
            this.chosenRing.opacity = 0
            this.caller.excludeCandidateByOrder(this.entryOrder)
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
