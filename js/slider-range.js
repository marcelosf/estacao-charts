$(document).ready(function () {

    Temperature.loadData();

    Temperature.setSlideRange();

    window.chart = {};

    $("#slider-range").on("userValuesChanged", function (e, data) {

        Temperature.destroy(window.chart);
       
        window.chart = Temperature.updateChart(data, data.values.min, data.values.max, '#tseco');

    });

    let dateFileds = Temperature.getDateFields();

    Temperature.getTSecoData(function (interval) {

        let ctx = $('#tseco');

        window.chart = Temperature.getChart(interval.date, interval.data, interval.humidity, ctx);

    });

});
