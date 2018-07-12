class BaseChart {

    static setSlideRange (id, step, range) {

        let sliderRangeId = '#' + id + '-slider-range';

        let dateFields = this.getDateFields(id);

        let sliderConfig = {

            bounds: {
     
                 min: this.getDateObject(this.getDataHandler().dateConvert(dateFields.minDate), false),
     
                 max: this.getDateObject(this.getDataHandler().dateConvert(dateFields.maxDate), true)
     
            },

            defaultValues: {

                min: this.getDateObject(this.getDataHandler().dateConvert(dateFields.minDate), false),
     
                max: this.getDateObject(this.getDataHandler().dateConvert(dateFields.maxDate), true)

            },

            step: step,

            range: {

                min: range.min,

                max: range.max

            }
     
        };

        $(sliderRangeId).dateRangeSlider(sliderConfig);

        $(sliderRangeId).dateRangeSlider('resize');

    }

    static destroySlideRange (sliderRangeId) {

        let sliderRangeId = '#' + id + '-slider-range';

        $(sliderRangeId).dateRangeSlider("destroy");

    }

    static getDateFields (id) {

        let dateValues = {};

        let iniFieldId = '#' + id + '-ini-date-field';

        let endFieldId = '#' + id + '-end-date-field';

        dateValues['minDate'] = $(iniFieldId).val();

        dateValues['maxDate'] = $(endFieldId).val() ? $(endFieldId).val() : $(iniFieldId).val();

        return dateValues;
 
    }
    
    static dateFormat (date) {

        return date.toISOString();

    }

    static getStoredData (key, actions) {

        actions(this.getDataHandler().getSavedData(key));

    }

    static getDateObject (date, isEndDate) {
    
        let dateParts = date.split('-');

        let dateObj = {year: dateParts[0], month: dateParts[1] -1, day: dateParts[2]};
    
        if(isEndDate) {

            return new Date(dateObj.year, dateObj.month, dateObj.day, 23, 59, 59);

        }

        return new Date(dateObj.year, dateObj.month, dateObj.day);
    
    }

    static destroy (chart) {

        if (typeof(chart && chart.destroy) !== 'undefined') {

            chart.destroy();

        }

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