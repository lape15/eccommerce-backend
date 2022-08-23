//server.js
const app = require("./index");
const port = process.env.PORT || 5000; //Line 3

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
