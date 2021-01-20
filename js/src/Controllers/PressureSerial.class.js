import { PressureSerialChart } from "../Charts/PressureSerialChart.class";
import { BaseChart } from "./BaseChart.class";

export class PressureSerial extends BaseChart {
  
  static loadData(actions) {
    let dateFormat = "DD/MM/YYYY";
    let initialDate = moment("2020-02-28").format(dateFormat);
    let endDate = moment("2020-02-29").format(dateFormat);
    // let endDate = moment().add(-1, 'days').format(dateFormat);

    let data = this.getDataHandler();

    data.loadSerialPressureByDateInterval({ini: data.dateConvert(initialDate), end: data.dateConvert(endDate)}, pressure => {
        if (actions) {
            actions(pressure);
        }
      }
    );
  }


  static getChart(labels, dataLeft, dataRight, ctx, fontSize) {
    let formattedDates = this.dateToBRFormat(labels, false);
    let pressure = new PressureSerialChart(formattedDates, dataLeft, dataRight, ctx, fontSize)

    return pressure.getChart()
  }
}
