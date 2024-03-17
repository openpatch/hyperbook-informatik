---
name: 📃 Der Game-Loop
index: 3
lang: de
---

# Der Game-Loop

Fast jedes Computerspiel, das ihr kennt, hat eine Hauptmethode, die die ganze Logik des Spiels enthält. Diese wird entweder durch die Eingabe eines Benutzers oder nach einer bestimmten Zeit aufgerufen. Dieser Zyklus des wiederholten Ausführens der Methode heißt **Game-Loop**.

Einen spannenden und packenden Game Loop zu entwickeln ist das Wichtigste bei der Spieleprogrammierung.

Damit die Entwicklung des Game-Loops funktionieren kann, schauen wir uns zunächst seine Bestandteile an.

## Das ESA-Prinzip

Ähnlich zum EVA-Prinzip (Eingabe-Verarbeitung-Ausgabe) gibt es in der Spieleprogrammierung das ESA-Prinzip (Eingabe-Simulation-Ausgabe) anhand dieses Prinzips kann der Game-Loop strukturiert werden.

::struktog{data="https://struktog.openpatch.org/#pako:eNqVkk1qHDEQha_SaD0Fav1rdjYYEgjZOGSRXUkqTTfpUQ_dapzE-Da5SS4WDUlsshjj0U6F9NV7r-qRHedEE9s_sjGxPbPoMUrrwfZSQfTBAXG0kMlEg16xHavfT9Revi8rLfVj-91qeZ6m-eFuoiOV-gzDlKPTWoDokUN2ToHqcwahlNGG0gvsHWH6MM-nv7hK3xqF3Z9GmroyxqF2gagkqhd7Ka0Vj1FClp7AKa_BeReB82hSDPg24WWbpqcdi8M4pWe00D5bgxq09Qi9lRF0nxXYRs45uasyodCj5ijBpCAgohHQFBJ41RK2Qr7APuH69f88PtOCS6CxbuXQJVq6u7EcMFBpl7W7pbLVH7SsF3vL5J0xSkHipMHY3MasyYPRIiqb03XDlTxHEQwItBmkEh4y9wFkUpY0718zcksLxaH8sbF25dfPOKy1-fiyrRXLuXa2dz8etwnrOJeLKgJx2eeAbaeiB0y2B5O5ApFin3XUV1lSxjYvIZ2jCaC5DeCictBj4JYH9Zqlm209j-Kturl0XovcWsWUIKE0gMYY4M5LTTFesa7_zo4NNB6GVu6l27GHMdWB7Z23T78BAB83iA"}

Wir werden uns im folgenden jede Phase im Detail anschauen.

### Eingabe

In der Eingabephase werden die Eingaben des Benutzers verarbeitet. Klassischerweise werden die Tastatur, Maus oder ein Gamepad in der Spieleentwicklung berücksichtigt.

Zum Beispiel im Spiel Mario wird registriert, ob der Benutzer nach links, rechts, oben oder unten gedrückt hat.

:::alert{info}
Anders als beim EVA-Prinzip muss der Benutzer keine Eingabe getätigt haben.
:::

### Simulation

In der Simulationsphase werden die Eingaben verwendet, um den aktuellen Zustand der :t[Attribute]{#attribut} der :t[Objekte]{#objekt} zu verändern.

Beim Spiel Mario löst das Drücken der linken Pfeiltaste aus, dass Mario sich nach links bewegt. Dazu wird seine Geschwindigkeit und Orientierung verändert. Sollte Mario auf ein Hindernis treffen, wird dieses registriert und seine Geschwindigkeit auf 0 gesetzt.

Der Pseudocode des Algorithmus "nach links bewegen" könnte so aussehen:

::struktog{data="https://struktog.openpatch.org/#pako:eNqVVVtuHDcQvMpgvtUA32zqM4FhB4kTf_gCJLupJTQ7Y8zORnYM3SY38cXcaxtSrGBt7XwSZFV3VXXPx3G_EE_j9cex03g9xlIZky9gDFVIITZI3mSowSakiuPVuH14x3Lzt_nA6_anvJaztkzTcvdi4j3P2wNYKaZYtBYa6gauOEF0iBCqqpq4PoK9zYfbb1AbvxeE8cDbPzz8tXYB7Lwe55shH9sw9fn2cJYwRqtUMgSNLYKS8kGVloGjtbrYcFH1SRUMkT2o5hO06E9SsAaXbKDC6kfV_83rp39n4pWHl3you7s-U7-55b4Nx_1gz3K6plqNPoDOrYKlksDHEMD7Enwt6qIGDKZGtQSIaBkUswXlsoLYsNSQyiPYL2ue6-77Fvb5fd_n6f8N8Lpyr7vtLC9ha5y1g0bCFkLyUFQlQI3VKX9Zhoz1JaG8zpEymKAKaOUMWENJkc2PYK840x_L8u5JjpYpzzc8_C7o_dCXedhLD6_6vPE69x9EKafgKBpwbMV44z0IY4FgsmZKz4zSfJym-6ux7vpED9Dsc0TJP7hTnLQVf4sShxIFUzDFi_SJreQSYwT2oYK3BUX2qgGDYoks_XzGvvg7_8fg05yp84QqZa2EC73xoI0SY3OWsVBUhVJfVL1UapBcAeW1hyBAgCw-a-eQMpqfzJgU3rnw8DqvfRnmXHfDyhLN87YikiftK7DODsilAIajA2U9knwX2Pr1k_vrkX_9zmA0WFuR7DSnrDRkGEwRY9BrjBjbRRK16DwhJyiUZHVS9GDTSayaq0umPtPgJ_6em-7zZRgXuFgHSUVppzZZJqGdMmw0BbxMODnP0-GJahZ1VacfhazbBj5TAaYWIFWrQyD3XNW-XXoz5cq7ZZIlPN4_mLXjfiOr69okezXeddp247WM3P1n-coz0w"}

### Ausgabe

In der Ausgabephase werden alle Objekte gezeichnet.

## Frames

Bestimmt habt ihr schon einmal von Frames gehört oder schon einmal einen Framedrop erlebt. Ein Frame beschreibt eine Ausführung des Game-Loops.
Ziel von Spieleentwicklern ist es, die Zeit zwischen den Frames konstant zu halten, sodass der Benutzer ein ruckelfreies Erlebnis hat. In der Regel werden z. B. 60 oder 120 Frames pro Sekunde angestrebt.

:::alert{info}
Entwickler:innen trennen auf Systemen mit mehreren Kernen den Game-Loop vom Draw Loop.
:::

In der folgenden Abbildung seht ihr vier Frames des Spiels Mario.

![Game Loop Mario visualisiert](/images/bunny-hop/game-loop-mario.png "Visualisierung des Game Loops von Mario")

### Aufgabe
🖊 Ordne die Phasen des Game-Loops Teilen der Abbildung zu.

:::collapsible{title="Lösung" id="frames"}

Die obere Zeile (Player does nothing) ist der Eingabephase zuzuordnen.
Die mittlere Zeile (Mario does nothing) ist der Simulationsphase zuzuordnen.
Die untere Zeile (Bilder) ist der Ausgabephase zuzuordnen.

:::
