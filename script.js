var apikey = '504a48f5025c2baf86463d37a4f71a29'; 
var userSearch;

function searchCallback(results) {
    $(".searchResults").empty();
    var count = 0;
    var cell = '';
    for (var i = 0; i < results.length; i++){
        var wine = results[i];
            cell += '<div class="col-md-2"><h3>'  + wine.Products.name + '</h3><p>URL: ' + wine.Products.url + '</div>';
            count++
            if (count == 6){
                $(".searchResults").append('<div class="row">' + cell + '</div>');
                count = 0;
                cell = '';
            }
        };
    }


$(document).ready(function() {
    $(".btn").on("click", function(){
        userSearch = $("#search").val();
        search(userSearch);
        console.log(userSearch);
    })

});


function search(query){

    $.ajax ({
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'json_callback',
        url: 'http://services.wine.com/api/beta2/service.svc/json/catalog?search=' + encodeURI(query) + '&apikey=' + apikey,
        complete: function(){
            console.log('ajax complete');
        },
        success: function(data){
            searchCallback(data.results);
        }
    });

}