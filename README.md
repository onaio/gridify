# Gridify

Srcripts to help generate geojson data for geospatial analysis.

Written with some help from ChatGPT4

Requires Turf.js

### country-gridify.js

Country Gridify generates a clipped square grid for a country 

Inputs
- path to natural earth cultural file. I recommend converting a geojson from: https://www.naturalearthdata.com/downloads/50m-cultural-vectors/
ADM0_A3 code for a country.  Eg. Kenya = KEN
- Size of the grid cell in KM

Example:

node country-gridify.js ne-50m_adm0.geojson KEN 50

This will generate a clipped [50KM grid of Kenya](https://github.com/onaio/gridify/blob/main/KEN-50km.geojson) in geojson.







