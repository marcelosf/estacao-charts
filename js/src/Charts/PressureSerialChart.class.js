import Chart from "chart.js";

export class PressureSerialChart {
  constructor(labels, dataLeft, dataRight, ctx, fontSize = false) {
    this.labels = labels;
    this.dataLeft = dataLeft;
    this.dataRight = dataRight;
    this.ctx = ctx;
    this.fontSize = fontSize;
    this.data = this._setData();
    this.scale = this._setScale();
    this.options = this._setOptions();
  }

  _setScale() {
    const suggestedMax = Math.max(...this.dataRight) + 5;
    const suggestedMin = Math.min(...this.dataRight) - 5;

    return { suggestedMax: suggestedMax, suggestedMin: suggestedMin };
  }

  _setData() {
    return {
      labels: this.labels,
      datasets: [
        {
          label: "Pressão Atmosférica",
          data: this.dataRight,
          backgroundColor: "rgba(255, 255, 255, 0)",
          borderColor: "rgba(100,100,132,20)",
          borderWidth: 2,
          yAxisID: "left-y-axis",
          type: "line",
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
              labelString: "Pressão Atmosféricas (hpa)",
              fontSize: this.fontSize,
              position: "left",
            },
          },
        ],
        xAxes: [
          {
            scaleLabel: {
              fontSize: this.fontSize,
            },
          },
        ],
      },
      tooltips: {
        titleFontSize: 22,
        bodyFontSize: this.fontSize,
        enable: true,
      },
      legend: {
        labels: {
          fontSize: this.fontSize,
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
