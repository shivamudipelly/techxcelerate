const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const compression = require("compression");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const dashboardRoute = require("./routes/dashboardRoutes");
const activityRoutes = require("./routes/activityRoutes");
const sessionRoute = require("./routes/sessionRoutes");

dotenv.config();
const app = express();
app.use(cors());

app.use(helmet());
app.use(compression());
app.use(cookieParser());


// Middleware for JSON parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/activity", activityRoutes);
app.use("/api/sessions", sessionRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
