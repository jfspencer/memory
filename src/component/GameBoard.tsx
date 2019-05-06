import React, { FC, useState } from 'react'
import { CardRow } from './CardRow'
import { genGameBoard } from '../util/utils';

export const GameBoard: FC = () => {
    const [board] = useState(genGameBoard())

    return (
        <div style={{backgroundColor: 'red', padding: '20px', display: 'flex'}}>
            {board.map(row => <CardRow row={row} />)}
        </div>
    )
}