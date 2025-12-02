/*
Design System & Sidebar Component
Arquivo único: guia de estilos, snippets Tailwind, e componente React export default

CONTEÚDO
1) Guia de estilo (cores, tipografia, espaçamentos, sombras)
2) tailwind.config.js (snippet)
3) Variáveis CSS (opcional)
4) Componentes React (Sidebar + Layout) usando Tailwind
5) Notas de uso e tokens

================================================================================
1) GUIA DE ESTILO (tokens)

Cores
- --purple-900: #3A0CA3  /* roxo mais escuro - usado em títulos e textos principais */
- --purple-700: #6A22FF  /* roxo vibrante - usado em fundos de botões ativos, ícones, hover states */
- --purple-600: #7645FF  /* roxo médio */
- --purple-500: #8B6CFF  /* tom complementar */
- --bg-gradient: linear-gradient(180deg, #6A22FF 0%, #3A0CA3 100%) /* gradiente vertical do fundo principal */
- --accent-gradient: linear-gradient(90deg, #6A22FF 0%, #3A0CA3 100%) /* gradiente horizontal para avatares */
- --bg: #FFFFFF /* fundo branco para cards e containers */
- --panel: #F7F7F8 /* fundo do painel - usado em hover states */
- --muted: #6B7280 /* gray-500 - texto secundário */
- --border: #E6E7EA /* bordas sutis */
- --shadow: rgba(18,18,18,0.06) /* sombra principal */
- --shadow-subtle: rgba(18,18,18,0.04) /* sombra sutil */
- --glass: rgba(255,255,255,0.6)

Tipografia
- Fonte principal sugerida: Inter, fallback: system-ui, -apple-system, "Segoe UI", Roboto
- Weights: 400 (regular), 500 (medium), 600 (semibold)
- Sizes (tokens):
  - xs: 12px (text-xs)
  - sm: 14px (text-sm)
  - base: 16px (text-base)
  - lg: 18px (text-lg)
  - xl: 20px (text-xl)
  - 2xl: 24px (text-2xl)
  - 3xl: 30px (text-3xl) - usado em números grandes de estatísticas
- Títulos principais: text-xl lg:text-2xl, font-semibold, cor #3A0CA3
- Textos secundários: text-sm, cor #6B7280

Espaçamentos
- spacing-1: 4px
- spacing-2: 8px
- spacing-3: 12px
- spacing-4: 16px
- spacing-5: 20px
- spacing-6: 24px
- border-radius: 12px (base - rounded-xl)
- Gap entre sidebar e conteúdo: 16px mobile (gap-4), 24px desktop (gap-6)
- Padding do container principal: 16px mobile (p-4), 24px desktop (p-6)

Sombras
- card: 0 6px 18px rgba(18,18,18,0.06) - usado em cards principais e containers
- subtle: 0 2px 6px rgba(18,18,18,0.04) - usado em cards secundários e elementos menores
- Aplicação: Cards de estatística usam shadow-card, cards de ações rápidas usam shadow-subtle

Componentes e padrões
- Layout principal: fundo com gradiente linear vertical roxo (de #6A22FF para #3A0CA3, mais escuro embaixo)
- Sistema de colunas: Sidebar 3/12 (25%), Conteúdo principal 9/12 (75%)
- Sidebar: fundo branco, bordas arredondadas (rounded-xl), sombra suave, padding 16px
- Cartão do usuário: borda 1px (#E6E7EA), sombra suave (0 2px 6px), padding 12px, avatar com gradiente horizontal roxo
- Menu: ícones w-6 h-6, strokeWidth 2.5, espaçamento confortável, hover com fundo cinza claro
- Item ativo: fundo roxo sólido (#6A22FF), texto branco, bordas arredondadas (pill style - rounded-full)
- Área principal: fundo branco, bordas arredondadas (rounded-xl), sombra suave, padding responsivo (p-4 lg:p-6)
- Cards de estatística: fundo branco, borda (#E6E7EA), sombra (0 6px 18px), padding responsivo, ícones com fundo roxo sólido (#6A22FF)
- Botões de ação: borda tracejada, hover muda cor da borda para roxo e fundo para panel (#F7F7F8)
- Ícones: cores sólidas (sem gradiente), tamanhos responsivos (w-5 h-5 lg:w-6 lg:h-6)

================================================================================
2) Snippet tailwind.config.js (adicionar em seu projeto Tailwind)

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors: {
        purple900: '#3A0CA3',
        purple700: '#6A22FF',
        purple600: '#7645FF',
        purple500: '#8B6CFF',
        panel: '#F7F7F8'
      },
      borderRadius: {
        'xl': '12px'
      },
      boxShadow: {
        'soft': '0 6px 18px rgba(18,18,18,0.06)',
        'thin': '0 2px 6px rgba(18,18,18,0.04)'
      }
    }
  },
  plugins: [],
}

================================================================================
3) Variáveis CSS (opcional, importar em index.css)

:root{
  --purple-900: #3A0CA3;
  --purple-700: #6A22FF;
  --purple-600: #7645FF;
  --panel: #F7F7F8;
  --bg: #FFFFFF;
  --muted: #6B7280;
  --border: #E6E7EA;
}

/* extras */
.btn-primary{
  background: var(--purple-700);
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 9999px;
}

================================================================================
4) Componente React (Sidebar + Layout)

// IMPORTANTE: este componente usa Tailwind classes. Adapte rotas e ícones conforme necessário.
import React from 'react';
import { FaSearch, FaUserCircle, FaUsers, FaCalendarAlt, FaListAlt, FaCaretDown, FaRegClock } from 'react-icons/fa';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-900 p-6 font-sans text-sm">
      <div className="max-w-full mx-auto bg-transparent rounded">
        <div className="flex gap-6">

          {/* SIDEBAR */}
          <aside className="w-[280px] flex-shrink-0">
            <div className="relative h-full">
              {/* vertical purple strip */}
              <div className="absolute left-0 top-0 bottom-0 w-2 rounded-l-xl" style={{background: 'linear-gradient(180deg, #6A22FF 0%, #3A0CA3 100%)'}}></div>

              <div className="ml-3 bg-white rounded-xl p-4 shadow-soft" style={{border: '1px solid var(--border)'}}>
                {/* User Card */}
                <div className="bg-white rounded-lg p-3 shadow-thin flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white">
                    {/* avatar ilustrado placeholder */}
                    <FaUserCircle className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Jane Doe</div>
                    <div className="text-xs text-gray-500">email@mail.com</div>
                  </div>
                  <div className="text-gray-400"><FaCaretDown /></div>
                </div>

                {/* Search */}
                <div className="mt-4">
                  <label className="relative block">
                    <input className="w-full pl-3 pr-8 py-2 rounded-lg border border-gray-200 text-sm" placeholder="Pesquisar" />
                    <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </label>
                </div>

                {/* Menu */}
                <nav className="mt-6">
                  <ul className="space-y-2">
                    <li>
                      <a className="inline-flex items-center gap-3 w-full px-3 py-2 rounded-full bg-purple-700 text-white font-medium">
                        <span className="p-2 bg-white/10 rounded-full"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 2v20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                        <span>Editar Perfil</span>
                      </a>
                    </li>

                    <li>
                      <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 text-gray-700">
                        <span className="w-8"><FaUsers /></span>
                        <span>Monitorar Estagiarios</span>
                      </a>
                    </li>

                    <li>
                      <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 text-gray-700">
                        <span className="w-8"><FaCalendarAlt /></span>
                        <span>Agendar Consultas</span>
                      </a>
                    </li>

                    <li>
                      <a className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 text-gray-700">
                        <span className="w-8"><FaListAlt /></span>
                        <span>Meus Agendamentos</span>
                      </a>
                    </li>

                  </ul>
                </nav>

              </div>

              {/* vertical divider to main content */}
              <div className="absolute left-[300px] top-6 bottom-6 w-3 rounded" style={{background: 'linear-gradient(180deg, #6A22FF 0%, #3A0CA3 100%)'}}></div>

            </div>
          </aside>

          {/* MAIN AREA */}
          <main className="flex-1 bg-white rounded-xl p-6 shadow-thin">
            <header className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-semibold text-purple-900">Dashboard</h1>
              <div className="text-sm text-gray-500">Bem-vinda de volta</div>
            </header>

            <section className="grid grid-cols-3 gap-6">
              {/* Placeholder cards - sugeridos para preencher a área branca */}
              <div className="col-span-2 bg-white rounded-xl p-4 shadow-soft border border-gray-100">
                <div className="text-sm text-gray-600">Gráfico / Conteúdo principal</div>
                <div className="mt-4 h-40 bg-gradient-to-b from-gray-100 to-white rounded" />
              </div>

              <aside className="bg-white rounded-xl p-4 shadow-thin border border-gray-100">
                <div className="text-sm text-gray-600">Resumo Rápido</div>
                <ul className="mt-3 space-y-2 text-gray-700 text-sm">
                  <li>📌 Total de agendamentos: <strong>12</strong></li>
                  <li>⏱️ Próximo: Hoje às 15:00</li>
                </ul>
              </aside>
            </section>

            {/* children podem conter tabelas, forms, etc */}
            <div className="mt-6">
              {children || (
                <div className="text-gray-500">Área de conteúdo — adicione cards, tabelas e formulários aqui.</div>
              )}
            </div>

          </main>

        </div>
      </div>
    </div>
  );
}

