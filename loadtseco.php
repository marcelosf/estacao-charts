<?php

include('api.php');

$route = $_GET['route'] ? $_GET['route'] : $_POST['route'];

switch ($route) {

    case 'range':

        Api::getDateRange();

        break;

    case 'dateInterval':

        $initialDate = $_GET['initialDate'];

        $endDate = $_GET['endDate'];
        
        Api::getDateInterval($initialDate, $endDate);
        
        break;
        
    case 'serialInterval':
        $initialDate = $_GET['initialDate'];
        $endDate = $_GET['endDate'];
        
        API::getSerialDateInterval($initialDate, $endDate);

        break;

    case 'setPeriod':

        $initialDate = $_GET['initialDate'];

        $endDate = $_GET['endDate'];

        Api::setDatePeriod($initialDate, $endDate);

        break;

    case 'pressure':

        $date = $_POST['date'];

        Api::getPressure($date);

        break;

    case 'pressureHpaAndMmgh':

        $date = $_POST['date'];

        Api::getSerialPressureByDateInterval($date);

        break;

    case 'wind':

        $initialDate = $_GET['initialDate'];

        $endDate = $_GET['endDate'];

        Api::getWind($initialDate, $endDate);

        break;

    case 'precipitation':

        $initialDate = $_GET['initialDate'];

        $endDate = $_GET['endDate'];

        Api::getPrecipitation($initialDate, $endDate);

        break;
}
