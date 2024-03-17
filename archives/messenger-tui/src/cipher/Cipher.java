package cipher;

public abstract class Cipher
{

    public abstract String verschluesseln(String pSchluessel, String pText);
    public abstract String entschluesseln(String pSchluessel, String pText);
}
