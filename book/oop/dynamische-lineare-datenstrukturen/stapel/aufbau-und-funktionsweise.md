---
name: Aufbau und Funktionsweise
index: 0
lang: de
---

# Aufbau und Funktionsweise

![](/images/stack-crc-karten.png)

## Nachrichten auflegen

Die Methode push soll eine neue Nachricht auf den Stapel legen.

1. Hänge die incomingMessage an die Warteschlange an. Benutze dazu das [Objektdiagramm](https://jmp.openpatch.org/#pako:eNq1lj1z20gMhv-KojriAIv9vCYu74qkSWaucbNcLi3GFKkhKSeOR__9IPFDsiV5IvtSaLhcEi-BBxAW86fbedv5Lt7O_-LlKq7q5rFf1-uuqKu2v1kWWfzKv9Q3vJH7so3bj7fzhyL-WNdN17_0ky_Au4_D9Vddr3iJuzfvS9-2cVD72vlw3y991zVFuunGR8voM14N73ypM_ZsuxM4uj9nV8Wf3Us7tgp11cWqf_I5tq2_G_Wmu3NqmzY2lV_FQbEpqru9XHf4yrSX9fQOe9u9fp1-j6Eb9G6swDzk0gJYtCHDfnsP5eD1Xu4CkKf9h_y3x3U8E-aDLzf9_o1UQZJwMsrcA0o7hLuu22KXz0OmFoSJlqil0RqMQhRD6lCaxGrQJCw4QdLuBc4Inwlh8uhCfn47jEw5YaTSEHKTZpI4jGfpfCk0pfO5TG6DCJiCl9rkpPRFGoiQKGHJWESDkuwIw8oEnTXWWQRrSKqexql_f5JGLlWWB--c0S7XuX8jDe-9y1WgNDiHnPmLNAgoAcGFoBRqLTUd0SBHTlprwaA2oqdx6t8fo1FtyvJNwUdN0pvgQATIMx0uBq80JVJoK4ywyhlUU_AiAeIHiqkI5RQNwZ_U2PPgj_15pdE8HXu7Ku7j2F2OiQwd5tCKnlktfVnWr5tlU68_mAkQcgG4EPCK7YVCcYljSrsiEUo5MgMrEiIRVivtCAkEuB7VaQG-H1XwTemvZ_X35u2g0F0PCmyirJNEjhurI6knUpBYxz1HCC34N5A6rdb3k1r7zVtI_VvE2V1cdrPYzuImLD-9A5y9GpyykDAFAgRjJF-OuBlQBmDXr3e11oMzNubcp5XhIy1TEf4PcHlTdL-uB_dPWM7Sopp5hjbL_Id3_DPxam7WJAKZmzBAjlvWeKAtpEsYm-MWr5223OP7eeXBN4VPyxHFjZRRZ86mxAwBpBpa9TgUVfHHQLJ92WhPZ53z84dATECDBE4j8MFLehpAdCKMJsVnruKck9p-PHc29NxukH3kKYZstBzOOFtNnhZVqFdM6sKxcFovl7yVCQMDqRWPB4pw9HahMHEKDSD7bZRAOvH2aPLsWcem7dVhO_8Py2-Uig).
2. Entwerfe zur Methode push der Klasse Stack einen Algorithmus im :t[Pseudocode].
3. Bereite dich darauf vor deinen Algorithmus anhand des Objektdiagramms präsentieren zu können.

:::collapsible{title="Formulierungshilfe: Pseudocode" id="jkaskjkfjsafka"}

- Erzeuge ...
- Setze das Attribut / die Variable ... auf die Referenz ...

:::

## Benachrichtungen lesen

Die Methode top soll die erste Nachricht auf dem Stapel zurückgeben. Die Methode pop soll die erste Nachricht des Stapels entfernen.

1. Entferne den ersten Knoten aus der Warteschlange. Nutze dazu das [Objektdiagramm](https://jmp.openpatch.org/#pako:eNq1lk1zm0AMhv9KxueG0Ur7oe2lOfbSXtKZXnJZliWmweABnI9m_N-7Boyd2M40zuTAsLugF-mRRmL2fDNrO9eFm9nXuFyERd08Det62RV11Q6beZGF63ilrokHuSvbsP5yM7svwsOybrrhpcd4g3j6NN7_1vUiLsXmzbvStW0Y1a475--Gpeu6pkhX3fbRPLgsrsZ3ftZZ9Gy9EdjbH7OrwmP32i5a-brqQjU8-RHa1t1u9abdMbVVG5rKLcKo2BTVbS_X7b4ynWUDvd3Zutev0z_Bd6PeFaPIfS4ZgAX7TAzHPZSd173cCSDP_Yfcr6dlOBLmvStXw_mVVF4SWhlk7kBIHsNd1m2xyecuU5ckEi2FlkZrMEoIHFMnpElYgyZksEiSe4EjwkdCmDw6kZ__DiNTFo1UGnxu0kxSDONFOl8LTel8KZOzRy9ScFKbnJQ-SUMISBQyGRbCCEm8hcEyEZYNWxbAhqQaaBz695k0cqmy3Dtrjba5zt2ZNJxzNleeUm-tiJk_SYOAEsBYCEoJraWmPRpkyUpmBiO0wYHGoX-fRqNaleVZwQdN0hlvAT3kmfYng1eaEoma0SAra4SagscEKD5QkQoqq2gM_qDGXga_788bjeZ539tFcRe23WWfyNhhdq3ohdXclWX9tlk29fqdGQLKSxCXCG_YnigUm9hIaVMkqJQlM7IixARZK21JECDYAdVhAX4clXdN6d7P6vvqfFDCvh8UcKLYSiIbG6slqSdSkLCNPQdRY7xGUofV-nFSS7c6h9TvIlzchnl3EdqLsPLzbx8Ax-8GpxiSSIFAgDEy3va4GVAGYNOvN7U2zN171xQuLbcsrqQMOrOckgoAINXYcrbDvQoPI8r2dcM4nNnH5ygKkYAGCdEdiAOE9DRIdYJGk4qzQ0XfSa2_HOtx_S9D73to2kEb1rN_CBIBXg)
2. Entwerfe zu den Methoden pop und top einen Algorithmus im :t[Pseudocode].
3. Bereite dich darauf vor deinen Algorithmus anhand des Objektdiagramms präsentieren zu können.

:::collapsible{title="Formulierungshilfe: Pseudocode" id="jkaskjkfjsafkasjfasdfsa"}

- Setze das Attribut / die Variable ... auf die Referenz ...

:::

## Der Call-Stack

Der Stapel ist eine der wichtigsten Datenstrukturen in der Programmierung. Er bildet die Grundstruktur für die Ausführung von Methoden.

### Aufgaben

1. Informiere dich über den Aufbau und die Funktionsweise des sogenannten Call-Stacks. Nutze dazu diese Seite [Call Stack](https://www.baeldung.com/cs/call-stack).
2. Bereite dich auf eine Präsentation vor.
