export function textoFecha(fecha: Date): string {
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${fecha.getFullYear()}-${mes}-${dia}`;
}

export function hoy(): string {
  return textoFecha(new Date());
}

export function sumarDias(fecha: string, dias: number): string {
  const [anio, mes, dia] = fecha.split('-').map(Number);
  return textoFecha(new Date(anio, mes - 1, dia + dias));
}

export function minutosDe(hora: string): number {
  const [h, m] = hora.slice(0, 5).split(':').map(Number);
  return h * 60 + m;
}

export function horaLegible(hora: string): string {
  const [h, m] = hora.slice(0, 5).split(':').map(Number);
  const sufijo = h < 12 ? 'a. m.' : 'p. m.';
  const hora12 = h % 12 === 0 ? 12 : h % 12;
  return `${hora12}:${String(m).padStart(2, '0')} ${sufijo}`;
}

export function duracionLegible(minutos: number): string {
  const horas = Math.floor(minutos / 60);
  const resto = minutos % 60;
  if (horas === 0) {
    return `${resto} min`;
  }
  return resto === 0 ? `${horas} h` : `${horas} h ${resto} min`;
}
