import createCustomEvent from "../modules/event.js";


export async function logout() {
    try {
        const response = await fetch('/api/login/logout', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();

        if (data.success) {
            const customEvent = createCustomEvent('/');
            window.dispatchEvent(customEvent); 
        } else {
            console.error('Erro ao fazer logout:', data.message);
        }
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
    }
  }