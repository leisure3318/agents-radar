const fs = require('node:fs');
const path = require('node:path');
const root = process.env.WHITEBOARD_SKILL;
const {Scene,build} = require(path.join(root,'lib/scene-dsl')).use(__dirname);
const {writePresenterPlan} = require(path.join(root,'lib/presenter-plan.cjs'));
const plan = JSON.parse(fs.readFileSync(path.join(__dirname,'storyboard.json')));
const reports = plan.stories.map((story,i)=>({
  name: `0${i+1}-story`, story, number:i+1,
  narration:story.stages.map(stage=>stage.narration
    .replace(/^(?:[A-Za-z][A-Za-z0-9_-]* +)+(?=研究)/u,'这项')
    .replace(/^(?:[A-Za-z][A-Za-z0-9_-]* +)+(?=新版)/u,'这个项目的'))
}));
if(plan.intro) reports.unshift({name:'00-intro',intro:plan.intro,narration:plan.intro.narration});
reports.push({name:'04-recap',narration:[plan.recap],number:4});
const scenes = reports.map(({name,narration})=>{
  const scene = new Scene(name,narration.join('|'));
  narration.forEach(()=>scene.nextBeat());
  return scene;
});
const cover = (s,ratio)=>s.coverLayout({ratio,title:plan.title,sub:plan.date+' · AI 情报'});
build(__dirname,scenes,{cover,platformCover:cover,penSound:{enabled:false,brandCard:false},soundEffects:[]});
fs.writeFileSync(path.join(__dirname,'video.json'),JSON.stringify({platform:'channels',width:1920,height:1080,fps:30}));
const presenter = {x:270,y:890,s:.68,fr:'talk'};
const viewport = {x:0,y:0,w:1920,h:960};
const worlds = {};
const keys = {};
for(const {name,story,number,intro} of reports){
  keys[name] = {keys:[{t:0,pose:'think',...presenter}]};
  if(story) keys[name].keys.push({beat:1,pose:'stick'},{beat:2,pose:'present'});
  const data = {story,number,intro,date:plan.date,summary:plan.stories.map(item=>item.title)};
  // Draw functions run inside Chromium. Embed only validated JSON as data.
  const draw = `function(g,t,context){(${drawBoard.toString()})(g,t,context,${JSON.stringify(data)})}`;
  worlds[name] = {scenes:[name],assets:[],viewport,presenterSpace:'world',camera:[{t:0,x:960,y:480,z:1}],draw:new Function('return ('+draw+')')()};
}
writePresenterPlan(__dirname,keys,{worlds});

function drawBoard(g,t,{info,lead},data){
  const ink='#152d2a', green='#14785d', blue='#39649f';
  const rect=(x,y,w,h,r,color)=>{
    g.beginPath();g.roundRect(x,y,w,h,r);g.fillStyle=color;g.fill();
  };
  const text=(s,x,y,size,color=ink,maxWidth=1245)=>{
    g.fillStyle=color;g.textAlign='left';g.font=size+'px Xiaolai';g.fillText(s,x,y,maxWidth);
  };
  text(data.date+'   /   AI 情报',537,128,34,green);
  text(data.intro?.question??data.story?.title??'今天的三条情报',532,237,74);
  text('个人观点，仅供参考',1503,886,25);
  if(data.intro && t < info.segmentStarts[1]+lead) return;
  if(!data.story){
    data.summary.forEach((line,i)=>{
      const y=330+i*158;
      rect(535,y,1235,123,23,'#edf3ed');
      text('0'+(i+1),577,y+77,48,green);
      text(line,715,y+77,48);
    });
    return;
  }
  text('0'+data.number+'  /  '+data.story.product,537,307,38,blue);
  const starts=info.segmentStarts.map(start=>start+lead);
  data.story.stages.forEach((stage,i)=>{
    const x=535+i*426;
    const begun=i===0||t>=starts[i];
    const current=begun&&(i===2||t<starts[i+1]);
    rect(x,424,365,280,25,begun?'#dfefe5':'#eff1ed');
    rect(x+26,452,60,55,12,current?green:'#d0ded4');
    text('0'+(i+1),x+36,489,29,current?'#fff':green);
    if(begun){
      text(stage.label,x+29,578,53,ink,306);
      text(stage.detail,x+29,641,38,green,306);
    }
    if(i>0&&begun){
      const start=x-53,end=x-10,y=561;
      g.strokeStyle=green;g.lineWidth=5;
      g.beginPath();g.moveTo(start,y);g.lineTo(end,y);
      g.lineTo(end-13,y-12);g.moveTo(end,y);g.lineTo(end-13,y+12);g.stroke();
      const p=Math.min(1,(t-starts[i])/.8);
      if(p<1){
        for(let j=0;j<3;j++){
          g.beginPath();g.arc(start+(end-start)*p+j*7,y,7-j,0,2*Math.PI);g.fillStyle=blue;g.fill();
        }
      }
    }
  });
}
