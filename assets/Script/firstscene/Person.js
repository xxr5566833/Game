var eState=cc.Enum({
    working : 0,
    free : 1,
    relaxing : 2

});
cc.Class({
    extends: cc.Component,

    properties: {
        /**能力值 */
        coding_:0.,
        science_:0.,
        art_:0.,
        creativity_:0.,
        manager_:0.,
        business_:0.,
        /*状态，用枚举表示，定义在上面 */
        state_:{
            default:eState.free,
            type:eState,
        },
        /**工资 */
        salary_:0.,
        employMoney_:0.,
        name_:"",
        profession_:"",
        index_:0,
    },

    // use this for initialization
    onLoad: function () {
        
    },
    init:function(person){
        //初始化人物属性

    },
    develop:function(mamager,n,project){
        var F = (1 / (n ^ (50 / (manager + 50)))) * (this.coding_ / 10) * (rand(0.9 , 1.1));    //功能
        var P = (1 / (n ^ (50 / (manager + 50)))) * (this.science_ / 10) * (rand(0.9 , 1.1));   //性能
        var E = (1 / (n ^ (50 / (manager + 50)))) * (this.art_ / 10) * (rand(0.9 , 1.1));       //体验
        var I = (1 / (n^ (50 / (manager + 50)))) * (this.creativity_ / 10) * (rand(0.9 , 1.1)); //创意
        var criticalPro = this.creativity_/(this.creativity_+200);
        var criticalRate = 1+(5*sqrt(this.science_))/100;
        if((rand(0.0 , 1.0)<criticalPro)){
            F=F*criticalRate;
            P=P*criticalRate;
            E=E*criticalRate;
            I=I*criticalRate;
        }
        project.augment(0,F);
        project.augment(1,P);
        project.augment(2,E);
        project.augment(3,I);
    },
    begin:function(){
        /**开始工作 */
        this.state_=eState.working;
        //("开始工作");
    },
    stop: function(){
        /**停止工作 */
        this.state_=eState.free;
        //cc.log("停止工作");
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
        
    },
    getAbility:function(){
        
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
    init:function(person){

    },
    update:function(dt){
        
    },
});
