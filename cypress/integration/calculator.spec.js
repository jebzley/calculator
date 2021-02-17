it('Should check 5+2 equals 7', () => {
    cy.visit('http://127.0.0.1:5501/');

    cy.get('#5').click();
    cy.get('#plus').click();
    cy.get('#2').click();
    cy.get('#equals').click();
  
    cy.get('#output-display-total').should('contain', '7');
});

it('Should check 5*2 equals 10', () => {
  cy.visit('http://127.0.0.1:5501/');

  cy.get('#5').click();
  cy.get('#multiply').click();
  cy.get('#2').click();
  cy.get('#equals').click();

  cy.get('#output-display-total').should('contain', '10');
});

it('Should check 5/2 equals 5', () => {
  cy.visit('http://127.0.0.1:5501/');

  cy.get('#5').click();
  cy.get('#divide').click();
  cy.get('#2').click();
  cy.get('#equals').click();

  cy.get('#output-display-total').should('contain', '2.5');
});

it('Should check 5-2 equals 3', () => {
  cy.visit('http://127.0.0.1:5501/');

  cy.get('#5').click();
  cy.get('#minus').click();
  cy.get('#2').click();
  cy.get('#equals').click();

  cy.get('#output-display-total').should('contain', '3');
});

it('Should check 5*2% equals 0.1', () => {
  cy.visit('http://127.0.0.1:5501/');

  cy.get('#5').click();
  cy.get('#multiply').click();
  cy.get('#2').click();
  cy.get('#percent').click();
  cy.get('#equals').click();

  cy.get('#output-display-total').should('contain', '0.1');
});

it('Should check 5/2% equals 250', () => {
  cy.visit('http://127.0.0.1:5501/');

  cy.get('#5').click();
  cy.get('#divide').click();
  cy.get('#2').click();
  cy.get('#percent').click();
  cy.get('#equals').click();

  cy.get('#output-display-total').should('contain', '250');
});

it('Should check 5+2% equals 5.1', () => {
  cy.visit('http://127.0.0.1:5501/');

  cy.get('#5').click();
  cy.get('#plus').click();
  cy.get('#2').click();
  cy.get('#percent').click();
  cy.get('#equals').click();

  cy.get('#output-display-total').should('contain', '5.1');
});

it('Should check 5-2% equals 4.9', () => {
  cy.visit('http://127.0.0.1:5501/');

  cy.get('#5').click();
  cy.get('#minus').click();
  cy.get('#2').click();
  cy.get('#percent').click();
  cy.get('#equals').click();

  cy.get('#output-display-total').should('contain', '4.9');
});

it('Should check 5^2 equals 25', () => {
  cy.visit('http://127.0.0.1:5501/');

  cy.get('#5').click();
  cy.get('#exponent').click();
  cy.get('#2').click();
  cy.get('#equals').click();

  cy.get('#output-display-total').should('contain', '25');
});

it('Should check 5+(5-2) equals 8', () => {
  cy.visit('http://127.0.0.1:5501/');

  cy.get('#5').click();
  cy.get('#plus').click();
  cy.get('#brackets').click();
  cy.get('#5').click();
  cy.get('#minus').click();
  cy.get('#2').click();
  cy.get('#brackets').click();
  cy.get('#equals').click();

  cy.get('#output-display-total').should('contain', '8');
});