cc.Class({
    extends: cc.Component,

    properties: {
        btn_contract:{
            default:null,
            type:cc.Button
        },
        btn_develop:{
            default:null,
            type:cc.Button
        }
    },

    // use this for initialization
    onLoad: function () {
        this.hide();
        this.node.on(cc.Node.EventType.TOUCH_START, this.show, this);
        this.node.emit();
    },
    
    hide:function(){
        this.btn_contract.node.x = -10000;
        this.btn_develop.node.x = -10000;
    },
    show: function(){
        this.btn_contract.node.x = 100;
        this.btn_develop.node.x = 100;
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
