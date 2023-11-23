
const options =  
{        
    players : [],
    playersNumber : 2,
    time : 5,
    increment : 3,
    variant : 'classic',
    style : 'pixel',
    playerColors : ['White', 'Black'],
    boardColors : ['#1750AC', '#73B9EE'],
    sizeX : 8,
    sizeY : 8,
    FEN : '',
    DefaultFEN: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
}

class Options {
    constructor(auto){
        this.players = [],
        this.playersNumber = 2,
        this.time = 5,
        this.increment = 3,
        this.variant = 'classic',
        this.style = 'pixel',
        this.playerColors = ['White', 'Black'],
        this.boardColors = ['#1750AC', '#73B9EE'],
        this.sizeX = 8,
        this.sizeY = 8,
        this.FEN = '',
        this.DefaultFEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'     
    }
}

let styles = ['pixel', 'cburnett', 'merida', 'alpha',
          'pirouetti', 'chessnut', 'reillycraig',
          'companion', 'riohacha', 'kosal', 'leipzig',
          'fantasy', 'spatial', 'celtic', 'california',
          'caliente', 'pixel', 'maestro', 'fresca',
          'cardinal', 'gioco', 'tatiana', 'staunty',
          'governor', 'dubrovny', 'icpieces', 'mpchess',
          'kiwen-suwi', 'horsey', 'anarcandy', 'shapes',
          'letter', 'disguised'];

let variants = ['classic', '960']


module.exports = { options }
