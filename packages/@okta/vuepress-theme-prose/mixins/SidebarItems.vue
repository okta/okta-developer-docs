<script>
import _ from "lodash";
import { getGuidesInfo, guideFromPath } from "../util/guides";
import {
  concepts,
  guides,
  languagesSdk,
  reference,
  releaseNotes
} from "../const/navbar.const";
      
export default {
  data() {
    return {
      navigation: [],
      link_id: 0,
    };
  },
  methods: {
    getNavigation() {
      const homeLink = { title: "Home", path: "/" };
      return [
        homeLink,
        ...this.getGuides(),
        ..._.cloneDeep(concepts),
        ..._.cloneDeep(reference),
        ..._.cloneDeep(languagesSdk),
        ..._.cloneDeep(releaseNotes)
      ];
    },
    getNavigationData() {
      this.navigation = this.getNavigation().map(nav => {
        this.addStatesToLink(nav);     
        return nav;
      });
      return this.navigation
    },

    sanitizeTitle(el) {
      if (el.guideName) {
        return el.guideName;
      }
      return el.title.toLowerCase().replace(/ /ig, '-').replace(/\//ig, '-');
    },

    addStatesToLink(link, parent = null) {
      // Reset iHaveChildrenActive value.
      link.iHaveChildrenActive = false;

      if (!link.path) {
        link.path = parent.path + this.sanitizeTitle(link) + "/";
        if (!link.guideName) {
          link.path = parent.path.replace(
            this.sanitizeTitle(parent),
            this.sanitizeTitle(link)
          );
        }
      }

      if (link.path) {
        // Add state to leaf link
        link.iHaveChildrenActive = link.path === this.$page.regularPath;
      }
      if (link.subLinks) {
        for (const subLink of link.subLinks) {
          // if link has active children - continue with the rest of its sublinks
          if (link.iHaveChildrenActive) {
            this.addStatesToLink(subLink, link);
          } else {
            link.iHaveChildrenActive = this.addStatesToLink(subLink, link);
          }
        }
      }

      return link.iHaveChildrenActive;
    },
    
    getGuides() {
      const pages = this.$site.pages;
      const guidesInfo = getGuidesInfo({ pages });
      let navs = _.cloneDeep(guides);
      const framework = guideFromPath(this.$route.path).framework;
      navs.forEach(nav => {
        let queue = new Array();
        queue.push(nav);
        let current = queue.pop();
        while (current) {
          if (current?.subLinks) {
            queue.push(...current.subLinks);
          } else if (current?.guideName) {
            // add sections
            current.subLinks = [];
            const guide = guidesInfo.byName[current.guideName];

            if (Array.isArray(guide?.sections)) {
              const [firstSection] = guide.sections;

              // Special value for guide that only has one section and should be
              // linked at the parent
              if (guide.sections.length === 1 && firstSection.name === 'main') {
                current.title = firstSection.title;
                current.path = firstSection.makeLink(guide.frameworks.includes(framework) ? framework : guide.mainFramework);
                current.frameworks = guide.frameworks;
              } else {
                guide.sections.forEach(section => {
                  current.subLinks.push({
                    title: section.title,
                    path: section.makeLink(
                      guide.frameworks.includes(framework)
                        ? framework
                        : guide.mainFramework
                    ),
                    frameworks: guide.frameworks
                  });
                });
              }
            }
          }
          current = queue.pop();
        }

      });
      return navs;
    }
  }
}
</script>