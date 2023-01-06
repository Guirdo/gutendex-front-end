import {beforeAll, describe, expect, it} from 'vitest';
import BookDataBase from '../../store/book';
import books from '../fixtures/books.json';

describe('BookDataBase', ()=> {
  const bookDB = new BookDataBase();

  beforeAll(()=> {
    books.forEach((book)=>{
      bookDB.addBook({...book});
    });
  });

  it('return all the books', ()=> {
    expect(bookDB.getBooks())
        .toEqual(books);
  });

  it('calculates the average download count', ()=> {
    expect(bookDB.getDownloadCountAverage())
        .toBe(2001);
  });
});
