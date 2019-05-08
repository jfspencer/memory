import React from 'react';
import { Card } from './Card';
import 'react-testing-library/cleanup-after-each';
import { render, cleanup } from 'react-testing-library'

afterEach(cleanup)

describe('Card', () => {
    it('should show invisible state when found === true', () => {
        // const {findByText} = render(<Card card={{found: true, id: 1, char:'a'}} />);
        // expect(findByText('card-invisible')).toBe(3)

    });

    it('should show active state when turn matches card id', () => {
        
    });

    it('should show inactive state when turn does not matches card id', () => {

    });
})
