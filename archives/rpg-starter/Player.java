import org.openpatch.scratch.*;

public class Player extends Sprite {

    public Player() {
        this.addCostume("idle0", "assets/Characters/GreenNinja/SpriteSheet.png", 32, 0, 32, 32);
        this.addCostume("idle90", "assets/Characters/GreenNinja/SpriteSheet.png", 96, 0, 32, 32);
        this.addCostume("idle180", "assets/Characters/GreenNinja/SpriteSheet.png", 0, 0, 32, 32);
        this.addCostume("idle-90", "assets/Characters/GreenNinja/SpriteSheet.png", 64, 0, 32, 32);

        this.addCostume("walk0", "assets/Characters/GreenNinja/SpriteSheet.png", 32, 0, 32, 32);
        this.addCostume("walk0.1", "assets/Characters/GreenNinja/SpriteSheet.png", 32, 32, 32, 32);
        this.addCostume("walk0.2", "assets/Characters/GreenNinja/SpriteSheet.png", 32, 64, 32, 32);
        this.addCostume("walk0.3", "assets/Characters/GreenNinja/SpriteSheet.png", 32, 96, 32, 32);

        this.addCostume("walk90", "assets/Characters/GreenNinja/SpriteSheet.png", 96, 0, 32, 32);
        this.addCostume("walk90.1", "assets/Characters/GreenNinja/SpriteSheet.png", 96, 32, 32, 32);
        this.addCostume("walk90.2", "assets/Characters/GreenNinja/SpriteSheet.png", 96, 64, 32, 32);
        this.addCostume("walk90.3", "assets/Characters/GreenNinja/SpriteSheet.png", 96, 96, 32, 32);

        this.addCostume("walk180", "assets/Characters/GreenNinja/SpriteSheet.png", 0, 0, 32, 32);
        this.addCostume("walk180.1", "assets/Characters/GreenNinja/SpriteSheet.png", 0, 32, 32, 32);
        this.addCostume("walk180.2", "assets/Characters/GreenNinja/SpriteSheet.png", 0, 64, 32, 32);
        this.addCostume("walk180.3", "assets/Characters/GreenNinja/SpriteSheet.png", 0, 96, 32, 32);

        this.addCostume("walk-90", "assets/Characters/GreenNinja/SpriteSheet.png", 64, 0, 32, 32);
        this.addCostume("walk-90.1", "assets/Characters/GreenNinja/SpriteSheet.png", 64, 32, 32, 32);
        this.addCostume("walk-90.2", "assets/Characters/GreenNinja/SpriteSheet.png", 64, 64, 32, 32);
        this.addCostume("walk-90.3", "assets/Characters/GreenNinja/SpriteSheet.png", 64, 96, 32, 32);
    }
}
