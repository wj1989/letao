// 等dom加载完成再执行里面的代码
// 把里面遍历包装在这个函数 把变量变成局部变量
$(function () {
    addHistory();
    queryHistory();
    deleteHistory();
    clearHistory();
    // 初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    // 添加记录的函数
    function addHistory() {
        /* 添加记录的思路
            1. 数据存在localStorage 里面 需要永久存储除非你手动删掉
            2. 点击搜索的时候获取输入关键字
            3. 把这个关键加到本地存储localStorage
            4. 以数组的方式添加（可能会有很多记录） */
        // 1. 获取搜索的按钮添加点击事件
        $('.btn-search').on('tap', function () {
            // 2. 获取当前的搜索记录 获取当前输入输入的文字通过val方法 空格要排除掉 空格不合法的输入
            var search = $('.input-search').val().trim();
            // 3. 做非空判断 
            if (search == '') {
                // 如果不输入直接return什么都不做
                return;
            }
            // 4. 如果输入了就要把当前记录添加到本地存储的里面 
            // 4.1 使用数组的方式添加 创建一个数组 第一次是空 第二次就是之前已经存储的数组
            // 4.2 把当搜索的search添加到这个数组里面
            // 4.3 进行数组的去重 存在重复要去掉 再往前面添加新的值
            // 4.4 把整个数组存储到 localStorage中 （但是本地存储只能存储字符串 把数组转成字符串再存进去）
            // 5. 获取之前本地存储的值 判断当前本地存储是否已经有数据 有数据使用之前存储的数组 如果没有数据使用空数组
            var arr = localStorage.getItem('searchHistory');
            console.log(arr);
            // 5.1 判断当前本地存储中有没有数据 == null 表示没有数据
            if (arr == null) {
                // 5.2 只需要把arr赋值为空数组
                arr = [];
            } else {
                // 5.3 如果之前有数据 把字符串转成数组
                arr = JSON.parse(arr);
            }
            console.log(arr);
            // // 4.1 创建一个空数组
            // var arr = [];
            // // 数组之前有重复调用一个去重函数把数组先进行去重
            arr = uniq(arr);
            // 4.2 判断当前的值是否在数组中存在
            for (var i = 0; i < arr.length; i++) {
                console.log(i);
                // 判断当前数组的值 和 搜索的值一致
                if (arr[i] == search) {
                    // 把当前arr[i] 从 arr数组给删掉
                    // splice函数是把数组中的中删掉（因为这个值重复的我要删掉） 第一个参数是要删除元素的索引 第二个参数是删除的个数
                    arr.splice(i, 1);
                    // 如果数组中值删掉一个 循环就会少一次 i-- i变小了循环还会继续
                    i--;
                }
            }
            // 4.3 把新输入的值加到arr里面 往后加就是push 往前就是unshift
            arr.unshift(search);
            console.log(arr);
            // 4.4 把arr数组存储到 localStorage中 转成字符串再存储进去
            // console.log(JSON.stringify(arr));
            // localStorage.setItem 本地存储的存值方法 第一个参数指定存储的键 第二个参数存储的值
            localStorage.setItem('searchHistory', JSON.stringify(arr));

            // 6. 搜索完成后清空输入框 
            $('.input-search').val('');
            // 7. 添加完成调用一下查询添加完成马上查询渲染列表
            queryHistory();
        });
    }

    function uniq(array) {
        var temp = []; //一个新的临时数组
        for (var i = 0; i < array.length; i++) {
            if (temp.indexOf(array[i]) == -1) {
                temp.push(array[i]);
            }
        }
        return temp;
    }

    // 查询记录的函数
    function queryHistory() {
        // 1. 把之前数据取出来 
        // 2. 判断当前本地存储是否已经有数据 有数据使用之前存储的数组 如果没有数据使用空数组
        var arr = localStorage.getItem('searchHistory');
        console.log(arr);
        // 2.1 判断当前本地存储中有没有数据 == null 表示没有数据
        if (arr == null) {
            // 2.2 只需要把arr赋值为空数组
            arr = [];
        } else {
            // 2.3 如果之前有数据 把字符串转成数组
            arr = JSON.parse(arr);
        }
        console.log(arr);
        // 3. 再使用模板引擎渲染到页面上 因为现在的arr是一个数组 模板引擎要求对象 一定包装到对象里面
        var html = template('historyTpl', {
            rows: arr
        });
        // 4. 把模板渲染到ul里面
        $('.search-history ul').html(html);
    }
    // 删除记录的函数
    function deleteHistory() {

    }
    // 清空记录的函数
    function clearHistory() {

    }
});