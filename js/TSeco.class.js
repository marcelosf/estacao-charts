class TSeco {

    constructor (labels, dataLeft, dataRight, tMaxMin, ctx) {

        this.labels = labels;

        this.dataLeft = dataLeft;

        this.dataRight = dataRight;

        this.tMaxMin = tMaxMin;

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
                    label: 'Temperatura de Bulbo Seco',

                    data: this.dataLeft,

                    backgroundColor: 'rgba(255, 255, 255, 0)',

                    borderColor: 'rgba(255,99,132,1)',

                    borderWidth: 2,

                    yAxisId: 'left-y-axis',

                    type: 'line'
                },

                {

                    data: this.dataRight,

                    label: 'Umidade Relativa(%)',
                    
                    yAxisID: 'right-y-axis',
                    
                    backgroundColor: 'rgba(255, 255, 255, 0)',
                    
                    borderColor: 'rgba(100,100,132,20)',
                    
                    borderWidth: 2,

                    type: 'line'
        
                },

                {

                    data: this.tMaxMin.tmax,

                    label: 'Temperatura Máxima',

                    yAxisID: 'left-y-axis',

                    backgroundColor: 'rgba(88, 120, 249, 0.5)',

                    borderWidth: 2,

                    type: 'bar'

                },
                 
                {

                    data: this.tMaxMin.tmin,

                    label: 'Temperatura Mínima',

                    yAxisID: 'left-y-axis',

                    backgroundColor: 'rgba(43, 133, 5, 0.5)',

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
        
                            labelString: 'Temperatura(ºC)',
        
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

                            labelString: 'Umidade Relativa(%)',

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