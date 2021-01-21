import { TemperatureInterval } from "./Controllers/TemperatureInterval.class";
import Chart from "chart.js";
import { PressureSerial } from "./Controllers/PressureSerial.class";

$(document).ready(() => {
  Chart.defaults.global.defaultFontSize = 12;
  temperatureInitialize();
  pressureInitialize();
});

function temperatureInitialize() {
  TemperatureInterval.loadData((temperature) => {
    TemperatureInterval.destroy(window.temperatureInterval);

    let ctx = $("#temperatura");

    let tMaxMin = {
      tmax: temperature.maxTemperature,
      tmin: temperature.minTemperature,
    };

    window.temperatureInterval = TemperatureInterval.getChart(
      temperature.date,
      temperature.data,
      temperature.humidity,
      tMaxMin,
      ctx
    );
  });
}

function pressureInitialize() {
  PressureSerial.loadData((pressure) => {
    PressureSerial.destroy(window.pressureSerial);
    let ctx = $("#pressure");

    window.pressureSerial = PressureSerial.getChart(
      pressure.date,
      pressure.data.mmgh,
      pressure.data.hpa,
      ctx,
      12
    );
  });
}
