describe('Blog app', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
    cy.contains('BlogApp')
  })

  it('login form can be opened', function () {
    cy.contains('login').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong credentials')
    })


  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#content').type('Cypress content')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('test.io')
      cy.contains('save').click()
      cy.contains('Cypress content')
    })

    it('Own blog can be deleted', function () {
      cy.contains('new blog').click()
      cy.get('#content').type('Cypress content')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('test.io')
      cy.contains('save').click()
      cy.contains('Cypress content')
      cy.contains('logout').click()
      cy.reload()
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.contains('Deleted blog')
      cy.reload()
      cy.contains('Cypress content').should('not.exist')
    })

    it('Likes are added', function () {
      cy.contains('new blog').click()
      cy.get('#content').type('Cypress content')
      cy.get('#author').type('Cypress')
      cy.get('#url').type('test.io')
      cy.contains('save').click()
      cy.contains('Cypress content')
      cy.contains('logout').click()
      cy.reload()
      cy.contains('view').click()
      cy.contains('like').click()
      cy.reload()
      cy.contains('view').click()
      cy.contains('Likes: 1')
    })
  })
})