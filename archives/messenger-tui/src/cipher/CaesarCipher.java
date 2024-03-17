package cipher;

public class CaesarCipher extends Cipher {
    
    public String entschluesseln(String pSchluessel, String pText) {
        String d = "";
        char key = pSchluessel.charAt(0);
        for (int i = 0; i < pText.length(); i++) {
            int c = pText.charAt(i) + key;
            d += (char) c;
        }
        
        return d;
    }
    
    
    public String verschluesseln(String pSchluessel, String pText) {
        String d = "";
        char key = pSchluessel.charAt(0);
        for (int i = 0; i < pText.length(); i++) {
            int c = pText.charAt(i) - key;
            d += (char) c;
        }
        
        return d;
    }
}