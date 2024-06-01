const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const contactUsRoute = require("./routes/Contact");

const fetchData = require("./fetchData")
const database = require("./config/dataBase");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const fetchJobs = require("./fetchJobs");


dotenv.config();
const PORT = process.env.PORT || 4000;
//database connect
database.connect();
// fetchData();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials:true,
    })
)
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
    fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp",
    })
)
//cloudinary connection
cloudinaryConnect();

//routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/reach", contactUsRoute);
app.get('/api/v1/fetch-data', async (req, res) => {
    try {
        await fetchData();
        res.status(200).json({ message: 'Data fetched and written to file successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch data' });
    }
});

app.get('/api/v1/jobdata', async (req, res) => {
    try {
        await fetchJobs();
        res.status(200).json({ message: 'Data fetched and written to file successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch data' });
    }
});

app.use(express.static('client/build'))

//default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: 'Your server is up and running....'
    });
});

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`)
})