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
        avatarSprite: {
            default:null,
            type:cc.Sprite
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    loadImage: function(name) {
        // 加载 SpriteFrame
        var self = this;
        cc.loader.loadRes("image/"+name+".png", cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                console.log("loadAvatar error: "+name);
                //.log("loadAvatar error: "+name)
                //cc.error(err.message || err);
                return;
            }
            self.avatarSprite.spriteFrame = spriteFrame;
        });
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
