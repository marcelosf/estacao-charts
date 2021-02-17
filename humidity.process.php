<?php

class Humidity
{

    protected $pressure;

    protected $tempBar;

    protected $tseco;

    protected $tumido;

    protected $data;

    protected $humidityInterval = array();


    public function __construct($humidityData)
    {

        $this->data = $humidityData;
    }

    public function getHumidityData()
    {

        foreach ($this->data as $d) {

            $this->setVariables($d);

            $this->humidityInterval[] = $this->getHumidity();
        }

        $this->humidityInterval = $this->normalize($this->humidityInterval);

        return $this->humidityInterval;
    }

    public function getHumidity()
    {

        $p0c = $this->getP0c();

        $pHpa = $this->getPHpa($p0c);

        $e = $this->getEp($this->tumido) - $pHpa * ($this->tseco - $this->tumido) * 0.000653 * (1.0 + (0.000944 * $this->tumido ));

        $es = $this->getEp($this->tseco);

        $rh = ($e/$es) * 100;

        return round($rh, 1);
    }

    protected function setVariables($variables)
    {

        $this->pressure = $variables['pressao'];

        $this->tempBar = $variables['temp_bar'];

        $this->tseco = $variables['tseco'];

        $this->tumido = $variables['tumido'];
    }

    protected function getP0c()
    {

        return $this->pressure * (1 - 0.000163 * $this->tempBar);
    }

    protected function getPHpa($p0c)
    {

        return ($p0c - 1.3) * 1013.25 / 760;
    }

    protected function getEp($temp)
    {
        if ($temp == 0) {
            return 0;
        }

        $ep = 1.0044*6.112*exp((17.62 * $temp )/($temp + 243.12));

        return $ep;
    }

    protected function getfcorr($pNormal)
    {

        return 1.0016 + (0.00000315 * $pNormal - (0.074 / $pNormal));
    }

    protected function getEwptw($fcorr)
    {

        return $fcorr * pow(6.112, (17.62 * $this->tumido / (243.12 + $this->tumido)));
    }

    protected function getEwptd($ewptw, $pNormal)
    {

        return $ewptw - 0.000653 * (1 + 0.000944 * $this->tumido) * $pNormal * ($this->tseco - $this->tumido);
    }

    protected function getEwpt($fcorr)
    {

        return $fcorr * pow(6.112, (17.62 * $this->tseco / (243.12 + $this->tseco)));
    }

    protected function normalize($humidity)
    {
        return array_map(function ($item) {
            return $item > 100 ? 100 : $item;
        }, $humidity);
    }
}
