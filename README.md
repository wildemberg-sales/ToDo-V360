# ToDo Lists V360

Link do Repositório: [https://github.com/wildemberg-sales/ToDo-V360](https://github.com/wildemberg-sales/ToDo-V360)

## Apresentação
Este produto de software é voltado a criação de uma aplicação de ToDo List, que possui como suas duas principais funcionalidades:

* Criar várias listas de ToDo;
* Cada lista pode ter nenhum ou vários items;

A partir desses principais requisitos para o produto, foi feito uma pesquisa para elicitação de novos requisitos para a aplicação. A metodologia utilizada para a elicitação de requisitos foi realizar entrevistas com usuários que tem o perfil e o costume de utilizar aplicações de ToDo no seu dia a dia. 

Com a realização dessas pesquisas foi possível elicitar um total de 4 requisitos a mais para o projeto que enriqueceram mais ainda o produto final. Os requisitos fornecidos pelos entrevistados foram:

* Um sistema completo de controle com as tarefas, ou seja, criar, atualizar, e deletar a tarefa (CRUD);
* Um sistema para definir datas e/ou horários limites para as tarefas;
* A possibilidade de definir a prioridade de uma tarefa entre baixa, média e alta;
* Um sistema que identifica quais tarefas estão atrasadas;

## Planejamento
Para a definição final do que deve ser implementado no projeto e como deve ser implementado, foi criado documentações para o produto onde cada um dos artefatos explica de forma detalhada como foi feito o planejamento da implementação.  
Com uma visão mais geral, primeiramente foi trabalhado os requisitos para eles serem separados em histórias de usuários, com isso o escopo do projeto foi fechado gerando o backlog do produto. Após entender as necessidades do produto, foi realizado a construção da arquitetura do projeto, que envolveu o planejamento da arquitetura do software, diagramas de classe e um diagrama lógico de dados para entender como seria a organização do banco de dados da aplicação.  
Para organização do projeto foi utilizado o Projects do GitHub para organizar o backlog do produto e as tarefas a parte do desenvolvimento que precisavam ser realizadas. Caso tenha interesse pode acessar o link do Projects [CLICANDO AQUI](https://github.com/users/wildemberg-sales/projects/2).

## Como Utilizar
Para uma fácil utilização da aplicação, todo o produto foi encapsulado em um sistema de containers utilizando Docker, isso facilita a visualização da aplicação pelo usuário final que tiver interesse em testar a aplicação em um ambiente controlado.

### Executando a Aplicação
Para execução da aplicação é necessário ter somente o Docker instalado em sua máquina. Caso não tenha o Docker a seguir vou deixar o link para consulta da documentação, onde será possível fazer a instalação da aplicação e seus plugins:  

* Docker Engine: [https://docs.docker.com/engine/install/](https://docs.docker.com/engine/install/)
* Compose Plugin: [https://docs.docker.com/compose/install/linux/](https://docs.docker.com/compose/install/linux/)

Após instalado as dependências necessárias para execução da aplicação, basta realizar os seguintes passos:

* Clonar o projeto;
* Entrar na pasta do projeto clonado:
* Executar no terminal dentro da pasta: ``docker compose up``

Com isso a aplicação deve iniciar normalmente sem problemas.