## 🚀 Como Rodar
#### Clonar o repositório e entrar na pasta do projeto
```bash
git clone https://github.com/GuGodoi7/Back-End-YouX-Check-In.git
cd Back-End-YouX-Check-In
```
#### Instalar dependências e rodar a aplicação
```bash
npm install
npm run dev
```

## ✅ Exemlo de requsição 
```bash
{
  "title": "Estudar Node.js",
  "description": "Revisar Express, SQLite e Swagger",
  "completed": false
}
```

Para listar tarefas, basta acessar o endpoint /tasks no Swagger e aplicar filtros se necessário.

## ✅ O que foi feito

Foi criada uma api para criar e listar tarefas

Podedendo escrever Tirulo descrição e se foi comclida ou n

## 💡 Como pensei na solução
A solução foi planejada para ser simples, clara e funcional, atendendo aos requisitos do desafio de forma objetiva:

Endpoints mínimos: criei /tasks para listar (GET)  e para criar tarefas (POST), garantindo que a API pudesse ser usada imediatamente sem complexidade desnecessária.

Estrutura de dados clara: cada tarefa possui id, título, descrição e concluida (status), permitindo fácil leitura e manipulação.

Tratamento básico de erros: a API retorna mensagens claras quando dados inválidos são enviados, evitando falhas silenciosas.

## ⏳ O que melhoraria com mais tempo

Criar um Endpoint para alterar e deletar tarefas 

Testes automatizados.

Implementar mensagens de log claras e consistentes.

Configuração de variáveis de ambiente para facilitar deploy em diferentes ambientes (desenvolvimento, teste e produção).

Validações mais robustas
