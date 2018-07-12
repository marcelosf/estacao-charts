<?php

    include('DatabaseQuery.php');
    include('humidity.process.php');


    class TSecoQuery
    {

        private $databaseQuery;

        public function __construct()
        {

            $this->databaseQuery = new DatabaseQuery('estacao', 'dados');

        }

        public function getDateRange ()
        {

            $range['minimum'] = $this->databaseQuery->getMinimumDate();

            $range['maximum'] = $this->databaseQuery->getMaximumDate();

            return $range;

        }

        public function getDateInterval ($initialDate, $endDate)
        {

            $interval = $this->databaseQuery->getDateInterval($initialDate, $endDate);

            $humidity = $this->humidityHandle($interval['data'])->getHumidityData();

            $intervalFormated = $this->formatDataArray($interval['data']);

            $intervalFormated['humidity'] = $humidity;

            return $intervalFormated;

        }

        protected function humidityHandle ($data)
        {

            return new humidity($data);

        }

        protected function formatDataArray ($interval)
        {

            $data = array_map(function ($row) {

                return $row['tseco'];

            }, $interval);

            $date = array_map(function ($row) {

                return $row['data_formatada'];

            }, $interval);

            $minTemperature = array_map(function ($row) {

                return $row['tmin'];

            }, $interval);

            $maxTemperature = array_map(function ($row) {

                return $row['tmax'];

            }, $interval);


            return array(
                
                'data' => $data,
                'date' => $date, 
                'minTemperature' => $minTemperature, 
                'maxTemperature' => $maxTemperature
            );

        }

    }