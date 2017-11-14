var projectstate=require('global').projectState;
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
        project_:{
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
        this.project_=project ;
        this.project_.setState(projectstate.received);
        var date=cc.find('Date').getComponent('Date');
        this.project_.setReceiveDay(date.getDate());
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
                ac.expend(person.getEmployMoney(), '雇人费用');
                pc.hire(person);
                return true;
        }else{
            //console.log('pc cannot hire');
            return false;
        }
    },

    fire:function(index){
        //console.log('company fire'+index);
        return this.personControl_.getComponent('PersonControl').fire(index);
    },

    showPersons:function(){
        this.personControl_.getComponent('PersonControl').showPersons();
    },
});
