import Chart from 'chart.js';

export class PrecipitationChart {

    constructor (labels, precipitation, duration, ctx) {

        this.labels = labels;

        this.precipitation = precipitation;

        this.duration = duration;

        this.type = 'bar';

        this.ctx = ctx;

        this.data = this._setData();

        this.options = this._setOptions();

    }

    _setData () {

        return {

            labels: this.labels,

            datasets: [
                {
                    label: 'Precipitação (mm)',

                    data: this.precipitation,

                    backgroundColor: 'rgba(255, 255, 255, 0)',

                    borderColor: 'rgba(255,99,132,1)',

                    borderWidth: 2,

                    yAxisId: 'left-y-axis',

                    type: 'bar'
                },

                {

                    data: this.duration,

                    label: 'Duração (min)',
                    
                    yAxisID: 'right-y-axis',
                    
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    
                    borderColor: 'rgba(100,100,132,20)',
                    
                    borderWidth: 2,

                    type: 'bar'
        
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
        
                            labelString: 'Precipitação (mm)',
        
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

                            labelString: 'Duração (min)',

                            position: 'right',

                            fontSize: 20

                        }

                    },

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