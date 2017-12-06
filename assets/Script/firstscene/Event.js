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
        account_ :{
            type : cc.Node,
            default : null,
        },
        game_ : {
            type : cc.Node,
            default:null,
        },
        date_:{
            type:cc.Node,
            default:null,
        },
        projectGenerator_:{
            type:cc.Node,
            default:null,
        },
        personControl_:{
            type : cc.Node,
            default:null,
        },
        personGenerator_:{
            type:cc.Node,
            default:null,
        },
        bank_ : {
            type:cc.Node,
            default:null,
        },
        market_:{
            type:cc.Node,
            default:null,
        },
    },

    // use this for initialization
    onLoad: function () {

        this.node.on("GAMEOVER",function(event){
            this.game_.getComponent("Game").gameover();;
        },this);

        this.node.on("MONEYADD",function(event){
            var money = event.detail.money;
            var record = event.detail.record;
            this.account_.getComponent("Account").profit(money, record);
        },this);

        this.node.on("GETDATE", function(event){
            var date = this.date_.getComponent("Date").getDate();
            event.detail.back = date;
        }, this);

        this.node.on("MONEYCUT", function(event){
            var money = event.detail.money;
            var force = event.detail.force;
            var record = event.detail.record;
            if(force)
            {
                this.account_.getComponent("Account").expend(money, record);
                event.detail.back = true;
            }
            else{
                event.detail.back = this.account_.getComponent("Account").enougnThenExpend(money, record);
            }
        }, this);

        this.node.on("GETCREDIT", function(event){
            event.detail.back = this.personControl_.getComponent("PersonControl").getCredit();
        }, this);

        this.node.on("CREDITCHANGE", function(event){
            this.personControl_.getComponent("PersonControl").changeCredit(event.detail.change);
        }, this);

        this.node.on("TEST", function(event){
            //调用UI，表示要进入测试阶段
        }, this);

        this.node.on("PUBLISH", function(event){
            //调用UI，表示要进入发布运营阶段
        }, this);

        this.node.on("GETUSERNUM", function(event){
            event.detail.back = this.market_.getComponent("Market").updateCurrentPeople(event.detail.project);
        }, this);

        this.node.on("PROJECTSUCCESS", function(event){
            this.projectGenerator_.getComponent("ProjectGenerator").finishProject(event.detail.project);
        }, this);

        this.node.on("PROJECTFAIL", function(event){
            this.projectGenerator_.getComponent("ProjectGenerator").failProject(event.detail.project);
        }, this);

        this.node.on("HIRE", function(event){
            event.detail.back = this.personControl_.hire(event.detail.person);
        }, this);

        this.node.on("FIRE", function(event){
            this.personControl_.getComponent(event.detail.person);
        }, this);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
