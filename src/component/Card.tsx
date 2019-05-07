import React, { FC, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { CardState } from '../util/utils';
import { CardTap, CardClear } from '../state/SessionState';

const style = {
    base: {color:'black',padding: '20px', width: '10vw', height:'10vh', border: '1px solid gray', transition:'all 0.2s'},
    inactive: {backgroundColor: 'green'},
    active: {backgroundColor: 'rgb(235,235,235)'}
}

type Props = { card: CardState, CardTap: any, CardClear: any, turn: CardState[]}
const _Card: FC<Props> = ({card, CardTap, CardClear, turn}) => {
    const toggleState = useCallback(() => 
        !turn.find(v => v.id === card.id) ? CardTap(card) : CardClear(card), [turn])

    const cardState = card.found 
    ? (<div style={{...{ transform: 'rotateY(0deg)'}, ...style.base, ...style.active}}>{card.char}</div>) 
    : !!turn.find(v => v.id === card.id)
        ? <div style={{...{ transform: 'rotateY(0deg)'}, ...style.base, ...style.active}}>{card.char}</div>
        : <div style={{...{ transform: 'rotateY(-180deg)'}, ...style.base, ...style.inactive}}></div>
    return (<div onClick={toggleState}> {cardState}</div>
    )
}

const mapStateToProps = (state: any ) => ({turn: state.sessionState.playerTurn})

export const Card = connect(mapStateToProps, {CardTap, CardClear})(_Card)