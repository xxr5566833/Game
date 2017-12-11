

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
        Msgbox_:{
            type:cc.Node,
            default:null,
        },
        research_:{
            type:cc.Node,
            default:null,
        },
    },

    // use this for initialization
    onLoad: function () {
        this.msgcontrol = this.Msgbox_.getComponent("msgBoxControl");
        this.message = cc.Enum({
            protect : 0,
            maxloannum : 1,
            loansuccess : 2,
            notenoughmoney : 3,
            backfail : 4,
            backsuccess : 5,
            consignprojectfinish : 6,
            consignprojectfail : 7,
            consignprojectunlock: 8,
        });
        this.node.on("MESSAGE", function(event){
            console.log("提示信息");
            switch(event.detail.id)
            {
                case this.message.protect : 
                    this.msgcontrol.alert("FAIL", "负资产保护措施启动，仅有一次这样的机会！下一次直接游戏结束");
                    break;
                case this.message.maxloannum:
                    this.msgcontrol.alert("FAIL", "定期贷款仅仅可以贷款一次");
                    break;
                case this.message.loansuccess:
                    this.msgcontrol.alert("SUCCESS", "贷款成功！");
                    break;
                case this.message.notenoughmoney:
                    this.msgcontrol.alert("FAIL", "金钱不足！");
                    break;
                case this.message.backfail:
                    this.msgcontrol.alert("FAIL", "还款失败");
                    break;
                case this.message.backsuccess:
                    this.msgcontrol.alert("SUCCESS", "还款成功！");
                    break;
                case this.message.consignprojectfinish:
                    this.msgcontrol.alert("SUCCESS", "任务成功，信誉度提升");
                    break;
                case this.message.consignprojectfail:
                    this.msgcontrol.alert("FAIL", "任务失败，信誉度下降");
                    break;
                case this.message.consignprojectunlock:
                    this.msgcontrol.alert("SUCCESS", "解锁了新的任务");
                    break;
                default:
                    this.msgcontrol.alert(event.deatil.type, event.deatil.string);
            }
        }, this);

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

        this.node.on("GETMONEY", function(event){
            event.detail.back = this.account_.getComponent("Account").gold_;
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

        this.node.on("CANTEST", function(){
            //调用相关ui逻辑，表示要可以进入测试阶段了
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
            event.detail.back = this.personControl_.getComponent("PersonControl").hire(event.detail.person);
        }, this);

        this.node.on("FIRE", function(event){
            this.personControl_.getComponent("PersonControl").fire(event.detail.person);
        }, this);

        this.node.on("UPDATACOEF", function(event){
            this.personControl_.getComponent("PersonControl").updateCoef(event.detai.coef);
            this.account_.getComponent("Account").updateCoef(event.detail.coef);
        }, this);

        this.node.on("ADDLIMIT", function(event){
            this.personControl_.getComponent("PersonControl").addLimit();
        }, this);

        this.node.on("RECEIVEPROJ", function(event){
            //弹出选人框，返回所选的人员数组
            this.personControl_.getComponnet("PersonControl").begin(project, persons);
        }, this);

        this.node.on("ANNOUNCE", function(event){
            //弹出宣布框，表示发布招聘信息，显示酬金和参与竞争的公司等
        }, this);

        this.node.on("STEALBIDINFORMATION", function(event){
            //根据event.detail.bestprice 调用相关ui逻辑
        }, this);

        this.node.on("GETPRICE", function(event){
            //调用ui逻辑，获得玩家的出价
        }, this);

        this.node.on("TECHNOLOGYADD", function(event){
            this.research_.getComponent("Research").addS4(event.detail.technology);
        }, this);

        this.node.on("GETNAME", function(event){
            event.detail.back = this.personControl_s.getComponent("PersonControl").getName();
        }, this);

        this.node.on("addS5", function(event){
            this.research_.getComponent("Research").addS5();
        }, this);

        this.node.on("teammates-ability-is-stronger", function(event){
            var persons = event.detail.group.persons_;
            var person = event.detail.person;
            for(let i = 0 ; i < persons.length ; i++)
            {
                var tempperson = persons[i];
                if(tempperson.coding_ > person.coding_ || tempperson.science_ >
                    person.science_ || tempperson.art_ > person.art_ || tempperson.creativity_ >
                person.creativity_ || tempperson.manager_ > person.manager_)
                    return true;
            }
            return false;
        }, this);

        this.node.on("");






    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
