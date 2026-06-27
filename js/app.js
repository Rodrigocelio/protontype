import { TutorialService } from './services/tutorial-service.js';
import { StorageService } from './services/storage-service.js';
import { PlatformDetector } from './utils/platform-detector.js';

export const TutorialApp = {
  data() {
    return {
      plataformaAtiva: 'windows',
      toast: '',
      loading: true,
      erro: null,

      plataformas: [
        { id: 'windows', nome: 'Windows', icone: 'fab fa-windows' },
        { id: 'ubuntu', nome: 'Ubuntu', icone: 'fab fa-linux' },
      ],

      tutorial: {
        titulo: '',
        descricao: ''
      },

      passos: [],
      passosConcluidos: {},
    };
  },

  methods: {
    async trocarPlataforma(id) {
      this.plataformaAtiva = id;
      StorageService.savePlataforma(id);
      await this.carregarConteudo();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    async carregarConteudo() {
      this.loading = true;
      this.erro = null;

      try {
        const data = await TutorialService.loadTutorial('opencode-tutorial', this.plataformaAtiva);
        
        this.tutorial.titulo = data.titulo;
        this.tutorial.descricao = data.descricao;
        this.passos = data.passos;
      } catch (error) {
        this.erro = 'Erro ao carregar tutorial: ' + error.message;
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    copiarCodigo(linhas) {
      const texto = linhas.join('\n');

      navigator.clipboard.writeText(texto).then(() => {
        this.toast = 'Código copiado!';
        setTimeout(() => (this.toast = ''), 2000);
      });
    },

    marcarComoConcluido(index) {
      const key = `${this.plataformaAtiva}-${index}`;
      this.passosConcluidos[key] = !this.passosConcluidos[key];
    },

    isPassoConcluido(index) {
      const key = `${this.plataformaAtiva}-${index}`;
      return this.passosConcluidos[key] || false;
    },

    isPassoManual(passo) {
      return passo.tipo === 'download' || passo.tipo === 'configuracao';
    }
  },

  async mounted() {
    const salvo = StorageService.loadPlataforma();
    this.plataformaAtiva = salvo || PlatformDetector.detect();
    await this.carregarConteudo();
  },
};
