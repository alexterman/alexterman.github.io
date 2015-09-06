
function main(){
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var target = $(e.target).attr("href") // activated tab

    var x = getData(target);
    var comparationElement = mapJsonToCompareView(x);
    $(target).html($(comparationElement));
  });
}

function getData(type) {
	var resource = type.split("#");
    var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "./"+ resource[1] + ".json",
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
}


function calculateRelativeValue(amount, salary){
	return ((amount * 100)/salary).toPrecision(4) + " %" ;
}



function mapJsonToCompareView (json){

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

	$.each( json.nodes, function( index, dataRow ){
    	
    	var comparationViewDiv = $("<div class='row'>");
    	var placesDiv = $("<div class='panel'>");
    	var valueDiv = $("<div class='panel'>");
    	var compareResultsDiv = $("<div class='panel'>");

    	$(comparationViewDiv).text(dataRow.category + " / "+ dataRow.subCategory);
    	$(placesDiv).text(dataRow.placeA + " " + dataRow.valueAType + " - VS - "+ dataRow.placeB + " " + dataRow.valueBType);
    	$(valueDiv).text(dataRow.valueA + " - :: - "+ dataRow.valueB);
    	if(dataRow.comparableValue == "price"){
    		$(compareResultsDiv).text(calculateRelativeValue(dataRow.valueA, 20000) + " - V.S. - "+ calculateRelativeValue(dataRow.valueB, 3900) + " (% of the monthly salary)");

    	}else{
    		$(compareResultsDiv).text(dataRow.notes);
    	}
	    
	    $(mainDiv).append($(comparationViewDiv).append($(placesDiv).append($(valueDiv).append($(compareResultsDiv)))));
    });
    return mainDiv;
}

