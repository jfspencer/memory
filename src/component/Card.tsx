import React, { FC, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { CardState } from '../util/utils';
import { CardTap, CardClear } from '../state/SessionState';

const style = {
    base: {padding: '20px', width: '10vw', height:'10vh', border: '1px solid gray'},
    inactive: {backgroundColor: 'green'},
    active: {backgroundColor: 'yellow'}
}

type Props = { card: CardState, CardTap: any, CardClear: any, turn: CardState[]}
const _Card: FC<Props> = ({card, CardTap, CardClear, turn}) => {
    //const [isActive, setActive] = useState(false)
    const toggleState = useCallback(() => {
        if(!turn.find(v => v.id === card.id)) CardTap(card)
        else CardClear(card)
    }, [turn])
    console.log(card.char, !!turn.find(v => v.id === card.id))
    const cardState = card.found 
    ? (<div style={style.base}>{card.char}</div>) 
    : !!turn.find(v => v.id === card.id)
        ? <div style={style.base}>{card.char}</div>
        : <div style={style.base}></div>
    return (<div onClick={toggleState}> {cardState}</div>
    )
}

const mapStateToProps = (state: any ) => ({turn: state.sessionState.playerTurn})

export const Card = connect(mapStateToProps, {CardTap, CardClear})(_Card)