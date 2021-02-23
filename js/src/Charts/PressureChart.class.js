import Chart from "chart.js";

export class PressureChart {
  constructor(labels, data, ctx) {
    this.labels = labels;

    this.pressure = data;

    this.ctx = ctx;

    this.type = "line";

    this.data = this._setData();
    this.scale = this._setScale();
    this.options = this._setOptions();
  }

  _setScale() {
    const suggestedMax = Math.max(...this.pressure) + 5;
    const suggestedMin = Math.min(...this.pressure) - 5;

    return { suggestedMax: suggestedMax, suggestedMin: suggestedMin };
  }

  _setData() {
    return {
      labels: this.labels,

      datasets: [
        {
          label: "Pressão Atmosférica (hpa)",

          data: this.pressure,

          backgroundColor: "rgba(255, 255, 255, 0)",

          borderColor: "rgba(100,100,132,20)",

          borderWidth: 2,

          yAxisId: "left-y-axis",

          showLines: false,
        },
      ],
    };
  }

  _setOptions() {
    return {
      scales: {
        yAxes: [
          {
            id: "left-y-axis",

            position: "left",

            ticks: {
              suggestedMin: this.scale.suggestedMin,
              suggestedMax: this.scale.suggestedMax,
            },

            scaleLabel: {
              display: true,

              labelString: "Pressão Atmosférica (hpa)",

              fontSize: 20,

              position: "left",
            },
          },
        ],

        xAxes: [
          {
            scaleLabel: {
              fontSize: 20,
            },
          },
        ],
      },

      tooltips: {
        titleFontSize: 22,

        bodyFontSize: 20,

        enabled: true,
      },

      legend: {
        labels: {
          fontSize: 20,
        },
      },
    };
  }

  getChart() {
    return new Chart(this.ctx, {
      type: this.type,

      data: this.data,

      options: this.options,
    });
  }

  destroy(chart) {
    chart.destroy();
  }
}
