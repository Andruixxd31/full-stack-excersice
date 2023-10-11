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

app.get("/api/v1/people", async (req, res) => {
    try {
        const people = await fetch("https://gorest.co.in/public/v2/users")
        const result = await people.json()
        res.send(result);
    } catch (error) {
        res.status(500).json({
            status: "Unsuccesful",
            data: {
                message: "Error while making request",
                error: error,
            },
        });
    }
})

app.get("/api/v1/people/active", async (req, res) => {
    try {
        const people = await fetch("https://gorest.co.in/public/v2/users")
        const result = await people.json()
        const active = result.filter((person) => {
            return person.status === "active"
        })
        if (Object.keys(active).length === 0) {
            res.status(404).json({
                status: "Items not found",
                data: {
                    message: "non active people",
                },
            });
        } else {
            res.status(200).json({
                status: "Succesful",
                results: Object.keys(active).length,
                data: {
                    message: "found active people",
                    active: active,
                },
            });

        }
    } catch (error) {
        res.status(500).json({
            status: "Unsuccesful",
            data: {
                message: "Error while making request",
                error: error,
            },
        });
    }
})

app.get("/api/v1/people/inactive", async (req, res) => {
    try {
        const people = await fetch("https://gorest.co.in/public/v2/users")
        const result = await people.json()
        const inactive = await result.filter((person) => {
            return person.status === "inactive"
        })
        if (Object.keys(inactive).length === 0) {
            res.status(404).json({
                status: "Items not found",
                data: {
                    message: "non inactive people",
                },
            });
        } else {
            res.status(200).json({
                status: "Succesful",
                results: Object.keys(inactive).length,
                data: {
                    message: "found inactive people",
                    inactive: inactive,
                },
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "Unsuccesful",
            data: {
                message: "Error while making request",
                error: error,
            },
        });
    }
})

app.listen(3000, () => {
    console.log("Server listening at port 3000");
})
