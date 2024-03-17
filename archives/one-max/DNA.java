
public class DNA {
    private char[] genes;
    private float fit;
    private char[] geneSet;

    public DNA(int numberOfGenes, char[] pGeneSet) {
        this.geneSet = pGeneSet;
        genes = new char[numberOfGenes];
        for (int i = 0; i < genes.length; i++) {
            genes[i] = this.randomGene();
        }
    }

    public void calculateFit(String target) {
        int score = 0;
        for (int i = 0; i < genes.length; i++) {
            if (genes[i] == target.charAt(i)) {
                score++;
            }
        }
        fit = (float) score / (float) target.length();
    }

    public float getFit() {
        return fit;
    }

    public String getPhrase() {
        if (genes.length > 60) {
            return new String(genes).substring(0, 60) + "...";
        }
        return new String(genes);
    }

    public DNA crossover(DNA mate) {
        DNA kind = new DNA(genes.length, this.geneSet);

        int cutoff = (int) (Math.random() * genes.length);

        for (int i = 0; i < genes.length; i++) {
            if (i > cutoff) {
                kind.genes[i] = this.genes[i];
            } else {
                kind.genes[i] = mate.genes[i];
            }
        }

        return kind;
    }

    public void mutate(float mutationrate) {
        for (int i = 0; i < genes.length; i++) {
            if (Math.random() < mutationrate) {
                genes[i] = this.randomGene();
            }
        }
    }

    private char randomGene() {
        int randomIndex = (int) (Math.random() * this.geneSet.length);
        char gene = this.geneSet[randomIndex];
        return gene;
    }
}
