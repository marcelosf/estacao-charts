import Chart from 'chart.js';

export class PressureSerialChart {
    constructor(labels, dataLeft, dataRight, ctx, fontSize=false) {
        this.labels = labels;
        this.dataLeft = dataLeft;
        this.dataRight = dataRight;
        this.ctx = ctx;
        this.fontSize = fontSize;
        this.data = this._setData();
        this.options = this._setOptions();
    }

    _setData() {
        return {
            labels: this.labels,
            datasets: [
                {
                    label: 'Pressão Atmosférica(mmgHg)',
                    data: this.dataLeft,
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 2,
                    yAxisID: 'left-y-axis',
                    type: 'line'
                },
                {
                    label: 'Pressão Atmosférica(hpa)',
                    data: this.dataRight,
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    borderColor: 'rgba(100,100,132,20)',
                    borderWidth: 2,
                    yAxisID: 'right-y-axis',
                    type: 'line'
                }
            ]
        }
    }

    _setOptions() {
        return {
            scales: {
                yAxes: [
                    {
                        id: 'left-y-axis',
                        position: 'left',
                        ticks: {beginAtZero: true},
                        scaleLabel: {
                            display: true,
                            labelString: 'Pressão mmgH',
                            fontSize: this.fontSize,
                            position: 'left'
                        }
                    },
                    {
                        id: 'right-y-axis',
                        position: 'right',
                        ticks: {beginAtZero: true},
                        scaleLabel: {
                            display: true,
                            labelString: 'Pressão hpa',
                            fontSize: this.fontSize,
                            position: 'right'
                        }
                    }
                ],
                xAxes: [
                    {
                        scaleLabel: {
                            fontSize: this.fontSize
                        }
                    }
                ]
            },
            tooltips: {
                titleFontSize: 22,
                bodyFontSize: this.fontSize,
                enable: true
            },
            legend: {
                labels: {
                    fontSize: this.fontSize
                }
            }
        }
    }

    getChart() {
        return new Chart(this.ctx, {
            type: this.type,
            data: this.data,
            options: this.options
        });
    }

    destroy(chart) {
        chart.destroy();
    }
}


