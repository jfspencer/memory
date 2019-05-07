import React, { FC, useState } from 'react'
import { Card } from './Card'
import { CardState } from '../util/utils';
import random from 'lodash/fp/random'

type Props = { row: CardState[]}

export const CardRow: FC<Props> = ({row}) => {
    return (
        <div style={{backgroundColor: 'blue', padding: '20px',}}>
            {row.map(v => (<Card key={random(0,9999999)} card={v} />))}
        </div>
    )
}