import cipher.Cipher;

import java.util.Date;

public class Message {
    private String username;
    private String text;
    private Date date;


    public Message(String pUsername, String pText, long pTime) {
        this.username = pUsername;
        this.text = pText;
        this.date = new Date(pTime);
    }

    public Message(String pUsername, String pText, Date pDate) {
        this.username = pUsername;
        this.text = pText;
        this.date = pDate;
    }

    public String getUserName() {
        return username;
    }

    public String getText() {
        return text;
    }

    public Date getDate() {
        return date;
    }

    public String toString(Cipher pCipher, String pSchluessel) {
        return this.date.toString() 
            + " - " 
            + this.username 
            + ": " 
            + pCipher.entschluesseln(pSchluessel, text);
    }
}