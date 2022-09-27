import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { Blog } from './Blogs'

describe('testing the blog render component', () => {

    // beforeEach(() => {

    // })

    test('initial view, only the title and the view button are visible', () => {
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

        render(<Blog blog={ blog } user={ user } blogUpdate={ blogUpdate }  />)
        const p = screen.getByText(blog.title)
        screen.debug()
        expect(p).toBeDefined()
    })

})
