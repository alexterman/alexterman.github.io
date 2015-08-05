
function main(){
  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var target = $(e.target).attr("href") // activated tab
    $(target).text(new Date());
  });
}

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

