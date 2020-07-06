import { HtmlTagOnlyContentPipe } from './html-tag-only-content.pipe';

describe('HtmlTagOnlyContentPipe', () => {
  it('create an instance', () => {
    const pipe = new HtmlTagOnlyContentPipe();
    expect(pipe).toBeTruthy();
  });
});
