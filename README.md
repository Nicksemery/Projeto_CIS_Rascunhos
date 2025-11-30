# Projeto_CIS_Rascunhos

```mermaid
erDiagram
    Psicologo ||--o{ Coordenacao : "(1,1)"
    Coordenacao ||--|| Psicologo : "(1,1)"

    Psicologo ||--o{ Sessao : "(1,1)"
    Coordenacao ||--|| Sessao : "(1,1)"

    Sessao ||--|| Coordenacao : "(0,n)"
    Sessao ||--|| Psicologo : "(0,n)"
    Sessao ||--|| Paciente : "(1,1)"
    
    Coordenacao ||--|| Paciente : "(1,1)"
    
    Usuario ||--o{ Paciente : "(1,1)"
    Usuario ||--o{ Psicologo : "(1,1)"
    Usuario ||--o{ Coordenacao : "(1,1)"
    
    
    Psicologo {
        string id_psicologo PK
        string id_Coordenacao FK
        string Nome 
        string Matricula
        bool Ativo
    }

    Coordenacao {
        string id_coordenacao PK
        string Nome
        string Matricula
        string Cargo
        bool Ativo
    }

    Sessao {
        string id_sessao PK
        string id_Coordenacao FK
        string id_Psicologo FK
        string id_Usuario FK
        bool Horario_Confirmado
        bool Ativo
    }

    Paciente {
        string id_usuario PK
        string id_Coordenacao FK
        string id_Usuario FK
        string Nome
        string Telefone
        date Disponibilidade_Data
        time Disponibilidade_Horario
        datetime Data_Registro
    }

    Usuario {
        string id_usuario PK
        string Login
        string Senha
        string Permissao
    }
```

# Dashboard Psicologia

**Description**: Sistema web interativo de gestão para psicólogos.

**Tech Stack**: Frontend: React + Javascript + Tailwind + Vite | Backend: Java + Spring boot | Auth: Spring Security | Banco : MySql

## Directory Structure
Frontend:
- `/src`: Código frontend
  - `/components`: Componentes React 
  - `/components`: `/calendar`: Calendar components (MonthlyCalendar.jsx, PotentialPatientsGrid.jsx)
  - `/components`: `/common`: Common components (Icons.jsx, PatientDetailSidebar.jsx)
  - `/components`:`/layouts`: Sidebar component (Sidebar.jsx)
  - `/data`: Dados mock (mockData.ts)
  - `/utils`: Definições (dataUtil.js)
  - `/view`: Dashboard overview (DashbooardView.jsx)
 
Backend:
- `/src` : codigo fonte
- `/controller`: controllers de serviço
- `/domain`: `/dtos` : todos os Dtos do sistema, dividido em request e response
- `/domain`: `/dtos` :`/request`: esquemas de dtos de ponto de pedido http (entrada de dados)
- `/domain`: `/dtos` :`/response`: esquemas de dtos de ponto de pedido http (saida de dados)
- `/domain`: `/entity` : todos os esquemas de entidades
- `/infra` : infraestrutura do sistema
- `/infra`: `/cofig` : configurações e segurança
- `/infra` : `/mapper` : logica de encapsulamento e transformação de dto(request) para entidade e entidade para dto (response)
- `/infra` : `/repository` : repositorios das entidades e ponto de acesso ao banco
- `/infra` : `/service` : camada de interface e implementação das interfaces para encapsular os metodos dos controllers
- `/infra` : `/validate` : camada de validação para o fluxo de informação

## Features and Future

### Implementado
1. **Sidebar de Navegação Esquerda**: Menu com 3 opções (Calendário Semanal, Meus Pacientes, Disponibilidade)
2. **Calendário Semanal Interativo**: Visualização de 7 dias com slots de horários (8h-18h), navegação entre semanas, destaque do dia atual, clique em horários para ver detalhes
3. **Lista de Pacientes**: Visualização em grid com busca, filtros (todos/ativos/inativos), cards coloridos com informações completas
4. **Gestão de Disponibilidade**: Interface para psicólogo configurar horários disponíveis/bloqueados por dia da semana
5. **Cards de Estatísticas**: 4 cards com métricas (Total de Pacientes, Pacientes Ativos, Agendamentos Pendentes, Taxa de Ativos)
6. **Sidebar Direita de Detalhes**: Painel lateral que aparece ao clicar em paciente/horário, mostrando sessões, contatos, próxima consulta, horários disponíveis
7. **Status de Agendamentos**: Visualização com cores (verde para confirmado, amarelo para pendente)
8. **Design Responsivo**: Layout de 3 painéis adaptável para mobile, tablet e desktop

### Limitações Conhecidas
- Dados são mock/estáticos (não há persistência real)
- Não há autenticação de usuário
- Disponibilidade não afeta calendário real

## Database Schema
**Type**: N/A (usando dados mock)

## Deno Functions
N/A

## API Endpoints
N/A (aplicação frontend pura com dados mock)

## Improvement Opportunities

### Alta Prioridade
- [ ] Adicionar filtros por status de agendamento (confirmado/pendente)
- [ ] Implementar sistema de notificações para consultas próximas
- [ ] Adicionar funcionalidade de criar/editar/deletar agendamentos

### Média Prioridade
- [ ] Integrar com backend real para persistência de dados
- [ ] Adicionar sistema de autenticação para múltiplos psicólogos
- [ ] Implementar visualização mensal do calendário

### Baixa Prioridade / Melhorias Futuras
- [ ] Exportar relatórios de sessões em PDF
- [ ] Sistema de lembretes por email/SMS
- [ ] Histórico de sessões com anotações
