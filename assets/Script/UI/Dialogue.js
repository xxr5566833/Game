var projectgroup = require("ProjectGroup");
var person = require("Person")
var project = require("Project")
var personControl = require("PersonControl")
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
        projectTitle: {
            default: null,
            type: cc.Label
        },
        projectIndex: {
            default: null,
            type: cc.Label
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
        leftBtn: {
            default: null,
            type: cc.Sprite
        },
        rightBtn: {
            default: null,
            type: cc.Sprite
        },
        personControl_: {
            default: null,
            type: personControl
            // type: cc.Node
        },
        functionPoint_: {
            default: null,
            type: cc.Sprite
        },
        experiencePoint_: {
            default: null,
            type: cc.Sprite
        },
        creativePoint_: {
            default: null,
            type: cc.Sprite
        },
        performancePoint_: {
            default: null,
            type: cc.Sprite
        },
        totalPoint_: {
            default: null,
            type: cc.Sprite
        },
        person1_: {
            default: null,
            type: cc.Node
        },
        person2_: {
            default: null,
            type: cc.Node
        },
        person3_: {
            default: null,
            type: cc.Node
        },
        person4_: {
            default: null,
            type: cc.Node
        },
        bubble1_: {
            default: null,
            type: cc.Node
        },
        bubble2_: {
            default: null,
            type: cc.Node
        },
        bubble3_: {
            default: null,
            type: cc.Node
        },
        bubble4_: {
            default: null,
            type: cc.Node
        },
        developProcess_: {
            default: null,
            type: cc.Node
        },
        testProcess_: {
            default: null,
            type: cc.Node
        },
        lowBugLabel_: {
            default: null,
            type: cc.Label
        },
        midiumBugLabel_: {
            default: null,
            type: cc.Label
        },
        highBugLabel_: {
            default: null,
            type: cc.Label
        },
        allBugLabel_: {
            default: null,
            type: cc.Label
        },
        lastMouth1_: "",
        lastMouth2_: "",
        lastMouth3_: "",
        lastMouth4_: "",
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
        // click event
        this.leftBtn.node.on(cc.Node.EventType.TOUCH_START, this.leftStart, this)
        this.leftBtn.node.on(cc.Node.EventType.TOUCH_END, this.leftEnd, this)
        this.rightBtn.node.on(cc.Node.EventType.TOUCH_START, this.rightStart, this)
        this.rightBtn.node.on(cc.Node.EventType.TOUCH_END, this.rightEnd, this)

        this.person1_.active = false
        this.person2_.active = false
        this.person3_.active = false
        this.person4_.active = false


        // 每隔1秒刷新一次聊天室
        this.schedule(this.fresh, 1);

        cc.log("dialogue initial")
        // fake data
        /*this.currentProjectGroup_ = new (projectgroup)
        this.currentProjectGroup_.project_ = new (project)
        this.currentProjectGroup_.project_.name_ = "fake project"
        this.projectGroups_.push(this.currentProjectGroup_)
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
        this.currentProjectGroup_.persons_[3].name_ = "流氓丁"*/
    },

    // 刷新对话框
    fresh: function () {
        this.updateProjectGroups(this.personControl_.getAllGroups());

        if (this.currentProjectGroup_ != undefined) {
            this.projectTitle.string = this.currentProjectGroup_.project_.name_
            this.projectIndex.string = (this.projectGroups_.indexOf(this.currentProjectGroup_) + 1) + "/" + this.projectGroups_.length

            this.functionPoint_.fillRange = this.currentProjectGroup_.project_.currentFunction_ / this.currentProjectGroup_.project_.requireFunction_
            this.experiencePoint_.fillRange = this.currentProjectGroup_.project_.currentEntertainment_ / this.currentProjectGroup_.project_.requireEntertainment_
            this.creativePoint_.fillRange = this.currentProjectGroup_.project_.currentInnovation_ / this.currentProjectGroup_.project_.requireInnovation_
            console.log(this.currentProjectGroup_.project_.currentInnovation_);
            console.log(this.currentProjectGroup_.project_.requireInnovation_);
            console.log(this.creativePoint_.fillRange);
            this.performancePoint_.fillRange = this.currentProjectGroup_.project_.currentPerformance_ / this.currentProjectGroup_.project_.requirePerformance_
            this.totalPoint_.fillRange = this.functionPoint_.fillRange
            console.log(this.functionPoint_.fillRange);

            if (this.currentProjectGroup_.persons_[0] != undefined) {
                // 更新上次说的话的记录
                this.lastMouth1_ = this.Label1.string

                this.person1_.active = true
                this.bubble1_.active = true
                this.Label1.string = this.currentProjectGroup_.persons_[0].month_
                console.log(this.currentProjectGroup_.persons_[0].month_);
                this.loadAvatar(this.currentProjectGroup_.persons_[0].index_, this.currentProjectGroup_.persons_[0].name_, this.avatar1)
            } else {
                this.Label1.string = ""
                this.bubble1_.active = false
                this.person1_.active = false
            }
            if (this.currentProjectGroup_.persons_[1] != undefined) {
                this.lastMouth2_ = this.Label2.string
                this.person2_.active = true
                this.bubble2_.active = true
                this.Label2.string = this.currentProjectGroup_.persons_[1].month_
                console.log(this.currentProjectGroup_.persons_[1].month_);
                this.loadAvatar(this.currentProjectGroup_.persons_[1].index_, this.currentProjectGroup_.persons_[1].name_, this.avatar2)
            } else {
                this.person2_.active = false
                this.bubble2_.active = false
                this.Label2.string = ""
            }
            if (this.currentProjectGroup_.persons_[2] != undefined) {
                this.lastMouth3_ = this.Label3.string
                this.person3_.active = true
                this.bubble3_.active = true
                this.Label3.string = this.currentProjectGroup_.persons_[2].month_
                this.loadAvatar(this.currentProjectGroup_.persons_[2].index_, this.currentProjectGroup_.persons_[2].name_, this.avatar3)
            } else {
                this.bubble3_.active = false
                this.person3_.active = false
                this.Label3.string = ""
            }
            if (this.currentProjectGroup_.persons_[3] != undefined) {
                this.lastMouth4_ = this.Label4.string
                this.bubble4_.active = true
                this.person4_.active = true
                this.Label4.string = this.currentProjectGroup_.persons_[3].month_
                this.loadAvatar(this.currentProjectGroup_.persons_[3].index_, this.currentProjectGroup_.persons_[3].name_, this.avatar4)
            } else {
                this.bubble4_.active = false
                this.person4_.active = false
                this.Label4.string = ""
            }
            // 如果说的话不变
            if (this.lastMouth1_ === this.Label1.string) {
                this.Label1.string = ""
            }
            if (this.lastMouth2_ === this.Label2.string) {
                this.Label2.string = ""
            }
            if (this.lastMouth3_ === this.Label3.string) {
                this.Label3.string = ""
            }
            if (this.lastMouth4_ === this.Label4.string) {
                this.Label4.string = ""
            }
            if (this.Label1.string === "") {
                this.bubble1_.active = false
            }
            if (this.Label2.string === "") {
                this.bubble2_.active = false
            }
            if (this.Label3.string === "") {
                this.bubble3_.active = false
            }
            if (this.Label4.string === "") {
                this.bubble4_.active = false
            }

            if (this.currentProjectGroup_.state_ == 0) {
                this.functionPoint_.fillRange = this.currentProjectGroup_.project_.currentFunction_ / this.currentProjectGroup_.project_.requireFunction_
                this.experiencePoint_.fillRange = this.currentProjectGroup_.project_.currentEntertainment_ / this.currentProjectGroup_.project_.requireEntertainment_
                this.creativePoint_.fillRange = this.currentProjectGroup_.project_.currentInnovation_ / this.currentProjectGroup_.project_.requireInnovation_
                this.performancePoint_.fillRange = this.currentProjectGroup_.project_.currentPerformance_ / this.currentProjectGroup_.project_.requirePerformance_
                this.totalPoint_.fillRange = this.functionPoint_.fillRange
                this.developProcess_.active = true
                this.testProcess_.active = false
            } else if (this.currentProjectGroup_.state_ == 1 || this.currentProjectGroup_.state_ == 2) {
                this.developProcess_.active = false
                this.testProcess_.active = true
                this.lowBugLabel_.string = "低级bug：" + this.currentProjectGroup_.project_.bugnum_[1]
                this.midiumBugLabel_.string = "中级bug：" + this.currentProjectGroup_.project_.bugnum_[3]
                this.highBugLabel_.string = "高级bug：" + this.currentProjectGroup_.project_.bugnum_[5]
                this.allBugLabel_.string = "总的bug：" + this.currentProjectGroup_.project_.bugnum_[1] + his.currentProjectGroup_.project_.bugnum_[3] + this.currentProjectGroup_.project_.bugnum_[5]
            } else {
                //alert("project state_ is 3, panic")
            }
        } else {
            // 当空项目时，清空聊天面板
            this.person1_.active = false
            this.person2_.active = false
            this.person3_.active = false
            this.person4_.active = false
        }
    },

    // 更新项目组接口
    updateProjectGroups: function (groups) {
        // cc.log("Project groups update to " + groups)
        this.projectGroups_ = groups
        if (this.projectGroups_.length > 0) {
            if (this.projectGroups_.indexOf(this.currentProjectGroup_) === -1) {
                // 默认为第一个项目组
                this.currentProjectGroup_ = this.projectGroups_[0]
            } else {
                // 保留原来的当前项目组
            }
        }
    },

    // 切换到前一个项目组
    leftStart: function () {
        cc.log("left project start")
        this.loadSprite(this.leftBtn, "Image/前景_按钮面板_按下-04")
        this.currentProjectGroup_ = this.projectGroups_[(this.projectGroups_.indexOf(this.currentProjectGroup_) - 1 + this.projectGroups_.length) % this.projectGroups_.length]
    },
    leftEnd: function () {
        cc.log("left project end")
        this.loadSprite(this.leftBtn, "Image/前景_按钮面板")
    },
    // 切换到后一个项目组
    rightStart: function () {
        cc.log("right project start")
        this.loadSprite(this.rightBtn, "Image/前景_按钮面板_按下-04")
        this.currentProjectGroup_ = this.projectGroups_[(this.projectGroups_.indexOf(this.currentProjectGroup_) + 1) % this.projectGroups_.length]
    },
    rightEnd: function () {
        cc.log("right project end")
        this.loadSprite(this.rightBtn, "Image/前景_按钮面板")
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
        cc.loader.loadRes("avatars/" + index + "_" + name, cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                console.log("loadAvatar error: " + name + err)
                //cc.error(err.message || err);
                return;
            }
            avatar.spriteFrame = spriteFrame;
        });
    },
    // 更换图片: obj要改的对象，target目标素材的路径
    loadSprite: function (obj, target) {
        // 加载 SpriteFrame
        cc.loader.loadRes(target, cc.SpriteFrame, function (err, spriteFrame) {
            if (err) {
                console.log("loadSprite error: " + target + err)
                //cc.error(err.message || err);
                return;
            }
            obj.spriteFrame = spriteFrame;
        });
    }
});
