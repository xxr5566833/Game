cc.Class({
    extends: cc.Component,

    properties: {
        goBtn: {
            default: null,
            type: cc.Button,
        },
        ancestorNode: {
            default: null,
            type: cc.Node,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.goBtn.node.on(cc.Node.EventType.TOUCH_END, this.go, this)
    },

    go: function() {
        //console.log("gogogogo")
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
