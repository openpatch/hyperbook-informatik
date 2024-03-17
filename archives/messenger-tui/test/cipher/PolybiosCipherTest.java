package cipher;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

public class PolybiosCipherTest
{

    private final String abcKey = "(_-)ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    @Test
    public void testKeyA() {
        var c = new PolybiosCipher();
        var decrypted = "Hallo";
        var encrypted = c.verschluesseln(abcKey, decrypted);
        assertNotEquals(decrypted, encrypted);
        assertEquals(decrypted, c.entschluesseln(abcKey, encrypted));
    }

    @Test
    public void testKeyB() {
        var c = new PolybiosCipher();
        var decrypted = "Hallo";
        var encrypted = c.verschluesseln(abcKey, decrypted);
        assertNotEquals(decrypted, encrypted);
        assertEquals(decrypted, c.entschluesseln(abcKey, encrypted));
    }

    @Test
    public void testKeyBWithEmoji() {
        var c = new  PolybiosCipher();
        var decrypted = "(-_-)";
        var encrypted = c.verschluesseln(abcKey, decrypted);
        assertNotEquals(decrypted, encrypted);
        assertEquals(decrypted, c.entschluesseln(abcKey, encrypted));
    }

    @Test
    public void testGenerateKey() {
        var key = PolybiosCipher.generateKey();
        var c = new  PolybiosCipher();
        var decrypted = "(-_-)";
        var encrypted = c.verschluesseln(key, decrypted);
        assertNotEquals(decrypted, encrypted);
        assertEquals(decrypted, c.entschluesseln(key, encrypted));
    }
}
