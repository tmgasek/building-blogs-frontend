/* eslint-disable testing-library/await-async-utils */
/* eslint-disable no-undef */

// in the backend we have a route that's only available if we're in testing mode (have to start backend server with testing mode enabled) - this is so we have a clean fresh slate for each test.
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
      cy.contains('tester1 logged in successfully.');
    });

    it('fails with the incorrect credentials', function () {
      cy.contains('Login').click();
      cy.get('#username-login').type('tester1');
      cy.get('#password-login').type('wrong');
      cy.get('#loginSubmitBtn').click();

      cy.get('.error').should('contain', 'Wrong username / password');
    });
  });

  describe('when user 1 logged in', function () {
    this.beforeEach(function () {
      cy.login({ username: 'tester1', password: 'password' });
    });

    it('a blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('cypress test title');
      cy.get('#author').type('cypress test author');
      cy.get('#url').type('cypress test url');
      cy.get('#description').type('cypress test description');
      cy.get('#submitBlogBtn').click();

      cy.get('#BlogListContainer').contains('cypress test title');
      cy.get('.success').should('contain', 'cypress test title posted');
    });

    describe('and if a blog exists', function () {
      this.beforeEach(function () {
        cy.addBlog({
          title: 'cy title',
          author: 'cy author',
          url: 'cy url',
          description: 'cy description',
        });
      });

      it('a blog can be liked', function () {
        cy.get('#blogLink').click();
        cy.get('#likeBtn').click();
        cy.get('#likes').contains('1');
      });

      it('a blog can be deleted by its poster', function () {
        cy.get('#blogLink').click();
        cy.get('#popover-trigger-deleteBtn').click();
        cy.get('#deleteBtnConfirm').click();
        cy.get('#BlogListContainer').should('not.contain', 'cy title');
        cy.get('.success').should('contain', 'cy title removed');
      });

      it('a blog can`t be deleted by another user', function () {
        cy.get('#logOutBtn').click();
        cy.login({ username: 'tester2', password: 'password2' });
        cy.get('#blogLink').click();
        cy.get('html').should('not.contain', 'delete');
      });
    });

    describe('and several blogs exist', function () {
      this.beforeEach(function () {
        cy.addBlog({
          title: 'cy title 1',
          author: 'cy author',
          url: 'cy url',
          description: 'cy description',
        });
        cy.addBlog({
          title: 'cy title 2',
          author: 'cy author',
          url: 'cy url',
          description: 'cy description',
        });
        cy.addBlog({
          title: 'cy title 3',
          author: 'cy author',
          url: 'cy url',
          description: 'cy description',
          likes: 2,
        });
      });

      it('sorts by likes by default', function () {
        cy.root().find('#blogLink').first().contains('cy title 3');
      });

      it('sorts by likes after liking', function () {
        cy.contains('cy title 2').click();
        cy.get('#likeBtn')
          .click()
          .wait(500)
          .click()
          .wait(500)
          .click()
          .wait(500);

        cy.visit('http://localhost:3000');
        cy.root();
        cy.root().find('#blogLink').first().contains('cy title 2');
      });
    });
  });
});
