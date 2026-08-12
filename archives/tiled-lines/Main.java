import org.openpatch.scratch.*;

/// Startet das Programm.
///
/// So geht es von der Kommandozeile aus:
/// java -classpath "+libs/scratch-5.3.0-all.jar" Main.java
void main() {
    Window fenster = new Window(800, 800);
    fenster.setStage(new TiledLines());
}
