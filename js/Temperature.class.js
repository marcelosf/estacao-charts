class Temperature extends BaseChart
{
    
    static updateChart (data, dateIni, dateEnd, context) {

        let ini = this.dateFormat(dateIni);

        let end = this.dateFormat(dateEnd);

        let filteredData = this.getDataHandler().filterDataByDate(ini, end);

        let ctx = $(context);

        return this.getChart(filteredData.date, filteredData.data, filteredData.humidity, ctx);

    }

    static loadData () {

        let initialDate = $('#temperature-ini-date-field').val();

        let endDate = $('#temperature-end-date-field').val();

        let data = this.getDataHandler();

        data.loadDataByDateInterval(data.dateConvert(initialDate), data.dateConvert(endDate));

    }

    static getChart (labels, dataLeft, dataRight, ctx) {

        let tSeco = new TSeco(labels, dataLeft, dataRight, ctx);

        return tSeco.getChart();

    }

    static getTSecoData (actions) {

        let data = this.getDataHandler().getSavedData(DATA_INTERVAL_STORAGE);

        console.log(DATA_INTERVAL_STORAGE);

        actions(data);

    }

}