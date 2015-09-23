"use strict"
function index(){

    main();

    var _data;
    var _currentTabEl;

    function main(){
      
        _currentTabEl = $("#family");

        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var target = $(e.target).attr("href") // activated tab
            _currentTabEl = target;
            getDataAndRender();
        });


        $("#salaryA, #salaryB").on("change", render);

        getDataAndRender();
    }

    function getDataAndRender(){
        var type = _currentTabEl.attr("id");
        getData(type).success(function(x){
            _data = x;
            render();
        });
    }

    function render(){
        renderCurrentTab();
    }


    function getData(type) {
    	var resource = type;
        return $.ajax({
            'global': false,
            'url': "./"+ resource + ".json",
            'dataType': "json",
        });
    }


    function calculateRelativeValue(amount, salary){
    	return ((amount * 100)/salary).toPrecision(4) + " %" ;
    }



    function renderCurrentTab (){
        var json = _data;

    			// "category": "house rent",
    			// "subCategory": "Apartment for family with 3 kids",
    			// "comparableValue": "price",
    			// "placeA" : "TLV",
    			// "valueA" : 6000,
    			// "valueAType": "NIS",
    			
    			// "placeB": "AMS",
    			// "valueB": 1550,
    			// "valueBType": "EUR",

    			// "notes": "In NL it costs 40% of monthly salary, in IL it costs 30% of monthly salary (NL salary 3900, IL salary 20000)"

    	var mainDiv = $("<div class='container'>");

        var salaryA = parseFloat($("#salaryA").val()) || 20000;
        var salaryB = parseFloat($("#salaryB").val()) || 3900;

    	$.each( json.nodes, function( index, dataRow ){
        	
        	var comparationViewDiv = $("<div class='row'>");
        	var placesDiv = $("<div class='panel'>");
        	var valueDiv = $("<div class='panel'>");
        	var compareResultsDiv = $("<div class='panel'>");

        	$(comparationViewDiv).text(dataRow.category + " / "+ dataRow.subCategory);
        	$(placesDiv).text(dataRow.placeA + " " + dataRow.valueAType + " - VS - "+ dataRow.placeB + " " + dataRow.valueBType);
        	$(valueDiv).text(dataRow.valueA + " - :: - "+ dataRow.valueB);
        	if(dataRow.comparableValue == "price"){
        		$(compareResultsDiv).text(calculateRelativeValue(dataRow.valueA, salaryA) 
                    + " - V.S. - "+ calculateRelativeValue(dataRow.valueB, salaryB ) + " (% of the monthly salary)");

        	}else{
        		$(compareResultsDiv).text(dataRow.notes);
        	}
    	    
    	    $(mainDiv).append($(comparationViewDiv).append($(placesDiv).append($(valueDiv).append($(compareResultsDiv)))));
        });
        _currentTabEl.empty().append(mainDiv);
        return mainDiv;
    }



}