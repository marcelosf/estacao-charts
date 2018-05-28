<?php

include('api.php');

$route = $_GET['route'];

switch($route) {

    case 'range': 

        Api::getDateRange();

        break;

    case 'dateInterval':

        $initialDate = $_GET['initialDate'];

        $endDate = $_GET['endDate'];

        Api::getDateInterval($initialDate, $endDate);

        break;

    case 'setPeriod':

        $initialDate = $_GET['initialDate'];

        $endDate = $_GET['endDate'];

        Api::setDatePeriod($initialDate, $endDate);

        break;

}