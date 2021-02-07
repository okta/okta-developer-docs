<template>
  <div class="container-fluid">
    <div class="row">
    
    <h1>Instantly customize your login page</h1>
    </div>
    <div class="row">
      <div class="col-12">
        <button :disabled="jsTabShown" v-on:click="toggleTabs" > JS </button>
        <button :disabled="!jsTabShown" v-on:click="toggleTabs"> SCSS </button>
      </div>
    </div>
    <div class="row">
    <div class="col-4">
      <LiveWidgetOktaWidget :configJS="configJS" :configSCSS="configSCSS"/>
    </div>
    <div class="col-8">
      <LiveWidgetJSCodeMirror :initialConfig="configJS" v-on:cmJSValueSet='handleJSchange' v-if="jsTabShown"/>
      <LiveWidgetSCSSCodeMirror :initialConfig="configSCSS" v-else/>
    </div>
    </div>
  </div>
</template>

<script>
import { stringify } from 'query-string'
  import {initialJSWidgetConf, widgetMountExample, initialWidgetSCSS} from '../const/live-widget.const'
  export default {
    name: 'LiveWidget',
    components: {
      LiveWidgetSCSSCodeMirror: () => import('./LiveWidgetSCSSCodeMirror'),
      LiveWidgetJSCodeMirror: ()=> import('./LiveWidgetJSCodeMirror'),
      LiveWidgetOktaWidget: ()=> import('./LiveWidgetOktaWidget')
    },
    data() {
      return {
        jsTabShown: true,
        configJS: initialJSWidgetConf,
        configSCSS: initialWidgetSCSS,
      }
    },
    methods: {
      toggleTabs(){
        this.jsTabShown = !this.jsTabShown
      },
      makeValidJSON(dirtyJSON){
        const resultNormalized = []
        const result = dirtyJSON.split(/\n/).map( el => el.trim())
          .filter(el=>
           !el.startsWith('//') && el!=='')  
          .map(
            el => el.includes(' /') ? el.slice(0, el.search(' /')).trim() : el )
          .map(
            el => el[el.length-1] == ',' ? el.substring(0, el.length - 1) : el
          )
        result.forEach( (element,index) => {
          if (element.includes(": ")){
           element.split(': ').forEach(
             (elementTransformed, innerIndex) => {
              let strToPush = '' 
               if (elementTransformed === '{') {
                 console.log('BRACKET FOUND')
                 strToPush = elementTransformed}
               else {
                      if (elementTransformed[0] && elementTransformed[elementTransformed.length-1] === "'")
                      {
                        strToPush = `"${elementTransformed.substring(1, elementTransformed[length-1])}"`
                      } else {
                        strToPush = `"${elementTransformed}"`
                    }
                     strToPush = (innerIndex === 0) ? `${strToPush}:` : `${strToPush},`
                 }
               resultNormalized.push(strToPush)
             }
           )
          } else {
            resultNormalized.push(
              (element=== '}' && index!= result.length - 1) ?
               `${element},`: element)
          }
        });
        const resultCleared = resultNormalized.map(
          (element, index) => {
            if (
              resultNormalized[index+1] 
              &&
              resultNormalized[index+1].includes('}') 
              &&
              element[element.length - 1]===','){
             return element.substring(0, element.length - 1)
            } else return element
          }
        )
        return JSON.parse(resultCleared.join(""))
      },
      handleJSchange(e){
        this.configJS = this.makeValidJSON(e)
      },
      handleSCSSChange(e){
        this.scssCode = e
      }
    }
  }
</script>
