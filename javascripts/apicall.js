
// var key = "c1e1743caa6b5ead9bd761b809f4b2a6:5:70159998";
// var url = "http://api.nytimes.com/svc/community/v2/comments/random.json?api-key=c1e1743caa6b5ead9bd761b809f4b2a6:5:70159998";    
var commentMap = {};
var icon_loc = "webContent/img/icon-images/";

var whichButtonClicked = 0;

$(document).ready(function(){
  $("#advanced-options").click(function(){
    var str = $('#advanced-options > u').text();
    console.log(str);
    makeVisible();
    if(str == "Show Advanced options"){
      makeVisible();
    }
     else if(str == "Hide Advanced Options"){
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
    $("#addrwhere").empty();
    $("#where").empty();
    whichButtonClicked = 0;
  }

function processResults(data) {
      console.log(data);

      var useridList = [];
      var num = data.results.length;
      var found = data.num_results;

      var offset = (($('#currentPageNum').val() - 1) * 20);

      if(offset == 0 && typeof found !== "undefined") {
        /* Announce the total results */
        $("#addrwhere").append('</br>');
        $("#addrwhere").append('</br>');
        document.getElementById("addrwhere").style.color = "white";
        document.getElementById("addrwhere").style.textAlign = "center";
        document.getElementById("addrwhere").style.fontWeight = "bold";

        // document.getElementById("addrwhere").style.backgroundColor = "";
        document.getElementById("addrwhere").style.fontSize="x-large";
        $("#addrwhere").append("Found " + found + " events for you");
        document.getElementById("addrwhere").scrollIntoView();
      }

      $("#where").append('');

      for(i = 0; i<num; i++){
        var unique_id = (offset+i+1);
        var allResults = data.results[i];
        var bourough = allResults.bourough;
        var category = allResults.category;
        var city = allResults.city;
        var event_url = allResults.event_detail_url;
        var event_id = allResults.event_id;
        var event_name = allResults.event_name;
        var cross_street = allResults.cross_street;
        var event_state = allResults.state;
        var venue_name = allResults.venue_name;
        var web_description = allResults.web_description;
        var telephone = allResults.telephone;
        var street_address = allResults.street_address;
        var icon = icon_loc;


        if(category == "Art") {
          icon += "art.gif";
        }
        else if (category == "Movies"){
          icon += "movies3.png";
        }
        else if (category == "forChildren") {
          icon += "child2.png";
        } 
        else if(category == "Theater") {
          icon += "theater2.jpg";
        } 
        else if(category == "Comedy") {
          icon += "comedy-joker.png";
        } 
        else if( category == "Jazz"){
         icon += "jazz.jpg";
        } 
        else if(category == "Classical"){
          icon += "classsicla.png";
        }
        else if(category == "Dance"){
          icon += "dance.jpg";
        }
        else if(category == "Pop") {
          icon += "pop.jpg";
        }
        else if( category == "spareTimes") {
          icon += "spareTime.jpg";
        }
        else {
          icon += "heart.png";
        }

        if (venue_name === undefined) {
          venue_name = "";
        } else {
          venue_name = venue_name + ", ";
        }
        if (cross_street === undefined) {
          cross_street = "";
        } else {
          cross_street = cross_street + ", ";
        }
        if (telephone === undefined) {
          telephone = "No Contact Available";
        } 
        if (street_address === undefined) {
          street_address = "";
        } else {
          street_address += ", ";
        }
        if(city === undefined){
          city = "";
        } else {
          city += ", ";
        }


        var corgi_feed_well = document.createElement("div");
        corgi_feed_well.id = "corgi_feed_well/"+unique_id;
        corgi_feed_well.className = "corgi_feed_well";
        document.getElementById("where").appendChild(corgi_feed_well);

        var individual_feed_item = document.createElement("div");
        individual_feed_item.id = "individual_feed_item/"+unique_id;
        individual_feed_item.className = "individual_feed_item";
        document.getElementById(corgi_feed_well.id).appendChild(individual_feed_item);

        var feed_item = document.createElement("div");
        feed_item.id = "feed_item/"+unique_id;
        feed_item.className = "feed_item";
        document.getElementById(individual_feed_item.id).appendChild(feed_item);

        var feed_body = document.createElement("div");
        feed_body.id = "feed_body/"+unique_id;
        feed_body.className = "feed_body";
        document.getElementById(feed_item.id).appendChild(feed_body);

        var row1 = document.createElement("div") ;
        row1.id = "row1_feed/"+unique_id;
        row1.className = "row";
        document.getElementById(feed_body.id).appendChild(row1);

        var feed_profile_pic = document.createElement("div");
        feed_profile_pic.id = "feed_profile_pic/"+unique_id;
        feed_profile_pic.className = "feed_profile_pic";
        document.getElementById(row1.id).appendChild(feed_profile_pic);

        var meta_image = document.createElement("img");
        meta_image.id = "meta_image/"+unique_id;
        meta_image.className = "meta_image";
        meta_image.src = icon;
        document.getElementById(feed_profile_pic.id).appendChild(meta_image);

        var feed_profile_pic1 = document.createElement("div");
        feed_profile_pic1.id = "feed_profile_pic1/"+unique_id;
        feed_profile_pic1.className = "feed_profile_pic_right";
        document.getElementById(row1.id).appendChild(feed_profile_pic1);

        var pinForEvent = document.createElement("a");
        pinForEvent.id = "pinNum-"+unique_id;
        pinForEvent.href = "javascript:pinEvent("+unique_id+")";
        pinForEvent.target = "_blank";
        pinForEvent.innerHTML = "<span class=\"glyphicon\"></span>";
        document.getElementById(feed_profile_pic1.id).appendChild(pinForEvent);

        var meta_image1 = document.createElement("img");
        meta_image1.id = "meta_image1/"+unique_id;
        meta_image1.className = "meta_image_pin";
        meta_image1.src = icon_loc+"pin-grey.png";
        document.getElementById(pinForEvent.id).appendChild(meta_image1);

        

        var feed_text = document.createElement("div");
        feed_text.id = "feed_text/"+unique_id;
        feed_text.className = "feed_text";
        document.getElementById(row1.id).appendChild(feed_text);

        var text_para = "<h3 id=\"feed_text_heading-"+unique_id+"\" class=\"custom-head\">"+event_name+"</h3><p>"+web_description+"</p>";
        document.getElementById(feed_text.id).innerHTML += text_para;

        var comment_area = document.createElement("div");
        comment_area.id = "comment_area/"+event_id;
        comment_area.className = "comment_area";
        document.getElementById(feed_item.id).appendChild(comment_area);

        var feed_hr1 = document.createElement("hr");
        feed_hr1.id = "hr1-"+unique_id;
        feed_hr1.className = "feed_hr";
        document.getElementById(feed_item.id).appendChild(feed_hr1);

        var bottom_up = document.createElement("div");
        bottom_up.id = "bottom_up-"+unique_id;
        bottom_up.className = "bottom_meta";
        document.getElementById(feed_item.id).appendChild(bottom_up);

        var row_up = document.createElement("div");
        row_up.id = "row_up-"+unique_id+"-"+event_id;
        row_up.className = "row user-id-search";
        document.getElementById(bottom_up.id).appendChild(row_up);

        $("#"+row_up.id).append('Rate this event: <div style="margin: 0px" title = "'+ data.results[i].event_name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"") + '"><div title = "'+ data.results[i].event_name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")+ '" id = "starDiv'+ unique_id +'" class="star-ctr"><ul><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li></ul></div></div>');

        var feed_hr = document.createElement("hr");
        feed_hr.id = "hr-"+unique_id;
        feed_hr.className = "feed_hr";
        document.getElementById(feed_item.id).appendChild(feed_hr);

        var bottom_meta = document.createElement("div");
        bottom_meta.id = "bottom_meta-"+unique_id;
        bottom_meta.className = "bottom_meta";
        document.getElementById(feed_item.id).appendChild(bottom_meta);

        var row2 = document.createElement("div");
        row2.id = "row2-"+unique_id;
        row2.className = "row";
        document.getElementById(bottom_meta.id).appendChild(row2);

        var bottom_left = document.createElement("div");
        bottom_left.id = "bottom_left-"+unique_id;
        bottom_left.className = "bottom_left";
        document.getElementById(row2.id).appendChild(bottom_left);

        var bottom_left_text = "<h4 class=\"icon-glasses\">&nbsp;"+venue_name+"</h4><h4 class=\"icon-heart-alt\">&nbsp;"+category+"</h4><h4 class=\"icon-phone-alt\">&nbsp;"+telephone+"</h4><h4 class=\"icon-map-marker-alt\">&nbsp;<span id=\"venueNum" + unique_id + "\">"+street_address+city+event_state+"</span></h4>";

        document.getElementById(bottom_left.id).innerHTML += bottom_left_text;

        var bottom_right = document.createElement("div");
        bottom_right.id = "bottom_right-"+unique_id;
        bottom_right.className = "bottom_right";
        document.getElementById(row2.id).appendChild(bottom_right);

        var a_bottom_right = document.createElement("a");
        a_bottom_right.id = "a_bottom_right-"+unique_id;
        a_bottom_right.href = event_url;
        a_bottom_right.target = "_blank";
        var view_art = document.createTextNode("View Event");
        a_bottom_right.appendChild(view_art);
        document.getElementById(bottom_right.id).appendChild(a_bottom_right);

        var span_bottom_right = document.createElement("span");
        span_bottom_right.id = "span_bottom_right-"+unique_id;
        var span_sym = document.createTextNode("|");
        span_bottom_right.appendChild(span_sym);
        document.getElementById(bottom_right.id).appendChild(span_bottom_right);

      var $me = $('#starDiv'+unique_id);

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
      //showStatus("No matching results were found!");
    }

      $('.otherComments').hide();
      // document.getElementById("addrwhere").style.color = "black";
      document.getElementById("where").style.color = "black";
      // document.getElementById("where").style.backgroundColor = "#EACCFF";
      //document.getElementById("where").style.backgroundImage="url('Paper_Texture.jpg')";
      document.getElementById("where").style.textAlign = "left";
      // document.getElementById("addrwhere").style.backgroundColor = "lightGray";

      document.getElementById("where").style.fontWeight = "bold";
      // document.getElementById("addrwhere").style.fontWeight = "bold";
      


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
   }, 
   error: function(jqXHR, textStatus, err){
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
 }, 
 error: function(jqXHR, textStatus, err){
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

    function pinEvent(idNum) {
      var image_id = "meta_image1/"+idNum;
      var image_src = document.getElementById(image_id).getAttribute('src');
      if(image_src == icon_loc+"pin-grey.png"){

        document.getElementById(image_id).setAttribute('src',icon_loc+"pin-red.png"); 
        console.log("This is event number: " + idNum);
        var url = $('#a_bottom_right-'+idNum).attr("href");
        var title = $('#feed_text_heading-'+idNum).text();
        var venue = $('#venueNum'+idNum).text();

        var row1Tag = document.createElement("tr");
        var col1Tag = document.createElement("td");

        col1Tag.setAttribute('class', "td-heading");
        //var eventData = "<p><b><a href=\""+url+">" + title + "</a></b></p><p>" + venue + "</p>";
        var eventData = "<p><b><a href=\""+url+"\">" + title + "</a></b></p><p>" + venue + "</p>";
        col1Tag.innerHTML = eventData;
        row1Tag.setAttribute('id', "Event" +idNum);
        row1Tag.appendChild(col1Tag);
        $("#pinnedEventsTable").append(row1Tag); 
        
      } 
      else if (image_src == icon_loc+"pin-red.png"){

        document.getElementById(image_id).setAttribute('src',icon_loc+"pin-grey.png"); 
      }
    }

/*$("#advanced-options").click(function() {
    makeVisible();
});*/