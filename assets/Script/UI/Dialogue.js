var projectgroup = require("ProjectGroup");
var person = require("Person")
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
        projectGroups_: {
            default: [],
            type: [projectgroup]
        },
        currentProjectGroup_: {
            default: null,
            type: projectgroup
        },
        Label1: {
            default: null,
            type: cc.Label
        },
        Label2: {
            default: null,
            type: cc.Label
        },
        Label3: {
            default: null,
            type: cc.Label
        },
        Label4: {
            default: null,
            type: cc.Label
        },
        avatar1: {
            default: null,
            type: cc.Sprite
        },
        avatar2: {
            default: null,
            type: cc.Sprite
        },
        avatar3: {
            default: null,
            type: cc.Sprite
        },
        avatar4: {
            default: null,
            type: cc.Sprite
        },
    },

    // use this for initialization
    /*onLoad: function () {
        var event = new cc.Event.EventCustom('get-all-project-groups', true)
        event.person = this
        this.node.dispatchEvent(event);    
        this.updateProjectGroups(event.detail.back)
        // 初始化4个对话气泡
        for (var i = 0; i < 4; i++) {
            this.bubbles_.push(new cc.Label())
        }
    },*/

    onLoad: function () {
        // 每隔1秒刷新一次聊天室
        this.schedule(this.fresh, 1);
        this.layout = this.node.children[0]
        this.layout
        cc.log("dialogue initial")
        // fake data
        this.currentProjectGroup_ = new (projectgroup)
        this.currentProjectGroup_.persons_.push(new (person))
        this.currentProjectGroup_.persons_.push(new (person))
        this.currentProjectGroup_.persons_.push(new (person))
        this.currentProjectGroup_.persons_.push(new (person))
        this.currentProjectGroup_.persons_[0].month_ = "saying1 是第三方粉色地方宋对方会收到回复快乐"
        this.currentProjectGroup_.persons_[1].month_ = "saying2"
        this.currentProjectGroup_.persons_[2].month_ = "saying3"
        this.currentProjectGroup_.persons_[3].month_ = "saying4水电费水电费水电费地方撒的"
        this.currentProjectGroup_.persons_[0].index_ = 0
        this.currentProjectGroup_.persons_[1].index_ = 1
        this.currentProjectGroup_.persons_[2].index_ = 2
        this.currentProjectGroup_.persons_[3].index_ = 3
        this.currentProjectGroup_.persons_[0].name_ = "路人甲"
        this.currentProjectGroup_.persons_[1].name_ = "匪兵乙"
        this.currentProjectGroup_.persons_[2].name_ = "炮灰丙"
        this.currentProjectGroup_.persons_[3].name_ = "流氓丁"
    },

    // 刷新对话框
    fresh: function () {
        // debug
        cc.log(this.currentProjectGroup_.persons_[0].month_)
        cc.log(this.currentProjectGroup_.persons_[1].month_)
        cc.log(this.currentProjectGroup_.persons_[2].month_)
        cc.log(this.currentProjectGroup_.persons_[3].month_)

        if (this.currentProjectGroup_.persons_[0] != undefined) {
            this.Label1.string = this.currentProjectGroup_.persons_[0].month_
            this.loadAvatar(this.currentProjectGroup_.persons_[0].index_, this.currentProjectGroup_.persons_[0].name_, this.avatar1)
        } else {
            this.Label1.string = ""
        }
        if (this.currentProjectGroup_.persons_[1] != undefined) {
            this.Label2.string = this.currentProjectGroup_.persons_[1].month_
            this.loadAvatar(this.currentProjectGroup_.persons_[1].index_, this.currentProjectGroup_.persons_[1].name_, this.avatar2)
        } else {
            this.Label2.string = ""
        }
        if (this.currentProjectGroup_.persons_[2] != undefined) {
            this.Label3.string = this.currentProjectGroup_.persons_[2].month_
            this.loadAvatar(this.currentProjectGroup_.persons_[2].index_, this.currentProjectGroup_.persons_[2].name_, this.avatar3)
        } else {
            this.Label3.string = ""
        }
        if (this.currentProjectGroup_.persons_[3] != undefined) {
            this.Label4.string = this.currentProjectGroup_.persons_[3].month_
            this.loadAvatar(this.currentProjectGroup_.persons_[3].index_, this.currentProjectGroup_.persons_[3].name_, this.avatar4)
        } else {
            this.Label4.string = ""
        }
    },

    // 更新项目组接口
    updateProjectGroups: function (groups) {
        this.projectGroups_ = groups
        if (this.projectGroups_.length > 0) {
            // 默认为第一个项目组
            this.currentProjectGroup_ = this.projectGroups_[0]
        }
    },

    // 切换到前一个项目组
    left: function () {
        this.currentProjectGroup_ = this.projectGroups_[(this.projectGroups_.indexOf(this.currentProjectGroup_) - 1 + this.projectGroups_.length) % this.projectGroups_.length]
    },

    // 切换到后一个项目组
    right: function () {
        this.currentProjectGroup_ = this.projectGroups_[(this.projectGroups_.indexOf(this.currentProjectGroup_) + 1) % this.projectGroups_.length]
    },
    // called every frame, uncomment this function to activate update callback
    /*update: function (dt) {
        for (var i = 0; i < 4; i++) {
            if (i < this.currentProjectGroup_.persons_.length) {
                this.bubbles_[i].string = this.currentProjectGroup_.persons_[i].month_
            } else {
                this.bubbles_[i].string = ""
            }
        }
    },*/
    // 根据index和name修改一个avatar
    loadAvatar: function (index, name, avatar) {
        // 加载 SpriteFrame
        cc.loader.loadRes("avatars/" + index + "_" + name + ".png", cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                console.log("loadAvatar error: " + name)
                //cc.error(err.message || err);
                return;
            }
            avatar.spriteFrame = spriteFrame;
        });
    }
});
