import {initGameBoard} from './utils';
import flatMap from 'lodash/fp/flatMap';
import { Card } from '../state/SessionState';

const matchOnChar = (board: Card[], char: string) => board.filter(v => v.char === char)
describe('initGameBoard', () => {
    it('should return valid char pairs', () => {
        const flatBoard: Card[] = flatMap(v => v, initGameBoard())
        expect(matchOnChar(flatBoard, 'A').length).toBe(2)
        expect(matchOnChar(flatBoard, 'B').length).toBe(2)
        expect(matchOnChar(flatBoard, 'C').length).toBe(2)
        expect(matchOnChar(flatBoard, 'D').length).toBe(2)
        expect(matchOnChar(flatBoard, 'E').length).toBe(2)
        expect(matchOnChar(flatBoard, '@').length).toBe(2)
        expect(matchOnChar(flatBoard, 'AB').length).toBe(2)
        expect(matchOnChar(flatBoard, 'BA').length).toBe(2)
    });

    it('should generate valid pairs with user defined input', () => {
        const board = initGameBoard(3, '1,2,3,4,*')
        const flatBoard: Card[] = flatMap(v => v, board)
        expect(matchOnChar(flatBoard, '1').length).toBe(2)
        expect(matchOnChar(flatBoard, '2').length).toBe(2)
        expect(matchOnChar(flatBoard, '3').length).toBe(2)
        expect(matchOnChar(flatBoard, '4').length).toBe(2)
        expect(matchOnChar(flatBoard, '*').length).toBe(2)
        expect(board[0].length).toBe(3)
        expect(board[1].length).toBe(3)
        expect(board[2].length).toBe(3)
        expect(board[3].length).toBe(1)
    })

    it('should generate valid pairs when duplicates are present', () => {
        const board = initGameBoard(3, '1,1,1,1,2,2,2,3,4,*')
        const flatBoard: Card[] = flatMap(v => v, board)
        expect(matchOnChar(flatBoard, '1').length).toBe(2)
        expect(matchOnChar(flatBoard, '2').length).toBe(2)
        expect(matchOnChar(flatBoard, '3').length).toBe(2)
        expect(matchOnChar(flatBoard, '4').length).toBe(2)
        expect(matchOnChar(flatBoard, '*').length).toBe(2)
        expect(board[0].length).toBe(3)
        expect(board[1].length).toBe(3)
        expect(board[2].length).toBe(3)
        expect(board[3].length).toBe(1)
    })
})