================================================================================
5) Padrões de Ícones

Tamanhos:
- Sidebar menu: w-6 h-6 (24px), strokeWidth 2.5 (bold)
- Cards de estatística: w-5 h-5 lg:w-6 lg:h-6 (20px mobile, 24px desktop), strokeWidth 2
- Botões de ação: w-5 h-5 (20px), strokeWidth 2
- Ícones pequenos (search, dropdown): w-4 h-4 (16px), strokeWidth 2

Cores:
- Ícones em cards: fundo roxo sólido (#6A22FF), ícone branco
- Ícones na sidebar ativos: branco sobre fundo roxo
- Ícones na sidebar inativos: cinza (#6B7280)
- IMPORTANTE: Ícones usam cores sólidas, NÃO gradientes

================================================================================
6) Layout e Responsividade

Estrutura:
- Container principal: min-h-screen com padding p-4 lg:p-6
- Fundo: gradiente vertical roxo (linear-gradient(180deg, #6A22FF 0%, #3A0CA3 100%))
- Grid: flexbox com gap-4 lg:gap-6
- Sidebar: w-3/12 (25%) em desktop, drawer em mobile
- Conteúdo: w-9/12 (75%) em desktop, full width em mobile

Breakpoints:
- Mobile: < 1024px - sidebar como drawer, padding reduzido
- Desktop: >= 1024px (lg:) - layout lado a lado, padding ampliado

Altura:
- Container interno: h-[calc(100vh-2rem)] mobile, h-[calc(100vh-3rem)] desktop

================================================================================
7) Notas de uso
- Este layout é totalmente responsivo com breakpoints do Tailwind (sm/md/lg/xl)
- Mantenha tokens de cor em tailwind.config ou variáveis CSS para fácil manutenção
- Ícones: use SVG inline com strokeWidth adequado para consistência
- Para o efeito do item ativo no menu, use bg-[#6A22FF] com text-white
- Cards sempre têm borda (#E6E7EA) e sombra apropriada
- Espaçamentos responsivos: use classes como p-4 lg:p-6 para padding adaptativo
- Ícones NÃO devem usar gradientes, apenas cores sólidas

================================================================================
FIM
*/
