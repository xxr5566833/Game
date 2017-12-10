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
        labelName: {
            default: null,
            type: cc.Label
        },
        labelProfession: {
            default: null,
            type: cc.Label           
        },
        labelCoding: {
            default: null,
            type: cc.Label
        },
        labelManage: {
            default: null,
            type: cc.Label            
        },
        labelArt: {
            default: null,
            type: cc.Label    
        },
        labelSalary: {
            default: null,
            type: cc.Label                
        },
        labelLine: {
            default: null,
            type: cc.Label                
        },
        avatarSprite: {
            default:null,
            type:cc.Sprite
        }       
    },

    // use this for initialization
    onLoad: function () {
        this.entryOrder = NaN
        this.caller = null
    },

    setName: function (name_str) {
        this.labelName.string = name_str
    },

    setProfession: function (prof_str) {
        this.labelProfession.string = prof_str
    },

    setCoding: function(coding_str) {
        this.labelCoding.string = coding_str
    },

    setManage: function(manage_str) {
        this.labelManage.string = manage_str
    },

    setArt: function(art_str) {
        this.labelArt.string = art_str
    },

    setSalary: function(salary_str) {
        this.labelSalary.string = salary_str
    },

    setLine: function(line_str) {
        this.labelLine.string = line_str
    },

    loadAvatar: function(index, name) {
        // 加载 SpriteFrame
        var self = this;
        cc.loader.loadRes("avatars/"+index+"_"+name+".png", cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                console.log("loadAvatar error: "+name)
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
