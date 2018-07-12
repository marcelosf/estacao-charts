class Wind extends BaseChart {

    static loadData (actions) {

        let iniDate = $(WIND_INI_DATE_FIELD).val();

        let endDate = $(WIND_END_DATE_FIELD).val();

        let convertediniDate = Data.dateConvert(iniDate);

        this.getDataHandler().loadWind({ini: Data.dateConvert(iniDate), end: Data.dateConvert(endDate)}, function (wind) {

            if (actions) {

                actions(wind);

            }

        });

    }

    static getChart (labels, dataLeft, directions, ctx) {

        let windChart = new WindChart(labels, dataLeft, directions, ctx);

        return windChart.getChart();

    }

    static filterWindDataByDateInterval (iniDate, endDate) {

        let wind = [];
        
        let directions = [];

        let filteredDate = Data.filterDataByDateInterval(iniDate, endDate, WIND_STORAGE, function (data, value, index) {

            wind.push(data.wind[index]);

            directions.push(data.direction[index]);

        });

        return {date: filteredDate, wind: wind, directions: directions};

    }


}