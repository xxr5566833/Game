cc.Class({
    extends: cc.Component,

    properties: {
        transDuration_:0.1,
        pressedScale_:1.1,
        initScale_:1.0,

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
    },

    // use this for initialization
    onLoad: function () {
        this.initBtnScaleCtrl();
    },
    initBtnScaleCtrl:function(){
        var self=this;
        self.button = self.getComponent(cc.Button);
        self.scaleChangeAction = cc.scaleTo(this.transDuration_, this.pressedScale_);
        self.scaleCancelAction = cc.scaleTo(this.transDuration_, this.initScale_);
        function onTouchDown (event) {
            this.stopAllActions();
            this.runAction(self.scaleChangeAction);
        }
        function onTouchUp (event) {
            this.stopAllActions();
            this.runAction(self.scaleCancelAction);
        }
        this.node.on('touchstart', onTouchDown, this.node);
        this.node.on('touchend', onTouchUp, this.node);
        this.node.on('touchcancel', onTouchUp, this.node);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
