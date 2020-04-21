var OPACITY_DURATION=500;var DEFAULT_HEIGHT=4000;var generateChart=function(Q,j,L){var G=[];var y=[];var u={};var D=[];var J={};var C=0;var P=DEFAULT_HEIGHT;var H=3000;var v=40;var N=0*v;j=j[0];var e=0;var b=function(U){var a=0;if(U.length>4){if(U.length<=8){var w=4}else{var w=Math.ceil(Math.sqrt(U.length))}for(var h=(Math.ceil(U.length/w)-1)*w;h>0;h-=w){U=U.slice(0,h)+"\n"+U.slice(h);++a}}e=Math.max(e,a);return U};var B=function(a){if(a.indexOf("\n")>0){v=Math.max(v,10*a.indexOf("\n"))}return v};var f=["大一(秋)","大一(春)","大二(夏)","大二(秋)","大二(春)","大三(夏)","大三(秋)","大三(春)","大四(夏)","大四(秋)","大四(春)"];var M=function(a){return f.indexOf(a)};var z=function(a){if(D.indexOf(a.type_id)<0){D.push(a.type_id)}C=a.depth>C?a.depth:C;if(a.bias_x===undefined||a.bias_x===null){a.bias_x=0}if(a.bias_y===undefined||a.bias_y===null){a.bias_y=0}if(a.link===undefined||a.link===null){a.link="<%= Rails.application.routes.url_helpers.root_path %>"}prereq=a.prereqs;if(prereq===undefined||prereq===null){prereq=[]}newclass={id:a.id,name:b(a.name),type:a.type_id,radius:B(b(a.name))*2,depth:M(a.semester),prereqs:a.prereqs,link:a.link,bias_x:a.bias_x,bias_y:a.bias_y,y:DEFAULT_HEIGHT*(0.055+a.depth*0.06),x:H/2+Math.random(),credit:a.credit};G.push(newclass);u[a.id]=newclass};var s;if(L==2){s=Q.cs_courses}else{if(L==1){s=Q.ee_courses}}for(var O=0;O<s.length;O++){z(s[O])}G.forEach(function(a){a.prereqs.forEach(function(h){if(!(u[h.prereq_id]===undefined)){y.push({source:u[h.prereq_id],target:a,recommended:h.is_recommended})}})});D.forEach(function(a){J[a]=Q.types.filter(function(h){return h.id==a})[0]});var d=d3.select(j).append("svg").attr("height",P).attr("width",H);for(O in f){var o=H*0.01,n=DEFAULT_HEIGHT*(0.055+O*0.06),t=DEFAULT_HEIGHT*0.05,p=Math.ceil(Math.log(H))*5;d.append("rect").attr("class","bg_shadow").attr("x",o).attr("y",n).attr("width",H*0.98).attr("height",t).attr("fill","#EEEEEE").attr("rx",H*0.005);d.append("text").attr("x",o).attr("y",n+t/2).style("font-size",p+"pt").text(f[O])}var c=d3.layout.force().nodes(G).charge(-10).linkDistance(function(a){if(a.source.type==a.target.type){return 50}else{return 300}}).alpha(0.01).size([H,P]);var E=function(a){var h="edge";if(a.recommended){h+=" recommended"}else{h+=" required"}return h};var l=function(a){r.attr("class",function(h){if(h.type==a.id){return"course highlight"}})};var q=function(Y){var ab=[];var ac=[];var h=0;var Z=[];var W=function(ad){ab.push(ad.id);if(Z.indexOf(ad.name)<0){h+=(ad.credit===undefined?0:+ad.credit);Z.push(ad.name)}ad.prereqs.forEach(function(ae){W(u[ae.prereq_id])})};W(Y);if(d3.select("#credit_"+Y.id)[0][0]==null){var V=Y.x-v*0.5,U=Y.y+v*1.4;d.append("text").attr({id:"credit_"+Y.id,x:function(){return V},y:function(){return U}}).text(function(){return"total credits: "+h});var aa=d3.selectAll("[id^=credit]")[0][0].getBoundingClientRect();var w=function(){return aa.width*1.1},X=function(){return aa.height*1.1},i=function(){return V-((w()-aa.width)>0?(w()-aa.width)/2:0)},a=function(){return U-X()*0.8};d.insert("rect","#credit_"+Y.id).attr({id:"creditbg_"+Y.id,x:i,y:a,width:w,height:X,fill:"white",opacity:"0.93"})}G.forEach(function(ad){ad.prereqs.forEach(function(ae){if(ae.prereq_id==Y.id){ac.push(ad.id)}})});m.attr("class",function(ad){var ae=E(ad);if(ab.indexOf(ad.target.id)>-1){ae+=" prereq"}if(ab.indexOf(ad.target.id)>-1||(ac.indexOf(ad.target.id)>-1&&ad.source.id==Y.id)){ae+=" highlight"}if(ac.indexOf(ad.target.id)>-1&&ad.source.id==Y.id){ae+=" post"}return ae});m.transition().attr("opacity",function(ad){if(ab.indexOf(ad.target.id)>-1||(ac.indexOf(ad.target.id)>-1&&ad.source.id==Y.id)){return 1}return 0.2}).duration(OPACITY_DURATION);r.attr("class",function(ad){var ae="course";if(ab.indexOf(ad.id)>-1||ac.indexOf(ad.id)>-1){ae+=" highlight"}if(ab.indexOf(ad.id)>-1||ac.indexOf(ad.id)>-1){ae+=" prereq"}return ae});r.transition().attr("opacity",function(ad){if(ab.indexOf(ad.id)>-1||ac.indexOf(ad.id)>-1){return 1}return 0.2}).duration(OPACITY_DURATION);I.transition().attr("opacity",function(ad){if(ab.indexOf(ad.id)>-1||ac.indexOf(ad.id)>-1){return 1}return 0.2}).duration(OPACITY_DURATION)};var T=function(a){m.transition().attr("opacity",1).duration(OPACITY_DURATION);m.attr("class",E);I.transition().attr("opacity",1).duration(OPACITY_DURATION);r.attr("class","course");r.transition().attr("opacity",1).duration(OPACITY_DURATION);d3.select("#credit_"+a.id).remove();d3.select("#creditbg_"+a.id).remove()};var g=function(a){if(d3.event.defaultPrevented){return}window.open(a.link,"_blank")};var m=d.selectAll("line").data(y).enter().append("line").attr("class",E).attr("marker-end","url(#end)");d.append("svg:defs").selectAll("marker").data(["end"]).enter().append("svg:marker").attr("id",String).attr("viewBox","0 -5 10 10").attr("refX",0).attr("refY",0).attr("markerWidth",8).attr("markerHeight",8).attr("markerUnits","userSpaceOnUse").attr("orient","auto").append("svg:path").attr("d","M0,-5L10,0L0,5");var R=d.selectAll("g.nodes").data(G).enter().append("g").attr("class","nodes").on("mouseover",q).on("mouseleave",T).on("click",g);var r=R.append("circle").attr("r",v).attr("class","course").attr("opacity",1).attr("id",function(a){return a.name}).style("fill",function(a){return J[a.type].color});var I=R.append("text").attr("class","courseNames").attr("id",function(a){return a.name}).attr("text-anchor","middle").attr("y",function(a){return a.name.split("\n").length>1?(-12*(a.name.split("\n").length-0.5)):(-12)});for(var S=0;S<=e;S++){I.append("tspan").attr("x",0).attr("dy","1.2em").text(function(a){return a.name.split("\n")[S]})}var x=[];D.forEach(function(h,a){x.push({id:h,name:J[h].name,index:a,color:J[h].color})});var A=d.selectAll("circle.colorLegend").data(x).enter().append("circle").attr("class","colorLegend").attr("cx",function(a){return(H-3*v)*a.index/(x.length)+v*3}).attr("cy",v+5).attr("r",v).on("mouseover",l).on("mouseout",T).style("fill",function(a){return a.color});var F=d.selectAll("text.textLegend").data(x).enter().append("text").attr("class","legendText").attr("x",function(a){return(H-3*v)*a.index/(x.length)+v*3}).attr("y",3*v).attr("text-anchor","middle").text(function(a){return a.name});var K=d.selectAll("g.arrowLegend").data([{name:"Recommended","stroke-dasharray":"5, 5"},{name:"Required","stroke-dasharray":null}]).enter().append("g").attr("x",H-100).attr("y",25).attr("height",50).attr("width",100).each(function(w,a){var h=d3.select(this);h.append("text").attr("class","legendText").attr("x",H-80).attr("y",P-a*25).attr("text-anchor","end").text(w.name);h.append("line").attr("class","highlight").style("stroke-dasharray",w["stroke-dasharray"]).attr("x1",H-70).attr("y1",P-a*25-4).attr("x2",H-30).attr("y2",P-a*25-4).attr("marker-end","url(#end)")});c.on("tick",function(U){m.each(function(ac){var Y=ac.source.x;var aa=ac.source.y;var X=ac.target.x;var Z=ac.target.y;var ab=Math.atan(Math.abs((Z-aa)/(X-Y)));X+=(Y<X?-1:1)*(v+9)*Math.cos(ab);Z+=(aa<Z?-1:1)*(v+9)*Math.sin(ab);d3.select(this).attr({x1:Y,y1:aa,x2:X,y2:Z})});var a=0.1*U.alpha;var V=0;G.forEach(function(ab,X){var Z=P;var Y=0;var aa=0;aa+=H/2;Y+=Z*J[ab.type].chart_pref_y*2;Y+=(ab.depth-1)*Z/(C-1);aa+=ab.bias_x+H*0.1;Y+=ab.bias_y;Y+=N+4*v;ab.x+=(aa-ab.x)*a;ab.y=ab.depth*DEFAULT_HEIGHT*0.06+DEFAULT_HEIGHT*0.08;r.attr("cx",function(ac){return ac.x}).attr("cy",function(ac){return ac.y});I.attr("transform",function(ac){return"translate("+ac.x+","+ac.y+")"})});var w=function(Y){var X=Y.radius;nx1=Y.x-X;nx2=Y.x+X;ny1=Y.y-X;ny2=Y.y+X;return function(ah,ab,af,aa,ae){if(ah.point&&(ah.point!==Y)){var ag=Y.x-ah.point.x,ad=Y.y-ah.point.y,ac=Math.sqrt(ag*ag+ad*ad),Z=Y.radius+ah.point.radius;if(ac<Z){ac=(ac-Z)/ac*0.5;Y.x-=ag*=ac;Y.y-=ad*=ac;ah.point.x+=ag;ah.point.y+=ad}}return ab>nx2||aa<nx1||af>ny2||ae<ny1}};var i=d3.geom.quadtree(G),h=0,W=G.length;while(++h<W){i.visit(w(G[h]))}d.selectAll("circle.course").attr("cx",function(X){return X.x}).attr("cy",function(X){return X.y})});var k=false;c.on("end",function(){k=true;c.stop();var a=[];G.forEach(function(h){var i={id:h.id,startX:h.x,startY:h.y};a.push(i)})});c.on("start",function(){while(!k){var h=10;requestAnimationFrame(function a(){for(var w=0;w<h;w++){c.tick()}if(c.alpha()>0){requestAnimationFrame(a)}})}});c.start()};