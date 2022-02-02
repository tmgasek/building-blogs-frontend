/* eslint-disable no-undef */
// describe('Dev-blog app', function () {
//   it('front page can be opened', function () {
//     cy.visit('http://localhost:3000');
//     cy.contains('Login');
//     cy.contains('Sign Up');
//   });
// });

describe('Blog app', function () {
  this.beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');

    const user1 = {
      name: 'cypress',
      username: 'tester1',
      password: 'password',
    };

    const user2 = {
      name: 'cypress2',
      username: 'tester2',
      password: 'password2',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user1);
    cy.request('POST', 'http://localhost:3001/api/users', user2);

    cy.visit('http://localhost:3000');
  });

  it('login form shown', function () {
    cy.contains('Login');
  });

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Login').click();
      cy.get('#username-login').type('tester1');
      cy.get('#password-login').type('password');
      cy.get('#loginSubmitBtn').click();
      cy.contains('tester1 logged in');
    });

    it('fails with the incorrect credentials', function () {
      cy.contains('Login').click();
      cy.get('#username-login').type('tester1');
      cy.get('#password-login').type('wrong');
      cy.get('#loginSubmitBtn').click();

      cy.get('.error').should('contain', 'wrong username / password');
    });
  });
});
