var SampleJSONData = [
    {
        id: 1,
        title: 'الاعدادت'
    }, 
    {
        id: 2,
        title: 'الواجهة الرائيسية'
    }
    , 
    {
        id: 3,
        title: 'اضافة برنامج'
    }
];

var comboTree1

jQuery(document).ready(function ($) {

    comboTree1 = $('#justAnInputBox').comboTree({
        source: SampleJSONData,
        isMultiple: true,
        cascadeSelect: false,
        collapse: true,
        selectableLastNode: true,
        withSelectAll: true
    });

});
jQuery(document).ready(function ($) {

    comboTree1 = $('#justAnInputBox2').comboTree({
        source: SampleJSONData,
        isMultiple: true,
        cascadeSelect: false,
        collapse: true,
        selectableLastNode: true,
        withSelectAll: true
    });

});
