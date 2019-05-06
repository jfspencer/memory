import React, { FC, useState, useCallback } from 'react'
import { validChar } from '../util/utils';

const style = {
    base: {padding: '20px', width: '10vw', height:'10vh', border: '1px solid gray'},
    inactive: {backgroundColor: 'green'},
    active: {backgroundColor: 'yellow'}
}

type Props = { char: validChar, matchFound: boolean}
export const Card: FC<Props> = ({char, matchFound}) => {
    const [isActive, setActive] = useState(false)
    const toggleState = useCallback(() => {
        setActive(!isActive)
    }, [isActive])

    const cardState = matchFound 
    ? (<div style={style.base}>{char}</div>) 
    : isActive 
        ? <div style={style.base}>{char}</div>
        : <div style={style.base}></div>

    return (<div onClick={toggleState}> {cardState}</div>
    )
}