var projectgroup = require("ProjectGroup");
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
        Layout: {
            default: null,
            type: cc.Node
        }
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

    onload: function () {
        // 每隔1秒刷新一次聊天室
        this.schedule(this.fresh, 1);
        cc.log("dialogue initial")
    },

    // 刷新对话框
    fresh: function () {
        // debug
        cc.log(this.currentProjectGroup_.persons_[0].month_)
        cc.log(this.currentProjectGroup_.persons_[1].month_)
        cc.log(this.currentProjectGroup_.persons_[2].month_)
        cc.log(this.currentProjectGroup_.persons_[3].month_)

        if (this.currentProjectGroup_.persons_[0] != undefined) {
            this.Layout.Label1.string = this.currentProjectGroup_.persons_[0].month_
        } else {
            this.Layout.Label1.string = ""
        }
        if (this.currentProjectGroup_.persons_[1] != undefined) {
            this.Layout.Label1.string = this.currentProjectGroup_.persons_[0].month_
        } else {
            this.Layout.Label1.string = ""
        }
        if (this.currentProjectGroup_.persons_[2] != undefined) {
            this.Layout.Label1.string = this.currentProjectGroup_.persons_[0].month_
        } else {
            this.Layout.Label1.string = ""
        }
        if (this.currentProjectGroup_.persons_[3] != undefined) {
            this.Layout.Label1.string = this.currentProjectGroup_.persons_[0].month_
        } else {
            this.Layout.Label1.string = ""
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
});
