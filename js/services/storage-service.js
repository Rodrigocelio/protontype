export class StorageService {
  static KEYS = {
    PLATAFORMA: 'plataforma',
    PASSOS_CONCLUIDOS: 'passosConcluidos'
  };

  static savePlataforma(plataforma) {
    localStorage.setItem(this.KEYS.PLATAFORMA, plataforma);
  }

  static loadPlataforma() {
    return localStorage.getItem(this.KEYS.PLATAFORMA);
  }

  static savePassoConcluido(tutorialId, plataforma, passoIndex, concluido) {
    const key = `${this.KEYS.PASSOS_CONCLUIDOS}-${tutorialId}`;
    const data = this.loadPassosConcluidos(tutorialId);
    
    const passoKey = `${plataforma}-${passoIndex}`;
    data[passoKey] = concluido;
    
    localStorage.setItem(key, JSON.stringify(data));
  }

  static loadPassosConcluidos(tutorialId) {
    const key = `${this.KEYS.PASSOS_CONCLUIDOS}-${tutorialId}`;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
  }
}
