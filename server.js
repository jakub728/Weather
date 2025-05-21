import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  async function fetchWeather() {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.KEY}&q=London&aqi=no`
      );

      if (!response.ok) {
        throw new Error("Could not fetch");
      }

      const result = await response.json();
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
    }
  }
  fetchWeather();
});

app.post("/weather", (req, res) => {
  const { city } = req.body;

  if (!city) {
    return res
      .status(400)
      .json({ error: "Please provide the name of the city" });
  }

  async function fetchWeather() {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.KEY}&q=${city}&aqi=no`
      );

      if (!response.ok) {
        throw new Error("Could not fetch");
      }

      const result = await response.json();
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
    }
  }
  fetchWeather();
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
