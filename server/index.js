const express = require("express");
const cors = require("cors");
const userTypeRouters = require("./routes/UserTypeRoute");
const userRouters = require("./routes/UserRoute");
const ticketRouters = require("./routes/TicketRoute");

const app = express();

//Settings
app.set("port", process.env.PORT || 8080);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/user-type", userTypeRouters);
app.use("/user", userRouters);
app.use("/ticket", ticketRouters);

app.listen(app.get("port"), () => {
  console.log("Start server on port " + app.get("port"));
});
