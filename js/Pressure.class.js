class Pressure extends BaseChart {

    static loadData () {

        let iniDate = $('#pressure-ini-date-field').val();

        let endDate = $('#pressure-end-date-field').val();

        let dataHandler = this.getDataHandler();

        dataHandler.loadPressure({

            ini: Data.dateConvert(iniDate),

            end: Data.dateConvert(endDate)

        });

    }

    static updateChart (iniDate, endDate) {

        let ini = this.dateFormat(iniDate);

        let end = this.dateFormat(endDate);

        let filteredData = this.filterPressureDataByDateInterval(ini, end);

        return this.getChart(filteredData.date, filteredData.data, PRESSURE_STORAGE);

    }

    static getChart (labels, data, ctx) {
              
        let pressureChart = new PressureChart(labels, data, ctx);
        
        return pressureChart.getChart();

    }

    static getPressureData (actions) {

        this.getStotredData(PRESSURE_STORAGE, function (pressure) {

            actions(pressure);

        });

    }

    static filterPressureDataByDateInterval (iniDate, endDate) {

        let pressure = [];
        
        let date = [];

        let filteredDate = Data.filterDataByDateInterval(iniDate, endDate, PRESSURE_STORAGE, function (data, value, index) {

            pressure.push(data.data[index]);

        });

        return {date: filteredDate, pressure: pressure}

    }

}