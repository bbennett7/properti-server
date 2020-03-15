const axios = require('axios');

const searchBusinesses = async (req, res) => {
  const headers = {
    Authorization: `Bearer ${process.env.YELP_API_KEY}`
  };
  const queryString = req._parsedOriginalUrl.query;

  try {
    const data = await axios.get(
      `${process.env.YELP_API_URL}/businesses/search?${queryString}$limit=50`,
      { headers }
    );

    const sorted = data.data.businesses.sort((a, b) => a.distance - b.distance);
    console.log(sorted);
    return res.status(200).send(sorted);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};

module.exports = {
  searchBusinesses
};
