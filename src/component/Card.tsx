import React, { FC, useState, useCallback } from 'react'
import { validChar } from '../util/utils';

const style = {
    base: {padding: '20px', width: '10vw', height:'10vh', border: '1px solid gray'},
    inactive: {backgroundColor: 'green'},
    active: {backgroundColor: 'yellow'}
}

type Props = { char: validChar}
export const Card: FC<Props> = ({char}) => {
    const [isActive, setActive] = useState(false)
    const toggleState = useCallback(() => {
        setActive(!isActive)
    }, [isActive])

    return (<div onClick={toggleState}>
        { isActive 
            ? <div style={style.base}>{char}</div>
            : <div style={style.base}></div>
        }
    </div>
    )
}