$(document).ready(function(){
	var maxheight=800;
	var keytime=0;
	$.ajax({
		url:"./js/sd.js",
		async:false,
		type:"get",
		dataType:"JSON",
		success:function(data){
			var change=new Array();
			for(i=0;i<16;i++){
				change[i]=data[i];
			}
			change.sort(function(a,b){
				return a.Id>b.Id?1:-1;
			})
			var change2=new Array();
			for(i=16;i<data.length;i++){
				change2[i-16]=data[i];
			}
			change2.sort(function(a,b){
				return a.Id>b.Id?1:-1;
			})
			for(i=0;i<data.length;i++){
				
				if(i<16){	//后16名
					var rankobj=change[i];
					$("#middle-box").append($("#middle-box-template").html());
					$(".middle-box-img:last img").attr("src","../"+rankobj.Head);
					$(".middle-box-name:last").html(dealnum(parseInt(rankobj.Id))+"&nbsp;"+rankobj.Name);
					$(".middle-box-num:last").attr("rank",rankobj.BidCount);
				}
				else{	//前6名
					var rankobj=change2[i-16];
					$("#five-container").append($("#five-template").html());
					$(".rank-each-rect:last").attr("rank",rankobj.BidCount);
					$(".rank:last").attr("rank",rankobj.BidCount);
					$(".rank-name:last").html(rankobj.Name);
					$(".rank-img:last img").attr("src","../"+rankobj.Head);
				}
			}
		}
	})
	function dealnum(i){
		if(i<9)
			num='0'+(i);
		else
			num=i;
		return num;
	}
	
	
	var startmove=function(){
		var maxheight=0;
		var minheight=1000000;
		$(".rank-each-rect").each(function(i,obj){
			if(parseInt($(obj).attr("rank"))>maxheight)
				maxheight=parseInt($(obj).attr("rank"));
			if(parseInt($(obj).attr("rank"))<minheight)
				minheight=parseInt($(obj).attr("rank"));
		})
		var each=(300)/(maxheight-minheight);
		$(".rank-each-rect").each(function(i,obj){
			$(obj).attr("toheight",100+each*(parseInt($(obj).attr("rank"))-minheight));
		})
		interval1=setInterval(function(){
			$(".rank-each-rect").each(function(i,obj){
				var height=parseInt($(obj).height());
				if(height<=parseInt($(obj).attr("toheight"))){
					$(obj).css("height",parseInt(height+1)+"px");
					$(obj).css("margin-top",(400-parseInt(height+1))+"px");
				}
				if(height==100){
					$(".rank").fadeIn();
					
				}
				if(height>=100){
					if((parseInt($(obj).find(".rank").text())<parseInt($(obj).find(".rank").attr("rank"))))
						$(obj).find(".rank").text(minheight+parseInt((parseInt(height+1)-100)/300*(maxheight-minheight)));
					else
						$(obj).find(".rank").text(parseInt($(obj).find(".rank").attr("rank")));
				}

				if(height==400){
					$(obj).find(".rank").text(parseInt($(obj).find(".rank").attr("rank")));
					clearInterval(interval1);
					
				}
			});
		},10);
	}
	
	$(document).keydown(function(){
		if(event.keyCode==32&&keytime==2){
			startmove();
		}
		if (event.keyCode==32&&keytime	==1) {
			$("#fifteen").fadeOut("slow",function(){
				$("#five").css("visibility","visible");
				$("#five").css("opacity",0);
				$("#five").animate({opacity:"1"},"slow",function(){
					
				});
				$("#five").css("margin-top","0px");
				keytime++;
			});

				
		
		}
		if (event.keyCode==32&&keytime	==0) {
			$(".middle-box-each").animate({opacity:"1"});
			$(".middle-box-num span.big").css("visibility","visible");
			interval2=setInterval(function(){
				$(".middle-box-num span.big").each(function(i,obj){
					if(parseInt($(obj).text())<parseInt($(obj).parent().attr("rank"))){
						$(obj).text(parseInt($(obj).text())+1);
					}
				})
			},40);
			keytime++;
		}
		
		
	})
	
})