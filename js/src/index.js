/**
 * Charts
 */
import Chart           from 'chart.js';
import {Temperature}   from './Controllers/Temperature.class';
import {Pressure}      from './Controllers/Pressure.class';
import {Wind}          from './Controllers/Wind.class';
import {Precipitation} from './Controllers/Precipitation.class';

/**
 * Fileds
 */
import {PeriodFieldConfig} from './Resources/periodField';

$(document).ready(function () {

    Chart.defaults.global.defaultFontSize = process.env.MIX_CHART_LABLE_SIZE;

    PeriodFieldConfig.initialize();

    temperatureInitialize();

    $('#tabs').tabs({

        activate (event, ui) {
  
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

                case 3:

                    precipitationInitialize();

                    break;

            }
  
        }
  
    });

    $('#wind-button').click(function () { windInitialize(); });

    $('#pressure-button').click(function () { pressureInitialize() });

    $('#date-period-button').click(function () { temperatureInitialize(); });

    $('#precipitation-button').click(function () { precipitationInitialize(); });

});


function temperatureInitialize () {

    Temperature.loadData(function (temperature) {

        Temperature.destroy(window.temperature);
        
        let ctx = $('#tseco');

        let tMaxMin = {tmax: temperature.maxTemperature, tmin: temperature.minTemperature};

        window.temperature = Temperature.getChart(temperature.date, temperature.data, temperature.humidity, tMaxMin, ctx);

    });

}

function pressureInitialize () {

    Pressure.loadData(function (pressure) {

        Pressure.destroy(window.pressure);
        
        let ctx = $('#pressure');

        window.pressure = Pressure.getChart(pressure.date, pressure.data, ctx);

    });

}

function windInitialize () {

    Wind.loadData(function (wind) {

        Wind.destroy(window.wind);
        
        let ctx = $('#wind');

        window.wind = Wind.getChart(wind.date, wind.wind, wind.direction, ctx);

    });

}

function precipitationInitialize () {

    Precipitation.loadData(function (precipitation) {

        Precipitation.destroy(window.precipitation);

        let ctx = $('#prec');

        window.precipitation = Precipitation.getChart(precipitation.date, precipitation.precipitation, precipitation.duration, ctx);

    });

}
