---
name: Vergleichen
index: 4
lang: de
---

# Vergleichen

Am Beispiel des Smart Rocket Projekts werden wir verschiedene Selektionsalgorithmen kennenlernen und miteinander vergleichen.

Das Projekt wurde bisher mit der Fitnessproportionalen Selektion implementiert (siehe Methode natuerlicheSelektionFitness in der Klasse Population).

Im Folgenden sollen auch andere mögliche Selektionsalgorithmen erprobt werden.

Zum Vergleich gehen wir zunächst von der nachfolgenden Situation aus.

![Raketen mit Fitnesswerten](/images/evolutionaere-algorithmen/smart-rocket-selektion.png)


## Fitnessproportionale Selektion

Die Fitnessproportionale Selektion funktioniert so wie du sie bereits kennengelernt hast. Im Struktogramm ist eine programmiersprachenunabhängige Darstellung des Algorithmus.

::struktog{data="https://struktog.openpatch.org/#pako:eNqVks1qGzEUhV9FaNWCL-hnNJK8a6ChhVJM6Qvo58qjRJ4xMzJuHfI2fYzu8mIVjWnSRUKs5eHq6J5P547upoiFru9ojnRNmUYjXOSgRM9AqT6CZkGC584zZRNd0fpzj23y87jgXL-2201LUynT8WPBHY71ycz32nCP4KRhoBVn0FupoVcekxf2yewTuvhlmvZnu4o_mgu9fvg9kxuMSL65W6xIIs5kM-0PxdU8jS--q7XgxvIAxmgHknENnnkB3PU8CKvfFmI8lHK_omHIJf6z7ryMRhoOgXEDMigLIloBqD0a3l_Gp0NtkzESpGYKRMIEzEoFIfQpMfuMz3e33P7P5gqXmne7xiQj-TCe3FD-4jkdtnjMuOCII9mUh1_1hOSd1eQ61xGXhbQFlv2cw1BJU88T4_sXlxQiCSs9A2O70BqhOuBdi-1QeO95uChxQuV84gjY0IE1snXMY_sjxCBk8q8lbm3YPsY9t2GZyJQqaWnfBCHijmzc3CjM-2kqZMjj6fBKdzH0Klpg0glgSTGQklkwUSlp4yUdejwrOmDeDk3krFvRY451oGur-P0fVModPw"}


### Aufgabe 1

Führe den Algorithmus der fitnessproportionalen Selektion per Hand aus und erzeuge einen neuen Partnerpool.

### Aufgabe 2

Häufig werden die Anzahl der zugewiesenen Plätze anders bestimmt. Nämlich mit der folgenden Formel:

$$
Anzahl\ Plätze = \frac{Fitnesswert\ der\ Rakete}{Maximaler Fitnesswert\ in\ der\ Population} * 100
$$

Beschreibe wie sich die Formel auf die zugewiesenen Plätze auswirkt. Vergleiche dazu die zugewiesenen Plätze der einzelnen Raketen für beide Verfahren.

## Turnierselektion

Die Turnierselektion funktioniert wie im Struktogramm dargestellt.

