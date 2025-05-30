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
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
