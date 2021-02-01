import { WindChart } from "../Charts/WindChart.class";
import { BaseChart } from "./BaseChart.class";
import { isMoment } from "moment";

export class Wind extends BaseChart {
  static loadData(actions) {
    let period = this._getPeriod();
    let dataHandler = this.getDataHandler();

    this.getDataHandler().loadWind(
      {
        ini: dataHandler.dateConvert(period.ini),
        end: dataHandler.dateConvert(period.end),
      },
      function (wind) {
        if (actions) {
          actions(wind);
        }
      }
    );
  }

  static _getPeriod() {
    let iniDate = $(process.env.MIX_WIND_INI_DATE_FIELD).val();
    let period = $(process.env.MIX_WIND_END_DATE_FIELD).val();
    let endDate = moment(iniDate, "DD/MM/YYYY").add(period, "days").format("L");

    return { ini: iniDate, end: endDate };
  }

  static getChart(labels, dataLeft, directions, ctx, fontSize) {
    let labelsFormatted = this.dateToBRFormat(labels, true);

    let windChart = new WindChart(
      labelsFormatted,
      dataLeft,
      directions,
      ctx,
      fontSize
    );

    return windChart.getChart();
  }

  static filterWindDataByDateInterval(iniDate, endDate) {
    let wind = [];

    let directions = [];

    let filteredDate = this.getDataHandler().filterDataByDateInterval(
      iniDate,
      endDate,
      process.env.MIX_WIND_STORAGE,
      function (data, value, index) {
        wind.push(data.wind[index]);

        directions.push(data.direction[index]);
      }
    );

    return { date: filteredDate, wind: wind, directions: directions };
  }

  static updateChart(data, iniDate, endDate, context) {
    let ini = this.dateFormat(iniDate);

    let end = this.dateFormat(endDate);

    let filteredData = this.filterWindDataByDateInterval(ini, end);

    let ctx = $(context);

    return this.getChart(
      filteredData.date,
      filteredData.wind,
      filteredData.directions,
      ctx
    );
  }
}

export class WindDaily extends Wind {
  static _getPeriod() {
    const format = "DD/MM/YYYY";
    let iniDate = moment().add(-1, "days").format("DD/MM/YYYY");
    let endDate = moment().format("DD/MM/YYYY HH:mm:ss");

    return { ini: iniDate, end: endDate };
  }
}
