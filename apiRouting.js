//* npm imports
const Express = require("express");
const BodyParser = require("body-parser");
const Morgan = require("morgan");

//Variables / Instantiation
const port = process.env.PORT || 3000;
const app = Express();
var profile = {
   username: "umairjibran",
   email: "umairjibran@gmail.com",
   password: "123456789",
   url: "http://umairjibran.com",
};

//middleware
const APICheck = (request, response, next) => {
   if (request.query.apiKey && request.query.apiKey == "1234") {
      console.log("Authorised");
      next();
   } else {
      response.status(403).send("Not Authorised");
   }
};

app.use(Morgan("dev")); //using dev middleware from morgan package
app.use(BodyParser.json());
app.use((req, _, next) => {
   console.log(req.method, req.url);
   next();
});

//routes
app.get("/", (req, res) => {
   res.send(req.headers);
});
app.get("/profile", APICheck, (_, res) => {
   res.send(profile);
});
app.post("/profile", (req, res) => {
   profile = req.body;
   res.status(201).send(profile);
});
app.put("/profile", (req, res) => {
   Object.assign(profile, req.body);
   res.status(204).send(profile);
});
app.delete("/profile", (_, res) => {
   profile = {};
   res.status(204).send("Deleted!");
});
//error handlers

//server bootups / server export
app.listen(port);
