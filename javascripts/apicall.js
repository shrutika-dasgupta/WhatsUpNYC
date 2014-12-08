
// var key = "c1e1743caa6b5ead9bd761b809f4b2a6:5:70159998";
// var url = "http://api.nytimes.com/svc/community/v2/comments/random.json?api-key=c1e1743caa6b5ead9bd761b809f4b2a6:5:70159998";    
var commentMap = {};

var whichButtonClicked = 0;

function resetPageNumber() {
    var pageNum = document.getElementById("currentPageNum");

    pageNum.value = "1";
    //console.log($('#currentPageNum').val());
  }
  function nextPageNumber() {
    var pageNum = document.getElementById("currentPageNum");
    var newNum = Number(pageNum.value) + 1;
    pageNum.value = newNum;
    //console.log($('#currentPageNum').val());
  }

  function clearStatus() {
    $("#status").empty();
    $("#status").removeAttr('style');
  }

  function showStatus(text) {
    $("#status").empty();
    $("#status").show();
    $("#status").attr('style', "background:white");
    $("#status").append(text);
  }

  function disableMoreSearch() {
    $("#moreEventsButton").prop('value',"No more Events");
    $("#moreEventsButton").attr('state', "0");
  }
  function enableMoreSearch() {
    $("#moreEventsButton").prop('value',"More Events");
    $("#moreEventsButton").attr('state', "1");
  }

  function getMoreEvents() {
      var currentState = $("#moreEventsButton").attr('state');
      if(currentState == "0") {
        return;
      }
      clearStatus();

      if(whichButtonClicked == 1) {
        console.log("random");
        displayEvents();
      } else if(whichButtonClicked == 2) {
        console.log("regular search");
        searchEvents();
      }
    }

  function clearResults() {
    //console.log("clearing results");
    resetPageNumber();
    clearStatus();
    $("#where").empty();
    whichButtonClicked = 0;
  }

