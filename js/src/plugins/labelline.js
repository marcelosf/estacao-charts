export const labelline = {
  id: "labelline",

  afterLayout(chart, options) {
    const { ctx } = chart;
    const chartOptions = chart.options;

    console.log(chart);
    ctx.save();
    ctx.restore();
  },
};
