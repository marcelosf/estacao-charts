$(document).ready(function () {

    Temperature.loadData();

    Temperature.setSlideRange();

    $("#slider-range").on("userValuesChanged", function (e, data) {

        Temperature.updateChart(data, data.values.min, data.values.max, '#tseco');

    });

    let dateFileds = Temperature.getDateFields();

    Temperature.getTSecoData(function (interval) {

        let ctx = $('#tseco');

        let tSecoChart = Temperature.getChart(interval.date, interval.data, interval.humidity, ctx);

    });

});
