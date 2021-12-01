
const key = "###COLAR API WEATHERAPI AQUI##";

const cidade = "auto:ip"; // 'auto:ip' busca cidade pelo IP
const url = `https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${cidade}&days=1&aqi=no&alerts=yes&lang=pt`;


const temp = document.querySelector('#temp');
const tempDetalhes = document.querySelector('#temp__modal');
const aviso = document.querySelector('#aviso');

// adiciona zero aos minutos quando menor q ue 10
		function correcaoHora(valor) {
			if(valor < 10 ) {
				return '0' + valor;
			} else {
				return valor;
			}
		}

fetch(url)
	.then( (r) => {
		return r.json();
	})
	.then( (d) => {
		const atualizado = agora.getHours(); // pega a hora atual para criar a privisão
		// função para caso seja 24h (00:00), ao inves ir para o index 24 vai para o 0
		function ghora(h) {
			if(h == 24) { return 0; }
			else if (h == 25) { return 1; }
			else if (h == 26) { return 2; }
			else { return h; }
		}

		const temperatura = d.current.temp_c;
		const condicao 		= d.current.condition.text;
		const icone 			= d.current.condition.icon;
		const local 			= d.location.name;
		const vento 			= d.current.wind_kph;
		const umidade 		= d.current.humidity;

		const min = d.forecast.forecastday[0].day.mintemp_c;
		const max = d.forecast.forecastday[0].day.maxtemp_c;

		// Tempo
		temp.innerHTML = `
			<h4>
				<span class="condicao">${local}</span>${temperatura}°
				<span class="condicao">${condicao}</span>
			</h4>
			<img src="https:${icone}" alt="">
		`
		
		//
		// Gambiarra para mostrar a previsão para daqui a 3h nos detalhes
		//
		let previsao = [];
		for (let i = 1; i < 4; i++) {
			
			let m 				= ghora(atualizado+i)
			let horas 		= new Date(d.forecast.forecastday[0].hour[ghora(m)].time).getHours();
			let minutos 	= new Date(d.forecast.forecastday[0].hour[ghora(m)].time).getMinutes();
			let icone 		= d.forecast.forecastday[0].hour[ghora(m)].condition.icon;
			let temp 			= d.forecast.forecastday[0].hour[ghora(m)].temp_c;
			let humidade 	= d.forecast.forecastday[0].hour[ghora(m)].humidity;

			previsao += `
				<div class="info__modal--horas">
					<span class="subtitulo">${(correcaoHora(horas))}:${correcaoHora(minutos)}</span>
					<img src="${icone}" alt="">
					<p><span class="subtitulo">${Math.floor(temp)}°/${Math.floor(humidade)}%</span></p>
				</div>
			`
		}

		// Detalhes do tempo
		tempDetalhes.innerHTML = `
			<i id="fechar-modal" class="fas fa-times-circle info__modal--fechar" onclick="clickModal()"></i>
			<div class="d-flex justify-content-between info__modal">
				<p><span class="subtitulo"><i class="fas fa-thermometer-full"></i> MAX</span>${Math.floor(max)}°C</p> 
				<p><span class="subtitulo"><i class="fas fa-thermometer-empty"></i> MIN</span>${Math.floor(min)}°C</p>
			</div>
			<div class="d-flex justify-content-between info__modal">
				<p><span class="subtitulo"><i class="fas fa-wind"></i> Vento</span>${vento}km/h</p>
				<p><span class="subtitulo"><i class="fas fa-tint"></i> Umidade</span>${umidade}%</p>
			</div>

			<div class="d-flex justify-content-between info__modal">
				<div class="info__modal--wrap">
					${previsao}
				</div>
			</div>
		`

		if(umidade <= 50) {
			aviso.classList.add('mostrar-grid');
			aviso.innerHTML = `
				<p class="aviso__txt"><i class="fas fa-dizzy"></i> O tempo ta mais seco que em Arrakis, vê se toma agua porra!</p>
			`
		} else {
			aviso.classList.remove('mostrar-grid');
		}

	})
	.catch( (err) => {
		temp.innerHTML = `<p style="font-size: .8rem; text-align: right;">Você precisa adicionar uma 'weatherapi.com key', crie uma conta e adicione a chave no arquivo tempo.js em src/js/tempo.js</p>`
		console.log(err);
	});

// Exibe e oculta o modal com detalhes do tempo
function clickModal() {
	if(tempDetalhes.classList.contains('mostrar')) {
		tempDetalhes.classList.remove('mostrar');
	} else {
		tempDetalhes.classList.add('mostrar');
	}
	return false;
}