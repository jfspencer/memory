import React, { FC } from 'react'
import { validChar } from '../util/utils';

const style = {
    base: {padding: '20px', width: '10vw', height:'10vh'},
    inactive: {backgroundColor: 'green'},
    active: {backgroundColor: 'yellow'}
}

type Props = { char: validChar}
export const Card: FC<Props> = ({char}) => {
    return (<div style={style.base}>{char}</div>)
}