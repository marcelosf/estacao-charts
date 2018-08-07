import {WindChart} from '../Charts/WindChart.class';
import {BaseChart} from './BaseChart.class';

export class Wind extends BaseChart {

    static loadData (actions) {

        let iniDate = $(process.env.MIX_WIND_INI_DATE_FIELD).val();

        let endDate = $(process.env.MIX_WIND_END_DATE_FIELD).val();

        let dataHandler = this.getDataHandler();

        let convertediniDate = dataHandler.dateConvert(iniDate);

        this.getDataHandler().loadWind({ini: dataHandler.dateConvert(iniDate), end: dataHandler.dateConvert(endDate)}, function (wind) {

            if (actions) {

                actions(wind);

            }

        });

    }

    static getChart (labels, dataLeft, directions, ctx) {

        let labelsFormatted = this.dateToBRFormat(labels, true);

        let windChart = new WindChart(labelsFormatted, dataLeft, directions, ctx);

        return windChart.getChart();

    }

    static filterWindDataByDateInterval (iniDate, endDate) {

        let wind = [];
        
        let directions = [];

        let filteredDate = this.getDataHandler().filterDataByDateInterval(iniDate, endDate, process.env.MIX_WIND_STORAGE, function (data, value, index) {

            wind.push(data.wind[index]);

            directions.push(data.direction[index]);

        });

        return {date: filteredDate, wind: wind, directions: directions};

    }

    static updateChart (data, iniDate, endDate, context) {

        let ini = this.dateFormat(iniDate);

        let end = this.dateFormat(endDate);

        let filteredData = this.filterWindDataByDateInterval(ini, end);
        
        let ctx = $(context);

        return this.getChart(filteredData.date, filteredData.wind, filteredData.directions, ctx);

    }



}