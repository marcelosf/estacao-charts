import Chart from 'chart.js';

export class PressureChart {

    constructor (labels, data, ctx) {

        this.labels = labels;

        this.pressure = data;

        this.ctx = ctx;

        this.type = 'line'

        this.data = this._setData();

        this.options = this._setOptions();

    }

    _setData () {

        return {

            labels: this.labels,

            datasets: [
                {
                    label: 'Pressão Atmosférica(mmHg)',

                    data: this.pressure,

                    backgroundColor: 'rgba(255, 255, 255, 0.2)',

                    borderColor: 'rgba(255,99,132,1)',

                    borderWidth: 2,

                    yAxisId: 'left-y-axis',

                    showLines: false
                },

                {

                    data: this.dataRight,

                    label: 'Pressão a Gravidade Normal(hPa)',
                    
                    yAxisID: 'right-y-axis',
                    
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    
                    borderColor: 'rgba(100,100,132,20)',
                    
                    borderWidth: 2
        
                }
            ]

        }

    }

    _setOptions () {

        return {

            scales: {

                yAxes: [

                    {
                        id: 'left-y-axis',

                        position: 'left',

                        ticks: {beginAtZero: true},

                        scaleLabel: {

                            display: true,
        
                            labelString: 'Pressão Atmosférica(mmHg)',
        
                            fontSize: 20,

                            position: 'left'
        
                        }

                    },

                    {

                        id: 'right-y-axis',

                        position: 'right',

                        ticks: {beginAtZero: true},

                        scaleLabel: {

                            display: true,

                            labelString: 'Pressão a Gravidade Normal(hPa)',

                            position: 'right',

                            fontSize: 20

                        }

                    }

                ],

                xAxes: [

                    {

                        scaleLabel: {

                            fontSize: 20

                        }

                    }

                ]

            },

            tooltips: {

                titleFontSize: 22,

                bodyFontSize: 20,

                enabled: true

            },

            legend: {

                labels: {

                    fontSize: 20

                }

            }

        }    

    }

    getChart () {

        return new Chart(this.ctx, {

            type: this.type,

            data: this.data,

            options: this.options

        });

    }

    destroy (chart) {

        chart.destroy();

    }

}