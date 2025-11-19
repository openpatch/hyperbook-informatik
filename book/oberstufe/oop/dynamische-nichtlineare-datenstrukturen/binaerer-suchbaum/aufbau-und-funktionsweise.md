---
name: Aufbau und Funktionsweise
index: 0
lang: de
hide: false
---

# Aufbau und Funktionsweise

![](/images/bst-crc-karten.png)

Die Kontakte sind anhand der Benutzernamen im binären Suchbaum einsortiert.

`A B C D E F G H I J K L M N O P Q R S T U V W X Y Z`

In den linken Teilbaum werden jeweils kleinere Kontakte eingefügt. In den rechten Teilbaum die größeren Kontakte.

Beispiel: Wenn der Inhalt ein Kontakt mit dem Benutzernamen `fred` ist, dann würde ein Kontakt mit dem Benutzernamen `alf` in den linken Teilbaum eingefügt.

## Kontakte suchen

Die Methode `Contact search(Contact pContent)` soll überprüfen, ob ein Kontakt mit einem bestimmten Benutzernamen im binären Suchbaum enthalten ist. Falls dies der Fall ist, dann liefert search das Kontakt-Objekt zurück, ansonsten wird null zurückgegeben.

1. Sucht, ob der Kontakt pContent im binären Suchbaum enthalten ist. Geht dabei schrittweise wie im Objektspiel vor. Nutzt dazu das [Objektdiagramm](https://jmp.openpatch.org/#pako:eNrll0tv4zYQx7-Lzw3Bx_AxPRX7QE_dXSBBT75QFBVrI0uqLGfrLvLdO5Jox4mctmu3QYE9GJJJcUj-5j8z5OLrcrHpfR-Xix_pdR3XTbeb3pu2L5t6M_1ZlXm8pl_mO2oofLWJP0ytb31V_RL7VZM_63gXQ-W7-HPVZL761Xelz6phmr7bDp-ELtK0H-KXj_X7_Da-65o2dT5Q730Zv7RN10-z_04PTq279Pyjadb0KoYv1-PcwyrSUvn0qP16mG25eHN9wzbRd2G1XND3VRMel5OG9KsyveW-9ze7dhr5MfscQz-OuvfVdmr8CWOIkAsTuMlyDGG5GJbRvm3qPtb9PzYjc8i5RS1EQJ0XlswMdso6j_vtts2mHHzwCOFKWsOkQQlCWSOkTlAEMq2EVhyFQKmEsA-jtfvjfQ4Nd5XfbPbbflPWvttdj2xuupg04Pu-K7Ntv_8qHDa2XAyb9GkvVSymxrkZ6u3K29VL3ePSDqZOzbndxO7gwGvqq29Hq-2qqeOH7TqL3ayra4qyip_K8Mn3qye9E4tmdEOa4IQXh-YRz8ubehnNc58fgzpyutOZVSELGecyam8n7SSSz22cXMKRMaWsNIVxeSiCc0FOxvbgv9VaKHJZRFG4jDspCpHcNNcgcqYAhdMSUDsQsNeg1QwcNTnkzgJoGA2cMPwapAFBxMKhF5GiTMSLSAcehSsypW3Mo3JwGemojRQCImQ4xDB_kTRwxZQWBsaQBu4Sac01swq5Vk5qMDJxni3yNTgXEIJUuigsZiHkeD7neltVZ2MdB5-m6Kxkjmvp0HDp9D5lSi2ZQm2cozTqBMeEcR5Vr4HRRBOBXGfROAOXyPW_wqhQkujAorTaWYr7xPFKIjABpFWntBZKmonjPNU95XgM4i_S_9djTHfdru0bxcdBT3Z1SPWzIvHEADkcyN1_M_55JXliIvietanmnDbxAj8gfqCMBMPFgGmfNo1hVlvkwhqLztoJ31wQl-Pzv209iPPhDeGDUlyEryIo7HP77fwoUzIpDViHqNBo-6g_CmRihHYIXWWS_rwufFHkIRRoZJGLfwNg5SmsuxrPFyBXCFwquAihX7dnSZBqjWKcqrMaqseALDE0EhmC08BJjVzalArnNfRyhGvf9aWvtT4fIeGj-MGLGDa0jrMYGk3HH9Ig0TJAZx11qMnAnOIUxdKBpmP9hHBe61-jmsy1_78rysYyZ5TjTtAS7T6YiSADpDOkQDd4OSXD-SHjciH2q0ip_HwVInKQ6hIN3u2qeGYcU81QTmiN3HDKiPtaIsExTfnR0AVQam30hG9-1fzuU-EVMEu3FEGnFuJFIPdn6ysSHTPcgKJDDgpiRvUkXaZjt5mM8IfFnznGjIs).
2. Löst das [Code-Puzzle](https://parsons.problemsolving.io/puzzle/23b2335255e94e47881ee07e22cb059a) zur Methode `search`.

:::collapsible{id="sfjkjkdfa" title="Teilösung des Code-Puzzles"}

![](/images/bst-search-code-puzzle.png)

:::


## Kontakte einfügen

Die Methode `void insert(Contact pContent)` soll einen neuen Kontakt (pContent) in den binären Suchbaum einfügen. Das Vergleichskriterium soll hierbei der Benutzername (username) sein.

1. Fügt den pContent in den binären Suchbaum ein. Geht dabei schrittweise wie im Objektspiel vor. Benutzt dazu das [Objektdiagramm](https://jmp.openpatch.org/#pako:eNrNl0tz2zYQx7-Lzg0HCywe21MnSaenJplxpidfQBC0GFMkS1F21Yy-e5ciJT8opw3ZenrwkAKIxeKH_z68-nq92na-i9erH_l1Ezd1ux_e66Yr6mo7_FgXWbziv9S3PJD7cht_GEbf-bL8NXbrOns28T6G0rfxl7JOffmbbwuflv02XbvrPwlt5G0_xPuP1c_ZTXzf1s04eeDZuyLeN3XbDbv_wQ_Bo_vx-Wddb_gV-i83x717L0ZXxfCo_Kbf7Xr19upzUlTb2Bvj78s6PLgzLmne1VUXq3G3zHf-874ZVn9Mv8QwrLzz5W4Y_AkdmdyAECbLrRfuetW70q2L7T82QTFEzMAEYdKMQmATvY2iyuLpuE29Lfo7eIDwRlqTSEMSQVkDUo9QgBKtQCtBACQVgD0crd09Pmc_cFv67fZ07LdF5dv9VfRtWH9u46gB33Vtke6601fhzOZ61XPy41nKmA-DUzM82xY365emj66dTV3ac8fXdb7AK56rbo5Wm3VdxQ-7TRrbyVRb50UZPxXhk-_WT2YHFvXxGsYNLtxgP3zEMznpN7z7-vhO72u-vBbguOiJBM6eTM7wxABIqfBvVj8_5hMDG0i-NDffsHC4LCuwiSMgJAvKaQIjR2G9Aa0T1_vlrHMoBeLRxgX5PuV3URQvS-t5zDzG_yhonE6tCmlIhZBRezswGZX43MZFFx4ZU8pK1oDLQh6cC3IwdhLu91oLeSbzCLlLhZOQw4uwSSQKCZyWSNoh4CmGrU5Yldo5Es4i6pH01PBrkEZCiLkjD1FYgriIdBARXJ4qbWMWlcNlpKM2EgAjptTnQPEiaRQqURoMHlMiCjeS1kInVpHQykmNRo6cJ06-BuccQ5BK57mlNISM5nOudmU5G-tx8WWKzolEKkPMT2tEd0oNUlPipFWKlHWMmgaM06h6DYwmmoh8dZaMM7hErv8VRkWSRYeWpNWcSxFOGVYSJoAM0CmtQUkzcJymuuUF6rbdN12txOwCpUgjdx1LSlTwXdJU31-jFDI_VEaiEdBjOqVNYxKrLQmwxpKzdsA3FcRyfP73ncf51V0JybVVwiJ8JUOZVeM5UyZSGrSOSJHR9kF_MlHMiGwfusqM-vM693mehZCTkXkG_wbA0nNYtxXNFyCnGRQLm6TSb5pZEgRwKrHGcRYExXGgTqmQRZYg12_pJHfmIMaKMq2hyxFufNsVvtJ6PkLGx_FDixjW7McshkZz-8MaRKcNcq-jzjUZE6cER7F0qEnDgHBa61-jmky1_78ryoY7dqOccMAu2lMwM8EEiXtIINff8pgMp03GciF268ipfL4KiQRKtUSDt_syzoxjo7h1QWvBWjRc084tjU00hypKY7Ux7nAY_42O7XawIA6rvwB7OIoj).
2. Entwerft zur Methode insert der Klasse BinarySearchTree einen Algorithmus im :t[Pseudocode].
3. Überprüft euren Algorithmus anhand des Objektdiagramms.
4. Bereitet euch darauf vor den Algorithmus anhand des Objektdiagramms zu präsentieren.

:::collapsible{id="sakjkjdsavjsavkjs" title="Hilfe"}

Orientiert euch an der Lösung zum Methode `search`:

![](/images/bst-search-code-puzzle-loesung.png)

:::
