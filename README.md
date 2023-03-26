# Gridify

Srcripts to help generate geojson data for geospatial analysis.

Written with some help from ChatGPT4 :)

Requires Turf.js

```
npm install @turf/turf
```

### country-gridify.js

Country Gridify generates a clipped square grid for a country.  It works by doing the following:

1. It extracts from natural earth the country admin 0 boundary for the country you specify as a ADM0_A3 code.
2. It generates a square grid based on the grid cell size you specify in KM clipped to the country admin boundary.
3. It calculates the centroid for the square which it adds a lat and long properties.
4. It outputs file as a geojson file.


Inputs
- path to natural earth cultural file. I recommend converting a geojson from: https://www.naturalearthdata.com/downloads/50m-cultural-vectors/
- ADM0_A3 code for a country.  Eg. Kenya = KEN
- Size of the grid cell in KM

Example:
```
node country-gridify.js ne-50m_adm0.geojson KEN 50
```

This will generate a clipped [50KM grid of Kenya](https://github.com/onaio/gridify/blob/main/KEN-50km.geojson) in geojson.

## Usage
This helps generate a grid to aggregate against when doing raster based zonal statistics.  A common use case for this is calculating the population in a gridded cell using a [high resolution population density maps](https://dataforgood.facebook.com/dfg/tools/high-resolution-population-density-maps) from groups like Meta.

The outputs can be used to create dot grid maps like [this](https://app.akuko.io/post/02abfb6d-f073-4ddc-b324-01b90c576571).






