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
        children: {
            default: [],
            type: [cc.Node]
        },
        father: {
            default: [],
            type: [cc.Node]
        }
    },

    // use this for initialization
    inactivateCascade: function () {
        for (var pnode of this.children) {
            var tree = pnode.getComponent('btnCallTree')
            if (tree) { 
                tree.inactivateCascade()
            }
            pnode.active = false
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
