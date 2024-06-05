import json

import pandas as pd

data_frame = pd.read_csv('dengue_input_simple.csv', delimiter=';')

districts_infos = {}

for index, row in data_frame.iterrows():
    nome_distrito = row['nome_distrito']
    dengue_diagnosis = row['dengue_diagnosis']
    ano = row['ano']
    mes = row['mes']
    chave = row['chave']
    precipitacao = row['precipitacao (mm)']
    temperature = row['temperatura (°C)']
    umidade = row['umidade ar (%)']
    densidade = row['densidade_demografica']
    tminus1 = row['t-1']
    tminus2 = row['t-2']
    tminus3 = row['t-3']
    precipitacao_minus1 = row['precipitacao (mm)-1']
    temperature_minus1 = row['temperatura (°C)-1']
    umidade_minus1 = row['umidade ar (%)-1']
    cod_distrito = row['cod_distrito']

# Minus 1 is minus 1 month so we have duplicates
    district_info = {
        'year': ano,
        'month': mes,
        'key': chave,
        'precipitation': precipitacao,
        # 'precipitation_minus1': precipitacao_minus1,
        'temperature': temperature,
        # 'temperature_minus1': temperature_minus1,
        'humidity': umidade,
        # 'humidity_minus1': umidade_minus1,
        'density': densidade,
        'diseases': dengue_diagnosis,
        # 'diseases_minus1': tminus1,
        # 'diseases_minus2': tminus2,
        # 'diseases_minus3': tminus3
    }
    if nome_distrito in districts_infos:
        if districts_infos[nome_distrito]['district_cod'] != cod_distrito:
            print(nome_distrito + ' has several district codes')
        districts_infos[nome_distrito]['properties'].append(district_info)
    else:
        district = {
            'district_cod': cod_distrito,
            'properties': [district_info]
        }

        districts_infos[nome_distrito] = district

print(json.dumps(districts_infos, indent=4))
print(districts_infos.keys())
print(len(districts_infos.keys()))
import json

# Convertir le dictionnaire en JSON
json_data = json.dumps(districts_infos)

with open("data.json", "w") as fichier:
    fichier.write('const data = ')
    fichier.write(json_data)
