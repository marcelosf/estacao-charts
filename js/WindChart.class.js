class WindChart {

    constructor (labels, dataLeft, dataRight, ctx) {

        this.labels = labels;

        this.dataLeft = dataLeft;

        this.dataRight = dataRight;

        this.type = 'line'

        this.ctx = ctx;

        this.data = this._setData();

        this.options = this._setOptions();

        this.image = this._getDirectionImage();

    }

    _setData () {

        return {

            labels: this.labels,

            datasets: [
                {
                    label: 'Vento (m/s)',

                    data: this.dataLeft,

                    backgroundColor: 'rgba(255, 255, 255, 0.2)',

                    borderColor: 'rgba(255,99,132,1)',

                    borderWidth: 2,

                    yAxisId: 'left-y-axis',

                },

                {

                    data: this.dataRight,

                    label: 'Direção',
                    
                    yAxisID: 'right-y-axis',
                    
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    
                    borderColor: 'rgba(100,100,132,20)',
                    
                    borderWidth: 2,
        
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
        
                            labelString: 'Vento (m/s)',
        
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

                            labelString: 'Direção (graus)',

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

    _getDirectionImage () {

        let image =  new Image(5,5);

        image.src = 'http://www.progression.me/wp-content/uploads/2016/09/blog-reading-the-conditions-arrow.png';

        return image;

    }

}