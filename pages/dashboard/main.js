/* eslint-disable require-jsdoc */
import '../../style/global.scss';
import Chart from 'chart.js/auto';
import BookDataBase from '../../store/book';
import SearchDataBase from '../../store/search';

const searchDB = new SearchDataBase();
const bookDB = new BookDataBase();
const authorFrequency = searchDB.getAttributeFrequency('author');
const topicFrequency = searchDB.getAttributeFrequency('topic');
const totalSearches = document.querySelector('#totalSearches');
const totalAddedBooks = document.querySelector('#totalAddedBooks');

// Shows the total searches made by the user
totalSearches.innerHTML = searchDB.getTotalSearches();
// Show the total books added by the user
totalAddedBooks.innerHTML = bookDB.getTotalBooks();

async function renderChart(node, type, frequencyData) {
  const canvas = document.getElementById(node);
  if (frequencyData.length > 0) {
    new Chart(
        canvas,
        {
          type,
          data: {
            labels: frequencyData.map((e) => e.name),
            datasets: [
              {
                label: 'Frequency',
                data: frequencyData.map((e) => e.frequency),
              },
            ],
          },
          options: {
            layout: {
              padding: 28,
            },
          },
        },
    );
  } else { // If there's no enough data for displaying a chart
    const context = canvas.getContext('2d');
    context.font = '20px Rubik';
    context.fillText(`There's no enough data`, 10, 30);
  }
}

// Render pie chart fot author frequency
await renderChart('searchesByAuthor', 'pie', authorFrequency);
// Render bar chart for topic frequency
await renderChart('searchesByTopic', 'bar', topicFrequency);
