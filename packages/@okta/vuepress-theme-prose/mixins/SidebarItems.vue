<script>
import _ from "lodash";
import { getGuidesInfo, guideFromPath, getCodeInfo, codeFromPath } from "../util/guides";
import { getJourneyInfo, journeyFromPath } from "../util/journeys";
import {
  concepts,
  guides,
  journeys,
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
        ...this.getJourneys(),
        {
          title: "API Docs",
          path: "https://developer.okta.com/docs/api",
          isExternal: true
        },
        ..._.cloneDeep(reference),
        ...this.getCodePages(),
        ..._.cloneDeep(releaseNotes)
      ];
    },
    getNavigationData() {
      this.navigation = this.getNavigation().map(nav => {
        this.addStatesToLink(nav);
        return nav;
      });
      return this.navigation;
    },

    sanitizeTitle(el) {
      if (el.guideName) {
        return el.guideName;
      }
      if (el.journeyName) {
        return el.journeyName;
      }
      if (el.codeName) {
        return el.codeName;
      }
      return el.title.toLowerCase().replace(/ /ig, '-').replace(/\//ig, '-').replace(/[()]/g, '');
    },

    addStatesToLink(link, parent = null) {
      // Reset iHaveChildrenActive value.
      link.iHaveChildrenActive = false;
      if (!link.path) {
        link.path = parent.path + this.sanitizeTitle(link) + "/";
        const isGuide = !link.guideName && !link.path.includes('docs/journeys');
        const isJourney = !link.journeyName && link.path.includes('docs/journeys');

        if (isGuide || isJourney || link.path.includes('/code/')) {
          const parentTitle = this.sanitizeTitle(parent);
          const linkTitle = this.sanitizeTitle(link);
          const splittedPath = parent.path?.split('/');
          let path = '';

          const isCorrectParent =
            (isGuide && parentTitle !== 'guides') ||
            (isJourney && parentTitle !== 'journeys') ||
            (link.path.includes('/code/') && parentTitle !== 'code');

          if (isCorrectParent && parent.path) {
            if (parent.path.includes(parentTitle)) {
              path = parent.path.replace(parentTitle, linkTitle);
            } else if (parent.path === '/code/') {
              path = `/${splittedPath[1]}/${linkTitle}/`;
            } else {
              path = `/${splittedPath[1]}/${splittedPath[2]}/${linkTitle}/`;
            }
          } else {
            path = parent.path + linkTitle + "/";
          }

          link.path = path;
        }
      }

      if (link.path) {
        if (
          this.$page.regularPath.indexOf('/-/') > 0 &&
          guideFromPath(this.$page.regularPath).guideName === link.guideName &&
          link.frameworks &&
          link.frameworks.length > 0
        ) {
          let updatedPath = this.$page.regularPath.replace('/-/', `/${link.frameworks[0]}/`);
          link.iHaveChildrenActive = link.path === updatedPath;
        } else {
          // Add state to leaf link
          link.iHaveChildrenActive = link.path === this.$page.regularPath;
        }
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
                current.title = current.title; // firstSection.title;
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
    },

    getJourneys() {
      const pages = this.$site.pages;
      const journeyInfo = getJourneyInfo({ pages });
      let navs = _.cloneDeep(journeys);
      const framework = journeyFromPath(this.$route.path).framework;
      navs.forEach(nav => {
        let queue = new Array();
        queue.push(nav);
        let current = queue.pop();
        while (current) {
          if (current?.subLinks) {
            queue.push(...current.subLinks);
          } else if (current?.journeyName) {
            // add sections
            current.subLinks = [];
            const journey = journeyInfo.byName[current.journeyName];

            if (Array.isArray(journey?.sections)) {
              const [firstSection] = journey.sections;

              if (journey.sections.length === 1 && firstSection.name === 'main') {
                current.title = current.title; // firstSection.title;
                current.path = firstSection.makeLink(journey.frameworks.includes(framework) ? framework : journey.mainFramework);
                current.frameworks = journey.frameworks;
              } else {
                journey.sections.forEach(section => {
                  current.subLinks.push({
                    title: section.title,
                    path: section.makeLink(
                      journey.frameworks.includes(framework)
                        ? framework
                        : journey.mainFramework
                    ),
                    frameworks: journey.frameworks
                  });
                });
              }
            }
          }
          current = queue.pop();
        }

      });
      return navs;
    },

    getCodePages() {
      const pages = this.$site.pages;
      const codeInfo = getCodeInfo({ pages });
      // You may want to define a constant similar to guides for code navigation structure
      // For now, build navigation from codeInfo.byName
      let navs = _.cloneDeep(languagesSdk);
      const framework = codeFromPath(this.$route.path).framework;
      navs.forEach(nav => {

      });
      navs.forEach(nav => {
        let queue = new Array();
        queue.push(nav);
        let current = queue.pop();
        while (current) {
          if (current?.subLinks) {
            queue.push(...current.subLinks);
          } else if (current?.codeName) {
            // add sections
            current.subLinks = [];
            const code = codeInfo.byName[current.codeName];

            if (Array.isArray(code?.sections)) {
              const [firstSection] = code.sections;

              // Special value for code that only has one section and should be
              // linked at the parent
              if (code.sections.length === 1 && firstSection.name === 'main') {
                current.title = current.title; // firstSection.title;
                current.path = firstSection.makeLink(code.frameworks.includes(framework) ? framework : code.mainFramework);
                current.frameworks = code.frameworks;
              } else {
                code.sections.forEach(section => {
                  current.subLinks.push({
                    title: section.title,
                    path: section.makeLink(
                      code.frameworks.includes(framework)
                        ? framework
                        : code.mainFramework
                    ),
                    frameworks: code.frameworks
                  });
                });
              }
            }
          }
          current = queue.pop();
        }

      });
      return navs;
    },
  }
}
</script>
