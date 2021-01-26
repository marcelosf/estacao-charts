import Chart from "chart.js";

export class TSeco {
  constructor(labels, dataLeft, dataRight, tMaxMin, ctx, fontSize = false) {
    this.labels = labels;
    this.dataLeft = dataLeft;
    this.dataRight = dataRight;
    this.tMaxMin = tMaxMin;
    this.type = "bar";
    this.ctx = ctx;
    this.fontSize = fontSize ? fontSize : 20;
    this.data = this._setData();
    this.options = this._setOptions();
    this.suggestedMinTemp = 0;
    this.suggestedMaxTemp = 0;
  }

  _setData() {
    const tmin = this._removeNullValues(this.tMaxMin.tmin);
    this.suggestedMaxTemp = Math.max(...this.tMaxMin.tmax) + 2;
    this.suggestedMinTemp = Math.min(...tmin) - 2;

    return {
      labels: this.labels,

      datasets: [
        {
          label: "Temperatura do ar (ºC)",
          data: this.dataLeft,
          backgroundColor: "rgba(255, 255, 255, 0)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 2,
          yAxisId: "left-y-axis",
          type: "line",
        },

        {
          data: this.dataRight,
          label: "Umidade Relativa(%)",
          yAxisID: "right-y-axis",
          backgroundColor: "rgba(255, 255, 255, 0)",
          borderColor: "rgba(100,100,132,20)",
          borderWidth: 2,
          type: "line",
        },

        {
          data: this.tMaxMin.tmax,
          label: "Temperatura Máxima (ºC)",
          yAxisID: "left-y-axis",
          backgroundColor: "rgba(88, 120, 249, 0.5)",
          borderWidth: 2,
          type: "bar",
        },

        {
          data: this.tMaxMin.tmin,
          label: "Temperatura Mínima (ºC)",
          yAxisID: "left-y-axis",
          backgroundColor: "rgba(43, 133, 5, 0.5)",
          borderWidth: 2,
          type: "bar",
        },
      ],
    };
  }

  _removeNullValues(array) {
    return array.filter((element) => {
      return element != null;
    });
  }

  _setOptions() {
    return {
      scales: {
        yAxes: [
          {
            id: "left-y-axis",
            position: "left",
            ticks: {
              suggestedMin: this.suggestedMinTemp,
              suggestedMax: this.suggestedMaxTemp,
            },
            scaleLabel: {
              display: true,
              labelString: "Temperatura (ºC)",
              fontSize: this.fontSize,
              position: "left",
            },
          },

          {
            id: "right-y-axis",
            position: "right",
            ticks: { beginAtZero: true },
            scaleLabel: {
              display: true,
              labelString: "Umidade Relativa (%)",
              position: "right",
              fontSize: this.fontSize,
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
        enabled: true,
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
