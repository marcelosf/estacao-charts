$(document).ready(function () {

    var dateFormat = 'dd/mm/yy';

    periodStart = $('.ini-date-field').datepicker({

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

    periodEnd = $('.end-date-field').datepicker({

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

    $('#pressure-button').click(function () {

      let date = $('#pressure-ini-date-field').val();

      Data.loadPressure(Data.dateConvert(date));

      Pressure.destroy(window.pressure);

      Pressure.getStoredData(function (pressure) {

        let ctx = $('#pressure');

        window.pressure = Pressure.getChart(pressure.time, pressure.data, ctx);

      });

    });

    $('#date-period-button').click(function () {

        let initialDate = $('#temperature-ini-date-field').val();

        let endDate = $('#temperature-end-date-field').val();

        Data.loadDataByDateInterval(Data.dateConvert(initialDate), Data.dateConvert(endDate), function (data) {

          Temperature.setSlideRange('temperature', {days: 1}, {min: {days: 1}, max: {years: 60}});

          Temperature.destroy(window.chart);

          Temperature.getTSecoData(function (interval) {

              console.log(interval);
  
              let ctx = $('#tseco');
  
              window.chart = Temperature.getChart(interval.date, interval.data, interval.humidity, ctx);
  
          });

        });

    });

    $('#temperature-ini-date-field').datepicker('setDate', '01/05/2018');

    $('#temperature-end-date-field').datepicker('setDate', '20/05/2018');

    $('#pressure-ini-date-field').datepicker('setDate', '23/04/2018');

    $('#pressure-end-date-field').datepicker('setDate', '25/05/2018');

});