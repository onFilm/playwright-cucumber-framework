import fs from "fs-extra";

fs.ensureDir("reports/test-results").then(() => {
  fs.emptyDir("reports/test-results");
}).catch(err => {
  console.log("reports/test-results folder not created! " + err);
});
fs.ensureDir("reports/logs").then(() => {
  fs.emptyDir("reports/logs");
}).catch(err => {
  console.log("reports/logs folder not created! " + err);
});
fs.ensureDir("reports/hars").then(() => {
  fs.emptyDir("reports/hars");
}).catch(err => {
  console.log("reports/hars folder not created! " + err);
});
fs.ensureDir("reports/console").then(() => {
  fs.emptyDir("reports/console");
}).catch(err => {
  console.log("reports/console folder not created! " + err);
});