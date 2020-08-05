export default () => {
    if (process.env.NODE_ENV === 'production' && typeof document !== 'undefined') {
        (function (d) {
            let s = d.createElement('script');
            let dv = d.createElement('div');
            dv.id = 'ZN_6fGBJ8J3VcIBymN';
            var qualtricsScript = d.createTextNode(`
            (function(){
                var g=function(e,h,f,g)
                {
                this.get=function(a){for(var a=a+"=",c=document.cookie.split(";"),b=0,e=c.length;b<e;b++){for(var d=c[b];" "==d.charAt(0);)d=d.substring(1,d.length);if(0==d.indexOf(a))return d.substring(a.length,d.length)}return null};
                this.set=function(a,c){var b="",b=new Date;b.setTime(b.getTime()+6048E5);b="; expires="+b.toGMTString();document.cookie=a+"="+c+b+"; path=/; "};
                this.check=function(){var a=this.get(f);if(a)a=a.split(":");else if(100!=e)"v"==h&&(e=Math.random()>=e/100?0:100),a=[h,e,0],this.set(f,a.join(":"));else return!0;var c=a[1];if(100==c)return!0;switch(a[0]){case "v":return!1;case "r":return c=a[2]%Math.floor(100/c),a[2]++,this.set(f,a.join(":")),!c}return!0};
                this.go=function(){if(this.check()){var a=document.createElement("script");a.type="text/javascript";a.src=g;document.body&&document.body.appendChild(a)}};
                this.start=function(){var t=this;"complete"!==document.readyState?window.addEventListener?window.addEventListener("load",function(){t.go()},!1):window.attachEvent&&window.attachEvent("onload",function(){t.go()}):t.go()};};
                try {
                    (new g(100,"r","QSI_S_ZN_6fGBJ8J3VcIBymN","https://zn6fgbj8j3vcibymn-oktainc.siteintercept.qualtrics.com/SIE/?Q_ZID=ZN_6fGBJ8J3VcIBymN")).start()
                } catch(i){}
                }
            )();`);
            s.appendChild(qualtricsScript);
            d.body.append(s, dv);
        }(document))
    }
}
