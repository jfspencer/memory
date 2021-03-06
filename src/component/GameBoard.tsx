import React, { FC, useState } from 'react'
import { CardRow } from './CardRow'
import { defaultGameChars } from '../util/utils';
import random from 'lodash/fp/random';
import { connect } from 'react-redux';
import { getGameLayout, ResetGame, GameConfig } from '../state/SessionState';
import { State } from '../state';

type Props = {boardConfig: GameConfig, ResetGame: typeof ResetGame}

export const _GameBoard: FC<Props> = ({boardConfig, ResetGame}) => {
    const [columns, setColumns] = useState(4)
    const [symbols, setSymbols] = useState(defaultGameChars)
    const resetGame = () => {
        ResetGame(columns, symbols)
    }
    
    return (
        <div style={{padding: '20px', display: 'flex'}}>
            <div style={{flexDirection:'row'}}>
                <div onClick={resetGame}>RESET</div>
                <div><input placeholder={'Symbols ex: 1,A,$,BFG'} onChange={(v) => setSymbols(v.target.value)} /></div>
                <div><input placeholder={'Row Count'} onChange={(v) => setColumns(Number(v.target.value))} /></div>
            </div>
            {boardConfig.map(row => <CardRow key={random(1,999999)} row={row} />)}
        </div>
    )
}

const mapStateToProps = (state: State) => ({boardConfig: getGameLayout(state)})
export const GameBoard = connect(mapStateToProps, {ResetGame})(_GameBoard)

//** */