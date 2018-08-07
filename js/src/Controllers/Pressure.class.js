import {PressureChart} from '../Charts/PressureChart.class';
import {BaseChart} from './BaseChart.class';

export class Pressure extends BaseChart {

    static loadData (actions) {

        let iniDate = $(process.env.MIX_PRESSURE_INI_DATE_FIELD).val();

        let endDate = $(process.env.MIX_PRESSURE_END_DATE_FIELD).val();

        let dataHandler = this.getDataHandler();

        dataHandler.loadPressure({ini: dataHandler.dateConvert(iniDate), end: dataHandler.dateConvert(endDate)}, function (pressure) {

            if (actions) {

                actions(pressure);  

            }

        });

    }

    static getChart (labels, data, ctx) {
        
        let formattedDates = this.dateToBRFormat(labels, true);

        let pressureChart = new PressureChart(formattedDates, data, ctx);
        
        return pressureChart.getChart();

    }

    static filterPressureDataByDateInterval (iniDate, endDate) {

        let pressure = [];
        
        let date = [];

        let filteredDate = this.getDataHandler().filterDataByDateInterval(iniDate, endDate, process.env.MIX_PRESSURE_STORAGE, function (data, value, index) {

            pressure.push(data.data[index]);

        });

        return {date: filteredDate, pressure: pressure}

    }

}