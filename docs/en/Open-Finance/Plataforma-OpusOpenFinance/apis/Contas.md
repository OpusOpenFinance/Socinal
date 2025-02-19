---
layout: default
title: "Accounts API"
parent: "Data Sharing"
nav_order: 3
lang: "en"
alternate_lang: "/docs/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/Contas/"
---

# Accounts API

The *integration layer* API that returns information about *checking accounts*, *savings accounts*, and *prepaid payment accounts* held by transmitting institutions for their clients, including account identification data, balances, limits, and transactions.

This API does not separate between individual and corporate clients.

Before any *endpoint* is triggered, the platform has already verified the authenticity of the request's origin, the validity, expiration date, permissions, and scope of the consent sent by the receiver, ensuring that the request is authorized.

There are endpoints for:

- Retrieving the list of checking accounts, savings accounts, and prepaid payment accounts held by the client at the institution;
- Retrieving identification data of an account;
- Retrieving the balances of an account;
- Retrieving the list of transactions for an account;
- Retrieving the list of recent transactions (last 7 days) for an account;
- Retrieving the limits of an account.

## *Open API Specification* of the API

The documentation for the Accounts API to be built in the *integration layer* can be found [here][API-Contas].

[API-Contas]: ../../../../swagger-ui/index.html?api=en-Contas
