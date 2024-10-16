## Introdução
O documento de arquitetura de um projeto consiste em definir como será a estrutura do software que será produzido, isso engloba o padrão arquitetural que será utilizado, os serviços e ferramentas que serão utilizadas para desenvolvimento, dentre outros aspectos do projeto.

## Metodologia
Para criação deste documento de arquitetura de software, foram selecionados somente 3 artefatos para serem utilizados como guia do projeto em sua execução.  
O primeiro consiste na representação arquitetural do software, onde é detalhado como será a estrutura do projeto e os serviços que irão compor essa estrutura.  
O segundo artefato é o diagrama de classe que costuma ser utilizado para representar a estrutura do sistema, as classes que compõem esse sistema, seus atributos, métodos e relacionamentos entre elas.  
E por fim o terceiro artefato consiste no Diagrama lógico de dados, que é utilizado para entender as entidades do projeto e seus respectivos atributos, e como estas entidades se relacionam entre si, tudo isso dentro do contexto de um sistema de banco de dados.

## Representação Arquitetural
Para este projeto foi definido uma arquitetura em camadas, essa arquitetura irá consistir em 3 camadas, a de apresentação que irá ser a da interface do usuários (front-end) que será codificado usando a ferramenta NexjJS, a camada de lógica de negócios que será a API de comunicação entre a interface e o banco de dados, onde a API será feita utilizando Python e FastAPI, e a última camada será a de dados que é responsável por ter o sistema de banco de dados Postgresql. A seguir na imagem 1 temos a imagem do diagrama de relações:  

<figcaption align="center">Imagem 1: Diagrama de Relações</figcaption>

## Diagrama de Classe
Para este projeto será utilizado somente um classe é a representação das tarefas que serão cadastradas na aplicação, essa classe irá possuir o seguinte atributos: id, nome, descrição, data, horário e prioridade. A seguir na imagem 2 podemos ver a imagem do diagrama de classe:  

<figcaption align="center">Imagem 2: Diagrama de Classe</figcaption>

## Diagrama Lógico de Dados
Ao analisar o projeto, identifica-se que o banco de dados irá possuir somente a entidade Tarefa, com isso não havendo outras entidades e portanto não existem relações. A entidade Tarefa irá possuir os mesmos atributos que sua classe no diagrama de classes, assim pode-se observar na imagem 3 o diagrama lógico de dados:

<figcaption align="center">Imagem 3: Diagrama Lógico de Dados</figcaption>