import MainPage from '../page-objects/MainPage';

describe('feedback widget sanity check', () => {
  const mainPage = new MainPage();

  beforeEach( () => {
    mainPage.visit('/test_page/');
  });

  it('validate feedback widget', () => {
    const widget = mainPage.getFeedbackWidget();
    widget.should('be.visible');
    widget.find('#feedback-link')
      .should('have.attr', 'href')
      .and('include', '#')
      .and('not.contain', 'https://surveys.okta.com');
  });

});
