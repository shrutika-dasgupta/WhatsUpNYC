
// var key = "c1e1743caa6b5ead9bd761b809f4b2a6:5:70159998";
// var url = "http://api.nytimes.com/svc/community/v2/comments/random.json?api-key=c1e1743caa6b5ead9bd761b809f4b2a6:5:70159998";    
var commentMap = {};
function ranComments(){
	// console.log("inside ranComments");
	 


  /*$(document).ajaxStop(function () {
      // 0 === $.active
  });*/


  var jqXHR=$.ajax({
    type: "POST",  
    url: "http://api.nytimes.com/svc/events/v2/listings.jsonp?ll=40.756146%2C-73.99021&radius=10000&limit=20&api-key=f02694c07ce3d1b319e884d95e82a2b9:13:70159998",
     async : false,
      // jsonpCallback: 'myJSON',
    cache: false,
    contentType: "application/json",
    dataType: "jsonp",
    // jsonpCallback: 'callback',
    // jsonpCallback: "localJsonpCallback",
    // crossDomain: true,
    // jsonp: false,
      // work with the response
    success: function( data ) {
          
      console.log(data);

      var useridList = [];
      $("#addrwhere").empty().append("Here are some comments for you");
      $("#addrwhere").append('</br>');
      $("#addrwhere").append('</br>');
      document.getElementById("addrwhere").style.color = "white";
      document.getElementById("addrwhere").style.textAlign = "center";
      document.getElementById("addrwhere").style.fontWeight = "bold";

      // document.getElementById("addrwhere").style.backgroundColor = "";

      document.getElementById("addrwhere").style.fontSize="x-large";
  


      $("#where").empty().append('');

      for(i = 0; i<data.results.length; i++){
      $("#where").append('</br>');
      $("#where").append("Event#"+(i+1));
      /*var res = (data.results.comments[i].userComments).split('/');
      var last = res[res.length-1].split(".");
      useridList.push(last[0]);*/

      $("#where").append('</br><div style="margin: 0px" title = "'+ data.results[i].event_name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"") + '"><div title = "'+ data.results[i].event_name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")+ '" id = "starDiv'+ i +'" class="star-ctr"><ul><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li></ul></div></div>');
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
      $('.otherComments').hide();
      // document.getElementById("addrwhere").style.color = "black";
      document.getElementById("where").style.color = "black";
      // document.getElementById("where").style.backgroundColor = "#EACCFF";
      document.getElementById("where").style.backgroundImage="url('Paper_Texture.jpg')";
      document.getElementById("where").style.textAlign = "left";
      // document.getElementById("addrwhere").style.backgroundColor = "lightGray";

      document.getElementById("where").style.fontWeight = "bold";
      // document.getElementById("addrwhere").style.fontWeight = "bold";
      document.getElementById('searchButton').scrollIntoView();



     

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




    },
    error: function(e) {
          console.log("failed: "+e.message);
    }
    });

  // jqXHR.responseText;
  // console.log( jqXHR.responseText );
  
  


 /*$(document).ajaxStop(function () {
      // 0 === $.active
      console.log("stopped");
  });*/

  scrollBox();
  }
  
  function scrollBox(){ 
      $('#box').slideDown('fast');
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
        currid = event.target.id;

         $.ajax({
          type: "POST",  
          // url: "http://api.nytimes.com/svc/community/v2/comments/random.jsonp?api-key=c1e1743caa6b5ead9bd761b809f4b2a6:5:70159998",
          url: "http://api.nytimes.com/svc/community/v2/comments/user/id/"+ currid +".jsonp?api-key=c1e1743caa6b5ead9bd761b809f4b2a6:5:70159998",
          async : false,
      // jsonpCallback: 'myJSON',
          cache: false,
          contentType: "application/json",
          dataType: "jsonp",
    // jsonpCallback: 'callback',
    // jsonpCallback: "localJsonpCallback",
    // crossDomain: true,
    // jsonp: false,
      // work with the response
          success: function( data ) {
              // console.log( data); 

              $("#"+currid).next(".otherComments").css("background-color","PapayaWhip");
              $("#"+currid).next(".otherComments").empty();

              for(i = 0; i<data.results.comments.length; i++){
                  $("#"+currid).next(".otherComments").append("</br>");
                  $("#"+currid).next(".otherComments").append("Comment#"+(i+1));
                  $("#"+currid).next(".otherComments").append("</br>");
                  $("#"+currid).next(".otherComments").append(data.results.comments[i].commentBody);
                  $("#"+currid).next(".otherComments").append("</br>");

              }



            }


        
       
    });
         $("#"+currid).next(".otherComments").slideToggle(400);
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

$("#advanced-options").click(function() {

        jQuery('#advanced-options').hide();


});

   
});



