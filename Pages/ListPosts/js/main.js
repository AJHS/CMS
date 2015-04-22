$(document).ready(function () {
  var blog = {
    name: "Blog of Titles",
    author: "Cisero"
  };

  var post = function (title, sub) {
    this.title = title;
    this.sub = sub;
  };

  var posts = [];
  posts.push(new post("Lorem Ipsum", "Nam ut massa convallis, feugiat augue gravida"));
  posts.push(new post("Dolor Sit", "Nam ut massa convallis, feugiat augue gravida"));
  posts.push(new post("Amet Consectetur", "Nam ut massa convallis, feugiat augue gravida"));
  posts.push(new post("Adipiscing Elit", "Nam ut massa convallis, feugiat augue gravida"));

  $(".page-header").html("<h2>" + blog.name + "</h2><h3>" + blog.author + "</h3>");

  var $hlines = $("#hlines");
  for (var i = 0; i < posts.length; i++) {
    $hlines.append(
      "<div class=\"panel panel-default\">" +
        "<div class=\"panel-heading\">" +
          "<a href=\"http://www.google.com\">" +
            "<h2 class=\"panel-title\">" +
              posts[i].title +
            "</h2>" +
          "</a>" +
        "</div>" +
        "<div class=\"panel-body\">" +
          posts[i].sub +
        "</div>" +
      "</div>"
    );
  }
});
