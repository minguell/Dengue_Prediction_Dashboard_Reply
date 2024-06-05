// The color list must be the coldest first
export const getGradientValue = (value: number, minValue: number, maxValue: number, colors: string[]) => {
  const nbColors = colors.length;
  const step = (maxValue - minValue) / nbColors;
  for (let i = nbColors - 1; i > 0; i--){
    if (value >= minValue + i * step){
      return colors[i];
    }
  }
  return colors[0];
}

export const getGradientLegend = (minValue: number, maxValue: number, colors: string[]) => {
  let legend: {color: string, name: string}[] = [];
  const nbColors = colors.length;
  const step = (maxValue - minValue) / nbColors;
  let value = Math.floor(minValue + step);

  legend.push({
    color: colors[0],
    name: minValue + " - " + value
  });


  for (let index = 1; index < nbColors - 1; index++){
    const nextValue = Math.floor(value + step)
    legend.push({
        color: colors[index],
        name: (value + 1) + " - " + nextValue
      }
    );
    value = nextValue;
  }

  legend.push({
    color: colors[nbColors - 1],
    name: value + " - " + maxValue + "+"
  })
  return legend;
}