import { TwkmgrPage } from './app.po';

describe('twkmgr App', () => {
  let page: TwkmgrPage;

  beforeEach(() => {
    page = new TwkmgrPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
