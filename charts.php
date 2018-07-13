<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<title>Estação Meteorológica - Seção Técnica de Serviços Meteorológicos do Instituto de Astronomia, Geofísica e Ciências Atmosféricas  - Universidade de São Paulo</title>


<link href="estacao_files/style2.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="consulta/charts/js/jqueryrange/css/classic-min.css" type="text/css" />
<link href="js/jqueryui/jquery-ui.css" rel="stylesheet" type="text/css" />

<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
<script src="js/jqueryui/jquery-ui.min.js"></script>
<script src="consulta/charts/js/jqueryrange/jQDateRangeSlider-min.js"></script>
<script src="consulta/charts/js/config.js"></script>
<script src="consulta/charts/js/TSeco.class.js"></script>
<script src="consulta/charts/js/PressureChart.class.js"></script>
<script src="consulta/charts/js/WindChart.class.js"></script>
<script src="consulta/charts/js/PrecipitationChart.js"></script>
<script src="consulta/charts/js/Data.class.js"></script>
<script src="consulta/charts/js/PeriodField.class.js"></script>
<script src="consulta/charts/js/periodField.js"></script>
<script src="consulta/charts/js/BaseChart.class.js"></script>
<script src="consulta/charts/js/Temperature.class.js"></script>
<script src="consulta/charts/js/Pressure.class.js"></script>
<script src="consulta/charts/js/Wind.class.js"></script>
<script src="consulta/charts/js/Precipitation.class.js"></script>
<script src="consulta/charts/js/slider-range.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>



</head>

<body>
<!--header start -->

<div id="header">

<?php $pagina=8;

  include('MENU_PRINCIPAL.php');

?>
<img src="meteograma/banner2.png" width="981" height="200" />
</div>
<!--header end -->
<!--body start -->

<div id="body">

<!--right panel start -->
<div>

  <?php 
  
    include('consulta/charts/TSecoQuery.php');
    
  ?>

    <div id="tabs">
    
      <ul>
      
        <li><a href="#temperatura">Temperatura</a></li>

        <li><a href="#pa">Pressão Atmosférica</a></li>

        <li><a href="#vento">Vento</a></li>

        <li><a href="#precipitation">Precipitação</a></li>
      
      </ul>
    
      <div id="temperatura">

      <p style="margin-top: 50px;">
        
        <label for="temperature-ini-date-field">Data Inicial:</label>

        <input type="text" id="temperature-ini-date-field" class="ini-date-field">

        <label for="temperature-end-date-field">Data Final:</label>

        <input type="text" id="temperature-end-date-field" class="ini-date-field">

        <button class="ui-button ui-widget ui-corner-all" id="date-period-button">Ok</button>
      
      </p>


      <canvas id="tseco"></canvas>

      <p style="margin-top: 50px;">
      
        <div id="temperature-slider-range">

        </div>
      
      </p>

      <p>

        <div id="data-min"></div>

        <div id="data-max"></div>

      </p>

    </div>

    <div id="pa">
    
      <p style="margin-top: 50px;">
        
        <label for="pressure-ini-date-field">Data inicial:</label>

        <input type="text" id="pressure-ini-date-field" class="ini-date-field">

        <label for="pressure-end-date-field">Data final:</label>

        <input type="text" id="pressure-end-date-field" class="ini-date-field">

        <button class="ui-button ui-widget ui-corner-all" id="pressure-button">Ok</button>
      
      </p>

      <canvas id="pressure"></canvas>

      <p style="margin-top: 50px;">
      
        <div id="pressure-slider-range"></div>
    
      </p>
    
    </div>

    <div id="vento">
    
      <p>

        <p style="margin-top: 50px;">
        
          <label for="wind-ini-date-field">Data inicial:</label>

          <input type="text" id="wind-ini-date-field" class="ini-date-field">

          <label for="wind-end-date-field">Data final:</label>

          <input type="text" id="wind-end-date-field" class="ini-date-field">

          <button class="ui-button ui-widget ui-corner-all" id="wind-button">Ok</button>
        
        </p>

        <canvas id="wind"></canvas>

        <p style="margin-top: 50px;">
      
          <div id="wind-slider-range"></div>
    
         </p>

      </p>
    
    </div>

    <div id="precipitation">
    
      <p>
      
        <p style="margin-top: 50px;">
        
          <label for="precipitation-ini-date-field">Data inicial:</label>

          <input type="text" id="precipitation-ini-date-field" class="ini-date-field">

          <label for="precipitation-end-date-field">Data final:</label>

          <input type="text" id="precipitation-end-date-field" class="ini-date-field">

          <button class="ui-button ui-widget ui-corner-all" id="precipitation-button">Ok</button>
        
        </p>

        <canvas id="prec"></canvas>        

        <p style="margin-top: 50px;">
        
          <div id="precipitation-slider-range"></div>

        </p>
      
      </p>
    
    </div>

    </div>
    
</div>

<p class="rightBottom"></p>
<br class="spacer" />
</div>
<!--right panel end -->
<br class="spacer" />
</div>
<!--body end -->


<!--footer start -->
<div id="footer">
<?php include('RODAPE.php');?>
<p class="copyright">&copy; Estação Meteorológica  - IAG/USP.</p>
 <!--footer end -->
 </div>

 <!--GOOGLE ANALYTICS-->
<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-18083865-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
</body>
</html>
