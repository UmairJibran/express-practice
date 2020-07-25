//npm imports
const Express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//Variables
const app = new Express();
const port = 3000;

//Configuration

//Middleware
const middlewareAPI = (request, response, next) => {
   if (request.query.api && request.query.api == "111") {
      console.log(request.headers);
      next();
   } else {
      response.status(401).send("NOT AUTHORIZED! \n\n");
   }
};

app.use(morgan("dev")); //using morgan package to print extra information. "dev" parameter is for debugging.
app.use(bodyParser.json()); //using bodyParser to parse json when received

app.use((request, response, next) => {
   console.log(`METHOD: ${request.method}, URL: ${request.url}`);
   next();
});
//Routes
app.get("/", (request, response) => {
   response.send("Home page\n\n");
});

app.get("/story", (request, response) => {
   response.send("Story page\n\n");
});

app.post("/about", middlewareAPI, (request, response) => {
   console.log(request.body);
   response.send("About page\n\n");
});

app.get("/add-story", middlewareAPI, (request, response) => {
   response.send("Adding Story page \n\n");
});
//Error Handlers

//Server Bootup/Server Exports
app.listen(port);
