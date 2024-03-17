package cipher;

public class VigenereCipher extends Cipher {

    public String entschluesseln(String pSchluessel, String pText) {
        String d = "";
        for (int i = 0; i < pText.length(); i++) {
            var shift = pSchluessel.charAt(i % pSchluessel.length());
            int c = pText.charAt(i) + shift;
            d += (char) c;
        }
        
        return d;
    }
    
    
    public String verschluesseln(String pSchluessel, String pText) {
        String d = "";
        for (int i = 0; i < pText.length(); i++) {
            var shift = pSchluessel.charAt(i % pSchluessel.length());
            int c = pText.charAt(i) - shift;
            d += (char) c;
        }
        
        return d;
    }
}