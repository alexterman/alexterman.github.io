


function getData(type) {
    var json = null;
        $.ajax({
            'async': false,
            'global': false,
            'url': "./"+ type + ".json",
            'dataType': "json",
            'success': function (data) {
                json = data;
            }
        });
        return json;
}

