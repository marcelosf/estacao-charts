import Chart from "chart.js";

export class WindChart {
  constructor(labels, dataLeft, directions, ctx, fontSize = 20) {
    this.labels = labels;
    this.dataLeft = dataLeft;
    this.directions = directions;
    this.type = "line";
    this.ctx = ctx;
    this.data = this._setData();
    this.scale = this._setScale();
    this.fontSize = fontSize;
    this.options = this._setOptions();
  }
  _setScale() {
    const suggestedMax = Math.max(...this.dataLeft) + 0.5;
    const suggestedMin = Math.min(...this.dataLeft) - 0.5;

    return { suggestedMin: suggestedMin, suggestedMax: suggestedMax };
  }

  _setData() {
    let self = this;
    return {
      labels: this.labels,
      datasets: [
        {
          label: "Direção e intensidade da Rajada de Vento horária.",
          data: this.dataLeft,
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderColor: "rgba(255,99,132,1)",
          borderWidth: 2,
          yAxisId: "left-y-axis",
          pointStyle: this._getDirectionImages(this.directions),
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
              labelString: "Velocidade do Vento (m/s)",
              fontSize: this.fontSize,
              position: "left",
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

  _getDirectionImages(directions) {
    directions = directions ? directions : [];
    let images = [];
    let self = this;

    directions.forEach(function (element) {
      let direction = self._createDirection(element);
      images.push(direction);
    });

    return images;
  }

  _createDirection(direction) {
    if (!isNaN(direction)) {
      return "circle";
    }

    let directionImage = new Image();

    directionImage.src =
      process.env.MIX_IMAGES + "direction_" + direction + ".png";

    return directionImage;
  }

  _createSvg() {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    const polygon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polygon"
    );

    polygon.setAttribute("points", "30 0,60 60,45 60,45 110,15 110,15 60,0 60");
    polygon.setAttribute("stroke", "black");
    polygon.setAttribute("fill", "black");
    polygon.setAttribute("transform", "rotate(0, 50, 0)");

    svg.appendChild(polygon);

    return svg;
  }
}
