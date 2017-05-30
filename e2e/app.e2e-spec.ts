import { FirstappPage } from './app.po';

describe('firstapp App', () => {
  let page: FirstappPage;

  beforeEach(() => {
    page = new FirstappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
