
// var key = "c1e1743caa6b5ead9bd761b809f4b2a6:5:70159998";
// var url = "http://api.nytimes.com/svc/community/v2/comments/random.json?api-key=c1e1743caa6b5ead9bd761b809f4b2a6:5:70159998";    
var commentMap = {};
function ranComments(){
	// console.log("inside ranComments");
	 


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
      $("#where").append("Comment#"+(i+1));
      /*var res = (data.results.comments[i].userComments).split('/');
      var last = res[res.length-1].split(".");
      useridList.push(last[0]);*/

      $("#where").append('</br><div style="margin: 0px" title = "'+ data.results[i].event_name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"") + '"><div title = "'+ data.results[i].event_name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")+ '" id = "starDiv'+ i +'" class="star-ctr"><ul><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li></ul></div></div>');
      // console.log('<div id = "starDiv'+ i +'" style="margin: 0px"><div class="star-ctr"><ul><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-star"></span></a></li></ul></div></div>')

      $("#where").append('</br>');
      $("#where").append(data.results[i].event_name);
      $("#where").append('</br>');

      /*var aTag = document.createElement('a');
      aTag.setAttribute('href',data.results.comments[i].articleURL);
      // mydiv.appendChild(aTag);

      $("#where").append(aTag);*/
      $("#where").append('User: '+data.results[i].display_name);
      $("#where").append('</br>');      
      $("#where").append('Article: ');
      $("#where").append('<a href="' + data.results.articleURL + '" target="_blank">' + data.results[i].articleURL + '</a>');

      $("#where").append('</br>');
      $("#where").append('Recommended by: '+data.results.recommendationCount);
      $("#where").append('</br>');
      $("#where").append('location: '+data.results[i].location);
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


   
});


