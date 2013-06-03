function listPoems(data) {
	var output='<ul data-role="listview" data-filter="true">';
	$.each(data.posts,function(key,val) {
		output += '<li>';
		output += '<a href="#poems" onclick="showPoem(' + val.id + ')">';
		output += '<h3>' + val.title;
		output += ' Written by ' + val.author.name + '</h3>';
		output += '</a></li>';
	}); // go through each post
	output+='</ul>';
	$('#poetrylist').append( $(output) );
} // lists all the poems


function showPoem(id) {
	$.getJSON('http://wordsaladpoetrymagazine.com/wp/?json=get_post&post_id=' + id + '&callback=?', function(data) {
		var output_poem='';
		output_poem += '<h3>' + data.post.title + '</h3>';
		output_poem += '<h3>Author: ' + data.post.author.name + '</h3>';
		output_poem += data.post.content;
		$('#thePoem').html(output_poem);
	}); //get JSON Data for Poems
} //showPost

function listPoets(data) {
	var output='';
	var val = '';
	$.each(data.posts,function(key,val) {
		//console.log(val.thumbnail);
		output += '<div data-role="collapsible">';
		output += '<h3>' + val.title + '</h3>';
		if (typeof val.thumbnail !== 'undefined') { 
		output += '<img src="' + val.thumbnail + '" alt="' + val.title + '"/>';
		} else {
		output += '<img src="images/WSLogo.jpg" alt="Word Salad Logo"/>';
		}
		output += val.content;
		output += '</div>';
	}); // go through each post
	$('#poetslist').html( $(output) );
} // lists all the poems

function showNews(data) {
	var output='<ul data-role="listview" data-filter="true">';
	var val = '';
	$.each(data.posts,function(key,val) {
		output += '<div data-role="collapsible">';
		output += '<h3>' + val.title + '</h3>';
		if ((val.attachments !== 'undefined') && ($(val.attachments).length > 0)) { 
		output += '<img src="' + val.attachments[0].images.medium.url + '" alt="' + val.title + '"/>';
		} else {
		output += '<img src="images/WSLogo.jpg" alt="Word Salad Logo"/>';
		}
		output += val.content;
		output += '</div>';
	}); // go through each post
	output+='</ul>';
	$('#newslist').html( $(output) );
} // lists all the news items

function showPoetDetails(id) {
	$.getJSON('http://wordsaladpoetrymagazine.com/wp/?json=get_post&post_id=' + id + '&callback=?', function(data) {

		var tempDiv = document.createElement("tempDiv");
		tempDiv.innerHTML = data.post.content;
		$("div.#author-bio-box",tempDiv).remove();
		var content = '';
		content = tempDiv.innerHTML;
		
		
		var output_poet_details='';
		output_poet_details += '<h3>' + data.post.title + '</h3><br />';
		output_poet_details += '<img src="' + data.post.attachments[0].images.medium.url + '" alt="' + data.post.title + '"/>';
		output_poet_details += content;
		$('#poetdetails').html(output_poet_details);
	}); //get JSON Data for Stories
} //showPoetDetails

function showIntro(data) {
	var intro_data = '';

	intro_data += '<h1>Introduction written by ';
	intro_data += data.posts[0].author.name;
	intro_data += '</h1>';
	intro_data += data.posts[0].content;
	$('#theIntro').append( $(intro_data));
}

function listVideos(data) {
	
	// description
	var description = data.feed.entry[0].media$group.media$description.$t;

	// id of movie for playback
	var id = data.feed.entry[0].id.$t.substring(38);
	var output = '';
	output += '';
	for (var i=0; i<data.feed.entry.length; i++) {
		//title
	  var title = data.feed.entry[i].title.$t;
	  var description = data.feed.entry[i].media$group.media$description.$t;
	  var thumbnail = data.feed.entry[i].media$group.media$thumbnail[0].url;
	  var id = data.feed.entry[i].id.$t.substring(38);
	  output += '<div data-role="collapsible">';

	  output += '<h2>' + title + '</h2>';
	  output += '<a href="#videoplayer" data-transition="pop" onclick="playVideo(\''+ id + '\',\'' + title + '\',\'' + escape(description) + '\' )">';
	  output += '<h2>' + title + '</h2>';
	  output += '<img src="' + thumbnail + '" alt="' + title + '" />';
	  output += '</a>'; 
	  output += '</div>';
	}
	$('#videolist').html(output);
}

function listVideosOld(data) {
	var output = '';
	for (var i=0; i<data.feed.entry.length; i++) {
	var title = data.feed.entry[i].title.$t;
	var description = data.feed.entry[i].media$group.media$description.$t;
	var thumbnail = data.feed.entry[i].media$group.media$thumbnail[0].url;
	var id = data.feed.entry[i].id.$t.substring(38);
	
	var blocktype = (( i % 2)===1) ? 'b': 'a' ;
	
	output += '<div class="ui-block-' + blocktype + '">';
	output += '<a href="#videoplayer" data-transition="pop" onclick="playVideo(\''+ id + '\',\'' + title + '\',\'' + escape(description) + '\' )">';
	output += '<h3 class="movietitle">' + title + '</h3>';
	output += '<img src="' + thumbnail + '" alt="' + title + '" />';
	output += '</a>';
	output += "</div>";
	
	}

	$('#videolist').html(output);
}

function playVideo(id, title, description) {
	var output ='<iframe src="http://www.youtube.com/embed/'+ id +'?wmode=transparent&amp;HD=0&amp;rel=0&amp;showinfo=0&amp;controls=1&amp;autoplay=1" width="420" height="315" frameborder="0" allowfullscreen></iframe>';
	output += '<h3>' + title + '</h3>';
	output += '<p>' + unescape(description) + '</p>';
	$('#myplayer').html(output);
}


