// 主要功能是显示日期
// 附加在 Game 场景 Canvas/Calendar
// TODO: getDate() 返回一个表示经历天数

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
        labelDate: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var day = this.getDate()
        var date = this.getYearMonthWeek(day)
        var year = date.year
        var month = date.month
        var week = date.week
        this.labelDate.string = year + '年 ' + month + '月\n' + '第 ' + week + ' 周'
        //console.log(year+','+month)
    },

    isLeapYear: function (yr) {
        return (yr % 400 == 0) || ((yr % 100 != 0) && (yr % 4 == 0))
    },

    getYearMonthWeek: function(day) {
        var month_day_count = [31, 28, 31,
            30, 31, 30,
            31, 31, 30,
            31, 30, 31]
        var yr_count = 0 
        var day2yr_tg = NaN;
        var day2month_tg_idx = 0;
        var d_year = 0
        var d_month = 0
        var week_count = 0
        for (var d = 0; d < day; d++) {
            if (this.isLeapYear(yr_count)) {
                day2yr_tg = 366
                month_day_count[1] = 29
            } else {
                day2yr_tg = 365
                month_day_count[1] = 28
            }
            d_year++
            d_month++
            if ((d_year % day2yr_tg) == 0) {
                yr_count++
                d_year = 0
            }
            if (d % 7 == 0) {
                week_count++
            }
            if ((d_month % month_day_count[day2month_tg_idx]) == 0) {
                day2month_tg_idx = (day2month_tg_idx + 1) % 12
                d_month = 0
                week_count = 1
            }
        }
        return { year: yr_count, month: day2month_tg_idx+1, week: week_count }
    },

    getDate: function() {
        // TODO: 和后端连接，返回天数
        var date = 366
        console.log(date+1)
        return date
    },

});
