const express = require("express")
const cors = require("cors")
const { connection } = require("./config/db")
const { userRouter } = require("./routes/user.routes")
const { VideoRouter } = require("./routes/video.routes")


const app = express()
app.use(cors());
app.use(express.json({ limit: "2gb" })); 
app.use(express.urlencoded({ limit: "2gb", extended: true })); 
// app.use(express.json());
app.use("/users", userRouter)
app.use("/uploads", express.static("uploads"));

app.use("/video",VideoRouter)

//Used auth middleware for restricted routes

app.listen(process.env.port, async() => {
	try {
		await connection
		console.log("connected to the DB")
		console.log(`Server is running at port ${process.env.port}`)
	} catch (err) {
		console.log(err)
	}
})