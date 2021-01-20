<?php

include('pressure.preprocessing.php');

class Pressure
{

    private $databaseQuery;

    public function __construct() 
    {

        $this->databaseQuery = new DatabaseQuery('estacao', 'dados');

    }

    public function getPressure ($date)
    {

        $pressure = $this->databaseQuery->getPressure($date);
     
        $processed = $this->pressureProcessingHandler($pressure['data'])->getPressureData();

        $pressureList = $this->formatDataArray($pressure['data']);

        $pressureList['data'] = $processed;

        return $pressureList;

    }

    public function getPressureHpaAndMmgh($date)
    {
        $pressure = $this->databaseQuery->getPressure($date);
        $processed = $this->pressureProcessingHandler($pressure['data'])->getPressureHpaAndMmgh();
        $pressureList = $this->formatDataArray($pressure['data']);
        $pressureList['data'] = $processed;

        return $pressureList;
    }

    protected function pressureProcessingHandler($data)
    {

        $pressure = new PressurePreProcessing($data);

        return $pressure;

    }

    protected function formatDataArray ($interval)
    {

        $date = array_map(function ($row) {

            return $row['data'];

        }, $interval);

        return array('date' => $date);

    }

}