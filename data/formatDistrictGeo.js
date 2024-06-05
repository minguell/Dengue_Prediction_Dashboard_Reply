const fs = require('fs');

const districtFeatures = {};
fs.readFile('./poa_districts.json', 'utf8', (err, dataString) => {
  const districtsGeo = JSON.parse(dataString);
  let returnGeo = {
    type: 'FeatureCollection',
    name: 'Distritos de Saúde',
    features: []
  }
  districtsGeo.features.forEach((feature) => {
    districtFeatures[feature.properties.Name] = {
      type: "Feature",
      properties: {
        name: feature.properties.Name
      },
      geometry: {
        type: "MultiPolygon",
        coordinates: []
      }
    };
  })

  districtsGeo.features.forEach((feature) => {
    if (feature.geometry.type === "Polygon"){
      districtFeatures[feature.properties.Name].geometry.coordinates.push(feature.geometry.coordinates)
    }else{
      feature.geometry.coordinates.forEach((polygon) => {
        districtFeatures[feature.properties.Name].geometry.coordinates.push(polygon)
      })
    }
  })

  Object.keys(districtFeatures).forEach((district) => {
    returnGeo.features.push(districtFeatures[district])
  })
  console.log(returnGeo);

  let json = JSON.stringify(returnGeo);

  fs.writeFile('./new_poa_districts.json', json, 'utf8', function (err) {
    if (err) {
      console.log('Une erreur s\'est produite lors de l\'écriture du fichier : ' + err);
    } else {
      console.log('Le fichier a été créé et écrit avec succès.');
    }
  });
});