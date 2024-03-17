import org.openpatch.scratch.extensions.animation.*;
import org.openpatch.scratch.*;

public class Spieler extends AnimatedSprite {

    boolean ausweichen;
    boolean darfAusweichen;
    boolean verletzt;
    int ausweichenLaenge = 2000; // Millisekunden
    int ausweichenCooldownLaenge = 1000; // Millisekunden

    public Spieler() {
        
        this.addAnimation("schmerzen", "assets/grafiken/bunny1_hurt.png", 1);
        this.addAnimation("gehen", "assets/grafiken/bunny1_walk%d.png", 2);
        this.addAnimation("ausweichen", "assets/grafiken/bunny1_dodge%d.png", 2);
    
        this.addTimer("ausweichen-animation");
        this.addTimer("ausweichen-cooldown");
    }

    public void whenKeyPressed(int keyCode) {
        if (keyCode == KeyCode.VK_D 
            && !ausweichen
            && !verletzt 
            && darfAusweichen
        ) {
            ausweichen = true;
            this.getTimer("ausweichen-animation").reset();
            
        }
    }
    
    public void verletzen() {
        if(!ausweichen) {
            verletzt = true;
        }
    }

    // Wird 60-mal in der Sekunde ausgeführt.
    public void run() {
        // Ausweichen erst nach einer gewissen Zeit erlauben
        if (this.getTimer("ausweichen-cooldown").afterMillis(ausweichenCooldownLaenge)) {
            darfAusweichen = true;
        }
        if (ausweichen) {
            // Die Ausweichanimation für eine gewisse Zeit zeigen
            if (this.getTimer("ausweichen-animation").forMillis(ausweichenLaenge)) {
                this.playAnimation("ausweichen");
            } else {
                // Das Ausweichen ist beendet. Wieder alles zurücksetzen
                ausweichen = false;
                darfAusweichen = false;
                this.getTimer("ausweichen-cooldown").reset();
            }
            
        } else if (verletzt) {
            this.playAnimation("schmerzen");
        } else {
            this.playAnimation("gehen");
        }
        
        this.say("Darf ausweichen mit d: " + darfAusweichen);
    }
}