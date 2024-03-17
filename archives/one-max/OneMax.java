 

import org.openpatch.scratch.*;
import org.openpatch.scratch.extensions.text.*;

public class OneMax extends Stage {

  private Text bestPhrase;
  private Text allPhrases;
  private Text statistics;

  private String target;
  private int populationsize;
  private float mutationrate;
  private char[] geneSet;

  private Population population;

  public OneMax() {
    super(1000, 600);

    this.target = "1".repeat(10000);
    this.populationsize = 50;
    this.mutationrate = 0.02f;
    this.geneSet = "01".toCharArray();

    this.bestPhrase = new Text();
    this.bestPhrase.addFont("comic", "assets/Singkong.ttf");
    this.bestPhrase.setPosition(-490, 250);
    this.bestPhrase.setAlign(TextAlign.LEFT);
    this.bestPhrase.setTextSize(20);
    this.bestPhrase.switchFont("comic");
    this.bestPhrase.setTextColor(200, 50, 50);
    this.add(this.bestPhrase);

    this.allPhrases = new Text();
    this.allPhrases.setPosition(0, 250);
    this.allPhrases.setAlign(TextAlign.LEFT);
    this.add(this.allPhrases);

    this.statistics = new Text();
    this.statistics.setPosition(-490, 100);
    this.statistics.setAlign(TextAlign.LEFT);
    this.add(this.statistics);

    this.population = new Population(this.target, this.mutationrate, this.populationsize, this.geneSet);
  }

  public void run() {
    // run may execute before the execution of the constructor of Shakespear
    // is finished. Therefore, we need to test if population is set.
    // This does only relevant for single Stage mode.
    if (this.population != null && !this.population.isFinished()) {
      this.population.naturalselection();
      this.population.newGeneration();
      this.population.calculateFit();
      this.population.evaluate();

      String statisticText = "";
      statisticText += "Generations: " + this.population.getGeneration() + "\n";
      statisticText += "Average Fit: " + this.population.getAverageFit() + "\n";
      statisticText += "Best Fit: " + this.population.getBest().getFit() + "\n";
      statisticText += "Populationsize: " + this.populationsize + "\n";
      statisticText += "Mutationrate: " + Math.round(this.mutationrate * 100) + "%\n";

      this.statistics.showText(statisticText);
      this.bestPhrase.showText("Best Guess:\n" + this.population.getBest().getPhrase());
      this.allPhrases.showText("All Guesses:\n" + this.population.getAllPhrases(25));
    }
  }

  public static void main(String[] args) {
    new OneMax();
  }
}
