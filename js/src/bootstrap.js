/**
 * Import jQuery library.
 */
import $ from 'jquery';
window.$ = window.jQuery = $;

/**
 * Import jQuery UI libraries
 */
import 'jquery-ui/ui/widgets/datepicker';
import 'jquery-ui/ui/widgets/tabs';

/**
 * Import Lodash
 */
window._ = require('lodash');

/**
 * Import Moment
 */
window.moment = require('moment/moment');
window.moment.locale('br');
