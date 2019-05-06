import React, { FC, useState } from 'react'
import { CardRow } from './CardRow'
import { genGameBoard } from '../util/utils';

const GameContext = React.createContext([]);

export const GameBoard: FC = () => {
    //contains CardRows
    const [board] = useState(genGameBoard())
    

    return (
        <div style={{backgroundColor: 'red', padding: '20px', display: 'flex'}}>
            {board.map(row => <CardRow row={row} />)}
        </div>
    )
}