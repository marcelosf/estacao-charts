class Temperature 
{
    
    static setSlideRange () {

        let dateFields = this.getDateFields();

        $("#slider-range").dateRangeSlider({

            bounds: {
     
                 min: this.getDateObject(this.getDataHandler().dateConvert(dateFields.minDate)),
     
                 max: this.getDateObject(this.getDataHandler().dateConvert(dateFields.maxDate))
     
            }
     
         });

    }

    static updateChart (data, dateIni, dateEnd, context) {

        let ini = this.dateFormat(dateIni);

        let end = this.dateFormat(dateEnd);

        let filteredData = this.getDataHandler().filterDataByDate(ini, end);

        let ctx = $(context);

        this.getChart(filteredData.date, filteredData.data, filteredData.humidity, ctx);

    }
    
    static loadData () {

        let initialDate = $('#initial-date-field').val();

        let endDate = $('#end-date-field').val();

        let data = this.getDataHandler();

        data.loadDataByDateInterval(data.dateConvert(initialDate), data.dateConvert(endDate));

    }

    static getDateFields () {

        return {

            minDate: $('#initial-date-field').val(),
    
            maxDate: $('#end-date-field').val()
    
        }

    }

    static getChart (labels, dataLeft, dataRight, ctx) {

        let tSeco = new TSeco(labels, dataLeft, dataRight, ctx);

        return tSeco.getChart();

    }
    
    static dateFormat (date) {

        return date.toISOString();

    }

    static getTSecoData (actions) {

        actions(this.getDataHandler().getSavedData(DATA_INTERVAL_STORAGE));

    }

    static getDateObject (date)
    {
    
        let dateParts = date.split('-');
    
        return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    
    }

    static getDataHandler () {

        return Data;

    }

}