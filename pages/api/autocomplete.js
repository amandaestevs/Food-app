import axios from 'axios';

export default async function handler(req, res) {
    const API_KEY = process.env.API_KEY;
    const {search} = req.query;
    if(search.length === 0) return
    const response = await axios.get(`https://api.spoonacular.com/recipes/autocomplete?apiKey=${API_KEY}&query=${search}&number=6`);
    res.json(response.data)
}
