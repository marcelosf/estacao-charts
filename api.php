<?php

include('TSecoQuery.php');

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

}