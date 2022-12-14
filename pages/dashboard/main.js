import '../../style/global.scss';
import UserBehaviourDataBase from '../../store/userBehaviour';
import BookDataBase from '../../store/book';

const userBehaviourDB = new UserBehaviourDataBase();
const bookDB = new BookDataBase();
const totalSearches = document.querySelector('#totalSearches');
const totalAddedBooks = document.querySelector('#totalAddedBooks');

// Shows the total searches made by the user
totalSearches.innerHTML = userBehaviourDB.getTotalSearches();
// Show the total books added by the user
totalAddedBooks.innerHTML = bookDB.getTotalBooks();
