import { TwkmgrPage } from './app.po';
import { createWriteStream } from 'fs';

function writeScreenShot(data, fileName) {
  const stream = createWriteStream(fileName);
  stream.write(new Buffer(data, 'base64'));
  stream.end()
}

describe('twkmgr App', () => {
  let page: TwkmgrPage;

  // 测试前实例化页面
  beforeEach(() => {
    page = new TwkmgrPage();
  });

  // 测试用例
  it('should display welcome message', done => {
    page.navigateTo();
    page.fillInfo().then(result => writeScreenShot(result, 'sc001.jpg'));
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('团队协作平台'))
      .then(done, done.fail);
  });
});
