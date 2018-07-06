$(document).ready(function () {

    temperatureInitialize();

    $('#tabs').tabs({

        activate: function(event, ui) {
  
            let currentTab = $('#tabs').tabs('option', 'active');

            switch (currentTab) {

                case 0:

                    temperatureInitialize();

                    break;

                case 1:

                    pressureInitialize();

                    break;

                case 2:

                    windInitialize();

                    break;

            }
  
        }
  
    });

});


function temperatureInitialize () {

    Temperature.loadData();

    Temperature.setSlideRange('temperature', {days:1}, {min: {days: 1}, max: {years: 60}});

    window.chart = {};

    $("#temperature-slider-range").on("userValuesChanged", function (e, data) {

        Temperature.destroy(window.chart);
       
        window.chart = Temperature.updateChart(data, data.values.min, data.values.max, '#tseco');

    });

    Temperature.getTSecoData(function (interval) {

        let ctx = $('#tseco');

        window.chart = Temperature.getChart(interval.date, interval.data, interval.humidity, ctx);

    });

}

function pressureInitialize () {

    Pressure.loadData();

    // Pressure.setSlideRange('pressure', {hour: 1}, {min: {hour: 1}, max: {hour: 23}});

    window.pressure = {};

    // $("#pressure-slider-range").on("userValuesChanged", function (e, data) {

    //     Pressure.destroy(window.pressure);

    //     window.pressure = Pressure.updateChart(data, data.values.min, data.values.max, '#pressure');

    // });

    Pressure.getPressureData(function (pressure) {

        let ctx = $('#pressure');

        window.pressure = Pressure.getChart(pressure.date, pressure.data, ctx);

    });

}
