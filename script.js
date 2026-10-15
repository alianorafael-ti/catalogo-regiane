
document.addEventListener("DOMContentLoaded", () => {
  const catalogo = document.getElementById("catalogo");
  const contato = document.getElementById("whatsapp-contato");

  // Substituir pelo WhatsApp da Regiane.
  // Formato: 55 + DDD + número, somente dígitos.
  const telefoneWhatsApp = "5511957333006";

  const formatarPreco = (valor) =>
    valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

  function criarLinkWhatsApp(mensagem) {
    if (!telefoneWhatsApp) return null;

    return `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(mensagem)}`;
  }

  function configurarBotao(botao, mensagem) {
    const link = criarLinkWhatsApp(mensagem);

    if (link) {
      botao.href = link;
      botao.target = "_blank";
      botao.rel = "noopener noreferrer";
      botao.removeAttribute("aria-disabled");
      botao.style.pointerEvents = "";
      botao.style.opacity = "";
    } else {
      botao.removeAttribute("href");
      botao.setAttribute("aria-disabled", "true");
      botao.style.pointerEvents = "none";
      botao.style.opacity = "0.5";
    }
  }

  function criarCard(produto) {
    const card = document.createElement("article");
    card.className = "produto-card";

    const imagem = document.createElement("img");
    imagem.src = produto.imagem;
    imagem.alt = `Fraldas ${produto.nome}`;
    imagem.loading = "lazy";

    const titulo = document.createElement("h3");
    titulo.textContent = produto.nome;

    const label = document.createElement("label");
    label.textContent = "Escolha o tamanho:";

    const seletor = document.createElement("select");
    seletor.id = `tamanho-${produto.id}`;
    label.htmlFor = seletor.id;

    produto.variacoes.forEach((variacao, indice) => {
      const opcao = document.createElement("option");
      opcao.value = indice;
      opcao.textContent =
        `${variacao.tamanho} — ${variacao.unidades} unidades`;
      seletor.appendChild(opcao);
    });

    const quantidade = document.createElement("p");
    quantidade.className = "quantidade";

    const preco = document.createElement("p");
    preco.className = "preco";

    const botao = document.createElement("a");
    botao.className = "botao botao-whatsapp";
    botao.textContent = "Pedir pelo WhatsApp";

    function atualizarProduto() {
      const variacao = produto.variacoes[Number(seletor.value)];

      quantidade.textContent =
        `Pacote com ${variacao.unidades} unidades`;

      preco.textContent = formatarPreco(variacao.preco);

      const mensagem =
        `Olá! Gostaria de consultar a disponibilidade de:\n\n` +
        `Produto: ${produto.nome}\n` +
        `Tamanho: ${variacao.tamanho}\n` +
        `Quantidade: ${variacao.unidades} unidades\n` +
        `Preço anunciado: ${formatarPreco(variacao.preco)}\n\n` +
        `Poderia me informar sobre a entrega?`;

      configurarBotao(botao, mensagem);
    }

    seletor.addEventListener("change", atualizarProduto);

    card.append(
      imagem,
      titulo,
      label,
      seletor,
      quantidade,
      preco,
      botao
    );

    atualizarProduto();

    return card;
  }

  produtos.forEach((produto) => {
    catalogo.appendChild(criarCard(produto));
  });

  configurarBotao(
    contato,
    "Olá! Gostaria de conhecer os produtos disponíveis."
  );
});
