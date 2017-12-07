var eState = cc.Enum({
    working: 0,
    free: 1,
    relaxing: 2
});
var Character = cc.Enum({
    // B
    imageKing: 0,
    blabla: 1,
    slience: 2,
    funny: 3,
    calm: 4,
    optimist: 5,
    serious: 6,
    ambition: 7,
    unyieelding: 8,
    thoughtful: 9,
    keen: 10,
    persistent: 11,
    // A
    steady: 100,
    bigOptimist: 101,
    hardWork: 102,
    bigAmnition: 103,
    adversity: 104,
    adjuvant: 105,
    ghost: 106,
    genius: 107,
    // S
    insight: 200,
    storming: 201,
    spirituality: 202
});
var Image = cc.Enum({
    image0: 0,
    image1: 1
});
var Sticker = cc.Enum({
    sticker0: 0,
    sticker1: 1
});
var Saying = cc.Enum({
    ellisis: 0,
    saying1: 1
});
var Occupation = cc.Enum({
    develper: 0,
    maintainer: 1,
    marketer: 2
});
var Activity = cc.Enum({
    activity0: 0,
    activity1: 1
});
cc.Class({
    extends: cc.Component,

    properties: {
        /**能力值 */
        gift_: 0.0,
        coding_: 0.,
        science_: 0.,
        art_: 0.,
        creativity_: 0.,
        manager_: 0.,
        business_: 0.,
        /*状态，用枚举表示，定义在上面 */
        state_: {
            default: eState.free,
            type: eState,
        },
        /**工资 */
        salary_: 0.,
        employMoney_: 0.,
        name_: "",
        profession_: Occupation.develper,
        index_: 0,
        power: 10,
        modd: 10,
        coef:null
    },

    // use this for initialization
    onLoad: function () {
        this.coef = new Object();
        //这里需要把相关属性初始化为1
        coef.F=1;   // 功能 受2,6,7,8影响
        coef.P=1;   // 性能 6,8,9
        coef.E=1;   // 体验 3,31,35,36
        coef.I=1;   // 创新 32,34
        coef.CP=1;  // 暴击概率 11
        coef.CR=1;  // 暴击倍率
        coef.EM=1;  // 雇佣金 15 *
        coef.MA=1;  // 管理能力 16 *
        coef.SC=1;  // 体力消耗 17 *
    },
    updateCoef:function(coef){
        this.coef = coef;
    },
    init: function (person) {
        //初始化人物属性

    },
    develop: function (mamager, n, project) {
        var F = this.coef.F * (1 / (n ^ (50 / (manager + 50)))) * (this.coding_ / 10) * (rand(0.9, 1.1));    //功能
        var P = this.coef.P * (1 / (n ^ (50 / (manager + 50)))) * (this.science_ / 10) * (rand(0.9, 1.1));   //性能
        var E = this.coef.E * (1 / (n ^ (50 / (manager + 50)))) * (this.art_ / 10) * (rand(0.9, 1.1));       //体验
        var I = this.coef.I * (1 / (n ^ (50 / (manager + 50)))) * (this.creativity_ / 10) * (rand(0.9, 1.1)); //创意
        var criticalPro = this.coef.CP * this.creativity_ / (this.creativity_ + 200);
        var criticalRate = this.coef.CR * (1 + (5 * sqrt(this.science_)) / 100);
        if ((rand(0.0, 1.0) < criticalPro)) {
            F = F * criticalRate;
            P = P * criticalRate;
            E = E * criticalRate;
            I = I * criticalRate;
        }
        project.augment(0, F);
        project.augment(1, P);
        project.augment(2, E);
        project.augment(3, I);
    },
    begin: function () {
        /**开始工作 */
        this.state_ = eState.working;
        //("开始工作");
    },
    stop: function () {
        /**停止工作 */
        this.state_ = eState.free;
        //cc.log("停止工作");
    },
    setSalary: function (salary) {
        this.salary_ = salary;
    },
    updateCoef:function(coef)
    {
        this.coef = coef;
    },
    getSalary: function () {
        return this.salary_;
    },
    getEmployMoney: function () {
        return this.coef.EM * this.employMoney_;
    },
    setEmployMoney: function (money) {
        this.employMoney_ = money;
    },
    setAbility: function (ability) {
        this.gift_ = ability.gift_
        this.coding_ = ability.coding_
        this.science_ = ability.science_
        this.art_ = ability.art_
        this.creativity_ = ability.creativity_
        this.manager_ = ability.manager_
        this.business_ = ability.business_
    },
    getAbility: function () {
        var r = new Object();
        r.gift_ = this.gift_,
        r.coding_ = this.coding_,
        r.science_ = this.science_,
        r.art_ = this.art_,
        r.creativity_ = this.creativity_,
        r.manager_ = this.manager_,
        r.business_ = this.business_

        return r
    },
    setName: function (name) {
        this.name_ = name;
    },
    getName: function () {
        return this.name_;
    },
    setProfession: function (profession) {
        this.profession_ = profession;
    },
    getProfession: function () {
        return this.profession_;
    },
    init: function (person) {

    },
    update: function (dt) {

    },
    sendSticker(sticker) {
        cc.log(sticker)
    },
    speakSomething(saying) {
        cc.log(saying)
    },
    moodIncrement(value) {
        this.mood = (this.mood + value) % 10
    }
});
