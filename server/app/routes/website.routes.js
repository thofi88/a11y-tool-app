module.exports = app => {
  const websites = require("../controllers/website.controller.js");
  const checks = require("../controllers/checks.controller.js");
  const cat = require("../controllers/cat.controller.js");

  // Create a new Websites
  app.post("/websites", websites.create);

  // Create a new Websites
  app.post("/websiteCheck", checks.create);

  // Create a new Websites
  app.post("/newCat", cat.create);

  // Retrieve all Websitess
  app.get("/websites", websites.findAll);

  // Retrieve a single Websites with websiteId
  app.get("/websites/:websiteId", websites.findOne);

  // Retrieve a single Websites with websiteId
  app.get("/websiteOneId", websites.findOneId);

  // Retrieve a single Check from a URL with websiteUrl
  app.get("/websiteCheck/:websiteId", checks.findAllChecks);

  // Retrieve a single Check from a URL with websiteUrl
  app.get("/websiteOneCheck/:checkId", checks.findOneCheck);

  // Retrieve a single Check from a URL with websiteUrl
  app.get("/category/:catId", cat.findOne);

  // Retrieve a single Check from a URL with websiteUrl
  app.get("/category", cat.findAll);

  // Update a Websites with websiteId
  app.put("/websites/:websiteId", websites.update);

  // Update a Websites with websiteId
  app.put("/websiteCheckPut/:checkId", checks.update);

  // Update a Websites with websiteId
  app.delete("/websiteCheckDelete/:checkId", checks.delete);

  // Delete a Websites with websiteId
  app.delete("/websites/:websiteId", websites.delete);

  // Create a new Websites
  app.delete("/websites", websites.deleteAll);
};
