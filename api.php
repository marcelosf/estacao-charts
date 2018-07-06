<?php

include './TSecoQuery.php';
include './Pressure.php';
include './Wind.php';

class Api 
{

    public static function getDateRange ()
    {

        $tseco = new TSecoQuery();

        $range = $tseco->getDateRange();

        echo json_encode($range);

        die();

    }

    public static function getDateInterval ($initialDate, $endDate)
    {

        $tseco = new TSecoQuery();

        $dateInterval = $tseco->getDateInterval($initialDate, $endDate);

        echo json_encode($dateInterval);

        die();

    }

    public static function getPressure($date)
    {

        $pressure = new Pressure();

        $dailyPressure = $pressure->getPressure($date);

        echo json_encode($dailyPressure);

        die();

    }

    public static function getWind($initialDate, $endDate)
    {

        $wind = new Wind();

        $windInterval = $wind->getWind($initialDate, $endDate);

        echo json_encode($windInterval);

        die();

    }

}