function searchEvents() {

      $("#usernameError").hide();
      $("#nofield").hide();
      $("#noresults").hide();

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
         
         var jqXHR=$.ajax({
              type: "POST",  
              url: "http://api.nytimes.com/svc/events/v2/listings.jsonp?date_range="+newFromDate+":"+newToDate+"&query="+query_text+"&filters="+filter_search+"&api-key=f02694c07ce3d1b319e884d95e82a2b9:13:70159998",
              async : false,
              cache: false,
              contentType: "application/json",
              dataType: "jsonp",
              success: function( data ) {

                console.log(data);
                var useridList = [];
                  $("#addrwhere").empty().append("Here are some comments for you");
                  $("#addrwhere").append('</br>');
                  $("#addrwhere").append('</br>');
                  document.getElementById("addrwhere").style.color = "white";
                  document.getElementById("addrwhere").style.textAlign = "center";
                  document.getElementById("addrwhere").style.fontWeight = "bold";

                  // document.getElementById("addrwhere").style.backgroundColor = "";

                  document.getElementById("addrwhere").style.fontSize="x-large";
              


                  $("#where").empty().append('');

                  for(i = 0; i<data.results.length; i++){
                  $("#where").append('</br>');
                  $("#where").append("Event#"+(i+1));
                  /*var res = (data.results.comments[i].userComments).split('/');
                  var last = res[res.length-1].split(".");
                  useridList.push(last[0]);*/

                  $("#where").append('</br><div style="margin: 0px" title = "'+ data.results[i].event_name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"") + '"><div title = "'+ data.results[i].event_name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")+ '" id = "starDiv'+ i +'" class="star-ctr"><ul><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li></ul></div></div>');
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
                  $('.otherComments').hide();
                  // document.getElementById("addrwhere").style.color = "black";
                  document.getElementById("where").style.color = "black";
                  // document.getElementById("where").style.backgroundColor = "#EACCFF";
                  document.getElementById("where").style.backgroundImage="url('Paper_Texture.jpg')";
                  document.getElementById("where").style.textAlign = "left";
                  // document.getElementById("addrwhere").style.backgroundColor = "lightGray";

                  document.getElementById("where").style.fontWeight = "bold";
                  // document.getElementById("addrwhere").style.fontWeight = "bold";
                  document.getElementById('searchButton').scrollIntoView();



                 

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





              },

              error: function(e) {
                  console.log("failed: "+e.message);
              }
          });

         }

      else {

          var query_text = document.getElementById("text").value;

          var jqXHR=$.ajax({
              type: "POST",  
              url: "http://api.nytimes.com/svc/events/v2/listings.jsonp?query="+query_text+"&filters="+filter_search+"&api-key=f02694c07ce3d1b319e884d95e82a2b9:13:70159998",
              async : false,
              cache: false,
              contentType: "application/json",
              dataType: "jsonp",
              success: function( data ) {

                  console.log(data);

                  var useridList = [];
                  $("#addrwhere").empty().append("Here are some comments for you");
                  $("#addrwhere").append('</br>');
                  $("#addrwhere").append('</br>');
                  document.getElementById("addrwhere").style.color = "white";
                  document.getElementById("addrwhere").style.textAlign = "center";
                  document.getElementById("addrwhere").style.fontWeight = "bold";

                  // document.getElementById("addrwhere").style.backgroundColor = "";

                  document.getElementById("addrwhere").style.fontSize="x-large";
              


                  $("#where").empty().append('');

                  for(i = 0; i<data.results.length; i++){
                  $("#where").append('</br>');
                  $("#where").append("Event#"+(i+1));
                  /*var res = (data.results.comments[i].userComments).split('/');
                  var last = res[res.length-1].split(".");
                  useridList.push(last[0]);*/

                  $("#where").append('</br><div style="margin: 0px" title = "'+ data.results[i].event_name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"") + '"><div title = "'+ data.results[i].event_name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")+ '" id = "starDiv'+ i +'" class="star-ctr"><ul><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li></ul></div></div>');
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
                  $('.otherComments').hide();
                  // document.getElementById("addrwhere").style.color = "black";
                  document.getElementById("where").style.color = "black";
                  // document.getElementById("where").style.backgroundColor = "#EACCFF";
                  document.getElementById("where").style.backgroundImage="url('Paper_Texture.jpg')";
                  document.getElementById("where").style.textAlign = "left";
                  // document.getElementById("addrwhere").style.backgroundColor = "lightGray";

                  document.getElementById("where").style.fontWeight = "bold";
                  // document.getElementById("addrwhere").style.fontWeight = "bold";
                  document.getElementById('searchButton').scrollIntoView();



                 

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


              },

              error: function(e) {
                  console.log("failed: "+e.message);
              }
          });

      }

    }



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
   
    }