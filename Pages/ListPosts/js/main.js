var blog = {
    name: "Blog of Titles",
    author: "John Doe"
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

$(document).ready(function() {
    $("#blogname").html("<h2>" + blog.name + "</h2><h3>by " + blog.author + "</h3>");

    var $hlines = $("#hlines");
    for (var i = 0; i < posts.length; i++) {
        $hlines.append("<div class=\"post\"><div class=\"panel panel-default\"><h3 class=\"panel-body\">" + posts[i].title + "</h3><div class=\"panel-footer\">" + posts[i].sub + "</div></div></div>");
    }
});

