export const W=960,H=540;
export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const rand=(a,b)=>a+Math.random()*(b-a);
export function segmentCircle(a,b,c,r){if(!a||!b)return false;const dx=b.x-a.x,dy=b.y-a.y,t=clamp(((c.x-a.x)*dx+(c.y-a.y)*dy)/(dx*dx+dy*dy||1),0,1);return Math.hypot(c.x-a.x-t*dx,c.y-a.y-t*dy)<=r}
export const circleHit=(a,b,r)=>Math.hypot(a.x-b.x,a.y-b.y)<=r;
export function scoreFruit(score,kind,combo){return Math.max(0,score+(kind==='bomb'?-20:10+(combo>=3?5:0)))}
export function roundEnd(game,time,lives,extra){return time<=0||((game==='space'||game==='bricks')&&lives<=0)||(game==='goal'&&extra>=5)||(game==='bricks'&&extra===0)}
export function text(ctx,s,x,y,size=24,color='white',align='center'){ctx.fillStyle=color;ctx.font=`bold ${size}px system-ui`;ctx.textAlign=align;ctx.fillText(s,x,y)}
export function burst(state,x,y,color,n=12){for(let i=0;i<n&&state.particles.length<160;i++)state.particles.push({x,y,vx:rand(-180,180),vy:rand(-180,180),life:rand(.3,.8),color})}
export function particles(state,ctx,dt){state.particles=state.particles.filter(p=>p.life>0);for(const p of state.particles){p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=180*dt;p.life-=dt;ctx.globalAlpha=clamp(p.life,0,1);ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,3,0,7);ctx.fill()}ctx.globalAlpha=1}

export function sweptBladeHit(segment,oldCenter,newCenter,r,tolerance=0){const radius=r+tolerance;return segmentCircle(segment.from,segment.to,oldCenter,radius)||segmentCircle(segment.from,segment.to,newCenter,radius)||segmentCircle(segment.from,segment.to,{x:(oldCenter.x+newCenter.x)/2,y:(oldCenter.y+newCenter.y)/2},radius)}
