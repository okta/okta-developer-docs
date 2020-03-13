import {
    guideFromPath,
    makeGuidePath,
    getGuidesInfo
  } from '../util/guides';

export default {
    data: function () {
        return {
            section: null,
            guideName: null,
            contentKey: null,
            featured: null,
            framework: null,
            sectionName: null,
            currentPath: null,
        }
    },
    methods: {
        updatePath() {
            this.currentPath = window.location.pathname;
        },
    },
    beforeMount() {
        this.updatePath();
    },
    watch: {
        currentPath() {
            if (!this.currentPath.includes('/docs/guides')) {
                return;
            }

            let { guideName, framework, sectionName } = guideFromPath(this.currentPath);
            const pages = this.$site.pages;
            const guides = getGuidesInfo({ pages });
            const guide = guides.byName[guideName];

            if (guideName && (!framework || !sectionName)) {
                let hasChanged = false;

                if (!framework && guide.mainFramework) {
                    framework = guide.mainFramework;
                    hasChanged = !!framework;
                }

                if (!sectionName) {
                    sectionName = guide.order[0];
                    hasChanged = hasChanged || !!sectionName;
                }

                if (window && hasChanged) {
                    window.location.pathname = makeGuidePath({ guideName, framework, sectionName });
                }
            }

            this.featured = guides.featured;
            this.sectionName = sectionName;
            this.section = sectionName && guide.sectionByName[sectionName];
            this.guideName = guideName;
            this.contentKey =  this.section.componentKey;
            this.framework = framework;
        },

        '$route'() {
            this.updatePath();
        },
    }
}