import { PomodoroPage } from './app.po';

describe('pomodoro App', function() {
  let page: PomodoroPage;

  beforeEach(() => {
    page = new PomodoroPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
