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

        msgBox: {
            default: null,
            type:cc.Node,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_END, this.show, this);
        // this.msgBoxControl = this.msgBox.getComponent("msgBoxControl");
    },

    show: function() {
        //只能先这样改了，如果把这个判断放在下面，那么会按钮逻辑关系有问题。。ui以后来改也行
        for (var cnode of this.show_targets) {
            //var msg = cnode.getComponent(cnode.name).canShow();
            /*if(msg != ''){
                //this.msgBoxControl.alert("FAIL", msg);
                return ;
            }*/
        }
        for (var pnode of this.hide_targets) {
            //(pnode);
            // get some time for buttons to change their states 
            this.unfocus(pnode)
        }
        for (var cnode of this.show_targets) {
           /* cc.log(cnode);
            cc.log(cnode.name);
            cc.log("here");
            cc.log(this.show_targets);*/
            //var msg = cnode.getComponent(cnode.name).canShow();
            //if(msg===''){
            console.log(cnode);    
            cnode.active = true;
            /*}
            else{
                this.msgBoxControl.alert("FAIL", msg);

                console.log(cnode.js);
                //cnode.js.ancestorNode.getComponent("btnToggleActive").toggle();
            }*/
        }
        //cc.log("end");
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
