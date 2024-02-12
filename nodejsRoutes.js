const fs = require("fs");
const http = require("http");

const routes=require('./nodejsRoutes')


function requestHandler(req, res) {
  // console.log(req.headers,req.url,req.method)c
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    console.log("hey ?/");
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>this is server title </title></head>");
    res.write(
      '<body><h1>box</h1><form method="POST" action="/test"><input type="text" name="message"/><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/test" && method === "POST") {
    console.log("test");
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const bodyParsed = Buffer.concat(body).toString();
      console.log("bodyParsed", bodyParsed);
      const message = bodyParsed.split("=")[1];
      console.log("mess", message);
      fs.writeFileSync("random.txt", message);
      res.statusCode = 302;
      res.setHeader("Location", "/"); //it is used to redirect to / in browser side
      return res.end();
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>this is server title </title></head>");
  res.write("<body><h1>box soenjkh</h1></body>");
  res.write("</html>");
  return res.end();
}

const server = http.createServer(routes);

server.listen(3000);


module.exports=requestHandler
