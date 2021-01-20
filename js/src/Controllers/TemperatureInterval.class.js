import { Temperature } from "./Temperature.class";
import { TSeco } from "../Charts/TSeco.class";

export class TemperatureInterval extends Temperature {
  
  static loadData(actions) {
    let dateFormat = "DD/MM/YYYY";
    let initialDate = moment("2020-02-28").format(dateFormat);
    let endDate = moment("2020-02-29").format(dateFormat);
    // let endDate = moment().add(-1, 'days').format(dateFormat);

    let data = this.getDataHandler();

    data.loadSerialByDateInterval(data.dateConvert(initialDate), data.dateConvert(endDate), temperature => {
        if (actions) {
            actions(temperature);
        }
      }
    );
  }


  static getChart(labels, dataLeft, dataRight, tMaxMin, ctx) {
    let formattedDates = this.dateToBRFormat(labels, false);
    let tSeco = new TSeco(formattedDates, dataLeft, dataRight, tMaxMin, ctx, 10);

    return tSeco.getChart();
  }
}
