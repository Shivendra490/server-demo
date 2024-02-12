const path = require("path");
// module.exports=path.dirname(process.mainModule.filename)
module.exports = path.dirname(require.main.filename); // It gives file name of root directory i.e app.js on which our app is build
