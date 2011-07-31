function Example(el){
	var $el 	  = this.el = $(el),
		$template = this.el.find(".ld-example"),
		$options  = this.el.find("dl");
	
	if($template.length == 0) return false;
	
	// Find template, compile it, remove from view
	this.template = Handlebars.compile($template.find("code").html());
	$template.remove();
	
	// Find options, colate them, remove from view
	var options = this.options = [],
			data    = this.data    = {};
	$.each($options.find("dt"), function(i, dt){
		var $dt  = $(dt),
				$dd  = $dt.next("dd"),
				name = $dt.text(),
				values = $.map($dd.text().split(","), $.trim);
				
		if(!$dt || !$dd) return;
		
		options.push({name: name, values: values});
		data[name] = values[0];
	});
	
	$options.remove();
	
	// Create references to view containers
	this.elements = {
		el:   	 $el,
		options: $("<div class='ld-example-options'>").appendTo($el),
		preview: $("<div class='ld-example-canvas'>").appendTo($el),
		code: 	 $("<pre class='ld-example-code'>").appendTo($el)
	};
	
	this.render();
	this.elements.options.html(this.renderOptions());
	this.attachEvents();
	return this;
};

Example.prototype.render = function(){
	var view = this.template(this.data);
	
	this.elements.code.text(view);
	this.elements.preview.html(view);
};

Example.prototype.optionsTemplate = 
	"<form>" +
		"{{#options}}" +
			"<label for='{{name}}'>{{name}}" +
		 		"<select name='{{name}}' id='{{name}}'>" +
		 		  "{{#values}}" +
		 				"<option>{{.}}</option>" +
		 			"{{/values}}" +
		 		"</select>" +
			"</label>" +
		"{{/options}}" + 
		"<a class='ld-example-view-source'>View source</a>" +
	"</form>";

Example.prototype.renderOptions = function(){
	return Handlebars.compile(this.optionsTemplate)({options: this.options});
};

Example.prototype.attachEvents = function(){
	this.elements.el.delegate(".ld-example-options select", "change", $.proxy(this.optionChange, this));
	this.elements.el.delegate(".ld-example-view-source", "click", $.proxy(this.viewSource, this));
};

Example.prototype.optionChange = function(e){
	var $select = $(e.target),
			name    = $select.attr("name"),
			value   = $select.val();
	this.data[name] = value;
	this.render();
};

Example.prototype.viewSource = function(e){
	this.elements.code.toggleClass("ld-visible");
	$("html,body").animate({scrollTop: this.elements.code.scrollTop() });
}

jQuery(function(){
	var examples = [];
	$(".ld-comment").each(function(){
		examples.push(new Example(this));
	});
});