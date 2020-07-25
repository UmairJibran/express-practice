//npm imports
const Express = require("express");

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

app.get("/about", middlewareAPI, (request, response) => {
   response.send("About page\n\n");
});

app.get("/add-story", middlewareAPI, (request, response) => {
   response.send("Adding Story page \n\n");
});
//Error Handlers

//Server Bootup/Server Exports
app.listen(port);
