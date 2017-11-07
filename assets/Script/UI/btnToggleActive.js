// 主要功能：控制左边按钮的动作
// TODO: 完成 toggle 中对游戏暂停前进的控制

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
        toggle_targets: {
            // 控制明灭的对象
            default: [],
            type: [cc.Node]     // type 同样写成数组，提高代码可读性
        },

        multi_exclusive:{
            // 和其他toggle存在矛盾，不能同时 toggle_on
            default: [],
            type: [cc.Node]
        },

        toggle_pause_all : {
            default: false,
            type: Boolean
        }
    },

    // use this for initialization
    onLoad: function () {
        this.state = "TOGGLE_ON"
        console.log("inited")
        console.log(this.toggle_targets)
        this.node.on(cc.Node.EventType.TOUCH_END, this.toggle, this)
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    toggle: function() {
        if (this.state == "TOGGLE_ON") {
            for (var me_node of this.multi_exclusive) { // 清掉互斥节点
                var toggle_comp = me_node.getComponent('btnToggleActive')
                if (toggle_comp.state == "TOGGLE_OFF") { // 表示另一个节点点亮了
                    toggle_comp.toggle()
                }
            }
            for (var node of this.toggle_targets) {  // Use of！
                console.log("on")
                node.active = true
            }
            this.state = "TOGGLE_OFF"
            if (this.toggle_pause_all) {
                // TODO: 和后端连接，实现游戏内容暂停，而不是停止所有动画
            }
        } else if (this.state == "TOGGLE_OFF") {
            if (this.toggle_pause_all) {
                // TODO: 和后端连接，实现游戏内容重启（resume），而不是停止所有动画
            }
            var call_tree = this.getComponent("btnCallTree")
            call_tree.inactivateCascade()
            this.state = "TOGGLE_ON"           
        }
    }

});
