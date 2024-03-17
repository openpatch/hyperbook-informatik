package cipher;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

public class CaesarCipherTest
{
    @Test
    public void testKeyA() {
        String key = "A";
        var c = new CaesarCipher();
        var decrypted = "Hallo";
        var encrypted = c.verschluesseln(key, decrypted);
        assertNotEquals(decrypted, encrypted);
        assertEquals(decrypted, c.entschluesseln(key, encrypted));
    }

    @Test
    public void testKeyB() {
        String key = "B";
        var c = new CaesarCipher();
        var decrypted = "Hallo";
        var encrypted = c.verschluesseln(key, decrypted);
        assertNotEquals(decrypted, encrypted);
        assertEquals(decrypted, c.entschluesseln(key, encrypted));
    }
    
    @Test
    public void testKeyBWithEmoji() {
        String key = "B";
        var c = new CaesarCipher();
        var decrypted = "(-_-)";
        var encrypted = c.verschluesseln(key, decrypted);
        assertNotEquals(decrypted, encrypted);
        assertEquals(decrypted, c.entschluesseln(key, encrypted));
    }
}
