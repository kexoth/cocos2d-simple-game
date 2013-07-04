"use strict";

//var start = +new Date();

//var lang = ["Ruby", "ObjectiveC", "JavaScript", "Lua", "C"];
//var table = {Ruby:0, ObjectiveC:0, JavaScript:0, Lua:0, C:0};
//var weight = [0.15, 0.2, 0.4, 0.2, 0.05];

var generateWeighedList = function (list, weight) {
    var weighedList = [];

    for (var i = 0; i < weight.length; i++) {
        var multiplies = weight[i] * 100;

        for (var j = 0; j < multiplies; j++) {
            weighedList.push(list[i]);
        }
    }
    return weighedList;
};

var rand = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var randFloat = function (min, max) {
    return Math.random() * (max - min) - min;
};


var getBiasedRandomItem = function (list, weight) {

    var total_weight = weight.reduce(function (previous, current, i, array) {
        return previous + current;
    });

    var random_index = randFloat(0, total_weight);
    var weight_sum = 0;

    for (var i = 0; i < list.length; i++) {
        weight_sum += weight[i];
        weight_sum = parseFloat(weight_sum.toFixed(2));

        if (random_index <= weight_sum) {
            return list[i];
        }
    }
};


//var random_num, item;

//for (var i = 0; i < 10000; i++) {
//    random_num = randFloat(0, weighed_list.length-1);
//    item = weighed_list[random_num];
//    ++random_check[item];
//}


//for (var i = 0; i < 1000000000; i++) {
//    var randomItem = getBiasedRandomItem(lang, weight);
//    table[randomItem]++;
//    console.log(randomItem + ": " + table[randomItem]);
//}
//
//console.log(table);

//var end = +new Date();
//var seconds = ((end - start) / 1000).toFixed(2);
//console.log("Finished in " + seconds + "seconds.");
