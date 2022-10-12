describe('Blog app', () => {
    beforeEach(() => {
        // cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.signup({
            username: 'dropi',
            name: 'dropi',
            password: 'dropidropi'
        })
        cy.visit('http://localhost:3000')
        cy.get('button')
    })


    it('user can be logged in', () => {
        cy.login({ username: 'dropi', password: 'dropidropi' })
        cy.createblog({ title: 'Atomic Habits: And Easy and proven Way to Build habits', author: 'James Clear', url: 'http://localhost:3003', likes: 30 })

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
            cy.createblog({ title: 'Atomic Habits: And Easy and proven Way to Build habits', author: 'James Clear', url: 'http://localhost:3003', likes: 28 })
            cy.createblog({ title: 'Life of Vinayak', author: 'Vikas Singh', url: 'http://localhost:3000/api/blogs', likes: 29 })
            cy.visit('http://localhost:3000')
            cy.wait(1000)

        })

        // it('logout user', () => {
        //     cy.get('#logout_button').click()
        //     cy.contains('username')

        // })

        it('View and hide blog', () => {
            cy.get('button').eq(2).click()
            cy.get('button').eq(2).click()
        })




        it('Click view blog button', () => {
            cy.get('button').eq(2).click()
            cy.get('.blog').find('span').should('contain', 'Likes  28 like')
            cy.get('.blog').find('button').first().click()
            cy.wait(1000)
            cy.get('.blog').find('span').should('have.text', 'Likes  29 like')


        })

        it('Blogs are shown in asc order of likes', () => {
            cy.get('button').eq(2).click()
            cy.get('.blog').find('span').should('contain', 'Likes  28 like')
            cy.get('button').eq(2).click()

            cy.get('button').eq(3).click()
            cy.get('.blog').find('span').should('contain', 'Likes  29 like')
            cy.get('button').eq(3).click()

        })

        // it('Remove blog', () => {
        //     cy.get('button').eq(2).click()
        //     cy.get('.blog').find('span').should('contain', 'Likes  28 like')
        //     cy.get('.blog').find('button').last().click()
        //     cy.wait(1000)
        //     cy.get('.blog').should('not.exist')

        // })


    })


})
