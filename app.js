// run script in javascript console on the live data page (https://racecenter.lavuelta.es/en)
// code by @velofacts
var viplist = ',1,2,3,4,'; 
var mycolor = '#ff4500';

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


var style = document.createElement('style');
style.innerHTML = '.group {border-bottom: 2px solid #ba4a19; margin-bottom: 3px; font-size: 11px; color: #333} .gc div { background-color: #ff0; border: 1px solid #ffb700; } .green div { background-color: #45AE51; color: #fff}  .mylist div { background-color: '+ mycolor +'; color: #fff}  .slow div {color: #fff; background-color: #000} .team {color:#fff; background-color: #ba4a19; } #q-app {padding: 10px} #pause {font-size: 48px;} .group div div { padding-left: 2px; padding-right: 2px;} #toolbar { display: flex; background: #fee5d9; padding: 10px; border-bottom: 2px solid #ba4a19; align-items: center } #toolbar > img { width: 72px; } #jerseyWrapper { display: flex;margin: auto; align-items: center; } .row { justify-content: center; } .selected { background: #ffa47b; } .fas { color: #ba4a19; } .row>.col-md-2 { padding: 2px 5px } .teamJersey:hover { background: #ffa47b; } #toolbar .distance { padding-left: 10px; font-size: 24px } #jerseyWrapper a {width: 3.9%} #jerseyWrapper img {max-width:100%}';
document.head.appendChild(style);

var link = document.createElement('link');
link.rel = 'stylesheet';
link.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css';
document.head.appendChild(link);

//https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css
// html
document.getElementsByClassName("container")[0].innerHTML = '<div id="toolbar"><a href="#" id="pause"><i id="pause-icon" class="fas fa-pause-circle">pause</i></a><span class="distance"><span id="distance">...</span> km</span><div id="jerseyWrapper"></div></div><div id="rows">&nbsp; waiting for data...</div>';

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
                console.log(f);


                var html = '<div class="row group">';

                for (var index = 0; index < f.length; index++) {
		    group = f[index];
                    if (group.DistanceFromStart != -1) {
                      html += '</div><div class="row group">';
                      html += group.HTML;
                      $(group.HTML).find('.gtoupsInfos tr').each(function () {
			      var bib = $(this).find('.bib').text();
			      var extra_class = "";
			      var name = $(this).find('.name').text()
                              html += '<div class="col-md-2 ' + extra_class + '"><div>' + name + '</div></div>';
		      }) 
			    
			    
                      document.getElementById("rows").innerHTML = html + '</div>';

                    }
                };

//            typeof newDataNotified == "function" && newDataNotified(i);
	    }

        });

/*



xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        tmp = JSON.parse(this.responseText);
        for (var i = 0; i < tmp.length; i++) {
            peloton[tmp[i].bib] = tmp[i]
        }
    }
    start_listening();
};


xmlhttp.open("GET", url, true);
xmlhttp.send();


function start_listening() {
    velofacts.addEventListener("update", function(e) {
        if (!paused) {
            var d = JSON.parse(e.data);
            var html = '<div class="row group">';
            var previous_gap = 0;
            if (d.bind == 'telemetryCompetitor-2021') { //was 
                var riders = d.data.Riders;
                for (var i = 0; i < riders.length; i++) {
                    var rider = riders[i];
                    if (i == 0) { document.getElementById("distance").innerHTML = rider.kmToFinish}
                    var gap = rider.secToFirstRider;
                    var speed = rider.kph;
                    var speedAvg = rider.kphAvg;
                    var extra_class = '';
                    if ((gap - previous_gap) > min_gap) {
                        html += '</div><div class="row group">';
                    }
                    if (selected_team == '') {
                        // show points and gc VIP's
                        if (gc.includes(',' + rider.Bib + ',')) {
                            extra_class += ' gc'
                        }
                        if (green.includes(',' + rider.Bib + ',')) {
                            extra_class += ' green'
                        }
			if (mylist.includes(',' + rider.Bib + ',')) {
                            extra_class += ' mylist'
                        }
                    } else {
                        //
                        if (peloton[rider.Bib].$team.split(':')[1] == selected_team) extra_class += ' team';
                    }
                    if (speed < max_slow_speed) extra_class = 'slow';
                    html += '<div title="Speed: ' + speed + 'km/h | Average Speed: ' + speedAvg + 'km/h | ' + rider.kmToFinish + 'km to go" class="col-md-2 ' + extra_class + '"><div>' + peloton[rider.Bib].lastnameshort + ' ' + peloton[rider.Bib].firstname + ' ' + prety_time(gap) + '</div></div>';
                    if (gap > 0) previous_gap = gap;
                }
                document.getElementById("rows").innerHTML = html + '</div>';
                riders_prev = riders;
            } else {}
        }
    });
}



*/
