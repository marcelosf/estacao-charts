<?php

    const DATABASE_NAME = 'estacao';
    const TABLE_NAME = 'dados';

    include('DatabaseQuery.php');

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

            return $this->formatDataArray($interval['data']);

        }

        protected function formatDataArray ($interval)
        {

            $data = array_map(function ($row) {

                return $row['tseco'];

            }, $interval);

            $date = array_map(function ($row) {

                return $row['dateInterval'];

            }, $interval);

            $humidity = array_map(function ($row){

                return $row['tumido'];

            }, $interval);

            return array('data' => $data, 'date' => $date, 'humidity' => $humidity);

        }

    }