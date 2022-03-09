console.log('teste')


let frames = 0
const som_HIT = new Audio()
som_HIT.src = './efeitos/hit.wav'

const sprites = new Image()
sprites.src = './sprites.png'

const canvas = document.querySelector('canvas')
const contexto = canvas.getContext('2d')


// Plano de fundo
const planoDeFundo = {
  spriteX: 390,
  spriteY: 0,
  largura: 275,
  altura: 204,
  x: 0,
  y: canvas.height - 204,
  desenha () {
    contexto.fillStyle = '#70c5ce'
    contexto.fillRect(0, 0, canvas.width, canvas.height)

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY, // Sprite x, e sprite y
      planoDeFundo.largura, planoDeFundo.altura, // Tamanho do recorte na sprite
      planoDeFundo.x, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura
    )

    contexto.drawImage(
      sprites,
      planoDeFundo.spriteX, planoDeFundo.spriteY, // Sprite x, e sprite y
      planoDeFundo.largura, planoDeFundo.altura, // Tamanho do recorte na sprite
      planoDeFundo.x + planoDeFundo.largura, planoDeFundo.y,
      planoDeFundo.largura, planoDeFundo.altura
    )
  }
}

// Chão
function criaChao() {
  const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    atualiza() {
      const movimentoDoChao = 1
      const repeteEm = chao.largura / 2
      const movimentacao = chao.x - movimentoDoChao

      //console.log(chao.x)
      //console.log(repeteEm)
      //console.log(movimentacao % repeteEm)
      chao.x = movimentacao % repeteEm
    },
    desenha () {

      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY, // Sprite x, e sprite y
        chao.largura, chao.altura, // Tamanho do recorte na sprite
        chao.x, chao.y,
        chao.largura, chao.altura
      )

      contexto.drawImage(
        sprites,
        chao.spriteX, chao.spriteY, // Sprite x, e sprite y
        chao.largura, chao.altura, // Tamanho do recorte na sprite
        chao.x + chao.largura, chao.y,
        chao.largura, chao.altura
      )
    }
  }
  return chao
}

function fazColisao(flappyBird, chao) {
  const flappyBirdY = flappyBird.y + flappyBird.altura
  const chaoY = chao.y

  if (flappyBirdY >= chaoY){
    return true
  }

  return false
}

function criaFlappyBird() {
  const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula() {
      console.log('devo pular')
      console.log('antes', flappyBird.velocidade)
      flappyBird.velocidade = - flappyBird.pulo
      console.log('depois', flappyBird.velocidade)
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
      if (fazColisao(flappyBird, globais.chao)){
        console.log('Fez a colisão')
        som_HIT.play()
        
        mudarParaTela(Telas.GAME_OVER)
        return
      }
      flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade
      flappyBird.y = flappyBird.y + flappyBird.velocidade
    },
    movimentos:[
      { spriteX: 0, spriteY: 0, }, // Asa para cima
      { spriteX: 0, spriteY: 26, }, // Asa no meio
      { spriteX: 0, spriteY: 52, }, // Asa para baixo
      { spriteX: 0, spriteY: 26, }, // Asa no meio
    ],
    frameAtual: 0,
    frameSpeed: 0.15,
    atualizaOFrameAtual() {
      const intervaloDeFrames = 10
      const passouOIntervalo = frames % intervaloDeFrames === 0
      //console.log('passouOIntervalo', passouOIntervalo)

      if (passouOIntervalo) {
        const baseDoIncremento = 1
        const incremento = baseDoIncremento + flappyBird.frameAtual
        const baseRepeticao = flappyBird.movimentos.length
        flappyBird.frameAtual = incremento % baseRepeticao
      } 

      //  Outra forma de animar if (flappyBird.frameAtual > flappyBird.movimentos.length - 1){
      //  flappyBird.frameAtual = 0
      //}
      //flappyBird.frameAtual = flappyBird.frameAtual + flappyBird.frameSpeed
    },
    desenha () {
      flappyBird.atualizaOFrameAtual()
      const { spriteX, spriteY } = flappyBird.movimentos[flappyBird.frameAtual]
      //const { spriteX, spriteY } = flappyBird.movimentos[parseInt(flappyBird.frameAtual)]

      contexto.drawImage(
        sprites,
        spriteX, spriteY, // Sprite x, e sprite y
        flappyBird.largura, flappyBird.altura, // Tamanho do recorte na sprite
        flappyBird.x, flappyBird.y,
        flappyBird.largura, flappyBird.altura
      )
    }
  }
  return flappyBird
}

// MensagemGetReady
const mensagemGetReady = {
  sX: 134,
  sY: 0,
  w: 174,
  h: 152,
  x: (canvas.width / 2) - 172 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGetReady.sX, mensagemGetReady.sY,
      mensagemGetReady.w, mensagemGetReady.h,
      mensagemGetReady.x, mensagemGetReady.y,
      mensagemGetReady.w, mensagemGetReady.h
    )
  }
}

