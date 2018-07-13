class Precipitation extends BaseChart {

    static loadData (actions) {

        let iniDate = $(PRECIPITATION_INI_DATE_FIELD).val();

        let endDate = $(PRECIPITATION_END_DATE_FIELD).val();

        let convertediniDate = Data.dateConvert(iniDate);

        this.getDataHandler().loadPrecipitation({ini: Data.dateConvert(iniDate), end: Data.dateConvert(endDate)}, function (wind) {

            if (actions) {

                actions(wind);

            }

        });

    }

    static getChart (labels, precipitation, duration, ctx) {

        let precipitationChart = new PrecipitationChart(labels, precipitation, duration, ctx);

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