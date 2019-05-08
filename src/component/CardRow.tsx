import React, { FC } from 'react'
import { Card } from './Card'
import random from 'lodash/fp/random'
import { CardState } from '../state/SessionState';

type Props = { row: CardState[]}

export const CardRow: FC<Props> = ({row}) => {
    return (
        <div style={{backgroundColor: 'rgb(60,60,55)'}}>
            {row.map(v => (<Card key={random(0,9999999)} card={v} />))}
        </div>
    )
}