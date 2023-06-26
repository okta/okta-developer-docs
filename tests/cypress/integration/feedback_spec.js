import MainPage from '../page-objects/MainPage';

describe('header sanity check', () => {
  const mainPage = new MainPage();

  beforeEach( () => {
    mainPage.visit('/test_page/');
  });

  it('validate feedback widget', () => {
    mainPage.getFeedbackWidget().should('be.visible');
  });

});
