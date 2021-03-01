const campoBusca = document.querySelector('.campoBusca')
const resultado = document.querySelector('.resultado')
const resultadoUL = document.querySelector('.resultadoUL')
const buscar = document.querySelector('.buscarbtn')
var url1 = `https://api.lyrics.ovh`
buscar.addEventListener('click', () => {
    chamarAPI(url1)
})

const chamarAPI = async (url1) => {
    try{
        const res1 = await fetch(`${url1}/suggest/${campoBusca.value}`)
        const data1 = await res1.json()
        const hits = data1.data.map(hit => hit.title)
        init(hits)
    } catch(error){
        console.log(error)
    }
}

const insertIntoDom = (valor) => {
    const li = document.createElement('li')
    li.innerHTML = `<p>${valor}</p><button type="submit" 
    class="lyrics-btn" onClick="lyrics('${campoBusca.value}', '${valor}')">lyrics</button>`
    resultadoUL.append(li)
}

const lyrics = async (cantor, nomeMusica) => {
    try{
        const res2 = await fetch(`${url1}/v1/${cantor}/${nomeMusica}`)
        const musicas = await res2.json()
        resultadoUL.value = ''
        const lyrics = musicas.lyrics.replace(/(\r\n|\r|\n)/g, '<br>')
        resultadoUL.innerHTML = `<p class="musica">${lyrics}</p>`

    }catch (error) {
        console.log(error)
    }
}

const init = (hits) => {
    resultadoUL.innerHTML = ''
    hits.forEach(insertIntoDom)
}

