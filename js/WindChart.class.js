class WindChart {

    constructor (labels, dataLeft, directions, ctx) {

        this.labels = labels;

        this.dataLeft = dataLeft;

        this.directions = directions;

        this.type = 'line'

        this.ctx = ctx;

        this.data = this._setData();

        this.options = this._setOptions();

    }

    _setData () {

        let self = this;

        return {

            labels: this.labels,

            datasets: [
                {
                    label: 'Vento (m/s) Rajadas observadas período de um dia.',

                    data: this.dataLeft,

                    backgroundColor: 'rgba(255, 255, 255, 0.2)',

                    borderColor: 'rgba(255,99,132,1)',

                    borderWidth: 2,

                    yAxisId: 'left-y-axis',

                    pointStyle: self._getDirectionImages(this.directions)

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

    _getDirectionImages (directions) {

        directions = directions ? directions : [];

        let images = [];

        let self = this;

        directions.forEach(function(element) {

            let direction = self._createDirection(element);

            images.push(direction);

        });

        return images;

    }

    _createDirection (direction) {

        if (!isNaN(direction)) {

            return 'circle';

        }

        let directionImage = new Image();

        directionImage.src = IMAGES + 'direction_' + direction + '.png';

        return directionImage;

    }

}