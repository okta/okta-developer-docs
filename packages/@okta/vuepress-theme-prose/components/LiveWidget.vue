<template>
  <div class="live-widget-wrapper"> 

      <div class="container">
        <div class="row">
          <div class="col-12">
          <h1 class="header">Instantly customize your login page</h1>
          </div>
        </div>
      </div>
      
      <div class="background-curve"></div>


      <div class="background-darkblue">
      <div class="container">
        <div class="row">
          <div class="col-8 offset-4">
            <div class="button-holder">
              <button class="toggle-button" :disabled="jsTabShown" v-on:click="toggleTabs" > JS </button>
              <button class="toggle-button" :disabled="!jsTabShown" v-on:click="toggleTabs"> SCSS </button>
            </div>
          </div>
        </div>
        <div class="row widgets-wrapper">
          <div class="col-4">
            <LiveWidgetOktaWidget :configJS="jsValid" :configSCSS="computedSCSS"/>
          </div>
          <div 
              v-bind:class="{'col-8': true, 'non-visible': !jsTabShown }" 
            >
            <div class="cm-wrapper">
              <LiveWidgetJSCodeMirror 
              :initialConfig="configJS" 
              v-on:cmJSValueSet='onJSCodeChange' 
              />
            </div>
          </div>
          <div 
            v-bind:class="{'col-8': true, 'non-visible': jsTabShown }"
          >  
            <div class="cm-wrapper">
              <LiveWidgetSCSSCodeMirror 
              :initialConfig="configSCSS"
              v-on:cmCSSValueSet='onSCSSCodeChange' 
              />
            </div>
          </div>
        </div>
      </div>
      </div>
  </div>
</template>

<script>
  import {initialJSWidgetConf, initialWidgetSCSS} from '../const/live-widget.const'
  import sass from '../util/sass/sass'
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
        configJS:  initialJSWidgetConf,
        configSCSS: initialWidgetSCSS,
        computedSCSS: '',
        sassCompiler: {}
      }
    },
    mounted: function(){
      this.sassCompiler = new sass()
      this.loadSassFiles()
    },
    computed: {
      jsValid: function(){
        return this.makeValidJSON(this.configJS)
        },
    }, 
  
    methods: {
      toggleTabs(){
        this.jsTabShown = !this.jsTabShown
      },
      makeValidJSON(dirtyJSON){
        //get type of string and use result for envoking function from transformByStrType structure
        const defineStrType = (str) => {

          const length = str.length
          const firstChar = str[0]
          const lastChar = str[length-1]

          const areWrongParanthesis = firstChar === lastChar && firstChar=== "'"
          const areCorrectParanthesis = firstChar === lastChar && firstChar === '"'
          const moreThanOneSymbol = length!==1
          const isArr = firstChar === '[' && lastChar===']'

          if(areCorrectParanthesis){return 'isValidJsonString'}
          if (!moreThanOneSymbol) {return 'isBracket'}
          if (isArr) {return 'isArray'}
          if (areWrongParanthesis && moreThanOneSymbol) {return 'wrongParenthasis'} 
          if (!areWrongParanthesis && !isArr && moreThanOneSymbol) {return 'noParenthasis'}
        }
        //transform string due to string type
        const transformByStrType = {
          isArray: (str) => {
            const strToArrConversion = str.substring(1,str.length-1)
                                          .split(', ')
                                          .map( (el)=> transformByStrType.wrongParenthasis(el))
                                          .join(', ')
            return `[${strToArrConversion}]`
          },
          isBracket: (str) => str,
          isValidJsonString: (str)=> str,
          wrongParenthasis: (str) => `"${str.substring(1, str.length-1)}"`,
          noParenthasis: (str) => `"${str}"`
        }

        //add , or : to needed places s
        const addRightSeparator = (indexStr, str, isLastElement = false)=>{
          if (str === '{') return str
          return indexStr === 0 ? `${str}:` : `${str},`
        }

        const resultNormalized = []

        //clean up initial string from comments, name of object and unneccary semicolon
        const result = dirtyJSON.slice(dirtyJSON.indexOf('{')).split(/\n/).map( el => el.trim())
          .filter(el=>
           !el.startsWith('//') && el!=='')  
          .map(
            el => el.includes(' /') ? el.slice(0, el.search(' /')).trim() : el )
          .map(
            el => el[el.length-1] == ',' ? el.substring(0, el.length - 1) : el
          )

        //make valid json string from strings included  
        result.forEach( (element,index) => {
          if (element.includes(": ")){
           element.split(': ').forEach(
             (elementToTransform, innerIndex) => {
               const transformed = transformByStrType[defineStrType(elementToTransform)](elementToTransform)
               resultNormalized.push(addRightSeparator(innerIndex, transformed))
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
        ).join('').slice(0, -1)
        return JSON.parse(resultCleared)
      },
      onJSCodeChange(e){
        this.configJS = e
      },
      onSCSSCodeChange(e){
        this.sassCompiler.compile(e, (res)=> {
          this.computedSCSS = res.text
        })
      },
      loadSassFiles(){
              // SASS files are needed to correctly compile scss requests are made relative to worker
              var base = '/widget-sass';

              // the directory files should be made available in
              var directory = '';

              // the files to load (relative to both base and directory)
              var files = [
                '_base.scss',
                '_container.scss',
                '_fonts.scss',
                '_helpers.scss',
                '_ie.scss',
                '_layout.scss',
                '_variables.scss',
                'common/admin/icons/_all.scss',
                'common/admin/icons/_classes-social.scss',
                'common/admin/icons/_classes.scss',
                'common/admin/icons/_functions.scss',
                'common/admin/icons/_variables-theme.scss',
                'common/admin/icons/_variables-unicode-social.scss',
                'common/admin/icons/_variables-unicode.scss',
                'common/admin/modules/infobox/_infobox.scss',
                'common/enduser/_helpers.scss',
                'common/enduser/_reset.scss',
                'common/enduser/_responsive-variables.scss',
                'common/foo.scss',
                'common/shared/helpers/_all.scss',
                'common/shared/helpers/_mixins.scss',
                'common/shared/helpers/_variables.scss',
                'common/shared/o-forms/_o-form-variable.scss',
                'common/shared/o-forms/_o-form.scss',
                'modules/_accessibility.scss',
                'modules/_app-login-banner.scss',
                'modules/_beacon.scss',
                'modules/_btns.scss',
                'modules/_consent.scss',
                'modules/_enroll.scss',
                'modules/_factors-dropdown.scss',
                'modules/_footer.scss',
                'modules/_forgot-password.scss',
                'modules/_forms.scss',
                'modules/_header.scss',
                'modules/_infobox.scss',
                'modules/_mfa-challenge-forms.scss',
                'modules/_okta-footer.scss',
                'modules/_qtip.scss',
                'modules/_registration.scss',
                'modules/_social.scss',
                'okta-sign-in.scss',
                'okta-theme.scss',
                'widgets/_chosen.scss',
                'widgets/_jquery.qtip.scss',
                'widgets/_mega-drop-down.scss',
              ];

              // register the files to be loaded when required
              this.sassCompiler.preloadFiles(base, directory, files, function() {
                // console.log('SAAS files loaded');
              });
      }
    }
  }
</script>
