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
    
    public String toString() {
        return this.date.toString() + " - " + this.username + ": " + text;
    }
}