export const labelline = {
  id: "labelline",

  afterLayout(chart, options) {
    const { ctx } = chart;
    const chartOptions = chart.options;
    ctx.save();
    ctx.restore();
  },
};
