export default () => {
    (function (d) {
        let ft = d.createElement('div');
        let fa = d.createElement('a');
        let fc = d.createElement('div');
        let fs = d.createElement('p');
        let tx = d.createTextNode("Feedback");

        ft.setAttribute("id", "feedback-tab");
        fa.setAttribute("id", "feedback-link");
        fa.setAttribute("href", "https://surveys.okta.com/jfe/form/SV_e4L0iW8a3tz8Yol");
        fc.setAttribute("id", "feedback-container");
        fs.setAttribute("id", "feedback-text");

        fs.appendChild(tx);
        fc.appendChild(fs);
        fa.appendChild(fc);
        ft.appendChild(fa);

        d.body.append(ft);
    }(document))
//
//    if (process.env.NODE_ENV === 'production' && typeof document !== 'undefined') {
//        (function (d) {
//            let s = d.createElement('script');
//            let dv = d.createElement('div');
//            dv.id = 'ZN_6fGBJ8J3VcIBymN';
//            var qualtricsScript = d.createTextNode(``);
//            s.appendChild(qualtricsScript);
//            d.body.append(s, dv);
//        }(document))
//    }
}
