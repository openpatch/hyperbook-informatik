package utils;

public class StringUtils {
    private String word;
    
    public void setWord(String pWord) {
        this.word = pWord;
    }
    
    public String reverse() {
        String r = "";
        for (int i = this.word.length() - 1; i >= 0; i--) {
            r += this.word.charAt(i);
        }
        return r;
    }
    
    public int distanceTo(String pWord) {
        int distance = 0;
        String shortest = this.word;
        if (this.word.length() > pWord.length()) {
            shortest = pWord;
        }
        for (int i = 0; i < shortest.length(); i++) {
            if (this.word.charAt(i) != pWord.charAt(i)) {
                distance++;
            }
        }
        
        distance += Math.abs(this.word.length() - pWord.length());
        
        return distance;
    }
    
    public boolean isParlindrome() {
        return this.word.toUpperCase().compareTo(this.reverse().toUpperCase()) == 0;
    }
}