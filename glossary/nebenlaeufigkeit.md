---
name: Nebenläufigkeit
lang: de
---

# Nebenläufigkeit

**Nebenläufig** (englisch *concurrent*) heißen Abläufe, die **unabhängig voneinander** stattfinden können – deren Reihenfolge also nicht festgelegt ist. **Nebenläufigkeit** heißt entsprechend *concurrency*.

Davon zu unterscheiden ist **parallel** (englisch *parallel*): Abläufe, die tatsächlich **gleichzeitig** ausgeführt werden. Dafür braucht man mehrere Kerne. Nebenläufigkeit ist die Voraussetzung für Parallelität, aber nicht dasselbe – auf einem Kern wechselt das Betriebssystem zwischen den Abläufen hin und her.

Ein **Thread** (deutsch *Faden* oder *Ausführungsstrang*) ist ein solcher Ablauf innerhalb eines Programms. Mehrere Threads teilen sich denselben Speicher, haben aber je einen eigenen :t[Kellerstapel]{#kellerstapel}. In Java heißt die Klasse dafür auch auf Deutsch `Thread`.

Nebenläufige Programme sind **nicht deterministisch**: Derselbe Eingang kann verschiedene Abläufe erzeugen. Ein Test, der einmal durchläuft, beweist deshalb wenig. Typische Fehler sind die :t[Wettlaufsituation]{#wettlaufsituation} und die :t[Verklemmung]{#verklemmung}.
