function Example(el){
	var $el 	  = this.el = $(el),
		$template = this.el.find(".ld-example"),
		$options  = this.el.find("dl");
	
	if($template.length == 0) return false;
	
	this.template = Handlebars.compile($template.find("code").html());
	$template.remove();
	
	this.options = [];
	// loop through $options
	
	this.data = {
		icon:    "new_page",
		style:   "btn1",
		content: "text",
		state:   "active",
		color:   "green"
	};
	$options.remove();
	
	console.log($el);
	this.elements = {
		el:   	 $el,
		code: 	 $("<pre>").appendTo($el),
		preview: $("<div>").appendTo($el)
	};
	
	this.render();
	console.log("Rendered template")
	return this;
};

Example.prototype.render = function(){
	var view = this.template(this.data);
	
	this.elements.code.text(view);
	this.elements.preview.html(view);
};

jQuery(function(){
	var examples = [];
	$(".ld-comment").each(function(){
		examples.push(new Example(this));
	});
});