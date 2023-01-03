describe('Add new book page', () => {
  it('renders correctly', () => {
    cy.visit('/add-new-book/');

    cy.get('h1').contains('Add new book');
  });
});
