// 项目进度条的脚本
// 附加在场景 Game：StatusBoard/development
// 主要功能：
//     1. 读取当前项目信息，显示其进度
//     2. 
// TODO: 
//     1. 完成 getCurrentProject()
cc.Class({
    extends: cc.Component,
    properties: {
        widthMax: 100,
        uiFraction: {
            default: null,
            type: cc.Label
        },
        funcFraction: {
            default: null,
            type: cc.Label
        },
        uiBar : {
            default: null,
            type: cc.Node
        },
        funcBar : {
            default: null,
            type: cc.Node
        },

        labelProjectName : {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        this.currentProject = null
    },

    getCurrentProject: function() {
        // TODO: 和后端连接
        return {
            content_: "蓝灯",
            currentUi_ : 20,
            currentFunc_ : 24,
            requireUi_ : 30,
            requireFunc_ : 48,            
        }
    },

    update: function() {
        // TODO for art designer: 当前没有项目的处理
        this.currentProject = this.getCurrentProject()
        if (this.currentProject) {
            this.labelProjectName.string = this.currentProject.content_

            this.uiBar.width = this.widthMax * this.currentProject.currentUi_ / this.currentProject.requireUi_
            //console.log(this.uiBar.width)
            this.funcBar.width = this.widthMax * this.currentProject.currentFunc_ / this.currentProject.requireFunc_
            this.uiFraction.string = this.currentProject.currentUi_ + "/" + this.currentProject.requireUi_
            this.funcFraction.string = this.currentProject.currentFunc_ + "/" + this.currentProject.requireFunc_
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
