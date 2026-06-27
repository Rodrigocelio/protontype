export class TutorialService {
  static async loadTutorial(tutorialId, plataforma) {
    try {
      const response = await fetch(`./data/${tutorialId}/${plataforma}.json`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao carregar tutorial:', error);
      throw error;
    }
  }

  static async listTutorials() {
    try {
      const response = await fetch('./data/index.json');
      return await response.json();
    } catch (error) {
      console.error('Erro ao listar tutoriais:', error);
      return [];
    }
  }
}
