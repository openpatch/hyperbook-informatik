import org.openpatch.scratch.*;

/// Startet die Simulation.
void main() {
    Window fenster = new Window(1000, 600);
    fenster.setStage(new OneMax());
}
