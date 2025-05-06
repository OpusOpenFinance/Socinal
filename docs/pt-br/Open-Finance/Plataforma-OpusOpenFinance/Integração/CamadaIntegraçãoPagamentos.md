---
layout: default
title: "Pagamentos"
parent: "Integração da Plataforma"
nav_order: 3
has_children: true
lang: "pt-br"
alternate_lang: "/docs/en/Open-Finance/Plataforma-OpusOpenFinance/Integração/CamadaIntegraçãoPagamentos/"
---

## Pagamentos

A integração com o pilar de pagamentos do _Open Finance Brasil_ é necessária apenas para o perfil de Detentor de Conta. Essa integração permite que a **Plataforma Opus Open Finance** direcione uma requisição para os sistemas de retaguarda necessários para o fluxo do pagamento. O fluxo de pagamento, em alto nível, se divide em dois, o **consentimento** e a **liquidação do pagamento** e ambos tem suas integrações necessárias. A integração com o produto funciona através de uma camada que chamamos de _camada de integração de pagamentos_.

## Integração

A imagem abaixo esquematiza como o funcionamento da camada de integração. Quando uma instituição participante do _Open Finance Brasil_ envia uma requisição de pagamento, a **Plataforma Opus Open Finance** a recebe e realiza todas as validações necessárias, incluindo a verificação do consentimento associado ao pagamento. Uma vez que a requisição seja considerada válida, a plataforma realizará uma chamada a esse camada de integração para efetivar o pagamento (no exemplo, acionando o serviço Pix da instituição).

![Conector](./images/CamadaIntegração.png)

---

## Camada de integração

A integração é disponibilizada a partir de APIs padrões que devem ser avaliadas para que a retaguarda das instituições participantes do Open Finance se adequem ao padrão disponibilizado. Em geral, a API de pagamentos se resume a 5 tipos de operações diferentes que devem ser suportadas. São elas:

_Etapa do consentimento:_

1. Discovery de conta: Responsável por encontrar as contas do correntista que está requisitando uma iniciação de pagamento em um instituição participante como ITP.
2. Validação de consentimento: Durante o consentimento, o regulatório do Open Finance exige que os dados do pagamento sejam validados. Isso é necessário para evitar erros de pagamento após a aprovação do consentimento.

_Etapa do pagamento:_

