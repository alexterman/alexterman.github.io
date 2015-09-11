function index2() {
    var _family, _housing;
    main();

    function main() {
        getData(main2);
    }
    function main2() {
        var list = _family.concat(_housing);
        console.log(list);
        $("#main").find(".CompareItem").zip(list).forEach$(renderCompareItem);
    }

    function renderCompareItem(el) {
        var obj = el.dataItem();
        var headerDiv = el.getAppend(".Header");
        headerDiv.getAppend("h1.category").text(obj.category);
        headerDiv.getAppend("h2.subCategory").text(obj.subCategory);
        headerDiv.getAppend(".notes.small").text(obj.notes);
        headerDiv.getAppend(".comparableValue").text(obj.comparableValue);
        var compareDiv = el.getAppend(".Compare.row");
        compareDiv.getAppend(".placeA.col-md-6").text(obj.placeA);
        compareDiv.getAppend(".placeB.col-md-6").text(obj.placeB);
        compareDiv.getAppend(".valueA.col-md-6").text(obj.valueA);
        compareDiv.getAppend(".valueB.col-md-6").text(obj.valueB);
        compareDiv.getAppend(".valueAType.col-md-6").text(obj.valueAType);
        compareDiv.getAppend(".valueBType.col-md-6").text(obj.valueBType);
    }

    function getData(cb) {
        $.getJSON("family.json", function (res) {
            _family = res.nodes;
            $.getJSON("housing.json", function (res) {
                _housing = res.nodes;
                cb();
            });
        });
    }

}