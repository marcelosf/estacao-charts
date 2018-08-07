import {PeriodField} from './PeriodField.class';

export class PeriodFieldConfig {

  static initialize () {

    $(document).ready(function () {

      let periodField = new PeriodField({
  
        dateFormat: 'dd/mm/yy',
  
        defaultDate: new Date(),
  
        minDate: new Date(1950, 1, 1),
  
        maxDate: 0,
  
        yearRange: '1950:nn',
  
        changeMonth: true,
  
        changeYear: true,
  
        numberOfMonths: 1
  
      });
  
      periodField.setField('.ini-date-field', '.end-date-field');
  
      $('.ini-date-field').datepicker('setDate', '-1d');
  
      $('.end-date-field').datepicker('setDate', new Date());
  
    });

  }

}