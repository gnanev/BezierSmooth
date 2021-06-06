var b3Seg = 100;
var lineWidth = 2;

function diagram(ctx, samples, step, smooth) {
  var samplesCount = samples.length;
  
  if (samplesCount < 2)
  	return;
    
  var x = 0;
        
  for (var i = 1; i < samplesCount; i++) {   
  	bezier3(ctx,
            {x:x, y:samples[i-1]}, 
            {x:x + smooth, y:samples[i-1]}, 
            {x:x + step, y:samples[i]}, 
            {x:x + step + smooth, y:samples[i]});
      
      x += step + smooth;
  }
}

function bezierSegment(t, p0, p1, p2, p3) {
      var cX = 3 * (p1.x - p0.x),
          bX = 3 * (p2.x - p1.x) - cX,
          aX = p3.x - p0.x - cX - bX;
            
      var cY = 3 * (p1.y - p0.y),
          bY = 3 * (p2.y - p1.y) - cY,
          aY = p3.y - p0.y - cY - bY;
            
      var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
      var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;
            
      return {x: x, y: y};
}

function bezier3(ctx, p0, p1, p2, p3) { 
  x0 = p0.x;
  y0 = p0.y;
   
  for (i = 0; i < b3Seg; i++) {
        var p = bezierSegment(i/b3Seg, p0, p1, p2, p3);
        ctx.beginPath();
        ctx.strokeStyle = '#00FF00';
        ctx.lineWidth = lineWidth;
        ctx.moveTo(x0, y0);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        x0 = p.x;
        y0 = p.y;
      }
  }

function drawPoint(ctx, p) {
  ctx.beginPath();
  ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
  ctx.fill();
}
