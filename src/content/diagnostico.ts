export const DIAGNOSTICO_ITENS = [
  "Tenho imóveis registrados em nome de pessoa física.",
  "Sou sócio de mais de uma sociedade empresária.",
  "Recebo receita de locação como pessoa física.",
  "Tenho herdeiros que ainda não participam da administração.",
  "Não existe acordo de sócios ou protocolo familiar em vigor.",
  "Há filhos de uniões distintas ou sócios com regimes de bens diferentes.",
] as const;

export const DIAGNOSTICO_FAIXAS = [
  {
    min: 1,
    max: 2,
    titulo: "Complexidade baixa",
    texto:
      "Os pontos marcados costumam ser resolvidos com ajustes contratuais pontuais. Ainda assim, convém verificar o regime de bens e a titularidade dos imóveis antes de qualquer providência.",
  },
  {
    min: 3,
    max: 4,
    titulo: "Complexidade intermediária",
    texto:
      "A combinação indicada costuma justificar o exame de uma estrutura societária, sobretudo quanto à destinação dos bens e às regras entre os sócios. A projeção comparativa esclarece se a medida é conveniente no seu caso.",
  },
  {
    min: 5,
    max: 6,
    titulo: "Complexidade elevada",
    texto:
      "Os pontos marcados envolvem, ao mesmo tempo, patrimônio disperso, ausência de regras entre sócios e cenário sucessório sensível. São os casos em que a análise individualizada tende a ser mais urgente.",
  },
] as const;
