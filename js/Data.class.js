class Data {

    static loadDataByDateInterval (initialDate, endDate, actions) {

        let self = this;

        this.getDataByDateInterval(initialDate, endDate, function(data) {

            self.saveData(DATA_INTERVAL_STORAGE, data);

            if (actions) {
                
                actions(data);

            }

        });

    }
    
    static getDataByDateInterval (initialDate, endDate,actions) {

        $.get(API, {route: 'dateInterval', initialDate: initialDate, endDate: endDate}).done(function (data){

            let interval = JSON.parse(data);
            
            actions(interval);
    
        });

    }

    static dateConvert (date) {

        return date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$2-$1');

    }

    static dateFormat (date, full) {

        let replace = full ? '$3/$2/$1$4' : '$3/$2/$1';

        return date.replace(/(\d{4})-(\d{2})-(\d{2})(.*)/, replace);

    }

    static loadPressure (date, actions) {

        let self = this;

        this.getPressure(date, function (pressure) {

            self.saveData(PRESSURE_STORAGE, pressure);

            if (actions) {

                actions(pressure);

            }

        });

    }

    static getPressure (date, actions) {

        $.post(API, {route: 'pressure', date: date}).done(function (data) {

            let pressure = JSON.parse(data);
            
            actions(pressure);

        });

    }

    static loadWind(date, actions) {

        let self = this;

        this.getWind(date, function (wind) {

            self.saveData(WIND_STORAGE, wind);

            if (actions) {

                actions(wind);

            }

        });

    }

    static getWind (date, actions) {

        $.get(API, {route: 'wind', initialDate: date.ini, endDate: date.end}).done(function(data) {

            let wind = JSON.parse(data);

            actions(wind);

        });

    }

    static loadPrecipitation (date, actions) {

        let self = this;

        this.getPrecipitation(date, function (precipitation) {

            self.saveData(PRECIPITATION_STORAGE, precipitation);

            if (actions) {

                actions(precipitation);

            }

        });

    }

    static getPrecipitation (date, actions) {

        $.get(API, {route: 'precipitation', initialDate: date.ini, endDate: date.end}).done(function(data) {

            let precipitation = JSON.parse(data);

            actions(precipitation);

        });

    }

    static saveData(key, data) {

        let stringData = JSON.stringify(data);        

        sessionStorage.setItem(key, stringData);

    }

    static getSavedData (key) {

        let stringData =  sessionStorage.getItem(key);

        return JSON.parse(stringData);

    }

    static filterDataByDate (iniDate, endDate) {

        let data = this.getSavedData(DATA_INTERVAL_STORAGE);

        let temperature = [];

        let humidity = [];

        let maxTemperature = [];

        let minTemperature = [];

        let filteredDate = data.date.filter(function (value, index) {

            if (value >= iniDate && value <= endDate) {

                temperature.push(data.data[index]);

                humidity.push(data.humidity[index]);

                maxTemperature.push(data.maxTemperature[index]);

                minTemperature.push(data.minTemperature[index]);

                return true;

            }

        });

        return {
            
            data: temperature,
            date: filteredDate, 
            humidity: humidity,
            maxTemperature: maxTemperature,
            minTemperature: minTemperature
        };

    }

    static filterDataByDateInterval (iniDate, endDate, key, actions) {

        let data = this.getSavedData(key);

        let filtered = data.date.filter(function (value, index) {

            if (value >= iniDate && value <= endDate) {

                actions(data, value, index);

                return true;

            }

        });

        return filtered;    

    }

}