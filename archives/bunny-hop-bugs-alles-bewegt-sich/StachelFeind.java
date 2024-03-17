public class StachelFeind extends Feind {
    public StachelFeind() {
        this.addCostume("stehen", "assets/Enemies/spikeMan_stand.png");
    }
    
    public void run() {
        this.changeX(-1);
    }
}