var eState=cc.Enum({
    working : 0,
    free : 1,
    relaxing : 2

});
cc.Class({
    extends: cc.Component,

    properties: {
        /**能力值 */
        ability_            : 0,
	ability_coding_     : 0,
	ability_management_ : 0,
	ability_structure_  : 0,
	ability_test_       : 0,
	ability_art_        : 0,
	ability_creativity_ : 0,
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
    },

    // use this for initialization
    onLoad: function () {

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
        let info = "能力："+this.ability_ + "工资："+this.salary_;    // 具体信息输出方式由UI来定
        cc.log(info);
        return info;
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
