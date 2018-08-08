const DATE_FORMAT = 'dd/mm/yy';

export class PeriodField {

    constructor (dateFieldParameters) {

        this.dateFieldConfiguration = dateFieldParameters;

    }

    setField (iniDateFieldId, endDateFieldId) {

        let self = this;

        let periodStart = $(iniDateFieldId).datepicker(this.dateFieldConfiguration).on( 'change', function() {

            periodEnd.datepicker( "option", "minDate", self.getDate(DATE_FORMAT, this));

        });

        let periodEnd = $(endDateFieldId).datepicker(this.dateFieldConfiguration).on('change', function () {

            periodStart.datepicker("option", "maxDate", self.getDate(DATE_FORMAT, this));

        });

    }

    getDate (dateFormat, element ) {

        let date;

        try {

          date = $.datepicker.parseDate(dateFormat, element.value);
  
        } catch( error ) {

          date = null;
  
        }
   
        return date;
  
      }

}