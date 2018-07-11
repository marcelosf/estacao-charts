<?php 

class Wind 
{

    private $database;

    public function __construct()
    {

        $this->database = new DatabaseQuery('estacao', 'dados');

    }

    public function getDateRange ()
    {

        $range['minimum'] = $this->databaseQuery->getMinimumDate();

        $range['maximum'] = $this->databaseQuery->getMaximumDate();

        return $range;

    }

    public function getWind ($initialDate, $endDate) 
    {

        $windData = $this->database->getWind($initialDate, $endDate);

        return $this->formatDataArray($windData['data']);

    }

    protected function formatDataArray ($wind)
    {

        $dateData = array_map(function ($row) {

            return $row['data'];

        }, $wind);

        $windData = array_map(function ($row) {

            return $row['vento'];

        }, $wind);

        $directionData = array_map(function ($row) {

            return $row['dir'];

        }, $wind);

        return array('date' => $dateData, 'wind' => $windData, 'direction' => $directionData);

    }

}