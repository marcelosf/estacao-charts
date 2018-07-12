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

    $('#wind-button').click(function () { windInitialize(); });

    $('#pressure-button').click(function () { pressureInitialize() });

    $('#date-period-button').click(function () { temperatureInitialize() });

});


function temperatureInitialize () {

    Temperature.loadData(function (temperature) {

        Temperature.destroy(window.temperature);
        
        let ctx = $('#tseco');

        window.temperature = Temperature.getChart(temperature.date, temperature.data, temperature.humidity, ctx);

    });

    Temperature.setSlideRange('temperature', {days:1}, {min: {days: 1}, max: {years: 60}});

    $("#temperature-slider-range").on("userValuesChanged", function (e, data) {

        Temperature.destroy(window.temperature);
       
        window.temperature = Temperature.updateChart(data, data.values.min, data.values.max, '#tseco');

    });

}

function pressureInitialize () {

    Pressure.loadData(function (pressure) {

        Pressure.destroy(window.pressure);
        
        let ctx = $('#pressure');

        window.pressure = Pressure.getChart(pressure.date, pressure.data, ctx);

    });

    // Pressure.setSlideRange('pressure', {hour: 1}, {min: {hour: 1}, max: {hour: 23}});

    // window.pressure = {};

    // $("#pressure-slider-range").on("userValuesChanged", function (e, data) {

    //     Pressure.destroy(window.pressure);

    //     window.pressure = Pressure.updateChart(data, data.values.min, data.values.max, '#pressure');

    // });

}

function windInitialize () {

    Wind.loadData(function (wind) {

        Wind.destroy(window.wind);
        
        let ctx = $('#wind');

        window.wind = Wind.getChart(wind.date, wind.wind, wind.direction, ctx);

    });

    Wind.setSlideRange('wind', {days:1}, {min: {days:1}, max: {years: 60}});

    $("#wind-slider-range").on("userValuesChanged", function (e, data) {

        Wind.destroy(window.wind);
       
        window.wind = Wind.updateChart(data, data.values.min, data.values.max, '#wind');

    });

}
