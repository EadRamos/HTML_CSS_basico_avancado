import  GradeHorarioFront  from './GradeHorarioFront.js';

export let diasBase = [
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
];
export let horariosBase = [
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
];
//var grade = {};
let horariosMarcados = [
    {
        titulo: 'Arroto bom',
        horarios: [
            {dia: 'Segunda', horarios:['08:00','09:00','11:00','12:00']},

            {dia: 'Sexta', horarios:['11:00','12:00']}
        ]
    },
    {
        titulo: 'Arroto ruim',
        horarios: [
            {dia: 'Segunda', horarios:['14:00','15:00']},
            {dia: 'Quinta', horarios:['11:00','12:00']}
        ]
    }
];

window.gradeFront;
// inicio
document.addEventListener('DOMContentLoaded', function () {
    this.gradeFront = new GradeHorarioFront(diasBase, horariosBase);
    
    horariosMarcados.forEach((horarioMarcado) => {
        this.gradeFront.gradeHorariosBack.adicionarHorario(horarioMarcado);
    });

    this.gradeFront.construirHorarios();
    
});

class HorarioMarcado {
    constructor(titulo, horarios){
        this.titulo = titulo;
        this.horarios = horarios;
    }
}
class Horarios {
    constructor(dia, horarios){
        this.dia = dia;
        this.horarios = horarios;
    }
}

//export default Grade;