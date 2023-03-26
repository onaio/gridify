const fs = require('fs');
const turf = require('@turf/turf');

function extractCountryBorder(countriesData, isoA2) {
  const countryFeature = countriesData.features.find(
    (feature) => feature.properties.ADM0_A3 === isoA2
  );

  if (!countryFeature) {
    throw new Error(`Country with ISO_A2 "${isoA2}" not found in the dataset.`);
  }

  return countryFeature;
}

function createSquareGrid(bounds, cellSize, units, adminBoundary) {
  const squareGrid = turf.squareGrid(bounds, cellSize, { units });

  let idCounter = 1;
  const clippedSquareGrid = {
    type: 'FeatureCollection',
    features: squareGrid.features
      .map((feature) => {
        const intersection = turf.intersect(feature, adminBoundary);
        if (intersection) {
          intersection.properties.id = idCounter++;
          const centroid = turf.centroid(intersection);
          intersection.properties.lat = centroid.geometry.coordinates[1];
          intersection.properties.lng = centroid.geometry.coordinates[0];
          return intersection;
        }
        return null;
      })
      .filter(Boolean),
  };

  return clippedSquareGrid;
}

// Check if the required arguments are provided
if (process.argv.length < 4) {
  console.error('Usage: node country_gridify.js <ne_10m_admin_0_path> <iso-a2> <cell-size>');
  process.exit(1);
}

const ne10mAdmin0Path = process.argv[2];
const isoA2 = process.argv[3];
const cellSize = parseFloat(process.argv[4]);
//const outputFile = process.argv[5];

const ne10mAdmin0Data = JSON.parse(fs.readFileSync(ne10mAdmin0Path, 'utf8'));

if (!turf.isObject(ne10mAdmin0Data) || ne10mAdmin0Data.type !== 'FeatureCollection') {
  throw new Error('Invalid Natural Earth 10m Admin 0 GeoJSON data');
}

const countryBorder = extractCountryBorder(ne10mAdmin0Data, isoA2);

const units = 'kilometers';
const boundingBox = turf.bbox(countryBorder);
const clippedSquareGrid = createSquareGrid(boundingBox, cellSize, units, countryBorder);

const outputPath = `${isoA2}-${cellSize}km.geojson`;
fs.writeFileSync(outputPath, JSON.stringify(clippedSquareGrid, null, 2));

console.log(`Clipped square grid for "${isoA2}" saved to: ${outputPath}`);
