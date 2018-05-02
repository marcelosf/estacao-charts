$(document).ready(function () {


    $.get('consulta/charts/loadtseco.php', {route: 'range'}).done(function(data) {
        
        var range = JSON.parse(data);

        var dates = getDates(range);

        $("#slider-range").dateRangeSlider({

            bounds: {
     
                 min: getDateObject(dates.minimumDate),
     
                 max: getDateObject(dates.maximumDate)
     
            }
     
         });
        

    });


    $("#slider-range").on("userValuesChanged", function (e, data) {

        let ini = dateFormat(data.values.min);

        let end = dateFormat(data.values.max);

        getTSecodata(ini, end, function (interval){

            let ctx = $('#tseco');

            var tSecoChart = getChart(interval.date, interval.data, interval.humidity, ctx);

        });

    });

    let ini = '2010-02-10';

    let end = '2011-02-11';

    getTSecodata(ini, end, function (interval) {

        let ctx = $('#tseco');

        var tSecoChart = getChart(interval.date, interval.data, interval.humidity, ctx);

    });

});


function getDates (range)
{

    return {

        maximumDate: range.maximum.maximum.split(' ')[0],

        minimumDate: range.minimum.minimum.split(' ')[0]

    }

}

function getDateObject (date)
{

    let dateParts = date.split('-');

    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);

}

function getTSecodata (initialDate, endDate, actions) 
{

    $.get('consulta/charts/loadtseco.php', {

        route: 'dateInterval',

        initialDate: initialDate,

        endDate: endDate

    }).done(function (data){

        let interval = JSON.parse(data);

        actions(interval);

    })

}

function dateFormat (date) 
{

    return date.getFullYear() + '-'
     + date.getMonth() + '-' 
     + date.getDate() + ' ' 
     + date.getHours() + ':' 
     + date.getMinutes() + ':' 
     + date.getSeconds()

}

function getChart (labels, dataLeft, dataRight, ctx) {

    let tSeco = new TSeco(labels, dataLeft, dataRight, ctx);

    return tSeco.getChart();

}