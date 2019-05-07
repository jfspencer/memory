import React from 'react';
import ReactDOM from 'react-dom';
import {genGameBoard, CardState} from './utils';
import flatMap from 'lodash/fp/flatMap';

const matchOnChar = (board: CardState[], char: string) => board.filter(v => v.char === char)
it('genGameBoard returns valid char pairs', () => {
    const flatBoard: CardState[] = flatMap(v => v, genGameBoard())
    expect(matchOnChar(flatBoard, 'A').length).toBe(2)
    expect(matchOnChar(flatBoard, 'B').length).toBe(2)
    expect(matchOnChar(flatBoard, 'C').length).toBe(2)
    expect(matchOnChar(flatBoard, 'D').length).toBe(2)
    expect(matchOnChar(flatBoard, 'E').length).toBe(2)
    expect(matchOnChar(flatBoard, 'F').length).toBe(2)
    expect(matchOnChar(flatBoard, 'G').length).toBe(2)
    expect(matchOnChar(flatBoard, 'H').length).toBe(2)
});
