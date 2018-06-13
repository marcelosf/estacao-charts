$(document).ready(function () {

    let periodField = new PeriodField({

      dateFormat: 'dd/mm/yy',

      defaultDate: '0d',

      minDate: new Date(1950, 1, 1),

      maxDate: '0d',

      yearRange: '1950:nn',

      changeMonth: true,

      changeYear: true,

      numberOfMonths: 1

    });

    periodField.setField('.ini-date-field', '.end-date-field');

    $('#pressure-button').click(function () {

      let date = $(PRESSURE_INI_DATE_FIELD).val();

      let dateInterval = {ini: Data.dateConvert(date), end: Data.dateConvert(date)};

      Data.loadPressure(dateInterval, function (pressure) {

        Pressure.destroy(window.pressure);
                
        let ctx = $('#pressure');
  
        window.pressure = Pressure.getChart(pressure.date, pressure.data, ctx);
  
      });    	  

    });

    $('#date-period-button').click(function () {

        let initialDate = $('#temperature-ini-date-field').val();

        let endDate = $('#temperature-end-date-field').val();

        Data.loadDataByDateInterval(Data.dateConvert(initialDate), Data.dateConvert(endDate), function (data) {

          Temperature.setSlideRange('temperature', {hour: 1}, {min: {hour: 1}, max: {hour: 96}});

          Temperature.destroy(window.chart);

          Temperature.getTSecoData(function (interval) {
  
              let ctx = $('#tseco');
  
              window.chart = Temperature.getChart(interval.date, interval.data, interval.humidity, ctx);
  
          });

        });

    });

    $('#temperature-ini-date-field').datepicker('setDate', '01/05/2018');

    $('#temperature-end-date-field').datepicker('setDate', '20/05/2018');

    $('#pressure-ini-date-field').datepicker('setDate', '12/05/2018');

    $('#pressure-end-date-field').datepicker('setDate', '12/05/2018');

});