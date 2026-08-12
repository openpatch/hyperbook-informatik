---
name: Probe
index: 999
hide: true
---

# Probe

## A: import java.time

:::onlineide{height="300px"}

```java Main.java
import java.time.LocalDateTime;

void main() {
    LocalDateTime t = LocalDateTime.of(2026, 3, 17, 8, 0, 0);
    IO.println(t);
}
```

:::

## B: import org.openpatch.scratch

:::onlineide{libraries="scratch" height="300px"}

```java Buehne.java
import org.openpatch.scratch.*;
import org.openpatch.scratch.extensions.animation.*;

public class Buehne extends Stage {
    public Buehne() {
        super(400, 300);
    }
}
```

:::
