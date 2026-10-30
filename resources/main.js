var audio = document.getElementById('audio');
var cancion = 1;
var progreso = document.getElementById('progreso');
var volumen = document.getElementById('volumen');
var estado = document.getElementById('estado');

audio.volume = parseFloat(volumen.value);

function reproducirCancion(){
    estado.textContent = 'Cargando...';
    audio.play();
}

function pausarCancion(){
    audio.pause();
    estado.textContent = 'Pausado';
}

function detenerCancion(){
    audio.pause();
    audio.currentTime = 0;
    progreso.value = 0;
    actualizarTiempo();
    estado.textContent = 'Detenido';
}

function seleccionarCancion(numero){
    cancion = numero;
    var nombre = document.getElementById('cancion' + numero).value;
    var titulo = document.getElementById('titulo' + numero).textContent;
    var imagen = document.getElementById('imagen' + numero);

    audio.pause();
    audio.src = 'resources/audios/' + nombre + '.mp3';
    document.getElementById('cancionActual').textContent = titulo;
    document.getElementById('imagenActual').src = imagen.src;
    document.getElementById('imagenActual').alt = imagen.alt;
    document.getElementById('numeroCancion').textContent = 'Cancion ' + numero + ' de 10';
    progreso.value = 0;
    document.getElementById('tiempo').textContent = '0:00 / 0:00';
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
    audio.volume = parseFloat(volumen.value);
}

function cambiarProgreso(){
    if(audio.duration > 0){
        audio.currentTime = parseFloat(progreso.value) * audio.duration / 100;
        actualizarTiempo();
    }
}

// Convierte los segundos a minutos y segundos.
function formatoTiempo(segundos){
    var minutos = Math.floor(segundos / 60);
    var resto = Math.floor(segundos % 60);
    if(resto < 10){
        resto = '0' + resto;
    }
    return minutos + ':' + resto;
}

function actualizarTiempo(){
    if(audio.duration > 0){
        progreso.value = audio.currentTime * 100 / audio.duration;
        document.getElementById('tiempo').textContent = formatoTiempo(audio.currentTime) + ' / ' + formatoTiempo(audio.duration);
    }else{
        document.getElementById('tiempo').textContent = '0:00 / 0:00';
    }
}

document.getElementById('reproducir').addEventListener('click', reproducirCancion);
document.getElementById('pausar').addEventListener('click', pausarCancion);
document.getElementById('detener').addEventListener('click', detenerCancion);
document.getElementById('anterior').addEventListener('click', cancionAnterior);
document.getElementById('siguiente').addEventListener('click', cancionSiguiente);
volumen.addEventListener('input', cambiarVolumen);
progreso.addEventListener('input', cambiarProgreso);
audio.addEventListener('timeupdate', actualizarTiempo);
audio.addEventListener('loadedmetadata', actualizarTiempo);
audio.addEventListener('playing', function(){
    estado.textContent = 'Reproduciendo';
});
audio.addEventListener('ended', function(){
    estado.textContent = 'Cancion terminada';
});
audio.addEventListener('error', function(){
    estado.textContent = 'No se pudo abrir el audio. Revisa el archivo.';
});
