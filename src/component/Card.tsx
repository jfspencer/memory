import React, { FC, useCallback } from 'react'
import { connect } from 'react-redux'
import { CardState } from '../util/utils';
import { CardTap } from '../state/SessionState';

const style = {
    base: {color:'black', fontSize: '70px', width: '15vw', height:'10vh', border: '1px solid gray', transition:'all 0.2s'},
    inactive: {backgroundColor: 'rgb(10,120,90)'},
    active: {backgroundColor: 'rgb(235,235,235)'},
}

const activeCard = {...{ transform: 'rotateY(0deg)'}, ...style.base, ...style.active}
const inactiveCard = {...{ transform: 'rotateY(-180deg)'}, ...style.base, ...style.inactive}
const matchedCard = {...{ transform: 'rotateY(0deg)'}, ...style.base, ...{backgroundColor:'rgb(60,60,55)', border: '0'}}

type Props = { card: CardState, CardTap: any, turn: CardState[]}
const _Card: FC<Props> = ({card, CardTap, turn}) => {
    const toggleState = useCallback(() => 
        !turn.find(v => v.id === card.id) ? CardTap(card) : null, [turn, CardTap, card])

    const cardState = card.found 
    ? (<div id="card-invisible" style={matchedCard} />) 
    : !!turn.find(v => v.id === card.id)
        ? <div id="card-active" style={activeCard}>{card.char}</div>
        : <div id="card-inactive" style={inactiveCard}></div>
    return (<div style={{margin:'15px'}} onClick={toggleState}> {cardState}</div>
    )
}

const mapStateToProps = (state: any ) => ({turn: state.sessionState.turn})

export const Card = connect(mapStateToProps, {CardTap})(_Card)