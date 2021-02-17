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
        <LiveWidgetOktaWidget :configJS="jsValid" :configSCSS="computedSCSS"/>
      </div>
      <div 
          class="col-4" 
        >
        <LiveWidgetJSCodeMirror 
        :initialConfig="configJS" 
        v-on:cmJSValueSet='onJSCodeChange' 
        />
      </div>
      <div 
        class="col-4"
      >  
        <LiveWidgetSCSSCodeMirror 
        :initialConfig="testStr"
        v-on:cmCSSValueSet='onSCSSCodeChange' 
        />
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
        testStr: '$someVar: 123px; .some-selector { width: $someVar; }',
        sassCompiler: new sass()
      }
    },
    computed: {
      jsValid: function(){
        return this.makeValidJSON(this.configJS)
        },
    }, 
    // watch: {
    //   computedSCSS: function(){
    //     console.log('Computed changed')
    //   }
    // },
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
        // console.log('RESULT NORMALIZED', resultNormalized)
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
      }
    }
  }
</script>
