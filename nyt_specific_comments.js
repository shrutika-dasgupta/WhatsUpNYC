
$(document).ready(function(){
  $("#search-query").click(function(){
    console.log("clicked-seach -button");
    $('#right-append-comments').empty();
    $('#right-section').show();
    $("#input_validity").hide();
    $('#commentator-stats').show();
    $('#left-section').css('float','left');
    $('#left-section').css('width','40%');
    $('#right-section').css('float','right');
    $('#right-section').css('width','60%');
    $('#right-section > .container').addClass('right-container');
    $('#left-section > .container').addClass('left-container');

    var input_by_name = $('#input-by-name').val();
    var input_by_article = $('#input-by-article').val();
    var input_by_date = $('#input-by-date').val();

    if(input_by_name == '' && input_by_article == '' && input_by_date == '')
    {
      alert("Enter required fields");
      window.location.replace('index.html');
    }
    if(input_by_name)
    {
      get_form_data('name', input_by_name);
    }
    else if(input_by_article)
    {
      get_form_data('article', input_by_article);
    }
    else if( input_by_date)
    {
      get_form_data('date', input_by_date);
    }
  });
});

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function get_form_data(indicate, input_value)
{

  if(indicate == 'date')
  {
    var date = input_value;
    var date_array = date.split('/');

    if(date_array.length != 3)
    {
      alert("Enter valid input");
      window.location.replace('index.html');

    }
    else
    {
      var month = date_array[0];
      var day = date_array[1];
      var year = date_array[2];

      var date_str = year + month + day;

      if(year.length != 4 || month.length != 2 || day.length != 2)
      {
        alert("Enter valid input");
        window.location.replace('index.html');
      }
      else
      {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
           dd='0'+dd
        } 

        if(mm<10) {
            mm='0'+mm
        }

        today = ""+yyyy+mm+dd;

        if(date_str > today)
        {
          alert("Enter a past date value.");
          window.location.replace('index.html');

        }
        else
        {
          $.ajax({
            url: ('http://api.nytimes.com/svc/community/v2/comments/by-date/'+date_str+'.jsonp?api-key=71b688b6fcaffe9ac59413b1d7de1a0c:1:70151851'),
            dataType: 'jsonp',
            type: 'GET',
            cache:false,
            success: function(data){
              var objects = data.results.comments
              //random_comments;
              for(var i = 0; i < objects.length; i++)
              {

                //console.log();
                var random_comment = {};
                random_comment['comment'] = objects[i]['commentBody'];
                random_comment['name'] = objects[i]['display_name'];
                var dateTime = new Date(objects[i]['approveDate']*1000);
                var com_day = dateTime.getDate();
                var com_month = dateTime.getMonth();
                var com_year = dateTime.getFullYear();

                random_comment['date'] = com_month+"/"+com_day+"/"+com_year;
                random_comment['articleURL'] = objects[i]['articleURL'];
                random_comment['commentTitle'] = objects[i]['commentTitle'];
                random_comment['location'] = objects[i]['location'];
                random_comment['rCount'] = objects[i]['recommendationCount'];
                var userComments = [];
                userComments = objects[i]['userComments'].split('/');
                var user_id_dot = [];
                user_id_dot = userComments[7].split(".");
                random_comment['userId'] = user_id_dot[0];

                var corgi_feed_well = document.createElement("div");
                corgi_feed_well.id = "corgi_feed_well/"+i;
                corgi_feed_well.className = "corgi_feed_well";
                document.getElementById("right-append-comments").appendChild(corgi_feed_well);

                var individual_feed_item = document.createElement("div");
                individual_feed_item.id = "individual_feed_item/"+i;
                individual_feed_item.className = "individual_feed_item";
                document.getElementById(corgi_feed_well.id).appendChild(individual_feed_item);

                var feed_item = document.createElement("div");
                feed_item.id = "feed_item/"+i;
                feed_item.className = "feed_item";
                document.getElementById(individual_feed_item.id).appendChild(feed_item);

                var feed_body = document.createElement("div");
                feed_body.id = "feed_body/"+i;
                feed_body.className = "feed_body";
                document.getElementById(feed_item.id).appendChild(feed_body);

                var row1 = document.createElement("div") ;
                row1.id = "row1_feed/"+i;
                row1.className = "row";
                document.getElementById(feed_body.id).appendChild(row1);

                var feed_profile_pic = document.createElement("div");
                feed_profile_pic.id = "feed_profile_pic/"+i;
                feed_profile_pic.className = "feed_profile_pic";
                document.getElementById(row1.id).appendChild(feed_profile_pic);

                var meta_image = document.createElement("img");
                meta_image.id = "meta_image/"+i;
                meta_image.className = "meta_image";
                meta_image.src = "images/quotes-2.png";
                document.getElementById(feed_profile_pic.id).appendChild(meta_image);

                var feed_text = document.createElement("div");
                feed_text.id = "feed_text/"+i;
                feed_text.className = "feed_text";
                document.getElementById(row1.id).appendChild(feed_text);

                var text_para = "<p>"+random_comment['comment']+"</p>";
                document.getElementById(feed_text.id).innerHTML += text_para;

                var comment_area = document.createElement("div");
                comment_area.id = "comment_area/"+random_comment['userId'];
                comment_area.className = "comment_area";
                document.getElementById(feed_item.id).appendChild(comment_area);

                var feed_hr1 = document.createElement("hr");
                feed_hr1.id = "hr1-"+i;
                feed_hr1.className = "feed_hr";
                document.getElementById(feed_item.id).appendChild(feed_hr1);

                var bottom_up = document.createElement("div");
                bottom_up.id = "bottom_up-"+i;
                bottom_up.className = "bottom_meta";
                document.getElementById(feed_item.id).appendChild(bottom_up);

                var row_up = document.createElement("div");
                row_up.id = "row_up-"+i+"/"+random_comment['userId']+"/"+random_comment['name'];
                row_up.className = "row user-id-search";
                document.getElementById(bottom_up.id).appendChild(row_up);

                var stars = document.createElement("input");
                stars.id = "input-22-"+i;
                stars.type = "number";
                stars.className = "rating";
                stars.addEventListener('click', function(){
                  console.log("clicked event");
                });
                document.getElementById(row_up.id).appendChild(stars);

                $("#input-22-"+i).rating({'min':0, 'max':5, 'step':1, 'size':'xs'});
                $('#input-22-'+i).addClass('value-of-rating');

                var feed_hr = document.createElement("hr");
                feed_hr.id = "hr-"+i;
                feed_hr.className = "feed_hr";
                document.getElementById(feed_item.id).appendChild(feed_hr);

                var bottom_meta = document.createElement("div");
                bottom_meta.id = "bottom_meta-"+i;
                bottom_meta.className = "bottom_meta";
                document.getElementById(feed_item.id).appendChild(bottom_meta);

                var row2 = document.createElement("div");
                row2.id = "row2-"+i;
                row2.className = "row";
                document.getElementById(bottom_meta.id).appendChild(row2);

                var bottom_left = document.createElement("div");
                bottom_left.id = "bottom_left-"+i;
                bottom_left.className = "bottom_left";
                document.getElementById(row2.id).appendChild(bottom_left);

                var bottom_left_text = "<h4 class=\"icon-adult\">&nbsp;"+random_comment['name']+"</h4><h4 class=\"icon-calendar-sign\">&nbsp;"+random_comment['date']+"</h4><h4 class=\"icon-map-marker-alt\">&nbsp;"+random_comment['location']+"</h4>";

                document.getElementById(bottom_left.id).innerHTML += bottom_left_text;

                var bottom_right = document.createElement("div");
                bottom_right.id = "bottom_right-"+i;
                bottom_right.className = "bottom_right";
                document.getElementById(row2.id).appendChild(bottom_right);

                var a_bottom_right = document.createElement("a");
                a_bottom_right.id = "a_bottom_right-"+i;
                a_bottom_right.href = random_comment['articleURL'];
                a_bottom_right.target = "_blank";
                var view_art = document.createTextNode("View Article");
                a_bottom_right.appendChild(view_art);
                document.getElementById(bottom_right.id).appendChild(a_bottom_right);

                var span_bottom_right = document.createElement("span");
                span_bottom_right.id = "span_bottom_right-"+i;
                var span_sym = document.createTextNode("|");
                span_bottom_right.appendChild(span_sym);
                document.getElementById(bottom_right.id).appendChild(span_bottom_right);

                var show_more_comments = document.createElement("button");
                show_more_comments.id = "show_more_comments-"+random_comment['userId'];
                show_more_comments.className = "show_comment_link btn btn-link";
                show_more_comments.type = "button"
                show_more_comments.addEventListener('click', function(e){
                  e.preventDefault();
                  $(this).closest('.feed_item').find('.comment_area').slideToggle(700);
                  
                  var user_array = [];
                  user_array = (this.id).split('-');
                  var userId = user_array[1];
                  console.log(userId);
                  $.ajax({
                    type:'GET',
                    url: 'http://api.nytimes.com/svc/community/v2/comments/user/id/'+userId+'.jsonp?api-key=71b688b6fcaffe9ac59413b1d7de1a0c:1:70151851',
                    cache: false,
                    async: false,
                    dataType: 'jsonp',
                    success: function(data){
                      var objects = data.results.comments;
                      for (var j = 0; j < objects.length; j++){
                        var user_comments = objects[j]['commentBody'];
                        var user_name = objects[j]['display_name'];
                        var user_location = objects[j]['location'];
                        var u_dateTime = new Date(objects[j]['approveDate']*1000);
                        var u_day = u_dateTime.getDate();
                        var u_month = u_dateTime.getMonth();
                        var u_year = u_dateTime.getFullYear();

                        var user_date = u_month+"/"+u_day+"/"+u_year;

                        var div_other_comm = document.createElement("div");
                        div_other_comm.id = "div_other_comments/"+userId+"/"+j;
                        div_other_comm.className = "div-other-comments";
                        div_other_comm.style.border = '2px solid black';
                        document.getElementById("comment_area/"+userId).appendChild(div_other_comm);
                        var p_text  = "<p class = \"bg-primary text_box_comments\">"+user_comments+"</p>";
                        document.getElementById(div_other_comm.id).innerHTML += p_text;
                        var info = "<p id = \"info-"+i+"-"+j+"\" class =\" bg-danger text_box_comments\"></p>";
                        document.getElementById(div_other_comm.id).innerHTML += info;
                        var all_info = "<h4 class=\"icon-adult\">&nbsp;"+user_name+"</h4><h4 class=\"icon-calendar-sign\">&nbsp;"+user_date+"</h4><h4 class=\"icon-map-marker-alt\">&nbsp;"+user_location+"</h4>";
                        $('p#info-'+i+"-"+j).html(all_info);
                      }
                    },
                    error: function(){
                      console.log("error");
                    }
                  });

                }, false);
                var show_more_text = document.createTextNode("View Commentor's Comments");

                show_more_comments.appendChild(show_more_text);
                document.getElementById(bottom_right.id).appendChild(show_more_comments);
              }
            },
            fail: function(){
              console.log("error");
              alert("No results Obtained");
              window.location.replace('index.html');

            }
          });
        } 
      } 
    }
  }
  else if(indicate == 'name')
  {
    console.log(input_value);

    var user_id = input_value;

    if (isNumber(user_id))
    {
      $.ajax({
        url: ('http://api.nytimes.com/svc/community/v2/comments/user/id/'+user_id+'.jsonp?api-key=71b688b6fcaffe9ac59413b1d7de1a0c:1:70151851'),
        dataType: 'jsonp',
        type: 'GET',
        cache:false,
        success: function(data){
          var objects = data.results.comments
          console.log(data);
          for(var i = 0; i < objects.length; i++)
          {

            //console.log();
            var random_comment = {};
            random_comment['comment'] = objects[i]['commentBody'];
            random_comment['name'] = objects[i]['display_name'];
            var dateTime = new Date(objects[i]['approveDate']*1000);
            var com_day = dateTime.getDate();
            var com_month = dateTime.getMonth();
            var com_year = dateTime.getFullYear();

            random_comment['date'] = com_month+"/"+com_day+"/"+com_year;
            random_comment['articleURL'] = objects[i]['articleURL'];
            random_comment['commentTitle'] = objects[i]['commentTitle'];
            random_comment['location'] = objects[i]['location'];
            random_comment['rCount'] = objects[i]['recommendationCount'];
            var userComments = [];
            userComments = objects[i]['userComments'].split('/');
            var user_id_dot = [];
            user_id_dot = userComments[7].split(".");
            random_comment['userId'] = user_id_dot[0];

            var corgi_feed_well = document.createElement("div");
            corgi_feed_well.id = "corgi_feed_well/"+i;
            corgi_feed_well.className = "corgi_feed_well";
            document.getElementById("right-append-comments").appendChild(corgi_feed_well);

            var individual_feed_item = document.createElement("div");
            individual_feed_item.id = "individual_feed_item/"+i;
            individual_feed_item.className = "individual_feed_item";
            document.getElementById(corgi_feed_well.id).appendChild(individual_feed_item);

            var feed_item = document.createElement("div");
            feed_item.id = "feed_item/"+i;
            feed_item.className = "feed_item";
            document.getElementById(individual_feed_item.id).appendChild(feed_item);

            var feed_body = document.createElement("div");
            feed_body.id = "feed_body/"+i;
            feed_body.className = "feed_body";
            document.getElementById(feed_item.id).appendChild(feed_body);

            var row1 = document.createElement("div") ;
            row1.id = "row1_feed/"+i;
            row1.className = "row";
            document.getElementById(feed_body.id).appendChild(row1);

            var feed_profile_pic = document.createElement("div");
            feed_profile_pic.id = "feed_profile_pic/"+i;
            feed_profile_pic.className = "feed_profile_pic";
            document.getElementById(row1.id).appendChild(feed_profile_pic);

            var meta_image = document.createElement("img");
            meta_image.id = "meta_image/"+i;
            meta_image.className = "meta_image";
            meta_image.src = "images/quotes-2.png";
            document.getElementById(feed_profile_pic.id).appendChild(meta_image);

            var feed_text = document.createElement("div");
            feed_text.id = "feed_text/"+i;
            feed_text.className = "feed_text";
            document.getElementById(row1.id).appendChild(feed_text);

            var text_para = "<p>"+random_comment['comment']+"</p>";
            document.getElementById(feed_text.id).innerHTML += text_para;

            var comment_area = document.createElement("div");
            comment_area.id = "comment_area/"+random_comment['userId'];
            comment_area.className = "comment_area";
            document.getElementById(feed_item.id).appendChild(comment_area);

            var feed_hr1 = document.createElement("hr");
            feed_hr1.id = "hr1-"+i;
            feed_hr1.className = "feed_hr";
            document.getElementById(feed_item.id).appendChild(feed_hr1);

            var bottom_up = document.createElement("div");
            bottom_up.id = "bottom_up-"+i;
            bottom_up.className = "bottom_meta";
            document.getElementById(feed_item.id).appendChild(bottom_up);

            var row_up = document.createElement("div");
            row_up.id = "row_up-"+i+"/"+random_comment['userId']+"/"+random_comment['name'];
            row_up.className = "row user-id-search";
            document.getElementById(bottom_up.id).appendChild(row_up);

            var stars = document.createElement("input");
            stars.id = "input-22-"+i;
            stars.type = "number";
            stars.className = "rating";
            stars.addEventListener('click', function(){
              console.log("clicked event");
            });
            document.getElementById(row_up.id).appendChild(stars);

            $("#input-22-"+i).rating({'min':0, 'max':5, 'step':1, 'size':'xs'});
            $('#input-22-'+i).addClass('value-of-rating');

            var feed_hr = document.createElement("hr");
            feed_hr.id = "hr-"+i;
            feed_hr.className = "feed_hr";
            document.getElementById(feed_item.id).appendChild(feed_hr);

            var bottom_meta = document.createElement("div");
            bottom_meta.id = "bottom_meta-"+i;
            bottom_meta.className = "bottom_meta";
            document.getElementById(feed_item.id).appendChild(bottom_meta);

            var row2 = document.createElement("div");
            row2.id = "row2-"+i;
            row2.className = "row";
            document.getElementById(bottom_meta.id).appendChild(row2);

            var bottom_left = document.createElement("div");
            bottom_left.id = "bottom_left-"+i;
            bottom_left.className = "bottom_left";
            document.getElementById(row2.id).appendChild(bottom_left);

            var bottom_left_text = "<h4 class=\"icon-adult\">&nbsp;"+random_comment['name']+"</h4><h4 class=\"icon-calendar-sign\">&nbsp;"+random_comment['date']+"</h4><h4 class=\"icon-map-marker-alt\">&nbsp;"+random_comment['location']+"</h4>";

            document.getElementById(bottom_left.id).innerHTML += bottom_left_text;

            var bottom_right = document.createElement("div");
            bottom_right.id = "bottom_right-"+i;
            bottom_right.className = "bottom_right";
            document.getElementById(row2.id).appendChild(bottom_right);

            var a_bottom_right = document.createElement("a");
            a_bottom_right.id = "a_bottom_right-"+i;
            a_bottom_right.href = input_value;
            a_bottom_right.target = "_blank";
            var view_art = document.createTextNode("View Article");
            a_bottom_right.appendChild(view_art);
            document.getElementById(bottom_right.id).appendChild(a_bottom_right);
          }
        },
        error: function(){
          console.log("error");
          alert("NO results obtained");
          window.location.replace('index.html');

        }
      });      
    }
    else
    {
      alert("Invalid User Id ! Enter Numeric Input");
      window.location.replace('index.html');

    }
  }
  else if(indicate == 'article')
  {

    var url_array = input_value.split('/');

    if(url_array[2] != 'www.nytimes.com')
    {
      alert("Enter New York Times Url as input");
      window.location.replace('index.html');
    }
    else
    {
      var url = encodeURIComponent(input_value);
      console.log(url);

      $.ajax({
        url: ('http://api.nytimes.com/svc/community/v2/comments/url/exact-match.jsonp?url='+url+'&&api-key=71b688b6fcaffe9ac59413b1d7de1a0c:1:70151851'),
        dataType: 'jsonp',
        type: 'GET',
        cache:false,
        success: function(data){
          var objects = data.results.comments
          console.log(objects);
          //random_comments;
          for(var i = 0; i < objects.length; i++)
          {

            //console.log();
            var random_comment = {};
            random_comment['comment'] = objects[i]['commentBody'];
            random_comment['name'] = objects[i]['display_name'];
            var dateTime = new Date(objects[i]['approveDate']*1000);
            var com_day = dateTime.getDate();
            var com_month = dateTime.getMonth();
            var com_year = dateTime.getFullYear();

            random_comment['date'] = com_month+"/"+com_day+"/"+com_year;
            random_comment['articleURL'] = objects[i]['articleURL'];
            random_comment['commentTitle'] = objects[i]['commentTitle'];
            random_comment['location'] = objects[i]['location'];
            random_comment['rCount'] = objects[i]['recommendationCount'];
            var userComments = [];
            userComments = objects[i]['userComments'].split('/');
            var user_id_dot = [];
            user_id_dot = userComments[7].split(".");
            random_comment['userId'] = user_id_dot[0];

            var corgi_feed_well = document.createElement("div");
            corgi_feed_well.id = "corgi_feed_well/"+i;
            corgi_feed_well.className = "corgi_feed_well";
            document.getElementById("right-append-comments").appendChild(corgi_feed_well);

            var individual_feed_item = document.createElement("div");
            individual_feed_item.id = "individual_feed_item/"+i;
            individual_feed_item.className = "individual_feed_item";
            document.getElementById(corgi_feed_well.id).appendChild(individual_feed_item);

            var feed_item = document.createElement("div");
            feed_item.id = "feed_item/"+i;
            feed_item.className = "feed_item";
            document.getElementById(individual_feed_item.id).appendChild(feed_item);

            var feed_body = document.createElement("div");
            feed_body.id = "feed_body/"+i;
            feed_body.className = "feed_body";
            document.getElementById(feed_item.id).appendChild(feed_body);

            var row1 = document.createElement("div") ;
            row1.id = "row1_feed/"+i;
            row1.className = "row";
            document.getElementById(feed_body.id).appendChild(row1);

            var feed_profile_pic = document.createElement("div");
            feed_profile_pic.id = "feed_profile_pic/"+i;
            feed_profile_pic.className = "feed_profile_pic";
            document.getElementById(row1.id).appendChild(feed_profile_pic);

            var meta_image = document.createElement("img");
            meta_image.id = "meta_image/"+i;
            meta_image.className = "meta_image";
            meta_image.src = "images/quotes-2.png";
            document.getElementById(feed_profile_pic.id).appendChild(meta_image);

            var feed_text = document.createElement("div");
            feed_text.id = "feed_text/"+i;
            feed_text.className = "feed_text";
            document.getElementById(row1.id).appendChild(feed_text);

            var text_para = "<p>"+random_comment['comment']+"</p>";
            document.getElementById(feed_text.id).innerHTML += text_para;

            var comment_area = document.createElement("div");
            comment_area.id = "comment_area/"+random_comment['userId'];
            comment_area.className = "comment_area";
            document.getElementById(feed_item.id).appendChild(comment_area);

            var feed_hr1 = document.createElement("hr");
            feed_hr1.id = "hr1-"+i;
            feed_hr1.className = "feed_hr";
            document.getElementById(feed_item.id).appendChild(feed_hr1);

            var bottom_up = document.createElement("div");
            bottom_up.id = "bottom_up-"+i;
            bottom_up.className = "bottom_meta";
            document.getElementById(feed_item.id).appendChild(bottom_up);

            var row_up = document.createElement("div");
            row_up.id = "row_up-"+i+"/"+random_comment['userId']+"/"+random_comment['name'];
            row_up.className = "row user-id-search";
            document.getElementById(bottom_up.id).appendChild(row_up);

            var stars = document.createElement("input");
            stars.id = "input-22-"+i;
            stars.type = "number";
            stars.className = "rating";
            stars.addEventListener('click', function(){
              console.log("clicked event");
            });
            document.getElementById(row_up.id).appendChild(stars);

            $("#input-22-"+i).rating({'min':0, 'max':5, 'step':1, 'size':'xs'});
            $('#input-22-'+i).addClass('value-of-rating');

            var feed_hr = document.createElement("hr");
            feed_hr.id = "hr-"+i;
            feed_hr.className = "feed_hr";
            document.getElementById(feed_item.id).appendChild(feed_hr);

            var bottom_meta = document.createElement("div");
            bottom_meta.id = "bottom_meta-"+i;
            bottom_meta.className = "bottom_meta";
            document.getElementById(feed_item.id).appendChild(bottom_meta);

            var row2 = document.createElement("div");
            row2.id = "row2-"+i;
            row2.className = "row";
            document.getElementById(bottom_meta.id).appendChild(row2);

            var bottom_left = document.createElement("div");
            bottom_left.id = "bottom_left-"+i;
            bottom_left.className = "bottom_left";
            document.getElementById(row2.id).appendChild(bottom_left);

            var bottom_left_text = "<h4 class=\"icon-adult\">&nbsp;"+random_comment['name']+"</h4><h4 class=\"icon-calendar-sign\">&nbsp;"+random_comment['date']+"</h4><h4 class=\"icon-map-marker-alt\">&nbsp;"+random_comment['location']+"</h4>";

            document.getElementById(bottom_left.id).innerHTML += bottom_left_text;

            var bottom_right = document.createElement("div");
            bottom_right.id = "bottom_right-"+i;
            bottom_right.className = "bottom_right";
            document.getElementById(row2.id).appendChild(bottom_right);

            var a_bottom_right = document.createElement("a");
            a_bottom_right.id = "a_bottom_right-"+i;
            a_bottom_right.href = random_comment['articleURL'];
            a_bottom_right.target = "_blank";
            var view_art = document.createTextNode("View Article");
            a_bottom_right.appendChild(view_art);
            document.getElementById(bottom_right.id).appendChild(a_bottom_right);

            var span_bottom_right = document.createElement("span");
            span_bottom_right.id = "span_bottom_right-"+i;
            var span_sym = document.createTextNode("|");
            span_bottom_right.appendChild(span_sym);
            document.getElementById(bottom_right.id).appendChild(span_bottom_right);

            var show_more_comments = document.createElement("button");
            show_more_comments.id = "show_more_comments-"+random_comment['userId'];
            show_more_comments.className = "show_comment_link btn btn-link";
            show_more_comments.type = "button"
            show_more_comments.addEventListener('click', function(e){
              e.preventDefault();
              $(this).closest('.feed_item').find('.comment_area').slideToggle(700);
              
              var user_array = [];
              user_array = (this.id).split('-');
              var userId = user_array[1];
              console.log(userId);
              $.ajax({
                type:'GET',
                url: 'http://api.nytimes.com/svc/community/v2/comments/user/id/'+userId+'.jsonp?api-key=71b688b6fcaffe9ac59413b1d7de1a0c:1:70151851',
                cache: false,
                async: false,
                dataType: 'jsonp',
                success: function(data){
                  var objects = data.results.comments;
                  for (var j = 0; j < objects.length; j++){
                    var user_comments = objects[j]['commentBody'];
                    var user_name = objects[j]['display_name'];
                    var user_location = objects[j]['location'];
                    var u_dateTime = new Date(objects[j]['approveDate']*1000);
                    var u_day = u_dateTime.getDate();
                    var u_month = u_dateTime.getMonth();
                    var u_year = u_dateTime.getFullYear();

                    var user_date = u_month+"/"+u_day+"/"+u_year;

                    var div_other_comm = document.createElement("div");
                    div_other_comm.id = "div_other_comments/"+userId+"/"+j;
                    div_other_comm.className = "div-other-comments";
                    div_other_comm.style.border = '2px solid black';
                    document.getElementById("comment_area/"+userId).appendChild(div_other_comm);
                    var p_text  = "<p class = \"bg-primary text_box_comments\">"+user_comments+"</p>";
                    document.getElementById(div_other_comm.id).innerHTML += p_text;
                    var info = "<p id = \"info-"+i+"-"+j+"\" class =\" bg-danger text_box_comments\"></p>";
                    document.getElementById(div_other_comm.id).innerHTML += info;
                    var all_info = "<h4 class=\"icon-adult\">&nbsp;"+user_name+"</h4><h4 class=\"icon-calendar-sign\">&nbsp;"+user_date+"</h4><h4 class=\"icon-map-marker-alt\">&nbsp;"+user_location+"</h4>";
                    $('p#info-'+i+"-"+j).html(all_info);
                  }
                },
                error: function(){
                  console.log("error");
                }
              });

            }, false);
            var show_more_text = document.createTextNode("View Commentor's Comments");

            show_more_comments.appendChild(show_more_text);
            document.getElementById(bottom_right.id).appendChild(show_more_comments);
          }
        },
        error: function(){
          console.log("error");
          alert("No results Obtained");
          window.location.replace('index.html');

        }
      });
    }
  }
}