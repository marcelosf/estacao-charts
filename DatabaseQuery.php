<?php

include('../../files/library/DBMysqliConnect.php');

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

    public function getMinimumDate()
    {

        $query = "SELECT MIN(data) as minimum FROM $this->tableName;";

        $result = mysqli_query($this->link, $query);

        $date = $this->fetchArray($result);

        return $date['data'][0];
    }

    public function getMaximumDate()
    {

        $query = "SELECT MAX(data) as maximum FROM $this->tableName;";

        $result = mysqli_query($this->link, $query);

        $date = $this->fetchArray($result);

        return $date['data'][0];
    }

    public function getDateInterval($initialDate, $endDate)
    {

        $query = "SELECT 
                date_format(data, '%Y-%m-%d') data_formatada,
                AVG(temp_bar) temp_bar,
                AVG(pressao) pressao,
                AVG(tseco) tseco, 
                AVG(tumido) tumido,
                MAX(tseco) tmax,
                MIN(tseco) tmin
            
            FROM $this->tableName 
            
            WHERE data BETWEEN '$initialDate' AND '$endDate'
            
            GROUP BY data_formatada;
            
            ";

        $result = mysqli_query($this->link, $query);

        return $this->fetchArray($result);
    }

    public function getSerialDateInterval($initialDate, $endDate)
    {
        $query = "SELECT 
            data data_formatada,
            temp_bar,
            pressao,
            tseco,
            tumido,
            tmax,
            tmin

            FROM $this->tableName

            WHERE data BETWEEN '$initialDate' AND '$endDate'
        ";

        $result = mysqli_query($this->link, $query);

        return $this->fetchArray($result);
    }

    public function getPrecipitation($initialDate, $endDate)
    {

        $query = "SELECT date_format(DATA, '%Y-%m-%d') date, AVG(prec) precipitation, AVG(duration) duration
            FROM $this->tableName 
            WHERE DATA BETWEEN '$initialDate' AND '$endDate' 
            GROUP BY date
            ";

        $result = mysqli_query($this->link, $query);

        return $this->fetchArray($result);
    }

    public function getWind($initialDate, $endDate)
    {

        $query = "SELECT data, vento, upper(dir) dir 
            FROM $this->tableName 
            WHERE data BETWEEN date('$initialDate') AND date('$endDate')
            ";

        $result = mysqli_query($this->link, $query);

        return $this->fetchArray($result);
    }

    public function getPressure(array $date)
    {

        $initialDate = $date['ini'] . ' 00:00:00';

        $endDate = $date['end'] . ' 23:59:59';

        $query = "SELECT data, pressao, temp_bar 
            
            FROM $this->tableName
            
            WHERE data BETWEEN '$initialDate' AND '$endDate';

            ";

        $result = mysqli_query($this->link, $query);

        return $this->fetchArray($result);
    }

    public function freeResult($result)
    {

        mysqli_free_result($result);
    }

    protected function fetchArray($result)
    {

        $data = array();

        while ($row = mysqli_fetch_array($result)) {

            $data['data'][] = $row;
        }

        return $data;
    }
}
