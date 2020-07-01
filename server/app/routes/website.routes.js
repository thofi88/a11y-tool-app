module.exports = app => {
  const websites = require("../controllers/website.controller.js");
  const checks = require("../controllers/checks.controller.js");
  const cat = require("../controllers/cat.controller.js");

  // REVIEW All routes from the API Server. The Routs pointed to the controller section.

  // SECTION Website Routes
  // ANCHOR Return all Websites
  app.get("/websites", websites.findAll);

  // ANCHOR Return a single Websites find by websiteId
  app.get("/websites/:websiteId", websites.findOne);

  // ANCHOR Return last WebsiteID
  app.get("/websiteOneId", websites.findOneId);

  // ANCHOR Create a new Websites
  app.post("/websites", websites.create);

  // ANCHOR Update a Websites find by websiteId
  app.put("/websites/:websiteId", websites.update);

  // ANCHOR Delete a Websites find by websiteId
  app.delete("/websites/:websiteId", websites.delete);

  // ANCHOR Delete all Websites
  app.delete("/websites", websites.deleteAll);

  // !SECTION

  // SECTION Check Routes

  // ANCHOR Return all Checks from a spezial WebsiteId
  app.get("/websiteCheck/:websiteId", checks.findAllChecks);

  // ANCHOR Return a single Check find by checkId
  app.get("/websiteOneCheck/:checkId", checks.findOneCheck);

  // ANCHOR Create a new Check
  app.post("/websiteCheck", checks.create);

  // ANCHOR Update a Check find by checkId
  app.put("/websiteCheckPut/:checkId", checks.update);

  // ANCHOR Delete a Websites find by checkId
  app.delete("/websiteCheckDelete/:checkId", checks.delete);

  // !SECTION Check Routes

  // SECTION Category Routes
  // ANCHOR Return all Categories
  app.get("/category", cat.findAll);

  // ANCHOR Return a single Category find by categoryId
  app.get("/category/:catId", cat.findOne);

  // ANCHOR Create a Category
  app.post("/newCat", cat.create);

  // !SECTION Category Routes

};
