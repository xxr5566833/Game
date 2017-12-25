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
        index:0,
        chosen:false,
        Independent:cc.Node,
        avatarSprite: {
            default:null,
            type:cc.Sprite
        }
    },

    // use this for initialization
    onLoad: function () {
        this.chosen=false;
    },

    loadImage: function(index,name) {
        // 加载 SpriteFrame
        var self = this;
        cc.loader.loadRes("avatars/"+index+"_"+name+".png", cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                console.log("loadAvatar error: "+name);
                //.log("loadAvatar error: "+name)
                //cc.error(err.message || err);
                return;
            }
            self.avatarSprite.spriteFrame = spriteFrame;
        });
    },

    onClick:function(){
        var self = this;
        if(this.chosen)
        {
            cc.loader.loadRes("image/前景_选项条", cc.SpriteFrame, function (err, spriteFrame) {
                if (err) {
                    console.log("loadAvatar error: "+name);
                    //.log("loadAvatar error: "+name)
                    //cc.error(err.message || err);
                    return;
                }
                self.node.getComponent(cc.Sprite).spriteFrame=spriteFrame;
            });
            this.chosen=false;
            this.Independent.getComponent('Independent').select_em[this.index]=false;
            this.Independent.getComponent('Independent').refresh();
        }
        else
        {
            cc.loader.loadRes("image/前景_选项_选中", cc.SpriteFrame, function (err, spriteFrame) {
                if (err) {
                    console.log("loadAvatar error: "+name);
                    //.log("loadAvatar error: "+name)
                    //cc.error(err.message || err);
                    return;
                }
                self.node.getComponent(cc.Sprite).spriteFrame=spriteFrame;
            });
            this.chosen=true;
            this.Independent.getComponent('Independent').select_em[this.index]=true;
            this.Independent.getComponent('Independent').refresh();
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
