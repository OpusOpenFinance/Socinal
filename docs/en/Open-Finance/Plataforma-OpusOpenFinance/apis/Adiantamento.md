---
layout: default
title: "Advance to Depositors API"
parent: "Credit Operations"
nav_order: 3
lang: "en"
alternate_lang: "/docs/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/Adiantamento"
---

# Advance to Depositors

The *integration layer* API that returns information on credit operations of the *advance to depositors* type, maintained by transmitting institutions for their clients, including data such as denomination, modality, contract number, fees, term, installments, payments (at least for the last 12 months), amortizations, guarantees, charges, and remunerative interest rates.

This API does not separate between individual and corporate clients.

Before any *integration layer* endpoint is triggered, the platform has already verified the authenticity of the request's origin, the validity, expiration date, permissions, and scope of the consent sent by the receiver, ensuring that the request is authorized.

There are endpoints for:

- Obtaining the list of advance to depositors contracts consented by the client;
- Retrieving the data of an advance to depositors contract;
- Retrieving the installment schedule of an advance to depositors contract;
- Retrieving the list of guarantees linked to an advance to depositors contract;
- Retrieving the payment data of an advance to depositors contract.

## *Open API Specification* of the API

The documentation for the Credit Operations API to be built in the *integration layer* can be found [here][API-Adiantamento].

[API-Adiantamento]: ../../../../swagger-ui/index.html?api=en-Adiantamento
