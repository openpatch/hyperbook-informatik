---
name: Eine neue Nachricht
index: 0
lang: de
---

# Eine neue Nachricht

## MessageOverflow

Das Nachrichtenarray (messages) unseres Messengers ist voll. Es kommt aber eine weitere Nachricht an. Die älteste (erste) Nachricht im Array soll gelöscht werden, sodass ein Platz für die neue Nachricht frei wird. Dabei soll die Reihenfolge der Nachrichten erhalten beleiben.

### Aufgaben

- Beschreibe eine Möglichkeit wie das umgesetzt werden könnte.
- Erprobe deine Idee an diesem [Objektdiagramm](https://jmp.openpatch.org/#pako:eNqtVU1vGjEQ_SuIc1jZM_7sKT00baVGPaS30oPNeoPDfqDdJQ2N-O_14l0CgUYhqQSy1_Y8z5t5nhk_TsdNa1o3HX8I08IVVb2O82rZ-qps4sfcp-4m_K2pw0Jm8sZtLqbje-9-L6u6jYcewkDC6rof_1RVEaa0O7nITdO4Hu3aNY257e80bVt7u2qHzVXj6tIU3e50fBP2ytvpOCC07qE9WNtsOuDK3rlZ29tecmREpRmxkkptDI_L28u3th_r2qy3cM-vzV15287jPDWt-bFeRhd82W4N7k2-6lZYd-tP8uvE0e9bXw5OB58sESkasBSYpgpM8LxDoK9HoDibKcyMM4JQwWWPAK9HkI6n2lKnFWfAUfUI-HoEQiUD1MgsnUnuoIt_OLGsGt_p5EkBE8QknJWEMaBKCQ69JLhIGFIlQAnJUCDbApwIz2HKdmK5eFErj_veFn4RDQ6I7YTzpKYDqy8mz6sXzE7zBY0JZwiCU80V4YL3fCccE2SMaC2pQgJC8Mj4OJ3vZ7wwdX4-489u7nwxisPZzFGJhChJCUMOyBTtiUudBNaMSE1BgKY60j7W4PtpZ7VPzfm8rzqz0VXtVqkbffKuXqxmc1e-IQLyMAJD7oHIROtOFooBEKZUjMHxK3p_DFxRvCEE15V_A18SJM01DW9VCABgPV1kNOEKqQg_ShCGp42GiIxlNqVE0fS_CP1utTyf7NfZfGR9OTIhzaN5yPfZzCcSE9ChmGke-CnNhqo20TxhgiInoXxpDFKIfene1N7YfKBzmaVgpeVGoAvWtOe1a3RFDEXzvOweN7TT7gHQRKEQTGqmgOtBiJwloQqHhCHnAoneNuMD4t9808bIXRobnFRoQVrBs0w889GXs6oIQdpP236fO8r2P_oD0YnSQoHUoHiojUMkBSSMImLwVlJQcOzr7uZNH2RXNxGcbMZ_AQWRvGE), indem du die "incomingMessage" in das Array messages entsprechen der Anforderungen (siehe oben) einfügst.

:::alert{info}

Sobald ein Objekt nicht mehr referenziert wird, ist dieses nicht mehr addressierbar und wird vom Gargabecollector eingesammelt.

:::

## Speicherplatz erweitern

Das Array messages soll nun mitwachsen. Das heißt, dass wenn das Array keinen freien Platz mehr zur Verfügung hat, soll ein neues Array mit der doppelten Anzahl an Plätzen erzeugt werden. Die alten Nachrichten sollen jedoch erhalten bleiben.

### Aufgaben

- Erzeuge im [Objektdiagramm](https://jmp.openpatch.org/#pako:eNqtVU1vGjEQ_SuIc1jZM_7sKT00baVGPaS30oPNeoPDfqDdJQ2N-O_14l0CgUYhqQSy1_Y8z5t5nhk_TsdNa1o3HX8I08IVVb2O82rZ-qps4sfcp-4m_K2pw0Jm8sZtLqbje-9-L6u6jYcewkDC6rof_1RVEaa0O7nITdO4Hu3aNY257e80bVt7u2qHzVXj6tIU3e50fBP2ytvpOCC07qE9WNtsOuDK3rlZ29tecmREpRmxkkptDI_L28u3th_r2qy3cM-vzV15287jPDWt-bFeRhd82W4N7k2-6lZYd-tP8uvE0e9bXw5OB58sESkasBSYpgpM8LxDoK9HoDibKcyMM4JQwWWPAK9HkI6n2lKnFWfAUfUI-HoEQiUD1MgsnUnuoIt_OLGsGt_p5EkBE8QknJWEMaBKCQ69JLhIGFIlQAnJUCDbApwIz2HKdmK5eFErj_veFn4RDQ6I7YTzpKYDqy8mz6sXzE7zBY0JZwiCU80V4YL3fCccE2SMaC2pQgJC8Mj4OJ3vZ7wwdX4-489u7nwxisPZzFGJhChJCUMOyBTtiUudBNaMSE1BgKY60j7W4PtpZ7VPzfm8rzqz0VXtVqkbffKuXqxmc1e-IQLyMAJD7oHIROtOFooBEKZUjMHxK3p_DFxRvCEE15V_A18SJM01DW9VCABgPV1kNOEKqQg_ShCGp42GiIxlNqVE0fS_CP1utTyf7NfZfGR9OTIhzaN5yPfZzCcSE9ChmGke-CnNhqo20TxhgiInoXxpDFKIfene1N7YfKBzmaVgpeVGoAvWtOe1a3RFDEXzvOweN7TT7gHQRKEQTGqmgOtBiJwloQqHhCHnAoneNuMD4t9808bIXRobnFRoQVrBs0w889GXs6oIQdpP236fO8r2P_oD0YnSQoHUoHiojUMkBSSMImLwVlJQcOzr7uZNH2RXNxGcbMZ_AQWRvGE) ein neues Array, indem du das "new Array" auf die gepunkte Fläche ziehst. Gib dem Array einen Namen und die entsprechende Größe.
- Manipuliere das Objektdiagramm, sodass die Anforderungen erfüllt sind.
- Beurteile, inwiefern du die Strategie geeignet hälst.
- Ein Teammitglied schläg vor lieber die Formel: $ n \cdot \frac{3}{2} +1 $ (wobei n die vorherige Größe ist) zu verwenden. Er meint, dass das effizienter wäre. Beurteile seine Aussage.

:::collapsible{title="Hilfe: Vergleich der Formeln" id="skjfsanva"}

Schaue dir das Cryptpad an: [Vergleich der Formeln zur Vergrößerung eines Arrays](https://cryptpad.fr/sheet/#/2/sheet/view/G+C+MC0HITmT+hrEIVPMksK2y-PsAgcvPN6LCsnDWiw/)

:::
