import { browser, by, element } from 'protractor';

// po -> page object
export class TwkmgrPage {
  // 默认给我们做了一个导航 -> 根目录
  navigateTo() {
    return browser.get('/');
  }

  // 获取页面内容
  getParagraphText() {
    // 通过 css 选择元素，获取内容
    return element(by.css('app-root mat-nav-sidenav-container')).getText();
  }
  fillInfo() {
    element(by.id('mat-input-1')).sendKeys('dev');
    element(by.id('mat-input-2')).sendKeys('dev');
    element(by.buttonText('登录')).click();
    return browser.takeScreenshot();
  }
}
