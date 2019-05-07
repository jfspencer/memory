import React, { FC } from 'react'
import { CardRow } from './CardRow'
import { GameConfig } from '../util/utils';
import random from 'lodash/fp/random';
import { connect } from 'react-redux';
import { getGameLayout, ResetGame } from '../state/SessionState';

type Props = {boardConfig: GameConfig, ResetGame: any}

export const _GameBoard: FC<Props> = ({boardConfig, ResetGame}) => {
    const resetGame = () => {
        ResetGame()
    }
    
    return (
        <div style={{backgroundColor: 'red', padding: '20px', display: 'flex'}}>
            <div onClick={resetGame}>RESET</div>
            {boardConfig.map(row => <CardRow key={random(1,999999)} row={row} />)}
        </div>
    )
}

const mapStateToProps = (state: any) => ({boardConfig: getGameLayout(state)})
export const GameBoard = connect(mapStateToProps, {ResetGame})(_GameBoard)