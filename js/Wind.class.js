class Wind extends BaseChart {

    static loadData () {

        let iniDate = $(WIND_INI_DATE_FIELD).val();

        let endDate = $(WIND_END_DATE_FIELD).val();

        let convertediniDate = Data.dateConvert(iniDate);

        this.getDataHandler().loadWind({ini: Data.dateConvert(iniDate), end: Data.dateConvert(endDate)});

    }

    static getWindData (actions) {

        let data = this.getDataHandler().getSavedData(WIND_STORAGE);

        actions(data);

    }

    static getChart (labels, dataLeft, dataRight, ctx) {

        let windChart = new WindChart(labels, dataLeft, dataRight, ctx);

        return windChart.getChart();

    }

    static destroy (chart) {

        chart.destroy();

    }

}