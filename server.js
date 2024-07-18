// const express = require("express");
// const bodyParser = require("body-parser");
// const employeeRoutes = require("./routes/routes.js");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 8080;

// app.use(bodyParser.json());
// app.use("/api", employeeRoutes);
// app.use(cors());

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require("express");
const bodyParser = require("body-parser");
const employeeRoutes = require("./routes/routes.js");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 9001;

// Configure CORS to allow requests from the frontend origin
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use("/api", employeeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
