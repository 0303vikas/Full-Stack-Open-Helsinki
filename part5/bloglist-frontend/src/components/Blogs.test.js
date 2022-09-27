import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { Blog } from './Blogs'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
    let element

    const blog = {
        title: 'testing the blog',
        author: 'tester',
        url: 'http://localhost:3003',
        likes: 10
    }

    const user = {
        token: 'ishdio28suimdickds0sie92jj',
        username: 'vikas',
    }

    const blogUpdate = () => {
        console.log('test run')
    }

    beforeEach(() => {
        element = render(<Blog blog={ blog } user={ user } blogUpdate={ blogUpdate }  />)
        screen.debug()
    })

    test('initial view, only the title and the view button are visible', () => {
        const p = screen.getByText(blog.title)
        screen.debug()
        expect(p).toBeDefined()
    })

    test('<button>view</button>', async () => {
        const user = userEvent.setup()

        const viewbutton = screen.getByText('view')

        await user.click(viewbutton)

        screen.debug()

        expect(screen.getByText(blog.url).textContent).toBe(blog.url)
        expect(screen.getByText(blog.author).textContent).toBe(blog.author)
        expect(screen.getByText(blog.likes, { exact: false })).toBeInTheDocument()




    })

})
