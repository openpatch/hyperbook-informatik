import org.openpatch.scratch.*;

/// Startet das Spiel.
void main() {
   // Pixelgrafik bleibt beim Vergrößern scharf.
   Window.useTextureSampling(TextureSampling.POINT);
   Window fenster = new Window(768, 432);
   fenster.setStage(new Welt());
}
