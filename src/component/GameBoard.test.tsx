import React from 'react';
import ReactDOM from 'react-dom';
import { Card } from './Card';
import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import { render, cleanup } from 'react-testing-library'
afterEach(cleanup)

describe('GameBoard', () => {
    it('should reset when reset is tapped', () => {

    });

    it('should generate new game with correct rows when reseting with rows input', () => {

    });

    it('should generate new game with default rows when reseting without rows input', () => {

    });

    it('should generate new game with correct symbols when reseting with symbols input', () => {

    });

    it('should generate new game with default symbols when reseting without symbols input', () => {

    });
})