
cc.Class({
    extends: cc.Component,

    properties: {
        account_:{
            default:null,
            type:cc.Node,
        },
        personcontrol_:{
            default:null,
            type:cc.Node,
        },
        projects_:{
            default:null,
            type:cc.Prefab,
        }
    },

    // use this for initialization
    onLoad: function () {
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    receiveProject:function(project){
        this.project_=project;
        console.log("personcontrol 开始接受");
        cc.find("Company/PersonControl").getComponent("PersonControl").work(project);
    },

    profit:function(num,cause){
        cc.find("Company/Account").getComponent("Account").profit(num,cause);
    },

    expend:function(num,cause){
        cc.find("Company/Account").getComponent("Account").expend(num,cause);
    },

    hire:function(person){
        cc.find("Company/PersonControl").getComponent("PersonControl").hire(person);
    },

    fire:function(person){
        cc.find("Company/PersonControl").getComponent("PersonControl").fire(person);
    },

    showPersons:function(){
        cc.find("Company/PersonControl").getComponent("PersonControl").showPersons();
    },
});
