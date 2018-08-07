import {BaseChart} from './BaseChart.class';
import {TSeco} from '../Charts/TSeco.class';

export class Temperature extends BaseChart
{
    
    static updateChart (data, dateIni, dateEnd, context) {

        let ini = this.dateFormat(dateIni);

        let end = this.dateFormat(dateEnd);

        let filteredData = this.getDataHandler().filterDataByDate(ini, end);

        let tMaxMin = {tmax: filteredData.maxTemperature, tmin: filteredData.minTemperature}

        let ctx = $(context);

        return this.getChart(filteredData.date, filteredData.data, filteredData.humidity, tMaxMin,  ctx);

    }

    static loadData (actions) {

        let initialDate = $('#temperature-ini-date-field').val();

        let endDate = $('#temperature-end-date-field').val();

        let data = this.getDataHandler();

        data.loadDataByDateInterval(data.dateConvert(initialDate), data.dateConvert(endDate), function (temperature) {

            if (actions) {

                actions(temperature);

            }

        });

    }

    static getChart (labels, dataLeft, dataRight, tMaxMin, ctx) {

        let formattedDates = this.dateToBRFormat(labels, false);

        let tSeco = new TSeco(formattedDates, dataLeft, dataRight, tMaxMin, ctx);

        return tSeco.getChart();

    }

    static getTSecoData (actions) {

        let data = this.getDataHandler().getSavedData(process.env.MIX_DATA_INTERVAL_STORAGE);

        actions(data);

    }

}