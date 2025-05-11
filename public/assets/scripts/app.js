const apiUrl = '/filmes';

function readFilme(processaDados) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            processaDados(data);
        })
        .catch(error => {
            console.error('Erro ao ler filmes via API JSONServer:', error);
            displayMessage("Erro ao ler filmes");
        });
}

function createFilme(filme, refreshFunction) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filme),
    })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => {
                    throw new Error(`Erro ao inserir filme: ${response.status} ${response.statusText} - ${text}`);
                });
            }
            displayMessage("Filme inserido com sucesso");

            if (refreshFunction) readFilme(refreshFunction);
        })
        .catch(error => {
            console.error('Erro ao inserir filmes via API JSONServer:', error);
            displayMessage("Erro ao inserir filmes. Veja o console.");
        });
}

function updateFilme(id, filme, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(filme),
    })
        .then(response => {
            displayMessage("filme alterado com sucesso");
            if (refreshFunction) readFilme(refreshFunction);
        })
        .catch(error => {
            console.error('Erro ao atualizar filme via API JSONServer:', error);
            displayMessage("Erro ao atualizar filme");
        });
}

function deleteFilme(id, refreshFunction) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            displayMessage("filme removido com sucesso");
            if (refreshFunction) refreshFunction();
        })
        .catch(error => {
            console.error('Erro ao remover filme via API JSONServer:', error);
            displayMessage("Erro ao remover filme");
        });
}
