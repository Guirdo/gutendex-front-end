/* eslint-disable require-jsdoc */
import '../../style/global.scss';
import Chart from 'chart.js/auto';
import UserBehaviourDataBase from '../../store/userBehaviour';
import BookDataBase from '../../store/book';

const userBehaviourDB = new UserBehaviourDataBase();
const bookDB = new BookDataBase();
const authorFrequency = userBehaviourDB.getAttributeFrequency('author');
const topicFrequency = userBehaviourDB.getAttributeFrequency('topic');
const totalSearches = document.querySelector('#totalSearches');
const totalAddedBooks = document.querySelector('#totalAddedBooks');

// Shows the total searches made by the user
totalSearches.innerHTML = userBehaviourDB.getTotalSearches();
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
