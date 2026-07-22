"""Offline-Nachbau der Turtle-API des Hyperbook-`pyide`-Elements.

Dient ausschliesslich dazu, die Referenzbilder fuer den Lernpfad
`book/mittelstufe/python/einfuehrung-mit-turtle` reproduzierbar zu rendern.

Die Semantik folgt bewusst exakt der Implementierung in
`hyperbook/packages/markdown/assets/directive-pyide/src/turtle-ffi.js`:

- Ursprung liegt in der Mitte der Zeichenflaeche, die y-Achse zeigt nach oben.
- `circle(radius, steps=120)` -- der zweite Parameter sind **Schritte**, kein
  Winkel. Es gibt keinen `extent`-Parameter.
- Startrichtung ist 0 Grad (nach rechts), Drehung gegen den Uhrzeigersinn positiv.
- Nicht vorhanden sind u. a. `done`, `tracer`, `update`, `stamp`, `undo`.

Gerendert wird mit 4-fachem Supersampling ueber PIL.
"""

from __future__ import annotations

import math

from PIL import Image, ImageDraw, ImageFont

SS = 4  # Supersampling-Faktor

# Farbnamen, die in den Lernpfad-Beispielen vorkommen. PIL kennt die meisten
# X11-Namen bereits; hier stehen nur Ergaenzungen bzw. Absicherungen.
_EXTRA_COLORS = {
    "darkgreen": (0, 100, 0),
    "brown": (165, 42, 42),
    "magenta": (255, 0, 255),
    "purple": (128, 0, 128),
    "orange": (255, 165, 0),
    "gold": (255, 215, 0),
}


def _to_color(value, colormode=1.0):
    """Wandelt Farbnamen, Hexwerte oder RGB-Tupel in ein RGB-Tupel um."""
    if value is None:
        return None
    if isinstance(value, (tuple, list)):
        parts = tuple(value)
        if colormode == 255:
            return tuple(int(max(0, min(255, round(p)))) for p in parts[:3])
        return tuple(int(max(0, min(255, round(p * 255)))) for p in parts[:3])
    if isinstance(value, str):
        name = value.strip().lower()
        if name in _EXTRA_COLORS:
            return _EXTRA_COLORS[name]
        if name.startswith("#"):
            h = name[1:]
            if len(h) == 3:
                h = "".join(c * 2 for c in h)
            return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))
        from PIL import ImageColor

        return ImageColor.getrgb(name)
    raise ValueError(f"Unbekannte Farbe: {value!r}")


