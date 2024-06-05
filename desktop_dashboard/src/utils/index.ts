const legendColors = [
  "#7cb342",
  "#ffea00",
  "#f57c00",
  "#ff5f5f",
  "#ff5252"
];

export const getCircleColor = (value: number, minValue: number, maxValue: number) => {
  let step = (maxValue - minValue) / 5;
  return value > minValue + 4 * step ? "#ff5252" :
    value > minValue + 3 * step ? "#ff5f5f" :
      value > minValue + 2 * step ? "#f57c00" :
        value >= minValue + step ? "#ffea00" :
          "#7cb342";
};

export function getLegend(minValue: number, maxValue: number) {
  let legend: {color: string, name: string}[] = [];
  const nbColors = legendColors.length;
  const step = (maxValue - minValue) / nbColors;
  let value = Math.floor(minValue + step);

  legend.push({
    color: legendColors[0],
    name: minValue + " - " + value
  });


  for (let index = 1; index < nbColors - 1; index++){
    const nextValue = Math.floor(value + step)
    legend.push({
        color: legendColors[index],
        name: (value + 1) + " - " + nextValue
      }
    );
    value = nextValue;
  }

  legend.push({
    color: legendColors[nbColors - 1],
    name: value + " - " + maxValue + "+"
  })
  return legend;
}