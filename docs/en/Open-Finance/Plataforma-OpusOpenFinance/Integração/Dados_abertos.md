---
layout: default
title: "Open Data"
parent: "Platform Integration"
nav_order: 1
lang: "en"
alternate_lang: "/docs/pt-br/Open-Finance/Plataforma-OpusOpenFinance/Integração/Dados_abertos/"
---

# Introduction

The open data profile, or phase 1 + 4A, refers to the public data that participating institutions in Open Finance must disclose to the ecosystem. For more information on the open data profile, [see here][Perfis-Open-Finance-Brasil].
The open data profile also requires integration with the product, but it is much simpler. The purpose of the open data profile is to have non-sensitive information from the participant publicly disclosed. To achieve this, a highly sophisticated integration is not necessary.

## Integration

The integration of the open data profile does not require connection to the client’s back-end systems. What we suggest is building a static or dynamic JSON file to integrate with the product. The integration is done through the connector layer, so each of the regulatory open data APIs will have its corresponding connector. Therefore, it is necessary to write a JSON for each of the available APIs. Of course, only the products that the institutions offer.

## Open Data APIs

### Service Channels

The service channels API provides information about the institution's service channels, such as:

1. Physical branches
2. Electronic service channels
3. Telephone service channels
4. Correspondent bank agents
5. Self-service terminals

### Products

The product APIs refer to the products offered by the institution, and they may include:

1. Accounts
2. Loans
3. Financing
4. Discounted receivables (receivables advance)
5. Advances to depositors (overdraft)
6. Credit cards
7. Investments
8. Insurance
9. Acquiring
10. Capitalization bonds
11. Pension
12. Foreign exchange

## JSON File for Integration

As explained in the integration section, the integration is done through the connector that takes data from a static or dynamic JSON. To build this file, simply follow the "response" fields expected in the specifications in the table below. Once the file is built and follows all the models of the products offered by the institution, the connector must be built and plugged into the product. Specifications table:

|API                               |Link Open API          |
|----------------------------------|:---------------------:|
|Service Channels                  |[Link][Channels]       |
|Accounts                           |[Link][Accounts]       |
|Loans                              |[Link][Loans]          |
|Financing                          |[Link][Financings]     |
|Discounted Receivables            |[Link][Unarranged]     |
|Advances to Depositors            |[Link][Inv-financings] |
|Credit Cards                       |[Link][Credit]         |
|Investments                        |[Link][Investments]    |
|Insurance                          |[Link][Insurance]      |
|Acquiring                          |[Link][Acquiring]      |
|Capitalization Bonds              |[Link][Capitalization] |
|Pension                            |[Link][Pension]        |
|Foreign Exchange                   |[Link][Exchanges]      |

[Acquiring]: ../../../../swagger-ui/index.html?api=en-open-data-acquiring
[Accounts]: ../../../../swagger-ui/index.html?api=en-open-data-accounts
[Capitalization]: ../../../../swagger-ui/index.html?api=en-open-data-capitalization
[Channels]: ../../../../swagger-ui/index.html?api=en-open-data-channels
[Credit]: ../../../../swagger-ui/index.html?api=en-open-data-credit-cards
[Exchanges]: ../../../../swagger-ui/index.html?api=en-open-data-exchanges
[Financings]: ../../../../swagger-ui/index.html?api=en-open-data-financings
[Insurance]: ../../../../swagger-ui/index.html?api=en-open-data-insurance
[Investments]: ../../../../swagger-ui/index.html?api=en-open-data-investments
[Inv-financings]: ../../../../swagger-ui/index.html?api=en-open-data-invoice-financings
[Loans]: ../../../../swagger-ui/index.html?api=en-open-data-loans
[Pension]: ../../../../swagger-ui/index.html?api=en-open-data-pension
[Unarranged]: ../../../../swagger-ui/index.html?api=en-open-data-unarranged

[Perfis-Open-Finance-Brasil]: ../../Open-Finance-Brasil/PerfisOFB/Dados-abertos.html
