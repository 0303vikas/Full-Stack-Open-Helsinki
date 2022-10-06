describe('Blog app', () => {
    beforeEach(() => {
        cy.signup({
            username: 'dropi',
            name: 'dropi',
            password: 'dropidropi'
        })
    })


    it('user can be logged in', () => {
        cy.login({ username: 'dropi', password: 'dropidropi' })
    })

    // it.only('login fails with wrong password', () => {
    //     cy.visit('http://localhost:3000')
    //     cy.get('input:first').type('dropi')
    //     cy.get('input:last').type('dropi')
    //     cy.get('#login_button').click()

    //     cy.get('.errormessage').should('contain','Wrong credentials').and('have.css', 'color', 'rgb(255, 0, 0)')


    //     cy.contains('Wrong credentials')
    // })

    describe('When logged in', () => {
        beforeEach(() => {
            cy.login({ username: 'dropi', password: 'dropidropi' })
        })

        // it('logout user', () => {
        //     cy.get('#logout_button').click()
        //     cy.contains('username')

        // })

        it('Create new blog', () => {
            cy.contains('New Note')
            cy.get('#noteform_show_cancel_button').click()

            cy.contains('Cancel')
            cy.get('#new_blog_form_title').type('Atomic Habits: And Easy and proven Way to Build habits')
            cy.get('#new_blog_form_author').type('James Clear')
            cy.get('#new_blog_form_url').type('http://localhost:3003')
            cy.get('#new_blog_form_likes').type(30)
            cy.get('#new_blog_form_submit').click()

            cy.get('#noteform_show_cancel_button').click()

        // it('Create new blog', () => {
        //     cy.contains
        // })



            // cy.get('noteform_show_cancel_button')
        })


    })
})