package cipher;

import java.util.Random;

public class PolybiosCipher extends Cipher {

    private char[][] matrix;

    /**
     * @param pSchluessel die Polybios-Matrix als String kodiert.
     */
    private void matrixomat(String pSchluessel) {
        // wir wollen eine quadratische Matrix erstellen und brauchen daher
        // die benötigte Anzahl der Spalten und Zeilen
        var n = (int) Math.ceil(Math.sqrt(pSchluessel.length()));
        this.matrix = new char[n][n];

        for (int i = 0; i < pSchluessel.length(); i++) {
            int x = i / n;
            int y = i % n;
            this.matrix[x][y] = pSchluessel.charAt(i);
        }
    }

    /**
     * Die Methode generiert basierend auf allen Zeichen, 
     * die in Java mit dem Datentyp Character darstellbar sind einen Schlüssel.
     * 
     * @return ein randomisierter Schlüssel
     */
    public static String generateKey() {
        char[] c = new char[Character.MAX_VALUE];
        for (char i = 0; i < Character.MAX_VALUE; i++) {
            c[i] = i;
        }

        // Array durchmischen
        Random rand = new Random();
        for (int i = 0; i < c.length; i++) {
            int randomIndexToSwap = rand.nextInt(c.length);
            char temp = c[randomIndexToSwap];
            c[randomIndexToSwap] = c[i];
            c[i] = temp;
        }

        String key = "";
        for (int i = 0; i < c.length; i++) {
            key += c[i];
        }
        return key;
    }

    /**
     * Die Methode verschüsselt einen gegebenen Text in der Form:
     * 
     * ZEILE#SPALTE ZEILE#SPALTE ...
     *
     * @param pSchluessel der Schlüssel
     * @param pText der zu verschlüsselende Text
     * @return der verschlüsselte Text
     */
    public String verschluesseln(String pSchluessel, String pText) {
        String e = "";
        matrixomat(pSchluessel);
        for (int i = 0; i < pText.length(); i++) {
            for (int x = 0; x < this.matrix.length; x++) {
                for (int y = 0; y < this.matrix[x].length; y++) {
                    if (this.matrix[x][y] == pText.charAt(i)) {
                        e += x + "#" + y + " ";
                    }
                }
            }
        }
        return e;
    }

    /**
     * Die Methode entschülsselt einen gegebenen Text der Form:
     * 
     * ZEILE#SPALTE ZEILE#SPALTE ...
     *
     * @param pSchluessel der Schlüssel
     * @param pText der zu entschlüsselnde Text
     * @return der entschlüsselte Text
     */
    public String entschluesseln(String pSchluessel, String pText) {
        String d = "";
        matrixomat(pSchluessel);
        String[] coordinates = pText.split(" ");
        for (int i = 0; i < coordinates.length; i+= 1) {
            String[] coordinate = coordinates[i].split("#");
            int x = Integer.parseInt(coordinate[0]);
            int y = Integer.parseInt(coordinate[1]);

            d += this.matrix[x][y];
        }

        return d;
    }
}