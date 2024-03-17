---
name: Aufbau und Funktionsweise
index: 0
lang: de
---

# Aufbau und Funktionsweise

![](/images/liste-crc-karten.png)

## Nachrichten anhängen

Die Methode append soll eine neue Nachricht ans Ende der Liste anhängen.

1. Hänge die incomingMessage ans Ende der Liste an. Benutze dazu das [Objektdiagramm](https://jmp.openpatch.org/#pako:eNq1lk1v2zgQhv9K1rcFWpVDDodkLptbe9iPQxfYSy4URaVqLSuQ5Gyzgf_7jqwPJ5YVJHELw5BEisOXj17OcPVwvWpa38br1SXflrGs6vv-vrpti2rT9A9fiix-5n_qa27I_bqJu3fXq7si_ntb1W3_0ne-CG69H67_VVXJt9C9-W3tmyYO0X4vmmGIb9u6SLft2BO2dR03XWf_1p9VxtJ4fF7UzYlmjnrcuuumOzyemmUTv5-IFapNy3P_lX6Noe_-IzaNvxljTk-nQm6bWG98GffjPnPf5mYftB2netSW9bwPbbt9_Go_8RDvSpCM2uaZN3nunR-m3WOcpO-jLSN82E_l_76_jfPV3vn1tmvebNfr3SPALxrE-ryRzhiRB5sGmynkVRy-x0uDRGWU1w6NDz4TIRtI31ZN0ZnvYCuwiVRGSydRAQoCHHz2HhOSGoQ1ZEkLR7CPcELeHN-kaMEfL12FEdbJXGWZA6IQbI_i2E7H0SY7PQ2WYiDrhJIQyHmDi0gkUoL8pkTUghc-EgGlEqOMQxJaSWddD2Qu8ucBOfFZ3w4kQrAmmBSVRUVpvggEbQdEggJrLKLTExF2DxkJ5FCydQhtj2Qu8ychGffYGwmwbBODcyIQqSzCIgGDJlHaONCK16lBDwC4GdAQsBmk4p-gHsDca08BPNbzTMJ7eKy2LL7FMcsdVjZlukNKfDLqk1-vq1-eH5dNZeowTgqpPoD8INQFiEslnomwsIsIEimsFcIQIuDETEmbWCkEyg6Y1NoMppnZ8XxmX6u3INuejQtejUsrpiKo200OLO-lkZbqMGqDKNGBII09rbl1z6eV10XmX8_rnyJe3MQvbfPb2dzw1dwsmASBtCV0Bu1UvthaieBMLQwKTTRWr0gujaBTlWkTfE4_AlssyzdQ-7htLy5_PZuYeTUxQJewZziVKS0tOTkWfOg2puVcJsFy1dPg-uPTna8Ln65HDFdZ8EhRpWxIh2IseNMZrewRNsfJdn7uOimPZegEgAUKZTjjHhLHe0q0NOQM8JGEu9Dt3p0oEj26KytTTSoPLmRZkD49UllsQlUypqXaOPPJglgjEquQuCaikdZpNdEUmHAZVCiUMHyYALWkdqAc66aPLXar_wFTSdLd).
2. Entwerfe zur Methode append der Klasse List einen Algorithmus im :t[Pseudocode].
3. Tausche deinen Algortihmus mit jemand anders und lasse ihn überprüfen. Überarbeite ihn gegebenenfalls.
4. Bereite dich darauf vor deinen Algorithmus anhand des Objektdiagramms präsentieren zu können.

:::collapsible{title="Formulierungshilfe: Pseudocode" id="jkaskjkfjsafka"}

- Erzeuge ...
- Setze das Attribut / die Variable ... auf die Referenz ...

:::

## Erste Nachricht entfernen

Die Methode remove soll den ersten Knoten der Liste entfernen.

1. Entferne den Knoten mit der Nachricht von mike aus der Liste. Nutze dazu das [Objektdiagramm](https://jmp.openpatch.org/#pako:eNq1lk1z2zgMhv9K6tvONCpIgiCZy_bWHrq7h3aml1woikrV2lZGkrNNM_7vhT7tRHYmiZuDxxIpvgAeggAXd5eLuvFNvFxc8OMqrsrqtn8ur5uiXNf9y7cii5_5l_qKB3K_rOP27eXipoj_X5dV03_0k_-AR2-H_19lueJH0X75Y-nrOg5qn4p6WOKbpirSTTPOhE1VxXU72X_1b5mxa7w-L6r6wDCrPhzdtuZ2r4esrOPPA1qhXDds-7_0ewz99D-xrv3VqDm9HZLc1LFa-1Xs1n3mufVVJ9qMpvbGsp73bmzb6Zed4UHvPZCM2uaZN3nunR_Mdhgn1zu14wjvOlP-y-11nEd745ebdni9WS63e4CftIj980Y6YyAPNg02U8hR7PbjqSKUIRkIMscMwEo_kL4u66JNvl1aCZtIZbR0EpVAIIFDnp1jQlILsIYsaXAkOoUD7s3xTR4dyY-nRmHAOpmrLHOCKATbo3iYTg_VpnS6L5ZiIOtASRHIeYNHkUikBPlLiaiBAx-JCKUSo4xDAq2ks64HMnfy9YBEZZTXDo0PPoOQnQQkimBNMCkqi4rS_CgQtC0QKZSwxiI6PRHh7CEjBTmUnDqEtkcyd_P1kBzI9Jcj4ThMDM5BIFJZFEeRGK0SS4acEMSB2gmIYSAgnDBAxmqpeiDz3LsPZN-dRwrg3b6zq-JHHKveLrCp8u1K5L1VH_1yWb55fF02ta3dOglSvRPyHagzARcKHlE4cqpIJBKsBTCEKFDogZmSNrESAKVUbEVrMyTRLD1PZ_a9fAmyzcm4xLNxacVUgNrT5YTlszXSUi1GbRAlOgGksac1z9zTaeVVkfnn8_paxLOr-K2p_z6ZGz6bm-UTiHwmLaEzaKd2xqmVAFduMAiaaOxmkVwahU5Vpk3wOf0JbHG1egG1D5vm7OKvk4mZZxMTEmXCtdqSJGu1kOPB5BaXtDXMCKNJadI9snnBfaXiPl6gXtreZlt7BICzOrFO8A2HJGql3BA_6QS52WsExZlE4Prb5I2vCp8ux4jeZ8EjRZXyeXQIY_-frqyr3rv6oXvza-hB5855PxJuMkqwF8bt1c1zSnhvyPH2kOUpdNu3B7B2l-DO71jVvTRsF78BG6nyzw).
2. Entwerfe zur Methode remove der Klasse List einen Algorithmus im :t[Pseudocode].
3. Tausche deinen Algortihmus mit jemand anders und lasse ihn überprüfen. Überarbeite ihn gegebenenfalls.
4. Bereite dich darauf vor deinen Algorithmus anhand des Objektdiagramms präsentieren zu können.

:::collapsible{title="Formulierungshilfe: Pseudocode" id="jkaskjkfjsafkasjfa"}

- Setze das Attribut / die Variable ... auf die Referenz ...

:::

## Aktuelle Nachricht entfernen

Die Methode remove soll erweitert werden, sodass der aktuelle Knoten (current) der Liste entfernt wird.

1. Entferne den Knoten mit der Nachricht von joe aus der Liste. Nutze dazu das [Objektdiagramm](https://jmp.openpatch.org/#pako:eNq1lstu2zoQhl-l9bpVOZzhkOymWXbR9ix6gG6yoSQqUWtbhiTnNCfwu3dkXZxYdpALCsOQNORc-OnnUIu7y0XThjZeLj7K7Squqvq2v682bVmtm_7huszjd_mnoRZDEZZN3L27XNyU8b9NVbf9pN9yUWK9Ha7_V9VKbqGb-WsZmiYO0b6UzeAS2rYu0207jmTbuo7rbrCf9a3KpTTxL8q6OWGWqMfWXZfu8Hgqyzr-PhErq9at5P4n_RmzfvhrbJpwNcacnk6F3DaxXodV3Pt9l7H11T5oO6a6Z8t73gfbbh-_2ice4l0o1tG4Ig-2KIIPQ9o9xqn0fbTzCO_2qcK_t5s4X-1NWG4783q7XO7uAX6Sk9QXrPbWqiJzaeZyJFnF4X08NUhEi8F4siELucrygfSmaspOfAdZoU_QafAAoAx4r3nQmfaJIm81Kk8a5EL7CCfKm-ObKjqjj6euwirndYF57oE5y1yP4lhOx9EmOT0MllLGzivUkLEPls4i0cQJyUxNZJTyTAMRQEwsWk-sDGrvfA9kXuTfA3Litb4cSITM2cymhI6Q0-IsEHIdEA0IzjoibyYi4BK2GlgkohiYXI9kXuZfQjLusRcSkLJtzLxXGTPmEc4SsGQTNNaDQVmnATMAEDOQZRAxaJSf4h7AXGsPAdyv55GGd3e_2lX5K45d7rCyqdMdWuIDr89huazePu6XT8fUwU8rjR9Af1D4BtRHVI9EOLOLGBKtnFPKMhHQxAy1S5xWinQHTBtjB9HM5Ph6Zj-rlyDbvhoXPBuXQaGiuNtNHpzspZEWdhiNJdLkQbEZ2vBcuq-nVdRlHp7P60cZ31zF67b59Gpu9GxuDmxCwMaxHFbkgCaVKTm_WNRHyjAz9J8CN6EuQ7ocSVzkWSCOmApcT2ps3tP3xqqn2Bw3jvk3xMni3oM2CQAjKLTSPQ6b4D0nRlv2Fiw7GSK_e3ei4fXgLsQzYC6LKyhlwnBU5aaON2W1bWat8UxRRo529M4BWhGWH2sC0tLNAUVUKMccSjc_U9PAMtZNH1ntFn8AVy9sAw).
2. Erweitere deinen Algorithmus zum Entfernen von Nachrichten, sodass der aktuelle Knoten (current) entfernt wird.

3. Bereite dich darauf vor deinen Algorithmus anhand des Objektdiagramms präsentieren zu können.

:::collapsible{title="Formulierungshilfe: Pseudocode" id="jkaskjkfjsafkasjfa"}

- Gehe so lange ... bis ...
- Setze das Attribut / die Variable ... auf die Referenz ...

:::

:::collapsible{title="Hilfe: Vorgehen" id="jksafjsdfkjsa"}

Um den aktuellen (current) Knoten zu löschen, muss man den vorherigen Knoten kennen. Doch wie kommt man an den vorherigen Knoten?

:::

## Grenzfälle erkunden

Bis jetzt haben wir Knoten aus der Mitte entfernt und eine neue Nachricht ans Ende einer bereits gefüllte Liste angehängt. Doch man muss auch immer an Grenzfälle denken, wenn man einen Algorithmus formuliert.

### Aufgaben

1. Ermittle, welche Grenzfälle es in Bezug auf die Datenstruktur Liste gibt.
2. Modifiziere deine Algorithmen so, dass die Grenzfälle beachtet werden.

:::collapsible{title="Tipp: Grenzfälle finden" id="sjnvakvd"}

- Funktionieren deine Algortihmen z.B. für eine leere Liste?
- Funktioniert dein Algorithmus z.B. beim Entfernen des letzen Knotens?

:::


:::collapsible{title="Formulierungshilfe: Pseudocode" id="jkaskjkfjsafkasjfa"}

- Setze das Attribut / die Variable ... auf die Referenz ...
- Wenn ..., dann ...
- Gehe so lange ... bis ...

:::
