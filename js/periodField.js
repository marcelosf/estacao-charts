$(document).ready(function () {

    var dateFormat = 'dd/mm/yy';

    periodStart = $('#initial-date-field').datepicker({

            dateFormat: dateFormat,

            defaultDate: '0d',

            minDate: new Date(1950, 1, 1),

            maxDate: '0d',

            minDate: '01/01/1950',

            yearRange: '1950:nn',

            changeMonth: true,

            changeYear: true,

            numberOfMonths: 1

        }).on( 'change', function() {

          periodEnd.datepicker( "option", "minDate", getDate( this ) );

    });

    periodEnd = $('#end-date-field').datepicker({

            defaultDate: '0d',

            dateFormat: dateFormat,

            maxDate: '0d',

            minDate: '01/01/1950',

            yearRange: '1950:nn',

            changeMonth: true,

            changeYear: true,

            numberOfMonths: 1

    }).on( 'change', function() {

            periodStart.datepicker( 'option', 'maxDate', getDate(this));

    });
 
    function getDate( element ) {

      var date;

      try {

        date = $.datepicker.parseDate(dateFormat, element.value);

      } catch( error ) {

        date = null;

      }
 
      return date;

    }

    $('#date-period-button').click(function () {

        let initialDate = $('#initial-date-field').val();

        let endDate = $('#end-date-field').val();

        console.log(endDate + ' - ' + initialDate);

        Data.loadDataByDateInterval(Data.dateConvert(initialDate), Data.dateConvert(endDate));

        Temperature.setSlideRange();

        let dateFileds = Temperature.getDateFields();

        Temperature.getTSecoData(function (interval) {

            let ctx = $('#tseco');

            let tSecoChart = Temperature.getChart(interval.date, interval.data, interval.humidity, ctx);

        });

    });

    $('#initial-date-field').datepicker('setDate', '01/01/2011');

    $('#end-date-field').datepicker('setDate', '01/02/2011');

});