import React, { FC } from 'react'
import { Card } from './Card'
import { validChar } from '../util/utils';


type Props = { row: validChar[]}

export const CardRow: FC<Props> = ({row}) => {
    //CardRow contains Cards
    return (
        <div style={{backgroundColor: 'blue', padding: '20px',}}>
            {row.map(v => (<Card char={v} />))}
        </div>
    )
}