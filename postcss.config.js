module.exports={
    'plugins':{
        'autoprefixer':{
            overrideBrowserslist:[
                'Android 4.1',
                'iOS 7.1',
                'Chrome > 31',
                'not ie <= 11', //不考虑ie游览器

            ],
            grid: true,
           
        },
        'postcss-pxtorem':{
            rootValue:75, //75表示750设计稿。37.5表示375设计稿
            unitPrecision:6,//计算结果保留6位数
            selectorBlackList:['.no-rem','no-rem'],
            propList:['*'],//感叹号开头的不转换
            replace:true, //转化为rem以后不保留原来的px单位属性
            mediaQuery:true,//可以在媒体查询中转化为px
            minPixeIValue:2,
            exclude:/node_modules/i  //排除node_modules文件（node_modules文件内禁止转换）

        }
    }
}