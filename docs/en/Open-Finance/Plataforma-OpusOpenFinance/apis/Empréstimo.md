---
layout: default
title: "Loan API"
parent: "Credit Operations"
nav_order: 1
lang: "en"
alternate_lang: "/docs/pt-br/Open-Finance/Plataforma-OpusOpenFinance/apis/Empréstimo/"
---

# Loans

The *integration layer* API that returns information on credit operations of the *loan* type, maintained by transmitting institutions for their clients, including data such as denomination, modality, contract number, fees, term, installments, payments (at least for the last 12 months), amortizations, guarantees, charges, and interest rates.

This API does not separate between individuals and legal entities.

Before any *endpoint* of the *integration layer* is triggered, the platform has already verified the authenticity of the request's origin and the validity, expiration date, permissions, and scope of the consent sent by the receiver, ensuring that the request is authorized.

There are *endpoints* for:

- Retrieving the set of loan contract information maintained by the client at the transmitting institution;
- Retrieving the details of a loan contract;
- Retrieving the installment schedule of a loan contract;
- Retrieving the list of guarantees linked to a loan contract;
- Retrieving the payment details of a loan contract.

## *Open API Specification* of the API

The documentation for the Credit Operations API to be built in the *integration layer* can be found [here][API-Empréstimo].

[API-Empréstimo]: ../../../../swagger-ui/index.html?api=en-Empréstimo
