const fs = require('fs');

function getMaxYear(districts, data) {
    let maxYear = 0
    districts.forEach((district) => {
        data[district].properties.forEach((date) => {
            maxYear = (date.year > maxYear) ? date.year : maxYear
        })
    })
    return maxYear
}

function getMinYear(districts, data) {
    let minYear = Infinity
    districts.forEach((district) => {
        data[district].properties.forEach((date) => {
            minYear = (date.year < minYear) ? date.year : minYear
        })
    })
    return minYear
}

fs.readFile('./data.json', 'utf8', (err, dataString) => {
    if (err) {
        console.log('Une erreur s\'est produite lors de la lecture du fichier : ' + err);
    } else {
        try {
            let districts = [];
            const data = JSON.parse(dataString);
            for (const district in data) {
                districts.push(district);
            }
            const minYear = getMinYear(districts, data);
            const maxYear = getMaxYear(districts, data);

            let jsonData = {};

            districts.forEach((district) => {
                jsonData[district] = {}
                for (let y = minYear; y <= maxYear; y++) {
                    jsonData[district][y] = new Array(13).fill(-1);
                    for (let m = 1; m < 13; m++) {
                        jsonData[district][y][m] = 0;
                        data[district].properties.forEach((info) => {
                            if (info.year === y && info.month === m) {
                                jsonData[district][y][m] += info.diseases
                            }
                        })
                    }
                }
            })
            /*
                        for (let y = minYear; y <= maxYear; y++) {
                            jsonData[y] = new Array(13).fill({});
                            for (let m = 1; m < 13; m++) {
                                districts.forEach((district) => {
                                    jsonData[y][m][district] = 0
                                    data[district].properties.forEach((info) => {
                                        if (info.year === y && info.month === m) {
                                            jsonData[y][m][district] += info.diseases
                                        }
                                    })
                                })
                            }
                        }
            */
            let json = JSON.stringify(jsonData);

            fs.writeFile('../dashboard_app/assets/data.json', json, 'utf8', function (err) {
                if (err) {
                    console.log('Une erreur s\'est produite lors de l\'écriture du fichier : ' + err);
                } else {
                    console.log('Le fichier a été créé et écrit avec succès.');
                }
            });


        } catch (error) {
            console.log('Une erreur s\'est produite lors du parsing du fichier JSON : ' + error);
        }
    }
});