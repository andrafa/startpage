
// ===================
// Relogio
// ===================
setInterval(relogio, 1000); // chama a função relogio() a cada 1 minuto para atualizar o horario.

function relogio() {
	const d = new Date();
	const hora = d.getHours();
	const minutos = d.getMinutes();
	
	// adiciona zero aos minutos quando menor q ue 10
	let m = minutos;
	let h = hora;

	(h < 10) ? h = '0' + h : h = h; // se a hora é menor q 10 adiciona um zero na frente
	(m < 10) ? m = '0' + m : m = m; // se o minuto é menor q 10 adiciona um zero na frente

	let horario = document.querySelector('#hora');
	horario.innerText = `${h}:${m}`;
}

// ===================
// Dia
// ===================
const agora = new Date();
const dia = document.querySelector('#dia');

nomeDia = new Array("Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado");
nomeMes = new Array ("janeiro", "fevereiro", "março", "abril", "Maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro");

dia.innerText = `${nomeDia[agora.getDay()]}, ${agora.getDate()} de ${nomeMes[agora.getMonth()]}, ${agora.getFullYear()}`;

// ===================
// Fetch Frases
// ===================
function nRandon(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
const frases = document.querySelector('#mensagens');
fetch('./api/frases.json')
	.then((r) => {
		return r.json();
	})
	.then((d) => {
		let item = d[Math.floor(Math.random()*d.length)];
		frases.innerHTML = `
			<p class="msg">"${item.frase}"</p>
			<p class="autor">${item.autor}</p>
		`
	})
	.catch(function (err) {
		console.log(err);
	})

// ===================
// Fetch Icones favoritos
// ===================
const fav = document.querySelector('#favoritos');
fetch('./api/favoritos.json')
	.then((r) => {
		return r.json();
	})
	.then((d) => {
		d.forEach((e) => {
			fav.innerHTML += `
			<a href="${e.fav.link}"><img src="./src/images/${e.fav.icone}" alt="${e.fav.nome}" width="54" height="54"></a>
			`
		});
	})
	.catch((err) => {
		console.log(err)
	});

// ===================
// Fetch Atalhos
// ===================
const atalhos		=	document.querySelector('#atalhos');
const noticias 	= document.querySelector('#noticias');
const redes 		= document.querySelector('#redes');
const lojas 		= document.querySelector('#lojas');
const outros 		= document.querySelector('#outros');
fetch('./api/atalhos.json')
	.then((r) =>{
		return r.json();
	})
	.then((dados) => {

		for (let i = 0; i < dados.length; i++) {
			// Atalhos
			let nt	= [];
			dados[i][1].forEach((e) => {
				nt += `
					<li><a href="${e.link}">/${e.nome}</a></li>
				`
			});
			atalhos.innerHTML += `
			<div class="atalhos">
				<h4>${dados[i][0][0]}</h4>
				<ul id="redes" class="atalhos__lista">${nt}</ul>
			</div>
			`; // Insere os atalhos na pagina
		}

	})
	.catch((err) => {
		console.log(err);
		atalhos.innerHTML = `
		<p>Sem atalhos, adicione os atalhos ao arquivo atalhos.json</p>
		`
	});

// ===================
// Imagens
// ===================
const fotos = document.querySelector('#fotos');
const termPesquisa = 'architecture';
const unsplashUrl = `https://source.unsplash.com/1200x1200?${termPesquisa}`;

fetch('./api/imagens.json')
	.then((r) => {
		return r.json();
	})
	.then((dados) => {
		if(dados.length != 0 ) {
			let item = dados[Math.floor(Math.random()*dados.length)];
			fotos.style.background = `url(./src/images/${item}) center/cover no-repeat`;
		} else {
			fotos.style.background = `url(${unsplashUrl}) bottom/cover no-repeat`;
		}
		
	})
	.catch((err) => {
		console.log(err);
	});

