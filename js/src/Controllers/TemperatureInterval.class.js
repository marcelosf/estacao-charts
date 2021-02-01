import { Temperature } from "./Temperature.class";
import { TSeco } from "../Charts/TSeco.class";

export class TemperatureInterval extends Temperature {
  static loadData(actions) {
    let initialDate = moment().add(-1, "days").format("DD/MM/YYYY");
    let endDate = moment().format("DD/MM/YYYY HH:mm:ss");

    let data = this.getDataHandler();

    data.loadSerialByDateInterval(
      data.dateConvert(initialDate),
      data.dateConvert(endDate),
      (temperature) => {
        if (actions) {
          actions(temperature);
        }
      }
    );
  }

  static getChart(labels, dataLeft, dataRight, tMaxMin, ctx) {
    let formattedDates = this.dateToBRFormat(labels, true);
    let tSeco = new TSeco(
      formattedDates,
      dataLeft,
      dataRight,
      tMaxMin,
      ctx,
      10
    );

    return tSeco.getChart();
  }
}