class Turtle:
    """Eine einzelne Turtle. Mehrere Turtles teilen sich eine `Screen`."""

    def __init__(self, screen: "Screen"):
        self.screen = screen
        self.x = 0.0
        self.y = 0.0
        self.angle = 0.0  # Grad, 0 = nach rechts, positiv = gegen Uhrzeigersinn
        self.pen_down = True
        self.pen_color = (0, 0, 0)
        self.fill_color = (0, 0, 0)
        self.pen_width = 1
        self.filling = False
        self.fill_points: list[tuple[float, float]] = []
        self.font_size = 8
        screen.turtles.append(self)

    # -- Bewegung -----------------------------------------------------------
    def forward(self, distance):
        rad = math.radians(self.angle)
        nx = self.x + distance * math.cos(rad)
        ny = self.y + distance * math.sin(rad)
        self._move_to(nx, ny)

    fd = forward

    def backward(self, distance):
        self.forward(-distance)

    bk = back = backward

    def left(self, angle):
        self.angle = (self.angle + angle) % 360

    lt = left

    def right(self, angle):
        self.angle = (self.angle - angle) % 360

    rt = right

    def goto(self, x, y=None):
        if y is None:
            x, y = x
        # Haeufigster Szenenfehler: Die Turtle startet mit abgesenktem Stift in
        # der Mitte, ein `goto` an den Startpunkt zieht dann eine Linie quer
        # durchs Bild. Szenen, die bewusst mit goto zeichnen (z. B. Achsen),
        # setzen `screen.allow_goto_draw = True`.
        if self.pen_down and not self.screen.allow_goto_draw:
            dist = math.hypot(x - self.x, y - self.y)
            if dist > 1:
                raise RuntimeError(
                    f"goto({x:.0f}, {y:.0f}) mit abgesenktem Stift zieht eine "
                    f"{dist:.0f} Pixel lange Linie. Nutze start_at(...) oder "
                    f"setze screen.allow_goto_draw = True."
                )
        self._move_to(x, y)

    setpos = setposition = goto

    def setx(self, x):
        self._move_to(x, self.y)

    def sety(self, y):
        self._move_to(self.x, y)

    def setheading(self, angle):
        self.angle = angle % 360

    seth = setheading

    def home(self):
        self._move_to(0, 0)
        self.angle = 0

    def _move_to(self, nx, ny):
        if self.pen_down:
            self.screen.draw_line(
                (self.x, self.y), (nx, ny), self.pen_color, self.pen_width
            )
        if self.filling:
            self.fill_points.append((nx, ny))
        self.x, self.y = nx, ny

    # -- Stift --------------------------------------------------------------
    def penup(self):
        self.pen_down = False
        self.screen._last_end = None
        self.screen._last_dir = None

    pu = up = penup

    def pendown(self):
        self.pen_down = True

    pd = down = pendown

    def pensize(self, size):
        self.pen_width = size

    width = pensize

    def pencolor(self, *args):
        self.pen_color = self._color(args)

    def fillcolor(self, *args):
        self.fill_color = self._color(args)

    def color(self, *args):
        if len(args) == 2 and all(isinstance(a, str) for a in args):
            self.pen_color = _to_color(args[0], self.screen.colormode_value)
            self.fill_color = _to_color(args[1], self.screen.colormode_value)
        else:
            c = self._color(args)
            self.pen_color = c
            self.fill_color = c

    def _color(self, args):
        if len(args) == 1:
            return _to_color(args[0], self.screen.colormode_value)
        return _to_color(tuple(args), self.screen.colormode_value)

    def dot(self, size=5, color=None):
        c = _to_color(color, self.screen.colormode_value) if color else self.pen_color
        self.screen.draw_dot((self.x, self.y), size, c)

    def begin_fill(self):
        self.filling = True
        self.fill_points = [(self.x, self.y)]

    def end_fill(self):
        if self.filling and len(self.fill_points) > 2:
            self.screen.draw_polygon(self.fill_points, self.fill_color)
        self.filling = False
        self.fill_points = []

    def circle(self, radius, steps=120):
        """Achtung: `steps` sind Schritte, kein Winkel -- wie im pyide-Turtle."""
        steps = max(8, int(steps))
        circumference = 2 * math.pi * abs(radius)
        step_length = circumference / steps
        step_turn = (360 / steps) * (1 if radius >= 0 else -1)
        for _ in range(steps):
            self.forward(step_length)
            self.left(step_turn)

    def setfontsize(self, size):
        self.font_size = size

    def write(self, text, move=False, align="left", font=None):
        size = self.font_size
        family = None
        if font:
            seq = list(font)
            if len(seq) > 0:
                family = seq[0]
            if len(seq) > 1:
                size = seq[1]
        self.screen.draw_text(
            (self.x, self.y), str(text), size, align, self.pen_color, family
        )

    # -- Abfragen -----------------------------------------------------------
    def xcor(self):
        return self.x

    def ycor(self):
        return self.y

    def position(self):
        return (self.x, self.y)

    pos = position

    def heading(self):
        return self.angle

    def towards(self, x, y=None):
        if y is None:
            x, y = x
        return math.degrees(math.atan2(y - self.y, x - self.x)) % 360

    # -- No-ops (fuer die Standbild-Ausgabe ohne Bedeutung) -----------------
    def speed(self, value=0):
        return 0

    def shape(self, name=None):
        return "classic"

    def hideturtle(self):
        pass

    ht = hideturtle

    def showturtle(self):
        pass

    st = showturtle

    def isvisible(self):
        return False


