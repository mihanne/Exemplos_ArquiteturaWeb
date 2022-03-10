// importação de dependência(s)
import express from 'express'
import fs from 'fs/promises'

// variáveis globais deste módulo
const PORT = 3000
const db = {}
const app = express()

// carregar "banco de dados" (data/jogadores.json e data/jogosPorJogador.json)
// você pode colocar o conteúdo dos arquivos json no objeto "db" logo abaixo
// dica: 1-4 linhas de código (você deve usar o módulo de filesystem (fs))
db.jogadores = JSON.parse(await fs.readFile('server/data/jogadores.json')).players
db.jogosPorJogador = JSON.parse(await fs.readFile('server/data/jogosPorJogador.json'))
Object.keys(db.jogosPorJogador).forEach(id => {
  db.jogosPorJogador[id].games.sort((j1, j2) => j2.playtime_forever - j1.playtime_forever)
  db.jogosPorJogador[id].games.forEach(j => j.playtime_forever = (j.playtime_forever / 60).toFixed(0))
})


// configurar qual templating engine usar. Sugestão: hbs (handlebars)
//app.set('view engine', '???qual-templating-engine???');
//app.set('views', '???caminho-ate-pasta???');
// dica: 2 linhas
app.set('view engine', 'hbs')
app.set('views', 'server/views')


// EXERCÍCIO 2
// definir rota para página inicial --> renderizar a view index, usando os
// dados do banco de dados "data/jogadores.json" com a lista de jogadores
// dica: o handler desta função é bem simples - basta passar para o template
//       os dados do arquivo data/jogadores.json (~3 linhas)
app.get('/', (req, res) => {
  res.render('index', db)
})


// EXERCÍCIO 3
// definir rota para página de detalhes de um jogador --> renderizar a view
// jogador, usando os dados do banco de dados "data/jogadores.json" e
// "data/jogosPorJogador.json", assim como alguns campos calculados
// dica: o handler desta função pode chegar a ter ~15 linhas de código
app.get('/jogador/:id', (req, res) => {
  const id = req.params.id
  const perfil = db.jogadores.find(j => j.steamid === id)
  const jogos = db.jogosPorJogador[id]?.games

  if (!perfil || !jogos) {
    res.status(404).end('Jogador não encontrado')
  } else {
    perfil.qtdeJogos = jogos.length
    perfil.naoJogados = jogos.filter(j => j.playtime_forever == 0).length
    
    res.render('jogador', {
      perfil,
      jogos: jogos.slice(0, 50),
      favorito: jogos[0]
    })
  }
})

// EXERCÍCIO 1
// configurar para servir os arquivos estáticos da pasta "client"
// dica: 1 linha de código
app.use(express.static('client'))

// abrir servidor na porta 3000 (constante PORT)
// dica: 1-3 linhas de código
const server = app.listen(PORT, () => {
  const host = server.address().address
  const port = server.address().port

  console.log(`Servidor aberto em http://${host}:${port}`)
})