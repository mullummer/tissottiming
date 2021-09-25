// run script in javascript console on the live data page (https://racecenter.lavuelta.es/en)
// code by @velofacts
var viplist = ',1,2,3,4,5,6,7,8,53,74,29,19,23,9,15,66,37,10,11,45,22,34,125,16,'; 
var mycolor = '#ff4500';
var html = '';

select_team = function() {
    var jersey = document.getElementsByClassName("teamJersey");
    [].forEach.call(jersey, function(el) {
        el.classList.remove("selected");
    });
    
    //jersey.classList.remove("selected");
    var this_id = this.getAttribute('data-id');
    if (this_id == selected_team) {
        // reset
        selected_team = '';
        this.classList.remove("selected");
    } else {
        selected_team = this_id;
        this.classList.toggle("selected");
    }
    return false;
};

toggle_pause = function() {
    paused = !paused;
    document.getElementById('pause-icon').className = (paused) ? 'fas fa-play-circle' : 'fas fa-pause-circle';
    return false;
};

// css
$('body').css('background','none');
var style = document.createElement('style');
style.innerHTML = '.group {border-bottom: 2px solid #ba4a19; margin-bottom: 3px; font-size: 11px; color: #333} .gc div { background-color: #ff0; border: 1px solid #ffb700; } .green div { background-color: #45AE51; color: #fff}  .mylist div { background-color: '+ mycolor +'; color: #fff}  .slow div {color: #fff; background-color: #000} .team {color:#fff; background-color: #ba4a19; } #q-app {padding: 10px} #pause {font-size: 48px;} .group div div { padding-left: 2px; padding-right: 2px;} #toolbar { display: flex; background: #fee5d9; padding: 10px; border-bottom: 2px solid #ba4a19; align-items: center } #toolbar > img { width: 72px; } #jerseyWrapper { display: flex;margin: auto; align-items: center; } .row { justify-content: center; } .selected { background: #ffa47b; } .fas { color: #ba4a19; } .row>.col-md-2 { padding: 2px 5px } .teamJersey:hover { background: #ffa47b; } #toolbar .distance { padding-left: 10px; font-size: 24px } #jerseyWrapper a {width: 3.9%} #jerseyWrapper img {max-width:100%}';
style.innerHTML += '.info {color: #fff; background-color: #ba4a19; width: 200px; float: right; margin-top: -5px}';
document.head.appendChild(style);
var link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css';
document.head.appendChild(link);

//https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css
// html
$('body').html('<div id="toolbar"><a href="#" id="pause"><i id="pause-icon" class="fas fa-pause-circle"></i></a><span class="distance"><span id="distance">...</span> km</span><div id="jerseyWrapper"></div></div><div id="rows">&nbsp; waiting for data...</div>');

// team jerseys
/*
for (var i=0; i<teams.length; i++) {
    document.getElementById('jerseyWrapper').innerHTML += '<a href="#" class="teamJersey" id="team' + i + '" data-id="' + teams[i]._id + '" title="'+teams[i].name+'"><img src="' + teams[i].jersey_sm + '"></a>';
}
document.getElementById('toolbar').innerHTML += '<img src="https://racecenter.lavuelta.es/img/logo.b231a68d.png" />';

// click events
buttonPause = document.getElementById("pause");
buttonPause.onclick = toggle_pause;
for (var i = 0; i < teams.length; i++) {
    var thisButton = document.getElementById("team" + i);
    thisButton.onclick = select_team;
}
*/


// tracking
	liveHub.off("UpdateTracking");
        liveHub.on("UpdateTracking", function (n, t, i) {
            var r, f, e, h;
            if (((n = unCompressString(n)), (t = unCompressString(t)), (i = unCompressString(i)))) {
                r = 0;
                f = JSON.parse(i);
                // console.log(f);


                html = '<div class="row group">';

                for (var index = 0; index < f.length; index++) {
		    group = f[index];
			if(index == 0) {$('#distance').html(group.DistanceToFinish)}
			if (group.DistanceFromStart != -1) {
				html += '</div>';
				var speed = $(group.HTML).find('.speed').text();
			    if(index >= 0) {html += '<div class="info">'+group.DistanceToFinish+'km ' + speed +'km/h</div><div>&nbsp;</div>'}
			    html += '<div class="row group">';
			    $(group.HTML).find('tr').each(function () {
			      var bib = $(this).find('.bib').text();
			      var extra_class = "";
			      if (viplist.includes(',' + bib + ',')) { extra_class += ' gc'}
			      var name = $(this).find('.name').text()
                              html += '<div class="col-2 ' + extra_class + '"><div>' + name + '</div></div>';
			    }) 
			    
			    
                      document.getElementById("rows").innerHTML = html + '</div>';

                    }
                };

//            typeof newDataNotified == "function" && newDataNotified(i);
	    }

        });
