import {Data} from '../Resources/Data.class';

export class BaseChart {

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

    static dateToBRFormat (dates, full) {

        dates = dates ? dates : [];

        let formattedDates = [];

        let self = this;

        dates.forEach(function (element) {
            
            let formatted = self.getDataHandler().dateFormat(element, full);

            formattedDates.push(formatted);

        });

        return formattedDates;

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