// MensagemGameOver
const mensagemGameOver = {
  sX: 134,
  sY: 153,
  w: 226,
  h: 200,
  x: (canvas.width / 2) - 226 / 2,
  y: 50,
  desenha() {
    contexto.drawImage(
      sprites,
      mensagemGameOver.sX, mensagemGameOver.sY,
      mensagemGameOver.w, mensagemGameOver.h,
      mensagemGameOver.x, mensagemGameOver.y,
      mensagemGameOver.w, mensagemGameOver.h
    )
  }
}

function criaCanos() {
  const canos = {
    largura: 52,
    altura: 400,
    chao: {
      spriteX: 0,
      spriteY: 169,
    },
    ceu: {
      spriteX: 52,
      spriteY: 169,
    },
    espaco: 80,
    desenha() {
      canos.pares.forEach(function(par) {
        const yRandom = par.y
        const espacamentoEntreCanos = 90
  
        const canoCeuX = par.x
        const canoCeuY = yRandom

        // Cano do Céu
        contexto.drawImage(
          sprites,
          canos.ceu.spriteX, canos.ceu.spriteY,
          canos.largura, canos.altura,
          canoCeuX, canoCeuY,
          canos.largura, canos.altura
        )
  
        // Cano do Chão
        const canoChaoX = par.x
        const canoChaoY = canos.altura + espacamentoEntreCanos + yRandom
        contexto.drawImage(
          sprites,
          canos.chao.spriteX, canos.chao.spriteY,
          canos.largura, canos.altura,
          canoChaoX, canoChaoY,
          canos.largura, canos.altura,
        )

        par.canoCeu = {
          x: canoCeuX,
          y: canos.altura + canoCeuY
        }
        par.canoChao = {
          x: canoChaoX,
          y: canoChaoY
        }
      })
    },
    temColisaoComOFlappyBird(par) {
      const cabecaDoFlappy = globais.flappyBird.y
      const peDoFlappy = globais.flappyBird.y + globais.flappyBird.altura

      if ((globais.flappyBird.x + globais.flappyBird.largura) >= par.x){
        if(cabecaDoFlappy <= par.canoCeu.y) {
          return true
        }

        if(peDoFlappy >= par.canoChao.y){
          return true
        }
      }
      return false
    },
    pares: [],
    atualiza() {
      const passou100Frames = frames % 100 === 0
      if(passou100Frames) {
        console.log('passou 100 frames')
        canos.pares.push({
          x: canvas.width,
          y: -150 * (Math.random() + 1)
        })
      }

      

      canos.pares.forEach(function (par) {
        par.x = par.x - 2

        if(canos.temColisaoComOFlappyBird(par)) {
          console.log('você perdeu')
          som_HIT.play()
          mudarParaTela(Telas.GAME_OVER)
        }

        if(par.x + canos.largura <= 0) {
          canos.pares.shift()
        }
      })

    }
  }

  return canos
}

function criaPlacar() {
  const placar = {
    pontuacao: 0,
    desenha() {
      contexto.font = '35px "VT323"'
      contexto.textAlign = 'right'
      contexto.fillStyle = 'white'
      contexto.fillText(`${placar.pontuacao}`, canvas.width - 10, 35)
    },
    atualiza() {
      const intervaloDeFrames = 20
      const passouOIntervalo = frames % intervaloDeFrames === 0

      if (passouOIntervalo) {
        placar.pontuacao = placar.pontuacao + 1
      }
    }
  }
  return placar
}

//
// Telas
//
const globais = {}
let telaAtiva = {}
function mudarParaTela(novaTela) {
  telaAtiva = novaTela

  if (telaAtiva.inicializa) {
    telaAtiva.inicializa()
  }
}

const Telas = {
  INICIO: {
    inicializa() {
      globais.flappyBird = criaFlappyBird()
      globais.chao = criaChao()
      globais.canos = criaCanos()
    },
    desenha() {
      planoDeFundo.desenha()
      globais.flappyBird.desenha()
      
      globais.chao.desenha()
      mensagemGetReady.desenha()
    },
    click() {
      mudarParaTela(Telas.JOGO)
    },
    atualiza() {
      globais.chao.atualiza()
    }
  }
}

Telas.JOGO = {
  inicializa() {
    globais.placar = criaPlacar()
  },
  desenha() {
    planoDeFundo.desenha()
    globais.canos.desenha()
    globais.chao.desenha()
    globais.flappyBird.desenha()
    globais.placar.desenha()
  },
  click() {
    globais.flappyBird.pula()
  },
  atualiza() {
    globais.canos.atualiza()
    globais.chao.atualiza()
    globais.flappyBird.atualiza()
    globais.placar.atualiza()
  }
}

Telas.GAME_OVER = {
  desenha() {
    mensagemGameOver.desenha()
  },
  atualiza() {

  },
  click() {
    mudarParaTela(Telas.INICIO)
  }
}

function loop() {
  
  telaAtiva.desenha()
  telaAtiva.atualiza()

  frames = frames + 1
  requestAnimationFrame(loop)
}

window.addEventListener('click', function() {
  if (telaAtiva.click()) {
    telaAtiva.click()
  }
})

mudarParaTela(Telas.INICIO)
loop()