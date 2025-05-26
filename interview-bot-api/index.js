require("dotenv").config();
const express = require("express");
const cors = require("cors");

const resumeRoutes = require("./routes/resume");
const questionRoutes = require("./routes/questions");
const feedbackRoutes = require("./routes/feedback");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options("*", cors(corsOptions)); // Handle preflight requests for all routes
app.use("/api", resumeRoutes);
app.use("/api", questionRoutes);
app.use("/api", feedbackRoutes);

app.get("/",(req,res)=>{
  res.json({message: 'Welcome'});
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
