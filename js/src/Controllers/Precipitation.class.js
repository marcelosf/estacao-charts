import {PrecipitationChart} from '../Charts/PrecipitationChart';
import {BaseChart} from './BaseChart.class';

export class Precipitation extends BaseChart {

    static loadData (actions) {

        let iniDate = $(process.env.MIX_PRECIPITATION_INI_DATE_FIELD).val();

        let endDate = $(process.env.MIX_PRECIPITATION_END_DATE_FIELD).val();

        let dataHandler = this.getDataHandler();

        let convertediniDate = dataHandler.dateConvert(iniDate);

        dataHandler.loadPrecipitation({ini: dataHandler.dateConvert(iniDate), end: dataHandler.dateConvert(endDate)}, function (wind) {

            if (actions) {

                actions(wind);

            }

        });

    }

    static getChart (labels, precipitation, duration, ctx) {

        let formattedDates = this.dateToBRFormat(labels, false);

        let precipitationChart = new PrecipitationChart(formattedDates, precipitation, duration, ctx);

        return precipitationChart.getChart();

    }

    static filterPrecipitationDataByDateInterval (iniDate, endDate) {

        let precipitation = [];
        
        let duration = [];

        let filteredDate = Data.filterDataByDateInterval(iniDate, endDate, PRECIPITATION_STORAGE, function (data, value, index) {

            precipitation.push(data.precipitation[index]);

            duration.push(data.duration[index]);

        });

        return {date: filteredDate, precipitation: precipitation, duration: duration};

    }


}