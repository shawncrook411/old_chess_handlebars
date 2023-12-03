var write = (game) =>{
    written = game
    delete written.board 
    data = JSON.stringify(written, null, 2)
    fs.writeFile(`./data/games/${game.id}`, data, (err) => err ? console.error(err) : {})
}
