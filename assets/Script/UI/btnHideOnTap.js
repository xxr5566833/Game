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
        },

    },

    // use this for initialization
    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.show, this);
    },

    show: function() {
        console.log("chufa");
        for (var pnode of this.hide_targets) {
            cc.log(pnode);
            // get some time for buttons to change their states 
            this.unfocus(pnode)
        }
        for (var cnode of this.show_targets) {
            cc.log(cnode);
            cc.log("here");
            cc.log(this.show_targets);
            cnode.active = true;
        }
        cc.log("end");
    },

    unfocus: function(pnode) {
        var temp_x = pnode.x
        pnode.setPosition(65535, pnode.y)
        this.scheduleOnce(function() {
            pnode.setPosition(temp_x, pnode.y)
            pnode.active = false
        }, 0.05);
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