3. Criar uma iniciação de pagamento: Requisição para de fato iniciar o pagamento vinculado ao consentimento. A partir dessa chamada, o Detentor de Conta será responsável pela liquidação do pagamento Pix.
4. Retornar o status de um pagamento: Operação para retornar o status de pagamento, de acordo com a [máquina de estados](https://openfinancebrasil.atlassian.net/wiki/spaces/OF/pages/347078805/M+quina+de+Estados+-+v4.0.0+-+SV+Pagamentos) do _Open Finance Brasil_.
5. Cancelar um pagamento: Para o caso de pagamentos agendados, é necessário disponibilizar uma forma de cancelar o agendamento via Open Finance. Essa operação é responsável por isso.

## API de integração

Para acessar ao arquivo OAS da API de integração, [clique aqui.][API-pagamento]

[API-pagamento]: ../../../../swagger-ui/index.html?api=payment-integration

## Cenários de Pagamentos a Serem Cobertos pela Integração

Na implementação da integração de pagamentos, é necessário cobrir a criação e a consulta de pagamentos em cada um dos cenários a seguir.

Para pagamentos retidos para análise (status "PDNG" no Open Finance) ou agendados, também é necessário contemplar a possibilidade de revogação do pagamento.

### Cenários por Tipo de Usuário Logado

- **Pessoa Física (PF)**
- **Pessoa Jurídica (PJ)** *(quando suportado pela retaguarda da instituição financeira)*

### Cenários por Data de Efetivação do Pagamento

- **Instantâneo**: Pagamentos a serem efetivados no mesmo dia da solicitação.
- **Agendado**: Pagamentos a serem efetivados em data futura.

### Cenários por Forma de Iniciação do Pagamento

- **MANU**: Iniciado por inserção manual dos dados bancários.
- **INIC**: Iniciado pelo recebedor (*creditor*).
- **DICT**: Iniciado por uso de chave Pix.
- **QRES**: Iniciado por QR Code Estático.
- **QRDN**: Iniciado por QR Code Dinâmico.

### Cenários por Tipo de Tentativa de Pagamento

O Arranjo Pix possibilita rententativas para pagamentos específicos, como o Pix automático.  
Ao realizar um Pix pelo Open Finance, a integração deve tratar adequadamente as seguintes tentativas de pagamento:

- **Solicitação Original:** A primeira tentativa de execução do pagamento, que acontece para todos os pagamentos.
- **Retentativa Extradia:** Apenas suportada para pagamentos específicos (ex.: Pix automático). É uma nova tentativa realizada em um dia diferente da tentativa original.

**⚠️ Importante:** A retentativa intradia (realizada no mesmo dia), quando aplicável, deve ser identificada e tratada pelo sistema de retaguarda da instituição financeira.

---

### Como Identificar os Cenários

A seguir, é apresentada uma visão mais técnica das regras de identificação os cenários de pagamentos descritos anteriormente.

A análise de campos abaixo é feita para o payload da requisição de criação de pagamentos.

### Como Identificar o Tipo de Usuário Logado

| Campo `consent.businessDocumentType.document.identification` | Interpretação |
| ------------------------------------------------------------ | ------------- |
| Ausente                                                      | Usuário PF    |
| Preenchido                                                   | Usuário PJ    |

**ℹ️ Observação:** Independentemente do tipo de usuário, seu CPF estará disponível no campo `consent.loggedUser.document.identification`.

### Como Identificar a Data de Efetivação do Pagamento

O campo que define a data do pagamento varia conforme o tipo de pagamento (campo `paymentType`):

#### Caso `paymentType` seja `PAYMENT_CONSENT`

| Campo `consent.payment.schedule`          | Cenário     | Data de Pagamento                      |
| ----------------------------------------- | ----------- | -------------------------------------- |
| **Ausente**                               | Instantâneo | Data atual                             |
| Possui subcampo `single`                  | Agendado    | `consent.payment.schedule.single.date` |
| Possui subcampo **diferente** de `single` | Agendado    | `requestBody.data.date`                |

#### Caso `paymentType` seja `PAYMENT_RECURRING_CONSENT`

| Campo `requestBody.data.date` | Cenário     | Data de Pagamento       |
| ----------------------------- | ----------- | ----------------------- |
| É data **atual**              | Instantâneo | Data atual              |
| É data **futura**             | Agendado    | `requestBody.data.date` |

### Como Identificar a Forma de Iniciação e o Recebedor (creditor)

A **forma de iniciação** do pagamento é determinada pelo valor do campo `requestBody.data.localInstrument`.  
A forma de identificação do **recebedor (creditor)** varia conforme o tipo de iniciação informado.

A tabela abaixo resume os campos para a identificação cada cenário:

| Forma de Iniciação | Campos utilizados para identificar o recebedor                     |
| :----------------: | ------------------------------------------------------------------ |
|        MANU        | `creditorAccount` (objeto com informações bancárias)               |
|        INIC        | `proxy` (Chave Pix)                                                |
|        DICT        | `proxy` + `creditorAccount`                                        |
|        QRES        | `proxy` + `creditorAccount` + `qrCode` (String com o QR Code lido) |
|        QRDN        | `proxy` + `creditorAccount` + `qrCode`                             |

**⚠️ Importante:** Quando houver mais de uma forma de identificação, deve-se validar a consistência entre elas.
Exemplo: a chave Pix deve se referir à mesma conta indicada no campo creditorAccount.

**ℹ️ Observação:** Todos os campos mencionados na tabela acima estão localizados dentro de `requestBody.data`.

### Como Identificar a Tentativa de Pagamento

| Campo `requestBody.data.originalRecurringPaymentId` | Interpretação        |
| --------------------------------------------------- | -------------------- |
| Ausente                                             | Tentativa Original   |
| Preenchido com o ID do pagamento original           | Retentativa Extradia |


## Validações Obrigatórias para Pagamentos

As validações a seguir devem ser implementadas na rota específica para a validação de dados do pagamento.

Para cada validação, o erro listado na resposta da integração deve apresentar no campo `code` o código correspondente, conforme indicado.

### Validação do Valor Máximo do Pagamento

**ℹ️ Observações:**

- Validação realizada para pagamentos do tipo `PAYMENT_CONSENT` (valor do campo `requestBody.paymentType`).
- Todos os demais campos abaixo estão localizados dentro de `requestBody.data.payment`.

#### Regra

O valor da transação (campo `amount`) deve estar abaixo:

- Do limite estabelecido pela Instituição Detentora (caso exista).
- Do valor máximo absoluto, em reais, de `999999999.99` (isto é, até 9 dígitos antes do ponto decimal e 2 após).
    - O valor **não** pode ser igual ao limite máximo.

**Código de erro:** `VALOR_ACIMA_LIMITE`

## Validações de QR Code

**ℹ️ Observações:**

- Validações realizadas para pagamentos do tipo `PAYMENT_CONSENT` (valor do campo `requestBody.paymentType`).
- Todos os demais campos abaixo estão localizados dentro de `requestBody.data.payment`.

#### Regras Gerais

1. O tipo do QR Code deve ser coerente com a forma de iniciação do pagamento (campo `details.localInstrument`):
    - Se a forma de iniciação for **QRES**, o QR Code deve ser **Estático**.
    - Se a forma de iniciação for **QRDN**, o QR Code deve ser **Dinâmico**.
    - **Código de erro:** `QRCODE_INVALIDO`

#### Caso o QR Code seja **Estático**

1. O valor presente no QR Code Estático deve ser o mesmo informado no payload do pagamento (campo `amount`).
    - **Código de erro:** `VALOR_INVALIDO`

2. A chave Pix presente no QR Code Estático deve ser idêntica à chave Pix informada no payload do pagamento (campo `details.proxy`).
    - **Código de erro:** `QRCODE_INVALIDO`

### Caso o QR Code seja **Dinâmico**

1. O status do QR Code Dinâmico deve ser válido para uso.
    - **Código de erro:** `QRCODE_INVALIDO`

# Integração - Dúvidas Frequentes - FAQ

## Sobre Descoberta de Recursos

Dúvidas referentes ao [discovery de recursos no Opus Open Finance](/pt-br/integração-plugin/consent/readme.md#Discovery-de-recursos-no-Opus-Open-Banking).

**O que é um "recurso"?**

No Open Finance, "recursos" são componentes de dados ou serviço que pode ser consumido por APIs, respeitando os critérios de segurança e consentimento.
Na prática, um "recurso" pode ser uma conta transacional, um cartão, um investimento, entre outros.

**O que devo retornar nos campos `key` de `resourceLegacyId` e `resourceName`?**

Os campos `resourceLegacyId` e `resourceName` funcionam como identificadores internos na retaguarda da instituição financeira e devem ser definidos para uso nessa camada. Ambos são estruturados como listas de pares *key-value* para oferecer suporte a identificadores compostos.

Para o `resourceLegacyId`, caso o ID seja simples, é suficiente retornar algo como:

```json
"resourceLegacyId": [
    { "key": "id", "value": "<valor do id>" }
]
```

Já para o `resourceName`, é importante retornar valores que ajudem o usuário final a reconhecer o recurso. Por exemplo, no caso de uma conta bancária, pode-se retornar algo como:

```json
"resourceName": [
    { "key": "agencia", "value": "<número da agência>" },
    { "key": "conta", "value": "<número da conta>" }
]
```

**O usuário não possui contas a serem retornadas. Devo retornar erro ou lista vazia?**

Caso o usuário não possua contas, o retorno deve ser sucesso (HTTP 200) com uma lista vazia de recursos (`{ "data": { "resources": [] } }`).

**Na descoberta de contas do fluxo de pagamentos, qual conta deve vir como "selecionada por padrão"?**

Se o campo `debtorAccount` do consentimento estiver preenchido com uma conta válida para pagamentos, essa conta deve ser marcada como "selecionada por padrão" (`"defaultSelected": true`). Independentemente disso, todas as contas disponíveis para pagamento devem ser retornadas.

## Sobre Validação dos Dados de Pagamento

**O que deve ser validado na rota específica para a validação de dados do pagamento?**

Conferir as [validações obrigatórias para pagamentos](/pt-br/integração-plugin/recomendacoes/validacoes-pagamentos/readme.md).

## Sobre Solicitações de Criação de Pagamentos

**Como identificar a conta escolhida pelo portador para realizar o débito?**

Após a aprovação do consentimento de pagamento, a lista `consent.resources` enviada no payload da requisição de pagamento sempre conterá apenas um único recurso, representando a conta selecionada.  
O campo `consent.debtorAccount` estará também sempre preenchido com as informações da conta escolhida.

**Onde encontrar a data do pagamento para cada cenário ou tipo de pagamento?**

Conferir [como identificar a data do pagamento](/pt-br/integração-plugin/recomendacoes/cenarios-pagamentos/readme.md#Como-Identificar-a-Data-de-Efetivação-do-Pagamento)

**A retaguarda da instituição financeira precisa suportar Agendamentos Recorrentes?**

Não. O produto realizará uma requisição separada para cada data de recorrência.

Por exemplo, ao receber uma requisição de agendamento recorrente por 5 meses, um débito por mês, o produto solicitará para a retaguarda da instituição financeira 5 agendamento independentes.  
A data de cada agendamento deve ser determinada conforme descrito em [como identificar a data do pagamento](/pt-br/integração-plugin/recomendacoes/cenarios-pagamentos/readme.md#Como-Identificar-a-Data-de-Efetivação-do-Pagamento).