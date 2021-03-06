var express = require('express')
    , app = express()
    , path = require("path")
    , server  = require("http").createServer(app)
    , bodyParser = require("body-parser")
    , gif = require("./server/routes/gif.js")
    , artportfolio = require("./server/routes/artportfolio.js")
    , videos = require("./server/routes/videos.js")
    , config = require("./config/config");

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || config.portToListen);
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/gif", gif);
app.use("/artportfolio", artportfolio);
app.use("/videos", videos);

app.get("/contact", function(req,res){
  res.render("contact", {selected: '/contact', page: 'contact'});
});

app.get("/about", function(req,res){
  res.render("about", {selected: '/about', page: 'about'});
});

app.get("/", function(req, res) {
  res.render("home", {selected: '/', page: 'home'});
});

server.listen(app.get('port'), function(){
    console.log("started on part", app.get("port"));
});
