import React, { FC, useState, useCallback } from 'react'
import { CardRow } from './CardRow'
import { genGameBoard, GameConfig } from '../util/utils';
import random from 'lodash/fp/random';
import { connect } from 'react-redux';
import { getGameLayout } from '../state/GameConfig';


type Props = {boardConfig: GameConfig, reset: any}

const ResetGameAction = () => ({type: '[GameBoard] RESET'})

export const _GameBoard: FC<Props> = (props) => {
    const resetGame = () => {
        props.reset()
    }
    console.log(props)
    return (
        <div style={{backgroundColor: 'red', padding: '20px', display: 'flex'}}>
            <div onClick={resetGame}>RESET</div>
            {props.boardConfig.map(row => <CardRow key={random(1,999999)} row={row} />)}
        </div>
    )
}

const mapStateToProps = (state: any) => {
    console.log(state)
    return ({boardConfig: getGameLayout(state)})
}
export const GameBoard = connect(mapStateToProps, {reset:ResetGameAction})(_GameBoard)