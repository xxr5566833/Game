cc.Class({
    extends: cc.Component,

    properties: {
        transDuration_:0.1,
        pressedScale_:1.1,
        initScale_:1.0,
        btnAudio:{
            url:cc.AudioClip,
            default:null,
        },


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
        this.scaleChangeAction = cc.scaleTo(this.transDuration_, this.pressedScale_);
        this.scaleCancelAction = cc.scaleTo(this.transDuration_, this.initScale_);
        this.node.on('touchstart', this.onTouchDown, this);
        this.node.on('touchend', this.onTouchUp, this);
        this.node.on('touchcancel', this.onTouchUp, this);
    },
    onTouchDown:function(event){
        this.node.stopAllActions();
        cc.audioEngine.playEffect(this.btnAudio,false);
        this.node.runAction(this.scaleChangeAction);
    },
    onTouchUp:function(event){
        this.node.stopAllActions();
        this.node.runAction(this.scaleCancelAction);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
