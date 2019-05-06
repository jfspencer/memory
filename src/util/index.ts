//take an array of unique character, return a valid gameboard array

type validChar = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H'
type GameBoard = validChar[][]

export const genGameBoard = (charArr: string[]):GameBoard => {
    //flatmap the charArray to generate the char pairs
    
    return [['A'],['A']]
}