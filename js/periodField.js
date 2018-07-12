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

    $('#temperature-ini-date-field').datepicker('setDate', '01/05/2018');

    $('#temperature-end-date-field').datepicker('setDate', '20/05/2018');

    $('#pressure-ini-date-field').datepicker('setDate', '12/05/2018');

    $('#pressure-end-date-field').datepicker('setDate', '12/05/2018');

    $(WIND_INI_DATE_FIELD).datepicker('setDate', '01/06/2018');

    $(WIND_END_DATE_FIELD).datepicker('setDate', '02/06/2018');


});