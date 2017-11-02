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
        show_targets : {
            default: [],
            type: [cc.Node]
        },

        hide_targets : {
            default: [],
            type: [cc.Node]
        }
    },

    // use this for initialization
    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.show, this)
    },

    show: function() {
        for (var pnode of this.hide_targets) {
            pnode.active = false
        }
        for (var cnode of this.show_targets) {
            cnode.active = true
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
