public class StachelFeind extends Feind {
    public StachelFeind() {
        this.addCostume("stehen", "spikeMan_stand");
    }
    
    public void run() {
        this.changeX(-1);
    }
}