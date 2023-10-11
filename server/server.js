const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/v1/hello", (req, res) => {
    try {
        res.status(200).json("hello world");
    } catch (error) {
        console.log(error);
    }
});


app.listen(3000, () => {
    console.log("Server listening at port 3000");
})
