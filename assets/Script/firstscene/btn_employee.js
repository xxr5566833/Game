cc.Class({
    extends: cc.Component,

    properties: {
        btn_hire:{
            default:null,
            type:cc.Button
        },
        btn_train:{
            default:null,
            type:cc.Button
        },btn_fire:{
            default:null,
            type:cc.Button
        }
    },

    // use this for initialization
    onLoad: function () {
        this.hide();
        this.node.on(cc.Node.EventType.TOUCH_START, this.show, this);
    },

    hide:function(){
        this.btn_hire.node.x = -10000;
        this.btn_train.node.x = -10000;
        this.btn_fire.node.x = -10000;
    },
    show: function(){
        this.btn_hire.node.x = 100;
        this.btn_train.node.x = 100;
        this. btn_fire.node.x = 100;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
