class Pressure extends BaseChart {

    static loadData (actions) {

        let iniDate = $(PRESSURE_INI_DATE_FIELD).val();

        let endDate = $(PRESSURE_END_DATE_FIELD).val();

        this.getDataHandler().loadPressure({ini: Data.dateConvert(iniDate), end: Data.dateConvert(endDate)}, function (pressure) {

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

        let filteredDate = Data.filterDataByDateInterval(iniDate, endDate, PRESSURE_STORAGE, function (data, value, index) {

            pressure.push(data.data[index]);

        });

        return {date: filteredDate, pressure: pressure}

    }

}