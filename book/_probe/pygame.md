---
name: Probe Pygame
index: 995
hide: true
---

# Probe: Was kann pygame im pyide?

Geprüft werden soll, ob ein Pygame-Spiel als Challenge-Format taugt:

1. Läuft eine Top-Level-Spielschleife ohne `asyncio`?
2. Kommt **Tastatureingabe** an – und muss der Canvas dafür angeklickt werden?
3. Funktioniert `pygame.font` (Punktestand anzeigen)?
4. Wie flüssig läuft es? (FPS-Anzeige)
5. Funktionieren `pygame.draw` und Kollisionsprüfung über `Rect.colliderect`?

:::pyide{canvas height="700px"}

```python
import pygame

pygame.init()
screen = pygame.display.set_mode((480, 360))
clock = pygame.time.Clock()
schrift = pygame.font.SysFont(None, 24)

spieler = pygame.Rect(220, 300, 40, 20)
ball_x = 240.0
ball_y = 60.0
ball_dx = 3.0
ball_dy = 2.5
punkte = 0
tasten_gesehen = "keine"

laeuft = True
while laeuft:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            laeuft = False
        if event.type == pygame.KEYDOWN:
            tasten_gesehen = "KEYDOWN " + str(event.key)

    tasten = pygame.key.get_pressed()
    if tasten[pygame.K_LEFT]:
        spieler.x = spieler.x - 6
    if tasten[pygame.K_RIGHT]:
        spieler.x = spieler.x + 6

    ball_x = ball_x + ball_dx
    ball_y = ball_y + ball_dy
    if ball_x < 10 or ball_x > 470:
        ball_dx = -ball_dx
    if ball_y < 10:
        ball_dy = -ball_dy

    ball = pygame.Rect(int(ball_x) - 10, int(ball_y) - 10, 20, 20)
    if ball.colliderect(spieler) and ball_dy > 0:
        ball_dy = -ball_dy
        punkte = punkte + 1

    if ball_y > 360:
        ball_y = 60.0
        punkte = 0

    screen.fill((20, 24, 40))
    pygame.draw.rect(screen, (210, 80, 90), spieler)
    pygame.draw.circle(screen, (250, 220, 120), (int(ball_x), int(ball_y)), 10)

    screen.blit(schrift.render("Punkte: " + str(punkte), True, (240, 240, 240)), (10, 10))
    screen.blit(schrift.render("FPS: " + str(int(clock.get_fps())), True, (240, 240, 240)), (10, 34))
    screen.blit(schrift.render("Taste: " + tasten_gesehen, True, (240, 240, 240)), (10, 58))

    pygame.display.flip()
    clock.tick(60)
```

:::

## Geometrie-Test

Wie groß ist die sichtbare Fläche wirklich? Der gelbe Rahmen liegt auf dem Rand
der 480x360-Flaeche, der rote Punkt in ihrer unteren rechten Ecke.

:::pyide{canvas height="700px"}

```python
import pygame

pygame.init()
screen = pygame.display.set_mode((480, 360))
print("surface:", screen.get_size())
print("window:", pygame.display.get_window_size())

clock = pygame.time.Clock()
schrift = pygame.font.SysFont(None, 20)

laeuft = True
while laeuft:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            laeuft = False

    screen.fill((20, 24, 40))
    pygame.draw.rect(screen, (250, 220, 120), pygame.Rect(0, 0, 480, 360), 4)
    pygame.draw.circle(screen, (210, 80, 90), (468, 348), 10)
    screen.blit(schrift.render("oben links", True, (255, 255, 255)), (8, 8))
    screen.blit(schrift.render("Mitte 240/180", True, (255, 255, 255)), (180, 176))

    pygame.display.flip()
    clock.tick(30)
```

:::

## Ergebnis

Beantwortet am 12.09.2026 mit hyperbook 0.107.1, pygame-ce 2.5.6.dev2
(SDL 2.32.0, Python 3.13.2).

1. **Spielschleife: ja.** Die Top-Level-`while`-Schleife laeuft ohne `asyncio`,
   genau wie dokumentiert.
2. **Tastatur: ja, ohne vorheriges Klicken.** `KEYDOWN`-Ereignisse kommen an
   (`K_LEFT` = 1073741904), und `pygame.key.get_pressed()` bewegt den Spieler
   fluessig. Der Canvas braucht keinen Fokus, die Pfeiltasten scrollen die Seite
   dabei nicht.
3. **`pygame.font`: ja.** `SysFont(None, 24)` und `blit(render(...))` zeigen
   Punktestand und FPS an.
4. **Tempo: ja.** Stabile 62 FPS bei `clock.tick(60)`. Der erste Start dauert
   rund 15 Sekunden, weil pygame-ce nachgeladen wird.
5. **`pygame.draw` und `Rect.colliderect`: ja.** Ball prallt vom Schlaeger ab,
   der Punktestand zaehlt hoch.

### Anfangs: die Zeichenflaeche blieb 300 x 150

`pygame.display.set_mode((480, 360))` meldete zwar `surface: (480, 360)` und
`window: (480, 360)`, das Canvas-Element im DOM behielt aber die HTML-Standard-
groesse 300 x 150. Alles rechts von x = 300 und unterhalb von y = 150 wurde
abgeschnitten -- im Geometrie-Test fehlten der rechte und der untere Rand des
gelben Rahmens samt Eckpunkt. Der Fehler war still: pygame meldete die
angeforderte Groesse, unabhaengig davon, was tatsaechlich zu sehen war.

**Behoben am 12.09.2026 in hyperbook** (`packages/markdown/assets/directive-pyide`):
`set_mode` reicht die Flaechengroesse jetzt an das Canvas-Element weiter, so wie
es `screensize` fuer die Turtle schon immer getan hat. Der Backing-Store
entspricht der Flaeche Pixel fuer Pixel und wird bewusst **nicht** mit der
Device-Pixel-Ratio skaliert -- SDL schreibt rohe Pixel hinein, eine Skalierung
wuerde das Bild in eine Ecke schieben.

Gegenprobe nach dem Fix: Canvas-Element 480 x 360, und die Stichproben im
Bitmap stimmen -- linker, rechter und unterer Rahmen liegen auf `250,220,120`,
der Eckpunkt bei (468 | 348) auf `210,80,90`. Turtle-Seiten sind unberuehrt,
`screensize(450, 450)` liefert weiterhin einen 450 x 450 grossen Canvas.
