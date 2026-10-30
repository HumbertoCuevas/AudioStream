var audio = document.getElementById('audio');
var cancion = 1;
var progreso = document.getElementById('progreso');
var volumen = document.getElementById('volumen');
var estado = document.getElementById('estado');
var tiempo = document.getElementById('tiempo');
var botonReproducir = document.getElementById('reproducir');
var botonPausar = document.getElementById('pausar');
var botonFavorito = document.getElementById('favorito');
var botonAnterior = document.getElementById('anterior');
var botonSiguiente = document.getElementById('siguiente');

if(audio && volumen){
    audio.volume = parseFloat(volumen.value);
}

function reproducirCancion(){
    if(!audio){
        return;
    }

    if(estado){
        estado.textContent = 'Cargando...';
    }

    audio.play();
}

function pausarCancion(){
    if(!audio){
        return;
    }

    audio.pause();
    if(estado){
        estado.textContent = 'Pausado';
    }
}

function seleccionarCancion(numero){
    cancion = numero;
    var boton = document.getElementById('cancion' + numero);
    if(!boton || !audio){
        return;
    }

    var nombre = boton.value;
    var titulo = document.getElementById('titulo' + numero).textContent;
    var imagen = document.getElementById('imagen' + numero);

    audio.pause();
    audio.src = 'resources/audios/' + nombre + '.mp3';
    document.getElementById('cancionActual').textContent = titulo;
    document.getElementById('imagenActual').src = imagen.src;
    document.getElementById('imagenActual').alt = imagen.alt;
    document.getElementById('numeroCancion').textContent = 'Cancion ' + numero + ' de 10';

    if(progreso){
        progreso.value = 0;
    }

    if(tiempo){
        tiempo.textContent = '0:00 / 0:00';
    }

    reproducirCancion();
}

function cancionAnterior(){
    if(cancion > 1){
        seleccionarCancion(cancion - 1);
    }else{
        seleccionarCancion(10);
    }
}

function cancionSiguiente(){
    if(cancion < 10){
        seleccionarCancion(cancion + 1);
    }else{
        seleccionarCancion(1);
    }
}

function cambiarVolumen(){
    if(audio && volumen){
        audio.volume = parseFloat(volumen.value);
    }
}

function cambiarProgreso(){
    if(audio && progreso && audio.duration > 0){
        audio.currentTime = parseFloat(progreso.value) * audio.duration / 100;
        actualizarTiempo();
    }
}

function formatoTiempo(segundos){
    var minutos = Math.floor(segundos / 60);
    var resto = Math.floor(segundos % 60);
    if(resto < 10){
        resto = '0' + resto;
    }
    return minutos + ':' + resto;
}

function actualizarTiempo(){
    if(!audio){
        return;
    }

    if(audio.duration > 0){
        if(progreso){
            progreso.value = audio.currentTime * 100 / audio.duration;
        }
        if(tiempo){
            tiempo.textContent = formatoTiempo(audio.currentTime) + ' / ' + formatoTiempo(audio.duration);
        }
    }else if(tiempo){
        tiempo.textContent = '0:00 / 0:00';
    }
}

if(botonReproducir){
    botonReproducir.addEventListener('click', reproducirCancion);
}
if(botonPausar){
    botonPausar.addEventListener('click', pausarCancion);
}
if(botonFavorito){
    botonFavorito.addEventListener('click', function(){
        botonFavorito.style.color = 'black';
    });
}
if(botonAnterior){
    botonAnterior.addEventListener('click', cancionAnterior);
}
if(botonSiguiente){
    botonSiguiente.addEventListener('click', cancionSiguiente);
}
if(volumen){
    volumen.addEventListener('input', cambiarVolumen);
}
if(progreso){
    progreso.addEventListener('input', cambiarProgreso);
}
if(audio){
    audio.addEventListener('timeupdate', actualizarTiempo);
    audio.addEventListener('loadedmetadata', actualizarTiempo);
    audio.addEventListener('playing', function(){
        if(estado){
            estado.textContent = 'Reproduciendo';
        }
    });
    audio.addEventListener('ended', function(){
        if(estado){
            estado.textContent = 'Cancion terminada';
        }
    });
    audio.addEventListener('error', function(){
        if(estado){
            estado.textContent = 'No se pudo abrir el audio. Revisa el archivo.';
        }
    });
}
