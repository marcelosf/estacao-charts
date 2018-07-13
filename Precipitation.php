<?php

class Precipitation
{

    private $databaseQuery;

    public function __construct() 
    {

        $this->databaseQuery = new DatabaseQuery('estacao', 'precipitacao');

    }

    public function getPrecipitation ($iniDate, $endDate)
    {

        $precipitation = $this->databaseQuery->getPrecipitation($iniDate, $endDate);

        $precipitationList = $this->formatDataArray($precipitation['data']);

        return $precipitationList;

    }

    protected function formatDataArray ($precipitation)
    {

        $date = array_map(function ($row) {

            return $row['date'];

        }, $precipitation);

        $prec = array_map(function ($row) {

            return $row['precipitation'];

        }, $precipitation);

        $duration = array_map(function ($row) {

            return $row['duration'];

        }, $precipitation);

        return array('date' => $date, 'precipitation' => $prec, 'duration' => $duration);

    }

}