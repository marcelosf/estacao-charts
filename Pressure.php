<?php

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

        return $this->formatDataArray($pressure['data']);

    }

    protected function formatDataArray ($interval)
    {

        $data = array_map(function ($row) {

            return $row['pressao'];

        }, $interval);

        $date = array_map(function ($row) {

            return $row['data'];

        }, $interval);

        return array('date' => $date, 'data' => $data);

    }

}