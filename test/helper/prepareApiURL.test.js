import prepareApiURL from '../../helper/prepareApiURL';
import {beforeEach, describe, expect, it} from 'vitest';

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

  it('returns url for an empty search', ()=> {
    expect(prepareApiURL(author, title, topic, language, currentPage))
        .toBe(`${baseURL}&page=1`);
  });

  it('returns url with author and title', () => {
    author = 'aldous';
    title = 'brave';

    expect(prepareApiURL(author, title, topic, language, currentPage))
        .toBe(`${baseURL}search=${author}%20${title}&page=1`);
  });

  it('returns url with title but without author', () => {
    title = 'brave';

    expect(prepareApiURL(author, title, topic, language, currentPage))
        .toBe(`${baseURL}search=${title}&page=1`);
  });
});
