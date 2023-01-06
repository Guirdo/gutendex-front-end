import prepareApiURL from '../../helper/prepareApiURL';
import { beforeEach, describe, expect, it } from 'vitest';

describe('#prepareApiURL', () => {
  const baseURL = 'https://gutendex.com/books?';
  let author;
  let title;
  let topic;
  let language;
  let currentPage;

  beforeEach(() => {
    author = '';
    title = '';
    topic = '';
    language = '';
    currentPage = 1;
  });

  it('returns url with author and title', () => {
    const author = 'aldous';
    const title = 'brave';

    expect(prepareApiURL(author, title, topic, language, currentPage))
        .toBe(`${baseURL}search=${author}%20${title}&page=1`);
  });
});
