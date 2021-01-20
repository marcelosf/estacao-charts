<?php


class PressurePreProcessing
{

    protected $pressure;

    protected $tempBar;

    protected $data;

    protected $pressureInterval = array();

    public function __construct($pressureData)
    {

        $this->data = $pressureData;

    }

    public function getPressureData()
    {

        foreach ($this->data as $d) {

            $this->setVariables($d);

            $this->pressureInterval[] = $this->getPressure();

        }

        return $this->pressureInterval;

    }

    public function getPressureHpaAndMmgh()
    {
        $pressure = [];

        $pressure['hpa'] = $this->getPressureData();

        $pressure['mmgh'] = array_map(function($row) {
            return $row['pressao'];
        }, $this->data);

        return $pressure;
    }

    protected function getPressure()
    {

        $p0c = $this->getP0c();

        return $this->getPNormal($p0c);

    }

    protected function setVariables($variables)
    {

        $this->pressure = $variables['pressao'];

        $this->tempBar = $variables['temp_bar'];

    }

    protected function getP0c()
    {

        return $this->pressure * (1 - 0.000163 * $this->tempBar);

    }

    protected function getPNormal($p0c)
    {

        return ($p0c - 1.3) * 1013.25 / 760;

    }


}