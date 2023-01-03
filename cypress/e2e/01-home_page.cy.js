describe('Home page', () => {
  it('renders correctly', () => {
    cy.visit('/');
  });

  it('shows all the books', ()=> {
    cy.visit('/');

    cy.get('.advanced-search-form__button').click();
  });
});
