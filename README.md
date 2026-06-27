# Tutoriais Interativos C++

Sistema modular de tutoriais com Vue 3 CDN.

## 📁 Estrutura

```
tutorials/
├── index.html              # Página principal
├── js/
│   ├── app.js             # Aplicação Vue principal
│   ├── services/
│   │   ├── tutorial-service.js   # Carregamento de tutoriais
│   │   └── storage-service.js    # LocalStorage
│   └── utils/
│       └── platform-detector.js  # Detecção de SO
└── data/
    ├── index.json         # Lista de tutoriais
    └── [tutorial-id]/
        ├── windows.json   # Passos para Windows
        └── ubuntu.json    # Passos para Ubuntu
```

## ✨ Benefícios da Refatoração

### 1. **Separação de Responsabilidades**
- **HTML**: Apenas estrutura e template
- **JavaScript**: Lógica modular em arquivos separados
- **JSON**: Dados dos tutoriais isolados

### 2. **Economia de Tokens**
- Dados JSON são mais compactos que código Vue inline
- Atualizações de conteúdo não requerem mudanças no código
- Reutilização de componentes e serviços

### 3. **Facilidade de Manutenção**
- Adicionar novo tutorial: apenas criar pasta em `data/`
- Adicionar nova plataforma: apenas criar arquivo JSON
- Modificar UI: apenas editar `index.html` e `app.js`

### 4. **Escalabilidade**
- Suporte fácil para múltiplos tutoriais
- Possibilidade de adicionar mais plataformas (macOS, etc.)
- Estrutura preparada para features futuras

## 🚀 Como Adicionar um Novo Tutorial

### 1. Criar estrutura de dados

```bash
mkdir data/novo-tutorial
```

### 2. Criar arquivos JSON para cada plataforma

**data/novo-tutorial/windows.json**
```json
{
  "titulo": "Título do Tutorial",
  "descricao": "Descrição breve",
  "passos": [
    {
      "titulo": "Passo 1",
      "cor": "blue",
      "tipo": "download",
      "texto": "Descrição do passo",
      "codigo": ["comando1", "comando2"],
      "instrucoes": ["Instrução 1", "Instrução 2"]
    }
  ]
}
```

### 3. Registrar no índice

**data/index.json**
```json
{
  "tutoriais": [
    {
      "id": "novo-tutorial",
      "titulo": "Título do Tutorial",
      "descricao": "Descrição",
      "plataformas": ["windows", "ubuntu"],
      "nivel": "iniciante",
      "tags": ["tag1", "tag2"]
    }
  ]
}
```

### 4. Atualizar app.js (se necessário)

Modificar o método `carregarConteudo()` para carregar o tutorial correto:

```javascript
const data = await TutorialService.loadTutorial('novo-tutorial', this.plataformaAtiva);
```

## 📋 Tipos de Passos Disponíveis

### Download
```json
{
  "tipo": "download",
  "link": "https://exemplo.com",
  "linkTexto": "Baixar aqui",
  "descricaoDownload": "Recomendações"
}
```

### Configuração Manual
```json
{
  "tipo": "configuracao",
  "instrucoes": ["Passo 1", "Passo 2"]
}
```

### Comando Terminal
```json
{
  "codigo": ["comando1", "comando2"]
}
```

### Output/Resultado
```json
{
  "tipo": "output",
  "codigo": ["resultado esperado"]
}
```

## 🎨 Cores Disponíveis

- `blue` - Azul (downloads, instalação)
- `yellow` - Amarelo (configuração)
- `purple` - Roxo (verificação)
- `indigo` - Índigo (código)
- `green` - Verde (compilação/execução)
- `gray` - Cinza (output)

## 🔧 Serviços Disponíveis

### TutorialService
- `loadTutorial(id, plataforma)` - Carrega tutorial específico
- `listTutorials()` - Lista todos os tutoriais

### StorageService
- `savePlataforma(plataforma)` - Salva preferência de plataforma
- `loadPlataforma()` - Carrega preferência salva
- `savePassoConcluido()` - Marca passo como concluído
- `loadPassosConcluidos()` - Carrega progresso

### PlatformDetector
- `detect()` - Detecta sistema operacional
- `isMobile()` - Verifica se é dispositivo móvel

## 🌐 Uso

Abra `index.html` diretamente no navegador ou sirva via servidor local:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve

# PHP
php -S localhost:8000
```

Acesse: `http://localhost:8000`

## 📝 Notas

- Todos os arquivos usam ES6 modules (`type="module"`)
- Compatível com navegadores modernos
- Não requer build ou compilação
- Funciona offline após primeiro carregamento
