import { horariosBase } from "./Grade.js";

class GradeHorarioBack {

    grade = {};

    constructor(dias, horas){

        dias.forEach(dia => {
            this.grade[dia] = {};

            horas.forEach(horario => {
                this.grade[dia][horario] = null;
            });
        });
    }

    #valorAleatorio() {
        return Math.floor(Math.random() * (220 - 1 + 1)) + 1;
    }
    #corAleatoria() {
        return `rgb(${this.#valorAleatorio()},${this.#valorAleatorio()},${this.#valorAleatorio()})`;
    }

    #quantidadeHorariosSeparados(horas) {
      
        let grupos = {};
        let grupoAtual = [];

        for (let i = 0; i < horas.length; i++) {
            if (i === 0) {
                grupoAtual.push(horas[i]);
            } else {
                // Pega o índice da hora atual e da anterior na lista completa
                let indiceAtual = horariosBase.indexOf(horas[i]);
                let indiceAnterior = horariosBase.indexOf(horas[i-1]);

                // Verifica se a hora atual é consecutiva em relação à anterior
                if (indiceAtual - indiceAnterior === 1) {
                    grupoAtual.push(horas[i]);
                } else {
                    grupos[grupoAtual[0]] = grupoAtual.length;
                    grupoAtual = [horas[i]];
                }
            }
        }

        // Adiciona o último grupo ao array de grupos
        if (grupoAtual.length > 0) {
            grupos[grupoAtual[0]] = grupoAtual.length;
        }

        return grupos;
    }

    #checarValorAnterior(horarios, indiceAtual, valor) {
     
        let indicesArray = Object.keys(horarios);
    
        let indice = indicesArray.indexOf(indiceAtual);

        if(indice > 0) {
            if(horarios[indicesArray[indice - 1]]) {
                return horarios[indicesArray[indice - 1]].titulo == valor ? true : false
            }
        }
        
        return false;
    }

    

    trocarCorCard(tituloHorario) {
        const cor = this.#corAleatoria();

        // horarios de um dia
        Object.keys(this.grade).forEach((horariosDia) => {
            // um horario
            Object.keys(this.grade[horariosDia]).forEach((horario) => {
                
                // se o titulo do horarioMarcado na celula é igual ao escolhido para remoção
                if(
                    this.grade[horariosDia][horario]?.titulo == tituloHorario
                ) {
                    this.grade[horariosDia][horario].cor = cor;
                }
            });
        });
    }

     // adiciona um horarioMarcado na grade de horarios
    adicionarHorario(horarioMarcado) {
        const cor = this.#corAleatoria();
        // horarios: [{dia:'', horarios: []}]
        horarioMarcado.horarios.forEach(horario => {
            let horariosSeparados = this.#quantidadeHorariosSeparados(horario.horarios);

            let inicial = null;
            // horarios: []
            horario.horarios.forEach((horarioDia) => {

                this.grade[horario.dia][horarioDia] = this.#checarValorAnterior(this.grade[horario.dia], horarioDia, horarioMarcado.titulo) ?

                {titulo: horarioMarcado.titulo, marcado: true, quantidade: null, cor: null} :
                    
                this.grade[horario.dia][horarioDia] = {titulo: horarioMarcado.titulo, marcado: false, quantidade: horariosSeparados[horarioDia], cor: cor}
                
            /*
                // a primeira celula ocupara o espaço dos horarios subsequentes
                this.grade[horario.dia][horarioDia] = inicial ? {titulo: horarioMarcado.titulo, marcado: true, quantidade: 1} : {titulo: horarioMarcado.titulo, marcado: false, quantidade: horario.horarios.length};
                if(!inicial){
                    inicial = horarioMarcado.titulo;
                }
            */
            });
        });
    }

    // remove um horarioMarcado na grade de horarios
    removerHorario(tituloHorario) {
        // horarios de um dia
        Object.keys(this.grade).forEach((horariosDia) => {
            // um horario
            Object.keys(this.grade[horariosDia]).forEach((horario) => {
                
                // se o titulo do horarioMarcado na celula é igual ao escolhido para remoção
                if(
                    this.grade[horariosDia][horario]?.titulo == tituloHorario
                ) {
                    this.grade[horariosDia][horario] = null;
                }
            });
        });
    }
}

export default GradeHorarioBack;