::struktog{data="https://struktog.openpatch.org/#pako:eNqVlN1q3DAQhV_F-KqFHdCMrL9c9KKlpYUSylLotX5GWROvHXa9pG3I2-RN8mKdQtJtAtvGvhBYls54vnOkm3Y7FR7as5u2L-1Zqxx7igXBkFVgjC3gVNaQMCZlQm1X7fzjimXlp3HPu_lcdstcnYZhun4_8JbH-SiWrPOYGKL2CpxBBTZoB9YkronCUewjx_J5mq4e5Gb-Lirtt54L7zbTwA2qZhuHk5WcI_QBM3jvImiFDpJKBBgtZgruZb89HobhdtXmTT-UP9Jd0sVrj5AVetDZBKASCNgl9miXERG6XitfgVQIYLV34DFmcMypE1RHsa9xf_mMxv3dRkhwP3Kzjpc8c_Nqja-bn4d6fzcM_UUTD_uTlaPNKjAXYO00kGMHDr0FskUZdrSoDUOCBE0S3DJkTR3U7DWEwtFQsIvboJe2wWS1KdqAsylCLpqhUEeQO6NjSGmZGxq1ItOBtkJCOwk75kwQYuBc-K98vt3FMW-eNrLG5kM_j7zfN2-aNT2-nKxWtWSenJwqJg3OcQaVOpQAGDRy7hZldN4d-N2TnKKuxJJIsEzisu0yVJmDLlm02S8jo4Iv3lUG6hyDC0SgxFywtjhUFf9l8Hm_3TYCpx-bwmPzJe6Ey-5qmgZxtp7Gk4wy3geI3mUQMBUq_Q5oqbmjjAvw3AqgGof9M0LGlZRC6CD4JOImI9RQPHAx1qaXVngQI4PM1hNolKGSq5CisRBIrhxB_n9CtJRQyt5KWKw4nCsYX6WJZAxoo0qsJS4i9Pis2g33Fxv5QKpbtdd9mTftWTB4-wtFet_T"}

### Aufgabe 1

Führe den Algorithmus der Turnierselektion per Hand aus und erzeuge einen neuen Partnerpool.

### Aufgabe 2

Führe den Algorithmus mehrmals aus (mindestens 5 mal) und vergleiche die entstandenen Partnerpools.

## Bestenselektion

Die Bestenselektion funktioniert wie im Struktogramm dargestellt.

::struktog{data="https://struktog.openpatch.org/#pako:eNqVkM1KAzEQx18l5NyBbLL52N4VvEhRoed8zLpL06TsplQpfRsfw1tfzBRFTxWd0zDM_Pj_5ki3OWCkyyMdA11SptFwGxqQXDGQUgXQzAtwjXVMdj1d0PK6w7p5l2acyn29rrM-x5gPNxG3mMo3TFpuuZISLBMBmpY7ELrC0HjPsFM_sCc7b75QBV8qgT7mqYw4IQkjklXe7aMtY07EpsGmQALO5HYsCecZ1jUHzldToFLWoeYgg--Adb0GvHhxZkTLO_0vJSMEtt5o8FwoCJ0SELx2YAMzzkjzm9L6_DbETyGHc8FEFHmwG7x0_fl9qlKJrOxUraZdzvFqiJYzJoVTNQTvwfGA4OpjAb1pWtaIvxmlfYynSy3ogOPzUEeaLehhDGWgy042pw91han-"}

### Aufgabe 1

Führe den Algorithmus der Bestenselektion per Hand aus und erzeuge einen neuen Partnerpool.

### Aufgabe 2

Beschreibe, ob es besser wäre weniger oder mehr als die besten fünf Raketen auszuwählen.

## Turnierselektion implementieren

Jetzt sollst du den Turnier-Algorithmus im Projekt Smart Rocket implementieren.

Implementiere auch die Methode natuerlicheSelektionTurnier in der Klasse Population.

Um die neue Selektionsmethode zu verwenden, musst du auch in der Klasse Level in Zeile 47 den Methodenaufruf ändern.

::archive[SmartRocket Selektionsprojekt]{name="smart-rocket-selektion"}

## 🚀 Bestenselektion implementieren

Die Population ist in einem Array gespeichert. Dabei müssen die Raketen nicht sortiert sein. Wenn wir jedoch die Bestenselektion verwenden möchten, dann muss die Population bzgl. der Fitnesswerte sortiert werden.

Überlege die ein Verfahren wie man ein Array sortieren kann. Nutze zum Ausprobieren die zehn Fitnesswerte der Raketen.

Denke daran, dass ein Computer keine "Draufsicht" hat, sondern wir müssen ihm konkrete Anweisungen geben.