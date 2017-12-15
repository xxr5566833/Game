// 显示当前资产等信息的用户接口
// 附加在 Game 场景：Canvas/GoldBar
// TODO for scripters: 完成 getGold(), 返回当前公司资产 (number)

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
        labelGold: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function() {
        this.THOUSAND = 1000
        this.MILLION = 1000000
        this.BILLION = 1000000000
    },

    update: function() {
        var gold_num = Math.floor(this.getGold());
        // visualize in 3-digit-grouped comma splitted style 
        var tail = ""
        if (gold_num >= this.BILLION) {
            gold_num = Math.floor(gold_num/this.MILLION)
            tail = "m"
        } else if (gold_num >= this.MILLION) {
            gold_num = Math.floor(gold_num/this.THOUSAND)
            tail = "k"
        } 
        var gold_str = gold_num.toString()
        gold_str = this.addCommas(gold_str) + tail

        this.labelGold.string = gold_str
    },

    getGold: function() {
        // TODO: 返回当前公司的资产，number
        event = new cc.Event.EventCustom("GETMONEY",true);  
        this.node.dispatchEvent(event);
        return event.back;
    },

    addCommas: function (nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
