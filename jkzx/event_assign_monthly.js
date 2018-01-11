$(function(){
	console.log('常德版本部门办结考核');
	$('input').datetimepicker({
		controlType:'select',
		oneLine: true,
		timeFormat: "",
    dateFormat: "yy-mm-dd",
		beforeShow : function( input,inst ){
			inst.dpDiv.wrap('<div class="default-style"></div>');
		}
	});
	$('#statistics').button({
		icon:'ui-icon-script'
	});
	$('#statistics').button({
		icon:'ui-icon-script'
	});
	$('#export').button({
		icon:'ui-icon-image'
	});
	$('#export').bind('click',function(){
		var _begin = $('#begin_date').val();
		var _end = $('#end_date').val();
		var _dept = parent.window.vo_user_info.dept[0].code;
		var _oper = parent.window.vo_user_info.code;
		var $_vo_request_data = common.f_build_request_data('report_eventdept','report_eventdept',16,[{'a_begin':{'=':_begin},'a_end':{'=':_end},'a_dept':{'=':_dept},'a_oper':{'=':_oper}}]);
		common.f_ajax_request_with_json(false,$_vo_request_data,function(_response){
				if(_response.succ){
					$('#report_result').html('<a href="'+_response.msg+'">下载</a>');
				}
		});
	});
	var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var randomScalingFactor = function() {
		return (Math.random() > 0.5 ? 1.0 : -1.0) * Math.round(Math.random() * 100);
  };
  var randomColorFactor = function() {
		return Math.round(Math.random() * 255);
  };
  var randomColor = function() {
		return 'rgba(' + randomColorFactor() + ',' + randomColorFactor() + ',' + randomColorFactor() + ',.7)';
  };
	
	$('#statistics').bind('click',function(){
		$('#canvas').remove();
		$('#statistics_grid').after('<canvas id="canvas" style="float:right;margin-right:30px;"></canvas>');
		var _begin = $('#begin_date').val();
		var _end = $('#end_date').val();
		var _dept = parent.window.vo_user_info.dept[0].code;
		var _oper = parent.window.vo_user_info.code;
		var $_vo_request_data = common.f_build_request_data('report_eventdept','report_eventdept',9,[{'i_begin':{'=':_begin},'i_end':{'=':_end},'i_dept':{'=':_dept},'i_oper':{'=':_oper}}]);
		var $_chart_label = [];
		var $_data_sets = [];
		common.f_ajax_request_with_json(false,$_vo_request_data,function(_response){
			console.log(_response);
			var $_td_items = [];
			var $_statistics_table = '<table id="table-1" width="750" >';
			var $_statistics_head = '<tr>';
			$.each(_response.row.o_result[0],function(_key,_value){
				$_td_items.push(_key);
				$_statistics_head += '<th>'+_key+'</th>';
			});
			$_statistics_head += '</tr>';
			$_statistics_table += $_statistics_head;
			$.each(_response.row.o_result,function(_index,_item){
				var $_statistics_data = '<tr>';
				$.each($_td_items,function(_idx,_itm){
                    $_statistics_data += '<td>'+_item[_itm]+'</td>';
                    $_work_statistics += parseInt(_item[1]);
                    

				});
				$_statistics_data += '</tr>';
				$_statistics_table += $_statistics_data;
            });
            console.log($_work_statistics);
			$('#statistics_grid').html($_statistics_table);
			$.each(_response.row.o_result,function(_index,_item){
				$.each(_item,function(_key,_value){
					if(_key == '委办局')
						$_chart_label.push(_value);
				});
			});
			
			$_cvalue = [];
			$_fvalue = [];
			$_dvalue = [];
			$_nvalue = [];
			$_pvalue = [];
			$_cdata_item = {};
			$_fdata_item = {};
			$_ddata_item = {};
			$_ndata_item = {};
			$_pdata_item = {};
			$.each(_response.row.o_result,function(_index,_item){
				$.each(_item,function(_key,_value){
					if( _key == '总工单' ){
						$_cvalue.push(_value);
					}
					if( _key == '按期反馈' ){
						$_fvalue.push(_value);
					}
					if( _key == '超期反馈' ){
						$_dvalue.push(_value);
					}
					if( _key == '未反馈' ){
						$_nvalue.push(_value);
					}
					if( _key == '处理中' ){
						$_pvalue.push(_value);
					}
				});
			});
			$_cdata_item.data = $_cvalue;
			$_cdata_item.backgroundColor = 'rgba(0,255,0,0.75)';
			$_cdata_item.label='总工单';
			$_data_sets.push($_cdata_item);
			$_fdata_item.data = $_fvalue;
			$_fdata_item.backgroundColor = 'rgba(255,165,0,0.75)';
			$_fdata_item.label='按期反馈';
			$_data_sets.push($_fdata_item);
			$_ddata_item.data = $_dvalue;
			$_ddata_item.backgroundColor = 'rgba(255,255,0,0.75)';
			$_ddata_item.label='超期反馈';
			$_data_sets.push($_ddata_item);
			$_ndata_item.data = $_nvalue;
			$_ndata_item.backgroundColor = 'rgba(255,0,0,0.6)';
			$_ndata_item.label='未反馈';
			$_data_sets.push($_ndata_item);
			$_pdata_item.data = $_pvalue;
			$_pdata_item.backgroundColor = 'rgba(0,255,255,0.75)';
			$_pdata_item.label='处理中';
			$_data_sets.push($_pdata_item);
			console.log($_data_sets);
			console.log($_chart_label);
			console.log(_response);
		});
		var barChartData = {
			labels: $_chart_label,
			datasets: $_data_sets
					};
			/*var barChartData = {
			labels: ["January", "February", "March", "April", "May", "June", "July"],
			datasets: [{
					label: 'Dataset 1',
									backgroundColor: "rgba(220,220,220,0.5)",
									data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
							}, {
					label: 'Dataset 2',
									backgroundColor: "rgba(151,187,205,0.5)",
									data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
							}, {
									label: 'Dataset 3',
									backgroundColor: "rgba(151,187,205,0.5)",
									data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
							}]
					};*/

			var ctx = document.getElementById("canvas").getContext("2d");
			window.myBar = new Chart(ctx, {
			type: 'bar',
					data: barChartData,
					options: {
				// Elements options apply to all of the options unless overridden in a dataset
							// In this case, we are setting the border of each bar to be 2px wide and green
							elements: {
									rectangle: {
											borderWidth: 0,
											borderColor: 'rgb(0, 255, 0)',
											borderSkipped: 'bottom'
									}
							},
							responsive: true,
							legend: {
					position: 'top',
							},
							title: {
					display: true,
									text: '派单统计'
							}
					}
			});
		});

    $('#randomizeData').click(function() {
		var zero = Math.random() < 0.2 ? true : false;
        $.each(barChartData.datasets, function(i, dataset) {
            dataset.backgroundColor = randomColor();
            dataset.data = dataset.data.map(function() {
				return zero ? 0.0 : randomScalingFactor();
            });
        });
        window.myBar.update();
    });

	$('#addDataset').click(function() {
		var newDataset = {
			label: 'Dataset ' + barChartData.datasets.length,
            backgroundColor: randomColor(),
            data: []
        };

		for (var index = 0; index < barChartData.labels.length; ++index) {
			newDataset.data.push(randomScalingFactor());
		}

        barChartData.datasets.push(newDataset);
        window.myBar.update();
    });

        $('#addData').click(function() {
            if (barChartData.datasets.length > 0) {
                var month = MONTHS[barChartData.labels.length % MONTHS.length];
                barChartData.labels.push(month);

                for (var index = 0; index < barChartData.datasets.length; ++index) {
                    //window.myBar.addData(randomScalingFactor(), index);
                    barChartData.datasets[index].data.push(randomScalingFactor());
                }

                window.myBar.update();
            }
        });

        $('#removeDataset').click(function() {
            barChartData.datasets.splice(0, 1);
            window.myBar.update();
        });

        $('#removeData').click(function() {
            barChartData.labels.splice(-1, 1); // remove the label first

            barChartData.datasets.forEach(function(dataset, datasetIndex) {
                dataset.data.pop();
            });

            window.myBar.update();
        });
});
