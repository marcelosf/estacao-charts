class TSeco {

    constructor (labels, dataLeft, dataRight, ctx) {

        this.labels = labels;

        this.dataLeft = dataLeft;

        this.dataRight = dataRight;

        this.type = 'line'

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

                    backgroundColor: 'rgba(255, 255, 255, 0.2)',

                    borderColor: 'rgba(255,99,132,1)',

                    borderWidth: 1,

                    yAxisId: 'left-y-axis'
                },

                {

                    data: this.dataRight,

                    label: 'Umidade Relativa',
                    
                    yAxisID: 'right-y-axis',
                    
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    
                    borderColor: 'rgba(100,100,132,20)',
                    
                    borderWidth: 1
        
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
        
                            labelString: 'Temperatura',
        
                            position: 'left'
        
                        }

                    },

                    {

                        id: 'right-y-axis',

                        position: 'right',

                        ticks: {beginAtZero: true},

                        scaleLabel: {

                            display: true,

                            labelString: 'Umidade Relativa',

                            position: 'right'

                        }

                    }

                ]

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

    setLabels (labels) {

        this.labels = labels;

    }

    setData (data) {

        this.data = data;

    }

}