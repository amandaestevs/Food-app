require('dotenv').config()
import axios from "axios"

export default async function handler(req, res) {
   const API_KEY = process.env.API_KEY;
   const {cuisines, intolerences, diet} = req.query;
   const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}}&cuisine=${cuisines}&intolerences=${intolerences}&diet=${diet}`;
   const response = await axios.get(url);
   console.log(response)
}