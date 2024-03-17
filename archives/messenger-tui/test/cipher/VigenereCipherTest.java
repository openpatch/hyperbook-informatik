package cipher;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

public class VigenereCipherTest
{
    @Test
    public void testKeyA() {
        String key = "Aal";
        var c = new VigenereCipher();
        var decrypted = "Hallo";
        var encrypted = c.verschluesseln(key, decrypted);
        assertNotEquals(decrypted, encrypted);
        assertEquals(decrypted, c.entschluesseln(key, encrypted));
    }

    @Test
    public void testKeyB() {
        String key = "Baum";
        var c = new VigenereCipher();
        var decrypted = "Hallo";
        var encrypted = c.verschluesseln(key, decrypted);
        assertNotEquals(decrypted, encrypted);
        assertEquals(decrypted, c.entschluesseln(key, encrypted));
    }
    
    @Test
    public void testKeyBWithEmoji() {
        String key = "Baum";
        var c = new VigenereCipher();
        var decrypted = "(-_-)";
        var encrypted = c.verschluesseln(key, decrypted);
        assertNotEquals(decrypted, encrypted);
        assertEquals(decrypted, c.entschluesseln(key, encrypted));
    }
}
