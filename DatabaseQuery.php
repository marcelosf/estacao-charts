<?php

    include('/var/www/files/library/DBMysqliConnect.php');

    class DatabaseQuery
    {

        private $databaseName;

        private $tableName; 

        private $link;

        public function __construct($databaseName, $tableName)
        {

            $this->databaseName = $databaseName;

            $this->tableName = $tableName;

            $this->link = connectiToDB($this->databaseName) or die('Nao deu!');

        }

        public function getMinimumDate ()
        {

            $query = "SELECT MIN(data) as minimum FROM $this->tableName;";

            $result = mysqli_query($this->link, $query);

            $date = $this->fetchArray($result);

            return $date['data'][0];

        }

        public function getMaximumDate ()
        {

            $query = "SELECT MAX(data) as maximum FROM $this->tableName;";

            $result = mysqli_query($this->link, $query);

            $date = $this->fetchArray($result);

            return $date['data'][0];

        }

        public function getDateInterval ($initialDate, $endDate) 
        {

            $query = "SELECT DATE_FORMAT(data, '%Y-%m-%d') AS dateInterval, AVG(tseco) tseco, AVG(tumido) tumido 
            
            FROM $this->tableName 
            
            WHERE data BETWEEN '$initialDate' AND '$endDate'
            
            GROUP BY dateInterval;
            
            ";

            $result = mysqli_query($this->link, $query);

            return $this->fetchArray($result);

        }

        public function freeResult ($result) 
        {

            mysqli_free_result($result);

        }

        protected function fetchArray($result)
        {

            $data = array();

            while($row = mysqli_fetch_array($result))
            {

                $data['data'][] = $row;

            }

            return $data;

        }

    }