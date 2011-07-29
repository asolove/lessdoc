jQuery(function(){
	$(".ld-example code").html(function(template){
		var $this = $(this),
				$comm = $this.prev(".ld-comment"),
				data  = {};
				
		$comm.find("dt").each(function(){
			data[$(this).text()] = $(this).next("dd").text().split(", ")[0];
		});
		
		console.log(data);
		
	});
});