import org.openpatch.scratch.*;

public class Plattform extends Sprite {
    
    Level level;
    
    HintergrundObjekt deko;
    
    int dekoOffset;
    
    public Plattform(Level pLevel) {
        this.level = pLevel;
        this.addCostume("ganz", "assets/grafiken/ground_grass.png");
    }
    
    // Diese Methode wird aufgerufen, wenn ein Sprite-Objekt einer Stage hinzugefügt wird.
    public void addedToStage(Stage stage) {
        super.addedToStage(stage);
        deko = new HintergrundObjekt();
        // Die Deko soll nicht immer in der Mitte der Plattform sein,
        // daher generieren wir eine Zufallszahl.
        // Da die Deko auch nicht direkt am Rand der Plattform sein soll,
        // lassen wird am Anfang und am Ende einen Puffer von 20 Pixeln.
        dekoOffset = this.pickRandom(-this.getWidth() / 2 + 20, this.getWidth() / 2 - 20);
        stage.add(deko);
    }
   
    
    public void run() {
        this.changeX(-1);
        
        deko.setY(this.getY() - this.getHeight() / 2 - deko.getHeight() / 2);
        deko.setX(this.getX() + dekoOffset);
        
        if (this.getX() + this.getWidth() < 0) {
            level.remove(this);
            level.neuePlattform();
        }
    }
}