function processResults(data) {
      console.log(data);

      var useridList = [];

      $("#addrwhere").append('</br>');
      $("#addrwhere").append('</br>');
      document.getElementById("addrwhere").style.color = "white";
      document.getElementById("addrwhere").style.textAlign = "center";
      document.getElementById("addrwhere").style.fontWeight = "bold";

      // document.getElementById("addrwhere").style.backgroundColor = "";

      document.getElementById("addrwhere").style.fontSize="x-large";
  


      $("#where").append('');

      var num = data.results.length;
      var found = data.results.num_results;

      var offset = (($('#currentPageNum').val() - 1) * 20);

      if(offset == 0 && typeof found !== "undefined") {
        /* Announce the total results */
        $("#addrwhere").append("Found " + found + " comments for you");
      }

      for(i = 0; i<num; i++){
        $("#where").append('</br>');
        $("#where").append(" Event#"+(offset+i+1)+"  ");
        $("#where").append('<div style = "margin-left: 80%" title = "'+ data.results[i].event_name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")+ '" id = "pinDiv'+ i +'" class="pin-ctr" name = "' +data.results[i].event_detail_url +'"><ul><li id= "test'+i+'"><a href="#" id= "test'+i+'"><span class="glyphicon glyphicon-pushpin"></span></a></li></ul></div>');
          
        /*var res = (data.results.comments[i].userComments).split('/');
      var last = res[res.length-1].split(".");
      useridList.push(last[0]);*/

      
      // console.log('<div id = "starDiv'+ i +'" style="margin: 0px"><div class="star-ctr"><ul><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li></ul></div></div>')

      $("#where").append('</br>');
      $("#where").append(data.results[i].event_name);
      $("#where").append('</br>');
      $("#where").append('</br>');
      $("#where").append(data.results[i].web_description);
      $("#where").append('</br>');

      /*var aTag = document.createElement('a');
      aTag.setAttribute('href',data.results.comments[i].articleURL);
      // mydiv.appendChild(aTag);

      $("#where").append(aTag);*/
      /*$("#where").append('User: '+data.results[i].display_name);
      $("#where").append('</br>'); */     
      $("#where").append('Event url: ');
      $("#where").append('<a href="' + data.results[i].event_detail_url + '" target="_blank">' + data.results[i].event_detail_url + '</a>');

      $("#where").append('</br>');
      /*$("#where").append('Recommended by: '+data.results.recommendationCount);
      $("#where").append('</br>');*/
      $("#where").append('Where: ');
      $("#where").append('</br>');
      $("#where").append(data.results[i].venue_name);
      $("#where").append('</br>');
      $("#where").append(data.results[i].cross_street);
      $("#where").append('</br>');
      $("#where").append(data.results[i].borough);
      $("#where").append('</br>');
      $("#where").append(data.results[i].city);
      $("#where").append('</br>');
      // $("#where").append('Rate this event: ');
      $("#where").append('Rate this event: <div style="margin: 0px" title = "'+ data.results[i].event_name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"") + '"><div title = "'+ data.results[i].event_name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")+ '" id = "starDiv'+ i +'" class="star-ctr"><ul><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li></ul></div></div>');
      // $("#where").append('More comments from '+data.results.comments[i].display_name+": ");
      
      /*$("#where").append('userComments: '+data.results.comments[i].userComments);
      $("#where").append('</br>');*/
      
      // $("#where").append('<p style="cursor: pointer; color: brown;" value= "' + last[0] +'" id = "' + last[0] +'" >' + 'Click here for more comments from '+data.results.comments[i].display_name + '</p>');
      // console.log(last[0]);
      // $("#where").append('</br>');

      $("#where").append('<div class = "otherComments"></div>');

      var $me = $('#starDiv'+i);

      $bg = $me.children( 'ul' );
      $fg = $bg.clone().addClass( 'star-fg' ).css( 'width', 0 ).appendTo( $me );
      $bg.addClass( 'star-bg' );   
      }

      if (num < 20) {
      disableMoreSearch();
      } else {
        enableMoreSearch();
    }
    if(num > 0) {
      nextPageNumber();
    }
    if(num == 0) {
      showStatus("No matching results were found!");
    }

      $('.otherComments').hide();
      // document.getElementById("addrwhere").style.color = "black";
      document.getElementById("where").style.color = "black";
      // document.getElementById("where").style.backgroundColor = "#EACCFF";
      document.getElementById("where").style.backgroundImage="url('Paper_Texture.jpg')";
      document.getElementById("where").style.textAlign = "left";
      // document.getElementById("addrwhere").style.backgroundColor = "lightGray";

      document.getElementById("where").style.fontWeight = "bold";
      // document.getElementById("addrwhere").style.fontWeight = "bold";
      document.getElementById('moreEventsButton').scrollIntoView();


   var $bg, $fg, wd, cc, ini, sw, fw, userId;

   $( '.star-ctr' ).mousemove(function( e ) {
      
      // Do once, deferred since fonts might not
      // be loaded so the calcs will be wrong

      var $me = $(this);
      $bg = $me.children('.star-bg');
      $fg = $me.children('.star-fg')
      if ( !ini ) {
         ini = true;

      // How many rating elements
      cc = $bg.children().length;

      // Total width of the bar
      wd = $bg.width();

      // Width of one rating element; assumes all are the
      // same width;  Used if step > cc
      sw = $bg.children().first().outerWidth( true );

      // Width of each star (including spacing)
      fw = wd / cc;



      }

      var dt, vl, nm, nw, ns, ow;

     // Where is the mouse relative to the left
      // side of the bar?
      dt = e.pageX - $me.offset().left;
       
      // Find the per element step
      vl = nm = Math.floor( dt / fw );
      nw = $fg.children().eq( nm ).position().left;
          
      ns = Math.round( ( dt - nw ) / sw );
      ow = nw + ns * sw;

      $me.attr( 'data-value', vl+1 );
      $fg.css( 'width', Math.round( ow )+'px' );

      var data = $me.data();
      data.prev = ow;

   }).click(function(e) {

     // Where is the mouse relative to the left
      // side of the bar?
     
     userId = $(this).attr('title');
      // console.log("inside here man: "+userId);
     var dt = e.pageX - $me.offset().left;
       
      // Find the per element step
     var vl = nm = Math.floor( dt / fw );
     var nw = $fg.children().eq( nm ).position().left;
          
     var ns = Math.round( ( dt - nw ) / sw );
     var ow = nw + ns * sw; 
     
     if($(this).attr('name')!="clicked") {
        $(this).attr('name', 'clicked');
     }
     var data = $(this).data();
     data.curr = ow;
     // alert($(this).attr('data-value'));
    // console.log("values:"+commentMap[userId]);
     if(!(userId in commentMap))
        { 
          
          commentMap[userId] = $(this).attr('data-value');
          if(userId.indexOf(" ") >= 0){
            userId = userId.split(' ').join('_');
          }
          

          $("#divfix").append('<div id="ratingHere'+userId +'"></div>');    
          document.getElementById("ratingHere"+userId).style.color = "white";
          // $("#ratingHere"+userId).append("reached here");
          $("#ratingHere"+userId).append(userId.split('_').join(' ')+": "+$(this).attr('data-value'));
          
        }  
    else {
      
        commentMap[userId] = (parseFloat(commentMap[userId]) + parseFloat($(this).attr('data-value')))/2;
        var temp = commentMap[userId];
        if(userId.indexOf(" ") >= 0){
            userId = userId.split(' ').join('_');
          }
        $("#ratingHere"+userId).empty().append(userId.split('_').join(' ')+": "+temp.toFixed(2));
      }
       return false;
   });

   $('.star-ctr').mouseout(function( e ) {
        // mern = $(this);
        var data = $(this).data();
        // console.log(data);
        var $fg = $(this).children('.star-fg');
      if($(this).attr('name')!= 'clicked') {
        console.log("inside title");
        $fg.css( 'width', 0);
              }
      else {
        var ow = data.curr;
        $fg.css( 'width', Math.round( ow )+'px' );  
      }
    });

}

function randomEventsAjax(offset) {
      $.ajax({
               url: 'http://api.nytimes.com/svc/events/v2/listings.jsonp',
               type: 'GET',
               dataType: 'jsonp',
               cache: false, 
               data: {
                'll': "40.756146%2C-73.99021",
                'radius': 10000,
                'offset' : offset, 
                'api-key': "f02694c07ce3d1b319e884d95e82a2b9:13:70159998"
              }, 
               success: function(res){
                  //console.log(res.results);
                  processResults(res);
                      
             }
               , error: function(jqXHR, textStatus, err){
                  showStatus('Server error in fetching Random Comments: ' + textStatus);
                  disableMoreSearch();
               }
            });
    }

function dateEventsAjax(fromDate, toDate, queryText, filters, offset) {
      $.ajax({
               url: 'http://api.nytimes.com/svc/events/v2/listings.jsonp',
               type: 'GET',
               dataType: 'jsonp',
               async: false,
               cache: false, 
               data: {
                'date_range': fromDate + ":" + toDate,
                'query': queryText,
                'filters': filters,
                'offset' : offset, 
                'api-key': "f02694c07ce3d1b319e884d95e82a2b9:13:70159998"
              }, 
               success: function(res){
                  //console.log(res.results);
                  processResults(res);
                      
             }
               , error: function(jqXHR, textStatus, err){
                  showStatus('Server error in fetching Random Comments: ' + textStatus);
                  disableMoreSearch();
               }
            });
    }
function queryEventsAjax(queryText, filters, offset) {
      $.ajax({
               url: 'http://api.nytimes.com/svc/events/v2/listings.jsonp',
               type: 'GET',
               dataType: 'jsonp',
               async: false,
               cache: false, 
               data: {
                'query': queryText,
                'filters': filters,
                'offset' : offset, 
                'api-key': "f02694c07ce3d1b319e884d95e82a2b9:13:70159998"
              }, 
               success: function(res){
                  //console.log(res.results);
                  processResults(res);
                      
             }
               , error: function(jqXHR, textStatus, err){
                  showStatus('Server error in fetching Random Comments: ' + textStatus);
                  disableMoreSearch();
               }
            });

}


  /*$.when(ranComments()).done(function(a1){
      // the code here will be executed when all four ajax requests resolve.
      // a1, a2, a3 and a4 are lists of length 3 containing the response text,
      // status, and jqXHR object for each of the four ajax calls respectively.
      console.log(a1);

  });*/
var currid;

$(document).ready(function() {
    
    $("#where").click(function(event) {
        console.log("id is: "+event.target.id);
});



$("#selectType").change(function() {
    if (this.value == 'article') {
        jQuery('#articleName').show();
        jQuery('#commenterName').hide();
        jQuery('#datepicker1').hide();
    } else if (this.value == 'commenter') {
        jQuery('#articleName').hide();
        jQuery('#commenterName').show();
        jQuery('#datepicker1').hide();

    } else if (this.value == 'commentDate') {
        jQuery('#articleName').hide();
        jQuery('#commenterName').hide();
        jQuery('#datepicker1').show();
    } else if (this.value == 'none') {
        jQuery('#articleName').hide();
        jQuery('#commenterName').hide();
        jQuery('#datepicker1').hide();
    }
    });   
});

function randomEventsButtonClick() {
    clearResults();
    displayEvents();
    whichButtonClicked = 1;
}

function searchEventsButtonClick() {
    clearResults();
    searchEvents();
    whichButtonClicked = 2;
}

function displayEvents(){

  var offset = (($('#currentPageNum').val() - 1) * 20);

  clearStatus();
  randomEventsAjax(offset);

}

function searchEvents() {

      $("#usernameError").hide();
      $("#nofield").hide();
      $("#noresults").hide();

      clearStatus();
      console.log("inside searchcomment");

      var free;
      var festival;
      var kidFriendly;
      var filter_search="";

      var borough = document.getElementById("borough").value; 
      var neighbr = document.getElementById("neighborhood").value;
      var category = document.getElementById("category").value; 
      var fromDate = document.getElementById("datepicker1").value;
      var toDate = document.getElementById("datepicker2").value;
      var query_text = document.getElementById("text").value;
      var offset = (($('#currentPageNum').val() - 1) * 20);
         
      if (borough == '' && neighbr == '' && category == '' && fromDate == '' && toDate == '' && query_text == '') {
          $("#usernameError").show();
          return;
      }

      if(category != '') {
        console.log("We are here");
        filter_search = filter_search + "category:"+category+",";
      }

      if(neighbr!= '') {
        filter_search = filter_search + "neighborhood:"+neighbr+",";
        
      }

      if(borough != '') {
        filter_search = filter_search + "borough:"+borough+",";
      }

      if($("#free").is(':checked')) {
        console.log("Free is checked");
        free = true;
        filter_search = filter_search + "free:"+true+",";
        
      }

      if($("#kidFriendly").is(':checked')) {
        kidFriendly = true;
        filter_search = filter_search + "kid_friendly:"+true+",";
      }
      if($("#festival").is(':checked')) {
        festival = true;
        filter_search = filter_search + "festival:"+true+",";
      }

      filter_search = filter_search.replace(/,\s*$/, "");

      if(fromDate != '' && toDate != '') {
         
         var fromDate = document.getElementById("datepicker1").value;
         fromDateList = fromDate.split("/");
         newFromDate = fromDateList[2]+fromDateList[0]+fromDateList[1];
         console.log("date is "+ newFromDate);   

         var toDate = document.getElementById("datepicker2").value;
         toDateList = toDate.split("/");
         newToDate = toDateList[2]+toDateList[0]+toDateList[1];
         console.log("date is "+ newToDate);  

         console.log(filter_search);
         dateEventsAjax(newFromDate, newToDate, query_text, filter_search, offset);

         }

      else {

          var query_text = document.getElementById("text").value;

          queryEventsAjax(query_text, filter_search, offset);
      }

    }

/*$("#advanced-options").click(function() {
    makeVisible();
});*/


$(document).ready(function(){

  $("#advanced-options").click(function(){
    var str = $('#advanced-options > u').text();
    console.log(str);
    makeVisible();

    if(str == "Show Advnced Options"){
      makeVisible();
    }
     if(str == "Hide Advanced Options"){
      makeInVisible();
     }
  });
});

  function makeVisible() {
    jQuery('#borough').show();
    jQuery('#category').show();
    jQuery('#neighborhood').show();
    jQuery('#free').show();
    jQuery('#kidFriendly').show();
    jQuery('#festival').show();
    $('label[for="free"]').show();
    $('label[for="kidFriendly"]').show();
    $('label[for="festival"]').show();
    $('#advanced-options > u').text("Hide Advanced Options");
  }

  function makeInVisible() {
    jQuery('#borough').hide();
    jQuery('#category').hide();
    jQuery('#neighborhood').hide();
    jQuery('#free').hide();
    jQuery('#kidFriendly').hide();
    jQuery('#festival').hide();
    $('label[for="free"]').hide();
    $('label[for="kidFriendly"]').hide();
    $('label[for="festival"]').hide();
    $('#advanced-options > u').text("Show Advanced Options");
  }
