(self.webpackChunk=self.webpackChunk||[]).push([[143],{138:(e,t,a)=>{const s=a(475),n=a(27),{lightningChart:i,AxisTickStrategies:r,Themes:d}=s,{createProgressiveTraceGenerator:o}=n,l=i().Chart3D({}).setBoundingBox({x:1,y:.5,z:.4});l.getDefaultAxisX().setTitle("Axis X"),l.getDefaultAxisY().setTitle("Axis Y"),l.getDefaultAxisZ().setTitle(""),l.getDefaultAxisZ().setTickStrategy(r.Empty);const m=[{name:"Series A",dataAmount:50},{name:"Series B",dataAmount:50},{name:"Series C",dataAmount:50}];l.getDefaultAxisX().setInterval({start:0,end:m.reduce(((e,t)=>Math.max(e,t.dataAmount)),0)}),l.getDefaultAxisZ().setInterval({start:-1,end:1+m.reduce(((e,t,a)=>Math.max(e,a)),0)});let u=0;m.forEach(((e,t)=>{const a=e.name||"",s=e.dataAmount||100,n=e.z||t,i=l.addPointLineSeries().setName(a);o().setNumberOfPoints(s).generate().toPromise().then((e=>e.map((e=>({x:e.x,y:e.y,z:n}))))).then((e=>{setInterval((()=>{const t=e.splice(0,3);t.length>0&&(i.add(t),u+=t.length,l.setTitle(`3D Line Series (${u} data points)`))}),30)}))})),l.addLegendBox().setAutoDispose({type:"max-width",maxWidth:.3}).add(l)}},e=>{e.O(0,[736],(()=>(138,e(e.s=138)))),e.O()}]);