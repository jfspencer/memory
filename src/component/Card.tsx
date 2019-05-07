import React, { FC, useCallback } from 'react'
import { connect } from 'react-redux'
import { CardState } from '../util/utils';
import { CardTap } from '../state/SessionState';

const style = {
    base: {color:'black', fontSize: '70px', padding: '20px', width: '10vw', height:'10vh', border: '1px solid gray', transition:'all 0.2s'},
    inactive: {backgroundColor: 'green'},
    active: {backgroundColor: 'rgb(235,235,235)'}
}

const activeCard = {...{ transform: 'rotateY(0deg)'}, ...style.base, ...style.active}
const inactiveCard = {...{ transform: 'rotateY(-180deg)'}, ...style.base, ...style.inactive}

type Props = { card: CardState, CardTap: any, turn: CardState[]}
const _Card: FC<Props> = ({card, CardTap, turn}) => {
    const toggleState = useCallback(() => 
        !turn.find(v => v.id === card.id) ? CardTap(card) : null, [turn, CardTap, card])

    const cardState = card.found 
    ? (<div style={activeCard}>{card.char}</div>) 
    : !!turn.find(v => v.id === card.id)
        ? <div style={activeCard}>{card.char}</div>
        : <div style={inactiveCard}></div>
    return (<div onClick={toggleState}> {cardState}</div>
    )
}

const mapStateToProps = (state: any ) => ({turn: state.sessionState.playerTurn})

export const Card = connect(mapStateToProps, {CardTap})(_Card)