class Screen:
    """Zeichenflaeche. Rendert alles direkt in ein hochaufgeloestes PIL-Bild."""

    def __init__(self, width=640, height=480, bg="white"):
        self.w = width
        self.h = height
        self.colormode_value = 1.0
        self.turtles: list[Turtle] = []
        self.bg = _to_color(bg)
        self.img = Image.new("RGB", (width * SS, height * SS), self.bg)
        self.drw = ImageDraw.Draw(self.img)
        self._last_end: tuple[float, float] | None = None
        self._last_dir: tuple[float, float] | None = None
        # Schutz gegen versehentliche Linien beim Positionieren, siehe Turtle.goto
        self.allow_goto_draw = False

    # -- Koordinaten --------------------------------------------------------
    def _cx(self, x):
        return (self.w / 2 + x) * SS

    def _cy(self, y):
        return (self.h / 2 - y) * SS

    def _pt(self, p):
        return (self._cx(p[0]), self._cy(p[1]))

    # -- Primitive ----------------------------------------------------------
    def draw_line(self, a, b, color, width):
        # Canvas zeichnet mit lineCap "butt": freie Enden bleiben gerade
        # abgeschnitten. Nur an *inneren* Ecken eines zusammenhaengenden Zuges
        # wird die Fuge gefuellt -- und auch dort nicht bei einer 180-Grad-
        # Umkehr (etwa Saeule hoch und wieder runter): dort erzeugt der Browser
        # eine flache Kante, kein rundes Ende.
        w = max(1, int(round(width * SS)))
        dx, dy = b[0] - a[0], b[1] - a[1]
        if w > 2 and self._last_end is not None and self._last_dir is not None:
            lx, ly = self._last_end
            if abs(lx - a[0]) < 1e-6 and abs(ly - a[1]) < 1e-6:
                pdx, pdy = self._last_dir
                # Skalarprodukt der normierten Richtungen: -1 bedeutet Umkehr.
                n1 = math.hypot(pdx, pdy) or 1.0
                n2 = math.hypot(dx, dy) or 1.0
                cos = (pdx * dx + pdy * dy) / (n1 * n2)
                if cos > -0.999:
                    r = w / 2
                    cx, cy = self._pt(a)
                    self.drw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color)
        self.drw.line([self._pt(a), self._pt(b)], fill=color, width=w)
        self._last_end = (b[0], b[1])
        self._last_dir = (dx, dy) if (dx or dy) else self._last_dir

    def draw_dot(self, center, size, color):
        r = size * SS / 2
        cx, cy = self._pt(center)
        self.drw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=color)

    def draw_polygon(self, points, color):
        self.drw.polygon([self._pt(p) for p in points], fill=color)

    def draw_text(self, pos, text, size, align, color, family=None):
        font = _load_font(int(size * SS))
        cx, cy = self._pt(pos)
        anchor = {"left": "ls", "center": "ms", "right": "rs"}.get(align, "ls")
        self.drw.text((cx, cy), text, fill=color, font=font, anchor=anchor)

    # -- Ausgabe ------------------------------------------------------------
    def bgcolor(self, value):
        new_bg = _to_color(value, self.colormode_value)
        # Hintergrund nachtraeglich zu setzen ist im pyide-Turtle ebenfalls
        # moeglich; hier faerben wir alle bisher weissen Pixel um.
        base = Image.new("RGB", self.img.size, new_bg)
        base.paste(self.img, (0, 0), _mask_non_bg(self.img, self.bg))
        self.img = base
        self.drw = ImageDraw.Draw(self.img)
        self.bg = new_bg

    def colormode(self, mode=1.0):
        self.colormode_value = 255 if int(mode) == 255 else 1.0

    def save(self, path, crop=True, padding=12):
        img = self.img
        if crop:
            img = _autocrop(img, self.bg, padding * SS)
        out = img.resize(
            (max(1, img.width // SS), max(1, img.height // SS)), Image.LANCZOS
        )
        out.save(path)
        return out.size


def _mask_non_bg(img, bg):
    mask = Image.new("L", img.size, 0)
    px = img.load()
    mpx = mask.load()
    for yy in range(img.height):
        for xx in range(img.width):
            if px[xx, yy] != bg:
                mpx[xx, yy] = 255
    return mask


def _autocrop(img, bg, padding):
    bg_img = Image.new("RGB", img.size, bg)
    from PIL import ImageChops

    diff = ImageChops.difference(img, bg_img).convert("L")
    box = diff.getbbox()
    if not box:
        return img
    left = max(0, box[0] - padding)
    top = max(0, box[1] - padding)
    right = min(img.width, box[2] + padding)
    bottom = min(img.height, box[3] + padding)
    return img.crop((left, top, right, bottom))


_FONT_CACHE: dict[int, ImageFont.FreeTypeFont] = {}
_FONT_PATHS = [
    "/usr/share/fonts/TTF/DejaVuSans.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    "/usr/share/fonts/noto/NotoSans-Regular.ttf",
]


def _load_font(size):
    if size in _FONT_CACHE:
        return _FONT_CACHE[size]
    for path in _FONT_PATHS:
        try:
            font = ImageFont.truetype(path, size)
            _FONT_CACHE[size] = font
            return font
        except OSError:
            continue
    font = ImageFont.load_default()
    _FONT_CACHE[size] = font
    return font


def new_scene(width=640, height=480, bg="white"):
    """Erzeugt `(screen, turtle)` -- das uebliche Setup fuer eine Zeichnung."""
    screen = Screen(width, height, bg)
    return screen, Turtle(screen)
