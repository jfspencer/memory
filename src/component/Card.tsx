import React, { FC, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { validChar, CardState } from '../util/utils';
import Rxmq from 'rxmq';

const style = {
    base: {padding: '20px', width: '10vw', height:'10vh', border: '1px solid gray'},
    inactive: {backgroundColor: 'green'},
    active: {backgroundColor: 'yellow'}
}

type Props = { card: CardState}
const _Card: FC<Props> = ({card}) => {
    const [isActive, setActive] = useState(false)
    const toggleState = useCallback(() => {
        //Rxmq.channel(CardChannel).subject(tapAction).next(char);
        setActive(!isActive)
    }, [isActive])

    const cardState = card.found 
    ? (<div style={style.base}>{card.char}</div>) 
    : isActive 
        ? <div style={style.base}>{card.char}</div>
        : <div style={style.base}></div>

    return (<div onClick={toggleState}> {cardState}</div>
    )
}

const mapStateToProps = (state: any /*, ownProps*/) => {
    return {
      counter: state.board
    }
  }

export const Card = connect(mapStateToProps)(_Card)