class Pressure extends BaseChart {

    static loadData () {

        let iniDate = $(PRESSURE_INI_DATE_FIELD).val();

        let endDate = $(PRESSURE_END_DATE_FIELD).val();

        let convertediniDate = Data.dateConvert(date);

        this.getDataHandler().loadPressure({ini: Data.dateConvert(iniDate), end: Data.dateConvert(endDate)});

    }

    static updateChart (data, iniDate, endDate) {

        let ini = this.dateFormat(iniDate);

        let end = this.dateFormat(endDate);

        let filteredData = this.filterPressureDataByDateInterval(ini, end);

        console.log(filteredData);
        

        return this.getChart(filteredData.date, filteredData.pressure, PRESSURE_STORAGE);

    }

    static getChart (labels, data, ctx) {
              
        let pressureChart = new PressureChart(labels, data, ctx);
        
        return pressureChart.getChart();

    }

    static getPressureData (actions) {

        this.getStoredData(PRESSURE_STORAGE, function (pressure) {

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