function searchComments(){

      $("#usernameError").hide();
      $("#nofield").hide();
      $("#noresults").hide();

      console.log("inside searchcomment");

      if (document.getElementById("datepicker1").value == '' && document.getElementById("text").value == '') {
          $("#usernameError").show();
          return;
      }

     if(document.getElementById("datepicker1").value != '')
     var comDate = document.getElementById("datepicker1").value;
     comDateList = comDate.split("/");
     newComDate = comDateList[2]+comDateList[0]+comDateList[1];
     console.log("date is "+ newComDate);         

    artUrl = encodeURI(document.getElementById("articleName").value);
        
    var jqXHR=$.ajax({
    type: "POST",  
    // url: "http://api.nytimes.com/svc/community/v2/comments/random.jsonp?api-key=c1e1743caa6b5ead9bd761b809f4b2a6:5:70159998",
    url: "http://api.nytimes.com/svc/community/v2/comments/url/exact-match.jsonp?url="+ artUrl +"&api-key=c1e1743caa6b5ead9bd761b809f4b2a6:5:70159998",
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
        
      if (data.results.comments.length == 0) {
        $("#noresults").show();
        return;
      };

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
      for(i = 0; i<data.results.comments.length; i++){
      $("#where").append('</br>');
      $("#where").append("Comment#"+(i+1));
      $("#where").append('</br><div style="margin: 0px" title = "'+ data.results.comments[i].display_name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")+ '"><div title = "'+ data.results.comments[i].display_name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")+ '" id = "starDiv'+ i +'" class="star-ctr"><ul><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li></ul></div></div>');
      $("#where").append('</br>');
      $("#where").append(data.results.comments[i].commentBody);
      $("#where").append('</br>');

      /*var aTag = document.createElement('a');
      aTag.setAttribute('href',data.results.comments[i].articleURL);
      // mydiv.appendChild(aTag);

      $("#where").append(aTag);*/
      $("#where").append('User: '+data.results.comments[i].display_name);
      $("#where").append('</br>');      
      /*$("#where").append('Article: ');
      $("#where").append('<a href="' + data.results.comments[i].articleURL + '">' + data.results.comments[i].articleURL + '</a>');

      $("#where").append('</br>');*/
      $("#where").append('Recommended by: '+data.results.comments[i].recommendations);
      $("#where").append('</br>');
      $("#where").append('location: '+data.results.comments[i].location);
      $("#where").append('</br>');
      // $("#where").append('More comments from '+data.results.comments[i].display_name+": ");
      
      /*$("#where").append('userComments: '+data.results.comments[i].userComments);
      $("#where").append('</br>');*/
      var res = (data.results.comments[i].userComments).split('/');
      var last = res[res.length-1].split(".");
      useridList.push(last[0]);
      $("#where").append('<p style="cursor: pointer; color: brown;" value= "' + last[0] +'" id = "' + last[0] +'" >' + 'Click here for more comments from '+data.results.comments[i].display_name + '</p>');
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
      console.log("inside here man: "+userId);
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
    });


    } else if (document.getElementById("selectType").value == 'commenter') {


       if(document.getElementById("commenterName").value == ''){
                $("#usernameError").show();


      } 
     
     var comUserId = document.getElementById("commenterName").value.trim();  
     if (comUserId.match(/[a-z]/i)) {
        $("#noresults").show();
        return;
      }; 

      var jqXHR=$.ajax({
    type: "POST",  
    url: "http://api.nytimes.com/svc/community/v2/comments/user/id/"+ comUserId +".jsonp?api-key=c1e1743caa6b5ead9bd761b809f4b2a6:5:70159998",
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
     console.log( data); 

     if (data.results.comments.length == 0) {
        $("#noresults").show();
        return;
      };

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
      for(i = 0; i<data.results.comments.length; i++){
      $("#where").append('</br>');
      $("#where").append("Comment#"+(i+1));
      $("#where").append('</br><div style="margin: 0px" title = "'+ data.results.comments[i].display_name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")+ '"><div title = "'+ data.results.comments[i].display_name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")+ '" id = "starDiv'+ i +'" class="star-ctr"><ul><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li></ul></div></div>');
      $("#where").append('</br>');
      $("#where").append(data.results.comments[i].commentBody);
      $("#where").append('</br>');

      /*var aTag = document.createElement('a');
      aTag.setAttribute('href',data.results.comments[i].articleURL);
      // mydiv.appendChild(aTag);

      $("#where").append(aTag);*/
      $("#where").append('User: '+data.results.comments[i].display_name);
      $("#where").append('</br>');      
      /*$("#where").append('Article: ');
      $("#where").append('<a href="' + data.results.comments[i].articleURL + '">' + data.results.comments[i].articleURL + '</a>');

      $("#where").append('</br>');*/
      $("#where").append('Recommended by: '+data.results.comments[i].recommendations);
      $("#where").append('</br>');
      $("#where").append('location: '+data.results.comments[i].location);
      $("#where").append('</br>');
      // $("#where").append('More comments from '+data.results.comments[i].display_name+": ");
      
      /*$("#where").append('userComments: '+data.results.comments[i].userComments);
      $("#where").append('</br>');*/
      var res = (data.results.comments[i].userComments).split('/');
      var last = res[res.length-1].split(".");
      useridList.push(last[0]);
      /*$("#where").append('<p style="cursor: pointer; color: brown;" value= "' + last[0] +'" id = "' + last[0] +'" >' + 'Click here for more comments from '+data.results.comments[i].display_name + '</p>');
      // console.log(last[0]);
      // $("#where").append('</br>');

      $("#where").append('<div class = "otherComments"></div>');


*/
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
      console.log("inside here man: "+userId);
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
    });
    } else if (document.getElementById("selectType").value == 'commentDate') {

      if(document.getElementById("datepicker1").value == ''){
                $("#usernameError").show();


      } 

       
     var comDate = document.getElementById("datepicker1").value;
     comDateList = comDate.split("/");
     newComDate = comDateList[2]+comDateList[0]+comDateList[1];
     console.log("date is "+ newComDate);   

       var jqXHR=$.ajax({
    type: "POST",  
    // url: "http://api.nytimes.com/svc/community/v2/comments/random.jsonp?api-key=c1e1743caa6b5ead9bd761b809f4b2a6:5:70159998",
    url: "http://api.nytimes.com/svc/community/v2/comments/by-date/" + newComDate + ".jsonp?api-key=c1e1743caa6b5ead9bd761b809f4b2a6:5:70159998",
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
      if (data.results.comments.length == 0) {
        $("#noresults").show();
        return;
      };
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
      for(i = 0; i<data.results.comments.length; i++){
      $("#where").append('</br>');
      $("#where").append("Comment#"+(i+1));
      $("#where").append('</br><div style="margin: 0px" title = "'+ data.results.comments[i].display_name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")+ '"><div title = "'+ data.results.comments[i].display_name.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"")+ '" id = "starDiv'+ i +'" class="star-ctr"><ul><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li><li><a href="#"><span class="glyphicon glyphicon-heart"></span></a></li></ul></div></div>');
      $("#where").append('</br>');
      $("#where").append(data.results.comments[i].commentBody);
      $("#where").append('</br>');

      /*var aTag = document.createElement('a');
      aTag.setAttribute('href',data.results.comments[i].articleURL);
      mydiv.appendChild(aTag);*/

      // $("#where").append(aTag);
      $("#where").append('User: '+data.results.comments[i].display_name);
      $("#where").append('</br>');      
      $("#where").append('Article: ');
      $("#where").append('<a href="' + data.results.comments[i].articleURL + '">' + data.results.comments[i].articleURL + '</a>');

      $("#where").append('</br>');
      $("#where").append('Recommended by: '+data.results.comments[i].recommendationCount);
      $("#where").append('</br>');
      $("#where").append('location: '+data.results.comments[i].location);
      $("#where").append('</br>');
      // $("#where").append('More comments from '+data.results.comments[i].display_name+": ");
      
      /*$("#where").append('userComments: '+data.results.comments[i].userComments);
      $("#where").append('</br>');*/
      var res = (data.results.comments[i].userComments).split('/');
      var last = res[res.length-1].split(".");
      useridList.push(last[0]);
      $("#where").append('<p style="cursor: pointer; color: brown;" value= "' + last[0] +'" id = "' + last[0] +'" >' + 'Click here for more comments from '+data.results.comments[i].display_name + '</p>');
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
      console.log("inside here man: "+userId);
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
    }); 

    }

     scrollBox();


}


