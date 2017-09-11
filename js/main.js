/*****************************************************************
* Shawn Wonder                                                   *
* 04/08/2016                                                     *
******************************************************************/
   
"use strict"

$(document).ready(function() {
  var i = 0; 

  //Is this one of the preloaded algorithms or a user defined one?
  var customCode = false;

  //Number of times to repeat the execution of the algorithm
  var timesToRepeat = 50;

  var currentAlgorithm = 'bubbleSort';
  var currentMetric = 'time';
  var currentListSize = 8;

  var algorithmsList = {'bubbleSort': 'Bubble Sort',
                        'shakerSort': 'Shaker Sort',
                        'selectionSort': 'Selection Sort',
                        'quickSort': 'Quick Sort',
                        'modQuickSort': 'Modified Quick Sort',
                        'mergeSort': 'Merge Sort',
                        'hashSort': 'Hash Sort',
                        'customSort': 'Custom Sorting Algorithm'};

  var metricsList = {'time': 'Time to Execute',
                     'compares': '# of Compares',
                     'swaps': '# of Swaps'};

  //Metrics
  var timesList = [['Input Size', 'Algorithm', 'O(log(n))', 'O(n)', 'O(n*log(n))','O(n^2)']];
  var comparesList = [['Input Size', 'Algorithm', 'O(log(n))', 'O(n)', 'O(n*log(n))','O(n^2)']];
  var swapsList = [['Input Size', 'Algorithm', 'O(log(n))', 'O(n)', 'O(n*log(n))','O(n^2)']];

  //Contains the list of values for whatever the current metric is
  var valuesList = [];

  //Set of list sizes for to run the tests on
  var listSizes = [8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];

  //Holds the data that gets displayed in SlickGrid
  var dgdata = [];

  //Holds the sequence of iterations displayed in the list box
  var listState = []

  var l = [];
  var output = [];
  var counts = [0, 0]; //counts[0] = compares, counts[1] = swaps

  //Initialization
  google.charts.load('current', {'packages':['corechart']});

  //Create and populate the algorithms drop down
  $('#algoselbox')
    .append($('<form>').attr('id', 'algoform')
      .append($('<div>').addClass('algodropdowntitle').html('Algorithm to analyze:&nbsp;'))
      .append($('<select>').attr('id', 'algorithm')
    )
  );
  $.each(algorithmsList, function(name, title) {
    $('#algorithm').append($('<option>').attr('name', name).html(title));
  });

  //Create metric select box and load initial values
  $('#algometricselbox')
    .append($('<form>').attr('id', 'algometricform')
      .append($('<div>').addClass('algodropdowntitle').html('What to graph:&nbsp;'))
      .append($('<select>').attr('id', 'metric')
    )
  );
  $.each(metricsList, function(name, title) {
    $('#metric').append($('<option>').attr('name', name).html(title));
  });

  //Load the list size box
  $('#listheader')
    .append($('<form>').attr('id', 'listform')
      .append($('<div>').attr('id', 'listform').html('State of the list after each iteration of the sort function'))
      .append($('<div>').attr('id', 'listformtitle').html('List size to examine:&nbsp;'))
      .append($('<select>').attr('id', 'listsize'))
  );
  $.each(listSizes, function(key, value) {
    if(value <= 64) {
      $('#listsize').append($('<option>').attr('name', value).html(value));
    }
  });
  //End initialization

  //CLICK EVENTS
  //An algorithm select box change occurred
  $('#algorithm').change(function() {
    currentAlgorithm = $('option:selected', this).attr('name');
    if(currentAlgorithm == 'customSort') {
      customCode = true;
    } else {
      customCode = false;
    }

    $('#algometricselbox').html('');
    $('#algometricselbox')
      .append($('<form>').attr('id', 'algometricform')
        .append($('<div>').addClass('algodropdowntitle').html('What to graph:&nbsp;'))
        .append($('<select>').attr('id', 'metric')
      )
    );
    $.each(metricsList, function(name, title) {
      $('#metric').append($('<option>').attr('name', name).html(title));
    });
    if(!customCode) {
      calculateMetrics(currentAlgorithm, currentMetric);
      displayArray(currentListSize);
      loadCodeBox(currentAlgorithm);
      drawGrid();
      drawChart();
    } else {
      loadCodeBox(currentAlgorithm);
    }
  });

  //A metric select box change occurred
  $('#algometricselbox').change(function() {
    currentMetric = $('option:selected', this).attr('name');
    calculateMetrics(currentAlgorithm, currentMetric);
    displayArray(currentListSize);
    drawGrid();
    drawChart();
  });

  //The list size has been changed
  $('#listsize').change(function() {
    currentListSize = $('option:selected', this).attr('name');
    displayArray(currentListSize);
  });

  //Analyze button for custom user code was pressed
  $('#code').on('click', '#analyze', function() {
    calculateMetrics('customSort', 'time');
    displayArray(currentListSize);
    drawGrid();
    drawChart();
  });
  // END CLICK EVENTS

  //Run the test on the selected algorithm
  function calculateMetrics(algorithm, metric) {
    var errorCaught = false;
    listState = [];
    dgdata = [];
    timesList = [['Input Size', 'Algorithm', 'O(log(n))', 'O(n)', 'O(n*log(n))','O(n^2)']];
    comparesList = [['Input Size', 'Algorithm', 'O(log(n))', 'O(n)', 'O(n*log(n))','O(n^2)']];
    swapsList = [['Input Size', 'Algorithm', 'O(log(n))', 'O(n)', 'O(n*log(n))','O(n^2)']];
    $.each(listSizes, function(key, j) {
      var output = [];
      counts = [0, 0];

      l = createRandomList(j, 1, j);

      listState.push(l.slice());

      var tempVar;

      var t0 = 0; //Begin and end times
      var t1 = 0;
      //Custom sorting algorithm was chosen
      if(customCode && algorithm == 'customSort') {
        var usercode = $('#usercode').val();
        usercode = '(' + usercode + ')';
        t0 = performance.now();
        for(var k = 0; k < timesToRepeat; k++) {
          try {
            eval(usercode)(l, counts, listState);
          } catch(e) {
            if(!errorCaught) {
              $('#snippeterror').html('');
              $('#snippeterror').html('Error:&nbsp;' + e.message);
            }
            errorCaught = true;
          }
        }
        t1 = performance.now();
      } else { //Pre defined alogrithm was chosen
        t0 = performance.now();
        for(var k = 0; k < timesToRepeat; k++) {
         output = window[algorithm](l, counts, listState).slice();
        }
        t1 = performance.now();
      }
      listState.push(output.slice());
      var elapsed = (t1-t0)/timesToRepeat; //For times
      var compares = counts[0]/timesToRepeat; //For compares
      var swaps = counts[1]/timesToRepeat; //For swaps

      //Unit of measure is in milliseconds so divide time markers by 1000
      timesList.push([j, elapsed, (Math.log(j)/1000), (j/1000), (j*Math.log(j)/1000), (Math.pow(j,2)/1000)]);
      comparesList.push([j, compares, Math.log(j), j, j*Math.log(j), Math.pow(j,2)]);
      swapsList.push([j, swaps, Math.log(j), j, j*Math.log(j), Math.pow(j,2)]);
      elapsed  = elapsed*1000;
      elapsed = elapsed.toFixed(2);
      compares = Math.round(compares);
      swaps = Math.round(swaps);

      dgdata.push({
        listsize: j,
        numrepeats: timesToRepeat,
        exectime: elapsed,
        numcompares: compares,
        numswaps: swaps
      });
    });
    switch(metric) {
      case 'time':
        valuesList = timesList;
        break;
      case 'compares':
        valuesList = comparesList;
        break;
      case 'swaps':
        valuesList = swapsList;
        break;
    }
    return true;
  }

  /* CHART */
  function setChartTitle() {
    $('#chartheader').html(algorithmsList[currentAlgorithm] + ' - Big O Performance (' + metricsList[currentMetric] + ')');
  }

  function drawChart(logarithmic = true) {
    $('#chart').html('');
    setChartTitle();
    var data = google.visualization.arrayToDataTable(valuesList);

    var options = {
      //title: algorithmsList[currentAlgorithm] + ' Performance (' + metricsList[currentMetric] + ')',
      vAxis: { title: currentMetric },
      hAxis: { title: "Size of List" },
      //curveType: 'function',
      chartArea: {'width': '80%', 'height': '75%'},
      legend: { position: 'bottom', textStyle: {fontSize: 12} },
      height: 400,
      width: 700
    };

    if(logarithmic) {
      options.vAxis = {logScale: true, title: currentMetric.charAt(0).toUpperCase() + currentMetric.slice(1)};
      options.hAxis = {logScale: true, title: "Size of List"};
    }

    var chart = new google.visualization.LineChart(document.getElementById('chart'));
    chart.draw(data, options);
  }
  /* END CHART */

  /* GRID */
  function drawGrid() {
    var grid;
    var columns = [
      {id: "listsize", name: "List Size", field: "listsize", width: 100},
      {id: "numrepeats", name: "Times Repeated", field: "numrepeats", width: 105},
      {id: "exectime", name: "Avg. Execution Time (ms)", field: "exectime", width: 175},
      {id: "numcompares", name: "# Compares", field: "numcompares", width: 145},
      {id: "numswaps", name: "# Swaps", field: "numswaps", width: 145}
    ];
    var options = {
      enableCellNavigation: true,
      enableColumnReorder: false
    };
    grid = new Slick.Grid("#grid", dgdata, columns, options);
  }
  /* END GRID */

  /* STATE OF LIST AFTER EACH ITERATION BOX */
  function displayArray(size) {
    var i = 1;
    var listStateStr = '';
    $.each(listState, function(key, value) {
      if(value.length == size) {
        listStateStr +=  ' Step ' + i + ': [' + value + '] <br/>';
        i++;
      }
    });
    $('#list').html(listStateStr);
  }
  /* END STATE OF LIST AFTER EACH ITERATION BOX */

  /* CODE BOX */
  function loadCodeBox(algorithm) {
    if(algorithm == "customSort") {
      $('#code').html('');
      $('#code')
        .append($('<form>')
          .append($('<textarea>').attr({'id': 'usercode'}))
          .append($('<input>').attr({'id': 'analyze', 'type': 'button', 'value': 'Analyze'}))
        );
    } else {
      var code = window[algorithm + 'Print']();
      $('#code').html(code);
      $('#code').each(function(i, block) {
        hljs.highlightBlock(block);
      });
    }
  }
  /* END CODE BOX */

  //Load all the components into the page for the first time
  calculateMetrics('bubbleSort', 'time');
  google.charts.setOnLoadCallback(drawChart);
  //Set 2 second time out so Google charts and Slick Grid can load before the
  //drawChart() and drawGrid() functions are called
  setTimeout(function() {
    drawChart();
    drawGrid();
  }, 2000);
  displayArray(currentListSize);
  loadCodeBox('bubbleSort');
});
