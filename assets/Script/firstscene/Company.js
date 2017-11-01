var projectstate=require('global').projectState;
var date=require('global').date;
cc.Class({
    extends: cc.Component,

    properties: {
        account_:{
            default:null,
            type:cc.Node,
        },
        personControl_:{
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
        this.project_=project 
        this.project_.setState(projectstate.received);
        var date=cc.find('Date').getComponent('Date');
        this.project_.setReceiveDay(date.getDate());
        console.log("personcontrol 开始接受");
        this.personControl_.getComponent('PersonControl').work(project);
    },

    profit:function(num,cause){
        this.account_.getComponent('Account').profit(num,cause);
    },

    expend:function(num,cause){
        this.account_.getComponent('Account').expend(num,cause);
    },

    hire:function(person){
        var pc=this.personControl_.getComponent('PersonControl');
        var ac=this.account_.getComponent('Account');
        if(pc.canHire(person)){
            if(ac.isEnough(person.getEmployMoney())){
                ac.expend(person.getEmployMoney(), '雇人费用');
                pc.hire(person);
                return true;
            }
        }else{
            return false;
        }
    },

    fire:function(person){
        this.personControl_.getComponent('PersonControl').fire(person);
    },

    showPersons:function(){
        cc.find("Company/PersonControl").getComponent("PersonControl").showPersons();
    },
});
