var eState=cc.Enum({
    working : 0,
    free : 1,
    relaxing : 2

});
cc.Class({
    extends: cc.Component,

    properties: {
        /**能力值 */
        abilityArt_:0,
        abilityManage_:0,
        abilityCoding_:0,
        maxArt_:0,
        maxManage_:0,
        maxCoding_:0,
        hp_:0,
        level_:0,
        grade_:0,
        /*状态，用枚举表示，定义在上面 */
        state_:{
            default:eState.free,
            type:eState,
        },
        /**工资 */
        salary_:0,
        /**公司 */
        company:{
            default:null,
            type:cc.Node
        },
        /**正在开发的项目 */
        project_:{
            default:null,
            type:cc.Prefab,
        },
        employMoney_:0,
        name_:"",
        profession_:"",
        index:0,
    },

    // use this for initialization
    onLoad: function () {

    },
    init:function(person){
        this.abilityArt_=person.abilityArt;
        this.abilityCoding=person.abilityCoding;
        this.abilityManage_=person.abilityManage;
        this.maxArt_=person.maxArt;
        this.maxCoding_=person.maxCoding;
        this.maxManage_=person.maxManage;
        this.hp_=person.hp;
        this.level_=person.level;
        this.grade_=person.grade;
        this.salary_=person.salary;
        this.employMoney_=person.employMoney;
        this.name_=person.name;
        this.profession_=person.profession;
        this.index_=person.index;
    },
    getCommit:function(){
        /*获得开发点数,这里就先return 1*/

        return 1;
    },

    commit:function(){
        /**贡献开发点数到当前project */
        cc.log("贡献了1点");
        this.project_.augment('ui',this.getCommit());
        this.project_.augment('func',this.getCommit());
    },
    work:function(proj){
        /**开始工作 */
        this.project_=proj;
        this.state_=eState.working;
        cc.log("开始工作");
    },
    stop: function(){
        /**停止工作 */
        this.state_=eState.free;
        cc.log("停止工作");
    },
    show:function(){
        /**展示信息 */
        return this;
    },
    setSalary:function(salary){
        this.salary_=salary;
    },
    getSalary:function(){
        return this.salary_;
    },
    getEmployMoney:function(){
        return this.employMoney_;
    },
    setEmployMoney:function(money){
        this.employMoney_=money;
    },
    setAbility:function(ability){
        this.abilityArt_=ability.art;
        this.abilityCoding_=ability.coding;
        this.abilityManage_=ability.manage;
    },
    getAbility:function(){
        var ability=new Object();
        ability.art=this.abilityArt_;
        ability.manage=this.abilityManage_;
        ability.coding=this.abilityCoding_;
        return ability;
    },
    setName:function(name){
        this.name_=name;
    },
    getName:function(){
        return this.name_;
    },
    setProfession:function(profession){
        this.profession_=profession;
    },
    getProfession:function(){
        return this.profession_;
    },
    update:function(dt){
        /**不同状态输出不同信息 */
        switch(this.eState){
            case eState.free:
            cc.log('free状态');
            break;
            case eState.working:
            cc.log("正在工作");
        }
    }
});
