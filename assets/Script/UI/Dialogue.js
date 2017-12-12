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
        bubbles: {
            default: [],
            type: [cc.Label]
        },
        head: 0,
        tail: 0,
        length_ : 10,
    },

    // use this for initialization
    onLoad: function () {
        // 初始化length个对话气泡
        for (var i = 0; i < length_; i++) {
            var l = new cc.Label()
            l.string = "test"
            bubbles.push(l)
        }
    },

    newRow: function(s) {
        if (tail >= length_) {
            for (var i = this.head; i < tail-1; i++) {
                bubbles[i].string = bubbles[i+1].string
            }
        }
        bubbles[this.tail].string = s
        this.tail ++
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
