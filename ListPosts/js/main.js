var blog = {
    name: "Blog of Titles",
    author: "John Doe"
};

var post = function (title, sub) {
    this.title = title;
    this.sub = sub;
};

var posts = [];
posts.push(new post("Title", "a title"));
posts.push(new post("Not title", "not a title"));
posts.push(new post("Definitely not a title", "a title"));
posts.push(new post("Title?", "no"));

$(document).ready(function() {
    $("#blogname").html("<h2>" + blog.name + "</h2><h3>by " + blog.author + "</h3>");

    var $hlines = $("#hlines");
    for (var i = 0; i < posts.length; i++) {
        $hlines.append("<div class=\"post\"><h2><a href=\"http://www.google.com\">" + posts[i].title + "</a></h2><h3><em>" + posts[i].sub + "</em></h3></div>");
    }
});
