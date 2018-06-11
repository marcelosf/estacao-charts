class BaseChart {

    static setSlideRange (id, step, range) {

        let sliderRangeId = '#' + id + '-slider-range';

        let dateFields = this.getDateFields(id);

        $(sliderRangeId).dateRangeSlider({

            bounds: {
     
                 min: this.getDateObject(this.getDataHandler().dateConvert(dateFields.minDate)),
     
                 max: this.getDateObject(this.getDataHandler().dateConvert(dateFields.maxDate))
     
            },

            defaultValues: {

                min: this.getDateObject(this.getDataHandler().dateConvert(dateFields.minDate)),
     
                max: this.getDateObject(this.getDataHandler().dateConvert(dateFields.maxDate))

            },

            step: step,

            range: {

                min: range.min,

                max: range.max

            }
     
        });

        $(sliderRangeId).dateRangeSlider('resize');

    }

    static destroySlideRange (sliderRangeId) {

        let sliderRangeId = '#' + id + '-slider-range';

        $(sliderRangeId).dateRangeSlider("destroy");

    }

    static getDateFields (id) {

        let iniFieldId = '#' + id + '-ini-date-field';

        let endFieldId = '#' + id + '-end-date-field';

        return {

            minDate: $(iniFieldId).val(),
    
            maxDate: $(endFieldId).val()
    
        }
 
    }
    
    static dateFormat (date) {

        return date.toISOString();

    }

    static getStotredData (key, actions) {

        actions(this.getDataHandler().getSavedData(key));

    }

    static getDateObject (date) {
    
        let dateParts = date.split('-');
    
        return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    
    }

    static destroy (chart) {

        chart.destroy();

    }

    static getDataHandler () {

        return Data;

    }

    static filterDataByDate (data, actions) {

        let filtered = data.date.filter(function (value, index) {

            if (value >= iniDate && value <= endDate) {

                actions(value, index);

            }

        });

    }

}