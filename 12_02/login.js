async function logar(){
    var usuario = document.getElementById("usuario").value;
    var senha = document.getElementById("senha").value;

    if (!usuario || !senha) {
        alert("Por favor, preencha todos os campos.");
        return;
    }
    const data = new URLSearchParams();
    data.append("usuario", usuario);
    data.append("senha", senha);

    try {
        const response = await fetch("http://localhost/12_02/login.php", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data.toString(),
        });
        const contentType = response.headers.get('Content-Type') || response.headers.get('content-type') || '';
        const text = await response.text();
        if (response.ok) {
            if (contentType.includes('application/json')) {
                try {
                    const status = JSON.parse(text);
                    if (status.success) {
                        alert(status.message || "Login realizado com sucesso!");
                    } else {
                        alert(status.message || "Falha no login. Verifique suas credenciais.");
                    }
                } catch (e) {
                    console.error('Erro ao parsear JSON:', e, '\nResposta do servidor:', text);
                    alert('Resposta inválida do servidor. Veja o console para detalhes.');
                }
            } else {
                console.error('Resposta não-JSON do servidor:', text);
                alert(text || 'Resposta inesperada do servidor. Veja o console para detalhes.');
            }
        } else {
            console.error('Erro na requisição:', response.status, text);
            alert('Erro na requisição. Veja o console para detalhes.');
        }
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        alert("Erro ao realizar login.");
    }
}