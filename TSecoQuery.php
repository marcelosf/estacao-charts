<?php

include('DatabaseQuery.php');
include('humidity.process.php');

/**
 * Executa as queries para tseco
 */
class TSecoQuery
{

    private $databaseQuery;

    /**
     * Construtor da classe
     */
    public function __construct()
    {

        $this->databaseQuery = new DatabaseQuery('estacao', 'dados');
    }

    /**
     * Retorna a maior e a menor data registrada.
     */
    public function getDateRange()
    {

        $range['minimum'] = $this->databaseQuery->getMinimumDate();

        $range['maximum'] = $this->databaseQuery->getMaximumDate();

        return $range;
    }

    /**
     * Retorna as médias para temperatura de bulbo seco, umidade relativa
     * temperatura máxima e temperatura mínima dentro de um range
     * de datas fornecidas.
     */
    public function getDateInterval($initialDate, $endDate)
    {

        $interval = $this->databaseQuery->getDateInterval($initialDate, $endDate);

        $humidity = $this->humidityHandle($interval['data'])->getHumidityData();

        $intervalFormated = $this->formatDataArray($interval['data']);

        $intervalFormated['humidity'] = $humidity;

        return $intervalFormated;
    }

    /**
     * Retorna a serie de dados para temperatura de bulbo seco, umidade relativa
     * temperatura máxima e temperatura mínima dentro de um range
     * de datas fornecidas.
     */
    public function getSerialDateInterval($initialDate, $endDate)
    {
        $interval = $this->databaseQuery->getSerialDateInterval($initialDate, $endDate);
        $humidity = $this->humidityHandle($interval['data'])->getHumidityData();
        $intervalFormated = $this->formatDataArray($interval['data']);
        $intervalFormated['humidity'] = $humidity;

        return $intervalFormated;
    }

    /**
     * Formata os dados para umidade
     */
    protected function humidityHandle($data)
    {
        return new humidity($data);
    }


    /**
     * Cria um array com um conjunto da dados
     */
    protected function formatDataArray($interval)
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
