function Index2() {
    var _this = this;
    var _dataByCategory = {};
    var _salaryA = 20000, _salaryB = 3900;
    var _categories = ["family", "housing", "motor"];//, "health"];
    var _timeout, _isRendered;

    Object.defineProperties(_this,
        {
            _family: { get: function () { return _family; } },
            _housing: { get: function () { return _housing; } },
        });


    $(main);


    var _signs = { EUR: "€", USD: "$", NIS: "₪" };

    function main() {
        getData().then(render);
    }
    function render() {
        if (!_isRendered) {
            _isRendered = true;
            var ul = $("#main").getAppend("ul.nav.nav-tabs[role=tablist]");
            ul.find("li[role=presentation]").zip(_categories).forEach$(function (li) {
                var cat = li.dataItem();
                li.getAppend("a[data-toggle=tab]").text(cat).attr("href", "#" + cat);
            });

            $("#main").getAppend(".tab-content").find(".tab-pane").zip(_categories).forEach$(function (el) {
                var cat = el.dataItem();
                el.attr("id", cat)
            });

            $("ul.nav.nav-tabs > li").first().addClass("active");
            $(".tab-pane").first().addClass("active");


            $("#salaryA").on("input", function (e) {
                _salaryA = parseFloat(e.currentTarget.value);
                if (isNaN(_salaryA))
                    _salaryA = 20000;
                scheduleRender();
            });
            $("#salaryB").on("input", function (e) {
                _salaryB = parseFloat(e.currentTarget.value);
                if (isNaN(_salaryB))
                    _salaryB = 3900;
                scheduleRender();
            });
        }
        renderTabsContents();
    }
    function renderTabsContents() {
        _categories.forEach(function (cat) {
            var list = _dataByCategory[cat].nodes;
            var tbl = $("#" + cat).getAppend("table.Comparison");
            var trHeader = tbl.getAppend("thead").getAppend("tr");
            trHeader.getAppend("th.category").text("category");
            trHeader.getAppend("th.subCategory").text("subCategory");
            trHeader.getAppend("th.comparableValue").text("comparableValue");
            trHeader.getAppend("th.placeA").text(list[0].placeA);
            trHeader.getAppend("th.placeB").text(list[0].placeB);
            tbl.getAppend("tbody").find("tr.CompareItem").zip(list).forEach$(renderCompareItem);
        });
    }


    function scheduleRender() {
        if (_timeout != null) {
            window.clearTimeout(_timeout);
            _timeout = null;
        }
        _timeout = window.setTimeout(render, 100);
    }

    function toPct(x) {
        return (x * 100).toFixed(1) + "%";
    }

    function renderCompareItem(tr) {
        var obj = tr.dataItem();

        var s1 = obj.valueA.toLocaleString() + " " + _signs[obj.valueAType];
        var s2 = obj.valueB.toLocaleString() + " " + _signs[obj.valueBType];
        if (obj.comparableValue == "price") {
            var pct1 = toPct(obj.valueA / _salaryA);
            var pct2 = toPct(obj.valueB / _salaryB);
            s1 += " (" + pct1 + ")";
            s2 += " (" + pct2 + ")";

        }

        tr.getAppend("td.category").text(obj.category);
        tr.getAppend("td.subCategory").text(obj.subCategory);
        tr.getAppend("td.comparableValue").text(obj.comparableValue);
        tr.getAppend("td.valueA").text(s1);
        tr.getAppend("td.valueB").text(s2);
    }

    function ajax(url) {
        return $.getJSON(url);
    }
    function getData() {
        var promises = _categories.select(function (cat) {
            return $.getJSON(cat + ".json").success(function (t) { _dataByCategory[cat] = t; });
        });
        var x = $.when.apply($, promises);
        console.log(x);
        return x;
    }

}