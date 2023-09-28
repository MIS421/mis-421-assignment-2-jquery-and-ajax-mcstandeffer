var len;
var results = '';

function apiSearch() {
  var params = {
    "q": $("#query").val(),
    "count": "50",
    "offset": "0",
    "mkt": "en-us"
  };

  $.ajax({
      url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
      beforeSend: function (xhrObj) {
          xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "e21d28a6c2ec4205b9452afc068d16ab");
      },
      type: "GET",
    })
    .done(function (data) {
      len = data.webPages.value.length;
      for (i = 0; i < len; i++) {
        results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
      }

      $('#searchResults').html(results);
      $('#searchResults').dialog();
    })
    .fail(function () {
      alert("error");
    });
}


$(function () {
    $("#searchButton").button();
    $("#timeButton").button();
    $("#query").button();
    $("#luckyButton").button();
});


function onSearchButtonClick() {
    apiSearch();
}

$(document).ready(function () {
    $("#searchButton").on("click", onSearchButtonClick);
});

function changeImage() {
    var newImage = "https://media.istockphoto.com/id/1368265555/photo/vortex-split-view-of-blue-ocean-waters-surface.webp?b=1&s=170667a&w=0&k=20&c=skudbEb7U9DwcIacPEHHsWQvmZYebkuFPdWARA3uJWU="; 
    document.body.style.backgroundImage = "url('" + newImage + "')";
    var header = document.getElementById("myHeader");
    header.textContent = "Diverge the Sea";

    setTimeout(function () {
        var secondNewImage = "https://images.unsplash.com/photo-1565138146061-e29b079736c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YW1hem9uJTIwcmFpbmZvcmVzdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60"; // URL of the second image
        document.body.style.backgroundImage = "url('" + secondNewImage + "')";
        header.textContent = "Explore Nature"; 
    }, 5000); 
}

document.getElementById("myHeader").addEventListener("click", changeImage);


function getCurrentTime() {
    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0'); 
    var minutes = now.getMinutes().toString().padStart(2, '0'); 
    return hours + ':' + minutes;
}

function displayTimeDialog() {
    var currentTime = getCurrentTime();
    var message = "The time is " + currentTime;
    $('#time').text(message); 
    $('#time').dialog(); 
}


$('#timeButton').on('click', displayTimeDialog);


/*function luckyButtonAction() {
    var query = $("#query").val();
    apiSearch(query, function (data) {
        if (data.webPages.value.length > 0) {
            var firstResult = data.webPages.value[0];
            window.location.href = firstResult.url; 
        } else {
            alert("No results found.");
        }
    });
}

$("#luckyButton").on("click", luckyButtonAction);*/

