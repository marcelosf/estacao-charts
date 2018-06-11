$(document).ready(function () {

    Temperature.loadData();

    Temperature.setSlideRange('temperature', {days: 1}, {min: {days: 1}, max: {years: 60}});

    Pressure.loadData();

    Pressure.setSlideRange('pressure', {hours: 1}, {min: {hour: 1}, max: {days: 4}});

    window.chart = {};

    window.pressure = {};

    $("#temperature-slider-range").on("userValuesChanged", function (e, data) {

        Temperature.destroy(window.chart);
       
        window.chart = Temperature.updateChart(data, data.values.min, data.values.max, '#tseco');

    });

    $("#pressure-slider-range").on("userValuesChanged", function (e, data) {

        Pressure.destroy(window.pressure);

        window.pressure = Pressure.updateChart(data, data.values.min, data.values.max, '#pressure');

    });

    Temperature.getTSecoData(function (interval) {

        let ctx = $('#tseco');

        window.chart = Temperature.getChart(interval.date, interval.data, interval.humidity, ctx);

    });

    Pressure.getPressureData(function (pressure) {
        
        let ctx = $('#pressure');

        window.pressure = Pressure.getChart(pressure.date, pressure.data, ctx);

    });

});
