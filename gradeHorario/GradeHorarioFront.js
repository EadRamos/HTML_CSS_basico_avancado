import { diasBase, horariosBase } from "./Grade.js";
import  GradeHorarioBack  from "./GradeHorarioBack.js";

class gradeHorarioFront {
    #cabecalhoGrade = document.getElementById('grade-cabecalho')
    #corpoGrade = document.getElementById('grade-corpo');


    constructor(dias, horarios) {
        this.gradeHorariosBack = new GradeHorarioBack(dias,horarios);
        this.#inicializarGrade(dias);
        this.construirHorarios(dias, horarios);
    }
    #escutarBotaoTrocaCor() {
        let botoes = document.getElementsByClassName('btn-trocar-cor');
        for(const botao of botoes) {
            botao.addEventListener('click', () => {
                this.gradeHorariosBack.trocarCorCard(botao.getAttribute('data-titulo'));
                this.construirHorarios();
            });
        };
    }
    #escutarBotaoFecharCard() {
        let botoes = document.getElementsByClassName('btn-remover-horario');
        for(const botao of botoes) {
            botao.addEventListener('click', () => this.removerHorario(botao.getAttribute('data-titulo')));
            
        };
    }

    #inicializarGrade(dias) {
        this.#cabecalhoGrade.textContent = '';

        const primeiraColuna = document.createElement('td');
        primeiraColuna.setAttribute('class','grade-titulo');

        this.#cabecalhoGrade.appendChild(primeiraColuna);
        // cria os titulos do cabecalho
        dias.forEach((dia) => {
            const coluna = document.createElement('td');
            coluna.setAttribute('class','grade-titulo');
            coluna.textContent = dia;
            this.#cabecalhoGrade.appendChild(coluna);
        });
    }
    
    // Constroi a grade no frontEnd
    construirHorarios(){
        this.#corpoGrade.innerHTML = '';

        // cria cada celula da tabela seguindo a direção de linha
        horariosBase.forEach((horario) => {
            const linha = document.createElement('tr');
            
            // coluna referente ao titulo de horario
            const primeiraCelula = document.createElement('th');
            primeiraCelula.setAttribute('scope','row');
            primeiraCelula.setAttribute('class','grade-titulo-row');
            primeiraCelula.innerHTML = horario;

            linha.appendChild(primeiraCelula);

            // uma celula para cada dia nesse horario
            diasBase.forEach((dia) => {

                const celula = document.createElement('td');
                celula.setAttribute('class','grade-celula');
                /**
                 * Se a celula é vazia para esse horario e esse dia
                 * ou se não é um horario de marcação
                 * senão não é criado a celula para dá espaço a celulas de maior espaço
                **/
                if(!this.gradeHorariosBack.grade[dia][horario]) {
                    
                    const vazio = document.createElement('div');
                    vazio.setAttribute('class','espaco-vazio-grade');

                    celula.appendChild(vazio);

                    linha.appendChild(celula);

                }else if (!this.gradeHorariosBack.grade[dia][horario].marcado) {
                    const botaoFechar = document.createElement('button');
                    botaoFechar.setAttribute('class','btn-remover-horario');
                    botaoFechar.setAttribute('data-titulo',this.gradeHorariosBack.grade[dia][horario].titulo);
                    botaoFechar.textContent = 'X';

                    const botaoTrocar = document.createElement('buttom');
                    botaoTrocar.setAttribute('class','btn-trocar-cor');
                    botaoTrocar.setAttribute('data-titulo',this.gradeHorariosBack.grade[dia][horario].titulo);
                    botaoTrocar.textContent = 'O';

                    const card = document.createElement('div');
                    card.setAttribute('class','card-grade');
                    
                    card.style.backgroundColor = `${this.gradeHorariosBack.grade[dia][horario].cor}`;

                    card.textContent = this.gradeHorariosBack.grade[dia][horario].titulo;

                    card.appendChild(botaoTrocar);
                    card.appendChild(botaoFechar);

                    celula.setAttribute('rowspan',this.gradeHorariosBack.grade[dia][horario].quantidade);
                    celula.appendChild(card);

                    linha.appendChild(celula);
                }
                
            });
            // adiciona a coluna de um horario
            this.#corpoGrade.appendChild(linha); 

            //corpoConstrutor += `<tr>${linhaConstrutor}</tr>\n`
        });

        
        this.#escutarBotaoTrocaCor();
        this.#escutarBotaoFecharCard();
    };

    removerHorario(tituloHorario) {
        this.gradeHorariosBack.removerHorario(tituloHorario);
        this.construirHorarios();
    }

    adicionarHorario(horarioMarcado) {
        this.gradeHorariosBack.adicionarHorario(horarioMarcado);
        this.construirHorarios();
    }
}

export default gradeHorarioFront;