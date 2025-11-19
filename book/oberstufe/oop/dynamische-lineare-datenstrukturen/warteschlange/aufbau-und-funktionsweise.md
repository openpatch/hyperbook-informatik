---
name: Aufbau und Funktionsweise
index: 0
lang: de
---

# Aufbau und Funktionsweise

![](/images/queue-crc-karten.png)

## Nachrichten einreihen

Die Methode enqueue soll eine neue Nachricht ans Ende der Warteschlange anhängen.

1. Hänge die incomingMessage an die Warteschlange an. Benutze dazu das [Objektdiagramm](https://jmp.openpatch.org/#pako:eNrFVslu2zAQ_RXDtwKBwGW45VIfe2mBIgV68YUSKVuNLBkSnSYN_O8dm7K8SA4CF0EFGCaH5HDem8chp6_zaRts8PPpPTZXflU3L7Fdr0NRV23sLAvnH_CX2gYNuS1bv72bT58K_3tdNyFOesY_gtaX7v9PXa-wSXczH0vbtr7z9n3jN92ONoSmSDfhMLT01mGrm_OtdjgPlwdblJfm7c7vSX_MXeWfQzd66TKrq-CrsB_56tvWLg4--96Yx03rm8quoscHHKsWMULc6cy23fuq018-C93amUhzQbRmKTVO51kazXtujhHu3V3hBVvOBvvjZT0G6cmWm2ifSekz64gH7jLci2I8Rxrf7UWAETYljGRAOMmhI2hdt8VOHMe0UwOJIIxy4IIILYnsdMA1JEaw_bKRoEbg93G8kct3A6COKKsgywlIxGEiDcfUXzrqU3_uxjvNc-_BAddZBtd54EATaaSkAohgikNHAxiZUGqOn4iMDOP7aEZGUnoLIzynQIB4DSKlKRdXGRFGJUpLdmCE94xAgqB5z0gkZBjehxJSbcryJvxKG-u81TYnjINSV_FrThJMLAzwA08Y8O5kDAV2Dvs0ijcq0utpjKviMS44w9OXp2PNOls1n8-nX2xZ1rvGG8uv6F-yBAwFrrDMaaZph1YqlVClpKGUSi6kjLCHKvp32Laq7G2wf_oi-Gay8MswwV1uwS-lSAD1QIBx_Iju8bOEa0YJN0JzLnXEP1TRv-MvN7em_f7TTZgN5lwyYiThEnOsZI9ZJEQqqihoVD_lEbN1ac52l0SWWgeW_1-pP_jCTYplM2mzZV1Nct-EYvH5Nu1TnRhNCMpbECnk4aQzqZAHqQUlBKnYaX__drJNYdPyAG1mhc-QE7xCDbBMd2ehf2pUdSjyIrPdo-yiqA_eFaMRMiw5hilBALVJBSarv6V5Qg320apQiRS2d2P1M3I5wxhtKhzeWto7KeAi1KLK6hUydaV0DgVwpZQk3HB8ToAhCpQ5yIopLKgYpOEU8I7AEzeI9eQ5F6n2TRt9k-30L_4HcZM).
2. Entwerfe zur Methode enqueue der Klasse Queue einen Algorithmus im :t[Pseudocode].
3. Bereite dich darauf vor deinen Algorithmus anhand des Objektdiagramms präsentieren zu können.

:::collapsible{title="Formulierungshilfe: Pseudocode" id="jkaskjkfjsafka"}

- Erzeuge ...
- Setze das Attribut / die Variable ... auf die Referenz ...

:::

## Benachrichtungen lesen

Die Methode front soll die erste Nachricht in der Warteschlange zurückgeben. Die Methode dequeue soll die erste Nachricht aus der Warteschlange entfernen.

1. Entferne den ersten Knoten aus der Warteschlange. Nutze dazu das [Objektdiagramm](https://jmp.openpatch.org/#pako:eNq1Vk1vozAQ_StVbitVlj_GXz31uJddadWV9pKLAZPSEojAdNut8t93gglpAqmqVEWKGI_t53lvhnEWr8tFG1zwy8UNmmu_rpuXaNebUNRVGwf3Rebv8Je4Bh25K1u_vV4ungr_d1M3IS56xhdF78vw_lfXazTZbuVj6drWD2i_Ot8NJ7oQmiLpwn7q3rsMrWHNzzrDdbg9uKI8dW93uG_Gc3CVfw7D7ClkWlfBV6Gf-eHb1q32mONoDrFrfVO5dUS8w7lqFSPEk4582x6rTh58Goa9tzLJJTWGJ8xmJk-T6O61OUTYw53RBa3MBff7ZTNH6cmVXfTfKuVTl1EPIkvxLIbxHGT8MIoEK11COU2BCprDINCmbotdcRzSziwQSTkTICSVRlE11IEwQKzk_baZoGboj3G8k8sPE2AZ1U5DmlNQyMNGGQ6pPwUaU38M4zMjcu8hA2HSFM7rIIARZZViEqjkWsAgA1hFGLOHR0ZFpvF9tSIzKb1EEZEzoEC9AZmwRMizikiriTaK7xURoyJAkLQYFYmCTMP7UkGqriwv4q-NdZl3xuWUC9D6LH8jKMHEwoQ_CMJBDF_GtMCOab-N4p2O9Po2xnXxGDcc8Rnb06FnHe1aLpeL764s653xzvYz9a84ActAaGxzhhs2sFVaE6a1sowxJaRSkfa0ij5P21WVu4z2H18E31yt_H24wlMu4a-UJID1QIELfKgZ-XMiDGdUWGmEUCbyn1bR5_mX3aVpv_l2EWeLOVecWkWFwhxrNXKWhCrNNAOD1c9EvBGfXFO4pNzTuHXSpyZN8OqwwFMz1MB4xVZ1KPIidcOfkZNmNrlPZyPk-KlZriUFzAmTGOR4OwnCLI7RqzEDDLbXc32jv8374H3TRmi6XfwH2g7qFQ)
2. Entwerfe zu den Methoden dequeue und front einen Algorithmus im :t[Pseudocode].
3. Bereite dich darauf vor deinen Algorithmus anhand des Objektdiagramms präsentieren zu können.

:::collapsible{title="Formulierungshilfe: Pseudocode" id="jkaskjkfjsafkasjfasdfsa"}

- Setze das Attribut / die Variable ... auf die Referenz ...

:::

## Abgrenzung zur Liste

Bis jetzt haben wir die lineare Datenstruktur Liste verwendet. Die lineare Datenstruktur wirkt zunächst als ein Rückschritt.

### Aufgaben

1. Beschreibe die Unterschiede zwischen den linearen Datenstrukturen Warteschlange und Liste.
2. Überlege, warum es spezialisierte lineare Datenstrukturen wie die Warteschlang gibt.
