const { Client } = require("@googlemaps/google-maps-services-js");


module.exports = {
  googleGeocode,
};


async function googleGeocode(req, res){
    const address = req.params.address
    const client = new Client()
    try{
      const apiKey = ''
      const response = await client.geocode({
        params: {
          address: 'EN7 6WD',
          region: 'uk',
          key: apiKey
        }
      });
      const { lat, lng } = response.data.results[0].geometry.location;
      const geocodeInfo = { lat, lng };
      console.log('HERE')
      console.log(geocodeInfo)
      res.json(geocodeInfo);
    } catch (error) {
      console.log('Error', error)
    }
  }