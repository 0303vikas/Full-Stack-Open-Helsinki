describe('Blog app', () => {
    it('front page can be opened', () => {
        cy.visit('http://localhost:3000')
        cy.contains('form')
        // cy.contains('Blogs')
        // cy.contains('Blogs app, Department of Computer Science, University of Helsinki 2022')
    })
})