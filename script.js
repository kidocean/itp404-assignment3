var base = 'https://www.reddit.com/r/';

$("#searchButton").click(function() {
  var url = (base + document.getElementById('mySearch').value + '.json');
  console.log(url);
  getSubreddits(url);
});

// function getSubreddits(subreddit) {
//   var promise = $.ajax({
//     url: subreddit,
//     type: 'get'
//   }).then(function(response) {
//     var templateSource = $('#subreddit-template').html();
//     var template = Handlebars.compile(templateSource);
//     var html = template({
//       items : formatAPIData(response)
//     });
//     $('#subreddit-content').html(html);
//   }).then(function(response) {
//     console.log(response);
//   }).then(function(response) {
//     console.log(response);
//   });
// }


function getSubreddits(subreddit) {
  var promise = $.ajax({
    url: subreddit,
    type: 'get'
  }).then(function(response) {
    var templateSource = $('#subreddit-template').html();
    var template = Handlebars.compile(templateSource);
    var html = template({
      items : formatAPIData(response)
    });
    $('#subreddit-content').html(html);
  }, function() {
    var templateSource = $('#subreddit-template').html();
    var template = Handlebars.compile(templateSource);
    var html = template({
      items : ""
    });
    $('#subreddit-content').html(html);
  });
}

// ask question about why there was an error using the chainable thens in getSubreddits with respnose ==> undefined
function formatAPIData(response) {
  var data = [];
  var children = response.data.children;
  if(children == undefined) {
    return [];
  }
  for(var x = 0; x < children.length; x++) {
    if(children != undefined)
    var archiveVal = children[x].data.archived ? "Archived" : "Not Archived";
    var description = children[x].data.selftext.length == 0 ? "No description" : children[x].data.selftext;
    var obj = {
      "score" : children[x].data.score,
      "title" : children[x].data.title,
      "titleURL" : children[x].data.url,
      "commentCount" : children[x].data.num_comments,
      "description" : description,
      "archived" : archiveVal
    };
      data.push(obj);
    }
    console.log(data);
  return data;
}
