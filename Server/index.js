const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");

const database = require("./config/dataBase");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");


dotenv.config();
const PORT = process.env.PORT || 4000;
//database connect
database.connect();
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

app.post('/api/predict', async (req, res) => {
    try {
        const response = await axios.post('http://localhost:5000/receiveData', req.body);
        res.json(response.data);
    } catch (error) {
        console.error('Error connecting to Flask backend:', error.message);
        res.status(500).send('Error connecting to Flask backend');
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