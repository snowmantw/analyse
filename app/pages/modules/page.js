var app = require("../../app");
var modulesGraph = require("../../graphs/modules");

function renderTable() {
	$(".page").html(require("./modules.jade")({
		stats: app.stats
	}));
}

module.exports = function() {
	document.title = "modules";
	renderTable();

	var sortDir;
	$(document).on('click', '.size-th', function(){
		sortDir = sortDir === 'desc' ? 'asc' : 'desc';
		app.stats.modules.sort(function(a, b) {
			return sortDir === 'asc'
				? b.size - a.size
				: a.size - b.size;
		});
		renderTable();
	});

  if (app.stats.modules[0].time) {
    $(document).on('click', '.time-th', function(){
      sortDir = sortDir === 'desc' ? 'asc' : 'desc';
      app.stats.modules.sort(function(a, b) {
        return sortDir === 'asc'
          ? b.time - a.time
          : a.time - b.time;
      });
      renderTable();
    });
  }

  if (app.stats.modules[0].timestamp) {
    $(document).on('click', '.timestamp-th', function(){
      sortDir = sortDir === 'desc' ? 'asc' : 'desc';
      app.stats.modules.sort(function(a, b) {
        return sortDir === 'asc'
          ? b.timestamp - a.timestamp
          : a.timestamp - b.timestamp;
      });
      renderTable();
    });
  }

	modulesGraph.show();
	modulesGraph.setNormal();
	return function() {
		$(document).off('click', '.size-th');
		modulesGraph.hide();
	}
};
